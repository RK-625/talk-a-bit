/**
 * hyderabad/props/siteDetails.js: small contextual props that belong to the big sites (part 1: Charminar, Falaknuma, Cyber Towers, Kacheguda,
 * Osmania Arts College, the lake road, the cable bridge, the Buddha island). Part 2 (lakeside park, old-city houses, temple, metro station, extras)
 * is in siteDetails2.js. Factory names are kept from the Mumbai fork (createElephantaBooth = boating booth, createFerry = tourist boats + pedal boats,
 * createBullStatue = the giant pearl, createStockTicker = walk-in interview board, createTiffinPile = delivery bikes, createChadarStall = flower + boat-ticket
 * stall, createHajiAliJuice = haleem / lassi stall).
 *
 * Factories (ink, opts?) -> THREE.Group (y up, base y=0, front +z, userData {footprint:{w,l}, colliders, animate?}):
 *   createElephantaBooth, createFerry, createPhotographerTripod, createDanaMat, createVintageCar, createBullStatue,
 *   createStockTicker, createTiffinPile, createLuggageTrolley, createBookStall, createMarineBench, createTollBooth,
 *   createChadarStall, createHajiAliJuice
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, plateDecal, plateText, hand, handRow, boardRect, paintCanvas, finish, rig, wheelMesh,
  eyes, smile, rng, mulberry32, drawShape, wobblyLine, INK, glowMat, animator, swing, umbrella, ell, toTexture, taperTube, steam,
} from './kit.js';
import { OVERLAY_LAYER } from '../../../engine/ink.js';

export const TAU = Math.PI * 2;
const PAL_METRO = 0x2f7fb0; // Hyderabad Metro blue

/** Common wrapper: builds one merged mesh from `build(p, g, anim)` and wires animate + metadata. */
export function mk(ink, build, { spacing = 0.08, thickness = 2, footprint = { w: 2, l: 2 }, colliders = [], extra = {} } = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const anim = [];
  build(p, g, anim);
  g.add(meshOf(ink, p, { spacing, thickness }));
  if (anim.length) animator(g, anim);
  return finish(g, { footprint, colliders, ...extra });
}

/** Painted board with a thin outlined slab (plaque), positioned/rotated; returns it. */
export function sign(ink, g, w, h, painter, [x, y, z], ry = 0, o = {}) {
  const d = plaque(ink, w, h, painter, { ppu: o.ppu ?? 150, depth: 0.05, thickness: 1.6, frame: o.frame ?? 0xf3edda });
  d.position.set(x, y, z);
  d.rotation.y = ry;
  if (o.rx) d.rotation.x = o.rx;
  g.add(d);
  return d;
}
const board = (ctx, w, h, fill = '#fff4c2', hatch = 'rgba(230,180,60,0.5)', seed = 3) => boardRect(ctx, 4, 4, w - 8, h - 8, { fill, hatch, cw: w, ch: h, r: rng(seed), lw: 3.4, round: 10 });

export function pigeonParts(p, x, z, ry = 0, s = 1, y = 0) {
  const sn = Math.sin(ry), cs = Math.cos(ry);
  p.ball(0.2 * s, 0xb9b6c8, { pos: [x, y + 0.22 * s, z], scale: [0.9, 0.85, 1.35], w: 7, h: 5 });
  p.ball(0.12 * s, 0x9a97ae, { pos: [x + sn * 0.22 * s, y + 0.38 * s, z + cs * 0.22 * s], w: 6, h: 4 });
  p.cone(0.04 * s, 0.1 * s, 0xf0b060, { pos: [x + sn * 0.34 * s, y + 0.37 * s, z + cs * 0.34 * s], rot: [Math.PI / 2, 0, -ry], seg: 4, outline: false });
  p.box(0.12 * s, 0.03 * s, 0.22 * s, 0x8f8ca3, { pos: [x - sn * 0.28 * s, y + 0.24 * s, z - cs * 0.28 * s], rot: [0.3, ry, 0], outline: false });
  p.ball(0.09 * s, 0x8fcf9e, { pos: [x + sn * 0.12 * s, y + 0.34 * s, z + cs * 0.12 * s], scale: [1.1, 0.5, 1], w: 5, h: 3, outline: false });
}

// ---------------------------------------------------------------------------------------------------
// Gateway
// ---------------------------------------------------------------------------------------------------
/** Hussain Sagar boating booth (tickets for the tourist boats) with a queue rope. ~4 x 3 x 4.2 */
export function createElephantaBooth(ink) {
  return mk(ink, (p, g) => {
    p.round(3.0, 2.4, 2.0, C.teal, { pos: [0, 1.3, 0], r: 0.1 });
    p.box(3.2, 0.2, 0.2, C.cream, { pos: [0, 0.18, 1.0] });
    p.round(1.6, 0.9, 0.12, C.glass, { pos: [0, 1.7, 1.02], r: 0.05, outline: false });
    p.box(1.8, 0.1, 0.5, C.woodLight, { pos: [0, 1.2, 1.25] });
    for (let i = 0; i < 8; i++) p.add(new THREE.BoxGeometry(0.42, 0.07, 1.4), i % 2 ? C.cream : C.bestRed, { pos: [-1.5 + (i + 0.5) * 0.4 + 0.0, 2.8, 1.35], rot: [0.5, 0, 0] });
    p.round(3.3, 0.18, 2.3, C.bestRed, { pos: [0, 2.62, 0.05], r: 0.05 });
    for (const sx of [-1, 1]) { p.cyl(0.06, 0.06, 1.0, C.steelDark, { pos: [sx * 2.4, 0.5, 3.0], seg: 6 }); p.ball(0.12, C.brass, { pos: [sx * 2.4, 1.05, 3.0], w: 6, h: 4 }); }
    p.tube([-2.4, 0.95, 3.0], [0, 0.65, 3.4], 0.025, C.bestRed, { seg: 4, outline: false }); p.tube([0, 0.65, 3.4], [2.4, 0.95, 3.0], 0.025, C.bestRed, { seg: 4, outline: false });
    p.round(0.8, 0.9, 0.6, C.sky, { pos: [-2.1, 0.5, 0.2], r: 0.08 }); // water can
    sign(ink, g, 3.0, 0.9, (ctx, w, h) => {
      board(ctx, w, h, '#fff7d6', 'rgba(230,180,80,0.45)', 5);
      hand(ctx, 'బోటింగ్', w * 0.5, h * 0.5, { size: h * 0.4, fill: '#d9453b', seed: 3, maxW: w * 0.9 });
      handRow(ctx, [{ text: 'టికెట్', size: h * 0.22, fill: INK }, { text: 'BOAT TICKETS', size: h * 0.2, fill: '#1f6f8b' }], w / 2, h * 0.86);
    }, [0, 3.45, 0.2], 0);
    sign(ink, g, 1.5, 1.0, (ctx, w, h) => {
      board(ctx, w, h, '#e8f5fb', 'rgba(110,170,210,0.45)', 6);
      hand(ctx, '30 MIN ₹150', w / 2, h * 0.38, { size: h * 0.2, fill: INK, seed: 2 });
      hand(ctx, '+ PERSON ₹50', w / 2, h * 0.62, { size: h * 0.2, fill: INK, seed: 4 });
      hand(ctx, 'లైఫ్ జాకెట్ తప్పనిసరి', w / 2, h * 0.86, { size: h * 0.14, fill: '#6a7b88', seed: 8, weight: 'normal' });
    }, [-2.1, 1.7, 1.06], 0);
  }, { footprint: { w: 5.4, l: 6 }, colliders: [{ x: 0, z: 0, radius: 1.6, height: 3 }], thickness: 2 });
}

