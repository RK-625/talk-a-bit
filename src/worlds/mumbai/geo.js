/**
 * mumbai/geo.js: sphere geometry helpers + the geography of Aamchi Mumbai (coastline, roads, rail) as pure data/maths.
 * No scene objects here; layout.js, ground.js and the builders all share this.
 *
 * Coordinates: "polar" (d, b) = d surface units from the spawn (north pole, +Y) along bearing b degrees
 *   (0 = toward world +Z = straight ahead at spawn, +90 = to the player's right = world -X, 180 = behind). polar(d, b) -> unit Vector3.
 * Sea field s(dir): > 0 in the sea, < 0 on land, in surface units from the coast (approx signed distance).
 * Paths: buildPath(dirs, closed) -> { samples:[{dir,tan,left,s}], length, at(s), lateral(s, off), nearest(dir) }
 */
import * as THREE from 'three';
import { noise3 } from '../../engine/planet.js';

export const R = 75;
export const SEA_LEVEL = 0;
export const LAND_H = 0.85; // city plateau height above the sea
const DEG = Math.PI / 180;
const clamp = THREE.MathUtils.clamp;
export const smooth = (x, a, b) => THREE.MathUtils.smoothstep(x, a, b);

export const polar = (d, bDeg, out = new THREE.Vector3()) => {
  const a = d / R, b = bDeg * DEG;
  return out.set(-Math.sin(a) * Math.sin(b), Math.cos(a), Math.sin(a) * Math.cos(b)); // + bearing = toward the player's RIGHT when facing +Z
};
/** geodesic distance in surface units */
export const dist = (a, b) => Math.acos(clamp(a.dot(b), -1, 1)) * R;
export const polarOf = (dir) => ({ d: Math.acos(clamp(dir.y, -1, 1)) * R, b: Math.atan2(-dir.x, dir.z) / DEG });

const _p = new THREE.Vector3(), _t = new THREE.Vector3();
/** distance (units) from dir to the great-circle arc a->b (unit dirs, arc < 180 deg), and optionally the closest point */
export function distSeg(dir, a, b, n, out = null) {
  const k = dir.dot(n);
  _p.copy(dir).addScaledVector(n, -k);
  const l = _p.length();
  let q = null;
  if (l > 1e-6) {
    _p.divideScalar(l);
    if (_t.crossVectors(a, _p).dot(n) >= 0 && _t.crossVectors(_p, b).dot(n) >= 0) q = _p;
  }
  if (!q) q = dir.dot(a) > dir.dot(b) ? a : b;
  if (out) out.copy(q);
  return Math.acos(clamp(dir.dot(q), -1, 1)) * R;
}
export function segment(a, b) {
  const n = new THREE.Vector3().crossVectors(a, b).normalize();
  return { a, b, n };
}

/** tangent step: from unit dir, heading along unit tangent `t`, travel `d` units */
export function stepAlong(dir, t, d, out = new THREE.Vector3()) {
  const a = d / R;
  return out.copy(dir).multiplyScalar(Math.cos(a)).addScaledVector(t, Math.sin(a)).normalize();
}
/** unit tangent at `from` pointing toward `to` */
export function tangentTo(from, to, out = new THREE.Vector3()) {
  out.copy(to).addScaledVector(from, -to.dot(from));
  if (out.lengthSq() < 1e-12) out.set(1, 0, 0).addScaledVector(from, -from.x);
  return out.normalize();
}

// ---------------------------------------------------------------------------------------------------------------------
// Geography: sea = the south ocean, minus the Fort tongue, plus Back Bay, the harbour, Haji Ali's bay and the Sea Link channel
// ---------------------------------------------------------------------------------------------------------------------
const ANTI = polar(R * Math.PI, 0);
const OCEAN_R = 90.5; // coast of the open ocean ~ d = 139 from the spawn

export const GEO = {
  tongue: segment(polar(100, 0), polar(150, 0)), tongueW: 30,
  bay: { c: polar(147, 57), r: 40 },                 // Back Bay (Marine Drive)
  harbour: { c: polar(148, -57), r: 33 },            // Gateway harbour
  hajiBay: { c: polar(146, 90), r: 22 },             // water around Haji Ali
  hajiIsle: { c: polar(146, 90), r: 6.2 },
  channel: { ...segment(polar(172, 138), polar(100, 138)), w: 12 }, // Sea Link channel
  juhu: { c: polar(139, 192), r: 50 },
  chowpatty: { c: polar(128, 28), r: 16 },
};

