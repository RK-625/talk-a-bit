// Connaught Place colonnade (replaces the stock exchange; layout id 'bse'). References: Wikimedia Commons "Corridor at Connaught Place at night, New Delhi",
// "Columns at Connaught place", "Colonnade of f block". A white Georgian curve: a ground-floor colonnade of tall plain round columns (Tuscan caps) under a flat
// entablature, hanging shop boards (generic, no brands) between the columns, two upper floors of rectangular windows in a cream wall with a cornice and a low parapet.
// A modern cream office block rises behind. The GIANT CHARKHA (props createBullStatue) stands at this landmark's 'bull' anchor. Local frame: front +Z, curve centre at z=-6.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, wobblyLine, paintBoard, latin, teText, lineColliders } from './kit.js';

const WHITE = 0xf8f4ea, CREAM = 0xefe7d3, SHADE = 0xd9d2c0, GLASS = 0x6f93ad, GLASS_D = 0x4a6a85;
const CZ = -6.0, RC = 9.0, RW = 7.4, A0 = -40, A1 = 40, NB = 9; // column radius, wall radius, arc extent (deg), bays

let _ribbon = null;
function ribbonCanvas() {
  if (_ribbon) return _ribbon;
  const W = 256, H = 512, { c, ctx } = makeCanvas(W, H), r = handRng(5);
  const rows = 12;
  ctx.fillStyle = '#eee6d2'; ctx.fillRect(0, 0, W, H);
  for (let j = 0; j < rows; j++) {
    ctx.fillStyle = ['#7aa6bc', '#86b1c4', '#6f9bb2'][j % 3]; ctx.fillRect(6, j * (H / rows) + 8, W - 12, H / rows - 16);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(r() * W * 0.6 + 8, j * (H / rows) + 10, 40, H / rows - 20);
    ctx.strokeStyle = 'rgba(43,36,64,0.7)'; ctx.lineWidth = 2.4; ctx.strokeRect(6, j * (H / rows) + 8, W - 12, H / rows - 16);
  }
  ctx.strokeStyle = 'rgba(43,36,64,0.55)'; ctx.lineWidth = 2;
  for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo((i * W) / 6, 0); ctx.lineTo((i * W) / 6, H); ctx.stroke(); }
  return (_ribbon = c);
}

/** a hanging shop board: generic category, Hindi + English (no brands) */
const BOARDS = [['मिठाई', 'SWEETS', '#2e7d5b', '#fff4d2'], ['किताबें', 'BOOKS', '#9c3d4a', '#ffe9a0'], ['कपड़े', 'TEXTILES', '#2d5f93', '#ffffff'], ['चश्मे', 'OPTICIANS', '#6b3f8f', '#fff4d2'], ['कैफ़े', 'CAFE', '#c2573a', '#fff4d2'], ['दवाइयाँ', 'CHEMIST', '#2f8f83', '#ffffff']];
const boardCanvas = (i) => paintBoard(1.3, 0.62, BOARDS[i][2], '#00000022', (ctx, W, H) => { teText(ctx, BOARDS[i][0], W * 0.5, H * 0.55, H * 0.46, { color: BOARDS[i][3] }); latin(ctx, BOARDS[i][1], W * 0.5, H * 0.9, H * 0.22, { color: BOARDS[i][3] }); }, { seed: 40 + i, px: 80 });

