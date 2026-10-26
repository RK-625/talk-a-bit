// Falaknuma Palace (replaces the Taj hotel; layout id 'taj'). Reference: Wikimedia Commons "Falaknuma Palace 01 / 04".
// A long white Italianate palace: a taller central block with a two-storey white colonnade, balcony and a pedimented crest, two linking wings of
// window rows, two pedimented end pavilions, and a low arched terrace wall with a balustrade (and palms) running along the front on its hilltop plinth.
// Local frame: front +Z. ~22 wide x 6.6 deep.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape, paintBoard, teText, latin } from './kit.js';
import { gable, palm } from './parts.js';

const WALL = 0xdde2e5, TRIM = 0xf8f6ef, SHADE = 0xc3cad0, ROOF = 0xe9e4d6, GRASS = 0x9ccf86;
const BH = 6.4;
const Y0 = 1.1; // hilltop plinth height

function pediment(k, w, h, d, x, y, z) {
  gable(k, TRIM, w, h, d, x, y, z);
  gable(k, WALL, w - 0.7, h - 0.45, d + 0.04, x, y + 0.05, z);
  k.flat(PAL.glassDark, new THREE.Shape().absarc(0, 0, h * 0.2, 0, Math.PI * 2, false), x, y + h * 0.4, z + d / 2 + 0.03);
}

