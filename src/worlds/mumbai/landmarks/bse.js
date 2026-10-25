// BSE / Phiroze Jeejeebhoy Towers: tall slab with a stepped crown, sign banner, podium and the golden bull.
// Local frame: front +Z. Podium 11 x 7 x 2.4, tower 5.4 x 4.2 up to ~16.4.
import { Kit, PAL, makeCanvas, handRng, INK, paintBoard, latin, inkText, wobblyLine, lineColliders } from './kit.js';

const TW = 5.4, TD = 4.2, T0 = 2.4, T1 = 10.0;
const SLAB = 0xc9d8e8, FIN = 0xeef0f4;

function windowsCanvas() {
  const W = 360, H = 640;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(5);
  const cols = 6, rows = 17;
  const pitchX = W / cols, pitchY = H / rows;
  const warm = ['#4d6c8c', '#456485', '#5b7b97', '#f1d58a', '#4d6c8c', '#3e5b7c'];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const w = pitchX * 0.58 * (0.94 + r() * 0.1), h = pitchY * 0.62;
      const x = i * pitchX + (pitchX - w) / 2 + (r() - 0.5) * 3, y = j * pitchY + (pitchY - h) / 2 + (r() - 0.5) * 2;
      ctx.fillStyle = r() > 0.93 ? '#f4d98f' : warm[Math.floor(r() * 3)];
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
      ctx.strokeRect(x + (r() - 0.5), y + (r() - 0.5), w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x + 2, y + 2, w * 0.3, h - 4);
    }
    // thin floor slab line, hand drawn
    wobblyLine(ctx, [[0, (j + 1) * pitchY - 1], [W, (j + 1) * pitchY - 1 + (r() - 0.5) * 2]], { r, amp: 1.2, lw: 2, color: 'rgba(43,36,64,0.55)' });
  }
  return c;
}

