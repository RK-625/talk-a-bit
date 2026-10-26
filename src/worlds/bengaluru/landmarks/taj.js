// Bangalore Palace (replaces the Taj hotel; layout id 'taj'): Tudor-revival castle in pale grey stone, crenellated towers with
// round turrets, a half-timbered entrance gable, arched windows and creeping ivy. Local frame: front +Z. ~22 wide x 6.6 deep.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape, mulberry32 } from './kit.js';

const WALL = 0xdcd6c6, TRIM = 0xf6f1e2, DARKST = 0xb5ae9d, TIMBER = 0x7a5238, PLASTER = 0xf4ecd6, IVY = [0x6faa6e, 0x5c9a63, 0x86bb72];
const BW = 22, BD = 6, BH = 6.4;

function merlons(k, color, x0, x1, z, y, n, axis = 'x') {
  for (let i = 0; i < n; i++) {
    const t = x0 + (i + 0.5) * ((x1 - x0) / n);
    if (axis === 'x') k.box(color, 0.55, 0.5, 0.4, t, y, z); else k.box(color, 0.4, 0.5, 0.55, z, y, t);
  }
}
function turret(k, x, z, y, r, h, seg = 10) {
  k.cyl(WALL, r, r * 1.08, h, x, y, z, { seg });
  k.cyl(TRIM, r * 1.22, r * 1.22, 0.3, x, y + h, z, { seg });
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; k.box(TRIM, 0.34, 0.42, 0.3, x + Math.sin(a) * r * 1.15, y + h + 0.3, z + Math.cos(a) * r * 1.15, { ry: a }); }
  for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) k.box(PAL.glassDark, 0.18, 0.7, 0.1, x + Math.sin(a) * r * 1.0, y + h * 0.5, z + Math.cos(a) * r * 1.0, { ry: a, outline: false });
}

