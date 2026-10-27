// Old Delhi havelis and DDA flats (replace the Mumbai chawls; layout kind 'chawl', createChawl(ink, seed)). References: Wikimedia Commons "Haveli Khazanchi, Gali Khazanchi, Old Delhi"
// (faded blue plaster with red-ochre painted panel borders, scalloped multifoil arches on carved columns), "Mirza Ghalib House in Delhi", "View of DDA Flats from Rooftop".
//   haveli: 2-3 storey old-city house in faded painted plaster (blue / mint / ochre / pink) with red-ochre painted panel borders, a ground-floor dalaan (carved-column verandah)
//           of scalloped arches, cusped-arch windows with shutters, a projecting jharokha (oriel) with a little dome, a parapet roof with a chhatri, a water tank, and a
//           tangle of wires and a laundry line across the front. Hindi + English house-name board.
//   DDA flat block: cream-and-grey 4-5 storey concrete block with balcony parapets, window coolers, an open stepped staircase tower, a cluster of black water tanks on the roof,
//           painted window facade. Hindi + English block board.
// Same footprint contract as the chawl: width W x depth D (+ front verandah BZ), front +Z. Anchors/colliders unchanged.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, lineColliders, mulberry32, polyShape, paintBoard, paintLive, latin, teText } from './kit.js';
import { onion } from './parts.js';

const HOUSE_COLORS = [
  { wall: 0xb4c9de, trim: 0xf3ede0, rail: 0x6f4a33, border: '#c4573a', name: 'faded blue' },
  { wall: 0xbfdcc8, trim: 0xf6f3e8, rail: 0x6f4a33, border: '#b54a3a', name: 'mint' },
  { wall: 0xf0d38f, trim: 0xfbf1e2, rail: 0x6f4a33, border: '#b4482f', name: 'ochre' },
  { wall: 0xefc3b8, trim: 0xf6f3e8, rail: 0x6f4a33, border: '#9e3f35', name: 'rose' },
  { wall: 0xe4dcc0, trim: 0xfaf3e0, rail: 0x6f4a33, border: '#b5573a', name: 'old lime' },
  { wall: 0xc9d4ea, trim: 0xf6f3e8, rail: 0x6f4a33, border: '#b84a3a', name: 'powder blue' },
];
const APT_COLORS = [
  { wall: 0xe2d8c0, band: 0xb3a88f, name: 'cream' }, { wall: 0xd6d0c0, band: 0xa39d8c, name: 'grey' }, { wall: 0xe8dcc0, band: 0xbdae88, name: 'sand' }, { wall: 0xd2cdbc, band: 0xa8a28e, name: 'stone' },
];
const DOORS = [0x7a4f33, 0x2f7f86, 0xa8483a, 0xd9a23f, 0x4f6fa8, 0x5f8f55];
const CLOTHES = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea, 0xe23d3d, 0x3fb7a5, 0xf5d86a];
const NAMES = [['शर्मा हवेली', 'SHARMA HAVELI'], ['गुप्ता भवन', 'GUPTA BHAWAN'], ['वर्मा निवास', 'VERMA NIWAS'], ['कपूर मंज़िल', 'KAPOOR MANZIL']];
const APT_NAMES = [['डीडीए फ्लैट्स · ए', 'DDA FLATS · POCKET A'], ['सुंदर अपार्टमेंट्स', 'SUNDAR APARTMENTS'], ['जनता फ्लैट्स', 'JANTA FLATS']];

/** a scalloped (multifoil) arch opening: base at y=0, centred on x; the head is a ring of little foils */
function cuspShape(w, h, foils = 5) {
  const hs = Math.max(0.01, h - w * 0.5);
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, hs);
  const n = foils * 6;
  for (let i = 1; i <= n; i++) {
    const t = (i / n) * Math.PI; // 0 .. PI around the head (right to left)
    const rr = (w / 2) * (1 - 0.1 * (1 - Math.abs(Math.cos(foils * t))));
    s.lineTo(Math.cos(t) * rr, hs + Math.sin(t) * rr * 1.08);
  }
  s.lineTo(-w / 2, 0); s.closePath();
  return s;
}

