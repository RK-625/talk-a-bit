/**
 * mumbai/props/vehicles.js: kaali-peeli taxi, BEST double-decker, auto-rickshaw, dabbawala cycle, local train
 * cars, track segments and a level-crossing barrier.
 *
 * Every factory: createX(ink, opts?) -> THREE.Group. Local frame: y up, base (ground contact) at y=0, front = +z.
 * group.userData = { footprint:{w,l}, colliders:[{x,z,radius,height}], ... }
 * Vehicles also have userData.wheels (meshes to spin), userData.body (the bouncing sub-group) and
 * userData.animate(dt, speed): spins wheels by speed*dt/radius (speed in units/s, + = forward), bounces the body,
 * wobbles small details (taxi/auto: idle engine shiver; bicycle: pedals; train: bogie wheels).
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, plateDecal, plateText, hand, handRow, boardRect, paintCanvas, finish, rig, wheelMesh, cycleWheel,
  eyes, smile, blush, texMat, rng, mulberry32, drawShape, wobblyLine, INK, resolveInk, plainMesh, glowMat,
} from './kit.js';

const TAU = Math.PI * 2;
const place = (obj, [x, y, z], rotY = 0) => { obj.position.set(x, y, z); obj.rotation.y = rotY; return obj; };

// =====================================================================================================
// Kaali-peeli Premier Padmini taxi
// =====================================================================================================
export function createTaxi(ink, opts = {}) {
  const seed = opts.seed ?? 7;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  // lower black body: rounded side profile (z,y): trunk, shoulder, bonnet
  p.side([[-2.5, 0.5], [-2.55, 1.2], [-2.0, 1.52], [-1.2, 1.55], [1.3, 1.55], [2.1, 1.48], [2.55, 1.2], [2.58, 0.55], [2.2, 0.42], [-2.1, 0.42]], 2.3, C.kaali, { bevel: 0.07, round: 0.3 });
  // wheel arches (darker discs) so the tyres tuck in
  for (const sx of [-1, 1]) for (const z of [-1.65, 1.7]) p.cyl(0.62, 0.62, 0.06, 0x2a2438, { rot: [0, 0, Math.PI / 2], pos: [sx * 1.17, 0.55, z], seg: 12, outline: false });
  // butter-yellow cabin
  p.side([[-1.65, 1.5], [-1.25, 2.3], [0.75, 2.3], [1.35, 1.5]], 2.0, C.peeli, { bevel: 0.06, round: 0.35 });
  p.round(2.18, 0.14, 2.2, C.peeli, { pos: [0, 2.34, -0.25], r: 0.06 });
  // glass: side band (sticks out sideways), windscreen and rear window (stick out front/back)
  p.side([[-1.28, 1.7], [-0.95, 2.2], [0.55, 2.2], [1.0, 1.7]], 2.08, C.glass, { bevel: 0.02, round: 0.1 });
  p.side([[-1.58, 1.5], [-1.24, 2.27], [0.78, 2.27], [1.32, 1.5]], 1.62, C.glass, { bevel: 0.02, round: 0.05 });
  // pillars over the side glass
  for (const z of [-0.95, 0.12]) p.box(2.14, 0.6, 0.12, C.peeli, { pos: [0, 1.98, z], outline: false });
  // door lines + handles
  for (const sx of [-1, 1]) {
    for (const z of [-0.95, 0.12, 1.2]) p.box(0.04, 0.8, 0.05, INKC, { pos: [sx * 1.18, 1.0, z], outline: false });
    for (const z of [-0.2, 0.9]) p.box(0.07, 0.07, 0.3, C.steel, { pos: [sx * 1.21, 1.42, z], outline: false });
    // wing mirror
    p.box(0.3, 0.2, 0.06, C.peeli, { pos: [sx * 1.28, 1.72, 1.1] });
    p.tube([sx * 1.1, 1.6, 1.15], [sx * 1.25, 1.72, 1.1], 0.03, C.steel, { outline: false });
    // tail lights
    p.round(0.14, 0.34, 0.1, C.bestRed, { pos: [sx * 0.95, 1.2, -2.58], r: 0.04, outline: false });
    // bumpers' end caps
    p.round(0.2, 0.2, 0.25, C.steel, { pos: [sx * 1.12, 0.72, 2.6], r: 0.07 });
  }
  // bumpers
  p.round(2.4, 0.15, 0.2, C.steel, { pos: [0, 0.72, 2.64], r: 0.06 });
  p.round(2.4, 0.15, 0.2, C.steel, { pos: [0, 0.72, -2.64], r: 0.06 });
  // face in the headlights: happy eyes + smiley grille, blush
  eyes(p, { x: 0.78, y: 1.2, z: 2.52, r: 0.27, look: [0.1, 0.12] });
  smile(p, { y: 0.84, z: 2.6, R: 0.34, t: 0.045 });
  p.box(0.5, 0.05, 0.05, C.steelDark, { pos: [0, 1.05, 2.6], outline: false });
  blush(p, { x: 1.02, y: 0.98, z: 2.58, r: 0.12 });
  // yellow bonnet stripe + boot lid line
  p.box(0.06, 0.03, 1.2, C.butter, { pos: [0, 1.57, 1.55], outline: false });
  p.box(1.5, 0.03, 0.05, INKC, { pos: [0, 1.57, -2.0], outline: false });
  // roof sign "TAXI" box
  p.round(1.0, 0.32, 0.46, C.cream, { pos: [0, 2.58, -0.1], r: 0.08 });
  // a little luggage strap rack (cute)
  for (const z of [-0.95, 0.35]) p.box(1.9, 0.04, 0.05, C.woodDark, { pos: [0, 2.43, z - 0.1], outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.1 }), { name: 'taxi-body' }));

  // painted plates / sign
  const plate = plateText(seed);
  const pf = place(plateDecal(ink, plate, { w: 0.95, h: 0.28 }), [0, 0.5, 2.7]);
  const pb = place(plateDecal(ink, plate, { w: 0.95, h: 0.28 }), [0, 1.05, -2.68], Math.PI);
  const signFront = signTaxiFace(ink); signFront.position.set(0, 2.58, 0.14); body.add(signFront);
  const signBack = signTaxiFace(ink); signBack.position.set(0, 2.58, -0.34); signBack.rotation.y = Math.PI; body.add(signBack);
  body.add(pf, pb);
  // side door text "TAXI" small, painted
  for (const sx of [-1, 1]) {
    const d = plaque(ink, 0.9, 0.3, (ctx, w, h) => {
      boardRect(ctx, 4, 4, w - 8, h - 8, { fill: '#fff4c2', hatch: 'rgba(230,180,60,0.5)', cw: w, ch: h, r: rng(3 + sx), lw: 3, round: 8 });
      hand(ctx, 'TAXI', w * 0.5, h * 0.7, { size: h * 0.62, fill: INK, seed: 2 });
    }, { ppu: 150, depth: 0.03, thickness: 1.4 });
    d.position.set(sx * 1.2, 1.12, -0.45); d.rotation.y = sx * Math.PI / 2; body.add(d);
  }

  // wheels
  const wheels = [];
  for (const sx of [-1, 1]) for (const z of [-1.65, 1.7]) {
    const w = wheelMesh(ink, 0.52, 0.34); w.position.set(sx * 1.08, 0.52, z); g.add(w); wheels.push({ mesh: w, r: 0.52 });
  }
  g.userData.plate = plate;
  rig(g, { body, wheels, bounce: 0.03, pitch: 0.007, idle: 0.008 });
  return finish(g, {
    footprint: { w: 2.6, l: 5.3 },
    colliders: [{ x: 0, z: 1.5, radius: 1.45, height: 2.4 }, { x: 0, z: -1.5, radius: 1.45, height: 2.4 }],
  });
}

function signTaxiFace(ink) {
  const g = new THREE.Group();
  const d = plaque(ink, 0.94, 0.28, (ctx, w, h) => {
    ctx.fillStyle = '#fffbe9'; ctx.fillRect(0, 0, w, h);
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#fff6cf', hatch: 'rgba(240,190,70,0.6)', cw: w, ch: h, lw: 4, round: 10 });
    hand(ctx, 'TAXI', w / 2, h * 0.76, { size: h * 0.78, fill: '#d9453b', stroke: INK, sw: 4, seed: 6 });
  }, { ppu: 180, depth: 0.03, thickness: 1.4, frame: 0xfff6cf });
  d.position.z = 0.24;
  g.add(d);
  return g;
}

// =====================================================================================================
// BEST red double-decker
// =====================================================================================================
export function createBus(ink, opts = {}) {
  const seed = opts.seed ?? 3;
  const route = opts.route ?? '123';
  const dest = opts.dest ?? 'COLABA';
  const destHi = opts.destHi ?? 'कुलाबा';
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const RED = C.bestRed;
  // lower + upper deck (the upper overhangs the open rear platform)
  p.round(3.1, 2.0, 9.0, RED, { pos: [0, 1.7, 0.45], r: 0.35, seg: 1 });
  p.round(3.12, 2.1, 9.7, RED, { pos: [0, 3.7, 0.0], r: 0.35, seg: 1 });
  p.round(2.9, 0.22, 9.4, C.cream, { pos: [0, 4.86, 0], r: 0.1 }); // roof
  p.box(3.18, 0.12, 9.6, C.cream, { pos: [0, 2.68, 0.0], outline: false }); // cream waist band
  // skirt (dark red bottom band)
  p.round(3.14, 0.3, 9.1, C.bestDark, { pos: [0, 0.85, 0.45], r: 0.1 });
  // windows: 6 per side per deck
  const wz = [-3.6, -2.2, -0.8, 0.6, 2.0, 3.4];
  for (const sx of [-1, 1]) {
    for (const z of wz) {
      p.box(0.07, 0.95, 1.1, C.glass, { pos: [sx * 1.58, 3.95, z + 0.2] });
      p.box(0.07, 0.9, 1.1, C.glass, { pos: [sx * 1.54, 1.95, z + 0.2], outline: false });
    }
    // passenger heads peeking from the top deck
    [[-2.2, C.skin2], [0.6, C.skin1], [3.4, C.skin3]].forEach(([z, col], i) => {
      p.ball(0.24, col, { pos: [sx * 1.54, 3.82 + (i % 2) * 0.05, z + 0.2], scale: [0.5, 1, 1], w: 8, h: 6, outline: false });
      p.ball(0.12, INKC, { pos: [sx * 1.6, 3.85, z + 0.12], scale: [0.3, 0.9, 0.9], w: 4, h: 3, outline: false });
    });
    // handle bars on lower windows (steel)
    p.box(0.05, 0.05, 8.0, C.steel, { pos: [sx * 1.6, 2.38, 0.0], outline: false });
  }
  // front: windscreens, face, board
  p.round(2.7, 0.95, 0.08, C.glass, { pos: [0, 3.95, 4.88], r: 0.04 });
  p.round(2.7, 0.9, 0.08, C.glass, { pos: [0, 1.95, 5.0], r: 0.04 });
  p.box(0.12, 0.95, 0.12, RED, { pos: [0, 3.95, 4.9], outline: false });
  p.box(0.12, 0.9, 0.12, RED, { pos: [0, 1.95, 5.0], outline: false });
  p.round(3.0, 0.2, 0.3, C.steel, { pos: [0, 0.82, 5.0], r: 0.08 }); // bumper
  eyes(p, { x: 0.98, y: 1.25, z: 5.0, r: 0.34, look: [0.12, 0.1] });
  smile(p, { y: 0.95, z: 5.06, R: 0.42, t: 0.055 });
  blush(p, { x: 1.35, y: 1.05, z: 5.04, r: 0.15 });
  // rear platform: floor, pole, step, rail
  p.round(2.9, 0.16, 1.1, C.bestDark, { pos: [0, 0.98, -4.6], r: 0.05 });
  p.round(2.7, 0.1, 0.5, C.steelDark, { pos: [0, 0.76, -5.15], r: 0.04 });
  p.cyl(0.07, 0.07, 3.4, C.steel, { pos: [1.15, 2.7, -4.7], seg: 6 });
  p.cyl(0.05, 0.05, 2.8, C.steel, { pos: [-1.15, 2.4, -4.9], seg: 6, outline: false });
  p.box(2.4, 0.06, 0.06, C.steel, { pos: [0, 1.7, -5.0], outline: false });
  // rear: dark inner wall of the platform + upper rear window
  p.box(3.0, 1.9, 0.1, C.bestDark, { pos: [0, 1.95, -4.05], outline: false });
  p.round(2.4, 0.8, 0.08, C.glass, { pos: [0, 3.9, -4.88], r: 0.04 });
  for (const sx of [-1, 1]) p.round(0.2, 0.35, 0.1, 0xf6d86a, { pos: [sx * 1.3, 3.0, -4.9], r: 0.05, outline: false });
  // rooftop vents
  p.round(0.9, 0.2, 1.3, C.cream, { pos: [0, 5.02, -1.5], r: 0.06 });
  p.round(0.9, 0.2, 1.3, C.cream, { pos: [0, 5.02, 1.8], r: 0.06 });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.12, thickness: 2.4 }), { name: 'bus-body' }));

  // painted bits
  const board = (w, h, cut) => plaque(ink, w, h, (ctx, cw, ch) => {
    boardRect(ctx, 5, 5, cw - 10, ch - 10, { fill: '#2f2a42', hatch: 'rgba(90,80,140,0.8)', cw, ch, lw: 4, round: 12, r: rng(seed + 2) });
    hand(ctx, route, cw * 0.12, ch * 0.72, { size: ch * 0.7, fill: '#ffe27a', seed: 3, align: 'center' });
    hand(ctx, dest, cw * 0.55, ch * 0.5, { size: ch * 0.45, fill: '#fffbe9', seed: 4 });
    hand(ctx, destHi, cw * 0.55, ch * 0.88, { size: ch * 0.34, fill: '#ffd1a1', seed: 5 });
    void cut;
  }, { ppu: 150, depth: 0.08, frame: 0x2f2a42, thickness: 1.6 });
  const fb = board(2.6, 0.55); fb.position.set(0, 4.42, 4.93); body.add(fb);
  const rb = board(1.6, 0.4); rb.position.set(0, 4.5, -4.93); rb.rotation.y = Math.PI; body.add(rb);
  for (const sx of [-1, 1]) {
    const sb = board(1.2, 0.45); sb.position.set(sx * 1.6, 2.38 - 0.0, 3.5); sb.rotation.y = sx * Math.PI / 2; sb.scale.set(0.8, 0.8, 1); body.add(sb);
    const ad = plaque(ink, 5.2, 0.62, (ctx, cw, ch) => {
      boardRect(ctx, 4, 4, cw - 8, ch - 8, { fill: '#fff3d0', hatch: 'rgba(235,180,90,0.55)', cw, ch, lw: 4, round: 16, r: rng(11 + sx) });
      handRow(ctx, [{ text: 'BEST', size: ch * 0.7, fill: '#d9453b', stroke: INK, sw: 5, seed: 8 }, { text: 'बेस्ट', size: ch * 0.5, fill: '#c4453f', seed: 1 }, { text: 'आपली बस · Ride the BEST!', size: ch * 0.46, fill: INK, seed: 9, weight: 'normal' }], cw / 2, ch * 0.74, { gap: 0.5 });
    }, { ppu: 120, depth: 0.05, frame: 0xfff3d0, thickness: 1.6 });
    ad.position.set(sx * 1.6, 1.1, 0.4); ad.rotation.y = sx * Math.PI / 2; body.add(ad);
  }
  const plate = plateText(seed + 1, '02');
  body.add(place(plateDecal(ink, plate, { w: 1.1, h: 0.32 }), [0, 0.6, 5.15]));
  body.add(place(plateDecal(ink, plate, { w: 1.1, h: 0.32 }), [0, 1.3, -5.0], Math.PI));

  const wheels = [];
  for (const [sx, z] of [[-1, 3.2], [1, 3.2], [-1, -2.5], [1, -2.5]]) {
    const w = wheelMesh(ink, 0.72, 0.42, { spokes: 4, seg: 12 }); w.position.set(sx * 1.32, 0.72, z); g.add(w); wheels.push({ mesh: w, r: 0.72 });
  }
  rig(g, { body, wheels, bounce: 0.035, pitch: 0.006, idle: 0.01 });
  return finish(g, {
    footprint: { w: 3.2, l: 10.2 },
    colliders: [3.6, 1.2, -1.2, -3.6].map((z) => ({ x: 0, z, radius: 1.65, height: 5 })),
  });
}

// =====================================================================================================
// Auto-rickshaw (open sides)
// =====================================================================================================
export function createAutoRickshaw(ink, opts = {}) {
  const seed = opts.seed ?? 5;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const GR = opts.top ?? 0xd3e46a;
  // black tub + yellow-green skin
  p.side([[-1.55, 0.55], [-1.6, 1.2], [-0.6, 1.3], [0.7, 1.3], [1.3, 1.1], [1.6, 0.8], [1.5, 0.45], [-1.2, 0.4]], 1.55, C.kaali, { bevel: 0.06, round: 0.25 });
  // front nose (rounded)
  p.ball(0.82, GR, { pos: [0, 1.2, 1.1], scale: [0.95, 0.85, 1.05], w: 12, h: 8 });
  // windscreen (tilted) + frame
  p.box(1.45, 0.95, 0.06, C.glass, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0] });
  p.box(1.55, 0.07, 0.08, C.kaali, { pos: [0, 1.5, 0.55], rot: [-0.22, 0, 0], outline: false });
  p.box(0.07, 0.95, 0.08, C.kaali, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0], outline: false });
  // pillars + roof (open sides)
  for (const sx of [-1, 1]) {
    p.tube([sx * 0.76, 1.3, 0.62], [sx * 0.76, 2.42, 0.46], 0.05, C.kaali, { seg: 5 });
    p.tube([sx * 0.78, 1.3, -1.45], [sx * 0.78, 2.42, -1.4], 0.05, C.kaali, { seg: 5 });
  }
  p.round(1.75, 0.16, 2.35, GR, { pos: [0, 2.48, -0.5], r: 0.07, seg: 2 });
  p.box(1.8, 0.07, 2.4, C.kaali, { pos: [0, 2.38, -0.5], outline: false });
  // passenger bench, backrest, driver seat
  p.round(1.35, 0.26, 0.7, C.maroon, { pos: [0, 1.4, -0.95], r: 0.08 });
  p.round(1.35, 0.7, 0.18, C.maroon, { pos: [0, 1.82, -1.4], r: 0.07, rot: [-0.1, 0, 0] });
  p.round(0.6, 0.22, 0.45, C.maroon, { pos: [0, 1.35, 0.15], r: 0.07 });
  // handlebar + column
  p.tube([0, 1.4, 0.85], [0, 1.8, 0.5], 0.04, C.steelDark, { seg: 5 });
  p.box(1.0, 0.06, 0.06, C.steelDark, { pos: [0, 1.82, 0.5], outline: false });
  for (const sx of [-1, 1]) p.ball(0.06, C.kaali, { pos: [sx * 0.5, 1.82, 0.5], outline: false, w: 5, h: 4 });
  // single big happy headlamp-eye + smile
  eyes(p, { x: 0, y: 1.3, z: 1.78, r: 0.3, flat: 0.6, look: [0.1, 0.15] });
  smile(p, { y: 0.88, z: 1.86, R: 0.3, t: 0.045 });
  // rear canopy flap + engine hump + tail light
  p.box(1.5, 0.95, 0.07, C.kaali, { pos: [0, 1.95, -1.65], rot: [0.05, 0, 0], outline: false });
  p.round(1.4, 0.35, 0.6, GR, { pos: [0, 1.0, -1.5], r: 0.1 });
  p.round(0.18, 0.2, 0.08, C.bestRed, { pos: [0.5, 1.15, -1.82], r: 0.03, outline: false });
  p.round(1.2, 0.12, 0.2, C.steel, { pos: [0, 0.5, 1.75], r: 0.05 });
  // roof lettering board
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'auto-body' }));
  const roofText = plaque(ink, 1.5, 0.3, (ctx, w, h) => {
    boardRect(ctx, 4, 4, w - 8, h - 8, { fill: '#fffbd4', hatch: 'rgba(200,210,100,0.6)', cw: w, ch: h, lw: 3, round: 8, r: rng(5) });
    hand(ctx, 'ऑटो · AUTO', w / 2, h * 0.72, { size: h * 0.6, fill: '#3f7a3f', seed: 3 });
  }, { ppu: 150, depth: 0.03, thickness: 1.4, frame: 0xfffbd4 });
  roofText.position.set(0, 2.5, 0.0); roofText.rotation.set(-1.42, 0, 0); roofText.position.y = 2.575;
  body.add(roofText);
  const plate = plateText(seed + 2, '02');
  body.add(place(plateDecal(ink, plate, { w: 0.8, h: 0.24 }), [0, 0.62, -1.85], Math.PI));
  body.add(place(plateDecal(ink, plate, { w: 0.75, h: 0.22 }), [0, 0.52, 1.86]));
  const wheels = [];
  const fw = wheelMesh(ink, 0.42, 0.26, { spokes: 4 }); fw.position.set(0, 0.42, 1.35); g.add(fw); wheels.push({ mesh: fw, r: 0.42 });
  for (const sx of [-1, 1]) { const w = wheelMesh(ink, 0.42, 0.26, { spokes: 4 }); w.position.set(sx * 0.82, 0.42, -0.95); g.add(w); wheels.push({ mesh: w, r: 0.42 }); }
  rig(g, { body, wheels, bounce: 0.03, pitch: 0.012, idle: 0.015 });
  return finish(g, { footprint: { w: 1.9, l: 3.6 }, colliders: [{ x: 0, z: 0.6, radius: 1.0, height: 2.4 }, { x: 0, z: -0.8, radius: 1.0, height: 2.4 }] });
}

// =====================================================================================================
// Dabbawala bicycle with a crate of tiffins
// =====================================================================================================
export function createDabbawalaBike(ink, opts = {}) {
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const R = 0.78;
  const rear = [0, R, -1.1], front = [0, R, 1.1], bb = [0, 0.62, -0.12], seat = [0, 1.75, -0.5], head = [0, 1.85, 0.8];
  const FR = C.bestRed;
  p.tube(rear, bb, 0.05, FR); p.tube(rear, seat, 0.045, FR); p.tube(bb, seat, 0.05, FR);
  p.tube(bb, head, 0.055, FR); p.tube(seat, head, 0.05, FR); p.tube(head, front, 0.045, C.steelDark);
  // handlebars, grips, bell
  p.tube([0, 2.0, 0.78], [0, 2.05, 0.7], 0.04, C.steelDark);
  p.tube([-0.5, 2.1, 0.62], [0.5, 2.1, 0.62], 0.035, C.steelDark);
  for (const sx of [-1, 1]) { p.ball(0.07, C.kaali, { pos: [sx * 0.52, 2.1, 0.62], w: 5, h: 4 }); p.tube([sx * 0.5, 2.1, 0.62], [sx * 0.3, 1.9, 0.82], 0.03, C.steelDark, { outline: false }); }
  p.ball(0.09, C.brass, { pos: [0.18, 2.17, 0.62], w: 6, h: 4 });
  // saddle
  p.round(0.28, 0.1, 0.55, C.kaali, { pos: [0, 1.85, -0.55], r: 0.04 });
  // headlamp with a little face
  p.ball(0.15, C.butter, { pos: [0, 1.9, 1.02], scale: [1, 1, 0.8], w: 8, h: 6 });
  p.ball(0.035, INKC, { pos: [-0.05, 1.92, 1.13], outline: false, w: 4, h: 3 });
  p.ball(0.035, INKC, { pos: [0.05, 1.92, 1.13], outline: false, w: 4, h: 3 });
  smile(p, { y: 1.78, z: 1.15, R: 0.05, t: 0.016 });
  // front basket with a cloth bag of tiffins
  p.round(0.6, 0.32, 0.5, C.woodLight, { pos: [0, 1.45, 1.15], r: 0.05 });
  p.cyl(0.12, 0.12, 0.34, C.steel, { pos: [-0.12, 1.75, 1.15], seg: 8 });
  p.cyl(0.12, 0.12, 0.34, C.steel, { pos: [0.14, 1.75, 1.18], seg: 8 });
  // mudguards
  for (const z of [-1.1, 1.1]) p.add(new THREE.TorusGeometry(R + 0.12, 0.025, 4, 14, Math.PI * 0.6), FR, { pos: [0, R, z], rot: [0, Math.PI / 2, Math.PI * 0.2], outline: false });
  // kickstand
  p.tube([0, 0.55, -0.7], [0.35, 0.0, -0.9], 0.03, C.steelDark, { outline: false });
  // rear carrier + crate + tiffin stack
  p.round(0.85, 0.07, 1.25, C.steelDark, { pos: [0, 1.3, -1.1], r: 0.03 });
  p.tube([0.38, 1.3, -1.1], [0, R, -1.1], 0.025, C.steelDark, { outline: false });
  p.tube([-0.38, 1.3, -1.1], [0, R, -1.1], 0.025, C.steelDark, { outline: false });
  // crate (open box made from slats)
  const cz = -1.1, cy = 1.35;
  for (const sx of [-1, 1]) p.box(0.07, 0.62, 0.95, C.wood, { pos: [sx * 0.42, cy + 0.32, cz] });
  for (const sz of [-1, 1]) p.box(0.9, 0.62, 0.07, C.woodDark, { pos: [0, cy + 0.32, cz + sz * 0.46] });
  // tiffins: 3 stacks (steel) with lids and wire handles
  [[-0.22, -0.2], [0.22, -0.22], [0.0, 0.2]].forEach(([x, z], i) => {
    for (let k = 0; k < 4; k++) p.cyl(0.17, 0.17, 0.2, k % 2 ? C.steel : 0xdde5ea, { pos: [x, cy + 0.16 + k * 0.21, cz + z], seg: 9 });
    p.cone(0.14, 0.12, C.steel, { pos: [x, cy + 1.03 + (i % 2) * 0.01, cz + z], seg: 9 });
    p.tube([x - 0.15, cy + 0.2, cz + z], [x - 0.12, cy + 1.03, cz + z], 0.012, C.kaali, { seg: 4, outline: false });
  });
  // white cloth wrap and a Mumbai tin-code on one tiffin
  p.box(0.9, 0.03, 0.97, C.cream, { pos: [0, cy + 0.04, cz], outline: false });
  // pedals' crank hub on frame
  p.cyl(0.1, 0.1, 0.18, C.steel, { pos: [0, 0.62, -0.12], rot: [0, 0, Math.PI / 2], seg: 8 });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.07, thickness: 2 }), { name: 'bike-body' }));

  // cranks (animated)
  const cp = new Mix();
  cp.tube([0.2, 0.62, -0.12], [0.2, 0.62, 0.25], 0.035, C.steelDark);
  cp.tube([-0.2, 0.62, -0.12], [-0.2, 0.62, -0.5], 0.035, C.steelDark);
  cp.box(0.2, 0.05, 0.16, C.kaali, { pos: [0.28, 0.62, 0.27] });
  cp.box(0.2, 0.05, 0.16, C.kaali, { pos: [-0.28, 0.62, -0.52] });
  const crank = meshOf(ink, cp, { spacing: 0.05, thickness: 1.4 });
  crank.position.set(0, 0.62, -0.12);
  // re-centre geometry on the crank axis
  crank.geometry.translate(0, -0.62, 0.12);
  crank.children.forEach((c) => { if (c.geometry) c.geometry.translate(0, -0.62, 0.12); });
  body.add(crank);

  const wheels = [];
  for (const z of [-1.1, 1.1]) { const w = cycleWheel(ink, R); w.position.set(0, R, z); g.add(w); wheels.push({ mesh: w, r: R }); }
  rig(g, { body, wheels, bounce: 0.012, pitch: 0.01, idle: 0.0, extra: (dt, t, speed) => { crank.rotation.x += (speed * dt) / R * 1.6; } });
  g.userData.crank = crank;
  return finish(g, { footprint: { w: 1.2, l: 3.2 }, colliders: [{ x: 0, z: 0.9, radius: 0.55, height: 2.2 }, { x: 0, z: -0.3, radius: 0.55, height: 2.2 }, { x: 0, z: -1.3, radius: 0.6, height: 2.2 }] });
}

// =====================================================================================================
// Local train
// =====================================================================================================
const LIVERY = {
  maroon: { upper: '#f8efd7', hatchU: 'rgba(214,190,140,0.55)', lower: '#b45068', hatchL: 'rgba(110,30,60,0.65)', accent: '#e9c58a', body: C.cream, base: C.maroon, roof: 0xe7e1d2, label: 'WR' },
  purple: { upper: '#fbe87c', hatchU: 'rgba(210,170,40,0.55)', lower: '#9b79cf', hatchL: 'rgba(70,40,130,0.65)', accent: '#fff2a8', body: C.butter, base: C.purple, roof: 0xe7e1d2, label: 'CR' },
};
const SKINS = ['#e9b58f', '#c98a62', '#a56a48', '#f1c9a5'];
const CLOTH = ['#f4a0b8', '#8fd3c6', '#f6cf5a', '#a9c8f0', '#c4b2ee', '#f4a05a', '#9fd68e'];

function warliFigure(ctx, x, y, s, r, { lean = 0, cloth = CLOTH[0], skin = SKINS[0], wave = false } = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(lean);
  const lw = Math.max(2, s * 0.06);
  // legs (sticks), two triangles, round head
  ctx.strokeStyle = INK; ctx.lineWidth = lw;
  wobblyLine(ctx, [[-s * 0.1, s * 0.0], [-s * 0.14, -s * 0.32], [-s * 0.12, -s * 0.5]], { r, amp: 1, lw });
  wobblyLine(ctx, [[s * 0.1, s * 0.0], [s * 0.14, -s * 0.3], [s * 0.18, -s * 0.5]], { r, amp: 1, lw });
  drawShape(ctx, [[-s * 0.2, -s * 0.46], [s * 0.2, -s * 0.46], [s * 0.04, -s * 0.78], [-s * 0.04, -s * 0.78]], { fill: cloth, hatch: 'rgba(60,40,80,0.5)', w: 512, h: 512, r, amp: 1, lw: lw * 0.8 });
  drawShape(ctx, [[-s * 0.3, -s * 1.12], [s * 0.3, -s * 1.12], [s * 0.04, -s * 0.78], [-s * 0.04, -s * 0.78]], { fill: cloth, hatch: 'rgba(60,40,80,0.5)', w: 512, h: 512, r, amp: 1, lw: lw * 0.8 });
  wobblyLine(ctx, [[-s * 0.3, -s * 1.1], [-s * 0.5, wave ? -s * 1.5 : -s * 0.9]], { r, amp: 1, lw });
  wobblyLine(ctx, [[s * 0.3, -s * 1.1], [s * 0.5, wave ? -s * 1.45 : -s * 0.9]], { r, amp: 1, lw });
  drawShape(ctx, Array.from({ length: 9 }, (_, i) => [Math.cos((i / 9) * TAU) * s * 0.2, -s * 1.34 + Math.sin((i / 9) * TAU) * s * 0.2]), { fill: skin, hatch: 'rgba(120,70,40,0.4)', w: 512, h: 512, r, amp: 1, lw: lw * 0.8 });
  ctx.fillStyle = INK;
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * s * 0.07, -s * 1.35, s * 0.025, 0, TAU); ctx.fill(); }
  ctx.restore();
}

function trainSideCanvas(L, isEngine, seed) {
  // 8 x 2.7 units -> 1280 x 432 px (160 px/unit)
  const W = 1280, H = 432;
  return paintCanvas(W, H, (ctx) => {
    const r = rng(seed * 13 + 1);
    // base fills
    ctx.fillStyle = L.upper; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.strokeStyle = L.hatchU; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.5;
    for (let x = -H; x < W + H; x += 9) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - H * 0.8, H); ctx.stroke(); }
    ctx.restore();
    // lower coloured band
    ctx.fillStyle = L.lower; ctx.fillRect(0, H * 0.78, W, H * 0.22);
    ctx.save(); ctx.strokeStyle = L.hatchL; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.rect(0, H * 0.78, W, H * 0.22); ctx.clip();
    for (let x = -H; x < W + H; x += 8) { ctx.beginPath(); ctx.moveTo(x, H * 0.78); ctx.lineTo(x - H * 0.3, H); ctx.stroke(); }
    ctx.restore();
    wobblyLine(ctx, [[0, H * 0.78], [W * 0.5, H * 0.785], [W, H * 0.78]], { r, lw: 3, amp: 1.5 });
    // window / door positions
    const doors = [W * 0.17, W * 0.5, W * 0.83];
    const dw = 150;
    const spans = [];
    let x0 = 22;
    for (const d of doors) { spans.push([x0, d - dw / 2 - 14]); x0 = d + dw / 2 + 14; }
    spans.push([x0, W - 22]);
    // windows with bars
    for (const [a, b] of spans) {
      const n = Math.max(1, Math.round((b - a) / 150));
      const ww = (b - a) / n;
      for (let i = 0; i < n; i++) {
        const x = a + i * ww + 6, w = ww - 12, y = H * 0.17, h = H * 0.42;
        drawShape(ctx, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fill: '#bfdce6', hatch: 'rgba(80,130,170,0.7)', w: W, h: H, r, amp: 2, lw: 3.4 });
        for (let k = 1; k < 4; k++) wobblyLine(ctx, [[x + (w * k) / 4, y + 3], [x + (w * k) / 4, y + h - 3]], { r, lw: 2.2, amp: 1 });
        // a couple of curious faces looking out of the windows
        if (r() < 0.45) {
          const fx = x + w * (0.3 + r() * 0.4);
          drawShape(ctx, Array.from({ length: 8 }, (_, j) => [fx + Math.cos((j / 8) * TAU) * 20, y + h * 0.62 + Math.sin((j / 8) * TAU) * 21]), { fill: SKINS[Math.floor(r() * 4)], hatch: 'rgba(120,70,40,0.4)', w: W, h: H, r, amp: 1, lw: 2.4 });
          ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(fx - 7, y + h * 0.6, 2.6, 0, TAU); ctx.arc(fx + 7, y + h * 0.6, 2.6, 0, TAU); ctx.fill();
        }
      }
    }
    // open doorways: dark interior, a bar, Warli passengers hanging out
    doors.forEach((d, di) => {
      const x = d - dw / 2, y = H * 0.1, w = dw, h = H * 0.68;
      drawShape(ctx, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fill: '#59527a', hatch: 'rgba(20,15,45,0.8)', w: W, h: H, r, amp: 2, lw: 4 });
      // inner crowd (smaller, paler)
      for (let k = 0; k < 2; k++) warliFigure(ctx, x + w * (0.3 + k * 0.4), y + h - 4, 62, r, { cloth: CLOTH[(di + k + 2) % 7], skin: SKINS[(di + k) % 4] });
      // vertical grab-pole
      wobblyLine(ctx, [[x + w - 12, y + 8], [x + w - 12, y + h + 20]], { r, lw: 5, amp: 1, color: '#c8d1d8' });
      wobblyLine(ctx, [[x + w - 12, y + 8], [x + w - 12, y + h + 20]], { r, lw: 2, amp: 1 });
    });
    // lettering
    hand(ctx, L.label, W * 0.335, H * 0.97, { size: H * 0.19, fill: '#fff8de', seed: 2 });
    hand(ctx, isEngine ? 'सामान्य · GENERAL' : 'महिला · LADIES', W * 0.66, H * 0.965, { size: H * 0.15, fill: '#fff8de', seed: 6 });
    hand(ctx, '' + (90000 + Math.floor(seed * 137) % 9000), W * 0.08, H * 0.965, { size: H * 0.14, fill: '#fff8de', seed: 4 });
    // little flower sticker on the lower band
    hand(ctx, '✿', W * 0.5, H * 0.98, { size: H * 0.13, fill: '#ffd1a1', seed: 3 });
  });
}

/**
 * One local-train car (~8 long, 3 wide, ~4 high). Chain cars by spacing them 8.3 apart along the track.
 * opts: { isEngine=false (cab front at +z with face + pantograph), livery:'maroon'|'purple', seed, crowd=true }
 */
