/**
 * hyderabad/props/siteDetails2.js: small contextual props, part 2: lakeside park (Necklace Road), old-city houses, temple, metro station, chowk extras. Names kept from the fork: createPavBhajiStall = pani puri stall, createHorse = camel ride, createSandArt = Bathukamma flower stacks, createGanpatiPoster = Bonalu / Bathukamma poster, createPlatformChaiStall = platform Irani chai stall.
 *
 * Factories (ink, opts?) -> THREE.Group (y up, base y=0, front +z, userData {footprint:{w,l}, colliders, animate?}):
 *   createPavBhajiStall, createHorse, createSandArt, createBhuttaCart, createCoconutCart,
 *   createCarromBoard, createCommonTap, createRangoli({seed}), createGanpatiPoster, createPuddle({seed}),
 *   createTempleBells, createOfferingStall, createChappalRow,
 *   createTimetableBoard, createFastSlowIndicator, createPlatformChaiStall,
 *   createStoolCluster({count,seed}), createCrateStack({seed})
 * Ground decals (rangoli, puddle) lie flat at y~0.03 on the overlay layer (no ink hull), facing up.
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, hand, handRow, boardRect, paintCanvas, finish, rng, mulberry32, drawShape, wobblyLine, INK,
  animator, umbrella, ell, toTexture, steam, taperTube, makeCanvas,
} from './kit.js';
import { OVERLAY_LAYER } from '../../../engine/ink.js';
import { mk, sign, TAU, pigeonParts } from './siteDetails.js';

const board = (ctx, w, h, fill = '#fff4c2', hatch = 'rgba(230,180,60,0.5)', seed = 3) => boardRect(ctx, 4, 4, w - 8, h - 8, { fill, hatch, cw: w, ch: h, r: rng(seed), lw: 3.4, round: 10 });

function groundDecal(canvas, w, h) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: toTexture(canvas), transparent: true, alphaTest: 0.04, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, depthWrite: false })
  );
  m.position.y = 0.03;
  m.layers.set(OVERLAY_LAYER);
  return m;
}

// ---------------------------------------------------------------------------------------------------
// Juhu beach
// ---------------------------------------------------------------------------------------------------
/** Pani puri stall (replaces the pav bhaji stall): terracotta matkas of mint and tamarind water, a glass case of golden puris, potato + onion bowls, leaf plates, striped awning and banner. ~4.4 x 3 x 4 */
export function createPavBhajiStall(ink) {
  return mk(ink, (p, g, anim) => {
    const r = mulberry32(61);
    p.round(4.0, 1.1, 1.5, C.orange, { pos: [0, 0.6, 0.3], r: 0.1 });
    p.round(4.2, 0.1, 1.7, C.steel, { pos: [0, 1.2, 0.3], r: 0.04 });
    for (const x of [-2.05, 2.05]) { p.cyl(0.07, 0.08, 3.6, C.woodDark, { pos: [x, 1.8, 1.1], seg: 6 }); p.cyl(0.07, 0.08, 3.9, C.woodDark, { pos: [x, 1.95, -1.1], seg: 6 }); }
    for (let i = 0; i < 10; i++) p.add(new THREE.BoxGeometry(0.46, 0.06, 2.6), i % 2 ? C.cream : C.bestRed, { pos: [-2.1 + (i + 0.5) * 0.42, 3.75, 0.0], rot: [0.14, 0, 0] });
    // two matkas of pani (mint green, tamarind brown) with cloth lids, a glass case of puris, bowls
    for (const [x, col] of [[-1.2, 0x8fcf86], [-0.35, 0x8a4b2a]]) {
      p.lathe([[0.001, 0], [0.26, 0.02], [0.46, 0.3], [0.48, 0.58], [0.34, 0.82], [0.26, 0.94], [0.32, 1.02], [0.001, 1.02]], C.terracotta, { pos: [x, 1.25, 0.3], seg: 10 });
      p.cyl(0.27, 0.27, 0.03, col, { pos: [x, 2.25, 0.3], seg: 9, outline: false });
    }
    p.tube([-0.35, 2.2, 0.3], [0.1, 1.95, 0.7], 0.035, C.steel, { seg: 4 });
    p.box(1.0, 0.55, 0.7, 0xdfeff2, { pos: [0.95, 1.55, -0.05] });
    for (let i = 0; i < 14; i++) p.ball(0.12, [0xe9b25a, 0xe2a24a, 0xf0c070][i % 3], { pos: [0.95 + (r() - 0.5) * 0.75, 1.45 + r() * 0.3, -0.05 + (r() - 0.5) * 0.45], w: 6, h: 5, outline: false });
    for (let i = 0; i < 4; i++) p.cyl(0.2, 0.15, 0.1, 0xf2c97a, { pos: [1.5 + (i % 2) * 0.42, 1.3, 0.75 + Math.floor(i / 2) * 0.4], seg: 8, outline: false }); // leaf plates
    for (let i = 0; i < 4; i++) p.ball(0.14, [0xe3b866, 0xb35ac0, 0xd9a24a, 0x8a4b2a][i], { pos: [1.7 + i * 0.18, 1.34, -0.45], w: 5, h: 4, outline: false });
    p.ball(0.18, 0xf2e45a, { pos: [-0.3, 1.36, 0.95], scale: [1, 0.7, 1], w: 6, h: 4 }); // lime
    // rear shelf with tin jars
    p.box(3.8, 0.07, 0.4, C.woodDark, { pos: [0, 2.3, -0.95] });
    for (let i = 0; i < 6; i++) p.cyl(0.18, 0.18, 0.4, [C.steel, C.bestRed, C.yellow][i % 3], { pos: [-1.6 + i * 0.64, 2.55, -0.95], seg: 8, outline: false });
    // lanterns + banner
    for (const x of [-1.9, 1.9]) p.ball(0.18, 0xfff1b8, { pos: [x, 3.4, 1.4], w: 7, h: 5, outline: false });
    sign(ink, g, 3.4, 0.9, (ctx, w, h) => {
      board(ctx, w, h, '#ffeaa8', 'rgba(230,150,60,0.5)', 7);
      handRow(ctx, [{ text: 'పానీ పూరీ', size: h * 0.36, fill: '#d9453b' }, { text: 'PANI PURI', size: h * 0.24, fill: INK }], w / 2, h * 0.68);
      hand(ctx, 'LAKESIDE SPECIAL', w / 2, h * 0.93, { size: h * 0.15, fill: '#8a5a22', seed: 9, weight: 'normal' });
    }, [0, 3.0, 1.4], 0, { ppu: 120 });
    const s = steam({ count: 3, height: 1.2, size: 0.7, drift: 0.25 });
    s.position.set(-0.8, 2.3, 0.2);
    g.add(s);
    anim.push((dt, t) => s.userData.update(t));
    for (let i = 0; i < 2; i++) p.cyl(0.26, 0.24, 0.45, [C.bestRed, C.sky][i], { pos: [1.7 + i * 0.8, 0.25, 2.2 - i * 0.2], seg: 8 }); // stools
  }, { footprint: { w: 4.6, l: 5 }, colliders: [{ x: 0, z: 0.2, radius: 2.2, height: 1.4 }, { x: 0, z: -1.0, radius: 2.0, height: 2.5 }], thickness: 2 });
}