let _border = null;
/** the red-ochre painted panel borders and rosettes on an old-city plaster wall (transparent, tinted per house by the stripe colour) */
function borderCanvas(col) {
  _border = _border ?? new Map();
  if (_border.has(col)) return _border.get(col);
  const c = paintLive(512, 160, (ctx, W, H, r) => {
    ctx.strokeStyle = col; ctx.lineWidth = 5;
    for (const [x0, x1] of [[10, 160], [180, 330], [350, 502]]) { ctx.strokeRect(x0, 14, x1 - x0, H - 28); ctx.lineWidth = 2.5; ctx.strokeRect(x0 + 8, 22, x1 - x0 - 16, H - 44); ctx.lineWidth = 5; const cx = (x0 + x1) / 2; ctx.fillStyle = col; for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.283; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 11, 34 + Math.sin(a) * 11, 6, 0, 6.283); ctx.fill(); } }
  }, 3);
  _border.set(col, c);
  return c;
}

const _nameBoards = new Map();
function nameBoard(list, i, fill, hatch) {
  const key = list === NAMES ? 'h' + i : 'a' + i;
  if (!_nameBoards.has(key)) _nameBoards.set(key, paintBoard(3.0, 0.95, fill, hatch, (ctx, W, H) => { teText(ctx, list[i][0], W / 2, H * 0.54, H * 0.46, { color: '#7a2f2f' }); latin(ctx, list[i][1], W / 2, H * 0.9, H * 0.2, { color: '#2b2440' }); }, { seed: 7, px: 90 }));
  return _nameBoards.get(key);
}

const _facade = new Map();
/** a painted DDA-flat facade: grid of windows with parapet balconies and green window coolers, hand-inked */
export function aptFacade(wallHex, storeys, cols, seed) {
  const key = wallHex + ':' + storeys + ':' + cols + ':' + seed;
  if (_facade.has(key)) return _facade.get(key);
  const W = 64 * cols, H = 64 * storeys;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(seed * 7 + 3);
  const pw = W / cols, ph = H / storeys;
  for (let j = 0; j < storeys; j++) for (let i = 0; i < cols; i++) {
    const x = i * pw + pw * 0.2, y = j * ph + pw * 0.0 + ph * 0.2, w = pw * 0.6, h = ph * 0.55;
    ctx.fillStyle = r() > 0.88 ? '#f4d98f' : '#5a7a96';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(x + 2, y + 2, w * 0.3, h - 4);
    ctx.strokeStyle = '#2b2440'; ctx.lineWidth = 2.4; ctx.strokeRect(x, y, w, h);
    // concrete balcony parapet with a jali band on alternate bays
    if ((i + j) % 2 === 0) {
      ctx.fillStyle = '#c8bfae'; ctx.fillRect(x - 6, y + h * 0.62, w + 12, h * 0.7); ctx.lineWidth = 1.8; ctx.strokeRect(x - 6, y + h * 0.62, w + 12, h * 0.7);
      ctx.fillStyle = 'rgba(70,60,70,0.5)'; for (let b = 0; b < 5; b++) ctx.fillRect(x - 2 + b * ((w + 4) / 5), y + h * 0.78, 4, h * 0.34);
    }
    if (r() > 0.8) { ctx.fillStyle = ['#e84f6b', '#f2b33f', '#4ea6d8', '#fff'][Math.floor(r() * 4)]; ctx.fillRect(x + w * 0.1, y + h * 1.12, w * 0.35, h * 0.3); } // laundry on the parapet
    // desert cooler hanging in the window
    if (r() > 0.7) { ctx.fillStyle = '#7fb89a'; ctx.fillRect(x + w * 0.55, y + h * 0.1, w * 0.55, h * 0.62); ctx.strokeRect(x + w * 0.55, y + h * 0.1, w * 0.55, h * 0.62); ctx.fillStyle = '#2b2440'; for (let b = 0; b < 3; b++) ctx.fillRect(x + w * 0.62, y + h * (0.22 + b * 0.16), w * 0.4, 2); }
  }
  ctx.strokeStyle = 'rgba(43,36,64,0.5)'; ctx.lineWidth = 2;
  for (let j = 1; j < storeys; j++) { ctx.beginPath(); ctx.moveTo(0, j * ph + 1); ctx.lineTo(W, j * ph + 1); ctx.stroke(); }
  _facade.set(key, c);
  return c;
}

