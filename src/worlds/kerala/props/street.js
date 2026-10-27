/**
 * chennai/props/street.js: street furniture, trees, beach & harbour bits, hanging lines.
 *
 * Factories (ink, opts?) -> THREE.Group (y up, base y=0, front +z, userData {footprint, colliders, animate?}):
 *   createLampPost, createBusStop, createRoadSign({kind,text,sub}), createBollard, createTrafficSignal, createHydrant,
 *   createManhole, createPothole, createDogBowl, createStool, createCrate, createStumps, createLaundryLine({length}),
 *   createWires({from,to}), createWirePole, createBanyan, createCoconutPalm, createBeachUmbrella, createSandcastle,
 *   createBoat, createKite
 *
 * Instanceable `Parts` builders (use with engine/scatter.js buildInstanced / placer.place):
 *   lampPostParts(), bollardParts(c), hydrantParts(), manholeParts(), potholeParts(), dogBowlParts(), stoolParts(c),
 *   crateParts(c), stumpsParts(), palmParts(seed), banyanParts(seed), beachUmbrellaParts(colors), sandcastleParts()
 *   instanceSpecs() -> { name: { parts, collide, bodyRadius, scale:[a,b], hatch, thickness, y } }  (placer species shape)
 *
 * Special origins: createLaundryLine / createWires run along x centred at the origin, the rope hangs from y=0
 * (clothes below it); createKite is centred on its origin; createBoat's keel is at y=0 (waterline ~ y=0.35).
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, plateDecal, hand, boardRect, paintCanvas, finish, eyes, smile, blush, rng, mulberry32,
  drawShape, wobblyLine, INK, resolveInk, plainMesh, glowMat, animator, swing, corrugated, umbrella, ell, texMat, toTexture, sphere, taperTube, rbox,
} from './kit.js';

const TAU = Math.PI * 2;
const sleepyFace = (p, { x = 0, y, z, s = 1, sgn = 1 }) => {
  for (const sx of [-1, 1]) p.add(new THREE.TorusGeometry(0.07 * s, 0.017 * s, 4, 8, Math.PI), INKC, { pos: [x + sx * 0.12 * s, y + 0.02 * s, z * sgn], rot: [0, sgn < 0 ? Math.PI : 0, Math.PI], outline: false });
  for (const sx of [-1, 1]) p.ball(0.06 * s, 0xf49bb2, { pos: [x + sx * 0.22 * s, y - 0.08 * s, (z - 0.01) * sgn], scale: [1, 0.6, 0.3], w: 5, h: 4, outline: false });
  p.add(new THREE.TorusGeometry(0.04 * s, 0.014 * s, 4, 8, Math.PI), INKC, { pos: [x, y - 0.06 * s, z * sgn], rot: [0, sgn < 0 ? Math.PI : 0, Math.PI], outline: false });
};

// =====================================================================================================
// Instanceable small parts
// =====================================================================================================
export function lampPostParts() {
  const p = new Mix();
  const iron = 0x86b2b4;
  p.lathe([[0.001, 0], [0.42, 0], [0.4, 0.15], [0.28, 0.3], [0.2, 0.7], [0.14, 1.1], [0.001, 1.1]], iron, { seg: 8 });
  p.cyl(0.1, 0.14, 4.0, iron, { pos: [0, 2.9, 0], seg: 7 });
  p.cyl(0.18, 0.13, 0.14, C.cream, { pos: [0, 1.2, 0], seg: 7, outline: false });
  p.cyl(0.16, 0.12, 0.12, C.cream, { pos: [0, 4.8, 0], seg: 7, outline: false });
  // little curly bracket + globe lantern
  p.curve([[0, 4.8, 0], [0.45, 5.1, 0], [0.7, 4.95, 0]], 0.05, 0.04, iron, { radial: 5, steps: 6 });
  p.cyl(0.3, 0.3, 0.1, iron, { pos: [0.7, 4.85, 0], seg: 8 });
  p.ball(0.42, 0xfff1b8, { pos: [0.7, 5.25, 0], w: 10, h: 8 });
  p.cone(0.42, 0.28, iron, { pos: [0.7, 5.8, 0], seg: 8 });
  p.ball(0.06, C.cream, { pos: [0.7, 6.0, 0], w: 5, h: 4, outline: false });
  sleepyFace(p, { x: 0.7, y: 5.28, z: 0.4, s: 1.5 });
  sleepyFace(p, { x: 0.7, y: 5.28, z: 0.4, s: 1.5, sgn: -1 });
  return p;
}
export function bollardParts(color = C.cream) {
  const p = new Mix();
  p.cyl(0.26, 0.3, 0.8, color, { pos: [0, 0.4, 0], seg: 8 });
  p.cyl(0.285, 0.285, 0.14, C.bestRed, { pos: [0, 0.35, 0], seg: 8, outline: false });
  p.ball(0.26, color, { pos: [0, 0.8, 0], scale: [1, 0.7, 1], w: 8, h: 5 });
  sleepyFace(p, { y: 0.62, z: 0.285, s: 1.3 });
  return p;
}
export function hydrantParts() {
  const p = new Mix();
  p.lathe([[0.001, 0], [0.34, 0], [0.34, 0.12], [0.24, 0.2], [0.24, 0.65], [0.3, 0.72], [0.2, 0.8], [0.001, 0.85]], C.bestRed, { seg: 8 });
  p.cyl(0.07, 0.07, 0.1, C.brass, { pos: [0, 0.88, 0], seg: 6 });
  for (const sx of [-1, 1]) { p.cyl(0.11, 0.11, 0.22, C.bestRed, { pos: [sx * 0.3, 0.5, 0], rot: [0, 0, Math.PI / 2], seg: 7 }); p.cyl(0.14, 0.14, 0.05, C.brass, { pos: [sx * 0.42, 0.5, 0], rot: [0, 0, Math.PI / 2], seg: 7, outline: false }); }
  p.cyl(0.09, 0.09, 0.2, C.bestRed, { pos: [0, 0.45, 0.28], rot: [Math.PI / 2, 0, 0], seg: 7 });
  p.ball(0.1, C.brass, { pos: [0, 0.45, 0.4], w: 6, h: 4, outline: false });
  eyes(p, { x: 0.1, y: 0.62, z: 0.23, r: 0.055, flat: 0.5 });
  return p;
}
export function manholeParts() {
  const p = new Mix();
  p.cyl(0.72, 0.72, 0.05, 0x8d89a1, { pos: [0, 0.03, 0], seg: 16 });
  p.add(new THREE.TorusGeometry(0.52, 0.025, 4, 16), 0xa9a5bd, { pos: [0, 0.065, 0], rot: [Math.PI / 2, 0, 0], outline: false });
  for (let i = 0; i < 3; i++) p.box(1.0, 0.02, 0.05, 0xa9a5bd, { pos: [0, 0.065, 0], rot: [0, (i * Math.PI) / 3, 0], outline: false });
  return p;
}
export function potholeParts() {
  const p = new Mix();
  p.cyl(0.55, 0.5, 0.03, 0x6a5f72, { pos: [0, 0.015, 0], seg: 9, scale: [1.1, 1, 0.8], wonk: 0.02 });
  p.cyl(0.38, 0.3, 0.035, 0x453c4f, { pos: [0.04, 0.03, 0.02], seg: 8, scale: [1.0, 1, 0.8], outline: false });
  const r = mulberry32(3);
  for (let i = 0; i < 7; i++) { const a = (i / 7) * TAU; p.add(new THREE.IcosahedronGeometry(0.07 + r() * 0.05, 0), 0xa9a5bd, { pos: [Math.cos(a) * 0.62, 0.05, Math.sin(a) * 0.5], outline: false }); }
  return p;
}
export function dogBowlParts() {
  const p = new Mix();
  p.lathe([[0.001, 0], [0.18, 0], [0.34, 0.2], [0.33, 0.22], [0.001, 0.22]], C.steel, { seg: 9 });
  p.cyl(0.29, 0.29, 0.02, 0x9fd0f0, { pos: [0, 0.19, 0], seg: 9, outline: false });
  p.add(new THREE.TorusGeometry(0.33, 0.025, 4, 9), C.steelDark, { pos: [0, 0.22, 0], rot: [Math.PI / 2, 0, 0], outline: false });
  // a bone
  p.cyl(0.03, 0.03, 0.3, C.cream, { pos: [0.5, 0.04, 0.2], rot: [0, 0, Math.PI / 2], seg: 5, outline: false });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.ball(0.05, C.cream, { pos: [0.5 + sx * 0.16, 0.04, 0.2 + sz * 0.025], w: 5, h: 4, outline: false });
  return p;
}
export function stoolParts(color = C.bestRed) {
  const p = new Mix();
  p.cyl(0.4, 0.37, 0.09, color, { pos: [0, 0.56, 0], seg: 10 });
  p.cyl(0.43, 0.43, 0.04, color, { pos: [0, 0.6, 0], seg: 10, outline: false });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.tube([sx * 0.24, 0.52, sz * 0.24], [sx * 0.33, 0.0, sz * 0.33], 0.06, color, { seg: 5 });
  p.add(new THREE.TorusGeometry(0.3, 0.025, 4, 10), color, { pos: [0, 0.22, 0], rot: [Math.PI / 2, 0, 0], outline: false });
  return p;
}
export function crateParts(color = C.sky) {
  const p = new Mix();
  const W = 0.9, H = 0.5, D = 0.6, t = 0.05;
  p.box(W, t, D, color, { pos: [0, t / 2, 0] });
  for (const sz of [-1, 1]) for (let k = 0; k < 2; k++) p.box(W, 0.12, t, color, { pos: [0, 0.14 + k * 0.2, sz * (D / 2 - t / 2)], outline: k === 0 });
  for (const sx of [-1, 1]) for (let k = 0; k < 2; k++) p.box(t, 0.12, D, color, { pos: [sx * (W / 2 - t / 2), 0.14 + k * 0.2, 0], outline: k === 0 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.box(0.08, H, 0.08, color, { pos: [sx * (W / 2 - 0.04), H / 2, sz * (D / 2 - 0.04)], outline: false });
  return p;
}
export function stumpsParts() {
  const p = new Mix();
  for (const x of [-0.12, 0, 0.12]) p.cyl(0.03, 0.03, 0.95, C.woodLight, { pos: [x, 0.47, 0], seg: 5 });
  for (const x of [-0.06, 0.06]) p.cyl(0.015, 0.015, 0.1, C.bestRed, { pos: [x, 0.97, 0], rot: [0, 0, Math.PI / 2], seg: 4, outline: false });
  p.box(0.6, 0.012, 0.05, C.white, { pos: [0, 0.01, 0.3], outline: false }); // chalk crease
  p.box(0.6, 0.012, 0.05, C.white, { pos: [0, 0.01, 0.9], outline: false });
  p.ball(0.07, C.green, { pos: [0.35, 0.07, 0.65], w: 6, h: 4 }); // tennis ball
  p.round(0.12, 0.8, 0.04, C.woodLight, { pos: [-0.5, 0.42, -0.15], rot: [0.0, 0, -0.35], r: 0.02 }); // bat
  p.cyl(0.025, 0.025, 0.3, C.kaali, { pos: [-0.38, 0.88, -0.15], rot: [0, 0, -0.35], seg: 5, outline: false });
  return p;
}
export function beachUmbrellaParts(colors = [C.pink, C.cream], tiltPole = 0.12) {
  const p = new Mix();
  p.cyl(0.04, 0.045, 3.4, C.woodLight, { pos: [0, 1.65, 0], rot: [0, 0, tiltPole], seg: 5 });
  const top = [Math.sin(-tiltPole) * 1.7 * -1, 3.35, 0];
  void top;
  umbrella(p, { r: 2.2, h: 0.8, pos: [-Math.sin(tiltPole) * 1.7 * -0.0 + 0.2, 3.1, 0], tilt: [0, 0, tiltPole * 0.2], poleH: 0.01, colors, sectors: 8, pole: C.woodLight });
  p.cyl(0.07, 0.07, 0.1, C.steel, { pos: [0.2, 3.95, 0], seg: 5, outline: false });
  return p;
}
export function sandcastleParts() {
  const p = new Mix();
  const sand = 0xeccf94, sand2 = 0xe4bf7e;
  p.cone(2.0, 0.4, sand, { pos: [0, 0.2, 0], seg: 12, scale: [1, 1, 1] });
  p.cyl(1.35, 1.5, 0.5, sand, { pos: [0, 0.55, 0], seg: 10, wonk: 0.04 });
  p.cyl(0.8, 1.0, 1.0, sand2, { pos: [0, 1.3, 0], seg: 10, wonk: 0.03 });
  // crenellations on the keep
  for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; p.box(0.28, 0.25, 0.28, sand2, { pos: [Math.cos(a) * 0.82, 1.92, Math.sin(a) * 0.82], rot: [0, -a, 0], outline: false }); }
  for (const [x, z] of [[1.3, 0.5], [-1.2, 0.7], [0.1, -1.3], [-0.9, -0.9], [1.0, -0.9]]) {
    p.cyl(0.32, 0.4, 0.95, sand, { pos: [x, 1.0, z], seg: 8, wonk: 0.03 });
    p.cone(0.38, 0.4, sand2, { pos: [x, 1.65, z], seg: 8 });
  }
  // flag
  p.tube([0, 1.8, 0], [0, 3.0, 0], 0.03, C.woodLight, { seg: 4 });
  p.add(new THREE.ConeGeometry(0.28, 0.6, 3), C.pink, { pos: [0.3, 2.78, 0], rot: [0, 0, -Math.PI / 2], outline: true });
  // smile on the keep + shells + bucket
  sleepyFace(p, { y: 1.35, z: 0.97, s: 3 });
  for (const [x, z, c] of [[1.9, 1.3, C.cream], [-1.7, 1.7, C.pink], [0.6, 1.9, C.cream]]) p.cone(0.14, 0.2, c, { pos: [x, 0.12, z], rot: [Math.PI / 2, 0.4, 0], seg: 6, outline: false });
  p.cyl(0.35, 0.28, 0.45, C.blue, { pos: [-2.1, 0.23, 0.2], seg: 8 });
  p.tube([-2.25, 0.3, 0.2], [-1.9, 0.62, 0.2], 0.025, C.steelDark, { seg: 4, outline: false });
  return p;
}

// ---- trees -------------------------------------------------------------------------------------
export function banyanParts(seed = 4) {
  const p = new Mix();
  const r = mulberry32(seed);
  const bark = 0xb4a089, bark2 = 0xa08b76;
  // buttressed main trunk
  p.curve([[0, 0, 0], [0.1, 1.4, 0.05], [-0.1, 2.8, 0], [0.0, 3.8, 0.1]], 1.25, 0.8, bark, { radial: 8, steps: 8 });
  for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU + 0.3; p.curve([[Math.cos(a) * 0.5, 0.9, Math.sin(a) * 0.5], [Math.cos(a) * 1.2, 0.35, Math.sin(a) * 1.2], [Math.cos(a) * 1.7, 0, Math.sin(a) * 1.7]], 0.45, 0.2, bark2, { radial: 5, steps: 4 }); }
  // branches reaching out
  const tips = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU + r() * 0.4, d = 2.6 + r() * 1.2, hgt = 3.9 + r() * 0.7;
    p.curve([[0, 3.3, 0], [Math.cos(a) * d * 0.5, 3.7, Math.sin(a) * d * 0.5], [Math.cos(a) * d, hgt, Math.sin(a) * d]], 0.55, 0.25, bark, { radial: 6, steps: 5 });
    tips.push([Math.cos(a) * d, hgt, Math.sin(a) * d]);
  }
  // canopy: a low, wide, lumpy crown of overlapping greens
  const greens = [0x7dbc7e, 0x8ccb85, 0x6fb274, 0x95d28a];
  tips.forEach((t, i) => p.ball(2.0 + r() * 0.6, greens[i % 4], { pos: [t[0] * 1.25, t[1] + 0.9, t[2] * 1.25], scale: [1.2, 0.72, 1.2], w: 10, h: 7, wonk: 0.1, seed: i }));
  for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU + 0.5; p.ball(2.3, greens[(i + 1) % 4], { pos: [Math.cos(a) * 1.6, 5.3 + (i % 2) * 0.2, Math.sin(a) * 1.6], scale: [1.2, 0.75, 1.2], w: 10, h: 7, wonk: 0.1, seed: i + 9 }); }
  p.ball(2.2, greens[3], { pos: [0.2, 6.2, 0.1], scale: [1.2, 0.72, 1.2], w: 10, h: 7, wonk: 0.1 });
  // aerial roots: thick pillar roots reaching the ground + many thin hanging ones
  tips.forEach((t, i) => {
    if (i % 2 === 0 || i === 3) {
      const gx = t[0] * 1.02, gz = t[2] * 1.02;
      p.curve([[t[0] * 0.95, t[1] - 0.1, t[2] * 0.95], [t[0] * 0.98 + 0.1, t[1] * 0.6, t[2] * 0.98], [gx + 0.05, 1.2, gz], [gx, 0, gz]], 0.16, 0.36, bark2, { radial: 6, steps: 8 });
    }
  });
  for (let i = 0; i < 34; i++) {
    const a = r() * TAU, d = 0.6 + r() * 4.2, top = 3.1 + r() * 1.6;
    const len = 1.0 + r() * (top - 0.8);
    p.curve([[Math.cos(a) * d, top, Math.sin(a) * d], [Math.cos(a) * d + 0.05, top - len * 0.5, Math.sin(a) * d], [Math.cos(a) * d - 0.04, top - len, Math.sin(a) * d + 0.03]], 0.1, 0.035, bark2, { radial: 5, steps: 4 });
  }
  return p;
}

// ---- Chennai trees: neem (dense, rounded dark-green crown) and peepal (lighter, wide, heart-leaf crown) ---------------------------
function crownTree(seed, { trunk = 0x8f7a62, leaves, spread = 3.2, hgt = 4.2, crownY = 1.0, crownR = 1.9, nb = 6, flat = 0.78 }) {
  const p = new Mix();
  const r = mulberry32(seed);
  p.curve([[0, 0, 0], [0.12, hgt * 0.35, 0.05], [-0.08, hgt * 0.7, 0], [0.04, hgt, 0.06]], 0.46, 0.26, trunk, { radial: 7, steps: 8 });
  const tips = [];
  for (let i = 0; i < nb; i++) {
    const a = (i / nb) * TAU + r() * 0.5, d = spread * (0.65 + r() * 0.35), hh = hgt + crownY * (0.2 + r() * 0.6);
    p.curve([[0, hgt * 0.78, 0], [Math.cos(a) * d * 0.5, hgt * 0.95, Math.sin(a) * d * 0.5], [Math.cos(a) * d, hh, Math.sin(a) * d]], 0.26, 0.12, trunk, { radial: 5, steps: 5 });
    tips.push([Math.cos(a) * d, hh, Math.sin(a) * d]);
  }
  tips.forEach((t, i) => p.ball(crownR * (0.85 + r() * 0.3), leaves[i % leaves.length], { pos: [t[0], t[1] + 0.6, t[2]], scale: [1.2, flat, 1.2], w: 9, h: 6, wonk: 0.1, seed: i + seed }));
  p.ball(crownR * 1.05, leaves[0], { pos: [0, hgt + crownY + 0.5, 0], scale: [1.25, flat, 1.25], w: 9, h: 6, wonk: 0.1, seed });
  return p;
}
export const neemParts = (seed = 31) => crownTree(seed, { leaves: [0x3f8a52, 0x4a9a5a, 0x367d4a], spread: 3.0, hgt: 3.9, crownY: 1.1, crownR: 2.1, nb: 6, flat: 0.85 });
export const peepalParts = (seed = 41) => crownTree(seed, { trunk: 0xa39078, leaves: [0x6fb86c, 0x5fa862, 0x7cc474], spread: 3.7, hgt: 4.6, crownY: 0.8, crownR: 2.2, nb: 6, flat: 0.7 });

// ---- Kerala trees: jackfruit (dense dark crown, fruit on the trunk), mango (huge round dark crown), banana plant (big drooping leaves) ----
function fruitTree(seed, { leaves, trunk, hgt, crownR, spread, fruit = 0, flat = 0.85 }) {
  const p = crownTree(seed, { trunk, leaves, spread, hgt, crownY: 1.0, crownR, nb: 7, flat });
  const r = mulberry32(seed + 500);
  for (let i = 0; i < fruit; i++) { // jackfruits hanging low on the trunk
    const a = r() * TAU, y = 0.9 + r() * 1.6;
    p.ball(0.26 + r() * 0.1, 0x9aa23c, { pos: [Math.cos(a) * 0.4, y, Math.sin(a) * 0.4], scale: [0.8, 1.35, 0.8], w: 6, h: 5 });
  }
  return p;
}
export const jackfruitParts = (seed = 51) => fruitTree(seed, { trunk: 0x7d6a58, leaves: [0x2f7a45, 0x3a8a4e, 0x2a6e40], hgt: 3.3, crownR: 2.0, spread: 2.5, fruit: 4, flat: 0.95 });
export const mangoParts = (seed = 61) => fruitTree(seed, { trunk: 0x6f5e4c, leaves: [0x2f7d4a, 0x3c8d55, 0x286f42], hgt: 3.0, crownR: 2.5, spread: 3.3, flat: 0.8 });
function bananaLeaf(len, width) {
  const g = frondGeo(len, width, 1.1, 0.7);
  return g;
}
export function bananaParts(seed = 71) {
  const p = new Mix();
  const r = mulberry32(seed);
  p.curve([[0, 0, 0], [0.05, 1.0, 0], [0.0, 2.0, 0.05]], 0.26, 0.2, 0x8fbf6a, { radial: 7, steps: 5 });
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU + r() * 0.4;
    p.add(bananaLeaf(2.4 + r() * 0.5, 0.85), i % 2 ? 0x5fb35a : 0x4ea550, { pos: [0, 1.9 + (i % 3) * 0.1, 0], rot: [0, -a, 0] });
  }
  p.ball(0.18, 0x8c4a6a, { pos: [0.28, 1.7, 0], scale: [0.8, 1.3, 0.8], w: 6, h: 5 }); // banana flower
  for (let i = 0; i < 4; i++) p.ball(0.12, 0xa5c850, { pos: [0.34 + (i % 2) * 0.1, 1.5 - i * 0.12, (i - 1.5) * 0.1], scale: [0.7, 1.5, 0.7], w: 5, h: 4 });
  return p;
}

function frondGeo(len = 3.2, width = 0.55, droop = 0.55, rise = 0.35) {
  const pts = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const t = i / n, w = width * Math.pow(Math.sin(Math.PI * Math.min(1, t * 0.95 + 0.05)), 0.7) * (i % 2 ? 1 : 0.55) * (1 - t * 0.35);
    pts.push(new THREE.Vector2(t * len, w));
  }
  for (let i = n; i >= 0; i--) { const t = i / n, w = width * Math.pow(Math.sin(Math.PI * Math.min(1, t * 0.95 + 0.05)), 0.7) * (i % 2 ? 1 : 0.55) * (1 - t * 0.35); pts.push(new THREE.Vector2(t * len, -w)); }
  const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts), { depth: 0.05, bevelEnabled: false });
  g.rotateX(-Math.PI / 2);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i); pos.setY(i, pos.getY(i) + rise * x - droop * (x * x) / len); }
  g.computeVertexNormals();
  return g;
}
export function palmParts(seed = 1) {
  const p = new Mix();
  const r = mulberry32(seed * 7 + 1);
  const lean = 0.8 + r() * 0.6, hgt = 6.2 + r() * 0.8;
  const dir = r() * TAU;
  const lx = Math.cos(dir) * lean, lz = Math.sin(dir) * lean;
  const trunk = taperTube([[0, 0, 0], [lx * 0.2, hgt * 0.3, lz * 0.2], [lx * 0.6, hgt * 0.65, lz * 0.6], [lx, hgt, lz]], 0.34, 0.2, 7, { steps: 24 });
  p.paint(trunk, (x, y) => (Math.floor(y / 0.3) % 2 ? 0xb9a07e : 0xa68c6a));
  const top = [lx, hgt, lz];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU + r() * 0.3;
    p.add(frondGeo(3.6 + r() * 0.6, 0.72, 0.95 + r() * 0.3, 0.5), i % 2 ? 0x3f9158 : 0x4da35f, { pos: top, rot: [0, -a, 0] });
  }
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU + 0.5 + r() * 0.3;
    p.add(frondGeo(2.6 + r() * 0.4, 0.6, 0.55, 1.1), i % 2 ? 0x56ad65 : 0x62b96d, { pos: [top[0], top[1] + 0.08, top[2]], rot: [0, -a, 0] });
  }
  p.ball(0.28, 0x6f9a52, { pos: [top[0], top[1] - 0.05, top[2]], w: 6, h: 5 });
  for (const [dx, dz] of [[0.25, 0.1], [-0.2, 0.2], [0.0, -0.25]]) p.ball(0.2, 0x8a9a3a, { pos: [top[0] + dx, top[1] - 0.35, top[2] + dz], w: 6, h: 5 });
  return p;
}

export function instanceSpecs() {
  return {
    lampPost: { parts: lampPostParts(), collide: { radius: 0.3, height: 5 }, bodyRadius: 0.5, scale: [1, 1], hatch: 0.08, thickness: 2.0 },
    bollard: { parts: bollardParts(), collide: { radius: 0.3, height: 1 }, bodyRadius: 0.3, scale: [0.95, 1.05], hatch: 0.06, thickness: 1.8 },
    hydrant: { parts: hydrantParts(), collide: { radius: 0.35, height: 0.9 }, bodyRadius: 0.4, scale: [1, 1], hatch: 0.05, thickness: 1.8 },
    manhole: { parts: manholeParts(), collide: null, bodyRadius: 0.7, scale: [0.9, 1.15], hatch: 0.08, thickness: 1.4 },
    pothole: { parts: potholeParts(), collide: null, bodyRadius: 0.6, scale: [0.7, 1.4], hatch: 0.07, thickness: 1.4 },
    dogBowl: { parts: dogBowlParts(), collide: null, bodyRadius: 0.4, scale: [1, 1], hatch: 0.04, thickness: 1.5 },
    stool: { parts: stoolParts(C.bestRed), collide: { radius: 0.4, height: 0.6 }, bodyRadius: 0.42, scale: [1, 1], hatch: 0.06, thickness: 1.7 },
    stoolBlue: { parts: stoolParts(C.blue), collide: { radius: 0.4, height: 0.6 }, bodyRadius: 0.42, scale: [1, 1], hatch: 0.06, thickness: 1.7 },
    crate: { parts: crateParts(C.sky), collide: { radius: 0.5, height: 0.5 }, bodyRadius: 0.5, scale: [0.9, 1.1], hatch: 0.06, thickness: 1.7 },
    crateYellow: { parts: crateParts(C.yellow), collide: { radius: 0.5, height: 0.5 }, bodyRadius: 0.5, scale: [0.9, 1.1], hatch: 0.06, thickness: 1.7 },
    stumps: { parts: stumpsParts(), collide: null, bodyRadius: 0.5, scale: [1, 1], hatch: 0.05, thickness: 1.5 },
    palm: { parts: palmParts(1), collide: { radius: 0.4, height: 7 }, bodyRadius: 0.6, scale: [0.9, 1.25], hatch: 0.1, thickness: 2.2 },
    palm2: { parts: palmParts(2), collide: { radius: 0.4, height: 7 }, bodyRadius: 0.6, scale: [0.9, 1.25], hatch: 0.1, thickness: 2.2 },
    neem: { parts: neemParts(31), collide: { radius: 0.5, height: 6.5 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.12, thickness: 2.2 },
    neem2: { parts: neemParts(32), collide: { radius: 0.5, height: 6.5 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.12, thickness: 2.2 },
    peepal: { parts: peepalParts(41), collide: { radius: 0.5, height: 7 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.1, thickness: 2.2 },
    jackfruit: { parts: jackfruitParts(51), collide: { radius: 0.5, height: 6 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.12, thickness: 2.2 },
    jackfruit2: { parts: jackfruitParts(52), collide: { radius: 0.5, height: 6 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.12, thickness: 2.2 },
    mango: { parts: mangoParts(61), collide: { radius: 0.5, height: 6 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.12, thickness: 2.2 },
    mango2: { parts: mangoParts(62), collide: { radius: 0.5, height: 6 }, bodyRadius: 0.8, scale: [0.9, 1.2], hatch: 0.12, thickness: 2.2 },
    banana: { parts: bananaParts(71), collide: { radius: 0.3, height: 2.5 }, bodyRadius: 0.5, scale: [0.9, 1.3], hatch: 0.1, thickness: 2 },
    banana2: { parts: bananaParts(72), collide: { radius: 0.3, height: 2.5 }, bodyRadius: 0.5, scale: [0.9, 1.3], hatch: 0.1, thickness: 2 },
    banyan: { parts: banyanParts(4), collide: { radius: 1.5, height: 7 }, bodyRadius: 3, scale: [0.9, 1.15], hatch: 0.12, thickness: 2.4 },
    beachUmbrella: { parts: beachUmbrellaParts(), collide: { radius: 0.15, height: 3 }, bodyRadius: 1.8, scale: [0.9, 1.1], hatch: 0.08, thickness: 2 },
    sandcastle: { parts: sandcastleParts(), collide: { radius: 1.6, height: 1.2 }, bodyRadius: 2.2, scale: [0.6, 0.9], hatch: 0.08, thickness: 2 },
  };
}
/** material hatch spacing used for each spec above (convenience) */
export const PART_HATCH = { lampPost: 0.08, bollard: 0.06, hydrant: 0.05, manhole: 0.08, pothole: 0.07, dogBowl: 0.04, stool: 0.06, crate: 0.06, stumps: 0.05, palm: 0.1, neem: 0.12, peepal: 0.1, jackfruit: 0.12, mango: 0.12, banana: 0.1, banyan: 0.12, beachUmbrella: 0.08, sandcastle: 0.08 };

