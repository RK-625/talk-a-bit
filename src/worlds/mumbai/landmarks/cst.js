// Chhatrapati Shivaji Terminus: gothic-revival facade, central ribbed dome with a statue, pointed corner towers,
// painted rose window. Local frame: front +Z. ~27 wide x 9 deep x ~12.8 tall.
import * as THREE from 'three';
import { Kit, PAL, makeCanvas, handRng, INK, wobblyLine, lineColliders, polyShape } from './kit.js';

const STONE = 0xe6d0a0, BANDC = 0xd9a07c, LIGHT = 0xf4e6c2, SPIRE = 0x95b9b0, DOMEC = 0xeadfbf;

function roseCanvas() {
  const { c, ctx } = makeCanvas(256, 256);
  const r = handRng(9);
  const cx = 128, cy = 128;
  const cols = ['#e86a6a', '#f2b33f', '#5ea3d6', '#7ac28b', '#b58be0', '#f08fb0'];
  // petals (wedges) of stained glass
  const N = 12;
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 108, a0, a1); ctx.closePath();
    ctx.fillStyle = cols[i % cols.length]; ctx.fill();
    ctx.globalAlpha = 0.6; ctx.fillStyle = '#fff6d8';
    ctx.beginPath(); ctx.arc(cx, cy, 60, a0, a1); ctx.lineTo(cx, cy); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
  }
  ctx.strokeStyle = INK; ctx.lineWidth = 4;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    wobblyLine(ctx, [[cx, cy], [cx + Math.cos(a) * 110, cy + Math.sin(a) * 110]], { r, amp: 2, lw: 3.5 });
  }
  for (const rad of [108, 62, 24]) wobblyLine(ctx, Array.from({ length: 16 }, (_, i) => [cx + Math.cos((i / 16) * 6.283) * rad, cy + Math.sin((i / 16) * 6.283) * rad]), { r, amp: 2, lw: 4, closed: true });
  ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, 6.283); ctx.fill();
  wobblyLine(ctx, Array.from({ length: 12 }, (_, i) => [cx + Math.cos((i / 12) * 6.283) * 22, cy + Math.sin((i / 12) * 6.283) * 22]), { r, amp: 1, lw: 3, closed: true });
  return c;
}

function gablePrism(k, color, w, h, d, x, y, z) {
  const s = polyShape([[-w / 2, 0], [w / 2, 0], [0, h]]);
  k.extrude(color, s, d, x, y, z);
}

