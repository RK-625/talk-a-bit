// Ripon Building (Greater Chennai Corporation): the all-white Neoclassical town hall: three storeys of arched windows between
// paired pilasters, a ground-floor arcade with a pedimented porch, a balustraded roofline, and the central clock tower with a
// white dome. (Replaces the BSE tower; the Triumph of Labour statue is the 'bull' site prop in front of it.) Local frame: front +Z.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape, clockFace, paintBoard, taText, latin } from './kit.js';

const WHITE = 0xfbf9f1, SHADE = 0xe6e0d0, WIN = 0x4c5d6b, BRONZE = 0x35322f, DRUM = 0xcfa98a, DRUM_D = 0xb98f72;
const BW = 10.8, BD = 4.6, FH = 2.45, BH = FH * 3 + 0.3;

function figure(k, x, y, z, lean, ry, { arm = 0 } = {}) {
  // a straining worker: legs, leaning torso, head, two arms reaching to the rock (sloped box/cylinder primitives)
  const c = BRONZE;
  k.cyl(c, 0.07, 0.08, 0.46, x - Math.sin(ry) * 0.05, y, z - Math.cos(ry) * 0.05, { seg: 5, rz: lean * 0.4, outline: false });
  k.cyl(c, 0.07, 0.08, 0.5, x + Math.sin(ry) * 0.1, y, z + Math.cos(ry) * 0.1, { seg: 5, rz: -lean * 0.3, outline: false });
  k.cyl(c, 0.12, 0.1, 0.5, x, y + 0.42, z, { seg: 6, rz: lean, ry });
  k.ball(c, 0.1, x + Math.cos(ry) * Math.sin(lean) * -0.3, y + 0.95, z + Math.sin(ry) * 0.0, { seg: 6, ring: 4 });
  k.cyl(c, 0.04, 0.05, 0.5, x + 0.18, y + 0.8 + arm * 0.25, z, { seg: 4, rz: -1.1 + arm * 0.5, outline: false });
}

