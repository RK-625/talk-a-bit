// Flora Fountain: round basin, tiered stone fountain, Flora statue on top, blue water. Local frame, ~8.4 wide x ~6.4 tall.
import { Kit, PAL } from './kit.js';

const STONE = 0xe9e2d2, STONE_D = 0xcfc7b4;

export function createFloraFountain(ink) {
  const k = new Kit(ink, { hatch: 0.12, seed: 61 });
  // foundation + two round steps
  k.lathe(PAL.stone, [[0, -1.0], [4.4, -1.0], [4.4, -0.0], [4.1, 0.05], [0, 0.05]], 0, 0, 0, { seg: 20 });
  k.lathe(STONE_D, [[3.9, 0.0], [3.9, 0.35], [3.7, 0.4], [3.1, 0.4], [3.1, 0.0]], 0, 0, 0, { seg: 20 });
  // basin wall + water
  k.lathe(STONE, [[3.1, 0.3], [3.3, 0.35], [3.3, 0.95], [3.05, 1.05], [2.85, 0.95], [2.85, 0.5], [0, 0.5]], 0, 0, 0, { seg: 20 });
  k.disc(PAL.water, 2.85, 0, 0.82, 0, { seg: 20 });
  // central column
  k.lathe(STONE, [[0, 0.5], [1.0, 0.5], [0.9, 0.9], [0.6, 1.6], [0.5, 3.0], [0.62, 3.1], [0.5, 3.2], [0, 3.2]], 0, 0, 0, { seg: 12 });
  // lower bowl
  k.lathe(STONE, [[0.4, 1.6], [1.9, 1.75], [2.0, 2.0], [1.85, 2.05], [1.7, 1.95], [0.5, 1.95]], 0, 0, 0, { seg: 16 });
  k.disc(PAL.water, 1.75, 0, 2.0, 0, { seg: 16 });
  // upper bowl
  k.lathe(STONE, [[0.3, 3.0], [1.1, 3.15], [1.2, 3.35], [1.05, 3.4], [0.9, 3.3], [0.4, 3.3]], 0, 0, 0, { seg: 14 });
  // putti / dolphins as simple lumps round the basin edge
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * 6.283 + 0.4, x = Math.sin(a) * 2.2, z = Math.cos(a) * 2.2;
    k.cyl(STONE, 0.2, 0.28, 0.6, x, 0.95, z, { seg: 6 });
    k.ball(STONE, 0.27, x, 1.65, z, { seg: 7, ring: 5 });
    // water arcs
    k.cone(PAL.water, 0.1, 0.9, x * 0.8, 1.4, z * 0.8, { seg: 5, rz: 0, outline: false });
  }
  // Flora: pedestal + robed figure + raised arm with a wreath
  k.cyl(STONE_D, 0.45, 0.5, 0.7, 0, 3.3, 0, { seg: 8 });
  k.cone(STONE, 0.7, 1.9, 0, 4.0, 0, { seg: 9 });
  k.cyl(STONE, 0.26, 0.4, 0.6, 0, 5.6, 0, { seg: 8 });
  k.ball(STONE, 0.26, 0, 6.45, 0, { seg: 8, ring: 6 });
  k.cyl(STONE, 0.08, 0.1, 0.9, 0.36, 6.1, 0, { seg: 5, rz: -0.6 });
  k.ball(PAL.pink, 0.22, 0.62, 6.6, 0, { seg: 6, ring: 4 }); // flowers
  k.ball(PAL.butter, 0.18, -0.4, 5.6, 0.05, { seg: 6, ring: 4 });
  // jet from the top
  k.cone(PAL.water, 0.12, 0.7, 0, 3.4, 0.0, { seg: 5, outline: false });

  const g = k.finish({ lean: 0.003 });
  g.name = 'floraFountain';
  g.userData = {
    footprint: 4.6,
    height: 7.0,
    colliders: [{ x: 0, z: 0, radius: 4.1, height: 1.2 }, { x: 0, z: 0, radius: 0.9, height: 7.0 }],
  };
  return g;
}
