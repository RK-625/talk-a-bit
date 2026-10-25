// Gateway of India: yellow-basalt triumphal arch on the harbour edge, four turrets, low central dome, steps to the water.
// Local frame: y up, base y=0, harbour (sea) toward +Z, arch passage runs along Z. ~9.6 wide x 4.6 deep x ~10.8 tall.
import * as THREE from 'three';
import { Kit, PAL, archShape, ringArch, rectShape, lineColliders } from './kit.js';

const W = 9.6, D = 4.6, H = 7.2;
const ARCH_W = 1.8, ARCH_SPRING = 3.7;

function bodyShape() {
  const s = new THREE.Shape();
  s.moveTo(-W / 2, 0); s.lineTo(-ARCH_W, 0); s.lineTo(-ARCH_W, ARCH_SPRING);
  // slightly pointed arch
  s.quadraticCurveTo(-ARCH_W, ARCH_SPRING + 1.9, 0, ARCH_SPRING + 2.2);
  s.quadraticCurveTo(ARCH_W, ARCH_SPRING + 1.9, ARCH_W, ARCH_SPRING);
  s.lineTo(ARCH_W, 0); s.lineTo(W / 2, 0); s.lineTo(W / 2, H); s.lineTo(-W / 2, H); s.closePath();
  return s;
}