/** Camel ride (replaces the horse ride; Necklace Road): a standing camel in a red-and-gold saddle blanket with a seat on its hump; it breathes and nods. ~1.6 x 3.8 x 3.2 */
export function createHorse(ink, opts = {}) {
  const g = new THREE.Group();
  const coat = opts.coat ?? 0xd9b57a, dark = 0x8a6a42;
  const p = new Mix();
  // legs (long, knobbly), body, two humps, S-curved neck, head
  for (const [dx, dz] of [[-0.3, 0.7], [0.3, 0.7], [-0.3, -0.8], [0.3, -0.8]]) { p.tube([dx, 1.55, dz], [dx * 1.1, 0.12, dz + 0.04], 0.13, coat, { seg: 5 }); p.ball(0.15, dark, { pos: [dx * 1.1, 0.1, dz + 0.04], scale: [1, 0.6, 1.4], w: 5, h: 4, outline: false }); }
  p.ball(0.7, coat, { pos: [0, 1.95, -0.05], scale: [0.78, 0.8, 1.7], w: 10, h: 8 });
  p.ball(0.36, coat, { pos: [0, 2.6, -0.1], scale: [0.9, 1.05, 1.1], w: 8, h: 6 });
  p.tube([0, 2.1, 1.0], [0, 2.9, 1.5], 0.2, coat, { seg: 6 });
  p.tube([0, 2.9, 1.5], [0, 3.2, 1.95], 0.17, coat, { seg: 6 });
  p.ball(0.26, coat, { pos: [0, 3.25, 2.15], scale: [0.85, 0.9, 1.4], w: 8, h: 6 });
  p.ball(0.12, dark, { pos: [0, 3.15, 2.5], scale: [1, 0.8, 1], w: 5, h: 4, outline: false });
  for (const sx of [-1, 1]) { p.ball(0.045, INKC, { pos: [sx * 0.15, 3.35, 2.28], w: 4, h: 3, outline: false }); p.ball(0.07, dark, { pos: [sx * 0.15, 3.5, 1.95], scale: [1, 1.4, 1], w: 4, h: 3, outline: false }); }
  p.tube([0, 1.9, -1.15], [0, 1.2, -1.4], 0.05, dark, { seg: 4 });
  // saddle blanket (red + gold stripes), a cushioned seat on the hump, rope reins and a tassel halter
  p.add(new THREE.BoxGeometry(1.35, 0.06, 1.2), 0xc2354a, { pos: [0, 2.82, -0.1], rot: [0, 0, 0] });
  p.box(1.4, 0.07, 0.12, PAL_GOLD, { pos: [0, 2.86, 0.5], outline: false }); p.box(1.4, 0.07, 0.12, PAL_GOLD, { pos: [0, 2.86, -0.7], outline: false });
  p.box(0.8, 0.14, 0.7, C.marigold, { pos: [0, 2.95, -0.1] });
  p.tube([0, 3.15, 2.3], [0.3, 1.2, 1.5], 0.02, 0xe8456b, { seg: 3, outline: false });
  for (let i = 0; i < 6; i++) p.ball(0.08, i % 2 ? C.marigold : 0xe8456b, { pos: [Math.sin(i * 1.1) * 0.2, 2.6 - i * 0.04, 0.9 + i * 0.05], w: 4, h: 3, outline: false });
  const body = new THREE.Group(); g.add(body);
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.07, thickness: 2 }), {}));
  let t = opts.phase ?? 0;
  g.userData.animate = (dt) => { t += dt; g.rotation.x = Math.sin(t * 0.7) * 0.01; };
  return finish(g, { footprint: { w: 1.6, l: 3.8 }, colliders: [{ x: 0, z: 1.3, radius: 0.9, height: 3.2 }, { x: 0, z: -0.6, radius: 0.9, height: 3.0 }] });
}
const PAL_GOLD = 0xe8b84a;

/** Bathukamma display (replaces the sand art; reference: Commons "Bathukamma in telangana"): three tall conical stacks of concentric flower rings (marigold, celosia red, white, teal leaves) topped with a turmeric Gauramma cone, brass plates and lamps round them, on a muggu (rangoli) circle, with a basket of petals. ~4.6 x 3.6 x 2 */
export function createSandArt(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  g.add(createRangoli(ink, { seed: 4, size: 4.6 }));
  const stack = (x, z, R, ph) => {
    const bands = [[0xf6a634, 1.0], [0xe0453f, 0.88], [0xfaf6ea, 0.74], [0x4fb3a8, 0.64], [0xf6d343, 0.52], [0xe8456b, 0.4]];
    let y = 0.1, h = ph / bands.length;
    bands.forEach(([c, k], i) => { p.cyl(R * k * 0.92, R * k, h, c, { pos: [x, y + h / 2, z], seg: 12, outline: i % 2 === 0 }); y += h; });
    p.cone(R * 0.2, R * 0.55, 0xf6c62d, { pos: [x, y + R * 0.27, z], seg: 6 });          // turmeric Gauramma
    p.tube([x, y, z], [x + 0.02, y + R * 0.9, z], 0.02, 0x6a4a3a, { seg: 3, outline: false });
    p.cyl(R * 1.18, R * 1.22, 0.07, C.brass, { pos: [x, 0.05, z], seg: 14 });                // brass plate under it
  };
  stack(0, -0.2, 1.0, 2.3); stack(-1.9, 0.7, 0.62, 1.3); stack(1.9, 0.6, 0.62, 1.4);
  for (let i = 0; i < 9; i++) { const a = (i / 9) * TAU; p.cone(0.07, 0.14, 0xffc94a, { pos: [Math.sin(a) * 1.7, 0.1, -0.2 + Math.cos(a) * 1.4], seg: 4, outline: false }); } // diyas round the circle
  p.lathe([[0.001, 0], [0.3, 0], [0.42, 0.3], [0.001, 0.3]], C.woodLight, { pos: [-2.9, 0.05, 1.3], seg: 9 });
  for (let k = 0; k < 8; k++) p.ball(0.11, k % 2 ? C.marigold : 0xe8456b, { pos: [-2.9 + Math.sin(k * 2.1) * 0.2, 0.4, 1.3 + Math.cos(k * 2.1) * 0.2], w: 5, h: 4, outline: false });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.8 }));
  sign(ink, g, 1.7, 0.9, (ctx, w, h) => { board(ctx, w, h, '#fff7d6', 'rgba(230,180,80,0.45)', 6); hand(ctx, 'బతుకమ్మ', w / 2, h * 0.5, { size: h * 0.42, fill: '#d9453b', seed: 2 }); hand(ctx, 'BATHUKAMMA', w / 2, h * 0.84, { size: h * 0.2, fill: INK, seed: 6, weight: 'normal' }); }, [-1.6, 0.5, 2.6], 0, { ppu: 140 });
  return finish(g, { footprint: { w: 6.2, l: 6.2 }, colliders: [{ x: 0, z: -0.2, radius: 1.1, height: 2.4 }] });
}

