// Cyber Towers (replaces BSE; layout id 'bse'). Reference: Wikimedia Commons "Hyderabad-HitecCity Cyber Tower 2002" / "Cyber Towers".
// A sand-coloured curved block wrapped in a white DIAGRID lattice with a white arched rim, beside a round glass tower and a second sandstone wing,
// on a low podium. The giant pearl sculpture (props/siteDetails createBullStatue) stands at this landmark's 'bull' anchor.
// Local frame: front +Z. Podium 11 x 7 x 1.4, tall glass tower ~17.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, wobblyLine, paintBoard, latin, teText, lineColliders } from './kit.js';

const SAND = 0xe3b98e, SAND_D = 0xc99a70, WHITE = 0xf8f5ee, GLASS = 0x7fb5c8, GLASS_D = 0x5f93ad;

let _diag = null;
function diagridCanvas() {
  if (_diag) return _diag;
  const W = 256, H = 512;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(5);
  ctx.fillStyle = '#e3b98e'; ctx.fillRect(0, 0, W, H);
  // little dark windows on a loose grid
  ctx.fillStyle = 'rgba(70,58,70,0.8)';
  for (let j = 0; j < 12; j++) for (let i = 0; i < 4; i++) ctx.fillRect(i * 64 + 22, j * 42 + 14, 22, 12);
  // white diagonal lattice
  ctx.strokeStyle = '#faf7f0'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  for (let o = -H; o < W + H; o += 128) {
    ctx.beginPath(); ctx.moveTo(o, 0); ctx.lineTo(o + H, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(o + H, 0); ctx.lineTo(o, H); ctx.stroke();
  }
  ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
  for (let o = -H; o < W + H; o += 128) {
    wobblyLine(ctx, [[o - 5, 0], [o + H - 5, H]], { r, amp: 1.2, lw: 2 });
    wobblyLine(ctx, [[o + H + 5, 0], [o + 5, H]], { r, amp: 1.2, lw: 2 });
  }
  return (_diag = c);
}

let _glass = null;
function glassCanvas() {
  if (_glass) return _glass;
  const W = 300, H = 560;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(7);
  const cols = 6, rows = 16, pw = W / cols, ph = H / rows;
  const tints = ['#6aa6bb', '#7ab4c6', '#5f98b0', '#8cc0cf', '#70a8bd'];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    ctx.fillStyle = tints[Math.floor(r() * tints.length)];
    ctx.fillRect(i * pw + 1, j * ph + 1, pw - 2, ph - 2);
    if ((i + j) % 3 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(i * pw + 3, j * ph + 3, pw * 0.4, ph - 6); }
  }
  ctx.strokeStyle = 'rgba(43,36,64,0.7)'; ctx.lineWidth = 2;
  for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(i * pw, 0); ctx.lineTo(i * pw, H); ctx.stroke(); }
  for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * ph); ctx.lineTo(W, j * ph); ctx.stroke(); }
  return (_glass = c);
}

