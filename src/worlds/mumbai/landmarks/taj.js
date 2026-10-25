// Taj Mahal Palace hotel (simplified): wide peach-sandstone facade, big central red dome, red corner domes, arched windows.
// Local frame: front +Z (the harbour side, facing the Gateway). ~22 wide x 6.6 deep x ~13.4 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders } from './kit.js';

const WALL = 0xf0d4b0, TRIM = 0xfbeed2, BAND = 0xc86a50;
const BW = 22, BD = 6, BH = 8;

function redDome(k, r, x, y, z, { sy = 1.05, seg = 12 } = {}) {
  k.cyl(TRIM, r * 0.98, r, r * 0.22, x, y, z, { seg });
  k.dome(PAL.domeRed, r, x, y + r * 0.2, z, { seg, ring: 6, sy });
  k.cone(PAL.gold, r * 0.07, r * 0.5, x, y + r * 0.2 + r * sy, z, { seg: 5 });
}

export function createTaj(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 21 });
  k.base(BW + 1, BD + 1, { color: PAL.stone });

  // wings
  k.box(WALL, BW, BH, BD, 0, 0, 0);
  k.box(BAND, BW + 0.2, 0.5, BD + 0.2, 0, 0, 0);
  k.box(TRIM, BW + 0.5, 0.4, BD + 0.5, 0, BH, 0);
  for (let i = 0; i < 22; i++) { // parapet teeth
    const x = -BW / 2 + 0.3 + i * ((BW - 0.6) / 21);
    k.box(TRIM, 0.6, 0.42, 0.35, x, BH + 0.4, BD / 2 + 0.1);
  }
  // centre block, advanced and taller
  k.box(WALL, 8.4, 9.8, BD + 1.4, 0, 0, 0.7);
  k.box(BAND, 8.7, 0.5, BD + 1.7, 0, 0, 0.7);
  k.box(TRIM, 8.9, 0.45, BD + 1.9, 0, 9.8, 0.7);
  // grand arcade on the centre block (three tall arches)
  const fz = 0.7 + (BD + 1.4) / 2;
  const f = k.face(0, 0, fz + 0.0, 0);
  for (const u of [-2.4, 0, 2.4]) {
    f.flat(TRIM, archFrame(), u, 0.5, 0.02);
  }
  for (const u of [-2.4, 0, 2.4]) f.window(u, 0.7, 1.6, 3.6, { glass: PAL.glassDark, frame: TRIM, pointed: false, sill: false, bars: 1 });
  for (const u of [-3.2, -1.2, 1.2, 3.2]) {
    f.window(u, 5.2, 0.9, 1.7, { glass: PAL.glassDark, frame: TRIM });
    f.window(u, 7.6, 0.9, 1.5, { glass: PAL.glassDark, frame: TRIM });
  }
  f.box(BAND, 0, 4.7, 8.4, 0.3, 0.3, 0.0);
  f.box(TRIM, 0, 7.15, 8.4, 0.18, 0.4, 0.0);
  // balconies
  f.box(TRIM, 0, 5.0, 8.7, 0.12, 0.7, 0.0);

  // wing windows (front + back + ends)
  for (const [oz, ry] of [[BD / 2, 0], [-BD / 2, Math.PI]]) {
    const fw = k.face(0, 0, oz, ry);
    for (let row = 0; row < 3; row++) {
      const v = 1.2 + row * 2.2;
      for (let i = 0; i < 6; i++) {
        for (const sx of [-1, 1]) {
          const u = sx * (5.4 + i * 1.3);
          if (u > 10.4 || u < -10.4) continue;
          if (oz > 0 && Math.abs(u) < 4.3) continue; // behind centre block
          fw.window(u, v, 0.75, 1.3, { glass: PAL.glassDark, frame: TRIM });
        }
      }
      fw.box(TRIM, 0, v + 1.45, BW, 0.1, 0.18, 0);
    }
  }
  for (const [ox, ry] of [[BW / 2, Math.PI / 2], [-BW / 2, -Math.PI / 2]]) {
    const fs = k.face(ox, 0, 0, ry);
    for (let row = 0; row < 3; row++) for (const u of [-1.6, 0, 1.6]) fs.window(u, 1.2 + row * 2.2, 0.75, 1.3, { glass: PAL.glassDark, frame: TRIM });
  }
  // centre block back/sides windows (just a few)
  for (const [ox, oz, ry] of [[4.2, 0.7, Math.PI / 2], [-4.2, 0.7, -Math.PI / 2]]) {
    const fs = k.face(ox, 0, oz, ry);
    for (const u of [-1.5, 1.5]) for (const v of [2, 4.4, 6.8]) fs.window(u, v, 0.8, 1.3, { glass: PAL.glassDark, frame: TRIM });
  }

  // grand central dome
  k.cyl(TRIM, 2.7, 3.2, 1.0, 0, 10.2, 0.7, { seg: 12 });
  k.cyl(BAND, 3.25, 3.25, 0.18, 0, 10.2, 0.7, { seg: 12 });
  for (let i = 0; i < 8; i++) { // drum windows
    const a = (i / 8) * Math.PI * 2;
    k.box(PAL.glassDark, 0.42, 0.62, 0.1, Math.sin(a) * 2.95, 10.5, 0.7 + Math.cos(a) * 2.95, { ry: a, outline: false });
  }
  redDome(k, 2.7, 0, 11.2, 0.7, { sy: 1.0 });
  // small pinnacles around the drum
  for (const a of [0.78, 2.36, 3.93, 5.5]) {
    const x = Math.sin(a) * 3.3, z = 0.7 + Math.cos(a) * 3.3;
    k.cyl(WALL, 0.25, 0.3, 1.2, x, 10.2, z, { seg: 6 });
    k.cone(PAL.domeRed, 0.34, 0.8, x, 11.4, z, { seg: 6 });
  }

  // corner towers with domes
  for (const sx of [-1, 1]) {
    const x = sx * 9.4;
    k.box(WALL, 3.4, 2.6, 4.6, x, BH, 0.0);
    k.box(TRIM, 3.6, 0.3, 4.8, x, BH + 2.6, 0);
    redDome(k, 1.55, x, BH + 2.9, 0, { sy: 1.1 });
    const ff = k.face(x, 0, 2.3, 0);
    ff.window(-0.7, BH + 0.4, 0.7, 1.4, { glass: PAL.glassDark, frame: TRIM, pointed: true });
    ff.window(0.7, BH + 0.4, 0.7, 1.4, { glass: PAL.glassDark, frame: TRIM, pointed: true });
    // intermediate pavilion with a little dome
    const px = sx * 6.2;
    k.box(WALL, 2.2, 1.2, 3.4, px, BH, 0);
    redDome(k, 0.95, px, BH + 1.2, 0, { sy: 1.1, seg: 10 });
  }
  // roof chimneys / water towers peeking out (breaks the silhouette a little)
  k.cyl(PAL.brick, 0.28, 0.32, 1.1, -1.5, BH + 0.4, -2, { seg: 6 });
  k.cyl(PAL.brick, 0.28, 0.32, 0.9, 1.9, BH + 0.4, -1.6, { seg: 6 });

  const g = k.finish({ lean: 0.004 });
  g.name = 'taj';
  g.userData = {
    footprint: 12,
    height: 13.4,
    colliders: [
      ...lineColliders(-9.6, 0, 9.6, 0, 3.3, BH + 1, 3.0),
      { x: 0, z: 1.5, radius: 3.6, height: 10 },
    ],
  };
  return g;
}

function archFrame() {
  // rounded arch frame (a slightly larger lighter arch drawn behind the dark opening)
  const w = 1.95, h = 4.0, s = new THREE.Shape();
  const hs = h - w / 2;
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, hs); s.absarc(0, hs, w / 2, 0, Math.PI, false); s.closePath();
  return s;
}
