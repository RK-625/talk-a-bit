/**
 * kerala/layout.js: THE map of Nammude Kochi. One readable data file: where every landmark, stall, NPC and prop cluster goes.
 *
 * Reading this file
 *   Conventions: "right"/"fwd" are what the player sees (right = player's right, fwd = ahead) in a REFERENCE frame.
 *   Bearings (polar d,b) live in geo.js: d = surface units from the spawn, b = degrees, 0 = ahead at spawn, + = to the right.
 *
 *   A position spec `at` is one of
 *     { sp:[right,fwd] }                       offsets from the spawn (the chai tapri chowk), facing north at spawn
 *     { polar:[d,b] }
 *     { road:'great', s:50, lat:14 }           arc-length s along a road (geo.js ROAD_DEFS), lat>0 = LEFT of travel (increasing s)
 *     { item:'cst', right:3, fwd:2 }           relative to an already-placed item's frame
 *     { shore:{from:'harbour', to:<at spec>, inland:7} }  a point `inland` units off the waterline of GEO[from] on the way to `to`; faces the water
 *     { arc:'marine', a:-30, off:22 }          Marine Drive: angle `a` degrees about the bay centre (0 = toward the spawn),
 *                                              `off` units inland of the waterline (promenade ~2.5, road ~11, buildings ~22)
 *   Facing `face` (item's front, +Z):  number = yaw degrees turning RIGHT from the reference frame's forward
 *     (spawn: north; road: direction of travel; item: its own facing; polar/arc: toward the spawn / toward the sea for arc),
 *     { to: <at spec> } look at a point,  'road' (roads: toward the road line),  { away: <at spec> }.
 *   `anchor:[x,z]` (object-local) makes the item stand so that THAT point lands on `at` (tapri 'spawn' anchor under Chotu).
 *   Items: { id, kind, at, face, anchor, opts, major }  `kind` is mapped to a factory in scenery.js; `major` = show label on the dev map.
 *
 *   PLACED is filled by resolveAll(): { id, kind, dir, fwd, size:[w,d], radius, major } for the dev map and overlap check.
 *   dev overlap check: scenery.js calls checkOverlaps() in dev and logs any footprint collisions.
 */
import * as THREE from 'three';
import { R, polar, stepAlong, tangentTo, PATHS, MARINE, bayAngle, BRIDGE, GEO, shorePoint, seaField, beachness, pathNearest, dist, shoreToward, RAIL_RADIUS, STATION_B, LAND_H } from './geo.js';
import { frameAt, localToDir } from '../../engine/place.js';
import { mulberry32 } from '../../engine/scatter.js';

const DEG = Math.PI / 180;
const POLE = new THREE.Vector3(0, 1, 0);
const NORTH = new THREE.Vector3(0, 0, 1);

/** footprint rectangle [width, depth] per kind (measured from the assets), used by the overlap check + dev map */
export const SIZE = {
  tapri: [5.6, 4.5], vada: [4.9, 4.0], paanS: [3.2, 2.3], news: [3.8, 2.9], fruit: [3.7, 3.3], marigold: [3.5, 3.0], bhel: [4, 4], gola: [3.8, 3.8],
  irani: [8.3, 9.9], poster: [9.9, 2.9], shrine: [4.8, 5.1], paanShop: [4.1, 4.1], chawl: [10.5, 8.4], banyan: [6, 6], busStop: [6.4, 2.4], balloons: [3.4, 3.7],
  antilia: [23.6, 21.4], gateway: [18, 13], taj: [23.6, 8.9], cst: [29.6, 10.5], bse: [12.5, 10.1], rajabai: [7.6, 7.5], flora: [8.8, 8.8],
  deco0: [8.7, 8.3], deco1: [8.8, 6.2], deco2: [8.7, 6.1], haji: [13, 13], station: [22.2, 6.5], taxi: [2.9, 5.5], dabbaBike: [2, 4],
  palm: [3, 3], toll: [7.6, 4.6], umbrella: [4, 4], sandcastle: [3.5, 3], boat: [2.2, 5.9], signal: [1.2, 2.4], tetra: [4.5, 4.1], streetlight: [1, 1], lamp: [1, 1],
};

// ---------------------------------------------------------------------------------------------------------------------
// resolver
// ---------------------------------------------------------------------------------------------------------------------
const registry = new Map(); // id -> { dir, fwd }
export const PLACED = [];
const tmp = new THREE.Vector3();