/** Tourist-boat dock (reference: Commons "HussainSagar Boating", "Boat in Hussain Sagar lake"): a floating pontoon with a shade roof, a white double-deck tourist launch with an open canopy deck, a yellow speedboat and swan pedal boats tied alongside; everything bobs. ~3.2 x 10.8 */
export function createFerry(ink, opts = {}) {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const p = new Mix();
  p.round(2.4, 0.3, 10.0, C.woodLight, { pos: [0, 0.55, 0], r: 0.06 });
  for (let i = 0; i < 9; i++) p.box(2.3, 0.02, 0.05, C.woodDark, { pos: [0, 0.72, -4.4 + i * 1.1], outline: false });
  for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) p.cyl(0.3, 0.3, 1.0, i % 2 ? C.sky : C.teal, { pos: [sx * 1.0, 0.25, -4 + i * 2], rot: [Math.PI / 2, 0, 0], seg: 8, outline: false });
  // little shade roof over the middle of the dock
  for (const sx of [-1, 1]) for (const sz of [-1.6, 1.6]) p.cyl(0.06, 0.07, 2.2, C.woodDark, { pos: [sx * 1.0, 1.9, sz], seg: 5 });
  for (let i = 0; i < 8; i++) p.add(new THREE.BoxGeometry(0.34, 0.06, 3.9), i % 2 ? C.cream : C.bestRed, { pos: [-1.2 + (i + 0.5) * 0.3, 3.05, 0], rot: [0, 0, (i - 3.5) * 0.06] });
  p.box(0.9, 0.5, 0.5, C.maroon, { pos: [0, 0.95, 0.0] }); // ticket chest
  // swan pedal boats
  const swan = (x, z, ry, col) => {
    const c = Math.cos(ry), s2 = Math.sin(ry);
    const P = (dx, dy, dz) => [x + dx * c + dz * s2, dy, z - dx * s2 + dz * c];
    p.ball(0.85, col, { pos: P(0, 0.55, 0), scale: [0.95, 0.5, 1.45], w: 10, h: 7 });
    p.box(0.9, 0.08, 0.5, C.woodLight, { pos: P(0, 0.95, -0.2), rot: [0, ry, 0] });
    p.tube(P(0, 0.85, 1.0), P(0, 1.45, 1.35), 0.15, C.white, { seg: 6 });
    p.tube(P(0, 1.45, 1.35), P(0, 1.95, 1.2), 0.13, C.white, { seg: 6 });
    p.ball(0.2, C.white, { pos: P(0, 2.05, 1.2), w: 7, h: 5 });
    p.cone(0.08, 0.3, 0xf29a3a, { pos: P(0, 2.0, 1.48), rot: [Math.PI / 2, ry, 0], seg: 5, outline: false });
    for (const sx of [-1, 1]) { p.ball(0.4, C.white, { pos: P(sx * 0.62, 0.85, -0.15), scale: [0.35, 0.9, 1.5], w: 7, h: 5 }); p.ball(0.045, INKC, { pos: P(sx * 0.14, 2.1, 1.28), w: 4, h: 3, outline: false }); }
    p.cyl(0.04, 0.04, 0.8, C.steelDark, { pos: P(0.5, 1.2, -0.5), seg: 4, outline: false });
    p.cyl(0.04, 0.04, 0.8, C.steelDark, { pos: P(-0.5, 1.2, -0.5), seg: 4, outline: false });
    p.add(new THREE.BoxGeometry(1.35, 0.05, 0.9), col, { pos: P(0, 1.65, -0.5), rot: [0, ry, 0] });
  };
  // the white two-deck tourist launch (blue band, glazed lower cabin, open canopy deck, wheelhouse and a flag)
  const launch = (x, z, ry, band) => {
    const c = Math.cos(ry), s2 = Math.sin(ry);
    const P = (dx, dy, dz) => [x + dx * c + dz * s2, dy, z - dx * s2 + dz * c];
    p.round(1.8, 0.8, 6.2, 0xf6f3ec, { pos: P(0, 0.55, 0), r: 0.18, rot: [0, ry, 0] });
    p.round(1.84, 0.16, 6.24, band, { pos: P(0, 0.45, 0), r: 0.05, rot: [0, ry, 0], outline: false });
    p.round(1.6, 0.9, 4.2, 0xf6f3ec, { pos: P(0, 1.0, -0.5), r: 0.1, rot: [0, ry, 0] });
    for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) p.box(0.05, 0.4, 0.5, 0x4a7a95, { pos: P(sx * 0.82, 1.1, -2.0 + i * 0.85), rot: [0, ry, 0], outline: false });
    p.round(1.7, 0.1, 4.2, 0xdfe6ea, { pos: P(0, 1.5, -0.5), r: 0.04, rot: [0, ry, 0] });                       // upper deck floor
    for (const sx of [-1, 1]) for (const sz of [-2.4, -0.5, 1.4]) p.cyl(0.04, 0.04, 1.1, C.steelDark, { pos: P(sx * 0.78, 2.1, sz), seg: 5, outline: false });
    p.round(1.9, 0.1, 4.4, 0xfaf8f2, { pos: P(0, 2.7, -0.5), r: 0.04, rot: [0, ry, 0] });                       // canopy roof
    for (const sx of [-1, 1]) p.box(0.03, 0.28, 4.0, 0xf6f3ec, { pos: P(sx * 0.82, 1.7, -0.5), rot: [0, ry, 0], outline: false }); // deck rails
    p.round(1.2, 0.7, 1.0, 0xf6f3ec, { pos: P(0, 1.95, 2.0), r: 0.08, rot: [0, ry, 0] });                       // wheelhouse
    p.box(1.0, 0.25, 0.05, 0x4a7a95, { pos: P(0, 2.05, 2.52), rot: [0, ry, 0], outline: false });
    p.cyl(0.03, 0.03, 1.5, C.steelDark, { pos: P(0, 3.1, 2.0), seg: 4, outline: false });
    p.box(0.45, 0.25, 0.03, 0xf08a2a, { pos: P(0.25, 3.7, 2.0), rot: [0, ry, 0], outline: false });
    for (let i = 0; i < 6; i++) p.ball(0.12, 0xfff1b8, { pos: P(0, 2.55, -2.4 + i * 0.9), w: 4, h: 3, outline: false });
  };
  launch(-2.9, -0.4, 0.04, 0x2f6fa0);
  // a yellow speedboat and swan pedal boats on the other side
  const speed = (x, z, ry) => {
    const c = Math.cos(ry), s2 = Math.sin(ry);
    const P = (dx, dy, dz) => [x + dx * c + dz * s2, dy, z - dx * s2 + dz * c];
    p.ball(0.7, 0xf6c62d, { pos: P(0, 0.55, 0), scale: [0.85, 0.45, 1.9], w: 10, h: 7 });
    p.box(0.7, 0.3, 0.04, 0x9fd0e6, { pos: P(0, 1.0, 0.3), rot: [-0.5, ry, 0], outline: false });
    p.box(0.7, 0.14, 0.7, 0xfaf6ea, { pos: P(0, 0.8, -0.5), rot: [0, ry, 0], outline: false });
    p.box(0.3, 0.3, 0.4, C.steelDark, { pos: P(0, 0.85, -1.3), rot: [0, ry, 0] });
  };
  speed(2.3, -3.2, -0.08);
  [[2.1, 0.0, -0.1, 0xf6e66a], [2.1, 2.8, 0.12, 0xf0a6c0], [-2.1, 4.4, 0.1, 0x8fd3f0]].forEach(([x, z, ry, c]) => swan(x, z, ry, c));
  inner.add(meshOf(ink, p, { spacing: 0.1, thickness: 2.2 }));
  sign(ink, g, 2.2, 0.55, (ctx, w, h) => { board(ctx, w, h, '#fff7d6', 'rgba(230,180,80,0.45)', 5); hand(ctx, 'బోటింగ్ · BOATS', w / 2, h * 0.66, { size: h * 0.4, fill: '#d9453b', seed: 3, maxW: w * 0.92 }); }, [0, 2.6, 2.0], 0, { ppu: 130 });
  let t = opts.phase ?? 0;
  g.userData.waterline = 0.7;
  g.userData.animate = (dt) => {
    t += dt;
    inner.position.y = Math.sin(t * 1.1) * 0.06;
    inner.rotation.z = Math.sin(t * 0.8) * 0.02; inner.rotation.x = Math.sin(t * 0.6 + 1) * 0.012;
  };
  return finish(g, { footprint: { w: 3.2, l: 10.8 }, colliders: [{ x: 0, z: 3, radius: 1.6, height: 4 }, { x: 0, z: 0, radius: 1.6, height: 4 }, { x: 0, z: -3, radius: 1.6, height: 4 }] });
}

