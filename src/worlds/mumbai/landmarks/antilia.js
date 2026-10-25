// Antilia: the tall, irregular, cantilevered stacked-slab tower with hanging garden terraces, glass bands and a helipad,
// inside a walled compound with a gate, a security booth and a boom barrier. Front (gate) = +Z.
// Tower ~25.5 tall (about 1.6x the BSE tower in this miniature), compound 22 x 20.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, lineColliders, mulberry32, paintBoard, latin, inkText } from './kit.js';

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
  const sg = paintBoard(1.6, 0.5, '#2b2440', '#1b1730', (ctx, W, H) => { latin(ctx, 'ANTILIA', W / 2, H * 0.72, H * 0.55, { color: '#f6d86a' }); }, { seed: 4, px: 90 });
  k.plane(sg, 1.6, 0.5, [-3.6, 1.7, 10.1], 0);

  // ---- security booth + boom barrier (right of the drive)
  const bx = 6.4, bz = 8.4;
  k.box(0xe9e2cf, 2.0, 2.4, 1.8, bx, 0, bz);
  k.box(PAL.red, 2.3, 0.2, 2.1, bx, 2.4, bz);
  k.box(GLASS, 1.5, 0.9, 0.06, bx, 1.15, bz + 0.92, { outline: false });
  k.box(GLASS, 0.06, 0.9, 1.1, bx - 1.02, 1.15, bz, { outline: false });
  k.box(PAL.ink, 0.5, 1.5, 0.06, bx - 0.55, 0.0, bz + 0.92, { outline: false });
  k.box(0x6f6a82, 0.7, 0.18, 0.5, bx + 1.1, 1.2, bz + 1.05); // little desk shelf
  const sb = paintBoard(1.4, 0.4, '#e9625a', '#b84238', (ctx, W, H) => { inkText(ctx, 'सुरक्षा', W * 0.32, H * 0.75, H * 0.62, { devanagari: true, color: '#fff4d2' }); latin(ctx, 'SECURITY', W * 0.72, H * 0.7, H * 0.4, { color: '#fff4d2' }); }, { seed: 6, px: 80 });
  k.plane(sb, 1.4, 0.4, [bx, 2.0, bz + 0.94], 0);
  // barrier post (the arm itself is a separate animated mesh)
  k.box(0xfaf6ea, 0.4, 1.0, 0.4, 1.7, 0, 8.9);
  k.box(PAL.red, 0.42, 0.18, 0.42, 1.7, 0.3, 8.9);

  // ---- tower: stacked, offset, cantilevered slabs
  const floors = 14, FH = 1.62, GAP = 0.3, pad = 0.9;
  const slabs = [];
  let y = 0.6;
  // podium: a wide garage-and-lobby base
  k.box(SLAB, 8.4, 3.0, 7.0, -1.5, 0.1, -2.6);
  k.box(GLASS_D, 7.4, 1.2, 0.06, -1.5, 0.7, 0.93, { outline: false });
  slabs.push({ x: -1.5, z: -2.6, w: 8.4, d: 7.0, y0: 0.1, y1: 3.1 });
  y = 3.1;
  const off = [[0.6, -0.6, 6.6, 6.2], [-0.4, -1.3, 6.0, 6.6], [1.3, -0.4, 5.8, 5.4], [-1.0, -1.7, 6.8, 6.0], [0.2, -0.2, 5.4, 6.4],
    [1.6, -1.2, 6.0, 5.6], [-0.9, -0.8, 6.6, 6.4], [0.6, -1.9, 5.6, 5.8], [-1.3, -0.3, 6.2, 5.6], [0.9, -1.0, 6.0, 6.2], [-0.2, -1.6, 5.2, 5.4], [1.0, -0.6, 4.4, 5.0]];
  off.forEach(([ox0, oz0, w, d], i) => {
    const ox = ox0 * 1.9, oz = oz0 * 1.5;
    const fh = FH + (i % 3 === 0 ? 0.35 : 0);
    const col = i % 2 ? SLAB : 0xf0ead9;
    k.box(col, w, fh - GAP, d, ox, y + GAP, oz - 0.5);
    // exposed slab edge (the "floor plate") and a warm wood fascia on every third
    k.box(i % 3 === 1 ? WOOD : 0xd5ccba, w + 0.5, 0.26, d + 0.5, ox, y, oz - 0.5);
    slabs.push({ x: ox, z: oz - 0.5, w: w + 0.5, d: d + 0.5, y0: y, y1: y + fh });
    // glass bands on front + back + sides
    const gy = y + GAP + 0.18, gh = fh - GAP - 0.5;
    k.box(GLASS, w - 0.5, gh, 0.07, ox, gy, oz - 0.5 + d / 2 + 0.03, { outline: false });
    k.box(GLASS_D, w - 0.5, gh, 0.07, ox, gy, oz - 0.5 - d / 2 - 0.03, { outline: false });
    for (const sx of [-1, 1]) k.box(GLASS, 0.07, gh, d - 0.5, ox + sx * (w / 2 + 0.03), gy, oz - 0.5, { outline: false });
    // mullions
    for (let m = -2; m <= 2; m++) k.box(PAL.cream, 0.08, gh, 0.1, ox + m * (w / 5.4), gy, oz - 0.5 + d / 2 + 0.06, { outline: false });
    y += fh;
  });
  const top = y;
  // top: a crown slab, helipad platform, mast
  k.box(SLAB, 5.0, 0.35, 5.2, 0.7, top, -1.5);
  k.box(0xd5ccba, 3.2, 0.5, 3.2, 3.2, top - 0.1, -1.0);            // cantilevered helipad
  for (const sx of [-0.8, 0.8]) for (const sz of [-0.8, 0.8]) k.cyl(PAL.stoneDark, 0.08, 0.1, 1.2, 3.2 + sx, top - 1.0, -1.0 + sz, { seg: 5, outline: false });
  const hp = helipadCanvas();
  k.plane(hp, 2.9, 2.9, [3.2, top + 0.43, -1.0], 0, -Math.PI / 2);
  k.cyl(PAL.steelDark ?? 0x9aa7b1, 0.07, 0.1, 3.2, -0.8, top + 0.35, -2.3, { seg: 5 });
  k.ball(PAL.red, 0.15, -0.8, top + 3.6, -2.3, { seg: 6, ring: 4 });
  k.box(0x9aa7b1, 1.2, 0.8, 1.0, 0.0, top + 0.35, -1.0);           // machine room
  const totalTop = top + 3.7;

  // ---- hanging gardens: bushes on every exposed roof area + vines spilling over edges
  const inside = (s, x, z, m) => x > s.x - s.w / 2 - m && x < s.x + s.w / 2 + m && z > s.z - s.d / 2 - m && z < s.z + s.d / 2 + m;
  for (let i = 0; i < slabs.length - 1; i++) {
    const s = slabs[i], nx = slabs[i + 1];
    const n = 4 + Math.floor(s.w * s.d / 3.2);
    for (let t = 0; t < n; t++) {
      const x = s.x + (r() - 0.5) * (s.w - 0.5), z = s.z + (r() - 0.5) * (s.d - 0.5);
      if (inside(nx, x, z, 0.1)) continue;
      const big = r() > 0.78;
      k.ball(GRN[Math.floor(r() * 4)], big ? 0.62 : 0.34 + r() * 0.2, x, s.y1 + (big ? 0.5 : 0.28), z, { seg: 7, ring: 5, sy: big ? 1.0 : 0.8, outline: big });
      if (r() > 0.8) k.ball(PAL.pink, 0.1, x + 0.2, s.y1 + 0.7, z + 0.1, { seg: 4, ring: 3, outline: false });
      if (big) k.cyl(PAL.woodDark, 0.07, 0.1, 0.4, x, s.y1, z, { seg: 5, outline: false });
    }
    // spilling vines along the exposed front/back/side edges
    for (let t = 0; t < 7; t++) {
      const side = Math.floor(r() * 4);
      let x = s.x + (r() - 0.5) * s.w, z = s.z + (r() - 0.5) * s.d;
      if (side === 0) z = s.z + s.d / 2 - 0.05; else if (side === 1) z = s.z - s.d / 2 + 0.05; else if (side === 2) x = s.x + s.w / 2 - 0.05; else x = s.x - s.w / 2 + 0.05;
      if (inside(nx, x, z, 0.2)) continue;
      const len = 0.7 + r() * 1.3;
      k.cyl(GRN[Math.floor(r() * 4)], 0.07, 0.14, len, x, s.y0 + 0.15 - len + 0.35, z, { seg: 5, outline: false });
      k.ball(GRN[Math.floor(r() * 4)], 0.22, x, s.y0 + 0.2 - len + 0.1, z, { seg: 5, ring: 4, outline: false });
      if (r() > 0.6) k.ball(PAL.marigold, 0.08, x + 0.1, s.y0 + 0.4, z + 0.15, { seg: 4, ring: 3, outline: false });
    }
  }
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
    { x: -1.2, z: -2.2, radius: 3.6, height: totalTop }, { x: 0.3, z: -2.4, radius: 3.4, height: totalTop }, { x: -3.0, z: -2.6, radius: 3.0, height: 5 },
    { x: bx, z: bz, radius: 1.3, height: 2.6 }, { x: 1.7, z: 8.9, radius: 0.3, height: 1 },
    ...[-1, 1].map((sx) => ({ x: sx * 3.6, z: 9.6, radius: 0.5, height: 3 })),
    ...lineColliders(-10.4, -9.6, 10.4, -9.6, 0.5, 1.7, 1.0), ...lineColliders(-10.4, -9.6, -10.4, 9.6, 0.5, 1.7, 1.0),
    ...lineColliders(10.4, -9.6, 10.4, 9.6, 0.5, 1.7, 1.0), ...lineColliders(-10.4, 9.6, -4.1, 9.6, 0.5, 1.7, 1.0), ...lineColliders(4.1, 9.6, 10.4, 9.6, 0.5, 1.7, 1.0),
  ];
  g.userData = { ...g.userData, footprint: 15, height: totalTop, size: [21, 19.2, totalTop], gate: [0, 9.6], colliders: cols };
  return g;
}
