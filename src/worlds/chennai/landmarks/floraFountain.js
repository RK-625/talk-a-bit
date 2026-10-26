// Valluvar Kottam: the stone temple-chariot memorial. A tiered carved-stone body on four huge stone wheels (two big, two small
// per side), a balcony with balustrade, a dark inner shrine, an overhanging gold diamond-patterned hip roof topped by a small
// dome, and the colourful striped pillars hanging from its eaves. Two stone elephants flank the front. (Replaces the Flora
// Fountain; same footprint.) Local frame: front +Z. ~8.8 wide, ~8.2 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, bilingualBoard } from './kit.js';

const STONE = 0xb9a68e, STONE_D = 0x9c8a74, STONE_L = 0xd0c0a6, DARK = 0x6e6050, GOLD_R = 0xe2a448, BLUE = 0x3f6fb0;
const BANDS = [0xd9503f, 0xfaf3df, 0x3f7fa8, 0xf0c64a];

function elephant(k, x, z, ry) {
  const c = 0x8c8884;
  const o = (dx, dz) => [x + Math.cos(ry) * dx + Math.sin(ry) * dz, z - Math.sin(ry) * dx + Math.cos(ry) * dz];
  const [bx, bz] = o(0, 0), [hx, hz] = o(0, 0.62), [tx, tz] = o(0, 0.95);
  k.ball(c, 0.46, bx, 0.78, bz, { sx: 0.8, sy: 0.85, sz: 1.25, seg: 8, ring: 6, ry });
  k.ball(c, 0.3, hx, 0.98, hz, { seg: 7, ring: 5 });
  k.cyl(c, 0.07, 0.13, 0.65, tx, 0.18, tz, { seg: 5, rx: -0.2 });
  for (const sx of [-0.2, 0.2]) for (const sz of [-0.3, 0.3]) { const [lx, lz] = o(sx, sz); k.cyl(c, 0.12, 0.14, 0.55, lx, 0, lz, { seg: 5 }); }
  for (const sx of [-0.32, 0.32]) { const [ex, ez] = o(sx, 0.55); k.box(c, 0.05, 0.28, 0.24, ex, 0.95, ez, { outline: false }); }
}

