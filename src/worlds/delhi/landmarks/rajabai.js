// Qutub Minar (replaces the Rajabai clock tower; layout id 'rajabai'). References: Wikimedia Commons "Qutub Minar in Delhi 03-2016", "View of Qutub Minar (1)", "(3)".
// A very tall tapering FIVE-storey minaret: the lower three storeys red sandstone with deep fluting (round flutes, angular flutes, then star flutes), each storey ending
// in a projecting balcony on dark honeycomb (muqarnas) brackets with a parapet; the top two storeys smooth buff marble-and-sandstone with red bands, capped by a small
// cupola. Beside it stands a piece of the ruined pointed-arch screen. Local frame: front +Z. Pad ~7 x 7, ~19 tall.
import * as THREE from 'three';
import { Kit, PAL, paintBoard, teText, latin } from './kit.js';
import { archWall, pointedShape } from './parts.js';

const RED = 0xc4694a, RED_L = 0xd98a68, RED_D = 0xa2503a, BUFF = 0xebd7ae, BUFF_L = 0xf5e8c8, BUFF_D = 0xcdb588, STONE = 0xd8c39a;
const H = 18.6, R0 = 1.95, R1 = 0.5;
const rAt = (y) => R0 + (R1 - R0) * (y / H);
const STORY = [0, 0.355, 0.60, 0.77, 0.89, 1.0];