/** Photographer's tripod stand with a wooden box camera under a black hood + a "PHOTO" sandwich board. */
export function createPhotographerTripod(ink) {
  return mk(ink, (p, g, anim) => {
    for (const a of [0, TAU / 3, (2 * TAU) / 3]) p.tube([0, 1.9, 0], [Math.sin(a) * 0.9, 0, Math.cos(a) * 0.9], 0.05, C.woodDark, { seg: 5 });
    p.cyl(0.14, 0.14, 0.12, C.steelDark, { pos: [0, 1.9, 0], seg: 8 });
    p.round(0.8, 0.62, 0.9, C.wood, { pos: [0, 2.3, 0], r: 0.06 });
    p.cyl(0.2, 0.28, 0.5, C.kaali, { pos: [0, 2.3, 0.7], rot: [Math.PI / 2, 0, 0], seg: 10 });
    p.cyl(0.16, 0.16, 0.06, C.glass, { pos: [0, 2.3, 0.97], rot: [Math.PI / 2, 0, 0], seg: 10, outline: false });
    const cloth = new THREE.ConeGeometry(0.6, 0.9, 8);
    p.add(cloth, 0x2c2742, { pos: [0, 2.75, -0.6], rot: [-1.1, 0, 0], scale: [1, 1, 0.8] });
    // sandwich board
    for (const sz of [-1, 1]) p.add(new THREE.BoxGeometry(1.1, 1.3, 0.06), C.cream, { pos: [1.9, 0.7, sz * 0.2], rot: [sz * 0.28, 0, 0] });
    p.box(0.1, 0.2, 0.3, C.woodDark, { pos: [1.9, 1.4, 0], outline: false });
    sign(ink, g, 1.0, 1.1, (ctx, w, h) => {
      board(ctx, w, h, '#fffbe6', 'rgba(240,200,90,0.45)', 8);
      hand(ctx, 'PHOTO', w / 2, h * 0.34, { size: h * 0.28, fill: '#d9453b', seed: 2 });
      hand(ctx, 'ఫోటో', w / 2, h * 0.58, { size: h * 0.26, fill: INK, seed: 3 });
      hand(ctx, '2 min · ₹100', w / 2, h * 0.82, { size: h * 0.15, fill: '#2f7a46', seed: 5, weight: 'normal', maxW: w * 0.8 });
    }, [1.9, 0.78, 0.26], 0, { ppu: 140 });
  }, { footprint: { w: 3.4, l: 2.2 }, colliders: [{ x: 0, z: 0, radius: 0.6, height: 3 }], thickness: 1.8 });
}

/** Pigeon-feed (dana) seller's mat: cloth, grain heaps, bowls, a scoop, a sign and pecking pigeons. */
export function createDanaMat(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  p.box(2.8, 0.05, 2.0, C.maroon, { pos: [0, 0.04, 0] });
  p.box(2.6, 0.02, 0.18, C.marigoldY, { pos: [0, 0.075, 0.82], outline: false });
  p.box(2.6, 0.02, 0.18, C.marigoldY, { pos: [0, 0.075, -0.82], outline: false });
  for (const [x, z, c] of [[-0.8, -0.2, 0xe9c566], [0, -0.4, 0xf2dd9a], [0.8, -0.1, 0xd9a65a]]) {
    p.cone(0.5, 0.45, c, { pos: [x, 0.3, z], seg: 8 });
    p.lathe([[0.001, 0], [0.45, 0.02], [0.6, 0.18], [0.5, 0.2]], C.steel, { pos: [x, 0.07, z], seg: 10, outline: false });
  }
  p.cyl(0.4, 0.3, 0.3, C.woodLight, { pos: [1.0, 0.2, -0.65], seg: 8 }); // grain basket
  p.round(0.5, 0.18, 0.4, C.steel, { pos: [-0.2, 0.18, 0.4], r: 0.05 });
  p.tube([0.2, 0.15, 0.5], [0.7, 0.2, 0.7], 0.03, C.woodDark, { seg: 4, outline: false });
  p.cyl(0.25, 0.25, 0.4, C.sky, { pos: [-1.3, 0.25, -0.5], seg: 7 }); // stool bucket
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.6 }));
  sign(ink, g, 1.0, 0.7, (ctx, w, h) => {
    board(ctx, w, h, '#fff7d6', 'rgba(230,180,80,0.45)', 3);
    hand(ctx, 'గింజలు', w * 0.5, h * 0.46, { size: h * 0.44, fill: '#d9453b', seed: 4 });
    hand(ctx, 'GRAIN ₹10', w * 0.5, h * 0.84, { size: h * 0.24, fill: INK, seed: 6 });
  }, [-0.9, 0.55, -0.95], 0);
  // pigeons (one mesh each so they can peck)
  const birds = [];
  [[-0.4, 0.9, 0.3, 0.9], [0.5, 1.15, -0.6, 1.0], [1.3, 0.8, 1.9, 0.8], [-1.2, 1.2, 2.6, 1.0]].forEach(([x, z, ry, s], i) => {
    const bp = new Mix(); pigeonParts(bp, 0, 0, 0, s);
    const m = meshOf(ink, bp, { spacing: 0.04, thickness: 1.3 });
    m.position.set(x, 0.07, z); m.rotation.y = ry; g.add(m); birds.push(m);
  });
  let t = 0;
  g.userData.animate = (dt) => { t += dt; birds.forEach((b, i) => { const k = Math.max(0, Math.sin(t * 2.4 + i * 1.9)); b.rotation.x = k * 0.55; b.position.y = 0.07 - k * 0.04; }); };
  return finish(g, { footprint: { w: 3.2, l: 2.4 }, colliders: [] });
}

// ---------------------------------------------------------------------------------------------------
// Taj
// ---------------------------------------------------------------------------------------------------
/** A 1930s vintage saloon (burgundy + cream) for the Falaknuma Palace doorway (plate TS 09). ~2.3 x 5 x 2.3. Wheels spin via animate(dt, speed). */
export function createVintageCar(ink, opts = {}) {
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const BODY = opts.color ?? 0x8f3b4b, CREAM = 0xf5ecd0;
  // long bonnet, cabin, boot
  p.side([[-2.3, 0.7], [-2.3, 1.45], [-1.7, 1.5], [-1.5, 1.45], [1.0, 1.4], [2.2, 1.35], [2.4, 0.9], [2.2, 0.68]], 1.8, BODY, { bevel: 0.07, round: 0.2 });
  p.side([[-1.8, 1.4], [-1.55, 2.25], [-0.2, 2.3], [0.1, 1.4]], 1.62, CREAM, { bevel: 0.06, round: 0.28 });
  p.side([[-1.5, 1.55], [-1.38, 2.1], [-0.35, 2.15], [-0.05, 1.55]], 1.7, C.glass, { bevel: 0.02, round: 0.06 });
  p.round(1.74, 0.1, 2.0, BODY, { pos: [0, 2.32, -0.85], r: 0.05 });
  // sweeping mudguards + running boards
  for (const sx of [-1, 1]) {
    p.add(new THREE.TorusGeometry(0.62, 0.1, 5, 12, Math.PI), BODY, { pos: [sx * 1.0, 0.55, 1.65], rot: [0, Math.PI / 2, 0], scale: [1.2, 1, 1] });
    p.add(new THREE.TorusGeometry(0.62, 0.1, 5, 12, Math.PI), BODY, { pos: [sx * 1.0, 0.55, -1.5], rot: [0, Math.PI / 2, 0], scale: [1.2, 1, 1] });
    p.box(0.3, 0.07, 2.2, C.steelDark, { pos: [sx * 1.0, 0.62, 0.05] });
    p.ball(0.26, 0xfff1b8, { pos: [sx * 0.7, 1.55, 2.3], w: 9, h: 7 }); // round headlamps
    p.cyl(0.04, 0.04, 0.5, C.steel, { pos: [sx * 0.7, 1.28, 2.15], seg: 5, outline: false });
  }
  // radiator grille + hood ornament + bumpers
  p.round(0.9, 1.0, 0.16, C.steel, { pos: [0, 1.05, 2.35], r: 0.08 });
  for (let i = -3; i <= 3; i++) p.box(0.04, 0.8, 0.05, C.steelDark, { pos: [i * 0.12, 1.05, 2.45], outline: false });
  p.cone(0.09, 0.3, C.steel, { pos: [0, 1.7, 2.3], rot: [Math.PI / 2, 0, 0], seg: 5, outline: false });
  p.round(2.0, 0.12, 0.14, C.steel, { pos: [0, 0.6, 2.5], r: 0.05 });
  p.round(2.0, 0.12, 0.14, C.steel, { pos: [0, 0.6, -2.5], r: 0.05 });
  p.round(0.5, 0.35, 0.3, 0x3a3350, { pos: [0, 1.0, -2.45], r: 0.08 }); // spare wheel cover on the boot
  p.add(new THREE.TorusGeometry(0.28, 0.1, 5, 12), C.tyre, { pos: [0, 1.0, -2.62], outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.1, thickness: 2.2 }), { name: 'vintage-body' }));
  const plate = plateText(opts.seed ?? 3, '09');
  const pf = plateDecal(ink, plate, { w: 0.8, h: 0.22 }); pf.position.set(0, 0.62, 2.65); body.add(pf);
  const wheels = [];
  for (const sx of [-1, 1]) for (const z of [-1.5, 1.65]) {
    const w = wheelMesh(ink, 0.5, 0.26, { spokes: 8, hubR: 0.5, tyre: 0x41394f }); w.position.set(sx * 0.95, 0.5, z); g.add(w); wheels.push({ mesh: w, r: 0.5 });
  }
  rig(g, { body, wheels, bounce: 0.025, pitch: 0.006, idle: 0.01 });
  return finish(g, { footprint: { w: 2.5, l: 5.4 }, colliders: [{ x: 0, z: 1.5, radius: 1.3, height: 2.4 }, { x: 0, z: -1.5, radius: 1.3, height: 2.4 }] });
}