/** Bhutta (roast corn) cart: coal brazier with flickering embers, corn pile, lemon and masala, smoke. ~3.4 x 2 x 3.4 */
export function createBhuttaCart(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  p.round(2.6, 0.12, 1.5, C.woodLight, { pos: [0, 1.0, 0], r: 0.03 });
  p.round(2.6, 0.7, 1.4, C.bestRed, { pos: [0, 0.6, 0], r: 0.08 });
  for (const sx of [-1, 1]) { p.cyl(0.55, 0.55, 0.14, C.tyre, { pos: [sx * 1.4, 0.55, 0.2], rot: [0, 0, Math.PI / 2], seg: 12 }); p.cyl(0.18, 0.18, 0.18, C.steel, { pos: [sx * 1.4, 0.55, 0.2], rot: [0, 0, Math.PI / 2], seg: 6, outline: false }); }
  p.tube([-1.2, 0.8, -0.5], [-1.5, 1.2, -1.9], 0.07, C.woodDark, { seg: 5 }); p.tube([1.2, 0.8, -0.5], [1.5, 1.2, -1.9], 0.07, C.woodDark, { seg: 5 });
  // brazier + grate
  p.lathe([[0.001, 0], [0.5, 0], [0.62, 0.35], [0.56, 0.4], [0.4, 0.3], [0.001, 0.3]], 0x2f2b3c, { pos: [-0.55, 1.06, 0.0], seg: 10 });
  p.add(new THREE.TorusGeometry(0.55, 0.025, 4, 14), C.steelDark, { pos: [-0.55, 1.44, 0], rot: [Math.PI / 2, 0, 0], outline: false });
  for (let i = -2; i <= 2; i++) p.box(0.03, 0.03, 1.0, C.steelDark, { pos: [-0.55 + i * 0.18, 1.44, 0], outline: false });
  // corn on the grate + big pile in a basket
  for (let i = 0; i < 4; i++) p.cyl(0.07, 0.07, 0.62, i % 2 ? 0xf2c23a : 0xd9a02a, { pos: [-0.55 + (i - 1.5) * 0.22, 1.52, 0.0], rot: [0, 0, Math.PI / 2 * 0 + 0.0], seg: 6 });
  p.lathe([[0.001, 0], [0.6, 0], [0.7, 0.45], [0.62, 0.5]], C.woodLight, { pos: [0.85, 1.06, 0.1], seg: 9 });
  for (let i = 0; i < 9; i++) { const a = (i / 9) * TAU; p.cyl(0.1, 0.09, 0.72, 0xf6d65e, { pos: [0.85 + Math.cos(a) * 0.3, 1.8, 0.1 + Math.sin(a) * 0.3], rot: [Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35], seg: 6 }); p.cone(0.08, 0.2, C.leaf, { pos: [0.85 + Math.cos(a) * 0.38, 2.1, 0.1 + Math.sin(a) * 0.38], seg: 4, outline: false }); }
  p.cyl(0.4, 0.38, 0.5, 0xf6efe0, { pos: [0.1, 1.28, 0.55], seg: 8 }); // lemon + masala bowl
  for (let i = 0; i < 4; i++) p.ball(0.1, 0xf2dc50, { pos: [0.1 + (i - 1.5) * 0.14, 1.58, 0.55], w: 5, h: 4, outline: false });
  // umbrella
  umbrella(p, { r: 2.2, h: 0.75, pos: [0, 3.0, 0.1], poleH: 2.2, colors: [C.marigold, C.cream], sectors: 10 });
  const sc = paintCanvas(10, 10, () => {});
  void sc;
  g.add(meshOf(ink, p, { spacing: 0.07, thickness: 2 }));
  // embers (flicker) + smoke
  const ember = new THREE.Mesh(new THREE.CircleGeometry(0.46, 10).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xff8a3a }));
  ember.position.set(-0.55, 1.4, 0); ember.layers.set(OVERLAY_LAYER); g.add(ember);
  const s = steam({ count: 3, height: 1.4, size: 0.7, drift: 0.3, tint: 0xd9d6e0 });
  s.position.set(-0.55, 1.7, 0); g.add(s);
  sign(ink, g, 1.2, 0.5, (ctx, w, h) => { board(ctx, w, h, '#fff0b0', 'rgba(240,190,60,0.5)', 5); handRow(ctx, [{ text: 'మొక్కజొన్న', size: h * 0.36, fill: '#d9453b' }, { text: '₹30', size: h * 0.42, fill: INK }], w / 2, h * 0.72); }, [0.0, 0.66, 0.78], 0, { ppu: 130 });
  let t = 0;
  g.userData.animate = (dt) => { t += dt; s.userData.update(t); ember.material.color.setHex(Math.sin(t * 9) + Math.sin(t * 13.7) > 0.4 ? 0xffb454 : 0xff6a2e); };
  return finish(g, { footprint: { w: 3.2, l: 4.4 }, colliders: [{ x: 0, z: 0.1, radius: 1.5, height: 2 }] });
}

/** Tender-coconut cart: green coconuts piled in a pyramid, a machete, straws and a hand-painted board. ~3.2 x 3 x 3 */
export function createCoconutCart(ink) {
  return mk(ink, (p, g) => {
    const r = mulberry32(8);
    p.round(2.6, 0.8, 1.4, C.teal, { pos: [0, 0.6, 0], r: 0.08 });
    p.round(2.7, 0.1, 1.5, C.woodLight, { pos: [0, 1.02, 0], r: 0.03 });
    for (const sx of [-1, 1]) { p.cyl(0.55, 0.55, 0.14, C.tyre, { pos: [sx * 1.4, 0.55, 0.2], rot: [0, 0, Math.PI / 2], seg: 12 }); p.cyl(0.18, 0.18, 0.18, C.steel, { pos: [sx * 1.4, 0.55, 0.2], rot: [0, 0, Math.PI / 2], seg: 6, outline: false }); }
    p.tube([-1.2, 0.8, -0.5], [-1.5, 1.2, -1.9], 0.07, C.woodDark, { seg: 5 }); p.tube([1.2, 0.8, -0.5], [1.5, 1.2, -1.9], 0.07, C.woodDark, { seg: 5 });
    // pyramid of tender coconuts
    let n = 0;
    for (let row = 0; row < 4; row++) for (let i = 0; i < 4 - row; i++) for (let j = 0; j < 2; j++) { p.ball(0.3, [0x9fd36f, 0x8bc468, 0xb5db7e][n++ % 3], { pos: [-0.9 + (i - (3 - row) / 2) * 0.55 + 0.9, 1.35 + row * 0.5, -0.2 + j * 0.5], scale: [1, 1.15, 1], w: 7, h: 5, outline: row < 2 }); }
    // opened coconut with straw + cleaver stuck in a chopping block
    p.ball(0.28, 0xd8efb8, { pos: [1.0, 1.28, 0.55], scale: [1, 1.1, 1], w: 7, h: 5 });
    p.tube([1.0, 1.4, 0.55], [1.25, 2.0, 0.4], 0.025, C.bestRed, { seg: 3, outline: false });
    p.cyl(0.35, 0.38, 0.4, C.woodDark, { pos: [-1.1, 1.07, 0.6], seg: 8 });
    p.box(0.5, 0.3, 0.04, C.steel, { pos: [-1.1, 1.65, 0.6], rot: [0, 0, 0.5] }); p.box(0.4, 0.07, 0.07, C.woodDark, { pos: [-0.88, 1.9, 0.6], rot: [0, 0, 0.5], outline: false });
    // palm-leaf awning
    for (let i = -2; i <= 2; i++) p.add(new THREE.BoxGeometry(0.34, 0.04, 2.2), i % 2 ? 0x6fb575 : 0x8cc882, { pos: [i * 0.52, 3.1 - Math.abs(i) * 0.08, 0.1], rot: [0.1, 0, -i * 0.09] });
    for (const sx of [-1, 1]) p.cyl(0.05, 0.06, 2.2, C.woodDark, { pos: [sx * 1.3, 2.1, 0.9], seg: 5 });
    sign(ink, g, 1.7, 0.6, (ctx, w, h) => { board(ctx, w, h, '#eefbd6', 'rgba(110,190,100,0.45)', 2); handRow(ctx, [{ text: 'కొబ్బరి బొండాం', size: h * 0.3, fill: '#1f7a46' }, { text: '₹40', size: h * 0.42, fill: INK }], w / 2, h * 0.72); }, [0, 0.7, 0.78], 0, { ppu: 130 });
  }, { footprint: { w: 3.4, l: 4.2 }, colliders: [{ x: 0, z: 0, radius: 1.5, height: 2 }], thickness: 2 });
}

