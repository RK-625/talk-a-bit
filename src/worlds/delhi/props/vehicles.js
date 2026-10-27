/**
 * delhi/props/vehicles.js: Delhi's white cab sedan, DTC low-floor buses (red AC + lime-green CNG) and orange cluster buses, green-and-yellow CNG
 * auto-rickshaws and battery e-rickshaws, the food-delivery scooter, Delhi Metro coaches (stainless steel, coloured band, red roundel),
 * track segments and a level-crossing barrier. Plates read DL 1.. (a few HR 26 cabs from Gurugram). Lettering is Devanagari (+ English).
 * Reference photos (Wikimedia Commons, see docs/DELHI_CAST.md): "Auto-rickshaw in Delhi.jpeg", "Auto Rickshaws outside Purana Qila, Delhi.jpg",
 * "E-Rikshaw on a Delhi road.jpg", "DTC low-floor bus.jpg", "DTC-AC-AshLey-Anand-Vihar.jpg", "DIMTS-Bus-433.jpg", "Delhi metro six coach train panoramic view.jpg",
 * "Delhi metro women only 1026.jpg".
 *
 * Every factory: createX(ink, opts?) -> THREE.Group. Local frame: y up, base (ground contact) at y=0, front = +z.
 * group.userData = { footprint:{w,l}, colliders:[{x,z,radius,height}], ... }
 * Vehicles also have userData.wheels (meshes to spin), userData.body (the bouncing sub-group) and
 * userData.animate(dt, speed): spins wheels by speed*dt/radius (speed in units/s, + = forward), bounces the body,
 * wobbles small details (cab/auto: idle engine shiver; scooter: pedals-free idle; metro: bogie wheels).
 *
 * Names kept from the Mumbai factories so scenery / traffic / rail need no changes: createTaxi (= the white cab sedan), createBus (= DTC / cluster bus),
 * createAutoRickshaw (also builds the e-rickshaw for some seeds, opts.e), createDabbawalaBike (= the delivery scooter, alias createDeliveryScooter),
 * createTrainCar (= a Delhi Metro coach, alias createMetroCar; opts { isEngine (cab front), tail (cab at the back), ladies (the women's coach), seed }).
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, plateDecal, hand, boardRect, paintCanvas, finish, rig, wheelMesh,
  eyes, smile, blush, texMat, rng, mulberry32, drawShape, wobblyLine, INK,
} from './kit.js';
import { DV_FONT, loadDevanagariFont } from '../devanagari.js';

const TAU = Math.PI * 2;
const place = (obj, [x, y, z], rotY = 0) => { obj.position.set(x, y, z); obj.rotation.y = rotY; return obj; };

// ---- Devanagari lettering (whole strings: conjuncts must not be split per glyph; repainted when the font arrives, see kit.paintCanvas) ----
/** whole-string Devanagari text with an optional sticker outline; shrinks to `maxW` (kept under the old name knText too) */
export function teText(ctx, text, x, y, { size = 40, fill = INK, stroke = null, sw = null, align = 'center', weight = 'bold', maxW = 0 } = {}) {
  loadDevanagariFont();
  ctx.save();
  ctx.font = `${weight} ${size}px ${DV_FONT}`;
  if (maxW) { const w = ctx.measureText(text).width; if (w > maxW) { size *= maxW / w; ctx.font = `${weight} ${size}px ${DV_FONT}`; } }
  ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = sw ?? size * 0.14; ctx.strokeStyle = stroke; ctx.strokeText(text, x, y); }
  ctx.fillStyle = fill; ctx.fillText(text, x, y);
  ctx.restore();
}
const knText = teText;
export { knText };
/** Delhi number plate text: DL 1RM 0356 (autos, buses, cabs: DL + 1 + two letters); every 6th seed is a Gurugram cab (HR 26 AB 1234) */
export function plateDL(seed, hr = false) {
  const r = mulberry32(seed * 31 + 5);
  const L = 'ABCDEFGHJKLMNPRSTUVXZ';
  const l2 = () => L[Math.floor(r() * L.length)];
  if (hr || seed % 6 === 4) return `HR ${seed % 2 ? '26' : '55'} ${l2()}${l2()} ${1000 + Math.floor(r() * 8999)}`;
  return `DL 1${['R', 'P', 'Z', 'Y'][seed % 4]}${l2()} ${1000 + Math.floor(r() * 8999)}`;
}
const plateTS = plateDL;
export { plateTS };
const plateKA = plateDL;
export { plateKA };
const PLATE_COMMERCIAL = { bg: '#f6d65e', fg: '#1f1b2b' }; // yellow plates on cabs, autos and buses
const PLATE_PRIVATE = { bg: '#fbf8ee', fg: '#1f1b2b' };

