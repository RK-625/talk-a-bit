// Lalbagh Glass House (replaces Flora Fountain; layout id 'flora'): white cast-iron frame, glass walls and a central glass dome
// with a lantern, a transept porch, planted beds and a round pond path. Fits the old ~8.8 x 8.8 pad; colliders unchanged. Front +Z.
import * as THREE from 'three';
import { Kit, PAL, polyShape } from './kit.js';

const IRON = 0xf8f6ef, IRON_D = 0xd8d4c8, GLASS = 0xbfe4de, GLASS_D = 0x8fc6c0, STONE = 0xe9e2d2;

export function createFloraFountain(ink) {
  const k = new Kit(ink, { hatch: 0.12, seed: 61 });
  // foundation (reaches under the curved ground) + round paved apron + low brick plinth
  k.lathe(PAL.stone, [[0, -1.0], [4.4, -1.0], [4.4, 0.0], [4.1, 0.05], [0, 0.05]], 0, 0, 0, { seg: 20 });
  k.lathe(STONE, [[3.9, 0.0], [3.9, 0.12], [3.0, 0.12], [3.0, 0.0]], 0, 0, 0, { seg: 20 });
  // flower beds ringing the corners
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * 6.283 + Math.PI / 4, x = Math.sin(a) * 3.55, z = Math.cos(a) * 3.55;
    k.cyl(0xc9705a, 0.5, 0.55, 0.22, x, 0.1, z, { seg: 8 });
    k.ball(PAL.pink, 0.36, x, 0.4, z, { seg: 7, ring: 5 }); k.ball(PAL.marigold, 0.2, x + 0.2, 0.55, z - 0.1, { seg: 5, ring: 4, outline: false });
  }

  // two low stone benches at the sitters' spots
  for (const sx of [-1, 1]) { k.box(0xd9d0bc, 0.7, 0.4, 1.8, sx * 4.6, 0, 0); k.box(STONE, 0.9, 0.08, 2.0, sx * 4.6, 0.4, 0); }
  // main hall: low brick plinth, glass walls with iron mullions, pitched glass roof
  const HW = 4.4, HD = 2.6, WH = 1.9;
  k.box(0xd6c2a6, HW + 0.2, 0.55, HD + 0.2, 0, 0.1, 0);
  k.box(GLASS, HW, WH, HD, 0, 0.65, 0, { outline: false });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(IRON, 0.16, WH + 0.2, 0.16, sx * HW / 2, 0.6, sz * HD / 2);
  for (let i = 1; i < 8; i++) {
    const x = -HW / 2 + (HW * i) / 8;
    k.box(IRON, 0.07, WH, 0.07, x, 0.65, HD / 2 + 0.02, { outline: false });
    k.box(IRON, 0.07, WH, 0.07, x, 0.65, -HD / 2 - 0.02, { outline: false });
  }
  for (const y of [1.25, 1.95]) { k.box(IRON, HW + 0.1, 0.07, 0.07, 0, y, HD / 2 + 0.02, { outline: false }); k.box(IRON, HW + 0.1, 0.07, 0.07, 0, y, -HD / 2 - 0.02, { outline: false }); }
  // pitched glass roofs on both wings (ridge along x) + iron ribs
  const wing = (cx) => {
    k.extrude(GLASS_D, polyShape([[-HD / 2 - 0.2, 0], [HD / 2 + 0.2, 0], [0, 1.0]]), 1.7, cx, 0.65 + WH, 0, { ry: Math.PI / 2 });
    for (const dx of [-0.85, 0, 0.85]) k.extrude(IRON, polyShape([[-HD / 2 - 0.2, 0], [HD / 2 + 0.2, 0], [0, 1.0], [0, 0.9], [-HD / 2 - 0.05, 0.04]]), 0.06, cx + dx, 0.65 + WH + 0.01, 0, { ry: Math.PI / 2, outline: false });
  };
  wing(-1.45); wing(1.45);
  // central glass dome on an octagonal drum, iron ribs, gilded lantern
  k.cyl(GLASS, 1.45, 1.45, 0.9, 0, 0.65 + WH - 0.4, 0, { seg: 12, outline: true });
  k.cyl(IRON, 1.5, 1.5, 0.12, 0, 0.65 + WH - 0.4, 0, { seg: 12 });
  k.dome(GLASS_D, 1.4, 0, 0.65 + WH + 0.5, 0, { seg: 12, ring: 6, sy: 1.0 });
  for (let i = 0; i < 6; i++) k.add(new THREE.TorusGeometry(1.42, 0.035, 4, 12, Math.PI), IRON, { pos: [0, 0.65 + WH + 0.5, 0], rot: [0, (i / 6) * Math.PI, 0] });
  k.cyl(IRON, 0.22, 0.3, 0.55, 0, 0.65 + WH + 1.85, 0, { seg: 8 });
  k.cone(IRON_D, 0.32, 0.5, 0, 0.65 + WH + 2.4, 0, { seg: 8 });
  k.ball(PAL.gold, 0.1, 0, 0.65 + WH + 3.0, 0, { seg: 6, ring: 4 });
  // transept porch (front): small pitched glass gable with a door and steps
  k.box(GLASS, 1.5, 1.7, 1.0, 0, 0.65, HD / 2 + 0.5, { outline: false });
  k.extrude(GLASS_D, polyShape([[-0.85, 0], [0.85, 0], [0, 0.8]]), 1.1, 0, 2.35, HD / 2 + 0.5);
  for (const sx of [-1, 1]) k.box(IRON, 0.12, 1.8, 0.12, sx * 0.76, 0.6, HD / 2 + 1.0);
  k.box(0x6d8d86, 0.7, 1.3, 0.04, 0, 0.7, HD / 2 + 1.03, { outline: false });
  k.box(STONE, 2.2, 0.16, 0.6, 0, 0.1, HD / 2 + 1.35);
  // small flag on the dome lantern
  k.cyl(PAL.ink, 0.02, 0.02, 0.8, 0, 0.65 + WH + 3.05, 0, { seg: 4, outline: false });
  k.flat(PAL.kaRed, polyShape([[0, 0], [0.5, 0], [0.5, 0.2], [0, 0.2]]), 0.03, 0.65 + WH + 3.65, 0, {});
  k.flat(PAL.kaYellow, polyShape([[0, 0.2], [0.5, 0.2], [0.5, 0.4], [0, 0.4]]), 0.03, 0.65 + WH + 3.65, 0, {});

  const g = k.finish({ lean: 0.003 });
  g.name = 'floraFountain';
  g.userData = {
    footprint: 4.6,
    height: 7.0,
    colliders: [{ x: 0, z: 0, radius: 4.1, height: 1.2 }, { x: 0, z: 0, radius: 0.9, height: 7.0 }],
  };
  return g;
}
