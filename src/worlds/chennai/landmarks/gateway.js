// Fort St. George (Chennai): the cream-white Palladian "Fort House" on the harbour edge: a rusticated ground storey with a
// central gate passage, an upper storey of black Doric columns under triangular pediments and a balustrade, low wings,
// a pair of angled bastions with cannon at the back, and the tall flagstaff. (Replaces the Mumbai Gateway; same footprint,
// same open passage through the middle, same quay steps to the water.)
// Local frame: y up, base y=0, harbour (sea) toward +Z, passage runs along Z. ~9.6 wide x 4.6 deep.
import * as THREE from 'three';
import { Kit, PAL, archShape, ringArch, rectShape, polyShape, lineColliders, makeCanvas, handRng, bilingualBoard } from './kit.js';

const W = 9.6, D = 4.6, H1 = 4.5;      // ground storey
const W2 = 8.2, D2 = 3.9, H2 = 3.1;    // upper storey (columns)
const ARCH_W = 1.7, ARCH_SPRING = 2.5;
const WALL = 0xf3eddb, TRIM = 0xfffcf1, SHADE = 0xe0d8c2, COLUMN = 0x35333b, ROOF = 0xc9bfae;

function bodyShape() {
  const s = new THREE.Shape();
  s.moveTo(-W / 2, 0); s.lineTo(-ARCH_W, 0); s.lineTo(-ARCH_W, ARCH_SPRING);
  s.absarc(0, ARCH_SPRING, ARCH_W, Math.PI, 0, true);
  s.lineTo(ARCH_W, 0); s.lineTo(W / 2, 0); s.lineTo(W / 2, H1); s.lineTo(-W / 2, H1); s.closePath();
  return s;
}
function pediment(w, h) { return polyShape([[-w / 2, 0], [w / 2, 0], [0, h]]); }

function flagCanvas() {
  const { c, ctx } = makeCanvas(96, 64);
  ctx.fillStyle = '#f08a2e'; ctx.fillRect(0, 0, 96, 21);
  ctx.fillStyle = '#fbf8ee'; ctx.fillRect(0, 21, 96, 22);
  ctx.fillStyle = '#3f9b52'; ctx.fillRect(0, 43, 96, 21);
  ctx.strokeStyle = '#2f4f9a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(48, 32, 8, 0, 7); ctx.stroke();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.283; ctx.beginPath(); ctx.moveTo(48, 32); ctx.lineTo(48 + Math.cos(a) * 8, 32 + Math.sin(a) * 8); ctx.stroke(); }
  ctx.strokeStyle = '#2b2440'; ctx.lineWidth = 3; ctx.strokeRect(1.5, 1.5, 93, 61);
  return c;
}

