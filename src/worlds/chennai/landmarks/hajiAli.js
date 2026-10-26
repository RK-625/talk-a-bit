// San Thome Basilica (Santhome), Chennai: the white neo-Gothic church with ONE very tall slender spire over its entrance tower,
// pointed arches with red-brown shutters, pinnacled buttresses along a tile-roofed nave, a gabled front aisle, standing on its
// walled courtyard island. (Replaces Haji Ali; same island footprint, same walkable ring, same causeway.)
// Local frame: entrance and causeway toward +Z. Island radius ~6.5, spire ~13 tall.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, archShape, mulberry32 } from './kit.js';

const WHITE = 0xfaf6ea, SHADE = 0xe9e3d3, GREEN = 0x7a6a58, STONE = 0xcfc6b6;

const RED_G = 0x8a3d30, TILE = 0xc9684a, LAWN = 0xe3dac6;
/** a slim Gothic pinnacle: shaft, ring, spire, tiny cross */
function pinnacle(k, x, y, z, h, w = 0.22) {
  k.cyl(WHITE, w, w * 1.3, h * 0.55, x, y, z, { seg: 6 });
  k.cyl(SHADE, w * 1.25, w * 1.25, 0.1, x, y + h * 0.55, z, { seg: 6 });
  k.cone(WHITE, w * 1.1, h * 0.55, x, y + h * 0.55 + 0.1, z, { seg: 6 });
  k.box(PAL.gold, 0.05, 0.28, 0.05, x, y + h + 0.1, z, { outline: false }); k.box(PAL.gold, 0.2, 0.05, 0.05, x, y + h + 0.22, z, { outline: false });
}
function gableShape(w, h) { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath(); return s; }