// =====================================================================================================
// White cab sedan (unbranded app-cab look): white body, yellow commercial number plates
// =====================================================================================================
export function createTaxi(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"vajra"}
  const seed = opts.seed ?? 7;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const WHT = 0xfbf8ee, GREY = 0xdfe4ea;
  // lower body: long boot, low bonnet
  p.side([[-2.5, 0.55], [-2.6, 1.05], [-2.4, 1.3], [-1.5, 1.36], [1.0, 1.36], [2.0, 1.3], [2.55, 1.1], [2.62, 0.8], [2.5, 0.5], [2.1, 0.42], [-2.1, 0.42]], 2.04, WHT, { bevel: 0.07, round: 0.3 });
  // wheel arches (darker discs) so the tyres tuck in
  for (const sx of [-1, 1]) for (const z of [-1.62, 1.66]) p.cyl(0.6, 0.6, 0.06, 0x2a2438, { rot: [0, 0, Math.PI / 2], pos: [sx * 1.0, 0.55, z], seg: 12, outline: false });
  // sloping cabin
  p.side([[-1.8, 1.32], [-1.15, 2.1], [0.5, 2.1], [1.45, 1.34]], 1.86, WHT, { bevel: 0.06, round: 0.35 });
  p.round(1.88, 0.12, 2.0, WHT, { pos: [0, 2.14, -0.3], r: 0.05 });
  // glass: side band, windscreen, rear window
  p.side([[-1.4, 1.52], [-1.0, 2.04], [0.42, 2.04], [1.12, 1.52]], 1.94, C.glass, { bevel: 0.02, round: 0.1 });
  p.side([[-1.72, 1.34], [-1.12, 2.08], [0.48, 2.08], [1.4, 1.36]], 1.66, C.glass, { bevel: 0.02, round: 0.05 });
  for (const z of [-0.5, 0.2]) p.box(1.96, 0.55, 0.1, WHT, { pos: [0, 1.82, z], outline: false });
  for (const sx of [-1, 1]) {
    for (const z of [-0.5, 0.2, 1.1]) p.box(0.04, 0.78, 0.05, INKC, { pos: [sx * 1.04, 1.0, z], outline: false });
    for (const z of [-0.25, 0.7]) p.box(0.07, 0.07, 0.3, C.steel, { pos: [sx * 1.07, 1.42, z], outline: false });
    p.box(0.3, 0.2, 0.06, WHT, { pos: [sx * 1.16, 1.64, 1.05] });
    p.tube([sx * 0.96, 1.54, 1.1], [sx * 1.12, 1.64, 1.05], 0.03, C.steel, { outline: false });
    p.round(0.14, 0.3, 0.1, C.bestRed, { pos: [sx * 0.8, 1.2, -2.6], r: 0.04, outline: false }); // tail lights
    p.round(0.2, 0.2, 0.25, C.steel, { pos: [sx * 0.98, 0.72, 2.62], r: 0.07 });
  }
  p.round(2.2, 0.15, 0.2, C.steel, { pos: [0, 0.72, 2.66], r: 0.06 });
  p.round(2.2, 0.15, 0.2, C.steel, { pos: [0, 0.72, -2.64], r: 0.06 });
  // face in the headlights: happy eyes + smiley grille, blush
  eyes(p, { x: 0.7, y: 1.08, z: 2.52, r: 0.26, look: [0.1, 0.12] });
  smile(p, { y: 0.74, z: 2.6, R: 0.32, t: 0.045 });
  p.box(0.5, 0.05, 0.05, C.steelDark, { pos: [0, 0.95, 2.6], outline: false });
  blush(p, { x: 0.92, y: 0.88, z: 2.58, r: 0.12 });
  p.box(1.3, 0.03, 0.05, GREY, { pos: [0, 1.37, -2.0], outline: false }); // boot line
  // a small roof aerial fin and a neat light-grey sill
  p.round(0.08, 0.12, 0.24, 0x4b4363, { pos: [0, 2.25, -1.2], r: 0.03, outline: false });
  for (const sx of [-1, 1]) p.box(0.03, 0.12, 4.2, GREY, { pos: [sx * 1.04, 0.62, 0], outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.1 }), { name: 'cab-body' }));

  // yellow commercial plates
  const plate = plateDL(seed);
  body.add(place(plateDecal(ink, plate, { w: 0.95, h: 0.28, ...PLATE_COMMERCIAL }), [0, 0.5, 2.72]));
  body.add(place(plateDecal(ink, plate, { w: 0.95, h: 0.28, ...PLATE_COMMERCIAL }), [0, 1.08, -2.68], Math.PI));
  // a tiny "टैक्सी / TAXI" sticker on the rear windscreen (unbranded)
  const st = plaque(ink, 0.8, 0.2, (ctx, w, h) => {
    ctx.fillStyle = '#fff6cf'; ctx.fillRect(0, 0, w, h);
    knText(ctx, 'टैक्सी', w * 0.3, h * 0.74, { size: h * 0.62, fill: '#8d5fc9' });
    hand(ctx, 'TAXI', w * 0.72, h * 0.74, { size: h * 0.6, fill: INK, seed: 3 });
  }, { ppu: 200, depth: 0.02, thickness: 1.2, frame: 0xfff6cf });
  st.position.set(0, 1.86, -2.12); st.rotation.set(0.0, Math.PI, 0); st.rotation.x = 0.36; body.add(st);

  const wheels = [];
  for (const sx of [-1, 1]) for (const z of [-1.62, 1.66]) {
    const w = wheelMesh(ink, 0.5, 0.32); w.position.set(sx * 0.95, 0.5, z); g.add(w); wheels.push({ mesh: w, r: 0.5 });
  }
  g.userData.plate = plate;
  rig(g, { body, wheels, bounce: 0.03, pitch: 0.007, idle: 0.008 });
  return finish(g, {
    footprint: { w: 2.6, l: 5.3 },
    colliders: [{ x: 0, z: 1.5, radius: 1.45, height: 2.4 }, { x: 0, z: -1.5, radius: 1.45, height: 2.4 }],
  });
}

// =====================================================================================================
// Delhi buses. Per the reference photos: the DTC low-floor bus is a boxy single-deck, lime-green (CNG) or red (AC), with black window frames, a yellow stripe
// under the windows, a black grille panel, an LED destination box (orange on black, Devanagari) and a CNG hump on the roof; the cluster bus is the
// same shape in orange. Doors on the kerb (left) side.
// =====================================================================================================
const BUS_LIVERY = {
  green: { body: 0x86c94a, upper: 0x86c94a, dark: 0x6fb43a, band: 0x78bd40, stripe: 0xf3c21c, glass: 0x7f9fb0, name: ['दिल्ली परिवहन निगम', 'DTC'], sub: 'लो-फ्लोर · CNG', tag: '#3f8a2a' },
  red: { body: 0xc7352f, upper: 0xc7352f, dark: 0xa92b28, band: 0xb02f2b, stripe: 0xf3c21c, glass: 0x7f9fb0, name: ['दिल्ली परिवहन निगम', 'DTC'], sub: 'लो-फ्लोर · AC', tag: '#b02f2b' },
  orange: { body: 0xf26b2d, upper: 0xf26b2d, dark: 0xd85a22, band: 0xe8601f, stripe: 0xf3c21c, glass: 0x7f9fb0, name: ['क्लस्टर बस', 'CLUSTER'], sub: 'दिल्ली क्लस्टर सेवा', tag: '#d85a22' },
};
const BUS_ROUTES = [
  ['433', 'नई दिल्ली रेलवे स्टेशन', 'NEW DELHI RLY STN'], ['469', 'आनंद विहार ISBT', 'ANAND VIHAR'], ['740', 'उत्तम नगर टर्मिनल', 'UTTAM NAGAR'], ['534', 'कनॉट प्लेस', 'CONNAUGHT PLACE'],
  ['429', 'लाल क़िला', 'RED FORT'], ['781', 'इंडिया गेट', 'INDIA GATE'], ['966', 'कुतुब मीनार', 'QUTUB MINAR'], ['764', 'साइबर हब गुरुग्राम', 'CYBER HUB'],
];
const WINDOW_SKIN = [C.skin1, C.skin2, C.skin3, C.skin4];
const BUS_KINDS = ['green', 'red', 'orange', 'green', 'orange', 'red'];

