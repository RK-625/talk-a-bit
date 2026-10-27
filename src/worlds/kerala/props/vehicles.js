/**
 * kerala/props/vehicles.js: Kochi's white call-taxi sedan, KSRTC buses (red-and-cream and white-and-blue) and the sky-blue private buses with their big
 * painted names, black-bodied yellow-trimmed auto-rickshaws, the food-delivery scooter, the Kochi Metro coaches (teal, one women's coach labelled
 * സ്ത്രീകൾ / WOMEN), track segments and a level-crossing barrier. Plates read KL 07 (Ernakulam).
 * Reference photos (Wikimedia Commons): Kochi autos (File:Auto-ricksaw.JPG, File:Ernakulam M.G Road Medical Trust Junction.jpg, a KL 07 auto at Fort Kochi),
 * KSRTC buses (File:Buses at Thrissur KSRTC Bus Station 20131227.jpg), private buses (File:Buses at Punalur private bus stand.jpg and the Pathanamthitta
 * stand: sky-blue with white bands and a yellow stripe, the name over the windscreen), Kochi Metro (File:Beautiful Kochi Metro Train.jpg,
 * File:Kochi Metro Train in Station.jpg). The private bus names are invented.
 *
 * Every factory: createX(ink, opts?) -> THREE.Group. Local frame: y up, base (ground contact) at y=0, front = +z.
 * group.userData = { footprint:{w,l}, colliders:[{x,z,radius,height}], ... }
 * Vehicles also have userData.wheels (meshes to spin), userData.body (the bouncing sub-group) and
 * userData.animate(dt, speed): spins wheels by speed*dt/radius (speed in units/s, + = forward), bounces the body,
 * wobbles small details (cab/auto: idle engine shiver; scooter: idle; train: bogie wheels).
 *
 * Names kept from the Mumbai factories so scenery / traffic / rail need no changes: createTaxi (= the white call taxi), createBus (= KSRTC / private),
 * createAutoRickshaw, createDabbawalaBike (= the delivery scooter, alias createDeliveryScooter), createTrainCar (= a metro coach;
 * opts { isEngine (cab front), ladies (the women's coach), seed }).
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, plateDecal, hand, boardRect, paintCanvas, finish, rig, wheelMesh,
  eyes, smile, blush, texMat, rng, mulberry32, drawShape, wobblyLine, INK,
} from './kit.js';

const TAU = Math.PI * 2;
const place = (obj, [x, y, z], rotY = 0) => { obj.position.set(x, y, z); obj.rotation.y = rotY; return obj; };

// ---- Malayalam lettering (kit.hand keeps Malayalam whole too; mlText adds a sticker outline) ----------------------------------------
import { TA_FONT, loadTamilFont } from '../malayalam.js';
loadTamilFont();
/** whole-string Malayalam text with an optional sticker outline; shrinks to `maxW` */
function taText(ctx, text, x, y, { size = 40, fill = INK, stroke = null, sw = null, align = 'center', weight = 'bold', maxW = 0 } = {}) {
  ctx.save();
  ctx.font = `${weight} ${size}px ${TA_FONT}`;
  if (maxW) { const w = ctx.measureText(text).width; if (w > maxW) { size *= maxW / w; ctx.font = `${weight} ${size}px ${TA_FONT}`; } }
  ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = sw ?? size * 0.14; ctx.strokeStyle = stroke; ctx.strokeText(text, x, y); }
  ctx.fillStyle = fill; ctx.fillText(text, x, y);
  ctx.restore();
}
/** KL 07 number plate text (Ernakulam RTO) */
function plateTN(seed, series = '07') {
  const r = mulberry32(seed * 31 + 5);
  const L = 'ABCDEFGHJKLMNPRSTUVXZ';
  return `KL ${series} ${L[Math.floor(r() * L.length)]}${L[Math.floor(r() * L.length)]} ${1000 + Math.floor(r() * 8999)}`;
}
const PLATE_COMMERCIAL = { bg: '#f6d65e', fg: '#1f1b2b' }; // yellow plates on cabs, autos and buses (private cars are white)
const PLATE_PRIVATE = { bg: '#fbf8ee', fg: '#1f1b2b' };

