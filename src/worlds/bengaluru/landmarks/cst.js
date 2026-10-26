// KSR Bengaluru (Majestic) railway station (replaces CST; layout id 'cst'): long red-brown brick facade with a row of round arches,
// cream string courses, a central clock tower under a hipped roof, end pavilions with tiled roofs and a Kannada + English name board.
// Local frame: front +Z. ~27 wide x 9 deep x ~12.8 tall.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, wobblyLine, lineColliders, polyShape, bilingualBoard } from './kit.js';

const BRICK = 0xb8654f, BRICK_D = 0x9a4f40, CREAM = 0xf3e6c4, ROOF = 0xc9704e, ROOF_D = 0x9a4f3a;

export function clockFace() {
  const { c, ctx } = makeCanvas(160, 160);
  const r = handRng(3);
  ctx.fillStyle = '#fbf6e6'; ctx.beginPath(); ctx.arc(80, 80, 72, 0, 6.283); ctx.fill();
  wobblyLine(ctx, Array.from({ length: 14 }, (_, i) => [80 + Math.cos((i / 14) * 6.283) * 72, 80 + Math.sin((i / 14) * 6.283) * 72]), { r, amp: 2, lw: 6, closed: true });
  ctx.fillStyle = INK;
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.283; ctx.beginPath(); ctx.arc(80 + Math.sin(a) * 54, 80 - Math.cos(a) * 54, i % 3 === 0 ? 5 : 3, 0, 6.283); ctx.fill(); }
  wobblyLine(ctx, [[80, 80], [80 + Math.sin(2.4) * 32, 80 - Math.cos(2.4) * 32]], { r, amp: 1, lw: 6 });
  wobblyLine(ctx, [[80, 80], [80 + Math.sin(5.6) * 46, 80 - Math.cos(5.6) * 46]], { r, amp: 1, lw: 4 });
  ctx.beginPath(); ctx.arc(80, 80, 5, 0, 6.283); ctx.fill();
  return c;
}
const hip = (k, color, w, d, h, x, y, z) => k.add(new THREE.ConeGeometry(1, h, 4, 1).rotateY(Math.PI / 4).scale(w / 1.414, 1, d / 1.414), color, { pos: [x, y + h / 2, z] });
const gable = (k, color, w, h, d, x, y, z, ry = 0) => k.extrude(color, polyShape([[-w / 2, 0], [w / 2, 0], [0, h]]), d, x, y, z, { ry });

