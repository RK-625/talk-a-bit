// Mattancherry (Dutch) Palace, Kochi: a long two-storey Kerala-Portuguese palace. Whitewashed lower walls, ochre-yellow upper
// walls with small arched wooden-shuttered windows, and one deep dark-terracotta hipped tile roof with big timber-lined eaves,
// a lower forward wing at each end with its own hipped roof, a plain central porch with steps, and a flagpole/antenna mast.
// Photo: Wikimedia Commons "Mattancherry Palace DSC 0899" (yellow walls, steep brown tiled hips, arched shutters, grass + laterite path).
// (Replaces Chepauk Palace; same footprint.) Local frame: front +Z. ~22 wide x 6 deep x ~9 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, bilingualBoard } from './kit.js';

const WHITE = 0xf3ecd9, OCHRE = 0xe9c26a, OCHRE_D = 0xcfa44a, TILE = 0xa94a35, TILE_D = 0x853a2b, TIM = 0x6e4a33, SHUT = 0x7a4a30, PLINTH = 0x6f6558;
const BW = 22, BD = 6, FH = 2.7, BH = FH * 2;

export function createTaj(ink) {
  const k = new Kit(ink, { hatch: 0.18, seed: 21 });
  k.base(BW + 1, BD + 1, { color: PAL.stone });

  // ---- main block: whitewashed ground floor, ochre first floor ----
  k.box(PLINTH, BW + 0.2, 0.5, BD + 0.2, 0, 0, 0);
  k.box(WHITE, BW, FH - 0.5, BD, 0, 0.5, 0);
  k.box(OCHRE, BW, FH, BD, 0, FH, 0);
  k.box(WHITE, BW + 0.16, 0.16, BD + 0.16, 0, FH - 0.08, 0);               // string course between the storeys
  // a deep hipped roof of dark terracotta tiles with a wide timber eave
  k.box(TIM, BW + 1.6, 0.18, BD + 1.6, 0, BH, 0);
  k.hip(TILE, BW + 1.6, BD + 1.6, 3.0, 0, BH + 0.12, 0, { inset: 2.35 });
  // gabled attic dormers on the front slope (as in the photo) and a ridge cap
  for (const u of [-5.5, 0, 5.5]) {
    k.box(OCHRE, 1.1, 0.8, 0.6, u, BH + 0.9, 1.0, { outline: false });
    k.add(new THREE.ConeGeometry(0.85, 0.55, 4, 1).rotateY(Math.PI / 4).scale(1.0, 1, 0.9), TILE_D, { pos: [u, BH + 1.55, 1.05] });
  }
  // ---- front face: arched shuttered windows, upper row larger ----
  const f = k.face(0, 0, BD / 2, 0);
  for (let i = -7; i <= 7; i++) {
    const u = i * 1.4;
    if (Math.abs(u) < 2.4) continue;
    f.window(u, 0.95, 0.6, 1.15, { rect: true, glass: SHUT, frame: WHITE, bars: 1, sill: true, jitter: 0.02 });
    f.window(u, FH + 0.65, 0.64, 1.35, { pointed: false, glass: SHUT, frame: WHITE, bars: 1, sill: true, jitter: 0.02 });
  }
  // central porch: a lower pitched-tile entrance with timber posts and steps
  k.box(WHITE, 4.4, 3.0, 1.8, 0, 0.5, BD / 2 + 0.9);
  k.box(TIM, 4.8, 0.16, 2.2, 0, 3.5, BD / 2 + 0.9);
  k.hip(TILE, 5.0, 2.4, 1.4, 0, 3.6, BD / 2 + 0.95, { inset: 1.0 });
  const pf = k.face(0, 0, BD / 2 + 1.8, 0);
  pf.window(0, 0.55, 1.0, 2.0, { glass: 0x3b2a20, frame: OCHRE_D, bars: 1, sill: false });
  for (const sx of [-1, 1]) k.cyl(TIM, 0.11, 0.13, 3.0, sx * 2.1, 0.5, BD / 2 + 1.9, { seg: 6 });
  for (let i = 0; i < 3; i++) k.box(PLINTH, 4.6 - i * 0.3, 0.14 * (3 - i), 0.55, 0, 0, BD / 2 + 2.0 + i * 0.5);
  // upper balcony slit over the porch
  const uf = k.face(0, FH, BD / 2 + 0.05, 0);
  uf.window(0, 0.65, 1.3, 1.6, { glass: SHUT, frame: WHITE, bars: 1 });
  // ---- end wings: lower, forward, each with its own hipped roof ----
  for (const sx of [-1, 1]) {
    const x = sx * (BW / 2 - 1.9), z = BD / 2 - 0.2;
    k.box(PLINTH, 3.9, 0.5, 3.1, x, 0, z + 0.7);
    k.box(OCHRE, 3.7, FH * 1.6 - 0.5, 2.9, x, 0.5, z + 0.7);
    k.box(TIM, 4.6, 0.16, 3.8, x, FH * 1.6, z + 0.7);
    k.hip(TILE, 4.6, 3.8, 1.9, x, FH * 1.6 + 0.1, z + 0.7, { inset: 0.9 });
    const wf = k.face(x, 0, z + 2.15, 0);
    wf.window(-0.8, 0.9, 0.62, 1.2, { rect: true, glass: SHUT, frame: WHITE, bars: 1 });
    wf.window(0.8, 0.9, 0.62, 1.2, { rect: true, glass: SHUT, frame: WHITE, bars: 1 });
    wf.window(0, 2.35, 0.64, 1.3, { glass: SHUT, frame: WHITE, bars: 1 });
  }
  // sides + back: sparse windows
  for (const [ox, oz, ry, n] of [[0, -BD / 2, Math.PI, 7], [BW / 2, 0, Math.PI / 2, 2], [-BW / 2, 0, -Math.PI / 2, 2]]) {
    const rf = k.face(ox, 0, oz, ry);
    for (let i = 0; i < n; i++) { const u = (i - (n - 1) / 2) * (n > 2 ? 2.8 : 2.2); rf.window(u, 0.95, 0.6, 1.1, { rect: true, glass: SHUT, frame: WHITE, bars: 1 }); rf.window(u, FH + 0.65, 0.62, 1.3, { glass: SHUT, frame: WHITE, bars: 1 }); }
  }
  // the flagpole / antenna mast in front, as in the photo
  k.cyl(0xcfd3d6, 0.05, 0.08, 7.5, -4.2, 0, BD / 2 + 3.6, { seg: 5 });
  k.cyl(PAL.stone, 0.25, 0.3, 0.3, -4.2, 0, BD / 2 + 3.6, { seg: 6 });
  // palace name board (on the ochre wall above the porch roof)
  pf.plane(bilingualBoard(3.4, 0.7, 'മട്ടാഞ്ചേരി കൊട്ടാരം', 'MATTANCHERRY PALACE', { fill: '#f6edd2', hatch: '#e5d6a0', tc: '#7a2f2f', taSize: 0.4, enSize: 0.2, px: 80 }), 3.4, 0.7, 0, 2.95, 0.08);
  // a laterite path of red earth and a frangipani-ish tree is left to the scatter

  const g = k.finish({ lean: 0.006 });
  g.name = 'taj';
  g.userData = {
    footprint: 12,
    height: 9.4,
    colliders: [
      ...lineColliders(-9.6, 0, 9.6, 0, 3.3, BH + 1, 3.0),
      { x: 0, z: 1.8, radius: 2.4, height: 4 },
      ...[-1, 1].map((sx) => ({ x: sx * (BW / 2 - 1.9), z: 3.0, radius: 1.9, height: 4.6 })),
    ],
  };
  return g;
}
