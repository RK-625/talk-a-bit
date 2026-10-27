// Jantar Mantar (replaces the Flora Fountain; layout id 'flora'). References: Wikimedia Commons "Jantar Mantar Samrat Yantra Stairs", "... Misra Yantra", "... Monochrome".
// The SAMRAT YANTRA: a huge right-triangle gnomon of orange-red plaster with white stone edging, a long staircase running up its sloped edge between low parapets to a
// small white domed cylinder at the top, tall pointed-arch niches cut into its sides; a smaller Ram Yantra (a round red drum with radial white walls) beside it, all inside a
// low circular red wall with white coping, on a paved ring with two benches. Fits the old ~8.8 x 8.8 pad; colliders unchanged. Front +Z.
import * as THREE from 'three';
import { Kit, PAL, paintBoard, teText, latin, polyShape } from './kit.js';
import { pointedShape } from './parts.js';

const ORG = 0xdc6c45, ORG_L = 0xe8845a, ORG_D = 0xb9532f, WHITE = 0xf4efe3, GREY = 0xcfc8ba, STONE = 0xdcd2bc, GRASS = 0xa8d68c;

export function createFloraFountain(ink) {
  const k = new Kit(ink, { hatch: 0.12, seed: 61 });
  // foundation (reaches under the curved ground) + round paved apron
  k.lathe(PAL.stone, [[0, -1.0], [4.4, -1.0], [4.4, 0.0], [4.1, 0.05], [0, 0.05]], 0, 0, 0, { seg: 20 });
  k.lathe(STONE, [[3.95, 0.0], [3.95, 0.12], [3.0, 0.12], [3.0, 0.0]], 0, 0, 0, { seg: 20 });

  // the low circular enclosure wall: orange plaster, white coping, little arched niches
  k.lathe(ORG, [[3.5, 0.05], [3.5, 0.9], [3.15, 0.9], [3.15, 0.05]], 0, 0, 0, { seg: 24 });
  k.lathe(WHITE, [[3.6, 0.88], [3.6, 1.02], [3.08, 1.02], [3.08, 0.88]], 0, 0, 0, { seg: 24 });
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + 0.26; k.flat(ORG_D, pointedShape(0.32, 0.55), Math.sin(a) * 3.52, 0.2, Math.cos(a) * 3.52, { ry: a }); }
  k.disc(GRASS, 3.1, 0, 0.12, 0, { seg: 24 });
  k.disc(STONE, 0.9, 0, 0.14, 0, { seg: 12 });

  // ---- the Samrat Yantra: the triangle wedge (tall wall on the left, sloping down to the right), 5.2 long, 4.8 high, 1.3 thick
  const L = 5.2, Hh = 4.8, X0 = -0.2;
  const tri = polyShape([[-L / 2, 0], [L / 2, 0], [-L / 2, Hh]]);
  k.extrude(ORG, tri, 1.3, X0, 0.14, -0.2);
  // white stone edging along the hypotenuse + the stair strip with its low parapets
  const sl = Math.hypot(L, Hh), ang = Math.atan2(Hh, L);
  const along = (t, off) => [X0 + (-L / 2 + t * L) + Math.sin(ang) * off, 0.14 + (Hh * (1 - t)) + Math.cos(ang) * off];
  const mid = along(0.5, 0.0);
  k.add(new THREE.BoxGeometry(sl, 0.26, 1.5), WHITE, { pos: [mid[0] + Math.sin(ang) * 0.12, mid[1] + Math.cos(ang) * 0.12, -0.2], rot: [0, 0, -ang] });
  k.add(new THREE.BoxGeometry(sl, 0.12, 0.62), GREY, { pos: [mid[0] + Math.sin(ang) * 0.3, mid[1] + Math.cos(ang) * 0.3, -0.2], rot: [0, 0, -ang], outline: false });
  for (let i = 0; i < 16; i++) { // stair treads
    const t = (i + 0.5) / 16, p = along(t, 0.34);
    k.add(new THREE.BoxGeometry(0.09, 0.05, 0.6), 0x8a8478, { pos: [p[0], p[1], -0.2], rot: [0, 0, 0], outline: false });
  }
  for (const sz of [-1, 1]) k.add(new THREE.BoxGeometry(sl, 0.2, 0.14), WHITE, { pos: [mid[0] + Math.sin(ang) * 0.5, mid[1] + Math.cos(ang) * 0.5, -0.2 + sz * 0.38], rot: [0, 0, -ang] });
  // the little white cylindrical chhatri on the summit
  const sx = X0 - L / 2 + 0.2, sy = 0.14 + Hh + 0.2;
  k.cyl(WHITE, 0.34, 0.38, 0.55, sx, sy, -0.2, { seg: 10 });
  k.dome(WHITE, 0.36, sx, sy + 0.55, -0.2, { seg: 10, ring: 4, sy: 0.7 });
  // tall pointed niches on the front face (z = +0.45): two on the vertical wall, three stepping down the slope
  const fz = -0.2 + 0.65 + 0.02;
  for (const [u, v, w, h] of [[-2.35, 0.7, 0.55, 2.2], [-1.6, 0.7, 0.55, 1.9], [-0.85, 0.7, 0.5, 1.5], [-0.1, 0.7, 0.45, 1.1], [0.65, 0.7, 0.4, 0.7]]) {
    k.flat(ORG_D, pointedShape(w, h), X0 + u, 0.14 + v - 0.2, fz, { ry: 0 });
    k.flat(0x5a2f22, pointedShape(w * 0.7, h * 0.88), X0 + u, 0.14 + v - 0.1, fz + 0.01, { ry: 0 });
  }
  // the end wall: a rectangular face with a plaster strip at the base
  k.box(WHITE, 0.12, 0.16, 1.4, X0 - L / 2 + 0.06, 0.14, -0.2, { outline: false });

  // ---- the Ram Yantra beside it: a round drum with a central pillar and radial walls (front right)
  const RX = 1.7, RZ = 1.6;
  k.lathe(ORG, [[0.9, 0.12], [0.9, 1.0], [0.78, 1.0], [0.78, 0.12]], RX, 0, RZ, { seg: 14 });
  k.lathe(WHITE, [[0.95, 0.98], [0.95, 1.08], [0.74, 1.08], [0.74, 0.98]], RX, 0, RZ, { seg: 14 });
  k.cyl(ORG_L, 0.12, 0.14, 1.2, RX, 0.12, RZ, { seg: 7 });
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; k.box(WHITE, 0.07, 0.5, 0.7, RX + Math.sin(a) * 0.45, 0.12, RZ + Math.cos(a) * 0.45, { ry: a, outline: false }); }
  // a second small drum, at the front left
  k.lathe(ORG, [[0.7, 0.12], [0.7, 0.8], [0.6, 0.8], [0.6, 0.12]], -2.0, 0, 1.7, { seg: 12 });
  k.lathe(WHITE, [[0.75, 0.78], [0.75, 0.88], [0.56, 0.88], [0.56, 0.78]], -2.0, 0, 1.7, { seg: 12 });
  k.cyl(ORG_L, 0.1, 0.12, 0.9, -2.0, 0.12, 1.7, { seg: 6 });

  // two low stone benches at the sitters' spots
  for (const s of [-1, 1]) { k.box(0xd9d0bc, 0.7, 0.4, 1.8, s * 4.6, 0, 0); k.box(STONE, 0.9, 0.08, 2.0, s * 4.6, 0.4, 0); }

  // name plate on the front of the wall
  const nb = paintBoard(2.2, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'जंतर मंतर', W * 0.5, H * 0.55, H * 0.46, { color: '#7a2f2f' }); latin(ctx, 'JANTAR MANTAR', W * 0.5, H * 0.94, H * 0.22, { color: '#2b2440' }); }, { seed: 61, px: 90 });
  k.plane(nb, 2.2, 0.55, [0, 0.45, 3.53], 0);

  const g = k.finish({ lean: 0.003 });
  g.name = 'floraFountain';
  g.userData = {
    footprint: 4.6,
    height: 5.6,
    colliders: [{ x: 0, z: 0, radius: 4.1, height: 1.2 }, { x: 0, z: 0, radius: 0.9, height: 5.0 }],
  };
  void THREE;
  return g;
}