// =====================================================================================================
// White call-taxi sedan (unbranded): white body, yellow commercial KL 07 number plates
// =====================================================================================================
export function createTaxi(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"deluxe"}
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

  // yellow commercial plates (KL 07)
  const plate = plateTN(seed);
  body.add(place(plateDecal(ink, plate, { w: 0.95, h: 0.28, ...PLATE_COMMERCIAL }), [0, 0.5, 2.72]));
  body.add(place(plateDecal(ink, plate, { w: 0.95, h: 0.28, ...PLATE_COMMERCIAL }), [0, 1.08, -2.68], Math.PI));
  // a tiny Malayalam "ടാക്സി / CALL TAXI" sticker on the rear windscreen (unbranded)
  const st = plaque(ink, 0.8, 0.2, (ctx, w, h) => {
    ctx.fillStyle = '#fff6cf'; ctx.fillRect(0, 0, w, h);
    taText(ctx, 'ടാക്സി', w * 0.3, h * 0.72, { size: h * 0.56, fill: '#2f7a52', maxW: w * 0.5 });
    hand(ctx, 'CALL TAXI', w * 0.75, h * 0.72, { size: h * 0.5, fill: INK, seed: 3, maxW: w * 0.42 });
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
// Kochi buses: the red-and-cream KSRTC ordinary (most of the state fleet), the white-and-blue KSRTC, and the sky-blue private buses
// (white bands, a yellow stripe, a big painted name over the windscreen). `upper` = the colour of the window storey.
// =====================================================================================================
const BUS_LIVERY = {
  ksrtc: { body: 0xc43b33, upper: 0xf1de97, dark: 0x9f2e2a, band: 0xf3e6b4, stripe: 0xf1de97, glass: 0x9fb8c4, name: ['കെഎസ്ആർടിസി', 'KSRTC'], tag: '#a52a2a', sub: 'കേരള സ്റ്റേറ്റ് · Kerala State', fleet: true },
  ksrtcWhite: { body: 0xe9edf0, upper: 0xe9edf0, dark: 0x2f5aa8, band: 0xf5f6f7, stripe: 0x2f5aa8, glass: 0x9fb8c4, name: ['കെഎസ്ആർടിസി', 'KSRTC'], tag: '#2f58a5', sub: 'ഫാസ്റ്റ് പാസഞ്ചർ · Fast Passenger', fleet: true },
  private: { body: 0x56b6e2, upper: 0x56b6e2, dark: 0x3f93c2, band: 0xf1f6f9, stripe: 0xf2c230, glass: 0xa7c4cf, name: null, tag: '#2b79a8', sub: null, priv: true },
};
const BUS_KINDS = ['private', 'ksrtc', 'private', 'ksrtcWhite', 'private'];
const PRIVATE_NAMES = [['അഞ്ജലി', 'ANJALI'], ['തരംഗം', 'THARANGAM'], ['കായൽ', 'KAYAL'], ['മൈത്രി', 'MAITHRI'], ['അരുണിമ', 'ARUNIMA'], ['സ്നേഹ', 'SNEHA']]; // invented names
const BUS_ROUTES = [
  ['9B', 'ഫോർട്ട് കൊച്ചി', 'FORT KOCHI'], ['66', 'ഇൻഫോപാർക്ക്', 'INFOPARK'], ['15', 'എറണാകുളം ജങ്ഷൻ', 'ERNAKULAM JN'], ['7A', 'മട്ടാഞ്ചേരി', 'MATTANCHERRY'],
  ['32', 'ചെറായി', 'CHERAI'], ['21', 'ഹൈക്കോർട്ട്', 'HIGH COURT'], ['48', 'മറൈൻ ഡ്രൈവ്', 'MARINE DRIVE'], ['11', 'ബോൾഗാട്ടി', 'BOLGATTY'],
];
const WINDOW_SKIN = [C.skin1, C.skin2, C.skin3, C.skin4];

export function createBus(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"deluxe"}
  const seed = opts.seed ?? 3;
  const kind = opts.kind ?? BUS_KINDS[Math.abs(seed) % BUS_KINDS.length];
  const L = BUS_LIVERY[kind];
  const route = BUS_ROUTES[Math.abs(opts.routeIx ?? seed * 3 + 1) % BUS_ROUTES.length];
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const vajra = false; // (no AC pod: Kochi's buses are ordinary single-deck buses)
  const pname = PRIVATE_NAMES[Math.abs(opts.nameIx ?? seed) % PRIVATE_NAMES.length];
  // lower body, window band, roof band (one long rounded single deck)
  p.round(3.1, 1.25, 10.3, L.body, { pos: [0, 1.4, 0], r: 0.35, seg: 1 });
  p.round(3.12, 1.2, 10.1, L.upper ?? L.body, { pos: [0, 2.6, -0.05], r: 0.3, seg: 1 });
  p.round(2.96, 0.3, 10.1, L.band, { pos: [0, 3.35, -0.05], r: 0.12 }); // roof
  p.round(3.14, 0.3, 10.35, L.dark, { pos: [0, 0.86, 0], r: 0.1 }); // skirt
  p.box(3.16, 0.14, 10.2, L.stripe, { pos: [0, 2.0, 0], outline: false }); // waist stripe (cream on KSRTC red, blue, yellow on the private blue)
  if (L.priv) { p.box(3.17, 0.1, 10.2, 0xf4f8fa, { pos: [0, 1.62, 0], outline: false }); p.box(3.17, 0.1, 10.2, 0xf4f8fa, { pos: [0, 1.2, 0], outline: false }); } // the white bands low on the sides
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

  // destination boards: amber on charcoal, route number + Kannada destination + English
  const board = (w, h) => plaque(ink, w, h, (ctx, cw, ch) => {
    boardRect(ctx, 5, 5, cw - 10, ch - 10, { fill: '#2f2a42', hatch: 'rgba(90,80,140,0.8)', cw, ch, lw: 4, round: 12, r: rng(seed + 2) });
    hand(ctx, route[0], cw * 0.13, ch * 0.7, { size: ch * 0.6, fill: '#ffe27a', seed: 3, align: 'center' });
    taText(ctx, route[1], cw * 0.58, ch * 0.5, { size: ch * 0.4, fill: '#ffc86a', maxW: cw * 0.6 });
    hand(ctx, route[2], cw * 0.58, ch * 0.9, { size: ch * 0.3, fill: '#fffbe9', seed: 4, maxW: cw * 0.6 });
  }, { ppu: 150, depth: 0.08, frame: 0x2f2a42, thickness: 1.6 });
  if (L.priv) { // the private bus's name, painted big over the windscreen in white on blue with a red-and-yellow fringe, and the owner's lettering low on the sides
    const nameBoard = plaque(ink, 2.8, 0.42, (ctx, cw, ch) => {
      ctx.fillStyle = '#3f93c2'; ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = '#e8453c'; ctx.fillRect(0, ch * 0.86, cw, ch * 0.14);
      ctx.fillStyle = '#f2c230'; for (let x = 0; x < cw; x += 26) ctx.fillRect(x, ch * 0.86, 13, ch * 0.14);
      taText(ctx, pname[0], cw * 0.3, ch * 0.74, { size: ch * 0.7, fill: '#fffdf5', stroke: '#1f3a5c', sw: 5, maxW: cw * 0.5 });
      hand(ctx, pname[1], cw * 0.74, ch * 0.7, { size: ch * 0.55, fill: '#fffdf5', stroke: '#1f3a5c', sw: 5, seed: 6, maxW: cw * 0.42 });
    }, { ppu: 150, depth: 0.04, thickness: 1.4, frame: 0x3f93c2 });
    nameBoard.position.set(0, 3.52, 5.1); body.add(nameBoard);
  }
  const fb = board(2.6, 0.55); fb.position.set(0, 3.0, 5.26); body.add(fb);
  const rb = board(1.6, 0.4); rb.position.set(0, 3.1, -5.22); rb.rotation.y = Math.PI; body.add(rb);
  for (const sx of [-1, 1]) {
    const sb = board(1.2, 0.45); sb.position.set(sx * 1.62, 3.05, sx > 0 ? 4.2 : 3.4); sb.rotation.y = sx * Math.PI / 2; sb.scale.set(0.8, 0.8, 1); body.add(sb);
    const ad = plaque(ink, 5.2, 0.62, (ctx, cw, ch) => {
      if (L.priv) { // painted owner's name on the blue side, white lettering, a yellow underline
        ctx.fillStyle = '#56b6e2'; ctx.fillRect(0, 0, cw, ch);
        taText(ctx, pname[0], cw * 0.3, ch * 0.74, { size: ch * 0.74, fill: '#fffdf5', stroke: '#1f3a5c', sw: 5, maxW: cw * 0.4 });
        hand(ctx, pname[1] + ' · ' + 'KOCHI', cw * 0.72, ch * 0.7, { size: ch * 0.56, fill: '#fffdf5', stroke: '#1f3a5c', sw: 5, seed: 8, maxW: cw * 0.46 });
        ctx.fillStyle = '#f2c230'; ctx.fillRect(cw * 0.04, ch * 0.9, cw * 0.92, ch * 0.07);
        return;
      }
      boardRect(ctx, 4, 4, cw - 8, ch - 8, { fill: kind === 'ksrtcWhite' ? '#eef0f4' : '#f6ecc8', hatch: kind === 'ksrtcWhite' ? 'rgba(150,160,185,0.55)' : 'rgba(235,180,90,0.55)', cw, ch, lw: 4, round: 16, r: rng(11 + sx) });
      taText(ctx, L.name[0], cw * 0.18, ch * 0.74, { size: ch * 0.6, fill: L.tag, maxW: cw * 0.3 });
      hand(ctx, L.name[1], cw * 0.46, ch * 0.74, { size: ch * 0.6, fill: L.tag, stroke: '#fff', sw: 4, seed: 8, maxW: cw * 0.2 });
      taText(ctx, L.sub, cw * 0.77, ch * 0.72, { size: ch * 0.44, fill: '#4a4560', maxW: cw * 0.4, weight: 'normal' });
    }, { ppu: 120, depth: 0.05, frame: L.priv ? 0x56b6e2 : 0xf6ecc8, thickness: 1.6 });
    ad.position.set(sx * 1.6, 1.3, 0.5); ad.rotation.y = sx * Math.PI / 2; body.add(ad);
  }
  const plate = plateTN(seed + 1, '07');
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
// Auto-rickshaw (open sides): a Kochi auto: black body, yellow upper cowl and trim, black canvas hood; about one in four has a yellow hood and rear band
// =====================================================================================================
export function createAutoRickshaw(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"kind":"deluxe"}
  const seed = opts.seed ?? 5;
  const green = opts.yellowTop ?? (Math.abs(seed) % 4 === 3); // (kept name) about one in four has the yellow hood
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const YEL = 0xf2c632, GR = 0x4d495f; // GR = the black body (a touch lighter than ink so the folds read)
  const HOOD = green ? 0xe9bd2c : 0x34303d; // black canvas roof (yellow on one in four)
  // body in black with a yellow upper cowl band + a yellow stripe at the rear
  p.side([[-1.55, 0.55], [-1.6, 1.2], [-0.6, 1.3], [0.7, 1.3], [1.3, 1.1], [1.6, 0.8], [1.5, 0.45], [-1.2, 0.4]], 1.55, GR, { bevel: 0.06, round: 0.25 });
  p.ball(0.82, GR, { pos: [0, 1.2, 1.1], scale: [0.95, 0.85, 1.05], w: 12, h: 8 });
  p.box(1.45, 0.95, 0.06, C.glass, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0] });
  p.box(1.55, 0.07, 0.08, C.kaali, { pos: [0, 1.5, 0.55], rot: [-0.22, 0, 0], outline: false });
  p.box(0.07, 0.95, 0.08, C.kaali, { pos: [0, 1.98, 0.68], rot: [-0.22, 0, 0], outline: false });
  for (const sx of [-1, 1]) {
    p.tube([sx * 0.76, 1.3, 0.62], [sx * 0.76, 2.42, 0.46], 0.05, C.kaali, { seg: 5 });
    p.tube([sx * 0.78, 1.3, -1.45], [sx * 0.78, 2.42, -1.4], 0.05, C.kaali, { seg: 5 });
  }
  p.round(1.75, 0.2, 2.35, HOOD, { pos: [0, 2.48, -0.5], r: 0.08, seg: 2 });
  p.box(1.8, 0.07, 2.4, C.kaali, { pos: [0, 2.38, -0.5], outline: false });
  p.round(1.2, 0.14, 0.34, HOOD, { pos: [0, 2.46, 0.72], r: 0.06, rot: [-0.1, 0, 0] }); // the hood's front peak
  p.ball(0.8, YEL, { pos: [0, 1.5, 1.12], scale: [0.97, 0.5, 1.04], w: 12, h: 8 }); // yellow upper cowl under the windscreen
  p.box(1.6, 0.1, 0.06, YEL, { pos: [0, 1.28, -1.78], outline: false }); // yellow band across the back
  for (const sx of [-1, 1]) p.box(0.05, 0.12, 2.3, YEL, { pos: [sx * 0.79, 1.3, -0.2], outline: false }); // yellow beading along the sides
  p.round(1.35, 0.26, 0.7, C.maroon, { pos: [0, 1.4, -0.95], r: 0.08 });
  p.round(1.35, 0.7, 0.18, C.maroon, { pos: [0, 1.82, -1.4], r: 0.07, rot: [-0.1, 0, 0] });
  p.round(0.6, 0.22, 0.45, C.maroon, { pos: [0, 1.35, 0.15], r: 0.07 });
  p.tube([0, 1.4, 0.85], [0, 1.8, 0.5], 0.04, C.steelDark, { seg: 5 });
  p.box(1.0, 0.06, 0.06, C.steelDark, { pos: [0, 1.82, 0.5], outline: false });
  for (const sx of [-1, 1]) p.ball(0.06, C.kaali, { pos: [sx * 0.5, 1.82, 0.5], outline: false, w: 5, h: 4 });
  // a little fare meter on the dash
  p.round(0.34, 0.2, 0.12, 0x4b4363, { pos: [0.32, 1.96, 0.46], r: 0.03, outline: false });
  p.box(0.22, 0.08, 0.02, 0x9fe3a9, { pos: [0.32, 1.98, 0.53], outline: false });
  eyes(p, { x: 0, y: 1.52, z: 1.7, r: 0.3, flat: 0.6, look: [0.1, 0.15] });
  smile(p, { y: 0.88, z: 1.86, R: 0.3, t: 0.045 });
  p.box(1.5, 0.95, 0.07, C.kaali, { pos: [0, 1.95, -1.65], rot: [0.05, 0, 0], outline: false });
  p.round(1.4, 0.55, 0.6, GR, { pos: [0, 1.05, -1.5], r: 0.1 });
  p.round(0.18, 0.2, 0.08, C.bestRed, { pos: [0.5, 1.15, -1.82], r: 0.03, outline: false });
  p.round(1.2, 0.12, 0.2, C.steel, { pos: [0, 0.5, 1.75], r: 0.05 });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'auto-body' }));
  const roofText = plaque(ink, 1.5, 0.3, (ctx, w, h) => {
    boardRect(ctx, 4, 4, w - 8, h - 8, { fill: '#fffbd4', hatch: 'rgba(200,210,100,0.6)', cw: w, ch: h, lw: 3, round: 8, r: rng(5) });
    taText(ctx, 'ഓട്ടോ', w * 0.3, h * 0.74, { size: h * 0.66, fill: '#3f4a8a' });
    hand(ctx, 'AUTO', w * 0.7, h * 0.72, { size: h * 0.6, fill: '#3f4a8a', seed: 3 });
  }, { ppu: 150, depth: 0.03, thickness: 1.4, frame: 0xfffbd4 });
  roofText.position.set(0, 2.5, 0.0); roofText.rotation.set(-1.42, 0, 0); roofText.position.y = 2.575;
  body.add(roofText);
  const plate = plateTN(seed + 2);
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
  const SC = 0xe9eef3, SD = 0xc7d0da, ORANGE = 0xf08a3c;
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
  p.box(0.94, 0.05, 0.9, 0xd9722a, { pos: [0, 2.35, -1.45], outline: false });
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
// Kochi Metro coach (reference: File:Beautiful Kochi Metro Train.jpg, File:Kochi Metro Train in Station.jpg): a smooth teal body with a dark glass
// band, closed sliding doors, a black-masked cab front with slim white lamps and a pale roof. The women's coach is the same teal with a pink stripe
// under the windows, pink door panels and big സ്ത്രീകൾ · WOMEN lettering; only women are drawn in its windows.
// =====================================================================================================
const LIVERY = {
  metro: { upper: '#3fcbbd', hatchU: 'rgba(8,110,112,0.35)', lower: '#24a3a8', hatchL: 'rgba(5,50,58,0.6)', accent: '#e8f6f4', body: 0x3fcbbd, base: 0x24a3a8, roof: 0xe6ebee, label: 'METRO', door: '#52d6c8', glass: '#3a4f63' },
};
const SKINS = ['#e9b58f', '#c98a62', '#a56a48', '#f1c9a5'];
const PINK = '#ea6a9d', PINK_D = '#b83a6e';