export function createFloraFountain(ink) {
  const k = new Kit(ink, { hatch: 0.12, seed: 61 });
  // garden platform: paved disc with a low stone kerb that doubles as a seat (sitters at |x| = 4.6)
  k.lathe(PAL.stone, [[0, -1.0], [4.5, -1.0], [4.5, 0.0], [4.2, 0.05], [0, 0.05]], 0, 0, 0, { seg: 22 });
  k.lathe(STONE_L, [[4.0, 0.0], [4.0, 0.42], [4.8, 0.42], [4.8, 0.0]], 0, 0, 0, { seg: 22 });
  k.disc(0xe9dfc8, 3.9, 0, 0.06, 0, { seg: 22 });

  // ---- the chariot body ----
  const CW = 4.6, CD = 3.4;
  k.box(STONE_D, CW + 0.3, 0.45, CD + 0.3, 0, 0.1, 0);                         // plinth
  k.box(STONE, CW, 1.35, CD, 0, 0.5, 0);                                      // first tier with carved panels
  for (let i = 0; i < 9; i++) for (const sz of [-1, 1]) k.box(STONE_D, 0.34, 0.5, 0.1, -CW / 2 + 0.3 + i * ((CW - 0.6) / 8), 0.95, sz * (CD / 2 + 0.03), { outline: false });
  k.box(STONE_L, CW + 0.2, 0.18, CD + 0.2, 0, 1.85, 0);
  // flared middle tiers (each wider than the last, like the stepped carving)
  const tiers = [[CW - 0.5, CD - 0.4, 0.85], [CW - 0.2, CD - 0.1, 0.55], [CW + 0.25, CD + 0.3, 0.5], [CW + 0.5, CD + 0.5, 0.4]];
  let y = 2.03;
  tiers.forEach(([w, d, h], i) => { k.box(i % 2 ? STONE_L : STONE, w, h, d, 0, y, 0); y += h; for (let j = 0; j < 7; j++) k.box(STONE_D, 0.22, 0.2, 0.12, -w / 2 + 0.3 + j * ((w - 0.6) / 6), y - h * 0.6, d / 2 + 0.03, { outline: false }); });
  // balcony slab + balustrade
  const BY = y;
  k.box(STONE_L, CW + 1.2, 0.26, CD + 1.0, 0, BY, 0);
  const bw = CW + 1.1, bd = CD + 0.9;
  for (let i = 0; i < 14; i++) { const x = -bw / 2 + i * (bw / 13); k.box(STONE, 0.1, 0.45, 0.1, x, BY + 0.26, bd / 2); k.box(STONE, 0.1, 0.45, 0.1, x, BY + 0.26, -bd / 2); }
  for (let i = 0; i < 9; i++) { const z = -bd / 2 + i * (bd / 8); k.box(STONE, 0.1, 0.45, 0.1, bw / 2, BY + 0.26, z); k.box(STONE, 0.1, 0.45, 0.1, -bw / 2, BY + 0.26, z); }
  k.box(STONE_L, bw + 0.1, 0.1, 0.14, 0, BY + 0.71, bd / 2); k.box(STONE_L, bw + 0.1, 0.1, 0.14, 0, BY + 0.71, -bd / 2);
  // inner shrine (dark carved stone with two openings per side)
  const SY = BY + 0.26;
  k.box(DARK, 3.2, 1.7, 2.2, 0, SY, 0);
  for (const [oz, ry] of [[1.1, 0], [-1.1, Math.PI]]) { const f = k.face(0, SY, oz, ry); for (const u of [-0.75, 0.75]) f.window(u, 0.35, 0.65, 1.0, { rect: true, glass: 0x2a241d, frame: STONE_L, sill: false }); }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.cyl(STONE, 0.14, 0.17, 1.7, sx * 1.5, SY, sz * 1.0, { seg: 6 });
  // ---- overhanging gold hip roof ----
  const RY = SY + 1.75;
  k.box(0x5a7fb8, 5.9, 0.28, 4.9, 0, RY, 0);                                     // blue soffit slab (visible under the eaves)
  k.add(new THREE.ConeGeometry(4.5, 1.9, 4, 1).rotateY(Math.PI / 4).scale(1, 1, 0.78), GOLD_R, { pos: [0, RY + 0.28 + 0.95, 0] });
  for (const [w, d, yy] of [[5.6, 4.6, RY + 0.34], [4.4, 3.6, RY + 0.92]]) k.box(BLUE, w, 0.08, d, 0, yy, 0, { outline: false });
  k.box(0xf5e2a8, 5.9, 0.12, 4.9, 0, RY + 0.28, 0, { outline: false });
  k.dome(0xe8c070, 0.7, 0, RY + 2.1, 0, { seg: 10, ring: 5, sy: 1.0 });
  k.cone(PAL.gold, 0.06, 0.4, 0, RY + 2.8, 0, { seg: 4 });
  // ---- hanging striped pillars round the eaves ----
  const pil = (x, z) => { for (let i = 0; i < 4; i++) k.cyl(BANDS[i % 4], 0.17, 0.17, 0.4, x, RY - 1.55 + 0.4 * (3 - i) + 0.0, z, { seg: 7, outline: i === 0 }); k.cone(0xfaf3df, 0.2, 0.3, x, RY - 1.85, z, { seg: 6, rx: Math.PI, outline: false }); };
  for (const x of [-2.6, -1.3, 0, 1.3, 2.6]) { pil(x, 2.3); pil(x, -2.3); }
  for (const z of [-1.1, 0, 1.1]) { pil(-2.85, z); pil(2.85, z); }

  // ---- the stone wheels: big at the ends, small between them, on both faces ----
  for (const sz of [-1, 1]) {
    const z = sz * (CD / 2 + 0.12);
    for (const [x, r] of [[-1.85, 0.85], [-0.6, 0.45], [0.6, 0.45], [1.85, 0.85]]) {
      k.cyl(STONE, r, r, 0.3, x, r - 0.1 + 0.0, z, { seg: 16, rx: Math.PI / 2 });
      k.cyl(STONE_D, r * 0.32, r * 0.32, 0.42, x, r - 0.1 + 0.0, z, { seg: 8, rx: Math.PI / 2 });
      k.cyl(STONE_L, r * 0.78, r * 0.78, 0.34, x, r - 0.1 + 0.0, z, { seg: 16, rx: Math.PI / 2, outline: false });
      k.cyl(STONE, r * 0.64, r * 0.64, 0.38, x, r - 0.1 + 0.0, z, { seg: 16, rx: Math.PI / 2, outline: false });
    }
  }
  // ---- stone elephants at the front corners + the name plaque ----
  elephant(k, -3.5, 3.0, 0.5); elephant(k, 3.5, 3.0, -0.5);
  k.plane(bilingualBoard(3.4, 0.9, 'வள்ளுவர் கோட்டம்', 'VALLUVAR KOTTAM', { fill: '#efe3c8', hatch: '#d6c293', tc: '#6b3a22', taSize: 0.42, enSize: 0.2, px: 80 }), 3.3, 0.88, [0, 0.82, CD / 2 + 0.2], 0);
  k.box(STONE_D, 3.5, 0.95, 0.12, 0, 0.35, CD / 2 + 0.12, { outline: false });

  const g = k.finish({ lean: 0.003 });
  g.name = 'floraFountain';
  g.userData = {
    footprint: 4.6,
    height: 8.4,
    colliders: [{ x: 0, z: 0, radius: 4.1, height: 1.2 }, { x: 0, z: 0, radius: 3.0, height: 8.2 }, ...lineColliders(-2.4, 0, 2.4, 0, 1.8, 8, 2.0)],
  };
  return g;
}
