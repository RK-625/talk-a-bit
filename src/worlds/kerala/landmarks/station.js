// Kochi Metro station (MG Road style): raised platform, a shallow teal-green canopy on round concrete posts, teal station boards in
// Malayalam + English, steel benches, ticket office, optional footbridge. Photo: Wikimedia Commons "Vyttila metro station scenery.jpg"
// (grey concrete piers, teal-green curved roof edge, glass panels). Platform runs along X; the TRACK side is +Z. Platform top at y=PH.
import * as THREE from 'three';
import { Kit, PAL, paintBoard, taText, latin, polyShape, lineColliders } from './kit.js';

const PH = 0.45; // platform height
const L = 18, PD = 5; // platform length x depth
const RAMP_LEN = 3.4, RAMP_LOW = -1.0; // end ramps: length, and the height of their foot (ground level a few units out on the sphere)
const TIN = 0x3fb5a8, POST = 0xcfcac0, YEL = '#2fa7a0';

function board(names, sub, w = 6, h = 1.55) {
  return paintBoard(w, h, YEL, '#1f8a84', (ctx, W, H) => {
    taText(ctx, names[0], W / 2, H * 0.58, H * 0.46, { color: '#fbf8ee', maxW: W * 0.92 });
    latin(ctx, names[1], W / 2, H * 0.92, H * 0.3, { color: '#fbf8ee' });
    latin(ctx, sub, W / 2, H * 0.14, H * 0.12, { color: '#d9f3ee' });
  }, { seed: 9, px: 96 });
}