export function createCST(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 31 });
  k.base(27, 10, { color: PAL.stone });

  // wings with two storeys of round-arched windows
  for (const sx of [-1, 1]) {
    const cx = sx * 8.7;
    k.box(BRICK, 8.4, 5.4, 6.4, cx, 0, 0);
    k.box(CREAM, 8.5, 0.3, 6.5, cx, 2.55, 0);
    k.box(CREAM, 8.7, 0.35, 6.7, cx, 5.4, 0);
    k.box(BRICK_D, 8.55, 0.5, 6.55, cx, 0, 0);
    gable(k, ROOF, 7.2, 1.5, 6.0, cx, 5.75, 0, Math.PI / 2);                // tiled roof along x
    const wf = k.face(cx, 0, 3.2, 0);
    for (let i = -2; i <= 2; i++) {
      wf.window(i * 1.55, 0.6, 0.9, 1.8, { glass: PAL.glassDark, frame: CREAM, bars: 1 });
      wf.window(i * 1.55, 3.1, 0.9, 1.7, { glass: PAL.glassDark, frame: CREAM, bars: 1 });
    }
    // end pavilion (tall, hipped tile roof)
    const tx = sx * 12.4;
    k.box(BRICK, 3.6, 6.8, 7.4, tx, 0, 0.3);
    k.box(CREAM, 3.7, 0.3, 7.5, tx, 3.0, 0.3);
    k.box(CREAM, 3.9, 0.4, 7.6, tx, 6.8, 0.3);
    hip(k, ROOF_D, 4.2, 8.0, 2.6, tx, 7.2, 0.3);
    k.cone(PAL.gold, 0.1, 0.6, tx, 9.7, 0.3, { seg: 5 });
    const tf = k.face(tx, 0, 4.0, 0);
    tf.window(0, 0.6, 1.2, 2.2, { glass: PAL.glassDark, frame: CREAM, bars: 1 });
    tf.window(0, 3.6, 1.1, 2.0, { glass: PAL.glassDark, frame: CREAM, bars: 1 });
    const ts = k.face(tx + sx * 1.8, 0, 0.3, sx * Math.PI / 2);
    for (const u of [-1.8, 1.8]) ts.window(u, 1.1, 0.85, 2.0, { glass: PAL.glassDark, frame: CREAM });
  }
  // centre block: arched porte-cochere, upper hall, clock tower
  k.box(BRICK, 9.2, 6.8, 9, 0, 0, 0);
  k.box(CREAM, 9.5, 0.4, 9.3, 0, 6.8, 0);
  k.box(CREAM, 9.3, 0.3, 9.1, 0, 3.0, 0);
  gable(k, BRICK, 9.2, 2.4, 1.1, 0, 6.8, 3.9);
  gable(k, CREAM, 9.8, 2.7, 0.3, 0, 6.75, 4.55);
  gable(k, ROOF, 8.6, 1.9, 8.2, 0, 7.2, -0.6, Math.PI / 2);
  const front = k.face(0, 0, 4.5, 0);
  // three big round arches (the station concourse entrances)
  for (const u of [-2.9, 0, 2.9]) {
    front.window(u, 0.0, 2.2, 3.6, { glass: u === 0 ? 0x4a3f55 : PAL.glassDark, frame: CREAM, bars: 1, sill: false });
    front.window(u, 4.0, 1.0, 1.7, { glass: PAL.glassDark, frame: CREAM, bars: 1 });
  }
  for (const sx of [-1, 1]) front.box(BRICK_D, sx * 1.45, 0.0, 0.5, 3.6, 0.2, 0.0);
  for (const [ox, oz, ry] of [[4.6, 0, Math.PI / 2], [-4.6, 0, -Math.PI / 2]]) {
    const bf = k.face(ox, 0, oz, ry);
    for (const u of [-2.6, 0, 2.6]) { bf.window(u, 1.0, 0.8, 1.8, { glass: PAL.glassDark, frame: CREAM }); bf.window(u, 4.0, 0.8, 1.8, { glass: PAL.glassDark, frame: CREAM }); }
  }
  // clock tower rising out of the centre block
  k.box(BRICK, 3.8, 3.4, 3.8, 0, 7.4, 0.6);
  k.box(CREAM, 4.1, 0.3, 4.1, 0, 10.8, 0.6);
  hip(k, ROOF_D, 4.4, 4.4, 2.3, 0, 11.1, 0.6);
  k.cyl(PAL.ink, 0.04, 0.05, 0.8, 0, 13.3, 0.6, { seg: 4 });
  k.ball(PAL.gold, 0.14, 0, 14.15, 0.6, { seg: 6, ring: 4 });
  const cf = clockFace();
  k.planes_(cf, [
    { w: 2.1, h: 2.1, pos: [0, 9.1, 0.6 + 1.94], ry: 0 }, { w: 2.1, h: 2.1, pos: [0, 9.1, 0.6 - 1.94], ry: Math.PI },
    { w: 2.1, h: 2.1, pos: [1.94, 9.1, 0.6], ry: Math.PI / 2 }, { w: 2.1, h: 2.1, pos: [-1.94, 9.1, 0.6], ry: -Math.PI / 2 },
  ]);
  // name board across the front gable
  const nb = bilingualBoard(6.6, 1.3, 'ಬೆಂಗಳೂರು ಸಿಟಿ ಜಂಕ್ಷನ್', 'KSR BENGALURU CITY JUNCTION', { fill: '#f1f0ea', hatch: '#c8c4b6', kc: '#8a2f2f', ec: '#2b2440', knSize: 0.36, enSize: 0.17, seed: 31 });
  k.box(PAL.ink, 6.7, 1.35, 0.14, 0, 5.75, 4.55);
  k.plane(nb, 6.6, 1.3, [0, 5.75, 4.66], 0);
  // little spirelets on the centre block corners
  for (const [dx, dz] of [[-4.2, -4.0], [4.2, -4.0], [-4.2, 4.0], [4.2, 4.0]]) { k.cyl(BRICK, 0.34, 0.4, 1.2, dx, 6.9, dz, { seg: 6 }); k.cone(ROOF_D, 0.5, 1.0, dx, 8.1, dz, { seg: 6 }); }

  const g = k.finish({ lean: 0.005 });
  g.name = 'cst';
  g.userData = {
    footprint: 14,
    height: 14.4,
    colliders: [
      ...lineColliders(-13.5, 0, 13.5, 0, 3.4, 6, 3.4),
      { x: 0, z: 0.8, radius: 4.2, height: 8 },
      { x: -12.4, z: 1.5, radius: 3.0, height: 7 }, { x: 12.4, z: 1.5, radius: 3.0, height: 7 },
    ],
  };
  return g;
}
