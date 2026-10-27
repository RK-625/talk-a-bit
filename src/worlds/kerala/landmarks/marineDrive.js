// Kochi Marine Drive modules: waterfront buildings (3 variants), the lighthouse, lamp posts, small country boats on the shore, the
// backwater walkway with a rainbow-bridge-style arch.
// All local frames: y up, base y=0, FRONT (the water / street side the viewer sees) is +Z.
import * as THREE from 'three';
import { Kit, PAL, glowSprite, lineColliders, rectShape, polyShape, mulberry32, clockFace, paintBoard, taText, latin, bilingualBoard } from './kit.js';

const TRIM = 0xfffaec;
const RED = 0xc43b34;
const TILE = 0xa94a35, TILE_D = 0x853a2b, TIM = 0x6e4a33;

// Marine Drive buildings. Three variants, ~7.4 w x 4.8 d: 0 = a pastel Dutch/Portuguese-style heritage house (ochre walls, white arched
// verandah, hipped tile roof and a front gable), 1 = a modern apartment block with painted balconies (and where scenery.js puts the
// lighthouse: see createLighthouse), 2 = a Kochi shop-house row (flat roof, three storeys, hand-painted Malayalam shop boards).

export function createArtDeco(ink, variant = 0) {
  if (typeof ink === 'number') { variant = ink; ink = undefined; } // lab: &spec=1
  const vv = ((variant % 3) + 3) % 3;
  const k = new Kit(ink, { hatch: 0.16, seed: 70 + variant });
  const W = 7.4, D = 4.8, FH = 2.2;
  k.base(W + 0.8, D + 0.8, { color: PAL.stone });
  let H;
  if (vv === 0) { // heritage house: ochre walls, white arches, tiled hips
    H = 2 * FH + 0.6;
    const WALL = 0xf1d98d, WH = 0xfbf6e6;
    k.box(0xcfc2a0, W + 0.1, 0.45, D + 0.1, 0, 0, 0);
    k.box(WALL, W, H - 0.45, D, 0, 0.45, 0);
    k.box(WH, W + 0.16, 0.16, D + 0.16, 0, FH, 0);
    k.box(TIM, W + 1.0, 0.16, D + 1.0, 0, H, 0);
    k.hip(TILE, W + 1.0, D + 1.0, 2.2, 0, H + 0.1, 0, { inset: 1.6 });
    k.extrude(WH, polyShape([[-1.5, 0], [1.5, 0], [0, 1.2]]), 0.35, 0, H + 0.2, D / 2 + 0.1);
    const f = k.face(0, 0, D / 2, 0);
    for (const u of [-2.6, -1.3, 1.3, 2.6]) { f.window(u, 0.7, 0.8, 1.45, { pointed: false, glass: 0x5a3a2a, frame: WH, bars: 1, sill: false }); }
    f.window(0, 0.4, 1.2, 1.9, { glass: 0x3b2a20, frame: WH, bars: 1, sill: false });
    for (const u of [-2.6, -1.3, 0, 1.3, 2.6]) f.window(u, FH + 0.5, 0.7, 1.35, { rect: true, glass: 0x7a4a30, frame: WH, bars: 1 });
    // verandah: white round columns under a lean-to tile roof
    k.add(new THREE.BoxGeometry(W - 0.4, 0.12, 1.5), TILE_D, { pos: [0, 2.0, D / 2 + 0.65], rot: [0.26, 0, 0] });
    for (let i = 0; i < 6; i++) k.cyl(WH, 0.1, 0.11, 1.95, -3.0 + i * 1.2, 0.0, D / 2 + 1.3, { seg: 8 });
  } else if (vv === 1) { // apartment block: balcony floors, a tank, a name board
    H = 4 * FH;
    const WALL = 0xd6ead4, BAND = 0x2f8a86;
    k.box(WALL, W, H, D, 0, 0, 0);
    k.box(BAND, W + 0.1, 0.5, D + 0.1, 0, 0, 0);
    for (let i = 1; i <= 4; i++) k.box(TRIM, W + 0.2, 0.18, D + 0.2, 0, i * FH - 0.18, 0);
    k.box(BAND, W + 0.4, 0.3, D + 0.4, 0, H, 0);
    const f = k.face(0, 0, D / 2, 0);
    for (let i = 0; i < 4; i++) for (const u of [-2.4, 0, 2.4]) {
      f.window(u - 0.35, i * FH + 0.55, 0.7, 1.5, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false });
      if (i > 0) { f.box(TRIM, u, i * FH - 0.1, 1.9, 0.14, 0.9, 0); f.box(0x3f6f9a, u, i * FH + 0.02, 1.9, 0.06, 0.06, 0.8); f.box(0x3f6f9a, u, i * FH + 0.9, 1.9, 0.06, 0.06, 0.8); for (let b = 0; b <= 6; b++) f.box(0x3f6f9a, u - 0.9 + b * 0.3, i * FH + 0.02, 0.04, 0.9, 0.04, 0.8, { outline: false }); }
    }
    k.cyl(0x2a2736, 0.55, 0.6, 1.0, 1.6, H + 0.3, -0.8, { seg: 10 }); k.box(PAL.brick, 1.4, 0.4, 1.4, 1.6, H + 0.3, -0.8, { outline: false });
    k.plane(bilingualBoard(3.4, 0.7, 'മറൈൻ ഡ്രൈവ് റെസിഡൻസി', 'MARINE DRIVE RESIDENCY', { fill: '#fffbe0', hatch: '#f0d880', tc: '#2f6f6a', taSize: 0.42, enSize: 0.2, px: 80 }), 3.4, 0.7, [0, H - 0.6, D / 2 + 0.14], 0);
  } else { // shop-house row: shutters, balcony grills, boards
    H = 3 * FH;
    const WALLS = [0xf3d7a0, 0xf2b6a0, 0xcfe0e6];
    const bw = W / 3;
    for (let i = 0; i < 3; i++) {
      const x = -W / 2 + bw * (i + 0.5);
      k.box(WALLS[i], bw, H - (i === 1 ? 0.4 : 0), D - i * 0.2, x, 0, -i * 0.1);
      k.box(TRIM, bw + 0.06, 0.2, D + 0.1, x, H - (i === 1 ? 0.4 : 0), -i * 0.1);
      const f = k.face(x, 0, D / 2 - i * 0.1, 0);
      f.box(0x8a8f94, 0, 0.05, bw - 0.3, 1.8, 0.08, 0.02);                  // rolled shutter
      for (let r = 0; r < 6; r++) f.box(0x6f7378, 0, 0.25 + r * 0.3, bw - 0.3, 0.03, 0.03, 0.1, { outline: false });
      for (let s = 1; s < 3; s++) { f.window(0, s * FH + 0.5, 0.8, 1.2, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false }); f.box(0x4a6d98, 0, s * FH + 0.02, bw - 0.1, 0.06, 0.06, 0.55); f.box(TRIM, 0, s * FH - 0.1, bw - 0.1, 0.14, 0.6, 0); }
    }
    const SIGNS = [['ബേക്കറി', 'BAKERY', '#e8b84a'], ['മെഡിക്കൽസ്', 'MEDICALS', '#8fd0a0'], ['ഹോട്ടൽ', 'HOTEL', '#f2a0a0']];
    SIGNS.forEach(([ml, en, bg], i) => {
      const x = -W / 2 + bw * (i + 0.5);
      k.plane(paintBoard(bw - 0.2, 0.7, bg, bg, (ctx, Wd, Hh) => { taText(ctx, ml, Wd / 2, Hh * 0.52, Hh * 0.46, { color: '#2b2440', maxW: Wd * 0.9 }); latin(ctx, en, Wd / 2, Hh * 0.93, Hh * 0.28, { color: '#7a2f2f' }); }, { seed: 20 + i, px: 80 }), bw - 0.2, 0.7, [x, 1.72, D / 2 + 0.2 - i * 0.1], 0);
    });
    k.box(0x2a2736, 0.9, 0.9, 0.9, 0.8, H + 0.1, -0.5);                  // water tank
  }
  // side windows
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const s = k.face(ox, 0, 0, ry);
    for (let i = 0; i < (vv === 0 ? 2 : vv === 1 ? 4 : 3); i++) for (const u of [-1.3, 0, 1.3]) s.window(u, i * FH + 0.8, 0.55, 0.95, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
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

/** The Kochi lighthouse (sea-front): a slender red-and-white banded tower with a gallery, lantern room and mast, plus the low keeper's quarters
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
/** Marine Drive lamp post: slim dark-green pole with a double crescent arm, two glowing globes + a soft glow sprite. ~5.6 tall. */
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

/** A few small country boats (vallam: painted wooden canoes with an outboard) pulled up on the shore, with a heap of net, oars and a
 *  plastic fish crate. count = number of boats (default 3, one big + smaller). ~4.4 wide, ~2 tall. (Keeps the old export name.) */
export function createKattumaram(ink, count = 3, seed = 5) {
  if (typeof ink === 'number') { count = ink; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed });
  const r = mulberry32(seed * 97 + 3);
  const HULL = [0x3f7fc0, 0xf2f0e6, 0xd9503f, 0x2f9b8a, 0xe8b84a];
  const spots = [[-0.3, -0.1, 0.1], [0.4, 0.75, -0.15], [-0.6, -0.9, 0.45], [1.3, -0.5, 0.2]].slice(0, Math.max(1, count));
  spots.forEach(([x, z, yaw], i) => {
    const len = 1.5 + r() * 0.25, col = HULL[(i + seed) % HULL.length];
    const o = (dx, dz) => [x + Math.cos(yaw) * dx + Math.sin(yaw) * dz, z - Math.sin(yaw) * dx + Math.cos(yaw) * dz];
    const [cx, cz] = o(0, 0);
    k.ball(col, 1, cx, 0.35, cz, { sx: len, sy: 0.34, sz: 0.46, seg: 10, ring: 6, ry: yaw });
    k.ball(0xf6efd8, 1, cx, 0.52, cz, { sx: len * 0.98, sy: 0.1, sz: 0.42, seg: 10, ring: 4, ry: yaw, outline: false });
    const [bx, bz] = o(-len * 0.95, 0), [sx2, sz2] = o(len * 0.95, 0);
    k.add(new THREE.ConeGeometry(0.2, 0.7, 5, 1).rotateZ(-Math.PI / 2), col, { pos: [sx2, 0.55, sz2], rot: [0, yaw, 0] });  // lifted prow
    k.box(0x3a3f55, 0.3, 0.4, 0.3, bx, 0.45, bz, { ry: yaw });                                                            // outboard motor
    k.rod(PAL.woodDark, [bx, 0.6, bz], [bx, 0.2, bz], 0.03, { outline: false });
    for (const t of [-0.35, 0.35]) { const [tx, tz] = o(t * len, 0); k.box(PAL.wood, 0.1, 0.06, 0.88, tx, 0.62, tz, { ry: yaw, outline: false }); } // thwarts
  });
  // a heap of net, two oars leaning, a fish crate
  k.ball(0x6bb0c8, 0.4, 0.3, 0.3, 1.9, { sy: 0.6, seg: 7, ring: 5 });
  k.rod(PAL.wood, [-1.9, 0.0, 1.2], [-1.6, 1.9, 1.1], 0.04, { seg: 5, outline: true }); k.rod(PAL.wood, [-1.7, 0.0, 1.3], [-1.5, 1.8, 1.2], 0.04, { seg: 5, outline: true });
  k.box(0xe8632f, 0.5, 0.3, 0.4, 1.7, 0, 1.6);
  k.box(PAL.stoneDark, 4.4, 0.4, 3.0, 0, -0.4, 0.2, { outline: false }); // sand bank under it
  const g = k.finish({ lean: 0 });
  g.name = 'kattumaram';
  g.userData = { footprint: 2.6, height: 1.8, colliders: [{ x: 0, z: 0, radius: 1.8, height: 0.9 }] };
  return g;
}

