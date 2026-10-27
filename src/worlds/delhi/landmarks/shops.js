// Street-life shops: a paranthe dhaba (tandoor, big tawa, plastic chairs and a charpai; references: Wikimedia Commons "A shop at Paranthe wali gali in Chandni Chowk",
// "Dal Parantha from Paranthe Wali Gali"), a paan shop, a wall of (invented, gently funny) coaching-centre hoardings, and a roadside GURUDWARA (white marble, a big golden ribbed dome,
// two small golden domes, a golden entrance canopy, a red-carpeted stair and the saffron Nishan Sahib; references: Wikimedia Commons "Gurudwara Bangla Sahib in New Delhi 03-2016", "Nishan Sahib Gurudwara Beri Sahib").
// All local frames: front +Z, base y=0.
import * as THREE from 'three';
import { Kit, PAL, rectPts, makeCanvas, handRng, INK, wobblyLine, drawShape, paintBoard, paintLive, inkText, teText, latin, lineColliders, polyShape, mulberry32, bilingualBoard } from './kit.js';

// ---------------------------------------------------------------- paranthe dhaba (layout kind 'irani'; export name kept)
export function createIraniCafe(ink) {
  const k = new Kit(ink, { hatch: 0.13, seed: 401 });
  const W = 6.6, D = 5.0, H = 6.2;
  const WALL = 0xf2d98f, TRIM = 0xfbf3df, RED = 0xc8402f, CLAY = 0xc2694a, STEEL = 0xcfd3d8, STEEL_D = 0x9aa0a8;
  k.base(W + 1.2, D + 3.4, { color: PAL.stone });
  k.box(WALL, W, H, D, 0, 0, 0);
  k.box(RED, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
  k.box(TRIM, W + 0.4, 0.3, D + 0.4, 0, H, 0);
  // flat roof: crenellated parapet, a black water tank, a dish; and the big rooftop PARANTHE hoarding, the dhaba's landmark
  for (const [w, d, x, z] of [[W + 0.4, 0.22, 0, D / 2 + 0.1], [W + 0.4, 0.22, 0, -D / 2 - 0.1], [0.22, D, W / 2 + 0.1, 0], [0.22, D, -W / 2 - 0.1, 0]]) k.box(WALL, w, 0.7, d, x, H + 0.3, z);
  for (let i = 0; i <= 8; i++) k.box(TRIM, 0.4, 0.3, 0.34, -W / 2 + (i * W) / 8, H + 1.0, D / 2 + 0.1, { outline: false });
  k.cyl(0x2f2c3a, 0.55, 0.62, 0.9, -2.2, H + 0.35, -1.2, { seg: 10 }); k.dome(0x2f2c3a, 0.55, -2.2, H + 1.25, -1.2, { seg: 10, ring: 3, sy: 0.55 });
  k.box(0xe9e2cf, 1.5, 0.35, 1.4, 1.9, H + 0.3, -1.0);
  const hoard = paintBoard(5.6, 2.2, '#c8402f', '#9c2e20', (ctx, Wd, Hh) => {
    teText(ctx, 'पराँठे', Wd * 0.27, Hh * 0.6, Hh * 0.52, { color: '#ffe9a0' });
    latin(ctx, 'PARANTHE', Wd * 0.7, Hh * 0.52, Hh * 0.22, { color: '#fff4d2' });
    latin(ctx, 'STUFFED · DESI GHEE', Wd * 0.7, Hh * 0.7, Hh * 0.11, { color: '#ffd77a' });
    teText(ctx, 'आलू · गोभी · पनीर · मूली', Wd * 0.5, Hh * 0.92, Hh * 0.15, { color: '#fff4d2' });
  }, { seed: 6, px: 80 });
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.07, 0.07, 1.3, sx * 2.5, H + 0.3, 0.6, { seg: 5, outline: false });
  k.box(0x2b2440, 5.8, 2.3, 0.14, 0, H + 1.1, 0.5);
  k.plane(hoard, 5.6, 2.2, [0, H + 2.25, 0.6], 0);
  const f = k.face(0, 0, D / 2, 0);
  // wide openings with a lit interior: the open kitchen counter (left) and the seating hall (right)
  for (const u of [-2.0, 2.0]) {
    f.window(u, 0.5, 1.7, 2.1, { pointed: false, glass: 0xf3d58f, frame: TRIM, bars: 1, sill: true });
    f.box(RED, u, 0.4, 1.9, 0.12, 0.2, 0);
  }
  f.window(0, 0.4, 1.0, 2.0, { pointed: false, glass: 0x6b3b2a, frame: TRIM, bars: 1, sill: false }); // door
  // a big flat tawa and a steel tray of stuffings on the counter shelf (left window)
  { const p = f.pos(-2.0, 1.1, 0.3); k.cyl(0x35313f, 0.55, 0.5, 0.1, p[0], p[1], p[2], { seg: 12, outline: false }); const q = f.pos(-2.6, 1.1, 0.25); k.box(STEEL, 0.5, 0.12, 0.4, q[0], q[1], q[2], { outline: false }); k.ball(0xf2e2b0, 0.14, q[0], q[1] + 0.14, q[2], { seg: 6, ring: 4, outline: false }); }
  // upper floor: shuttered windows + a small balcony, strings of marigold and a hanging banner
  for (const u of [-2.0, 0, 2.0]) {
    f.window(u, 4.45, 0.8, 1.3, { pointed: false, glass: 0x4f7f95, frame: TRIM, bars: 1 });
    f.box(0x3f7f6a, u - 0.62, 4.45, 0.38, 1.3, 0.05, 0.02);
    f.box(0x3f7f6a, u + 0.62, 4.45, 0.38, 1.3, 0.05, 0.02);
    f.box(PAL.ink, u, 4.2, 1.5, 0.05, 0.05, 0.5);
    f.box(PAL.ink, u, 4.7, 1.5, 0.05, 0.05, 0.5);
    for (let i = -3; i <= 3; i++) f.box(PAL.ink, u + i * 0.23, 4.2, 0.03, 0.5, 0.03, 0.5);
    f.box(TRIM, u, 4.05, 1.7, 0.12, 0.6, 0);
  }
  // awning: red and cream stripes
  for (let i = 0; i < 10; i++) {
    const w = (W - 0.2) / 10;
    k.add(new THREE.BoxGeometry(w, 0.06, 1.4), i % 2 ? 0xfaf2de : 0xc8402f, { pos: [-W / 2 + 0.1 + (i + 0.5) * w, 2.75, D / 2 + 0.65], rot: [0.38, 0, 0] });
  }
  // pavement: chequered floor tiles
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) k.box((i + j) % 2 ? 0xf2ead6 : 0x8a7a6a, 0.8, 0.04, 0.8, -2.0 + i * 0.8, 0, D / 2 + 0.6 + j * 0.8, { outline: false });
  // the tandoor at the kerb: a clay drum with a dark mouth, a steel lid and a heap of rotis beside it
  { const tx = 3.8, tz = D / 2 + 1.1;
    k.cyl(CLAY, 0.42, 0.55, 1.05, tx, 0, tz, { seg: 12 });
    k.lathe(CLAY, [[0.43, 0], [0.36, 0.14], [0.3, 0.1]], tx, 1.05, tz, { seg: 12 });
    k.cyl(0x2b2630, 0.2, 0.2, 0.06, tx, 1.12, tz, { seg: 10, outline: false });
    k.cyl(0xe8e2d4, 0.38, 0.38, 0.05, tx + 0.15, 1.1, tz - 0.55, { seg: 10 });
    k.cone(PAL.marigold, 0.1, 0.26, tx, 1.14, tz, { seg: 4, outline: false });
    k.box(STEEL_D, 0.5, 0.05, 0.5, tx - 0.8, 0.9, tz, { outline: false }); }
  // plastic chairs and a table, and a charpai (rope cot) by the wall
  const chair = (x, z, ry, c) => {
    k.box(c, 0.42, 0.06, 0.42, x, 0.45, z, { ry });
    for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(c, 0.05, 0.45, 0.05, x + a * 0.16 * Math.cos(ry) + b * 0.16 * Math.sin(ry), 0, z - a * 0.16 * Math.sin(ry) + b * 0.16 * Math.cos(ry), { ry, outline: false });
    k.box(c, 0.42, 0.45, 0.05, x - Math.sin(ry) * 0.19, 0.5, z - Math.cos(ry) * 0.19, { ry });
  };
  const table = (x, z, cs) => {
    k.box(0xf6efe0, 1.0, 0.07, 0.8, x, 0.72, z);
    for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(PAL.ink, 0.05, 0.72, 0.05, x + a * 0.42, 0, z + b * 0.32, { outline: false });
    chair(x - 0.8, z, Math.PI / 2, cs[0]); chair(x + 0.8, z, -Math.PI / 2, cs[1]); chair(x, z + 0.7, Math.PI, cs[2]);
  };
  table(-1.6, D / 2 + 1.9, [0xe9503f, 0xe9503f, 0xf2f2ea]); table(1.8, D / 2 + 1.9, [0x3f78d0, 0xf2f2ea, 0x3f78d0]);
  k.box(0xb9895a, 1.9, 0.08, 0.9, -W / 2 + 0.2 - 1.2, 0.45, D / 2 + 0.6, { outline: true });
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(0x7a5a3a, 0.08, 0.45, 0.08, -W / 2 - 1.0 + dx * 0.9, 0, D / 2 + 0.6 + dz * 0.38, { outline: false });
  // signboard over the awning (Hindi + English, no brand)
  const sign = paintBoard(5.4, 1.15, '#fff1b8', '#e6c45a', (ctx, Wd, Hh) => {
    teText(ctx, 'मोहन पराँठे वाला', Wd * 0.5, Hh * 0.55, Hh * 0.42, { color: '#a52a1e' });
    latin(ctx, 'MOHAN PARANTHE WALA · SINCE 1975', Wd * 0.5, Hh * 0.9, Hh * 0.2, { color: '#2b2440' });
  }, { seed: 5 });
  k.box(RED, 5.6, 1.15, 0.14, 0, 3.0, D / 2 + 0.07);
  k.plane(sign, 5.4, 1.06, [0, 3.58, D / 2 + 0.2], 0);
  void f;
  const g = k.finish({ lean: 0.008 });
  g.name = 'paratheDhaba';
  g.userData = {
    footprint: 5.2, height: H + 3.4, size: [W, D + 3, H],
    colliders: [...lineColliders(-W / 2 + 1.5, 0, W / 2 - 1.5, 0, 2.5, H, 2.2), { x: -1.6, z: D / 2 + 1.9, radius: 0.6, height: 0.8 }, { x: 1.8, z: D / 2 + 1.9, radius: 0.6, height: 0.8 }],
  };
  return g;
}

