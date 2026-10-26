// Chepauk Palace (Chennai): the Indo-Saracenic red-and-white palace of the Nawabs of Arcot. Terracotta-red walls with white
// banding, a row of three white ribbed domes with gold finials over the central bay, octagonal corner turrets with domes,
// pointed and scalloped arches in two storeys, a white pinnacled parapet. (Replaces the Mumbai Taj; same footprint.)
// Local frame: front +Z. ~22 wide x 6 deep x ~12.5 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, bilingualBoard } from './kit.js';

const RED = 0xc8483a, RED_D = 0xa23a30, TRIM = 0xfaf3df, DOME = 0xf6efdc, GOLD = PAL.gold;
const BW = 22, BD = 6, BH = 7.2;

function ribbedDome(k, r, x, y, z, { sy = 1.1, seg = 10, drum = 0.5 } = {}) {
  k.cyl(RED, r * 0.9, r * 0.95, drum, x, y, z, { seg });
  k.cyl(TRIM, r * 1.05, r * 1.05, 0.14, x, y + drum, z, { seg });
  k.dome(DOME, r, x, y + drum + 0.1, z, { seg, ring: 6, sy });
  k.cyl(TRIM, r * 0.12, r * 0.14, r * 0.35, x, y + drum + 0.1 + r * sy, z, { seg: 6 });
  k.ball(GOLD, r * 0.14, x, y + drum + 0.2 + r * sy + r * 0.36, z, { seg: 6, ring: 4 });
}
function pinnacle(k, x, y, z, h = 0.9, c = TRIM) {
  k.cyl(c, 0.1, 0.14, h * 0.6, x, y, z, { seg: 6 });
  k.dome(DOME, 0.2, x, y + h * 0.6, z, { seg: 6, ring: 3 });
  k.cone(GOLD, 0.05, 0.25, x, y + h * 0.6 + 0.2, z, { seg: 4 });
}