// ---------------------------------------------------------------------------------------------------
// Chawl bits
// ---------------------------------------------------------------------------------------------------
let carromTex = null;
/** Carrom board on a low stand with pieces and a striker, four little stools. ~2.8 x 2.8 x 0.9 */
export function createCarromBoard(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  p.round(1.9, 0.12, 1.9, 0xc58b52, { pos: [0, 0.62, 0], r: 0.05 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.cyl(0.07, 0.09, 0.56, C.woodDark, { pos: [sx * 0.8, 0.28, sz * 0.8], seg: 5 });
  for (const [x, z, ry] of [[0, 1.55, 0], [0, -1.55, 0], [1.55, 0, 0], [-1.55, 0, 0]]) p.cyl(0.28, 0.24, 0.38, [C.bestRed, C.sky, C.marigoldY, C.leaf][(x ? 1 : 0) + (z > 0 || x > 0 ? 2 : 0)], { pos: [x, 0.19, z], seg: 8 });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.8 }));
  if (!carromTex) carromTex = paintCanvas(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#f0d49a'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.lineWidth = 2.4;
    for (const [x, y] of [[22, 22], [w - 22, 22], [22, h - 22], [w - 22, h - 22]]) { ctx.fillStyle = '#2b2440'; ctx.beginPath(); ctx.arc(x, y, 13, 0, TAU); ctx.fill(); }
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 56, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(w / 2, h / 2, 18, 0, TAU); ctx.stroke();
    ctx.strokeStyle = '#d9453b'; ctx.strokeRect(48, 48, w - 96, h - 96);
    ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(52, 70); ctx.lineTo(w - 52, 70); ctx.moveTo(52, h - 70); ctx.lineTo(w - 52, h - 70); ctx.stroke();
    // coins: white, black, red queen
    const coin = (x, y, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.stroke(); };
    coin(w / 2, h / 2, '#e9462f');
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; coin(w / 2 + Math.cos(a) * 20, h / 2 + Math.sin(a) * 20, i % 2 ? '#fbf8ee' : '#2b2440'); }
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU + 0.5; coin(w / 2 + Math.cos(a) * 38, h / 2 + Math.sin(a) * 38, i % 2 ? '#2b2440' : '#fbf8ee'); }
    coin(w / 2 + 60, h - 70, '#f6d65e');
  });
  const top = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: toTexture(carromTex) }));
  top.position.y = 0.69; top.layers.set(OVERLAY_LAYER); g.add(top);
  const fp = new Mix();
  fp.box(1.9, 0.12, 0.09, C.woodDark, { pos: [0, 0.7, 0.9] }); fp.box(1.9, 0.12, 0.09, C.woodDark, { pos: [0, 0.7, -0.9] });
  fp.box(0.09, 0.12, 1.9, C.woodDark, { pos: [0.9, 0.7, 0] }); fp.box(0.09, 0.12, 1.9, C.woodDark, { pos: [-0.9, 0.7, 0] });
  g.add(meshOf(ink, fp, { spacing: 0.05, thickness: 1.4 }));
  return finish(g, { footprint: { w: 3.2, l: 3.2 }, colliders: [{ x: 0, z: 0, radius: 1.1, height: 0.8 }] });
}

/** Common standpipe tap with brass pots, a bucket under a dripping tap and a wet platform. ~2.8 x 2.4 x 1.5 */
export function createCommonTap(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  p.cyl(1.35, 1.45, 0.16, 0xcfc6bb, { pos: [0, 0.08, 0], seg: 12 });
  p.cyl(1.1, 1.1, 0.04, 0x9fb4c4, { pos: [0, 0.18, 0.3], seg: 12, outline: false }); // wet patch
  p.round(0.34, 1.5, 0.34, 0xb9b6c9, { pos: [0, 0.9, -0.7], r: 0.08 });
  p.round(0.5, 0.14, 0.5, C.steel, { pos: [0, 1.68, -0.7], r: 0.05 });
  p.tube([0, 1.2, -0.7], [0, 1.2, -0.28], 0.07, C.brass, { seg: 6 });
  p.cyl(0.06, 0.06, 0.2, C.brass, { pos: [0, 1.1, -0.28], seg: 5 });
  p.ball(0.1, C.bestRed, { pos: [0, 1.36, -0.5], w: 6, h: 4 });                    // tap handle
  // buckets (plastic), a steel handi and a brass kalash
  const bucket = (x, z, c) => { p.lathe([[0.001, 0], [0.3, 0], [0.42, 0.7], [0.4, 0.74]], c, { pos: [x, 0.16, z], seg: 9 }); p.add(new THREE.TorusGeometry(0.4, 0.025, 4, 12, Math.PI), C.steelDark, { pos: [x, 0.9, z], outline: false }); };
  bucket(0, 0.1, C.sky); bucket(0.95, 0.5, C.bestRed); bucket(-0.95, 0.3, C.yellow);
  p.lathe([[0.001, 0], [0.3, 0.02], [0.4, 0.3], [0.2, 0.6], [0.22, 0.78], [0.3, 0.84]], C.brass, { pos: [-0.5, 0.16, 0.9], seg: 9 });
  p.lathe([[0.001, 0], [0.32, 0.02], [0.4, 0.4], [0.36, 0.44]], C.steel, { pos: [0.5, 0.16, 0.95], seg: 9 });
  p.cyl(0.14, 0.12, 0.16, C.cream, { pos: [1.1, 0.25, -0.2], seg: 6 }); // soap
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.8 }));
  const drop = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), new THREE.MeshBasicMaterial({ color: 0x6fb7e0 }));
  drop.layers.set(OVERLAY_LAYER); g.add(drop);
  let t = 0;
  g.userData.animate = (dt) => { t += dt; const u = (t * 1.6) % 1; drop.position.set(0, 1.0 - u * u * 0.8, -0.1 - 0.0); drop.scale.set(1, 1 + u, 1); drop.visible = u < 0.95; };
  return finish(g, { footprint: { w: 3.0, l: 3.0 }, colliders: [{ x: 0, z: -0.7, radius: 0.35, height: 1.7 }, { x: 0, z: 0.2, radius: 0.5, height: 0.8 }] });
}

/** Rangoli ground decal: seeded patterns 0..3 (lotus, star, dot-kolam, peacock fan). opts {seed, size=2.4}. */
export function createRangoli(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { seed: ink }; ink = undefined; }
  const seed = opts.seed ?? 1, size = opts.size ?? 2.4;
  const kind = ((seed % 4) + 4) % 4;
  const r = rng(seed * 53 + 7);
  const N = 512, c0 = N / 2;
  const pal = [['#e8456b', '#f6d65e', '#fbf8ee', '#3fae8d', '#8b5bd0'], ['#f4a05a', '#e8456b', '#fbf8ee', '#4ea6d8', '#f6d65e'], ['#fbf8ee', '#f4a0b8', '#f6d65e', '#7ac28b', '#e8456b']][seed % 3];
  const cv = paintCanvas(N, N, (ctx) => {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const dot = (x, y, rad, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, rad, 0, TAU); ctx.fill(); };
    const petal = (a, len, w, col, off = 20) => {
      ctx.save(); ctx.translate(c0, c0); ctx.rotate(a); ctx.fillStyle = col; ctx.strokeStyle = 'rgba(43,36,64,0.55)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(off, 0); ctx.quadraticCurveTo(off + len * 0.5, -w, off + len, 0); ctx.quadraticCurveTo(off + len * 0.5, w, off, 0); ctx.fill(); ctx.stroke(); ctx.restore();
    };
    ctx.save(); ctx.beginPath(); ctx.arc(c0, c0, 246, 0, TAU); ctx.clip();
    if (kind === 0) { // lotus
      for (let i = 0; i < 16; i++) petal((i / 16) * TAU, 210, 38, pal[i % 2 ? 0 : 1], 40);
      for (let i = 0; i < 12; i++) petal((i / 12) * TAU + 0.26, 140, 30, pal[2], 30);
      for (let i = 0; i < 8; i++) petal((i / 8) * TAU, 80, 24, pal[3], 10);
      dot(c0, c0, 26, pal[1]);
      for (let i = 0; i < 24; i++) dot(c0 + Math.cos((i / 24) * TAU) * 232, c0 + Math.sin((i / 24) * TAU) * 232, 7, pal[2]);
    } else if (kind === 1) { // interlocking star
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = pal[k]; ctx.strokeStyle = 'rgba(43,36,64,0.6)'; ctx.lineWidth = 3; ctx.beginPath();
        const R = 230 - k * 55, n = 8 - k * 0;
        for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * TAU + k * 0.2, rr = i % 2 ? R * 0.5 : R; ctx.lineTo(c0 + Math.cos(a) * rr, c0 + Math.sin(a) * rr); }
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }
      dot(c0, c0, 30, pal[4]); dot(c0, c0, 14, pal[2]);
      for (let i = 0; i < 16; i++) dot(c0 + Math.cos((i / 16) * TAU) * 240, c0 + Math.sin((i / 16) * TAU) * 240, 9, pal[(i % 3) + 1]);
    } else if (kind === 2) { // dot kolam with loops
      const step = 56;
      for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) { if (Math.abs(i) + Math.abs(j) > 5) continue; dot(c0 + i * step, c0 + j * step, 7, pal[2]); }
      ctx.lineWidth = 9; ctx.strokeStyle = pal[0];
      for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const a = (i / 40) * TAU, rr = 90 + Math.sin(a * 4 + k) * 36 + k * 30; ctx.lineTo(c0 + Math.cos(a) * rr, c0 + Math.sin(a) * rr); } ctx.closePath(); ctx.strokeStyle = pal[k % 5]; ctx.stroke(); }
      dot(c0, c0, 18, pal[1]);
    } else { // peacock fan
      for (let i = 0; i < 9; i++) { const a = -Math.PI * 0.95 + (i / 8) * Math.PI * 0.9; ctx.save(); ctx.translate(c0, c0 + 90); ctx.rotate(a + Math.PI / 2); petal(0, 200, 44, pal[i % 2 ? 3 : 4], 0); ctx.restore(); ctx.save(); ctx.translate(c0, c0 + 90); ctx.rotate(a + Math.PI / 2); dot(210, 0, 17, pal[1]); dot(210, 0, 7, pal[0]); ctx.restore(); }
      ctx.fillStyle = pal[4]; ctx.beginPath(); ctx.ellipse(c0, c0 + 120, 60, 80, 0, 0, TAU); ctx.fill(); dot(c0, c0 + 60, 28, pal[4]); dot(c0 + 8, c0 + 56, 4, pal[2]);
      for (let i = 0; i < 18; i++) dot(c0 + (r() - 0.5) * 400, c0 + 200 + (r() - 0.5) * 70, 6, pal[(i % 4) + 1]);
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(43,36,64,0.5)'; ctx.lineWidth = 4;
    ctx.beginPath(); for (let i = 0; i <= 40; i++) { const a = (i / 40) * TAU; ctx.lineTo(c0 + Math.cos(a) * (246 + r() * 3), c0 + Math.sin(a) * (246 + r() * 3)); } ctx.closePath(); ctx.stroke();
  });
  const g = new THREE.Group();
  g.add(groundDecal(cv, size, size));
  g.userData.seed = seed;
  return finish(g, { footprint: { w: size, l: size }, colliders: [] });
}