// ---------------------------------------------------------------- paan shop
export function createPaanShop(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 411 });
  const W = 2.8, D = 2.0, H = 3.0, GRN = 0x8fcf84, WOOD = 0xc89a6a;
  k.base(W + 0.8, D + 1.4, { color: PAL.stone });
  k.box(GRN, W, 0.2, D, 0, 0, 0); // floor/base
  // frame: posts, counter, back wall, roof
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(WOOD, 0.14, H - 0.4, 0.14, sx * (W / 2 - 0.07), 0.2, sz * (D / 2 - 0.07));
  k.box(0xf0e0a6, W, H - 0.8, 0.1, 0, 0.5, -D / 2 + 0.05); // back
  for (const sx of [-1, 1]) k.box(0xf0e0a6, 0.1, H - 0.8, D, sx * (W / 2 - 0.05), 0.5, 0);
  k.box(GRN, W + 0.2, 1.0, 0.18, 0, 0.2, D / 2 - 0.1); // front counter body
  k.box(WOOD, W + 0.3, 0.1, 0.5, 0, 1.15, D / 2 + 0.08); // counter top
  k.box(PAL.tile, W + 0.5, 0.14, D + 0.6, 0, H - 0.2, 0, {}); // roof slab
  k.add(new THREE.BoxGeometry(W + 0.6, 0.1, 0.9), PAL.tileDark, { pos: [0, H - 0.28, D / 2 + 0.55], rot: [0.3, 0, 0] });
  // shelves with colourful packets/jars
  const cols = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea];
  const r = mulberry32(412);
  for (let row = 0; row < 3; row++) {
    k.box(WOOD, W - 0.2, 0.05, 0.4, 0, 1.45 + row * 0.5, -D / 2 + 0.3);
    for (let i = 0; i < 7; i++) k.box(cols[Math.floor(r() * cols.length)], 0.22, 0.28 + r() * 0.1, 0.14, -W / 2 + 0.3 + i * 0.37, 1.5 + row * 0.5, -D / 2 + 0.3, { outline: false });
  }
  // jars on the counter + leaf trays
  for (const x of [-0.9, -0.5]) k.cyl(0xe8e0cc, 0.13, 0.13, 0.28, x, 1.25, D / 2 + 0.1, { seg: 7 });
  k.cyl(PAL.leaf, 0.3, 0.3, 0.06, 0.4, 1.25, D / 2 + 0.1, { seg: 8 });
  k.cyl(PAL.leaf, 0.2, 0.2, 0.06, 0.95, 1.25, D / 2 + 0.1, { seg: 8 });
  // hanging garlands: lemon-chilli strings + banana bunch
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 6; i++) { k.ball(i % 2 ? 0xf6e45a : 0xd9503f, 0.07, sx * (W / 2 - 0.3), H - 0.35 - i * 0.14, D / 2 + 0.25, { seg: 5, ring: 4, outline: false }); }
    k.cyl(PAL.ink, 0.01, 0.01, 0.9, sx * (W / 2 - 0.3), H - 1.2, D / 2 + 0.25, { seg: 3, outline: false });
  }
  for (let i = 0; i < 5; i++) k.add(new THREE.CylinderGeometry(0.04, 0.07, 0.4, 5), 0xf6e45a, { pos: [-0.2 + i * 0.09, H - 0.6, D / 2 + 0.3], rot: [0.2, 0, (i - 2) * 0.1] });
  // mirror + hand-lettered sign
  k.ball(0xcfe6ee, 0.28, W / 2 - 0.5, 1.8, -D / 2 + 0.2, { sz: 0.2, seg: 8, ring: 6 });
  const sign = paintBoard(1.9, 0.6, '#e9505b', '#a8323b', (ctx, Wd, Hh) => { teText(ctx, 'पान', Wd * 0.3, Hh * 0.72, Hh * 0.6, { color: '#fff4d2' }); latin(ctx, 'PAAN', Wd * 0.7, Hh * 0.7, Hh * 0.5, { color: '#fff4d2' }); }, { seed: 12 });
  k.box(PAL.ink, 2.0, 0.7, 0.1, 0, H + 0.0, D / 2 + 0.0);
  k.plane(sign, 1.9, 0.6, [0, H + 0.38, D / 2 + 0.07], 0);
  // little stool outside
  k.cyl(PAL.woodDark, 0.25, 0.25, 0.4, 1.8, 0, D / 2 + 0.9, { seg: 6 });
  const g = k.finish({ lean: 0.012 });
  g.name = 'paanShop';
  g.userData = { footprint: 2.2, height: H + 0.8, size: [W, D, H], colliders: [{ x: 0, z: 0, radius: 1.45, height: H }, { x: 1.8, z: D / 2 + 0.9, radius: 0.3, height: 0.4 }] };
  return g;
}

