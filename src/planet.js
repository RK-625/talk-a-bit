// The tiny planet: a displaced, flat-shaded icosphere with pastel per-face colours.
// Height comes from ONE analytic function used for both the mesh and getSurfaceRadius().
import * as THREE from 'three';
import { createInkMaterial, addOutline } from './ink.js';

// ---- tunables --------------------------------------------------------------
export const PLANET_RADIUS = 50;
export const PLANET_DETAIL = 26; // edge subdivisions -> 20 * 27^2 = 14,580 triangles
const HILL_HEIGHT = 1.5; // max +/- radial displacement
// [frequency on the unit sphere, weight] per octave
const OCTAVES = [
  [2.0, 0.62],
  [4.4, 0.3],
  [9.0, 0.08],
];
const OUTLINE_PX = 3.2;

const C_BASE = new THREE.Color(0xa9d68f);
const C_LIGHT = new THREE.Color(0xc6e5a2);
const C_DARK = new THREE.Color(0x8dc98c);
const C_YELLOW = new THREE.Color(0xd8e49a);

// ---- 3D gradient noise (inline, deterministic) -----------------------------
const GRADS = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];
function hash3(x, y, z) {
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

// ---- height / surface queries ----------------------------------------------
function height(x, y, z) {
  let n = 0;
  for (let i = 0; i < OCTAVES.length; i++) {
    const [f, wgt] = OCTAVES[i];
    n += noise3(x * f + 11.3 * i, y * f - 4.1 * i, z * f + 7.7) * wgt;
  }
  // gentle shaping: flatten the valleys a little, keep hills soft
  n = Math.max(-1, Math.min(1, n * 1.15));
  return HILL_HEIGHT * n;
}

/** Surface radius in the direction `dir` (any non-zero vector). Analytic, no raycast. */
export function getSurfaceRadius(dir) {
  const l = Math.hypot(dir.x, dir.y, dir.z) || 1;
  return PLANET_RADIUS + height(dir.x / l, dir.y / l, dir.z / l);
}

const _t1 = new THREE.Vector3();
const _t2 = new THREE.Vector3();
const _p0 = new THREE.Vector3();
const _p1 = new THREE.Vector3();
const _p2 = new THREE.Vector3();
const _d = new THREE.Vector3();
function surfacePoint(dir, out) {
  _d.copy(dir).normalize();
  return out.copy(_d).multiplyScalar(getSurfaceRadius(_d));
}

/** Outward surface normal at direction `dir`, via finite differences of the height function. */
export function getSurfaceNormal(dir, target = new THREE.Vector3()) {
  const up = _d.copy(dir).normalize().clone();
  // any tangent basis; the fallback axis keeps this valid at the poles
  _t1.crossVectors(up, Math.abs(up.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
  _t2.crossVectors(up, _t1);
  const e = 0.01; // radians
  surfacePoint(up, _p0);
  surfacePoint(_d.copy(up).addScaledVector(_t1, e), _p1);
  surfacePoint(_d.copy(up).addScaledVector(_t2, e), _p2);
  _p1.sub(_p0);
  _p2.sub(_p0);
  target.crossVectors(_p2, _p1).normalize(); // _t1 x _t2 = -up, so (p2 x p1) points outward
  if (target.dot(up) < 0) target.negate();
  return target;
}

// ---- mesh ------------------------------------------------------------------
export function createPlanet() {
  const geo = new THREE.IcosahedronGeometry(PLANET_RADIUS, PLANET_DETAIL); // non-indexed: faces own their vertices
  geo.deleteAttribute('uv');
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    v.multiplyScalar(getSurfaceRadius(v));
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals(); // non-indexed => flat per-face normals

  // One colour + one "hatch me even in light" amount per face, from the face centroid.
  const colors = new Float32Array(pos.count * 3);
  const hatch = new Float32Array(pos.count * 2); // (light-hatch amount, stroke angle offset)
  const c = new THREE.Color();
  const cen = new THREE.Vector3();
  for (let f = 0; f < pos.count; f += 3) {
    cen.set(0, 0, 0);
    for (let k = 0; k < 3; k++) cen.add(v.fromBufferAttribute(pos, f + k));
    cen.normalize();
    const a = noise3(cen.x * 3 + 40, cen.y * 3, cen.z * 3) * 1.2; // light/dark patches
    const b = noise3(cen.x * 2.2, cen.y * 2.2 + 90, cen.z * 2.2); // yellow-green patches
    const p = noise3(cen.x * 4.5 - 30, cen.y * 4.5, cen.z * 4.5 + 5); // hatched patches
    c.copy(C_BASE);
    c.lerp(a > 0 ? C_LIGHT : C_DARK, Math.min(1, Math.abs(a)) * 0.9);
    c.lerp(C_YELLOW, THREE.MathUtils.smoothstep(b, 0.15, 0.5) * 0.7);
    // per-face wobble in value, like uneven colouring
    const jitter = 1 + (hash3(f, 3, 7) / 4294967295 - 0.5) * 0.06;
    c.multiplyScalar(jitter);
    // patchwork: about half the faces strongly hatched, the rest lightly; direction drifts per patch
    const h = 0.3 + 0.7 * THREE.MathUtils.smoothstep(p, -0.08, 0.12);
    const ang = noise3(cen.x * 3.3 + 70, cen.y * 3.3 - 20, cen.z * 3.3) * 0.9 + (hash3(f, 11, 5) / 4294967295 - 0.5) * 0.12;
    for (let k = 0; k < 3; k++) {
      colors[(f + k) * 3] = c.r;
      colors[(f + k) * 3 + 1] = c.g;
      colors[(f + k) * 3 + 2] = c.b;
      hatch[(f + k) * 2] = h;
      hatch[(f + k) * 2 + 1] = ang;
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aHatch', new THREE.BufferAttribute(hatch, 2));

  const mat = createInkMaterial({
    vertexColors: true,
    hatchSpacing: 0.15,
    lightHatch: 1,
    hatchAttribute: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  addOutline(mesh, { thickness: OUTLINE_PX, wobbleFreq: 0.35, wobble: 1.2 });
  mesh.name = 'planet';
  return mesh;
}