/** Bonalu / Bathukamma festival poster on a bamboo easel with a marigold garland and a diya. ~3 x 1.2 x 3.8 */
export function createGanpatiPoster(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  for (const sx of [-1, 1]) { p.tube([sx * 1.1, 0, -0.35], [sx * 1.05, 3.5, 0.0], 0.06, 0xd9c67e, { seg: 5 }); p.tube([sx * 1.1, 0, 0.5], [sx * 1.05, 1.3, 0.1], 0.05, 0xd9c67e, { seg: 5, outline: false }); }
  p.box(2.3, 0.09, 0.12, 0xd9c67e, { pos: [0, 3.35, 0.0] });
  p.box(2.3, 0.09, 0.12, 0xd9c67e, { pos: [0, 0.45, 0.0] });
  for (let i = 0; i < 13; i++) p.ball(0.14, i % 2 ? C.marigold : 0xf6a634, { pos: [-1.05 + i * 0.175, 3.3 - Math.sin((i / 12) * Math.PI) * 0.0, 0.1], w: 5, h: 4, outline: false });
  for (let i = 0; i < 9; i++) { const u = i / 8; p.ball(0.12, i % 2 ? 0xe8456b : C.marigold, { pos: [-1.05 + u * 2.1, 0.4 - Math.sin(u * Math.PI) * 0.25, 0.15], w: 5, h: 4, outline: false }); }
  // diya on a little brass plate
  p.cyl(0.35, 0.35, 0.04, C.brass, { pos: [0, 0.04, 1.0], seg: 10 }); p.lathe([[0.001, 0], [0.16, 0.03], [0.2, 0.1], [0.14, 0.12]], C.terracotta, { pos: [0, 0.07, 1.0], seg: 8 });
  p.cone(0.05, 0.16, 0xffc94a, { pos: [0, 0.27, 1.0], seg: 5, outline: false });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.8 }));
  const d = plaque(ink, 2.1, 2.7, (ctx, w, h) => {
    const r = rng(11);
    const gr = ctx.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#e8456b'); gr.addColorStop(0.55, '#f6a634'); gr.addColorStop(1, '#f6d343');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 14; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.5); const a = (i / 14) * TAU, b = ((i + 1) / 14) * TAU; ctx.lineTo(w / 2 + Math.cos(a) * w, h * 0.5 + Math.sin(a) * w); ctx.lineTo(w / 2 + Math.cos(b) * w, h * 0.5 + Math.sin(b) * w); ctx.fill(); }
    // a Bathukamma flower stack (concentric bands) beside a decorated Bonalu pot with neem leaves and a lamp
    const bands = ['#f6a634', '#e0453f', '#fffaf0', '#4fb3a8', '#f6d343'];
    bands.forEach((c, i) => { ctx.fillStyle = c; ctx.strokeStyle = INK; ctx.lineWidth = 3.5; const bw = w * (0.3 - i * 0.045), by = h * (0.62 - i * 0.06); ctx.beginPath(); ctx.ellipse(w * 0.3, by, bw, h * 0.045, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#f6c62d'; ctx.beginPath(); ctx.moveTo(w * 0.3 - 14, h * 0.4); ctx.lineTo(w * 0.3, h * 0.34); ctx.lineTo(w * 0.3 + 14, h * 0.4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c9704e'; ctx.beginPath(); ctx.ellipse(w * 0.72, h * 0.56, w * 0.14, h * 0.1, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f6c62d'; ctx.fillRect(w * 0.58, h * 0.55, w * 0.28, 12); ctx.fillStyle = '#d9372c'; ctx.fillRect(w * 0.6, h * 0.58, w * 0.24, 8);
    ctx.fillStyle = '#5aa84a'; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(w * (0.6 + i * 0.04), h * 0.45, 8, 20, (i - 3) * 0.3, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle = '#ffd36a'; ctx.beginPath(); ctx.ellipse(w * 0.72, h * 0.4, 8, 14, 0, 0, TAU); ctx.fill();
    for (let i = 0; i < 9; i++) { ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(w * 0.08 + i * (w * 0.84 / 8), h * 0.2 + Math.sin(i / 8 * Math.PI) * 14, 9, 0, TAU); ctx.fill(); ctx.stroke(); }
    hand(ctx, 'బోనాలు · బతుకమ్మ', w / 2, h * 0.09, { size: w * 0.105, fill: '#fff4d2', stroke: '#9c1f1a', sw: 5, seed: 6, maxW: w * 0.92 });
    hand(ctx, 'శుభాకాంక్షలు', w / 2, h * 0.87, { size: w * 0.14, fill: '#fff4d2', stroke: INK, sw: 5, seed: 3, maxW: w * 0.92 });
    hand(ctx, 'HAPPY BONALU · BATHUKAMMA', w / 2, h * 0.96, { size: w * 0.065, fill: '#fff4d2', seed: 4, maxW: w * 0.94 });
  }, { ppu: 140, depth: 0.06, thickness: 1.8, frame: 0xd9372c });
  d.position.set(0, 1.9, 0.08);
  g.add(d);
  return finish(g, { footprint: { w: 3.0, l: 2.4 }, colliders: [{ x: -1.1, z: 0, radius: 0.2, height: 3.5 }, { x: 1.1, z: 0, radius: 0.2, height: 3.5 }] });
}

/** Rain puddle decal with a sky reflection and ripples; seeded outline. opts {seed, size=2.2}. */
export function createPuddle(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { seed: ink }; ink = undefined; }
  const seed = opts.seed ?? 1, size = opts.size ?? 2.2;
  const r = rng(seed * 29 + 3);
  const N = 256;
  const cv = paintCanvas(N, N, (ctx) => {
    const pts = Array.from({ length: 11 }, (_, i) => { const a = (i / 11) * TAU; const rr = 82 + r() * 40; return [N / 2 + Math.cos(a) * rr * 1.15, N / 2 + Math.sin(a) * rr * 0.8]; });
    drawShape(ctx, pts, { fill: 'rgba(170,205,232,0.78)', hatch: 'rgba(70,120,170,0.7)', w: N, h: N, r, amp: 3, lw: 3.4 });
    ctx.save(); ctx.beginPath(); ctx.ellipse(N / 2, N / 2, 100, 66, 0, 0, TAU); ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3;
    for (let i = 0; i < 3; i++) wobblyLine(ctx, [[N * (0.28 + i * 0.1), N * 0.42 + i * 12], [N * (0.4 + i * 0.1), N * 0.4 + i * 12], [N * (0.5 + i * 0.1), N * 0.43 + i * 12]], { r, amp: 2, lw: 3, color: 'rgba(255,255,255,0.85)' });
    ctx.restore();
    const rx = N * (0.4 + r() * 0.25), ry = N * (0.42 + r() * 0.15);
    for (let k = 1; k <= 3; k++) { ctx.strokeStyle = `rgba(43,36,64,${0.7 - k * 0.17})`; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.ellipse(rx, ry, 9 * k, 5 * k, 0, 0, TAU); ctx.stroke(); }
  });
  const g = new THREE.Group();
  g.add(groundDecal(cv, size, size));
  return finish(g, { footprint: { w: size, l: size }, colliders: [] });
}

// ---------------------------------------------------------------------------------------------------
// Temple
// ---------------------------------------------------------------------------------------------------
/** Row of brass temple bells hanging from a beam; they swing in turn. ~3.6 x 0.8 x 3 */
export function createTempleBells(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  for (const sx of [-1, 1]) p.cyl(0.08, 0.1, 2.9, C.woodDark, { pos: [sx * 1.75, 1.45, 0], seg: 6 });
  p.box(3.8, 0.14, 0.14, C.woodDark, { pos: [0, 2.9, 0] });
  p.box(3.9, 0.07, 0.26, C.marigold, { pos: [0, 3.0, 0], outline: false });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.6 }));
  const bells = [];
  for (let i = 0; i < 6; i++) {
    const piv = new THREE.Group(); piv.position.set(-1.4 + i * 0.56, 2.86, 0);
    const bp = new Mix(); const s = i === 2 || i === 3 ? 1.25 : 1;
    bp.tube([0, 0, 0], [0, -0.35 * s, 0], 0.015, C.ink ?? INKC, { seg: 3, outline: false });
    bp.lathe([[0.001, 0], [0.26 * s, 0.01], [0.2 * s, 0.22 * s], [0.12 * s, 0.4 * s], [0.001, 0.42 * s]], C.brass, { pos: [0, -0.8 * s, 0], seg: 9 });
    bp.ball(0.06 * s, 0x8a6a2a, { pos: [0, -0.85 * s, 0], w: 5, h: 4, outline: false });
    bp.tube([0, -0.85 * s, 0], [0, -1.3 * s, 0], 0.012, 0xe8456b, { seg: 3, outline: false });
    piv.add(meshOf(ink, bp, { spacing: 0.04, thickness: 1.2 })); g.add(piv); bells.push(piv);
  }
  let t = 0;
  g.userData.animate = (dt) => { t += dt; bells.forEach((b, i) => { const k = Math.max(0, Math.sin(t * 0.9 - i * 0.55)); b.rotation.z = Math.sin(t * 7 + i) * 0.22 * k * k; }); };
  return finish(g, { footprint: { w: 4.0, l: 1.0 }, colliders: [{ x: -1.75, z: 0, radius: 0.15, height: 3 }, { x: 1.75, z: 0, radius: 0.15, height: 3 }] });
}

