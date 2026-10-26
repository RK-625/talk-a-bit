// Vidhana Soudha (replaces the Gateway of India; layout id 'gateway'): pink-grey granite legislature building, two long wings,
// a central portico of Neo-Dravidian columns, a stepped central dome with a gold cupola, end pavilions and wide front steps.
// Local frame: y up, base y=0, the lake (and the wide steps) toward +Z. The central passage (x -1.8..1.8) stays walkable.
import * as THREE from 'three';
import { Kit, PAL, archShape, ringArch, rectShape, polyShape, bilingualBoard } from './kit.js';

const W = 14.4, D = 5.2, H = 4.8;
const ARCH_W = 1.8, ARCH_SPRING = 3.3;
const G = PAL.granite, GL = PAL.graniteLight, GD = PAL.graniteDark;

function centreShape() {
  const hw = 2.6, h = 6.6, s = new THREE.Shape();
  s.moveTo(-hw, 0); s.lineTo(-ARCH_W, 0); s.lineTo(-ARCH_W, ARCH_SPRING);
  s.quadraticCurveTo(-ARCH_W, ARCH_SPRING + 1.5, 0, ARCH_SPRING + 1.8);
  s.quadraticCurveTo(ARCH_W, ARCH_SPRING + 1.5, ARCH_W, ARCH_SPRING);
  s.lineTo(ARCH_W, 0); s.lineTo(hw, 0); s.lineTo(hw, h); s.lineTo(-hw, h); s.closePath();
  return s;
}

/** a small stepped chhatri dome (Neo-Dravidian cupola) */
function cupola(k, x, y, z, s = 1) {
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.cyl(GL, 0.07 * s, 0.09 * s, 0.7 * s, x + dx * 0.34 * s, y, z + dz * 0.34 * s, { seg: 5 });
  k.box(GD, 0.9 * s, 0.1 * s, 0.9 * s, x, y + 0.7 * s, z);
  k.dome(G, 0.46 * s, x, y + 0.8 * s, z, { seg: 8, ring: 4, sy: 1.1 });
  k.cone(PAL.gold, 0.05 * s, 0.35 * s, x, y + 1.3 * s, z, { seg: 5 });
}