export function createTrainCar(ink, opts = {}) {
  const isEngine = !!opts.isEngine;
  const seed = opts.seed ?? 1;
  const L = LIVERY[opts.livery ?? 'maroon'];
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const LEN = 8, HW = 1.5;
  // shell
  p.round(2.96, 2.9, LEN - 0.1, L.body, { pos: [0, 2.2, 0], r: 0.22, seg: 1 });
  p.round(3.0, 0.4, LEN - 0.05, L.base, { pos: [0, 0.95, 0], r: 0.1 });
  // arched roof
  p.add(new THREE.CylinderGeometry(1.0, 1.0, LEN - 0.2, 14, 1, false, Math.PI / 2, Math.PI), L.roof, { pos: [0, 3.62, 0], rot: [Math.PI / 2, 0, 0], scale: [1.5, 1, 0.5] });
  p.round(3.04, 0.12, LEN - 0.05, L.accent ? 0xe8e0cc : 0xe8e0cc, { pos: [0, 3.62, 0], r: 0.04, outline: false });
  // underframe + bogies
  p.box(2.2, 0.35, LEN - 1.2, 0x5b5470, { pos: [0, 0.62, 0], outline: false });
  for (const z of [-2.7, 2.7]) p.round(2.3, 0.28, 2.4, 0x4a4360, { pos: [0, 0.5, z], r: 0.06, outline: false });
  // roof furniture: vents; engine: pantograph
  for (const z of [-2.4, -0.6, 1.2]) p.round(0.7, 0.18, 0.8, 0xdad3c0, { pos: [0, 4.0, z], r: 0.06 });
  // buffers/couplers at both ends
  for (const sz of [-1, 1]) {
    for (const sx of [-0.8, 0.8]) p.cyl(0.14, 0.14, 0.3, C.steel, { pos: [sx, 1.0, sz * 4.08], rot: [Math.PI / 2, 0, 0], seg: 6 });
    p.cyl(0.1, 0.1, 0.5, C.steelDark, { pos: [0, 0.9, sz * 4.15], rot: [Math.PI / 2, 0, 0], seg: 6, outline: false });
  }
  if (isEngine) {
    // cab front: yellow face, windscreen, headlight-eyes, smile
    p.round(2.9, 2.6, 0.18, 0xf9e07a, { pos: [0, 2.3, 3.98], r: 0.1 });
    p.round(2.4, 0.95, 0.08, C.glass, { pos: [0, 3.0, 4.1], r: 0.05 });
    p.box(0.1, 1.0, 0.1, 0xf9e07a, { pos: [0, 3.0, 4.12], outline: false });
    eyes(p, { x: 0.82, y: 1.75, z: 4.08, r: 0.32, look: [0.1, 0.15] });
    smile(p, { y: 1.28, z: 4.12, R: 0.4, t: 0.05 });
    blush(p, { x: 1.28, y: 1.45, z: 4.1, r: 0.14 });
    // pantograph
    const A = [0, 4.1, -1.2], B = [0, 4.9, -0.4];
    p.tube(A, B, 0.04, C.kaali, { seg: 5 }); p.tube(B, [0, 4.15, 0.4], 0.04, C.kaali, { seg: 5 });
    p.box(1.7, 0.05, 0.12, C.kaali, { pos: [0, 4.95, -0.4] });
    p.tube([0, 4.9, -0.4], [0.0, 5.0, -0.4], 0.04, C.kaali, { seg: 4, outline: false });
  } else {
    // flat ends with a rubbery gangway frame
    for (const sz of [-1, 1]) {
      p.round(2.0, 2.4, 0.2, 0x4a4360, { pos: [0, 2.2, sz * 4.0], r: 0.12 });
      p.round(1.4, 2.0, 0.12, C.glassDark, { pos: [0, 2.25, sz * 4.1], r: 0.1, outline: false });
    }
  }
  // roof stripe + lettering rails
  for (const sx of [-1, 1]) p.box(0.04, 0.05, LEN - 0.4, L.base, { pos: [sx * 1.51, 3.55, 0], outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.12, thickness: 2.4 }), { name: 'train-body' }));

  // painted sides (lit ink material so they shade like the shell)
  const canvas = trainSideCanvas(L, isEngine, seed);
  const sideMat = texMat(ink, canvas, { spacing: 0.1, strength: 0.4 });
  for (const sx of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(LEN - 0.3, 2.7 * (LEN - 0.3) / 8 * 0.995), sideMat);
    m.position.set(sx * (HW + 0.012), 2.15, 0);
    m.rotation.y = sx * Math.PI / 2;
    m.receiveShadow = true;
    m.layers.enableAll();
    body.add(m);
  }
  // passengers hanging out of the doors: 3D heads, torsos, arms
  const pp = new Mix();
  const rr = mulberry32(seed * 91 + 5);
  const dz = [(0.17 - 0.5) * (LEN - 0.3), 0, (0.83 - 0.5) * (LEN - 0.3)];
  if (opts.crowd !== false) {
    for (const sx of [-1, 1]) {
      dz.forEach((z, i) => {
        if (i === 1 && sx === 1 && !isEngine) return; // not every door is crowded
        const skin = [C.skin1, C.skin2, C.skin3, C.skin4][Math.floor(rr() * 4)];
        const cloth = [C.pink, C.teal, C.marigoldY, C.sky, C.lilac][Math.floor(rr() * 5)];
        const zz = z + (i === 0 ? -0.05 : 0.0) + (rr() - 0.5) * 0.12;
        const lean = 0.38 + rr() * 0.2;
        // torso cone leaning out, head ball, arms to the pole
        pp.cone(0.42, 1.0, cloth, { pos: [sx * (HW + 0.18), 1.95, zz], rot: [0, 0, -sx * lean], seg: 7 });
        pp.ball(0.3, skin, { pos: [sx * (HW + 0.52), 2.58, zz], w: 8, h: 6 });
        pp.ball(0.05, INKC, { pos: [sx * (HW + 0.76), 2.62, zz - 0.1], outline: false, w: 4, h: 3 });
        pp.ball(0.05, INKC, { pos: [sx * (HW + 0.76), 2.62, zz + 0.1], outline: false, w: 4, h: 3 });
        pp.ball(0.09, 0xf49bb2, { pos: [sx * (HW + 0.72), 2.5, zz + 0.22], scale: [0.5, 0.6, 0.5], outline: false, w: 4, h: 3 });
        pp.tube([sx * (HW + 0.3), 2.25, zz + 0.1], [sx * (HW + 0.05), 2.6, zz + 0.62], 0.07, skin, { seg: 5 });
        pp.tube([sx * (HW + 0.3), 2.2, zz - 0.1], [sx * (HW + 0.1), 2.5, zz + 0.55], 0.07, skin, { seg: 5, outline: false });
        pp.cyl(0.05, 0.05, 2.6, C.steel, { pos: [sx * (HW + 0.08), 2.1, zz + 0.62], seg: 5, outline: false });
        if (rr() < 0.6) pp.ball(0.34, rr() < 0.5 ? C.kaali : C.maroon, { pos: [sx * (HW + 0.52), 2.72, zz], scale: [0.9, 0.5, 0.95], w: 8, h: 5, outline: false }); // hair
      });
    }
  }
  body.add(meshOf(ink, pp, { spacing: 0.06, thickness: 1.8 }));

  // bogie wheels (spin)
  const wheels = [];
  for (const bz of [-2.7, 2.7]) for (const dzz of [-0.55, 0.55]) for (const sx of [-1, 1]) {
    const w = wheelMesh(ink, 0.46, 0.18, { spokes: 2, tyre: 0x4a4360, hub: C.steel, seg: 9 });
    w.position.set(sx * 1.0, 0.46, bz + dzz); g.add(w); wheels.push({ mesh: w, r: 0.46 });
  }
  rig(g, { body, wheels, bounce: 0.012, pitch: 0.003, idle: 0.004 });
  g.userData.length = LEN;
  g.userData.spacing = 8.3; // distance between car centres when chained
  g.userData.isEngine = isEngine;
  return finish(g, { footprint: { w: 3.1, l: LEN }, colliders: [-2.8, 0, 2.8].map((z) => ({ x: 0, z, radius: 1.7, height: 4 })) });
}

