/**
 * hyderabad/world.js: assembly helpers shared by the builders (scenery, roads, rail, bridges, traffic, npcs).
 *
 * const W = makeWorld(ctx)
 *   W.add(obj, { dir, fwd, radius?, lift=0, scale=1, maxDist=Infinity, height?, collide=true, walkable=true, cullR? }) -> obj
 *        place an authored asset on the sphere (placeOnSphere), register its colliders (+ merged wall segments) and walkable
 *        floors, add it to the scene under W.root, hand it to the culler, and drive its userData.animate(dt) while near.
 *   W.bank  instance bank: W.bank.add(name, dir, fwd, scale?) collects street furniture; W.bank.build() makes chunked
 *        InstancedMeshes (one per kind per ~38-unit chunk) with per-chunk culling.
 *   W.updaters  per-frame callbacks (dt, t) the builders push to
 *   W.cull(obj, opts)  register any object with the culler (used for NPCs / vehicles / chunks)
 *   W.surfaceR(dir)  land radius; W.seaR  sea radius
 */
import * as THREE from 'three';
import { placeOnSphere, registerAsset, frameAt } from '../../engine/place.js';
import { buildInstanced } from '../../engine/scatter.js';
import { vcMat } from './props/kit.js';
import { instanceSpecs, PART_HATCH } from './props/street.js';
import { DYN } from './spots.js';

const Y = new THREE.Vector3(0, 1, 0);
const SCENIC = { palm: 1.9, palm2: 1.9, rainTree: 3.4, rainTree2: 3.4, gulmohar: 2.8, jacaranda: 2.8, banyan: 3.4, neem: 3.2, neem2: 3.2, boulder: 2.1, boulder2: 2.1, boulder3: 2.1, beachUmbrella: 1.9, sandcastle: 1.9 }; // canopy radius (units) of the scatter props that must not overlap
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion();

export function flagShadows(obj, cast = true) {
  obj.traverse((o) => {
    if ((o.isMesh || o.isInstancedMesh) && o.name !== 'ink-outline' && !o.isSprite) { o.castShadow = cast; o.receiveShadow = true; }
  });
}

