// Marina Beach modules: Kamarajar Salai buildings (3 variants) + the lighthouse, beach lamp posts, kattumaram boats on the sand, the beach promenade.
// All local frames: y up, base y=0, FRONT (the sea / street side the viewer sees) is +Z.
import * as THREE from 'three';
import { Kit, PAL, glowSprite, lineColliders, rectShape, polyShape, mulberry32, clockFace } from './kit.js';

const TRIM = 0xfffaec;
const RED = 0xc43b34;

// Kamarajar Salai (the Marina beach road) buildings. Three variants, ~7.4 w x 4.8 d: 0 = the cream Senate House look (domed corner
// turrets, red banding), 1 = a red-brick college block with a clock-tower gable, 2 = a white Indo-Saracenic office with domes.
// (Variant 1 is also where scenery.js puts the lighthouse: see createLighthouse.)

function dome(k, color, r, x, y, z, { seg = 8, sy = 1.15 } = {}) {
  k.cyl(0xe9ddc0, r * 0.92, r * 0.98, 0.25, x, y, z, { seg });
  k.dome(color, r, x, y + 0.22, z, { seg, ring: 5, sy });
  k.cone(PAL.gold, r * 0.07, r * 0.5, x, y + 0.22 + r * sy, z, { seg: 5 });
}