// =====================================================================================================
// Simple factories (single-parts items)
// =====================================================================================================
function single(ink, parts, { spacing = 0.08, thickness = 2, footprint, colliders, extra = {} } = {}) {
  const g = new THREE.Group();
  g.add(meshOf(ink, parts, { spacing, thickness }));
  return finish(g, { footprint, colliders, ...extra });
}
export const createLampPost = (ink) => single(ink, lampPostParts(), { spacing: 0.08, footprint: { w: 1.4, l: 0.9 }, colliders: [{ x: 0, z: 0, radius: 0.3, height: 5 }] });
export const createBollard = (ink, o = {}) => single(ink, bollardParts(o.color), { spacing: 0.06, thickness: 1.8, footprint: { w: 0.6, l: 0.6 }, colliders: [{ x: 0, z: 0, radius: 0.3, height: 1 }] });
export const createHydrant = (ink) => single(ink, hydrantParts(), { spacing: 0.05, thickness: 1.8, footprint: { w: 0.9, l: 0.7 }, colliders: [{ x: 0, z: 0, radius: 0.35, height: 0.9 }] });
export const createPothole = (ink) => single(ink, potholeParts(), { spacing: 0.07, thickness: 1.4, footprint: { w: 1.3, l: 1.1 }, colliders: [] });
export const createDogBowl = (ink) => single(ink, dogBowlParts(), { spacing: 0.04, thickness: 1.5, footprint: { w: 1, l: 0.7 }, colliders: [] });
export const createStool = (ink, o = {}) => single(ink, stoolParts(o.color ?? C.bestRed), { spacing: 0.06, thickness: 1.7, footprint: { w: 0.8, l: 0.8 }, colliders: [{ x: 0, z: 0, radius: 0.4, height: 0.6 }] });
export function createCrate(ink, o = {}) {
  const g = new THREE.Group();
  const n = o.stack ?? 2;
  const p = new Mix();
  for (let i = 0; i < n; i++) p.include(crateParts([C.sky, C.yellow, C.pink, C.green][i % 4]), { pos: [(i % 2) * 0.06, i * 0.5, 0], rot: [0, i * 0.12, 0] });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.7 }));
  return finish(g, { footprint: { w: 1, l: 0.7 }, colliders: [{ x: 0, z: 0, radius: 0.5, height: 0.5 * n }] });
}
export const createStumps = (ink) => single(ink, stumpsParts(), { spacing: 0.05, thickness: 1.5, footprint: { w: 1.3, l: 1.2 }, colliders: [] });
export const createSandcastle = (ink) => single(ink, sandcastleParts(), { spacing: 0.08, thickness: 2, footprint: { w: 5, l: 4.4 }, colliders: [{ x: 0, z: 0, radius: 1.8, height: 1.5 }] });
export const createBeachUmbrella = (ink, o = {}) => single(ink, beachUmbrellaParts(o.colors ?? [C.bestRed, C.cream], o.tilt ?? 0.12), { spacing: 0.08, footprint: { w: 4.6, l: 4.6 }, colliders: [{ x: 0, z: 0, radius: 0.15, height: 3 }] });
export const createCoconutPalm = (ink, o = {}) => single(ink, palmParts(o.seed ?? 1), { spacing: 0.1, thickness: 2.2, footprint: { w: 6, l: 6 }, colliders: [{ x: 0, z: 0, radius: 0.4, height: 7 }] });
export function createBanyan(ink, o = {}) {
  return single(ink, banyanParts(o.seed ?? 4), {
    spacing: 0.12, thickness: 2.4, footprint: { w: 9, l: 9 },
    colliders: [{ x: 0, z: 0, radius: 1.5, height: 8 }, ...Array.from({ length: 3 }, (_, i) => ({ x: Math.cos(i * 2.1 + 0.4) * 2.7, z: Math.sin(i * 2.1 + 0.4) * 2.7, radius: 0.45, height: 4 }))],
  });
}