function trainSideCanvas(L, isEngine, seed, ladies = false) {
  // 8 x 2.7 units -> 1280 x 432 px (160 px/unit)
  const W = 1280, H = 432;
  return paintCanvas(W, H, (ctx) => {
    const r = rng(seed * 13 + 1);
    // base fill (teal, pencil-hatched)
    ctx.fillStyle = L.upper; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.strokeStyle = L.hatchU; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.5;
    for (let x = -H; x < W + H; x += 9) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - H * 0.8, H); ctx.stroke(); }
    ctx.restore();
    // darker lower band (the skirt), with a stripe: pink on the women's coach, white on the others
    ctx.fillStyle = L.lower; ctx.fillRect(0, H * 0.8, W, H * 0.2);
    ctx.save(); ctx.strokeStyle = L.hatchL; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.rect(0, H * 0.8, W, H * 0.2); ctx.clip();
    for (let x = -H; x < W + H; x += 8) { ctx.beginPath(); ctx.moveTo(x, H * 0.8); ctx.lineTo(x - H * 0.3, H); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle = ladies ? PINK : L.accent; ctx.fillRect(0, H * 0.76, W, H * 0.035);
    wobblyLine(ctx, [[0, H * 0.8], [W * 0.5, H * 0.805], [W, H * 0.8]], { r, lw: 3, amp: 1.5 });
    // window / door positions: three sliding doors, windows between
    const doors = [W * 0.17, W * 0.5, W * 0.83];
    const dw = 150;
    const spans = [];
    let x0 = 22;
    for (const d of doors) { spans.push([x0, d - dw / 2 - 12]); x0 = d + dw / 2 + 12; }
    spans.push([x0, W - 22]);
    // one long dark glass band per span: tall windows with thin pillars and a few curious faces
    for (const [a, b] of spans) {
      const n = Math.max(1, Math.round((b - a) / 140));
      const ww = (b - a) / n;
      for (let i = 0; i < n; i++) {
        const x = a + i * ww + 4, w = ww - 8, y = H * 0.13, h = H * 0.5;
        drawShape(ctx, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fill: L.glass, hatch: 'rgba(170,215,235,0.55)', w: W, h: H, r, amp: 1.5, lw: 3.2 });
        ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(x + 6, y + 6, w * 0.22, h - 12); // glare
        if (r() < 0.55) {
          const fx = x + w * (0.3 + r() * 0.4), fy = y + h * 0.66;
          drawShape(ctx, Array.from({ length: 8 }, (_, j) => [fx + Math.cos((j / 8) * TAU) * 20, fy + Math.sin((j / 8) * TAU) * 21]), { fill: SKINS[Math.floor(r() * 4)], hatch: 'rgba(120,70,40,0.4)', w: W, h: H, r, amp: 1, lw: 2.4 });
          ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(fx - 7, fy - 2, 2.6, 0, TAU); ctx.arc(fx + 7, fy - 2, 2.6, 0, TAU); ctx.fill();
          if (ladies || r() < 0.4) { ctx.beginPath(); ctx.arc(fx, fy - 25, 9, 0, TAU); ctx.fill(); if (r() < 0.5) { ctx.fillStyle = '#fbf8ee'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(fx - 7 + k * 7, fy - 33, 2.6, 0, TAU); ctx.fill(); } } } // hair bun (+ jasmine)
          else { ctx.fillRect(fx - 7, fy + 4, 14, 3); ctx.beginPath(); ctx.arc(fx, fy - 22, 15, Math.PI, 0); ctx.fill(); } // moustache + short hair
        }
      }
    }
    // closed sliding doors: a pale teal leaf pair with a centre seam and a small window each; women's coach doors take a pink panel
    doors.forEach((d) => {
      const x = d - dw / 2, y = H * 0.1, w = dw, h = H * 0.68;
      ctx.fillStyle = L.accent; ctx.fillRect(x - 6, y - 5, w + 12, h + 10);
      drawShape(ctx, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fill: L.door, hatch: 'rgba(5,70,72,0.5)', w: W, h: H, r, amp: 1.2, lw: 3.4 });
      for (const lx of [x + w * 0.06, x + w * 0.54]) drawShape(ctx, [[lx, y + h * 0.12], [lx + w * 0.4, y + h * 0.12], [lx + w * 0.4, y + h * 0.55], [lx, y + h * 0.55]], { fill: L.glass, hatch: 'rgba(170,215,235,0.5)', w: W, h: H, r, amp: 1, lw: 2.6 });
      wobblyLine(ctx, [[x + w / 2, y + 4], [x + w / 2, y + h - 4]], { r, lw: 3, amp: 0.8 });
      if (ladies) { ctx.fillStyle = PINK; ctx.fillRect(x + w * 0.1, y + h * 0.62, w * 0.8, h * 0.18); }
    });
    // lettering on the skirt (Malayalam + English)
    const ml = (text, x, y, size, fill, maxW) => { ctx.save(); ctx.font = `bold ${size}px ${TA_FONT}`; const w = ctx.measureText(text).width; if (maxW && w > maxW) size *= maxW / w; ctx.font = `bold ${size}px ${TA_FONT}`; ctx.textAlign = 'center'; ctx.fillStyle = fill; ctx.fillText(text, x, y); ctx.restore(); };
    ml('മെട്രോ', W * 0.28, H * 0.965, H * 0.15, '#eafaf7', W * 0.1); hand(ctx, L.label, W * 0.4, H * 0.965, { size: H * 0.14, fill: '#eafaf7', seed: 2, maxW: W * 0.12 });
    if (ladies) {
      // big pink women's-coach panels between the doors (and on the skirt): സ്ത്രീകൾ · WOMEN
      for (const cx of [W * 0.335, W * 0.665]) {
        drawShape(ctx, [[cx - 105, H * 0.6], [cx + 105, H * 0.6], [cx + 105, H * 0.76], [cx - 105, H * 0.76]], { fill: '#ffe3ee', hatch: 'rgba(200,60,110,0.5)', w: W, h: H, r, amp: 1.2, lw: 3 });
        ml('സ്ത്രീകൾ', cx - 38, H * 0.715, H * 0.085, PINK_D, 92); hand(ctx, 'WOMEN', cx + 52, H * 0.715, { size: H * 0.075, fill: PINK_D, seed: 3, maxW: 92 });
      }
      ml('സ്ത്രീകൾ', W * 0.64, H * 0.965, H * 0.15, '#ffe3ee', W * 0.14); hand(ctx, 'WOMEN', W * 0.82, H * 0.965, { size: H * 0.14, fill: '#ffe3ee', seed: 6, maxW: W * 0.15 });
      // pink door-top bar over the middle door as on the real coach
      ctx.fillStyle = PINK; ctx.fillRect(W * 0.5 - 90, H * 0.045, 180, H * 0.05);
      ml('സ്ത്രീകൾ', W * 0.5 - 38, H * 0.088, H * 0.045, '#fff', 80); hand(ctx, 'WOMEN', W * 0.5 + 42, H * 0.088, { size: H * 0.04, fill: '#fff', seed: 9, maxW: 80 });
    } else {
      ml('പൊതു', W * 0.64, H * 0.965, H * 0.14, '#eafaf7', W * 0.1); hand(ctx, 'GENERAL', W * 0.8, H * 0.965, { size: H * 0.14, fill: '#eafaf7', seed: 6, maxW: W * 0.15 });
    }
    hand(ctx, '' + (1000 + Math.floor(seed * 37) % 900), W * 0.07, H * 0.965, { size: H * 0.13, fill: '#eafaf7', seed: 4 });
  });
}

