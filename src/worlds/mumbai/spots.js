/**
 * mumbai/spots.js: "is this spot free?" helpers shared by the scatter code (roads.js dressing, population, details).
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
export function freeSpot(dir, r) {
  if (onBridge(dir, r + 4)) return false;
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
