// Charminar (replaces the Gateway of India; layout id 'gateway'). Reference: Wikimedia Commons "Charminar Hyderabad 1/111" (see docs/HYDERABAD.md refs).
// Limestone-cream square body with a big pointed arch on each of its four faces (the chowk is open both ways), a two-storey arcaded gallery with
// a clock on each face, a jali parapet with a small mosque and domed pavilions on the roof, and FOUR tall fluted minarets at the corners
// (three balconies each, a lantern and a domed top). Local frame: y up, base y=0, the lake plaza + steps toward +Z.
// The central passages (z through x in -1.8..1.8, and x through z in -1.8..1.8) stay walkable.
import * as THREE from 'three';
import { Kit, PAL, ringArch, rectShape, paintBoard, teText, latin } from './kit.js';
import { archWall, pointedShape, minaret, chhatri, onion, jaliCanvas, clockFace } from './parts.js';

const B = PAL.lime, BL = PAL.limeLight, BD = PAL.limeDark;
const HW = 4.8;            // body half width (x and z)
const WALL_T = 2.8;        // wall thickness (piers 2.8 x 2.8 at the corners)
const H1 = 7.4;            // lower storey (the arches)
const circ = (r) => { const sh = new THREE.Shape(); sh.absarc(0, 0, r, 0, Math.PI * 2, false); return sh; };
const ARCH_AW = 2.0, ARCH_SPRING = 3.4, ARCH_APEX = 5.7;

