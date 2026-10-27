/**
 * kerala/props/siteDetails.js: small contextual props that belong to the big sites (part 1: Chinese nets, Mattancherry, Aspinwall,
 * Ernakulam Jn, St Francis, Marine Drive, Goshree, Bolgatty). Part 2 (Cherai, houses, temple, metro, extras) is in siteDetails2.js.
 * Export names are kept from the Mumbai skeleton: ElephantaBooth = water-metro ticket booth, Ferry = water-metro boat,
 * BullStatue = giant Kathakali mask, StockTicker = Infopark "Now hiring" board, TiffinPile = delivery scooters,
 * ChadarStall = candle and flower stall, HajiAliJuice = kulukki sarbath stall.
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
/** Water-metro ticket booth (teal and white) with a queue rope. ~4 x 3 x 4.2 */
export function createElephantaBooth(ink) {
  return mk(ink, (p, g) => {
    p.round(3.0, 2.4, 2.0, C.teal, { pos: [0, 1.3, 0], r: 0.1 });
    p.box(3.2, 0.2, 0.2, C.cream, { pos: [0, 0.18, 1.0] });
    p.round(1.6, 0.9, 0.12, C.glass, { pos: [0, 1.7, 1.02], r: 0.05, outline: false });
    p.box(1.8, 0.1, 0.5, C.woodLight, { pos: [0, 1.2, 1.25] });
    for (let i = 0; i < 8; i++) p.add(new THREE.BoxGeometry(0.42, 0.07, 1.4), i % 2 ? C.cream : 0x2fa7a0, { pos: [-1.5 + (i + 0.5) * 0.4 + 0.0, 2.8, 1.35], rot: [0.5, 0, 0] });
    p.round(3.3, 0.18, 2.3, 0x2f6fb0, { pos: [0, 2.62, 0.05], r: 0.05 });
    for (const sx of [-1, 1]) { p.cyl(0.06, 0.06, 1.0, C.steelDark, { pos: [sx * 2.4, 0.5, 3.0], seg: 6 }); p.ball(0.12, C.brass, { pos: [sx * 2.4, 1.05, 3.0], w: 6, h: 4 }); }
    p.tube([-2.4, 0.95, 3.0], [0, 0.65, 3.4], 0.025, C.bestRed, { seg: 4, outline: false }); p.tube([0, 0.65, 3.4], [2.4, 0.95, 3.0], 0.025, C.bestRed, { seg: 4, outline: false });
    p.round(0.8, 0.9, 0.6, C.sky, { pos: [-2.1, 0.5, 0.2], r: 0.08 }); // water can
    sign(ink, g, 3.0, 0.9, (ctx, w, h) => {
      board(ctx, w, h, '#fff7d6', 'rgba(230,180,80,0.45)', 5);
      hand(ctx, 'WATER METRO TICKETS', w * 0.5, h * 0.5, { size: h * 0.36, fill: '#1f6f8b', seed: 3, maxW: w * 0.9 });
      handRow(ctx, [{ text: 'വാട്ടർ മെട്രോ · ടിക്കറ്റ്', size: h * 0.22, fill: INK }], w / 2, h * 0.86);
    }, [0, 3.45, 0.2], 0);
    sign(ink, g, 1.5, 1.0, (ctx, w, h) => {
      board(ctx, w, h, '#e8f5fb', 'rgba(110,170,210,0.45)', 6);
      hand(ctx, 'FORT KOCHI ₹20', w / 2, h * 0.38, { size: h * 0.18, fill: INK, seed: 2 });
      hand(ctx, 'HIGH COURT ₹20', w / 2, h * 0.62, { size: h * 0.18, fill: INK, seed: 4 });
      hand(ctx, 'every 20 minutes', w / 2, h * 0.86, { size: h * 0.14, fill: '#6a7b88', seed: 8, weight: 'normal' });
    }, [-2.1, 1.7, 1.06], 0);
  }, { footprint: { w: 5.4, l: 6 }, colliders: [{ x: 0, z: 0, radius: 1.6, height: 3 }], thickness: 2 });
}

