// Marine Drive modules: art-deco facades (3 variants), Queen's Necklace streetlight, tetrapod cluster, promenade wall.
// All local frames: y up, base y=0, FRONT (the sea / street side the viewer sees) is +Z.
import * as THREE from 'three';
import { Kit, PAL, glowSprite, lineColliders, rectShape, polyShape, mulberry32 } from './kit.js';

const TRIM = 0xfdf8ea;
const VARIANTS = [
  { name: 'pink', wall: 0xf4c3cf, accent: 0xe9806e, floors: 5 },
  { name: 'mint', wall: 0xbfe6d3, accent: 0x5fa8a3, floors: 6 },
  { name: 'peach', wall: 0xf9d9ab, accent: 0xd9795a, floors: 4 },
];

/** Art-deco apartment block. Size ~7.4 w x 5.2 d x 9..13 h. variant 0 pink curved bay, 1 mint tower, 2 peach sunburst. */
export function createArtDeco(ink, variant = 0) {
  if (typeof ink === 'number') { variant = ink; ink = undefined; } // lab: &spec=1
  const v = VARIANTS[((variant % 3) + 3) % 3];
  const k = new Kit(ink, { hatch: 0.16, seed: 70 + variant });
  const W = 7.4, D = 4.8, FH = 2.1;
  const H = v.floors * FH + 0.6;
  k.base(W + 0.8, D + 0.8, { color: PAL.stone });
  k.box(v.wall, W, H, D, 0, 0, 0);
  k.box(v.accent, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
  const f = k.face(0, 0, D / 2, 0);

  if (variant === 0) {
    // curved central bay with ribbon balconies
    k.cyl(v.wall, 2.0, 2.0, H, 0, 0, D / 2 + 0.3, { seg: 14 });
    for (let i = 1; i <= v.floors; i++) {
      k.cyl(TRIM, 2.45, 2.45, 0.14, 0, i * FH - 0.3, D / 2 + 0.3, { seg: 14 });
      k.cyl(v.accent, 2.47, 2.47, 0.06, 0, i * FH - 0.16, D / 2 + 0.3, { seg: 14, outline: false });
      for (let j = -3; j <= 3; j++) {
        const a = (j / 3) * 1.1;
        k.box(PAL.glassDark, 0.62, 1.0, 0.1, Math.sin(a) * 2.02, (i - 1) * FH + 0.8, D / 2 + 0.3 + Math.cos(a) * 2.02, { ry: a, outline: false });
      }
    }
    // side wings windows with rect windows
    for (const sx of [-1, 1]) for (let i = 0; i < v.floors; i++) for (const du of [2.9, 3.35]) {
      if (du > 3.5) continue;
      f.window(sx * du, i * FH + 0.8, 0.5, 1.0, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
    }
    k.cyl(v.accent, 2.2, 2.2, 0.35, 0, H, D / 2 + 0.3, { seg: 14 });
    k.cyl(v.wall, 0.9, 1.0, 1.3, 0, H + 0.35, D / 2 + 0.3, { seg: 10 });
    k.cyl(TRIM, 0.04, 0.04, 2.2, 0, H + 1.5, D / 2 + 0.3, { seg: 4 });
    k.box(v.accent, 0.9, 0.5, 0.04, 0.5, H + 3.0, D / 2 + 0.3);
  } else if (variant === 1) {
    // tall central spine with vertical fins; stepped wings
    const TH = H + 3.2;
    k.box(v.wall, 3.0, TH - H, 3.4, 0, H, 0.3);
    k.box(v.accent, 3.2, 0.35, 3.6, 0, TH, 0.3);
    k.box(TRIM, 2.0, 0.9, 2.4, 0, TH + 0.35, 0.3);
    k.box(v.accent, 1.0, 0.9, 1.4, 0, TH + 1.25, 0.3);
    k.cyl(PAL.stoneDark, 0.04, 0.05, 1.5, 0, TH + 2.15, 0.3, { seg: 4 });
    for (let i = -2; i <= 2; i++) f.box(TRIM, i * 0.7, 0.5, 0.18, H + 3.0, 0.12);
    for (let i = 0; i < v.floors; i++) {
      f.box(TRIM, 0, i * FH + 1.8, W + 0.3, 0.12, 0.55, 0);
      for (const u of [-2.9, -1.9, 1.9, 2.9]) f.window(u, i * FH + 0.75, 0.65, 1.0, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
      for (const u of [-0.7, 0.7]) f.window(u, i * FH + 0.75, 0.65, 1.0, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
    }
    for (let i = 0; i < 3; i++) f.window((i - 1) * 0.9, H + 0.45 + 0, 0.5, 0.9, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false, n: 0.02 });
  } else {
    // horizontal ribbons + portholes, sunburst crown
    for (let i = 0; i < v.floors; i++) {
      f.box(v.accent, 0, i * FH + 1.65, W + 0.2, 0.14, 0.5, 0);
      for (let j = -3; j <= 3; j++) {
        if (i === 0 && Math.abs(j) < 1) continue;
        f.window(j * 0.98, i * FH + 0.65, 0.7, 0.9, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
      }
    }
    f.window(0, 0.55, 1.2, 1.7, { glass: PAL.glassDark, frame: TRIM, bars: 1 }); // door
    // sunburst: radial fins above the parapet
    k.box(TRIM, W + 0.3, 0.4, D + 0.3, 0, H, 0);
    for (let i = 0; i < 9; i++) {
      const a = -Math.PI * 0.45 + (i / 8) * Math.PI * 0.9;
      const len = 2.9;
      k.box(i % 2 ? v.accent : TRIM, 0.28, len, 0.4, Math.sin(a) * 0.9, H + 0.4, D / 2 - 0.4, { rz: -a, scale: undefined });
      void len;
    }
    k.cyl(v.accent, 0.9, 1.0, 0.4, 0, H + 0.4, D / 2 - 0.4, { seg: 10 });
  }
  // parapet + side windows (all variants)
  k.box(TRIM, W + 0.3, 0.32, D + 0.3, 0, H - 0.05, 0);
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const s = k.face(ox, 0, 0, ry);
    for (let i = 0; i < v.floors; i++) for (const u of [-1.3, 0, 1.3]) s.window(u, i * FH + 0.8, 0.55, 0.95, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
  }
  const g = k.finish({ lean: 0.006 });
  g.name = `artDeco${variant}`;
  g.userData = {
    footprint: 4.6,
    height: H + 3,
    colliders: [
      { x: -2.4, z: 0.2, radius: 2.4, height: H }, { x: 2.4, z: 0.2, radius: 2.4, height: H },
      { x: 0, z: 0.5, radius: 2.4, height: H },
    ],
  };
  return g;
}

let bulbGeoDone = false;
/** Queen's Necklace streetlight: slim pole, curved arm, glowing globe + soft glow sprite. ~5.6 tall. */
export function createStreetlight(ink) {
  const k = new Kit(ink, { hatch: 0.08, thickness: 2.0, seed: 81 });
  k.cyl(PAL.stoneDark, 0.34, 0.42, 0.3, 0, -0.1, 0, { seg: 8 });
  k.cyl(0x6f6a82, 0.1, 0.17, 5.0, 0, 0.2, 0, { seg: 7 });
  k.cyl(0x6f6a82, 0.2, 0.2, 0.2, 0, 1.0, 0, { seg: 7 });
  k.cyl(PAL.gold, 0.15, 0.15, 0.1, 0, 5.2, 0, { seg: 7 });
  // gentle crescent arm
  k.add(new THREE.TorusGeometry(0.5, 0.05, 4, 8, Math.PI * 0.6), 0x6f6a82, { pos: [0.5, 5.0, 0], rot: [0, 0, Math.PI * 0.4] });
  // lamp head: cap + globe (cream so it reads as lit)
  k.cone(0x6f6a82, 0.34, 0.28, 0.5, 5.75, 0, { seg: 8 });
  k.ball(0xfff1b8, 0.3, 0.5, 5.6, 0, { seg: 8, ring: 6, outline: true });
  const g = k.finish({ lean: 0.01 });
  const glow = glowSprite('255,224,140', 3.0);
  glow.position.set(0.5, 5.6, 0);
  g.add(glow);
  g.name = 'streetlight';
  g.userData = { footprint: 0.6, height: 6, bulb: [0.5, 5.6, 0], colliders: [{ x: 0, z: 0, radius: 0.32, height: 5.5 }] };
  void bulbGeoDone;
  return g;
}

function limb(dir, len, r0, r1) {
  const g = new THREE.CylinderGeometry(r1, r0, len, 6, 1).translate(0, len / 2, 0);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize()));
  return g;
}
const TETRA_DIRS = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((a) => new THREE.Vector3(...a));

/** Cluster of concrete tetrapods (default 6, stacked 3-2-1). ~4 wide, ~3 tall. */
export function createTetrapods(ink, count = 6, seed = 5) {
  if (typeof ink === 'number') { count = ink; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed });
  const r = mulberry32(seed * 97 + 3);
  const spots = [[-1.1, 0.95, 0.2], [1.2, 0.95, -0.1], [0.1, 0.95, -1.6], [-0.5, 2.05, -0.5], [0.7, 2.0, -0.8], [0.0, 3.0, -0.8]].slice(0, count);
  const tint = [0xd9d3c8, 0xe0d0c6, 0xd2d4cc];
  for (const [x, y, z] of spots) {
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(r() * 6, r() * 6, r() * 6));
    for (const d of TETRA_DIRS) {
      const g = limb(d.clone().applyQuaternion(q), 1.05, 0.34, 0.2);
      k.add(g, tint[Math.floor(r() * 3)], { pos: [x, y, z] });
    }
    k.ball(0xd9d3c8, 0.36, x, y, z, { seg: 6, ring: 5 });
  }
  k.box(PAL.stoneDark, 4.4, 0.6, 3.6, 0, -0.55, -0.3); // rubble foundation
  const g = k.finish({ lean: 0 });
  g.name = 'tetrapods';
  g.userData = { footprint: 2.6, height: 3.6, colliders: [{ x: 0, z: -0.5, radius: 2.0, height: 2.8 }] };
  return g;
}

