// Tech-park tower (replaces Antilia; layout id 'antilia'): glass-and-ribbon curtain-wall tower on an atrium podium, logo-less TECH PARK sign,
// inside a walled compound with a gate, a security booth and a boom barrier. Front (gate) = +Z.
// Tower ~25.5 tall (about 1.6x the BSE tower in this miniature), compound 22 x 20.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, lineColliders, mulberry32, paintBoard, latin, inkText, knText, bilingualBoard } from './kit.js';

const GLASS = 0x86bccb, GLASS_D = 0x5f9db3, GRN = [0x7fc08a, 0x6bb27e, 0x98cf86, 0x5fa874];
const inside = null;

let _ribbon = null;
function ribbonCanvas() {
  if (_ribbon) return _ribbon;
  const W = 400, H = 640, { c, ctx } = makeCanvas(W, H), r = handRng(9);
  const rows = 17, ph = H / rows;
  for (let j = 0; j < rows; j++) {
    ctx.fillStyle = ['#5f9db3', '#6aa8bc', '#5791a8'][j % 3]; ctx.fillRect(0, j * ph + ph * 0.18, W, ph * 0.64);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; for (let i = 0; i < 4; i++) ctx.fillRect(r() * W, j * ph + ph * 0.22, 30 + r() * 50, ph * 0.5);
    if (r() > 0.82) { ctx.fillStyle = '#f4dc9a'; ctx.fillRect(r() * (W - 60), j * ph + ph * 0.18, 56, ph * 0.64); }
    ctx.strokeStyle = 'rgba(43,36,64,0.65)'; ctx.lineWidth = 2.4;
    ctx.strokeRect(1.5, j * ph + ph * 0.18, W - 3, ph * 0.64);
  }
  ctx.strokeStyle = 'rgba(43,36,64,0.5)'; ctx.lineWidth = 2;
  for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo((i * W) / 8, 0); ctx.lineTo((i * W) / 8, H); ctx.stroke(); }
  return (_ribbon = c);
}

