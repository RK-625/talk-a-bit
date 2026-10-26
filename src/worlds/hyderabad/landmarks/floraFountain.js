// Gulzar Houz fountain (replaces Flora Fountain; layout id 'flora'). Reference: Wikimedia Commons "Gulzar Houz" (old-city junction fountain).
// A broad round stone pool with a teal-painted inner rim, a three-tier carved bowl fountain with a finial, and four free-standing pointed
// arches (the old char-kaman gateways) around it, two benches and a Telugu + English name plate. Fits the old ~8.8 x 8.8 pad; colliders unchanged. Front +Z.
import * as THREE from 'three';
import { Kit, PAL, ringArch, paintBoard, teText, latin } from './kit.js';

const ST = 0xdcd2bc, ST_D = 0xb9ad94, TEAL = 0x4fb3a8, WATER = 0xa6d4e6, WH = 0xf0e9d6;

const bowl = (r) => [[0.18, 0], [r * 0.5, 0.08], [r, 0.42], [r * 1.02, 0.5], [r * 0.9, 0.48], [r * 0.78, 0.4], [r * 0.3, 0.16], [0.12, 0.14]];

export function createFloraFountain(ink) {
  const k = new Kit(ink, { hatch: 0.12, seed: 61 });
  // foundation (reaches under the curved ground) + round paved apron
  k.lathe(PAL.stone, [[0, -1.0], [4.4, -1.0], [4.4, 0.0], [4.1, 0.05], [0, 0.05]], 0, 0, 0, { seg: 20 });
  k.lathe(ST, [[3.9, 0.0], [3.9, 0.12], [3.0, 0.12], [3.0, 0.0]], 0, 0, 0, { seg: 20 });

  // the round pool: stone wall, teal inner rim, water
  k.lathe(ST, [[3.1, 0.05], [3.1, 0.82], [2.62, 0.82], [2.62, 0.05]], 0, 0, 0, { seg: 22 });
  k.lathe(TEAL, [[2.62, 0.2], [2.62, 0.78], [2.5, 0.78], [2.5, 0.2]], 0, 0, 0, { seg: 22, outline: false });
  k.lathe(WH, [[3.18, 0.8], [3.18, 0.92], [2.55, 0.92], [2.55, 0.8]], 0, 0, 0, { seg: 22 });
  k.disc(WATER, 2.5, 0, 0.62, 0, { seg: 22 });

  // central pedestal and three tiers of bowls, a finial on top
  k.cyl(ST_D, 0.5, 0.8, 0.9, 0, 0.1, 0, { seg: 10 });
  k.lathe(ST, bowl(1.9), 0, 0.95, 0, { seg: 16 });
  k.cyl(ST, 0.3, 0.38, 0.9, 0, 1.15, 0, { seg: 8 });
  k.lathe(ST, bowl(1.2), 0, 2.0, 0, { seg: 14 });
  k.cyl(ST, 0.2, 0.26, 0.8, 0, 2.2, 0, { seg: 8 });
  k.lathe(ST, bowl(0.7), 0, 2.95, 0, { seg: 12 });
  k.cyl(ST_D, 0.1, 0.16, 0.7, 0, 3.1, 0, { seg: 6 });
  k.ball(PAL.gold, 0.16, 0, 3.95, 0, { seg: 6, ring: 4 });
  k.cone(0xa6d4e6, 0.16, 0.8, 0, 3.2, 0, { seg: 5, outline: false }); // a little spout of water
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; k.disc(WATER, 0.28, Math.sin(a) * 1.5, 1.4, Math.cos(a) * 1.5, { seg: 6 }); }

  // four free-standing pointed arches on the diagonals (char-kaman gateways), each facing the fountain
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const x = Math.sin(a) * 3.65, z = Math.cos(a) * 3.65;
    k.extrude(ST, ringArch(0.85, 1.25, 1.6, true), 0.5, x, 0.02, z, { ry: a + Math.PI });
    k.box(WH, 2.9, 0.18, 0.64, x, 3.1, z, { ry: a + Math.PI });
  }

  // two low stone benches at the sitters' spots
  for (const sx of [-1, 1]) { k.box(0xd9d0bc, 0.7, 0.4, 1.8, sx * 4.6, 0, 0); k.box(ST, 0.9, 0.08, 2.0, sx * 4.6, 0.4, 0); }

  // name plate on the front of the pool wall
  const nb = paintBoard(2.0, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'గుల్జార్ హౌజ్', W * 0.5, H * 0.55, H * 0.46, { color: '#7a2f2f' }); latin(ctx, 'GULZAR HOUZ', W * 0.5, H * 0.94, H * 0.22, { color: '#2b2440' }); }, { seed: 61, px: 90 });
  k.plane(nb, 2.0, 0.55, [0, 0.5, 3.15], 0);

  const g = k.finish({ lean: 0.003 });
  g.name = 'floraFountain';
  g.userData = {
    footprint: 4.6,
    height: 5.0,
    colliders: [{ x: 0, z: 0, radius: 4.1, height: 1.2 }, { x: 0, z: 0, radius: 0.9, height: 5.0 }],
  };
  void THREE;
  return g;
}