export function createBus(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"orange"}
  const seed = opts.seed ?? 3;
  const kind = BUS_LIVERY[opts.kind] ? opts.kind : BUS_KINDS[Math.abs(seed) % BUS_KINDS.length];
  const L = BUS_LIVERY[kind];
  const route = BUS_ROUTES[Math.abs(opts.routeIx ?? seed * 3 + 1) % BUS_ROUTES.length];
  const BLACKF = 0x232628;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  // lower body, window band, roof (one long rounded single deck, boxier than the old city bus)
  p.round(3.1, 1.25, 10.3, L.body, { pos: [0, 1.4, 0], r: 0.3, seg: 1 });
  p.round(3.12, 1.2, 10.1, L.upper, { pos: [0, 2.6, -0.05], r: 0.26, seg: 1 });
  p.box(3.16, 0.16, 10.2, L.stripe, { pos: [0, 2.06, 0], outline: false }); // the yellow stripe under the windows
  p.round(2.96, 0.3, 10.1, L.band, { pos: [0, 3.35, -0.05], r: 0.12 }); // roof
  p.round(3.14, 0.3, 10.35, L.dark, { pos: [0, 0.86, 0], r: 0.1 }); // skirt
  p.box(3.16, 0.05, 10.2, 0xe9edf0, { pos: [0, 1.4, 0], outline: false }); // silver trim line across the lower body
  // side windows: dark tinted glass in black frames, a few passengers peeking
  const rr = mulberry32(seed * 17 + 3);
  const wz = [-3.9, -2.7, -1.5, -0.3, 0.9, 2.1, 3.3];
  for (const sx of [-1, 1]) {
    wz.forEach((z, i) => {
      if (sx === 1 && (i === 6 || i === 3)) return; // the doors (kerb side) take the front and middle bays
      p.box(0.06, 1.05, 1.15, BLACKF, { pos: [sx * 1.585, 2.7, z], outline: false });
      p.box(0.07, 0.9, 1.02, L.glass, { pos: [sx * 1.59, 2.7, z] });
      if (rr() < 0.55) {
        const skin = WINDOW_SKIN[Math.floor(rr() * 4)];
        p.ball(0.24, skin, { pos: [sx * 1.52, 2.62, z + (rr() - 0.5) * 0.4], scale: [0.5, 1, 1], w: 8, h: 6, outline: false });
        p.ball(0.25, C.kaali, { pos: [sx * 1.5, 2.72, z], scale: [0.45, 0.6, 1], w: 6, h: 4, outline: false });
      }
    });
    p.box(0.05, 0.05, 9.0, C.steel, { pos: [sx * 1.6, 2.12, 0.0], outline: false });
  }
  // doors on the kerb side (left = +x): a front door and a middle door, dark glass leaves in black frames
  for (const z of [3.3, -0.3]) {
    p.box(0.08, 2.0, 1.1, BLACKF, { pos: [1.58, 1.95, z] });
    p.box(0.1, 1.8, 0.4, 0x4a5a78, { pos: [1.6, 2.05, z - 0.25], outline: false });
    p.box(0.1, 1.8, 0.4, 0x4a5a78, { pos: [1.6, 2.05, z + 0.25], outline: false });
    p.box(0.3, 0.08, 0.9, C.steelDark, { pos: [1.7, 0.98, z], outline: false }); // low step
  }
  // front: big windscreen, black fascia, face, destination board, bumper
  p.round(2.8, 1.5, 0.08, L.glass, { pos: [0, 2.35, 5.2], r: 0.04 });
  p.box(0.1, 1.5, 0.1, BLACKF, { pos: [0, 2.35, 5.22], outline: false });
  p.round(3.1, 0.5, 0.1, BLACKF, { pos: [0, 3.05, 5.2], r: 0.04, outline: false });
  p.round(2.6, 0.5, 0.1, BLACKF, { pos: [0, 1.62, 5.2], r: 0.04, outline: false }); // black grille panel
  p.round(3.0, 0.24, 0.3, L.body, { pos: [0, 0.86, 5.22], r: 0.08 });
  eyes(p, { x: 0.95, y: 1.3, z: 5.18, r: 0.3, look: [0.12, 0.1] });
  smile(p, { y: 0.98, z: 5.26, R: 0.4, t: 0.05 });
  blush(p, { x: 1.3, y: 1.1, z: 5.24, r: 0.14 });
  for (const sx of [-1, 1]) p.round(0.35, 0.12, 0.1, 0xf6d86a, { pos: [sx * 1.3, 0.72, 5.22], r: 0.04, outline: false });
  // rear: engine hump, rear window, tail lights
  p.round(2.9, 0.9, 0.3, L.dark, { pos: [0, 1.5, -5.2], r: 0.1 });
  p.round(2.4, 0.8, 0.08, C.glass, { pos: [0, 2.7, -5.18], r: 0.04 });
  for (const sx of [-1, 1]) p.round(0.2, 0.4, 0.1, C.bestRed, { pos: [sx * 1.25, 1.55, -5.36], r: 0.05, outline: false });
  // roof: the CNG cylinder hump over the back half, with a rounded cover
  p.round(2.5, 0.5, 4.6, L.band, { pos: [0, 3.72, -2.4], r: 0.22 });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.12, thickness: 2.4 }), { name: 'bus-body' }));

  // destination boards: LED orange on black, route number + Devanagari destination + English
  const board = (w, h) => plaque(ink, w, h, (ctx, cw, ch) => {
    boardRect(ctx, 5, 5, cw - 10, ch - 10, { fill: '#1d1f22', hatch: 'rgba(90,70,60,0.8)', cw, ch, lw: 4, round: 12, r: rng(seed + 2) });
    hand(ctx, route[0], cw * 0.13, ch * 0.7, { size: ch * 0.6, fill: '#ff9a3c', seed: 3, align: 'center' });
    knText(ctx, route[1], cw * 0.58, ch * 0.5, { size: ch * 0.4, fill: '#ff8a2c', maxW: cw * 0.6 });
    hand(ctx, route[2], cw * 0.58, ch * 0.9, { size: ch * 0.3, fill: '#ffc98a', seed: 4, maxW: cw * 0.6 });
  }, { ppu: 150, depth: 0.08, frame: 0x1d1f22, thickness: 1.6 });
  const fb = board(2.6, 0.55); fb.position.set(0, 3.0, 5.26); body.add(fb);
  const rb = board(1.6, 0.4); rb.position.set(0, 3.1, -5.22); rb.rotation.y = Math.PI; body.add(rb);
  for (const sx of [-1, 1]) {
    const sb = board(1.2, 0.45); sb.position.set(sx * 1.62, 3.05, sx > 0 ? 4.2 : 3.4); sb.rotation.y = sx * Math.PI / 2; sb.scale.set(0.8, 0.8, 1); body.add(sb);
    const ad = plaque(ink, 5.2, 0.62, (ctx, cw, ch) => { // the corporation name on the red/green lower side (as on the real buses): white on the body colour
      boardRect(ctx, 4, 4, cw - 8, ch - 8, { fill: '#fffbe6', hatch: 'rgba(235,200,120,0.5)', cw, ch, lw: 4, round: 16, r: rng(11 + sx) });
      knText(ctx, L.name[0], cw * 0.3, ch * 0.74, { size: ch * 0.6, fill: L.tag, maxW: cw * 0.5 });
      hand(ctx, L.name[1], cw * 0.62, ch * 0.74, { size: ch * 0.6, fill: L.tag, seed: 8, maxW: cw * 0.14 });
      knText(ctx, L.sub, cw * 0.84, ch * 0.72, { size: ch * 0.44, fill: '#4a4560', maxW: cw * 0.26, weight: 'normal' });
    }, { ppu: 120, depth: 0.05, frame: 0xfffbe6, thickness: 1.6 });
    ad.position.set(sx * 1.6, 1.3, 0.5); ad.rotation.y = sx * Math.PI / 2; body.add(ad);
  }
  const plate = plateDL(seed + 1);
  body.add(place(plateDecal(ink, plate, { w: 1.1, h: 0.32, ...PLATE_COMMERCIAL }), [0, 0.58, 5.4]));
  body.add(place(plateDecal(ink, plate, { w: 1.1, h: 0.32, ...PLATE_COMMERCIAL }), [0, 1.0, -5.38], Math.PI));

  const wheels = [];
  for (const [sx, z] of [[-1, 3.5], [1, 3.5], [-1, -3.0], [1, -3.0]]) {
    const w = wheelMesh(ink, 0.7, 0.42, { spokes: 4, seg: 12 }); w.position.set(sx * 1.32, 0.7, z); g.add(w); wheels.push({ mesh: w, r: 0.7 });
  }
  g.userData.kind = kind;
  rig(g, { body, wheels, bounce: 0.035, pitch: 0.006, idle: 0.01 });
  return finish(g, {
    footprint: { w: 3.2, l: 10.6 },
    colliders: [3.7, 1.3, -1.3, -3.7].map((z) => ({ x: 0, z, radius: 1.65, height: 4.2 })),
  });
}