export function seaField(dir) {
  let s = OCEAN_R - Math.acos(clamp(dir.dot(ANTI), -1, 1)) * R;
  s += 5.5 * noise3(dir.x * 3.1 + 4, dir.y * 3.1, dir.z * 3.1) + 2.2 * noise3(dir.x * 7.7, dir.y * 7.7 + 3, dir.z * 7.7);
  const T = GEO.tongue;
  s = Math.min(s, distSeg(dir, T.a, T.b, T.n) - GEO.tongueW);
  s = Math.max(s, GEO.bay.r - dist(dir, GEO.bay.c));
  s = Math.max(s, GEO.harbour.r - dist(dir, GEO.harbour.c));
  s = Math.max(s, GEO.hajiBay.r - dist(dir, GEO.hajiBay.c));
  const C = GEO.channel;
  s = Math.max(s, C.w - distSeg(dir, C.a, C.b, C.n));
  s = Math.min(s, dist(dir, GEO.hajiIsle.c) - GEO.hajiIsle.r);
  return s;
}

/** 0..1 how sandy/gently sloping the shore is here */
export function beachness(dir) {
  const j = 1 - smooth(dist(dir, GEO.juhu.c), GEO.juhu.r * 0.55, GEO.juhu.r);
  const c = 1 - smooth(dist(dir, GEO.chowpatty.c), GEO.chowpatty.r * 0.5, GEO.chowpatty.r);
  return Math.max(j, c);
}

// ---------------------------------------------------------------------------------------------------------------------
// Paths (roads, rail, bridge approaches): smooth curves through waypoints, sampled every STEP units
// ---------------------------------------------------------------------------------------------------------------------
export const STEP = 1.25;
export function buildPath(dirs, closed = false, step = STEP) {
  const pts = dirs.map((d) => d.clone().normalize().multiplyScalar(R));
  const curve = new THREE.CatmullRomCurve3(pts, closed, 'centripetal');
  const length = curve.getLength();
  const n = Math.max(2, Math.round(length / step));
  const count = closed ? n : n + 1;
  const samples = [];
  const p = new THREE.Vector3(), p2 = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const u = i / n;
    curve.getPointAt(Math.min(1, u), p);
    curve.getPointAt(closed ? (u + 0.5 / n) % 1 : Math.min(1, u + 0.5 / n), p2);
    const dir = p.clone().normalize();
    const tan = p2.clone().sub(p);
    if (!closed && i === count - 1) curve.getPointAt(Math.max(0, u - 0.5 / n), p2), tan.copy(p).sub(p2);
    tan.addScaledVector(dir, -tan.dot(dir)).normalize();
    const left = new THREE.Vector3().crossVectors(dir, tan).normalize(); // up x tangent = the traveller's left
    samples.push({ dir, tan, left, s: u * length });
  }
  const path = {
    samples, closed, length, curve, step: length / n, count,
    /** frame at arc length s (clamped for open paths, wrapped for closed) */
    at(s, out = {}) {
      let u = closed ? ((s % length) + length) % length : clamp(s, 0, length);
      const f = u / path.step;
      const i0 = Math.floor(f) % count, i1 = closed ? (i0 + 1) % count : Math.min(count - 1, i0 + 1);
      const k = f - Math.floor(f);
      const a = samples[i0], b = samples[i1];
      out.dir = (out.dir ?? new THREE.Vector3()).copy(a.dir).lerp(b.dir, k).normalize();
      out.tan = (out.tan ?? new THREE.Vector3()).copy(a.tan).lerp(b.tan, k);
      out.tan.addScaledVector(out.dir, -out.tan.dot(out.dir)).normalize();
      out.left = (out.left ?? new THREE.Vector3()).crossVectors(out.dir, out.tan).normalize();
      out.s = u;
      return out;
    },
    /** point `off` units to the left of the path at s (negative = right) */
    lateral(s, off, out = new THREE.Vector3()) {
      const f = path.at(s, {});
      return stepAlong(f.dir, f.left, off, out);
    },
    /** nearest sample to dir: { i, d (units), lat (signed units, + = left of travel), s } */
    nearest(dir) {
      let best = -2, bi = 0;
      for (let i = 0; i < count; i++) { const dd = samples[i].dir.dot(dir); if (dd > best) { best = dd; bi = i; } }
      const sm = samples[bi];
      const d = Math.acos(clamp(best, -1, 1)) * R;
      _p.copy(dir).addScaledVector(sm.dir, -dir.dot(sm.dir));
      return { i: bi, d, lat: Math.sign(_p.dot(sm.left)) * d, s: sm.s };
    },
  };
  return path;
}