/** Water-metro boat (replaces the ferry): a blue-and-white catamaran, ~10.8 long: two white-and-blue hulls, a white saloon with a
 *  blue roof band, a blue wheelhouse forward with big dark windows, railings, orange lifebuoys, black fenders; bobs.
 *  Photo: Wikimedia Commons "Kochi water metro boat at high court" (blue cab, white superstructure, purple/blue hull, railings). */
export function createFerry(ink, opts = {}) {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const p = new Mix();
  const BLUE = 0x2f6fb0, DEEP = 0x2a4f8a, WHITE = 0xf6f8fa;
  for (const sx of [-1, 1]) { // twin hulls
    p.side([[-5.0, 1.6], [-4.7, 0.25], [3.8, 0.25], [5.2, 1.5], [5.4, 2.0], [-5.0, 2.0]], 0.95, DEEP, { bevel: 0.06, round: 0.3, pos: [sx * 1.15, 0, 0] });
    p.side([[-4.95, 1.25], [-4.7, 0.85], [3.9, 0.85], [5.0, 1.45], [5.3, 1.95], [-4.95, 1.95]], 1.0, WHITE, { bevel: 0.04, round: 0.1, pos: [sx * 1.15, 0, 0] });
  }
  p.round(3.5, 0.16, 10.2, 0xdfe5ea, { pos: [0, 2.06, -0.1], r: 0.05 });                // deck
  p.round(3.0, 1.5, 5.4, WHITE, { pos: [0, 2.9, -1.8], r: 0.12 });                          // passenger saloon
  p.round(3.1, 0.14, 5.5, BLUE, { pos: [0, 3.72, -1.8], r: 0.05 });                         // roof band
  for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) p.box(0.05, 0.6, 0.62, 0x2b3a4a, { pos: [sx * 1.52, 3.0, -4.0 + i * 0.85], outline: false });  // windows
  p.round(2.4, 1.2, 1.7, BLUE, { pos: [0, 4.35, 1.9], r: 0.12 });                          // wheelhouse
  p.box(2.0, 0.55, 0.06, 0x1f2a36, { pos: [0, 4.45, 2.77], outline: false });
  for (const sx of [-1, 1]) p.box(0.05, 0.55, 1.1, 0x1f2a36, { pos: [sx * 1.22, 4.45, 1.9], outline: false });
  p.round(2.5, 0.12, 1.8, 0xe9edf1, { pos: [0, 5.0, 1.9], r: 0.04 });
  p.cyl(0.04, 0.05, 1.0, C.steelDark, { pos: [0.6, 5.5, 1.6], seg: 5 });
  p.ball(0.08, 0xe0453f, { pos: [0.6, 6.05, 1.6], w: 5, h: 4, outline: false });
  // railings along both sides and round the bow
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 9; i++) p.cyl(0.03, 0.03, 0.9, 0xeef0f2, { pos: [sx * 1.72, 2.6, -4.5 + i * 1.1], seg: 5, outline: false });
    p.tube([sx * 1.72, 3.05, -4.6], [sx * 1.72, 3.05, 4.6], 0.03, 0xeef0f2, { seg: 5, outline: false });
  }
  p.tube([-1.72, 3.05, 4.6], [0, 3.05, 5.2], 0.03, 0xeef0f2, { seg: 5, outline: false }); p.tube([1.72, 3.05, 4.6], [0, 3.05, 5.2], 0.03, 0xeef0f2, { seg: 5, outline: false });
  for (const [x, z] of [[-1.6, 3.4], [1.6, 3.4], [-1.6, -4.0], [1.6, -4.0]]) p.add(new THREE.TorusGeometry(0.28, 0.08, 6, 12), 0xf0762a, { pos: [x, 3.2, z], rot: [0, Math.PI / 2, 0] });
  for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) p.cyl(0.18, 0.18, 0.5, C.tyre, { pos: [sx * 1.68, 1.2, -3.5 + i * 1.8], rot: [Math.PI / 2, 0, 0], seg: 8, outline: false });
  p.cyl(0.13, 0.15, 0.6, C.kaali, { pos: [-0.7, 4.0, -4.6], seg: 6 });
  inner.add(meshOf(ink, p, { spacing: 0.1, thickness: 2.2 }));
  for (const sx of [-1, 1]) { // hull name on both sides + the boat number on the wheelhouse
    const d = plaque(ink, 5.2, 0.7, (ctx, w, h) => {
      ctx.fillStyle = '#f6f8fa'; ctx.fillRect(0, 0, w, h);
      hand(ctx, 'WATER METRO', w * 0.34, h * 0.78, { size: h * 0.8, fill: '#2f6fb0', stroke: INK, sw: 4, seed: 6 });
      hand(ctx, 'വാട്ടർ മെട്രോ', w * 0.8, h * 0.74, { size: h * 0.6, fill: '#2a4f8a', seed: 3 });
    }, { ppu: 130, depth: 0.04, thickness: 1.4, frame: 0xf6f8fa });
    d.position.set(sx * 1.66, 1.4, -0.3); d.rotation.y = sx * Math.PI / 2; inner.add(d);
  }
  let t = opts.phase ?? 0;
  g.userData.waterline = 0.7;
  g.userData.animate = (dt) => {
    t += dt;
    inner.position.y = Math.sin(t * 1.1) * 0.06;
    inner.rotation.z = Math.sin(t * 0.8) * 0.018; inner.rotation.x = Math.sin(t * 0.6 + 1) * 0.012;
  };
  return finish(g, { footprint: { w: 3.6, l: 10.8 }, colliders: [{ x: 0, z: 3, radius: 1.7, height: 4 }, { x: 0, z: 0, radius: 1.7, height: 4 }, { x: 0, z: -3, radius: 1.7, height: 4 }] });
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
      hand(ctx, 'ഫോട്ടോ', w / 2, h * 0.58, { size: h * 0.26, fill: INK, seed: 3 });
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
    hand(ctx, 'ധാന്യം', w * 0.5, h * 0.46, { size: h * 0.44, fill: '#d9453b', seed: 4 });
    hand(ctx, 'DANA ₹10', w * 0.5, h * 0.84, { size: h * 0.24, fill: INK, seed: 6 });
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
/** A 1930s vintage saloon (burgundy + cream) for the Taj doorway. ~2.3 x 5 x 2.3. Wheels spin via animate(dt, speed). */
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
  const plate = plateText(opts.seed ?? 3, '07');
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
/** The giant Kathakali mask sculpture (replaces the bull / Triumph of Labour) on a round laterite drum in front of Aspinwall House:
 *  a green pacha face with a white chutti frame, red lips and white nose/forehead balls, a tall tiered gold-red-green crown and a halo of
 *  concentric rings, red ruff below. ~4.4 x 6 x 3.2. Photo: Wikimedia Commons "Kathakali Chuvanna Thaadi Character". */
