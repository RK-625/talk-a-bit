/**
 * engine/planet.js: the tiny planet. A displaced, flat-shaded icosphere with per-face colours + hatch info,
 * analytic surface queries, an optional animated sea shell, and walkability.
 *
 * createPlanet({ radius=50, detail=26, heightFn, colorFn, sea=null,
 *                outlinePx=3.2, hatchSpacing=0.15, outlineWobbleFreq=0.35, layers=null }) -> planet
 *   layers: null | { defs:[{color,hatch,line,fill}] (max 8, see ink.js `layers`), valueFn(dir, h, out:Float32Array(8)) }
 *        valueFn fills, PER VERTEX, the signed distance (units, negative = inside) to each layer's edge. The paint is resolved per
 *        fragment, so road/sand/coast boundaries are smooth and hand-drawn instead of face-sized stair steps.
 *   heightFn(dir (unit Vector3, reused: don't keep)) -> number      radial offset from `radius` (keep it gentle)
 *   colorFn(dir, height, faceIndex) -> { color: THREE.Color, hatch: 0..1, angle: radians }
 *        called once per triangle at its centroid. `hatch` = how strongly the ground is pencil-hatched even
 *        in light (0 = plain fill, 1 = strong), `angle` = stroke direction offset (0 = diagonal).
 *        Paint roads/sand/stone by returning different colour + hatch + angle.
 *   sea: null | { level, color=0x9fd0e6, hatchColor=0x3f78b0, detail=24 }
 *        `level` is radial height of the water surface above `radius` (e.g. -0.2). Land lower than that is under water.
 *
 * planet.object            THREE.Group to add to the scene (land mesh + sea meshes)
 * planet.mesh              the land Mesh (castShadow/receiveShadow)
 * planet.radius            base radius
 * planet.seaRadius         radius + sea.level, or null
 * planet.getSurfaceRadius(dir)          land radius in direction dir (any non-zero Vector3-like); analytic, no raycast
 * planet.getSurfaceNormal(dir, target?) outward normal (finite differences)
 * planet.isWalkable(dir) -> bool        false where land is below sea level, unless a walkable surface covers it
 * planet.addWalkableSurface({ contains(dir)->bool, heightAt(dir)->radius, c?: Vector3, cosR?: number })
 *        register a bridge/causeway/pier. Where contains() is true the point is walkable and the player stands at
 *        heightAt(dir) (radius from planet centre; use the same value you build the deck at). `dir` is a UNIT vector.
 *        Optional bounding cap (c = unit centre, cosR = cos of its angular radius) makes the lookup cheap.
 *        Surfaces can overlap land: the HIGHER of land and heightAt wins as the floor. The player can only step UP onto
 *        a floor at most 0.5 higher than where it stands (otherwise it is a wall: use ramps, or jump).
 * planet.getWalkRadius(dir)             floor radius used by the player: land, or the walkable surface if higher
 * planet.update(dt, t)                  animates the sea (called by the engine)
 * noise3(x,y,z), hash3(x,y,z)           deterministic gradient noise ([-0.7,0.7]) and integer hash, for worlds
 */
import * as THREE from 'three';
import { createInkMaterial, addOutline } from './ink.js';
import { makeCanvas, toTexture, rng, wobblyPath } from './doodle.js';

// ---- 3D gradient noise (inline, deterministic) -----------------------------
const GRADS = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];
export function hash3(x, y, z) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a, b, t) => a + (b - a) * t;
function corner(ix, iy, iz, x, y, z) {
  const g = GRADS[hash3(ix, iy, iz) % 12];
  return g[0] * (x - ix) + g[1] * (y - iy) + g[2] * (z - iz);
}
/** Gradient noise, roughly in [-0.9, 0.9]. */
export function noise3(x, y, z) {
  const x0 = Math.floor(x), y0 = Math.floor(y), z0 = Math.floor(z);
  const u = fade(x - x0), v = fade(y - y0), w = fade(z - z0);
  const c = (dx, dy, dz) => corner(x0 + dx, y0 + dy, z0 + dz, x, y, z);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w
  ) * 0.8;
}