const P = (pairs) => pairs.map(([d, b]) => polar(d, b));

// Sea Link: a great-circle arc across the channel (axis = increasing bearing), ramps up from each shore
export const BRIDGE = (() => {
  const c = polar(125, 138);
  const t = new THREE.Vector3().crossVectors(c, new THREE.Vector3(0, 1, 0)).normalize();
  const half = 34;
  return { center: c, t, half, start: stepAlong(c, t, -half), end: stepAlong(c, t, half), deckH: 5.0, ramp: 20 };
})();

// --- roads (centreline waypoints in polar coords) ---
// kind: 'road' (asphalt + lane dashes), 'lane' (terracotta, no dashes), 'promenade'
export const ROAD_DEFS = {
  ring: { kind: 'road', w: 6.4, closed: true, pts: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((b) => [38, b]) },
  great: { kind: 'road', w: 6.6, closed: false, pts: [[32, 0], [50, 0], [66, 0], [84, 0], [106, 0], [124, 0], [142, 0], [158, 0], [169, 0]] },
  // Marine Drive: an arc round the bay, built below (needs the bay centre)
  east: { kind: 'road', w: 5.6, closed: false, pts: [[32, -58], [50, -58], [66, -55], [82, -52], [98, -49], [112, -47]] },
  // both Sea Link approach roads run straight ONTO the ramp (waypoints along the bridge axis), so the deck always has a road leading onto it
  west: { kind: 'road', w: 5.6, closed: false, dirs: [...P([[32, 92], [56, 98], [80, 104], [102, 109]]), ...[-20, -13, -7, -2, 3].map((k) => stepAlong(BRIDGE.start, BRIDGE.t, k))] },
  juhuRoad: { kind: 'road', w: 5.0, closed: false, dirs: [...[-3, 2, 7, 12].map((k) => stepAlong(BRIDGE.end, BRIDGE.t, k)), ...P([[118, 168], [124, 180], [130, 190]])] },
  // lanes in the chawl district
  laneL: { kind: 'lane', w: 3.4, closed: false, pts: [[4, -90], [12, -90], [22, -90], [38, -90]] },
  laneR: { kind: 'lane', w: 3.4, closed: false, pts: [[4, 90], [12, 90], [22, 90], [38, 90]] },
  laneS: { kind: 'lane', w: 3.4, closed: false, pts: [[4, 180], [12, 180], [22, 180], [38, 180]] },
  laneN: { kind: 'lane', w: 3.8, closed: false, pts: [[4, 0], [12, 0], [22, 0], [38, 0]] },
};

// Marine Drive: follows the real shoreline of Back Bay. shore(a) = distance from the bay centre to the water's edge at angle
// a degrees about the centre (0 = toward the spawn), smoothed; r(a, off) = that + off units inland.
const bayToPole = tangentTo(GEO.bay.c, new THREE.Vector3(0, 1, 0));
export const bayAngle = (a) => bayToPole.clone().applyAxisAngle(GEO.bay.c, a * DEG);
export const MARINE = (() => {
  const raw = {};
  const STEP_A = 3;
  for (let a = -90; a <= 90; a += STEP_A) {
    let r = 30;
    for (; r < 70; r += 0.4) if (seaField(stepAlong(GEO.bay.c, bayAngle(a), r)) < -1.5) break;
    raw[a] = r;
  }
  const smoothR = {};
  for (let a = -90; a <= 90; a += STEP_A) {
    let sum = 0, n = 0;
    for (let k = -4; k <= 4; k++) { const v = raw[a + k * STEP_A]; if (v !== undefined) { sum += v; n++; } }
    smoothR[a] = sum / n;
  }
  const shore = (a) => {
    const f = THREE.MathUtils.clamp(a, -90, 90);
    const a0 = Math.floor(f / STEP_A) * STEP_A, a1 = Math.min(90, a0 + STEP_A);
    return smoothR[a0] + (smoothR[a1] - smoothR[a0]) * ((f - a0) / STEP_A);
  };
  return { c: GEO.bay.c, span: 56, shore, r: (a, off) => shore(a) + off, pt: (a, off) => stepAlong(GEO.bay.c, bayAngle(a), shore(a) + off) };
})();
{
  const drive = [], prom = [];
  for (let a = -MARINE.span; a <= MARINE.span + 0.1; a += 12) drive.push(MARINE.pt(a, 11));
  for (let a = -MARINE.span + 6; a <= MARINE.span - 6 + 0.1; a += 12) prom.push(MARINE.pt(a, 1.6));
  ROAD_DEFS.marine = { kind: 'road', w: 7.0, closed: false, pts: null, dirs: drive };
  ROAD_DEFS.promenade = { kind: 'promenade', w: 5.2, closed: false, pts: null, dirs: prom };
}

