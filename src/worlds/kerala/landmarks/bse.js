// Aspinwall House, Fort Kochi: a long, low heritage spice warehouse (now a Biennale venue) on the waterfront. Weathered white-grey
// walls, a row of small arched ground-floor windows, a row of little square windows above, a dark-brown hipped tile roof, a central
// Dutch-baroque scroll-gable frontispiece with an arched door, black "ASPINWALL" lettering along the upper wall.
// The giant Kathakali mask sculpture (site prop 'bull', see props/siteDetails.js createBullStatue) stands in front of it.
// Photo: Wikimedia Commons "Aspinwall House, Fort Kochi.jpg" (scroll gable, black lettering, dark tiled roof, arched windows).
// (Replaces the Chennai Ripon Building; same footprint.) Local frame: front +Z. ~10.8 wide x 4.6 deep x ~7 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, paintBoard, latin, bilingualBoard } from './kit.js';

const WALL = 0xece7da, WALL_D = 0xcfc9b8, ROOF = 0x6f4636, ROOF_D = 0x553429, TIM = 0x5f4330, DARK = 0x3a3432, STONE = 0xa8a190;
const BW = 10.8, BD = 4.6, FH = 2.3, BH = FH * 2 + 0.2;

function scrollGable(w, h) {
  const s = new THREE.Shape(), a = w / 2;
  s.moveTo(-a, 0); s.lineTo(a, 0); s.lineTo(a, h * 0.42);
  s.quadraticCurveTo(a, h * 0.58, a * 0.55, h * 0.62);    // scroll in
  s.quadraticCurveTo(a * 0.55, h * 0.8, a * 0.28, h * 0.84);
  s.quadraticCurveTo(a * 0.2, h * 0.96, 0, h);
  s.quadraticCurveTo(-a * 0.2, h * 0.96, -a * 0.28, h * 0.84);
  s.quadraticCurveTo(-a * 0.55, h * 0.8, -a * 0.55, h * 0.62);
  s.quadraticCurveTo(-a, h * 0.58, -a, h * 0.42);
  s.closePath();
  return s;
}

export function createBSE(ink) {
  const k = new Kit(ink, { hatch: 0.14, seed: 41 });
  k.base(12, 8, { color: STONE });

  // ---- main warehouse block ----
  k.box(WALL_D, BW + 0.2, 0.45, BD + 0.2, 0, 0, 0);               // damp-stained plinth
  k.box(WALL, BW, BH - 0.45, BD, 0, 0.45, 0);
  k.box(WALL_D, BW + 0.16, 0.14, BD + 0.16, 0, FH, 0);             // string course
  k.box(TIM, BW + 1.0, 0.16, BD + 1.0, 0, BH, 0);                  // timber eaves
  k.hip(ROOF, BW + 1.0, BD + 1.0, 2.2, 0, BH + 0.1, 0, { inset: 1.7 });
  // black "ASPINWALL" lettering high on the wall, either side of the gable
  const lettering = paintBoard(3.0, 0.45, '#ece7da', '#ece7da', (ctx, W, H) => latin(ctx, 'ASPINWALL', W / 2, H * 0.8, H * 0.78, { color: '#2b2440' }), { px: 80, seed: 8, border: false, transparent: true });
  for (const sx of [-1, 1]) k.plane(lettering, 3.0, 0.45, [sx * 3.5, BH - 0.65, BD / 2 + 0.03], 0);
  // arched ground windows + small square upper windows
  const f = k.face(0, 0, BD / 2, 0);
  for (let i = -4; i <= 4; i++) {
    const u = i * 1.18;
    if (Math.abs(u) < 1.4) continue;
    f.window(u, 0.55, 0.5, 1.2, { pointed: false, glass: DARK, frame: WALL_D, bars: 0, sill: false });
    f.window(u, FH + 0.45, 0.42, 0.55, { rect: true, glass: DARK, frame: WALL_D, bars: 0, sill: false });
  }
  for (const [ox, ry] of [[BW / 2, Math.PI / 2], [-BW / 2, -Math.PI / 2]]) { const s = k.face(ox, 0, 0, ry); for (const u of [-1.2, 1.2]) { s.window(u, 0.55, 0.5, 1.2, { glass: DARK, frame: WALL_D, sill: false }); s.window(u, FH + 0.45, 0.42, 0.55, { rect: true, glass: DARK, frame: WALL_D, sill: false }); } }
  const rf = k.face(0, 0, -BD / 2, Math.PI);
  for (let i = -4; i <= 4; i++) rf.window(i * 1.18, 0.55, 0.5, 1.2, { glass: DARK, frame: WALL_D, sill: false });
  // big black warehouse doors at the wing ends (cargo shutters)
  for (const sx of [-1, 1]) f.box(DARK, sx * 4.7, 0.45, 1.0, 1.7, 0.05, 0.02);

  // ---- central scroll-gable frontispiece ----
  const GW = 2.8, GH = 4.6;
  k.box(WALL, GW, BH - 0.4, 0.5, 0, 0.45, BD / 2 + 0.25);
  k.extrude(WALL, scrollGable(GW, GH), 0.5, 0, BH - 0.45, BD / 2 + 0.25);
  k.extrude(WALL_D, scrollGable(GW * 0.82, GH * 0.78), 0.1, 0, BH - 0.2, BD / 2 + 0.55);
  const gf = k.face(0, 0, BD / 2 + 0.5, 0);
  gf.window(0, 0.2, 1.0, 2.0, { pointed: false, glass: 0x4a3426, frame: WALL_D, bars: 1, sill: false });  // arched door
  gf.window(0, FH + 0.2, 0.7, 1.3, { pointed: false, glass: DARK, frame: WALL_D, bars: 0, sill: true });
  gf.window(0, BH + 0.3, 0.5, 0.9, { pointed: false, glass: DARK, frame: WALL_D, bars: 0, sill: false });
  for (let i = 0; i < 3; i++) k.box(STONE, 2.0 - i * 0.2, 0.13 * (3 - i), 0.45, 0, 0, BD / 2 + 0.85 + i * 0.4);
  // plaque by the door
  k.plane(bilingualBoard(1.4, 0.5, 'അസ്പിൻവാൾ ഹൗസ്', 'ASPINWALL HOUSE', { fill: '#f6efd8', hatch: '#e0d5b0', tc: '#7a2f2f', taSize: 0.42, enSize: 0.22, px: 80 }), 1.4, 0.5, [-2.6, 1.9, BD / 2 + 0.04], 0);

  const g = k.finish({ lean: 0.006 });
  g.name = 'bse';
  g.userData = {
    footprint: 7,
    height: 8.0,
    colliders: [
      ...lineColliders(-4.4, 0, 4.4, 0, 2.9, 3, 2.9),
      { x: 0, z: 0, radius: 3.0, height: 7 },
      { x: 0, z: 3.2, radius: 1.7, height: 3 },
    ],
  };
  return g;
}