export function createBullStatue(ink) {
  return mk(ink, (p, g) => {
    const LAT = 0xb5603f, LATD = 0x9a4f33, GREEN = 0x5fae68, WHITE = 0xfbf7ea, RED = 0xc9302c, GOLD = 0xe0b341, DGREEN = 0x2f8a56;
    p.cyl(1.9, 2.0, 0.25, 0xcfc6bb, { pos: [0, 0.125, 0], seg: 16 });
    p.cyl(1.35, 1.5, 1.15, LAT, { pos: [0, 0.82, 0], seg: 16 });
    p.cyl(1.55, 1.55, 0.14, LATD, { pos: [0, 1.4, 0], seg: 16 });
    const Y = 3.15; // face centre
    const disc = (r, c, y, z, outline = false) => p.cyl(r, r, 0.1, c, { pos: [0, y, z], rot: [Math.PI / 2, 0, 0], seg: 28, outline });
    // halo behind the head: concentric rings (red, white, green, gold, red)
    [[1.95, RED], [1.75, WHITE], [1.55, DGREEN], [1.32, GOLD], [1.12, RED], [0.95, WHITE]].forEach(([r, c], i) => disc(r, c, Y + 0.55, -0.55 + i * 0.03, i === 0));
    // red ruff + chest
    p.ball(1.05, RED, { pos: [0, Y - 1.1, 0.05], scale: [1.35, 0.5, 0.9], w: 12, h: 8 });
    // white chutti frame (a flattened ring of scallops) and the green face
    p.ball(1.05, WHITE, { pos: [0, Y, 0.12], scale: [1.0, 1.12, 0.35], w: 14, h: 10 });
    for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; p.ball(0.2, WHITE, { pos: [Math.cos(a) * 1.05, Y + Math.sin(a) * 1.18, 0.14], scale: [1, 1, 0.5], w: 6, h: 4, outline: false }); }
    p.ball(0.85, GREEN, { pos: [0, Y, 0.28], scale: [1.0, 1.1, 0.6], w: 14, h: 10 });
    // eyes (white with black outline + red iris), brows, nose and forehead balls, red lips
    for (const sx of [-1, 1]) {
      p.ball(0.26, WHITE, { pos: [sx * 0.38, Y + 0.18, 0.74], scale: [1.4, 0.7, 0.4], w: 8, h: 6 });
      p.ball(0.1, RED, { pos: [sx * 0.38, Y + 0.18, 0.86], w: 6, h: 4, outline: false });
      p.tube([sx * 0.12, Y + 0.45, 0.8], [sx * 0.72, Y + 0.5, 0.72], 0.06, 0x1f1a2e, { seg: 5, outline: false });
    }
    p.ball(0.15, WHITE, { pos: [0, Y - 0.12, 0.9], w: 8, h: 6 });
    p.ball(0.1, WHITE, { pos: [0, Y + 0.62, 0.86], w: 6, h: 5, outline: false });
    p.add(new THREE.TorusGeometry(0.22, 0.07, 5, 10, Math.PI), RED, { pos: [0, Y - 0.5, 0.86], rot: [0, 0, Math.PI], outline: false });
    // the tall tiered crown (kiritam): gold / red / green drums, narrowing, a spire on top
    let cy = Y + 0.9;
    [[0.7, GOLD], [0.6, RED], [0.52, DGREEN], [0.44, GOLD], [0.36, RED]].forEach(([r, c], i) => { p.cyl(r * 0.92, r, 0.42, c, { pos: [0, cy + 0.21, 0.1], seg: 12 }); cy += 0.42; });
    p.cone(0.18, 0.6, GOLD, { pos: [0, cy + 0.3, 0.1], seg: 8 });
    p.ball(0.1, GOLD, { pos: [0, cy + 0.65, 0.1], w: 6, h: 5 });
    // gold earrings
    for (const sx of [-1, 1]) p.ball(0.14, GOLD, { pos: [sx * 1.0, Y - 0.35, 0.3], w: 6, h: 5, outline: false });
    sign(ink, g, 2.0, 0.5, (ctx, w, h) => { board(ctx, w, h, '#f3ead2', 'rgba(200,170,110,0.5)', 4); hand(ctx, 'കഥകളി · KATHAKALI', w / 2, h * 0.66, { size: h * 0.36, fill: INK, seed: 3, maxW: w * 0.94 }); }, [0, 0.8, 1.62], 0, { ppu: 120 });
  }, { footprint: { w: 4.4, l: 3.2 }, colliders: [{ x: 0, z: 0, radius: 1.7, height: 3.2 }], thickness: 2.2 });
}

