// Lotus Temple in its pools (replaces the Buddha island; layout id 'haji'; the walkable causeway piece is below).
// References: Wikimedia Commons "Lotus Temple in New Delhi 03-2016", "Lotus temple in Delhi, India (2018)", the front view with the red-sandstone podium and the stair up the middle.
// Three rings of NINE white marble petals: low outer petals leaning well over, taller middle petals, tallest inner petals closing toward a single crown, an entrance hood on the front;
// a low red sandstone podium with a white fascia, nine round pools between nine radial paths, a low red wall with white coping round the platform (a gap at the front for the causeway)
// and a few clipped shrubs. Local frame: entrance and causeway toward +Z. Island radius ~6.5, temple ~9 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, mulberry32, polyShape, paintBoard, teText, latin } from './kit.js';

const WHITE = 0xf6f1e8, SHADE = 0xe6ddcf;
const MARBLE = 0xf6f2ea, MARBLE_D = 0xe3ddd0, MARBLE_S = 0xcfc8ba, RED = 0xd98c78, RED_D = 0xb96c5a, STONE = 0xcfc6b6, WATER = 0xa6d4e6, SHRUB = 0x7fc08a;

/** one marble petal: a lofted ogive SHELL (outer + inner surface) of base width w and height h, base centre at radius `rad` on angle `a`, its tip displaced `lean` toward the centre,
 *  bulging outward by `bulge` in the middle (so neighbouring shells read as separate curved petals, not a cone) */
function petal(k, rad, a, w, h, lean, bulge, color, y0 = 0.1, thick = 0.26) {
  const N = 6, M = 10, pos = [], idx = [];
  for (let s = 0; s < 2; s++) for (let j = 0; j <= M; j++) for (let i = 0; i <= N; i++) {
    const v = j / M, u = -1 + (2 * i) / N;
    const hw = (w / 2) * Math.pow(1 - v, 0.85) * (1 + 0.28 * Math.sin(Math.PI * v));
    const rr = rad - lean * Math.pow(v, 1.6);
    const bl = bulge * Math.sin(Math.PI * (0.12 + 0.88 * v) * 0.95) * (1 - 0.65 * u * u) * (1 - v * 0.35);
    pos.push(u * hw, h * v, rr + bl - (s ? thick : 0));
  }
  const row = N + 1, layer = (M + 1) * row;
  for (let s = 0; s < 2; s++) for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) {
    const A = s * layer + j * row + i, B = A + 1, C = A + row, D = C + 1;
    if (!s) idx.push(A, B, C, B, D, C); else idx.push(A, C, B, B, C, D);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  g.rotateY(a);
  k.add(g, color, { pos: [0, y0, 0] });
}

