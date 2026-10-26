// Old-city Hyderabad houses and apartment blocks (replace the Mumbai chawls; layout kind 'chawl', createChawl(ink, seed)). Reference: Wikimedia
// Commons old-city street views around Charminar (lime-washed pastel walls, pointed-arch windows with louvred shutters, flat roofs with parapets).
//   old-city house: 2-3 storey lime-washed town house with a flat parapet roof (finials, a water tank, sometimes a little chhatri), pointed-arch
//               windows with louvred shutters, a deorhi (arched gateway) bay, a wooden-railed balcony, a deep verandah, laundry on a line, a Telugu + English house-name board.
//   apartment block: plain 4-5 storey concrete block with balcony grills, a water tank, a dish, a painted window facade.
// Same footprint contract as the chawl: width W x depth D (+ front verandah BZ), front +Z. Anchors/colliders unchanged.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, lineColliders, mulberry32, polyShape, bilingualBoard, latin } from './kit.js';

const HOUSE_COLORS = [
  { wall: 0xf1c6bd, trim: 0xfbf4e6, rail: 0x6f4a33, name: 'rose lime-wash' },
  { wall: 0xbfe0cf, trim: 0xf6f3e8, rail: 0x6f4a33, name: 'mint' },
  { wall: 0xf5e3a6, trim: 0xfbf1e2, rail: 0x6f4a33, name: 'buttercream' },
  { wall: 0xb9d0e6, trim: 0xf6f3e8, rail: 0x6f4a33, name: 'faded blue' },
  { wall: 0xe4dcc0, trim: 0xfaf3e0, rail: 0x6f4a33, name: 'old lime' },
  { wall: 0xf3c9a1, trim: 0xfaf3e0, rail: 0x6f4a33, name: 'peach' },
];
const APT_COLORS = [
  { wall: 0xe8dfc8, name: 'cream' }, { wall: 0xcfdcc4, name: 'sage' }, { wall: 0xdce3e8, name: 'grey' }, { wall: 0xefd9b8, name: 'sand' },
];
const DOORS = [0x7a4f33, 0x2f7f86, 0xa8483a, 0xd9a23f, 0x4f6fa8, 0x5f8f55];
const CLOTHES = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea, 0xe23d3d, 0x3fb7a5, 0xf5d86a];
const NAMES = [['లక్ష్మి నివాసం', 'LAKSHMI NIVAS'], ['అమీర్ మంజిల్', 'AMEER MANZIL'], ['శాంతి నిలయం', 'SHANTI NILAYAM'], ['ఫాతిమా మంజిల్', 'FATIMA MANZIL']];
const APT_NAMES = [['సాయి అపార్ట్‌మెంట్స్', 'SAI APARTMENTS'], ['శ్రీ రామ్ రెసిడెన్సీ', 'SRI RAM RESIDENCY'], ['మధుర హైట్స్', 'MADHURA HEIGHTS']];

/** apartment is chosen by seed: a few named blocks plus every second filler */
export const isApartment = (seed) => seed === 6 || seed === 12 || seed === 14 || (seed >= 30 && seed % 2 === 0);

const _nameBoards = new Map();
function nameBoard(list, i, fill, hatch) {
  const key = list === NAMES ? 'h' + i : 'a' + i;
  if (!_nameBoards.has(key)) _nameBoards.set(key, bilingualBoard(3.0, 0.95, list[i][0], list[i][1], { fill, hatch, kc: '#7a2f2f', knSize: 0.42, enSize: 0.19, seed: 7 }));
  return _nameBoards.get(key);
}

