// Kochi houses and flats (kept under the old "chawl" name so the layout does not change). Two seeded kinds, same footprint as the old block:
//   * Kerala tiled houses (seed % 3 != 2): whitewashed or pastel walls, a steep dark-terracotta gabled tile roof with deep eaves, a lean-to
//     verandah roof on timber pillars over a raised plinth porch, brown wood-framed windows, a brass nilavilakku at the door, a banana plant.
//     Photo: Wikimedia Commons "Kerala house" (two-storey white house, deep tiled hip/gable roof, lean-to tiled verandah, wood windows).
//   * Kochi apartment blocks (seed % 3 == 2): 3-4 storey painted blocks with a long balcony grill, black water tanks, a dish and a
//     vallam-kali (snake-boat race) mural on the side wall.
// Front (+Z) = balcony / verandah side.
import * as THREE from 'three';
import { Kit, PAL, rectPts, makeCanvas, handRng, INK, wobblyLine, paintBoard, inkText, taText, bilingualBoard, latin, lineColliders, mulberry32, rectShape, polyShape } from './kit.js';

const COLORS = [ // apartment blocks: faded weather-washed emulsion
  { wall: 0xf3e7b8, trim: 0xfaf3e0, rail: 0x3f6f6a, name: 'cream' },
  { wall: 0xd9ecd9, trim: 0xf6f3e8, rail: 0x4f7f6a, name: 'mint' },
  { wall: 0xf2cdb8, trim: 0xfbf1e2, rail: 0x7a4a3a, name: 'peach' },
  { wall: 0xcfe0ee, trim: 0xf6f3e8, rail: 0x3f6f9a, name: 'blue' },
];
const HOUSE_WALLS = [0xf6f1e4, 0xf3dc8e, 0xa9d8c0, 0xa9cde6, 0xe9a37f, 0xf6f1e4, 0xd7c8ec];
const DOORS = [0x7a4f33, 0x2f7f86, 0x8a3d2c, 0xd9a23f, 0x4f6fa8, 0x5f8f55];
const CLOTHES = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea, 0xe23d3d, 0x3fb7a5, 0xf5d86a];
const NAMES = [['ശ്രീ അപ്പാർട്ട്മെന്റ്സ്', 'SREE APARTMENTS'], ['മറൈൻ വ്യൂ', 'MARINE VIEW'], ['കായൽ ഫ്ലാറ്റ്സ്', 'KAYAL FLATS'], ['തണൽ റെസിഡൻസി', 'THANAL RESIDENCY']];
const HOUSE_NAMES = [['ശാന്തി നിവാസ്', 'SHANTHI NIVAS'], ['പുത്തൻപുരയ്ക്കൽ', 'PUTHENPURACKAL'], ['കൃപ ഭവൻ', 'KRIPA BHAVAN'], ['തറവാട്', 'THARAVAD']];

/** a pookalam: concentric Onam flower carpet (orange / yellow / white petals, a purple ring, a pink star, a brass lamp left of it) */
export function pookalamCanvas(seed = 1) {
  const W = 192;
  const { c, ctx } = makeCanvas(W, W);
  const r = handRng(seed * 7 + 3);
  const cx = W / 2, cy = W / 2;
  const dot = (x, y, rad, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.283); ctx.fill(); };
  const rings = [['#f2931f', 86], ['#f6d548', 72], ['#f2931f', 58], ['#7a4fb8', 49], ['#fbf6ea', 44], ['#f6d548', 36], ['#e8457a', 26], ['#f2931f', 15]];
  for (const [col, rr] of rings) {
    ctx.fillStyle = col; ctx.beginPath();
    const n = rr > 60 ? 16 : 24;
    for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * 6.283, k = rr > 60 && i % 2 ? 0.86 : 1; ctx.lineTo(cx + Math.cos(a) * rr * k, cy + Math.sin(a) * rr * k); }
    ctx.closePath(); ctx.fill();
  }
  for (let i = 0; i < 8; i++) { const a = (i / 8) * 6.283 + 0.2; ctx.fillStyle = i % 2 ? '#e8457a' : '#fbf6ea'; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * 36, cy + Math.sin(a) * 36, 9, 5, a, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 20; i++) { const a = (i / 20) * 6.283; dot(cx + Math.cos(a) * 52, cy + Math.sin(a) * 52, 2.4, r() > 0.5 ? '#fbf6ea' : '#5aa86a'); }
  ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(cx, cy, 86, 0, 6.283); ctx.stroke();
  return c;
}
export { pookalamCanvas as kolamCanvas };