/** Coconut + flower offering stall: coconuts, marigold garlands, thalis, incense, a saffron canopy. ~3.4 x 2.2 x 3.4 */
export function createOfferingStall(ink) {
  return mk(ink, (p, g) => {
    const r = mulberry32(14);
    p.round(3.0, 0.9, 1.1, C.terracotta, { pos: [0, 0.45, 0.2], r: 0.06 });
    p.round(3.1, 0.08, 1.2, C.woodLight, { pos: [0, 0.94, 0.2], r: 0.03 });
    for (const sx of [-1, 1]) p.cyl(0.06, 0.07, 3.2, C.woodDark, { pos: [sx * 1.55, 1.6, -0.4], seg: 5 });
    p.add(new THREE.BoxGeometry(3.6, 0.06, 1.8), C.marigold, { pos: [0, 3.15, 0.15], rot: [0.2, 0, 0] });
    for (let i = 0; i < 9; i++) p.cone(0.2, 0.34, i % 2 ? C.bestRed : C.cream, { pos: [-1.6 + i * 0.4, 2.85, 1.0], rot: [Math.PI, 0, 0], seg: 4, outline: false });
    // coconuts: husky brown with three eye dots + tuft
    for (let row = 0; row < 3; row++) for (let i = 0; i < 4 - row; i++) {
      const x = -1.3 + i * 0.5 + row * 0.25, y = 1.14 + row * 0.38;
      p.ball(0.24, 0x8a5e3e, { pos: [x, y, 0.3 + (r() - 0.5) * 0.1], scale: [1, 1.1, 1], w: 7, h: 5, outline: row === 0 });
      p.ball(0.07, 0xd9b27a, { pos: [x, y + 0.24, 0.3], w: 4, h: 3, outline: false });
    }
    // thalis with flowers, kumkum, incense, a lamp
    for (const [x, c] of [[0.6, C.marigold], [1.15, 0xe8456b], [0.9, 0xfbf8ee]]) {
      p.cyl(0.36, 0.3, 0.07, C.steel, { pos: [x, 1.0, 0.45 + (x === 0.9 ? 0.35 : 0)], seg: 10 });
      for (let k = 0; k < 6; k++) p.ball(0.11, c, { pos: [x + (r() - 0.5) * 0.4, 1.12 + r() * 0.1, 0.45 + (x === 0.9 ? 0.35 : 0) + (r() - 0.5) * 0.4], w: 5, h: 4, outline: false });
    }
    p.cyl(0.14, 0.18, 0.2, C.terracotta, { pos: [-0.2, 1.05, 0.9], seg: 8 }); // kumkum pot
    for (let k = 0; k < 5; k++) p.tube([-0.2, 1.15, 0.9], [-0.2 + (k - 2) * 0.05, 1.75, 0.9], 0.012, 0x6a4a3a, { seg: 3, outline: false });
    // long garlands hanging on the left
    for (const sx of [-1.3, -1.05, -0.8]) for (let i = 0; i < 10; i++) p.ball(0.09, i % 3 ? C.marigold : 0xe8456b, { pos: [sx, 2.9 - i * 0.18, 0.95], w: 5, h: 4, outline: false });
    sign(ink, g, 1.5, 0.6, (ctx, w, h) => { board(ctx, w, h, '#fff0cf', 'rgba(240,170,60,0.5)', 4); handRow(ctx, [{ text: 'కొబ్బరికాయ', size: h * 0.36, fill: '#a8552b' }, { text: 'పూలు', size: h * 0.4, fill: '#d9453b' }], w / 2, h * 0.6); hand(ctx, 'COCONUT · FLOWERS', w / 2, h * 0.9, { size: h * 0.15, fill: INK, seed: 7, maxW: w * 0.9 }); }, [0, 2.45, 1.05], 0, { ppu: 130 });
  }, { footprint: { w: 3.6, l: 2.6 }, colliders: [{ x: 0, z: 0.2, radius: 1.5, height: 1.2 }], thickness: 1.8 });
}

