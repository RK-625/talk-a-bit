/**
 * mumbai/validate.js (dev only): strict layout validation. Logs console.error for
 *   - a footprint rectangle touching a road carriageway or the rail corridor
 *   - two footprints overlapping (checkOverlaps in layout.js)
 *   - a vehicle lane (with the vehicle's half-width) passing through any footprint or static collider
 * validateWorld(W, { T }) -> { roads, overlaps, lanes }  (arrays of strings; empty = clean)
 */
import * as THREE from 'three';
import { PLACED, checkOverlaps } from './layout.js';
import { R, pathNearest, PATHS } from './geo.js';
import { frameAt, localToDir } from '../../engine/place.js';
import { segmentPoint } from '../../engine/colliders.js';

const V = THREE.Vector3;
export function validateWorld(W, { T }) {
  const out = { roads: [], overlaps: [], lanes: [] };
  const rects = PLACED.filter((p) => !p.noOverlap).map((p) => ({ p, f: frameAt(p.dir, p.fwd, {}) }));

  // 1. footprints vs carriageway / rail corridor
  const tmp = new V();
  for (const { p, f } of rects) {
    let bad = null;
    for (let x = -p.size[0] / 2; x <= p.size[0] / 2 + 0.01 && !bad; x += Math.max(1, p.size[0] / Math.ceil(p.size[0] / 2)))
      for (let z = -p.size[1] / 2; z <= p.size[1] / 2 + 0.01 && !bad; z += Math.max(1, p.size[1] / Math.ceil(p.size[1] / 2))) {
        localToDir(f, x, z, R, tmp);
        const r = pathNearest(tmp, ['road', 'rail']);
        if (r.p && r.p.kind === 'road' && r.d < r.p.w / 2 + 0.3) bad = r.p.id + ' road';
        else if (r.p && r.p.kind === 'rail' && r.d < r.p.w / 2 + 0.8 && p.kind !== 'station') bad = 'rail corridor';
      }
    if (bad) out.roads.push(`${p.id} (${p.kind}) on ${bad}`);
  }
  out.overlaps = checkOverlaps(() => {}).map((h) => h.join(' x '));

  // 2. vehicle lanes vs everything static
  const statics = W.colliders.list.filter((c) => !c.update && c.height >= 0);
  const margin = 1.6; // half the widest vehicle + slack
  const up = new V();
  for (const lane of T.lanes) {
    const curve = new THREE.CatmullRomCurve3(lane.dirs.map((d) => d.clone().multiplyScalar(R)), true, 'centripetal');
    const n = Math.ceil(curve.getLength() / 1.2);
    for (let i = 0; i < n; i++) {
      curve.getPointAt(i / n, up).normalize();
      for (const { p, f } of rects) {
        if (up.dot(p.dir) < Math.cos((p.radius + 4) / R)) continue;
        // point in the item's frame (tangent-plane approximation)
        const q = up.clone().addScaledVector(f.up, -up.dot(f.up));
        const lx = q.dot(f.right) * R, lz = q.dot(f.fwd) * R;
        if (Math.abs(lx) < p.size[0] / 2 + margin && Math.abs(lz) < p.size[1] / 2 + margin) { out.lanes.push(`${lane.id}: lane through ${p.id}`); break; }
      }
      for (const c of statics) {
        if (up.dot(c.dir) < (c.cullCos ?? Math.cos((c.radius + 4) / R))) continue;
        const cd = c.a ? segmentPoint(c, up, new V()) : c.dir;
        const d = Math.acos(THREE.MathUtils.clamp(up.dot(cd), -1, 1)) * R;
        if (d < c.radius + margin) { out.lanes.push(`${lane.id}: lane through a collider r=${c.radius.toFixed(2)} near s=${(i / n).toFixed(2)}`); break; }
      }
    }
  }
  out.lanes = [...new Set(out.lanes)];
  for (const [k, v] of Object.entries(out)) if (v.length) console.error(`[mumbai validate] ${k}: ${v.length}\n  ` + v.slice(0, 40).join('\n  '));
  if (!out.roads.length && !out.overlaps.length && !out.lanes.length) console.log('[mumbai validate] layout clean');
  void PATHS;
  return out;
}
