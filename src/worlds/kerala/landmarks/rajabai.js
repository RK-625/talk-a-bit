// St. Francis Church, Fort Kochi: the old Portuguese-era church with a weathered white facade and a curved, stepped baroque gable
// that narrows to a little bell gable and cross, a pinnacle at each shoulder, pilasters, a clock oculus, three arched wooden-shuttered
// windows and an arched doorway, behind a tiled nave roof. Photo: Wikimedia Commons "Fort Kochi - St. Francis Church.jpg".
// (Replaces the Madras High Court tower; same footprint.) Local frame: front +Z. 5.8 x ~6.5 base, ~10 tall.
import * as THREE from 'three';
import { Kit, PAL, polyShape, bilingualBoard, clockFace, ringArch } from './kit.js';

const WHITE = 0xf3f0e6, STAIN = 0xd8d4c6, SHADE = 0xe2ddcf, WOODB = 0x7a4a32, TILE = 0xa94a35, TILE_D = 0x853a2b;
const BS = 5.8, ND = 6.2; // facade width, nave depth

/** the stepped baroque gable silhouette (mirror-symmetric), base at y=0 */
function facadeShape() {
  const half = [[2.9, 0], [2.9, 5.0]];
  const s = new THREE.Shape();
  s.moveTo(-2.9, 0); s.lineTo(2.9, 0); s.lineTo(2.9, 5.0);
  s.quadraticCurveTo(2.9, 5.55, 2.35, 5.7);               // shoulder
  s.quadraticCurveTo(1.55, 5.85, 1.45, 6.7);              // concave S up to the middle gable
  s.lineTo(1.45, 7.3);
  s.quadraticCurveTo(1.4, 7.95, 0.85, 8.1);               // second step in
  s.lineTo(0.8, 8.9);
  s.quadraticCurveTo(0.75, 9.45, 0, 9.9);                 // bell gable top
  s.quadraticCurveTo(-0.75, 9.45, -0.8, 8.9);
  s.lineTo(-0.85, 8.1);
  s.quadraticCurveTo(-1.4, 7.95, -1.45, 7.3);
  s.lineTo(-1.45, 6.7);
  s.quadraticCurveTo(-1.55, 5.85, -2.35, 5.7);
  s.quadraticCurveTo(-2.9, 5.55, -2.9, 5.0);
  s.closePath();
  void half;
  return s;
}
function pinnacle(k, x, y, z, h = 1.3) {
  k.box(WHITE, 0.55, 0.5, 0.55, x, y, z);
  k.box(SHADE, 0.45, 0.2, 0.45, x, y + 0.5, z);
  k.cone(WHITE, 0.3, h - 0.7, x, y + 0.7, z, { seg: 4 });
}

