/**
 * hyderabad/props/vehicles.js: Hyderabad's white cab sedan, TSRTC / TGSRTC city buses (red-and-white ordinary + green-and-white Metro Express),
 * yellow-and-black auto-rickshaws (a few green electric ones), the food-delivery scooter, Hyderabad Metro coaches (white, blue band),
 * track segments and a level-crossing barrier. Plates read TS 09 / TG 09. Lettering is Telugu (+ English).
 *
 * Every factory: createX(ink, opts?) -> THREE.Group. Local frame: y up, base (ground contact) at y=0, front = +z.
 * group.userData = { footprint:{w,l}, colliders:[{x,z,radius,height}], ... }
 * Vehicles also have userData.wheels (meshes to spin), userData.body (the bouncing sub-group) and
 * userData.animate(dt, speed): spins wheels by speed*dt/radius (speed in units/s, + = forward), bounces the body,
 * wobbles small details (cab/auto: idle engine shiver; scooter: pedals-free idle; metro: bogie wheels).
 *
 * Names kept from the Mumbai factories so scenery / traffic / rail need no changes: createTaxi (= the white cab sedan), createBus (= TSRTC city bus),
 * createAutoRickshaw, createDabbawalaBike (= the delivery scooter, alias createDeliveryScooter), createTrainCar (= a Hyderabad Metro coach,
 * alias createMetroCar; opts { isEngine (cab front), tail (cab at the back), ladies (the women's coach), seed }).
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, plateDecal, hand, boardRect, paintCanvas, finish, rig, wheelMesh,
  eyes, smile, blush, texMat, rng, mulberry32, drawShape, wobblyLine, INK,
} from './kit.js';
import { TE_FONT, loadTeluguFont } from '../telugu.js';

const TAU = Math.PI * 2;
const place = (obj, [x, y, z], rotY = 0) => { obj.position.set(x, y, z); obj.rotation.y = rotY; return obj; };

// ---- Telugu lettering (whole strings: Telugu conjuncts must not be split per glyph; repainted when the font arrives, see kit.paintCanvas) ----
/** whole-string Telugu text with an optional sticker outline; shrinks to `maxW` (kept under the old name knText too) */
export function teText(ctx, text, x, y, { size = 40, fill = INK, stroke = null, sw = null, align = 'center', weight = 'bold', maxW = 0 } = {}) {
  loadTeluguFont();
  ctx.save();
  ctx.font = `${weight} ${size}px ${TE_FONT}`;
  if (maxW) { const w = ctx.measureText(text).width; if (w > maxW) { size *= maxW / w; ctx.font = `${weight} ${size}px ${TE_FONT}`; } }
  ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = sw ?? size * 0.14; ctx.strokeStyle = stroke; ctx.strokeText(text, x, y); }
  ctx.fillStyle = fill; ctx.fillText(text, x, y);
  ctx.restore();
}
const knText = teText;
export { knText };
/** TS 09 / TG 09 number plate text (Telangana: TS until 2024, TG on newer vehicles) */
export function plateTS(seed, series = '09') {
  const r = mulberry32(seed * 31 + 5);
  const L = 'ABCDEFGHJKLMNPRSTUVXZ';
  return `${seed % 3 === 0 ? 'TG' : 'TS'} ${series} ${L[Math.floor(r() * L.length)]}${L[Math.floor(r() * L.length)]} ${1000 + Math.floor(r() * 8999)}`;
}
const plateKA = plateTS;
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
  const plate = plateTS(seed);
  body.add(place(plateDecal(ink, plate, { w: 0.95, h: 0.28, ...PLATE_COMMERCIAL }), [0, 0.5, 2.72]));
  body.add(place(plateDecal(ink, plate, { w: 0.95, h: 0.28, ...PLATE_COMMERCIAL }), [0, 1.08, -2.68], Math.PI));
  // a tiny Telugu "టాక్సీ / TAXI" sticker on the rear windscreen (unbranded)
  const st = plaque(ink, 0.8, 0.2, (ctx, w, h) => {
    ctx.fillStyle = '#fff6cf'; ctx.fillRect(0, 0, w, h);
    knText(ctx, 'టాక్సీ', w * 0.3, h * 0.74, { size: h * 0.62, fill: '#8d5fc9' });
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
// TSRTC / TGSRTC city bus. Per the reference photos: the ordinary bus is white above, red below with a red rear panel; the Metro Express
// is white with a green lower body and green roof band. (Older Metro Express buses were blue-white; the current fleet is green.)
// =====================================================================================================
const BUS_LIVERY = {
  red: { body: 0xd9453f, upper: 0xf7f4ea, dark: 0xb23a36, band: 0xf7f0da, glass: 0xbfdce6, name: ['టీజీఎస్ఆర్టీసీ', 'TGSRTC'], sub: 'సిటీ ఆర్డినరీ · City Ordinary', tag: '#c4453f' },
  green: { body: 0x4aa863, upper: 0xf3f6ea, dark: 0x2f8248, band: 0x4aa863, glass: 0xbfdce6, name: ['టీజీఎస్ఆర్టీసీ', 'TGSRTC'], sub: 'మెట్రో ఎక్స్‌ప్రెస్ · Metro Express', tag: '#2f8248' },
};
const BUS_ROUTES = [
  ['113M', 'కోఠి', 'KOTI'], ['218', 'అమీర్‌పేట', 'AMEERPET'], ['9X', 'చార్మినార్', 'CHARMINAR'], ['127K', 'కాచిగూడ', 'KACHEGUDA'],
  ['216', 'హైటెక్ సిటీ', 'HITEC CITY'], ['10H', 'సికింద్రాబాద్', 'SECUNDERABAD'], ['49M', 'మెహదీపట్నం', 'MEHDIPATNAM'], ['300', 'గచ్చిబౌలి', 'GACHIBOWLI'],
];
const WINDOW_SKIN = [C.skin1, C.skin2, C.skin3, C.skin4];

export function createBus(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"vajra"}
  const seed = opts.seed ?? 3;
  const kind = opts.kind === 'vajra' ? 'green' : (opts.kind ?? ['red', 'green', 'red'][Math.abs(seed) % 3]);
  const L = BUS_LIVERY[kind];
  const route = BUS_ROUTES[Math.abs(opts.routeIx ?? seed * 3 + 1) % BUS_ROUTES.length];
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const vajra = false; // (no AC pod: city ordinary + Metro Express only)
  // lower body, window band, roof band (one long rounded single deck)
  p.round(3.1, 1.25, 10.3, L.body, { pos: [0, 1.4, 0], r: 0.35, seg: 1 });
  p.round(3.12, 1.2, 10.1, L.upper, { pos: [0, 2.6, -0.05], r: 0.3, seg: 1 });
  if (kind === 'red') p.round(3.14, 1.2, 2.6, L.body, { pos: [0, 2.6, -3.8], r: 0.3, seg: 1 }); // the red rear panel
  p.box(3.16, 0.16, 10.2, L.body, { pos: [0, 2.1, 0], outline: false }); // waist stripe in the livery colour
  p.round(2.96, 0.3, 10.1, L.band, { pos: [0, 3.35, -0.05], r: 0.12 }); // roof
  p.round(3.14, 0.3, 10.35, L.dark, { pos: [0, 0.86, 0], r: 0.1 }); // skirt
  p.box(3.16, 0.05, 10.2, L.band, { pos: [0, 1.96, 0], outline: false });
  // side windows (tinted on the Vajra) with a few passengers peeking
  const rr = mulberry32(seed * 17 + 3);
  const wz = [-3.9, -2.7, -1.5, -0.3, 0.9, 2.1, 3.3];
  for (const sx of [-1, 1]) {
    wz.forEach((z, i) => {
      if (sx === 1 && (i === 6 || i === 3)) return; // the doors (kerb side) take the front and middle bays
      p.box(0.07, 0.95, 1.05, vajra ? 0x7da2bc : L.glass, { pos: [sx * 1.58, 2.7, z] });
      if (rr() < 0.55) {
        const skin = WINDOW_SKIN[Math.floor(rr() * 4)];
        p.ball(0.24, skin, { pos: [sx * 1.52, 2.62, z + (rr() - 0.5) * 0.4], scale: [0.5, 1, 1], w: 8, h: 6, outline: false });
        p.ball(0.25, C.kaali, { pos: [sx * 1.5, 2.72, z], scale: [0.45, 0.6, 1], w: 6, h: 4, outline: false });
      }
    });
    p.box(0.05, 0.05, 9.0, C.steel, { pos: [sx * 1.6, 2.12, 0.0], outline: false });
  }
  // doors on the kerb side (left = +x): a front door and a middle door, dark glass leaves
  for (const z of [3.3, -0.3]) {
    p.box(0.08, 1.95, 1.0, 0x4a5a78, { pos: [1.58, 1.95, z] });
    p.box(0.1, 1.95, 0.05, L.dark, { pos: [1.6, 1.95, z], outline: false });
    p.box(0.3, 0.08, 0.9, C.steelDark, { pos: [1.7, 0.98, z], outline: false }); // step
  }
  // front: big windscreen, face, destination board, bumper
  p.round(2.8, 1.5, 0.08, vajra ? 0x7da2bc : L.glass, { pos: [0, 2.35, 5.2], r: 0.04 });
  p.box(0.1, 1.5, 0.1, L.body, { pos: [0, 2.35, 5.22], outline: false });
  p.round(3.1, 0.5, 0.1, L.upper, { pos: [0, 3.05, 5.2], r: 0.04, outline: false });
  p.round(3.0, 0.24, 0.3, C.steel, { pos: [0, 0.86, 5.22], r: 0.08 });
  eyes(p, { x: 0.95, y: 1.3, z: 5.18, r: 0.3, look: [0.12, 0.1] });
  smile(p, { y: 0.98, z: 5.26, R: 0.4, t: 0.05 });
  blush(p, { x: 1.3, y: 1.1, z: 5.24, r: 0.14 });
  for (const sx of [-1, 1]) p.round(0.35, 0.12, 0.1, 0xf6d86a, { pos: [sx * 1.3, 0.72, 5.22], r: 0.04, outline: false });
  // rear: engine hump, rear window, tail lights
  p.round(2.9, 0.9, 0.3, L.dark, { pos: [0, 1.5, -5.2], r: 0.1 });
  p.round(2.4, 0.8, 0.08, C.glass, { pos: [0, 2.7, -5.18], r: 0.04 });
  for (const sx of [-1, 1]) p.round(0.2, 0.4, 0.1, C.bestRed, { pos: [sx * 1.25, 1.55, -5.36], r: 0.05, outline: false });
  // roof: the Vajra's AC pod and the ordinary bus's two vents
  if (vajra) p.round(2.0, 0.34, 4.2, L.band, { pos: [0, 3.66, -1.8], r: 0.14 });
  else { p.round(0.9, 0.2, 1.3, L.band, { pos: [0, 3.6, -1.6], r: 0.06 }); p.round(0.9, 0.2, 1.3, L.band, { pos: [0, 3.6, 1.6], r: 0.06 }); }
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.12, thickness: 2.4 }), { name: 'bus-body' }));

  // destination boards: amber on charcoal, route number + Telugu destination + English
  const board = (w, h) => plaque(ink, w, h, (ctx, cw, ch) => {
    boardRect(ctx, 5, 5, cw - 10, ch - 10, { fill: '#2f2a42', hatch: 'rgba(90,80,140,0.8)', cw, ch, lw: 4, round: 12, r: rng(seed + 2) });
    hand(ctx, route[0], cw * 0.13, ch * 0.7, { size: ch * 0.6, fill: '#ffe27a', seed: 3, align: 'center' });
    knText(ctx, route[1], cw * 0.58, ch * 0.5, { size: ch * 0.4, fill: '#ffc86a', maxW: cw * 0.6 });
    hand(ctx, route[2], cw * 0.58, ch * 0.9, { size: ch * 0.3, fill: '#fffbe9', seed: 4, maxW: cw * 0.6 });
  }, { ppu: 150, depth: 0.08, frame: 0x2f2a42, thickness: 1.6 });
  const fb = board(2.6, 0.55); fb.position.set(0, 3.0, 5.26); body.add(fb);
  const rb = board(1.6, 0.4); rb.position.set(0, 3.1, -5.22); rb.rotation.y = Math.PI; body.add(rb);
  for (const sx of [-1, 1]) {
    const sb = board(1.2, 0.45); sb.position.set(sx * 1.62, 3.05, sx > 0 ? 4.2 : 3.4); sb.rotation.y = sx * Math.PI / 2; sb.scale.set(0.8, 0.8, 1); body.add(sb);
    const ad = plaque(ink, 5.2, 0.62, (ctx, cw, ch) => {
      boardRect(ctx, 4, 4, cw - 8, ch - 8, { fill: vajra ? '#e3efff' : '#fff3d0', hatch: vajra ? 'rgba(120,160,225,0.55)' : 'rgba(235,180,90,0.55)', cw, ch, lw: 4, round: 16, r: rng(11 + sx) });
      knText(ctx, L.name[0], cw * 0.2, ch * 0.74, { size: ch * 0.62, fill: L.tag, maxW: cw * 0.3 });
      hand(ctx, L.name[1], cw * 0.5, ch * 0.74, { size: ch * 0.62, fill: L.tag, stroke: '#fff', sw: 4, seed: 8, maxW: cw * 0.26 });
      knText(ctx, L.sub, cw * 0.76, ch * 0.72, { size: ch * 0.44, fill: '#4a4560', maxW: cw * 0.4, weight: 'normal' });
    }, { ppu: 120, depth: 0.05, frame: 0xfff3d0, thickness: 1.6 });
    ad.position.set(sx * 1.6, 1.3, 0.5); ad.rotation.y = sx * Math.PI / 2; body.add(ad);
  }
  const plate = plateTS(seed + 1);
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
// Auto-rickshaw: Hyderabad yellow body, black canvas roof with a diamond-trim front edge and a black front bumper (reference photo); opts.green = green electric ones
// =====================================================================================================
export function createAutoRickshaw(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"vajra"}
  const seed = opts.seed ?? 5;
  const green = opts.green ?? (Math.abs(seed) % 6 === 5); // about one in six is a green electric auto
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const GR = opts.top ?? (green ? 0x72c97c : 0xf4c21c);
  const ROOF = 0x2a2530;
  // black tub + coloured skin
  p.side([[-1.55, 0.55], [-1.6, 1.2], [-0.6, 1.3], [0.7, 1.3], [1.3, 1.1], [1.6, 0.8], [1.5, 0.45], [-1.2, 0.4]], 1.55, GR, { bevel: 0.06, round: 0.25 }); // yellow tub (reference photo: the side skirts are yellow)
  p.round(1.45, 0.3, 0.3, C.kaali, { pos: [0, 0.78, 1.52], r: 0.1 }); // black front cowl / bumper
  p.ball(0.82, GR, { pos: [0, 1.2, 1.1], scale: [0.95, 0.85, 1.05], w: 12, h: 8 });
  p.box(1.45, 0.95, 0.06, C.glass, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0] });
  p.box(1.55, 0.07, 0.08, C.kaali, { pos: [0, 1.5, 0.55], rot: [-0.22, 0, 0], outline: false });
  p.box(0.07, 0.95, 0.08, C.kaali, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0], outline: false });
  for (const sx of [-1, 1]) {
    p.tube([sx * 0.76, 1.3, 0.62], [sx * 0.76, 2.42, 0.46], 0.05, C.kaali, { seg: 5 });
    p.tube([sx * 0.78, 1.3, -1.45], [sx * 0.78, 2.42, -1.4], 0.05, C.kaali, { seg: 5 });
  }
  p.round(1.75, 0.16, 2.35, ROOF, { pos: [0, 2.48, -0.5], r: 0.07, seg: 2 });
  for (let k = -3; k <= 3; k++) p.box(0.19, 0.19, 0.05, GR, { pos: [k * 0.215, 2.47, 0.7], rot: [0, 0, Math.PI / 4], outline: false }); // diamond trim along the roof's front lip
  p.box(1.8, 0.07, 2.4, C.kaali, { pos: [0, 2.38, -0.5], outline: false });
  p.round(1.35, 0.26, 0.7, C.maroon, { pos: [0, 1.4, -0.95], r: 0.08 });
  p.round(1.35, 0.7, 0.18, C.maroon, { pos: [0, 1.82, -1.4], r: 0.07, rot: [-0.1, 0, 0] });
  p.round(0.6, 0.22, 0.45, C.maroon, { pos: [0, 1.35, 0.15], r: 0.07 });
  p.tube([0, 1.4, 0.85], [0, 1.8, 0.5], 0.04, C.steelDark, { seg: 5 });
  p.box(1.0, 0.06, 0.06, C.steelDark, { pos: [0, 1.82, 0.5], outline: false });
  for (const sx of [-1, 1]) p.ball(0.06, C.kaali, { pos: [sx * 0.5, 1.82, 0.5], outline: false, w: 5, h: 4 });
  // a little fare meter on the dash
  p.round(0.34, 0.2, 0.12, 0x4b4363, { pos: [0.32, 1.96, 0.46], r: 0.03, outline: false });
  p.box(0.22, 0.08, 0.02, 0x9fe3a9, { pos: [0.32, 1.98, 0.53], outline: false });
  eyes(p, { x: 0, y: 1.3, z: 1.78, r: 0.3, flat: 0.6, look: [0.1, 0.15] });
  smile(p, { y: 0.88, z: 1.86, R: 0.3, t: 0.045 });
  p.box(1.5, 0.95, 0.07, C.kaali, { pos: [0, 1.95, -1.65], rot: [0.05, 0, 0], outline: false });
  p.round(1.4, 0.35, 0.6, GR, { pos: [0, 1.0, -1.5], r: 0.1 });
  p.round(0.18, 0.2, 0.08, C.bestRed, { pos: [0.5, 1.15, -1.82], r: 0.03, outline: false });
  p.round(1.2, 0.12, 0.2, C.steel, { pos: [0, 0.5, 1.75], r: 0.05 });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'auto-body' }));
  const roofText = plaque(ink, 1.5, 0.3, (ctx, w, h) => {
    boardRect(ctx, 4, 4, w - 8, h - 8, { fill: green ? '#e4f6dc' : '#fffbd4', hatch: green ? 'rgba(110,190,120,0.6)' : 'rgba(200,210,100,0.6)', cw: w, ch: h, lw: 3, round: 8, r: rng(5) });
    knText(ctx, 'ఆటో', w * 0.3, h * 0.74, { size: h * 0.66, fill: green ? '#2f7a46' : '#3f4a8a' });
    hand(ctx, 'AUTO', w * 0.7, h * 0.72, { size: h * 0.6, fill: green ? '#2f7a46' : '#3f4a8a', seed: 3 });
  }, { ppu: 150, depth: 0.03, thickness: 1.4, frame: green ? 0xe4f6dc : 0xfffbd4 });
  roofText.position.set(0, 2.5, 0.0); roofText.rotation.set(-1.42, 0, 0); roofText.position.y = 2.575;
  body.add(roofText);
  const plate = plateTS(seed + 2);
  body.add(place(plateDecal(ink, plate, { w: 0.8, h: 0.24, ...PLATE_COMMERCIAL }), [0, 0.62, -1.85], Math.PI));
  body.add(place(plateDecal(ink, plate, { w: 0.75, h: 0.22, ...PLATE_COMMERCIAL }), [0, 0.52, 1.86]));
  const wheels = [];
  const fw = wheelMesh(ink, 0.42, 0.26, { spokes: 4 }); fw.position.set(0, 0.42, 1.35); g.add(fw); wheels.push({ mesh: fw, r: 0.42 });
  for (const sx of [-1, 1]) { const w = wheelMesh(ink, 0.42, 0.26, { spokes: 4 }); w.position.set(sx * 0.82, 0.42, -0.95); g.add(w); wheels.push({ mesh: w, r: 0.42 }); }
  g.userData.green = green;
  rig(g, { body, wheels, bounce: 0.03, pitch: 0.012, idle: 0.015 });
  return finish(g, { footprint: { w: 1.9, l: 3.6 }, colliders: [{ x: 0, z: 0.6, radius: 1.0, height: 2.4 }, { x: 0, z: -0.8, radius: 1.0, height: 2.4 }] });
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
// Hyderabad Metro coach (white/silver, blue lower band, dark glass; red-green-yellow swoosh on the cab). The first coach is the women's coach.
// =====================================================================================================
const METRO = { purple: '#2f86cf', purpleD: 'rgba(20,60,120,0.65)', white: '#f8fbfd', hatch: 'rgba(150,175,200,0.5)', glass: '#bcd6e8', pink: '#f48fb1', pinkD: '#7a1741' };
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
    // purple lower band with the wordmark; thin accent stripe along the waist
    ctx.fillStyle = METRO.purple; ctx.fillRect(0, H * 0.76, W, H * 0.24);
    ctx.save(); ctx.strokeStyle = METRO.purpleD; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.rect(0, H * 0.76, W, H * 0.24); ctx.clip();
    for (let x = -H; x < W + H; x += 8) { ctx.beginPath(); ctx.moveTo(x, H * 0.76); ctx.lineTo(x - H * 0.3, H); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle = ladies ? METRO.pink : '#9fd0f2'; ctx.fillRect(0, H * 0.745, W, H * 0.02);
    if (ladies) { ctx.fillStyle = METRO.pink; ctx.fillRect(0, 0, W, H * 0.04); }
    wobblyLine(ctx, [[0, H * 0.76], [W * 0.5, H * 0.765], [W, H * 0.76]], { r, lw: 3, amp: 1.2 });
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
    // lettering: the wordmark on every coach, the women's label on the first
    knText(ctx, 'హైదరాబాద్ మెట్రో', W * 0.2, H * 0.93, { size: H * 0.15, fill: '#f4fbff', maxW: W * 0.27 });
    hand(ctx, 'HYDERABAD METRO', W * 0.45, H * 0.93, { size: H * 0.13, fill: '#e6f3ff', seed: 2, maxW: W * 0.22 });
    hand(ctx, '' + (1001 + Math.floor(seed * 7) % 90), W * 0.06, H * 0.92, { size: H * 0.1, fill: '#d6ebff', seed: 4 });
    if (ladies) {
      knText(ctx, 'మహిళలు', W * 0.68, H * 0.93, { size: H * 0.15, fill: '#ffe1ec', maxW: W * 0.17 });
      hand(ctx, 'WOMEN', W * 0.86, H * 0.93, { size: H * 0.13, fill: '#ffe1ec', seed: 6, maxW: W * 0.15 });
      // a pink board over the two middle doors
      for (const cx of [W * 0.25, W * 0.75]) {
        drawShape(ctx, [[cx - 150, 5], [cx + 150, 5], [cx + 150, H * 0.115], [cx - 150, H * 0.115]], { fill: '#f9a8c4', hatch: 'rgba(190,60,110,0.6)', w: W, h: H, r, amp: 1.2, lw: 3 });
        knText(ctx, 'మహిళలు', cx - 70, H * 0.098, { size: H * 0.085, fill: METRO.pinkD, maxW: 130 });
        hand(ctx, 'WOMEN', cx + 70, H * 0.098, { size: H * 0.075, fill: METRO.pinkD, seed: 9, maxW: 120 });
      }
    } else {
      knText(ctx, 'జనరల్', W * 0.68, H * 0.93, { size: H * 0.13, fill: '#e6f3ff', maxW: W * 0.17 });
      hand(ctx, 'GENERAL', W * 0.86, H * 0.93, { size: H * 0.12, fill: '#e6f3ff', seed: 6, maxW: W * 0.15 });
    }
  });
}

