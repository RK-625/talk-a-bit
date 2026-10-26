// IT park (OMR style): a tall glass-curtain-wall office tower with a lower wing, a lit lobby atrium, white fins and a
// rooftop "IT PARK" sign, inside a walled compound with a gate, a security booth and a boom barrier. Front (gate) = +Z.
// Tower ~24 tall, compound 22 x 20. (Replaces Antilia; same footprint, gate, booth, barrier and car line.)
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, lineColliders, mulberry32, paintBoard, latin, inkText, taText, bilingualBoard } from './kit.js';

const SLAB = 0xe7e0d2, WOOD = 0xcfa67a, GLASS = 0x86bccb, GLASS_D = 0x5f9db3, GRN = [0x7fc08a, 0x6bb27e, 0x98cf86, 0x5fa874];

function helipadCanvas() {
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
  const sg = bilingualBoard(2.4, 0.7, 'தகவல் தொழில்நுட்ப பூங்கா', 'IT PARK', { fill: '#2b3a55', hatch: '#1d2940', tc: '#f6d86a', ec: '#cfe3ff', taSize: 0.34, enSize: 0.24, px: 80, seed: 4 });
  k.plane(sg, 2.4, 0.7, [-5.3, 1.9, 10.1], 0);

  // ---- security booth + boom barrier (right of the drive)
  const bx = 6.4, bz = 8.4;
  k.box(0xe9e2cf, 2.0, 2.4, 1.8, bx, 0, bz);
  k.box(PAL.red, 2.3, 0.2, 2.1, bx, 2.4, bz);
  k.box(GLASS, 1.5, 0.9, 0.06, bx, 1.15, bz + 0.92, { outline: false });
  k.box(GLASS, 0.06, 0.9, 1.1, bx - 1.02, 1.15, bz, { outline: false });
  k.box(PAL.ink, 0.5, 1.5, 0.06, bx - 0.55, 0.0, bz + 0.92, { outline: false });
  k.box(0x6f6a82, 0.7, 0.18, 0.5, bx + 1.1, 1.2, bz + 1.05); // little desk shelf
  const sb = paintBoard(1.4, 0.4, '#e9625a', '#b84238', (ctx, W, H) => { taText(ctx, 'பாதுகாப்பு', W * 0.32, H * 0.72, H * 0.5, { color: '#fff4d2' }); latin(ctx, 'SECURITY', W * 0.72, H * 0.7, H * 0.4, { color: '#fff4d2' }); }, { seed: 6, px: 80 });
  k.plane(sb, 1.4, 0.4, [bx, 2.0, bz + 0.94], 0);
  // barrier post (the arm itself is a separate animated mesh)
  k.box(0xfaf6ea, 0.4, 1.0, 0.4, 1.7, 0, 8.9);
  k.box(PAL.red, 0.42, 0.18, 0.42, 1.7, 0.3, 8.9);

  // ---- the glass tower: podium + main shaft with a stepped crown, a lower wing, white fins, rooftop sign
  const GL = 0x7fb6c4, GL_D = 0x558fa5, FIN = 0xf2f0e8;
  const glassCanvas = (cols, rows, seed) => {
    const { c, ctx } = makeCanvas(256, 512);
    const g1 = ctx.createLinearGradient(0, 0, 256, 512); g1.addColorStop(0, '#8cc5d2'); g1.addColorStop(0.55, '#5f9db3'); g1.addColorStop(1, '#7fb6c4');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, 256, 512);
    ctx.strokeStyle = '#f2f0e8'; ctx.lineWidth = 3;
    for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo((i / cols) * 256, 0); ctx.lineTo((i / cols) * 256, 512); ctx.stroke(); }
    for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, (j / rows) * 512); ctx.lineTo(256, (j / rows) * 512); ctx.stroke(); }
    const rr = handRng(seed);
    ctx.globalAlpha = 0.5; ctx.fillStyle = '#fff6d8';
    for (let t = 0; t < 7; t++) { const cx = Math.floor(rr() * cols), cy = Math.floor(rr() * rows); ctx.fillRect((cx / cols) * 256 + 4, (cy / rows) * 512 + 4, 256 / cols - 8, 512 / rows - 8); }
    ctx.globalAlpha = 1; ctx.strokeStyle = '#2b2440'; ctx.lineWidth = 4; ctx.strokeRect(1, 1, 254, 510);
    return c;
  };
  const slabs = [];
  // podium: wide base with a lit lobby
  k.box(FIN, 9.2, 3.2, 7.4, -1.0, 0.1, -2.4);
  k.box(GL_D, 8.4, 1.5, 0.08, -1.0, 0.5, 1.32, { outline: false });
  k.box(0xffe9a8, 3.0, 2.0, 0.1, -1.0, 0.3, 1.34, { outline: false });          // lobby glow
  k.box(FIN, 4.6, 0.2, 1.6, -1.0, 2.5, 2.1);                                     // entrance canopy
  for (const sx of [-1, 1]) k.cyl(FIN, 0.1, 0.1, 2.4, -1.0 + sx * 2.2, 0.1, 2.7, { seg: 6 });
  // main shaft
  const SX = -1.0, SZ = -2.6, SW = 7.0, SD = 5.6, S0 = 3.3, S1 = 19.6;
  k.box(GL, SW, S1 - S0, SD, SX, S0, SZ);
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(FIN, 0.34, S1 - S0 + 0.1, 0.34, SX + dx * SW / 2, S0, SZ + dz * SD / 2);
  const shaftH = S1 - S0;
  k.planes_(glassCanvas(5, 14, 3), [
    { w: SW - 0.5, h: shaftH - 0.2, pos: [SX, S0 + shaftH / 2, SZ + SD / 2 + 0.03], ry: 0 },
    { w: SW - 0.5, h: shaftH - 0.2, pos: [SX, S0 + shaftH / 2, SZ - SD / 2 - 0.03], ry: Math.PI },
    { w: SD - 0.5, h: shaftH - 0.2, pos: [SX + SW / 2 + 0.03, S0 + shaftH / 2, SZ], ry: Math.PI / 2 },
    { w: SD - 0.5, h: shaftH - 0.2, pos: [SX - SW / 2 - 0.03, S0 + shaftH / 2, SZ], ry: -Math.PI / 2 },
  ]);
  for (const y of [7.5, 12.5, 17.0]) k.box(FIN, SW + 0.3, 0.22, SD + 0.3, SX, y, SZ);
  // stepped crown + mast
  k.box(FIN, SW + 0.5, 0.4, SD + 0.5, SX, S1, SZ);
  k.box(GL_D, SW - 1.4, 1.5, SD - 1.2, SX, S1 + 0.4, SZ);
  k.box(FIN, SW - 1.0, 0.3, SD - 0.8, SX, S1 + 1.9, SZ);
  k.box(0x9aa7b1, 1.8, 1.0, 1.6, SX + 1.2, S1 + 2.2, SZ - 0.4);
  k.cyl(0x9aa7b1, 0.06, 0.09, 3.2, SX - 1.8, S1 + 2.2, SZ, { seg: 5 });
  k.ball(PAL.red, 0.14, SX - 1.8, S1 + 5.5, SZ, { seg: 6, ring: 4 });
  // rooftop sign: lit "IT PARK" board with a Tamil line
  const roofSign = paintBoard(5.8, 1.5, '#243557', '#18233d', (ctx, W, H) => { latin(ctx, 'IT PARK', W / 2, H * 0.62, H * 0.62, { color: '#ffe9a8' }); taText(ctx, 'தகவல் தொழில்நுட்ப பூங்கா', W / 2, H * 0.92, H * 0.26, { color: '#cfe3ff' }); }, { seed: 12, px: 80 });
  k.box(0x243557, 6.0, 1.7, 0.2, SX, S1 + 2.2, SZ + SD / 2 - 0.3);
  k.plane(roofSign, 5.8, 1.5, [SX, S1 + 3.05, SZ + SD / 2 - 0.15], 0);
  // lower wing at the back right
  const WX = 4.6, WZ = -4.6;
  k.box(GL_D, 4.6, 11.0, 4.4, WX, 0.1, WZ);
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(FIN, 0.28, 11.1, 0.28, WX + dx * 2.3, 0.1, WZ + dz * 2.2);
  k.planes_(glassCanvas(4, 9, 8), [
    { w: 4.0, h: 10.6, pos: [WX, 5.4, WZ + 2.23], ry: 0 }, { w: 4.0, h: 10.6, pos: [WX, 5.4, WZ - 2.23], ry: Math.PI },
    { w: 3.8, h: 10.6, pos: [WX + 2.33, 5.4, WZ], ry: Math.PI / 2 }, { w: 3.8, h: 10.6, pos: [WX - 2.33, 5.4, WZ], ry: -Math.PI / 2 },
  ]);
  k.box(FIN, 5.0, 0.3, 4.8, WX, 11.1, WZ);
  const top = S1, totalTop = S1 + 5.8;
  slabs.push({});

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
    { x: -1.2, z: -2.2, radius: 3.6, height: totalTop }, { x: 0.3, z: -2.4, radius: 3.4, height: totalTop }, { x: -3.0, z: -2.6, radius: 3.0, height: 5 }, { x: 4.6, z: -4.6, radius: 2.9, height: 11 },
    { x: bx, z: bz, radius: 1.3, height: 2.6 }, { x: 1.7, z: 8.9, radius: 0.3, height: 1 },
    ...[-1, 1].map((sx) => ({ x: sx * 3.6, z: 9.6, radius: 0.5, height: 3 })),
    ...lineColliders(-10.4, -9.6, 10.4, -9.6, 0.5, 1.7, 1.0), ...lineColliders(-10.4, -9.6, -10.4, 9.6, 0.5, 1.7, 1.0),
    ...lineColliders(10.4, -9.6, 10.4, 9.6, 0.5, 1.7, 1.0), ...lineColliders(-10.4, 9.6, -4.1, 9.6, 0.5, 1.7, 1.0), ...lineColliders(4.1, 9.6, 10.4, 9.6, 0.5, 1.7, 1.0),
  ];
  g.userData = { ...g.userData, footprint: 15, height: totalTop, size: [21, 19.2, totalTop], gate: [0, 9.6], colliders: cols };
  return g;
}
