// Kacheguda railway station (replaces CST; layout id 'cst'). Reference: Wikimedia Commons "Kachiguda railway station, Hyderabad" + the vintage view.
// Whitewashed Indo-Saracenic frontage: an open arcade of square pillars under a deep eave, a band of jali (lattice) panels above, a stepped central
// clock tower with a white dome and little chhatris, domed pavilions at the ends, black name boards with yellow Telugu / English lettering.
// Local frame: front +Z. ~27 wide x 9 deep x ~15 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, paintBoard, teText, latin } from './kit.js';
import { clockFace, chhatri, onion, jaliCanvas, pointedShape } from './parts.js';

const WH = 0xf6f3ea, WH_D = 0xdcd7c8, WH_S = 0xc9c3b2, EAVE = 0xe9e4d6;

export { clockFace };

export function createCST(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 31 });
  k.base(27, 10, { color: PAL.stone });
  const jc = jaliCanvas();

  // plinth + long main block
  k.box(WH_S, 27, 0.45, 9.2, 0, 0, -0.1);
  const GY = 0.45, GH = 3.4, UY = 4.45, UH = 3.0;
  k.box(WH_D, 26.4, GH, 4.4, 0, GY, -1.6);                          // concourse wall behind the arcade
  // the arcade: square pillars with a flat lintel + a bracketed eave
  for (let i = 0; i < 18; i++) {
    const x = -13.2 + 0.4 + i * (26.4 - 0.8) / 17;
    k.box(WH, 0.5, GH, 0.5, x, GY, 2.7);
    k.box(WH_S, 0.64, 0.16, 0.64, x, GY, 2.7);
  }
  k.box(WH, 26.6, 0.4, 1.0, 0, GY + GH, 2.55);
  k.box(EAVE, 27.2, 0.2, 2.0, 0, GY + GH + 0.4, 2.7);              // eave (chhajja)
  for (let i = 0; i < 17; i++) k.box(WH_D, 0.16, 0.36, 0.5, -13.0 + i * 1.6, GY + GH + 0.04, 3.52, { outline: false });
  // dark door openings between the pillars
  const bf = k.face(0, GY, 2.2, 0);
  for (let i = -6; i <= 6; i++) bf.window(i * 1.9, 0.0, 1.1, 2.6, { pointed: true, glass: 0x5a4c4a, frame: WH, sill: false, jitter: 0.02 });
  // upper storey: lattice (jali) bands between slim pilasters
  k.box(WH, 26.4, UH, 3.6, 0, UY, -2.1);
  k.box(WH, 27.0, 0.3, 4.0, 0, UY + UH, -2.0);
  for (let i = 0; i < 12; i++) k.box(WH_D, 0.4, UH, 0.3, -12.1 + i * 2.2, UY, -0.2, { outline: false });
  const faces = [];
  for (const sx of [-1, 1]) for (const cx of [4.2, 7.9, 11.6]) if (!(sx < 0 && 0)) faces.push({ w: 3.0, h: 1.55, pos: [sx * cx, UY + 1.55, -0.2 + 0.19], ry: 0 });
  k.planes_(jc, faces);
  // parapet jali
  k.box(WH, 26.2, 0.9, 0.3, 0, UY + UH + 0.3, 0.15);
  k.planes_(jc, [-1, 1].flatMap((sx) => [4.8, 9.5].map((cx) => ({ w: 3.6, h: 0.7, pos: [sx * cx + (sx > 0 ? 0 : 0), UY + UH + 0.7, 0.32], ry: 0 }))));

  // end pavilions: taller blocks with domed chhatris at the corners
  for (const sx of [-1, 1]) {
    const ex = sx * 12.4;
    k.box(WH, 3.4, 3.2, 4.0, ex, UY + UH + 0.3, -1.8);
    k.box(WH_D, 3.6, 0.26, 4.2, ex, UY + UH + 3.5, -1.8);
    const ef = k.face(ex, UY + UH + 0.3, 0.22, 0);
    ef.window(0, 0.5, 1.0, 1.9, { pointed: true, glass: PAL.glassDark, frame: WH_D, bars: 1 });
    chhatri(k, ex - 1.1, UY + UH + 3.76, 0.0, 1.0, { col: WH, light: WH, dome: WH });
    chhatri(k, ex + 1.1, UY + UH + 3.76, 0.0, 1.0, { col: WH, light: WH, dome: WH });
    chhatri(k, sx * 7.6, UY + UH + 1.2, -0.4, 0.9, { col: WH, light: WH, dome: WH });
  }
  // centre: a stepped clock tower
  k.box(WH, 6.2, 3.4, 4.0, 0, UY + UH + 0.3, -1.2);
  k.box(WH_D, 6.5, 0.3, 4.3, 0, UY + UH + 3.7, -1.2);
  const tf = k.face(0, UY + UH + 0.3, 0.82, 0);
  tf.window(0, 0.4, 1.7, 2.6, { pointed: true, glass: PAL.glassDark, frame: WH_D, bars: 1 });
  k.planes_(jc, [{ w: 1.3, h: 0.5, pos: [0, UY + UH + 3.0, 0.86], ry: 0 }]);
  // clock stage
  const CY = UY + UH + 4.0;
  k.box(WH, 3.4, 3.0, 3.4, 0, CY, -1.2);
  k.box(WH_D, 3.8, 0.3, 3.8, 0, CY + 3.0, -1.2);
  const cf = clockFace();
  k.planes_(cf, [
    { w: 1.9, h: 1.9, pos: [0, CY + 1.5, -1.2 + 1.72], ry: 0 }, { w: 1.9, h: 1.9, pos: [0, CY + 1.5, -1.2 - 1.72], ry: Math.PI },
    { w: 1.9, h: 1.9, pos: [1.72, CY + 1.5, -1.2], ry: Math.PI / 2 }, { w: 1.9, h: 1.9, pos: [-1.72, CY + 1.5, -1.2], ry: -Math.PI / 2 },
  ]);
  // corner chhatris on the clock stage, then the drum and dome
  for (const [dx, dz] of [[-1.75, -2.95], [1.75, -2.95], [-1.75, 0.55], [1.75, 0.55]]) chhatri(k, dx, CY + 3.3, dz, 0.85, { col: WH, light: WH, dome: WH });
  k.cyl(WH, 1.05, 1.2, 0.9, 0, CY + 3.3, -1.2, { seg: 8 });
  for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) k.flat(PAL.glassDark, pointedShape(0.3, 0.55), Math.sin(a) * 1.1, CY + 3.5, -1.2 + Math.cos(a) * 1.1, { ry: a });
  onion(k, WH, 1.15, 0, CY + 4.2, -1.2, { seg: 10, tall: 0.95 });
  k.cone(PAL.gold, 0.06, 0.8, 0, CY + 4.2 + 1.45, -1.2, { seg: 4 });

  // name boards (black with yellow lettering), left Telugu, right English
  const nb = (txt, en) => paintBoard(2.3, 0.62, '#1d1b1b', '#2c2828', (ctx, W, H) => {
    if (txt) teText(ctx, txt, W * 0.5, H * 0.7, H * 0.6, { color: '#f6d34a' }); else latin(ctx, en, W * 0.5, H * 0.72, H * 0.5, { color: '#f6d34a' });
  }, { seed: 31, px: 90 });
  k.plane(nb('కాచిగూడ'), 2.3, 0.62, [-5.6, GY + GH + 1.0, 3.6], 0);
  k.plane(nb(null, 'KACHEGUDA'), 2.3, 0.62, [5.6, GY + GH + 1.0, 3.6], 0);

  const g = k.finish({ lean: 0.005 });
  g.name = 'cst';
  g.userData = {
    footprint: 14,
    height: 15.6,
    colliders: [
      ...lineColliders(-13.5, 0, 13.5, 0, 3.4, 6, 3.4),
      { x: 0, z: 0.8, radius: 4.2, height: 8 },
      { x: -12.4, z: 1.5, radius: 3.0, height: 7 }, { x: 12.4, z: 1.5, radius: 3.0, height: 7 },
    ],
  };
  void THREE;
  return g;
}