export function createManhole(ink) {
  const g = new THREE.Group();
  g.add(meshOf(ink, (() => { const p = new Mix(); p.cyl(0.72, 0.72, 0.05, 0x8d89a1, { pos: [0, 0.03, 0], seg: 18 }); return p; })(), { spacing: 0.08, thickness: 1.4 }));
  const canvas = paintCanvas(256, 256, (ctx, w, h) => {
    const r = rng(11);
    ctx.fillStyle = '#9a96ae'; ctx.beginPath(); ctx.arc(128, 128, 126, 0, TAU); ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(128, 128, 118, 0, TAU); ctx.stroke();
    ctx.lineWidth = 3.5;
    for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(40, 128 + i * 20); ctx.lineTo(216, 128 + i * 20); ctx.stroke(); }
    ctx.save(); ctx.beginPath(); ctx.arc(128, 128, 118, 0, TAU); ctx.clip();
    ctx.fillStyle = '#9a96ae'; ctx.fillRect(60, 100, 136, 56);
    ctx.restore();
    hand(ctx, 'KOCHI', 128, 140, { size: 44, fill: '#fbf1d0', stroke: INK, sw: 6, seed: 4 });
    hand(ctx, 'കൊച്ചി', 128, 96, { size: 26, fill: '#fbf1d0', stroke: INK, sw: 4, seed: 4 });
    hand(ctx, 'SEWER', 128, 190, { size: 24, fill: '#fbf1d0', stroke: INK, sw: 4, seed: 6 });
    void r; void w; void h;
  });
  const top = new THREE.Mesh(new THREE.CircleGeometry(0.68, 24), texMat(ink, canvas, { spacing: 0.08, strength: 0.5 }));
  top.rotation.x = -Math.PI / 2; top.position.y = 0.062; top.receiveShadow = true;
  g.add(top);
  return finish(g, { footprint: { w: 1.5, l: 1.5 }, colliders: [] });
}

