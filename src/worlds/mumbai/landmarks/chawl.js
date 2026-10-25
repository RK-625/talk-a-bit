// Chawl: 2-3 storey block with a long common balcony, railings, doors, laundry lines, tulsi pots and a Warli mural
// on the side wall. Seeded colour/size variants (faded pistachio, pink, sky blue). Front (+Z) = balcony side.
import * as THREE from 'three';
import { Kit, PAL, rectPts, makeCanvas, handRng, INK, wobblyLine, paintBoard, inkText, latin, lineColliders, mulberry32, rectShape } from './kit.js';

const COLORS = [
  { wall: 0xcfe3b9, trim: 0xf5f0dc, rail: 0x6f9f7e, name: 'pistachio' },
  { wall: 0xf3c4cf, trim: 0xfbf1e2, rail: 0xb5566f, name: 'pink' },
  { wall: 0xb9d9ee, trim: 0xf6f3e8, rail: 0x4f86b2, name: 'sky' },
  { wall: 0xf6e3a6, trim: 0xfaf3e0, rail: 0xc98a3b, name: 'butter' },
];
const DOORS = [0x7a4f33, 0x2f7f86, 0xa8483a, 0xd9a23f, 0x4f6fa8, 0x5f8f55];
const CLOTHES = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea, 0xe23d3d, 0x3fb7a5, 0xf5d86a];
const NAMES = [['गणेश चाळ', 'GANESH CHAWL'], ['लक्ष्मी चाळ', 'LAXMI CHAWL'], ['शिवाजी चाळ', 'SHIVAJI CHAWL'], ['ज्योती चाळ', 'JYOTI CHAWL']];

// A Warli mural: white pigment on a mud-red wall: ring of triangle-bodied dancers, tree, sun, hut, animals.
function warliCanvas(seed) {
  const W = 384, H = 384;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(seed * 13 + 5);
  ctx.fillStyle = '#b8694a'; ctx.fillRect(0, 0, W, H);
  // mud-wall speckle
  for (let i = 0; i < 420; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(120,60,40,0.18)' : 'rgba(230,160,120,0.16)'; ctx.fillRect(r() * W, r() * H, 2 + r() * 5, 2 + r() * 3); }
  ctx.strokeStyle = '#fbf4e2'; ctx.fillStyle = '#fbf4e2'; ctx.lineWidth = 3.2;
  const tri = (x, y, rot, s) => { // Warli person: head, two triangles, line limbs
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath(); ctx.arc(0, -s * 1.7, s * 0.34, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-s * 0.7, -s * 1.3); ctx.lineTo(s * 0.7, -s * 1.3); ctx.lineTo(0, -s * 0.05); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -s * 0.05); ctx.lineTo(-s * 0.55, s * 1.05); ctx.lineTo(s * 0.55, s * 1.05); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-s * 0.7, -s * 1.25); ctx.lineTo(-s * 1.15, -s * 0.5); ctx.moveTo(s * 0.7, -s * 1.25); ctx.lineTo(s * 1.15, -s * 0.5); ctx.stroke();
    ctx.restore();
  };
  // sun
  const cx = W / 2, cy = H * 0.52;
  ctx.beginPath(); ctx.arc(cx, cy, 20, 0, 6.283); ctx.stroke();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.283; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26); ctx.lineTo(cx + Math.cos(a) * 36, cy + Math.sin(a) * 36); ctx.stroke(); }
  // ring of dancers (chakra), hands joined
  const N = 11, R = 96;
  const pts = [];
  for (let i = 0; i < N; i++) { const a = (i / N) * 6.283; pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R, a]); }
  ctx.lineWidth = 2.6;
  for (let i = 0; i < N; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % N]; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }
  for (const [x, y, a] of pts) tri(x, y, a + Math.PI / 2, 13);
  // zig-zag border + dots
  ctx.lineWidth = 3;
  for (const yy of [16, H - 16]) {
    ctx.beginPath();
    for (let x = 10; x < W - 6; x += 16) { ctx.lineTo(x, yy + ((x / 16) % 2 ? 7 : -7)); }
    ctx.stroke();
  }
  for (let x = 20; x < W; x += 16) { ctx.beginPath(); ctx.arc(x, 34, 2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(x, H - 34, 2, 0, 6.283); ctx.fill(); }
  // tree, hut, animals in the corners
  const tree = (x, y) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 46); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y - 14 - i * 9); ctx.lineTo(x - 15 + i * 2, y - 24 - i * 9); ctx.moveTo(x, y - 14 - i * 9); ctx.lineTo(x + 15 - i * 2, y - 24 - i * 9); ctx.stroke(); } };
  tree(52, 108); tree(W - 52, 108);
  ctx.beginPath(); ctx.moveTo(W - 90, H - 62); ctx.lineTo(W - 30, H - 62); ctx.lineTo(W - 30, H - 100); ctx.lineTo(W - 60, H - 128); ctx.lineTo(W - 90, H - 100); ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W - 68, H - 62); ctx.lineTo(W - 68, H - 84); ctx.lineTo(W - 52, H - 84); ctx.lineTo(W - 52, H - 62); ctx.stroke();
  // peacock-ish bird / cow: bodies of two triangles too
  ctx.beginPath(); ctx.moveTo(40, H - 78); ctx.lineTo(86, H - 78); ctx.lineTo(62, H - 100); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(86, H - 78); ctx.lineTo(106, H - 98); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(48, H - 78); ctx.lineTo(48, H - 56); ctx.moveTo(78, H - 78); ctx.lineTo(78, H - 56); ctx.stroke();
  wobblyLine(ctx, rectPts(4, 4, W - 4, H - 4, 8), { r, amp: 3, lw: 6, color: '#fbf4e2', closed: true });
  return c;
}

