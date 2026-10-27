// Ernakulam Junction (South) railway station, Kochi: a long cream-and-maroon two-storey station building with a wide steel-and-
// corrugated-sheet porch canopy on blue posts, tiled hip-roofed end blocks, the big blue name board (cream lettering + a Kathakali
// face logo) and the yellow platform-style station signboard with Malayalam / Hindi / English, plus a blue-and-yellow truss
// footbridge hint on the roof line. Photos: Wikimedia Commons "Ernakulam Junction railway station" (yellow board, truss
// footbridge, blue panels, grey sheet canopy) and "...station 2023.jpg" (blue name board with Kathakali logo).
// (Replaces the Chennai Central station; same footprint.) Local frame: front +Z. ~27 wide x 9 deep x ~11 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape, bilingualBoard, paintBoard, latin, taText, kathakaliCanvas, drawKathakali } from './kit.js';

const CREAM = 0xf2e6c2, MAROON = 0x9a3f33, MAROON_D = 0x7a3028, WHITE = 0xfaf6ea, BLUE = 0x2f5f9b, BLUE_D = 0x264d7e, SHEET = 0xb9bdc0, SHEET_D = 0x969a9e, YEL = 0xf2c230;

export function createCST(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 31 });
  k.base(27, 10, { color: PAL.stone });

  // ---- long two-storey hall: cream body, maroon plinth + band, low grey sheet roof ----
  const WL = 22, WD = 6.4, WH = 6.2;
  k.box(MAROON, WL, 0.9, WD, 0, 0, 0);
  k.box(CREAM, WL, WH - 0.9, WD, 0, 0.9, 0);
  k.box(MAROON_D, WL + 0.2, 0.3, WD + 0.2, 0, 3.0, 0);
  k.box(WHITE, WL + 0.4, 0.34, WD + 0.4, 0, WH, 0);
  k.extrude(SHEET, polyShape([[-WD * 0.5, 0], [WD * 0.5, 0], [0, 1.0]]), WL + 0.6, 0, WH + 0.34, 0, { ry: Math.PI / 2 });
  for (let i = -10; i <= 10; i++) k.box(SHEET_D, 0.07, 0.06, WD * 0.98, i * 1.05, WH + 0.4, 0, { outline: false }); // roof-sheet ribs
  // ground arcade doors/windows + upper windows
  const wf = k.face(0, 0, WD / 2, 0);
  for (let i = -6; i <= 6; i++) {
    const u = i * 1.6;
    if (Math.abs(u) < 3.2) continue;
    wf.window(u, 0.55, 1.0, 2.1, { pointed: false, glass: PAL.glassDark, frame: WHITE, bars: 1, sill: false });
    wf.window(u, 3.7, 0.9, 1.7, { rect: true, glass: PAL.glassDark, frame: WHITE, bars: 1 });
  }
  // the porch canopy: sloping corrugated sheet on steel posts painted blue (as on the platforms)
  const CZ = WD / 2 + 1.7;
  k.add(new THREE.BoxGeometry(WL - 1.6, 0.12, 3.6), SHEET, { pos: [0, 3.55, CZ - 0.1], rot: [0.12, 0, 0] });
  for (let i = -9; i <= 9; i++) k.box(SHEET_D, 0.06, 0.06, 3.6, i * 1.1, 3.6, CZ - 0.1, { rx: 0.12, outline: false });
  k.box(BLUE, WL - 1.4, 0.3, 0.14, 0, 3.0, CZ + 1.7);
  for (let i = -5; i <= 5; i++) { const u = i * 1.9; if (Math.abs(u) < 2.0) continue; k.cyl(BLUE, 0.09, 0.11, 3.1, u, 0, CZ + 1.6, { seg: 6 }); k.box(BLUE_D, 0.3, 0.12, 0.3, u, 0, CZ + 1.6); }
  // the big blue name board on the fascia: cream lettering + Kathakali logo
  const nm = paintBoard(6.2, 0.95, '#2b5a93', '#1f4673', (ctx, W, H) => {
    drawKathakali(ctx, W * 0.075, H * 0.55, H * 0.28, { crown: false });
    taText(ctx, 'എറണാകുളം ജങ്ഷൻ', W * 0.56, H * 0.52, H * 0.4, { color: '#f4e6bd', maxW: W * 0.78 });
    latin(ctx, 'ERNAKULAM Jn.', W * 0.56, H * 0.92, H * 0.3, { color: '#f4e6bd' });
  }, { seed: 14, px: 80 });
  k.plane(nm, 6.2, 0.95, [0, 5.2, WD / 2 + 0.2], 0);
  k.box(BLUE_D, 6.4, 1.1, 0.12, 0, 4.65, WD / 2 + 0.1);
  // rear and short faces
  for (const [ox, oz, ry, n] of [[0, -WD / 2, Math.PI, 6], [WL / 2, 0, Math.PI / 2, 2], [-WL / 2, 0, -Math.PI / 2, 2]]) {
    const f = k.face(ox, 0, oz, ry);
    for (let i = 0; i < n; i++) { const u = (i - (n - 1) / 2) * (n > 2 ? 3 : 2.4); f.window(u, 0.7, 0.9, 1.8, { rect: true, glass: PAL.glassDark, frame: WHITE }); f.window(u, 3.8, 0.9, 1.6, { rect: true, glass: PAL.glassDark, frame: WHITE }); }
  }

  // ---- end blocks: two storeys, tiled hip roofs, a Kathakali-red band ----
  for (const sx of [-1, 1]) {
    const tx = sx * 12.3;
    k.box(MAROON, 4.2, 0.9, 7.2, tx, 0, 0.2);
    k.box(CREAM, 4.2, 6.3, 7.2, tx, 0.9, 0.2);
    k.box(MAROON_D, 4.34, 0.3, 7.34, tx, 3.2, 0.2);
    k.box(WHITE, 4.6, 0.3, 7.6, tx, 7.2, 0.2);
    k.hip(0xa94a35, 5.0, 8.2, 2.3, tx, 7.4, 0.2, { inset: 1.6 });
    const f = k.face(tx, 0, 3.8, 0);
    f.window(0, 0.8, 1.4, 2.0, { glass: PAL.glassDark, frame: WHITE, bars: 1, sill: false });
    f.window(0, 4.0, 1.3, 2.0, { rect: true, glass: PAL.glassDark, frame: WHITE, bars: 1 });
    const sf = k.face(tx + sx * 2.1, 0, 0.2, sx * Math.PI / 2);
    for (const u of [-1.6, 1.6]) { sf.window(u, 0.8, 0.9, 2.0, { rect: true, glass: PAL.glassDark, frame: WHITE }); sf.window(u, 4.0, 0.9, 2.0, { rect: true, glass: PAL.glassDark, frame: WHITE }); }
  }

  // ---- central portico block with a clock and a low gable ----
  const TW = 4.6, TH = 8.4;
  k.box(MAROON, TW, 0.9, TW, 0, 0, 1.6);
  k.box(CREAM, TW, TH - 0.9, TW, 0, 0.9, 1.6);
  k.box(WHITE, TW + 0.4, 0.3, TW + 0.4, 0, TH, 1.6);
  k.extrude(WHITE, polyShape([[-TW / 2 - 0.2, 0], [TW / 2 + 0.2, 0], [0, 1.3]]), TW + 0.5, 0, TH + 0.3, 1.6, { ry: 0 });
  k.hip(SHEET, TW + 0.8, TW + 0.8, 1.6, 0, TH + 0.3, 1.6, { inset: 1.1 });
  k.plane(kathakaliCanvas(), 1.5, 1.5, [0, TH + 0.9, 1.6 + TW / 2 + 0.28], 0);
  const tf = k.face(0, 0, 1.6 + TW / 2, 0);
  tf.window(0, 0.55, 2.0, 2.4, { glass: PAL.glassDark, frame: WHITE, bars: 1, sill: false });
  tf.window(-1.0, 4.4, 0.8, 1.7, { rect: true, glass: PAL.glassDark, frame: WHITE }); tf.window(1.0, 4.4, 0.8, 1.7, { rect: true, glass: PAL.glassDark, frame: WHITE });

  // ---- steel truss footbridge hint across the back of the roof (blue + yellow), with a little yellow signboard in front ----
  k.box(BLUE, 10, 0.22, 1.6, 0, WH + 1.5, -WD / 2 - 0.9);
  for (let i = 0; i <= 10; i++) { k.rod(BLUE, [-5 + i * 1, WH + 1.7, -WD / 2 - 0.1], [-4.5 + i * 1, WH + 3.0, -WD / 2 - 0.1], 0.04, { outline: false }); k.rod(BLUE, [-4.5 + i * 1, WH + 3.0, -WD / 2 - 0.1], [-4 + i * 1, WH + 1.7, -WD / 2 - 0.1], 0.04, { outline: false }); }
  k.box(YEL, 10.2, 0.14, 0.14, 0, WH + 3.0, -WD / 2 - 0.1);
  for (const sx of [-5, 5]) k.cyl(BLUE, 0.12, 0.14, WH + 1.4, sx, 0, -WD / 2 - 0.9, { seg: 6 });
  // the yellow station signboard on two posts at the front left (Malayalam / Hindi / English)
  const yb = paintBoard(3.6, 1.35, '#f2c230', '#d9a81c', (ctx, W, H) => {
    taText(ctx, 'എറണാകുളം ജങ്ഷൻ', W / 2, H * 0.34, H * 0.3, { color: '#1f1a2e', maxW: W * 0.9 });
    taText(ctx, 'एर्णाकुलम जंक्शन', W / 2, H * 0.62, H * 0.22, { color: '#1f1a2e', maxW: W * 0.8 });
    latin(ctx, 'ERNAKULAM JUNCTION', W / 2, H * 0.88, H * 0.19, { color: '#1f1a2e' });
  }, { seed: 15, px: 80 });
  for (const sx of [-1.7, 1.7]) k.box(YEL, 0.18, 2.2, 0.18, -9.4 + sx, 0, 5.2);
  k.box(YEL, 3.8, 1.4, 0.12, -9.4, 0.9, 5.2);
  k.plane(yb, 3.6, 1.35, [-9.4, 1.6, 5.29], 0);

  const g = k.finish({ lean: 0.005 });
  g.name = 'cst';
  g.userData = {
    footprint: 14,
    height: 11,
    colliders: [
      ...lineColliders(-13.5, 0, 13.5, 0, 3.4, 6, 3.4),
      { x: 0, z: 1.2, radius: 4.2, height: 8 },
      { x: -12.4, z: 1.5, radius: 3.0, height: 7 }, { x: 12.4, z: 1.5, radius: 3.0, height: 7 },
    ],
  };
  return g;
}
