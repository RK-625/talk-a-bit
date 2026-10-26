// Lake-island temple (replaces Haji Ali; layout id 'haji'): a small whitewashed temple with a red-striped gopura tower on a rocky island,
// plus a walkable causeway piece.
// Local frame: entrance and causeway toward +Z. Island radius ~6.5, gopura ~8.4 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, archShape, mulberry32, polyShape } from './kit.js';

const WHITE = 0xfaf6ea, SHADE = 0xeee2cc, GREEN = 0x9fd8bd, STONE = 0xcfc6b6, RED = 0xd9503f;

function stripes(k, x, y, z, w, h, d, n = 6) { // red-and-white temple stripes on the four faces of a tier
  for (let i = 0; i < n; i++) {
    const u = -w / 2 + (i + 0.5) * (w / n);
    if (i % 2) { k.box(RED, w / n * 0.9, h, 0.05, x + u, y, z + d / 2 + 0.01, { outline: false }); k.box(RED, w / n * 0.9, h, 0.05, x + u, y, z - d / 2 - 0.01, { outline: false }); }
  }
}
/** a Dravidian gopura: stacked, shrinking tiers with stripes, a barrel roof and a gold kalasha */
function gopura(k, x, y, z, w0, tiers, th) {
  let w = w0, yy = y;
  for (let i = 0; i < tiers; i++) {
    const d = w * 0.78;
    k.box(i % 2 ? SHADE : WHITE, w, th, d, x, yy, z);
    stripes(k, x, yy, z, w, th, d, 6);
    k.box(STONE, w + 0.18, 0.1, d + 0.18, x, yy + th, z);
    for (const sx of [-1, 1]) k.box(0xfff6dc, 0.16, th * 0.55, 0.06, x + sx * w * 0.28, yy + th * 0.2, z + d / 2 + 0.03, { outline: false }); // little niches
    yy += th + 0.1; w *= 0.8;
  }
  k.cyl(WHITE, w * 0.55, w * 0.55, w * 1.4, x, yy + w * 0.2, z, { seg: 10, rz: Math.PI / 2 });   // barrel (shalai) roof
  k.cone(PAL.gold, 0.1, 0.7, x, yy + w * 0.2 + w * 0.55, z, { seg: 5 });
  for (const sx of [-1, 1]) k.cone(PAL.gold, 0.07, 0.4, x + sx * w * 0.7, yy + w * 0.2 + w * 0.15, z, { seg: 4 });
  return yy;
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
  k.cyl(RED, 0.09, 0.09, 1.4, -1.0, wallY + 1.0, half, { seg: 5 });
  k.cyl(RED, 0.09, 0.09, 1.4, 1.0, wallY + 1.0, half, { seg: 5 });

  // sanctum: raised terrace, whitewashed cella, a deep porch (mandapa) with pillars facing the causeway, tall gopura above
  const Y0 = 0.1;
  k.box(SHADE, 5.8, 0.35, 5.8, 0, Y0, 0);
  k.box(WHITE, 3.4, 2.4, 3.2, 0, Y0 + 0.35, -0.4);
  k.box(RED, 3.5, 0.22, 3.3, 0, Y0 + 0.35, -0.4);
  k.box(SHADE, 3.7, 0.26, 3.5, 0, Y0 + 2.75, -0.4);
  stripes(k, 0, Y0 + 0.57, -0.4, 3.4, 1.9, 3.2, 8);
  const topY = gopura(k, 0, Y0 + 3.0, -0.4, 3.0, 5, 0.62);
  // mandapa porch in front: four pillars and a flat roof with a little kalasha row
  k.box(SHADE, 3.8, 0.12, 2.0, 0, Y0 + 0.35, 2.0);
  for (const sx of [-1, 1]) for (const sz of [0, 1]) k.cyl(WHITE, 0.13, 0.15, 1.8, sx * 1.6, Y0 + 0.4, 1.3 + sz * 1.5, { seg: 6 });
  k.box(WHITE, 3.8, 0.28, 2.0, 0, Y0 + 2.2, 2.0);
  k.box(RED, 3.9, 0.12, 2.1, 0, Y0 + 2.5, 2.0);
  for (let i = 0; i < 5; i++) k.cone(PAL.gold, 0.1, 0.3, -1.4 + i * 0.7, Y0 + 2.62, 2.0, { seg: 5 });
  const door = k.face(0, Y0 + 0.4, 1.2, 0);
  door.window(0, 0.0, 1.0, 1.7, { glass: 0x4a2f2a, frame: RED, sill: false });
  // flag post (dhwajastambha) and a small lake-side lamp tower
  k.cyl(PAL.gold, 0.06, 0.08, 3.4, 1.9, Y0 + 0.4, 3.8, { seg: 5 });
  k.flat(RED, polyShape([[0, 0], [0.7, 0.12], [0, 0.4]]), 1.94, Y0 + 3.4, 3.8, {});
  k.flat(RED, polyShape([[0, 0], [-0.7, 0.12], [0, 0.4]]), 1.86, Y0 + 3.4, 3.8, { ry: Math.PI });
  k.cyl(STONE, 0.3, 0.35, 0.6, -1.9, Y0 + 0.4, 3.8, { seg: 6 });
  k.cone(PAL.gold, 0.2, 0.3, -1.9, Y0 + 1.0, 3.8, { seg: 6 });
  // corner mini-shrines (chhatri-like) at the four wall corners with small tiered tops
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const cx = sx * 3.9, cz = sz * 3.9;
    k.box(WHITE, 1.0, 1.1, 1.0, cx, Y0, cz);
    k.box(RED, 1.1, 0.12, 1.1, cx, Y0 + 1.1, cz);
    k.cone(WHITE, 0.62, 0.9, cx, Y0 + 1.22, cz, { seg: 4, ry: Math.PI / 4 });
    k.cone(PAL.gold, 0.06, 0.3, cx, Y0 + 2.1, cz, { seg: 5 });
  }
  // a small tree on the rock for shade
  k.cyl(PAL.woodDark, 0.16, 0.22, 1.4, 5.0, 0.0, -1.5, { seg: 6 });
  k.ball(PAL.leaf, 1.0, 5.0, 1.9, -1.5, { seg: 8, ring: 6 });
  void topY;

  const g = k.finish({ lean: 0.006 });
  g.name = 'hajiAli';
  g.userData = {
    footprint: 7.2,
    height: 8.6,
    colliders: [
      { x: 0, z: -0.4, radius: 2.2, height: 7 }, { x: 0, z: 1.6, radius: 2.0, height: 2.8 },
      ...[[-3.9, 3.9], [3.9, 3.9], [-3.9, -3.9], [3.9, -3.9]].map(([x, z]) => ({ x, z, radius: 0.7, height: 2.4 })),
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