function frameOfSpawn() { return frameAt(POLE, NORTH, {}); }
// the player's right is the frame's -x_obj axis: right-offset x_r, forward z -> localToDir(frame, -x_r, z)
function offsetDir(frame, right, fwd, out) { return localToDir(frame, -right, fwd, R, out); }

/** -> { dir, fwd, ref:{fwd, right}, extra } for an `at` spec (fwd = the spec's natural facing) */
export function resolveAt(at) {
  if (at.fixed) return { dir: at.fixed.dir.clone(), fwd: at.fixed.fwd.clone() };
  if (at.sp) {
    const f = frameOfSpawn();
    const dir = offsetDir(f, at.sp[0], at.sp[1], new THREE.Vector3());
    return { dir, fwd: transport(f.up, f.fwd, dir) };
  }
  if (at.polar) {
    const dir = polar(at.polar[0], at.polar[1]);
    return { dir, fwd: tangentTo(dir, POLE) };
  }
  if (at.road) {
    const path = PATHS[at.road];
    const f = path.at(at.s ?? 0, {});
    const dir = at.lat ? stepAlong(f.dir, f.left, at.lat) : f.dir.clone();
    return { dir, fwd: transport(f.dir, f.tan, dir), road: { path, f, lat: at.lat ?? 0 } };
  }
  if (at.item) {
    const it = registry.get(at.item);
    if (!it) throw new Error('layout: unknown item ' + at.item);
    const f = frameAt(it.dir, it.fwd, {});
    const dir = offsetDir(f, at.right ?? 0, at.fwd ?? 0, new THREE.Vector3());
    return { dir, fwd: transport(f.up, f.fwd, dir) };
  }
  if (at.shore) { // a point `inland` units from the waterline of a named bay (GEO key), toward a target spec; faces the water
    const c = GEO[at.shore.from].c;
    const sh = shoreToward(c, resolveAt(at.shore.to).dir);
    const dir = stepAlong(sh.dir, sh.heading, at.shore.inland ?? 0);
    return { dir, fwd: tangentTo(dir, c) };
  }
  if (at.arc) {
    const dir = MARINE.pt(at.a, at.off ?? 0); // `off` units inland of the water's edge at angle a about the bay centre
    // natural facing: toward the bay centre (the sea)
    return { dir, fwd: tangentTo(dir, MARINE.c) };
  }
  throw new Error('layout: bad at ' + JSON.stringify(at));
}

/** parallel-transport tangent `t` at unit `from` to unit `to` (rotate about from x to) */
function transport(from, t, to) {
  const out = t.clone();
  const ax = new THREE.Vector3().crossVectors(from, to);
  const l = ax.length();
  if (l > 1e-9) out.applyAxisAngle(ax.divideScalar(l), Math.acos(THREE.MathUtils.clamp(from.dot(to), -1, 1)));
  return out.addScaledVector(to, -out.dot(to)).normalize();
}

export function resolve(item) {
  const base = resolveAt(item.at);
  let dir = base.dir;
  let fwd = base.fwd;
  const face = item.face ?? (item.at.road ? 'road' : 0);
  if (typeof face === 'number') fwd = fwd.clone().applyAxisAngle(dir, -face * DEG); // + = turn right
  else if (face === 'road') {
    const rd = base.road;
    if (rd && rd.lat) { const p = rd.f.dir; fwd = tangentTo(dir, p); } // toward the road line
    else if (rd) fwd = base.fwd.clone();
  } else if (face.to) fwd = tangentTo(dir, resolveAt(face.to).dir);
  else if (face.away) fwd = tangentTo(dir, resolveAt(face.away).dir).negate();
  if (item.yaw) fwd.applyAxisAngle(dir, -item.yaw * DEG);
  if (item.anchor) { // shift so the anchor point (object-local x_obj, z) lands on `dir`
    const f = frameAt(dir, fwd, {});
    const d2 = stepAlong(dir, tmp.copy(f.right).multiplyScalar(-item.anchor[0]).addScaledVector(f.fwd, -item.anchor[1]).normalize(), Math.hypot(item.anchor[0], item.anchor[1]));
    dir = d2;
  }
  fwd = fwd.clone().addScaledVector(dir, -fwd.dot(dir)).normalize();
  return { dir, fwd };
}

