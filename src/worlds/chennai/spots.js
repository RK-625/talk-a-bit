/**
 * chennai/spots.js: "is this spot free?" helpers shared by the scatter code (roads.js dressing, population, details).
 *   freeSpot(dir, r)        not on the Sea Link corridor and clear of every placed footprint circle
 *   clearOfRoads(dir, m, kinds?)   at least m units from the named path kinds (default road/rail/lane/promenade)
 *   nearCollider(colliders, dir, r) any registered collider (circle or segment) within r (+its radius)
 */
import * as THREE from 'three';
import { R, BRIDGE, dist, pathNearest } from './geo.js';
import { PLACED } from './layout.js';
import { segmentPoint } from '../../engine/colliders.js';

const _bn = BRIDGE.center.clone().cross(BRIDGE.t).normalize();
const _q = new THREE.Vector3();
export function onBridge(dir, m) {
  if (dir.dot(BRIDGE.center) < 0.6) return false;
  const lat = Math.abs(Math.asin(THREE.MathUtils.clamp(dir.dot(_bn), -1, 1))) * R;
  return lat < m + 2.5 && Math.abs(Math.atan2(dir.dot(BRIDGE.t), dir.dot(BRIDGE.center))) * R < BRIDGE.half + 6;
}
/** scatter props already placed through the instance bank: { dir, r (canopy radius), name, scenic }: later scatter avoids them */
export const DYN = [];
const BEFORE = import.meta.env.DEV && new URLSearchParams(location.search).has('before'); // dev: ?before=1 turns the scatter-overlap guard off to re-measure the old behaviour
export function freeSpot(dir, r) {
  if (onBridge(dir, r + 4)) return false;
  if (!BEFORE) for (const c of DYN) if (c.dir.dot(dir) > Math.cos((c.r + r + 0.5) / R) && dist(dir, c.dir) < c.r + r) return false;
  for (const p of PLACED) {
    if (p.noOverlap) continue;
    if (dist(dir, p.dir) < p.radius * 0.8 + r) return false;
  }
  return true;
}
export const clearOfRoads = (dir, m, kinds = ['road', 'rail', 'lane', 'promenade']) => pathNearest(dir, kinds).d > m;
export function nearCollider(colliders, dir, r) {
  for (const c of colliders.list) {
    if (c.height < 0) continue;
    if (dir.dot(c.dir) < (c.cullCos ?? 0.9)) continue;
    const cd = c.a ? segmentPoint(c, dir, _q) : c.dir;
    if (Math.acos(THREE.MathUtils.clamp(dir.dot(cd), -1, 1)) * R < c.radius + r) return true;
  }
  return false;
}

// ---- real ground footprints (used by validate.js and by details.js to clear scatter props out of the way) ------------------------
const LOW_Y = [0.08, 1.4]; // only vertices between these heights count as footprint (awnings and roofs are overhead)
/** ground footprint of a placed group in its own frame: { x0, x1, z0, z1, inv, g } (null if it has nothing near the ground) */
export function footprintOf(g) {
  g.updateMatrixWorld(true);
  const inv = g.matrixWorld.clone().invert();
  const m = new THREE.Matrix4(), v = new THREE.Vector3();
  let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9, any = false;
  g.traverse((o) => {
    if (!o.isMesh || o.name === 'ink-outline' || o.isInstancedMesh || !o.geometry?.attributes.position) return;
    if (o.layers?.mask === 1 << 1) return; // overlay layer (hulls, stickers)
    m.multiplyMatrices(inv, o.matrixWorld);
    const p = o.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(m);
      if (v.y < LOW_Y[0] || v.y > LOW_Y[1]) continue;
      if (v.x < x0) x0 = v.x; if (v.x > x1) x1 = v.x; if (v.z < z0) z0 = v.z; if (v.z > z1) z1 = v.z; any = true;
    }
  });
  return any ? { x0, x1, z0, z1, inv, g } : null;
}