// =====================================================================================================
// Signs
// =====================================================================================================
function shapedSign(ink, shape, w, h, canvas, { depth = 0.07, frame = 0xd9dfe4 } = {}) {
  const I = resolveInk(ink);
  const g = new THREE.Group();
  const ex = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 12 });
  const slab = plainMesh(ink, ex, frame, { spacing: 0.05, thickness: 2 });
  const face = new THREE.ShapeGeometry(shape, 12);
  const pos = face.attributes.position, uv = face.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  const tex = toTexture(canvas);
  const fm = new THREE.Mesh(face, new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.02, polygonOffset: true, polygonOffsetFactor: -1 }));
  fm.position.z = depth + 0.003;
  fm.layers.set(I.OVERLAY_LAYER);
  g.add(slab, fm);
  return g;
}
const ngon = (n, r, rot = 0) => new THREE.Shape(Array.from({ length: n }, (_, i) => new THREE.Vector2(Math.cos(rot + (i / n) * TAU) * r, Math.sin(rot + (i / n) * TAU) * r)));
const circleShape = (r) => { const s = new THREE.Shape(); s.absarc(0, 0, r, 0, TAU, false); return s; };

/**
 * Hand-lettered road sign on a pole. opts.kind: 'name' (blue street-name board; opts.text, opts.sub), 'speed' (opts.text '30'),
 * 'noparking', 'school', 'slow', 'oneway', 'uturn'.
 */