// ---------------------------------------------------------------- coaching-centre hoardings (kind 'poster'; export name kept)
// Four invented, gently funny hoardings with cartoon "topper" faces: nobody real, no real institute names.
function topper(ctx, x, y, r, skin, hairY = 0.0) { // a smiling cartoon face with round glasses
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#2b2440'; ctx.beginPath(); ctx.arc(x, y - r * 0.15 + hairY, r * 1.02, Math.PI * 1.05, Math.PI * 1.95); ctx.lineTo(x + r * 0.9, y - r * 0.25); ctx.lineTo(x - r * 0.9, y - r * 0.25); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#2b2440'; ctx.lineWidth = 3;
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sx * r * 0.38, y - r * 0.02, r * 0.26, 0, 6.283); ctx.stroke(); ctx.fillStyle = '#2b2440'; ctx.beginPath(); ctx.arc(x + sx * r * 0.38, y - r * 0.02, r * 0.07, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(x - r * 0.12, y - r * 0.02); ctx.lineTo(x + r * 0.12, y - r * 0.02); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y + r * 0.18, r * 0.5, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); // big smile
}
function posterCanvas(kind, w, h, r) {
  const { c, ctx } = makeCanvas(w, h);
  const star = (cx, cy, R, n, fill) => { ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * 6.283, rr = i % 2 ? R * 0.55 : R; ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  if (kind === 0) { // UPSC: "Your selection is certain*"
    ctx.fillStyle = '#1f3f8f'; ctx.fillRect(0, 0, w, h);
    star(w * 0.5, h * 0.4, w * 0.5, 16, '#f6c13d'); star(w * 0.5, h * 0.4, w * 0.36, 16, '#f08a4b');
    topper(ctx, w * 0.5, h * 0.4, w * 0.2, '#e8b48a');
    teText(ctx, 'IAS बनो, पक्का!*', w / 2, h * 0.1, w * 0.12, { color: '#fff4d2' });
    latin(ctx, 'RANK RAJA', w / 2, h * 0.76, w * 0.17, { color: '#ffe9a0' }); latin(ctx, 'CLASSES', w / 2, h * 0.85, w * 0.17, { color: '#ffffff' });
    teText(ctx, '*शर्तें लागू', w / 2, h * 0.96, w * 0.1, { color: '#c9d4f6' });
  } else if (kind === 1) { // everything batch
    ctx.fillStyle = '#d9503f'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#e86a52' : '#c94432'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.5); ctx.lineTo(w / 2 + Math.cos((i / 9) * 6.283) * w, h * 0.5 + Math.sin((i / 9) * 6.283) * w); ctx.lineTo(w / 2 + Math.cos(((i + 1) / 9) * 6.283) * w, h * 0.5 + Math.sin(((i + 1) / 9) * 6.283) * w); ctx.fill(); }
    topper(ctx, w * 0.5, h * 0.42, w * 0.19, '#d79a6f');
    ctx.fillStyle = '#f6c13d'; for (let i = 0; i < 4; i++) ctx.fillRect(w * 0.24, h * 0.62 + i * 11, w * 0.52, 9); // a stack of books
    teText(ctx, 'JEE + NEET + CAT', w / 2, h * 0.1, w * 0.1, { color: '#fff4d2' }); teText(ctx, 'सब एक ही बैच में!', w / 2, h * 0.2, w * 0.12, { color: '#ffe9a0' });
    latin(ctx, 'DHYAAN', w / 2, h * 0.86, w * 0.18, { color: '#fff4d2' }); latin(ctx, 'ACADEMY', w / 2, h * 0.96, w * 0.17, { color: '#ffd778' });
  } else if (kind === 2) { // tension free
    ctx.fillStyle = '#f6d34a'; ctx.fillRect(0, 0, w, h);
    star(w * 0.5, h * 0.42, w * 0.55, 14, '#f2a93d');
    topper(ctx, w * 0.5, h * 0.44, w * 0.2, '#e8b48a');
    ctx.fillStyle = '#fff7e2'; ctx.fillRect(w * 0.7, h * 0.52, 30, 34); ctx.fillStyle = '#b8693f'; ctx.fillRect(w * 0.7 + 2, h * 0.52 + 10, 26, 22); // chai cup
    teText(ctx, 'पढ़ाई बिना टेंशन*', w / 2, h * 0.1, w * 0.15, { color: '#2b2440' });
    latin(ctx, 'SUCCESS', w / 2, h * 0.84, w * 0.17, { color: '#2b2440' }); latin(ctx, 'NAGAR', w / 2, h * 0.95, w * 0.2, { color: '#d9503f' });
  } else { // 100% result
    ctx.fillStyle = '#3fb7a5'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#52c9b6' : '#2ea594'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.5); ctx.lineTo(w / 2 + Math.cos((i / 9) * 6.283) * w, h * 0.5 + Math.sin((i / 9) * 6.283) * w); ctx.lineTo(w / 2 + Math.cos(((i + 1) / 9) * 6.283) * w, h * 0.5 + Math.sin(((i + 1) / 9) * 6.283) * w); ctx.fill(); }
    topper(ctx, w * 0.3, h * 0.45, w * 0.14, '#e8b48a'); topper(ctx, w * 0.7, h * 0.45, w * 0.14, '#c98a5f'); topper(ctx, w * 0.5, h * 0.6, w * 0.13, '#d79a6f');
    teText(ctx, 'रिज़ल्ट 100%*', w / 2, h * 0.12, w * 0.17, { color: '#fff4d2' }); teText(ctx, 'AIR 1 हमारे यहाँ!', w / 2, h * 0.24, w * 0.085, { color: '#ffe9a0' });
    latin(ctx, 'GYAN-DEEP', w / 2, h * 0.87, w * 0.15, { color: '#fff4d2' }); latin(ctx, 'COACHING', w / 2, h * 0.96, w * 0.15, { color: '#ffd778' });
  }
  return c;
}

function posterWallCanvas() {
  return paintLive(1024, 560, (ctx, W, H, r) => paintWall(ctx, W, H, r), 77);
}
function paintWall(ctx, W, H, r) {
  // plaster, stains
  ctx.fillStyle = '#ead9b0'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(190,150,100,0.14)' : 'rgba(255,255,240,0.14)'; ctx.fillRect(r() * W, r() * H, 10 + r() * 60, 4 + r() * 18); }
  // old scraps of posters
  for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#e8a3a3', '#a9c9e4', '#f2d58a', '#b9d9a0'][i % 4]; ctx.globalAlpha = 0.6; ctx.fillRect(r() * W, r() * H, 40 + r() * 80, 30 + r() * 90); ctx.globalAlpha = 1; }
  // four hoardings
  const pw = 210, ph = 330;
  [[50, 40, -0.02], [296, 56, 0.015], [546, 36, -0.01], [792, 52, 0.02]].forEach(([x, y, rot], i) => {
    ctx.save(); ctx.translate(x + pw / 2, y + ph / 2); ctx.rotate(rot); ctx.translate(-pw / 2, -ph / 2);
    ctx.drawImage(posterCanvas(i, pw, ph, r), 0, 0);
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(0, 0, pw, ph);
    // curled corner / peel
    ctx.fillStyle = '#f3ead2'; ctx.beginPath(); ctx.moveTo(pw, ph); ctx.lineTo(pw - 34, ph); ctx.lineTo(pw, ph - 30); ctx.closePath(); ctx.fill(); ctx.stroke();
    // tape
    ctx.fillStyle = 'rgba(250,240,190,0.7)'; ctx.fillRect(pw / 2 - 20, -6, 40, 14);
    ctx.restore();
  });
  // hand-painted base strip + sign
  ctx.fillStyle = '#c24a3f'; ctx.fillRect(0, H - 90, W, 90);
  ctx.fillStyle = '#fbf1d6';
  inkText(ctx, 'POST NO BILLS', W * 0.26, H - 28, 46, { color: '#fbf1d6' });
  teText(ctx, 'यहाँ पोस्टर लगाना मना है', W * 0.7, H - 52, 34, { color: '#fbf1d6' });
  teText(ctx, '(कोचिंग वाले फिर भी लगाएँगे)', W * 0.7, H - 16, 28, { color: '#ffe9a0' });
  wobblyLine(ctx, rectPts(8, 8, W - 8, H - 8, 10), { r, amp: 4, lw: 7, closed: true });
}

export function createFilmPosterWall(ink) {
  const k = new Kit(ink, { hatch: 0.14, seed: 421 });
  const W = 8.6, H = 4.8, D = 0.7;
  k.base(W + 0.8, 2.4, { color: PAL.stone });
  k.box(0xe8d6ab, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.3, 0.3, D + 0.3, 0, 0, 0);
  k.box(0xf4e9c8, W + 0.3, 0.25, D + 0.3, 0, H, 0);
  for (const sx of [-1, 1]) k.box(0xdcc99a, 0.7, H + 0.2, 1.1, sx * (W / 2 + 0.2), 0, 0); // end buttresses
  // wall painted base colour sits behind the canvas: canvas covers the face
  const wall = posterWallCanvas();
  k.plane(wall, W - 0.2, H - 0.3, [0, H / 2 + 0.05, D / 2 + 0.02], 0);
  // back side: scraps only (blank patched wall) + a few ladders / bicycle for life
  k.box(PAL.wood, 0.12, 3.6, 0.1, W / 2 - 1.0, 0, -D / 2 - 0.5, { rx: -0.25 });
  k.box(PAL.wood, 0.12, 3.6, 0.1, W / 2 - 1.5, 0, -D / 2 - 0.5, { rx: -0.25 });
  for (let i = 0; i < 6; i++) k.box(PAL.wood, 0.55, 0.06, 0.06, W / 2 - 1.25, 0.5 + i * 0.55, -D / 2 - 0.6 - i * 0.0 + 0.0, { outline: false });
  const g = k.finish({ lean: 0.01 });
  g.name = 'coachingHoardings';
  g.userData = { footprint: 5, height: H + 0.3, size: [W, 1.1, H], colliders: lineColliders(-W / 2 + 0.3, 0, W / 2 - 0.3, 0, 0.7, H, 0.9) };
  return g;
}

// ---------------------------------------------------------------- roadside gurudwara (layout kind 'shrine'; export name kept)
let _carpet = null;
function carpetCanvas() { // the red runner and the little sarovar border at the foot of the steps
  if (_carpet) return _carpet;
  const { c, ctx } = makeCanvas(160, 160);
  ctx.fillStyle = 'rgba(200,50,40,0.9)'; ctx.fillRect(0, 0, 160, 160);
  ctx.strokeStyle = '#f2d36a'; ctx.lineWidth = 6; ctx.strokeRect(6, 6, 148, 148);
  ctx.fillStyle = '#f2d36a'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(30 + i * 25, 80, 5, 0, 6.283); ctx.fill(); }
  return (_carpet = c);
}