// =====================================================================================================
// Auto-rickshaw: the Delhi CNG auto (reference photos): GREEN lower body, YELLOW canvas hood and top of the front cowl, black bench seats, a yellow
// bumper stripe, white "CNG" on the green rear panel, a little red hand-painted line on the yellow back (Devanagari), a yellow commercial plate.
// Seeds divisible by 4 (3 of the 10 autos in traffic) are battery e-rickshaws instead (opts.e): open sides, four poles, a canopy and a bench behind the driver.
// =====================================================================================================
const AUTO_PAINT = ['घर कब आओगे', 'मेरा भारत महान', 'माँ का आशीर्वाद', 'बुरी नज़र वाले', 'जय माता दी', 'पापा की परी'];
export function createAutoRickshaw(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"e":true}
  const seed = opts.seed ?? 5;
  const e = opts.e ?? (Math.abs(seed) % 4 === 0); // 3 of the 10 traffic autos (seeds 16, 24, 28) are e-rickshaws
  return e ? createERickshaw(ink, opts, seed) : createCngAuto(ink, opts, seed);
}

function createCngAuto(ink, opts, seed) {
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const GR = opts.top ?? 0x2f9a54, YEL = 0xf4c21c, SEAT = 0x2b2833;
  // green tub (the side skirts are green) + yellow hood
  p.side([[-1.55, 0.55], [-1.6, 1.2], [-0.6, 1.3], [0.7, 1.3], [1.3, 1.1], [1.6, 0.8], [1.5, 0.45], [-1.2, 0.4]], 1.55, GR, { bevel: 0.06, round: 0.25 });
  p.round(1.45, 0.3, 0.3, YEL, { pos: [0, 0.78, 1.52], r: 0.1 }); // yellow front bumper cowl
  p.ball(0.82, GR, { pos: [0, 1.2, 1.1], scale: [0.95, 0.85, 1.05], w: 12, h: 8 });
  p.ball(0.72, YEL, { pos: [0, 1.58, 1.04], scale: [0.95, 0.5, 1.0], w: 12, h: 6 }); // yellow top of the front fairing
  p.box(1.45, 0.95, 0.06, C.glass, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0] });
  p.box(1.55, 0.07, 0.08, C.kaali, { pos: [0, 1.5, 0.55], rot: [-0.22, 0, 0], outline: false });
  p.box(0.07, 0.95, 0.08, C.kaali, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0], outline: false });
  for (const sx of [-1, 1]) {
    p.tube([sx * 0.76, 1.3, 0.62], [sx * 0.76, 2.42, 0.46], 0.05, C.kaali, { seg: 5 });
    p.tube([sx * 0.78, 1.3, -1.45], [sx * 0.78, 2.42, -1.4], 0.05, C.kaali, { seg: 5 });
  }
  p.round(1.75, 0.16, 2.35, YEL, { pos: [0, 2.48, -0.5], r: 0.07, seg: 2 }); // the yellow canvas hood
  p.box(1.8, 0.07, 2.4, C.kaali, { pos: [0, 2.38, -0.5], outline: false });
  p.round(1.35, 0.26, 0.7, SEAT, { pos: [0, 1.4, -0.95], r: 0.08 }); // black bench + back rest
  p.round(1.35, 0.7, 0.18, SEAT, { pos: [0, 1.82, -1.4], r: 0.07, rot: [-0.1, 0, 0] });
  p.round(0.6, 0.22, 0.45, SEAT, { pos: [0, 1.35, 0.15], r: 0.07 });
  p.tube([0, 1.4, 0.85], [0, 1.8, 0.5], 0.04, C.steelDark, { seg: 5 });
  p.box(1.0, 0.06, 0.06, C.steelDark, { pos: [0, 1.82, 0.5], outline: false });
  for (const sx of [-1, 1]) p.ball(0.06, C.kaali, { pos: [sx * 0.5, 1.82, 0.5], outline: false, w: 5, h: 4 });
  // a little fare meter on the dash
  p.round(0.34, 0.2, 0.12, 0x4b4363, { pos: [0.32, 1.96, 0.46], r: 0.03, outline: false });
  p.box(0.22, 0.08, 0.02, 0x9fe3a9, { pos: [0.32, 1.98, 0.53], outline: false });
  eyes(p, { x: 0, y: 1.3, z: 1.78, r: 0.3, flat: 0.6, look: [0.1, 0.15] });
  smile(p, { y: 0.88, z: 1.86, R: 0.3, t: 0.045 });
  p.box(1.5, 0.95, 0.07, YEL, { pos: [0, 1.95, -1.65], rot: [0.05, 0, 0], outline: false }); // the yellow back of the hood
  p.round(0.8, 0.3, 0.05, 0x2a2832, { pos: [0, 2.08, -1.7], r: 0.04, outline: false }); // small oval rear window
  p.round(1.4, 0.55, 0.6, GR, { pos: [0, 1.05, -1.5], r: 0.1 }); // green engine cover (with louvres below)
  for (let k = 0; k < 4; k++) p.box(1.0, 0.04, 0.03, 0x1f7a3f, { pos: [0, 0.9 + k * 0.1, -1.83], outline: false });
  p.box(1.6, 0.1, 0.16, YEL, { pos: [0, 0.58, -1.84], outline: false }); // yellow rear bumper stripe
  p.round(0.18, 0.2, 0.08, C.bestRed, { pos: [0.5, 1.2, -1.84], r: 0.03, outline: false });
  p.round(0.18, 0.2, 0.08, C.bestRed, { pos: [-0.5, 1.2, -1.84], r: 0.03, outline: false });
  p.round(1.2, 0.12, 0.2, C.steel, { pos: [0, 0.5, 1.75], r: 0.05 });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'auto-body' }));
  // painted rear: a red hand-lettered line on the yellow back (Devanagari) + white "CNG" on the green panel
  const paint = AUTO_PAINT[Math.abs(seed) % AUTO_PAINT.length];
  const back = plaque(ink, 1.35, 0.4, (ctx, w, h) => {
    ctx.fillStyle = '#f4c21c'; ctx.fillRect(0, 0, w, h);
    knText(ctx, paint, w / 2, h * 0.72, { size: h * 0.62, fill: '#c8352e', maxW: w * 0.9 });
  }, { ppu: 150, depth: 0.02, thickness: 1.2, frame: 0xf4c21c });
  back.position.set(0, 1.6, -1.72); back.rotation.set(0.05, Math.PI, 0); body.add(back);
  const cng = plaque(ink, 0.5, 0.26, (ctx, w, h) => {
    ctx.fillStyle = '#2f9a54'; ctx.fillRect(0, 0, w, h);
    hand(ctx, 'CNG', w / 2, h * 0.78, { size: h * 0.9, fill: '#ffffff', seed: 3 });
  }, { ppu: 150, depth: 0.02, thickness: 1.2, frame: 0x2f9a54 });
  cng.position.set(-0.45, 0.95, -1.86); cng.rotation.y = Math.PI; body.add(cng);
  const plate = plateDL(seed + 2);
  body.add(place(plateDecal(ink, plate, { w: 0.8, h: 0.24, ...PLATE_COMMERCIAL }), [0.1, 0.4, -1.88], Math.PI));
  body.add(place(plateDecal(ink, plate, { w: 0.75, h: 0.22, ...PLATE_COMMERCIAL }), [0, 0.52, 1.86]));
  const wheels = [];
  const fw = wheelMesh(ink, 0.42, 0.26, { spokes: 4 }); fw.position.set(0, 0.42, 1.35); g.add(fw); wheels.push({ mesh: fw, r: 0.42 });
  for (const sx of [-1, 1]) { const w = wheelMesh(ink, 0.42, 0.26, { spokes: 4 }); w.position.set(sx * 0.82, 0.42, -0.95); g.add(w); wheels.push({ mesh: w, r: 0.42 }); }
  g.userData.kind = 'cng';
  rig(g, { body, wheels, bounce: 0.03, pitch: 0.012, idle: 0.015 });
  return finish(g, { footprint: { w: 1.9, l: 3.6 }, colliders: [{ x: 0, z: 0.6, radius: 1.0, height: 2.4 }, { x: 0, z: -0.8, radius: 1.0, height: 2.4 }] });
}

