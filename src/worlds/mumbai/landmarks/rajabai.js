// Rajabai Clock Tower: gothic-venetian tower, painted clock faces on four sides, open belfry, pointed teal spire.
// Local frame: front +Z. 4.6 x 4.6 base, ~14.6 tall.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, wobblyLine, polyShape } from './kit.js';

const BUFF = 0xe4c997, DARK = 0xc9a273, LIGHT = 0xf3e4bb, SPIRE = 0x78aaa2;

function clockCanvas() {
  const { c, ctx } = makeCanvas(160, 160);
  const r = handRng(3);
  ctx.fillStyle = '#fbf6e6'; ctx.beginPath(); ctx.arc(80, 80, 72, 0, 6.283); ctx.fill();
  wobblyLine(ctx, Array.from({ length: 14 }, (_, i) => [80 + Math.cos((i / 14) * 6.283) * 72, 80 + Math.sin((i / 14) * 6.283) * 72]), { r, amp: 2, lw: 6, closed: true });
  wobblyLine(ctx, Array.from({ length: 14 }, (_, i) => [80 + Math.cos((i / 14) * 6.283) * 60, 80 + Math.sin((i / 14) * 6.283) * 60]), { r, amp: 1.5, lw: 2, closed: true });
  ctx.fillStyle = INK;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.283;
    ctx.beginPath(); ctx.arc(80 + Math.sin(a) * 52, 80 - Math.cos(a) * 52, i % 3 === 0 ? 5 : 3, 0, 6.283); ctx.fill();
  }
  wobblyLine(ctx, [[80, 80], [80 + Math.sin(2.4) * 32, 80 - Math.cos(2.4) * 32]], { r, amp: 1, lw: 6 });
  wobblyLine(ctx, [[80, 80], [80 + Math.sin(5.6) * 46, 80 - Math.cos(5.6) * 46]], { r, amp: 1, lw: 4 });
  ctx.beginPath(); ctx.arc(80, 80, 5, 0, 6.283); ctx.fill();
  return c;
}

export function createRajabai(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 51 });
  k.base(7, 7, { color: PAL.stone });

  // base stage with arched windows + corner turrets
  k.box(BUFF, 4.6, 5.0, 4.6, 0, 0, 0);
  k.box(DARK, 4.8, 0.45, 4.8, 0, 0, 0);
  k.box(LIGHT, 4.9, 0.3, 4.9, 0, 4.9, 0);
  k.box(DARK, 4.75, 0.2, 4.75, 0, 2.4, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    k.cyl(BUFF, 0.4, 0.46, 5.9, sx * 2.35, 0, sz * 2.35, { seg: 8 });
    k.cone(SPIRE, 0.55, 1.2, sx * 2.35, 5.9, sz * 2.35, { seg: 8 });
  }
  for (const [ox, oz, ry] of [[0, 2.3, 0], [0, -2.3, Math.PI], [2.3, 0, Math.PI / 2], [-2.3, 0, -Math.PI / 2]]) {
    const f = k.face(ox, 0, oz, ry);
    f.window(0, 0.55, 1.1, 1.8, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 1 });
    f.window(-1.35, 3.0, 0.6, 1.4, { pointed: true, glass: PAL.glassDark, frame: LIGHT });
    f.window(1.35, 3.0, 0.6, 1.4, { pointed: true, glass: PAL.glassDark, frame: LIGHT });
    f.window(0, 3.0, 0.8, 1.6, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 1 });
  }
  // clock stage
  k.box(BUFF, 3.3, 3.2, 3.3, 0, 5.1, 0);
  k.box(LIGHT, 3.55, 0.28, 3.55, 0, 8.3, 0);
  for (const [ox, oz, ry] of [[0, 1.65, 0], [0, -1.65, Math.PI], [1.65, 0, Math.PI / 2], [-1.65, 0, -Math.PI / 2]]) {
    const f = k.face(ox, 0, oz, ry);
    f.box(DARK, 0, 5.55, 2.5, 2.5, 0.12, 0);
    // little gable over each clock
    f.flat(LIGHT, polyShape([[-1.3, 0], [1.3, 0], [0, 0.8]]), 0, 8.0, 0.04);
  }
  const clock = clockCanvas();
  k.planes_(clock, [
    { w: 2.2, h: 2.2, pos: [0, 6.8, 1.78], ry: 0 }, { w: 2.2, h: 2.2, pos: [0, 6.8, -1.78], ry: Math.PI },
    { w: 2.2, h: 2.2, pos: [1.78, 6.8, 0], ry: Math.PI / 2 }, { w: 2.2, h: 2.2, pos: [-1.78, 6.8, 0], ry: -Math.PI / 2 },
  ]);
  // octagonal belfry: eight columns + dark openings
  k.cyl(BUFF, 1.5, 1.7, 0.4, 0, 8.55, 0, { seg: 8 });
  k.cyl(PAL.glassDark, 1.15, 1.15, 1.8, 0, 8.95, 0, { seg: 8, outline: false });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    k.cyl(LIGHT, 0.14, 0.17, 1.9, Math.sin(a) * 1.28, 8.95, Math.cos(a) * 1.28, { seg: 5 });
  }
  k.cyl(DARK, 1.6, 1.6, 0.3, 0, 10.8, 0, { seg: 8 });
  // spire: octagonal cone with a flared eave + little dormer pinnacles
  k.cone(SPIRE, 1.75, 3.5, 0, 11.05, 0, { seg: 8 });
  k.cone(PAL.gold, 0.1, 0.8, 0, 14.5, 0, { seg: 5 });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    k.cone(SPIRE, 0.28, 0.9, Math.sin(a) * 1.55, 11.1, Math.cos(a) * 1.55, { seg: 5 });
  }

  const g = k.finish({ lean: 0.004 });
  g.name = 'rajabai';
  g.userData = { footprint: 3.5, height: 15.4, colliders: [{ x: 0, z: 0, radius: 2.9, height: 15 }] };
  return g;
}