// ---------------------------------------------------------------------------------------------------
// BSE
// ---------------------------------------------------------------------------------------------------
/** The giant pearl sculpture at Cyber Towers (the city is the "city of pearls"): a big lustrous pearl cradled in eight gold lotus petals on a stepped plinth,
 *  with a small arc of pearls strung round it and a name plate. (Reference: Commons "Hyderabad Pearls famous": white / blush-pink round pearls.) */
export function createBullStatue(ink) {
  return mk(ink, (p, g) => {
    const PEARL = 0xf7f1e8, PINK = 0xf1d9d6, GOLD = 0xe8b84a;
    p.cyl(1.45, 1.6, 0.3, 0xcfc6bb, { pos: [0, 0.15, 0], seg: 12 });
    p.cyl(1.2, 1.35, 0.5, 0xcfc4bb, { pos: [0, 0.55, 0], seg: 12 });
    p.cyl(1.3, 1.3, 0.12, 0xe3dad0, { pos: [0, 0.86, 0], seg: 12 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU;
      p.cone(0.36, 1.25, GOLD, { pos: [Math.sin(a) * 0.95, 1.55, Math.cos(a) * 0.95], rot: [Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5], seg: 5 });
    }
    p.cyl(0.8, 0.65, 0.3, GOLD, { pos: [0, 1.0, 0], seg: 10 });
    p.ball(1.35, PEARL, { pos: [0, 2.7, 0], w: 16, h: 12 });                                   // the pearl
    p.ball(0.35, 0xffffff, { pos: [-0.5, 3.25, 0.7], scale: [1, 0.7, 0.5], w: 7, h: 5, outline: false }); // highlight
    p.ball(0.5, PINK, { pos: [0.55, 2.2, 0.85], scale: [1, 0.6, 0.4], w: 7, h: 5, outline: false });      // blush sheen
    // a string of small pearls swinging round the front of the plinth
    for (let i = 0; i < 9; i++) { const a = -1.1 + i * 0.275; p.ball(0.13, i % 3 === 0 ? PINK : PEARL, { pos: [Math.sin(a) * 1.35, 0.95 - Math.cos(a * 2.0) * 0.12, Math.cos(a) * 1.35], w: 6, h: 5, outline: false }); }
    sign(ink, g, 1.8, 0.5, (ctx, w, h) => { board(ctx, w, h, '#f3ead2', 'rgba(200,170,110,0.5)', 4); hand(ctx, 'ముత్యం · PEARL', w / 2, h * 0.68, { size: h * 0.42, fill: INK, seed: 3, maxW: w * 0.9 }); }, [0, 0.62, 1.62], 0, { ppu: 150 });
  }, { footprint: { w: 4.4, l: 3.2 }, colliders: [{ x: 0, z: 0, radius: 1.6, height: 4.0 }], thickness: 2.2 });
}

/** Cyber Towers "Walk-in interview" board with scrolling Canvas text (replaces the stock ticker). ~4.8 x 0.7 x 3.2 */
export function createStockTicker(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  for (const sx of [-1, 1]) p.cyl(0.1, 0.12, 2.6, C.steelDark, { pos: [sx * 2.2, 1.3, 0], seg: 6 });
  p.round(4.9, 1.3, 0.35, 0x2a2540, { pos: [0, 2.7, 0], r: 0.1 });
  p.round(5.1, 0.12, 0.45, PAL_METRO, { pos: [0, 3.4, 0], r: 0.04 });
  p.box(4.6, 0.12, 0.2, C.steelDark, { pos: [0, 2.0, 0.05], outline: false });
  g.add(meshOf(ink, p, { spacing: 0.07, thickness: 2 }));
  // the strip: two identical halves so the scroll loops
  const P = 2700, W = P * 2, H = 256, VIS = 1152; // two identical periods; the 4.5 x 1 board shows VIS px of them (256 px per unit)
  const c = paintCanvas(W, H, (ctx) => {
    ctx.fillStyle = '#12101f'; ctx.fillRect(0, 0, W, H);
    const items = [['WALK-IN INTERVIEW', '#7ee89a'], ['వాక్-ఇన్ ఇంటర్వ్యూ', '#f6d86a'], ['SAT 10 AM', '#ffffff'], ['FRESHERS WELCOME', '#7ee89a']];
    const size = 62;
    for (let rep = 0; rep < 2; rep++) {
      let x = rep * P + 40;
      for (const [name, col] of items) {
        hand(ctx, name, x, H * 0.62, { size, fill: col, seed: 3, align: 'left', jitter: 0.2 });
        x += name.length * size * (/[\u0C00-\u0C7F]/.test(name) ? 0.6 : 0.62) + size * 1.4;
      }
    }
  });
  const tex = toTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.repeat.x = VIS / W;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 1.0), new THREE.MeshBasicMaterial({ map: tex }));
  face.position.set(0, 2.7, 0.19);
  face.layers.set(OVERLAY_LAYER);
  g.add(face);
  const back = face.clone(); back.rotation.y = Math.PI; back.position.z = -0.19; g.add(back);
  let t = 0;
  g.userData.animate = (dt) => { t += dt; tex.offset.x = ((t * 0.02) % 1) * 0.5; };
  return finish(g, { footprint: { w: 5.2, l: 0.8 }, colliders: [{ x: -2.2, z: 0, radius: 0.2, height: 3.4 }, { x: 2.2, z: 0, radius: 0.2, height: 3.4 }, { x: 0, z: 0, radius: 0.3, height: 3.4 }] });
}