export function createTempleShrine(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 431 });
  const WH = 0xf8f4ea, WH_D = 0xe2dccd, GOLD = 0xe8b83a, GOLD_L = 0xf5d36a, GOLD_D = 0xc9962a, SAF = 0xf08a1c, RED = 0xc8402f;
  k.base(4.2, 4.4, { color: PAL.stone });
  k.box(0xe4d9c0, 3.8, 0.3, 3.8, 0, 0, 0);
  // the red-carpeted stair at the front
  for (let i = 0; i < 4; i++) k.box(i % 2 ? 0xd96a5a : RED, 1.9 - i * 0.05, 0.14, 0.4, 0, 0.0 + i * 0.1, 2.3 - i * 0.3);
  // marble hall: a plain white block with a cornice, blind arched windows, and the golden canopy over the door
  k.box(WH, 2.8, 2.0, 2.2, 0, 0.3, -0.2);
  k.box(WH_D, 3.0, 0.2, 2.4, 0, 2.3, -0.2);
  const f = k.face(0, 0.3, 0.9, 0);
  f.window(0, 0.2, 1.0, 1.5, { pointed: true, glass: 0x4a3a30, frame: GOLD_L, sill: false });
  for (const sx of [-1, 1]) { f.window(sx * 1.05, 0.7, 0.4, 0.8, { rect: false, glass: 0x7a6a64, frame: WH_D, sill: false }); }
  // golden entrance canopy: a barrel-curved sheet on four slim posts with a scalloped fascia
  k.add(new THREE.CylinderGeometry(0.85, 0.85, 1.7, 12, 1, false, 0, Math.PI), GOLD, { pos: [0, 1.75, 1.45], rot: [0, 0, Math.PI / 2], scale: [0.6, 1, 1.0] });
  for (const sx of [-1, 1]) for (const z of [1.0, 2.1]) k.cyl(GOLD_D, 0.04, 0.05, 1.4, sx * 0.8, 0.3, z, { seg: 5, outline: false });
  for (let i = 0; i < 5; i++) k.ball(GOLD_L, 0.1, -0.7 + i * 0.35, 1.5, 2.28, { seg: 5, ring: 4, outline: false });
  // the big golden ribbed dome on a drum of little arched chhatris, flagged and finialled
  const DY = 2.5;
  k.box(WH, 1.7, 0.9, 1.7, 0, DY, -0.2);
  k.box(WH_D, 1.9, 0.14, 1.9, 0, DY + 0.9, -0.2);
  for (const [dx, dz] of [[-0.82, -1.02], [0.82, -1.02], [-0.82, 0.62], [0.82, 0.62]]) {
    k.cyl(WH, 0.09, 0.09, 0.55, dx, DY + 1.04, dz, { seg: 5 }); k.dome(WH, 0.19, dx, DY + 1.58, dz, { seg: 7, ring: 3, sy: 1.0 });
  }
  const dome = (r, x, y, z) => {
    k.lathe(GOLD, [[0.01, 0], [r * 0.95, 0.02 * r], [r * 1.15, 0.45 * r], [r * 1.0, 0.95 * r], [r * 0.55, 1.4 * r], [r * 0.14, 1.75 * r], [0.01, 1.85 * r]], x, y, z, { seg: 14 });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; k.box(GOLD_L, 0.05, r * 0.95, 0.05, x + Math.sin(a) * r * 1.06, y + r * 0.22, z + Math.cos(a) * r * 1.06, { ry: a, rx: -0.28, outline: false }); }
    k.cone(GOLD_L, 0.07 * r + 0.03, 0.55 * r + 0.1, x, y + 1.85 * r, z, { seg: 5 });
  };
  dome(0.92, 0, DY + 1.04, -0.2);
  // two small golden domes at the front corners
  for (const sx of [-1, 1]) { k.box(WH, 0.72, 0.5, 0.72, sx * 1.15, 2.5, 0.3); dome(0.36, sx * 1.15, 3.0, 0.3); }
  // the Nishan Sahib: a very tall pole in a saffron cloth wrap with a pointed gold finial and a saffron triangular flag, on a little white plinth
  const NX = 1.95, NZ = 1.2;
  k.box(WH_D, 0.5, 0.3, 0.5, NX, 0.3, NZ);
  k.cyl(0xc9ccd2, 0.07, 0.09, 5.6, NX, 0.6, NZ, { seg: 6 });
  k.cyl(SAF, 0.12, 0.12, 2.2, NX, 0.6, NZ, { seg: 7, outline: false });
  k.cone(GOLD_L, 0.12, 0.45, NX, 6.15, NZ, { seg: 5 });
  k.flat(SAF, polyShape([[0, 0], [0, -1.15], [0.95, -0.58]]), NX + 0.05, 5.95, NZ, { ry: 0 });
  k.flat(SAF, polyShape([[0, 0], [0, -1.15], [-0.95, -0.58]]), NX - 0.05, 5.95, NZ, { ry: Math.PI });
  // a bell stand / shoe rack stays with the props (the 'bells' and 'shoes' anchors); a small kada-like brass water pot and a bowl of kada prasad by the stair
  k.cyl(0xd9a23f, 0.17, 0.12, 0.3, -1.4, 0.3, 1.6, { seg: 8 });
  k.cyl(0xd9a23f, 0.22, 0.22, 0.04, -1.4, 0.6, 1.6, { seg: 8, outline: false });
  k.plane(carpetCanvas(), 1.2, 0.7, [0, 0.07, 2.62], 0, -Math.PI / 2);
  // saffron bunting along the front of the hall
  for (let i = 0; i < 9; i++) k.flat(i % 2 ? SAF : 0xfaf6ea, polyShape([[0, 0], [0.22, 0], [0.11, -0.3]]), -0.9 + i * 0.22, 2.1 - Math.sin((i / 8) * Math.PI) * 0.18, 1.45, { ry: 0 });
  // name board (Gurmukhi-free: Hindi + English)
  const nb = paintBoard(1.5, 0.4, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'गुरुद्वारा', W * 0.3, H * 0.76, H * 0.55, { color: '#a02a1c' }); latin(ctx, 'GURUDWARA', W * 0.74, H * 0.7, H * 0.38, { color: '#2b2440' }); }, { seed: 31 });
  k.plane(nb, 1.5, 0.4, [-0.0, 2.6, 0.92], 0);
  const g = k.finish({ lean: 0.01 });
  g.name = 'templeShrine';
  g.userData = { footprint: 2.6, height: 6.7, size: [3.8, 3.8, 6.2], colliders: [{ x: 0, z: -0.1, radius: 1.5, height: 4 }, { x: NX, z: NZ, radius: 0.3, height: 6 }, { x: -1.4, z: 1.6, radius: 0.3, height: 0.6 }] };
  void rectPts; void kolamCanvas;
  return g;
}
function kolamCanvas() { return null; }