let _stair = null;
/** the open stepped staircase tower of a DDA block: slanted flights between landings in a framed opening */
function stairCanvas() {
  if (_stair) return _stair;
  const W = 120, H = 360, { c, ctx } = makeCanvas(W, H), r = handRng(21);
  ctx.fillStyle = '#d4ccb8'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#8a8296'; ctx.fillRect(10, 8, W - 20, H - 16);
  ctx.strokeStyle = '#efe6d0'; ctx.fillStyle = '#efe6d0'; ctx.lineWidth = 2.5;
  const n = 6, ph = (H - 16) / n;
  for (let i = 0; i < n; i++) { const y = 8 + i * ph; ctx.fillRect(10, y + ph - 6, W - 20, 6); ctx.beginPath(); if (i % 2) { ctx.moveTo(W - 14, y + ph - 6); ctx.lineTo(14, y + 6); } else { ctx.moveTo(14, y + ph - 6); ctx.lineTo(W - 14, y + 6); } ctx.stroke(); }
  ctx.strokeStyle = '#2b2440'; ctx.lineWidth = 3; ctx.strokeRect(10, 8, W - 20, H - 16);
  return (_stair = c);
}

/** apartment is chosen by seed: a few named blocks plus every second filler */

export const isApartment = (seed) => seed === 6 || seed === 12 || seed === 14 || (seed >= 30 && seed % 2 === 0);