/** A row of chappals and shoes left outside the temple on a low plank. ~3.4 x 1.2 x 0.4 */
export function createChappalRow(ink, opts = {}) {
  return mk(ink, (p) => {
    const r = mulberry32(opts.seed ?? 9);
    p.box(3.6, 0.07, 0.9, C.woodDark, { pos: [0, 0.04, 0] });
    const cols = [C.bestRed, C.sky, C.marigoldY, C.leaf, C.pink, C.kaali, C.lilac, C.brass];
    for (let i = 0; i < 8; i++) {
      const x = -1.55 + i * 0.44, c = cols[Math.floor(r() * cols.length)], sh = r() > 0.78;
      const rot = (r() - 0.5) * 0.5;
      for (const dx of [-0.09, 0.09]) {
        p.round(0.14, sh ? 0.14 : 0.06, 0.4 + r() * 0.08, c, { pos: [x + dx, 0.13 + (sh ? 0.03 : 0), 0.0 + dx * (r() - 0.5) * 0.4], rot: [0, rot, 0], r: 0.025, outline: false });
        if (!sh) p.box(0.04, 0.05, 0.16, 0xf6efdc, { pos: [x + dx, 0.18, -0.02], rot: [0, rot, 0], outline: false });
      }
    }
  }, { footprint: { w: 3.8, l: 1.2 }, colliders: [], spacing: 0.05, thickness: 1.4 });
}

// ---------------------------------------------------------------------------------------------------
// Station
// ---------------------------------------------------------------------------------------------------
/** Metro platform timetable board on two posts: painted Telugu/English schedule. ~3.2 x 0.4 x 3.2 */
export function createTimetableBoard(ink) {
  const g = new THREE.Group();
  const p = new Mix();
  for (const sx of [-1, 1]) p.cyl(0.07, 0.09, 3.0, C.steelDark, { pos: [sx * 1.4, 1.5, 0], seg: 6 });
  p.round(3.2, 2.4, 0.18, 0x3a3350, { pos: [0, 2.1, 0], r: 0.06 });
  p.box(3.4, 0.14, 0.34, 0x2f7fb0, { pos: [0, 3.4, 0] });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.8 }));
  const cv = paintCanvas(512, 380, (ctx, w, h) => {
    ctx.fillStyle = '#fbf6e4'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#2f6fa0'; ctx.fillRect(0, 0, w, 62);
    hand(ctx, 'మెట్రో సమయాలు · METRO TIMETABLE', w / 2, 46, { size: 34, fill: '#fff8de', seed: 3, maxW: w * 0.94 });
    const rows = [['HITEC CITY → RAIDURG', 'F', ['05:12', '05:18', '05:24']], ['హైటెక్ సిటీ → అమీర్‌పేట్', 'S', ['05:20', '05:26', '05:32']], ['HITEC CITY → NAGOLE', 'S', ['05:28', '05:34', '05:40']], ['HITEC CITY → LB NAGAR', 'F', ['05:30', '05:36', '05:42']]];
    rows.forEach(([name, kind, times], i) => {
      const y = 100 + i * 66;
      ctx.fillStyle = kind === 'F' ? '#2f7fb0' : '#2f9d62'; ctx.beginPath(); ctx.arc(34, y - 12, 18, 0, TAU); ctx.fill();
      hand(ctx, kind === 'F' ? '1' : '2', 34, y - 2, { size: 26, fill: '#fff', seed: 2, jitter: 0.2 });
      hand(ctx, name, 66, y, { size: 24, fill: INK, align: 'left', seed: 4 + i, maxW: 250 });
      times.forEach((t, k) => hand(ctx, t, 330 + k * 62, y, { size: 22, fill: '#59527a', seed: 5, jitter: 0.3, weight: 'normal' }));
      ctx.strokeStyle = 'rgba(43,36,64,0.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, y + 16); ctx.lineTo(w - 20, y + 16); ctx.stroke();
    });
    hand(ctx, '1 = PLATFORM 1   2 = PLATFORM 2   ప్లాట్‌ఫాం', w / 2, h - 22, { size: 22, fill: '#8a6a52', seed: 8, weight: 'normal', maxW: w * 0.9 });
    ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.strokeRect(3, 3, w - 6, h - 6);
  });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 2.2), new THREE.MeshBasicMaterial({ map: toTexture(cv) }));
  face.position.set(0, 2.1, 0.1); face.layers.set(OVERLAY_LAYER); g.add(face);
  const back = face.clone(); back.rotation.y = Math.PI; back.position.z = -0.1; g.add(back);
  return finish(g, { footprint: { w: 3.4, l: 0.6 }, colliders: [{ x: -1.4, z: 0, radius: 0.2, height: 3 }, { x: 1.4, z: 0, radius: 0.2, height: 3 }, { x: 0, z: 0, radius: 0.3, height: 3 }] });
}

/** Fast / Slow indicator: a hanging panel with two lamp boxes that alternate. opts {mode:'auto'|'fast'|'slow'}. ~2.6 x 0.5 x 3.4 */
export function createFastSlowIndicator(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  p.cyl(0.08, 0.1, 3.0, C.steelDark, { pos: [0, 1.5, 0], seg: 6 });
  p.box(1.4, 0.1, 0.1, C.steelDark, { pos: [0, 3.0, 0] });
  p.round(2.6, 1.3, 0.3, 0x2c2742, { pos: [0, 2.4, 0.1], r: 0.08 });
  g.add(meshOf(ink, p, { spacing: 0.06, thickness: 1.6 }));
  const mkPanel = (label, dev, col, litCol) => paintCanvas(220, 180, (ctx, w, h, lit) => {});
  const cvs = ['fast', 'slow'].map((k) => paintCanvas(220, 200, (ctx, w, h) => {
    ctx.fillStyle = k === 'fast' ? '#2f7fb0' : '#37a56a'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 3; for (let x = -h; x < w + h; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - h, h); ctx.stroke(); }
    hand(ctx, k === 'fast' ? 'PLATFORM 1' : 'PLATFORM 2', w / 2, h * 0.5, { size: h * 0.25, fill: '#fff8de', stroke: INK, sw: 5, seed: 3, maxW: w * 0.9 });
    hand(ctx, k === 'fast' ? 'ప్లాట్‌ఫాం 1' : 'ప్లాట్‌ఫాం 2', w / 2, h * 0.86, { size: h * 0.2, fill: '#fff8de', seed: 6, maxW: w * 0.85 });
  }));
  const mats = cvs.map((cv) => new THREE.MeshBasicMaterial({ map: toTexture(cv), color: 0x777777 }));
  const panes = mats.map((m, i) => { const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.05), m); mesh.position.set((i - 0.5) * 1.25, 2.4, 0.27); mesh.layers.set(OVERLAY_LAYER); g.add(mesh); return mesh; });
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 3), new THREE.MeshBasicMaterial({ color: 0xffe27a }));
  arrow.rotation.z = Math.PI; arrow.position.set(0, 3.25, 0); arrow.layers.set(OVERLAY_LAYER); g.add(arrow);
  let t = opts.phase ?? 0;
  const set = (fast) => { mats[0].color.setHex(fast ? 0xffffff : 0x666666); mats[1].color.setHex(fast ? 0x666666 : 0xffffff); arrow.position.x = fast ? -0.62 : 0.62; };
  set(true);
  g.userData.animate = (dt) => { t += dt; if (opts.mode === 'fast') set(true); else if (opts.mode === 'slow') set(false); else set(Math.sin(t * 0.5) > 0); };
  g.userData.set = set;
  return finish(g, { footprint: { w: 2.8, l: 0.8 }, colliders: [{ x: 0, z: 0, radius: 0.25, height: 3 }, { x: 0, z: 0.1, radius: 1.2, height: 3.2 }] });
}