export function makeWorld(ctx) {
  const { scene, planet, colliders, culler, quality, ink } = ctx;
  const root = new THREE.Group();
  root.name = 'hyderabad';
  scene.add(root);
  const updaters = [];
  const dens = quality.density ?? 1;
  const cs = quality.cullScale ?? 1;

  function cull(obj, { maxDist = Infinity, radius = 2, height = 6, dynamic = false, position = null, outlineDist = Infinity } = {}) {
    return culler.add(obj, { maxDist: maxDist * cs, radius, height, dynamic, position, outlineDist: outlineDist * cs });
  }

  function add(obj, o = {}) {
    const { dir, fwd, radius = null, lift = 0, scale = 1, maxDist = Infinity, collide = true, walkable = true, shadow = true } = o;
    if (scale !== 1) obj.scale.setScalar(scale);
    placeOnSphere(obj, dir, fwd, { planet, radius: radius ?? planet.getSurfaceRadius(dir) + lift });
    root.add(obj);
    if (shadow) flagShadows(obj);
    obj.updateMatrixWorld(true);
    if (collide || walkable) registerAsset(obj, { planet, colliders: collide ? colliders : null, surfaces: walkable });
    const fp = obj.userData.footprint;
    const fr = typeof fp === 'number' ? fp : fp ? Math.hypot(fp.w, fp.l) / 2 : 4;
    const item = o.cull === false ? { near: true } : cull(obj, { maxDist, radius: o.cullR ?? Math.max(fr, 3), height: o.height ?? obj.userData.height ?? 6, outlineDist: o.outlineDist ?? Infinity });
    // buildings fade when they block the camera's view of Chotu (never things flagged occluder:false, or things he stands on)
    if (o.occlude !== false && obj.userData.occluder !== false && (o.height ?? obj.userData.height ?? 0) >= 4.5) ctx.occlusion?.add(obj, { shrink: 1.2 });
    if (typeof obj.userData.animate === 'function' && !o.noAnim) {
      const f = obj.userData.animate;
      updaters.push((dt, t) => { if (item.near) f(dt, t); });
    }
    return obj;
  }

  // ---- instance bank -------------------------------------------------------------------------------------------
  const specs = instanceSpecs();
  const CHUNKS = (() => { // fibonacci points as chunk centres
    const n = 56, out = [];
    for (let i = 0; i < n; i++) { const y = 1 - (2 * (i + 0.5)) / n, r = Math.sqrt(1 - y * y), a = i * 2.399963; out.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r)); }
    return out;
  })();
  const entries = new Map(); // name -> chunk -> matrices
  const bank = {
    specs,
    add(name, dir, fwd, scale = 1, { collide = true, lift = 0 } = {}) {
      const sp = specs[name];
      if (!sp) { console.warn('bank: unknown spec', name); return null; }
      const f = frameAt(dir, fwd ?? 0, {});
      _m.makeBasis(f.right, f.up, f.fwd);
      _q.setFromRotationMatrix(_m);
      const pos = f.up.clone().multiplyScalar(planet.getSurfaceRadius(f.up) - 0.03 + lift);
      const mat = new THREE.Matrix4().compose(pos, _q, new THREE.Vector3(scale, scale, scale));
      let ci = 0, best = -2;
      for (let i = 0; i < CHUNKS.length; i++) { const d = CHUNKS[i].dot(f.up); if (d > best) { best = d; ci = i; } }
      if (!entries.has(name)) entries.set(name, new Map());
      const byChunk = entries.get(name);
      if (!byChunk.has(ci)) byChunk.set(ci, []);
      byChunk.get(ci).push(mat);
      if (collide && sp.collide) colliders.add({ dir: f.up.clone(), radius: sp.collide.radius * scale, height: sp.collide.height * scale });
      // remember scenic props (crowns, canopies) so later scatter and the validator keep clear of them
      if (SCENIC[name]) {
        const col = collide && sp.collide ? colliders.list[colliders.list.length - 1] : null;
        DYN.push({ dir: f.up.clone(), r: SCENIC[name] * scale, name, scenic: true, mat, ci, col });
      }
      return mat;
    },
    /** drop scatter props (palms, umbrellas, banyans, sandcastles) whose canopy would intersect something placed later: every DYN scenic
     *  entry for which test(dyn) is true leaves the bank and the collider list (call before bank.build()) */
    removeWhere(test) {
      let n = 0;
      for (let i = DYN.length - 1; i >= 0; i--) {
        const d = DYN[i];
        if (!d.scenic || !test(d)) continue;
        const list = entries.get(d.name)?.get(d.ci);
        const k = list ? list.indexOf(d.mat) : -1;
        if (k >= 0) list.splice(k, 1);
        if (d.col) colliders.remove(d.col);
        DYN.splice(i, 1); n++;
      }
      return n;
    },
    count() { let n = 0; for (const m of entries.values()) for (const a of m.values()) n += a.length; return n; },
    build() {
      const groups = new Map();
      for (const [name, byChunk] of entries) {
        const sp = specs[name];
        const material = vcMat(ink, PART_HATCH[name.replace(/Blue|Yellow|\d+$/g, '')] ?? 0.08, 0.9);
        for (const [ci, mats] of byChunk) {
          if (!groups.has(ci)) { const g = new THREE.Group(); g.name = 'chunk' + ci; root.add(g); groups.set(ci, g); }
          buildInstanced(groups.get(ci), sp.parts, material, mats, { thickness: sp.thickness, cull: true });
        }
      }
      for (const [ci, g] of groups) {
        const c = CHUNKS[ci];
        cull(g, { maxDist: 80, radius: 26, height: 9, position: c.clone().multiplyScalar(planet.radius) });
      }
    },
  };

  return {
    ...ctx, root, updaters, add, cull, bank, dens, cs,
    surfaceR: (d) => planet.getSurfaceRadius(d),
    seaR: planet.seaRadius,
  };
}