/** battery e-rickshaw (reference photo "E-Rikshaw on a Delhi road"): a motorbike-style front, open sides, four poles with a canopy, a bench behind the driver */
function createERickshaw(ink, opts, seed) {
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const paints = [[0x3d6fc4, 0x3d6fc4], [0x2f9a54, 0x2f9a54], [0xd9453f, 0xd9453f], [0xf4c21c, 0x2f9a54]];
  const [BODY, ROOF] = paints[Math.abs(seed >> 2) % paints.length];
  const SEAT = 0x2b2833;
  p.round(1.5, 0.22, 2.7, BODY, { pos: [0, 0.66, -0.55], r: 0.08 }); // floor / chassis
  p.round(1.54, 0.14, 2.74, 0xe9edf0, { pos: [0, 0.5, -0.55], r: 0.05, outline: false }); // light skirt
  p.round(0.95, 0.85, 0.75, BODY, { pos: [0, 1.08, 1.12], r: 0.16 }); // front cowl over the headlamp
  p.round(0.5, 0.55, 0.5, BODY, { pos: [0, 1.62, 0.95], r: 0.1 }); // dash
  p.tube([0, 1.0, 1.3], [0, 0.45, 1.4], 0.06, C.steelDark, { seg: 5 }); // fork
  p.tube([-0.5, 1.88, 0.85], [0.5, 1.88, 0.85], 0.04, C.steelDark, { seg: 5 }); // handlebar
  for (const sx of [-1, 1]) p.ball(0.06, C.kaali, { pos: [sx * 0.52, 1.88, 0.85], w: 5, h: 4 });
  p.round(0.6, 0.2, 0.5, SEAT, { pos: [0, 0.98, 0.45], r: 0.06 }); // driver's seat
  p.round(1.3, 0.24, 0.6, SEAT, { pos: [0, 1.0, -0.55], r: 0.07 }); // passenger bench
  p.round(1.3, 0.62, 0.14, SEAT, { pos: [0, 1.42, -0.9], r: 0.06, rot: [-0.08, 0, 0] });
  p.round(1.3, 0.24, 0.6, SEAT, { pos: [0, 1.0, -1.35], r: 0.07 }); // rear bench
  p.round(1.3, 0.62, 0.14, SEAT, { pos: [0, 1.42, -1.72], r: 0.06, rot: [0.08, 0, 0] });
  for (const sx of [-1, 1]) for (const z of [0.55, -1.7]) p.tube([sx * 0.72, 0.8, z], [sx * 0.72, 2.45, z], 0.045, C.kaali, { seg: 5 }); // canopy poles
  p.round(1.75, 0.14, 2.5, ROOF, { pos: [0, 2.5, -0.55], r: 0.06, seg: 2 }); // canopy
  p.box(1.55, 0.8, 0.05, C.glass, { pos: [0, 1.95, 0.72], rot: [-0.2, 0, 0] }); // windscreen
  p.box(1.6, 0.06, 0.07, C.kaali, { pos: [0, 1.57, 0.66], rot: [-0.2, 0, 0], outline: false });
  p.ball(0.15, C.butter, { pos: [0, 1.15, 1.52], scale: [1, 1, 0.8], w: 8, h: 6 }); // headlamp
  eyes(p, { x: 0, y: 1.35, z: 1.5, r: 0.25, flat: 0.6, look: [0.1, 0.15] });
  smile(p, { y: 0.9, z: 1.58, R: 0.26, t: 0.04 });
  p.round(1.1, 0.34, 0.3, 0x3a3640, { pos: [0, 0.34, -1.7], r: 0.06, outline: false }); // battery box
  for (const sx of [-1, 1]) p.box(0.04, 0.5, 0.04, 0xf4c21c, { pos: [sx * 0.74, 1.6, -1.3], outline: false }); // yellow safety tape on the rear poles
  p.round(0.18, 0.18, 0.08, C.bestRed, { pos: [0.5, 1.1, -2.0], r: 0.03, outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'erick-body' }));
  const plate = plateDL(seed + 2);
  body.add(place(plateDecal(ink, plate, { w: 0.7, h: 0.22, bg: '#fbf8ee', fg: '#1f1b2b' }), [0, 0.72, -2.02], Math.PI)); // e-rickshaws carry green/white plates; kept plain white
  const wheels = [];
  const fw = wheelMesh(ink, 0.4, 0.2, { spokes: 4 }); fw.position.set(0, 0.4, 1.35); g.add(fw); wheels.push({ mesh: fw, r: 0.4 });
  for (const sx of [-1, 1]) { const w = wheelMesh(ink, 0.4, 0.22, { spokes: 4 }); w.position.set(sx * 0.78, 0.4, -1.1); g.add(w); wheels.push({ mesh: w, r: 0.4 }); }
  g.userData.kind = 'e';
  rig(g, { body, wheels, bounce: 0.025, pitch: 0.01, idle: 0.006 });
  return finish(g, { footprint: { w: 1.9, l: 3.8 }, colliders: [{ x: 0, z: 0.8, radius: 1.0, height: 2.4 }, { x: 0, z: -0.9, radius: 1.0, height: 2.4 }] });
}