export function createTaj(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 21 });
  const r = mulberry32(2121);
  k.base(BW + 1, BD + 1, { color: PAL.stone });

  // long main block
  k.box(WALL, BW, BH, BD, 0, 0, 0);
  k.box(DARKST, BW + 0.2, 0.55, BD + 0.2, 0, 0, 0);
  k.box(TRIM, BW + 0.4, 0.35, BD + 0.4, 0, BH, 0);
  merlons(k, TRIM, -BW / 2 + 0.2, BW / 2 - 0.2, BD / 2 + 0.1, BH + 0.35, 22);
  merlons(k, TRIM, -BW / 2 + 0.2, BW / 2 - 0.2, -BD / 2 - 0.1, BH + 0.35, 22);

  // entrance block: taller, with a half-timbered gable and a pointed porch
  const fz = 0.9 + (BD + 1.8) / 2;
  k.box(WALL, 7.4, 8.4, BD + 1.8, 0, 0, 0.9);
  k.box(TRIM, 7.7, 0.35, BD + 2.1, 0, 8.4, 0.9);
  k.extrude(PLASTER, polyShape([[-3.7, 0], [3.7, 0], [0, 3.2]]), BD + 1.4, 0, 8.75, 0.9, {}); // gable
  k.extrude(0x9a6a48, polyShape([[-3.95, -0.05], [3.95, -0.05], [0, 3.45]]), 0.3, 0, 8.7, fz - 0.3, {}); // barge boards
  const fgz = fz + 0.02;
  const gable = k.face(0, 8.75, fgz, 0);
  gable.box(TIMBER, 0, 0.0, 6.6, 0.18, 0.12, 0.0);
  gable.box(TIMBER, 0, 0.9, 4.4, 0.14, 0.12, 0.0);
  for (const u of [-1.8, -0.9, 0, 0.9, 1.8]) gable.box(TIMBER, u, 0.0, 0.12, 1.0 + (2.3 - Math.abs(u) * 1.1) * 0.5, 0.12, 0.0);
  gable.box(TIMBER, 0, 1.6, 0.12, 1.3, 0.12, 0.0);
  gable.window(0, 0.2, 0.6, 0.55, { rect: true, glass: PAL.glassDark, frame: TRIM, sill: false });
  const f = k.face(0, 0, fz, 0);
  f.window(0, 0.0, 2.2, 3.6, { pointed: true, glass: 0x4a3f55, frame: TRIM, bars: 1, sill: false });  // porch arch
  for (const sx of [-1, 1]) {
    f.window(sx * 2.7, 0.9, 0.8, 1.5, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
    f.window(sx * 1.4, 4.4, 0.8, 1.4, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    f.window(sx * 2.7, 4.4, 0.8, 1.4, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    f.window(sx * 2.0, 6.5, 0.8, 1.3, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
  }
  f.window(0, 4.4, 1.1, 1.8, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
  f.box(TRIM, 0, 3.9, 3.3, 0.2, 0.8, 0.0); // balcony
  for (let i = -6; i <= 6; i++) f.box(TRIM, i * 0.25, 4.1, 0.05, 0.5, 0.05, 0.7);
  merlons(k, TRIM, -3.7, 3.7, fz + 0.15, 8.75, 8);
  // flag
  k.cyl(PAL.ink, 0.03, 0.03, 1.6, 0, 11.9, 0.9, { seg: 4 });
  k.flat(PAL.kaRed, polyShape([[0, 0], [0.9, 0.0], [0.9, 0.3], [0, 0.3]]), 0.04, 12.9, 0.9, {});
  k.flat(PAL.kaYellow, polyShape([[0, 0.3], [0.9, 0.3], [0.9, 0.6], [0, 0.6]]), 0.04, 12.9, 0.9, {});

  // end towers: tall crenellated square towers, the left one with a round corner turret
  for (const sx of [-1, 1]) {
    const x = sx * 8.8, th = sx < 0 ? 10.6 : 9.2;
    k.box(WALL, 4.2, th, BD + 0.8, x, 0, 0);
    k.box(DARKST, 4.4, 0.5, BD + 1.0, x, 0, 0);
    k.box(TRIM, 4.6, 0.35, BD + 1.2, x, th, 0);
    merlons(k, TRIM, x - 2.1, x + 2.1, BD / 2 + 0.55, th + 0.35, 7);
    merlons(k, TRIM, x - 2.1, x + 2.1, -BD / 2 - 0.55, th + 0.35, 7);
    merlons(k, TRIM, -BD / 2 - 0.2, BD / 2 + 0.2, x + 2.3, th + 0.35, 7, 'z');
    merlons(k, TRIM, -BD / 2 - 0.2, BD / 2 + 0.2, x - 2.3, th + 0.35, 7, 'z');
    const tf = k.face(x, 0, BD / 2 + 0.4, 0);
    tf.window(0, 1.0, 1.0, 1.8, { pointed: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    tf.window(0, 4.2, 0.9, 1.5, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    tf.window(0, th - 2.4, 0.9, 1.4, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    turret(k, x + sx * 1.9, BD / 2 + 0.2, th - 1.4, 0.8, 3.4);
    turret(k, x - sx * 1.9, -BD / 2 - 0.2, th - 1.4, 0.8, 3.4);
    // side wall of tower
    const ts = k.face(x + sx * 2.1, 0, 0, sx * Math.PI / 2);
    for (const u of [-1.2, 1.2]) { ts.window(u, 1.1, 0.7, 1.4, { rect: true, glass: PAL.glassDark, frame: TRIM }); ts.window(u, 4.6, 0.7, 1.4, { rect: true, glass: PAL.glassDark, frame: TRIM }); }
  }
  // wing windows (front + back)
  for (const [oz, ry] of [[BD / 2, 0], [-BD / 2, Math.PI]]) {
    const fw = k.face(0, 0, oz, ry);
    for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) {
      const u = sx * (5.9 + i * 1.5);
      if (oz > 0 && Math.abs(u) < 4.3) continue;
      fw.window(u, 0.8, 0.8, 1.5, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
      fw.window(u, 3.5, 0.8, 1.5, { rect: true, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    }
  }
  // small turrets on the main block's parapet
  for (const sx of [-1, 1]) turret(k, sx * 3.2, 1.2, BH - 0.5, 0.45, 1.8, 8);

  // ivy: clumps climbing the walls and towers
  for (let i = 0; i < 26; i++) {
    const side = i % 3;
    const x = side === 0 ? -10.6 + r() * 3 : side === 1 ? -6 + r() * 12 : 9 + r() * 2;
    const y = 0.3 + r() * (side === 0 ? 8 : 4.6);
    k.ball(IVY[Math.floor(r() * 3)], 0.3 + r() * 0.34, x, y, BD / 2 + 0.02 + (Math.abs(x) > 6.7 ? 0.45 : 0.05), { sz: 0.35, seg: 6, ring: 4, outline: false });
  }
  // lawn hedge trim
  for (let i = 0; i < 9; i++) k.ball(PAL.leaf, 0.42, -9 + i * 2.25, 0.3, BD / 2 + 0.8, { seg: 6, ring: 4, sy: 0.7, outline: false });

  const g = k.finish({ lean: 0.004 });
  g.name = 'taj';
  g.userData = {
    footprint: 12,
    height: 14.4,
    colliders: [
      ...lineColliders(-9.6, 0, 9.6, 0, 3.3, BH + 1, 3.0),
      { x: 0, z: 1.5, radius: 3.6, height: 10 },
    ],
  };
  return g;
}
