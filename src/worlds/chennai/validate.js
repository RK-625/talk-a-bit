/**
 * chennai/validate.js (dev only): strict layout validation. Logs console.error for
 *   - a footprint rectangle touching a road carriageway or the rail corridor
 *   - two footprints overlapping (checkOverlaps in layout.js)
 *   - a vehicle lane (with the vehicle's half-width) passing through any footprint or static collider
 *   - (polish 3) props: two detail props / landmarks whose ground footprints overlap (real geometry, not the SIZE table), including the
 *     scatter props (palms, beach umbrellas, banyans, sandcastles) tracked in spots.DYN
 *   - (polish 3) people: a person's feet inside a prop or building footprint (other than the prop they work at) or inside a solid collider
 *   - (polish 3) floating: a prop whose base sits above the walkable ground at any footprint corner
 * validateWorld(W, { T, S, N, D }) -> { roads, overlaps, lanes, props, people, floating }  (arrays of strings; empty = clean)
 */
import * as THREE from 'three';
import { PLACED, checkOverlaps } from './layout.js';
import { DYN, footprintOf } from './spots.js';
import { R, pathNearest, PATHS } from './geo.js';
import { frameAt, localToDir } from '../../engine/place.js';
import { segmentPoint } from '../../engine/colliders.js';

const V = THREE.Vector3;
export function validateWorld(W, { T, S, N, D }) {
  const out = { roads: [], overlaps: [], lanes: [], props: [], people: [], floating: [] };
  const rects = PLACED.filter((p) => !p.noOverlap).map((p) => ({ p, f: frameAt(p.dir, p.fwd, {}) }));

  // 1. footprints vs carriageway / rail corridor
  const tmp = new V();
  for (const { p, f } of rects) {
    let bad = null;
    for (let x = -p.size[0] / 2; x <= p.size[0] / 2 + 0.01 && !bad; x += Math.max(1, p.size[0] / Math.ceil(p.size[0] / 2)))
      for (let z = -p.size[1] / 2; z <= p.size[1] / 2 + 0.01 && !bad; z += Math.max(1, p.size[1] / Math.ceil(p.size[1] / 2))) {
        localToDir(f, x, z, R, tmp);
        const r = pathNearest(tmp, ['road', 'rail']);
        if (r.p && r.p.kind === 'road' && r.d < r.p.w / 2 + 0.3 && !p.onRoad) bad = r.p.id + ' road';
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
        if (p.onRoad) continue; // the toll plaza straddles its road on purpose (lanes pass between the canopy posts)
        if (up.dot(p.dir) < Math.cos((p.radius + 4) / R)) continue;
        // point in the item's frame (tangent-plane approximation)
        const q = up.clone().addScaledVector(f.up, -up.dot(f.up));
        const lx = q.dot(f.right) * R, lz = q.dot(f.fwd) * R;
        if (Math.abs(lx) < p.size[0] / 2 + margin && Math.abs(lz) < p.size[1] / 2 + margin) { out.lanes.push(`${lane.id}: lane through ${p.id}`); break; }
      }
      for (const c of statics) {
        if (up.dot(c.dir) < (c.cullCos ?? Math.cos((c.radius + 4) / R))) continue;
        if (rects.some(({ p }) => p.onRoad && up.dot(p.dir) > Math.cos((p.radius + 1) / R))) continue; // inside the toll plaza
        const cd = c.a ? segmentPoint(c, up, new V()) : c.dir;
        const d = Math.acos(THREE.MathUtils.clamp(up.dot(cd), -1, 1)) * R;
        if (d < c.radius + margin) { out.lanes.push(`${lane.id}: lane through a collider r=${c.radius.toFixed(2)} near s=${(i / n).toFixed(2)}`); break; }
      }
    }
  }
  out.lanes = [...new Set(out.lanes)];
  if (S && N) geometryChecks(W, { S, N, D }, out);
  for (const [k, v] of Object.entries(out)) if (v.length) console.error(`[chennai validate] ${k}: ${v.length}\n  ` + v.slice(0, 40).join('\n  '));
  if (Object.values(out).every((v) => !v.length)) console.log('[chennai validate] layout clean');
  void PATHS;
  return out;
}


// ---------------------------------------------------------------------------------------------------------------------
// polish-3 checks: real geometry footprints
// ---------------------------------------------------------------------------------------------------------------------
/** assets with an open interior / forecourt that their own detail props legitimately stand in */
const HOLLOW = new Set(['gateway', 'taj', 'cst', 'bse', 'rajabai', 'flora', 'haji', 'station', 'antilia', 'chawl', 'irani', 'poster', 'deco0', 'deco1', 'deco2']);
// the ferry rides the water; the station sits on its own platform surfaces; the Gateway is a quay: its harbour-side corner stands on the pier over the water by design
const SKIP_FLOAT = new Set(['ferry', 'station', 'gateway']);
const corners = (fp, shrink = 0) => [[fp.x0 + shrink, fp.z0 + shrink], [fp.x1 - shrink, fp.z0 + shrink], [fp.x1 - shrink, fp.z1 - shrink], [fp.x0 + shrink, fp.z1 - shrink]];