// =====================================================================================================
// Food-delivery scooter with an insulated bag (unbranded). Parked at the delivery-rider spot; same footprint as the old tiffin cycle.
// =====================================================================================================
export function createDabbawalaBike(ink, opts = {}) {
  void opts;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const R = 0.5;
  const SC = 0xe9eef3, SD = 0xc7d0da, ORANGE = 0xd9453f;
  // step-through frame: floorboard, leg shield, front cowl, seat, rear cover
  p.round(0.66, 0.12, 1.5, SC, { pos: [0, 0.62, 0.1], r: 0.05 });
  p.round(0.62, 1.2, 0.16, SC, { pos: [0, 1.2, 0.88], r: 0.06, rot: [-0.18, 0, 0] }); // leg shield
  p.round(0.7, 0.5, 0.7, SC, { pos: [0, 1.62, 1.12], r: 0.1 }); // front cowl
  p.round(0.56, 0.8, 1.2, SC, { pos: [0, 1.02, -0.95], r: 0.12 }); // rear cover
  p.round(0.5, 0.2, 1.0, 0x4b4363, { pos: [0, 1.5, -0.7], r: 0.07 }); // seat
  p.tube([0, 1.8, 0.95], [0, 1.0, 1.35], 0.07, C.steelDark, { seg: 6 }); // fork
  p.tube([-0.5, 2.05, 0.92], [0.5, 2.05, 0.92], 0.04, C.steelDark, { seg: 5 }); // handlebar
  for (const sx of [-1, 1]) { p.ball(0.07, C.kaali, { pos: [sx * 0.52, 2.05, 0.92], w: 5, h: 4 }); p.tube([sx * 0.46, 2.06, 0.9], [sx * 0.34, 2.28, 0.86], 0.025, C.steelDark, { seg: 4, outline: false }); }
  // mudguard + exhaust + stand
  p.round(0.3, 0.1, 0.9, SD, { pos: [0, 0.95, 1.5], r: 0.04 });
  p.cyl(0.07, 0.07, 0.9, C.steelDark, { pos: [0.26, 0.7, -1.0], rot: [Math.PI / 2, 0, 0.1], seg: 6, outline: false });
  p.tube([0, 0.55, -0.6], [0.3, 0.0, -0.8], 0.03, C.steelDark, { outline: false });
  // headlamp with a little face
  p.ball(0.17, C.butter, { pos: [0, 1.72, 1.52], scale: [1, 1, 0.8], w: 8, h: 6 });
  p.ball(0.04, INKC, { pos: [-0.06, 1.75, 1.64], outline: false, w: 4, h: 3 });
  p.ball(0.04, INKC, { pos: [0.06, 1.75, 1.64], outline: false, w: 4, h: 3 });
  smile(p, { y: 1.58, z: 1.66, R: 0.06, t: 0.018 });
  // a helmet hooked on the mirror
  p.ball(0.2, ORANGE, { pos: [-0.34, 2.28, 0.86], scale: [1, 0.9, 1.1], w: 8, h: 6 });
  // rear rack with the unbranded insulated bag: plain orange cube, lid line, reflective strips
  p.round(0.7, 0.07, 0.9, C.steelDark, { pos: [0, 1.52, -1.4], r: 0.03 });
  p.round(0.92, 0.86, 0.88, ORANGE, { pos: [0, 2.0, -1.45], r: 0.1 });
  p.box(0.94, 0.05, 0.9, 0xb53a30, { pos: [0, 2.35, -1.45], outline: false });
  p.box(0.94, 0.07, 0.04, 0xfbf7ea, { pos: [0, 1.85, -0.99], outline: false });
  p.box(0.94, 0.07, 0.04, 0xfbf7ea, { pos: [0, 2.12, -0.99], outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.07, thickness: 2 }), { name: 'scooter-body' }));
  const wheels = [];
  for (const z of [-1.1, 1.35]) { const w = wheelMesh(ink, R, 0.22, { spokes: 4, seg: 12 }); w.position.set(0, R, z); g.add(w); wheels.push({ mesh: w, r: R }); }
  rig(g, { body, wheels, bounce: 0.012, pitch: 0.01, idle: 0.004 });
  return finish(g, { footprint: { w: 1.2, l: 3.2 }, colliders: [{ x: 0, z: 0.9, radius: 0.55, height: 2.2 }, { x: 0, z: -0.3, radius: 0.55, height: 2.2 }, { x: 0, z: -1.3, radius: 0.6, height: 2.2 }] });
}
export { createDabbawalaBike as createDeliveryScooter };

// =====================================================================================================
// Delhi Metro coach (reference photos: brushed stainless steel, a coloured band along the waist (Blue Line), dark tinted windows, a red roundel logo
// between the doors, black-and-red cab front). The first coach is the women's coach (pink महिला / WOMEN boards, only women inside).
// =====================================================================================================
const METRO = { purple: '#2f5fb5', purpleD: 'rgba(15,40,110,0.65)', white: '#d9dde0', hatch: 'rgba(120,130,140,0.5)', glass: '#8fa3b5', pink: '#f48fb1', pinkD: '#7a1741', red: '#d9302b' };
const SKINS = ['#e9b58f', '#c98a62', '#a56a48', '#f1c9a5'];
const SARI = ['#f4a0b8', '#8fd3c6', '#f6cf5a', '#a9c8f0', '#c4b2ee', '#f4a05a', '#9fd68e', '#e9776a'];
const SHIRT = ['#9fb8e8', '#f0e2b0', '#b9dfc4', '#f2b6a8', '#c9c0ee', '#e8e8f0'];

/** a standing passenger seen through a window: head, shoulders, hair, bindi + jasmine for women, lanyard / moustache for men */
function metroPassenger(ctx, x, yBottom, s, r, { woman, ...o } = {}) {
  const skin = SKINS[Math.floor(r() * 4)];
  const hy = yBottom - s * 0.98, hr = s * 0.26;
  ctx.save();
  ctx.lineWidth = Math.max(2, s * 0.05); ctx.strokeStyle = INK;
  // shoulders / torso
  const cloth = woman ? SARI[Math.floor(r() * SARI.length)] : SHIRT[Math.floor(r() * SHIRT.length)];
  drawShape(ctx, [[x - s * 0.6, yBottom], [x - s * 0.5, yBottom - s * 0.55], [x - s * 0.18, yBottom - s * 0.7], [x + s * 0.18, yBottom - s * 0.7], [x + s * 0.5, yBottom - s * 0.55], [x + s * 0.6, yBottom]], { fill: cloth, hatch: 'rgba(60,40,80,0.45)', w: 1280, h: 432, r, amp: 1, lw: 2.4 });
  if (woman && r() < 0.6) drawShape(ctx, [[x - s * 0.5, yBottom - s * 0.55], [x - s * 0.18, yBottom - s * 0.7], [x + s * 0.1, yBottom - s * 0.1], [x - s * 0.22, yBottom]], { fill: SARI[Math.floor(r() * SARI.length)], hatch: 'rgba(60,40,80,0.4)', w: 1280, h: 432, r, amp: 1, lw: 2 }); // pallu
  // neck + head
  ctx.fillStyle = skin; ctx.fillRect(x - s * 0.07, hy + hr * 0.7, s * 0.14, s * 0.2);
  drawShape(ctx, Array.from({ length: 9 }, (_, i) => [x + Math.cos((i / 9) * TAU) * hr, hy + Math.sin((i / 9) * TAU) * hr * 1.08]), { fill: skin, hatch: 'rgba(120,70,40,0.4)', w: 1280, h: 432, r, amp: 1, lw: 2.4 });
  ctx.fillStyle = INK;
  if (woman) { // dark hair, bun, bindi, jasmine
    ctx.beginPath(); ctx.arc(x, hy - hr * 0.2, hr * 1.04, Math.PI * 1.02, Math.PI * 1.98); ctx.fill();
    ctx.beginPath(); ctx.arc(x + hr * 0.85, hy - hr * 0.95, hr * 0.42, 0, TAU); ctx.fill();
    ctx.fillStyle = '#d9304f'; ctx.beginPath(); ctx.arc(x, hy - hr * 0.35, hr * 0.12, 0, TAU); ctx.fill();
    if (r() < 0.6) { ctx.fillStyle = '#fffaf0'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(x + hr * (0.55 + k * 0.12), hy - hr * (1.15 - k * 0.12), hr * 0.13, 0, TAU); ctx.fill(); } }
  } else { // short hair, moustache, a lanyard on some
    ctx.beginPath(); ctx.arc(x, hy - hr * 0.2, hr * 1.04, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
    if (r() < 0.4) ctx.fillRect(x - hr * 0.4, hy + hr * 0.35, hr * 0.8, hr * 0.16);
    if (o.lanyard) { ctx.strokeStyle = '#e9a24a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - s * 0.1, yBottom - s * 0.68); ctx.lineTo(x, yBottom - s * 0.3); ctx.lineTo(x + s * 0.1, yBottom - s * 0.68); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(x - s * 0.06, yBottom - s * 0.32, s * 0.12, s * 0.16); }
  }
  ctx.fillStyle = INK;
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sx * hr * 0.4, hy + hr * 0.05, hr * 0.1, 0, TAU); ctx.fill(); }
  ctx.restore();
}