export function createTaj(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 21 });
  k.base(BW + 1, BD + 1, { color: PAL.stone });

  // long wings: red body, white plinth, string course and cornice
  k.box(RED, BW, BH, BD, 0, 0, 0);
  k.box(TRIM, BW + 0.2, 0.55, BD + 0.2, 0, 0, 0);
  k.box(TRIM, BW + 0.12, 0.18, BD + 0.12, 0, BH * 0.5, 0);
  k.box(TRIM, BW + 0.5, 0.38, BD + 0.5, 0, BH, 0);
  // white parapet panels and pinnacles along the roofline
  for (let i = 0; i < 11; i++) {
    const x = -BW / 2 + 1.0 + i * ((BW - 2.0) / 10);
    k.box(TRIM, 1.1, 0.4, 0.28, x, BH + 0.38, BD / 2 + 0.12);
    k.box(TRIM, 1.1, 0.4, 0.28, x, BH + 0.38, -BD / 2 - 0.12);
    if (i % 2 === 0) { pinnacle(k, x - 0.55, BH + 0.38, BD / 2 + 0.12, 0.8); pinnacle(k, x - 0.55, BH + 0.38, -BD / 2 - 0.12, 0.8); }
  }
  // central bay: advanced, taller, with three white domes in a row
  const CB = 8.6, CH = 9.2, CD = BD + 1.6;
  k.box(RED, CB, CH, CD, 0, 0, 0.8);
  k.box(TRIM, CB + 0.24, 0.55, CD + 0.24, 0, 0, 0.8);
  k.box(TRIM, CB + 0.2, 0.16, CD + 0.2, 0, BH * 0.5, 0.8);
  k.box(TRIM, CB + 0.55, 0.4, CD + 0.55, 0, CH, 0.8);
  ribbedDome(k, 1.35, 0, CH + 0.4, 0.8, { sy: 1.15, drum: 0.7 });
  for (const sx of [-1, 1]) ribbedDome(k, 1.0, sx * 2.9, CH + 0.4, 0.8, { sy: 1.1, drum: 0.5 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) pinnacle(k, sx * (CB / 2 - 0.1), CH + 0.38, 0.8 + sz * (CD / 2 - 0.1), 1.2);
  // a tall red turret behind (the "minaret" seen in the photos)
  k.cyl(RED, 0.5, 0.55, 3.0, 2.6, CH, -1.6, { seg: 8 }); k.cyl(TRIM, 0.6, 0.6, 0.2, 2.6, CH + 3.0, -1.6, { seg: 8 });
  k.dome(DOME, 0.55, 2.6, CH + 3.2, -1.6, { seg: 8, ring: 4 });
  // front face of the central bay: three tall pointed arches below, paired windows above
  const fz = 0.8 + CD / 2;
  const f = k.face(0, 0, fz, 0);
  for (const u of [-2.7, 0, 2.7]) f.window(u, 0.7, 1.7, 3.9, { pointed: true, glass: PAL.glassDark, frame: TRIM, sill: false, bars: 1 });
  for (const u of [-3.2, -1.6, 0, 1.6, 3.2]) f.window(u, 5.5, 0.95, 2.1, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
  f.box(TRIM, 0, 4.9, CB + 0.3, 0.16, 0.5, 0.05); // balcony ledge
  for (let i = 0; i < 14; i++) f.box(TRIM, -CB / 2 + 0.3 + i * ((CB - 0.6) / 13), 5.0 - 0.0, 0.1, 0.5, 0.1, 0.4);
  // entrance steps
  for (let i = 0; i < 3; i++) k.box(PAL.stone, 4.2 - i * 0.2, 0.18 * (3 - i), 0.5, 0, 0, fz + 0.3 + i * 0.5 - 0.0);

  // wings: ground arcade of pointed arches, upper tier of paired arched windows with white surrounds
  for (const sx of [-1, 1]) {
    const wf = k.face(sx * 6.9, 0, BD / 2, 0);
    for (let i = 0; i < 3; i++) {
      const u = (i - 1) * 2.15;
      wf.window(u, 0.7, 1.15, 2.7, { pointed: true, glass: PAL.glassDark, frame: TRIM, sill: false, bars: 1 });
      wf.window(u, 4.1, 0.9, 2.0, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    }
    // rear wings simpler
    const rf = k.face(sx * 6.9, 0, -BD / 2, Math.PI);
    for (let i = 0; i < 3; i++) rf.window((i - 1) * 2.15, 3.8, 0.9, 2.2, { pointed: true, glass: PAL.glassDark, frame: TRIM });
  }
  // octagonal corner turrets with white domes
  for (const sx of [-1, 1]) {
    const x = sx * (BW / 2 - 0.2), z = BD / 2 - 0.2;
    k.cyl(RED, 1.15, 1.25, BH + 1.8, x, 0, z, { seg: 8 });
    k.cyl(TRIM, 1.3, 1.3, 0.3, x, BH * 0.5, z, { seg: 8 });
    k.cyl(TRIM, 1.32, 1.32, 0.32, x, BH + 1.6, z, { seg: 8 });
    ribbedDome(k, 1.0, x, BH + 1.9, z, { sy: 1.2, drum: 0.35 });
    for (let j = 0; j < 4; j++) { const a = j * Math.PI / 2 + Math.PI / 4; k.box(PAL.glassDark, 0.34, 1.0, 0.12, x + Math.sin(a) * 1.12, BH + 0.45, z + Math.cos(a) * 1.12, { ry: a, outline: false }); }
  }
  // back corner turrets, smaller
  for (const sx of [-1, 1]) { const x = sx * (BW / 2 - 0.2), z = -BD / 2 + 0.2; k.cyl(RED, 0.9, 1.0, BH + 1.2, x, 0, z, { seg: 8 }); k.cyl(TRIM, 1.05, 1.05, 0.26, x, BH + 1.1, z, { seg: 8 }); ribbedDome(k, 0.8, x, BH + 1.3, z, { sy: 1.2, drum: 0.3 }); }

  // name board
  const sign = bilingualBoard(4.6, 1.0, 'சேப்பாக்கம் அரண்மனை', 'CHEPAUK PALACE', { fill: '#fbf3e0', hatch: '#e8d8a8', tc: '#8e2f2a', taSize: 0.42, enSize: 0.2, px: 80 });
  f.plane(sign, 4.6, 1.0, 0, 8.45, 0.08);

  const g = k.finish({ lean: 0.006 });
  g.name = 'taj';
  g.userData = {
    footprint: 12,
    height: 13.0,
    colliders: [
      ...lineColliders(-9.6, 0, 9.6, 0, 3.3, BH + 1, 3.0),
      { x: 0, z: 1.5, radius: 3.6, height: 10 },
    ],
  };
  return g;
}
