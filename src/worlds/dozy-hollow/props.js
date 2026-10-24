// Dozy Hollow props: trees, rocks, pebbles, flowers, mushrooms, grass tufts.
import * as THREE from 'three';
import { createInkMaterial, INK_COLOR } from '../../engine/ink.js';
import { Parts, mulberry32, sphere, cyl, cone, buildInstanced } from '../../engine/scatter.js';

// ---- tunables --------------------------------------------------------------
// Props are placed in clusters (groves, meadows, rock piles) with empty meadows in between.
// group: which set of cluster centres to use; frac: share placed in clusters; sigma: cluster size (units)
const KINDS = {
  tree: { count: 90, group: 'grove', frac: 0.78, sigma: 6.5 },
  rock: { count: 40, group: 'pile', frac: 0.7, sigma: 3.2 },
  pebble: { count: 34, group: 'pile', frac: 0.8, sigma: 4.2 },
  flower: { count: 110, group: 'meadow', frac: 0.88, sigma: 5.5 },
  mushroom: { count: 30, group: 'grove', frac: 0.7, sigma: 5 },
};
export const GROUPS = { grove: 8, pile: 6, meadow: 7 };
export const SPAWN_CLEAR = 6;
export const EXTRA_SPACING = 0.6;

const INK = INK_COLOR;
const PINK = 0xee7f9b;
const WHITE = 0xfaf6ea;


// Sleepy face (closed-eye arcs, blush, small mouth) on a surface facing +Z (sgn -1: facing -Z).
function sleepyFace(p, { z, y, spread, s, sgn = 1 }) {
  const ry = sgn < 0 ? Math.PI : 0;
  for (const sx of [-1, 1]) {
    p.add(new THREE.TorusGeometry(0.095 * s, 0.024 * s, 5, 10, Math.PI), INK, { pos: [sx * spread, y + 0.03 * s, z * sgn], rot: [0, ry, Math.PI], outline: false });
    p.add(sphere(0.1 * s, 8, 6), PINK, { pos: [sx * (spread + 0.17 * s), y - 0.13 * s, (z - 0.03) * sgn], scale: [1, 0.7, 0.35], outline: false });
  }
  p.add(new THREE.TorusGeometry(0.055 * s, 0.018 * s, 5, 8, Math.PI), INK, { pos: [0, y - 0.1 * s, z * sgn], rot: [0, ry, Math.PI], outline: false });
}

// a little "z" made of three bars, floating beside a sleeping rock
function zDoodle(p, x, y, z, s) {
  const bar = (w, rotZ, px, py) => p.add(new THREE.BoxGeometry(w, 0.05 * s, 0.03 * s), INK, { pos: [x + px, y + py, z], rot: [0, 0, rotZ], outline: false });
  bar(0.26 * s, 0, 0, 0.13 * s);
  bar(0.3 * s, Math.PI * 0.3, 0, 0);
  bar(0.26 * s, 0, 0, -0.13 * s);
}

// ---- species ---------------------------------------------------------------
function treeSpecies(canopy, shape) {
  const p = new Parts();
  const trunk = 0xb98c64;
  p.add(cyl(0.2, 0.3, 1.9), trunk, { pos: [0, 0.95, 0] });
  if (shape === 'ball') p.add(sphere(1.3, 14, 10), canopy, { pos: [0, 2.8, 0] });
  if (shape === 'cluster') {
    p.add(sphere(0.95, 12, 9), canopy, { pos: [0, 2.7, 0] });
    p.add(sphere(0.75, 12, 9), canopy, { pos: [0.7, 2.25, 0.2] });
    p.add(sphere(0.7, 12, 9), canopy, { pos: [-0.55, 2.2, -0.3] });
  }
  if (shape === 'cone') {
    p.add(cone(1.25, 1.6), canopy, { pos: [0, 2.2, 0] });
    p.add(cone(0.95, 1.4), canopy, { pos: [0, 3.0, 0] });
    p.add(cone(0.6, 1.1), canopy, { pos: [0, 3.7, 0] });
  }
  return { parts: p, collide: { radius: 0.42, height: 3 }, bodyRadius: 0.42, scale: [0.85, 1.4] };
}