/** resolve + register one item (ids must be unique; items may reference earlier ids with {item:id}) */
export function place(item) {
  const r = resolve(item);
  if (item.id) registry.set(item.id, r);
  const size = item.size ?? SIZE[item.kind] ?? [2, 2];
  PLACED.push({ id: item.id ?? item.kind, kind: item.kind, dir: r.dir, fwd: r.fwd, size, radius: Math.hypot(size[0], size[1]) / 2, major: !!item.major, noOverlap: item.noOverlap, inside: item.inside, noPad: item.noPad, onRoad: item.onRoad });
  return { ...item, dir: r.dir, fwd: r.fwd };
}
export const placed = (id) => registry.get(id);

// ---------------------------------------------------------------------------------------------------------------------
// the data
// ---------------------------------------------------------------------------------------------------------------------
const S = (right, fwd) => ({ sp: [right, fwd] });
const toS = (right, fwd) => ({ to: { sp: [right, fwd] } });

/** the Churchgate-style station on the rail straight: platform centre + facing (+Z = track side, +X = direction of travel) */
export const STATION = (() => {
  const path = PATHS.rail;
  const sc = path.nearest(polar(RAIL_RADIUS, STATION_B)).s;
  const f = path.at(sc, {});
  const z = new THREE.Vector3().crossVectors(f.tan, f.dir).normalize();
  return { s: sc, dir: stepAlong(f.dir, z, -4.7), fwd: z, railDir: f.dir.clone(), tan: f.tan.clone() };
})();