// ---------------------------------------------------------------------------------------------------
// CST
// ---------------------------------------------------------------------------------------------------
/** Food-delivery pick-up point: two scooters with big square insulated bags (unbranded), a stack of spare bags and a phone-mount sign. ~4 x 3 */
export function createTiffinPile(ink) {
  return mk(ink, (p, g) => {
    const scooter = (x, z, ry, body, bag) => {
      const c = Math.cos(ry), s2 = Math.sin(ry);
      const P = (dx, dy, dz) => [x + dx * c + dz * s2, dy, z - dx * s2 + dz * c];
      for (const dz of [-0.7, 0.7]) p.cyl(0.3, 0.3, 0.16, C.tyre, { pos: P(0, 0.3, dz), rot: [0, ry, Math.PI / 2], seg: 10 });
      p.round(0.5, 0.35, 1.5, body, { pos: P(0, 0.62, -0.1), r: 0.08, rot: [0, ry, 0] });          // floorboard + tail body
      p.round(0.42, 0.7, 0.4, body, { pos: P(0, 0.85, 0.62), r: 0.08, rot: [0, ry, 0] });          // front shield
      p.tube(P(0, 1.1, 0.7), P(0, 1.4, 0.7), 0.04, C.steelDark, { seg: 4, outline: false });
      p.box(0.9, 0.06, 0.06, C.steelDark, { pos: P(0, 1.42, 0.7), rot: [0, ry, 0], outline: false }); // handlebar
      p.ball(0.1, 0xfff1b8, { pos: P(0, 1.2, 0.85), w: 6, h: 4, outline: false });                 // headlamp
      p.round(0.5, 0.14, 0.7, 0x2f2b3c, { pos: P(0, 0.95, -0.35), r: 0.05, rot: [0, ry, 0] });    // seat
      // the delivery bag: square insulated box on a rear rack, plus a phone holder on the bars
      p.round(0.8, 0.8, 0.8, bag, { pos: P(0, 1.45, -0.85), r: 0.07, rot: [0, ry, 0] });
      p.box(0.82, 0.08, 0.82, 0xfaf6ea, { pos: P(0, 1.4, -0.85), rot: [0, ry, 0], outline: false });
      p.box(0.5, 0.2, 0.04, 0xfaf6ea, { pos: P(0, 1.55, -0.43), rot: [0, ry, 0], outline: false });
      p.box(0.16, 0.26, 0.04, 0x2f2b3c, { pos: P(0.3, 1.55, 0.7), rot: [0, ry, 0], outline: false });
    };
    scooter(-1.0, -0.4, 0.15, 0xf2b33f, 0xf4893a);
    scooter(1.2, -0.5, -0.2, 0x7ac28b, 0xe8456b);
    // spare insulated bags stacked + a mesh shelf with order tags
    for (let i = 0; i < 3; i++) p.round(0.7, 0.65, 0.7, [0xf4893a, 0xe8456b, 0x4ea6d8][i], { pos: [-1.9 + (i % 2) * 0.1, 0.34 + i * 0.66, 1.1], r: 0.06, rot: [0, i * 0.2, 0] });
    for (const sx of [-1, 1]) p.box(0.08, 1.9, 0.08, C.woodDark, { pos: [sx * 1.8 + 0.3, 0.95, -1.2] });
    p.box(3.6, 0.08, 0.1, C.woodDark, { pos: [0.3, 1.9, -1.2] });
    for (let i = 0; i < 7; i++) p.box(0.3, 0.45, 0.04, [C.bestRed, C.marigoldY, C.sky, C.leaf][i % 4], { pos: [-1.3 + i * 0.5, 1.65, -1.15], outline: false });
    sign(ink, g, 1.8, 0.6, (ctx, w, h) => { board(ctx, w, h, '#fffbe6', 'rgba(240,200,90,0.45)', 4); hand(ctx, 'డెలివరీ · PICK-UP', w / 2, h * 0.7, { size: h * 0.46, fill: '#1f6f8b', seed: 5, maxW: w * 0.9 }); }, [0.3, 2.35, -1.2], 0, { ppu: 120 });
  }, { footprint: { w: 4.2, l: 3.4 }, colliders: [{ x: 0, z: 0.3, radius: 1.8, height: 1.2 }, { x: 0, z: -1.0, radius: 1.8, height: 2 }], thickness: 1.8 });
}

/** Porter's hand trolley with trunks, bags and a bedroll; wheels at the back, handle forward. ~2 x 3 */
export function createLuggageTrolley(ink) {
  return mk(ink, (p, g) => {
    p.box(1.6, 0.12, 2.6, C.woodDark, { pos: [0, 0.72, 0] });
    for (const sx of [-1, 1]) { p.cyl(0.46, 0.46, 0.12, C.tyre, { pos: [sx * 0.9, 0.46, -0.3], rot: [0, 0, Math.PI / 2], seg: 12 }); p.cyl(0.14, 0.14, 0.16, C.steel, { pos: [sx * 0.9, 0.46, -0.3], rot: [0, 0, Math.PI / 2], seg: 6, outline: false }); }
    p.cyl(0.05, 0.05, 1.9, C.steelDark, { pos: [0, 0.46, -0.3], rot: [0, 0, Math.PI / 2], seg: 5, outline: false });
    p.tube([-0.65, 0.78, 1.0], [-0.55, 1.5, 2.4], 0.05, C.steelDark, { seg: 5 }); p.tube([0.65, 0.78, 1.0], [0.55, 1.5, 2.4], 0.05, C.steelDark, { seg: 5 });
    p.box(1.4, 0.07, 0.07, C.steelDark, { pos: [0, 1.5, 2.4] });
    p.cyl(0.04, 0.04, 0.3, C.steelDark, { pos: [0, 0.6, 1.9], seg: 4, outline: false });
    // luggage: steel trunk, suitcase, duffel, bedroll with a rope
    p.round(1.0, 0.7, 0.7, 0x7d98b8, { pos: [-0.35, 1.13, -0.55], r: 0.07 });
    p.box(1.02, 0.06, 0.06, C.steelDark, { pos: [-0.35, 1.13, -0.2], outline: false });
    p.round(0.9, 0.55, 0.4, C.bestRed, { pos: [0.35, 1.0, 0.2], r: 0.08, rot: [0, 0.2, 0] });
    p.cyl(0.26, 0.26, 0.9, 0x7fa07a, { pos: [0.3, 1.35, -0.75], rot: [0, 0, Math.PI / 2], seg: 8 });
    p.cyl(0.22, 0.22, 0.8, C.terracotta, { pos: [-0.2, 1.7, -0.55], rot: [0, 0, Math.PI / 2], seg: 8 });
    p.add(new THREE.TorusGeometry(0.26, 0.025, 4, 10), C.woodDark, { pos: [0.3, 1.35, -0.75], rot: [0, Math.PI / 2, 0], outline: false });
    p.tube([-0.8, 1.0, -0.3], [0.8, 1.7, -0.7], 0.02, C.woodDark, { seg: 3, outline: false });
    // brass licence badge
    p.cyl(0.08, 0.08, 0.02, C.brass, { pos: [-0.8, 0.9, 1.3], rot: [0, 0, Math.PI / 2], seg: 8, outline: false });
  }, { footprint: { w: 2.2, l: 3.2 }, colliders: [{ x: 0, z: -0.2, radius: 1.0, height: 2 }, { x: 0, z: 1.0, radius: 0.7, height: 1 }], thickness: 1.8 });
}

