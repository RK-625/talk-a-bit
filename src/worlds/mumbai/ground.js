/**
 * mumbai/ground.js: the planet's terrain for Mumbai.
 *   heightFn(dir)  gentle land (flat plateau at LAND_H above the sea in the city, soft hills out in the maidan),
 *                  beaches that slope into the sea, quays with a steep edge. Below SEA_LEVEL (0) is water.
 *   colorFn(dir, h, face) per-face pastel + hatch: asphalt roads, footpaths, terracotta lanes, sand, promenade stone,
 *                  green maidan patches, plazas, rail ballast.
 * Everything geographic comes from geo.js (coast + paths) and layout.js (plazas/parks positions).
 */
import * as THREE from 'three';
import { noise3, hash3 } from '../../engine/planet.js';
import { R, LAND_H, GEO, PATHS, seaField, beachness, smooth, dist, polar } from './geo.js';
import { resolveAt, placed } from './layout.js';
import { QUALITY } from '../../engine/quality.js';

const U32 = 4294967295;
const lerp = THREE.MathUtils.lerp;

// ---- terrain ----------------------------------------------------------------------------------------------------------
const RURAL = { c: polar(112, -105), r: 48 }; // left-rear: soft hills (maidan country)
export function heightFn(d) {
  const s = seaField(d);
  const beach = beachness(d);
  const w = lerp(3.4, 20, beach); // shore transition width (beaches slope gently over ~20 units)
  const t = smooth(s, -w * 0.62, w * 0.38); // 0 inland .. 1 deep water
  let h = lerp(LAND_H, -2.4, t);
  if (t < 0.4) {
    const rural = 1 - smooth(dist(d, RURAL.c), RURAL.r * 0.4, RURAL.r);
    const n = noise3(d.x * 2.6 + 3, d.y * 2.6, d.z * 2.6 - 7) * 0.9 + noise3(d.x * 6.2, d.y * 6.2 + 5, d.z * 6.2) * 0.35;
    h += (0.12 + 0.75 * rural) * n * (1 - t / 0.4);
  }
  return h;
}

// ---- palette ----------------------------------------------------------------------------------------------------------
const C = {
  asphalt: new THREE.Color(0xc2bdd6), asphalt2: new THREE.Color(0xb8b3d0),
  foot: new THREE.Color(0xf0e6d4), terra: new THREE.Color(0xe2a889), terra2: new THREE.Color(0xd99a7c),
  sand: new THREE.Color(0xf2dfa8), sand2: new THREE.Color(0xe9d396), prom: new THREE.Color(0xe8dfcd), stone: new THREE.Color(0xdcd2bf),
  green: new THREE.Color(0xb6d99a), green2: new THREE.Color(0xa5cf8f), city: new THREE.Color(0xecd9b8), city2: new THREE.Color(0xe4cba8),
  seabed: new THREE.Color(0xa6cdc8), urban: new THREE.Color(0xe2bfa0), ballast: new THREE.Color(0xcfc3b0), plaza: new THREE.Color(0xeee3cf), wall: new THREE.Color(0xd9ceba),
};
const _c = new THREE.Color(), _t = new THREE.Color();

// ---- features that tint the ground (resolved lazily, after layout) ---------------------------------------------------
let features = null;
function buildFeatures() {
  const zones = []; // { c, r, kind }
  const add = (spec, r, kind) => zones.push({ c: resolveAt(spec).dir, r, kind });
  add({ sp: [0, 0] }, 17, 'terra'); // the chowk
  add({ road: 'great', s: 48, lat: 44 }, 17, 'green'); // Oval maidan beside Rajabai
  add({ road: 'great', s: 86, lat: -34 }, 13, 'green');
  add({ sp: [46, -46] }, 14, 'green');
  add({ sp: [-50, -40] }, 18, 'green');
  add({ sp: [-30, 62] }, 16, 'green');
  add({ road: 'east', s: 40, lat: -18.5 }, 19, 'plaza'); // CST forecourt
  add({ road: 'great', s: 66, lat: 15 }, 11, 'plaza'); // Flora
  add({ road: 'great', s: 132, lat: 0 }, 15, 'plaza'); // Gateway
  add({ road: 'great', s: 112, lat: 15.5 }, 13, 'plaza'); // Taj
  add({ road: 'great', s: 50, lat: -17 }, 10, 'plaza'); // BSE
  // built-up areas read as warmer rose-beige from far away
  for (const [spec, r] of [[{ sp: [0, 0] }, 66], [{ road: 'great', s: 70, lat: 0 }, 46], [{ road: 'great', s: 115, lat: 6 }, 36], [{ road: 'east', s: 40, lat: -10 }, 38], [{ road: 'marine', s: 50, lat: 6 }, 40], [{ road: 'west', s: 40, lat: 0 }, 30]]) add(spec, r, 'urban');
  const cl = { C: GEO.juhu.c };
  void cl;
  // path bounding caps for fast rejection
  const caps = Object.values(PATHS).map((p) => {
    const c = new THREE.Vector3();
    p.samples.forEach((s) => c.add(s.dir));
    c.normalize();
    let ang = 0;
    p.samples.forEach((s) => (ang = Math.max(ang, Math.acos(Math.min(1, c.dot(s.dir))))));
    return { p, c, cos: Math.cos(Math.min(Math.PI, ang + 0.2)) };
  });
  return { zones, caps };
}

const _best = { d: 1e9, p: null, lat: 0 };
function nearestPath(cen, kinds) {
  _best.d = 1e9; _best.p = null;
  for (const { p, c, cos } of features.caps) {
    if (!kinds.includes(p.kind)) continue;
    if (cen.dot(c) < cos) continue;
    const n = p.nearest(cen);
    if (n.d < _best.d) { _best.d = n.d; _best.p = p; _best.lat = n.lat; }
  }
  return _best;
}