export function createPlanet({
  radius = 50,
  detail = 26,
  heightFn,
  colorFn,
  sea = null,
  outlinePx = 3.2,
  hatchSpacing = 0.15,
  outlineWobbleFreq = 0.35,
  layers = null,
} = {}) {
  const hd = new THREE.Vector3();
  const surfaces = [];
  const seaRadius = sea ? radius + sea.level : null;

  /** Surface radius in the direction `dir` (any non-zero vector). Analytic, no raycast. */
  function getSurfaceRadius(dir) {
    const l = Math.hypot(dir.x, dir.y, dir.z) || 1;
    return radius + heightFn(hd.set(dir.x / l, dir.y / l, dir.z / l));
  }

  const _t1 = new THREE.Vector3(), _t2 = new THREE.Vector3(), _p0 = new THREE.Vector3(), _p1 = new THREE.Vector3(), _p2 = new THREE.Vector3(), _d = new THREE.Vector3();
  const _Y = new THREE.Vector3(0, 1, 0), _X = new THREE.Vector3(1, 0, 0);
  function surfacePoint(dir, out) {
    _d.copy(dir).normalize();
    return out.copy(_d).multiplyScalar(getSurfaceRadius(_d));
  }
  /** Outward surface normal at direction `dir`, via finite differences of the height function. */
  function getSurfaceNormal(dir, target = new THREE.Vector3()) {
    const up = _d.copy(dir).normalize().clone();
    // any tangent basis; the fallback axis keeps this valid at the poles
    _t1.crossVectors(up, Math.abs(up.y) < 0.99 ? _Y : _X).normalize();
    _t2.crossVectors(up, _t1);
    const e = 0.01; // radians
    surfacePoint(up, _p0);
    surfacePoint(_d.copy(up).addScaledVector(_t1, e), _p1);
    surfacePoint(_d.copy(up).addScaledVector(_t2, e), _p2);
    _p1.sub(_p0);
    _p2.sub(_p0);
    target.crossVectors(_p2, _p1).normalize();
    if (target.dot(up) < 0) target.negate();
    return target;
  }

  function surfaceAt(dir) {
    for (let i = 0; i < surfaces.length; i++) {
      const s = surfaces[i];
      if (s.c && dir.x * s.c.x + dir.y * s.c.y + dir.z * s.c.z < s.cosR) continue; // outside its bounding cap
      if (s.contains(dir)) return s;
    }
    return null;
  }
  function isWalkable(dir) {
    if (seaRadius === null) return true;
    if (getSurfaceRadius(dir) >= seaRadius) return true;
    return surfaceAt(dir) !== null;
  }
  function getWalkRadius(dir) {
    const land = getSurfaceRadius(dir);
    if (!surfaces.length) return land;
    const s = surfaceAt(dir);
    return s ? Math.max(land, s.heightAt(dir)) : land;
  }

  // ---- land mesh ----
  const geo = new THREE.IcosahedronGeometry(radius, detail); // non-indexed: faces own their vertices
  geo.deleteAttribute('uv');
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  // the icosphere is non-indexed, so every vertex appears ~6 times: evaluate heightFn once per distinct position
  const hCache = new Map();
  const nLay = layers ? 8 : 0;
  const layerVals = layers ? new Float32Array(pos.count * 8) : null;
  const tmpVals = new Float32Array(8);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const key = ((Math.round(v.x * 2e4) + 20000) * 40001 + (Math.round(v.y * 2e4) + 20000)) * 40001 + (Math.round(v.z * 2e4) + 20000);
    let ent = hCache.get(key);
    if (ent === undefined) {
      const rr = getSurfaceRadius(v);
      ent = { rr, vals: null };
      if (layers) { tmpVals.fill(1e3); layers.valueFn(v, rr - radius, tmpVals); ent.vals = Float32Array.from(tmpVals); }
      hCache.set(key, ent);
    }
    if (layers) layerVals.set(ent.vals, i * 8);
    v.multiplyScalar(ent.rr);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  hCache.clear();
  geo.computeVertexNormals(); // non-indexed => flat per-face normals

  // One colour + hatch info per face, from the face centroid.
  const colors = new Float32Array(pos.count * 3);
  const hatch = new Float32Array(pos.count * 2); // (light-hatch amount, stroke angle offset)
  const cen = new THREE.Vector3();
  for (let f = 0; f < pos.count; f += 3) {
    cen.set(0, 0, 0);
    for (let k = 0; k < 3; k++) cen.add(v.fromBufferAttribute(pos, f + k));
    cen.normalize();
    const out = colorFn(cen, heightFn(cen), f);
    for (let k = 0; k < 3; k++) {
      colors[(f + k) * 3] = out.color.r;
      colors[(f + k) * 3 + 1] = out.color.g;
      colors[(f + k) * 3 + 2] = out.color.b;
      hatch[(f + k) * 2] = out.hatch;
      hatch[(f + k) * 2 + 1] = out.angle;
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aHatch', new THREE.BufferAttribute(hatch, 2));
  if (layers) {
    const A = new Float32Array(pos.count * 4), B = new Float32Array(pos.count * 4);
    for (let i = 0; i < pos.count; i++) for (let k = 0; k < 4; k++) { A[i * 4 + k] = layerVals[i * 8 + k]; B[i * 4 + k] = layerVals[i * 8 + 4 + k]; }
    geo.setAttribute('aLayerA', new THREE.BufferAttribute(A, 4));
    geo.setAttribute('aLayerB', new THREE.BufferAttribute(B, 4));
  }

  const mat = createInkMaterial({ vertexColors: true, hatchSpacing, lightHatch: 1, hatchAttribute: true, layers: layers ? layers.defs : null });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  addOutline(mesh, { thickness: outlinePx, wobbleFreq: outlineWobbleFreq, wobble: 1.2 });
  mesh.name = 'planet';

  const object = new THREE.Group();
  object.add(mesh);

  // ---- optional sea: hatched water shell + scrolling wave-curl doodles ----
  let curlTex = null;
  if (sea) {
    const seaGeo = new THREE.IcosahedronGeometry(seaRadius, sea.detail ?? 24);
    const seaMat = createInkMaterial({
      color: sea.color ?? 0x9fd0e6,
      hatchColor: sea.hatchColor ?? 0x3f78b0,
      hatchSpacing: 0.18,
      lightHatch: 1,
      hatchStrength: 1,
    });
    const seaMesh = new THREE.Mesh(seaGeo, seaMat);
    seaMesh.receiveShadow = true;
    seaMesh.name = 'sea';
    object.add(seaMesh);

    curlTex = waveCurlTexture();
    const curls = new THREE.Mesh(
      new THREE.IcosahedronGeometry(seaRadius + 0.04, sea.detail ?? 24),
      new THREE.MeshBasicMaterial({ map: curlTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 })
    );
    curls.name = 'sea-curls';
    object.add(curls);
  }

  return {
    object, mesh, radius, seaRadius,
    getSurfaceRadius, getSurfaceNormal, isWalkable, getWalkRadius,
    addWalkableSurface(s) { surfaces.push(s); },
    update(dt, t) {
      if (curlTex) { curlTex.offset.x = (t * 0.004) % 1; curlTex.offset.y = Math.sin(t * 0.3) * 0.004; }
      if (sea) object.getObjectByName('sea').scale.setScalar(1 + Math.sin(t * 0.9) * 0.0012); // gentle swell
    },
  };
}

// Little wave curls scattered over an equirectangular canvas, wrapped around the sea sphere.
function waveCurlTexture() {
  const { c, ctx } = makeCanvas(1024, 512);
  const r = rng(31);
  for (let i = 0; i < 260; i++) {
    const x = r() * 1024, y = 40 + r() * 432, s = 8 + r() * 10;
    // a small "~" with a curl at the end, in blue pencil
    ctx.strokeStyle = r() > 0.5 ? '#3f78b0' : '#6f9fd0';
    ctx.lineWidth = 2.2;
    wobblyPath(ctx, [[x - s * 1.6, y], [x - s * 0.7, y - s * 0.5], [x + s * 0.4, y - s * 0.2], [x + s * 1.2, y - s * 0.7], [x + s * 1.1, y - s * 1.3]], false, r, 1);
    ctx.stroke();
  }
  const t = toTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}