export function createRajabai(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 51 });
  k.base(7, 7, { color: PAL.stone });

  // stepped round plinth
  k.cyl(RED_D, 3.0, 3.2, 0.3, 0, 0, 0, { seg: 16 });
  k.cyl(STONE, 2.6, 2.7, 0.22, 0, 0.3, 0, { seg: 16 });
  const Y0 = 0.52;

  for (let s = 0; s < 5; s++) {
    const ya = Y0 + STORY[s] * H, yb = Y0 + STORY[s + 1] * H - 0.55, h = yb - ya;
    const ra = rAt(ya - Y0), rb = rAt(yb - Y0);
    const red = s < 3;
    const col = red ? RED : s === 3 ? BUFF : BUFF_L;
    // the shaft: a tapering drum (angular for storey 2 and 3, smoother otherwise)
    k.cyl(col, rb, ra, h, 0, ya, 0, { seg: s === 1 ? 20 : s === 2 ? 12 : s === 0 ? 12 : 16 });
    // flutes: ribs standing proud of the drum
    if (s <= 2) {
      const n = s === 0 ? 12 : s === 1 ? 20 : 12;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rr = (ra + rb) / 2 + 0.02;
        const wd = (Math.PI * 2 * rr) / n;
        const ang = Math.atan2(ra - rb, h);
        if (s === 1) k.add(new THREE.CylinderGeometry(rb * 0.17 + 0.03, ra * 0.17 + 0.03, h, 5), RED_L, { pos: [Math.sin(a) * rr, ya + h / 2, Math.cos(a) * rr], rot: [0, 0, 0], outline: false });
        else k.add(new THREE.BoxGeometry(wd * 0.42, h, 0.26), s === 0 ? RED_L : RED_D, { pos: [Math.sin(a) * (rr + 0.06), ya + h / 2, Math.cos(a) * (rr + 0.06)], rot: [0, a, 0], outline: false });
        void ang;
      }
    } else {
      // upper storeys: a couple of red bands and a dark band at the top
      k.cyl(RED, rAt(ya - Y0 + h * 0.62) + 0.03, rAt(ya - Y0 + h * 0.48) + 0.03, h * 0.14, 0, ya + h * 0.48, 0, { seg: 16, outline: false });
      k.cyl(RED, rAt(ya - Y0 + h * 0.3) + 0.03, rAt(ya - Y0 + h * 0.18) + 0.03, h * 0.12, 0, ya + h * 0.18, 0, { seg: 16, outline: false });
    }
    // inscription band(s) on the red storeys
    if (red) k.cyl(RED_D, rAt(ya - Y0 + h * 0.5) + 0.08, rAt(ya - Y0 + h * 0.42) + 0.08, h * 0.08, 0, ya + h * 0.42, 0, { seg: s === 1 ? 20 : 12, outline: false });
    // balcony at the top of the storey: dark corbelled underside, deck, parapet
    const br = rb + 0.72;
    k.cyl(RED_D, br * 0.78, rb + 0.08, 0.3, 0, yb, 0, { seg: 14 });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; k.box(BUFF_D, 0.16, 0.26, 0.2, Math.sin(a) * (rb + 0.2), yb + 0.02, Math.cos(a) * (rb + 0.2), { ry: a, outline: false }); }
    k.cyl(col === RED ? RED_L : BUFF_L, br, br, 0.12, 0, yb + 0.3, 0, { seg: 16 });
    k.cyl(col, br - 0.04, br - 0.04, 0.3, 0, yb + 0.42, 0, { seg: 16 });
    k.cyl(col === RED ? RED_L : BUFF_L, br + 0.02, br + 0.02, 0.1, 0, yb + 0.72, 0, { seg: 16 });
    // a small window slit or two on the shaft
    if (s <= 3) for (const a of [0.0]) k.flat(0x4a3028, pointedShape(0.16, 0.42), Math.sin(a) * (rb + 0.05), ya + h * 0.78, Math.cos(a) * (rb + 0.05), { ry: a });
  }
  // top cupola: a little drum with a flat roof and a finial
  const top = Y0 + H - 0.55 + 0.82;
  k.cyl(BUFF_L, R1 + 0.02, R1 + 0.06, 0.55, 0, top - 0.1, 0, { seg: 10 });
  k.dome(BUFF_L, R1 + 0.08, 0, top + 0.45, 0, { seg: 10, ring: 4, sy: 0.7 });
  k.cyl(PAL.ink, 0.03, 0.03, 0.8, 0, top + 0.9, 0, { seg: 4, outline: false });

  // the ruined screen beside it: a tall pointed arch in rough buff stone with a ragged top, on a low platform
  const RX = 2.0, RZ = -2.8;
  k.box(STONE, 4.6, 0.25, 1.9, RX, 0, RZ);
  k.extrude(BUFF, archWall(3.8, 4.6, 0.9, 2.2, 3.5), 0.8, RX, 0.25, RZ);
  k.box(BUFF_D, 1.0, 1.1, 0.8, RX - 1.5, 4.85, RZ); k.box(BUFF, 0.7, 0.6, 0.8, RX + 0.9, 4.85, RZ); k.box(BUFF_D, 0.6, 0.4, 0.8, RX - 0.3, 4.85, RZ);
  for (let j = 0; j < 4; j++) k.box(BUFF_D, 3.7, 0.04, 0.82, RX, 1.0 + j * 1.1, RZ, { outline: false });
  const rf = k.face(RX, 0.25, RZ + 0.4, 0);
  rf.flat(0x6d5a48, pointedShape(1.4, 2.8), 0, 0, -0.38);

  // plate on the plinth (Hindi + English)
  const nb = paintBoard(2.4, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H2) => { teText(ctx, 'कुतुब मीनार', W * 0.5, H2 * 0.55, H2 * 0.48, { color: '#7a2f2f' }); latin(ctx, 'QUTUB MINAR', W * 0.5, H2 * 0.94, H2 * 0.22, { color: '#2b2440' }); }, { seed: 51, px: 90 });
  k.plane(nb, 2.4, 0.55, [0, 0.55, 2.78], 0);

  const g = k.finish({ lean: 0.003 });
  g.name = 'rajabai';
  g.userData = {
    footprint: 3.5,
    height: top + 1.4,
    colliders: [{ x: 0, z: 0, radius: 2.7, height: 14 }, { x: RX - 1.2, z: RZ, radius: 1.0, height: 4 }, { x: RX + 1.2, z: RZ, radius: 1.0, height: 4 }],
  };
  void THREE;
  return g;
}