export function createBSE(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 41 });
  k.base(12, 8, { color: PAL.stone });

  // podium
  k.box(PAL.offwhite, 11, 2.4, 7, 0, 0, 0);
  k.box(PAL.stoneDark, 11.3, 0.3, 7.3, 0, 2.4, 0);
  const pf = k.face(0, 0, 3.5, 0);
  for (let i = -2; i <= 2; i++) pf.window(i * 2.0, 0.55, 1.0, 1.5, { glass: PAL.glassDark, frame: PAL.cream, pointed: false });
  pf.box(PAL.stoneDark, 0, 0, 3.2, 0.12, 0.7, 0.0); // entrance step
  // main slab
  k.box(SLAB, TW, T1 - T0, TD, 0, T0, 0);
  // corner fins + mid piers
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(FIN, 0.5, T1 - T0 + 0.2, 0.5, sx * (TW / 2), T0, sz * (TD / 2));
  for (const u of [-1.35, 1.35]) { k.box(FIN, 0.14, T1 - T0, 0.14, u, T0, TD / 2 + 0.03); k.box(FIN, 0.14, T1 - T0, 0.14, u, T0, -TD / 2 - 0.03); }
  // floor bands
  for (const y of [5.0, 7.6]) k.box(FIN, TW + 0.2, 0.18, TD + 0.2, 0, y, 0);
  // stepped crown
  k.box(FIN, TW + 0.5, 0.4, TD + 0.5, 0, T1, 0);
  const tiers = [[4.7, 3.7, 1.1], [3.7, 3.0, 1.1], [2.7, 2.2, 1.0], [1.7, 1.4, 0.8]];
  let y = T1 + 0.4;
  tiers.forEach(([w, d, h], i) => {
    k.box(i % 2 ? FIN : SLAB, w, h, d, 0, y, 0);
    k.box(PAL.glassDark, w * 0.5, h * 0.35, d + 0.06, 0, y + h * 0.35, 0, { outline: false });
    k.box(PAL.glassDark, w + 0.06, h * 0.35, d * 0.5, 0, y + h * 0.35, 0, { outline: false });
    y += h;
  });
  k.cyl(PAL.stoneDark, 0.05, 0.12, 1.7, 0, y, 0, { seg: 5 });
  k.ball(PAL.red, 0.12, 0, y + 1.7, 0, { seg: 5, ring: 4 });

  // painted windows on all four sides (one draw call)
  const wc = windowsCanvas();
  const H = T1 - T0 - 0.6;
  const cy = T0 + (T1 - T0) / 2;
  k.planes_(wc, [
    { w: TW - 0.7, h: H, pos: [0, cy, TD / 2 + 0.02], ry: 0 },
    { w: TW - 0.7, h: H, pos: [0, cy, -TD / 2 - 0.02], ry: Math.PI },
    { w: TD - 0.7, h: H, pos: [TW / 2 + 0.02, cy, 0], ry: Math.PI / 2 },
    { w: TD - 0.7, h: H, pos: [-TW / 2 - 0.02, cy, 0], ry: -Math.PI / 2 },
  ]);

  // BSE sign banner above the podium entrance, and a big roof-top sign
  const banner = paintBoard(5.2, 1.5, '#27406b', '#1b2c4d', (ctx, W, Hh, r) => {
    latin(ctx, 'BSE', W * 0.38, Hh * 0.7, Hh * 0.62, { color: '#fff4d2' });
    inkText(ctx, 'बीएसई', W * 0.8, Hh * 0.52, Hh * 0.34, { color: '#ffd778', devanagari: true });
    latin(ctx, 'BOMBAY STOCK EXCHANGE', W * 0.5, Hh * 0.92, Hh * 0.15, { color: '#cfe3ff' });
  }, { seed: 4 });
  k.box(PAL.ink, 5.5, 1.7, 0.2, 0, 2.9 - 0.1, 3.0 + 0.1 - 0.1);
  k.plane(banner, 5.3, 1.54, [0, 3.0, 3.12], 0);
  // crown sign "BSE" on the front of the first crown tier
  const crown = paintBoard(3.4, 0.8, '#27406b', '#1b2c4d', (ctx, W, Hh) => latin(ctx, 'BSE', W / 2, Hh * 0.8, Hh * 0.8, { color: '#fff4d2' }), { seed: 6, px: 80 });
  k.plane(crown, 3.4, 0.8, [0, T1 + 0.9, 1.9], 0);

  // golden bull at the podium front
  const bx = 3.6, bz = 5.2, bc = PAL.gold;
  k.box(PAL.stoneDark, 2.2, 0.5, 1.3, bx, 0, bz);
  k.box(bc, 1.3, 0.62, 0.62, bx, 0.62, bz);
  k.ball(bc, 0.42, bx + 0.5, 1.04, bz, { sx: 1, sy: 1, sz: 0.95, seg: 8, ring: 6 });
  k.ball(bc, 0.3, bx - 0.55, 0.98, bz, { seg: 7, ring: 5 });
  k.box(bc, 0.5, 0.36, 0.36, bx - 0.95, 0.9, bz, { rz: -0.2 }); // head
  k.box(PAL.cream, 0.08, 0.3, 0.08, bx - 1.0, 1.15, bz - 0.2, { rz: 0.5 });
  k.box(PAL.cream, 0.08, 0.3, 0.08, bx - 1.0, 1.15, bz + 0.2, { rz: 0.5 });
  for (const sx of [-0.4, 0.4]) for (const sz of [-0.2, 0.2]) k.box(bc, 0.16, 0.45, 0.16, bx + sx, 0.5, bz + sz);

  const g = k.finish({ lean: 0.006 });
  g.name = 'bse';
  g.userData = {
    footprint: 7,
    height: 16.2,
    colliders: [
      ...lineColliders(-4.2, 0, 4.2, 0, 3.0, 3, 3.0),
      { x: 0, z: 0, radius: 3.0, height: 16 },
      { x: bx, z: bz, radius: 1.0, height: 1.4 },
    ],
  };
  return g;
}