/** Infopark 'Now hiring' board with scrolling Canvas text. ~4.8 x 0.7 x 3.2 (kept under the old export name) */
export function createStockTicker(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  for (const sx of [-1, 1]) p.cyl(0.1, 0.12, 2.6, C.steelDark, { pos: [sx * 2.2, 1.3, 0], seg: 6 });
  p.round(4.9, 1.3, 0.35, 0x2a2540, { pos: [0, 2.7, 0], r: 0.1 });
  p.round(5.1, 0.12, 0.45, C.marigold, { pos: [0, 3.4, 0], r: 0.04 });
  p.box(4.6, 0.12, 0.2, C.steelDark, { pos: [0, 2.0, 0.05], outline: false });
  g.add(meshOf(ink, p, { spacing: 0.07, thickness: 2 }));
  // the strip: two identical halves so the scroll loops
  const W = 2048, H = 160;
  const c = paintCanvas(W, H, (ctx) => {
    ctx.fillStyle = '#12101f'; ctx.fillRect(0, 0, W, H);
    const items = [['HIRING', '120', 1], ['JAVA', '40', 1], ['QA', '25', 1], ['DATA', '30', 1], ['WALK-IN', 'SAT', 1], ['FRESHERS', 'OK', 1], ['CAB', 'FREE', 1], ['KAKKANAD', '24', 1]];
    let x = 24;
    const half = W / 2;
    for (let rep = 0; rep < 2; rep++) {
      x = rep * half + 20;
      for (const [name, val, up] of items) {
        hand(ctx, name, x, H * 0.66, { size: H * 0.46, fill: '#f6d86a', seed: 3, align: 'left', jitter: 0.2 });
        x += name.length * 26 + 18;
        hand(ctx, val + (up ? ' ▲' : ' ▼'), x, H * 0.66, { size: H * 0.46, fill: up ? '#7ee89a' : '#ff7a6e', seed: 5, align: 'left', jitter: 0.2 });
        x += (val.length + 2) * 24 + 40;
        if (x > (rep + 1) * half - 10) break;
      }
    }
  });
  const tex = toTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.repeat.x = 0.5;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 1.0), new THREE.MeshBasicMaterial({ map: tex }));
  face.position.set(0, 2.7, 0.19);
  face.layers.set(OVERLAY_LAYER);
  g.add(face);
  const back = face.clone(); back.rotation.y = Math.PI; back.position.z = -0.19; g.add(back);
  sign(ink, g, 3.6, 0.55, (ctx, w, h) => { board(ctx, w, h, '#fff7d6', 'rgba(230,180,80,0.45)', 5); hand(ctx, 'ജോലി ഒഴിവുകൾ · NOW HIRING', w / 2, h * 0.68, { size: h * 0.48, fill: '#1f6f8b', seed: 3, maxW: w * 0.94 }); }, [0, 3.95, 0.05], 0, { ppu: 120 });
  let t = 0;
  g.userData.animate = (dt) => { t += dt; tex.offset.x = (t * 0.045) % 0.5; };
  return finish(g, { footprint: { w: 5.2, l: 0.8 }, colliders: [{ x: -2.2, z: 0, radius: 0.2, height: 3.4 }, { x: 2.2, z: 0, radius: 0.2, height: 3.4 }, { x: 0, z: 0, radius: 0.3, height: 3.4 }] });
}