const _facade = new Map();
/** a painted apartment facade: grid of windows with black balcony grills, hand-inked */
export function aptFacade(wallHex, storeys, cols, seed) {
  const key = wallHex + ':' + storeys + ':' + cols + ':' + seed;
  if (_facade.has(key)) return _facade.get(key);
  const W = 64 * cols, H = 64 * storeys;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(seed * 7 + 3);
  const pw = W / cols, ph = H / storeys;
  for (let j = 0; j < storeys; j++) for (let i = 0; i < cols; i++) {
    const x = i * pw + pw * 0.2, y = j * ph + ph * 0.2, w = pw * 0.6, h = ph * 0.55;
    ctx.fillStyle = j === storeys - 1 && false ? '#fff' : (r() > 0.88 ? '#f4d98f' : '#5a7a96');
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(x + 2, y + 2, w * 0.3, h - 4);
    ctx.strokeStyle = '#2b2440'; ctx.lineWidth = 2.4; ctx.strokeRect(x, y, w, h);
    // balcony grill on alternate bays
    if ((i + j) % 2 === 0) {
      ctx.lineWidth = 1.6; ctx.strokeRect(x - 5, y + h * 0.35, w + 10, h * 0.85);
      for (let b = 0; b <= 6; b++) { const gx = x - 5 + (b * (w + 10)) / 6; ctx.beginPath(); ctx.moveTo(gx, y + h * 0.35); ctx.lineTo(gx, y + h * 1.2); ctx.stroke(); }
    }
    if (r() > 0.8) { ctx.fillStyle = ['#e84f6b', '#f2b33f', '#4ea6d8', '#fff'][Math.floor(r() * 4)]; ctx.fillRect(x + w * 0.1, y + h * 1.05, w * 0.35, h * 0.35); } // laundry on the grill
    // AC box
    if (r() > 0.75) { ctx.fillStyle = '#f4f2ea'; ctx.fillRect(x + w + 3, y + h * 0.4, 9, 12); ctx.strokeRect(x + w + 3, y + h * 0.4, 9, 12); }
  }
  ctx.strokeStyle = 'rgba(43,36,64,0.5)'; ctx.lineWidth = 2;
  for (let j = 1; j < storeys; j++) { ctx.beginPath(); ctx.moveTo(0, j * ph + 1); ctx.lineTo(W, j * ph + 1); ctx.stroke(); }
  _facade.set(key, c);
  return c;
}

/** Mangalore-tile gable roof, ridge along x: prism + tile courses + ridge cap + barge boards */
export function tiledRoof(k, W, D, y, rh, col, dark) {
  const half = D / 2 + 0.55;
  k.extrude(col, polyShape([[-half, 0], [half, 0], [0, rh]]), W + 0.7, 0, y, 0, { ry: Math.PI / 2 });
  const a = Math.atan2(rh, half), L = Math.hypot(half, rh);
  for (const sz of [-1, 1]) for (let i = 0; i < 3; i++) {
    const t = (i + 1) / 4;
    k.box(dark, W + 0.74, 0.05, 0.1, 0, y + rh * (1 - t) + 0.04, sz * half * t + 0, { rx: sz * a, outline: false, ry: 0 });
  }
  k.box(dark, W + 0.9, 0.16, 0.34, 0, y + rh - 0.04, 0);
  void L;
}

function aptBlock(ink, seed, rnd) {
  const col = APT_COLORS[Math.abs(seed) % APT_COLORS.length];
  const storeys = rnd() > 0.5 ? 5 : 4;
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.2, H = storeys * FH, BZ = 1.35;
  const k = new Kit(ink, { hatch: 0.14, seed: 200 + seed });
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(col.wall, W, H, D, 0, 0, 0);
  k.box(0xb9ae98, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
  k.box(0xf2ecdc, W + 0.3, 0.3, D + 0.3, 0, H, 0);
  for (const [w, d, x, z] of [[W + 0.1, 0.2, 0, D / 2 + 0.05], [W + 0.1, 0.2, 0, -D / 2 - 0.05], [0.2, D, W / 2 + 0.05, 0], [0.2, D, -W / 2 - 0.05, 0]]) k.box(col.wall, w, 0.5, d, x, H + 0.3, z);
  // painted window facade (front and back) and a few sides
  const cols = Math.round(W / 2.1);
  const fc = aptFacade(col.wall, storeys - 1, cols, seed % 3);
  k.planes_(fc, [
    { w: W - 0.2, h: (storeys - 1) * FH, pos: [0, FH + ((storeys - 1) * FH) / 2 - 0.0, D / 2 + 0.03], ry: 0 },
    { w: W - 0.2, h: (storeys - 1) * FH, pos: [0, FH + ((storeys - 1) * FH) / 2 - 0.0, -D / 2 - 0.03], ry: Math.PI },
  ]);
  // ground floor: shuttered shops/parking
  const f = k.face(0, 0, D / 2, 0);
  for (let i = 0; i < cols; i++) {
    const u = -W / 2 + 0.6 + (i + 0.5) * ((W - 1.2) / cols);
    f.window(u, 0.4, 0.95, 1.6, { rect: true, glass: i % 2 ? 0x6b7a86 : DOORS[(seed + i) % DOORS.length], frame: 0xf2ecdc, bars: 1, sill: false });
  }
  // real 3D balcony slabs + grills on two bays per floor so the silhouette has depth
  for (let s = 1; s < storeys; s++) for (const u of [-W / 4, W / 4]) {
    f.box(0xf2ecdc, u, s * FH + 0.55, 1.5, 0.14, 0.7, 0);
    f.box(PAL.ink, u, s * FH + 0.69, 1.5, 0.04, 0.04, 0.68, { outline: false });
    f.box(PAL.ink, u, s * FH + 1.18, 1.5, 0.04, 0.04, 0.68, { outline: false });
  }
  // rooftop: Sintex water tank on a stand, a dish, the lift machine room, a clothes line
  const tx = (rnd() - 0.5) * (W - 4);
  k.box(0xb9ae98, 1.6, 0.5, 1.6, tx, H + 0.55, -0.4);
  k.cyl(0x35313f, 0.66, 0.74, 1.1, tx, H + 1.05, -0.4, { seg: 12 });
  k.dome(0x35313f, 0.66, tx, H + 2.15, -0.4, { seg: 12, ring: 4, sy: 0.55 });
  k.box(0xf1ebdb, 1.7, 1.1, 1.4, -tx * 0.6 + (tx > 0 ? -2 : 2), H + 0.55, -0.2);
  const dx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.0);
  k.cyl(0x6f6a82, 0.05, 0.06, 0.8, dx, H + 0.55, 1.2, { seg: 5 });
  k.add(new THREE.SphereGeometry(0.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.4), 0xf1ebdb, { pos: [dx, H + 1.45, 1.2], rot: [-0.9, 0.5, 0], scale: [1, 0.45, 1] });
  // name board (Telugu + English)
  const ni = Math.floor(rnd() * APT_NAMES.length);
  k.plane(nameBoard(APT_NAMES, ni, '#f4f0e0', '#d6cfb2'), 3.0, 0.95, [0, FH + 0.9 - 0.6, D / 2 + 0.2], 0);
  k.box(0xf4f0e0, 3.1, 1.0, 0.1, 0, FH + 0.4 - 0.6, D / 2 + 0.1);
  // a couple of parked scooters + plant pots out front
  for (const sx of [-1, 1]) k.box(PAL.stoneDark, 0.5, 0.32, 0.5, sx * (W / 2 - 1.3), 0, D / 2 + 0.7);
  k.ball(PAL.leaf, 0.3, -W / 2 + 1.0, 0.7, D / 2 + 0.9, { seg: 7, ring: 5 });
  k.cyl(PAL.terracotta, 0.2, 0.15, 0.4, -W / 2 + 1.0, 0, D / 2 + 0.9, { seg: 7 });
  return { k, W, D, H, BZ, storeys, variant: col.name, kind: 'apartment' };
}

