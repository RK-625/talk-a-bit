// Jew Town synagogue clock tower, Mattancherry: a small whitewashed square tower with a dark-blue clock dial (Roman numerals), two
// little blue-shuttered windows, a louvred vent, a deep hipped terracotta roof, and on top a tiny open belfry with a bell, a balustrade,
// a timber-eaved cap and a wrought-iron weathervane. Flanked by low whitewashed lane houses with tiled roofs, on a paved square with a
// kerb to sit on. Photo: Wikimedia Commons "Clock Tower Jewish Synagogue, Fort Kochi.jpg".
// (Replaces the Valluvar Kottam chariot; same footprint.) Local frame: front +Z. ~8.8 wide, ~9 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, bilingualBoard, clockFace } from './kit.js';

const WALL = 0xf5f1e6, WALL_D = 0xdcd6c6, TILE = 0xa94a35, TILE_D = 0x853a2b, TIM = 0x5f4330, BLUE = 0x5b7fa6, DIAL = '#2b3a4a', IRON = 0x2f2c33, COPPER = 0x7fb59a;

export function createFloraFountain(ink) {
  const k = new Kit(ink, { hatch: 0.12, seed: 61 });
  // paved square with a low stone kerb that doubles as a seat (sitters at |x| = 4.6)
  k.lathe(PAL.stone, [[0, -1.0], [4.5, -1.0], [4.5, 0.0], [4.2, 0.05], [0, 0.05]], 0, 0, 0, { seg: 22 });
  k.lathe(0xd4c8ae, [[4.0, 0.0], [4.0, 0.42], [4.8, 0.42], [4.8, 0.0]], 0, 0, 0, { seg: 22 });
  k.disc(0xe3d6b8, 3.9, 0, 0.06, 0, { seg: 22 });

  // ---- the tower ----
  const TW = 2.9, TH = 5.4, TZ = -0.2;
  k.box(WALL_D, TW + 0.3, 0.5, TW + 0.3, 0, 0.05, TZ);
  k.box(WALL, TW, TH, TW, 0, 0.55, TZ);
  k.box(WALL_D, TW + 0.2, 0.14, TW + 0.2, 0, 2.6, TZ);        // band under the clock
  k.box(TIM, TW + 0.9, 0.18, TW + 0.9, 0, TH + 0.5, TZ);      // timber eave plate
  k.hip(TILE, TW + 1.0, TW + 1.0, 1.7, 0, TH + 0.62, TZ, { inset: TW * 0.5 + 0.02 });
  const f = k.face(0, 0.55, TZ + TW / 2, 0);
  // clock on a stone plinth bracket (dark blue dial, as in the photo), shuttered windows either side, a louvred vent below
  k.box(WALL_D, 1.5, 0.12, 0.28, 0, 3.55, TZ + TW / 2 + 0.05);
  k.plane(clockFace(10, 10, { dial: DIAL, ring: '#e8e2cc', px: 160 }), 1.2, 1.2, [0, 4.35, TZ + TW / 2 + 0.07], 0);
  f.window(-1.05, 3.1, 0.5, 0.95, { rect: true, glass: BLUE, frame: WALL_D, bars: 1, sill: true });
  f.window(1.05, 3.1, 0.5, 0.95, { rect: true, glass: BLUE, frame: WALL_D, bars: 1, sill: true });
  f.window(0, 1.2, 1.1, 0.9, { rect: true, glass: 0x56657a, frame: WALL_D, bars: 1, sill: false });
  for (const [ox, oz, ry] of [[0, -TW / 2, Math.PI], [TW / 2, 0, Math.PI / 2], [-TW / 2, 0, -Math.PI / 2]]) {
    const sf = k.face(ox, 0.55, TZ + oz, ry);
    sf.window(-0.7, 3.1, 0.5, 0.95, { rect: true, glass: BLUE, frame: WALL_D, bars: 1 }); sf.window(0.7, 3.1, 0.5, 0.95, { rect: true, glass: BLUE, frame: WALL_D, bars: 1 });
  }
  k.plane(clockFace(10, 10, { dial: DIAL, ring: '#e8e2cc', px: 160 }), 1.2, 1.2, [0, 4.9, TZ - TW / 2 - 0.07], Math.PI);
  // ---- belfry: four posts, a balustrade, a bell, a timber cap with a small copper-green roof and a vane ----
  const BY = TH + 0.62 + 1.7;
  k.box(WALL_D, 1.4, 0.2, 1.4, 0, BY - 0.05, TZ);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(WALL, 0.16, 1.0, 0.16, sx * 0.55, BY + 0.15, TZ + sz * 0.55);
  for (let i = 0; i < 4; i++) for (const s of [-1, 1]) { k.box(WALL, 0.07, 0.42, 0.07, -0.45 + i * 0.3, BY + 0.15, TZ + s * 0.55, { outline: false }); k.box(WALL, 0.07, 0.42, 0.07, s * 0.55, BY + 0.15, TZ - 0.45 + i * 0.3, { outline: false }); }
  k.cyl(PAL.brass, 0.14, 0.3, 0.45, 0, BY + 0.55, TZ, { seg: 8 });
  k.box(TIM, 1.8, 0.14, 1.8, 0, BY + 1.15, TZ);
  k.hip(COPPER, 1.9, 1.9, 0.6, 0, BY + 1.27, TZ, { inset: 0.85 });
  k.rod(IRON, [0, BY + 1.85, TZ], [0, BY + 2.9, TZ], 0.03, { outline: true });
  k.rod(IRON, [-0.3, BY + 2.5, TZ], [0.3, BY + 2.5, TZ], 0.03);
  k.ball(IRON, 0.12, 0, BY + 2.1, TZ, { seg: 5, ring: 4 });
  k.flat(0xf1ede0, new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.55, 0.1), new THREE.Vector2(0, 0.32)]), 0.03, BY + 2.65, TZ);

  // ---- low lane houses either side, behind: whitewashed, tiled, shuttered (as in the photo) ----
  for (const sx of [-1, 1]) {
    const x = sx * 2.9, z = -2.2;
    k.box(WALL_D, 2.9, 0.35, 2.0, x, 0.05, z);
    k.box(WALL, 2.8, 2.6, 1.9, x, 0.4, z);
    k.box(TIM, 3.6, 0.14, 2.8, x, 3.0, z);
    k.hip(TILE, 3.6, 2.8, 1.1, x, 3.1, z, { inset: 0.7 });
    const hf = k.face(x, 0.4, z + 0.95, 0);
    hf.window(-0.6, 0.5, 0.55, 1.0, { rect: true, glass: 0x7a5a3e, frame: WALL_D, bars: 1 }); hf.window(0.6, 0.5, 0.55, 1.0, { rect: true, glass: 0x7a5a3e, frame: WALL_D, bars: 1 });
  }
  // town sign
  k.cyl(TIM, 0.06, 0.07, 1.5, -1.9, 0.05, 2.6, { seg: 5 }); k.cyl(TIM, 0.06, 0.07, 1.5, 1.9, 0.05, 2.6, { seg: 5 });
  k.box(0xf6efd8, 4.0, 0.7, 0.08, 0, 1.0, 2.6);
  k.plane(bilingualBoard(3.9, 0.66, 'ജൂത ടൗൺ', 'JEW TOWN · MATTANCHERRY', { fill: '#f6efd8', hatch: '#e0d5b0', tc: '#7a2f2f', taSize: 0.5, enSize: 0.22, px: 80 }), 3.9, 0.66, [0, 1.35, 2.66], 0);

  const g = k.finish({ lean: 0.003 });
  g.name = 'floraFountain';
  g.userData = {
    footprint: 4.6,
    height: 9.2,
    colliders: [{ x: 0, z: 0, radius: 4.1, height: 1.2 }, { x: 0, z: TZ, radius: 2.2, height: 9 }, ...[-1, 1].map((sx) => ({ x: sx * 2.9, z: -2.2, radius: 1.9, height: 3.2 })), ...lineColliders(-1.9, 2.6, 1.9, 2.6, 0.3, 2, 1.0)],
  };
  void WALL_D;
  return g;
}