// ---------------------------------------------------------------------------------------------------
// CST
// ---------------------------------------------------------------------------------------------------
/** Parked delivery scooters with insulated boxes on the back (unbranded teal/white), a helmet rack and a tally board. ~4 x 3 */
export function createTiffinPile(ink) {
  return mk(ink, (p, g) => {
    const cols = [0x2fa7a0, 0xf2f0e6, 0x3f7fc0, 0xe8a23c];
    const scooter = (x, z, ry, col, box) => {
      const o = (dx, dz) => [x + Math.cos(ry) * dx + Math.sin(ry) * dz, z - Math.sin(ry) * dx + Math.cos(ry) * dz];
      const [fx, fz] = o(0, 0.6), [bx, bz] = o(0, -0.55), [mx, mz] = o(0, 0), [hx, hz] = o(0, 0.62), [ex, ez] = o(0, -0.95);
      for (const [wx, wz] of [[fx, fz], [bx, bz]]) p.cyl(0.28, 0.28, 0.14, C.tyre, { pos: [wx, 0.28, wz], rot: [0, 0, Math.PI / 2], seg: 10, outline: true });
      p.add(new THREE.BoxGeometry(0.34, 0.2, 1.7), col, { pos: [mx, 0.42, mz], rot: [0, ry, 0] });                      // floorboard + body
      p.add(new THREE.BoxGeometry(0.36, 0.5, 0.5), col, { pos: [hx, 0.62, hz], rot: [0, ry, 0] });                       // front shield
      p.add(new THREE.BoxGeometry(0.4, 0.16, 0.7), C.kaali, { pos: [ex, 0.78, ez + 0.3], rot: [0, ry, 0], outline: false }); // seat
      p.tube([hx, 0.9, hz], [hx, 1.15, hz - 0.05], 0.04, C.steelDark, { seg: 5 });
      p.add(new THREE.BoxGeometry(0.7, 0.05, 0.06), C.steelDark, { pos: [hx, 1.17, hz - 0.05], rot: [0, ry, 0], outline: false });
      if (box) p.add(new THREE.BoxGeometry(0.62, 0.62, 0.62), box, { pos: [ex, 1.15, ez - 0.1], rot: [0, ry, 0] });          // insulated delivery box
    };
    [[-1.6, -0.3, 0.1], [-0.55, -0.1, -0.05], [0.55, -0.3, 0.12], [1.55, -0.1, -0.1]].forEach(([x, z, ry], i) => scooter(x, z, ry, cols[i % 4], i === 3 ? null : (i % 2 ? 0xf6f2e8 : 0x2a8d87)));
    // helmet rack + tally board
    for (const sx of [-1, 1]) p.box(0.1, 1.9, 0.1, C.woodDark, { pos: [sx * 1.8, 0.95, -1.2] });
    p.box(3.8, 0.1, 0.1, C.woodDark, { pos: [0, 1.9, -1.2] });
    for (let i = 0; i < 6; i++) p.ball(0.2, [0xe0453f, 0xf6d343, 0x3f7fc0, 0x6fcf7a][i % 4], { pos: [-1.5 + i * 0.6, 1.7, -1.15], scale: [1, 0.85, 1.1], w: 7, h: 5, outline: false });
    sign(ink, g, 1.8, 0.6, (ctx, w, h) => { board(ctx, w, h, '#fffbe6', 'rgba(240,200,90,0.45)', 4); hand(ctx, 'ഡെലിവറി · DELIVERY', w / 2, h * 0.7, { size: h * 0.46, fill: '#1f6f8b', seed: 5, maxW: w * 0.88 }); }, [0, 2.3, -1.2], 0, { ppu: 120 });
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
    sign(ink, g, 2.6, 0.7, (ctx, w, h) => { board(ctx, w, h, '#fff8de', 'rgba(230,190,110,0.5)', 6); handRow(ctx, [{ text: 'പുസ്തകം', size: h * 0.42, fill: '#d9453b' }, { text: 'BOOKS', size: h * 0.46, fill: INK }, { text: '₹50', size: h * 0.4, fill: '#2f7a46' }], w / 2, h * 0.7); }, [0, 3.0, 1.55], 0, { ppu: 130 });
  }, { footprint: { w: 5.4, l: 4.2 }, colliders: [{ x: 0, z: 0.5, radius: 2.3, height: 1.2 }, { x: 0, z: -1.2, radius: 2.3, height: 2.6 }], thickness: 1.8 });
}