function metroSideCanvas(seed, ladies) {
  const W = 1280, H = 432; // 8 x 2.7 units at 160 px/unit
  return paintCanvas(W, H, (ctx) => {
    const r = rng(seed * 13 + 1);
    ctx.fillStyle = METRO.white; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.strokeStyle = METRO.hatch; ctx.lineWidth = 1.3; ctx.globalAlpha = 0.45;
    for (let x = -H; x < W + H; x += 9) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - H * 0.8, H); ctx.stroke(); }
    ctx.restore();
    // the coloured band (Blue Line) along the waist, thin and straight, with the roundel and chevrons; plain steel below and above
    ctx.fillStyle = METRO.purple; ctx.fillRect(0, H * 0.78, W, H * 0.075);
    ctx.save(); ctx.strokeStyle = METRO.purpleD; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.rect(0, H * 0.78, W, H * 0.075); ctx.clip();
    for (let x = -H; x < W + H; x += 8) { ctx.beginPath(); ctx.moveTo(x, H * 0.78); ctx.lineTo(x - H * 0.3, H * 0.86); ctx.stroke(); }
    ctx.restore();
    if (ladies) { ctx.fillStyle = METRO.pink; ctx.fillRect(0, 0, W, H * 0.04); }
    wobblyLine(ctx, [[0, H * 0.78], [W * 0.5, H * 0.782], [W, H * 0.78]], { r, lw: 3, amp: 1.2 });
    wobblyLine(ctx, [[0, H * 0.855], [W * 0.5, H * 0.857], [W, H * 0.855]], { r, lw: 2.4, amp: 1.2 });
    // four sliding doors and the window bays between them
    const doors = [W * 0.125, W * 0.375, W * 0.625, W * 0.875];
    const dw = 150, wy = H * 0.15, wh = H * 0.58;
    for (const d of doors) {
      const x = d - dw / 2;
      drawShape(ctx, [[x, wy], [x + dw, wy], [x + dw, wy + wh], [x, wy + wh]], { fill: '#c8dcec', hatch: 'rgba(80,130,170,0.7)', w: W, h: H, r, amp: 1.6, lw: 4 });
      wobblyLine(ctx, [[d, wy + 4], [d, wy + wh - 2]], { r, lw: 4, amp: 0.8 }); // the two leaves meet
      for (const sx of [-1, 1]) { ctx.strokeStyle = METRO.purple; ctx.lineWidth = 5; ctx.strokeRect(x + (sx > 0 ? dw / 2 + 5 : 5), wy + 8, dw / 2 - 10, wh - 18); }
      // pictogram above each door: a small arrow chevron (a pink woman sign on the women's coach)
      ctx.fillStyle = ladies ? METRO.pinkD : METRO.purple;
      ctx.beginPath(); ctx.arc(d, wy - 0.0 + 14, 9, 0, TAU); ctx.fill();
    }
    const spans = [];
    let x0 = 18;
    for (const d of doors) { spans.push([x0, d - dw / 2 - 12]); x0 = d + dw / 2 + 12; }
    spans.push([x0, W - 18]);
    for (const [a, b] of spans) {
      if (b - a < 60) continue;
      const w = b - a;
      drawShape(ctx, [[a, wy], [b, wy], [b, wy + wh], [a, wy + wh]], { fill: METRO.glass, hatch: 'rgba(80,130,170,0.55)', w: W, h: H, r, amp: 1.6, lw: 3.6 });
      wobblyLine(ctx, [[a + 6, wy + 40], [b - 6, wy + 40]], { r, lw: 3, amp: 0.8, color: '#c8d1d8' }); // grab rail
      const n = w > 190 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        if (r() < 0.22) continue;
        const px = a + w * ((i + 0.5) / n) + (r() - 0.5) * 18;
        // women's coach: only women. Other coaches: a mix of men and women.
        metroPassenger(ctx, px, wy + wh - 4, 74 + r() * 8, r, { woman: ladies ? true : r() < 0.45, lanyard: r() < 0.5 });
      }
    }
    // the red roundel (a ring with a bar through it, generic) between the middle doors, flanked by blue chevrons like the real coaches
    {
      const cx = W * 0.5, cy = H * 0.818;
      ctx.lineWidth = 8; ctx.strokeStyle = METRO.red; ctx.fillStyle = '#fbf8ee';
      ctx.beginPath(); ctx.arc(cx, cy, 25, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx - 11, cy + 9); ctx.lineTo(cx + 11, cy - 9); ctx.stroke();
      ctx.strokeStyle = '#f4f7fa'; ctx.lineWidth = 5;
      for (const sx of [-1, 1]) for (let k = 0; k < 2; k++) { const x0 = cx + sx * (60 + k * 16); ctx.beginPath(); ctx.moveTo(x0 + sx * 6, cy - 9); ctx.lineTo(x0 - sx * 6, cy); ctx.lineTo(x0 + sx * 6, cy + 9); ctx.stroke(); }
    }
    // lettering: the wordmark on every coach, the women's label on the first
    knText(ctx, 'दिल्ली मेट्रो', W * 0.2, H * 0.96, { size: H * 0.1, fill: '#2d3a4a', maxW: W * 0.2 });
    hand(ctx, 'DELHI METRO', W * 0.41, H * 0.955, { size: H * 0.085, fill: '#2d3a4a', seed: 2, maxW: W * 0.18 });
    hand(ctx, '' + (1001 + Math.floor(seed * 7) % 90), W * 0.06, H * 0.955, { size: H * 0.08, fill: '#3a4656', seed: 4 });
    if (ladies) {
      knText(ctx, 'महिला', W * 0.64, H * 0.97, { size: H * 0.12, fill: METRO.pinkD, maxW: W * 0.16 });
      hand(ctx, 'WOMEN', W * 0.82, H * 0.955, { size: H * 0.1, fill: METRO.pinkD, seed: 6, maxW: W * 0.15 });
      // a pink board over the two middle doors
      for (const cx of [W * 0.25, W * 0.75]) {
        drawShape(ctx, [[cx - 150, 5], [cx + 150, 5], [cx + 150, H * 0.115], [cx - 150, H * 0.115]], { fill: '#f9a8c4', hatch: 'rgba(190,60,110,0.6)', w: W, h: H, r, amp: 1.2, lw: 3 });
        knText(ctx, 'महिला', cx - 70, H * 0.098, { size: H * 0.085, fill: METRO.pinkD, maxW: 130 });
        hand(ctx, 'WOMEN', cx + 70, H * 0.098, { size: H * 0.075, fill: METRO.pinkD, seed: 9, maxW: 120 });
      }
    }
  });
}

