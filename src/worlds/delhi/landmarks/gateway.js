// India Gate (replaces Charminar; layout id 'gateway'). References: Wikimedia Commons "India Gate 1 (New Delhi)", "India Gate in New Delhi 03-2016",
// "India Gate, New Delhi from West" (see docs/DELHI.md refs). Pink-buff sandstone laid in horizontal courses; ONE big round arch through the middle (the other
// two faces are closed); two stepped piers with a ledge, recessed panels and a wreath roundel each; a heavy overhanging cornice on corbels; a three-step
// attic with INDIA in a band between two roundels over lines of inscription, and a low domed cap. The small Amar-Jawan canopy (a chhatri on four pillars)
// stands behind the arch, seen through it, with two flag poles. Local frame: y up, base y=0, the lawn + steps toward +Z; the arch passage (x -1.7..1.7) stays walkable.
import * as THREE from 'three';
import { Kit, PAL, ringArch, rectShape, polyShape, paintBoard, latin, inkText, paintLive, makeCanvas, handRng, wobblyLine } from './kit.js';
import { roundArchWall } from './parts.js';

const B = 0xe4bd93, BL = 0xf0d2ae, BD = 0xc99a72, BDD = 0xa9795a;
const HW = 5.9, HD = 2.9;          // body half width / half depth
const Y0 = 0.6;                    // plinth top
const H1 = 11.6;                   // body height above the plinth
const AW = 1.85, SPRING = 7.4;     // arch half width, springing height (apex = SPRING + AW = 8.35)
const circ = (r) => { const sh = new THREE.Shape(); sh.absarc(0, 0, r, 0, Math.PI * 2, false); return sh; };

/** the attic face: courses, INDIA between two roundels, lines of (illegible, hand-drawn) inscription below */
function atticCanvas(w, h) {
  return paintLive(Math.round(w * 70), Math.round(h * 70), (ctx, W, H, r) => {
    ctx.fillStyle = '#e9c49b'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(130,85,55,0.42)'; ctx.lineWidth = 2;
    for (let j = 1; j < 7; j++) { const y = (j / 7) * H; wobblyLine(ctx, [[0, y], [W, y]], { r, amp: 0.8, lw: 2 }); }
    // INDIA band: a slightly darker panel with the word, a roundel on each side
    ctx.fillStyle = 'rgba(170,120,85,0.28)'; ctx.fillRect(W * 0.3, H * 0.08, W * 0.4, H * 0.3);
    for (const sx of [0.2, 0.8]) { ctx.strokeStyle = '#7a4a34'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(W * sx, H * 0.24, H * 0.17, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.arc(W * sx, H * 0.24, H * 0.1, 0, 6.283); ctx.stroke(); }
    inkText(ctx, 'INDIA', W * 0.5, H * 0.33, H * 0.26, { color: '#6a3f2c', r: handRng(8), tilt: 0.004 });
    // inscription: short wobbly dashes standing in for the carved lines
    ctx.strokeStyle = 'rgba(100,60,40,0.55)'; ctx.lineWidth = 2.2;
    for (let j = 0; j < 4; j++) {
      let x = W * (0.1 + j * 0.01);
      const y = H * (0.55 + j * 0.1);
      while (x < W * (0.9 - j * 0.01)) { const L = 8 + r() * 26; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y + (r() - 0.5) * 1.5); ctx.stroke(); x += L + 4 + r() * 5; }
    }
  }, 5);
}