/** the rounded cab nose, built toward +z (sgn = -1 builds the tail cab toward -z) */
function metroNose(p, sgn, ladies) {
  const prof = [[3.6, 0.8], [4.5, 0.86], [4.78, 1.5], [4.7, 2.4], [4.3, 3.2], [3.9, 3.62], [3.6, 3.62]].map(([z, y]) => [z * sgn, y]);
  if (sgn < 0) prof.reverse();
  p.side(prof, 2.9, METRO_WHITE, { bevel: 0.1, round: 0.5 });
  p.round(2.94, 0.5, 0.5, METRO_PURPLE, { pos: [0, 1.12, 4.55 * sgn], r: 0.14 }); // purple chin
  p.box(2.3, 0.95, 0.1, 0x2d3a52, { pos: [0, 2.84, 4.55 * sgn], rot: [-0.46 * sgn, 0, 0] }); // sloping windscreen
  p.box(2.4, 0.08, 0.12, METRO_PURPLE, { pos: [0, 3.34, 4.31 * sgn], rot: [-0.46 * sgn, 0, 0], outline: false });
  for (const sx of [-1, 1]) p.round(0.4, 0.14, 0.12, 0xfff0a8, { pos: [sx * 1.05, 1.62, 4.72 * sgn], r: 0.05, outline: false }); // headlamps
  eyes(p, { x: 0.62, y: 2.0, z: 4.74, r: 0.26, sgn, look: [0.1, 0.12] });
  smile(p, { y: 1.28, z: 4.84, R: 0.32, t: 0.045, sgn });
  blush(p, { x: 1.0, y: 1.45, z: 4.8, r: 0.12, sgn });
  // the cab's red / green / yellow swoosh under the windscreen (as on the real trains)
  [[0xe0463b, 2.02], [0x4aa863, 1.84], [0xf4c21c, 1.66]].forEach(([c, y]) => p.round(2.5, 0.09, 0.08, c, { pos: [0, y, 4.77 * sgn], r: 0.03, outline: false }));
  if (ladies) p.round(1.4, 0.1, 0.1, 0xf48fb1, { pos: [0, 3.5, 4.18 * sgn], r: 0.04, outline: false }); // pink women's-coach stripe above the windscreen
}
const METRO_WHITE = 0xf8fbfd, METRO_PURPLE = 0x2f86cf;