/** Landmarks, shops, stalls, big props. Order matters only for {item:id} references. */
export const ITEMS = [
  // ---- the chowk: Chotu's chai tapri and the lane around it ------------------------------------------------------
  { id: 'tapri', kind: 'tapri', at: S(0, 0), anchor: [0.4, 2.7], face: 180, major: true },
  { id: 'vada', kind: 'vada', at: S(-9, 4.5), face: toS(0, 0), major: true },
  { id: 'paanStall', kind: 'paanS', at: S(8.8, 6), face: toS(0, 0) },
  { id: 'news', kind: 'news', at: S(9.8, -3.5), face: toS(0, 0) },
  { id: 'fruit', kind: 'fruit', at: S(-9.6, -5.2), face: toS(0, 0) },
  { id: 'marigold', kind: 'marigold', at: S(4.6, -6.4), face: toS(0, 0) },
  { id: 'irani', kind: 'irani', at: S(20.5, 4), face: toS(0, 0), major: true },
  { id: 'poster', kind: 'poster', at: S(0, -13.2), face: 0, major: true },
  { id: 'shrine', kind: 'shrine', at: S(-14.2, 10.6), face: toS(0, 0) },
  { id: 'paanShop', kind: 'paanShop', at: S(14.5, -8.5), face: toS(0, 0) },
  // chawl ring around the chowk (front/balcony faces the chowk)
  { id: 'ch1', kind: 'chawl', opts: { seed: 1 }, at: S(-8, 17.5), face: 180 },
  { id: 'ch2', kind: 'chawl', opts: { seed: 2 }, at: S(7.5, 18), face: 180 },
  { id: 'ch3', kind: 'chawl', opts: { seed: 3 }, at: S(-23, 7.5), face: 90 },
  { id: 'ch4', kind: 'chawl', opts: { seed: 4 }, at: S(-22, -13), face: 90 },
  { id: 'ch5', kind: 'chawl', opts: { seed: 5 }, at: S(22, -12), face: -90 },
  { id: 'ch6', kind: 'chawl', opts: { seed: 6 }, at: S(-8, -26), face: 0 },
  { id: 'ch7', kind: 'chawl', opts: { seed: 7 }, at: S(9, -26), face: 0 },
  // cricket gully (left lane): stumps + 3 kids are NPCs; the stumps are a scatter prop
  { id: 'laundry1', kind: 'laundry', at: S(-15.5, 0), face: 90, opts: { length: 8 }, noOverlap: true },
  { id: 'pole1', kind: 'pole', at: S(-9.5, 7.2), face: 0, noOverlap: true },
  { id: 'pole2', kind: 'pole', at: S(12, 11), face: 0, noOverlap: true },
  { id: 'pole3', kind: 'pole', at: S(-17.5, -8), face: 0, noOverlap: true },

  // ---- the Fort: Hutatma-chowk end of the Great Road (roads: 'great') --------------------------------------------
  { id: 'rajabai', kind: 'rajabai', at: { road: 'great', s: 42, lat: 17 }, major: true },
  { id: 'bse', kind: 'bse', at: { road: 'great', s: 50, lat: -17 }, major: true },
  { id: 'flora', kind: 'flora', at: { road: 'great', s: 66, lat: 15 }, face: 0, major: true },
  { id: 'fortChawlA', kind: 'chawl', opts: { seed: 11 }, at: { road: 'great', s: 36, lat: -13 } },
  { id: 'fortChawlB', kind: 'chawl', opts: { seed: 12 }, at: { road: 'great', s: 64, lat: -16 } },
  { id: 'fortChawlC', kind: 'chawl', opts: { seed: 13 }, at: { road: 'great', s: 80, lat: 16 } },
  { id: 'fortChawlD', kind: 'chawl', opts: { seed: 14 }, at: { road: 'great', s: 84, lat: -16 } },
  { id: 'busStopFort', kind: 'busStop', at: { road: 'great', s: 58, lat: 5.4 }, face: 'road' },
  // taxi stand
  { id: 'parkedTaxi', kind: 'taxi', at: { road: 'great', s: 72, lat: -6.4 }, face: 0 },
  { id: 'dabbaBike', kind: 'dabbaBike', at: { road: 'great', s: 70, lat: 7 }, face: 90 },

  // ---- CST (east road) -------------------------------------------------------------------------------------------
  { id: 'cst', kind: 'cst', at: { road: 'east', s: 54, lat: -18.5 }, major: true },
  { id: 'cstBusStop', kind: 'busStop', at: { road: 'east', s: 46, lat: 5.2 }, face: 'road' },
  { id: 'eastChawl2', kind: 'chawl', opts: { seed: 16 }, at: { road: 'east', s: 60, lat: 12 } },

  // ---- the Gateway and the Taj (tip of the tongue, end of the Great Road) ----------------------------------------
  { id: 'antilia', kind: 'antilia', at: { road: 'west', s: 47, lat: -21 }, face: 'road', major: true },
  { id: 'gateway', kind: 'gateway', at: { shore: { from: 'harbour', to: { road: 'great', s: 138, lat: 0 }, inland: 9.8 } }, major: true },
  { id: 'taj', kind: 'taj', at: { road: 'great', s: 112, lat: 15.5 }, face: -90, major: true },
  { id: 'balloons', kind: 'balloons', at: { road: 'great', s: 125, lat: -7 }, face: 0 },

  // ---- Marine Drive (angle about the bay centre; r = 52 road, 42.4 promenade, 61 buildings) ----------------------
  ...[-46, -33, -20, -7, 6, 19, 32, 45].map((a, i) => ({ id: 'deco' + i, kind: 'deco' + (i % 3), at: { arc: 'marine', a, off: 22 }, face: 0, major: i === 3, opts: { variant: i % 3 } })),

  // ---- Sea Link toll plaza: straddles the west approach road just before the ramp (facing the city-side traffic) ----------
  { id: 'tollBooth', kind: 'toll', at: { road: 'west', s: PATHS.west.length - 13.5, lat: 0 }, face: 180, onRoad: true, noPad: true },

  // ---- Churchgate-style station on the rail (built by rail.js) ---------------------------------------------------
  { id: 'station', kind: 'station', at: { fixed: STATION }, size: [24, 7], major: true, skipScenery: true },
];

// Haji Ali sits on its island: placed by its own centre direction (bridges.js builds the causeway)
export const HAJI = { dir: GEO.hajiIsle.c.clone() };

/** the rail loop and the station live in rail.js; Sea Link in bridges.js. Everything else is data above and below. */
// Juhu beach stalls stand on the sand, 10.5 units inland of the waterline
export const JUHU = { bhel: shorePoint(190, 10.5), gola: shorePoint(196, 10.5) };
export const STALLS_AT_JUHU = { sandAt: GEO.juhu.c.clone() };

