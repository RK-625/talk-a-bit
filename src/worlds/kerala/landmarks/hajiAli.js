// Bolgatty Palace, Kochi, on its little island in the backwater: a white Dutch-era palace. Whitewashed ground floor with a row of round
// white verandah columns, a projecting upper floor of warm brown timber lattice windows, a deep hipped terracotta roof with a front gable,
// a white balustrade along the lawn and rain-trees behind. Photo: Wikimedia Commons "Bolgatty Palace.jpg".
// (Replaces San Thome; same island footprint, same walkable ring, same causeway.)
// Local frame: entrance and causeway toward +Z. Island radius ~6.5, palace ~7 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, archShape, mulberry32, polyShape, bilingualBoard } from './kit.js';

const WHITE = 0xfaf6ea, SHADE = 0xe9e3d3, STONE = 0xcfc6b6, TIM = 0x8a3d28, TILE = 0xa94a35, TILE_D = 0x853a2b, LIT = 0xf0cf7a, GREEN = 0x6e4a33;

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

  // ---- the palace ----
  const Y0 = 0.1;
  k.box(SHADE, 7.4, 0.35, 5.6, 0, Y0, -1.0);                                   // raised terrace
  const BY = Y0 + 0.35, G = 2.5;
  k.box(WHITE, 6.0, G, 3.6, 0, BY, -1.7);                                     // ground floor body
  for (const sx of [-1, 1]) k.box(WHITE, 1.5, G + 0.2, 3.8, sx * 3.6, BY, -1.6); // end wings
  // upper floor of timber lattice windows, overhanging the columned verandah
  k.box(TIM, 6.4, 2.3, 4.4, 0, BY + G, -1.2);
  k.box(0x6e2f20, 6.6, 0.14, 4.6, 0, BY + G - 0.05, -1.2);
  const uf = k.face(0, BY + G, 1.0, 0);
  for (let i = -3; i <= 3; i++) uf.window(i * 0.9, 0.45, 0.72, 1.35, { rect: true, glass: LIT, frame: 0x5a2b1c, bars: 1, sill: false, jitter: 0.01 });
  for (const [ox, ry] of [[3.2, Math.PI / 2], [-3.2, -Math.PI / 2]]) { const sf = k.face(ox, BY + G, -1.2, ry); for (const u of [-1.2, 0, 1.2]) sf.window(u, 0.45, 0.7, 1.3, { rect: true, glass: LIT, frame: 0x5a2b1c, bars: 1, sill: false }); }
  // round white columns across the verandah + balustrade up to the first floor
  for (let i = 0; i < 6; i++) { const x = -2.5 + i * 1.0; k.cyl(WHITE, 0.17, 0.2, G, x, BY, 0.85, { seg: 8 }); k.box(SHADE, 0.44, 0.12, 0.44, x, BY, 0.85); k.box(SHADE, 0.44, 0.12, 0.44, x, BY + G - 0.1, 0.85); }
  const gf = k.face(0, BY, 0.2, 0);
  gf.window(0, 0.0, 1.0, 2.0, { glass: 0x3c2a20, frame: SHADE, bars: 1, sill: false });
  for (const u of [-1.9, 1.9]) gf.window(u, 0.3, 0.8, 1.7, { rect: true, glass: LIT, frame: SHADE, bars: 1, sill: false });
  for (const sx of [-1, 1]) { const wf = k.face(sx * 3.6, BY, 0.3, 0); wf.window(0, 0.4, 0.8, 1.8, { pointed: false, glass: TIM, frame: WHITE, bars: 1, sill: false }); }
  // front steps
  for (let i = 0; i < 3; i++) k.box(SHADE, 3.4 - i * 0.2, 0.12 * (3 - i), 0.5, 0, Y0, 1.3 + i * 0.4);
  // deep hipped terracotta roof + a front gable
  const RY = BY + G + 2.3;
  k.box(0x6e4a33, 8.0, 0.16, 6.4, 0, RY, -1.2);
  k.hip(TILE, 8.0, 6.4, 2.4, 0, RY + 0.1, -1.2, { inset: 1.7 });
  k.extrude(WHITE, polyShape([[-1.5, 0], [1.5, 0], [0, 1.2]]), 0.3, 0, RY + 0.4, 1.25);
  k.extrude(TILE_D, polyShape([[-1.7, 0], [1.7, 0], [0, 1.3]]), 0.15, 0, RY + 0.35, 1.45);
  // low white balustrade along the lawn, with a gap for the path (as in the photo)
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 6; i++) k.box(WHITE, 0.14, 0.55, 0.14, sx * (1.7 + i * 0.5), Y0, 3.0, { outline: false });
    k.box(WHITE, 3.1, 0.1, 0.2, sx * 3.2, Y0 + 0.55, 3.0, { outline: false });
  }
  // rain-trees behind the palace
  for (const [x, z, s2] of [[-3.8, -3.8, 1.0], [3.6, -3.6, 1.1], [0.4, -4.4, 0.9]]) { k.cyl(PAL.woodDark, 0.25 * s2, 0.34 * s2, 2.2 * s2, x, Y0, z, { seg: 6 }); k.ball(0x6fae6a, 1.7 * s2, x, Y0 + 3.0 * s2, z, { seg: 8, ring: 6, sy: 0.75 }); }
  k.plane(bilingualBoard(2.4, 0.6, 'ബോൾഗാട്ടി കൊട്ടാരം', 'BOLGATTY PALACE', { fill: '#f6efd8', hatch: '#e0d5b0', tc: '#7a2f2f', taSize: 0.42, enSize: 0.22, px: 80 }), 2.3, 0.58, [0, 1.35, half + 0.2], 0);
  k.box(0xf6efd8, 2.5, 0.64, 0.08, 0, 1.0, half + 0.1);

  const g = k.finish({ lean: 0.006 });
  g.name = 'hajiAli';
  g.userData = {
    footprint: 7.2,
    height: 7.4,
    colliders: [
      { x: 0, z: -1.2, radius: 2.9, height: 6 },
      ...[-1, 1].map((sx) => ({ x: sx * 3.6, z: -1.6, radius: 1.3, height: 3.5 })),
      ...[[-3.8, -3.8], [3.6, -3.6], [0.4, -4.4]].map(([x, z]) => ({ x, z, radius: 0.5, height: 4 })),
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