function _unusedHeli() {
  const { c, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = '#6f6a82'; ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#fbe9a0'; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.arc(128, 128, 108, 0, 6.283); ctx.stroke();
  ctx.lineWidth = 16; ctx.lineCap = 'butt';
  ctx.beginPath(); ctx.moveTo(86, 76); ctx.lineTo(86, 180); ctx.moveTo(170, 76); ctx.lineTo(170, 180); ctx.moveTo(86, 128); ctx.lineTo(170, 128); ctx.stroke();
  return c;
}

export function createAntilia(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 501 });
  const r = mulberry32(777);
  k.base(22, 20, { color: PAL.stone, top: 0.08 });

  // ---- compound: lawn, paving, wall with gate
  k.box(0xbfdc9f, 21, 0.14, 19, 0, 0, 0, { outline: false });
  k.box(0xd9d2c4, 5, 0.16, 10, 3.5, 0, 5.5, { outline: false }); // driveway
  const WALLH = 1.7, cw = 0xefe6d2;
  const sideWall = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0);
    k.box(cw, 0.4, WALLH, len, (x0 + x1) / 2, 0, (z0 + z1) / 2, { ry: a - Math.PI / 2 + Math.PI / 2 });
  };
  // boxes: w along local x; build walls explicitly
  k.box(cw, 21, WALLH, 0.4, 0, 0, -9.6);
  k.box(cw, 0.4, WALLH, 19.2, -10.4, 0, 0);
  k.box(cw, 0.4, WALLH, 19.2, 10.4, 0, 0);
  k.box(cw, 7.0, WALLH, 0.4, -7.0, 0, 9.6);
  k.box(cw, 7.0, WALLH, 0.4, 7.0, 0, 9.6);
  for (let i = -9; i <= 9; i += 2) { k.ball(PAL.leaf, 0.26, i * 1.0 + 0.0, WALLH + 0.05, -9.6, { seg: 6, ring: 4, sy: 0.7, outline: false }); }
  // gate pillars + open iron gate leaves + lamps
  for (const sx of [-1, 1]) {
    k.box(PAL.peachWall, 0.9, 2.6, 0.9, sx * 3.6, 0, 9.6);
    k.box(PAL.stoneDark, 1.1, 0.25, 1.1, sx * 3.6, 2.6, 9.6);
    k.ball(0xfff1b8, 0.28, sx * 3.6, 3.1, 9.6, { seg: 8, ring: 6 });
    for (let i = 0; i < 5; i++) k.box(PAL.ink, 0.07, 1.9, 0.07, sx * (3.0 - i * 0.0) + 0.0, 0.1, 9.6 - 0.45 - i * 0.4 - 0.0, { outline: false });
    k.box(PAL.ink, 0.07, 0.08, 1.9, sx * 3.0, 1.9, 8.65, { outline: false });
    k.box(PAL.ink, 0.07, 0.08, 1.9, sx * 3.0, 0.5, 8.65, { outline: false });
  }
  const sg = bilingualBoard(2.2, 0.8, 'ಟೆಕ್ ಪಾರ್ಕ್', 'TECH PARK', { fill: '#1f4a5e', hatch: '#143645', kc: '#ffe9a0', ec: '#d8f0ff', knSize: 0.42, enSize: 0.2, seed: 4 });
  k.plane(sg, 2.2, 0.8, [-3.6, 1.45, 10.1], 0);

  // ---- security booth + boom barrier (right of the drive)
  const bx = 6.4, bz = 8.4;
  k.box(0xe9e2cf, 2.0, 2.4, 1.8, bx, 0, bz);
  k.box(PAL.red, 2.3, 0.2, 2.1, bx, 2.4, bz);
  k.box(GLASS, 1.5, 0.9, 0.06, bx, 1.15, bz + 0.92, { outline: false });
  k.box(GLASS, 0.06, 0.9, 1.1, bx - 1.02, 1.15, bz, { outline: false });
  k.box(PAL.ink, 0.5, 1.5, 0.06, bx - 0.55, 0.0, bz + 0.92, { outline: false });
  k.box(0x6f6a82, 0.7, 0.18, 0.5, bx + 1.1, 1.2, bz + 1.05); // little desk shelf
  const sb = paintBoard(1.4, 0.4, '#e9625a', '#b84238', (ctx, W, H) => { knText(ctx, 'ಭದ್ರತೆ', W * 0.3, H * 0.74, H * 0.58, { color: '#fff4d2' }); latin(ctx, 'SECURITY', W * 0.72, H * 0.7, H * 0.4, { color: '#fff4d2' }); }, { seed: 6, px: 80 });
  k.plane(sb, 1.4, 0.4, [bx, 2.0, bz + 0.94], 0);
  // barrier post (the arm itself is a separate animated mesh)
  k.box(0xfaf6ea, 0.4, 1.0, 0.4, 1.7, 0, 8.9);
  k.box(PAL.red, 0.42, 0.18, 0.42, 1.7, 0.3, 8.9);

  // ---- tech-park tower: a long glass block + a taller offset block, ribbon-glass curtain wall, white fins, atrium podium
  const BX = -1.4, BZ = -2.6;
  k.box(0xdfe6ea, 10.6, 3.2, 7.4, BX, 0.1, BZ);                       // podium / atrium
  k.box(GLASS_D, 9.6, 1.6, 0.07, BX, 0.7, BZ + 3.72, { outline: false }); // atrium glass
  for (let i = -3; i <= 3; i++) k.box(0xf4f6f6, 0.1, 1.9, 0.12, BX + i * 1.4, 0.6, BZ + 3.74, { outline: false });
  k.box(0xc9d3d8, 11.0, 0.3, 7.8, BX, 3.3, BZ);
  const T1 = 17.4, T2 = 21.6;
  k.box(0xcfe0e6, 9.0, T1 - 3.6, 6.4, BX - 0.4, 3.6, BZ - 0.4);        // main block
  k.box(0xdbe8ec, 5.6, T2 - T1, 5.4, BX + 1.6, T1, BZ - 0.9);          // upper offset block
  for (const [x, z] of [[-4.9, -3.6], [4.1, -3.6], [-4.9, 2.4], [4.1, 2.4]]) k.box(0xf4f6f6, 0.35, T1 - 3.6, 0.35, BX + x + 0.4, 3.6, BZ + z - 0.4);
  k.box(0xf4f6f6, 9.4, 0.35, 6.8, BX - 0.4, T1, BZ - 0.4);
  k.box(0xf4f6f6, 6.0, 0.3, 5.8, BX + 1.6, T2, BZ - 0.9);
  // ribbon glass: painted canvas on every side of both blocks
  const cw_ = ribbonCanvas();
  k.planes_(cw_, [
    { w: 8.6, h: T1 - 4.1, pos: [BX - 0.4, 3.6 + (T1 - 3.6) / 2, BZ - 0.4 + 3.22], ry: 0 },
    { w: 8.6, h: T1 - 4.1, pos: [BX - 0.4, 3.6 + (T1 - 3.6) / 2, BZ - 0.4 - 3.22], ry: Math.PI },
    { w: 6.0, h: T1 - 4.1, pos: [BX - 0.4 + 4.52, 3.6 + (T1 - 3.6) / 2, BZ - 0.4], ry: Math.PI / 2 },
    { w: 6.0, h: T1 - 4.1, pos: [BX - 0.4 - 4.52, 3.6 + (T1 - 3.6) / 2, BZ - 0.4], ry: -Math.PI / 2 },
    { w: 5.2, h: T2 - T1 - 0.5, pos: [BX + 1.6, T1 + (T2 - T1) / 2, BZ - 0.9 + 2.72], ry: 0 },
    { w: 5.2, h: T2 - T1 - 0.5, pos: [BX + 1.6, T1 + (T2 - T1) / 2, BZ - 0.9 - 2.72], ry: Math.PI },
    { w: 5.0, h: T2 - T1 - 0.5, pos: [BX + 1.6 + 2.82, T1 + (T2 - T1) / 2, BZ - 0.9], ry: Math.PI / 2 },
    { w: 5.0, h: T2 - T1 - 0.5, pos: [BX + 1.6 - 2.82, T1 + (T2 - T1) / 2, BZ - 0.9], ry: -Math.PI / 2 },
  ]);
  // roof plant + dish + antenna
  k.box(0x9aa7b1, 2.2, 0.9, 1.6, BX + 2.4, T2 + 0.3, BZ - 1.2);
  k.cyl(0x9aa7b1, 0.07, 0.1, 3.0, BX + 0.6, T2 + 0.3, BZ - 0.6, { seg: 5 });
  k.ball(PAL.red, 0.14, BX + 0.6, T2 + 3.4, BZ - 0.6, { seg: 6, ring: 4 });
  const totalTop = T2 + 3.5;
  // "TECH PARK" sign (logo-less) on the podium + a roof band on the main block
  const tp = bilingualBoard(6.4, 1.3, 'ಟೆಕ್ ಪಾರ್ಕ್', 'TECH PARK', { fill: '#1f4a5e', hatch: '#143645', kc: '#ffe9a0', ec: '#d8f0ff', knSize: 0.5, enSize: 0.22, seed: 5 });
  k.plane(tp, 6.4, 1.3, [BX, 4.4, BZ + 3.68], 0);
  k.box(PAL.ink, 6.5, 1.35, 0.12, BX, 3.75, BZ + 3.55);
  // bike / cab shelter at the gate side and a planter-lined walkway
  for (let i = 0; i < 4; i++) k.ball(PAL.leaf, 0.5, -3.6 + i * 2.1, 0.45, 3.2, { seg: 7, ring: 5, sy: 0.8 });
  const slabs = [];
  void slabs; void inside;

  // lawn trees and shrubs in the compound
  for (const [x, z, s] of [[-7.6, 5, 1.0], [-8.2, -2, 1.2], [8.4, -2, 1.1], [8.0, -7, 1.0], [-6, -8, 0.9], [-3.5, 6.6, 0.8], [8.2, 3, 0.8]]) {
    k.cyl(PAL.woodDark, 0.18 * s, 0.26 * s, 1.8 * s, x, 0, z, { seg: 6 });
    k.ball(GRN[Math.floor(r() * 4)], 1.3 * s, x, 1.9 * s, z, { seg: 8, ring: 6 });
  }
  for (let i = 0; i < 9; i++) k.ball(GRN[i % 4], 0.45, -9 + i * 2.2, 0.28, 8.7, { seg: 6, ring: 4, sy: 0.7, outline: false }); // front hedge

  const g = k.finish({ lean: 0.004 });
  // boom barrier arm (animated)
  const arm = new THREE.Group();
  arm.position.set(1.7, 0.85, 8.9);
  const ak = new Kit(ink, { hatch: 0.06, thickness: 1.6, seed: 7 });
  for (let i = 0; i < 6; i++) ak.box(i % 2 ? PAL.red : 0xfaf6ea, 0.8, 0.14, 0.12, 0.2 + i * 0.8, 0, 0);
  const am = ak.finish({ lean: 0 });
  arm.add(am);
  g.add(arm);
  let t = 0;
  g.userData.animate = (dt) => { t += dt; const open = (t % 14) > 11 ? 1.1 : 0.0; arm.rotation.z += (open - arm.rotation.z) * (1 - Math.exp(-3 * dt)); };
  g.name = 'antilia';
  const cols = [
    { x: -1.8, z: -3.0, radius: 3.4, height: totalTop }, { x: 0.8, z: -3.0, radius: 3.0, height: totalTop }, { x: -4.2, z: -3.0, radius: 2.8, height: totalTop }, { x: -1.4, z: -2.6, radius: 3.8, height: 4 },
    { x: bx, z: bz, radius: 1.3, height: 2.6 }, { x: 1.7, z: 8.9, radius: 0.3, height: 1 },
    ...[-1, 1].map((sx) => ({ x: sx * 3.6, z: 9.6, radius: 0.5, height: 3 })),
    ...lineColliders(-10.4, -9.6, 10.4, -9.6, 0.5, 1.7, 1.0), ...lineColliders(-10.4, -9.6, -10.4, 9.6, 0.5, 1.7, 1.0),
    ...lineColliders(10.4, -9.6, 10.4, 9.6, 0.5, 1.7, 1.0), ...lineColliders(-10.4, 9.6, -4.1, 9.6, 0.5, 1.7, 1.0), ...lineColliders(4.1, 9.6, 10.4, 9.6, 0.5, 1.7, 1.0),
  ];
  g.userData = { ...g.userData, footprint: 15, height: totalTop, size: [21, 19.2, totalTop], gate: [0, 9.6], colliders: cols };
  return g;
}