function peteHouse(ink, seed, rnd) {
  const col = HOUSE_COLORS[Math.abs(Math.round(seed)) % HOUSE_COLORS.length];
  const storeys = rnd() > 0.45 ? 3 : 2;
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.35, H = storeys * FH, BZ = 1.35;
  const k = new Kit(ink, { hatch: 0.14, seed: 200 + seed });
  const { wall, trim, rail } = col;
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(wall, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.12, 0.45, D + 0.12, 0, 0, 0);
  k.box(trim, W + 0.3, 0.3, D + 0.3, 0, H, 0);
  // flat roof with a parapet (pierced band + corner finials), a water tank, sometimes a little chhatri / barsati room
  const PH = 0.7;
  for (const [w, d, x, z] of [[W + 0.3, 0.22, 0, D / 2 + 0.05], [W + 0.3, 0.22, 0, -D / 2 - 0.05], [0.22, D, W / 2 + 0.05, 0], [0.22, D, -W / 2 - 0.05, 0]]) k.box(wall, w, PH, d, x, H + 0.3, z);
  for (let i = 0; i <= 6; i++) k.box(trim, 0.34, 0.26, 0.34, -W / 2 + (i * W) / 6, H + 0.3 + PH, D / 2 + 0.05, { outline: false });
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { k.cyl(trim, 0.16, 0.18, 0.5, sx * (W / 2 + 0.05), H + 0.3 + PH, sz * (D / 2 + 0.05), { seg: 6 }); k.ball(PAL.gold, 0.14, sx * (W / 2 + 0.05), H + 0.3 + PH + 0.62, sz * (D / 2 + 0.05), { seg: 5, ring: 4, outline: false }); }
  const rh = 1.7;
  const hasRoomUp = rnd() > 0.5;
  if (hasRoomUp) {
    const rx = (rnd() > 0.5 ? 1 : -1) * W * 0.2;
    k.box(wall, 3.0, 1.9, 2.4, rx, H + 0.3, -0.3);
    k.box(trim, 3.2, 0.2, 2.6, rx, H + 2.2, -0.3);
    const rf = k.face(rx, H + 0.3, 0.9, 0);
    rf.window(0, 0.2, 0.8, 1.35, { pointed: true, glass: 0x4f9f95, frame: trim, bars: 1, sill: false });
    k.cyl(trim, 0.14, 0.16, 0.8, rx - 1.2, H + 2.4, 0.6, { seg: 6 }); k.dome(trim, 0.3, rx - 1.2, H + 3.2, 0.6, { seg: 8, ring: 4, sy: 1.1 });
  } else {
    k.cyl(0x35313f, 0.62, 0.7, 1.0, (rnd() - 0.5) * (W - 3), H + 0.95, -0.6, { seg: 12 });
    k.box(0xb9ae98, 1.4, 0.45, 1.4, 0, H + 0.3, -0.6, { outline: false });
  }
  // satellite dish on the roof edge for some
  if (rnd() > 0.5) {
    const dx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.2);
    k.cyl(0x6f6a82, 0.05, 0.06, 0.7, dx, H + 0.3, -D / 2 + 0.3, { seg: 5 });
    k.add(new THREE.SphereGeometry(0.45, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.4), 0xf1ebdb, { pos: [dx, H + 1.1, -D / 2 + 0.3], rot: [-0.9, 0.5, 0], scale: [1, 0.45, 1] });
  }

  // front: per-bay door + shuttered window; wooden balcony on every upper floor; deep verandah (thinnai) at street level
  const n = Math.round(W / 2.1);
  const pitch = (W - 1.2) / n;
  const f = k.face(0, 0, D / 2, 0);
  for (let s = 0; s < storeys; s++) {
    const y0 = s * FH;
    for (let i = 0; i < n; i++) {
      const u = -W / 2 + 0.6 + (i + 0.5) * pitch;
      const dc = DOORS[Math.floor(rnd() * DOORS.length)];
      const baseY = y0 + (s === 0 ? 0.22 : 0.16);
      f.window(u - 0.5, baseY, 0.8, 1.65, { rect: true, glass: dc, frame: trim, sill: false, jitter: 0.03 });
      f.window(u + 0.45, baseY + 0.4, 0.62, 1.15, { pointed: true, glass: 0x4f9f95, frame: trim, bars: 1, sill: true, jitter: 0.03 });
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
  // deorhi: a big pointed-arch gateway bay at the ground floor (dark timber doors)
  { const du = (rnd() > 0.5 ? 1 : -1) * W * 0.26; f.window(du, 0.1, 1.7, 2.2, { pointed: true, glass: 0x4a3328, frame: trim, bars: 1, sill: false, n: 0.1 }); }
  // verandah: wooden columns + a flat chhajja roof over the ground floor + a bench
  for (let p = 0; p <= 4; p++) {
    const u = -W / 2 + 0.3 + (p * (W - 0.6)) / 4;
    f.cyl(PAL.woodDark, u, 0.1, 0.1, FH - 0.2, BZ - 0.2, { seg: 6 });
    f.box(PAL.woodDark, u, FH - 0.5, 0.34, 0.1, 0.1, BZ - 0.2);
  }
  f.box(0xc9bda5, 0, 0, W + 0.5, 0.14, BZ + 0.4, 0);          // verandah floor
  k.add(new THREE.BoxGeometry(W + 0.5, 0.12, BZ + 0.2), trim, { pos: [0, FH - 0.05, D / 2 + BZ / 2 + 0.0], rot: [0.05, 0, 0] });
  k.box(PAL.wood, 1.9, 0.45, 0.5, -W / 2 + 2.6, 0.14, D / 2 + BZ - 0.45);      // thinnai bench
  // stair bay at the back + side walls with windows
  const bx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.1);
  k.box(trim, 1.7, H + 0.4, 0.5, bx, 0, -D / 2 - 0.2);
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const sf = k.face(ox, 0, 0, ry);
    for (let s = 0; s < storeys; s++) for (const u of [-1.2, 1.2]) sf.window(u, s * FH + 0.8, 0.6, 0.9, { rect: true, glass: 0x5d7690, frame: trim, bars: 1 });
  }
  // house-name board over the verandah roof (Telugu + English)
  const ni = Math.floor(rnd() * NAMES.length);
  k.plane(nameBoard(NAMES, ni, '#f6ecc8', '#d9b968'), 3.0, 0.95, [0, FH + 0.45, D / 2 + 0.2], 0);
  k.box(0xf6ecc8, 3.1, 1.0, 0.1, 0, FH - 0.05, D / 2 + 0.1);
  // laundry line, flower pots, a muggu (rangoli) doorstep (the rangoli prop adds the big one)
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
  const pot = (x, y, z) => { k.box(PAL.terracotta, 0.5, 0.45, 0.5, x, y, z); k.ball(PAL.leaf, 0.3, x, y + 0.75, z, { seg: 7, ring: 5 }); k.ball(0xfaf6ea, 0.07, x + 0.1, y + 1.0, z, { seg: 4, ring: 3, outline: false }); };
  pot(-W / 2 + 1.0, 0.12, D / 2 + BZ + 0.25);
  pot(W / 2 - 1.3, 0.12, D / 2 + BZ + 0.3);
  return { k, W, D, H, BZ, storeys, variant: col.name, kind: 'house' };
}

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