/** Platform Irani-chai & biscuit stall: steel kettle, tumblers, vada tray, red-white counter, hanging bananas. ~3 x 2.2 x 3.4 */
export function createPlatformChaiStall(ink) {
  return mk(ink, (p, g, anim) => {
    const r = mulberry32(17);
    p.round(2.8, 1.1, 1.3, C.bestRed, { pos: [0, 0.6, 0.2], r: 0.08 });
    p.round(3.0, 0.1, 1.5, C.steel, { pos: [0, 1.2, 0.2], r: 0.04 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.cyl(0.06, 0.07, 3.0, C.woodDark, { pos: [sx * 1.4, 1.5, sz * 0.7 + 0.2], seg: 5 });
    p.add(new THREE.BoxGeometry(3.3, 0.06, 1.9), 0x8ecfe0, { pos: [0, 3.05, 0.2], rot: [0.1, 0, 0] });
    p.add(new THREE.BoxGeometry(3.3, 0.18, 0.06), C.bestRed, { pos: [0, 2.9, 1.16] });
    // stove + kettle
    p.cyl(0.4, 0.45, 0.45, C.kaali, { pos: [-0.7, 1.45, 0.0], seg: 8 });
    p.lathe([[0.001, 0], [0.42, 0], [0.48, 0.45], [0.3, 0.7], [0.001, 0.7]], C.steel, { pos: [-0.7, 1.7, 0], seg: 9 });
    p.tube([-0.3, 2.0, 0], [-0.1, 1.75, 0.1], 0.06, C.steel, { seg: 5 });
    p.add(new THREE.TorusGeometry(0.28, 0.03, 4, 10, Math.PI), C.steelDark, { pos: [-0.7, 2.4, 0], rot: [0, 0, 0], outline: false });
    // glasses in a wire carrier, vada tray, biscuit jars
    for (let i = 0; i < 6; i++) p.cyl(0.07, 0.055, 0.2, 0xdff0f4, { pos: [0.3 + (i % 3) * 0.2, 1.35, 0.4 + Math.floor(i / 3) * 0.2], seg: 6, outline: false });
    for (let i = 0; i < 6; i++) p.ball(0.15, 0xe4a53a, { pos: [0.95 + (i % 3) * 0.3, 1.33, 0.1 + Math.floor(i / 3) * 0.3], scale: [1, 0.8, 1], w: 6, h: 4, outline: i < 3 });
    p.round(1.0, 0.05, 0.8, C.steel, { pos: [1.1, 1.26, 0.2], r: 0.02 });
    for (let i = 0; i < 3; i++) p.cyl(0.18, 0.18, 0.35, [C.yellow, C.pink, C.sky][i], { pos: [-1.0 + i * 0.4, 2.4, -0.55], seg: 8, outline: false });
    // hanging bananas
    for (let i = 0; i < 4; i++) p.add(new THREE.CylinderGeometry(0.035, 0.07, 0.4, 5), 0xf4d94e, { pos: [1.2 + i * 0.07, 2.7, 1.0], rot: [0.0, 0, (i - 1.5) * 0.12] });
    sign(ink, g, 2.2, 0.55, (ctx, w, h) => { board(ctx, w, h, '#fff2c2', 'rgba(240,190,70,0.5)', 9); handRow(ctx, [{ text: 'చాయ్', size: h * 0.46, fill: '#d9453b' }, { text: 'CHAI', size: h * 0.36, fill: INK }, { text: 'బిస్కెట్', size: h * 0.4, fill: '#d9453b' }, { text: '₹15', size: h * 0.4, fill: '#2f7a46' }], w / 2, h * 0.7); }, [0, 2.45, 1.2], 0, { ppu: 140 });
    const s = steam({ count: 3, height: 1.0, size: 0.55, drift: 0.2 }); s.position.set(-0.45, 2.45, 0.1); g.add(s);
    anim.push((dt, t) => s.userData.update(t));
  }, { footprint: { w: 3.4, l: 2.6 }, colliders: [{ x: 0, z: 0.2, radius: 1.5, height: 1.4 }], thickness: 1.8 });
}

// ---------------------------------------------------------------------------------------------------
// Extras
// ---------------------------------------------------------------------------------------------------
/** A knot of plastic stools in mixed colours (+ an upturned crate as a table). opts {count=4, seed=1}. */
export function createStoolCluster(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { count: ink }; ink = undefined; }
  const n = opts.count ?? 4, r = mulberry32((opts.seed ?? 1) * 17 + 3);
  const cols = [C.bestRed, C.sky, C.yellow, C.green, C.pink, C.orange, C.lilac];
  const cols_ = [];
  const colliders = [{ x: 0, z: 0, radius: 0.5, height: 0.6 }];
  return mk(ink, (p) => {
    p.round(0.9, 0.5, 0.7, C.sky, { pos: [0, 0.27, 0], r: 0.06, rot: [0, r(), 0] });
    p.box(1.0, 0.06, 0.8, 0xf6efe0, { pos: [0, 0.54, 0] });
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + r() * 0.5, d = 0.95 + r() * 0.3, x = Math.cos(a) * d, z = Math.sin(a) * d;
      const c = cols[Math.floor(r() * cols.length)];
      p.cyl(0.3, 0.27, 0.08, c, { pos: [x, 0.46, z], seg: 10 });
      for (let k = 0; k < 4; k++) { const b = (k / 4) * TAU + 0.4; p.tube([x + Math.cos(b) * 0.18, 0.44, z + Math.sin(b) * 0.18], [x + Math.cos(b) * 0.27, 0.0, z + Math.sin(b) * 0.27], 0.035, c, { seg: 4, outline: false }); }
      colliders.push({ x, z, radius: 0.32, height: 0.5 });
    }
    cols_.push(1);
  }, { footprint: { w: 3.0, l: 3.0 }, colliders, spacing: 0.05, thickness: 1.6 });
}

/** A pyramid of plastic crates with a tarp thrown over one corner. opts {seed=1}. ~2.4 x 1.6 x 1.7 */
export function createCrateStack(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { seed: ink }; ink = undefined; }
  const r = mulberry32((opts.seed ?? 1) * 31 + 7);
  const cols = [C.sky, C.yellow, C.pink, C.green, C.bestRed, C.orange];
  return mk(ink, (p) => {
    const crate = (x, y, z, c, ry) => {
      p.round(0.95, 0.5, 0.7, c, { pos: [x, y + 0.26, z], rot: [0, ry, 0], r: 0.06 });
      for (let k = 0; k < 3; k++) p.box(0.9, 0.06, 0.04, 0x4a4360, { pos: [x + Math.sin(ry) * 0.36, y + 0.17 + k * 0.13, z + Math.cos(ry) * 0.36], rot: [0, ry, 0], outline: false });
    };
    for (let i = 0; i < 3; i++) crate(-1.0 + i * 1.05, 0, 0, cols[Math.floor(r() * 6)], (r() - 0.5) * 0.25);
    for (let i = 0; i < 2; i++) crate(-0.5 + i * 1.05, 0.5, 0.0, cols[Math.floor(r() * 6)], (r() - 0.5) * 0.25);
    crate(0.0, 1.0, 0.02, cols[Math.floor(r() * 6)], (r() - 0.5) * 0.25);
    crate(1.9, 0, 0.45, cols[Math.floor(r() * 6)], 0.5);
    p.add(new THREE.ConeGeometry(0.9, 0.9, 4), 0x5a8fc4, { pos: [-1.1, 0.95, 0.15], scale: [1, 0.7, 1], rot: [0, 0.8, 0.0] }); // tarp lump
    p.box(0.9, 0.04, 0.9, 0x4a7fb4, { pos: [-1.0, 0.65, 0.1], rot: [0.1, 0.3, 0.2], outline: false });
  }, { footprint: { w: 4.6, l: 1.8 }, colliders: [{ x: -0.5, z: 0, radius: 1.2, height: 1.6 }, { x: 0.8, z: 0, radius: 0.8, height: 1.2 }, { x: 1.9, z: 0.45, radius: 0.55, height: 0.6 }], spacing: 0.06, thickness: 1.7 });
}