/** Art-deco concrete bench for the Marine Drive promenade, curved back, 3 pastel slats. ~3 x 1 x 1.3 */
export function createMarineBench(ink, opts = {}) {
  return mk(ink, (p) => {
    const col = opts.color ?? 0xf4c3cf;
    p.round(3.0, 0.16, 0.9, 0xe9e1d0, { pos: [0, 0.62, 0], r: 0.04 });
    for (let i = 0; i < 3; i++) p.box(2.9, 0.08, 0.26, [col, 0xbfe6d3, 0xf9d9ab][i], { pos: [0, 0.74, -0.28 + i * 0.28], outline: false });
    for (const sx of [-1, 1]) { p.round(0.3, 0.62, 0.9, 0xd9d0bd, { pos: [sx * 1.35, 0.31, 0], r: 0.06 }); p.round(0.3, 1.0, 0.1, 0xd9d0bd, { pos: [sx * 1.35, 0.7, -0.4], r: 0.04 }); }
    p.box(2.9, 0.1, 0.12, 0xe9e1d0, { pos: [0, 1.42, -0.42] });
    p.box(2.9, 0.55, 0.06, col, { pos: [0, 1.1, -0.42], outline: false });
  }, { footprint: { w: 3.2, l: 1.2 }, colliders: [{ x: -0.9, z: 0, radius: 0.6, height: 1 }, { x: 0.9, z: 0, radius: 0.6, height: 1 }], spacing: 0.06, thickness: 1.8 });
}