export function createGateway(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 11 });
  const { basalt, basaltLight, basaltDark } = PAL;

  // quay plaza + steps down to the water (front, +Z)
  k.base(17, 12, { color: PAL.stone });
  for (let i = 0; i < 4; i++) { // each tread is a box from deep down up to its top
    const top = -0.05 - i * 0.2, z0 = 4.2 + i * 0.85;
    k.box(i % 2 ? PAL.stoneDark : PAL.stone, 9.6 - i * 0.2, top + 1.6, 0.85, 0, -1.6, z0 + 0.43);
  }
  // quay edge posts (bollards)
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.16, 0.2, 0.5, sx * 7.4, 0, 4.9, { seg: 6 });

  // main block with the arch tunnel
  k.extrude(basalt, bodyShape(), D, 0, 0, 0);
  // plinth course + string course + cornice
  k.box(basaltDark, W + 0.3, 0.7, D + 0.3, 0, 0, 0);
  k.box(basaltLight, W + 0.35, 0.28, D + 0.35, 0, 5.1, 0);
  k.box(basaltLight, W + 0.5, 0.42, D + 0.5, 0, H, 0);
  // parapet crenels
  for (let i = 0; i < 11; i++) {
    const x = -W / 2 + 0.2 + (i * (W - 0.4)) / 10;
    k.box(basaltLight, 0.5, 0.45, 0.4, x, H + 0.42, D / 2 + 0.05);
    k.box(basaltLight, 0.5, 0.45, 0.4, x, H + 0.42, -D / 2 - 0.05);
  }
  for (let i = 0; i < 5; i++) {
    const z = -D / 2 + 0.35 + (i * (D - 0.7)) / 4;
    k.box(basaltLight, 0.4, 0.45, 0.5, W / 2 + 0.05, H + 0.42, z);
    k.box(basaltLight, 0.4, 0.45, 0.5, -W / 2 - 0.05, H + 0.42, z);
  }

  // arch surround (front and back): a proud ring of lighter stone
  for (const sz of [1, -1]) {
    k.extrude(basaltLight, ringArch(ARCH_W, ARCH_W + 0.45, ARCH_SPRING, true), 0.3, 0, 0, sz * (D / 2 + 0.1), { ry: sz < 0 ? Math.PI : 0 });
  }
  // faces: windows + lattice (jali)
  for (const [oz, ry] of [[D / 2, 0], [-D / 2, Math.PI]]) {
    const f = k.face(0, 0, oz, ry);
    for (const sx of [-1, 1]) {
      const u = sx * 3.45;
      f.window(u, 1.0, 1.25, 2.5, { pointed: true, glass: PAL.glassDark, frame: basaltLight, bars: 1, sill: true });
      // jali lattice over the opening
      for (let i = -1; i <= 1; i++) f.box(basaltLight, u + i * 0.32, 1.0, 0.06, 2.1, 0.05, 0.05);
      for (let j = 0; j < 4; j++) f.box(basaltLight, u, 1.2 + j * 0.5, 1.2, 0.06, 0.05, 0.05);
      // upper small window pair
      f.window(u, 4.05, 0.85, 1.15, { pointed: false, glass: PAL.glassDark, frame: basaltLight, bars: 1 });
      // corner buttress ribs
      f.box(basaltDark, sx * 4.55, 0.7, 0.35, 5.9, 0.12);
    }
    // blind niches either side above the arch
    for (const sx of [-1, 1]) f.window(sx * 2.65, 5.65, 0.7, 1.0, { pointed: true, glass: PAL.basaltDark, frame: basaltLight, jitter: 0.02 });
    // little banner panel over the arch
    f.box(basaltDark, 0, 6.35, 2.2, 0.38, 0.1, 0.02);
  }
  // side walls: tall niches
  for (const [ox, ry] of [[W / 2, Math.PI / 2], [-W / 2, -Math.PI / 2]]) {
    const f = k.face(ox, 0, 0, ry);
    for (const u of [-1.2, 1.2]) f.window(u, 1.1, 0.95, 2.9, { pointed: true, glass: PAL.glassDark, frame: basaltLight, bars: 1 });
    f.window(0, 4.4, 1.0, 1.4, { glass: PAL.basaltDark, frame: basaltLight });
  }

  // central dome on an octagonal drum
  k.cyl(basaltLight, 2.25, 2.4, 0.9, 0, H + 0.4, 0, { seg: 8 });
  k.cyl(basaltDark, 2.3, 2.3, 0.14, 0, H + 1.3, 0, { seg: 8 });
  k.dome(PAL.sandstone, 2.2, 0, H + 1.4, 0, { seg: 8, ring: 5, sy: 0.88 });
  k.cyl(basaltDark, 0.14, 0.2, 0.55, 0, H + 1.4 + 1.9, 0, { seg: 6 });
  k.ball(PAL.gold, 0.2, 0, H + 1.4 + 2.5, 0, { seg: 6, ring: 4 });
  // drum windows
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    k.box(PAL.glassDark, 0.34, 0.5, 0.12, Math.sin(a) * 2.34, H + 0.6, Math.cos(a) * 2.34, { ry: a, outline: false });
  }

  // four corner turrets
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * 4.25, z = sz * 1.85, y = H + 0.4;
    k.cyl(basalt, 0.62, 0.74, 2.1, x, y, z, { seg: 8 });
    k.cyl(basaltLight, 0.78, 0.78, 0.2, x, y + 2.0, z, { seg: 8 });
    k.dome(PAL.sandstone, 0.74, x, y + 2.2, z, { seg: 8, ring: 4, sy: 1.05 });
    k.cone(PAL.gold, 0.1, 0.45, x, y + 2.95, z, { seg: 5 });
    // slit windows
    for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
      k.box(PAL.glassDark, 0.2, 0.7, 0.1, x + Math.sin(a) * 0.68, y + 0.8, z + Math.cos(a) * 0.68, { ry: a, outline: false });
    }
  }

  // pigeons on the quay edge and on the cornice
  const pig = (x, y, z, ry) => {
    k.ball(0xb9b6c8, 0.17, x, y + 0.17, z, { sx: 1, sy: 0.85, sz: 1.35, seg: 6, ring: 4, rz: 0, ry, outline: false });
    k.ball(0x9a97ae, 0.1, x + Math.sin(ry) * 0.16, y + 0.32, z + Math.cos(ry) * 0.16, { seg: 5, ring: 4, outline: false });
  };
  [[-3.2, 0.05, 5.8, 0.3], [-2.6, 0.05, 6.3, 1.2], [2.8, 0.05, 5.6, -0.6], [3.5, 0.05, 6.1, 2.4], [0.8, 0.05, 3.2, 3.1], [-5.1, H + 0.85, 1.9, 0.5], [5.2, H + 0.85, -1.9, 2.0]].forEach((p) => pig(...p));

  const g = k.finish({ lean: 0.006 });
  g.name = 'gateway';
  const cy = 5.0;
  g.userData = {
    footprint: 9,
    height: 10.8,
    // the arch passage (x in -1.8..1.8) stays open: two piers each
    colliders: [
      ...[-1, 1].flatMap((sx) => [-1.2, 1.2].map((z) => ({ x: sx * 3.35, z, radius: 1.45, height: H }))),
      { x: -4.4, z: 0, radius: 0.5, height: H }, { x: 4.4, z: 0, radius: 0.5, height: H },
      ...[-1, 1].map((sx) => ({ x: sx * 7.4, z: 4.9, radius: 0.25, height: 0.5 })),
    ],
    walkable: [{ shape: 'rect', x: 0, z: 0, w: 3.4, d: D, y: 0.05 }],
  };
  void cy;
  return g;
}