export function createHajiAli(ink) {
  const k = new Kit(ink, { hatch: 0.15, seed: 121 });
  const r = mulberry32(122);
  // island: stone ring + lumpy boulders
  k.cyl(STONE, 6.4, 6.9, 1.5, 0, -1.4, 0, { seg: 14 });
  k.disc(0xe3dac6, 6.3, 0, 0.1, 0, { seg: 14 });
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + r() * 0.2, rad = 6.5 + r() * 0.5, s = 0.6 + r() * 0.55;
    k.ball(i % 2 ? 0xc3baa8 : 0xd3cab9, s, Math.sin(a) * rad, -0.5 + s * 0.2, Math.cos(a) * rad, { seg: 6, ring: 4, sy: 0.75 });
  }
  // courtyard wall (gap at the front for the causeway) + gate arch
  const wallY = 0.1;
  const half = 4.8;
  k.box(WHITE, half * 2, 1.0, 0.35, 0, wallY, -half);
  k.box(WHITE, 0.35, 1.0, half * 2, -half, wallY, 0);
  k.box(WHITE, 0.35, 1.0, half * 2, half, wallY, 0);
  k.box(WHITE, half - 1.2, 1.0, 0.35, -(half + 1.2) / 2, wallY, half);
  k.box(WHITE, half - 1.2, 1.0, 0.35, (half + 1.2) / 2, wallY, half);
  for (let i = -4; i <= 4; i++) { k.box(SHADE, 0.32, 0.22, 0.4, i * 1.1, wallY + 1.0, -half); k.box(SHADE, 0.4, 0.22, 0.32, -half, wallY + 1.0, i * 1.1); k.box(SHADE, 0.4, 0.22, 0.32, half, wallY + 1.0, i * 1.1); }
  k.cyl(GREEN, 0.09, 0.09, 1.4, -1.0, wallY + 1.0, half, { seg: 5 });
  k.cyl(GREEN, 0.09, 0.09, 1.4, 1.0, wallY + 1.0, half, { seg: 5 });

  // ---- the church ----
  const Y0 = 0.1;
  k.box(SHADE, 6.0, 0.3, 7.6, 0, Y0, -0.5);                       // raised terrace
  // nave (long white hall with a tile roof) running toward -Z
  const NX = 3.6, NZ0 = -4.0, NZ1 = 1.4, NH = 3.5;
  k.box(WHITE, NX, NH, NZ1 - NZ0, 0, Y0 + 0.3, (NZ0 + NZ1) / 2);
  k.extrude(TILE, gableShape(NX + 0.5, 1.4), NZ1 - NZ0 + 0.3, 0, Y0 + 0.3 + NH, (NZ0 + NZ1) / 2);
  // low side aisles with pitched roofs and a row of pinnacled buttresses
  for (const sx of [-1, 1]) {
    k.box(WHITE, 1.3, 2.3, NZ1 - NZ0 - 0.4, sx * (NX / 2 + 0.6), Y0 + 0.3, (NZ0 + NZ1) / 2 - 0.2);
    k.add(new THREE.BoxGeometry(1.5, 0.12, NZ1 - NZ0).rotateZ(sx * 0.35), TILE, { pos: [sx * (NX / 2 + 0.55), Y0 + 0.3 + 2.55, (NZ0 + NZ1) / 2 - 0.2] });
    for (let i = 0; i < 5; i++) { const z = NZ0 + 0.5 + i * ((NZ1 - NZ0 - 1.1) / 4); k.box(SHADE, 0.22, 2.7, 0.34, sx * (NX / 2 + 1.28), Y0 + 0.3, z); pinnacle(k, sx * (NX / 2 + 1.28), Y0 + 3.0, z, 0.9, 0.12); }
    const f = k.face(sx * (NX / 2 + 1.26), Y0 + 0.3, (NZ0 + NZ1) / 2 - 0.2, sx * Math.PI / 2);
    for (let i = -1; i <= 1; i++) f.window(i * 1.45, 0.45, 0.5, 1.5, { pointed: true, glass: RED_G, frame: WHITE, bars: 1, sill: false });
  }
  // front: gabled aisle fronts either side of the tower, each with three pointed arches
  for (const sx of [-1, 1]) {
    const gx = sx * 2.35;
    k.box(WHITE, 2.8, 3.0, 0.6, gx, Y0 + 0.3, 1.9);
    k.extrude(WHITE, gableShape(2.8, 1.5), 0.55, gx, Y0 + 3.3, 1.9);
    k.box(SHADE, 0.2, 1.7, 0.3, gx + sx * 1.35, Y0 + 3.3, 2.05); // gable edge buttress
    const f = k.face(gx, Y0 + 0.3, 2.2, 0);
    for (const u of [-0.8, 0, 0.8]) f.window(u, 0.5, 0.5, 1.5, { pointed: true, glass: RED_G, frame: WHITE, bars: 1, sill: false });
    f.window(0, 2.3, 0.55, 0.8, { pointed: true, glass: RED_G, frame: WHITE });
    pinnacle(k, gx + sx * 1.55, Y0 + 3.0, 2.05, 1.5, 0.15);
  }
  // entrance tower and the single tall spire
  const TX = 0, TZ = 1.9;
  k.box(WHITE, 2.4, 5.2, 2.0, TX, Y0 + 0.3, TZ);
  k.box(SHADE, 2.6, 0.2, 2.2, TX, Y0 + 2.5, TZ);
  k.box(WHITE, 2.0, 2.6, 1.7, TX, Y0 + 5.5, TZ);
  k.box(SHADE, 2.55, 0.28, 2.15, TX, Y0 + 5.4, TZ);
  k.box(SHADE, 2.3, 0.18, 1.9, TX, Y0 + 8.1, TZ);
  const tf = k.face(TX, Y0 + 0.3, TZ + 1.0, 0);
  tf.window(0, 0.2, 1.0, 2.2, { pointed: true, glass: 0x4a2a22, frame: WHITE, bars: 1, sill: false });
  tf.window(0, 3.0, 0.6, 1.5, { pointed: true, glass: RED_G, frame: WHITE, bars: 1 });
  const bf = k.face(TX, Y0 + 5.5, TZ + 0.86, 0); bf.window(0, 0.5, 0.6, 1.4, { pointed: true, glass: RED_G, frame: WHITE, bars: 1 });
  for (const [ox, oz, ry] of [[0, -0.86, Math.PI], [1.0, 0, Math.PI / 2], [-1.0, 0, -Math.PI / 2]]) { const f = k.face(TX + ox, Y0 + 5.5, TZ + oz, ry); f.window(0, 0.5, 0.6, 1.4, { pointed: true, glass: RED_G, frame: WHITE, bars: 1 }); }
  // belfry balcony + four corner pinnacle turrets, then the spire
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) pinnacle(k, sx * 1.1, Y0 + 7.8, TZ + sz * 0.85, 1.9, 0.18);
  k.cone(WHITE, 1.22, 5.2, TX, Y0 + 8.25, TZ, { seg: 8 });
  k.cyl(SHADE, 0.12, 0.2, 0.35, TX, Y0 + 13.35, TZ, { seg: 6, outline: false });
  k.box(PAL.gold, 0.08, 0.7, 0.08, TX, Y0 + 13.6, TZ); k.box(PAL.gold, 0.4, 0.08, 0.08, TX, Y0 + 14.0, TZ);
  // back of the nave: apse with a small tile roof
  k.cyl(WHITE, 1.5, 1.6, 3.0, 0, Y0 + 0.3, NZ0 - 0.3, { seg: 8 });
  k.cone(TILE, 1.9, 1.3, 0, Y0 + 3.3, NZ0 - 0.3, { seg: 8 });
  // a pinnacle post at each of the four old corners (the saint's statue and candle towers)
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) pinnacle(k, sx * 3.9, Y0, sz * 3.9, 3.4, 0.28);
  // small cross over the gate
  k.box(WHITE, 0.14, 1.0, 0.14, 0, wallY + 1.0, half); k.box(WHITE, 0.5, 0.12, 0.14, 0, wallY + 1.6, half);

  const g = k.finish({ lean: 0.006 });
  g.name = 'hajiAli';
  g.userData = {
    footprint: 7.2,
    height: 14.6,
    colliders: [
      { x: 0, z: 1.9, radius: 1.5, height: 14 },
      { x: 0, z: -1.2, radius: 2.7, height: 5 }, { x: 0, z: -3.6, radius: 1.8, height: 4 },
      ...[[-3.9, 3.9], [3.9, 3.9], [-3.9, -3.9], [3.9, -3.9]].map(([x, z]) => ({ x, z, radius: 0.7, height: 4 })),
      ...lineColliders(-half, -half, half, -half, 0.5, 1.0, 1.0),
      ...lineColliders(-half, -half, -half, half, 0.5, 1.0, 1.0),
      ...lineColliders(half, -half, half, half, 0.5, 1.0, 1.0),
      ...lineColliders(-half, half, -1.3, half, 0.5, 1.0, 1.0),
      ...lineColliders(1.3, half, half, half, 0.5, 1.0, 1.0),
    ],
    walkable: [{ shape: 'circle', x: 0, z: 0, radius: 6.2, y: 0.1 }],
  };
  return g;
}