export function createGateway(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 11 });

  // paved plaza + wide front steps (front, +Z) down to the boat-club canal
  k.base(17, 12, { color: PAL.stone });
  for (let i = 0; i < 4; i++) {
    const top = -0.05 - i * 0.2, z0 = 4.2 + i * 0.85;
    k.box(i % 2 ? PAL.stoneDark : PAL.stone, 12.4 - i * 0.3, top + 1.6, 0.85, 0, -1.6, z0 + 0.43);
  }
  // the low posts and chain that edge the lawn in front of the Gate
  for (let i = -3; i <= 3; i++) {
    const x = i * 2.5;
    k.cyl(PAL.ink, 0.12, 0.15, 0.55, x, 0, 4.95, { seg: 6 });
    if (i < 3) for (let s = 0; s < 3; s++) { const t0 = s / 3, t1 = (s + 1) / 3, ya = 0.45 - Math.sin(t0 * Math.PI) * 0.12, yb = 0.45 - Math.sin(t1 * Math.PI) * 0.12; k.box(PAL.ink, 2.5 / 3, 0.03, 0.03, x + 2.5 * (t0 + t1) / 2, (ya + yb) / 2, 4.95, { rz: Math.atan2(yb - ya, 2.5 / 3), outline: false }); }
  }

  // stepped plinth
  for (const sx of [-1, 1]) {
    k.box(BDD, HW + 0.5 - AW, 0.4, 2 * HD + 1.0, sx * (AW + (HW + 0.5 - AW) / 2), 0, 0);
    k.box(BD, HW + 0.25 - AW, 0.2, 2 * HD + 0.5, sx * (AW + (HW + 0.25 - AW) / 2), 0.4, 0);
  }

  // the body: a slab with the big round arch through it (along z)
  k.extrude(B, roundArchWall(2 * HW, H1 + Y0, AW, SPRING + Y0), 2 * HD, 0, 0, 0);
  // dark vault lining inside the arch
  k.box(0x8c6a56, 2 * AW - 0.2, 0.2, 2 * HD - 0.3, 0, Y0 + SPRING + AW - 0.3, 0, { outline: false });
  for (const [oz, ry] of [[HD + 0.1, 0], [-HD - 0.1, Math.PI]]) {
    // archivolt ring + keystone
    k.extrude(BL, ringArch(AW, AW + 0.5, SPRING + Y0), 0.22, 0, 0, oz, { ry });
    k.box(BL, 0.5, 0.7, 0.3, 0, Y0 + SPRING + AW + 0.55, oz * 1.02, { ry });
    k.box(BD, 1.0, 0.18, 0.34, 0, Y0 + SPRING + AW + 0.95, oz * 1.02, { ry, outline: false });
    const f = k.face(0, Y0, oz, ry);
    for (const sx of [-1, 1]) {
      const px = sx * 3.95;
      // lower ledge, recessed panel with a bevelled frame, upper ledge, wreath roundel
      f.box(BD, px, 2.5, 4.0, 0.22, 0.18, 0);
      f.box(BD, px, 6.7, 4.0, 0.2, 0.15, 0);
      f.flat(BDD, polyShape([[-1.55, 2.95], [1.55, 2.95], [1.55, 5.65], [-1.55, 5.65]]), px, 0, 0.03);
      f.flat(BD, polyShape([[-1.35, 3.15], [1.35, 3.15], [1.35, 5.45], [-1.35, 5.45]]), px, 0, 0.05);
      f.flat(BDD, polyShape([[-1.2, 6.75], [1.2, 6.75], [1.2, 7.7], [-1.2, 7.7]]), px, 0, 0.03);
      f.flat(BDD, circ(1.0), px, 9.9, 0.03);
      f.flat(BL, circ(0.78), px, 9.9, 0.05);
      f.flat(BD, circ(0.5), px, 9.9, 0.07);
      f.flat(BDD, circ(0.12), px, 9.9, 0.09);
    }
  }
  // the closed side faces: courses of ledges and a blind arched niche
  for (const [ox, ry] of [[HW, Math.PI / 2], [-HW, -Math.PI / 2]]) {
    const f = k.face(ox, Y0, 0, ry);
    f.box(BD, 0, 2.5, 5.6, 0.2, 0.16, 0); f.box(BD, 0, 6.25, 5.6, 0.2, 0.14, 0);
    f.flat(BDD, polyShape([[-0.9, 3.0], [0.9, 3.0], [0.9, 5.7], [-0.9, 5.7]]), 0, 0, 0.03);
    f.flat(BDD, circ(0.8), 0, 9.9, 0.03); f.flat(BL, circ(0.6), 0, 9.9, 0.05);
    f.flat(BDD, polyShape([[-0.5, 7.0], [0.5, 7.0], [0.5, 8.1], [0, 8.6], [-0.5, 8.1]]), -1.7, 0, 0.03);
    f.flat(BDD, polyShape([[-0.5, 7.0], [0.5, 7.0], [0.5, 8.1], [0, 8.6], [-0.5, 8.1]]), 1.7, 0, 0.03);
  }

  // heavy cornice on corbels, with a band of little rosettes beneath it
  const CY = Y0 + H1;
  k.box(BL, 2 * HW + 1.4, 0.55, 2 * HD + 1.4, 0, CY, 0);
  k.box(BD, 2 * HW + 1.0, 0.3, 2 * HD + 1.0, 0, CY - 0.3, 0);
  for (let i = 0; i < 14; i++) {
    const t = -HW + 0.4 + i * ((2 * HW - 0.8) / 13);
    k.box(BD, 0.32, 0.4, 0.32, t, CY - 0.7, HD + 0.55, { outline: false }); k.box(BD, 0.32, 0.4, 0.32, t, CY - 0.7, -HD - 0.55, { outline: false });
  }
  for (let i = 0; i < 6; i++) { const t = -HD + 0.4 + i * ((2 * HD - 0.8) / 5); for (const sx of [-1, 1]) k.box(BD, 0.32, 0.4, 0.32, sx * (HW + 0.55), CY - 0.7, t, { outline: false }); }

  // attic: three steps, then a low cap
  const A1 = CY + 0.55, A1h = 1.9, A2h = 1.6;
  k.box(B, HW * 2 * 0.88, A1h, HD * 2 * 0.82, 0, A1, 0);
  k.box(BL, HW * 2 * 0.88 + 0.3, 0.16, HD * 2 * 0.82 + 0.3, 0, A1 + A1h, 0);
  k.box(B, HW * 2 * 0.69, A2h, HD * 2 * 0.66, 0, A1 + A1h + 0.16, 0);
  k.box(BL, HW * 2 * 0.69 + 0.3, 0.16, HD * 2 * 0.66 + 0.3, 0, A1 + A1h + 0.16 + A2h, 0);
  const A3 = A1 + A1h + A2h + 0.32;
  k.box(B, HW * 2 * 0.36, 0.45, HD * 2 * 0.5, 0, A3, 0);
  k.dome(BL, 1.9, 0, A3 + 0.45, 0, { sy: 0.2, seg: 10, ring: 3, outline: true });
  const ac = atticCanvas(HW * 2 * 0.88 - 0.3, A1h - 0.2);
  const fz = HD * 0.82 + 0.04;
  k.planes_(ac, [{ w: HW * 2 * 0.88 - 0.3, h: A1h - 0.2, pos: [0, A1 + A1h / 2, fz], ry: 0 }, { w: HW * 2 * 0.88 - 0.3, h: A1h - 0.2, pos: [0, A1 + A1h / 2, -fz], ry: Math.PI }]);
  const a2 = paintLive(Math.round((HW * 2 * 0.69 - 0.3) * 60), Math.round((A2h - 0.2) * 60), (ctx, W, H, r) => {
    ctx.fillStyle = '#e9c49b'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(130,85,55,0.42)'; ctx.lineWidth = 2;
    for (let j = 1; j < 5; j++) { const y = (j / 5) * H; wobblyLine(ctx, [[0, y], [W, y]], { r, amp: 0.8, lw: 2 }); }
  }, 6);
  const f2 = HD * 0.66 + 0.04;
  k.planes_(a2, [{ w: HW * 2 * 0.69 - 0.3, h: A2h - 0.2, pos: [0, A1 + A1h + 0.16 + A2h / 2, f2], ry: 0 }, { w: HW * 2 * 0.69 - 0.3, h: A2h - 0.2, pos: [0, A1 + A1h + 0.16 + A2h / 2, -f2], ry: Math.PI }]);

  // the Amar Jawan canopy behind the arch: a small domed chhatri on four pillars over a stepped platform, with a flag pole either side
  const CZ = -5.0;
  k.box(BD, 2.6, 0.3, 2.6, 0, 0, CZ); k.box(BL, 2.2, 0.18, 2.2, 0, 0.3, CZ);
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { k.box(B, 0.3, 2.6, 0.3, dx * 0.85, 0.48, CZ + dz * 0.85); k.box(BL, 0.42, 0.14, 0.42, dx * 0.85, 3.08, CZ + dz * 0.85); }
  k.box(BL, 2.5, 0.3, 2.5, 0, 3.22, CZ);
  k.box(B, 1.9, 0.4, 1.9, 0, 3.52, CZ);
  k.dome(BL, 1.0, 0, 3.9, CZ, { seg: 10, ring: 5, sy: 0.95 });
  k.cone(PAL.gold, 0.07, 0.5, 0, 4.85, CZ, { seg: 4 });
  k.cyl(0x40384a, 0.14, 0.16, 0.5, 0, 0.48, CZ, { seg: 6 });   // the memorial flame on its pedestal
  k.cone(PAL.marigold, 0.12, 0.3, 0, 0.98, CZ, { seg: 5, outline: false });
  for (const sx of [-1, 1]) {
    const px = sx * 2.4;
    k.cyl(PAL.ink, 0.03, 0.03, 4.2, px, 0, CZ + 0.4, { seg: 4, outline: false });
    k.flat(sx < 0 ? 0xf0954a : 0x3b83c4, polyShape([[0, 0], [0.9, -0.1], [0.9, -0.55], [0, -0.55]]), px + 0.46 * (sx < 0 ? 1 : 1), 4.2, CZ + 0.4, { ry: 0 });
    k.flat(0xfaf6ea, polyShape([[0, -0.2], [0.85, -0.2], [0.85, -0.45], [0, -0.45]]), px + 0.46, 4.2, CZ + 0.4, { ry: 0 });
  }

  // a few pigeons on the steps and cornice (real: they flock here)
  const pig = (x, y, z, ry) => {
    k.ball(0xb9b6c8, 0.17, x, y + 0.17, z, { sx: 1, sy: 0.85, sz: 1.35, seg: 6, ring: 4, ry, outline: false });
    k.ball(0x9a97ae, 0.1, x + Math.sin(ry) * 0.16, y + 0.32, z + Math.cos(ry) * 0.16, { seg: 5, ring: 4, outline: false });
  };
  [[-3.2, 0.05, 5.8, 0.3], [2.8, 0.05, 5.6, -0.6], [3.5, 0.05, 6.1, 2.4], [-1.2, 0.05, 6.4, 1.1], [-2.4, CY + 0.55, HD + 0.35, 0.4], [4.6, CY + 0.55, HD + 0.2, -0.3]].forEach((p) => pig(...p));

  const g = k.finish({ lean: 0.004 });
  g.name = 'gateway';
  g.userData = {
    footprint: 9,
    height: A3 + 1.2,
    // the two piers (arch stays open between them) and the canopy
    colliders: [
      ...[-1, 1].flatMap((sx) => [-1.6, 0, 1.6].map((z) => ({ x: sx * 4.1, z, radius: 2.1, height: 14 }))),
      { x: 0, z: CZ, radius: 1.3, height: 5 },
      ...[-1, 1].map((sx) => ({ x: sx * 7.5, z: 4.95, radius: 0.25, height: 0.5 })),
    ],
    walkable: [{ shape: 'rect', x: 0, z: 0, w: 3.4, d: 2 * HD, y: 0.05 }],
  };
  void rectShape; void paintBoard; void latin; void makeCanvas;
  return g;
}