function rockSpecies(color, lumpSeed, { z = false, faceScale = 1.9, scale = [0.75, 1.5], collide = true } = {}) {
  const p = new Parts();
  const g = new THREE.IcosahedronGeometry(0.85, 1);
  const pos = g.attributes.position;
  const rnd = mulberry32(lumpSeed);
  const lumps = new Map();
  for (let i = 0; i < pos.count; i++) { // lumpy but watertight: same offset for coincident verts
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    const k = v.toArray().map((x) => x.toFixed(3)).join();
    if (!lumps.has(k)) lumps.set(k, 0.95 + rnd() * 0.12);
    v.multiplyScalar(lumps.get(k));
    pos.setXYZ(i, v.x, v.y * 0.82, v.z);
  }
  g.computeVertexNormals();
  p.add(g, color, { pos: [0, 0.5, 0] });
  // a face on both sides, so a sleepy face is always turned toward someone
  const face = { z: 0.86, y: 0.62, spread: 0.26, s: faceScale };
  sleepyFace(p, face);
  sleepyFace(p, { ...face, sgn: -1 });
  if (z) zDoodle(p, 0.62, 1.32, 0.45, 1.3);
  return { parts: p, collide: collide ? { radius: 0.85, height: 1.2 } : null, bodyRadius: 0.85, scale };
}

function dandelion() {
  const p = new Parts();
  p.add(cyl(0.025, 0.03, 0.8, 5), 0x8fcf84, { pos: [0, 0.4, 0] });
  p.add(sphere(0.2, 10, 8), 0xfaf3d2, { pos: [0, 0.88, 0] });
  p.add(new THREE.IcosahedronGeometry(0.1, 0), 0xf3dc78, { pos: [0, 0.88, 0], outline: false });
  return { parts: p, collide: null, bodyRadius: 0.2, scale: [0.8, 1.3] };
}

function sunflower() {
  const p = new Parts();
  p.add(cyl(0.03, 0.04, 0.9, 5), 0x8fcf84, { pos: [0, 0.45, 0] });
  p.add(cyl(0.3, 0.3, 0.05, 12), 0xf6d65e, { pos: [0, 0.95, 0.05], rot: [Math.PI / 2.4, 0, 0] });
  p.add(cyl(0.13, 0.13, 0.08, 10), 0xb98056, { pos: [0, 0.97, 0.07], rot: [Math.PI / 2.4, 0, 0], outline: false });
  p.add(sphere(0.2, 8, 6), 0x9fd68e, { pos: [-0.17, 0.35, 0], scale: [1, 0.3, 0.6], rot: [0, 0, 0.5] });
  return { parts: p, collide: null, bodyRadius: 0.3, scale: [0.8, 1.3] };
}

function daisy(petal, centre) {
  const p = new Parts();
  p.add(cyl(0.022, 0.028, 0.6, 5), 0x8fcf84, { pos: [0, 0.3, 0] });
  p.add(cyl(0.24, 0.24, 0.04, 10), petal, { pos: [0, 0.64, 0.04], rot: [Math.PI / 2.6, 0, 0] });
  p.add(cyl(0.09, 0.09, 0.07, 8), centre, { pos: [0, 0.66, 0.06], rot: [Math.PI / 2.6, 0, 0], outline: false });
  return { parts: p, collide: null, bodyRadius: 0.24, scale: [0.8, 1.4] };
}

function tulip(color) {
  const p = new Parts();
  p.add(cyl(0.022, 0.028, 0.55, 5), 0x8fcf84, { pos: [0, 0.27, 0] });
  p.add(sphere(0.16, 10, 8), color, { pos: [0, 0.62, 0], scale: [0.85, 1.25, 0.85] });
  p.add(sphere(0.18, 8, 5), 0x9fd68e, { pos: [0.1, 0.2, 0], scale: [1, 0.25, 0.5], rot: [0, 0, -0.6] });
  return { parts: p, collide: null, bodyRadius: 0.16, scale: [0.9, 1.5] };
}

function mushroom(cap) {
  const p = new Parts();
  p.add(cyl(0.14, 0.18, 0.4, 8), 0xf7efd9, { pos: [0, 0.2, 0] });
  p.add(new THREE.SphereGeometry(0.38, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), cap, { pos: [0, 0.38, 0], scale: [1, 0.85, 1] });
  for (const [x, z, s] of [[0.0, 0.26, 0.07], [-0.2, 0.12, 0.06], [0.2, 0.1, 0.06], [0.05, -0.2, 0.06]]) {
    p.add(sphere(s, 6, 5), WHITE, { pos: [x, 0.62 - Math.hypot(x, z) * 0.55, z], scale: [1, 0.5, 1], outline: false });
  }
  for (const sx of [-1, 1]) p.add(sphere(0.03, 6, 5), INK, { pos: [sx * 0.065, 0.25, 0.15], outline: false });
  return { parts: p, collide: { radius: 0.3, height: 0.7 }, bodyRadius: 0.3, scale: [0.8, 1.5] };
}