/** Marine Drive's rainbow bridge detail: a walkway portal with a rainbow-banded arch between two slanted white pylons, cables to the
 *  walkway. Spans across the promenade (local X along the walk, Z toward the water): posts at z = -2.4 and +1.4, arch top ~5. */
export function createRainbowArch(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.0, seed: 95 });
  const BANDS = [0xd9503f, 0xf08a3a, 0xf6d548, 0x4fae6a, 0x3f7fc0, 0x4a4fa8, 0x8e4fb0];
  const zc = -0.5, R = 1.9;
  BANDS.forEach((c, i) => k.add(new THREE.TorusGeometry(R + i * 0.1, 0.06, 4, 20, Math.PI), c, { pos: [0, 0.4, zc], rot: [0, Math.PI / 2, 0], scale: [1, 2.3, 1], outline: i === 0 }));
  for (const sz of [-1, 1]) { // slanted white pylons leaning outward + a footing
    k.box(0xe8e4d8, 0.9, 0.3, 0.9, 0, 0, zc + sz * (R + 0.45), { outline: true });
    k.rod(0xfaf6ea, [0, 0.2, zc + sz * (R + 0.55)], [0, 5.0, zc + sz * (R - 0.3)], 0.22, { r2: 0.15, seg: 6, outline: true });
  }
  // cables fanning from the arch crown down to the walkway edge
  for (let i = -3; i <= 3; i++) k.rod(0xcfd3d6, [i * 0.65, 1.0, zc + (i % 2 ? -1.6 : 1.4)], [i * 0.3, 4.6, zc], 0.015, { seg: 3 });
  const g = k.finish({ lean: 0 });
  g.name = 'rainbowArch';
  g.userData = { footprint: 2.4, height: 5.2, colliders: [-1, 1].map((sz) => ({ x: 0, z: zc + sz * (R + 0.5), radius: 0.5, height: 3 })) };
  return g;
}

