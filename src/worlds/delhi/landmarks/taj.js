// Red Fort, Lahori Gate (replaces the hotel; layout id 'taj'). References: Wikimedia Commons "Lahori Gate Red Fort New Delhi India" (+ "2"), "Lahori Gate, Red Fort, Delhi".
// Red sandstone curtain wall with battlements; a tall central gate block with a big pointed-arch portal (a smaller arch inside it, a dark passage), a row of
// little pointed blind arches along the attic, and above it a white-domed pavilion (arcade + FIVE small marble domes) between two slim octagonal minarets;
// two fat octagonal bastions either side of the gate topped with domed chhatris, the tricolour flying on a pole. Wide stone steps in front. Front +Z. ~22 wide x 6.6 deep.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape, paintBoard, teText, latin } from './kit.js';
import { archWall, chhatri, onion, pointedShape } from './parts.js';

const R = 0xc4654a, RL = 0xd98768, RD = 0xa24a38, RDD = 0x7c3a30, MARBLE = 0xf4efe3, DARK = 0x4a2f2c, GRASS = 0x9ccf86;
const Y0 = 0.5;      // plinth top
const WH = 6.0;      // curtain wall height
const NICHE = (w, h) => pointedShape(w, h);

export function createTaj(ink) {
  const k = new Kit(ink, { hatch: 0.15, seed: 21 });
  k.base(23, 7, { color: PAL.stone });
  // stepped red plinth
  k.box(RD, 22.8, Y0, 5.4, 0, 0, -0.3);

  // curtain wall + battlements (merlons) + string courses
  k.box(R, 22.4, WH, 3.0, 0, Y0, 0);
  k.box(RL, 22.6, 0.3, 3.3, 0, Y0 + WH, 0);
  k.box(RD, 22.5, 0.2, 3.2, 0, Y0 + 0.6, 0, { outline: false });
  for (let i = 0; i < 19; i++) {
    const x = -10.8 + i * 1.2;
    k.box(RL, 0.72, 0.95, 0.4, x, Y0 + WH + 0.3, 1.2);
    k.box(RL, 0.72, 0.95, 0.4, x, Y0 + WH + 0.3, -1.2);
  }
  const wf = k.face(0, Y0, 1.5, 0);
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) {
    const u = sx * (7.6 + i * 1.7 + (i === 0 ? 0 : 0));
    if (Math.abs(u) > 10.6) continue;
    wf.flat(RDD, NICHE(0.7, 1.5), u, 2.4, 0.03);
    wf.flat(RD, NICHE(0.5, 1.2), u, 2.5, 0.05);
  }
  for (const u of [-9.6, 9.6]) { wf.flat(RDD, NICHE(0.7, 1.5), u, 2.4, 0.03); }

  // the two big octagonal bastions flanking the gate, with a cornice and a domed chhatri each
  for (const sx of [-1, 1]) {
    const x = sx * 5.7, z = 1.2;
    k.cyl(R, 1.95, 2.1, WH + 3.4, x, Y0, z, { seg: 8 });
    k.cyl(RL, 2.15, 2.15, 0.3, x, Y0 + WH + 1.0, z, { seg: 8 });                // cornice band
    k.cyl(RL, 2.15, 2.15, 0.3, x, Y0 + WH + 3.4, z, { seg: 8 });
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; k.flat(RDD, NICHE(0.7, 1.7), x + Math.sin(a) * 1.93, Y0 + 2.3, z + Math.cos(a) * 1.93, { ry: a }); }
    for (const a of [-0.8, 0, 0.8]) k.flat(RDD, NICHE(0.55, 1.2), x + Math.sin(a) * 1.96, Y0 + WH + 1.6, z + Math.cos(a) * 1.96, { ry: a });
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; k.box(RL, 0.45, 0.45, 0.4, x + Math.sin(a) * 2.0, Y0 + WH + 3.7, z + Math.cos(a) * 2.0, { ry: a, outline: false }); }
    chhatri(k, x, Y0 + WH + 3.7, z, 1.8, { col: R, light: MARBLE, dome: MARBLE });
  }

  // the gate block: a tall slab with the pointed-arch portal (dark recess), a smaller inner arch, and the attic of blind arches
  const GW = 6.2, GH = 8.4;
  k.extrude(R, archWall(GW, GH, 1.35, 3.7, 6.0), 1.4, 0, Y0, 2.0);
  k.box(DARK, 3.2, 5.9, 1.0, 0, Y0, 1.1, { outline: false });                   // the dark passage behind the portal
  const gf = k.face(0, Y0, 2.7, 0);
  gf.flat(RDD, pointedShape(3.1, 6.5), 0, 0, 0.02);                               // outer arch recess
  gf.flat(DARK, pointedShape(2.3, 5.3), 0, 0, 0.04);                              // the passage
  gf.flat(RD, pointedShape(1.5, 3.6), 0, 0, 0.06);                                // a smaller arch inside
  gf.flat(DARK, pointedShape(1.1, 3.0), 0, 0, 0.08);
  gf.box(RL, 0, 6.3, 3.5, 0.2, 0.3, 0);                                           // lintel course above the arch
  // balcony window over the portal
  k.box(RL, 1.3, 0.2, 0.7, 0, Y0 + 6.9, 2.95); k.box(RD, 1.1, 0.9, 0.4, 0, Y0 + 7.1, 2.7);
  gf.window(0, 7.1, 0.7, 0.8, { pointed: true, glass: DARK, frame: RL, sill: false, n: 0.2 });
  for (const sx of [-1, 1]) { gf.flat(RDD, NICHE(0.8, 1.5), sx * 2.5, 3.2, 0.03); gf.flat(RDD, NICHE(0.8, 1.5), sx * 2.5, 5.0, 0.03); }
  // attic of blind arches (kanguras)
  k.box(RL, GW + 0.3, 0.25, 1.9, 0, Y0 + GH, 2.0);
  k.box(R, GW, 1.4, 1.5, 0, Y0 + GH + 0.25, 2.0);
  for (let i = 0; i < 7; i++) {
    const u = -2.7 + i * 0.9;
    gf.flat(RDD, NICHE(0.62, 1.0), u, GH + 0.45, 0.03);
    k.cone(MARBLE, 0.16, 0.34, u, Y0 + GH + 1.65, 2.55, { seg: 5, outline: false });
  }
  k.box(RL, GW + 0.2, 0.2, 1.6, 0, Y0 + GH + 1.65, 2.0);

  // the white pavilion above: an arcade of five arches with five small marble domes, between two slim minarets
  const PY = Y0 + GH + 1.85;
  k.box(RL, 5.0, 0.2, 1.7, 0, PY, 1.5);
  k.box(MARBLE, 4.6, 1.2, 1.2, 0, PY + 0.2, 1.5);
  const pf = k.face(0, PY + 0.2, 2.1, 0);
  for (let i = 0; i < 5; i++) pf.window(-1.7 + i * 0.85, 0.15, 0.6, 0.85, { pointed: true, glass: 0x7a6a64, frame: MARBLE, sill: false, n: 0.02 });
  k.box(RL, 4.8, 0.14, 1.4, 0, PY + 1.4, 1.5);
  for (let i = 0; i < 5; i++) onion(k, MARBLE, 0.42, -1.7 + i * 0.85, PY + 1.52, 1.5, { seg: 8, tall: 1.0 });
  for (const sx of [-1, 1]) {
    k.cyl(R, 0.26, 0.34, 3.2, sx * 2.9, PY - 0.2, 1.6, { seg: 8 });
    k.cyl(RL, 0.42, 0.42, 0.16, sx * 2.9, PY + 1.6, 1.6, { seg: 8 });
    k.cyl(RL, 0.4, 0.4, 0.14, sx * 2.9, PY + 2.7, 1.6, { seg: 8 });
    chhatri(k, sx * 2.9, PY + 2.84, 1.6, 0.8, { col: R, light: MARBLE, dome: MARBLE });
  }
  // the flag: a pole with the tricolour (saffron, white, green) and a small blue wheel
  const FZ = 1.0;
  k.cyl(PAL.ink, 0.04, 0.05, 3.4, 0, PY + 1.6, FZ, { seg: 4, outline: false });
  const fx = (c, y0, y1) => { k.flat(c, polyShape([[0, y0], [1.3, y0 - 0.05], [1.3, y1 - 0.05], [0, y1]]), 0.04, PY + 5.0, FZ, { ry: 0 }); k.flat(c, polyShape([[0, y0], [-1.3, y0 - 0.05], [-1.3, y1 - 0.05], [0, y1]]), -0.04, PY + 5.0, FZ, { ry: Math.PI }); };
  fx(0xf0954a, 0, 0.3); fx(0xfaf6ea, -0.3, 0); fx(0x4aa56a, -0.6, -0.3);
  k.flat(0x3b4fa0, polyShape([[0.55, -0.12], [0.7, -0.12], [0.7, -0.27], [0.55, -0.27]]), 0.05, PY + 5.0, FZ, { ry: 0 });

  // wide stone steps up to the gate, and a lawn either side with a couple of neem trees
  for (let i = 0; i < 4; i++) k.box(i % 2 ? PAL.stoneDark : PAL.stone, 6.8 - i * 0.3, 0.12 + (3 - i) * 0.12, 0.8, 0, 0, 3.5 + i * 0.85 - 0.0);
  for (const sx of [-1, 1]) k.box(GRASS, 7.6, 0.1, 2.2, sx * 7.4, 0, 4.1, { outline: false });
  [[-8.2, 4.6], [8.6, 4.4], [-5.0, 5.0], [5.2, 5.0]].forEach(([x, z], i) => {
    k.cyl(PAL.woodDark, 0.16, 0.24, 1.8 + (i % 2) * 0.6, x, 0, z, { seg: 6 });
    k.ball(i % 2 ? 0x7fc08a : 0x98cf86, 1.25, x, 2.3 + (i % 2) * 0.6, z, { seg: 8, ring: 6 });
  });

  // small plate by the steps (Hindi + English)
  const nb = paintBoard(2.8, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'लाहौरी गेट', W * 0.5, H * 0.52, H * 0.46, { color: '#7a2f2f' }); latin(ctx, 'LAHORI GATE · RED FORT', W * 0.5, H * 0.92, H * 0.2, { color: '#2b2440' }); }, { seed: 21, px: 90 });
  k.plane(nb, 2.8, 0.55, [-5.2, Y0 + 0.9, 3.0], 0);

  const g = k.finish({ lean: 0.004 });
  g.name = 'taj';
  g.userData = {
    footprint: 12,
    height: PY + 6.0,
    colliders: [
      ...lineColliders(-9.6, 0, 9.6, 0, 3.3, WH + 1, 3.0),
      { x: 0, z: 1.5, radius: 3.6, height: 10 },
    ],
  };
  void THREE;
  return g;
}