export function createRoadSign(ink, opts = {}) {
  const kind = opts.kind ?? 'slow';
  const g = new THREE.Group();
  const p = new Mix();
  const H = kind === 'name' ? 3.4 : 3.0;
  p.cyl(0.06, 0.07, H, C.steel, { pos: [0, H / 2, 0], seg: 6 });
  p.cyl(0.11, 0.13, 0.12, C.steelDark, { pos: [0, 0.06, 0], seg: 6, outline: false });
  g.add(meshOf(ink, p, { spacing: 0.05, thickness: 1.6 }));
  let sign;
  if (kind === 'name') {
    const W = opts.w ?? 2.6, Hh = 0.8;
    sign = plaque(ink, W, Hh, (ctx, w, h) => {
      boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#5b87c9', hatch: 'rgba(20,50,120,0.6)', cw: w, ch: h, lw: 7, round: 18, r: rng(5) });
      ctx.strokeStyle = '#fffaf0'; ctx.lineWidth = 4; ctx.strokeRect(18, 18, w - 36, h - 36);
      hand(ctx, opts.text ?? 'MARINE DRIVE', w / 2, h * 0.52, { size: h * 0.3, fill: '#fffaf0', seed: 3 });
      hand(ctx, opts.sub ?? 'മറൈൻ ഡ്രൈവ്', w / 2, h * 0.8, { size: h * 0.25, fill: '#ffe8a0', seed: 8 });
    }, { ppu: 190, depth: 0.07, thickness: 1.8, frame: 0xd9dfe4 });
    sign.position.set(0, H - 0.2, 0.09);
  } else {
    let shape, cw = 256, W = 1.2, Hh = 1.2, fn;
    if (kind === 'school') { shape = ngon(3, 0.72, Math.PI / 2); Hh = 1.2; W = 1.25; }
    else if (kind === 'slow') { shape = ngon(4, 0.78, 0); }
    else if (kind === 'oneway' || kind === 'uturn') { shape = (() => { const s = new THREE.Shape(); const w = 0.62, h = 0.4; s.moveTo(-w + 0.1, -h); s.lineTo(w - 0.1, -h); s.quadraticCurveTo(w, -h, w, -h + 0.1); s.lineTo(w, h - 0.1); s.quadraticCurveTo(w, h, w - 0.1, h); s.lineTo(-w + 0.1, h); s.quadraticCurveTo(-w, h, -w, h - 0.1); s.lineTo(-w, -h + 0.1); s.quadraticCurveTo(-w, -h, -w + 0.1, -h); return s; })(); W = 1.3; Hh = 0.9; }
    else shape = circleShape(0.62);
    const px = 200;
    const canvas = paintCanvas(Math.round(W * px), Math.round(Hh * px), (ctx, w, h) => {
      const r = rng(6);
      const cx = w / 2, cy = h / 2;
      ctx.lineJoin = 'round';
      if (kind === 'speed') {
        ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(cx, cy, w * 0.5, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#e2453b'; ctx.lineWidth = w * 0.1; ctx.beginPath(); ctx.arc(cx, cy, w * 0.43, 0, TAU); ctx.stroke();
        hand(ctx, opts.text ?? '30', cx, cy + h * 0.14, { size: h * 0.42, fill: INK, seed: 3 });
        hand(ctx, 'km/h', cx, cy + h * 0.33, { size: h * 0.12, fill: INK, seed: 2, weight: 'normal' });
      } else if (kind === 'noparking') {
        ctx.fillStyle = '#4a7fd0'; ctx.beginPath(); ctx.arc(cx, cy, w * 0.5, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#e2453b'; ctx.lineWidth = w * 0.1; ctx.beginPath(); ctx.arc(cx, cy, w * 0.42, 0, TAU); ctx.stroke();
        hand(ctx, 'P', cx, cy + h * 0.18, { size: h * 0.55, fill: '#fffaf0', seed: 3 });
        ctx.beginPath(); ctx.moveTo(cx - w * 0.3, cy - h * 0.3); ctx.lineTo(cx + w * 0.3, cy + h * 0.3); ctx.stroke();
      } else if (kind === 'school') {
        ctx.fillStyle = '#f6d343'; ctx.beginPath(); ctx.moveTo(cx, h * 0.04); ctx.lineTo(w * 0.96, h * 0.93); ctx.lineTo(w * 0.04, h * 0.93); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#e2453b'; ctx.lineWidth = w * 0.06; ctx.stroke();
        // two kids holding hands (Warli-ish)
        for (const sx of [-1, 1]) {
          const x = cx + sx * w * 0.14, y = h * 0.82;
          ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(x, y - h * 0.46, h * 0.06, 0, TAU); ctx.fill();
          ctx.beginPath(); ctx.moveTo(x - w * 0.07, y - h * 0.4); ctx.lineTo(x + w * 0.07, y - h * 0.4); ctx.lineTo(x, y - h * 0.22); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(x - w * 0.06, y - h * 0.04); ctx.lineTo(x + w * 0.06, y - h * 0.04); ctx.lineTo(x, y - h * 0.22); ctx.closePath(); ctx.fill();
        }
        ctx.beginPath(); ctx.moveTo(cx - w * 0.1, h * 0.52); ctx.lineTo(cx + w * 0.1, h * 0.52); ctx.stroke();
      } else if (kind === 'slow') {
        ctx.fillStyle = '#f6d343'; ctx.beginPath(); ctx.moveTo(cx, h * 0.02); ctx.lineTo(w * 0.98, cy); ctx.lineTo(cx, h * 0.98); ctx.lineTo(w * 0.02, cy); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke();
        hand(ctx, 'SLOW', cx, cy + 4, { size: h * 0.25, fill: INK, seed: 3 });
        hand(ctx, 'പതുക്കെ', cx, cy + h * 0.26, { size: h * 0.2, fill: '#c2354a', seed: 4 });
      } else {
        ctx.fillStyle = '#4a7fd0'; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = '#fffaf0'; ctx.lineWidth = 12; ctx.lineCap = 'round';
        if (kind === 'oneway') { ctx.beginPath(); ctx.moveTo(w * 0.15, cy); ctx.lineTo(w * 0.8, cy); ctx.moveTo(w * 0.62, cy - h * 0.22); ctx.lineTo(w * 0.85, cy); ctx.lineTo(w * 0.62, cy + h * 0.22); ctx.stroke(); hand(ctx, 'ഒരു വശം · ONE WAY', cx, h * 0.9, { size: h * 0.13, fill: '#fffaf0', seed: 3 }); }
        else { ctx.beginPath(); ctx.moveTo(w * 0.35, h * 0.8); ctx.lineTo(w * 0.35, h * 0.4); ctx.arc(w * 0.5, h * 0.4, w * 0.15, Math.PI, 0); ctx.lineTo(w * 0.65, h * 0.55); ctx.moveTo(w * 0.52, h * 0.4); ctx.lineTo(w * 0.65, h * 0.58); ctx.lineTo(w * 0.78, h * 0.4); ctx.stroke(); }
      }
      void r;
    });
    sign = shapedSign(ink, shape, W, Hh, canvas, { depth: 0.07, frame: 0xd9dfe4 });
    // hand-lettered caption plate under the sign for kinds that need words
    sign.position.set(0, H - 0.65, 0.08);
  }
  g.add(sign);
  if (kind === 'noparking') {
    const cap = plaque(ink, 1.3, 0.3, (ctx, w, h) => {
      boardRect(ctx, 4, 4, w - 8, h - 8, { fill: '#fff4cf', hatch: 'rgba(240,190,80,0.5)', cw: w, ch: h, lw: 4, round: 10, r: rng(3) });
      hand(ctx, 'പാർക്കിംഗ് പാടില്ല', w / 2, h * 0.7, { maxW: w * 0.94, size: h * 0.6, fill: '#c2354a', seed: 3 });
    }, { ppu: 170, depth: 0.04, thickness: 1.4 });
    cap.position.set(0, H - 1.5, 0.08); g.add(cap);
  }
  return finish(g, { footprint: { w: 1.3, l: 0.5 }, colliders: [{ x: 0, z: 0, radius: 0.2, height: H }] });
}

// =====================================================================================================
// Traffic signal (cycles)
// =====================================================================================================
export function createTrafficSignal(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  p.cyl(0.1, 0.13, 3.6, C.steel, { pos: [0, 1.8, 0], seg: 7 });
  p.cyl(0.2, 0.22, 0.15, C.steelDark, { pos: [0, 0.07, 0], seg: 7, outline: false });
  p.curve([[0, 3.5, 0], [0, 3.9, 0.4], [0, 3.85, 1.4]], 0.07, 0.05, C.steel, { radial: 5, steps: 6 });
  // lamp box hanging at the end of the arm
  p.round(0.62, 1.7, 0.5, C.kaali, { pos: [0, 3.0, 1.45], r: 0.12 });
  for (const y of [3.55, 3.0, 2.45]) p.add(new THREE.CylinderGeometry(0.3, 0.3, 0.18, 10, 1, true, -Math.PI / 2, Math.PI), C.kaali, { pos: [0, y + 0.03, 1.75], rot: [Math.PI / 2, 0, 0], outline: false });
  // little sleepy smile under the lamps
  smile(p, { y: 2.2, z: 1.72, R: 0.14, t: 0.025 });
  // pedestrian countdown box on the pole
  p.round(0.42, 0.42, 0.2, C.kaali, { pos: [0, 2.0, 0.15], r: 0.06 });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.8 }));
  const cols = [[0xe2453b, 0x6b2f33], [0xf6c443, 0x6b5a2a], [0x4fc86a, 0x2a5a3a]];
  const lamps = cols.map(([on], i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshBasicMaterial({ color: on }));
    m.position.set(0, 3.55 - i * 0.55, 1.68); m.scale.z = 0.5;
    m.layers.set(resolveInk(ink).OVERLAY_LAYER);
    g.add(m);
    return m;
  });
  const timerMat = new THREE.MeshBasicMaterial({ color: 0xff6a4a });
  const timer = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.02), timerMat);
  timer.position.set(0, 2.0, 0.26); g.add(timer);
  let t = opts.phase ?? 0;
  const cycle = [6, 1.2, 5]; // red, amber(after red = ready), green  -> use order red, green, amber
  const setState = (s) => { cols.forEach(([on, off], i) => lamps[i].material.color.setHex(i === s ? on : off)); timerMat.color.setHex(s === 0 ? 0xff6a4a : s === 1 ? 0xf6c443 : 0x4fc86a); };
  g.userData.state = 0;
  g.userData.animate = (dt) => {
    t = (t + dt) % (cycle[0] + cycle[1] + cycle[2]);
    const s = t < cycle[0] ? 0 : t < cycle[0] + cycle[2] ? 2 : 1;
    if (s !== g.userData.state || dt === 0) { g.userData.state = s; setState(s); }
    timer.scale.x = 0.7 + 0.3 * Math.sin(t * 4);
  };
  g.userData.setState = (s) => { g.userData.state = s; setState(s); };
  g.userData.animate(0);
  return finish(g, { footprint: { w: 1.2, l: 2.4 }, colliders: [{ x: 0, z: 0, radius: 0.25, height: 3.6 }] });
}

