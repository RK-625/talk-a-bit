// Attara Kacheri (replaces the Rajabai Clock Tower; layout id 'rajabai'): the old High Court in Pompeian red, with a tall
// colonnade of white columns, a pediment, a small cupola and arched windows. Local frame: front +Z. ~6.4 x 6 base, ~13 tall.
import * as THREE from 'three';
import { Kit, PAL, polyShape, bilingualBoard } from './kit.js';

const RED = 0xc4504a, RED_D = 0xa23f3b, WHITE = 0xf8f2e2, STONE = 0xe6dccb;

export function createRajabai(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 51 });
  k.base(7, 7, { color: PAL.stone });

  // plinth, two storeys of red walls
  k.box(STONE, 6.4, 0.5, 6.0, 0, 0, 0);
  k.box(RED, 5.6, 8.0, 5.0, 0, 0.5, -0.2);
  k.box(WHITE, 5.8, 0.28, 5.2, 0, 4.4, -0.2);                // string course
  k.box(WHITE, 5.9, 0.4, 5.3, 0, 8.5, -0.2);                 // cornice
  for (let i = 0; i < 10; i++) k.box(WHITE, 0.22, 0.5, 0.2, -2.5 + i * 0.55, 8.9, 2.45);
  // colonnade across the front: full-height white columns carrying a pediment
  const CZ = 2.75;
  for (let i = 0; i < 6; i++) {
    const x = -2.4 + i * 0.96;
    k.cyl(WHITE, 0.2, 0.23, 6.8, x, 0.5, CZ, { seg: 8 });
    k.box(WHITE, 0.56, 0.2, 0.56, x, 7.3, CZ);
    k.box(STONE, 0.6, 0.18, 0.6, x, 0.5, CZ);
  }
  k.box(WHITE, 5.6, 0.7, 1.0, 0, 7.5, CZ - 0.05);           // entablature
  k.extrude(WHITE, polyShape([[-2.95, 0], [2.95, 0], [0, 1.5]]), 1.1, 0, 8.2, CZ - 0.05);   // pediment
  k.extrude(RED_D, polyShape([[-2.35, 0.05], [2.35, 0.05], [0, 1.1]]), 1.14, 0, 8.28, CZ - 0.05);
  // front steps
  k.box(STONE, 5.4, 0.2, 0.7, 0, 0, 3.55); k.box(STONE, 5.0, 0.2, 0.5, 0, 0.2, 3.3);
  // arched windows behind the colonnade and on the other faces
  for (const [ox, oz, ry] of [[0, 2.3, 0], [0, -2.7, Math.PI], [2.8, -0.2, Math.PI / 2], [-2.8, -0.2, -Math.PI / 2]]) {
    const f = k.face(ox, 0.5, oz, ry);
    for (const u of [-1.7, -0.6, 0.6, 1.7]) {
      f.window(u, 0.5, 0.7, 2.0, { glass: PAL.glassDark, frame: WHITE, bars: 1 });
      f.window(u, 4.6, 0.7, 2.0, { glass: PAL.glassDark, frame: WHITE, bars: 1 });
    }
  }
  // central door behind the colonnade
  const door = k.face(0, 0.5, 2.31, 0);
  door.window(0, 0.0, 1.3, 2.6, { glass: 0x5a2f2a, frame: WHITE, bars: 1, sill: false });
  // roof: low hip + a small cupola with a spire
  k.add(new THREE.ConeGeometry(1, 1.3, 4, 1).rotateY(Math.PI / 4).scale(3.6, 1, 3.3), RED_D, { pos: [0, 8.7 + 0.65, -0.2] });
  for (const [dx, dz] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) k.cyl(WHITE, 0.07, 0.09, 1.0, dx, 9.9, dz - 0.2, { seg: 5 });
  k.box(WHITE, 1.2, 0.14, 1.2, 0, 10.9, -0.2);
  k.dome(WHITE, 0.62, 0, 11.0, -0.2, { seg: 8, ring: 4, sy: 1.1 });
  k.cone(PAL.gold, 0.06, 0.6, 0, 11.7, -0.2, { seg: 5 });
  // sign board on the pediment
  const nb = bilingualBoard(3.4, 0.8, 'ಅಟ್ಟಾರ ಕಚೇರಿ', 'ATTARA KACHERI', { fill: '#f6efd8', hatch: '#e0cf9a', kc: '#8a2f2f', knSize: 0.5, enSize: 0.2, seed: 51 });
  k.plane(nb, 3.4, 0.8, [0, 7.0, CZ + 0.5], 0);
  k.box(PAL.ink, 3.5, 0.85, 0.08, 0, 7.0 - 0.0, CZ + 0.44);

  const g = k.finish({ lean: 0.004 });
  g.name = 'rajabai';
  g.userData = { footprint: 3.5, height: 12.6, colliders: [{ x: 0, z: 0, radius: 2.9, height: 12 }] };
  return g;
}