export function createGateway(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 11 });

  // quay plaza + steps down to the water (front, +Z)
  k.base(17, 12, { color: PAL.stone });
  for (let i = 0; i < 4; i++) {
    const top = -0.05 - i * 0.2, z0 = 4.2 + i * 0.85;
    k.box(i % 2 ? PAL.stoneDark : PAL.stone, 9.6 - i * 0.2, top + 1.6, 0.85, 0, -1.6, z0 + 0.43);
  }
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.16, 0.2, 0.5, sx * 7.4, 0, 4.9, { seg: 6 });

  // ---- ground storey: rusticated block with the gate passage ----
  k.extrude(WALL, bodyShape(), D, 0, 0, 0);
  k.box(SHADE, W + 0.3, 0.55, D + 0.3, 0, 0, 0);                 // plinth
  for (let i = 0; i < 6; i++) k.box(SHADE, W + 0.06, 0.05, D + 0.06, 0, 0.9 + i * 0.5, 0, { outline: false }); // rustication courses
  k.box(TRIM, W + 0.45, 0.28, D + 0.45, 0, H1 - 0.05, 0);        // string course
  for (const sz of [1, -1]) k.extrude(TRIM, ringArch(ARCH_W, ARCH_W + 0.32, ARCH_SPRING, false), 0.26, 0, 0, sz * (D / 2 + 0.08), { ry: sz < 0 ? Math.PI : 0 });
  // keystone
  for (const sz of [1, -1]) k.box(SHADE, 0.34, 0.55, 0.3, 0, ARCH_SPRING + ARCH_W + 0.02, sz * (D / 2 + 0.16));

  for (const [oz, ry] of [[D / 2, 0], [-D / 2, Math.PI]]) {
    const f = k.face(0, 0, oz, ry);
    for (const sx of [-1, 1]) {
      const u = sx * 3.3;
      if (oz > 0 && sx < 0) continue; // the left bay of the front carries the name plaque
      f.window(u, 1.0, 1.2, 2.4, { pointed: false, glass: PAL.glassDark, frame: TRIM, bars: 1 });
    }
    if (oz < 0) f.window(-3.3, 1.0, 1.2, 2.4, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
    // canvas awnings over the bay windows, as in the photos
    for (const sx of [-1, 1]) f.box(0xa8bdb4, sx * 3.3, 3.4, 1.9, 0.12, 0.45, 0.08);
  }
  // name plaque on the front, left bay
  const f0 = k.face(0, 0, D / 2, 0);
  f0.plane(bilingualBoard(2.4, 1.2, 'புனித ஜார்ஜ் கோட்டை', 'FORT ST. GEORGE', { fill: '#f7f1dc', hatch: '#e4d8a8', tc: '#7a2f2f', taSize: 0.34, enSize: 0.2, px: 80 }), 2.3, 1.15, -3.3, 1.75, 0.07);

  // ---- upper storey: the colonnaded "loggia" under pediments ----
  k.box(WALL, W2, H2, D2, 0, H1, 0);
  k.box(SHADE, W2 + 0.1, 0.2, D2 + 0.1, 0, H1, 0);
  for (const [oz, sz] of [[D2 / 2, 1], [-D2 / 2, -1]]) {
    for (let i = 0; i < 6; i++) {
      const x = -W2 / 2 + 0.55 + (i * (W2 - 1.1)) / 5;
      k.cyl(COLUMN, 0.2, 0.24, H2 - 0.5, x, H1 + 0.2, sz * (D2 / 2 + 0.34), { seg: 8 });
      k.box(COLUMN, 0.5, 0.14, 0.5, x, H1 + 0.2, sz * (D2 / 2 + 0.34));   // base
      k.box(COLUMN, 0.5, 0.14, 0.5, x, H1 + H2 - 0.45, sz * (D2 / 2 + 0.34)); // capital
    }
    // dark louvred shutters between the columns
    const f = k.face(0, H1, oz, sz > 0 ? 0 : Math.PI);
    for (let i = 0; i < 5; i++) f.window(-W2 / 2 + 1.35 + (i * (W2 - 2.7)) / 4, 0.55, 0.9, 1.9, { glass: 0x2f4a43, frame: TRIM, bars: 0, sill: false, n: 0.02 });
    // balcony balustrade across the loggia floor
    for (let i = 0; i < 20; i++) f.box(TRIM, -W2 / 2 + 0.4 + (i * (W2 - 0.8)) / 19, 0.18, 0.12, 0.5, 0.12, 0.72);
    f.box(TRIM, 0, 0.66, W2 - 0.4, 0.1, 0.2, 0.66);
    // entablature + pediment
    f.box(TRIM, 0, H2 - 0.42, W2 + 0.6, 0.42, 0.9, 0);
    k.extrude(TRIM, pediment(5.2, 1.25), 0.34, 0, H1 + H2, sz * (D2 / 2 + 0.5), { ry: sz < 0 ? Math.PI : 0 });
    k.extrude(SHADE, pediment(4.2, 0.9), 0.1, 0, H1 + H2 + 0.12, sz * (D2 / 2 + 0.72), { ry: sz < 0 ? Math.PI : 0 });
  }
  // side pediments on the short ends
  for (const sx of [1, -1]) k.extrude(TRIM, pediment(2.8, 0.8), 0.3, sx * (W2 / 2 + 0.1), H1 + H2, 0, { ry: sx > 0 ? Math.PI / 2 : -Math.PI / 2 });
  // roof balustrade + hipped slate-grey roof + cupola
  k.box(TRIM, W2 + 0.9, 0.28, D2 + 0.9, 0, H1 + H2, 0);
  for (let i = 0; i < 17; i++) { const x = -W2 / 2 + (i * W2) / 16; k.box(TRIM, 0.12, 0.38, 0.12, x, H1 + H2 + 0.28, D2 / 2 + 0.38); k.box(TRIM, 0.12, 0.38, 0.12, x, H1 + H2 + 0.28, -D2 / 2 - 0.38); }
  k.add(new THREE.ConeGeometry(5.7, 1.0, 4, 1).rotateY(Math.PI / 4).scale(1, 1, 0.55), ROOF, { pos: [0, H1 + H2 + 0.78, 0] });
  k.cyl(TRIM, 0.55, 0.65, 0.8, 0, H1 + H2 + 1.1, 0, { seg: 8 });
  k.dome(ROOF, 0.55, 0, H1 + H2 + 1.9, 0, { seg: 8, ring: 4 });

  // ---- low wings with balustrade ----
  for (const sx of [-1, 1]) {
    const x = sx * (W / 2 + 1.35);
    k.box(WALL, 2.7, 3.7, 3.6, x, 0, 0);
    k.box(SHADE, 2.85, 0.4, 3.75, x, 0, 0);
    k.box(TRIM, 2.95, 0.26, 3.85, x, 3.6, 0);
    for (let i = 0; i < 6; i++) k.box(TRIM, 0.12, 0.34, 0.12, x - 1.25 + i * 0.5, 3.86, 1.78);
    const f = k.face(x, 0, 1.8, 0);
    f.window(0, 0.9, 1.0, 2.1, { glass: PAL.glassDark, frame: TRIM, bars: 1 });
  }

  // ---- bastions at the back: angled stone with a parapet and a cannon each ----
  for (const sx of [-1, 1]) {
    const shape = polyShape([[-2.3, -1.2], [2.3, -1.2], [2.9, 0.4], [0, 2.4], [-2.9, 0.4]]);
    const bx = sx * 6.2, bz = -3.7;
    k.add(new THREE.ExtrudeGeometry(shape, { depth: 1.5, bevelEnabled: false }).rotateX(Math.PI / 2), SHADE, { pos: [bx, 1.5, bz] });
    k.add(new THREE.ExtrudeGeometry(shape, { depth: 0.18, bevelEnabled: false }).rotateX(Math.PI / 2).scale(1.04, 1, 1.04), TRIM, { pos: [bx, 1.68, bz] });
    k.cyl(0x3a3840, 0.14, 0.17, 1.0, bx + sx * 0.3, 1.78, bz + 0.9, { seg: 6, rx: Math.PI / 2.3, rz: sx * 0.35 });
    k.cyl(0x3a3840, 0.22, 0.22, 0.12, bx + sx * 0.3, 1.7, bz + 0.5, { seg: 6 });
  }
  k.box(SHADE, 8.0, 1.5, 0.7, 0, 0, -5.3);                         // curtain wall between the bastions
  k.box(TRIM, 8.1, 0.14, 0.82, 0, 1.5, -5.3);

  // ---- the flagstaff ----
  const fx = -7.0, fz = 1.0, fh = 15.5;
  k.cyl(SHADE, 0.55, 0.62, 0.5, fx, 0, fz, { seg: 8 });
  k.cyl(0xe8e4d6, 0.07, 0.13, fh, fx, 0.4, fz, { seg: 6 });
  k.ball(PAL.gold, 0.16, fx, fh + 0.5, fz, { seg: 6, ring: 4 });
  for (const y of [4.5, 9, 13]) k.cyl(0x8a7e6a, 0.15, 0.15, 0.1, fx, y, fz, { seg: 6 });
  k.plane(flagCanvas(), 1.9, 1.27, [fx + 1.02, fh - 0.45, fz], 0);

  // pigeons on the quay edge and the cornice
  const pig = (x, y, z, ry) => {
    k.ball(0xb9b6c8, 0.17, x, y + 0.17, z, { sx: 1, sy: 0.85, sz: 1.35, seg: 6, ring: 4, ry, outline: false });
    k.ball(0x9a97ae, 0.1, x + Math.sin(ry) * 0.16, y + 0.32, z + Math.cos(ry) * 0.16, { seg: 5, ring: 4, outline: false });
  };
  [[-3.2, 0.05, 5.8, 0.3], [-2.6, 0.05, 6.3, 1.2], [2.8, 0.05, 5.6, -0.6], [3.5, 0.05, 6.1, 2.4], [0.8, 0.05, 3.2, 3.1], [-3.4, H1 + 0.1, 1.2, 0.5]].forEach((p) => pig(...p));

  const g = k.finish({ lean: 0.006 });
  g.name = 'gateway';
  g.userData = {
    footprint: 9,
    height: 16.2,
    // the gate passage (|x| < 1.7) stays open: two piers each side
    colliders: [
      ...[-1, 1].flatMap((sx) => [-1.2, 1.2].map((z) => ({ x: sx * 3.4, z, radius: 1.45, height: H1 }))),
      { x: -4.4, z: 0, radius: 0.5, height: H1 }, { x: 4.4, z: 0, radius: 0.5, height: H1 },
      ...[-1, 1].flatMap((sx) => [-0.9, 0.9].map((z) => ({ x: sx * 5.95, z, radius: 1.0, height: 3.6 }))),
      { x: fx, z: fz, radius: 0.55, height: 15 },
      ...[-1, 1].map((sx) => ({ x: sx * 7.4, z: 4.9, radius: 0.25, height: 0.5 })),
      ...lineColliders(-4, -5.3, 4, -5.3, 0.4, 1.5, 1.2),
      ...[-1, 1].map((sx) => ({ x: sx * 6.2, z: -3.7, radius: 1.6, height: 1.5 })),
    ],
    walkable: [{ shape: 'rect', x: 0, z: 0, w: 3.4, d: D, y: 0.05 }],
  };
  return g;
}