// =====================================================================================================
// Bus stop shelter with a KSRTC sign
// =====================================================================================================
export function createBusStop(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const W = 4.4, D = 1.9, H = 3.3;
  // posts, roof
  for (const sx of [-1, 1]) { p.cyl(0.08, 0.08, H, C.steelDark, { pos: [sx * (W / 2 - 0.1), H / 2, D / 2 - 0.1], seg: 6 }); p.cyl(0.08, 0.08, H + 0.2, C.steelDark, { pos: [sx * (W / 2 - 0.1), (H + 0.2) / 2, -D / 2 + 0.1], seg: 6 }); }
  p.paint(corrugated(W + 0.4, D + 0.5, { waves: 10, amp: 0.05 }), (x) => (Math.floor((x + 2.3) / 0.46) % 2 ? C.bestRed : C.cream), { pos: [0, H + 0.2, 0], rot: [0.1, 0, 0] });
  // back panel (frame; ad painted separately), side glass
  p.round(W - 0.3, 2.2, 0.08, C.pistachio, { pos: [0, 1.7, -D / 2 + 0.1], r: 0.03 });
  for (const sx of [-1, 1]) p.box(0.06, 2.0, D - 0.2, C.glass, { pos: [sx * (W / 2 - 0.12), 1.7, 0], outline: false });
  // bench with slats
  for (let i = 0; i < 4; i++) p.round(W - 0.8, 0.08, 0.14, C.woodLight, { pos: [0, 0.82, -0.5 + i * 0.17], r: 0.02, outline: i === 0 });
  p.round(W - 0.8, 0.5, 0.08, C.woodLight, { pos: [0, 1.15, -0.8], rot: [-0.15, 0, 0], r: 0.02, outline: false });
  for (const sx of [-1, 1]) p.round(0.1, 0.8, 0.7, C.steelDark, { pos: [sx * 1.6, 0.4, -0.2], r: 0.03, outline: false });
  // the round bus-stop pole beside the shelter
  const px = W / 2 + 0.9;
  p.cyl(0.06, 0.07, 3.8, C.steel, { pos: [px, 1.9, 0.4], seg: 6 });
  p.cyl(0.55, 0.55, 0.1, C.bestRed, { pos: [px, 3.85, 0.4], rot: [Math.PI / 2, 0, 0], seg: 16 });
  p.ball(0.07, C.cream, { pos: [px, 4.45, 0.4], w: 5, h: 4, outline: false });
  g.add(meshOf(ink, p, { spacing: 0.09, thickness: 2 }));
  // sign on the pole: disc plaque
  const disc = paintCanvas(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#e45d52'; ctx.beginPath(); ctx.arc(128, 128, 126, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#fffaf0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(128, 128, 112, 0, TAU); ctx.stroke();
    hand(ctx, 'KSRTC', 128, 142, { size: 54, fill: '#fffaf0', stroke: INK, sw: 9, seed: 5 });
    hand(ctx, 'കെഎസ്ആർടിസി', 128, 200, { size: 30, maxW: 200, fill: '#ffe8a0', stroke: INK, sw: 6, seed: 5 });
    hand(ctx, 'ബസ് സ്റ്റോപ്പ്', 128, 70, { size: 32, maxW: 200, fill: '#fffaf0', seed: 6 });
  });
  const df = new THREE.Mesh(new THREE.CircleGeometry(0.52, 20), new THREE.MeshBasicMaterial({ map: toTexture(disc), transparent: true, alphaTest: 0.02, polygonOffset: true, polygonOffsetFactor: -1 }));
  df.position.set(px, 3.85, 0.46); df.layers.set(resolveInk(ink).OVERLAY_LAYER);
  g.add(df);
  const df2 = df.clone(); df2.position.z = 0.34; df2.rotation.y = Math.PI; g.add(df2);
  const nameBoard = plaque(ink, 1.7, 0.55, (ctx, w, h) => {
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#fff4cf', hatch: 'rgba(240,190,80,0.5)', cw: w, ch: h, lw: 5, round: 14, r: rng(7) });
    hand(ctx, opts.name ?? 'JUNCTION', w / 2, h * 0.48, { size: h * 0.34, fill: '#c4453f', seed: 4 });
    hand(ctx, opts.nameHi ?? 'ജങ്ഷൻ', w / 2, h * 0.84, { size: h * 0.3, fill: INK, seed: 9 });
  }, { ppu: 170, depth: 0.05, thickness: 1.6 });
  nameBoard.position.set(px, 2.85, 0.48);
  g.add(nameBoard);
  // route map ad on the back panel
  const ad = plaque(ink, 2.9, 1.5, (ctx, w, h) => {
    const r = rng(33);
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#fff6dc', hatch: 'rgba(240,200,120,0.5)', cw: w, ch: h, lw: 5, round: 16, r });
    hand(ctx, 'ബസ് റൂട്ടുകൾ · BUS ROUTES', w / 2, h * 0.17, { size: h * 0.11, fill: '#c4453f', seed: 3 });
    const stops = [[0.12, 0.7], [0.3, 0.45], [0.5, 0.62], [0.7, 0.35], [0.88, 0.55]];
    const line = (pts, col) => wobblyLine(ctx, pts.map(([x, y]) => [x * w, y * h]), { r, lw: 7, amp: 2, color: col });
    line(stops, '#e45d52'); line([[0.12, 0.7], [0.4, 0.85], [0.7, 0.8], [0.88, 0.55]], '#4fc1d6');
    for (const [x, y] of stops) { ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x * w, y * h, 12, 0, TAU); ctx.fill(); ctx.stroke(); }
    hand(ctx, '123', w * 0.3, h * 0.36, { size: h * 0.11, fill: '#e45d52', seed: 4 });
    hand(ctx, '66', w * 0.7, h * 0.78, { size: h * 0.11, fill: '#2a8aa8', seed: 5 });
    drawShape(ctx, ell(w * 0.88, h * 0.22, 20, 20, 8), { fill: '#f6d343', w, h, r, amp: 1, lw: 3 });
  }, { ppu: 150, depth: 0.04, thickness: 1.4, frame: 0xfff6dc });
  ad.position.set(0, 1.85, -D / 2 + 0.17);
  g.add(ad);
  return finish(g, { footprint: { w: W + 2.2, l: D + 0.6 }, colliders: [{ x: -1.6, z: -0.4, radius: 0.5, height: 1 }, { x: 0, z: -0.4, radius: 0.5, height: 1 }, { x: 1.6, z: -0.4, radius: 0.5, height: 1 }, { x: px, z: 0.4, radius: 0.25, height: 4 }] });
}