export function createGateway(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 11 });

  // lakeside plaza + wide front steps (front, +Z) down to the water
  k.base(17, 12, { color: PAL.stone });
  for (let i = 0; i < 4; i++) {
    const top = -0.05 - i * 0.2, z0 = 4.2 + i * 0.85;
    k.box(i % 2 ? PAL.stoneDark : PAL.stone, 12.4 - i * 0.3, top + 1.6, 0.85, 0, -1.6, z0 + 0.43);
  }
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.16, 0.2, 0.5, sx * 7.4, 0, 4.9, { seg: 6 });

  // plinth step around the monument
  k.box(BD, 2 * HW + 0.9, 0.35, 2 * HW + 0.9, 0, 0, 0);
  k.box(BL, 2 * HW + 0.5, 0.18, 2 * HW + 0.5, 0, 0.35, 0);

  // four walls, each with a big pointed arch through it
  const wall = archWall(2 * HW, H1, ARCH_AW, ARCH_SPRING, ARCH_APEX);
  for (const [ox, oz, ry] of [[0, HW - WALL_T / 2, 0], [0, -HW + WALL_T / 2, 0], [HW - WALL_T / 2, 0, Math.PI / 2], [-HW + WALL_T / 2, 0, Math.PI / 2]]) {
    k.extrude(B, wall, WALL_T, ox, 0.35, oz, { ry });
  }
  // arch surrounds (raised pointed rings) on the four outer faces
  for (const [ox, oz, ry] of [[0, HW + 0.05, 0], [0, -HW - 0.05, Math.PI], [HW + 0.05, 0, Math.PI / 2], [-HW - 0.05, 0, -Math.PI / 2]]) {
    k.extrude(BL, ringArch(ARCH_AW, ARCH_AW + 0.42, ARCH_SPRING, true), 0.18, ox, 0.35, oz, { ry });
    const f = k.face(ox, 0.35, oz, ry);
    // spandrel roundels either side of the arch + two little blind niches
    for (const sx of [-1, 1]) {
      f.flat(BD, circ(0.36), sx * 3.5, 5.9, 0.03);
      f.flat(BL, circ(0.24), sx * 3.5, 5.9, 0.05);
      f.flat(PAL.glassDark, pointedShape(0.5, 1.1), sx * 3.5, 2.7, 0.04);
      f.flat(PAL.glassDark, pointedShape(0.5, 1.1), sx * 3.5, 4.2, 0.04);
    }
  }
  // inside the arches: dark vault
  k.box(0x6a5d58, 3.6, 0.3, 3.6, 0, H1 - 0.35, 0, { outline: false });

  // cornice with corbels, then the upper arcaded storey (a slightly inset block)
  k.box(BL, 2 * HW + 0.6, 0.45, 2 * HW + 0.6, 0, H1 + 0.35, 0);
  for (let i = 0; i < 15; i++) {
    const t = -HW + 0.3 + i * ((2 * HW - 0.6) / 14);
    for (const [x, z, ry] of [[t, HW + 0.34, 0], [t, -HW - 0.34, 0], [HW + 0.34, t, 0], [-HW - 0.34, t, 0]]) k.box(BD, 0.2, 0.22, 0.2, x, H1 + 0.12, z, { ry, outline: false });
  }
  const U0 = H1 + 0.8, UH = 3.0, UW = HW - 0.5;
  k.box(B, 2 * UW, UH, 2 * UW, 0, U0, 0);
  k.box(BL, 2 * UW + 0.5, 0.3, 2 * UW + 0.5, 0, U0 + UH, 0);
  k.box(BD, 2 * UW + 0.4, 0.14, 2 * UW + 0.4, 0, U0 + 1.35, 0); // string course between the two arcade rows
  for (const [ox, oz, ry] of [[0, UW, 0], [0, -UW, Math.PI], [UW, 0, Math.PI / 2], [-UW, 0, -Math.PI / 2]]) {
    const f = k.face(ox, U0, oz, ry);
    for (const u of [-2.9, -1.45, 1.45, 2.9]) { f.window(u, 0.25, 0.8, 1.0, { pointed: true, glass: PAL.glassDark, frame: BL, sill: false }); f.window(u, 1.65, 0.8, 1.0, { pointed: true, glass: PAL.glassDark, frame: BL, sill: false }); }
  }
  // clocks on the four faces (centre of the upper storey)
  const cf = clockFace();
  const cz = UW + 0.1;
  k.planes_(cf, [
    { w: 1.5, h: 1.5, pos: [0, U0 + 1.5, cz + 0.12], ry: 0 }, { w: 1.5, h: 1.5, pos: [0, U0 + 1.5, -cz - 0.12], ry: Math.PI },
    { w: 1.5, h: 1.5, pos: [cz + 0.12, U0 + 1.5, 0], ry: Math.PI / 2 }, { w: 1.5, h: 1.5, pos: [-cz - 0.12, U0 + 1.5, 0], ry: -Math.PI / 2 },
  ]);

  // roof: jali parapet all round (painted lattice), a small mosque, four domed pavilions
  const RY = U0 + UH + 0.3;
  const jc = jaliCanvas();
  k.box(BL, 2 * HW + 0.2, 0.2, 2 * HW + 0.2, 0, RY, 0);
  for (const [x, z, w, d] of [[0, HW - 0.1, 2 * HW, 0.3], [0, -HW + 0.1, 2 * HW, 0.3], [HW - 0.1, 0, 0.3, 2 * HW], [-HW + 0.1, 0, 0.3, 2 * HW]]) k.box(B, w, 0.9, d, x, RY + 0.2, z);
  k.planes_(jc, [
    { w: 2 * HW - 2.2, h: 0.7, pos: [0, RY + 0.65, HW + 0.07], ry: 0 }, { w: 2 * HW - 2.2, h: 0.7, pos: [0, RY + 0.65, -HW - 0.07], ry: Math.PI },
    { w: 2 * HW - 2.2, h: 0.7, pos: [HW + 0.07, RY + 0.65, 0], ry: Math.PI / 2 }, { w: 2 * HW - 2.2, h: 0.7, pos: [-HW - 0.07, RY + 0.65, 0], ry: -Math.PI / 2 },
  ]);
  k.box(BL, 2 * HW + 0.3, 0.14, 0.4, 0, RY + 1.1, HW - 0.1); k.box(BL, 2 * HW + 0.3, 0.14, 0.4, 0, RY + 1.1, -HW + 0.1);
  k.box(BL, 0.4, 0.14, 2 * HW + 0.3, HW - 0.1, RY + 1.1, 0); k.box(BL, 0.4, 0.14, 2 * HW + 0.3, -HW + 0.1, RY + 1.1, 0);
  // roof mosque (back half): a long low prayer hall with three arched fronts, a dome and two slim turrets
  const MZ = -0.8;
  k.box(B, 4.4, 1.7, 2.0, 0, RY + 0.2, MZ);
  k.box(BL, 4.6, 0.18, 2.2, 0, RY + 1.9, MZ);
  const mf = k.face(0, RY + 0.2, MZ + 1.0, 0);
  for (const u of [-1.4, 0, 1.4]) mf.window(u, 0.15, 0.9, 1.25, { pointed: true, glass: PAL.glassDark, frame: BL, sill: false });
  onion(k, BL, 0.95, 0, RY + 2.08, MZ, { seg: 10, tall: 1.05 });
  k.cone(PAL.gold, 0.06, 0.6, 0, RY + 2.08 + 1.5, MZ, { seg: 4 });
  for (const sx of [-1, 1]) { k.cyl(B, 0.17, 0.2, 1.3, sx * 2.0, RY + 2.0, MZ + 0.7, { seg: 6 }); onion(k, BL, 0.24, sx * 2.0, RY + 3.3, MZ + 0.7, { seg: 6, tall: 1.0 }); }
  // domed pavilions between the minarets
  for (const [x, z] of [[-2.7, 2.6], [2.7, 2.6], [-2.7, -2.4], [2.7, -2.4]]) chhatri(k, x, RY + 0.2, z, 0.9, { col: B, light: BL, dome: BL });

  // the four corner minarets: fluted, three balconies, lantern, dome
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) minaret(k, sx * (HW - 0.05), 0.35, sz * (HW - 0.05), { s: 1 });

  // small Telugu + English name plate low on the front pier (plain, no logos)
  const np = paintBoard(1.5, 0.5, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'చార్మినార్', W * 0.5, H * 0.55, H * 0.46, { color: '#7a2f2f' }); latin(ctx, 'CHARMINAR', W * 0.5, H * 0.93, H * 0.2, { color: '#2b2440' }); }, { seed: 14, px: 90 });
  k.plane(np, 1.5, 0.5, [-3.55, 1.7, HW + 0.12], 0);

  // a few pigeons on the steps and cornice (real: they flock here)
  const pig = (x, y, z, ry) => {
    k.ball(0xb9b6c8, 0.17, x, y + 0.17, z, { sx: 1, sy: 0.85, sz: 1.35, seg: 6, ring: 4, ry, outline: false });
    k.ball(0x9a97ae, 0.1, x + Math.sin(ry) * 0.16, y + 0.32, z + Math.cos(ry) * 0.16, { seg: 5, ring: 4, outline: false });
  };
  [[-3.2, 0.05, 5.8, 0.3], [2.8, 0.05, 5.6, -0.6], [3.5, 0.05, 6.1, 2.4], [-1.2, 0.05, 6.4, 1.1], [1.2, H1 + 0.8, HW + 0.1, 0.4]].forEach((p) => pig(...p));

  const g = k.finish({ lean: 0.005 });
  g.name = 'gateway';
  const PIER = HW - WALL_T / 2;
  g.userData = {
    footprint: 9,
    height: 18.4,
    // the four arches stay open: the four corner piers (+ their minarets) are the colliders
    colliders: [
      ...[-1, 1].flatMap((sx) => [-1, 1].map((sz) => ({ x: sx * PIER, z: sz * PIER, radius: 1.55, height: 17 }))),
      ...[-1, 1].map((sx) => ({ x: sx * 7.4, z: 4.9, radius: 0.25, height: 0.5 })),
    ],
    walkable: [{ shape: 'rect', x: 0, z: 0, w: 3.6, d: 2 * HW, y: 0.05 }, { shape: 'rect', x: 0, z: 0, w: 2 * HW, d: 3.6, y: 0.05 }],
  };
  void rectShape; void THREE;
  return g;
}