/** opts: { names: ['എം ജി റോഡ്','M G ROAD'], footbridge: false, length: 18 } */
export function createStation(ink, opts = {}) {
  if (!opts || typeof opts !== 'object' || opts.createInkMaterial) opts = {};
  const names = opts.names ?? ['എം ജി റോഡ്', 'M G ROAD'];
  const k = new Kit(ink, { hatch: 0.14, seed: 301 });
  // foundation + platform slab with coping and a yellow safety line
  k.base(L + 1, PD + 1, { color: PAL.stone, h: 1.2 + 0.0, top: PH + 0.05 });
  k.box(0xd8d0c0, L, PH, PD, 0, 0, 0);
  k.box(0xb9ae9a, L + 0.1, 0.1, 0.35, 0, PH - 0.05, PD / 2 - 0.1);
  k.box(0xf0c93a, L - 0.2, 0.02, 0.22, 0, PH, PD / 2 - 0.55, { outline: false });
  // tactile-ish dashes on the platform
  for (let i = 0; i < 12; i++) k.box(0xb9ae9a, 0.5, 0.02, 0.5, -L / 2 + 1 + i * 1.5, PH, PD / 2 - 0.95, { outline: false });
  // end ramps (so the hero can walk on)
  // (the planet curves away: 12 units from the centre the ground is ~1 unit below this flat asset's y=0, so the ramps run down to RAMP_LOW)
  for (const sx of [-1, 1]) k.add(new THREE.BoxGeometry(Math.hypot(RAMP_LEN, PH - RAMP_LOW), 0.2, 2.6), 0xd8d0c0, { pos: [sx * (L / 2 + RAMP_LEN / 2), (PH + RAMP_LOW) / 2 - 0.05, -0.2], rot: [0, 0, -sx * Math.atan2(PH - RAMP_LOW, RAMP_LEN)] });
  // back fence
  for (let i = 0; i <= 12; i++) k.box(0x4f78a8, 0.1, 1.0, 0.1, -L / 2 + 0.3 + i * ((L - 0.6) / 12), PH, -PD / 2 + 0.2);
  k.box(0x4f78a8, L, 0.1, 0.1, 0, PH + 0.9, -PD / 2 + 0.2);
  k.box(0x4f78a8, L, 0.08, 0.08, 0, PH + 0.45, -PD / 2 + 0.2);

  // canopy: posts + sloping tin roof with ribs and scalloped fascia
  const n = 5;
  for (let i = 0; i < n; i++) {
    const x = -L / 2 + 1.2 + i * ((L - 2.4) / (n - 1));
    k.cyl(POST, 0.16, 0.2, 3.6, x, PH, 0.5, { seg: 10 });
    k.cyl(0x2fa7a0, 0.15, 0.15, 0.25, x, PH + 0.9, 0.5, { seg: 8 });
    k.box(PAL.stoneDark, 0.4, 0.1, 0.4, x, PH, 0.5);
  }
  const roof = new THREE.BoxGeometry(L + 1.0, 0.14, PD + 0.4);
  k.add(roof, TIN, { pos: [0, PH + 3.75, -0.1], rot: [0.1, 0, 0] });
  for (let i = 0; i <= 24; i++) k.box(0x2f9b90, 0.05, 0.1, PD + 0.4, -L / 2 - 0.4 + i * ((L + 0.8) / 24), PH + 3.72, -0.1, { rx: 0.1, outline: false });
  for (let i = 0; i < 22; i++) { // fascia scallops along the track edge
    const x = -L / 2 + 0.2 + i * ((L - 0.4) / 21);
    k.flat(0xd4eeea, polyShape([[-0.4, 0], [0.4, 0], [0, -0.38]]), x, PH + 3.62, PD / 2 + 0.15, {});
  }
  k.box(0x2fa7a0, L + 1.0, 0.2, 0.1, 0, PH + 3.6, PD / 2 + 0.12);

  // station boards: two big ones on posts hanging from the canopy (double sided), one small perpendicular
  const b1 = board(names, 'കൊച്ചി മെട്രോ  ·  KOCHI METRO');
  const bx = -2.0;
  // big yellow board standing on the canopy edge so it reads from above and from the platform
  k.box(PAL.ink, 6.1, 1.6, 0.14, bx, PH + 3.95, 1.7);
  k.plane(b1, 6, 1.55, [bx, PH + 3.95 + 0.8, 1.78], 0);
  k.plane(b1, 6, 1.55, [bx, PH + 3.95 + 0.8, 1.62], Math.PI);
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.06, 0.06, 0.4, bx + sx * 2.7, PH + 3.7, 1.7, { seg: 5, outline: false });
  const b2 = board(names, 'പ്ലാറ്റ്ഫോം 1  ·  PLATFORM 1', 3.2, 1.0);
  k.box(PAL.ink, 0.14, 1.0, 3.3, 5.6, PH + 2.4, 0.3);
  k.plane(b2, 3.2, 1.0, [5.7, PH + 2.9, 0.3], Math.PI / 2);
  k.plane(b2, 3.2, 1.0, [5.5, PH + 2.9, 0.3], -Math.PI / 2);
  for (const sz of [-1, 1]) k.cyl(PAL.ink, 0.03, 0.03, 0.8, 5.6, PH + 3.0, 0.3 + sz * 1.4, { seg: 4, outline: false });

  // benches, lamps, a clock
  for (const x of [-6.8, 1.8, 7.0]) {
    k.box(0x6f7f8a, 1.7, 0.1, 0.5, x, PH + 0.45, -1.4);
    k.box(0x6f7f8a, 1.7, 0.5, 0.08, x, PH + 0.6, -1.65);
    for (const sx of [-0.7, 0.7]) k.box(PAL.ink, 0.08, 0.45, 0.4, x + sx, PH, -1.4);
  }
  for (const x of [-4.2, 3.6]) {
    k.cyl(PAL.ink, 0.05, 0.07, 3.0, x, PH, -0.9, { seg: 5 });
    k.ball(0xfff1b8, 0.2, x, PH + 3.05, -0.9, { seg: 6, ring: 4 });
  }
  k.cyl(PAL.ink, 0.04, 0.04, 1.2, -8.2, PH + 2.3, 0.8, { seg: 4 });
  k.cyl(0xfbf6e6, 0.4, 0.4, 0.12, -8.2, PH + 3.4, 0.8, { seg: 14, rx: Math.PI / 2 });

  // booking office at the +X end
  const ox = 7.8, oz = -1.2;
  k.box(0xe6f1ee, 3.2, 3.3, 2.4, ox, PH, oz);
  k.box(PAL.stoneDark, 3.5, 0.28, 2.7, ox, PH + 3.3, oz);
  k.box(0x3fb5a8, 3.7, 0.2, 2.9, ox, PH + 3.58, oz);
  const f = k.face(ox, PH, oz + 1.2, 0);
  f.window(-0.7, 0.2, 0.9, 1.9, { glass: 0x5d4a3a, frame: PAL.cream, bars: 1 });
  f.window(0.7, 0.8, 1.0, 0.8, { rect: true, glass: 0x3f6279, frame: PAL.cream, bars: 1 });
  const tick = paintBoard(1.5, 0.42, '#2f7fb0', '#1f5f88', (ctx, W, H) => { taText(ctx, 'ടിക്കറ്റ്', W * 0.32, H * 0.72, H * 0.4, { color: '#fff4d2' }); latin(ctx, 'TICKET', W * 0.74, H * 0.7, H * 0.4, { color: '#fff4d2' }); }, { seed: 3 });
  k.plane(tick, 1.5, 0.42, [ox + 0.0, PH + 2.55, oz + 1.28], 0);

  // optional footbridge
  if (opts.footbridge) addFootbridge(k, -6.8);

  const g = k.finish({ lean: 0.004 });
  g.name = 'station';
  g.userData = {
    footprint: L / 2 + 2,
    height: PH + 4.4,
    size: [L, PD, PH + 4.4],
    platformHeight: PH,
    trackSide: '+z',
    colliders: [
      ...[0, 1, 2, 3, 4].map((i) => ({ x: -L / 2 + 1.2 + i * ((L - 2.4) / 4), z: 0.5, radius: 0.22, height: 3.6 })),
      { x: ox, z: oz, radius: 1.7, height: 3.5 },
      { x: -4.2, z: -0.9, radius: 0.15, height: 3 }, { x: 3.6, z: -0.9, radius: 0.15, height: 3 },
      ...lineColliders(-L / 2 + 0.2, -PD / 2 + 0.2, L / 2 - 0.2, -PD / 2 + 0.2, 0.45, 1.4, 1.3),
      ...[-6.8, 1.8, 7.0].map((x) => ({ x, z: -1.5, radius: 0.5, height: 1.0 })),
    ],
    walkable: [
      { shape: 'rect', x: 0, z: 0, w: L + 1, d: PD + 1, y: PH }, // the whole stone base, not just the slab: its 0.5 ledge must not sink the hero
      { shape: 'ramp', x: L / 2 + RAMP_LEN / 2, z: -0.2, w: RAMP_LEN, d: 2.6, y0: RAMP_LOW, y1: PH, rising: '-x' },
      { shape: 'ramp', x: -L / 2 - RAMP_LEN / 2, z: -0.2, w: RAMP_LEN, d: 2.6, y0: RAMP_LOW, y1: PH, rising: '+x' },
    ],
  };
  return g;
}

