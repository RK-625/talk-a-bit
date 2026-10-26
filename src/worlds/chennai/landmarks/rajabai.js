// Madras High Court: the world's second-largest courts complex in red Indo-Saracenic: an orange-red block with white banding,
// a tall central tower crowned by a big bronze-grey ribbed dome, and four slim corner towers with open arcaded tops, smaller
// ribbed domes and gold finials, scalloped arches and pinnacles all round. (Replaces the Rajabai clock tower; same footprint.)
// Local frame: front +Z. 5.8 x 5.8 base, ~15 tall.
import * as THREE from 'three';
import { Kit, PAL, polyShape, bilingualBoard } from './kit.js';

const RED = 0xcf4a33, RED_D = 0xb03a2a, TRIM = 0xf2e7cf, DOME = 0xcdbfa6, DOME_D = 0xa89a82, GOLD = PAL.gold;
const BS = 5.8, BH = 5.2;

function domeCap(k, r, x, y, z, { seg = 10, sy = 1.15 } = {}) {
  k.cyl(RED_D, r * 0.95, r * 1.0, 0.25, x, y, z, { seg });
  k.dome(DOME, r, x, y + 0.2, z, { seg, ring: 6, sy });
  k.cyl(DOME_D, r * 0.1, r * 0.13, r * 0.4, x, y + 0.2 + r * sy, z, { seg: 5 });
  k.ball(GOLD, r * 0.14, x, y + 0.2 + r * sy + r * 0.42, z, { seg: 6, ring: 4 });
}

export function createRajabai(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 51 });
  k.base(7, 7, { color: PAL.stone });

  // main block with banding and a pinnacled roofline
  k.box(RED, BS, BH, BS, 0, 0, 0);
  k.box(TRIM, BS + 0.2, 0.4, BS + 0.2, 0, 0, 0);
  k.box(TRIM, BS + 0.14, 0.16, BS + 0.14, 0, 2.5, 0);
  k.box(TRIM, BS + 0.4, 0.3, BS + 0.4, 0, BH, 0);
  for (let i = 0; i < 9; i++) for (const [ox, oz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const t = -BS / 2 + 0.4 + i * ((BS - 0.8) / 8);
    k.cyl(TRIM, 0.07, 0.1, 0.5, ox ? ox * (BS / 2 + 0.15) : t, BH + 0.3, oz ? oz * (BS / 2 + 0.15) : t, { seg: 5, outline: false });
  }
  for (const [ox, oz, ry] of [[0, BS / 2, 0], [0, -BS / 2, Math.PI], [BS / 2, 0, Math.PI / 2], [-BS / 2, 0, -Math.PI / 2]]) {
    const f = k.face(ox, 0, oz, ry);
    for (const u of [-1.5, 0, 1.5]) {
      f.window(u, 0.55, 0.9, 1.7, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1, sill: false });
      f.window(u, 3.0, 0.8, 1.7, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    }
  }
  // corner towers: square shafts, open arcaded stage, ribbed domes
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (BS / 2), z = sz * (BS / 2), h = BH + 3.0;
    k.box(RED, 1.3, h, 1.3, x, 0, z);
    k.box(TRIM, 1.42, 0.25, 1.42, x, 2.5, z);
    k.box(TRIM, 1.5, 0.3, 1.5, x, BH + 0.3, z);
    // open kiosk on top: four slim pillars + roof slab + dome
    for (const [px, pz] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) k.cyl(TRIM, 0.08, 0.08, 1.6, x + px, BH + 0.6, z + pz, { seg: 5 });
    k.box(TRIM, 1.4, 0.2, 1.4, x, BH + 2.2, z);
    k.box(RED_D, 0.5, 1.0, 0.5, x, BH + 0.6, z, { outline: false });
    domeCap(k, 0.75, x, BH + 2.4, z, { seg: 8 });
    for (const [px, pz] of [[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]]) { k.cyl(TRIM, 0.06, 0.08, 0.5, x + px, BH + 2.4, z + pz, { seg: 4, outline: false }); k.ball(GOLD, 0.06, x + px, BH + 2.95, z + pz, { seg: 4, ring: 3, outline: false }); }
  }
  // the tall central tower
  const T0 = BH + 0.3, TW = 3.0;
  k.box(RED, TW, 3.6, TW, 0, T0, 0);
  k.box(TRIM, TW + 0.2, 0.3, TW + 0.2, 0, T0 + 1.6, 0);
  k.box(TRIM, TW + 0.4, 0.3, TW + 0.4, 0, T0 + 3.6, 0);
  for (const [dx, dz, ry] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
    const f = k.face(dx * TW / 2, T0, dz * TW / 2, ry);
    f.window(0, 0.3, 0.8, 1.2, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    f.window(0, 2.0, 0.7, 1.3, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
  }
  // open pillared lantern stage under the big dome
  const L0 = T0 + 3.9;
  for (let i = 0; i < 8; i++) { const a = (i / 8) * 6.283 + 0.39; k.cyl(TRIM, 0.09, 0.09, 1.2, Math.sin(a) * 1.15, L0, Math.cos(a) * 1.15, { seg: 5 }); }
  k.cyl(RED_D, 1.0, 1.0, 1.0, 0, L0, 0, { seg: 8, outline: false });
  k.cyl(TRIM, 1.45, 1.45, 0.25, 0, L0 + 1.15, 0, { seg: 10 });
  k.dome(DOME, 1.4, 0, L0 + 1.35, 0, { seg: 12, ring: 6, sy: 1.15 });
  for (let i = 0; i < 6; i++) k.add(new THREE.TorusGeometry(1.43, 0.045, 4, 12, Math.PI), DOME_D, { pos: [0, L0 + 1.35, 0], rot: [0, (i / 6) * Math.PI, 0], scale: [1, 1.15, 1] });
  k.cyl(DOME_D, 0.12, 0.2, 0.6, 0, L0 + 1.35 + 1.6, 0, { seg: 6 });
  k.cyl(TRIM, 0.18, 0.18, 0.12, 0, L0 + 1.35 + 2.2, 0, { seg: 6 });
  k.ball(GOLD, 0.2, 0, L0 + 1.35 + 2.45, 0, { seg: 6, ring: 4 });
  // entrance porch with steps and a name board
  k.box(TRIM, 2.2, 1.6, 0.9, 0, 0.3, BS / 2 + 0.35);
  const pf = k.face(0, 0, BS / 2 + 0.8, 0);
  pf.window(0, 0.4, 1.1, 1.6, { pointed: true, glass: 0x3a2f2f, frame: TRIM, sill: false });
  for (let i = 0; i < 3; i++) k.box(PAL.stoneDark, 2.4 - i * 0.1, 0.12 * (3 - i), 0.5, 0, 0, BS / 2 + 0.9 + i * 0.4);
  k.plane(bilingualBoard(3.2, 0.85, 'சென்னை உயர் நீதிமன்றம்', 'MADRAS HIGH COURT', { fill: '#f7eed8', hatch: '#e5d6a4', tc: '#8e2f2a', taSize: 0.4, enSize: 0.22, px: 80 }), 3.1, 0.82, [0, 2.65, BS / 2 + 0.12], 0);

  const g = k.finish({ lean: 0.005 });
  g.name = 'rajabai';
  g.userData = { footprint: 4.3, height: 15.8, colliders: [{ x: 0, z: 0, radius: 3.5, height: 15 }, ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => ({ x: sx * 2.9, z: sz * 2.9, radius: 0.9, height: 8 }))] };
  return g;
}
