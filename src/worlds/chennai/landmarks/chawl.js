// Chennai houses (kept under the old "chawl" name so the layout does not change). Two seeded kinds, same footprint as the old block:
//   * Mylapore tiled houses (seed % 3 != 2): painted walls, red-tile roof, a raised thinnai verandah on wooden pillars, a kolam at the door.
//   * Tamil Nadu Housing Board flats (seed % 3 == 2): 3-4 storey cream/maroon blocks with a long common balcony, water tanks, a dish and
//     a Pongal mural on the side wall.
// Front (+Z) = balcony / verandah side.
import * as THREE from 'three';
import { Kit, PAL, rectPts, makeCanvas, handRng, INK, wobblyLine, paintBoard, inkText, taText, bilingualBoard, latin, lineColliders, mulberry32, rectShape, polyShape } from './kit.js';

const COLORS = [ // Housing Board flats: faded institutional distemper
  { wall: 0xf1e3a6, trim: 0xfaf3e0, rail: 0x9c3d3a, name: 'cream' },
  { wall: 0xdcead0, trim: 0xf6f3e8, rail: 0x4f7f6a, name: 'mint' },
  { wall: 0xf2cdb8, trim: 0xfbf1e2, rail: 0xa8483a, name: 'peach' },
  { wall: 0xcfe0ee, trim: 0xf6f3e8, rail: 0x3f6f9a, name: 'blue' },
];
const HOUSE_WALLS = [0xf0c46a, 0xf2b0a8, 0x8fd0c4, 0xcfe08a, 0xf6a96b, 0xb9c8f0];
const DOORS = [0x7a4f33, 0x2f7f86, 0xa8483a, 0xd9a23f, 0x4f6fa8, 0x5f8f55];
const CLOTHES = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea, 0xe23d3d, 0x3fb7a5, 0xf5d86a];
const NAMES = [['திருவள்ளுவர் குடியிருப்பு', 'THIRUVALLUVAR FLATS'], ['காமராஜ் நகர்', 'KAMARAJ NAGAR'], ['பாரதி குடியிருப்பு', 'BHARATHI FLATS'], ['வீட்டு வசதி வாரியம்', 'HOUSING BOARD']];
const HOUSE_NAMES = [['அபிராமி இல்லம்', 'ABIRAMI ILLAM'], ['சுந்தரம் வீடு', 'SUNDARAM VEEDU'], ['லட்சுமி நிவாஸ்', 'LAKSHMI NIVAS'], ['கோபால் இல்லம்', 'GOPAL ILLAM']];

/** a kolam: white rice-flour dot-lattice pattern on the ground (flat plane), with a few coloured dots */
export function kolamCanvas(seed = 1) {
  const W = 192;
  const { c, ctx } = makeCanvas(W, W);
  const r = handRng(seed * 7 + 3);
  ctx.strokeStyle = '#fbf6ea'; ctx.fillStyle = '#fbf6ea'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const cx = W / 2, cy = W / 2, n = 4;
  for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) { if (Math.abs(i) + Math.abs(j) > n || (i + j + n) % 2) continue; ctx.beginPath(); ctx.arc(cx + i * 18, cy + j * 18, 3, 0, 6.283); ctx.fill(); }
  // petals looping round the dots
  for (let k = 0; k < 4; k++) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate((k * Math.PI) / 2);
    ctx.beginPath(); ctx.moveTo(0, -12); ctx.bezierCurveTo(46, -50, 46, -92, 0, -86); ctx.bezierCurveTo(-46, -92, -46, -50, 0, -12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.bezierCurveTo(22, -46, 22, -66, 0, -64); ctx.bezierCurveTo(-22, -66, -22, -46, 0, -30); ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = r() > 0.5 ? '#e8472f' : '#f5a742'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 6.283); ctx.fill();
  return c;
}