function addFootbridge(k, x) {
  const y = PH + 3.9, z0 = -1.6, z1 = 9.4;
  k.box(0xd9d2c4, 2.0, 0.3, z1 - z0, x, y - 0.3, (z0 + z1) / 2);
  for (const sx of [-1, 1]) {
    k.box(0xcfc7b6, 0.12, 1.1, z1 - z0, x + sx * 0.94, y, (z0 + z1) / 2);
    for (let i = 0; i <= 10; i++) k.box(PAL.ink, 0.06, 1.4, 0.06, x + sx * 0.95, y, z0 + i * ((z1 - z0) / 10), { outline: false });
  }
  k.box(TIN, 2.4, 0.12, z1 - z0 + 0.2, x, y + 1.6, (z0 + z1) / 2);
  for (const z of [z0 + 0.2, z1 - 0.2]) for (const sx of [-1, 1]) k.box(POST, 0.12, 1.6, 0.12, x + sx * 0.98, y, z);
  // legs: one on the platform, one far pier, plus a stair flight
  for (const sx of [-1, 1]) k.box(0xcfc7b6, 0.35, y - 0.4 + 1.4, 0.35, x + sx * 0.9, -1.4, z1 - 0.4);
  for (const sx of [-1, 1]) k.box(0xcfc7b6, 0.35, y - PH - 0.3, 0.35, x + sx * 0.9, PH, z0 + 0.4);
  void polyShape;
}

export const createFootbridge = (ink) => {
  const k = new Kit(ink, { hatch: 0.14, seed: 311 });
  k.base(4, 12, { color: PAL.stone });
  addFootbridge(k, 0);
  const g = k.finish({ lean: 0 });
  g.name = 'footbridge';
  g.userData = { footprint: 6, height: PH + 5.6, colliders: [], walkable: [{ shape: 'rect', x: 0, z: 3.9, w: 1.7, d: 11, y: PH + 3.9 }] };
  return g;
};