export function createBSE(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 41 });
  k.base(12, 8, { color: PAL.stone });

  // podium
  k.box(SAND_D, 11, 1.4, 7, 0, 0, 0);
  k.box(WHITE, 11.3, 0.22, 7.3, 0, 1.4, 0);
  const pf = k.face(0, 0, 3.5, 0);
  for (let i = -2; i <= 2; i++) pf.window(i * 2.0, 0.3, 1.5, 0.95, { rect: true, glass: GLASS_D, frame: WHITE, bars: 1, sill: false });
  k.box(0xd8dfe3, 5.6, 0.16, 1.5, 0, 1.55, 3.9);
  for (const sx of [-1, 1]) k.cyl(0xaab4bb, 0.07, 0.07, 1.6, sx * 2.6, 0, 4.5, { seg: 5 });

  // curved sandstone block with the diagrid: a fan of facets around a centre behind the podium front
  const CX = -2.6, CZ = -1.0, RAD = 3.6, N = 7, A0 = -70, A1 = 72, HB = 12.6, Y0 = 1.62;
  const diag = diagridCanvas();
  const faces = [];
  for (let i = 0; i < N; i++) {
    const a = ((A0 + (i / (N - 1)) * (A1 - A0)) * Math.PI) / 180;
    const chord = 2 * RAD * Math.sin(((A1 - A0) / (N - 1) / 2) * Math.PI / 180) * 1.04;
    const px = CX + Math.sin(a) * (RAD - 0.8), pz = CZ + Math.cos(a) * (RAD - 0.8);
    k.box(SAND, chord, HB, 1.6, px, Y0, pz, { ry: a });
    k.box(WHITE, chord, 0.4, 1.7, CX + Math.sin(a) * (RAD - 0.75), Y0 + HB, CZ + Math.cos(a) * (RAD - 0.75), { ry: a });
    faces.push({ w: chord * 0.98, h: HB - 0.3, pos: [CX + Math.sin(a) * (RAD + 0.03), Y0 + HB / 2, CZ + Math.cos(a) * (RAD + 0.03)], ry: a });
  }
  k.planes_(diag, faces);
  // the white arched rim over the top: a ring of slim ribs
  for (let i = 0; i < N; i++) {
    const a = ((A0 + (i / (N - 1)) * (A1 - A0)) * Math.PI) / 180;
    k.box(WHITE, 0.14, 1.2, 0.14, CX + Math.sin(a) * (RAD + 0.05), Y0 + HB + 0.4, CZ + Math.cos(a) * (RAD + 0.05), { outline: false });
  }
  k.box(WHITE, 0.4, 0.14, 0.4, CX, Y0 + HB + 1.55, CZ + RAD, { outline: false });

  // the tall round glass tower
  const TX = 2.7, TZ = -0.6;
  k.cyl(GLASS, 1.95, 2.0, 15.0, TX, Y0, TZ, { seg: 14 });
  k.cyl(WHITE, 2.1, 2.1, 0.3, TX, Y0 + 15.0, TZ, { seg: 14 });
  k.cyl(WHITE, 1.2, 1.3, 0.6, TX, Y0 + 15.3, TZ, { seg: 12 });
  k.cyl(PAL.stoneDark, 0.05, 0.1, 1.8, TX, Y0 + 15.9, TZ, { seg: 5 });
  k.ball(PAL.red, 0.13, TX, Y0 + 17.8, TZ, { seg: 5, ring: 4 });
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; k.box(WHITE, 0.14, 15.0, 0.14, TX + Math.sin(a) * 2.0, Y0, TZ + Math.cos(a) * 2.0, { outline: false }); }
  // painted glass on the front-facing half of the cylinder: three facets
  const gc = glassCanvas();
  k.planes_(gc, [-1, 0, 1].map((i) => ({ w: 1.6, h: 14.4, pos: [TX + Math.sin(i * 0.62) * 2.02, Y0 + 7.4, TZ + Math.cos(i * 0.62) * 2.02], ry: i * 0.62 })));
  // second sandstone wing behind the tower
  k.box(SAND, 3.0, 9.5, 2.6, 5.4, Y0, -1.6);
  k.box(WHITE, 3.1, 0.3, 2.7, 5.4, Y0 + 9.5, -1.6);
  k.planes_(diag, [{ w: 2.8, h: 9.0, pos: [5.4, Y0 + 4.8, -0.28], ry: 0 }]);

  // podium sign (Telugu + English)
  const banner = paintBoard(4.6, 1.0, '#23324a', '#16223a', (ctx, W, H) => { teText(ctx, 'సైబర్ టవర్స్', W * 0.5, H * 0.52, H * 0.42, { color: '#ffe9a0' }); latin(ctx, 'CYBER TOWERS', W * 0.5, H * 0.9, H * 0.28, { color: '#cfe3ff' }); }, { seed: 4, px: 90 });
  k.box(PAL.ink, 4.8, 1.2, 0.2, -1.8, 1.7, 3.0);
  k.plane(banner, 4.6, 1.0, [-1.8, 1.8, 3.12], 0);

  // planters out front
  for (const sx of [-1, 1]) { k.box(PAL.stoneDark, 0.9, 0.5, 0.9, sx * 5.0, 0, 3.3); k.ball(PAL.leaf, 0.55, sx * 5.0, 0.95, 3.3, { seg: 7, ring: 5 }); }

  const g = k.finish({ lean: 0.005 });
  g.name = 'bse';
  g.userData = {
    footprint: 7,
    height: 19,
    colliders: [
      ...lineColliders(-4.2, 0, 4.2, 0, 3.0, 3, 3.0),
      { x: 0, z: 0, radius: 3.0, height: 16 },
    ],
  };
  void INK; void THREE;
  return g;
}