// ---------------------------------------------------------------------------------------------------
// Rajabai / Flora Fountain, Marine Drive
// ---------------------------------------------------------------------------------------------------
/** Pavement book seller's stall: tarpaulin awning, tables with stacked books, hanging magazines. ~5 x 3 x 3.6 */
export function createBookStall(ink) {
  return mk(ink, (p, g) => {
    const bc = [C.bestRed, C.sky, C.marigoldY, C.leaf, C.pink, C.lilac, C.teal, C.orange];
    const r = mulberry32(31);
    for (const [x, z] of [[-2.3, -1.2], [2.3, -1.2], [-2.3, 1.2], [2.3, 1.2]]) p.cyl(0.05, 0.06, 3.2, C.woodDark, { pos: [x, 1.6, z], seg: 5 });
    p.add(new THREE.BoxGeometry(5.2, 0.07, 3.1), 0x5a8fc4, { pos: [0, 3.35, 0], rot: [0.12, 0, 0] });
    p.add(new THREE.BoxGeometry(2.4, 0.06, 3.0), C.cream, { pos: [-1.3, 3.4, 0], rot: [0.12, 0, 0], outline: false });
    // front table of book stacks
    p.box(4.4, 0.8, 1.2, C.woodLight, { pos: [0, 0.4, 0.5] });
    p.box(4.5, 0.08, 1.3, C.wood, { pos: [0, 0.84, 0.5] });
    for (let i = 0; i < 9; i++) { const h = 0.18 + r() * 0.3; p.box(0.38, h, 0.55, bc[Math.floor(r() * 8)], { pos: [-1.95 + i * 0.49, 0.88 + h / 2, 0.25], rot: [0, (r() - 0.5) * 0.3, 0], outline: false }); }
    for (let i = 0; i < 9; i++) { const h = 0.2 + r() * 0.2; p.box(0.45, h, 0.4, bc[Math.floor(r() * 8)], { pos: [-1.9 + i * 0.49, 0.88 + h / 2, 0.85], rot: [0, 0, (r() - 0.5) * 0.4], outline: false }); }
    // back shelf with spines
    p.box(4.2, 0.08, 0.5, C.woodDark, { pos: [0, 1.6, -1.35] });
    p.box(4.2, 0.08, 0.5, C.woodDark, { pos: [0, 2.3, -1.35] });
    for (const y of [1.64, 2.34]) for (let i = 0; i < 18; i++) p.box(0.17, 0.4 + r() * 0.2, 0.35, bc[Math.floor(r() * 8)], { pos: [-1.95 + i * 0.23, y + 0.3, -1.35], outline: false });
    // magazine line
    p.tube([-2.2, 3.1, 1.4], [2.2, 3.0, 1.4], 0.015, INKC, { seg: 3, outline: false });
    for (let i = 0; i < 9; i++) p.box(0.34, 0.5, 0.03, bc[(i * 3) % 8], { pos: [-2.0 + i * 0.5, 2.78, 1.4], rot: [0, 0, (r() - 0.5) * 0.2], outline: false });
    p.cyl(0.25, 0.25, 0.5, C.bestRed, { pos: [2.0, 0.25, 1.9], seg: 7 }); // stool
    sign(ink, g, 2.6, 0.7, (ctx, w, h) => { board(ctx, w, h, '#fff8de', 'rgba(230,190,110,0.5)', 6); handRow(ctx, [{ text: 'పుస్తకాలు', size: h * 0.46, fill: '#d9453b' }, { text: 'BOOKS', size: h * 0.46, fill: INK }, { text: '₹50', size: h * 0.4, fill: '#2f7a46' }], w / 2, h * 0.7); }, [0, 3.0, 1.55], 0, { ppu: 130 });
  }, { footprint: { w: 5.4, l: 4.2 }, colliders: [{ x: 0, z: 0.5, radius: 2.3, height: 1.2 }, { x: 0, z: -1.2, radius: 2.3, height: 2.6 }], thickness: 1.8 });
}

/** Lake-promenade bench: stone ends, curved back, 3 wooden slats. ~3 x 1 x 1.3 */
export function createMarineBench(ink, opts = {}) {
  return mk(ink, (p) => {
    const col = opts.color ?? 0xb98c64;
    p.round(3.0, 0.16, 0.9, 0xe9e1d0, { pos: [0, 0.62, 0], r: 0.04 });
    for (let i = 0; i < 3; i++) p.box(2.9, 0.08, 0.26, [col, 0xc9a070, col][i], { pos: [0, 0.74, -0.28 + i * 0.28], outline: false });
    for (const sx of [-1, 1]) { p.round(0.3, 0.62, 0.9, 0xd9d0bd, { pos: [sx * 1.35, 0.31, 0], r: 0.06 }); p.round(0.3, 1.0, 0.1, 0xd9d0bd, { pos: [sx * 1.35, 0.7, -0.4], r: 0.04 }); }
    p.box(2.9, 0.1, 0.12, 0xe9e1d0, { pos: [0, 1.42, -0.42] });
    p.box(2.9, 0.55, 0.06, col, { pos: [0, 1.1, -0.42], outline: false });
  }, { footprint: { w: 3.2, l: 1.2 }, colliders: [{ x: -0.9, z: 0, radius: 0.6, height: 1 }, { x: 0.9, z: 0, radius: 0.6, height: 1 }], spacing: 0.06, thickness: 1.8 });
}

// ---------------------------------------------------------------------------------------------------
// Sea Link toll plaza
// ---------------------------------------------------------------------------------------------------
/** Toll plaza: island + booth + canopy over two lanes (7.4 wide) + animated boom barriers + toll board. ~7.4 x 4 x 5.4 */
export function createTollBooth(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  p.round(1.6, 0.3, 4.4, C.concrete ?? 0xd9d4ca, { pos: [0, 0.15, 0], r: 0.1 });
  p.box(1.7, 0.08, 4.5, C.bestRed, { pos: [0, 0.3, 0], outline: false });
  p.round(1.2, 2.3, 2.2, C.cream, { pos: [0, 1.45, -0.6], r: 0.1 });
  for (const sx of [-1, 1]) p.box(0.04, 1.0, 1.7, C.glass, { pos: [sx * 0.62, 1.8, -0.6], outline: false });
  p.box(1.0, 0.9, 0.04, C.glass, { pos: [0, 1.8, 0.52], outline: false });
  p.round(1.0, 0.1, 0.5, C.steel, { pos: [0, 1.35, 0.8], r: 0.03 });
  // canopy over both lanes
  p.round(7.2, 0.35, 3.2, C.sky, { pos: [0, 4.0, 0], r: 0.1 });
  p.box(7.3, 0.2, 3.3, C.bestRed, { pos: [0, 3.78, 0], outline: false });
  for (const sx of [-1, 1]) for (const sz of [-1.2, 1.2]) p.cyl(0.14, 0.16, 3.6, C.steelDark, { pos: [sx * 3.3, 1.8, sz], seg: 6 });
  p.cyl(0.14, 0.16, 2.8, C.steelDark, { pos: [0, 1.4, 1.4], seg: 6 });
  // lane lamp heads (red x / green arrow) as flat discs
  for (const sx of [-1, 1]) { p.cyl(0.26, 0.26, 0.08, 0x3fae67, { pos: [sx * 1.9, 3.6, 1.62], rot: [Math.PI / 2, 0, 0], seg: 10, outline: false }); }
  p.add(new THREE.TorusGeometry(0.22, 0.035, 4, 12), 0xf2f2f2, { pos: [1.9, 3.6, 1.66], outline: false });
  g.add(meshOf(ink, p, { spacing: 0.08, thickness: 2 }));
  sign(ink, g, 3.4, 0.8, (ctx, w, h) => {
    ctx.fillStyle = '#1f5f8b'; ctx.fillRect(0, 0, w, h);
    boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#2a77a8', hatch: 'rgba(15,60,100,0.55)', cw: w, ch: h, r: rng(4), lw: 4, round: 12 });
    hand(ctx, 'CABLE BRIDGE', w * 0.5, h * 0.4, { size: h * 0.32, fill: '#fffbe0', seed: 3, maxW: w * 0.92 });
    handRow(ctx, [{ text: 'వేగ పరిమితి', size: h * 0.3, fill: '#ffd778' }, { text: 'LIMIT 40', size: h * 0.3, fill: '#fffbe0' }], w / 2, h * 0.8);
  }, [0, 4.75, 1.62], 0, { ppu: 130, frame: 0x2a77a8 });
  // booms
  const arms = [];
  for (const sx of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(sx * 0.95, 1.1, 1.3);
    const ap = new Mix();
    for (let i = 0; i < 6; i++) ap.box(0.55, 0.12, 0.12, i % 2 ? C.bestRed : C.white, { pos: [sx * (0.35 + i * 0.55), 0, 0], outline: i === 0 });
    ap.round(0.4, 0.5, 0.4, C.steelDark, { pos: [0, -0.1, 0], r: 0.08 });
    arm.add(meshOf(ink, ap, { spacing: 0.05, thickness: 1.6 }));
    arm.userData.sx = sx;
    g.add(arm); arms.push(arm);
  }
  let t = 0;
  g.userData.animate = (dt) => { t += dt; arms.forEach((a, i) => { const open = ((t + i * 5) % 12) > 9 ? 1.15 : 0.0; a.rotation.z += (open * a.userData.sx - a.rotation.z) * (1 - Math.exp(-2.5 * dt)); }); };
  return finish(g, { footprint: { w: 7.6, l: 4.6 }, colliders: [{ x: 0, z: 0, radius: 1.3, height: 3 }, { x: -3.3, z: 1.2, radius: 0.2, height: 4 }, { x: 3.3, z: 1.2, radius: 0.2, height: 4 }, { x: -3.3, z: -1.2, radius: 0.2, height: 4 }, { x: 3.3, z: -1.2, radius: 0.2, height: 4 }] });
}

