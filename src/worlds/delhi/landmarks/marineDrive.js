// Yamuna / boat-club road modules (Marine Drive slots): DDA-style apartment blocks + a Lutyens bungalow (3 variants), cast-iron streetlight, canal-bank viewing
// platform (was tetrapods), canal promenade with a low stone wall and an iron railing.
// All local frames: y up, base y=0, FRONT (the sea / street side the viewer sees) is +Z.
import * as THREE from 'three';
import { Kit, PAL, glowSprite, lineColliders, rectShape, polyShape, mulberry32 } from './kit.js';
import { aptFacade } from './chawl.js';

const TRIM = 0xfdf8ea;
const VARIANTS = [
  { name: 'DDA cream apartments', wall: 0xe2d8c0, accent: 0xb3a88f, floors: 5, apt: true },
  { name: 'DDA grey apartments', wall: 0xd6d0c0, accent: 0xa39d8c, floors: 6, apt: true },
  { name: 'Lutyens bungalow', wall: 0xf4efe0, accent: 0xc9b9a5, floors: 2, apt: false },
];

/** Canal-road buildings (replace the art-deco blocks; layout kinds deco0..2): variant 0/1 DDA-style apartment blocks with balcony parapets,
 *  a water tank and a dish; variant 2 a Lutyens bungalow (flat roof, round-column portico). Footprint ~7.4 w x 4.8 d. */
