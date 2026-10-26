// Buddha statue on its rock island in the lake (replaces the Haji Ali island; layout id 'haji'; walkable causeway piece below).
// Reference: Wikimedia Commons "Buddha Statue, Hussain Sagar" / "Hussain Sagar Buddha Statue": a tall white standing monolith with the right hand raised,
// robe in long folds, on a stepped square pedestal over a lotus base, on a rocky island platform with a low railing and a few palms.
// Local frame: entrance and causeway toward +Z. Island radius ~6.5, statue ~10 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, mulberry32, polyShape, paintBoard, teText, latin } from './kit.js';
import { palm } from './parts.js';

const WHITE = 0xf6f1e8, SHADE = 0xe6ddcf, STONE = 0xcfc6b6, PINK = 0xf1d9d6, RAIL = 0xeee6d6;

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
  // railing around the platform (gap at the front for the causeway)
  const wallY = 0.1, half = 4.8;
  const rail = (w, d, x, z) => { k.box(WHITE, w, 0.55, d, x, wallY, z); k.box(SHADE, w + 0.05, 0.1, d + 0.1, x, wallY + 0.55, z); };
  rail(half * 2, 0.3, 0, -half); rail(0.3, half * 2, -half, 0); rail(0.3, half * 2, half, 0);
  rail(half - 1.2, 0.3, -(half + 1.2) / 2, half); rail(half - 1.2, 0.3, (half + 1.2) / 2, half);
  for (let i = -4; i <= 4; i++) { k.cyl(WHITE, 0.07, 0.07, 0.6, i * 1.1, wallY + 0.55, -half, { seg: 5, outline: false }); k.cyl(WHITE, 0.07, 0.07, 0.6, -half, wallY + 0.55, i * 1.1, { seg: 5, outline: false }); k.cyl(WHITE, 0.07, 0.07, 0.6, half, wallY + 0.55, i * 1.1, { seg: 5, outline: false }); }
  // gate posts with little lamps where the causeway lands
  for (const sx of [-1, 1]) { k.cyl(WHITE, 0.12, 0.14, 1.5, sx * 1.0, wallY + 0.55, half, { seg: 6 }); k.ball(0xfff1b8, 0.2, sx * 1.0, wallY + 2.2, half, { seg: 7, ring: 5 }); }

  // pedestal: stepped square tiers with a carved dark panel, then a lotus base
  const Y0 = 0.1;
  k.box(SHADE, 5.6, 0.4, 5.6, 0, Y0, 0);
  k.box(WHITE, 4.8, 0.5, 4.8, 0, Y0 + 0.4, 0);
  k.box(SHADE, 4.9, 0.12, 4.9, 0, Y0 + 0.9, 0);
  k.box(WHITE, 3.8, 1.5, 3.8, 0, Y0 + 1.02, 0);
  for (const [dx, dz, ry] of [[0, 1.93, 0], [0, -1.93, Math.PI], [1.93, 0, Math.PI / 2], [-1.93, 0, -Math.PI / 2]]) {
    const f = k.face(dx, Y0 + 1.02, dz, ry);
    f.flat(0xcfc3b0, polyShape([[-1.1, 0.25], [1.1, 0.25], [1.1, 1.25], [-1.1, 1.25]]), 0, 0, 0.03);
    f.flat(PINK, polyShape([[-0.9, 0.45], [0.9, 0.45], [0.9, 1.05], [-0.9, 1.05]]), 0, 0, 0.05);
  }
  k.box(SHADE, 4.0, 0.14, 4.0, 0, Y0 + 2.52, 0);
  k.box(WHITE, 3.0, 0.5, 3.0, 0, Y0 + 2.66, 0);
  k.lathe(PINK, [[0.01, 0], [1.5, 0.02], [1.65, 0.2], [1.35, 0.42], [1.0, 0.5], [0.01, 0.5]], 0, Y0 + 3.16, 0, { seg: 12 }); // lotus petals
  const BY = Y0 + 3.62;

  // the Buddha: robe drape (lathe), shoulders, head with ushnisha, raised right hand, left hand at the robe
  k.lathe(WHITE, [[0.01, 0], [0.98, 0.05], [0.88, 1.4], [0.8, 2.8], [0.7, 3.9], [0.58, 4.8], [0.5, 5.3], [0.01, 5.4]], 0, BY, 0, { seg: 10 });
  for (let i = 0; i < 5; i++) { const x = -0.5 + i * 0.25; k.box(SHADE, 0.05, 3.3, 0.06, x, BY + 0.3, 0.74 - Math.abs(x) * 0.25, { outline: false }); } // robe folds
  k.ball(WHITE, 0.62, 0, BY + 5.2, 0, { sx: 1.0, sy: 0.7, sz: 0.7, seg: 9, ring: 6 });                    // shoulders
  k.cyl(SHADE, 0.2, 0.26, 0.35, 0, BY + 5.35, 0, { seg: 7 });                                            // neck
  k.ball(WHITE, 0.4, 0, BY + 5.95, 0.02, { seg: 9, ring: 7 });                                            // head
  k.ball(SHADE, 0.17, 0, BY + 6.3, 0.0, { seg: 6, ring: 5 });                                             // ushnisha
  k.ball(0x6a5a52, 0.05, -0.14, BY + 5.98, 0.37, { seg: 4, ring: 3, outline: false }); k.ball(0x6a5a52, 0.05, 0.14, BY + 5.98, 0.37, { seg: 4, ring: 3, outline: false });
  k.add(new THREE.CylinderGeometry(0.15, 0.2, 1.2, 6), WHITE, { pos: [0.78, BY + 4.7, 0.3], rot: [-0.2, 0, -0.5] }); // raised right arm
  k.ball(WHITE, 0.2, 1.15, BY + 5.3, 0.38, { sx: 0.7, sy: 1.1, sz: 0.5, seg: 6, ring: 5 });               // open palm
  k.add(new THREE.CylinderGeometry(0.15, 0.2, 1.5, 6), WHITE, { pos: [-0.72, BY + 4.3, 0.18], rot: [-0.1, 0, 0.2] }); // left arm down
  k.ball(WHITE, 0.17, -0.8, BY + 3.55, 0.28, { seg: 6, ring: 5 });

  // palms and shrubs on the rock + a name plate
  [[-4.0, 3.6], [4.2, 3.4], [-4.0, -3.6], [4.1, -3.8]].forEach(([x, z], i) => palm(k, x, z, 2.2 + (i % 2) * 0.7, { y0: Y0 }));
  const np = paintBoard(2.0, 0.55, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'బుద్ధ విగ్రహం', W * 0.5, H * 0.55, H * 0.46, { color: '#7a2f2f' }); latin(ctx, 'BUDDHA STATUE', W * 0.5, H * 0.94, H * 0.22, { color: '#2b2440' }); }, { seed: 12, px: 90 });
  k.plane(np, 2.0, 0.55, [0, Y0 + 1.5, 2.0 + 0.06], 0);

  const g = k.finish({ lean: 0.004 });
  g.name = 'hajiAli';
  g.userData = {
    footprint: 7.2,
    height: 10.4,
    colliders: [
      { x: 0, z: 0, radius: 2.4, height: 9 },
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
