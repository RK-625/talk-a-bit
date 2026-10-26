// UB City (replaces BSE; layout id 'bse'): a glass curtain-wall tower with a faceted crown, on a retail podium with a glass front.
// The seated black Nandi is the 'bull' site detail (props/siteDetails.js createBullStatue) standing at this landmark's 'bull' anchor.
// Local frame: front +Z. Podium 11 x 7 x 2.6, tower 5.4 x 4.2 up to ~17.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, paintBoard, latin, knText, paintLive, bilingualBoard, lineColliders } from './kit.js';

const TW = 5.4, TD = 4.2, T0 = 2.6, T1 = 10.6;
const GLASS = 0x7fa6bd, FIN = 0xe9edf0, FRAME = 0xdfe6ea;

let _glassCanvas = null;
function glassCanvas() {
  if (_glassCanvas) return _glassCanvas;
  const W = 360, H = 680;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(5);
  const cols = 6, rows = 20, pw = W / cols, ph = H / rows;
  const tints = ['#6f9ab4', '#7aa6bd', '#6893ae', '#85b0c4', '#74a0b8'];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    ctx.fillStyle = r() > 0.94 ? '#f4dc9a' : tints[Math.floor(r() * tints.length)];
    ctx.fillRect(i * pw + 1, j * ph + 1, pw - 2, ph - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; // sky glints running diagonally
    if ((i + j) % 4 === 0) ctx.fillRect(i * pw + 3, j * ph + 3, pw * 0.4, ph - 6);
  }
  ctx.strokeStyle = 'rgba(43,36,64,0.7)'; ctx.lineWidth = 2.2;
  for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(i * pw + (r() - 0.5), 0); ctx.lineTo(i * pw + (r() - 0.5), H); ctx.stroke(); }
  for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * ph); ctx.lineTo(W, j * ph + (r() - 0.5) * 2); ctx.stroke(); }
  return (_glassCanvas = c);
}

export function createBSE(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 41 });
  k.base(12, 8, { color: PAL.stone });

  // podium: glass-fronted retail with a canopy
  k.box(FIN, 11, 2.6, 7, 0, 0, 0);
  k.box(PAL.stoneDark, 11.3, 0.3, 7.3, 0, 2.6, 0);
  const pf = k.face(0, 0, 3.5, 0);
  for (let i = -2; i <= 2; i++) pf.window(i * 2.0, 0.45, 1.5, 1.8, { rect: true, glass: 0x7fb3c8, frame: FRAME, bars: 1, sill: false });
  pf.box(PAL.stoneDark, 0, 0, 3.2, 0.12, 0.7, 0.0);
  k.box(0xd8dfe3, 6.2, 0.16, 1.6, 0, 2.55, 3.9);     // entrance canopy
  for (const sx of [-1, 1]) k.cyl(0xaab4bb, 0.07, 0.07, 2.55, sx * 2.9, 0, 4.5, { seg: 5 });
  // main glass slab
  k.box(GLASS, TW, T1 - T0, TD, 0, T0, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(FIN, 0.4, T1 - T0 + 0.2, 0.4, sx * (TW / 2), T0, sz * (TD / 2));
  for (const y of [5.4, 8.0]) k.box(FIN, TW + 0.16, 0.16, TD + 0.16, 0, y, 0);
  // crown: stepped tiers, then a faceted glass pyramid with a beacon
  k.box(FIN, TW + 0.5, 0.4, TD + 0.5, 0, T1, 0);
  const tiers = [[4.6, 3.6, 1.0], [3.6, 2.8, 1.0], [2.6, 2.0, 0.9]];
  let y = T1 + 0.4;
  tiers.forEach(([w, d, h], i) => {
    k.box(i % 2 ? FIN : GLASS, w, h, d, 0, y, 0);
    k.box(PAL.glassDark, w * 0.55, h * 0.4, d + 0.06, 0, y + h * 0.3, 0, { outline: false });
    y += h;
  });
  k.add(new THREE.ConeGeometry(1, 1.7, 4, 1).rotateY(Math.PI / 4).scale(1.0, 1, 0.8), 0xcfe4ee, { pos: [0, y + 0.85, 0] });
  k.cyl(PAL.stoneDark, 0.04, 0.1, 1.6, 0, y + 1.6, 0, { seg: 5 });
  k.ball(PAL.red, 0.13, 0, y + 3.2, 0, { seg: 5, ring: 4 });

  // painted curtain wall on all four sides (one draw call)
  const wc = glassCanvas();
  const H = T1 - T0 - 0.5, cy = T0 + (T1 - T0) / 2;
  k.planes_(wc, [
    { w: TW - 0.6, h: H, pos: [0, cy, TD / 2 + 0.02], ry: 0 },
    { w: TW - 0.6, h: H, pos: [0, cy, -TD / 2 - 0.02], ry: Math.PI },
    { w: TD - 0.6, h: H, pos: [TW / 2 + 0.02, cy, 0], ry: Math.PI / 2 },
    { w: TD - 0.6, h: H, pos: [-TW / 2 - 0.02, cy, 0], ry: -Math.PI / 2 },
  ]);

  // podium sign (Kannada + English) and a crown sign
  const banner = bilingualBoard(5.0, 1.2, 'ಯುಬಿ ಸಿಟಿ', 'UB CITY', { fill: '#23324a', hatch: '#16223a', kc: '#ffe9a0', ec: '#cfe3ff', knSize: 0.52, enSize: 0.2, seed: 4 });
  k.box(PAL.ink, 5.2, 1.4, 0.2, 0, 3.0 - 0.1, 3.0);
  k.plane(banner, 5.0, 1.2, [0, 3.1, 3.12], 0);
  const crown = paintBoard(3.0, 0.7, '#23324a', '#16223a', (ctx, W, Hh) => latin(ctx, 'UB CITY', W / 2, Hh * 0.78, Hh * 0.72, { color: '#ffe9a0' }), { seed: 6, px: 80 });
  k.plane(crown, 3.0, 0.7, [0, T1 + 0.9, 1.85], 0);

  // office lanyard-friendly planters out front
  for (const sx of [-1, 1]) { k.box(PAL.stoneDark, 0.9, 0.5, 0.9, sx * 5.0, 0, 3.3); k.ball(PAL.leaf, 0.55, sx * 5.0, 0.95, 3.3, { seg: 7, ring: 5 }); }

  const g = k.finish({ lean: 0.006 });
  g.name = 'bse';
  g.userData = {
    footprint: 7,
    height: 17,
    colliders: [
      ...lineColliders(-4.2, 0, 4.2, 0, 3.0, 3, 3.0),
      { x: 0, z: 0, radius: 3.0, height: 16 },
    ],
  };
  void INK; void knText; void paintLive;
  return g;
}