export function createTaj(ink) {
  const k = new Kit(ink, { hatch: 0.15, seed: 21 });
  k.base(23, 7, { color: PAL.stone });
  // hilltop plinth + a green forecourt step
  k.box(SHADE, 22.6, Y0, 6.8, 0, 0, 0);
  k.box(TRIM, 22.8, 0.16, 7.0, 0, Y0, 0);

  const wallBlock = (cx, w, h, d, z0) => { k.box(WALL, w, h, d, cx, Y0 + 0.16, z0); k.box(TRIM, w + 0.2, 0.3, d + 0.2, cx, Y0 + 0.16 + h, z0); };
  // linking wings (two storeys of windows)
  for (const sx of [-1, 1]) {
    const cx = sx * 5.6;
    wallBlock(cx, 3.6, 4.4, 4.6, -0.2);
    k.box(TRIM, 3.7, 0.16, 4.7, cx, Y0 + 2.4, -0.2);
    const f = k.face(cx, Y0 + 0.16, 2.1, 0);
    for (const u of [-1.0, 1.0]) { f.window(u, 0.4, 0.7, 1.5, { glass: PAL.glassDark, frame: TRIM, rect: false, bars: 1 }); f.window(u, 2.8, 0.7, 1.35, { glass: PAL.glassDark, frame: TRIM, rect: true, bars: 1 }); }
    // end pavilion with a pediment
    const px = sx * 9.2;
    wallBlock(px, 3.8, 5.4, 5.0, 0.1);
    k.box(TRIM, 3.9, 0.18, 5.1, px, Y0 + 2.7, 0.1);
    pediment(k, 4.0, 1.3, 0.5, px, Y0 + 0.16 + 5.4 + 0.3, 2.45);
    k.box(ROOF, 3.4, 0.5, 4.2, px, Y0 + 0.16 + 5.7, 0.0);
    const pf = k.face(px, Y0 + 0.16, 2.6, 0);
    for (const u of [-1.1, 0, 1.1]) { pf.window(u, 0.4, 0.7, 1.7, { glass: PAL.glassDark, frame: TRIM, bars: 1 }); pf.window(u, 3.2, 0.7, 1.7, { glass: PAL.glassDark, frame: TRIM, rect: true, bars: 1 }); }
    const sf = k.face(px + sx * 1.9, Y0 + 0.16, 0.1, sx * Math.PI / 2);
    for (const u of [-1.2, 1.2]) { sf.window(u, 0.5, 0.7, 1.6, { glass: PAL.glassDark, frame: TRIM }); sf.window(u, 3.2, 0.7, 1.6, { glass: PAL.glassDark, frame: TRIM, rect: true }); }
  }
  // central block + two-storey colonnade portico
  wallBlock(0, 7.6, BH, 4.8, -0.4);
  k.box(TRIM, 7.7, 0.18, 4.9, 0, Y0 + 3.3, -0.4);
  const cf = k.face(0, Y0 + 0.16, 2.0, 0);
  for (const u of [-2.7, -1.35, 0, 1.35, 2.7]) cf.window(u, 0.3, 0.8, 1.9, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
  // columns: two tiers across the front (ground piers, upper slender columns), balcony balustrade between
  for (let i = 0; i < 6; i++) {
    const x = -3.0 + i * 1.2;
    k.cyl(TRIM, 0.19, 0.21, 2.55, x, Y0 + 0.5, 2.75, { seg: 7 });
    k.box(SHADE, 0.55, 0.14, 0.55, x, Y0 + 0.16, 2.75);
    k.cyl(TRIM, 0.17, 0.19, 2.2, x, Y0 + 3.55, 2.75, { seg: 7 });
    k.box(TRIM, 0.44, 0.14, 0.44, x, Y0 + 5.75, 2.75);
  }
  k.box(TRIM, 7.2, 0.3, 1.5, 0, Y0 + 3.05, 2.5);               // balcony slab
  k.box(TRIM, 7.2, 0.9, 0.12, 0, Y0 + 3.35, 3.2, { outline: false });
  for (let i = 0; i < 14; i++) k.box(WALL, 0.08, 0.9, 0.08, -3.4 + i * 0.52, Y0 + 3.35, 3.2, { outline: false });
  k.box(TRIM, 7.8, 0.5, 1.7, 0, Y0 + 5.9, 2.5);               // entablature
  k.box(WALL, 7.2, 0.2, 1.4, 0, Y0 + 6.4, 2.45, { outline: false });
  pediment(k, 8.0, 1.9, 0.9, 0, Y0 + 6.4, 2.45);
  // crest on the apex
  k.ball(PAL.gold, 0.22, 0, Y0 + 8.45, 2.5, { seg: 6, ring: 4 });
  k.cyl(PAL.gold, 0.04, 0.04, 0.5, 0, Y0 + 8.55, 2.5, { seg: 4 });
  // roof balustrades + a low lantern behind the pediment
  k.box(ROOF, 7.0, 0.5, 3.6, 0, Y0 + 6.5, -1.0);
  k.box(TRIM, 2.6, 0.6, 2.2, 0, Y0 + 7.0, -1.4);

  // the arched terrace wall along the front, with a balustrade and a central stair
  k.box(TRIM, 22.2, 1.3, 0.8, 0, Y0 + 0.16, 3.1);
  const tf = k.face(0, Y0 + 0.16, 3.52, 0);
  for (let i = -5; i <= 5; i++) { if (Math.abs(i) <= 1) continue; tf.window(i * 1.9, 0.12, 1.0, 1.0, { glass: PAL.glassDark, frame: TRIM, sill: false }); }
  k.box(TRIM, 22.4, 0.14, 1.0, 0, Y0 + 1.46, 3.1);
  for (let i = 0; i < 23; i++) k.box(WALL, 0.1, 0.5, 0.1, -10.5 + i * 0.95, Y0 + 1.6, 3.5, { outline: false });
  k.box(TRIM, 22.4, 0.1, 0.14, 0, Y0 + 2.1, 3.5, { outline: false });
  for (let i = 0; i < 4; i++) k.box(i % 2 ? SHADE : TRIM, 2.8 - i * 0.2, 0.3, 0.7, 0, Y0 + 0.16 - 0.3 * (i + 1) + 0.3, 3.9 + i * 0.25);
  // grassed forecourt either side + palms
  for (const sx of [-1, 1]) k.box(GRASS, 8.2, 0.1, 1.8, sx * 6.4, 0, 4.3, { outline: false });
  [[-8.0, 4.6], [-5.0, 4.8], [5.2, 4.8], [8.2, 4.6]].forEach(([x, z], i) => palm(k, x, z, 3.2 + (i % 2) * 0.9, { y0: 0 }));

  // small nameplate (Telugu + English)
  const nb = paintBoard(2.8, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'ఫలక్‌నుమా ప్యాలెస్', W * 0.5, H * 0.5, H * 0.44, { color: '#7a2f2f' }); latin(ctx, 'FALAKNUMA PALACE', W * 0.5, H * 0.92, H * 0.2, { color: '#2b2440' }); }, { seed: 21, px: 90 });
  k.plane(nb, 2.8, 0.55, [4.7, Y0 + 0.9, 3.52], 0);

  const g = k.finish({ lean: 0.004 });
  g.name = 'taj';
  g.userData = {
    footprint: 12,
    height: 10.6,
    colliders: [
      ...lineColliders(-9.6, 0, 9.6, 0, 3.3, BH + 1, 3.0),
      { x: 0, z: 1.5, radius: 3.6, height: 10 },
    ],
  };
  void polyShape;
  return g;
}