function aptBlock(ink, seed, rnd) {
  const col = APT_COLORS[Math.abs(seed) % APT_COLORS.length];
  const storeys = rnd() > 0.5 ? 5 : 4;
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.2, H = storeys * FH, BZ = 1.35;
  const k = new Kit(ink, { hatch: 0.14, seed: 200 + seed });
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(col.wall, W, H, D, 0, 0, 0);
  k.box(col.band, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
  k.box(0xf0ead8, W + 0.3, 0.3, D + 0.3, 0, H, 0);
  // roof parapet with a pierced (jali) band
  for (const [w, d, x, z] of [[W + 0.1, 0.2, 0, D / 2 + 0.05], [W + 0.1, 0.2, 0, -D / 2 - 0.05], [0.2, D, W / 2 + 0.05, 0], [0.2, D, -W / 2 - 0.05, 0]]) k.box(col.wall, w, 0.55, d, x, H + 0.3, z);
  // painted window facade (front and back)
  const cols = Math.round(W / 2.1);
  const fc = aptFacade(col.wall, storeys - 1, cols, seed % 3);
  k.planes_(fc, [
    { w: W - 0.2 - 2.4, h: (storeys - 1) * FH, pos: [-1.2, FH + ((storeys - 1) * FH) / 2, D / 2 + 0.03], ry: 0 },
    { w: W - 0.2, h: (storeys - 1) * FH, pos: [0, FH + ((storeys - 1) * FH) / 2, -D / 2 - 0.03], ry: Math.PI },
  ]);
  // ground floor: shuttered shops / garages
  const f = k.face(0, 0, D / 2, 0);
  for (let i = 0; i < cols - 1; i++) {
    const u = -W / 2 + 0.6 + (i + 0.5) * ((W - 1.2 - 2.4) / (cols - 1));
    f.window(u, 0.4, 0.95, 1.6, { rect: true, glass: i % 2 ? 0x6b7a86 : DOORS[(seed + i) % DOORS.length], frame: 0xf0ead8, bars: 1, sill: false });
  }
  // the open stepped staircase tower at the right-hand end (a slightly proud box with slanted flights)
  const sx = W / 2 - 1.2;
  k.box(col.band, 2.4, H + 0.9, 1.0, sx, 0, D / 2 + 0.5);
  k.box(0xf0ead8, 2.6, 0.26, 1.2, sx, H + 0.9, D / 2 + 0.5);
  k.plane(stairCanvas(), 2.2, H + 0.4, [sx, (H + 0.4) / 2 + 0.2, D / 2 + 1.03], 0);
  // real 3D balcony slabs + parapets on two bays per floor so the silhouette has depth
  for (let s2 = 1; s2 < storeys; s2++) for (const u of [-W / 4 - 0.8, W / 4 - 1.6]) {
    f.box(0xf0ead8, u, s2 * FH + 0.55, 1.5, 0.14, 0.7, 0);
    f.box(col.band, u, s2 * FH + 0.69, 1.5, 0.45, 0.05, 0.66, { outline: false });
  }
  // rooftop: a cluster of black water tanks, a barsati room, a dish
  const tx = (rnd() - 0.5) * (W - 5);
  for (let i = 0; i < 5; i++) {
    const px = tx + (i % 3) * 0.95 - 0.9, pz = -0.9 + Math.floor(i / 3) * 1.0 + (i === 4 ? 0.2 : 0);
    k.cyl(0x2f2c3a, 0.4, 0.46, 0.9, px, H + 0.3, pz, { seg: 10 });
    k.dome(0x2f2c3a, 0.4, px, H + 1.2, pz, { seg: 10, ring: 3, sy: 0.55 });
  }
  k.box(0xe9e1cc, 2.2, 1.5, 1.8, -tx * 0.5 + (tx > 0 ? -2.4 : 2.4), H + 0.3, -0.4);
  k.box(col.band, 2.4, 0.2, 2.0, -tx * 0.5 + (tx > 0 ? -2.4 : 2.4), H + 1.8, -0.4);
  const dx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 3.2);
  k.cyl(0x6f6a82, 0.05, 0.06, 0.8, dx, H + 0.3, 1.2, { seg: 5 });
  k.add(new THREE.SphereGeometry(0.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.4), 0xf1ebdb, { pos: [dx, H + 1.2, 1.2], rot: [-0.9, 0.5, 0], scale: [1, 0.45, 1] });
  // name board (Hindi + English)
  const ni = Math.floor(rnd() * APT_NAMES.length);
  k.plane(nameBoard(APT_NAMES, ni, '#f4f0e0', '#d6cfb2'), 3.0, 0.95, [-1.2, FH + 0.9 - 0.6, D / 2 + 0.2], 0);
  k.box(0xf4f0e0, 3.1, 1.0, 0.1, -1.2, FH + 0.4 - 0.6, D / 2 + 0.1);
  // parked scooters + a neem sapling in a pot out front
  for (const s3 of [-1, 1]) k.box(PAL.stoneDark, 0.5, 0.32, 0.5, s3 * (W / 2 - 3.3), 0, D / 2 + 0.7);
  k.ball(PAL.leaf, 0.3, -W / 2 + 1.0, 0.7, D / 2 + 0.9, { seg: 7, ring: 5 });
  k.cyl(PAL.terracotta, 0.2, 0.15, 0.4, -W / 2 + 1.0, 0, D / 2 + 0.9, { seg: 7 });
  return { k, W, D, H, BZ, storeys, variant: col.name, kind: 'apartment' };
}

/** a sagging black wire (a row of thin boxes) */
function wire(k, a, b, sag = 0.3, n = 6) {
  for (let i = 0; i < n; i++) {
    const t0 = i / n, t1 = (i + 1) / n;
    const p0 = [a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0 - Math.sin(t0 * Math.PI) * sag, a[2] + (b[2] - a[2]) * t0];
    const p1 = [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1 - Math.sin(t1 * Math.PI) * sag, a[2] + (b[2] - a[2]) * t1];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2], L = Math.hypot(dx, dy, dz);
    k.box(PAL.ink, L, 0.025, 0.025, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, (p0[2] + p1[2]) / 2, { rz: Math.atan2(dy, dx), ry: -Math.atan2(dz, Math.hypot(dx, dy)), outline: false });
  }
}