// ---------------------------------------------------------------------------------------------------
// Haji Ali
// ---------------------------------------------------------------------------------------------------
/** Flower + boat-ticket stall on the causeway: lotus buds, marigold / jasmine baskets, a ticket window card, incense. ~4 x 2.4 x 3.2 */
export function createChadarStall(ink) {
  return mk(ink, (p, g) => {
    const r = mulberry32(44);
    p.box(3.8, 0.9, 1.2, C.woodLight, { pos: [0, 0.45, 0.3] });
    p.box(3.9, 0.08, 1.3, C.wood, { pos: [0, 0.94, 0.3] });
    for (const sx of [-1, 1]) p.cyl(0.06, 0.07, 3.2, C.woodDark, { pos: [sx * 1.9, 1.6, -0.4], seg: 5 });
    p.add(new THREE.BoxGeometry(4.1, 0.06, 1.8), 0x2f7fb0, { pos: [0, 3.1, 0.2], rot: [0.2, 0, 0] });
    // pooja coconuts stacked in a pyramid, banana hands, camphor and flower baskets
    const nut = (x, y, z, c = 0x9a6d3a) => p.ball(0.2, c, { pos: [x, y, z], scale: [1, 1.05, 1], w: 7, h: 5, outline: y < 1.3 });
    for (let row = 0; row < 4; row++) for (let i = 0; i < 4 - row; i++) nut(-1.5 + (i + row * 0.5) * 0.42, 1.2 + row * 0.34, 0.2, (i + row) % 3 === 0 ? 0xfaf6ea : 0xf2a9c2);
    for (let i = 0; i < 3; i++) for (let k = 0; k < 5; k++) p.curve([[0, 0, 0], [0.05, 0.14, 0.15], [0.05, 0.24, 0.38]], 0.06, 0.035, 0xf7de58, { radial: 5, steps: 3, pos: [-0.35 + k * 0.1, 1.0 + i * 0.0, 0.1 + i * 0.35], rot: [0, 1.6, 0], outline: false });
    // baskets of jasmine, marigold and hibiscus
    for (const [x, c] of [[0.9, 0xfaf6ea], [1.5, C.marigold], [1.2, 0xe8456b]]) {
      p.lathe([[0.001, 0], [0.38, 0], [0.46, 0.22], [0.4, 0.26]], C.woodLight, { pos: [x, 0.98, 0.5 + (x > 1.3 ? -0.2 : 0)], seg: 9 });
      for (let k = 0; k < 7; k++) p.ball(0.12, c, { pos: [x + (r() - 0.5) * 0.5, 1.28 + r() * 0.12, 0.5 + (x > 1.3 ? -0.2 : 0) + (r() - 0.5) * 0.5], w: 5, h: 4, outline: false });
    }
    // incense sticks in a pot, hanging garlands
    p.cyl(0.14, 0.18, 0.2, C.terracotta, { pos: [0.5, 1.06, 0.1], seg: 8 });
    for (let k = 0; k < 6; k++) p.tube([0.5, 1.15, 0.1], [0.5 + (k - 2.5) * 0.06, 1.7, 0.1 + (r() - 0.5) * 0.12], 0.012, 0x6a4a3a, { seg: 3, outline: false });
    for (const sx of [-1, 1]) for (let i = 0; i < 8; i++) p.ball(0.1, i % 2 ? C.marigold : 0xe8456b, { pos: [sx * 1.7, 2.9 - i * 0.2, 1.0], w: 5, h: 4, outline: false });
    // star-patterned green backdrop
    p.box(3.6, 1.9, 0.06, 0x9c3d4a, { pos: [0, 1.9, -0.7] });
    sign(ink, g, 1.2, 0.6, (ctx, w, h) => { board(ctx, w, h, '#fff1d6', 'rgba(230,160,80,0.45)', 3); hand(ctx, 'పూలు · బోట్ టికెట్లు', w / 2, h * 0.5, { size: h * 0.3, fill: '#9c3d4a', seed: 3, maxW: w * 0.9 }); hand(ctx, 'FLOWERS · COCONUT', w / 2, h * 0.84, { size: h * 0.2, fill: INK, seed: 7, maxW: w * 0.9 }); }, [0, 3.45, 0.55], 0, { ppu: 140 });
    // gold stars painted as small discs on the backdrop
    for (let i = 0; i < 12; i++) p.cyl(0.14, 0.14, 0.02, 0xf2d675, { pos: [-1.5 + (i % 6) * 0.6, 2.4 - Math.floor(i / 6) * 0.9, -0.66], rot: [Math.PI / 2, 0, 0], seg: 6, outline: false });
  }, { footprint: { w: 4.2, l: 2.4 }, colliders: [{ x: 0, z: 0.2, radius: 1.9, height: 1.2 }], thickness: 1.8 });
}