// A vallam kali (snake-boat race) mural: a long boat with rowers, sun, coconut palms and waves on a warm wall.
function boatRaceCanvas(seed) {
  const W = 384, H = 384;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(seed * 13 + 5);
  ctx.fillStyle = '#f2d98a'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 300; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(160,100,50,0.14)' : 'rgba(255,240,170,0.16)'; ctx.fillRect(r() * W, r() * H, 2 + r() * 5, 2 + r() * 3); }
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  // sun
  const cx = W * 0.72, cy = H * 0.24;
  for (let i = 0; i < 14; i++) { const a = (i / 14) * 6.283; ctx.strokeStyle = '#c9402f'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); ctx.lineTo(cx + Math.cos(a) * 62, cy + Math.sin(a) * 62); ctx.stroke(); }
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.fillStyle = '#f26a3b'; ctx.beginPath(); ctx.arc(cx, cy, 36, 0, 6.283); ctx.fill(); ctx.stroke();
  // coconut palms on the bank
  for (const [x, lean] of [[52, 0.1], [92, -0.06]]) {
    ctx.save(); ctx.translate(x, H * 0.66); ctx.rotate(lean);
    ctx.fillStyle = '#8a5f3a'; ctx.fillRect(-6, -120, 12, 120); ctx.strokeRect(-6, -120, 12, 120);
    ctx.fillStyle = '#3f9b5a';
    for (const a of [-2.6, -2.0, -1.2, -0.5, 0.2, 0.8]) { ctx.save(); ctx.translate(0, -120); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(34, -22, 66, 6); ctx.quadraticCurveTo(34, -6, 0, 0); ctx.fill(); ctx.stroke(); ctx.restore(); }
    ctx.restore();
  }
  // the long snake boat: dark hull, raised prow, rowers in white mundu with oars, golden umbrellas
  ctx.fillStyle = '#2f2a3a'; ctx.beginPath(); ctx.moveTo(30, H * 0.7); ctx.lineTo(W - 24, H * 0.7); ctx.quadraticCurveTo(W - 8, H * 0.62, W - 6, H * 0.56); ctx.lineTo(W - 34, H * 0.66); ctx.lineTo(60, H * 0.76); ctx.quadraticCurveTo(34, H * 0.74, 30, H * 0.7); ctx.closePath(); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 11; i++) {
    const x = 70 + i * 26;
    ctx.fillStyle = '#fbf6ea'; ctx.fillRect(x - 8, H * 0.55, 16, H * 0.14); ctx.strokeRect(x - 8, H * 0.55, 16, H * 0.14);
    ctx.fillStyle = '#b87a4e'; ctx.beginPath(); ctx.arc(x, H * 0.52, 9, 0, 6.283); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, H * 0.6); ctx.lineTo(x - 22, H * 0.82); ctx.stroke();
  }
  for (const x of [W - 70, W - 100, 110]) { ctx.fillStyle = '#e8c04a'; ctx.beginPath(); ctx.arc(x, H * 0.4, 18, Math.PI, 0); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, H * 0.4); ctx.lineTo(x, H * 0.55); ctx.stroke(); }
  // waves
  ctx.strokeStyle = '#2f6fa8'; ctx.lineWidth = 6;
  for (let row = 0; row < 3; row++) { ctx.beginPath(); for (let x = 0; x <= W; x += 8) ctx.lineTo(x, H * (0.82 + row * 0.055) + Math.sin(x / 14 + row) * 5); ctx.stroke(); }
  wobblyLine(ctx, rectPts(4, 4, W - 4, H - 4, 8), { r, amp: 3, lw: 6, color: '#7a2f2f', closed: true });
  taText(ctx, 'വള്ളംകളി', W / 2, 44, 36, { color: '#7a2f2f' });
  return c;
}
const warliCanvas = boatRaceCanvas;

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
  // rooftop life (no poles-with-crossbars): a satellite TV dish + a black water tank, pigeon coop or a bamboo-and-tarp shed
  const tx = (rnd() - 0.5) * (W - 4);
  const kind = Math.floor(rnd() * 3);
  if (kind === 0) { // black water tank on a brick stand
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
  // a cane chair and a scooter's worth of clutter at the front
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

// ---- Kerala tiled house -------------------------------------------------------------------------------------------------------
function createHouse(ink, seed) {
  const rnd = mulberry32(Math.imul(seed + 29, 2654435761) >>> 0);
  for (let i = 0; i < 4; i++) rnd();
  const W = [8.4, 9.6, 10.8][Math.floor(rnd() * 3)];
  const D = 4.4, FH = 2.45, BZ = 1.35, H = FH * 2;
  const wall = HOUSE_WALLS[Math.abs(Math.round(seed)) % HOUSE_WALLS.length];
  const TRIM = 0xfff8e4, TILE = 0xa94a35, TILE_D = 0x853a2b, TILE_L = 0xc0623f, WOOD = 0x6e4a33, FRAME = 0x7a3f2c, PLINTH = 0x9c948a;
  const k = new Kit(ink, { hatch: 0.14, seed: 260 + seed });
  k.base(W + 1, D + 3.2, { color: PAL.stone });
  k.box(PLINTH, W + 0.12, 0.5, D + 0.12, 0, 0, 0);                    // damp-stained plinth course
  k.box(wall, W, H - 0.5, D, 0, 0.5, 0);
  k.box(TRIM, W + 0.2, 0.16, D + 0.2, 0, FH - 0.08, 0);               // floor band
  k.box(WOOD, W + 0.3, 0.2, D + 0.3, 0, H, 0);                        // timber wall plate
  // steep gabled tile roof, ridge along X, deep eaves; ridge cap, tile courses and barge boards
  const RW = D + 2.4, RH = 2.2;
  k.extrude(TILE, polyShape([[-RW / 2, 0], [RW / 2, 0], [0, RH]]), W + 1.4, 0, H + 0.2, 0, { ry: Math.PI / 2 });
  for (let i = 1; i < 11; i++) for (const sz of [-1, 1]) k.box(i % 2 ? TILE_D : TILE_L, W + 1.5, 0.05, 0.07, 0, H + 0.2 + (i / 11) * RH * 0.94 + 0.04, sz * (RW / 2 - (i / 11) * RW / 2 * 0.96 + 0.02), { outline: false });
  k.box(TILE_D, W + 1.5, 0.16, 0.26, 0, H + 0.2 + RH - 0.05, 0);
  for (const sx of [-1, 1]) { // gable-end wooden louvre vents under the barge boards
    k.box(WOOD, 0.1, 0.1, RW * 0.5, sx * (W / 2 + 0.72), H + 0.4 + RH * 0.18, 0, { rx: 0, outline: false });
    k.box(0x5a3c28, 0.06, 0.9, 0.9, sx * (W / 2 + 0.02), H + 0.55, 0, { outline: false });
  }
  if (rnd() > 0.5) k.cyl(0x2a2736, 0.4, 0.45, 0.7, (rnd() - 0.5) * (W - 4), H + 0.2, -D / 2 - 0.1 + 0.3, { seg: 10 }); // a black water tank peeking behind the ridge
  // upper floor: three small wood-framed windows with shutters
  const f = k.face(0, 0, D / 2, 0);
  for (const u of [-W / 2 + 1.6, 0, W / 2 - 1.6]) {
    f.window(u, FH + 0.45, 0.8, 1.15, { rect: true, glass: 0x3f5a50, frame: FRAME, bars: 1, sill: true, jitter: 0.02 });
    f.box(0x8a5a38, u - 0.52, FH + 0.45, 0.28, 1.15, 0.05, 0.03); f.box(0x8a5a38, u + 0.52, FH + 0.45, 0.28, 1.15, 0.05, 0.03);
  }
  // ground floor: central door (brass lamp beside it), two windows with grills; raised plinth porch with steps either side
  const dc = DOORS[Math.floor(rnd() * DOORS.length)];
  f.window(0, 0.2, 1.0, 1.95, { rect: true, glass: dc, frame: FRAME, sill: false, jitter: 0.02 });
  f.box(PAL.gold, 0.32, 1.0, 0.07, 0.07, 0.05, 0.07, { outline: false });
  for (const sx of [-1, 1]) {
    const u = sx * (W / 2 - 1.9);
    f.window(u, 0.95, 0.9, 1.0, { rect: true, glass: 0x3f3a50, frame: FRAME, bars: 1, sill: true, jitter: 0.02 });
    for (let i = -2; i <= 2; i++) f.box(PAL.ink, u + i * 0.17, 1.0, 0.03, 0.85, 0.03, 0.05, { outline: false });
  }
  f.box(PLINTH, 0, 0, W - 0.2, 0.62, BZ - 0.1, 0.0);                    // raised stone porch (thinnai)
  f.box(0xe0d7c4, 0, 0.62, W - 0.2, 0.05, BZ - 0.1, 0.0, { outline: false });
  // lean-to tiled verandah roof on timber pillars
  k.add(new THREE.BoxGeometry(W + 0.6, 0.14, BZ + 1.2), TILE, { pos: [0, 2.85, D / 2 + BZ / 2 + 0.25], rot: [0.22, 0, 0] });
  for (let i = 0; i < 9; i++) k.box(i % 2 ? TILE_D : TILE_L, W + 0.7, 0.04, 0.08, 0, 2.62 + i * 0.05, D / 2 + 0.3 + i * 0.18, { rx: 0.22, outline: false });
  for (let p = 0; p < 6; p++) { const u = -W / 2 + 0.5 + (p * (W - 1.0)) / 5; k.cyl(WOOD, 0.1, 0.12, 2.3, u, 0.62, D / 2 + BZ - 0.15, { seg: 6 }); k.box(0x8a5a38, 0.34, 0.14, 0.34, u, 2.6, D / 2 + BZ - 0.15, { outline: false }); }
  // side walls
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const sf = k.face(ox, 0, 0, ry);
    for (const u of [-1.0, 1.0]) { sf.window(u, 0.95, 0.7, 1.0, { rect: true, glass: 0x3f3a50, frame: FRAME, bars: 1 }); sf.window(u, FH + 0.5, 0.7, 1.0, { rect: true, glass: 0x3f5a50, frame: FRAME, bars: 1 }); }
  }
  // house-name plate on the verandah beam + a pookalam on the ground in front
  k.plane(bilingualBoard(2.4, 0.7, ...(HOUSE_NAMES[Math.floor(rnd() * HOUSE_NAMES.length)]), { fill: '#fff4cf', hatch: '#e8d38a', tc: '#7a2f2f', taSize: 0.48, enSize: 0.22, seed: 9, px: 90 }), 1.9, 0.55, [0, 3.0, D / 2 + BZ + 0.34], 0.0);
  k.plane(pookalamCanvas(seed), 1.5, 1.5, [-W / 4, 0.2, D / 2 + BZ + 1.1], 0, -Math.PI / 2);
  // a brass nilavilakku (standing lamp) beside the steps, a banana plant at the side, a steel-and-cane chair on the porch
  const lx = W / 2 - 1.0, lz = D / 2 + BZ + 0.35;
  k.cyl(PAL.brass, 0.2, 0.25, 0.1, lx, 0.1, lz, { seg: 8 }); k.cyl(PAL.brass, 0.05, 0.07, 0.8, lx, 0.2, lz, { seg: 6 }); k.cyl(PAL.brass, 0.22, 0.1, 0.1, lx, 1.0, lz, { seg: 8 }); k.ball(0xffe9a0, 0.07, lx, 1.16, lz, { seg: 5, ring: 4, outline: false });
  const bx = -W / 2 + 0.45, bz = D / 2 + BZ + 0.55;
  k.cyl(0x7fae5f, 0.1, 0.14, 1.4, bx, 0, bz, { seg: 6 });
  for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.283; k.box(i % 2 ? 0x5fa056 : 0x7fc06a, 0.28, 0.04, 1.3, bx + Math.sin(a) * 0.55, 1.45, bz + Math.cos(a) * 0.55, { ry: a, rx: -0.45, outline: false }); }
  k.box(0xc89a6a, 0.55, 0.45, 0.5, W / 2 - 3.0, 0.62, D / 2 + 0.55, { ry: 0.2 });
  // laundry (white mundus and a sari) on a line at the side
  for (let i = 0; i < 4; i++) k.box(i % 3 === 1 ? 0xf2b33f : 0xfbf6ea, 0.4, 0.8, 0.03, -W / 2 + 1.0 + i * 0.55, 1.1, D / 2 + BZ + 0.9, { outline: false });
  k.box(PAL.ink, 2.2, 0.02, 0.02, -W / 2 + 1.5, 1.95, D / 2 + BZ + 0.9, { outline: false });
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
