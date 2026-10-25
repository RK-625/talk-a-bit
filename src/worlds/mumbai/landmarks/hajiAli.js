// Haji Ali Dargah: white domed shrine with minarets on a small rocky island plinth, plus a walkable causeway piece.
// Local frame: entrance and causeway toward +Z. Island radius ~6.5, minarets ~8.4 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, archShape, mulberry32 } from './kit.js';

const WHITE = 0xfaf6ea, SHADE = 0xe9e3d3, GREEN = 0x9fd8bd, STONE = 0xcfc6b6;

function minaret(k, x, z, h) {
  k.cyl(WHITE, 0.42, 0.55, h * 0.62, x, 0.3, z, { seg: 8 });
  k.cyl(GREEN, 0.62, 0.62, 0.18, x, h * 0.62 + 0.2, z, { seg: 8 });
  k.cyl(WHITE, 0.52, 0.52, 0.5, x, h * 0.62 + 0.36, z, { seg: 8 });
  k.cyl(WHITE, 0.32, 0.38, h * 0.22, x, h * 0.62 + 0.8, z, { seg: 8 });
  const t = h * 0.62 + 0.8 + h * 0.22;
  k.dome(PAL.white, 0.42, x, t, z, { seg: 8, ring: 4, sy: 1.1 });
  k.cone(PAL.gold, 0.06, 0.5, x, t + 0.45, z, { seg: 5 });
  // ring bands
  for (const f of [0.2, 0.4]) k.cyl(SHADE, 0.55, 0.55, 0.08, x, h * f, z, { seg: 8 });
}
function chhatri(k, x, y, z) {
  for (const [dx, dz] of [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]]) k.cyl(WHITE, 0.06, 0.07, 0.8, x + dx, y, z + dz, { seg: 5 });
  k.cyl(SHADE, 0.45, 0.45, 0.1, x, y + 0.8, z, { seg: 8 });
  k.dome(WHITE, 0.45, x, y + 0.9, z, { seg: 8, ring: 4, sy: 1.1 });
  k.cone(PAL.gold, 0.05, 0.3, x, y + 1.4, z, { seg: 5 });
}