export function createArtDeco(ink, variant = 0) {
  if (typeof ink === 'number') { variant = ink; ink = undefined; } // lab: &spec=1
  const v = VARIANTS[((variant % 3) + 3) % 3];
  const k = new Kit(ink, { hatch: 0.16, seed: 70 + variant });
  const W = 7.4, D = 4.8, FH = v.apt ? 2.1 : 2.4;
  const H = v.floors * FH + (v.apt ? 0.6 : 0.4);
  k.base(W + 0.8, D + 0.8, { color: PAL.stone });
  k.box(v.wall, W, H, D, 0, 0, 0);
  k.box(v.accent, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
  const f = k.face(0, 0, D / 2, 0);
  let top = H;
  if (v.apt) {
    k.box(TRIM, W + 0.3, 0.3, D + 0.3, 0, H - 0.05, 0);
    const cols = 3;
    const fc = aptFacade(v.wall, v.floors - 1, cols, variant + 1);
    k.planes_(fc, [
      { w: W - 0.3, h: (v.floors - 1) * FH, pos: [0, FH + ((v.floors - 1) * FH) / 2, D / 2 + 0.03], ry: 0 },
      { w: W - 0.3, h: (v.floors - 1) * FH, pos: [0, FH + ((v.floors - 1) * FH) / 2, -D / 2 - 0.03], ry: Math.PI },
    ]);
    // ground-floor shuttered shops/door, balcony slabs with iron grills, a stair tower for the taller block
    for (const u of [-2.4, 0, 2.4]) f.window(u, 0.4, 1.0, 1.7, { rect: true, glass: u === 0 ? 0x6b3b2a : 0x6b7a86, frame: TRIM, bars: 1, sill: false });
    for (let s = 1; s < v.floors; s++) for (const u of [-2.4, 2.4]) {
      f.box(TRIM, u, s * FH + 0.5, 1.5, 0.12, 0.6, 0);
      f.box(PAL.ink, u, s * FH + 0.62, 1.5, 0.04, 0.04, 0.58, { outline: false });
      f.box(PAL.ink, u, s * FH + 1.08, 1.5, 0.04, 0.04, 0.58, { outline: false });
    }
    for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
      const s = k.face(ox, 0, 0, ry);
      for (let i = 1; i < v.floors; i++) for (const u of [-1.3, 1.3]) s.window(u, i * FH + 0.7, 0.55, 0.95, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
    }
    // roof: water tank (Sintex) on a stand + a dish + lift room
    k.box(0xb9ae98, 1.5, 0.45, 1.5, -1.6, H + 0.2, -0.4);
    k.cyl(0x35313f, 0.62, 0.7, 1.1, -1.6, H + 0.65, -0.4, { seg: 12 });
    k.dome(0x35313f, 0.62, -1.6, H + 1.75, -0.4, { seg: 12, ring: 4, sy: 0.55 });
    k.box(0xf1ebdb, 1.6, 1.0, 1.3, 1.8, H + 0.2, -0.6);
    if (variant === 1) { k.cyl(0x6f6a82, 0.05, 0.06, 0.8, 2.9, H + 0.2, 1.4, { seg: 5 }); k.add(new THREE.SphereGeometry(0.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.4), 0xf1ebdb, { pos: [2.9, H + 1.1, 1.4], rot: [-0.9, 0.5, 0], scale: [1, 0.45, 1] }); }
    top = H + 1.6;
  } else {
    // Lutyens bungalow: a white plaster two-storey with a flat roof and a plain parapet, a four-column round portico under a flat pediment, rectangular shuttered windows, a lawn and hedges
    k.box(TRIM, W + 0.3, 0.3, D + 0.3, 0, H - 0.05, 0);
    for (let i = 0; i <= 9; i++) k.box(TRIM, 0.4, 0.28, 0.3, -W / 2 + (i * W) / 9, H + 0.25, D / 2 + 0.05, { outline: false });
    k.box(v.wall, 2.4, 1.0, 1.6, 0, H + 0.25, -0.2);
    for (const u of [-2.6, 2.6]) {
      f.window(u, 0.5, 0.9, 1.5, { rect: true, glass: 0x4f7f95, frame: TRIM, bars: 1 });
      f.window(u, 2.9, 0.9, 1.3, { rect: true, glass: 0x4f7f95, frame: TRIM, bars: 1 });
      f.box(0x3f7f6a, u - 0.7, 2.9, 0.3, 1.3, 0.05, 0.02);
      f.box(0x3f7f6a, u + 0.7, 2.9, 0.3, 1.3, 0.05, 0.02);
    }
    f.window(0, 0.4, 1.0, 2.0, { rect: true, glass: 0x6b3b2a, frame: TRIM, bars: 1, sill: false });
    f.window(0, 2.9, 1.0, 1.3, { rect: true, glass: 0x4f7f95, frame: TRIM, bars: 1 });
    // the portico: four round columns, a flat entablature and a low pediment
    for (const u of [-1.6, -0.55, 0.55, 1.6]) { f.cyl(TRIM, u, 0.05, 0.17, 3.6, 1.4, { seg: 9 }); }
    f.box(TRIM, 0, 3.65, 4.2, 0.3, 1.8, 0);
    f.box(v.wall, 0, 3.95, 3.6, 0.5, 0.2, 0.9);
    f.box(0xc9bda5, 0, 0, 4.4, 0.12, 2.0, 0);
    for (const sx of [-1, 1]) { k.box(PAL.stoneDark, 0.9, 0.5, 0.9, sx * 3.2, 0, D / 2 + 1.7); k.ball(PAL.leaf, 0.5, sx * 3.2, 0.95, D / 2 + 1.7, { seg: 7, ring: 5 }); }
    top = H + 1.4;
  }
  const g = k.finish({ lean: 0.006 });
  g.name = `lakeBuilding${variant}`;
  g.userData = {
    footprint: 4.6,
    height: top + 1,
    colliders: [
      { x: -2.4, z: 0.2, radius: 2.4, height: H }, { x: 2.4, z: 0.2, radius: 2.4, height: H },
      { x: 0, z: 0.5, radius: 2.4, height: H },
    ],
  };
  return g;
}

let bulbGeoDone = false;
/** Lake-road cast-iron streetlight: slim pole, curved arm, glowing globe + soft glow sprite. ~5.6 tall. */
export function createStreetlight(ink) {
  const k = new Kit(ink, { hatch: 0.08, thickness: 2.0, seed: 81 });
  k.cyl(PAL.stoneDark, 0.34, 0.42, 0.3, 0, -0.1, 0, { seg: 8 });
  k.cyl(0x6f6a82, 0.1, 0.17, 5.0, 0, 0.2, 0, { seg: 7 });
  k.cyl(0x6f6a82, 0.2, 0.2, 0.2, 0, 1.0, 0, { seg: 7 });
  k.cyl(PAL.gold, 0.15, 0.15, 0.1, 0, 5.2, 0, { seg: 7 });
  // gentle crescent arm
  k.add(new THREE.TorusGeometry(0.5, 0.05, 4, 8, Math.PI * 0.6), 0x6f6a82, { pos: [0.5, 5.0, 0], rot: [0, 0, Math.PI * 0.4] });
  // lamp head: cap + globe (cream so it reads as lit)
  k.cone(0x6f6a82, 0.34, 0.28, 0.5, 5.75, 0, { seg: 8 });
  k.ball(0xfff1b8, 0.3, 0.5, 5.6, 0, { seg: 8, ring: 6, outline: true });
  const g = k.finish({ lean: 0.01 });
  const glow = glowSprite('255,224,140', 3.0);
  glow.position.set(0.5, 5.6, 0);
  g.add(glow);
  g.name = 'streetlight';
  g.userData = { footprint: 0.6, height: 6, bulb: [0.5, 5.6, 0], colliders: [{ x: 0, z: 0, radius: 0.32, height: 5.5 }] };
  void bulbGeoDone;
  return g;
}

/** Lake-bund viewing platform with an iron railing and reed clumps (replaces the tetrapod cluster; same signature and footprint ~4.4 x 3.6) */
export function createTetrapods(ink, count = 5, seed = 5) {
  if (typeof ink === 'number') { count = ink; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed });
  const r = mulberry32(seed * 97 + 3);
  k.box(0xb6a994, 4.4, 1.3, 3.4, 0, -1.1, -0.2);                     // rubble foundation reaching the lake bed
  k.box(0xd8cdb8, 4.0, 0.5, 3.0, 0, -0.4, -0.2);                     // stone platform
  k.box(0xe8dfca, 4.2, 0.12, 3.2, 0, 0.1, -0.2);                      // cap
  for (let i = 0; i < 4; i++) k.box(0xc9bda5, 0.04, 0.02, 3.0, -1.5 + i, 0.22, -0.2, { outline: false });
  // iron railing along the water side and both ends
  const rail = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0), n = Math.max(2, Math.round(len / 0.7));
    k.box(PAL.ink, 0.07, 0.07, len, (x0 + x1) / 2, 0.88, (z0 + z1) / 2, { ry: a, outline: false });
    k.box(PAL.ink, 0.05, 0.05, len, (x0 + x1) / 2, 0.5, (z0 + z1) / 2, { ry: a, outline: false });
    for (let i = 0; i <= n; i++) k.box(PAL.ink, 0.07, 0.8, 0.07, x0 + ((x1 - x0) * i) / n, 0.22, z0 + ((z1 - z0) * i) / n, { outline: i % 2 === 0 });
  };
  rail(-2.0, 1.2, 2.0, 1.2); rail(-2.0, -1.6, -2.0, 1.2); rail(2.0, -1.6, 2.0, 1.2);
  // a lamp finial on each water-side corner post
  for (const sx of [-1, 1]) k.ball(0xfff1b8, 0.13, sx * 2.0, 1.1, 1.2, { seg: 6, ring: 4 });
  // reeds / cattails at the foot
  for (let i = 0; i < 6; i++) { const x = -2.0 + r() * 4.0, z = 1.5 + r() * 0.5; k.cyl(0x8fbf7a, 0.025, 0.04, 0.9 + r() * 0.5, x, -0.5, z, { seg: 3, outline: false }); k.cyl(0x7a5238, 0.05, 0.05, 0.25, x, 0.2 + r() * 0.3, z, { seg: 5, outline: false }); }
  const g = k.finish({ lean: 0 });
  g.name = 'lakeBund';
  g.userData = { footprint: 2.6, height: 1.6, colliders: [{ x: 0, z: -0.5, radius: 2.0, height: 2.8 }] };
  void count;
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
  // lake bund: a stone wall with a cap (people can sit on it), a gently sloping stone apron and boulders to the water, and a slim
  // iron railing on the water side
  k.box(0xd8cdb8, L, 1.0, 0.55, 0, 0, 1.1);
  k.box(0xe8dfca, L, 0.16, 0.8, 0, 1.0, 1.1);
  const m = Math.max(1, Math.round(L / 1.0));
  for (let i = 0; i < m; i++) k.box(0xb6a994, 0.06, 0.74, 0.04, -L / 2 + (i + 0.5) * (L / m), 0.1, 1.4, { outline: false });
  k.add(new THREE.BoxGeometry(L, 0.3, 1.5), 0xb6a994, { pos: [0, -0.4, 2.1], rot: [0.5, 0, 0] });
  const posts = Math.max(3, Math.round(L / 1.0));
  for (let i = 0; i <= posts; i++) k.box(PAL.ink, 0.07, 0.75, 0.07, -L / 2 + (i / posts) * L, 1.16, 1.46, { outline: false });
  k.box(PAL.ink, L, 0.07, 0.07, 0, 1.9, 1.46, { outline: false });
  k.box(PAL.ink, L, 0.05, 0.05, 0, 1.5, 1.46, { outline: false });
  for (let i = 0; i < 2; i++) k.box(0xe8dfca, 0.3, 0.3, 0.3, -L / 2 + 0.4 + i * (L - 0.8), 1.16, 1.1); // pier caps at the ends
  const g = k.finish({ lean: 0 });
  g.name = 'lakePromenade';
  g.userData = {
    footprint: L / 2 + 1,
    length: L,
    height: 1.2,
    colliders: lineColliders(-L / 2, 1.1, L / 2, 1.1, 0.4, 1.4, 0.6),
    walkable: [{ shape: 'rect', x: 0, z: -0.55, w: L, d: 3.0, y: 0.07 }],
  };
  return g;
}