export function createBSE(ink) {
  const k = new Kit(ink, { hatch: 0.14, seed: 41 });
  k.base(12, 8, { color: PAL.stone });

  // ---- main block ----
  k.box(WHITE, BW, BH, BD, 0, 0, 0);
  k.box(SHADE, BW + 0.2, 0.5, BD + 0.2, 0, 0, 0);
  for (const y of [FH, FH * 2]) k.box(WHITE, BW + 0.3, 0.2, BD + 0.3, 0, y, 0);
  k.box(WHITE, BW + 0.55, 0.34, BD + 0.55, 0, BH, 0);
  // roof balustrade (posts)
  for (let i = 0; i < 28; i++) { const x = -BW / 2 + 0.2 + (i * (BW - 0.4)) / 27; k.box(WHITE, 0.14, 0.42, 0.14, x, BH + 0.34, BD / 2 + 0.2); k.box(WHITE, 0.14, 0.42, 0.14, x, BH + 0.34, -BD / 2 - 0.2); }
  k.box(WHITE, BW + 0.5, 0.1, 0.2, 0, BH + 0.76, BD / 2 + 0.2);
  // front + back: pairs of pilasters and tall arched windows on each storey
  for (const [oz, ry] of [[BD / 2, 0], [-BD / 2, Math.PI]]) {
    const f = k.face(0, 0, oz, ry);
    for (let s = 0; s < 3; s++) {
      for (let i = -4; i <= 4; i++) {
        const u = i * 1.12;
        if (s === 0 && ry === 0 && Math.abs(u) < 1.9) continue;
        if (s === 1 && ry === 0 && Math.abs(u) < 0.8) continue;
        f.window(u, s * FH + 0.5, 0.62, 1.55, { pointed: false, glass: WIN, frame: WHITE, bars: 1, sill: s > 0, jitter: 0.015 });
      }
      for (let i = -4; i <= 5; i++) f.box(SHADE, (i - 0.5) * 1.12, s * FH + 0.45, 0.14, 1.75, 0.1, 0.02); // pilasters
    }
  }
  for (const sx of [-1, 1]) { const f = k.face(sx * BW / 2, 0, 0, sx * Math.PI / 2); for (let s = 0; s < 3; s++) for (const u of [-1.2, 0, 1.2]) f.window(u, s * FH + 0.5, 0.62, 1.55, { glass: WIN, frame: WHITE, bars: 1 }); }
  // corner pavilions with small pediments
  for (const sx of [-1, 1]) {
    k.extrude(WHITE, polyShape([[-1.4, 0], [1.4, 0], [0, 0.8]]), 0.4, sx * (BW / 2 - 1.5), BH + 0.3, BD / 2 + 0.05);
    k.extrude(WHITE, polyShape([[-1.4, 0], [1.4, 0], [0, 0.8]]), 0.4, sx * (BW / 2 - 1.5), BH + 0.3, -BD / 2 - 0.05, { ry: Math.PI });
  }
  // ---- projecting central porch with arches, pediment and steps ----
  const PW = 4.6, PD = 1.5;
  k.box(WHITE, PW, FH + 0.9, PD, 0, 0, BD / 2 + PD / 2 - 0.05);
  k.box(SHADE, PW + 0.2, 0.3, PD + 0.2, 0, 0, BD / 2 + PD / 2 - 0.05);
  k.box(WHITE, PW + 0.3, 0.26, PD + 0.3, 0, FH + 0.7, BD / 2 + PD / 2 - 0.05);
  k.extrude(WHITE, polyShape([[-PW / 2 - 0.1, 0], [PW / 2 + 0.1, 0], [0, 0.9]]), 0.45, 0, FH + 0.95, BD / 2 + PD - 0.2);
  const pf = k.face(0, 0, BD / 2 + PD - 0.05, 0);
  for (const u of [-1.45, 0, 1.45]) pf.window(u, 0.05, 1.25, 2.2, { glass: 0x2e3a44, frame: WHITE, sill: false, bars: 0 });
  for (let i = 0; i < 4; i++) k.box(SHADE, PW + 0.8 - i * 0.2, 0.15 * (4 - i), 0.5, 0, 0, BD / 2 + PD + 0.1 + i * 0.45);
  pf.plane(paintBoard(1.7, 0.4, '#fbf9f1', '#e6e0d0', (ctx, W, H) => latin(ctx, 'RIPON BUILDINGS', W / 2, H * 0.72, H * 0.52), { px: 90, seed: 8 }), 1.7, 0.4, 0, FH + 0.26, 0.04);

  // ---- clock tower ----
  const TW = 3.0, T0 = BH + 0.34;
  k.box(WHITE, TW, 4.0, TW, 0, T0, 0.2);
  for (const y of [T0 + 0.1, T0 + 2.2]) k.box(SHADE, TW + 0.22, 0.2, TW + 0.22, 0, y, 0.2);
  k.box(WHITE, TW + 0.4, 0.3, TW + 0.4, 0, T0 + 4.0, 0.2);
  const cy = T0 + 3.0;
  for (const [dx, dz, ry] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
    k.plane(clockFace(10, 8), 1.45, 1.45, [dx * (TW / 2 + 0.03), cy, 0.2 + dz * (TW / 2 + 0.03)], ry);
    const f = k.face(dx * (TW / 2), T0, 0.2 + dz * (TW / 2), ry);
    void f;
  }
  const tf = k.face(0, T0, 0.2 + TW / 2, 0);
  tf.window(0, 0.4, 0.7, 1.4, { glass: WIN, frame: WHITE, bars: 1 });
  // corner pinnacle posts + octagonal drum + dome
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { k.cyl(WHITE, 0.14, 0.18, 0.9, sx * (TW / 2 + 0.05), T0 + 4.3, 0.2 + sz * (TW / 2 + 0.05), { seg: 6 }); k.ball(WHITE, 0.16, sx * (TW / 2 + 0.05), T0 + 5.25, 0.2 + sz * (TW / 2 + 0.05), { seg: 6, ring: 4 }); }
  k.cyl(WHITE, 1.15, 1.25, 0.9, 0, T0 + 4.3, 0.2, { seg: 8 });
  for (let i = 0; i < 8; i++) { const a = (i / 8) * 6.283; k.box(WIN, 0.28, 0.5, 0.1, Math.sin(a) * 1.2, T0 + 4.55, 0.2 + Math.cos(a) * 1.2, { ry: a, outline: false }); }
  k.dome(WHITE, 1.3, 0, T0 + 5.15, 0.2, { seg: 12, ring: 6, sy: 1.05 });
  k.cyl(WHITE, 0.08, 0.1, 0.8, 0, T0 + 6.4, 0.2, { seg: 5 });
  k.ball(PAL.gold, 0.12, 0, T0 + 7.25, 0.2, { seg: 5, ring: 4 });
  // the black name board with gold lettering across the roofline below the tower (as in the photos)
  const nm = paintBoard(5.4, 1.0, '#2a2927', '#3a3835', (ctx, W, H) => {
    taText(ctx, 'பெருநகர சென்னை மாநகராட்சி', W / 2, H * 0.5, H * 0.38, { color: '#f0c85a' });
    latin(ctx, 'GREATER CHENNAI CORPORATION', W / 2, H * 0.88, H * 0.26, { color: '#f0c85a' });
  }, { px: 80, seed: 9 });
  k.plane(nm, 5.3, 0.98, [0, BH + 0.95, BD / 2 + 0.45], 0);
  k.box(0x2a2927, 5.5, 1.05, 0.2, 0, BH + 0.4, BD / 2 + 0.3);

  // (the Triumph of Labour bronze stands in front of the Ripon Building as the 'bull' site prop: see props/siteDetails.js createBullStatue)

  const g = k.finish({ lean: 0.006 });
  g.name = 'bse';
  g.userData = {
    footprint: 7,
    height: 15.4,
    colliders: [
      ...lineColliders(-4.4, 0, 4.4, 0, 2.9, 3, 2.9),
      { x: 0, z: 0, radius: 3.0, height: 15 },
      { x: 0, z: 3.2, radius: 1.7, height: 3 },
    ],
  };
  return g;
}