export function createHajiAli(ink) {
  const k = new Kit(ink, { hatch: 0.15, seed: 121 });
  const r = mulberry32(122);
  // island: stone ring + lumpy boulders
  k.cyl(STONE, 6.4, 6.9, 1.5, 0, -1.4, 0, { seg: 14 });
  k.disc(0xe3dac6, 6.3, 0, 0.1, 0, { seg: 14 });
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + r() * 0.2, rad = 6.5 + r() * 0.5, s = 0.6 + r() * 0.55;
    k.ball(i % 2 ? 0xc3baa8 : 0xd3cab9, s, Math.sin(a) * rad, -0.5 + s * 0.2, Math.cos(a) * rad, { seg: 6, ring: 4, sy: 0.75 });
  }
  // courtyard wall (gap at the front for the causeway) + gate arch
  const wallY = 0.1;
  const half = 4.8;
  k.box(WHITE, half * 2, 1.0, 0.35, 0, wallY, -half);
  k.box(WHITE, 0.35, 1.0, half * 2, -half, wallY, 0);
  k.box(WHITE, 0.35, 1.0, half * 2, half, wallY, 0);
  k.box(WHITE, half - 1.2, 1.0, 0.35, -(half + 1.2) / 2, wallY, half);
  k.box(WHITE, half - 1.2, 1.0, 0.35, (half + 1.2) / 2, wallY, half);
  for (let i = -4; i <= 4; i++) { k.box(SHADE, 0.32, 0.22, 0.4, i * 1.1, wallY + 1.0, -half); k.box(SHADE, 0.4, 0.22, 0.32, -half, wallY + 1.0, i * 1.1); k.box(SHADE, 0.4, 0.22, 0.32, half, wallY + 1.0, i * 1.1); }
  k.cyl(GREEN, 0.09, 0.09, 1.4, -1.0, wallY + 1.0, half, { seg: 5 });
  k.cyl(GREEN, 0.09, 0.09, 1.4, 1.0, wallY + 1.0, half, { seg: 5 });

  // shrine body
  const Y0 = 0.1;
  k.box(SHADE, 5.6, 0.35, 5.6, 0, Y0, 0); // raised terrace
  k.box(WHITE, 4.4, 3.0, 4.4, 0, Y0 + 0.35, 0);
  k.box(SHADE, 4.7, 0.3, 4.7, 0, Y0 + 3.35, 0);
  // arched openings on all sides
  for (const [ox, oz, ry] of [[0, 2.2, 0], [0, -2.2, Math.PI], [2.2, 0, Math.PI / 2], [-2.2, 0, -Math.PI / 2]]) {
    const f = k.face(ox, Y0 + 0.35, oz, ry);
    for (const u of [-1.25, 0, 1.25]) f.window(u, 0.2, 0.8, 1.9, { pointed: true, glass: 0x7f8fa0, frame: GREEN, bars: 0, sill: false });
    f.box(GREEN, 0, 2.55, 4.4, 0.12, 0.08, 0);
  }
  // chhatris at the four corners + central drum and dome
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) chhatri(k, sx * 1.85, Y0 + 3.65, sz * 1.85);
  k.cyl(WHITE, 1.55, 1.7, 1.0, 0, Y0 + 3.65, 0, { seg: 12 });
  k.cyl(GREEN, 1.75, 1.75, 0.14, 0, Y0 + 4.5, 0, { seg: 12 });
  k.dome(PAL.white, 1.65, 0, Y0 + 4.65, 0, { seg: 14, ring: 7, sy: 1.0 });
  k.cyl(PAL.gold, 0.08, 0.12, 0.55, 0, Y0 + 6.2, 0, { seg: 5 });
  k.ball(PAL.gold, 0.16, 0, Y0 + 6.8, 0, { seg: 6, ring: 4 });
  // green flag
  k.cyl(PAL.ink, 0.03, 0.03, 1.4, 1.1, Y0 + 3.9, -1.1, { seg: 4 });
  k.box(0x3cae7f, 0.8, 0.45, 0.03, 1.5, Y0 + 4.7, -1.1, { rz: -0.15 });
  // minarets
  minaret(k, -3.9, 3.9, 8.0);
  minaret(k, 3.9, 3.9, 8.0);
  minaret(k, -3.9, -3.9, 6.0);
  minaret(k, 3.9, -3.9, 6.0);

  const g = k.finish({ lean: 0.006 });
  g.name = 'hajiAli';
  g.userData = {
    footprint: 7.2,
    height: 8.6,
    colliders: [
      { x: 0, z: 0, radius: 3.1, height: 7 },
      ...[[-3.9, 3.9], [3.9, 3.9], [-3.9, -3.9], [3.9, -3.9]].map(([x, z]) => ({ x, z, radius: 0.7, height: 8 })),
      ...lineColliders(-half, -half, half, -half, 0.5, 1.0, 1.0),
      ...lineColliders(-half, -half, -half, half, 0.5, 1.0, 1.0),
      ...lineColliders(half, -half, half, half, 0.5, 1.0, 1.0),
      ...lineColliders(-half, half, -1.3, half, 0.5, 1.0, 1.0),
      ...lineColliders(1.3, half, half, half, 0.5, 1.0, 1.0),
    ],
    walkable: [{ shape: 'circle', x: 0, z: 0, radius: 6.2, y: 0.1 }],
  };
  return g;
}

/** Walkable causeway piece along Z (centred): stone deck 2.4 wide, low walls, piers down into the sea. Top at y=0.1. */
export function createCauseway(ink, length = 4) {
  const k = new Kit(ink, { hatch: 0.12, thickness: 2.2, seed: 131 });
  const L = length, W = 2.4;
  k.box(0xe6dccb, W, 0.5, L, 0, -0.4, 0);
  k.box(0xf0e8d8, W - 0.6, 0.06, L, 0, 0.1, 0, { outline: false });
  const n = Math.max(1, Math.round(L / 1.2));
  for (let i = 0; i < n; i++) k.box(0xb9ad98, W - 0.7, 0.02, 0.05, 0, 0.16, ((i + 0.5) / n - 0.5) * L, { outline: false });
  for (const sx of [-1, 1]) {
    k.box(WHITE, 0.3, 0.55, L, sx * (W / 2 - 0.05), 0.1, 0);
    k.box(SHADE, 0.4, 0.1, L, sx * (W / 2 - 0.05), 0.65, 0);
  }
  // piers below the deck (reach the sea bed)
  for (const s of [-1, 1]) for (const sx of [-1, 1]) k.box(STONE, 0.5, 2.0, 0.6, sx * 0.85, -2.4, s * L * 0.25);
  const g = k.finish({ lean: 0 });
  g.name = 'causeway';
  g.userData = {
    footprint: L / 2 + 1,
    length: L,
    width: W,
    height: 0.8,
    colliders: [-1, 1].flatMap((sx) => lineColliders(sx * (W / 2 - 0.05), -L / 2, sx * (W / 2 - 0.05), L / 2, 0.28, 1.8, 0.6)),
    walkable: [{ shape: 'rect', x: 0, z: 0, w: W - 0.5, d: L, y: 0.1 }],
  };
  return g;
}