// =====================================================================================================
// Laundry line (parametric)
// =====================================================================================================
function clothShape(kind) {
  const S = (pts) => new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
  switch (kind) {
    case 'shirt': return S([[-0.15, 0], [-0.3, -0.12], [-0.55, -0.36], [-0.43, -0.5], [-0.28, -0.38], [-0.28, -0.92], [0.28, -0.92], [0.28, -0.38], [0.43, -0.5], [0.55, -0.36], [0.3, -0.12], [0.15, 0]]);
    case 'trouser': return S([[-0.3, 0], [0.3, 0], [0.33, -0.55], [0.4, -1.1], [0.1, -1.1], [0.0, -0.6], [-0.1, -1.1], [-0.4, -1.1], [-0.33, -0.55]]);
    case 'saree': return S([[-0.45, 0], [0.45, 0], [0.5, -1.0], [0.42, -1.9], [-0.42, -1.9], [-0.5, -1.0]]);
    case 'towel': return S([[-0.3, 0], [0.3, 0], [0.3, -0.85], [-0.3, -0.85]]);
    case 'frock': return S([[-0.12, 0], [0.12, 0], [0.18, -0.2], [0.55, -0.85], [-0.55, -0.85], [-0.18, -0.2]]);
    case 'sheet': return S([[-0.8, 0], [0.8, 0], [0.82, -1.2], [-0.82, -1.2]]);
    default: return S([[-0.1, 0], [0.1, 0], [0.1, -0.3], [-0.1, -0.3]]);
  }
}
export function createLaundryLine(ink, opts = {}) {
  const L = opts.length ?? 8, sag = opts.sag ?? Math.max(0.2, L * 0.035);
  const rr = mulberry32(opts.seed ?? 3);
  const g = new THREE.Group();
  const ropeY = (x) => -sag * (1 - ((2 * x) / L) ** 2);
  const rope = new Mix();
  const pts = Array.from({ length: 13 }, (_, i) => { const x = -L / 2 + (L * i) / 12; return [x, ropeY(x), 0]; });
  rope.curve(pts, 0.025, 0.025, 0x7a5a38, { radial: 4, steps: 24, cap: true });
  for (const sx of [-1, 1]) { rope.round(0.18, 0.18, 0.14, C.steelDark, { pos: [sx * (L / 2 + 0.05), 0.0, 0], r: 0.04 }); rope.add(new THREE.TorusGeometry(0.09, 0.02, 4, 8), C.steel, { pos: [sx * (L / 2 - 0.1), 0.0, 0.0], outline: false }); }
  g.add(meshOf(ink, rope, { spacing: 0.05, thickness: 1.3 }));
  const kinds = ['shirt', 'trouser', 'saree', 'towel', 'frock', 'sheet', 'shirt', 'towel'];
  const pastel = [C.pink, C.teal, C.marigoldY, C.sky, C.lilac, C.orange, C.leaf, C.bestRed, 0xf7efdc];
  const fns = [];
  let x = -L / 2 + 0.7, i = 0;
  while (x < L / 2 - 0.9) {
    const kind = kinds[Math.floor(rr() * kinds.length)];
    const piv = new THREE.Group();
    const col = pastel[Math.floor(rr() * pastel.length)], col2 = pastel[Math.floor(rr() * pastel.length)];
    const geo = new THREE.ExtrudeGeometry(clothShape(kind), { depth: 0.04, bevelEnabled: false });
    geo.translate(0, 0, -0.02);
    const q = new Mix();
    q.paint(geo, (cx, cy) => (kind === 'saree' && (cy > -0.25 || cy < -1.55) ? col2 : kind === 'towel' && Math.floor(-cy / 0.14) % 2 ? col2 : kind === 'sheet' && (cx > 0.4) ? col2 : col));
    if (kind === 'shirt') { q.box(0.12, 0.12, 0.03, col2, { pos: [0.12, -0.55, 0.035], outline: false }); }
    if (kind === 'frock') for (let k = 0; k < 4; k++) q.ball(0.04, 0xfffaf0, { pos: [-0.3 + k * 0.2, -0.7, 0.03], w: 4, h: 3, outline: false });
    // pegs
    for (const px of kind === 'sheet' || kind === 'saree' ? [-0.3, 0.3] : [-0.15, 0.15]) q.round(0.05, 0.14, 0.09, C.woodLight, { pos: [px, -0.02, 0], r: 0.015, outline: false });
    const m = meshOf(ink, q, { spacing: 0.05, thickness: 1.3 });
    piv.add(m);
    piv.position.set(x, ropeY(x), 0);
    piv.rotation.z = (rr() - 0.5) * 0.1;
    g.add(piv);
    const base = piv.rotation.z, amp = 0.05 + rr() * 0.05, f = 1.1 + rr() * 0.8, ph = rr() * 6;
    fns.push((dt, t) => { piv.rotation.z = base + Math.sin(t * f + ph) * amp; piv.rotation.x = Math.sin(t * f * 0.7 + ph + 2) * amp * 0.9; });
    x += kind === 'sheet' ? 1.9 : kind === 'saree' ? 1.35 : 1.15 + rr() * 0.3;
    i++;
  }
  // lift to hanging height; optional bamboo end posts so it can stand alone (world: posts:false between buildings)
  const H = opts.height ?? 3.2;
  g.children.forEach((c) => { c.position.y += H; });
  if (opts.posts !== false) {
    const pp = new Mix();
    for (const sx of [-1, 1]) { pp.cyl(0.07, 0.09, H + 0.3, 0xd9c67e, { pos: [sx * (L / 2 + 0.2), (H + 0.3) / 2, 0], seg: 6 }); pp.cyl(0.1, 0.1, 0.06, 0xb59a52, { pos: [sx * (L / 2 + 0.2), H * 0.5, 0], seg: 6, outline: false }); }
    g.add(meshOf(ink, pp, { spacing: 0.06, thickness: 1.6 }));
  }
  g.userData.height = H;
  animator(g, fns);
  return finish(g, { footprint: { w: L + 0.6, l: 0.5 }, colliders: opts.posts === false ? [] : [-1, 1].map((sx) => ({ x: sx * (L / 2 + 0.2), z: 0, radius: 0.15, height: H })) });
}

// =====================================================================================================
// Hanging electric wires (catenary) + pole
// =====================================================================================================
export function createWires(ink, opts = {}) {
  const from = new THREE.Vector3(...(opts.from ?? [-5, 5, 0]));
  const to = new THREE.Vector3(...(opts.to ?? [5, 5, 0]));
  const sag = opts.sag ?? from.distanceTo(to) * 0.06;
  const count = opts.count ?? 3, spread = opts.spread ?? 0.28;
  const dir = to.clone().sub(from);
  const side = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
  if (side.lengthSq() < 0.5) side.set(0, 0, 1);
  const g = new THREE.Group();
  const p = new Mix();
  const rr = mulberry32(opts.seed ?? 2);
  for (let w = 0; w < count; w++) {
    const off = side.clone().multiplyScalar((w - (count - 1) / 2) * spread);
    const s = sag * (0.85 + rr() * 0.3);
    const pts = Array.from({ length: 15 }, (_, i) => {
      const t = i / 14;
      return from.clone().lerp(to, t).add(off).add(new THREE.Vector3(0, -s * 4 * t * (1 - t), 0));
    });
    p.curve(pts, 0.03, 0.03, 0x4a4360, { radial: 4, steps: 28, outline: false });
    for (const q of [pts[0], pts[14]]) p.ball(0.07, C.cream, { pos: [q.x, q.y, q.z], w: 5, h: 4, outline: false });
  }
  const mesh = meshOf(ink, p, { spacing: 0.1, strength: 0.5, outline: false });
  mesh.castShadow = false;
  g.add(mesh);
  let t = 0;
  g.userData.animate = (dt) => { t += dt; mesh.rotation.z = Math.sin(t * 0.8) * 0.0015; };
  return finish(g, { footprint: { w: from.distanceTo(to), l: spread * count }, colliders: [] });
}

export function createWirePole(ink) {
  const p = new Mix();
  p.cyl(0.14, 0.2, 6.2, C.woodDark, { pos: [0, 3.1, 0], seg: 7 });
  p.round(2.4, 0.12, 0.16, C.woodDark, { pos: [0, 5.6, 0], r: 0.04 });
  p.round(2.0, 0.12, 0.16, C.woodDark, { pos: [0, 4.9, 0], r: 0.04 });
  for (const x of [-1, 0, 1]) { p.cyl(0.05, 0.07, 0.25, C.cream, { pos: [x * 0.9, 5.78, 0], seg: 6 }); }
  p.round(0.7, 0.8, 0.5, C.steelDark, { pos: [0.5, 4.2, 0.35], r: 0.08 }); // transformer
  p.ball(0.08, C.bestRed, { pos: [0.5, 4.7, 0.35], w: 5, h: 4, outline: false });
  const g = new THREE.Group();
  g.add(meshOf(ink, p, { spacing: 0.09, thickness: 1.9 }));
  return finish(g, { footprint: { w: 2.6, l: 0.8 }, colliders: [{ x: 0, z: 0, radius: 0.25, height: 6 }] });
}

