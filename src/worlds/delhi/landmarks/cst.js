// Old Delhi railway station (replaces CST; layout id 'cst'). References: Wikimedia Commons "Old Delhi Railway Station 2017", "Delhi Junction railway station building".
// Red-brick Victorian-gothic front: a ground arcade of five big pointed arches on dark piers, a cream band, an upper floor of five pointed arches with the
// round clock in the middle one, name boards (Hindi / English) on the parapet, two tall square corner towers with slit windows and a battlemented crown,
// and a lower arched wing each end. Local frame: front +Z. ~27 wide x 9 deep x ~13 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, paintBoard, teText, latin, ringArch } from './kit.js';
import { clockFace, pointedShape, multiArchWall } from './parts.js';

const RB = 0xc65c42, RBL = 0xd9775a, RBD = 0xa84a38, CREAM = 0xf3e8d0, CREAM_D = 0xdccfb3, PIER = 0x6e3d3a, DARK = 0x4b3030, IRON = 0x3a3646;

export { clockFace };

export function createCST(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 31 });
  k.base(27, 10, { color: PAL.stone });
  const GY = 0.45, GH = 3.8, UY = GY + GH + 0.5, UH = 3.6;
  k.box(CREAM_D, 27, GY, 9.2, 0, 0, -0.1);                                     // plinth

  // ---- central block: ground arcade (five pointed arches on dark piers over a dark concourse), cream band, upper floor of five pointed arches, parapet
  const CXs = [-5.4, -2.7, 0, 2.7, 5.4];
  k.box(RB, 16, GH + 0.5 + UH, 3.4, 0, GY, -1.9);                              // body behind
  k.box(DARK, 15.2, GH - 0.3, 1.0, 0, GY, 1.2, { outline: false });            // dark concourse seen through the arches
  k.extrude(RB, multiArchWall(16, GH, CXs, 1.2, 2.2, 3.4), 1.0, 0, GY, 2.5);   // arcade front slab with 5 pointed openings
  for (const cx of CXs) { k.extrude(CREAM, ringArch(1.2, 1.46, 2.2, true), 0.16, cx, GY, 3.05); k.box(PIER, 0.5, GH - 0.2, 0.5, cx + 1.35, GY, 2.2, { outline: false }); }
  k.box(PIER, 0.5, GH - 0.2, 0.5, -6.75, GY, 2.2, { outline: false });
  const bf = k.face(0, GY, 3.0, 0);
  for (const cx of CXs) bf.flat(0x5d4a52, pointedShape(1.9, 2.3), cx, 0.0, 0.0);
  k.box(CREAM, 16.4, 0.5, 3.6, 0, GY + GH, -1.9);                              // cream string band
  k.box(CREAM_D, 16.5, 0.18, 0.3, 0, GY + GH + 0.12, 0.1, { outline: false });
  // upper floor: five pointed windows with cream mouldings, clock in the middle
  const uf = k.face(0, UY, -0.2, 0);
  for (const cx of CXs) {
    if (cx !== 0) uf.window(cx, 0.45, 1.5, 2.4, { pointed: true, glass: 0x6a4a52, frame: CREAM, bars: 1, sill: false, n: 0.03 });
    uf.flat(CREAM, pointedShape(2.0, 2.9), cx, 0.15, 0.0);
    uf.flat(RBD, pointedShape(1.7, 2.6), cx, 0.25, 0.02);
    if (cx !== 0) { uf.flat(0x6a4a52, pointedShape(1.2, 1.9), cx, 0.55, 0.04); uf.flat(CREAM, rectBar(0.06, 1.2), cx, 0.6, 0.06); }
    k.box(CREAM, 0.12, 2.9, 0.1, cx + 1.35, UY + 0.2, -0.15, { outline: false });
  }
  k.box(RBD, 16.2, 0.3, 0.5, 0, UY + UH - 0.1, -0.2);
  const cf = clockFace();
  k.planes_(cf, [{ w: 1.6, h: 1.6, pos: [0, UY + 1.55, -0.12], ry: 0 }]);
  // parapet with three name boards and a few merlons
  k.box(RB, 16, 1.2, 0.5, 0, UY + UH, -0.3);
  const nb = (txt, en, w) => paintBoard(w, 1.0, '#e9e0c9', '#c9bfa1', (ctx, W, H) => { if (txt) teText(ctx, txt, W * 0.5, H * 0.74, H * 0.7, { color: '#2b2440' }); else latin(ctx, en, W * 0.5, H * 0.74, H * 0.6, { color: '#8f2a22' }); }, { seed: 31, px: 90 });
  k.plane(nb('दिल्ली', null, 3.8), 3.8, 1.0, [-5.2, UY + UH + 0.35, -0.02], 0);
  k.plane(nb(null, 'DELHI', 3.8), 3.8, 1.0, [0, UY + UH + 0.35, -0.02], 0);
  k.plane(nb(null, 'DLI', 3.8), 3.8, 1.0, [5.2, UY + UH + 0.35, -0.02], 0);
  for (let i = 0; i < 4; i++) k.box(CREAM, 0.15, 0.7, 0.15, -7.2 + i * 4.8, UY + UH + 0.0, 0.0, { outline: false });

  // ---- two tall square corner towers: cream string courses, slit windows, a corbelled battlemented crown
  const TH = 13.0;
  for (const sx of [-1, 1]) {
    const x = sx * 9.2, z = -0.2;
    k.box(RB, 3.4, TH, 3.4, x, GY, z);
    for (const y of [3.7, 7.2, 10.4]) k.box(CREAM, 3.6, 0.22, 3.6, x, GY + y, z);
    k.box(CREAM, 3.7, 0.4, 3.7, x, GY + TH - 0.4, z);
    // crown: a ring of merlons and corner finials
    for (let i = 0; i < 5; i++) { const t = -1.5 + i * 0.75; for (const [dx, dz] of [[t, 1.75], [t, -1.75], [1.75, t], [-1.75, t]]) k.box(RBL, 0.5, 0.65, 0.34, x + dx, GY + TH, z + dz, { outline: false, ry: dz === 1.75 || dz === -1.75 ? 0 : Math.PI / 2 }); }
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(CREAM, 0.42, 1.0, 0.42, x + dx * 1.72, GY + TH, z + dz * 1.72);
    // slit windows on the front and the inner side
    const tf = k.face(x, GY, z + 1.7, 0);
    for (const y of [1.0, 4.4, 7.9]) { tf.flat(DARK, pointedShape(0.45, 1.6), 0, y, 0.02); tf.flat(CREAM, pointedShape(0.7, 1.9), 0, y - 0.15, 0.0); tf.flat(DARK, pointedShape(0.45, 1.6), 0, y, 0.03); }
    for (const [ox, ry] of [[x + sx * 1.7, sx * Math.PI / 2], [x - sx * 1.7, -sx * Math.PI / 2]]) { const f2 = k.face(ox, GY, z, ry); for (const y of [4.4, 7.9]) f2.flat(DARK, pointedShape(0.45, 1.6), 0, y, 0.02); }
  }

  // ---- end wings: a lower red block with one arched opening each, battlemented
  for (const sx of [-1, 1]) {
    const x = sx * 12.0;
    k.box(RB, 2.6, GH + 1.2, 3.2, x, GY, -0.4);
    k.box(CREAM, 2.8, 0.25, 3.4, x, GY + GH + 1.2, -0.4);
    for (let i = 0; i < 3; i++) k.box(RBL, 0.55, 0.5, 0.3, x - 0.9 + i * 0.9, GY + GH + 1.45, 1.1, { outline: false });
    const wf = k.face(x, GY, 1.2, 0);
    wf.window(0, 0.2, 1.3, 2.6, { pointed: true, glass: DARK, frame: CREAM, bars: 1, sill: false });
    wf.window(0, 3.6, 0.9, 1.2, { pointed: true, glass: 0x6a4a52, frame: CREAM, bars: 1 });
  }

  // iron railing along the front and a few luggage trolleys' worth of life stays with the props
  for (let i = 0; i <= 30; i++) k.box(IRON, 0.07, 1.0, 0.07, -13 + i * 0.866, 0.0, 4.9, { outline: false });
  k.box(IRON, 26, 0.08, 0.08, 0, 0.95, 4.9, { outline: false });

  const g = k.finish({ lean: 0.005 });
  g.name = 'cst';
  g.userData = {
    footprint: 14,
    height: GY + TH + 1.2,
    colliders: [
      ...lineColliders(-13.5, 0, 13.5, 0, 3.4, 6, 3.4),
      { x: 0, z: 0.8, radius: 4.2, height: 8 },
      { x: -12.4, z: 1.5, radius: 3.0, height: 7 }, { x: 12.4, z: 1.5, radius: 3.0, height: 7 },
    ],
  };
  void THREE;
  return g;
}

function rectBar(w, h) { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.closePath(); return s; }