/** the rounded cab nose, built toward +z (sgn = -1 builds the tail cab toward -z) */
function metroNose(p, sgn, ladies) {
  const prof = [[3.6, 0.8], [4.5, 0.86], [4.78, 1.5], [4.7, 2.4], [4.3, 3.2], [3.9, 3.62], [3.6, 3.62]].map(([z, y]) => [z * sgn, y]);
  if (sgn < 0) prof.reverse();
  p.side(prof, 2.9, METRO_WHITE, { bevel: 0.1, round: 0.5 });
  p.round(2.94, 0.5, 0.5, 0xc9ced2, { pos: [0, 1.12, 4.55 * sgn], r: 0.14 }); // steel chin
  p.box(2.3, 1.3, 0.1, 0x20262e, { pos: [0, 2.7, 4.55 * sgn], rot: [-0.46 * sgn, 0, 0] }); // sloping black cab front with the windscreen
  p.box(2.4, 0.08, 0.12, METRO_PURPLE, { pos: [0, 3.34, 4.31 * sgn], rot: [-0.46 * sgn, 0, 0], outline: false });
  for (const sx of [-1, 1]) p.round(0.4, 0.14, 0.12, 0xfff0a8, { pos: [sx * 1.05, 1.62, 4.72 * sgn], r: 0.05, outline: false }); // headlamps
  eyes(p, { x: 0.62, y: 2.0, z: 4.74, r: 0.26, sgn, look: [0.1, 0.12] });
  smile(p, { y: 1.28, z: 4.84, R: 0.32, t: 0.045, sgn });
  blush(p, { x: 1.0, y: 1.45, z: 4.8, r: 0.12, sgn });
  // the coloured band wraps round the nose below the windscreen, with the red roundel (as on the real trains)
  p.round(2.5, 0.16, 0.08, METRO_PURPLE, { pos: [0, 1.74, 4.77 * sgn], r: 0.03, outline: false });
  p.cyl(0.26, 0.26, 0.06, 0xd9302b, { pos: [0, 2.2, 4.8 * sgn], rot: [Math.PI / 2, 0, 0], seg: 12, outline: false });
  p.cyl(0.16, 0.16, 0.07, 0xfbf8ee, { pos: [0, 2.2, 4.8 * sgn], rot: [Math.PI / 2, 0, 0], seg: 12, outline: false });
  if (ladies) p.round(1.4, 0.1, 0.1, 0xf48fb1, { pos: [0, 3.5, 4.18 * sgn], r: 0.04, outline: false }); // pink women's-coach stripe above the windscreen
}
const METRO_WHITE = 0xd9dde0, METRO_PURPLE = 0x2f5fb5; // brushed steel + the Blue Line band

/**
 * One Delhi Metro coach (~8 long, 3 wide, ~4 high). Chain coaches 8.3 apart.
 * opts: { isEngine (rounded cab front at +z), tail (cab at the back, -z), ladies (the women's coach: pink boards + only women inside), seed }
 */
export function createTrainCar(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"ladies":true}
  const isEngine = !!opts.isEngine;
  const tail = !!opts.tail;
  const ladies = !!opts.ladies;
  const seed = opts.seed ?? 1;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const LEN = 8, HW = 1.5;
  p.round(2.96, 2.9, LEN - 0.1, METRO_WHITE, { pos: [0, 2.2, 0], r: 0.26, seg: 1 });
  p.round(3.0, 0.5, LEN - 0.05, 0xc3c8cc, { pos: [0, 0.98, 0], r: 0.1 }); // steel skirt
  p.add(new THREE.CylinderGeometry(1.0, 1.0, LEN - 0.2, 14, 1, false, Math.PI / 2, Math.PI), 0xcdd2d6, { pos: [0, 3.62, 0], rot: [Math.PI / 2, 0, 0], scale: [1.5, 1, 0.5] });
  p.round(3.04, 0.12, LEN - 0.05, 0xc7ccd0, { pos: [0, 3.62, 0], r: 0.04, outline: false });
  p.box(2.2, 0.35, LEN - 1.2, 0x5b5470, { pos: [0, 0.62, 0], outline: false });
  for (const z of [-2.7, 2.7]) p.round(2.3, 0.28, 2.4, 0x4a4360, { pos: [0, 0.5, z], r: 0.06, outline: false });
  for (const z of [-2.2, 0.4, 2.2]) p.round(1.3, 0.2, 1.4, 0xb9bfc4, { pos: [0, 4.0, z], r: 0.08 }); // roof AC units
  for (const sz of [-1, 1]) {
    for (const sx of [-0.8, 0.8]) p.cyl(0.12, 0.12, 0.3, C.steel, { pos: [sx, 1.0, sz * 4.08], rot: [Math.PI / 2, 0, 0], seg: 6 });
    p.cyl(0.1, 0.1, 0.5, C.steelDark, { pos: [0, 0.9, sz * 4.15], rot: [Math.PI / 2, 0, 0], seg: 6, outline: false });
  }
  // each end is either a rounded cab (front: isEngine, back: tail) or a rubbery gangway frame
  if (isEngine) metroNose(p, 1, ladies);
  if (tail) metroNose(p, -1, false);
  for (const sz of [1, -1]) {
    if (sz > 0 ? isEngine : tail) continue;
    p.round(2.0, 2.4, 0.2, 0x4a4360, { pos: [0, 2.2, sz * 4.0], r: 0.12 });
    p.round(1.4, 2.0, 0.12, C.glassDark, { pos: [0, 2.25, sz * 4.1], r: 0.1, outline: false });
  }
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.12, thickness: 2.4 }), { name: 'metro-body' }));

  // painted sides (lit ink material so they shade like the shell)
  const canvas = metroSideCanvas(seed, ladies);
  const sideMat = texMat(ink, canvas, { spacing: 0.1, strength: 0.4 });
  for (const sx of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(LEN - 0.3, 2.7 * (LEN - 0.3) / 8 * 0.995), sideMat);
    m.position.set(sx * (HW + 0.012), 2.15, 0);
    m.rotation.y = sx * Math.PI / 2;
    m.receiveShadow = true;
    m.layers.enableAll();
    body.add(m);
  }
  const wheels = [];
  for (const bz of [-2.7, 2.7]) for (const dzz of [-0.55, 0.55]) for (const sx of [-1, 1]) {
    const w = wheelMesh(ink, 0.46, 0.18, { spokes: 2, tyre: 0x4a4360, hub: C.steel, seg: 9 });
    w.position.set(sx * 1.0, 0.46, bz + dzz); g.add(w); wheels.push({ mesh: w, r: 0.46 });
  }
  rig(g, { body, wheels, bounce: 0.012, pitch: 0.003, idle: 0.004 });
  g.userData.length = LEN;
  g.userData.spacing = 8.3; // distance between coach centres when chained
  g.userData.isEngine = isEngine;
  g.userData.ladies = ladies;
  return finish(g, { footprint: { w: 3.1, l: LEN }, colliders: [-2.8, 0, 2.8].map((z) => ({ x: 0, z, radius: 1.7, height: 4 })) });
}
export { createTrainCar as createMetroCar };

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
    p.box(3.0, 0.2, 0.36, 0x6b4a3a, { pos: [0, 0.33, z], outline: false });
    p.box(2.7, 0.04, 0.12, 0x8a6347, { pos: [0, 0.44, z], outline: false });
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
    knText(ctx, 'रेलवे क्रॉसिंग', w / 2, h * 0.42, { size: h * 0.3, fill: '#d9453b', maxW: w * 0.86 });
    hand(ctx, 'RAILWAY CROSSING', w / 2, h * 0.68, { size: h * 0.2, maxW: w * 0.86, fill: INK, seed: 2 });
    knText(ctx, 'सावधान · LOOK OUT', w / 2, h * 0.9, { size: h * 0.15, maxW: w * 0.86, fill: '#2f7a46', weight: 'normal' });
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
