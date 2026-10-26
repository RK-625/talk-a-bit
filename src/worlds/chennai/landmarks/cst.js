// Chennai Central (Puratchi Thalaivar Dr. M.G. Ramachandran Central): the long red-brick station with white banding, rows of
// white-framed round and pointed arches, a tall central clock tower with a pale pyramidal cap, and four-sided corner towers
// with pyramid roofs. (Replaces CST; same footprint.) Local frame: front +Z. ~27 wide x 9 deep x ~17 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape, clockFace, bilingualBoard } from './kit.js';

const RED = 0xc43b34, RED_D = 0xa5302c, WHITE = 0xfaf6ea, CAP = 0xcfdde4, CAP_D = 0xa9bcc7, ROOF = 0xb4b7ba;

function towerCap(k, w, h, x, y, z, color = CAP) {
  k.add(new THREE.ConeGeometry(w * 0.72, h, 4, 1).rotateY(Math.PI / 4), color, { pos: [x, y + h / 2, z] });
  k.box(WHITE, w + 0.25, 0.22, w + 0.25, x, y - 0.1, z);
}

export function createCST(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 31 });
  k.base(27, 10, { color: PAL.stone });

  // ---- long two-storey hall: red body, white bands, low grey roof ----
  const WL = 22, WD = 6.4, WH = 6.0;
  k.box(RED, WL, WH, WD, 0, 0, 0);
  k.box(WHITE, WL + 0.2, 0.3, WD + 0.2, 0, 0, 0);
  k.box(WHITE, WL + 0.18, 0.22, WD + 0.18, 0, 2.72, 0);
  k.box(WHITE, WL + 0.4, 0.34, WD + 0.4, 0, WH, 0);
  k.box(RED_D, WL + 0.24, 0.14, WD + 0.24, 0, WH - 0.35, 0);
  k.extrude(ROOF, polyShape([[-WD * 0.46, 0], [WD * 0.46, 0], [0, 1.0]]), WL - 1, 0, WH + 0.05, 0, { ry: Math.PI / 2 }); // low-pitched roof
  // ground arcade (shallow porch) + upper arch rows
  const wf = k.face(0, 0, WD / 2, 0);
  for (let i = -6; i <= 6; i++) {
    const u = i * 1.6;
    if (Math.abs(u) < 3.4) continue; // the tower base takes the centre
    wf.window(u, 0.5, 1.0, 2.0, { glass: PAL.glassDark, frame: WHITE, bars: 1, sill: false });
    wf.window(u, 3.35, 0.9, 1.9, { pointed: i % 2 === 0, glass: PAL.glassDark, frame: WHITE, bars: 1 });
  }
  // projecting porch canopy along the front (white fascia, red soffit)
  k.box(WHITE, WL - 1.2, 0.2, 1.6, 0, 3.0, WD / 2 + 0.7);
  k.box(RED_D, WL - 1.0, 0.1, 1.7, 0, 2.9, WD / 2 + 0.7);
  for (let i = -5; i <= 5; i++) { const u = i * 2.0; if (Math.abs(u) < 2.5) continue; k.cyl(WHITE, 0.09, 0.09, 3.0, u, 0, WD / 2 + 1.4, { seg: 5 }); }
  // rear and short faces
  for (const [ox, oz, ry, n] of [[0, -WD / 2, Math.PI, 6], [WL / 2, 0, Math.PI / 2, 2], [-WL / 2, 0, -Math.PI / 2, 2]]) {
    const f = k.face(ox, 0, oz, ry);
    for (let i = 0; i < n; i++) { const u = (i - (n - 1) / 2) * (n > 2 ? 3 : 2.4); f.window(u, 0.7, 0.9, 1.8, { glass: PAL.glassDark, frame: WHITE }); f.window(u, 3.4, 0.9, 1.8, { pointed: true, glass: PAL.glassDark, frame: WHITE }); }
  }

  // ---- end blocks with pyramid-capped corner towers ----
  for (const sx of [-1, 1]) {
    const tx = sx * 12.3;
    k.box(RED, 4.2, 7.6, 7.2, tx, 0, 0.2);
    k.box(WHITE, 4.34, 0.3, 7.34, tx, 0, 0.2);
    k.box(WHITE, 4.3, 0.22, 7.3, tx, 3.1, 0.2);
    k.box(WHITE, 4.5, 0.3, 7.5, tx, 7.6, 0.2);
    towerCap(k, 3.3, 2.5, tx, 7.9, 0.2);
    k.cyl(WHITE, 0.05, 0.05, 1.1, tx, 10.3, 0.2, { seg: 4 });
    // gabled bay on the front of the end tower
    k.extrude(WHITE, polyShape([[-1.6, 0], [1.6, 0], [0, 1.2]]), 0.3, tx, 7.6, 3.85);
    const f = k.face(tx, 0, 3.8, 0);
    f.window(0, 0.8, 1.5, 2.3, { glass: PAL.glassDark, frame: WHITE, bars: 1 });
    f.window(0, 4.2, 1.3, 2.4, { pointed: true, glass: PAL.glassDark, frame: WHITE, bars: 1 });
    const sf = k.face(tx + sx * 2.1, 0, 0.2, sx * Math.PI / 2);
    for (const u of [-1.6, 1.6]) { sf.window(u, 0.8, 0.9, 2.0, { glass: PAL.glassDark, frame: WHITE }); sf.window(u, 4.2, 0.9, 2.0, { pointed: true, glass: PAL.glassDark, frame: WHITE }); }
  }

  // ---- the tall central clock tower ----
  const TW = 4.4, TH = 11.0;
  k.box(RED, TW, TH, TW, 0, 0, 1.6);
  k.box(WHITE, TW + 0.2, 0.3, TW + 0.2, 0, 0, 1.6);
  for (const y of [3.4, 6.6, 9.0]) k.box(WHITE, TW + 0.16, 0.22, TW + 0.16, 0, y, 1.6);
  k.box(WHITE, TW + 0.45, 0.34, TW + 0.45, 0, TH, 1.6);
  // clock stage (red drum above the cornice) with the four faces
  k.box(RED, TW - 0.5, 3.0, TW - 0.5, 0, TH + 0.3, 1.6);
  k.box(WHITE, TW - 0.1, 0.26, TW - 0.1, 0, TH + 3.3, 1.6);
  const HS = (TW - 0.5) / 2; // half-width of the clock stage
  for (const [dx, dz, ry] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
    k.cyl(WHITE, 1.1, 1.1, 0.2, dx * HS, TH + 1.7, 1.6 + dz * HS, { seg: 12, rx: dz ? Math.PI / 2 : 0, rz: dx ? Math.PI / 2 : 0 });
    k.plane(clockFace(10, 10), 1.9, 1.9, [dx * (HS + 0.13), TH + 1.8, 1.6 + dz * (HS + 0.13)], ry);
  }
  towerCap(k, TW, 3.4, 0, TH + 3.5, 1.6);
  k.cyl(WHITE, 0.07, 0.07, 1.6, 0, TH + 6.8, 1.6, { seg: 4 });
  k.ball(PAL.gold, 0.14, 0, TH + 8.4, 1.6, { seg: 6, ring: 4 });
  // tower windows
  const tf = k.face(0, 0, 1.6 + TW / 2, 0);
  tf.window(0, 0.55, 2.0, 2.4, { glass: PAL.glassDark, frame: WHITE, bars: 1, sill: false });
  tf.window(-0.9, 3.9, 0.8, 1.9, { pointed: true, glass: PAL.glassDark, frame: WHITE }); tf.window(0.9, 3.9, 0.8, 1.9, { pointed: true, glass: PAL.glassDark, frame: WHITE });
  tf.window(-0.9, 6.9, 0.8, 1.7, { pointed: true, glass: PAL.glassDark, frame: WHITE }); tf.window(0.9, 6.9, 0.8, 1.7, { pointed: true, glass: PAL.glassDark, frame: WHITE });
  tf.window(0, 9.3, 0.9, 1.4, { glass: PAL.glassDark, frame: WHITE });
  // station name board on the canopy fascia
  const nm = bilingualBoard(5.2, 0.8, 'சென்னை சென்ட்ரல்', 'CHENNAI CENTRAL', { fill: '#f7f2e2', hatch: '#e5d9b0', tc: '#8e2a2a', taSize: 0.4, enSize: 0.22, px: 80 });
  k.plane(nm, 5.0, 0.76, [-7.4, 3.6, WD / 2 + 1.55], 0);
  k.plane(nm, 5.0, 0.76, [7.4, 3.6, WD / 2 + 1.55], 0);

  const g = k.finish({ lean: 0.005 });
  g.name = 'cst';
  g.userData = {
    footprint: 14,
    height: 17.4,
    colliders: [
      ...lineColliders(-13.5, 0, 13.5, 0, 3.4, 6, 3.4),
      { x: 0, z: 1.2, radius: 4.2, height: 8 },
      { x: -12.4, z: 1.5, radius: 3.0, height: 7 }, { x: 12.4, z: 1.5, radius: 3.0, height: 7 },
    ],
  };
  return g;
}