/** Straight promenade piece along X (centred), sea wall on the +Z (sea) side, paved deck behind it. */
export function createPromenadeSegment(ink, length = 4) {
  if (typeof ink === 'number') { length = ink; ink = undefined; } // also accepts createPromenadeSegment(length)
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 91 });
  const L = length;
  // foundation + deck
  k.box(PAL.plinth, L, 1.05, 4.2, 0, -1.0, -0.4);
  k.box(0xd9cdb8, L, 0.07, 3.0, 0, 0, -0.55);
  const n = Math.max(1, Math.round(L / 1.5));
  for (let i = 0; i < n; i++) k.box(0xb9ad98, 0.05, 0.02, 3.0, -L / 2 + (i + 0.5) * (L / n), 0.07, -0.55, { outline: false }); // paver seams
  k.box(0xb3a999, L, 0.14, 0.3, 0, 0, -2.2); // kerb on the road side
  // sea wall with cap, and a sloping stone apron + boulders going down to the water
  k.box(0xe2d8c6, L, 1.0, 0.55, 0, 0, 1.1);
  k.box(0xf1e9d8, L, 0.16, 0.8, 0, 1.0, 1.1);
  const m = Math.max(1, Math.round(L / 1.0));
  for (let i = 0; i < m; i++) k.box(0xcfc4ae, 0.06, 0.74, 0.04, -L / 2 + (i + 0.5) * (L / m), 0.1, 1.4, { outline: false });
  k.add(new THREE.BoxGeometry(L, 0.3, 1.5), 0xcfc4ae, { pos: [0, -0.4, 2.1], rot: [0.5, 0, 0] });
  // alternating bench-height posts along the wall
  const posts = Math.max(2, Math.round(L / 2));
  for (let i = 0; i < posts; i++) k.box(0xf1e9d8, 0.3, 0.3, 0.3, -L / 2 + (i + 0.5) * (L / posts), 1.16, 1.1);
  const g = k.finish({ lean: 0 });
  g.name = 'promenade';
  g.userData = {
    footprint: L / 2 + 1,
    length: L,
    height: 1.2,
    colliders: lineColliders(-L / 2, 1.1, L / 2, 1.1, 0.4, 1.4, 0.6),
    walkable: [{ shape: 'rect', x: 0, z: -0.55, w: L, d: 3.0, y: 0.07 }],
  };
  return g;
}