// ---------------------------------------------------------------------------------------------------
// Goshree bridge approach toll plaza
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
    hand(ctx, 'GOSHREE BRIDGES · KOCHI', w * 0.5, h * 0.4, { size: h * 0.32, fill: '#fffbe0', seed: 3, maxW: w * 0.92 });
    handRow(ctx, [{ text: 'ടോൾ', size: h * 0.3, fill: '#ffd778' }, { text: 'TOLL ₹40', size: h * 0.3, fill: '#fffbe0' }], w / 2, h * 0.8);
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
/** Candle and flower stall for churchgoers: white and red candles, rose and jasmine baskets, incense, a blue backdrop. ~4 x 2.4 x 3.2 */
export function createChadarStall(ink) {
  return mk(ink, (p, g) => {
    const r = mulberry32(44);
    p.box(3.8, 0.9, 1.2, C.woodLight, { pos: [0, 0.45, 0.3] });
    p.box(3.9, 0.08, 1.3, C.wood, { pos: [0, 0.94, 0.3] });
    for (const sx of [-1, 1]) p.cyl(0.06, 0.07, 3.2, C.woodDark, { pos: [sx * 1.9, 1.6, -0.4], seg: 5 });
    p.add(new THREE.BoxGeometry(4.1, 0.06, 1.8), 0x3fae6d, { pos: [0, 3.1, 0.2], rot: [0.2, 0, 0] });
    // folded chadars (green with gold borders)
    for (let i = 0; i < 4; i++) { p.round(1.0, 0.1, 0.8, i % 2 ? 0x2f9d62 : 0x4fc07f, { pos: [-1.4 + (i % 2) * 0.0, 1.0 + i * 0.12, 0.2], r: 0.03, rot: [0, 0.05 * i, 0] }); p.box(1.02, 0.03, 0.06, C.gold ?? 0xe8b84a, { pos: [-1.4, 1.03 + i * 0.12, 0.6], outline: false }); }
    for (let i = 0; i < 3; i++) p.round(1.0, 0.1, 0.8, [0x2f9d62, 0xf4f0e0, 0x3b8fd0][i], { pos: [-0.2, 1.0 + i * 0.12, 0.25], r: 0.03, rot: [0, -0.06 * i, 0] });
    // baskets of rose petals and marigold
    for (const [x, c] of [[0.9, 0xe8456b], [1.5, C.marigold], [1.2, 0xf8b4c8]]) {
      p.lathe([[0.001, 0], [0.38, 0], [0.46, 0.22], [0.4, 0.26]], C.woodLight, { pos: [x, 0.98, 0.5 + (x > 1.3 ? -0.2 : 0)], seg: 9 });
      for (let k = 0; k < 7; k++) p.ball(0.12, c, { pos: [x + (r() - 0.5) * 0.5, 1.28 + r() * 0.12, 0.5 + (x > 1.3 ? -0.2 : 0) + (r() - 0.5) * 0.5], w: 5, h: 4, outline: false });
    }
    // incense sticks in a pot, hanging garlands
    p.cyl(0.14, 0.18, 0.2, C.terracotta, { pos: [0.5, 1.06, 0.1], seg: 8 });
    for (let k = 0; k < 6; k++) p.tube([0.5, 1.15, 0.1], [0.5 + (k - 2.5) * 0.06, 1.7, 0.1 + (r() - 0.5) * 0.12], 0.012, 0x6a4a3a, { seg: 3, outline: false });
    for (const sx of [-1, 1]) for (let i = 0; i < 8; i++) p.ball(0.1, i % 2 ? C.marigold : 0xe8456b, { pos: [sx * 1.7, 2.9 - i * 0.2, 1.0], w: 5, h: 4, outline: false });
    // star-patterned green backdrop
    p.box(3.6, 1.9, 0.06, 0x2f9d62, { pos: [0, 1.9, -0.7] });
    sign(ink, g, 1.2, 0.6, (ctx, w, h) => { board(ctx, w, h, '#e9fbe9', 'rgba(60,160,100,0.4)', 3); hand(ctx, 'മെഴുകുതിരി · പൂ', w / 2, h * 0.5, { size: h * 0.3, fill: '#1f7a46', seed: 3, maxW: w * 0.9 }); hand(ctx, 'CANDLES · FLOWERS', w / 2, h * 0.84, { size: h * 0.2, fill: INK, seed: 7, maxW: w * 0.9 }); }, [0, 3.45, 0.55], 0, { ppu: 140 });
    // gold stars painted as small discs on the backdrop
    for (let i = 0; i < 12; i++) p.cyl(0.14, 0.14, 0.02, 0xf2d675, { pos: [-1.5 + (i % 6) * 0.6, 2.4 - Math.floor(i / 6) * 0.9, -0.66], rot: [Math.PI / 2, 0, 0], seg: 6, outline: false });
  }, { footprint: { w: 4.2, l: 2.4 }, colliders: [{ x: 0, z: 0.2, radius: 1.9, height: 1.2 }], thickness: 1.8 });
}