function nameBoard(names) {
  return paintBoard(3.0, 0.95, '#f2e2b0', '#d9b968', (ctx, W, H) => {
    inkText(ctx, names[0], W / 2, H * 0.58, H * 0.5, { devanagari: true, color: '#7a2f2f' });
    latin(ctx, names[1], W / 2, H * 0.9, H * 0.2, { color: '#2b2440' });
  }, { seed: 7, px: 90 });
}

export function createChawl(ink, seed = 1) {
  if (typeof ink === 'number') { seed = ink; ink = undefined; } // lab: &spec=2
  const rnd = mulberry32(Math.imul(seed + 17, 2654435761) >>> 0);
  for (let i = 0; i < 4; i++) rnd();
  const col = COLORS[Math.abs(Math.round(seed)) % COLORS.length]; // consecutive seeds walk through the palette
  const storeys = rnd() > 0.45 ? 3 : 2;
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
  const tx = (rnd() - 0.5) * (W - 3);
  k.cyl(0x6f8fb4, 0.62, 0.62, 1.0, tx, H + 0.35, -0.6, { seg: 10 });
  k.cyl(0x56789c, 0.66, 0.66, 0.1, tx, H + 0.9, -0.6, { seg: 10 });
  k.box(PAL.woodDark, 0.12, 0.35, 0.12, tx - 0.4, H + 0.35, 0.3); // tank legs
  k.box(PAL.terracotta, 1.5, 0.12, 1.6, -W / 2 + 1.4, H + 1.0, 0.2, { rz: 0.15 });
  for (const sx of [-0.6, 0.6]) k.box(PAL.woodDark, 0.08, 0.7, 0.08, -W / 2 + 1.4 + sx, H + 0.35, 0.8);
  // TV antenna
  k.cyl(PAL.ink, 0.02, 0.02, 1.6, W / 2 - 1.2, H + 0.35, 0.4, { seg: 4 });
  k.box(PAL.ink, 0.9, 0.03, 0.03, W / 2 - 1.2, H + 1.7, 0.4); k.box(PAL.ink, 0.6, 0.03, 0.03, W / 2 - 1.2, H + 1.4, 0.4);

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
      k.cyl(PAL.ink, 0.015, 0.015, 0.5, x + 0.12, y + 1.0, z, { seg: 4, outline: false });
      k.box(PAL.marigold, 0.16, 0.1, 0.02, x + 0.2, y + 1.4, z, { outline: false });
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
    footprint: Math.hypot(W / 2, D / 2 + BZ),
    height: H + 1.6,
    size: [W, D + BZ, H],
    variant: col.name,
    storeys,
    colliders: lineColliders(-W / 2 + 2.0, 0, W / 2 - 2.0, 0, 2.45, H, 2.4),
  };
  return g;
}