/** Straight promenade piece along X (centred), sea wall on the +Z (sea) side, paved deck behind it. */
export function createPromenadeSegment(ink, length = 4) {
  if (typeof ink === 'number') { length = ink; ink = undefined; } // also accepts createPromenadeSegment(length)
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 91 });
  const L = length;
  // foundation + deck
  k.box(PAL.plinth, L, 1.05, 4.2, 0, -1.0, -0.4);
  k.box(0xb98a74, L, 0.07, 3.0, 0, 0, -0.55);                                        // red interlock paving
  const n = Math.max(1, Math.round(L / 1.5));
  for (let i = 0; i < n; i++) k.box(0x9d6f5a, 0.05, 0.02, 3.0, -L / 2 + (i + 0.5) * (L / n), 0.07, -0.55, { outline: false }); // paver seams
  k.box(0xb3a999, L, 0.14, 0.3, 0, 0, -2.2); // kerb on the road side
  // sea wall with cap, and a sloping stone apron + boulders going down to the water
  k.box(0xe8dcc0, L, 1.0, 0.55, 0, 0, 1.1);
  k.box(0xf6eedb, L, 0.16, 0.8, 0, 1.0, 1.1);
  k.box(0x3f7fc0, L, 0.08, 0.84, 0, 1.0, 1.1, { outline: false });   // a blue band along the coping
  const m = Math.max(1, Math.round(L / 1.0));
  for (let i = 0; i < m; i++) k.box(0xcfc4ae, 0.06, 0.74, 0.04, -L / 2 + (i + 0.5) * (L / m), 0.1, 1.4, { outline: false });
  k.add(new THREE.BoxGeometry(L, 0.3, 1.5), 0xb9c7a0, { pos: [0, -0.4, 2.1], rot: [0.5, 0, 0] });                   // grassy bank down to the backwater
  for (let i = 0; i < 2; i++) k.box(0xcfc6b0, Math.min(1.6, L * 0.5), 0.3, 0.4, 0.0, -0.35 + i * 0.28, 1.65 + i * 0.3, { outline: false }); // landing steps
  // slim steel rail on the wall (white posts + a blue top pipe), as along the real walkway
  for (let i = 0; i <= Math.max(2, Math.round(L / 1.0)); i++) k.box(0xfaf6ea, 0.05, 0.5, 0.05, -L / 2 + i * (L / Math.max(2, Math.round(L / 1.0))), 1.16, 1.32, { outline: false });
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