/** Walkable causeway piece along Z (centred): stone deck 2.4 wide, low walls, piers down into the sea. Top at y=0.1. */
export function createCauseway(ink, length = 4) {
  const k = new Kit(ink, { hatch: 0.12, thickness: 2.2, seed: 131 });
  const L = length, W = 2.4;
  k.box(0xe6dccb, W, 0.5, L, 0, -0.4, 0);
  k.box(0xf0e8d8, W - 0.6, 0.06, L, 0, 0.1, 0, { outline: false });
  const n = Math.max(1, Math.round(L / 1.2));
  for (let i = 0; i < n; i++) k.box(0xb9ad98, W - 0.7, 0.02, 0.05, 0, 0.16, ((i + 0.5) / n - 0.5) * L, { outline: false });
  for (const sx of [-1, 1]) {
    k.box(WHITE, 0.3, 0.55, L, sx * (W / 2 - 0.05), 0.1, 0);
    k.box(SHADE, 0.4, 0.1, L, sx * (W / 2 - 0.05), 0.65, 0);
  }
  // piers below the deck (reach the sea bed)
  for (const s of [-1, 1]) for (const sx of [-1, 1]) k.box(STONE, 0.5, 2.0, 0.6, sx * 0.85, -2.4, s * L * 0.25);
  const g = k.finish({ lean: 0 });
  g.name = 'causeway';
  g.userData = {
    footprint: L / 2 + 1,
    length: L,
    width: W,
    height: 0.8,
    colliders: [-1, 1].flatMap((sx) => lineColliders(sx * (W / 2 - 0.05), -L / 2, sx * (W / 2 - 0.05), L / 2, 0.28, 1.8, 0.6)),
    walkable: [{ shape: 'rect', x: 0, z: 0, w: W - 0.5, d: L, y: 0.1 }],
  };
  return g;
}