/**
 * One metro coach (~8 long, 3 wide, ~4 high). Chain cars by spacing them 8.3 apart along the track.
 * opts: { isEngine=false (cab front at +z with face), ladies (the women's coach; the cab coach can be one), seed }
 */
export function createTrainCar(ink, opts = {}) {
  if (ink && !ink.createInkMaterial && typeof ink === 'object') { opts = ink; ink = undefined; } // lab: &spec={"ladies":true}
  const isEngine = !!opts.isEngine;
  const ladies = !!opts.ladies;
  const seed = opts.seed ?? 1;
  const L = LIVERY.metro;
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  const p = new Mix();
  const LEN = 8, HW = 1.5;
  // shell (rounded teal box), darker skirt
  p.round(2.96, 2.9, LEN - 0.1, L.body, { pos: [0, 2.2, 0], r: 0.3, seg: 1 });
  p.round(3.0, 0.4, LEN - 0.05, L.base, { pos: [0, 0.95, 0], r: 0.1 });
  // gently arched pale roof
  p.add(new THREE.CylinderGeometry(1.0, 1.0, LEN - 0.2, 14, 1, false, Math.PI / 2, Math.PI), L.roof, { pos: [0, 3.62, 0], rot: [Math.PI / 2, 0, 0], scale: [1.5, 1, 0.5] });
  p.round(3.04, 0.12, LEN - 0.05, 0xe8ecee, { pos: [0, 3.62, 0], r: 0.04, outline: false });
  // underframe + bogies
  p.box(2.2, 0.35, LEN - 1.2, 0x4d5663, { pos: [0, 0.62, 0], outline: false });
  for (const z of [-2.7, 2.7]) p.round(2.3, 0.28, 2.4, 0x3d4655, { pos: [0, 0.5, z], r: 0.06, outline: false });
  // roof furniture: two air-conditioning boxes
  for (const z of [-1.8, 1.2]) p.round(1.3, 0.22, 1.5, 0xd5dbdf, { pos: [0, 4.0, z], r: 0.07 });
  // couplers at both ends
  for (const sz of [-1, 1]) p.cyl(0.12, 0.12, 0.5, C.steelDark, { pos: [0, 0.9, sz * 4.15], rot: [Math.PI / 2, 0, 0], seg: 6, outline: false });
  if (isEngine) {
    // cab front: teal face, a big black-masked windscreen, slim white lamps, a dark bumper; keeps the smiley eyes
    p.round(2.9, 2.6, 0.18, L.body, { pos: [0, 2.3, 3.98], r: 0.12 });
    p.round(2.4, 1.5, 0.1, 0x23303b, { pos: [0, 2.85, 4.1], r: 0.1 }); // the black mask
    p.round(2.2, 0.95, 0.06, 0x4f6b82, { pos: [0, 3.0, 4.16], r: 0.05 }); // windscreen
    p.round(2.92, 0.8, 0.22, 0x2d3640, { pos: [0, 0.98, 3.99], r: 0.1 }); // dark bumper
    for (const sx of [-1, 1]) p.round(0.5, 0.1, 0.1, 0xf7f3e4, { pos: [sx * 1.0, 1.45, 4.12], r: 0.04, rot: [0, 0, sx * 0.25] }); // slim lamps
    eyes(p, { x: 0.72, y: 1.95, z: 4.14, r: 0.28, look: [0.1, 0.15] });
    smile(p, { y: 1.5, z: 4.16, R: 0.36, t: 0.05 });
    blush(p, { x: 1.15, y: 1.62, z: 4.14, r: 0.12 });
  } else {
    // flat ends with a rubbery gangway frame
    for (const sz of [-1, 1]) {
      p.round(2.0, 2.4, 0.2, 0x37424f, { pos: [0, 2.2, sz * 4.0], r: 0.12 });
      p.round(1.4, 2.0, 0.12, C.glassDark, { pos: [0, 2.25, sz * 4.1], r: 0.1, outline: false });
    }
  }
  // a pale stripe along the roof edge
  for (const sx of [-1, 1]) p.box(0.04, 0.05, LEN - 0.4, L.accent ? 0xe8f6f4 : 0xffffff, { pos: [sx * 1.51, 3.55, 0], outline: false });
  body.add(Object.assign(meshOf(ink, p, { spacing: 0.12, thickness: 2.4 }), { name: 'train-body' }));

  // painted sides (lit ink material so they shade like the shell)
  const canvas = trainSideCanvas(L, isEngine, seed, ladies);
  const sideMat = texMat(ink, canvas, { spacing: 0.1, strength: 0.4 });
  for (const sx of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(LEN - 0.3, 2.7 * (LEN - 0.3) / 8 * 0.995), sideMat);
    m.position.set(sx * (HW + 0.012), 2.15, 0);
    m.rotation.y = sx * Math.PI / 2;
    m.receiveShadow = true;
    m.layers.enableAll();
    body.add(m);
  }

  // bogie wheels (spin)
  const wheels = [];
  for (const bz of [-2.7, 2.7]) for (const dzz of [-0.55, 0.55]) for (const sx of [-1, 1]) {
    const w = wheelMesh(ink, 0.46, 0.18, { spokes: 2, tyre: 0x3d4655, hub: C.steel, seg: 9 });
    w.position.set(sx * 1.0, 0.46, bz + dzz); g.add(w); wheels.push({ mesh: w, r: 0.46 });
  }
  rig(g, { body, wheels, bounce: 0.012, pitch: 0.003, idle: 0.004 });
  g.userData.length = LEN;
  g.userData.spacing = 8.3; // distance between car centres when chained
  g.userData.isEngine = isEngine;
  g.userData.ladies = ladies;
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