export function colorFn(cen, h, f) {
  if (!features) features = buildFeatures();
  const j = (hash3(f, 3, 7) / U32 - 0.5);
  let hatch = 0.28, angle = noise3(cen.x * 3.3 + 70, cen.y * 3.3 - 20, cen.z * 3.3) * 0.7 + j * 0.12;
  if (h < -0.25) { _c.copy(C.seabed).multiplyScalar(1 + j * 0.05); return { color: _c, hatch: 0.1, angle }; }

  // base: warm city ground, mottled
  const m = noise3(cen.x * 4.1 + 11, cen.y * 4.1, cen.z * 4.1 + 2);
  _c.copy(C.city).lerp(C.city2, THREE.MathUtils.clamp(m * 1.2 + 0.5, 0, 1) * 0.8);
  hatch = 0.18 + 0.3 * smooth(m, 0, 0.5);

  // built-up tint first (plazas / lanes / maidans paint over it)
  let urban = 0;
  for (const z of features.zones) if (z.kind === 'urban') { const dd = dist(cen, z.c); if (dd < z.r) urban = Math.max(urban, 1 - smooth(dd, z.r * 0.45, z.r)); }
  if (urban > 0.05) { _c.lerp(C.urban, urban * (0.55 + 0.25 * (m + 0.5))); hatch = Math.max(hatch, 0.3 * urban + 0.18); }
  // green maidan patches + the soft hills in the rural wedge
  let green = 0;
  for (const z of features.zones) {
    const dd = dist(cen, z.c);
    if (dd > z.r + 3) continue;
    const k = 1 - smooth(dd, z.r * 0.78, z.r);
    if (z.kind === 'green') green = Math.max(green, k);
    else if (z.kind === 'terra') { // soft-edged: the colour fades into the city ground over the last quarter of the radius
      const kk = 1 - smooth(dd, z.r * 0.5, z.r);
      if (kk > 0.02) { _t.copy(C.terra).lerp(C.terra2, (m + 0.5) * 0.6); _c.lerp(_t, kk); hatch = lerp(hatch, 0.25, kk); angle = lerp(angle, 0.9 + j * 0.2, kk); }
    } else if (z.kind === 'plaza') {
      const kk = 1 - smooth(dd, z.r * 0.55, z.r);
      if (kk > 0.02) { _t.copy(C.plaza).lerp(C.stone, (m + 0.5) * 0.5); _c.lerp(_t, kk); hatch = lerp(hatch, 0.2, kk); angle = lerp(angle, 0.3 + j * 0.2, kk); }
    }
  }
  const rural = 1 - smooth(dist(cen, RURAL.c), 16, RURAL.r);
  green = Math.max(green, rural * smooth(noise3(cen.x * 3 + 9, cen.y * 3, cen.z * 3 - 4), -0.1, 0.25) * 0.9);
  if (green > 0.4) { _c.copy(C.green).lerp(C.green2, (m + 0.5) * 0.9); hatch = 0.55; angle = noise3(cen.x * 3.3 + 70, cen.y * 3.3 - 20, cen.z * 3.3) * 0.9 + j * 0.12; }

  // shore: sand on the beaches (wide, gently sloping), pale quay stone elsewhere
  const sf = seaField(cen);
  const beach = beachness(cen);
  if (beach > 0.3 && sf > -15) { _c.copy(C.sand).lerp(C.sand2, (m + 0.5) * 0.8); hatch = 0.5; angle = 0.2 + j * 0.2; }
  else if (sf > -3.2) { _c.copy(C.wall); hatch = 0.25; }

  // roads, footpaths, lanes, promenade, rail bed
  const rd = nearestPath(cen, ['road', 'promenade', 'lane', 'rail']);
  if (rd.p) {
    const p = rd.p, d = rd.d;
    if (p.kind === 'road') { // soft edges: colours blend over ~1 unit so the face-sized steps read as pencil, not pixels
      const fc = 1 - smooth(d, p.w / 2 + 0.8, p.w / 2 + 1.9);
      if (fc > 0.02) { _c.lerp(C.foot, fc); hatch = lerp(hatch, 0.15, fc); }
      const ac = 1 - smooth(d, p.w / 2 - 0.7, p.w / 2 + 0.6);
      if (ac > 0.02) { _t.copy(C.asphalt).lerp(C.asphalt2, (m + 0.5) * 0.7); _c.lerp(_t, ac); hatch = lerp(hatch, 0.12, ac); angle = lerp(angle, 1.1 + j * 0.1, ac); }
    } else if (p.kind === 'lane') { if (d <= p.w / 2 + 0.3) { _c.copy(C.terra).lerp(C.terra2, (m + 0.5) * 0.7); hatch = 0.28; angle = 0.8; } }
    else if (p.kind === 'promenade') { if (d <= p.w / 2 + 0.4) { _c.copy(C.prom); hatch = 0.18; angle = 0.4; } }
    else if (p.kind === 'rail') { if (d <= p.w / 2) { _c.copy(C.ballast); hatch = 0.3; angle = 0.2; } }
  }
  _c.multiplyScalar(1 + j * 0.05);
  return { color: _c, hatch, angle };
}

export const PLANET = {
  radius: R, detail: QUALITY.touch ? 52 : 68, heightFn, colorFn, // ~95k (desktop) / ~56k (touch) faces
  sea: { level: 0, color: 0xa4d8d6, hatchColor: 0x3f8aa8, detail: QUALITY.touch ? 26 : 36 },
};
void placed;