// =====================================================================================================
// Backwater boats (bobbing): every third one is a kettuvallam houseboat (black tarred hull, woven-thatch vault roof, tyre fenders),
// the rest are small painted country boats (vallam) with an outboard. Photo: Wikimedia Commons "Kettuvallam(Boathouse) on the Backwaters".
// =====================================================================================================
export function createBoat(ink, opts = {}) {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const p = new Mix();
  const house = (opts.seed ?? 0) % 3 === 0;
  const LEN = house ? 3.3 : 2.7, BEAM = house ? 1.15 : 0.75, D = house ? 0.8 : 0.7;
  const bend = (v) => { // narrow the ends and lift bow/stern
    const t = Math.min(1, Math.abs(v.z) / LEN);
    v.x *= 1 - 0.55 * t ** 2.4;
    v.y += (v.z > 0 ? 1.25 : 0.9) * t ** 3 * D;
    return v;
  };
  const hullGeo = new THREE.SphereGeometry(1, 16, 8, 0, TAU, Math.PI / 2, Math.PI / 2);
  const hp = hullGeo.attributes.position;
  for (let i = 0; i < hp.count; i++) { const v = new THREE.Vector3(hp.getX(i) * BEAM, hp.getY(i) * D + D, hp.getZ(i) * LEN); bend(v); hp.setXYZ(i, v.x, v.y, v.z); }
  hullGeo.computeVertexNormals();
  const hullCols = [[0x2b2724, 0x3a332e], [0x3f7fc0, 0xfffaf0], [0xd9503f, 0xfffaf0], [0x2f9b8a, 0xfffaf0]][house ? 0 : 1 + ((opts.seed ?? 0) % 3)];
  p.paint(hullGeo, (x, y, z) => (y > D * 0.8 ? hullCols[1] : hullCols[0]));
  const deck = new THREE.CircleGeometry(1, 16);
  deck.rotateX(-Math.PI / 2);
  const dp = deck.attributes.position;
  for (let i = 0; i < dp.count; i++) { const v = new THREE.Vector3(dp.getX(i) * BEAM, D - 0.04, dp.getZ(i) * LEN); bend(v); dp.setXYZ(i, v.x, v.y, v.z); }
  deck.computeVertexNormals();
  p.add(deck, C.woodLight, { outline: false });
  const rim = Array.from({ length: 21 }, (_, i) => { const a = (i / 20) * TAU; return bend(new THREE.Vector3(Math.sin(a) * BEAM, D, Math.cos(a) * LEN)); });
  p.curve(rim, 0.06, 0.06, C.woodDark, { radial: 4, steps: 40, outline: false });
  if (house) {
    // low woven walls, timber posts and a barrel-vault thatched roof; tyres hung along the sides, a lifebuoy at the bow
    const RZ0 = -1.9, RZ1 = 1.2, RL = RZ1 - RZ0;
    p.box(BEAM * 1.55, 0.55, RL, 0x9a7a4e, { pos: [0, D + 0.3, (RZ0 + RZ1) / 2] });
    for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) p.box(0.05, 0.3, 0.5, 0x2b3a4a, { pos: [sx * BEAM * 0.78, D + 0.38, RZ0 + 0.4 + i * 0.7], outline: false }); // window gaps
    const arch = new THREE.Shape();
    arch.absellipse(0, 0, BEAM * 1.05, 0.85, 0, Math.PI, false, 0); arch.lineTo(BEAM * 1.05, 0); arch.closePath();
    const roofGeo = new THREE.ExtrudeGeometry(arch, { depth: RL + 0.7, bevelEnabled: false, curveSegments: 10 });
    roofGeo.translate(0, 0, -(RL + 0.7) / 2);
    p.add(roofGeo, 0xb89a5a, { pos: [0, D + 0.78, (RZ0 + RZ1) / 2] });
    for (let i = -3; i <= 3; i++) p.box(0.05, 0.05, RL + 0.8, 0x8a6e3a, { pos: [i * 0.26, D + 0.78 + 0.85 * Math.sqrt(Math.max(0, 1 - (i * 0.26 / (BEAM * 1.05)) ** 2)) + 0.02, (RZ0 + RZ1) / 2], outline: false });
    for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) p.cyl(0.04, 0.04, 0.9, C.woodDark, { pos: [sx * BEAM * 0.9, D + 0.45, 1.2 - i * 0.35 + 0.35], seg: 5, outline: false });
    for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) p.add(new THREE.TorusGeometry(0.17, 0.07, 5, 9), C.tyre, { pos: [sx * (BEAM * 0.98), D * 0.85, -1.9 + i * 1.0], rot: [0, Math.PI / 2, 0], outline: false });
    p.add(new THREE.TorusGeometry(0.2, 0.06, 6, 10), 0xe8632f, { pos: [BEAM * 0.8, D + 0.7, 1.35], rot: [0, 0.2, 0] });
    p.box(0.7, 0.04, 0.45, 0xf4efe0, { pos: [0, D + 0.12, 2.0], outline: false });  // a little rug on the open fore-deck
  } else {
    // country boat: thwarts, an outboard on the stern, a heap of net and a pair of oars
    for (const z of [-0.8, 0.0, 0.8]) p.box(BEAM * 1.5, 0.06, 0.16, C.woodLight, { pos: [0, D + 0.06, z], outline: false });
    p.box(0.28, 0.4, 0.3, 0x3a3f55, { pos: [0, D + 0.3, -LEN * 0.92] });
    p.tube([0, D + 0.4, -LEN * 0.92], [0, D - 0.2, -LEN * 0.98], 0.03, C.kaali, { seg: 4, outline: false });
    p.add(new THREE.IcosahedronGeometry(0.3, 1), 0x7fc4b8, { pos: [0.1, D + 0.12, 1.2], scale: [1.2, 0.5, 1.0], wonk: 0.05 });
    p.tube([-0.3, D + 0.1, -0.2], [-BEAM * 1.5, D + 0.6, 0.9], 0.025, C.woodLight, { seg: 4, outline: false });
    p.tube([0.3, D + 0.1, -0.2], [BEAM * 1.5, D + 0.6, 0.9], 0.025, C.woodLight, { seg: 4, outline: false });
    for (const [x, z, c] of [[0.0, 0.6, C.bestRed], [0.2, 1.3, C.yellow]]) p.ball(0.1, c, { pos: [x, D + 0.1, z], w: 6, h: 5, outline: false });
  }
  inner.add(meshOf(ink, p, { spacing: 0.08, thickness: 2 }));
  let t = opts.phase ?? 0;
  g.userData.waterline = 0.35;
  g.userData.animate = (dt) => {
    t += dt;
    inner.position.y = Math.sin(t * 1.5) * 0.06;
    inner.rotation.z = Math.sin(t * 1.1) * 0.04; inner.rotation.x = Math.sin(t * 0.9 + 1) * 0.025;
  };
  return finish(g, { footprint: { w: BEAM * 2, l: LEN * 2 }, colliders: [{ x: 0, z: 1.0, radius: 1.0, height: 1.5 }, { x: 0, z: -1.0, radius: 1.0, height: 1.5 }] });
}

// =====================================================================================================
// Kite (patang): centred on the origin, facing +z, string hanging down
// =====================================================================================================
export function createKite(ink, opts = {}) {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const p = new Mix();
  const cols = opts.colors ?? [C.rose, C.marigoldY, C.teal, C.orange];
  const shape = new THREE.Shape([new THREE.Vector2(0, 1.15), new THREE.Vector2(0.78, 0.2), new THREE.Vector2(0, -0.85), new THREE.Vector2(-0.78, 0.2)]);
  const sail = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false });
  p.paint(sail, (x, y) => cols[(x >= 0 ? 0 : 1) + (y >= 0.2 ? 0 : 2)]);
  p.tube([0, 1.15, 0.04], [0, -0.85, 0.04], 0.018, C.woodLight, { seg: 4, outline: false });
  p.curve([[-0.78, 0.2, 0.04], [0, 0.32, 0.12], [0.78, 0.2, 0.04]], 0.018, 0.018, C.woodLight, { radial: 4, steps: 6, outline: false });
  p.ball(0.07, C.cream, { pos: [0, 0.2, 0.1], scale: [1, 1, 0.5], w: 5, h: 4, outline: false });
  sleepyFace(p, { y: 0.42, z: 0.045, s: 1.6 });
  inner.add(meshOf(ink, p, { spacing: 0.05, thickness: 1.6 }));
  // tail of paper bows
  const tail = [];
  const tcols = [C.bestRed, C.cream, C.marigoldY, C.teal, C.pink, C.cream, C.bestRed, C.yellow];
  tcols.forEach((c, i) => {
    const q = new Mix();
    q.add(new THREE.ConeGeometry(0.1, 0.2, 3), c, { rot: [0, 0, Math.PI / 2], scale: [1, 1, 0.3], outline: false });
    q.add(new THREE.ConeGeometry(0.1, 0.2, 3), c, { rot: [0, 0, -Math.PI / 2], scale: [1, 1, 0.3], outline: false });
    const m = meshOf(ink, q, { spacing: 0.04, thickness: 1.0 });
    m.position.set(0, -1.05 - i * 0.26, 0.02);
    inner.add(m);
    tail.push(m);
  });
  const tp = new Mix();
  tp.tube([0, -0.85, 0.02], [0, -1.05 - tcols.length * 0.26, 0.02], 0.008, C.cream, { seg: 3, outline: false });
  inner.add(meshOf(ink, tp, { outline: false }));
  // string going down and forward
  const sp = new Mix();
  sp.curve([[0, -0.2, 0.04], [0.1, -1.6, 0.6], [0.0, -3.0, 1.3], [-0.2, -4.2, 2.4]], 0.008, 0.008, 0x5a4a60, { radial: 3, steps: 14, outline: false });
  g.add(meshOf(ink, sp, { outline: false }));
  let t = opts.phase ?? 0;
  g.userData.animate = (dt) => {
    t += dt;
    inner.rotation.z = Math.sin(t * 1.6) * 0.14; inner.rotation.y = Math.sin(t * 1.1) * 0.25; inner.rotation.x = Math.sin(t * 1.9) * 0.08;
    tail.forEach((m, i) => { m.position.x = Math.sin(t * 3.2 - i * 0.7) * 0.07 * (1 + i * 0.4); m.rotation.z = Math.sin(t * 3.2 - i * 0.7 + 1) * 0.5; });
  };
  return finish(g, { footprint: { w: 1.6, l: 0.4 }, colliders: [] });
}