export function createCST(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 31 });
  k.base(27, 10, { color: PAL.stone });

  // wings
  for (const sx of [-1, 1]) {
    k.box(STONE, 8.4, 5.4, 6.4, sx * 8.7, 0, 0);
    k.box(BANDC, 8.5, 0.35, 6.5, sx * 8.7, 2.5, 0);
    k.box(LIGHT, 8.7, 0.35, 6.7, sx * 8.7, 5.4, 0);
    // pointed-roof dormers along the wing
    for (const dx of [-2.5, 0, 2.5]) { gablePrism(k, SPIRE, 1.8, 1.3, 1.6, sx * 8.7 + dx, 5.7, 2.2); }
    // tall front pavilion / corner tower
    const tx = sx * 12.4;
    k.box(STONE, 3.6, 6.8, 7.4, tx, 0, 0.3);
    k.box(BANDC, 3.7, 0.4, 7.5, tx, 3.0, 0.3);
    k.box(LIGHT, 3.8, 0.35, 7.6, tx, 6.8, 0.3);
    k.cone(SPIRE, 2.4, 3.3, tx, 7.1, 0.3, { seg: 8 });
    k.cone(PAL.gold, 0.12, 0.7, tx, 10.3, 0.3, { seg: 5 });
    for (const [sxx, szz] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) { // spirelets at the tower corners
      k.cyl(STONE, 0.28, 0.34, 1.1, tx + sxx * 1.55, 6.9, 0.3 + szz * 3.3, { seg: 6 });
      k.cone(SPIRE, 0.4, 1.0, tx + sxx * 1.55, 8.0, 0.3 + szz * 3.3, { seg: 6 });
    }
  }
  // centre block
  k.box(STONE, 9.2, 6.8, 9, 0, 0, 0);
  k.box(BANDC, 9.3, 0.4, 9.1, 0, 3.0, 0);
  k.box(LIGHT, 9.5, 0.4, 9.3, 0, 6.8, 0);
  // front gable over the porch
  gablePrism(k, STONE, 9.2, 2.2, 1.1, 0, 6.8, 3.9);
  gablePrism(k, LIGHT, 9.8, 2.5, 0.3, 0, 6.75, 4.55);
  // octagonal drum + ribbed dome (the landmark of the silhouette)
  k.cyl(STONE, 2.65, 2.95, 1.7, 0, 6.8, -0.4, { seg: 8 });
  k.cyl(LIGHT, 3.1, 3.1, 0.2, 0, 8.5, -0.4, { seg: 8 });
  k.dome(DOMEC, 2.8, 0, 8.7, -0.4, { seg: 16, ring: 7, sy: 0.98 });
  for (let i = 0; i < 4; i++) { // meridian ribs
    const rib = new THREE.TorusGeometry(2.84, 0.07, 4, 14, Math.PI);
    k.add(rib, 0xc7b085, { pos: [0, 8.7, -0.4], rot: [0, (i / 4) * Math.PI, 0], scale: [1, 0.98, 1] });
  }
  k.cyl(STONE, 0.45, 0.65, 0.8, 0, 8.7 + 2.65, -0.4, { seg: 8 }); // lantern
  k.cone(SPIRE, 0.6, 0.7, 0, 8.7 + 3.45, -0.4, { seg: 8 });
  // statue of "Progress" on top
  const sy = 8.7 + 4.1, sz = -0.4;
  k.cyl(LIGHT, 0.16, 0.22, 0.35, 0, sy, sz, { seg: 6 });
  k.cone(PAL.sandstone, 0.3, 0.8, 0, sy + 0.35, sz, { seg: 7 }); // robe
  k.ball(PAL.sandstone, 0.14, 0, sy + 1.25, sz, { seg: 7, ring: 5 }); // head
  k.cyl(PAL.sandstone, 0.045, 0.055, 0.55, 0.22, sy + 1.05, sz, { seg: 5, rz: -0.5 }); // raised arm
  k.ball(PAL.gold, 0.09, 0.36, sy + 1.4, sz, { seg: 5, ring: 4 }); // torch
  // small turrets round the drum
  for (const [dx, dz] of [[-3.4, -3.3], [3.4, -3.3], [-3.4, 2.4], [3.4, 2.4]]) {
    k.cyl(STONE, 0.42, 0.5, 2.0, dx, 6.9, dz, { seg: 8 });
    k.cone(SPIRE, 0.62, 1.5, dx, 8.8, dz, { seg: 8 });
  }

  // windows
  const front = k.face(0, 0, 4.5, 0);
  // great pointed porch
  front.flat(LIGHT, polyShape([[-2.1, 0], [2.1, 0], [2.1, 3.3], [0, 5.6], [-2.1, 3.3]]), 0, 0.2, 0.02);
  front.window(0, 0.2, 3.4, 4.8, { pointed: true, glass: 0x5a4f6f, frame: LIGHT, bars: 1, sill: false });
  front.window(-3.5, 3.6, 0.8, 1.9, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 1 });
  front.window(3.5, 3.6, 0.8, 1.9, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 1 });
  for (const u of [-3.5, 3.5, -1.6, 1.6]) front.window(u, 0.6, 0.8, 1.8, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 0 });
  // pointed window rows on wings and tower
  for (const sx of [-1, 1]) {
    const wf = k.face(sx * 8.7, 0, 3.2, 0);
    for (let i = -2; i <= 2; i++) {
      wf.window(i * 1.55, 0.5, 0.85, 1.7, { pointed: true, glass: PAL.glassDark, frame: LIGHT });
      wf.window(i * 1.55, 3.1, 0.85, 1.7, { pointed: true, glass: PAL.glassDark, frame: LIGHT });
    }
    const tf = k.face(sx * 12.4, 0, 4.0, 0);
    tf.window(0, 0.5, 1.3, 2.3, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 1 });
    tf.window(0, 3.5, 1.2, 2.2, { pointed: true, glass: PAL.glassDark, frame: LIGHT, bars: 1 });
    // side face of tower
    const ts = k.face(sx * 12.4 + sx * 1.8, 0, 0.3, sx * Math.PI / 2);
    for (const u of [-1.8, 1.8]) ts.window(u, 1.0, 0.85, 2.0, { pointed: true, glass: PAL.glassDark, frame: LIGHT });
  }
  // drum windows
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    k.box(PAL.glassDark, 0.5, 0.8, 0.1, Math.sin(a) * 2.9, 7.2, -0.4 + Math.cos(a) * 2.9, { ry: a, outline: false });
  }
  // back + sides of centre block
  for (const [ox, oz, ry, us] of [[0, -4.5, Math.PI, [-3, -1, 1, 3]], [4.6, 0, Math.PI / 2, [-2.6, 0, 2.6]], [-4.6, 0, -Math.PI / 2, [-2.6, 0, 2.6]]]) {
    const bf = k.face(ox, 0, oz, ry);
    for (const u of us) { bf.window(u, 1.0, 0.8, 1.8, { pointed: true, glass: PAL.glassDark, frame: LIGHT }); bf.window(u, 4.0, 0.8, 1.8, { pointed: true, glass: PAL.glassDark, frame: LIGHT }); }
  }

  // painted rose window (+ smaller ones on the towers)
  const rose = roseCanvas();
  const rf = k.face(0, 0, 4.5 + 0.55, 0);
  rf.plane(rose, 1.9, 1.9, 0, 7.45, 0.05);
  for (const sx of [-1, 1]) k.plane(rose, 1.1, 1.1, [sx * 12.4, 5.2, 4.02], 0);

  const g = k.finish({ lean: 0.005 });
  g.name = 'cst';
  g.userData = {
    footprint: 14,
    height: 13.8,
    colliders: [
      ...lineColliders(-13.5, 0, 13.5, 0, 3.4, 6, 3.4),
      { x: 0, z: 0.8, radius: 4.2, height: 8 },
      { x: -12.4, z: 1.5, radius: 3.0, height: 7 }, { x: 12.4, z: 1.5, radius: 3.0, height: 7 },
    ],
  };
  return g;
}