// =====================================================================================================
// Track
// =====================================================================================================
export const TRACK = { gauge: 1.9, sleeperSpacing: 0.72, ballastW: 3.6, height: 0.55 };

/** Parts for the track (instanceable). Spans z in [-length/2, +length/2]; sleepers phase-locked so segments join. */
export function trackParts(length = 4) {
  const p = new Mix();
  const n = Math.max(1, Math.round(length / TRACK.sleeperSpacing));
  const sp = length / n;
  // ballast bed (trapezoid cross-section extruded along z)
  const s = new THREE.Shape([new THREE.Vector2(-TRACK.ballastW / 2, 0), new THREE.Vector2(TRACK.ballastW / 2, 0), new THREE.Vector2(TRACK.ballastW / 2 - 0.5, 0.26), new THREE.Vector2(-TRACK.ballastW / 2 + 0.5, 0.26)]);
  const bed = new THREE.ExtrudeGeometry(s, { depth: length, bevelEnabled: false });
  bed.translate(0, 0, -length / 2);
  p.add(bed, 0xd7cbb8, { outline: false });
  for (let i = 0; i < n; i++) {
    const z = -length / 2 + sp * (i + 0.5);
    p.box(2.7, 0.14, 0.3, C.woodDark, { pos: [0, 0.31, z], outline: false });
  }
  for (const sx of [-1, 1]) {
    p.box(0.13, 0.2, length, C.steelDark, { pos: [sx * TRACK.gauge / 2, 0.48, 0], outline: false });
    p.box(0.2, 0.06, length, C.steel, { pos: [sx * TRACK.gauge / 2, 0.59, 0], outline: false });
  }
  return p;
}