export function createRajabai(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 51 });
  k.base(7, 7, { color: PAL.stone });
  const FZ = ND / 2 - 0.3; // facade plane z

  // ---- nave: whitewashed walls under a gabled tile roof running back (-Z) ----
  k.box(SHADE, BS - 0.1, 0.45, ND, 0, 0, -0.3);
  k.box(WHITE, BS - 0.3, 4.6, ND - 0.3, 0, 0.45, -0.45);
  k.box(0x6e4a33, BS + 0.2, 0.16, ND + 0.2, 0, 5.0, -0.3);
  k.extrude(TILE, polyShape([[-BS / 2 - 0.2, 0], [BS / 2 + 0.2, 0], [0, 1.5]]), ND + 0.3, 0, 5.1, -0.4, { ry: 0 });
  for (let i = 1; i < 6; i++) for (const sx of [-1, 1]) k.box(i % 2 ? TILE_D : 0xc0623f, 0.07, 0.05, ND + 0.4, sx * ((BS / 2 + 0.2) * (1 - i / 6)), 5.1 + (i / 6) * 1.4, -0.4, { outline: false });
  k.box(TILE_D, 0.22, 0.16, ND + 0.3, 0, 6.55, -0.4);
  // side windows (arched, shuttered)
  for (const [ox, ry] of [[BS / 2 - 0.15, Math.PI / 2], [-BS / 2 + 0.15, -Math.PI / 2]]) {
    const sf = k.face(ox, 0, -0.5, ry);
    for (const u of [-1.7, 0, 1.7]) sf.window(u, 1.6, 0.6, 1.7, { pointed: false, glass: WOODB, frame: WHITE, bars: 1 });
  }

  // ---- the facade ----
  k.extrude(WHITE, facadeShape(), 0.6, 0, 0, FZ);
  k.extrude(SHADE, facadeShape(), 0.1, 0, 0, FZ + 0.34);
  // cornices
  k.box(SHADE, BS + 0.3, 0.18, 0.8, 0, 1.55, FZ);
  k.box(SHADE, BS + 0.3, 0.18, 0.8, 0, 4.15, FZ);
  k.box(SHADE, 2.9, 0.15, 0.7, 0, 6.5, FZ);
  // pilasters
  for (const u of [-2.78, -1.4, 1.4, 2.78]) k.box(WHITE, 0.34, 5.0, 0.28, u, 0, FZ + 0.4);
  for (const u of [-1.4, 1.4]) k.box(WHITE, 0.3, 2.0, 0.26, u, 6.2, FZ + 0.38, { outline: false });
  const f = k.face(0, 0, FZ + 0.35, 0);
  for (const u of [-1.9, 0, 1.9]) f.window(u, 2.3, 0.75, 1.6, { pointed: false, glass: WOODB, frame: WHITE, bars: 1, sill: false });
  // arched doorway with a stone surround and steps
  k.extrude(0xe8e3d2, ringArch(0.78, 1.12, 1.55, false), 0.3, 0, 0, FZ + 0.42);
  f.window(0, 0.0, 1.55, 2.5, { pointed: false, glass: 0x3b2a20, frame: 0xe8e3d2, bars: 1, sill: false, n: 0.03 });
  for (let i = 0; i < 3; i++) k.box(PAL.stoneDark, 2.8 - i * 0.2, 0.12 * (3 - i), 0.5, 0, 0, FZ + 0.9 + i * 0.42);
  // clock oculus + the bell gable opening + cross
  k.plane(clockFace(10, 10, { dial: '#f1eedd' }), 0.9, 0.9, [0, 6.0, FZ + 0.4], 0);
  const bf = k.face(0, 8.0, FZ + 0.35, 0);
  bf.window(0, 0.2, 0.55, 0.9, { pointed: false, glass: 0x3a3430, frame: WHITE, sill: false });
  k.ball(PAL.brass, 0.14, 0, 8.45, FZ + 0.4, { seg: 6, ring: 4, outline: false });
  k.box(0x3a3430, 0.07, 0.7, 0.07, 0, 9.9, FZ + 0.3, { outline: false }); k.box(0x3a3430, 0.32, 0.07, 0.07, 0, 10.35, FZ + 0.3, { outline: false });
  // pinnacles at the two shoulders
  for (const sx of [-1, 1]) pinnacle(k, sx * 2.65, 5.0, FZ + 0.3, 1.5);
  // weathering streaks (stained plaster) as flat grey patches
  for (const [u, v, w, h] of [[2.2, 4.4, 0.5, 1.6], [-2.3, 3.2, 0.35, 1.1], [1.0, 7.1, 0.4, 0.8], [-2.0, 5.4, 0.5, 0.6]]) f.flat(STAIN, new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(w, 0), new THREE.Vector2(w * 0.8, h), new THREE.Vector2(0.1, h * 0.9)]), u, v, 0.02);
  // name plaque + a wayside stone cross on a pedestal
  k.plane(bilingualBoard(1.5, 0.5, 'സെന്റ് ഫ്രാൻസിസ് പള്ളി', 'ST. FRANCIS CHURCH', { fill: '#f6efd8', hatch: '#e0d5b0', tc: '#7a2f2f', taSize: 0.4, enSize: 0.2, px: 80 }), 1.5, 0.5, [-2.0, 1.15, FZ + 0.88], 0);
  k.box(PAL.stoneDark, 0.8, 0.5, 0.8, -1.2, 0, FZ + 1.5); k.box(SHADE, 0.5, 1.5, 0.5, -1.2, 0.5, FZ + 1.5); k.box(SHADE, 0.12, 0.8, 0.12, -1.2, 2.0, FZ + 1.5); k.box(SHADE, 0.55, 0.12, 0.12, -1.2, 2.45, FZ + 1.5);

  const g = k.finish({ lean: 0.005 });
  g.name = 'rajabai';
  g.userData = { footprint: 4.3, height: 10.6, colliders: [{ x: 0, z: 0, radius: 3.5, height: 10 }, ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => ({ x: sx * 2.9, z: sz * 2.9, radius: 0.9, height: 6 }))] };
  return g;
}