/** 2D SAT between two convex polygons ([[x,z]...]); true if they overlap by more than `eps` */
function polysOverlap(A, B, eps = 0.05) {
  for (const poly of [A, B]) {
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const nx = -(b[1] - a[1]), nz = b[0] - a[0], l = Math.hypot(nx, nz) || 1;
      let a0 = 1e9, a1 = -1e9, b0 = 1e9, b1 = -1e9;
      for (const q of A) { const d = (q[0] * nx + q[1] * nz) / l; a0 = Math.min(a0, d); a1 = Math.max(a1, d); }
      for (const q of B) { const d = (q[0] * nx + q[1] * nz) / l; b0 = Math.min(b0, d); b1 = Math.max(b1, d); }
      if (a1 - eps <= b0 || b1 - eps <= a0) return false;
    }
  }
  return true;
}

function geometryChecks(W, { S, N, D }, out) {
  const T3 = new V(), local = new V();
  // every placed group: scenery items + detail props
  const groups = [];
  const kindOf = new Map(PLACED.map((p) => [p.id, p]));
  for (const [id, g] of S.items) groups.push({ id, g, kind: kindOf.get(id)?.kind ?? id, inside: kindOf.get(id)?.inside });
  for (const [id, g] of D?.props ?? []) if (g?.isObject3D && !groups.some((e) => e.g === g)) groups.push({ id, g, kind: kindOf.get(id)?.kind ?? id, inside: kindOf.get(id)?.inside });
  for (const e of groups) { e.fp = footprintOf(e.g); e.pos = e.g.getWorldPosition(new V()); e.rad = e.fp ? Math.hypot(Math.max(Math.abs(e.fp.x0), Math.abs(e.fp.x1)), Math.max(Math.abs(e.fp.z0), Math.abs(e.fp.z1))) : 0; }
  const parentKind = (e) => (e.inside ? groups.find((q) => q.id === e.inside)?.kind : null);
  const hollowParent = (child, parent) => child.inside === parent.id && HOLLOW.has(parent.kind);

  // 1. prop vs prop / landmark (footprint polygons in A's frame)
  const worldCorners = (e, shrink) => corners(e.fp, shrink).map(([x, z]) => new V(x, 0.3, z).applyMatrix4(e.g.matrixWorld));
  for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) {
    const A = groups[i], B = groups[j];
    if (!A.fp || !B.fp) continue;
    if (A.pos.distanceTo(B.pos) > A.rad + B.rad + 0.5) continue;
    if (hollowParent(A, B) || hollowParent(B, A)) continue;
    if (A.kind === 'laundry' || B.kind === 'laundry') continue; // overhead lines
    const polyB = worldCorners(B, 0.06).map((w) => { local.copy(w).applyMatrix4(A.fp.inv); return [local.x, local.z]; });
    if (polysOverlap(corners(A.fp, 0.06), polyB)) out.props.push(`${A.id} x ${B.id}`);
  }
  // 1b. scatter props (palms, umbrellas, banyans, sandcastles) against each other and against the footprints
  const scen = DYN.filter((c) => c.scenic);
  for (let i = 0; i < scen.length; i++) {
    for (let j = i + 1; j < scen.length; j++) {
      if (scen[i].dir.dot(scen[j].dir) < Math.cos((scen[i].r + scen[j].r) / R)) continue;
      const d = Math.acos(THREE.MathUtils.clamp(scen[i].dir.dot(scen[j].dir), -1, 1)) * R;
      if (d < (scen[i].r + scen[j].r) * 0.9) out.props.push(`${scen[i].name}@${polarTag(scen[i].dir)} x ${scen[j].name}@${polarTag(scen[j].dir)}`);
    }
    for (const e of groups) {
      if (!e.fp || e.kind === 'laundry') continue;
      if (e.pos.distanceTo(T3.copy(scen[i].dir).multiplyScalar(e.pos.length())) > e.rad + scen[i].r + 0.5) continue;
      local.copy(scen[i].dir).multiplyScalar(e.pos.length()).applyMatrix4(e.fp.inv); // tangent-plane approximation
      const dx = Math.max(e.fp.x0 - local.x, 0, local.x - e.fp.x1), dz = Math.max(e.fp.z0 - local.z, 0, local.z - e.fp.z1);
      if (Math.hypot(dx, dz) < scen[i].r * 0.8) out.props.push(`${scen[i].name}@${polarTag(scen[i].dir)} x ${e.id}`);
    }
  }

  // 2. people: feet inside a footprint (other than the prop they work at) or a solid collider
  const walkerDirs = new Set(N.npcs.filter((n) => n.walker).map((n) => n.actor.dir));
  const statics = W.colliders.list.filter((c) => !c.update && c.height >= 0.8 && !c.person && !walkerDirs.has(c.dir) && !(c.owner));
  for (const n of N.npcs) {
    if (n.role === 'dog' || n.sitting) continue;
    const dir = n.walker ? n.actor.dir : n.dir;
    if (!dir) continue;
    const feet = n.g.getWorldPosition(new V());
    const tag = `${n.id ?? n.role}@${polarTag(dir)}`;
    for (const e of groups) {
      if (!e.fp || e.g === n.owner) continue;
      if (e.pos.distanceTo(feet) > e.rad + 1) continue;
      if (n.ownerSite && e.id === n.ownerSite && HOLLOW.has(e.kind)) continue; // standing in their own landmark's forecourt
      if (HOLLOW.has(e.kind) && e.kind !== 'chawl') continue; // plazas, arches and forecourts are open ground: their walls are colliders below
      local.copy(feet).applyMatrix4(e.fp.inv);
      if (local.x > e.fp.x0 + 0.1 && local.x < e.fp.x1 - 0.1 && local.z > e.fp.z0 + 0.1 && local.z < e.fp.z1 - 0.1 && local.y > -0.6 && local.y < 1.6) { out.people.push(`${tag} inside ${e.id}`); break; }
    }
    for (const c of statics) {
      if (dir.dot(c.dir) < (c.cullCos ?? Math.cos((c.radius + 3) / R))) continue;
      if (c.a ? false : n.owner && c.owner === n.owner) continue;
      const cd = c.a ? segmentPoint(c, dir, new V()) : c.dir;
      const d = Math.acos(THREE.MathUtils.clamp(dir.dot(cd), -1, 1)) * R;
      if (d < c.radius * 0.8 && !(n.owner && ownedBy(n.owner, c, W))) { out.people.push(`${tag} inside a collider r=${c.radius.toFixed(2)} @${polarTag(cd)}`); break; }
    }
    for (const c of DYN) {
      if (!c.scenic || dir.dot(c.dir) < Math.cos((c.r + 1) / R)) continue;
      const d = Math.acos(THREE.MathUtils.clamp(dir.dot(c.dir), -1, 1)) * R;
      if (d < Math.min(c.r * 0.5, 0.9)) { out.people.push(`${tag} inside ${c.name}`); break; }
    }
  }
  out.people = [...new Set(out.people)];

  // 3. floating props: the base of the footprint must meet the walkable ground at the centre and at every corner
  for (const e of groups) {
    if (!e.fp || SKIP_FLOAT.has(e.id) || e.kind === 'laundry' || e.kind === 'pole') continue;
    let worst = 0;
    const pts = [[(e.fp.x0 + e.fp.x1) / 2, (e.fp.z0 + e.fp.z1) / 2], ...corners(e.fp, 0.12 * Math.min(e.fp.x1 - e.fp.x0, e.fp.z1 - e.fp.z0))];
    for (const [x, z] of pts) {
      T3.set(x, 0, z).applyMatrix4(e.g.matrixWorld);
      const base = T3.length();
      const gnd = W.planet.getWalkRadius(T3.clone().normalize());
      worst = Math.max(worst, base - Math.max(gnd, W.seaR)); // water counts as support (piers, causeways, pontoons)
    }
    if (worst > (S.items.has(e.id) ? 0.7 : 0.4)) out.floating.push(`${e.id} (${e.kind}) base ${worst.toFixed(2)} above the ground`);
  }
}
const polarTag = (d) => `${(Math.acos(THREE.MathUtils.clamp(d.y, -1, 1)) * R).toFixed(0)}/${Math.round((Math.atan2(d.x, d.z) * 180) / Math.PI)}`;
/** a collider belonging to the prop the person works at (its dir lies within the prop's own footprint) */
function ownedBy(owner, c, W) {
  owner.updateMatrixWorld(true);
  const p = owner.userData.placement;
  if (!p) return false;
  const d = Math.acos(THREE.MathUtils.clamp(p.dir.dot(c.a ? c.a : c.dir), -1, 1)) * R;
  const half = Math.max(owner.userData.pad?.w ?? 2, owner.userData.pad?.d ?? 2, owner.userData.footprint?.w ?? 0, owner.userData.footprint?.l ?? 0);
  void W;
  return d < half;
}