export function createTrackSegment(ink, length = 4) {
  const g = new THREE.Group();
  const m = meshOf(ink, trackParts(length), { spacing: 0.1, thickness: 1.6 });
  // outline hull only on bed ends would show seams: keep the single, soft outline from meshOf
  g.add(m);
  g.userData.length = length;
  return finish(g, { footprint: { w: TRACK.ballastW, l: length }, colliders: [] });
}

// =====================================================================================================
// Level-crossing barrier
// =====================================================================================================
export function createLevelCrossing(ink, opts = {}) {
  const reach = opts.reach ?? 4.6;
  const g = new THREE.Group();
  const p = new Mix();
  // post (cream and red), signal box with two flashing eyes, crossbuck sign
  p.round(0.7, 1.5, 0.7, C.cream, { pos: [0, 0.75, 0], r: 0.14 });
  p.round(0.74, 0.35, 0.74, C.bestRed, { pos: [0, 0.2, 0], r: 0.1 });
  p.cyl(0.12, 0.12, 2.9, C.steel, { pos: [-0.9, 1.45, 0], seg: 7 });
  p.round(1.0, 0.7, 0.4, C.kaali, { pos: [-0.9, 2.95, 0], r: 0.12 });
  smile(p, { x: -0.9, y: 2.72, z: 0.21, R: 0.15, t: 0.025 });
  p.box(0.9, 0.12, 0.05, C.white, { pos: [-0.9, 0.0 + 1.5, 0.0], outline: false });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.08 }), { name: 'xing-post' }));
  const sign = plaque(ink, 1.5, 0.9, (ctx, w, h) => {
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#fff7d6', hatch: 'rgba(230,180,80,0.5)', cw: w, ch: h, lw: 4, round: 10, r: rng(4) });
    hand(ctx, 'रेल्वे क्रॉसिंग', w / 2, h * 0.42, { size: h * 0.3, fill: '#d9453b', seed: 3 });
    hand(ctx, 'RAILWAY CROSSING', w / 2, h * 0.68, { size: h * 0.2, maxW: w * 0.86, fill: INK, seed: 2 });
    hand(ctx, 'सावधान · LOOK OUT', w / 2, h * 0.9, { size: h * 0.15, maxW: w * 0.86, fill: '#2f7a46', seed: 7, weight: 'normal' });
  }, { ppu: 150, depth: 0.05, thickness: 1.8 });
  sign.position.set(-0.9, 3.55, 0.04);
  g.add(sign);
  // the lamps (two red eyes on the signal box)
  const lampMats = [new THREE.MeshBasicMaterial({ color: 0x7a3030 }), new THREE.MeshBasicMaterial({ color: 0x7a3030 })];
  [-1, 1].forEach((s, i) => {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), lampMats[i]);
    l.position.set(-0.9 + s * 0.27, 3.05, 0.2);
    l.scale.z = 0.5;
    g.add(l);
  });
  // boom: pivot group so it can lift
  const boom = new THREE.Group();
  boom.position.set(0.25, 1.45, 0);
  const bp = new Mix();
  const segs = 8, sl = reach / segs;
  for (let i = 0; i < segs; i++) bp.box(sl, 0.2, 0.14, i % 2 ? C.bestRed : C.white, { pos: [0.2 + sl * (i + 0.5), 0, 0], outline: i === 0 ? true : false });
  bp.ball(0.12, C.bestRed, { pos: [0.2 + reach, 0.0, 0], w: 6, h: 4 });
  bp.round(0.35, 0.35, 0.3, C.steelDark, { pos: [-0.35, -0.0, 0], r: 0.08 });
  const bm = meshOf(ink, bp, { spacing: 0.06, thickness: 1.8 });
  boom.add(bm);
  g.add(boom);
  let target = opts.closed ? 0 : 1.25, ang = target, t = 0;
  g.userData.setClosed = (c) => { target = c ? 0 : 1.25; g.userData.closed = !!c; };
  g.userData.closed = !!opts.closed;
  boom.rotation.z = ang;
  g.userData.animate = (dt) => {
    t += dt;
    ang += (target - ang) * (1 - Math.exp(-2.6 * dt));
    boom.rotation.z = ang;
    const flashing = target < 0.5 || ang < 1.0;
    lampMats[0].color.setHex(flashing && Math.sin(t * 7) > 0 ? 0xff4b3a : 0x7a3030);
    lampMats[1].color.setHex(flashing && Math.sin(t * 7) <= 0 ? 0xff4b3a : 0x7a3030);
  };
  // moving boom colliders (call when closed)
  g.userData.boomColliders = () => (ang < 0.3 ? Array.from({ length: 5 }, (_, i) => ({ x: 0.8 + i * (reach / 5), z: 0, radius: 0.5, height: 1.6 })) : []);
  return finish(g, { footprint: { w: reach + 1.5, l: 1.0 }, colliders: [{ x: 0, z: 0, radius: 0.5, height: 1.6 }, { x: -0.9, z: 0, radius: 0.3, height: 3 }] });
}