export function createBSE(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 41 });
  k.base(12, 8, { color: PAL.stone });
  const P = (R, a) => [Math.sin(a) * R, CZ + Math.cos(a) * R]; // arc point
  const rad = (d) => (d * Math.PI) / 180;
  const step = (A1 - A0) / (NB - 1);
  // paved colonnade floor: a low curved band
  for (let i = 0; i < NB; i++) {
    const a = rad(A0 + i * step), [x, z] = P(8.2, a);
    k.box(SHADE, 2.0, 0.16, 2.1, x, 0, z, { ry: a, outline: false });
  }
  const shopCol = [0xf4d9a0, 0xe9a6a0, 0x9fd3c7, 0xf2c98a, 0xb9c9ea, 0xf4d9a0, 0xe9b98a, 0x9fd3c7, 0xf2c98a];
  const GH = 3.6, UH = 5.4, EY = GH + 0.16, WY = EY + 0.45;
  const bc = [];
  for (let i = 0; i < NB; i++) {
    const a = rad(A0 + i * step), [x, z] = P(RC, a), [wx, wz] = P(RW, a), [ux, uz] = P(8.5, a), [mx, mz] = P(7.7, a);
    // the column (plain round shaft, a little entasis, square abacus) on a plinth
    k.box(SHADE, 0.7, 0.18, 0.7, x, 0.1, z, { ry: a });
    k.cyl(WHITE, 0.3, 0.36, GH - 0.35, x, 0.28, z, { seg: 9 });
    k.cyl(CREAM, 0.42, 0.34, 0.2, x, GH - 0.1, z, { seg: 9 });
    k.box(WHITE, 0.8, 0.16, 0.8, x, GH + 0.05, z, { ry: a });
    bc.push([x, z]);
    // shop behind: lit interior panel + dark glazing + door
    k.box(shopCol[i], 1.5, GH - 0.4, 0.3, wx, 0.16, wz, { ry: a, outline: false });
    const f = k.face(wx + Math.sin(a) * 0.2, 0.16, wz + Math.cos(a) * 0.2, a);
    f.flat(GLASS_D, rectS(1.1, 2.2), 0, 0.4, 0.0);
    f.flat(0x2f2a3c, rectS(0.06, 2.2), 0, 0.4, 0.02);
    // wall block of the upper floors + the entablature slab over this bay
    k.box(WHITE, 1.72, 0.45, 2.4, (x + wx) / 2, EY, (z + wz) / 2, { ry: a });
    k.box(CREAM, 1.66, UH, 1.6, mx, WY, mz, { ry: a });
    const uf = k.face(ux, WY, uz, a);
    for (const y0 of [0.6, 3.1]) uf.window(0, y0, 0.78, 1.55, { rect: true, glass: GLASS, frame: WHITE, bars: 1, sill: true, n: 0.05, jitter: 0.02 });
    // cornice + parapet
    const [cx, cz] = P(RC - 0.35, a);
    k.box(WHITE, 1.74, 0.34, 1.3, cx - Math.sin(a) * 0.15, WY + UH, cz - Math.cos(a) * 0.15, { ry: a });
    const [px, pz] = P(RC - 0.5, a);
    k.box(CREAM, 1.7, 0.55, 0.24, px, WY + UH + 0.34, pz, { ry: a });
    // a little string course between the two window rows
    k.box(WHITE, 1.7, 0.14, 0.2, ux, WY + 2.6, uz, { ry: a, outline: false });
  }
  // hanging shop boards between columns, set perpendicular to the front (viewed from the plaza)
  for (let i = 0; i < NB - 1; i++) {
    const a = rad(A0 + (i + 0.5) * step), [x, z] = P(RC - 0.6, a);
    k.plane(boardCanvas(i % BOARDS.length), 1.1, 0.52, [x, GH - 0.75, z + 0.0], a);
    k.box(PAL.ink, 0.04, 0.4, 0.04, x - Math.cos(a) * 0.45, GH - 0.2, z + Math.sin(a) * 0.45, { outline: false });
    k.box(PAL.ink, 0.04, 0.4, 0.04, x + Math.cos(a) * 0.45, GH - 0.2, z - Math.sin(a) * 0.45, { outline: false });
  }
  // end returns: the colonnade wraps round a little at both ends
  for (const s of [-1, 1]) { const [x, z] = P(RC - 0.2, rad(s * (Math.abs(A1) + 4.5))); k.box(WHITE, 0.7, GH + UH + 0.8, 1.5, x, 0, z, { ry: rad(s * (Math.abs(A1) + 4.5)) }); }

  // the modern cream office block rising behind (ribbon windows, white fins, a small roof plant): the skyline over the old colonnade
  const TX = 3.2, TZ = -3.6, TH = 16;
  k.box(0xeee4cb, 5.2, TH, 3.8, TX, 0.1, TZ);
  k.box(WHITE, 5.5, 0.35, 4.1, TX, TH, TZ);
  k.box(0x9aa7b1, 1.8, 0.9, 1.4, TX + 1.0, TH + 0.35, TZ - 0.3);
  k.cyl(0x9aa7b1, 0.06, 0.09, 2.6, TX - 1.4, TH + 0.35, TZ + 0.3, { seg: 5 });
  k.ball(PAL.red, 0.12, TX - 1.4, TH + 3.0, TZ + 0.3, { seg: 5, ring: 4 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(WHITE, 0.25, TH, 0.25, TX + sx * 2.6, 0.1, TZ + sz * 1.9);
  const rc = ribbonCanvas();
  k.planes_(rc, [
    { w: 4.7, h: TH - 0.6, pos: [TX, 0.1 + TH / 2, TZ + 1.93], ry: 0 }, { w: 4.7, h: TH - 0.6, pos: [TX, 0.1 + TH / 2, TZ - 1.93], ry: Math.PI },
    { w: 3.4, h: TH - 0.6, pos: [TX + 2.63, 0.1 + TH / 2, TZ], ry: Math.PI / 2 }, { w: 3.4, h: TH - 0.6, pos: [TX - 2.63, 0.1 + TH / 2, TZ], ry: -Math.PI / 2 },
  ]);

  // plaza sign: "Inner Circle" in Hindi + English on a low board at the colonnade front (plain, no logos)
  const banner = paintBoard(4.6, 0.9, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'कनॉट प्लेस', W * 0.5, H * 0.58, H * 0.5, { color: '#7a2f2f' }); latin(ctx, 'CONNAUGHT PLACE · INNER CIRCLE', W * 0.5, H * 0.92, H * 0.2, { color: '#2b2440' }); }, { seed: 4, px: 90 });
  k.box(PAL.ink, 4.7, 0.95, 0.12, -4.6, 0.0, 4.3);
  k.plane(banner, 4.6, 0.9, [-4.6, 0.48, 4.37], 0);
  for (const sx of [-1, 1]) { k.box(PAL.stoneDark, 0.9, 0.5, 0.9, sx * 5.2, 0, 4.3); k.ball(PAL.leaf, 0.55, sx * 5.2, 0.95, 4.3, { seg: 7, ring: 5 }); }

  const g = k.finish({ lean: 0.004 });
  g.name = 'bse';
  g.userData = {
    footprint: 7,
    height: TH + 3.2,
    colliders: [
      ...bc.map(([x, z]) => ({ x: x * (RW + 0.9) / RC, z: CZ + (z - CZ) * (RW + 0.9) / RC, radius: 1.35, height: 9 })),
      { x: TX, z: TZ, radius: 2.9, height: TH },
    ],
  };
  void INK; void THREE; void wobblyLine; void lineColliders;
  return g;
}

function rectS(w, h) { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.closePath(); return s; }