function peteHouse(ink, seed, rnd) {
  const col = HOUSE_COLORS[Math.abs(Math.round(seed)) % HOUSE_COLORS.length];
  const storeys = rnd() > 0.45 ? 3 : 2;
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.35, H = storeys * FH, BZ = 1.35;
  const k = new Kit(ink, { hatch: 0.14, seed: 200 + seed });
  const { wall, trim, rail } = col;
  const SAND = 0xe3c9a0; // carved sandstone for columns and mouldings
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(wall, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.12, 0.45, D + 0.12, 0, 0, 0);
  k.box(trim, W + 0.3, 0.3, D + 0.3, 0, H, 0);
  // flat roof with a parapet (little arched jali band + corner finials), a water tank, sometimes a chhatri / barsati room
  const PH = 0.7;
  for (const [w, d, x, z] of [[W + 0.3, 0.22, 0, D / 2 + 0.05], [W + 0.3, 0.22, 0, -D / 2 - 0.05], [0.22, D, W / 2 + 0.05, 0], [0.22, D, -W / 2 - 0.05, 0]]) k.box(wall, w, PH, d, x, H + 0.3, z);
  for (let i = 0; i <= 6; i++) k.box(trim, 0.34, 0.26, 0.34, -W / 2 + (i * W) / 6, H + 0.3 + PH, D / 2 + 0.05, { outline: false });
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { k.cyl(trim, 0.16, 0.18, 0.5, sx * (W / 2 + 0.05), H + 0.3 + PH, sz * (D / 2 + 0.05), { seg: 6 }); k.ball(PAL.gold, 0.14, sx * (W / 2 + 0.05), H + 0.3 + PH + 0.62, sz * (D / 2 + 0.05), { seg: 5, ring: 4, outline: false }); }
  const hasRoomUp = rnd() > 0.5;
  if (hasRoomUp) {
    const rx = (rnd() > 0.5 ? 1 : -1) * W * 0.2;
    k.box(wall, 3.0, 1.9, 2.4, rx, H + 0.3, -0.3);
    k.box(trim, 3.2, 0.2, 2.6, rx, H + 2.2, -0.3);
    const rf = k.face(rx, H + 0.3, 0.9, 0);
    rf.window(0, 0.2, 0.8, 1.35, { pointed: true, glass: 0x4f9f95, frame: trim, bars: 1, sill: false });
    k.cyl(trim, 0.14, 0.16, 0.8, rx - 1.2, H + 2.4, 0.6, { seg: 6 }); onion(k, trim, 0.34, rx - 1.2, H + 3.2, 0.6, { seg: 8, tall: 1.0 });
  } else {
    k.cyl(0x2f2c3a, 0.62, 0.7, 1.0, (rnd() - 0.5) * (W - 3), H + 0.95, -0.6, { seg: 12 });
    k.box(0xb9ae98, 1.4, 0.45, 1.4, 0, H + 0.3, -0.6, { outline: false });
  }
  if (rnd() > 0.5) { // a chhatri on the roof corner
    const cx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.1);
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.cyl(SAND, 0.06, 0.07, 0.9, cx + dx * 0.34, H + 0.3 + PH * 0.0, 0.9 + dz * 0.34, { seg: 5 });
    k.box(trim, 0.95, 0.1, 0.95, cx, H + 1.2, 0.9); onion(k, trim, 0.4, cx, H + 1.3, 0.9, { seg: 8, tall: 1.0 }); k.cone(PAL.gold, 0.04, 0.35, cx, H + 2.05, 0.9, { seg: 4 });
  }

  // front: per-bay door + cusped-arch window with shutters; jharokha on the upper floors; a dalaan (carved-column verandah) at street level
  const n = Math.round(W / 2.1);
  const pitch = (W - 1.2) / n;
  const f = k.face(0, 0, D / 2, 0);
  // painted red-ochre panel borders on the plaster of the upper floors (one canvas plane per storey band)
  for (let s = 1; s < storeys; s++) k.plane(borderCanvas(col.border), W - 0.4, FH - 0.5, [0, s * FH + FH * 0.5 + 0.05, D / 2 + 0.03], 0);
  for (let s = 0; s < storeys; s++) {
    const y0 = s * FH;
    for (let i = 0; i < n; i++) {
      const u = -W / 2 + 0.6 + (i + 0.5) * pitch;
      const dc = DOORS[Math.floor(rnd() * DOORS.length)];
      const baseY = y0 + (s === 0 ? 0.22 : 0.16);
      if (s === 0) { f.window(u - 0.5, baseY, 0.8, 1.65, { rect: true, glass: dc, frame: trim, sill: false, jitter: 0.03 }); }
      f.flat(trim, cuspShape(0.86, 1.4), u + 0.45, baseY + 0.34, 0.02);
      f.flat(0x4f7f95, cuspShape(0.66, 1.2), u + 0.45, baseY + 0.4, 0.04);
      f.flat(0x3f7f6a, rectBar(0.05, 0.6), u + 0.45, baseY + 0.45, 0.06);
      f.box(0x3f7f6a, u + 0.04, baseY + 0.5, 0.18, 0.95, 0.05, 0.02);   // louvred shutters
      f.box(0x3f7f6a, u + 0.86, baseY + 0.5, 0.18, 0.95, 0.05, 0.02);
    }
    if (s > 0) {
      f.box(trim, 0, y0 - 0.12, W + 0.3, 0.2, BZ - 0.3, 0);
      f.box(rail, 0, y0 + 0.08, W + 0.3, 0.07, 0.1, BZ - 0.4);
      f.box(rail, 0, y0 + 1.02, W + 0.3, 0.09, 0.12, BZ - 0.42);
      const posts = Math.round(W / 0.4);
      for (let p = 0; p <= posts; p++) f.box(rail, -W / 2 - 0.15 + (p / posts) * (W + 0.3), y0 + 0.08, 0.06, 0.95, 0.06, BZ - 0.4);
      for (let b = 0; b < 6; b++) f.box(PAL.woodDark, -W / 2 + 0.7 + (b * (W - 1.4)) / 5, y0 - 0.5, 0.14, 0.4, 0.6, 0);
    }
  }
  // jharokha: a projecting oriel with three little arched openings and a domed roof, on the first floor (centre)
  { const ju = (rnd() - 0.5) * (W * 0.4); const y1 = FH + 0.35;
    f.box(SAND, ju, y1 - 0.2, 1.9, 0.18, 0.95, 0.0);
    f.box(wall, ju, y1, 1.7, 1.5, 0.85, 0.0);
    for (const du of [-0.55, 0, 0.55]) f.window(ju + du, y1 + 0.18, 0.4, 0.95, { pointed: true, glass: 0x4f7f95, frame: SAND, sill: false, n: 0.88 });
    f.box(SAND, ju, y1 + 1.5, 1.9, 0.14, 1.0, 0.0);
    onion(k, SAND, 0.62, ...f.pos(ju, y1 + 1.64, 0.5), { seg: 8, tall: 0.95 }); }
  // dalaan: carved columns (bulbed shafts, bracketed) under a flat chhajja roof + a bench
  for (let p = 0; p <= 4; p++) {
    const u = -W / 2 + 0.3 + (p * (W - 0.6)) / 4;
    f.cyl(SAND, u, 0.1, 0.13, 0.35, BZ - 0.2, { seg: 8 }); f.cyl(SAND, u, 0.42, 0.09, FH - 0.9, BZ - 0.2, { seg: 8 });
    const bp = f.pos(u, 1.1, BZ - 0.2); k.ball(SAND, 0.17, bp[0], bp[1], bp[2], { seg: 7, ring: 5, outline: false });
    f.box(SAND, u, FH - 0.5, 0.38, 0.1, 0.1, BZ - 0.2);
  }
  f.box(0xc9bda5, 0, 0, W + 0.5, 0.14, BZ + 0.4, 0);          // verandah floor
  k.add(new THREE.BoxGeometry(W + 0.5, 0.12, BZ + 0.2), trim, { pos: [0, FH - 0.05, D / 2 + BZ / 2 + 0.0], rot: [0.05, 0, 0] });
  k.box(PAL.wood, 1.9, 0.45, 0.5, -W / 2 + 2.6, 0.14, D / 2 + BZ - 0.45);      // bench (chabutra)
  // stair bay at the back + side walls with windows
  const bx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.1);
  k.box(trim, 1.7, H + 0.4, 0.5, bx, 0, -D / 2 - 0.2);
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const sf = k.face(ox, 0, 0, ry);
    for (let s = 0; s < storeys; s++) for (const u of [-1.2, 1.2]) sf.window(u, s * FH + 0.8, 0.6, 0.9, { rect: true, glass: 0x5d7690, frame: trim, bars: 1 });
  }
  // house-name board over the verandah roof (Hindi + English)
  const ni = Math.floor(rnd() * NAMES.length);
  k.plane(nameBoard(NAMES, ni, '#f6ecc8', '#d9b968'), 3.0, 0.95, [0, FH + 0.45, D / 2 + 0.2], 0);
  k.box(0xf6ecc8, 3.1, 1.0, 0.1, 0, FH - 0.05, D / 2 + 0.1);
  // laundry line, flower pots, and the tangle of wires across the front
  const clothesAt = (y0, u0, u1, zz, count) => {
    for (let i = 0; i < 6; i++) {
      const t0 = i / 6, t1 = (i + 1) / 6, sag = 0.16;
      const ya = y0 - Math.sin(t0 * Math.PI) * sag, yb = y0 - Math.sin(t1 * Math.PI) * sag, xa = u0 + (u1 - u0) * t0, xb = u0 + (u1 - u0) * t1;
      k.box(PAL.ink, Math.hypot(xb - xa, yb - ya), 0.02, 0.02, (xa + xb) / 2, (ya + yb) / 2, zz, { rz: Math.atan2(yb - ya, xb - xa), outline: false });
    }
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count, yy = y0 - Math.sin(t * Math.PI) * 0.16, saree = rnd() > 0.7;
      const w = saree ? 0.34 : 0.3 + rnd() * 0.12, h = saree ? 0.95 : 0.4 + rnd() * 0.25;
      k.box(CLOTHES[Math.floor(rnd() * CLOTHES.length)], w, h, 0.03, u0 + (u1 - u0) * t, yy - h, zz, { rz: (rnd() - 0.5) * 0.12, outline: false });
    }
  };
  for (let s = 1; s < storeys; s++) { const st = -W / 2 + 0.5 + rnd() * 1.5; clothesAt((s - 1) * FH + 1.75, st, Math.min(st + 2.6 + rnd() * 2, W / 2 - 0.4), D / 2 + 0.95, 4 + Math.floor(rnd() * 3)); }
  for (let i = 0; i < 3; i++) { // old-city wires: from the roof corners and the pole side down across the facade
    const sx0 = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 0.3), x1 = -sx0 * (0.2 + rnd() * 0.7);
    wire(k, [sx0, H + 0.6, D / 2 + 0.3], [x1, FH * (0.7 + rnd() * 1.1), D / 2 + 1.5 + rnd() * 0.6], 0.55 + rnd() * 0.3, 5);
  }
  const pot = (x, y, z) => { k.box(PAL.terracotta, 0.5, 0.45, 0.5, x, y, z); k.ball(PAL.leaf, 0.3, x, y + 0.75, z, { seg: 7, ring: 5 }); k.ball(0xfaf6ea, 0.07, x + 0.1, y + 1.0, z, { seg: 4, ring: 3, outline: false }); };
  pot(-W / 2 + 1.0, 0.12, D / 2 + BZ + 0.25);
  pot(W / 2 - 1.3, 0.12, D / 2 + BZ + 0.3);
  return { k, W, D, H, BZ, storeys, variant: col.name, kind: 'house' };
}

function rectBar(w, h) { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.closePath(); return s; }

export function createChawl(ink, seed = 1) {
  if (typeof ink === 'number') { seed = ink; ink = undefined; } // lab: &spec=2
  const rnd = mulberry32(Math.imul(seed + 17, 2654435761) >>> 0);
  for (let i = 0; i < 4; i++) rnd();
  const built = isApartment(seed) ? aptBlock(ink, seed, rnd) : peteHouse(ink, seed, rnd);
  const { k, W, D, H, BZ, storeys } = built;
  const g = k.finish({ lean: 0.012 });
  g.name = (built.kind === 'apartment' ? 'apartment' : 'peteHouse') + seed;
  g.userData = {
    footprint: Math.hypot(W / 2, D / 2 + BZ),
    height: H + 2.4,
    size: [W, D + BZ, H],
    variant: built.variant,
    storeys,
    colliders: lineColliders(-W / 2 + 2.0, 0, W / 2 - 2.0, 0, 2.45, H, 2.4),
  };
  void latin; void handRng;
  return g;
}