// A Pongal mural: pot of boiling milk, sugarcane, sun, kolam border on a brick-red wall.
function warliCanvas(seed) {
  const W = 384, H = 384;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(seed * 13 + 5);
  ctx.fillStyle = '#e4b04a'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 380; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(160,90,40,0.16)' : 'rgba(255,230,150,0.16)'; ctx.fillRect(r() * W, r() * H, 2 + r() * 5, 2 + r() * 3); }
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  // sun with rays
  const cx = W / 2, cy = H * 0.3;
  for (let i = 0; i < 16; i++) { const a = (i / 16) * 6.283; ctx.strokeStyle = '#c9402f'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 52, cy + Math.sin(a) * 52); ctx.lineTo(cx + Math.cos(a) * 76, cy + Math.sin(a) * 76); ctx.stroke(); }
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.fillStyle = '#f26a3b'; ctx.beginPath(); ctx.arc(cx, cy, 46, 0, 6.283); ctx.fill(); ctx.stroke();
  // sugarcane stalks
  for (const [x, lean] of [[70, -0.12], [104, -0.05], [W - 104, 0.05], [W - 70, 0.12]]) {
    ctx.save(); ctx.translate(x, H - 70); ctx.rotate(lean);
    ctx.fillStyle = '#5a8f3f'; ctx.fillRect(-9, -190, 18, 190); ctx.strokeRect(-9, -190, 18, 190);
    for (let j = 1; j < 6; j++) { ctx.beginPath(); ctx.moveTo(-9, -j * 32); ctx.lineTo(9, -j * 32); ctx.stroke(); }
    ctx.fillStyle = '#7ac28b'; ctx.beginPath(); ctx.moveTo(0, -190); ctx.lineTo(-30, -226); ctx.lineTo(0, -206); ctx.lineTo(30, -226); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  // the clay pot, boiling over with white foam, tied with turmeric leaves
  ctx.fillStyle = '#c9603a'; ctx.beginPath(); ctx.moveTo(142, H - 150); ctx.quadraticCurveTo(110, H - 100, 150, H - 70); ctx.lineTo(234, H - 70); ctx.quadraticCurveTo(274, H - 100, 242, H - 150); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fff6e0'; for (const [x, y, rr] of [[150, H - 160, 24], [190, H - 176, 30], [232, H - 160, 24], [170, H - 140, 20], [214, H - 142, 20]]) { ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.283); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = '#e8c04a'; ctx.fillRect(146, H - 118, 100, 12); ctx.strokeRect(146, H - 118, 100, 12);
  // kolam dot border
  ctx.fillStyle = '#fbf4e2';
  for (let x = 18; x < W; x += 24) { ctx.beginPath(); ctx.arc(x, 18, 4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(x, H - 18, 4, 0, 6.283); ctx.fill(); }
  for (let y = 18; y < H; y += 24) { ctx.beginPath(); ctx.arc(18, y, 4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(W - 18, y, 4, 0, 6.283); ctx.fill(); }
  wobblyLine(ctx, rectPts(4, 4, W - 4, H - 4, 8), { r, amp: 3, lw: 6, color: '#fbf4e2', closed: true });
  taText(ctx, 'பொங்கலோ பொங்கல்', W / 2, H - 22, 34, { color: '#7a2f2f' });
  return c;
}

function nameBoard(names) {
  return bilingualBoard(3.0, 0.95, names[0], names[1], { fill: '#f2e2b0', hatch: '#d9b968', tc: '#7a2f2f', taSize: 0.42, enSize: 0.2, seed: 7, px: 90 });
}

export function createChawl(ink, seed = 1) {
  if (typeof ink === 'number') { seed = ink; ink = undefined; } // lab: &spec=2
  if (Math.abs(Math.round(seed)) % 3 !== 2) return createHouse(ink, seed);
  const rnd = mulberry32(Math.imul(seed + 17, 2654435761) >>> 0);
  for (let i = 0; i < 4; i++) rnd();
  const col = COLORS[Math.abs(Math.round(seed)) % COLORS.length]; // consecutive seeds walk through the palette
  const storeys = rnd() > 0.5 ? 4 : 3;
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.35;
  const H = storeys * FH;
  const k = new Kit(ink, { hatch: 0.14, seed: 200 + seed });
  const { wall, trim, rail } = col;
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(wall, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.12, 0.45, D + 0.12, 0, 0, 0); // plinth course
  // roof: parapet rim, a tin lean-to, a water tank
  k.box(trim, W + 0.3, 0.35, D + 0.3, 0, H, 0);
  k.box(wall, W + 0.1, 0.45, 0.2, 0, H + 0.35, D / 2 + 0.05);
  k.box(wall, W + 0.1, 0.45, 0.2, 0, H + 0.35, -D / 2 - 0.05);
  k.box(wall, 0.2, 0.45, D, W / 2 + 0.05, H + 0.35, 0);
  k.box(wall, 0.2, 0.45, D, -W / 2 - 0.05, H + 0.35, 0);
  // rooftop life (no poles-with-crossbars): a satellite TV dish + a black Sintex tank, pigeon coop or a bamboo-and-tarp shed
  const tx = (rnd() - 0.5) * (W - 4);
  const kind = Math.floor(rnd() * 3);
  if (kind === 0) { // black Sintex tank on a brick stand
    k.box(PAL.brick, 1.5, 0.45, 1.5, tx, H + 0.35, -0.7);
    k.cyl(0x34303f, 0.62, 0.7, 1.15, tx, H + 0.8, -0.7, { seg: 12 });
    k.dome(0x34303f, 0.62, tx, H + 1.95, -0.7, { seg: 12, ring: 4, sy: 0.55 });
    k.cyl(0x4a4560, 0.2, 0.2, 0.12, tx, H + 2.25, -0.7, { seg: 8 });
    k.cyl(0x55506b, 0.72, 0.72, 0.07, tx, H + 1.45, -0.7, { seg: 12, outline: false });
  } else if (kind === 1) { // pigeon coop: slatted wooden box on legs with a pitched tin roof
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(PAL.woodDark, 0.1, 0.5, 0.1, tx + sx * 0.7, H + 0.35, -0.7 + sz * 0.5);
    k.box(PAL.wood, 1.7, 0.9, 1.2, tx, H + 0.85, -0.7);
    for (let i = 0; i < 7; i++) k.box(PAL.ink, 0.04, 0.7, 0.04, tx - 0.72 + i * 0.24, H + 0.95, -0.7 + 0.62, { outline: false });
    k.box(0x3d3748, 0.5, 0.4, 0.04, tx, H + 1.0, -0.7 + 0.63, { outline: false });
    k.add(new THREE.BoxGeometry(1.1, 0.07, 1.5), 0xb4c4cd, { pos: [tx - 0.52, H + 1.88, -0.7], rot: [0, 0, 0.5] });
    k.add(new THREE.BoxGeometry(1.1, 0.07, 1.5), 0xa3b4be, { pos: [tx + 0.52, H + 1.88, -0.7], rot: [0, 0, -0.5] });
    for (let i = 0; i < 3; i++) { k.ball(0xb9b6c8, 0.14, tx - 0.7 + i * 0.7, H + 1.45, -0.1, { sx: 1, sy: 0.9, sz: 1.3, seg: 6, ring: 4, outline: false }); k.ball(0x9a97ae, 0.08, tx - 0.7 + i * 0.7, H + 1.6, 0.0, { seg: 5, ring: 4, outline: false }); }
  } else { // tangled bamboo-and-tarp shed
    for (const [dx, dz, lean] of [[-0.8, -0.4, 0.1], [0.8, -0.5, -0.12], [-0.7, 0.5, -0.08], [0.9, 0.4, 0.14]]) k.cyl(0xd9c67e, 0.05, 0.06, 1.7, tx + dx, H + 0.35, -0.7 + dz, { seg: 5, rz: lean });
    k.add(new THREE.BoxGeometry(2.1, 0.06, 1.5), 0x5a8fc4, { pos: [tx, H + 1.95, -0.7], rot: [0.12, 0, 0.1] });
    k.add(new THREE.BoxGeometry(1.2, 0.05, 1.0), 0xd9a23f, { pos: [tx + 0.5, H + 2.05, -0.5], rot: [-0.1, 0.3, -0.12] });
    k.box(PAL.woodDark, 1.4, 0.05, 0.05, tx, H + 1.0, -0.2, { rz: 0.06 });
    for (const sx of [-0.8, 0.4]) k.box(PAL.pink, 0.4, 0.5, 0.03, tx + sx, H + 0.6, -0.15, { outline: false }); // laundry under the tarp
  }
  // satellite TV dish on a short pipe (parabolic cap tilted toward the sky + feed arm)
  const dx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.1);
  k.cyl(0x6f6a82, 0.05, 0.06, 0.8, dx, H + 0.35, 0.5, { seg: 5 });
  k.add(new THREE.SphereGeometry(0.55, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2.4), 0xf1ebdb, { pos: [dx, H + 1.25, 0.5], rot: [-0.9, 0.5, 0], scale: [1, 0.45, 1] });
  k.cyl(0x6f6a82, 0.015, 0.015, 0.7, dx - 0.15, H + 1.3, 0.62, { seg: 4, rx: -0.8, outline: false });
  k.ball(0x6f6a82, 0.06, dx - 0.08, H + 1.7, 0.1, { seg: 5, ring: 4, outline: false });

  // common balcony on every floor above ground + doors/windows on every floor
  const n = Math.round(W / 2.1);
  const pitch = (W - 1.2) / n;
  const f = k.face(0, 0, D / 2, 0);
  const BZ = 1.35; // balcony depth
  for (let s = 0; s < storeys; s++) {
    const y0 = s * FH;
    for (let i = 0; i < n; i++) {
      const u = -W / 2 + 0.6 + (i + 0.5) * pitch;
      const dc = DOORS[Math.floor(rnd() * DOORS.length)];
      const doorW = 0.8, doorH = 1.65;
      const baseY = y0 + (s === 0 ? 0.22 : 0.16);
      f.window(u - 0.5, baseY, doorW, doorH, { rect: true, glass: dc, frame: trim, sill: false, jitter: 0.03 });
      f.box(PAL.woodDark, u - 0.5 + 0.28, baseY + 0.75, 0.07, 0.07, 0.04, 0.07, {}); // door handle
      f.window(u + 0.45, baseY + 0.5, 0.62, 0.8, { rect: true, glass: 0x5d7690, frame: trim, bars: 1, sill: true, jitter: 0.03 });
      // shutter (open) beside the window
      if (rnd() > 0.55) f.box(dc, u + 0.95, baseY + 0.5, 0.2, 0.8, 0.05, 0.02);
    }
    if (s > 0) { // balcony slab + railing
      f.box(trim, 0, y0 - 0.12, W + 0.3, 0.2, BZ, 0);
      f.box(rail, 0, y0 + 0.08, W + 0.3, 0.06, 0.1, BZ - 0.1);
      f.box(rail, 0, y0 + 1.05, W + 0.3, 0.08, 0.12, BZ - 0.12);
      f.box(rail, 0, y0 + 0.62, W + 0.3, 0.04, 0.05, BZ - 0.1);
      const posts = Math.round(W / 0.45);
      for (let p = 0; p <= posts; p++) f.box(rail, -W / 2 - 0.15 + (p / posts) * (W + 0.3), y0 + 0.08, 0.06, 1.0, 0.06, BZ - 0.1);
      for (const sx of [-1, 1]) { f.box(rail, sx * (W / 2 + 0.12), y0 + 0.08, 0.06, 1.0, 0.06, 0.0); f.box(rail, sx * (W / 2 + 0.12), y0 + 1.05, 0.08, 0.08, BZ, 0); }
      // brackets under the slab
      for (let b = 0; b < 6; b++) f.box(PAL.stoneDark, -W / 2 + 0.7 + (b * (W - 1.4)) / 5, y0 - 0.5, 0.14, 0.4, 0.6, 0);
    }
  }
  // columns at ground level carrying the balcony
  for (let p = 0; p <= 4; p++) {
    const u = -W / 2 + 0.25 + (p * (W - 0.5)) / 4;
    f.box(trim, u, 0, 0.22, FH - 0.12, 0.22, BZ - 0.15);
  }
  // ground veranda slab edge
  f.box(0xc9bda5, 0, 0, W + 0.5, 0.12, BZ + 0.4, 0);

  // stair bay on one side
  const bx = (rnd() > 0.5 ? 1 : -1) * (W / 2 - 1.1);
  k.box(trim, 1.7, H + 0.4, 0.5, bx, 0, -D / 2 - 0.2);
  for (let s = 0; s < storeys; s++) k.box(0x4a4560, 0.3, 0.9, 0.06, bx, s * FH + 0.9, -D / 2 - 0.47, { outline: false });

  // side walls: windows + the Warli mural on +X
  for (const [ox, ry, mural] of [[W / 2, Math.PI / 2, true], [-W / 2, -Math.PI / 2, false]]) {
    const sf = k.face(ox, 0, 0, ry);
    for (let s = 0; s < storeys; s++) {
      if (mural && s === 0) continue;
      for (const u of [-1.2, 1.2]) sf.window(u, s * FH + 0.8, 0.6, 0.9, { rect: true, glass: 0x5d7690, frame: trim, bars: 1 });
    }
    if (!mural) for (const u of [-1.2, 1.2]) sf.window(u, 0.8, 0.6, 0.9, { rect: true, glass: 0x5d7690, frame: trim, bars: 1 });
  }
  const mural = warliCanvas(seed);
  k.plane(mural, 3.2, 3.2, [W / 2 + 0.04, 1.75, 0], Math.PI / 2);
  k.box(0xf2ead4, 0.06, 0.12, 3.5, W / 2 + 0.02, 0.1, 0, { outline: false });

  // name board over the front
  const names = NAMES[Math.floor(rnd() * NAMES.length)];
  // (board is hung on the roof parapet, centred)
  const boardY = H + 0.75;
  k.plane(nameBoard(names), 3.0, 0.95, [0, boardY, D / 2 + 0.19], 0);
  k.box(0xf2e2b0, 3.1, 1.0, 0.1, 0, H + 0.27, D / 2 + 0.08);

  // laundry lines with colourful clothes on the balcony rails + a few in front of the ground floor
  const lineMat = PAL.ink;
  const clothesAt = (y0, u0, u1, zz, count) => {
    const segs = 6;
    const sag = 0.18;
    for (let i = 0; i < segs; i++) {
      const t0 = i / segs, t1 = (i + 1) / segs;
      const ya = y0 - Math.sin(t0 * Math.PI) * sag, yb = y0 - Math.sin(t1 * Math.PI) * sag;
      const xa = u0 + (u1 - u0) * t0, xb = u0 + (u1 - u0) * t1;
      const len = Math.hypot(xb - xa, yb - ya);
      k.box(lineMat, len, 0.02, 0.02, (xa + xb) / 2, (ya + yb) / 2, zz, { rz: Math.atan2(yb - ya, xb - xa), outline: false });
    }
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const yy = y0 - Math.sin(t * Math.PI) * sag;
      const isSaree = rnd() > 0.7;
      const w = isSaree ? 0.34 : 0.3 + rnd() * 0.12, h = isSaree ? 0.95 : 0.4 + rnd() * 0.25;
      k.box(CLOTHES[Math.floor(rnd() * CLOTHES.length)], w, h, 0.03, u0 + (u1 - u0) * t, yy - h, zz, { rz: (rnd() - 0.5) * 0.12, outline: false });
    }
  };
  for (let s = 1; s <= storeys; s++) {
    const y0 = (s - 1) * FH + 1.0 + (s > 1 ? 0.0 : 0.0);
    const start = -W / 2 + 0.4 + rnd() * 1.5;
    const len = 2.4 + rnd() * 2.6;
    const zz = D / 2 + 0.9;
    clothesAt(y0 + 0.65, start, Math.min(start + len, W / 2 - 0.4), zz, 4 + Math.floor(rnd() * 3));
    if (rnd() > 0.35) clothesAt(y0 + 0.95, -W / 2 + W * 0.5 + rnd(), W / 2 - 0.5, zz, 3 + Math.floor(rnd() * 3));
  }
  // pots: tulsi vrindavan at ground level and little pots on the balcony rail
  const pot = (x, y, z, big) => {
    if (big) {
      k.box(PAL.terracotta, 0.55, 0.5, 0.55, x, y, z);
      k.box(PAL.cream, 0.7, 0.1, 0.7, x, y + 0.5, z);
      k.ball(PAL.leaf, 0.3, x, y + 0.88, z, { seg: 7, ring: 5 });
      k.ball(PAL.marigold, 0.08, x + 0.12, y + 1.12, z, { seg: 5, ring: 4, outline: false });
    } else {
      k.cyl(PAL.terracotta, 0.14, 0.1, 0.22, x, y, z, { seg: 7 });
      k.ball(i2c(rnd), 0.17, x, y + 0.36, z, { seg: 6, ring: 4 });
    }
  };
  const i2c = (r) => [PAL.leaf, PAL.pink, PAL.marigold, PAL.green][Math.floor(r() * 4)];
  pot(-W / 2 + 1.0, 0.12, D / 2 + BZ + 0.25, true);
  pot(W / 2 - 1.3, 0.12, D / 2 + BZ + 0.3, true);
  for (let s = 1; s < storeys; s++) for (let i = 0; i < 5; i++) pot(-W / 2 + 1.0 + rnd() * (W - 2), s * FH + 1.13, D / 2 + BZ - 0.1, false);
  // a charpoy-style bench and a bicycle's worth of clutter at the front
  k.box(PAL.wood, 1.4, 0.35, 0.5, W / 2 - 3.2, 0.12, D / 2 + BZ + 0.4, { ry: 0.12 });
  for (const sx of [-0.6, 0.6]) k.box(PAL.woodDark, 0.08, 0.3, 0.08, W / 2 - 3.2 + sx, 0.12, D / 2 + BZ + 0.4);

  const g = k.finish({ lean: 0.012 });
  g.name = 'chawl' + seed;
  g.userData = {
    kind: 'flats',
    footprint: Math.hypot(W / 2, D / 2 + BZ),
    height: H + 1.6,
    size: [W, D + BZ, H],
    variant: col.name,
    storeys,
    colliders: lineColliders(-W / 2 + 2.0, 0, W / 2 - 2.0, 0, 2.45, H, 2.4),
  };
  return g;
}