export function createGateway(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 11 });

  // lakeside plaza + wide front steps (front, +Z)
  k.base(17, 12, { color: PAL.stone });
  for (let i = 0; i < 4; i++) {
    const top = -0.05 - i * 0.2, z0 = 4.2 + i * 0.85;
    k.box(i % 2 ? PAL.stoneDark : PAL.stone, 12.4 - i * 0.3, top + 1.6, 0.85, 0, -1.6, z0 + 0.43);
  }
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.16, 0.2, 0.5, sx * 7.4, 0, 4.9, { seg: 6 });

  // plinth + wings
  k.box(GD, W + 0.3, 0.7, D + 0.3, 0, 0, 0);
  for (const sx of [-1, 1]) {
    const cx = sx * 4.9;
    k.box(G, 4.8, H, D, cx, 0, 0);
    k.box(GL, 5.0, 0.22, D + 0.25, cx, 2.45, 0);          // string course
    k.box(GL, 5.1, 0.42, D + 0.5, cx, H, 0);             // cornice
    for (let i = 0; i < 9; i++) k.box(GL, 0.24, 0.5, 0.2, cx - 2.2 + i * 0.55, H + 0.42, D / 2 + 0.2); // balustrade
    k.box(GL, 4.9, 0.1, 0.16, cx, H + 0.42, D / 2 + 0.2);
    // end pavilion: projecting block with a pyramidal roof
    const px = sx * 7.1;
    k.box(G, 2.1, 5.6, D + 0.5, px, 0, 0.1);
    k.box(GL, 2.3, 0.4, D + 0.8, px, 5.6, 0.1);
    k.add(new THREE.ConeGeometry(1, 1.5, 4, 1).rotateY(Math.PI / 4).scale(1.05, 1, 1.9), GD, { pos: [px, 6.0 + 0.75, 0.1] });
    k.cone(PAL.gold, 0.07, 0.4, px, 7.5, 0.1, { seg: 5 });
  }
  // central block with the passage
  k.extrude(G, centreShape(), D + 0.4, 0, 0, 0);
  k.box(GL, 5.5, 0.4, D + 0.8, 0, 6.6, 0);
  for (let i = 0; i < 11; i++) k.box(GL, 0.24, 0.5, 0.2, -2.5 + i * 0.5, 7.0, D / 2 + 0.3);

  // faces: arched windows (granite frames) on the wings + end pavilions
  for (const [oz, ry] of [[D / 2, 0], [-D / 2, Math.PI]]) {
    const f = k.face(0, 0, oz, ry);
    for (const sx of [-1, 1]) {
      for (const du of [-1.6, 0, 1.6]) {
        const u = sx * 4.9 + du;
        f.window(u, 0.9, 0.8, 1.35, { glass: PAL.glassDark, frame: GL, bars: 1 });
        f.window(u, 3.0, 0.8, 1.35, { glass: PAL.glassDark, frame: GL, bars: 1 });
      }
      f.window(sx * 7.1, 1.0, 0.9, 1.6, { glass: PAL.glassDark, frame: GL, bars: 1 });
      f.window(sx * 7.1, 3.4, 0.9, 1.6, { glass: PAL.glassDark, frame: GL, bars: 1 });
    }
  }
  for (const [ox, ry] of [[W / 2 + 0.2, Math.PI / 2], [-W / 2 - 0.2, -Math.PI / 2]]) {
    const f = k.face(ox, 0, 0, ry);
    for (const u of [-1.2, 1.2]) { f.window(u, 0.9, 0.8, 1.4, { glass: PAL.glassDark, frame: GL }); f.window(u, 3.2, 0.8, 1.4, { glass: PAL.glassDark, frame: GL }); }
  }
  // arch surround (front + back)
  for (const sz of [1, -1]) k.extrude(GL, ringArch(ARCH_W, ARCH_W + 0.35, ARCH_SPRING, true), 0.3, 0, 0, sz * (D / 2 + 0.3), { ry: sz < 0 ? Math.PI : 0 });

  // portico: six Neo-Dravidian columns carrying a deep entablature, the banner board above
  const PZ = D / 2 + 1.5;
  for (const sx of [-1, 1]) for (const u of [2.5, 3.65, 4.8]) {
    const x = sx * u;
    k.box(GD, 0.8, 0.3, 0.8, x, 0, PZ);
    k.cyl(G, 0.3, 0.34, 3.2, x, 0.3, PZ, { seg: 8 });
    k.cyl(GL, 0.24, 0.24, 0.12, x, 1.6, PZ, { seg: 8, outline: false });  // ring
    k.box(GL, 0.8, 0.28, 0.8, x, 3.5, PZ);                          // bracket capital
    k.box(GD, 1.0, 0.14, 1.0, x, 3.78, PZ);
  }
  k.box(G, 11.0, 0.7, 1.5, 0, 3.92, PZ);
  k.box(GL, 11.4, 0.22, 1.8, 0, 4.62, PZ);
  k.box(G, 7.6, 1.5, 0.5, 0, 4.84, PZ - 0.4);                       // banner wall
  k.box(GL, 7.9, 0.16, 0.8, 0, 6.34, PZ - 0.35);
  // roof of the portico = a wide low stepped terrace
  const banner = bilingualBoard(7.4, 1.4, 'ಸರ್ಕಾರದ ಕೆಲಸ ದೇವರ ಕೆಲಸ', "GOVERNMENT'S WORK IS GOD'S WORK", { fill: '#f6e3a0', hatch: '#e0c46a', kc: '#7a2f2f', ec: '#2b2440', knSize: 0.34, enSize: 0.17, seed: 14, px: 100 });
  k.plane(banner, 7.4, 1.4, [0, 5.6, PZ - 0.1], 0);

  // stepped Neo-Dravidian central dome on a square-to-octagon base, four corner cupolas and a gold finial
  k.box(GD, 4.8, 0.5, 4.8, 0, 6.8, 0);
  k.cyl(G, 2.0, 2.15, 1.0, 0, 7.3, 0, { seg: 8 });
  k.cyl(GL, 2.2, 2.2, 0.16, 0, 8.3, 0, { seg: 8 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    k.box(PAL.glassDark, 0.3, 0.55, 0.1, Math.sin(a) * 2.08, 7.55, Math.cos(a) * 2.08, { ry: a, outline: false });
  }
  k.dome(G, 1.9, 0, 8.4, 0, { seg: 8, ring: 5, sy: 0.7 });
  k.cyl(GL, 0.8, 0.9, 0.35, 0, 9.55, 0, { seg: 8 });
  k.cyl(G, 0.55, 0.75, 0.4, 0, 9.9, 0, { seg: 8 });
  k.dome(GL, 0.55, 0, 10.3, 0, { seg: 8, ring: 4, sy: 0.9 });
  k.cyl(PAL.gold, 0.05, 0.08, 0.7, 0, 10.8, 0, { seg: 5 });
  // red-and-yellow flag
  k.cyl(PAL.ink, 0.025, 0.025, 1.3, 0, 11.3, 0, { seg: 4 });
  k.flat(PAL.kaYellow, polyShape([[0, 0.5], [0.8, 0.5], [0.8, 0.8], [0, 0.8]]), 0.03, 11.9, 0, {});
  k.flat(PAL.kaRed, polyShape([[0, 0.2], [0.8, 0.2], [0.8, 0.5], [0, 0.5]]), 0.03, 11.9, 0, {});
  for (const [dx, dz] of [[-2.2, -1.9], [2.2, -1.9], [-2.2, 1.9], [2.2, 1.9]]) cupola(k, dx, 7.0, dz, 1.0);
  // wing-roof cupolas
  for (const sx of [-1, 1]) cupola(k, sx * 4.9, H + 0.5, 0, 0.9);

  // a few pigeons on the steps and cornice
  const pig = (x, y, z, ry) => {
    k.ball(0xb9b6c8, 0.17, x, y + 0.17, z, { sx: 1, sy: 0.85, sz: 1.35, seg: 6, ring: 4, ry, outline: false });
    k.ball(0x9a97ae, 0.1, x + Math.sin(ry) * 0.16, y + 0.32, z + Math.cos(ry) * 0.16, { seg: 5, ring: 4, outline: false });
  };
  [[-3.2, 0.05, 5.8, 0.3], [2.8, 0.05, 5.6, -0.6], [3.5, 0.05, 6.1, 2.4], [-8.1, H + 0.85, 1.9, 0.5]].forEach((p) => pig(...p));

  const g = k.finish({ lean: 0.006 });
  g.name = 'gateway';
  g.userData = {
    footprint: 9,
    height: 12.4,
    // the central passage (x in -1.8..1.8) stays open: wing masses + portico columns are the colliders
    colliders: [
      ...[-1, 1].flatMap((sx) => [-1.2, 1.2].map((z) => ({ x: sx * 3.4, z, radius: 1.5, height: 6.6 }))),
      ...[-1, 1].flatMap((sx) => [4.9, 6.9].map((x) => ({ x: sx * x, z: 0, radius: 2.5, height: H }))),
      ...[-1, 1].flatMap((sx) => [2.5, 3.65, 4.8].map((u) => ({ x: sx * u, z: PZ, radius: 0.4, height: 4 }))),
      ...[-1, 1].map((sx) => ({ x: sx * 7.4, z: 4.9, radius: 0.25, height: 0.5 })),
    ],
    walkable: [{ shape: 'rect', x: 0, z: 0, w: 3.4, d: D, y: 0.05 }],
  };
  void archShape; void rectShape;
  return g;
}