/** Filler chawl blocks along the quieter roads so the city does not thin out: skips water, rail, other roads and any placed footprint */
function autoFill(density = 1) {
  const rnd = mulberry32(77);
  const out = [];
  const plan = [['ring', 14, [1, -1]], ['east', 14, [1, -1]], ['west', 18, [1, -1]], ['great', 18, [1, -1]], ['juhuRoad', 10, [1, -1]], ['marine', 8, [-1]]];
  let seed = 30;
  for (const [id, s0, sides] of plan) {
    const path = PATHS[id];
    for (const side of sides) {
      for (let s = s0; s < path.length - 10; s += 12 + rnd() * 5) {
        if (rnd() > density) continue;
        const lat = side * (path.w / 2 + 8.2 + rnd() * 2);
        const cand = resolveAt({ road: id, s, lat });
        if (seaField(cand.dir) > -7 || beachness(cand.dir) > 0.1) continue;
        if (pathNearest(cand.dir, ['rail']).d < 9.5) continue;
        const other = pathNearest(cand.dir, ['road', 'lane', 'promenade']);
        if (other.d < path.w / 2 + 7.5 && other.p !== path) continue;
        if (other.p === path && other.d < path.w / 2 + 6) continue;
        let clash = false;
        for (const p of PLACED) if (dist(cand.dir, p.dir) < p.radius + 6.8) { clash = true; break; }
        if (clash) continue;
        out.push(place({ id: 'fill' + seed, kind: 'chawl', opts: { seed: seed++ }, at: { road: id, s, lat }, face: 'road' }));
      }
    }
  }
  return out;
}

let _resolved = null;
export function resolveAll(density = 1) {
  if (_resolved && _resolved.density === density) return _resolved.items; // ground.js and scenery.js share one resolution
  PLACED.length = 0; registry.clear();
  const items = ITEMS.map(place);
  _resolved = { density, items: items.concat(autoFill(density)) };
  return _resolved.items;
}

/** flat "pads": big flat assets stand on a plane tangent at their centre, so the ground under them is raised to that plane
 *  (plus a skirt) and the hero walks on the same surface the plinth is drawn at. [{dir, fwd, hw, hd}] */
export function padList() {
  return PLACED.filter((p) => !p.noOverlap && !p.noPad && Math.max(p.size[0], p.size[1]) >= 7 && p.kind !== 'banyan')
    .map((p) => ({ id: p.id, dir: p.dir, fwd: p.fwd, hw: p.size[0] / 2 + 1.4, hd: p.size[1] / 2 + 1.8 }));
}

/** simple oriented-rectangle overlap test; logs collisions in dev */
export function checkOverlaps(log = console.warn) {
  const hits = [];
  const rects = PLACED.filter((p) => !p.noOverlap && p.size[0] > 0).map((p) => {
    const f = frameAt(p.dir, p.fwd, {});
    return { p, f };
  });
  const loc = new THREE.Vector3();
  const inRect = (A, B, shrink) => {
    // are any of B's corners (or its centre) inside A's rectangle (and vice versa)?
    const pts = [[0, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (const [sx, sz] of pts) {
      const x = sx * B.p.size[0] / 2 * shrink, z = sz * B.p.size[1] / 2 * shrink;
      const w = localToDir(B.f, x, z, R, new THREE.Vector3());
      // express w in A's frame (tangent-plane approximation)
      loc.copy(w).sub(A.f.up.clone().multiplyScalar(w.dot(A.f.up)));
      const lx = loc.dot(A.f.right) * R, lz = loc.dot(A.f.fwd) * R;
      if (Math.abs(lx) < A.p.size[0] / 2 * shrink && Math.abs(lz) < A.p.size[1] / 2 * shrink) return true;
    }
    return false;
  };
  for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
    const A = rects[i], B = rects[j];
    if (A.p.dir.dot(B.p.dir) < Math.cos((A.p.radius + B.p.radius) / R)) continue;
    if (A.p.inside === B.p.id || B.p.inside === A.p.id || (A.p.inside && A.p.inside === B.p.inside)) continue; // detail props that belong to a bigger site
    if (inRect(A, B, 1.0) || inRect(B, A, 1.0)) hits.push([A.p.id, B.p.id]);
  }
  if (hits.length) log('[kerala layout] footprint overlaps:', hits.map((h) => h.join(' x ')).join(', '));
  else log('[kerala layout] no footprint overlaps');
  return hits;
}
void BRIDGE;