/**
 * One Hyderabad Metro coach (~8 long, 3 wide, ~4 high). Chain coaches 8.3 apart.
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
  p.round(3.0, 0.5, LEN - 0.05, METRO_PURPLE, { pos: [0, 0.98, 0], r: 0.1 });
  p.add(new THREE.CylinderGeometry(1.0, 1.0, LEN - 0.2, 14, 1, false, Math.PI / 2, Math.PI), 0xe9eff4, { pos: [0, 3.62, 0], rot: [Math.PI / 2, 0, 0], scale: [1.5, 1, 0.5] });
  p.round(3.04, 0.12, LEN - 0.05, 0xe3eaf0, { pos: [0, 3.62, 0], r: 0.04, outline: false });
  p.box(2.2, 0.35, LEN - 1.2, 0x5b5470, { pos: [0, 0.62, 0], outline: false });
  for (const z of [-2.7, 2.7]) p.round(2.3, 0.28, 2.4, 0x4a4360, { pos: [0, 0.5, z], r: 0.06, outline: false });
  for (const z of [-2.2, 0.4, 2.2]) p.round(1.3, 0.2, 1.4, 0xd5dfe8, { pos: [0, 4.0, z], r: 0.08 }); // roof AC pods
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
  for (const sx of [-1, 1]) p.box(0.04, 0.05, LEN - 0.4, METRO_PURPLE, { pos: [sx * 1.51, 3.55, 0], outline: false });
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
    knText(ctx, 'రైల్వే క్రాసింగ్', w / 2, h * 0.42, { size: h * 0.3, fill: '#d9453b', maxW: w * 0.86 });
    hand(ctx, 'RAILWAY CROSSING', w / 2, h * 0.68, { size: h * 0.2, maxW: w * 0.86, fill: INK, seed: 2 });
    knText(ctx, 'జాగ్రత్త · LOOK OUT', w / 2, h * 0.9, { size: h * 0.15, maxW: w * 0.86, fill: '#2f7a46', weight: 'normal' });
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