export function createHajiAli(ink) {
  const k = new Kit(ink, { hatch: 0.15, seed: 121 });
  const r = mulberry32(122);
  const Y0 = 0.1;
  // island: stone ring + a few rocks (the temple stands in its pools)
  k.cyl(STONE, 6.4, 6.9, 1.5, 0, -1.4, 0, { seg: 14 });
  k.disc(0xe9dfcc, 6.3, 0, 0.1, 0, { seg: 18 });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + r() * 0.2, rad = 6.5 + r() * 0.5, s = 0.5 + r() * 0.4;
    k.ball(i % 2 ? 0xc3baa8 : 0xd3cab9, s, Math.sin(a) * rad, -0.5 + s * 0.2, Math.cos(a) * rad, { seg: 6, ring: 4, sy: 0.75 });
  }
  // low red wall with white coping round the platform (gap at the front)
  const wallPts = [];
  for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; if (Math.abs(Math.sin(a)) < 0.25 && Math.cos(a) > 0) continue; wallPts.push(a); }
  for (const a of wallPts) { const x = Math.sin(a) * 6.0, z = Math.cos(a) * 6.0; k.box(RED, 1.25, 0.6, 0.3, x, Y0, z, { ry: a }); k.box(MARBLE, 1.3, 0.1, 0.4, x, Y0 + 0.6, z, { ry: a, outline: false }); }
  // gate posts with little lamps where the causeway lands
  for (const sx of [-1, 1]) { k.cyl(MARBLE, 0.12, 0.14, 1.5, sx * 1.0, Y0, 6.1, { seg: 6 }); k.ball(0xfff1b8, 0.2, sx * 1.0, Y0 + 1.6, 6.1, { seg: 7, ring: 5 }); }

  // paved platform + nine radial paths between nine round pools
  k.disc(RED_D, 6.1, 0, 0.13, 0, { seg: 20, outline: false });
  const pools = [];
  for (let i = 0; i < 9; i++) {
    const a = ((i + 0.5) / 9) * Math.PI * 2 + Math.PI / 9 * 0, px = Math.sin(a) * 5.2, pz = Math.cos(a) * 5.2;
    k.cyl(STONE, 0.7, 0.75, 0.24, px, Y0, pz, { seg: 10 });
    k.disc(WATER, 0.58, px, Y0 + 0.25, pz, { seg: 10 });
    pools.push([px, pz]);
  }
  for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; k.box(0xe7b9a6, 0.7, 0.05, 2.6, Math.sin(a) * 4.5, Y0 + 0.03, Math.cos(a) * 4.5, { ry: a, outline: false }); }

  // the podium: a low red sandstone ring with a white fascia, and the entrance stair up the middle of the front
  k.cyl(RED, 4.2, 4.4, 0.75, 0, Y0, 0, { seg: 18 });
  k.cyl(MARBLE, 4.35, 4.35, 0.16, 0, Y0 + 0.75, 0, { seg: 18 });
  for (let i = 0; i < 4; i++) k.box(i % 2 ? RED : RED_D, 1.6 - i * 0.12, 0.2, 0.55, 0, Y0 + i * 0.2 - 0.0, 4.9 - i * 0.5);

  // the nine + nine + nine petals: outer (low, leaning far over), middle, inner (tallest, closing toward the crown)
  const base = Y0 + 0.85;
  for (let i = 0; i < 9; i++) petal(k, 4.2, (i / 9) * Math.PI * 2, 3.0, 2.5, 1.7, 0.35, MARBLE_D, base);
  for (let i = 0; i < 9; i++) petal(k, 3.1, ((i + 0.5) / 9) * Math.PI * 2, 2.3, 5.0, 1.7, 0.55, MARBLE, base);
  for (let i = 0; i < 9; i++) petal(k, 2.0, (i / 9) * Math.PI * 2, 1.75, 7.5, 1.3, 0.45, MARBLE_D, base);
  // the entrance hood: a dark pointed opening under the front outer petal
  const hf = k.face(0, base, 3.55, 0);
  hf.flat(0x4a4452, polyShape([[-0.8, 0], [0.8, 0], [0.55, 1.1], [0, 1.6], [-0.55, 1.1]]), 0, 0.0, 0.62);
  // a slim finial on the crown
  k.cyl(PAL.ink, 0.03, 0.03, 0.9, 0, base + 7.4, 0.0, { seg: 4, outline: false });

  // clipped shrubs on the podium corners and a name plate
  for (const a of [0.55, 2.55, 3.75, 5.75]) k.ball(SHRUB, 0.55, Math.sin(a) * 6.0 * 0 + Math.sin(a) * 4.5, Y0 + 0.5, Math.cos(a) * 4.5, { seg: 8, ring: 6, sy: 0.9 });
  const np = paintBoard(2.2, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'लोटस टेम्पल', W * 0.5, H * 0.55, H * 0.46, { color: '#7a2f2f' }); latin(ctx, 'LOTUS TEMPLE', W * 0.5, H * 0.94, H * 0.22, { color: '#2b2440' }); }, { seed: 12, px: 90 });
  k.plane(np, 2.2, 0.55, [2.5, Y0 + 0.62, 5.95], 0);

  const g = k.finish({ lean: 0.003 });
  g.name = 'hajiAli';
  g.userData = {
    footprint: 7.2,
    height: 10.4,
    colliders: [
      { x: 0, z: 0, radius: 2.7, height: 10 },
      ...Array.from({ length: 9 }, (_, i) => ({ x: Math.sin((i / 9) * Math.PI * 2) * 3.4, z: Math.cos((i / 9) * Math.PI * 2) * 3.4, radius: 1.3, height: 4 })),
      ...Array.from({ length: 9 }, (_, i) => ({ x: pools[i][0], z: pools[i][1], radius: 0.75, height: 0.5 })),
      ...wallPts.map((a) => ({ x: Math.sin(a) * 6.0, z: Math.cos(a) * 6.0, radius: 0.5, height: 1.0 })),
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