// --- rail: a loop round the spawn with a straight great-circle stretch for the station ---
export const RAIL_RADIUS = 56;
export const STATION_B = 33; // bearing of the station on the rail
function railWaypoints() {
  const out = [];
  const c0 = polar(RAIL_RADIUS, STATION_B);
  // straight (great-circle) stretch through the station tangent to the circle of radius RAIL_RADIUS
  const t0 = new THREE.Vector3().crossVectors(c0, new THREE.Vector3(0, 1, 0)).normalize(); // direction of travel: bearing increasing
  for (const off of [-24, -12, 0, 12, 24]) out.push(stepAlong(c0, t0, off));
  // then round the rest of the circle (clockwise: bearing increasing)
  const bEnd = polarOf(out[out.length - 1]).b;
  const bStart = polarOf(out[0]).b;
  let b = bEnd + 38;
  const target = bStart + 360 - 38;
  while (b < target - 1) { out.push(polar(RAIL_RADIUS + 1.2 * Math.sin(b * DEG * 2), b)); b += 36; }
  return out;
}
ROAD_DEFS.rail = { kind: 'rail', w: 3.8, closed: true, pts: null, dirs: railWaypoints() };

export const PATHS = {};
for (const [id, def] of Object.entries(ROAD_DEFS)) {
  const dirs = def.dirs ?? P(def.pts);
  PATHS[id] = buildPath(dirs, def.closed);
  PATHS[id].id = id; PATHS[id].kind = def.kind; PATHS[id].w = def.w;
}

// ---- fast "how far is the nearest road / rail / lane" (bounding caps reject far paths) ----
let _caps = null;
export function pathNearest(dir, kinds = ['road', 'lane', 'rail', 'promenade']) {
  if (!_caps) {
    _caps = Object.values(PATHS).map((p) => {
      const c = new THREE.Vector3();
      p.samples.forEach((s) => c.add(s.dir));
      c.normalize();
      let ang = 0;
      p.samples.forEach((s) => (ang = Math.max(ang, Math.acos(Math.min(1, c.dot(s.dir))))));
      return { p, c, cos: Math.cos(Math.min(Math.PI, ang + 0.2)) };
    });
  }
  let best = { d: 1e9, p: null, lat: 0, s: 0 };
  for (const { p, c, cos } of _caps) {
    if (!kinds.includes(p.kind) || dir.dot(c) < cos) continue;
    const n = p.nearest(dir);
    if (n.d < best.d) best = { d: n.d, p, lat: n.lat, s: n.s };
  }
  return best;
}

/** the point at bearing b that is `depth` units inland of the coast (sea field = -depth), marching out from the spawn */
export function shorePoint(b, depth = 0) {
  for (let d = 90; d < 200; d += 0.5) { const p = polar(d, b); if (seaField(p) > -depth) return p; }
  return polar(130, b);
}

/** march from a sea point `from` toward `to`; returns the first land point (sea field < -1.5) and the heading used */
export function shoreToward(from, to) {
  const t = tangentTo(from, to);
  for (let d = 0; d < 120; d += 0.5) { const p = stepAlong(from, t, d); if (seaField(p) < -1.5) return { dir: p, heading: t, d }; }
  return { dir: to.clone(), heading: t, d: 0 };
}