export function createArtDeco(ink, variant = 0) {
  if (typeof ink === 'number') { variant = ink; ink = undefined; } // lab: &spec=1
  const vv = ((variant % 3) + 3) % 3;
  const k = new Kit(ink, { hatch: 0.16, seed: 70 + variant });
  const W = 7.4, D = 4.8, FH = 2.2;
  k.base(W + 0.8, D + 0.8, { color: PAL.stone });
  let H;
  if (vv === 0) { // Senate House: pale yellow Byzantine-Romanesque with red-banded storeys and domed corner turrets
    H = 3 * FH;
    const WALL = 0xf4e6b4, BAND = 0xc4503a;
    k.box(WALL, W, H, D, 0, 0, 0);
    k.box(BAND, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
    for (let i = 1; i <= 3; i++) k.box(i === 3 ? TRIM : BAND, W + 0.2, 0.2, D + 0.2, 0, i * FH - 0.2, 0);
    k.box(TRIM, W + 0.45, 0.3, D + 0.45, 0, H, 0);
    // central projecting bay with a gable and a round-arched porch
    k.box(WALL, 3.2, H + 0.9, 1.2, 0, 0, D / 2 + 0.3);
    k.extrude(TRIM, polyShape([[-1.7, 0], [1.7, 0], [0, 1.0]]), 0.4, 0, H + 0.9, D / 2 + 0.3);
    const f = k.face(0, 0, D / 2 + 0.9, 0);
    f.window(0, 0.2, 1.4, 2.2, { glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false });
    for (const i of [1, 2]) f.window(0, i * FH + 0.4, 1.0, 1.4, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
    const ff = k.face(0, 0, D / 2, 0);
    for (let i = 0; i < 3; i++) for (const u of [-2.9, -1.95, 1.95, 2.9]) ff.window(u, i * FH + 0.55, 0.62, 1.3, { glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false });
    for (const sx of [-1, 1]) { // corner turrets with domes
      k.cyl(WALL, 0.7, 0.75, H + 1.0, sx * (W / 2 - 0.1), 0, D / 2 - 0.1, { seg: 8 }); dome(k, 0xb7d3c9, 0.78, sx * (W / 2 - 0.1), H + 1.0, D / 2 - 0.1);
      k.cyl(WALL, 0.7, 0.75, H + 1.0, sx * (W / 2 - 0.1), 0, -D / 2 + 0.1, { seg: 8 }); dome(k, 0xb7d3c9, 0.78, sx * (W / 2 - 0.1), H + 1.0, -D / 2 + 0.1);
    }
    dome(k, 0xb7d3c9, 1.1, 0, H + 0.3, 0, { seg: 10 });
  } else if (vv === 1) { // red-brick college block with a gabled central tower and pointed arches
    H = 3 * FH;
    k.box(RED, W, H, D, 0, 0, 0);
    k.box(TRIM, W + 0.14, 0.4, D + 0.14, 0, 0, 0);
    for (let i = 1; i <= 3; i++) k.box(TRIM, W + 0.16, 0.18, D + 0.16, 0, i * FH - 0.2, 0);
    k.box(TRIM, W + 0.4, 0.28, D + 0.4, 0, H, 0);
    const f = k.face(0, 0, D / 2, 0);
    for (let i = 0; i < 3; i++) for (const u of [-3.0, -2.0, -1.0, 1.0, 2.0, 3.0]) f.window(u, i * FH + 0.55, 0.62, 1.4, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false });
    // central tower, taller, with a white pyramid cap
    k.box(RED, 2.0, H + 2.4, 2.0, 0, 0, 0.9); k.box(TRIM, 2.2, 0.25, 2.2, 0, H + 2.4, 0.9); k.box(TRIM, 2.14, 0.2, 2.14, 0, H - 0.2, 0.9);
    k.add(new THREE.ConeGeometry(1.7, 1.6, 4, 1).rotateY(Math.PI / 4), 0xd2dde3, { pos: [0, H + 2.65 + 0.8, 0.9] });
    const tf = k.face(0, 0, 1.9, 0); tf.window(0, 0.2, 1.1, 2.0, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false });
    k.plane(clockFace(10, 10), 1.0, 1.0, [0, H + 1.3, 1.93], 0);
  } else { // white Indo-Saracenic office: arcaded front, domes and chhatris
    H = 2 * FH + 0.6;
    const WALL = 0xfbf8ee;
    k.box(WALL, W, H, D, 0, 0, 0);
    k.box(0xe8e1cf, W + 0.14, 0.5, D + 0.14, 0, 0, 0);
    k.box(TRIM, W + 0.45, 0.3, D + 0.45, 0, H, 0);
    k.box(TRIM, W + 0.12, 0.16, D + 0.12, 0, FH, 0);
    const f = k.face(0, 0, D / 2, 0);
    for (let i = 0; i < 6; i++) { const u = -3.0 + i * 1.2; f.window(u, 0.5, 0.8, 1.6, { pointed: true, glass: PAL.glassDark, frame: 0xe8e1cf, bars: 1, sill: false }); f.window(u, FH + 0.4, 0.7, 1.4, { pointed: true, glass: PAL.glassDark, frame: 0xe8e1cf, bars: 1 }); }
    dome(k, 0xfffaf0, 1.5, 0, H + 0.3, 0, { seg: 12, sy: 1.0 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { k.cyl(0xe8e1cf, 0.14, 0.17, 1.0, sx * (W / 2 - 0.3), H + 0.3, sz * (D / 2 - 0.3), { seg: 6 }); k.dome(0xfffaf0, 0.35, sx * (W / 2 - 0.3), H + 1.3, sz * (D / 2 - 0.3), { seg: 6, ring: 3 }); }
    // radio mast on the roof
    k.cyl(PAL.stoneDark, 0.04, 0.06, 3.0, 2.3, H + 0.3, -1.0, { seg: 4 });
  }
  // side windows
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const s = k.face(ox, 0, 0, ry);
    for (let i = 0; i < (vv === 2 ? 2 : 3); i++) for (const u of [-1.3, 0, 1.3]) s.window(u, i * FH + 0.8, 0.55, 0.95, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
  }
  const g = k.finish({ lean: 0.006 });
  g.name = `marinaBuilding${variant}`;
  g.userData = {
    footprint: 4.6,
    height: H + 3,
    colliders: [
      { x: -2.4, z: 0.2, radius: 2.4, height: H }, { x: 2.4, z: 0.2, radius: 2.4, height: H },
      { x: 0, z: 0.5, radius: 2.4, height: H },
    ],
  };
  return g;
}

/** The Marina lighthouse: a slender red-and-white banded tower with a gallery, lantern room and mast, plus the low keeper's quarters
 *  beside it. Fits the deco1 footprint (8.8 x 6.2). Local frame: front +Z. */
export function createLighthouse(ink) {
  const k = new Kit(ink, { hatch: 0.14, seed: 88 });
  k.base(8.8, 6.2, { color: PAL.stone });
  // keeper's quarters: low cream block with an orange tile roof
  k.box(0xf6ecd0, 4.6, 2.6, 2.8, -1.8, 0, 1.2);
  k.box(0xe0d4b4, 4.8, 0.4, 3.0, -1.8, 0, 1.2);
  k.add(new THREE.BoxGeometry(5.0, 0.14, 3.2), 0xd0683f, { pos: [-1.8, 2.95, 1.2] });
  k.box(0xf6ecd0, 4.8, 0.3, 3.1, -1.8, 2.6, 1.2);
  const f = k.face(-1.8, 0, 2.6, 0);
  for (const u of [-1.5, -0.5, 0.5, 1.5]) f.window(u, 0.7, 0.6, 1.2, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
  f.window(0, 0.2, 0.4, 0.5, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
  // the tower: five bands, red / white alternating, tapering
  const TX = 2.2, TZ = -0.4, bands = [RED, 0xfdfbf2, RED, 0xfdfbf2, RED];
  let y = 0.0, r = 1.25;
  bands.forEach((c, i) => { const h = 2.5, r2 = r - 0.1; k.cyl(c, r2, r, h, TX, y, TZ, { seg: 10 }); y += h; r = r2; });
  k.cyl(0xe8e1cf, 1.35, 1.2, 0.35, TX, 0, TZ, { seg: 10 });
  // gallery: ring + railing + lantern room with a dome
  k.cyl(0xe8e1cf, r + 0.55, r + 0.45, 0.22, TX, y, TZ, { seg: 12 });
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.283; k.box(PAL.ink, 0.04, 0.4, 0.04, TX + Math.sin(a) * (r + 0.5), y + 0.22, TZ + Math.cos(a) * (r + 0.5), { outline: false }); }
  k.cyl(0xfaf6ea, r + 0.5, r + 0.5, 0.05, TX, y + 0.6, TZ, { seg: 12, outline: false });
  k.cyl(0xfff0b0, r * 0.62, r * 0.62, 0.8, TX, y + 0.22, TZ, { seg: 8 });
  k.cyl(RED, r * 0.7, r * 0.7, 0.18, TX, y + 1.0, TZ, { seg: 8 });
  k.dome(RED, r * 0.7, TX, y + 1.12, TZ, { seg: 8, ring: 4 });
  k.cyl(PAL.ink, 0.03, 0.04, 1.0, TX, y + 1.8, TZ, { seg: 4 });
  k.ball(PAL.gold, 0.1, TX, y + 2.8, TZ, { seg: 5, ring: 4 });
  // a door and slit windows on the tower
  const tf = k.face(TX, 0, TZ + 1.2, 0); tf.window(0, 0.0, 0.5, 1.0, { glass: 0x4a2f2a, frame: TRIM, sill: false });
  for (const [yy, a] of [[3.4, 0.4], [6.4, -0.5], [9.4, 0.2]]) k.box(0x3a3f55, 0.2, 0.5, 0.08, TX + Math.sin(a) * 1.0, yy, TZ + Math.cos(a) * 1.0, { ry: a, outline: false });
  const g = k.finish({ lean: 0.004 });
  g.name = 'marinaLighthouse';
  g.userData = { footprint: 4.6, height: y + 3.4, colliders: [{ x: TX, z: TZ, radius: 1.4, height: y + 1.5 }, { x: -1.8, z: 1.2, radius: 2.4, height: 3 }, { x: -3.0, z: 1.2, radius: 1.8, height: 3 }] };
  return g;
}

let bulbGeoDone = false;
/** Marina beach lamp post: slim dark-green pole with a double crescent arm, two glowing globes + a soft glow sprite. ~5.6 tall. */
export function createStreetlight(ink) {
  const k = new Kit(ink, { hatch: 0.08, thickness: 2.0, seed: 81 });
  const POLE = 0x3f5f52;
  k.cyl(PAL.stoneDark, 0.34, 0.42, 0.3, 0, -0.1, 0, { seg: 8 });
  k.cyl(POLE, 0.1, 0.17, 5.0, 0, 0.2, 0, { seg: 7 });
  k.cyl(0xf3ecd8, 0.2, 0.2, 0.2, 0, 1.0, 0, { seg: 7 });
  k.cyl(PAL.gold, 0.15, 0.15, 0.1, 0, 5.2, 0, { seg: 7 });
  k.add(new THREE.TorusGeometry(0.5, 0.05, 4, 8, Math.PI * 0.6), POLE, { pos: [0.5, 5.0, 0], rot: [0, 0, Math.PI * 0.4] });
  k.add(new THREE.TorusGeometry(0.5, 0.05, 4, 8, Math.PI * 0.6), POLE, { pos: [-0.5, 5.0, 0], rot: [0, Math.PI, Math.PI * 0.4] });
  k.cone(POLE, 0.34, 0.28, 0.5, 5.75, 0, { seg: 8 });
  k.ball(0xfff1b8, 0.3, 0.5, 5.6, 0, { seg: 8, ring: 6, outline: true });
  k.cone(POLE, 0.34, 0.28, -0.5, 5.75, 0, { seg: 8 });
  k.ball(0xfff1b8, 0.3, -0.5, 5.6, 0, { seg: 8, ring: 6, outline: true });
  const g = k.finish({ lean: 0.01 });
  const glow = glowSprite('255,224,140', 3.4);
  glow.position.set(0, 5.6, 0);
  g.add(glow);
  g.name = 'streetlight';
  g.userData = { footprint: 0.6, height: 6, bulb: [0.5, 5.6, 0], colliders: [{ x: 0, z: 0, radius: 0.32, height: 5.5 }] };
  void bulbGeoDone;
  return g;
}

/** A group of kattumarams (the lashed-log fishing rafts) pulled up on the sand with a rolled net and a rudder pole.
 *  count = number of boats (default 3, one big + smaller). ~4.4 wide, ~2 tall. */
export function createKattumaram(ink, count = 3, seed = 5) {
  if (typeof ink === 'number') { count = ink; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed });
  const r = mulberry32(seed * 97 + 3);
  const LOG = [0xcfa36a, 0xbf9358, 0xd9b27a];
  const spots = [[-0.3, -0.1, 0.1], [0.4, 0.55, -0.15], [-0.6, -0.8, 0.45], [1.3, -0.5, 0.2]].slice(0, Math.max(1, count));
  for (const [x, z, yaw] of spots) {
    const len = 3.3 + r() * 0.6;
    for (let i = 0; i < 5; i++) { // logs, middle ones longer, bows lifted
      const lz = (i - 2) * 0.27, ll = len - Math.abs(i - 2) * 0.35;
      k.add(new THREE.CylinderGeometry(0.15, 0.17, ll, 6, 1).rotateZ(Math.PI / 2), LOG[i % 3], { pos: [x + Math.sin(yaw) * lz, 0.2 + (i % 2) * 0.03, z + Math.cos(yaw) * lz], rot: [0, yaw, 0] });
    }
    // upturned bow
    k.add(new THREE.CylinderGeometry(0.1, 0.17, 0.8, 6, 1).rotateZ(Math.PI / 2 + 0.5), LOG[0], { pos: [x - Math.cos(yaw) * (len / 2 + 0.25), 0.55, z + Math.sin(yaw) * (len / 2 + 0.25)], rot: [0, yaw, 0] });
    // lashings
    for (const t of [-0.5, 0, 0.5]) k.box(0x6e4a2a, 0.08, 0.1, 1.35, x + Math.cos(yaw) * t * len * 0.6, 0.36, z - Math.sin(yaw) * t * len * 0.6, { ry: yaw, outline: false });
  }
  // a rolled net and a mast pole with a faded sail folded on it
  k.cyl(0x6bb0c8, 0.22, 0.22, 1.2, 0.2, 0.3, 1.5, { seg: 8, rz: Math.PI / 2 });
  k.cyl(0xe4d8b8, 0.05, 0.06, 2.3, -1.6, 0.3, 1.1, { seg: 5, rz: 0.25 });
  k.flat(0xf3e9c9, polyShape([[0, 0], [1.2, 0.25], [0, 0.9]]), -1.55, 1.2, 1.12, { ry: 0.2 });
  k.box(PAL.stoneDark, 4.4, 0.4, 3.0, 0, -0.4, 0.2, { outline: false }); // sand bank under it
  const g = k.finish({ lean: 0 });
  g.name = 'kattumaram';
  g.userData = { footprint: 2.6, height: 1.8, colliders: [{ x: 0, z: 0, radius: 1.8, height: 0.9 }] };
  return g;
}

/** Straight promenade piece along X (centred), sea wall on the +Z (sea) side, paved deck behind it. */
export function createPromenadeSegment(ink, length = 4) {
  if (typeof ink === 'number') { length = ink; ink = undefined; } // also accepts createPromenadeSegment(length)
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 91 });
  const L = length;
  // foundation + deck
  k.box(PAL.plinth, L, 1.05, 4.2, 0, -1.0, -0.4);
  k.box(0xd9cdb8, L, 0.07, 3.0, 0, 0, -0.55);
  const n = Math.max(1, Math.round(L / 1.5));
  for (let i = 0; i < n; i++) k.box(0xb9ad98, 0.05, 0.02, 3.0, -L / 2 + (i + 0.5) * (L / n), 0.07, -0.55, { outline: false }); // paver seams
  k.box(0xb3a999, L, 0.14, 0.3, 0, 0, -2.2); // kerb on the road side
  // sea wall with cap, and a sloping stone apron + boulders going down to the water
  k.box(0xe8dcc0, L, 1.0, 0.55, 0, 0, 1.1);
  k.box(0xf6eedb, L, 0.16, 0.8, 0, 1.0, 1.1);
  k.box(0xd9503f, L, 0.08, 0.84, 0, 1.0, 1.1, { outline: false });   // a red band along the coping
  const m = Math.max(1, Math.round(L / 1.0));
  for (let i = 0; i < m; i++) k.box(0xcfc4ae, 0.06, 0.74, 0.04, -L / 2 + (i + 0.5) * (L / m), 0.1, 1.4, { outline: false });
  k.add(new THREE.BoxGeometry(L, 0.3, 1.5), 0xe9d8a6, { pos: [0, -0.4, 2.1], rot: [0.5, 0, 0] });                   // sand drifting up to the wall
  for (let i = 0; i < 2; i++) k.box(0xdccfb0, Math.min(1.6, L * 0.5), 0.3, 0.4, 0.0, -0.35 + i * 0.28, 1.65 + i * 0.3, { outline: false }); // beach steps
  // alternating bench-height posts along the wall
  const posts = Math.max(2, Math.round(L / 2));
  for (let i = 0; i < posts; i++) k.box(0xf1e9d8, 0.3, 0.3, 0.3, -L / 2 + (i + 0.5) * (L / posts), 1.16, 1.1);
  const g = k.finish({ lean: 0 });
  g.name = 'promenade';
  g.userData = {
    footprint: L / 2 + 1,
    length: L,
    height: 1.2,
    colliders: lineColliders(-L / 2, 1.1, L / 2, 1.1, 0.4, 1.4, 0.6),
    walkable: [{ shape: 'rect', x: 0, z: -0.55, w: L, d: 3.0, y: 0.07 }],
  };
  return g;
}