/** Kulukki sarbath stall: shop front with lemon and lime pyramids, steel shakers, tall glasses, striped awning. ~5.4 x 4.2 x 4.4 */
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
    pyramid(-1.7, 0xe9e04a, 4, 0.2); pyramid(-0.6, 0x9ed56a, 3, 0.22); pyramid(0.5, 0xf2d675, 3, 0.22); pyramid(1.6, 0x7fc060, 3, 0.24);
    // glasses of juice on the counter + blender
    [0xe9e04a, 0x9ed56a, 0xf2d675, 0x9ed56a, 0xcfe88a].forEach((c, i) => { p.cyl(0.14, 0.11, 0.38, C.white, { pos: [-1.9 + i * 0.35, 1.5, 1.45], seg: 7, outline: false }); p.cyl(0.12, 0.1, 0.28, c, { pos: [-1.9 + i * 0.35, 1.48, 1.45], seg: 7, outline: false }); });
    p.cyl(0.22, 0.28, 0.7, C.glass, { pos: [1.7, 1.6, 1.45], seg: 8 }); p.cyl(0.28, 0.3, 0.3, C.kaali, { pos: [1.7, 1.35, 1.45], seg: 8 });
    // striped awning
    for (let i = 0; i < 12; i++) p.add(new THREE.BoxGeometry(0.46, 0.07, 1.7), i % 2 ? C.cream : 0xe9625a, { pos: [-2.5 + (i + 0.5) * 0.4167, 3.1, 1.9], rot: [0.5, 0, 0] });
    // hanging mosambi strings
    for (const sx of [-2.4, 2.4]) for (let i = 0; i < 5; i++) p.ball(0.15, 0xc8d96a, { pos: [sx, 3.0 - i * 0.24, 1.7], w: 6, h: 5, outline: false });
    // back wall shelves
    for (const y of [2.0, 2.8]) p.box(4.2, 0.07, 0.3, C.woodDark, { pos: [0, y, -1.8] });
    for (const y of [2.0, 2.8]) for (let i = 0; i < 9; i++) p.cyl(0.12, 0.12, 0.4, [0xf59a2a, 0xe0453f, 0x9ed56a, 0xf2d675][i % 4], { pos: [-1.9 + i * 0.47, y + 0.24, -1.8], seg: 7, outline: false });
    sign(ink, g, 5.0, 1.0, (ctx, w, h) => {
      ctx.fillStyle = '#15705f'; ctx.fillRect(0, 0, w, h);
      boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#1f8f7a', hatch: 'rgba(10,70,55,0.55)', cw: w, ch: h, r: rng(8), lw: 5, round: 14 });
      hand(ctx, 'KULUKKI SARBATH', w * 0.5, h * 0.6, { size: h * 0.42, fill: '#fff4d2', stroke: '#0f4c40', sw: 5, seed: 6, maxW: w * 0.94 });
      hand(ctx, 'കുലുക്കി സർബത്ത് · ഐസ്', w * 0.5, h * 0.9, { size: h * 0.22, fill: '#ffd778', seed: 4, maxW: w * 0.9 });
    }, [0, 3.35 + 0.65, 1.3], 0, { ppu: 130, frame: 0x1f8f7a });
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