/** Haleem / lassi stall (reference: Commons "Hyderabadi haleem"): shop front with a huge copper degchi of haleem on its stove with a wooden masher, paper bowls, tall steel lassi glasses and a curd matka, striped awning. ~5.4 x 4.2 x 4.4 */
export function createHajiAliJuice(ink) {
  return mk(ink, (p, g, anim) => {
    const r = mulberry32(21);
    p.round(5.2, 3.6, 3.2, 0xf5efe0, { pos: [0, 1.85, -0.4], r: 0.1 });
    p.box(5.4, 0.18, 3.4, C.maroon, { pos: [0, 0.1, -0.4] });
    p.round(5.5, 0.25, 3.5, C.cream, { pos: [0, 3.75, -0.4], r: 0.06 });
    // counter + glass case
    p.round(4.6, 1.1, 1.0, 0x2f9d9d, { pos: [0, 0.65, 1.0], r: 0.06 });
    p.round(4.8, 0.1, 1.2, C.woodLight, { pos: [0, 1.25, 1.0], r: 0.03 });
    p.box(4.4, 0.8, 0.05, 0xd6eef5, { pos: [0, 1.7, 1.55], outline: false });
    // fruit pyramids: oranges, apples, pomegranates, melon
    const pyramid = (x, c, n, rad) => { let k = 0; for (let row = 0; row < n; row++) for (let i = 0; i < n - row; i++) { p.ball(rad, c, { pos: [x + (i - (n - row - 1) / 2) * rad * 2 * 0.95, 1.33 + rad + row * rad * 1.6, 1.0 + (r() - 0.5) * 0.05], w: 7, h: 5, outline: row === 0 }); k++; } };
    void pyramid;
    // the haleem degchi: a huge copper pot with a lid ajar on a clay stove, a long wooden masher (mathani), and a sizzling-hot sheen of fried onion on top
    p.cyl(0.8, 0.9, 0.5, C.terracotta, { pos: [-1.2, 1.5, 0.95], seg: 10 });
    p.box(0.4, 0.22, 0.05, 0xf4a05a, { pos: [-1.2, 1.4, 1.84], outline: false });
    p.lathe([[0.001, 0], [0.55, 0.02], [0.92, 0.4], [1.0, 0.8], [0.84, 1.18], [0.64, 1.3], [0.7, 1.4], [0.001, 1.42]], 0xb8703c, { pos: [-1.2, 1.78, 0.95], seg: 14 });
    p.cyl(0.62, 0.62, 0.03, 0xc9a05a, { pos: [-1.2, 3.18, 0.95], seg: 12, outline: false }); // haleem surface
    p.cyl(0.22, 0.22, 0.04, 0x8a4a1e, { pos: [-1.0, 3.2, 0.95], seg: 8, outline: false });   // fried onions
    p.ball(0.07, 0xf2e6c0, { pos: [-1.35, 3.24, 1.1], w: 5, h: 4, outline: false });
    p.tube([-0.6, 3.1, 0.7], [0.4, 4.4, 0.1], 0.07, C.woodDark, { seg: 5 }); // masher handle
    p.lathe([[0.001, 0], [0.12, 0.02], [0.22, 0.14], [0.001, 0.2]], C.woodDark, { pos: [-0.62, 3.0, 0.7], seg: 7 });
    for (const sx of [-1, 1]) p.add(new THREE.TorusGeometry(0.12, 0.035, 4, 8), 0x8a5326, { pos: [-1.2 + sx * 1.0, 2.5, 0.95], rot: [0, Math.PI / 2, 0] }); // pot handles
    // stacked paper bowls + a lime plate
    for (let i = 0; i < 5; i++) p.cyl(0.2, 0.14, 0.1, C.white, { pos: [0.5, 1.37 + i * 0.1, 1.2], seg: 9 });
    p.cyl(0.22, 0.22, 0.04, C.white, { pos: [0.95, 1.31, 1.0], seg: 9 }); p.ball(0.1, 0xc8d96a, { pos: [0.95, 1.38, 1.0], w: 5, h: 4, outline: false });
    // a curd matka with a cloth lid and tall steel lassi glasses with froth
    p.lathe([[0.001, 0], [0.22, 0.02], [0.4, 0.3], [0.42, 0.55], [0.3, 0.75], [0.001, 0.85]], C.terracotta, { pos: [1.55, 1.3, 1.05], seg: 9 });
    p.cyl(0.26, 0.26, 0.04, 0xfaf6ea, { pos: [1.55, 2.16, 1.05], seg: 9, outline: false });
    [0, 1, 2, 3].forEach((i) => { p.cyl(0.13, 0.1, 0.44, C.steel, { pos: [1.0 + i * 0.3, 1.5, 1.5], seg: 8, outline: i === 0 }); p.cyl(0.115, 0.115, 0.05, 0xfffaf0, { pos: [1.0 + i * 0.3, 1.74, 1.5], seg: 8, outline: false }); });
    p.cyl(0.2, 0.2, 0.35, C.glass, { pos: [-2.1, 1.5, 1.5], seg: 8 }); // water jug
    // striped awning
    for (let i = 0; i < 12; i++) p.add(new THREE.BoxGeometry(0.46, 0.07, 1.7), i % 2 ? C.cream : 0xe9625a, { pos: [-2.5 + (i + 0.5) * 0.4167, 3.1, 1.9], rot: [0.5, 0, 0] });
    // hanging lime-and-chilli strings
    for (const sx of [-2.4, 2.4]) for (let i = 0; i < 5; i++) p.ball(0.15, i % 2 ? 0xc8d96a : 0xd9503f, { pos: [sx, 3.0 - i * 0.24, 1.7], w: 6, h: 5, outline: false });
    // back wall shelves
    for (const y of [2.0, 2.8]) p.box(4.2, 0.07, 0.3, C.woodDark, { pos: [0, y, -1.8] });
    for (const y of [2.0, 2.8]) for (let i = 0; i < 9; i++) p.cyl(0.12, 0.12, 0.4, [0xf59a2a, 0xe0453f, 0x9ed56a, 0xf2d675][i % 4], { pos: [-1.9 + i * 0.47, y + 0.24, -1.8], seg: 7, outline: false });
    sign(ink, g, 5.0, 1.0, (ctx, w, h) => {
      ctx.fillStyle = '#7a2f2f'; ctx.fillRect(0, 0, w, h);
      boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#9c3d4a', hatch: 'rgba(70,10,20,0.55)', cw: w, ch: h, r: rng(8), lw: 5, round: 14 });
      hand(ctx, 'HALEEM · LASSI', w * 0.5, h * 0.6, { size: h * 0.45, fill: '#fff4d2', stroke: '#4a1a1a', sw: 5, seed: 6, maxW: w * 0.94 });
      hand(ctx, 'హలీమ్ · లస్సీ', w * 0.5, h * 0.9, { size: h * 0.22, fill: '#ffd778', seed: 4, maxW: w * 0.9 });
    }, [0, 3.35 + 0.65, 1.3], 0, { ppu: 130, frame: 0x9c3d4a });
    // little pennants
    for (let i = 0; i < 6; i++) p.add(new THREE.ConeGeometry(0.12, 0.3, 3), [C.marigold, C.pink, C.sky][i % 3], { pos: [-2.4 + i * 0.96, 4.1, 1.35], rot: [0, 0, Math.PI], outline: false });
    // bamboo stool outside
    p.cyl(0.28, 0.25, 0.5, C.woodLight, { pos: [2.0, 0.25, 2.8], seg: 7 });
    const s = steam({ count: 2, height: 0.6, size: 0.35, drift: 0.1 });
    s.position.set(1.7, 2.0, 1.45);
    g.add(s);
    anim.push((dt, t) => s.userData.update(t));
  }, { footprint: { w: 5.8, l: 4.6 }, colliders: [{ x: 0, z: -0.5, radius: 2.7, height: 4 }, { x: 0, z: 1.0, radius: 2.3, height: 1.3 }], thickness: 2 });
}

/** Laad Bazaar bangle stall (reference: Commons "Bangles from Hyderabad (Laad Bazaar)"): a glittering stall with stacked glass and lac bangles in every colour on pegs and shelves,
 *  a striped canopy, string lights and a Telugu + English sign. ~3.6 x 2.4 x 3.2 */
export function createBangleStall(ink) {
  return mk(ink, (p, g) => {
    const cols = [0xe8456b, 0x2fb3a8, 0xf6c62d, 0x8b5bd0, 0x4ea6d8, 0xf08a4b, 0x7ac28b, 0xfaf6ea];
    const r = mulberry32(52);
    p.box(3.4, 0.9, 1.1, 0x9c3d4a, { pos: [0, 0.45, 0.3] });
    p.box(3.5, 0.08, 1.2, C.woodLight, { pos: [0, 0.94, 0.3] });
    for (const sx of [-1, 1]) p.cyl(0.06, 0.07, 3.2, C.woodDark, { pos: [sx * 1.7, 1.6, -0.4], seg: 5 });
    p.box(3.3, 2.0, 0.1, 0x7a2f3a, { pos: [0, 1.95, -0.6] });
    for (let i = 0; i < 9; i++) p.add(new THREE.BoxGeometry(0.4, 0.06, 1.8), i % 2 ? C.cream : 0x9c3d4a, { pos: [-1.6 + (i + 0.5) * 0.37, 3.15, 0.1], rot: [0.2, 0, 0] });
    // stacks of bangles: short coloured cylinders (a stack = a tower of rings), on the counter and on two shelf rows
    const stack = (x, y, z, c, h = 0.4) => { p.cyl(0.2, 0.2, h, c, { pos: [x, y + h / 2, z], seg: 8, outline: false }); p.cyl(0.21, 0.21, 0.04, 0xf2d675, { pos: [x, y + h * 0.7, z], seg: 8, outline: false }); };
    for (let i = 0; i < 8; i++) stack(-1.4 + i * 0.4, 0.98, 0.55, cols[i % 8], 0.35 + r() * 0.15);
    for (let i = 0; i < 8; i++) stack(-1.4 + i * 0.4, 0.98, 0.1, cols[(i + 3) % 8], 0.3 + r() * 0.15);
    for (const y of [1.55, 2.2]) { p.box(3.1, 0.06, 0.4, C.woodDark, { pos: [0, y, -0.4] }); for (let i = 0; i < 9; i++) stack(-1.4 + i * 0.35, y + 0.03, -0.4, cols[(i * 3 + (y > 2 ? 1 : 0)) % 8], 0.45 + r() * 0.1); }
    for (let i = 0; i < 12; i++) p.ball(0.07, 0xfff1b8, { pos: [-1.6 + i * 0.29, 2.95 - Math.sin((i / 11) * Math.PI) * 0.12, 1.0], w: 4, h: 3, outline: false });
    sign(ink, g, 2.0, 0.6, (ctx, w, h) => { board(ctx, w, h, '#fff1d6', 'rgba(230,160,80,0.45)', 3); hand(ctx, 'గాజులు', w * 0.3, h * 0.66, { size: h * 0.5, fill: '#9c3d4a', seed: 3 }); hand(ctx, 'BANGLES', w * 0.7, h * 0.64, { size: h * 0.34, fill: INK, seed: 5 }); }, [0, 2.85, 1.05], 0, { ppu: 140 });
  }, { footprint: { w: 3.8, l: 2.4 }, colliders: [{ x: 0, z: 0.3, radius: 1.7, height: 1.2 }], thickness: 1.8 });
}