// ---- Mylapore tiled house ------------------------------------------------------------------------------------------------
function createHouse(ink, seed) {
  const rnd = mulberry32(Math.imul(seed + 29, 2654435761) >>> 0);
  for (let i = 0; i < 4; i++) rnd();
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.45, BZ = 1.35, H = FH * 2;
  const wall = HOUSE_WALLS[Math.abs(Math.round(seed)) % HOUSE_WALLS.length];
  const TRIM = 0xfff8e4, TILE = 0xc9603e, TILE_D = 0xa9503a, WOOD = PAL.woodDark, RED_OX = 0xb4533d;
  const k = new Kit(ink, { hatch: 0.14, seed: 260 + seed });
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(wall, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.12, 0.45, D + 0.12, 0, 0, 0);               // plinth course
  k.box(RED_OX, W + 0.1, 0.18, D + 0.1, 0.0, 0.45, 0, { outline: false }); // red-oxide skirting band
  k.box(TRIM, W + 0.2, 0.2, D + 0.2, 0, FH - 0.1, 0);               // floor band
  k.box(TRIM, W + 0.3, 0.3, D + 0.3, 0, H, 0);
  // red-tile gable roof, ridge along X, with a deep overhang; terracotta ridge cap + tile lines
  const RW = D + 1.2, RH = 1.9;
  k.extrude(TILE, polyShape([[-RW / 2, 0], [RW / 2, 0], [0, RH]]), W + 0.8, 0, H + 0.3, 0, { ry: Math.PI / 2 });
  for (let i = 1; i < 8; i++) for (const sz of [-1, 1]) k.box(TILE_D, W + 0.9, 0.04, 0.06, 0, H + 0.3 + (i / 8) * RH * 0.92 + 0.02, sz * (RW / 2 - (i / 8) * RW / 2 * 0.98), { outline: false });
  k.box(TILE_D, W + 0.9, 0.16, 0.22, 0, H + 0.3 + RH - 0.04, 0);
  // gable-end vents + a tiny rooftop water tank behind the ridge
  for (const sx of [-1, 1]) k.box(0xf4ecd6, 0.04, 0.5, 0.5, sx * (W / 2 + 0.42), H + 0.75, 0, { outline: false });
  if (rnd() > 0.5) k.cyl(0x34303f, 0.45, 0.5, 0.8, (rnd() - 0.5) * (W - 4), H + 0.3, -D / 2 - 0.1, { seg: 10 });
  // upper floor: three louvred wooden-shuttered windows and a small balcony over the door
  const f = k.face(0, 0, D / 2, 0);
  for (const u of [-W / 2 + 1.6, 0, W / 2 - 1.6]) {
    f.window(u, FH + 0.35, 0.9, 1.3, { rect: true, glass: 0x4f6a60, frame: TRIM, bars: 1, sill: true, jitter: 0.02 });
    f.box(WOOD, u - 0.62, FH + 0.35, 0.34, 1.3, 0.05, 0.03); f.box(WOOD, u + 0.62, FH + 0.35, 0.34, 1.3, 0.05, 0.03);
  }
  f.box(TRIM, 0, FH + 0.0, 1.9, 0.12, 0.5, 0.1);
  // ground floor: central door + two windows with iron bars, raised thinnai benches either side on wooden pillars
  const dc = DOORS[Math.floor(rnd() * DOORS.length)];
  f.window(0, 0.25, 1.0, 1.9, { rect: true, glass: dc, frame: TRIM, sill: false, jitter: 0.02 });
  f.box(PAL.gold, 0.32, 1.0, 0.07, 0.07, 0.05, 0.07, { outline: false });
  for (const sx of [-1, 1]) {
    const u = sx * (W / 2 - 1.9);
    f.window(u, 0.9, 1.0, 1.0, { rect: true, glass: 0x4a4358, frame: TRIM, bars: 1, sill: true, jitter: 0.02 });
    for (let i = -2; i <= 2; i++) f.box(PAL.ink, u + i * 0.18, 0.95, 0.03, 0.9, 0.03, 0.05, { outline: false });
    // thinnai: a raised verandah bench with a lime-washed edge, between the pillars
    f.box(0xefe6cf, sx * (W / 4 + 0.5), 0, W / 2 - 0.8, 0.52, BZ - 0.1, 0.0);
    f.box(RED_OX, sx * (W / 4 + 0.5), 0.52, W / 2 - 0.8, 0.07, BZ - 0.1, 0.0, { outline: false });
  }
  // verandah roof (lean-to of tiles) on carved wooden pillars
  k.add(new THREE.BoxGeometry(W + 0.4, 0.14, BZ + 0.9), TILE, { pos: [0, 2.9, D / 2 + BZ / 2 + 0.2], rot: [0.2, 0, 0] });
  for (let p = 0; p < 6; p++) { const u = -W / 2 + 0.5 + (p * (W - 1.0)) / 5; k.cyl(WOOD, 0.1, 0.12, 2.6, u, 0.0, D / 2 + BZ - 0.1, { seg: 6 }); k.box(PAL.wood, 0.34, 0.14, 0.34, u, 2.5, D / 2 + BZ - 0.1, { outline: false }); }
  k.box(0xefe6cf, W + 0.4, 0.18, BZ + 0.2, 0, 0, D / 2 + BZ / 2 + 0.05);   // step slab
  // side walls
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const sf = k.face(ox, 0, 0, ry);
    for (const u of [-1.0, 1.0]) { sf.window(u, 0.9, 0.6, 0.9, { rect: true, glass: 0x4a4358, frame: TRIM, bars: 1 }); if (ox < 0) sf.window(u, FH + 0.5, 0.6, 0.9, { rect: true, glass: 0x4f6a60, frame: TRIM, bars: 1 }); }
  }
  // name plate over the door + kolam on the ground in front
  k.plane(bilingualBoard(2.4, 0.7, ...(HOUSE_NAMES[Math.floor(rnd() * HOUSE_NAMES.length)]), { fill: '#fff4cf', hatch: '#e8d38a', tc: '#7a2f2f', taSize: 0.48, enSize: 0.22, seed: 9, px: 90 }), 2.0, 0.58, [0, 3.05, D / 2 + BZ + 0.12], 0);
  k.plane(kolamCanvas(seed), 1.5, 1.5, [0.0, 0.2, D / 2 + BZ + 1.1], 0, -Math.PI / 2);
  // pots: tulsi maadam + a hanging bunch of bananas + a string of mango leaves
  k.box(PAL.terracotta, 0.55, 0.5, 0.55, -W / 2 + 1.0, 0.12, D / 2 + BZ + 0.45); k.ball(PAL.leaf, 0.3, -W / 2 + 1.0, 1.0, D / 2 + BZ + 0.45, { seg: 7, ring: 5 });
  for (let i = 0; i < 9; i++) k.ball(0x4fa05a, 0.07, -0.55 + i * 0.14, 2.65 - Math.sin((i / 8) * Math.PI) * 0.1, D / 2 + BZ + 0.05, { seg: 4, ring: 3, outline: false });
  for (let i = 0; i < 5; i++) k.add(new THREE.CylinderGeometry(0.04, 0.07, 0.4, 5), 0xf2dc4a, { pos: [W / 2 - 1.2 + (i % 3) * 0.08, 2.35, D / 2 + BZ - 0.1], rot: [0.2, 0, (i % 3 - 1) * 0.25] });
  // a laundry line on the front
  for (let i = 0; i < 4; i++) k.box(CLOTHES[Math.floor(rnd() * CLOTHES.length)], 0.32, 0.5, 0.03, -2.4 + i * 0.5, 1.5, D / 2 + BZ + 0.7, { outline: false });
  k.box(PAL.ink, 2.2, 0.02, 0.02, -1.9, 2.0, D / 2 + BZ + 0.7, { outline: false });
  // pongal mural on the right gable wall (first floor)
  k.plane(warliCanvas(seed), 2.6, 2.6, [W / 2 + 0.04, 3.6, 0], Math.PI / 2);
  const g = k.finish({ lean: 0.012 });
  g.name = 'chawl' + seed;
  g.userData = {
    kind: 'house',
    footprint: Math.hypot(W / 2, D / 2 + BZ),
    height: H + RH + 0.6,
    size: [W, D + BZ, H],
    variant: 'tiled',
    storeys: 2,
    colliders: lineColliders(-W / 2 + 2.0, 0, W / 2 - 2.0, 0, 2.45, H, 2.4),
  };
  return g;
}