// pastel palette: mint, pink, lavender, butter yellow, peach, soft green
const SPECIES = {
  tree: [
    () => treeSpecies(0xa8e2c6, 'ball'),
    () => treeSpecies(0xa4d98f, 'ball'),
    () => treeSpecies(0xf7e49a, 'ball'),
    () => treeSpecies(0xf9c6a9, 'ball'),
    () => treeSpecies(0xf2b5c6, 'cluster'),
    () => treeSpecies(0xc4b8ee, 'cluster'),
    () => treeSpecies(0xb9b0e6, 'cone'),
    () => treeSpecies(0x9fd9b8, 'cone'),
  ],
  rock: [
    () => rockSpecies(0xcfc8dd, 7, { z: true }),
    () => rockSpecies(0xdcd0bd, 21),
    () => rockSpecies(0xcbe0d4, 33, { z: true }),
    () => rockSpecies(0xe7cfd6, 45),
  ],
  pebble: [
    () => rockSpecies(0xd9d2e8, 12, { scale: [0.38, 0.62], faceScale: 2.2, collide: false }),
    () => rockSpecies(0xefdcc7, 18, { z: true, scale: [0.38, 0.62], faceScale: 2.2, collide: false }),
  ],
  flower: [dandelion, sunflower, () => daisy(0xfaf6ea, 0xf3dc78), () => tulip(0xf2a0b8), () => tulip(0xbfaef0)],
  mushroom: [() => mushroom(0xef7b7b), () => mushroom(0xf4a6c4), () => mushroom(0xb9a8ee)],
};
const HATCH_SPACING = { tree: 0.09, rock: 0.08, pebble: 0.05, flower: 0.04, mushroom: 0.05 };

// tiny grass tuft: a few thin leaning blades
function grassTuft() {
  const p = new Parts();
  const g = 0x86c97c, g2 = 0x6fb676;
  [[-0.1, 0, -0.35, 0.34, g], [0.0, 0.02, 0.05, 0.42, g2], [0.1, -0.01, 0.4, 0.3, g], [0.03, 0.06, -0.12, 0.26, g2]].forEach(([x, z, lean, h, c]) =>
    p.add(cone(0.035, h, 4), c, { pos: [x, h / 2, z], rot: [0, 0, -lean] })
  );
  return p;
}


/** Places everything and returns the static colliders. ctx = { scene, planet, quality, rng, placer } */
export function buildProps({ scene, quality, placer, rng: rnd }) {
  const group = new THREE.Group();
  const colliders = [];

  for (const [kind, cfg] of Object.entries(KINDS)) {
    const species = SPECIES[kind].map((b) => b());
    const mats = species.map(() => createInkMaterial({ vertexColors: true, hatchSpacing: HATCH_SPACING[kind], hatchStrength: 0.9 }));
    const count = Math.round(cfg.count * quality.propScale);
    const { buckets, colliders: cols } = placer.place({ count, group: cfg.group, frac: cfg.frac, sigma: cfg.sigma, species });
    colliders.push(...cols);
    species.forEach((sp, i) =>
      buildInstanced(group, sp.parts, mats[i], buckets[i], {
        thickness: kind === 'flower' ? 1.6 : kind === 'pebble' ? 1.8 : 2.2,
        castShadow: kind === 'flower' ? quality.flowerShadows : true,
      })
    );
  }

  // grass tufts: cheap texture, no spacing/collision
  const tufts = [];
  while (tufts.length < quality.tufts) {
    const d = placer.randDir();
    if (!placer.farFromSpawn(d, 1)) continue;
    tufts.push(placer.instance(d, 0.8 + rnd() * 0.9, rnd() * Math.PI * 2));
  }
  buildInstanced(group, grassTuft(), createInkMaterial({ vertexColors: true, hatchSpacing: 0.04, hatchStrength: 0.5 }), tufts, {
    thickness: 1.3,
    castShadow: false,
    wobbleFreq: 2.5,
  });
  scene.add(group);
  return { group, colliders };
}
