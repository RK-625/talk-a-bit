// Osmania University Arts College (replaces the Rajabai Clock Tower; layout id 'rajabai'). Reference: Wikimedia Commons "Osmania Arts College",
// "Corridor in Ground floor of OU arts college". Buff-grey Deccan granite in big ashlar blocks, a tall central pointed-arch gateway with a stepped
// crown and slim domed turrets, deep two-storey arcades of square tapering pillars either side, maroon doors and shutters, a balustraded parapet.
// Local frame: front +Z. ~7 x 6 base, ~12 tall.
import * as THREE from 'three';
import { Kit, PAL, paintBoard, teText, latin, ringArch } from './kit.js';
import { archWall, chhatri, pointedShape, onion } from './parts.js';

const G = 0xc9bba6, GL = 0xdcd0bd, GD = 0xa89984, MAROON = 0x8a3a34, DARK = 0x5a4a46;

export function createRajabai(ink) {
  const k = new Kit(ink, { hatch: 0.16, seed: 51 });
  k.base(7, 7, { color: PAL.stone });

  // plinth + steps
  k.box(GD, 6.6, 0.5, 6.0, 0, 0, 0);
  k.box(GL, 5.4, 0.2, 0.7, 0, 0, 3.35); k.box(GL, 4.8, 0.2, 0.5, 0, 0.2, 3.1);
  // two storeys of the wings: block + open arcade of square pillars along the front
  k.box(G, 6.4, 6.2, 3.2, 0, 0.5, -1.3);
  k.box(GL, 6.6, 0.28, 3.4, 0, 3.6, -1.3);
  k.box(GL, 6.7, 0.4, 3.5, 0, 6.7, -1.3);
  for (let i = 0; i < 12; i++) k.box(GL, 0.22, 0.55, 0.16, -3.0 + i * 0.55, 7.1, 0.38); // balustrade
  k.box(GL, 6.4, 0.1, 0.16, 0, 7.1, 0.38);
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) {
    const x = sx * (1.75 + i * 0.78);
    // ground arcade piers (tapering up), upper arcade piers
    k.box(G, 0.46, 2.9, 0.46, x, 0.5, 0.75); k.box(GD, 0.58, 0.16, 0.58, x, 0.5, 0.75);
    k.box(G, 0.4, 2.6, 0.4, x, 4.0, 0.75); k.box(GD, 0.5, 0.14, 0.5, x, 3.5, 0.75);
    k.box(GL, 0.62, 0.18, 0.62, x, 3.42, 0.75); k.box(GL, 0.6, 0.18, 0.6, x, 6.55, 0.75);
  }
  // maroon doors and shutters behind the arcades
  for (const [ox, oz, ry] of [[0, 0.3, 0], [0, -2.9, Math.PI], [3.2, -1.3, Math.PI / 2], [-3.2, -1.3, -Math.PI / 2]]) {
    const f = k.face(ox, 0.5, oz, ry);
    for (const u of (oz === 0.3 ? [-2.7, -1.9, -1.1, 1.1, 1.9, 2.7] : [-2.0, -0.7, 0.7, 2.0])) { f.window(u, 0.3, 0.55, 1.6, { glass: MAROON, frame: GL, rect: true, bars: 1, sill: false }); f.window(u, 4.2, 0.55, 1.5, { glass: MAROON, frame: GL, rect: true, bars: 1 }); }
  }
  // the central gateway: a tall projecting block with a pointed arch
  const CZ = 1.3;
  k.extrude(G, archWall(3.4, 9.2, 1.05, 2.6, 4.2), 1.8, 0, 0.5, CZ);
  k.extrude(GL, ringArch(1.05, 1.42, 2.6, true), 0.2, 0, 0.5, CZ + 0.95);
  k.box(DARK, 2.0, 3.4, 0.4, 0, 0.5, CZ - 0.3, { outline: false });
  const door = k.face(0, 0.5, CZ - 0.02, 0);
  door.window(0, 0.0, 1.3, 2.7, { pointed: true, glass: MAROON, frame: GL, bars: 1, sill: false });
  k.box(GL, 3.8, 0.4, 2.1, 0, 9.7, CZ);                          // gateway cornice
  k.box(G, 2.8, 0.9, 1.4, 0, 10.1, CZ);                          // attic
  for (let i = 0; i < 6; i++) k.box(GL, 0.28, 0.3, 0.2, -1.2 + i * 0.48, 11.0, CZ + 0.62);
  onion(k, GL, 0.8, 0, 11.0, CZ, { seg: 9, tall: 0.9 });
  k.cone(PAL.gold, 0.05, 0.6, 0, 12.15, CZ, { seg: 4 });
  // slim domed turrets flanking the gateway, and chhatris at the wing corners
  for (const sx of [-1, 1]) {
    k.cyl(G, 0.34, 0.42, 7.0, sx * 1.95, 3.0, CZ + 0.3, { seg: 6 }); k.cyl(GL, 0.44, 0.44, 0.16, sx * 1.95, 9.9, CZ + 0.3, { seg: 6 });
    onion(k, GL, 0.4, sx * 1.95, 10.05, CZ + 0.3, { seg: 6, tall: 1.0 });
    chhatri(k, sx * 2.8, 7.15, -0.1, 0.8, { col: G, light: GL, dome: GL });
  }
  // arched upper-storey window in the gateway
  const gf = k.face(0, 0.5, CZ + 0.9, 0);
  gf.window(0, 5.3, 1.2, 1.8, { pointed: true, glass: MAROON, frame: GL, bars: 1 });
  // sign board between arch and window
  const nb = paintBoard(3.0, 0.75, '#f6efd8', '#e0cf9a', (ctx, W, H) => { teText(ctx, 'ఉస్మానియా ఆర్ట్స్ కాలేజీ', W * 0.5, H * 0.5, H * 0.36, { color: '#7a2f2f', }); latin(ctx, 'OSMANIA ARTS COLLEGE', W * 0.5, H * 0.9, H * 0.2, { color: '#2b2440' }); }, { seed: 51, px: 100 });
  k.box(PAL.ink, 3.05, 0.78, 0.06, 0, 8.55, CZ + 0.92);
  k.plane(nb, 3.0, 0.75, [0, 8.55, CZ + 0.97], 0);

  const g = k.finish({ lean: 0.004 });
  g.name = 'rajabai';
  g.userData = { footprint: 3.5, height: 12.8, colliders: [{ x: 0, z: 0, radius: 2.9, height: 12 }] };
  void THREE; void pointedShape;
  return g;
}
