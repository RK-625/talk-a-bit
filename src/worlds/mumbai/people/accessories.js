/**
 * people/accessories.js: things people carry, wear or stand beside. Each factory returns a THREE.Group:
 *   userData.slot     where createPerson mounts it by default: handL | handR | head | face | mouth | chest |
 *                     shoulderL | shoulderR | spine | ground      (handL is the +X hand, handR the -X hand)
 *   userData.orient   'hang' (extends -Y, stays vertical like a pendulum) | 'up' (extends +Y, stays upright) | undefined (rigid
 *                     in the hand). baseTilt {x,z} + live tilt {x,z} (radians, person space) lean it; the animator applies them.
 *   userData.update   (dt, ctx{t, walk, phase}) optional per-frame hook (jiggling glasses, swaying balloons...)
 * Origin = the grip point (hand items), the bottom centre (head items) or the mount point.
 * Names: kettle, wireCarrier, chaiGlass, gamcha, tiffinCrate, jhola, umbrella, sabziBag, cricketBat, stumps, ball,
 *        whistle, ticketMachine, fishBasket, balloons, newspaperBundle, newspaper, jhara, sunglasses, phone,
 *        kadhai, bhelTub, golaTray, golaStick.
 * makeAccessory(name, opts) -> Group.   opts: { bw (build width), torsoH, headR, seed, colors... }
 */
import * as THREE from 'three';
import { geo, mat, mk, mergeColored, cloth, cyl, sph, basic, PASTEL, INK_COLOR, OVERLAY_LAYER } from './kit.js';
import { makeCanvas, toTexture, drawText, rng } from '../../../engine/doodle.js';

const VC = (spacing = 0.035) => mat(0xffffff, { vertexColors: true, spacing });
const lathe = (pts, seg = 12) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
const box = (w, h, d) => geo(`box|${w}|${h}|${d}`, () => new THREE.BoxGeometry(w, h, d));
const torus = (R, r, arc = Math.PI * 2, rs = 5, ts = 12) => geo(`tor|${R}|${r}|${arc}|${rs}|${ts}`, () => new THREE.TorusGeometry(R, r, rs, ts, arc));
const cone = (r, h, seg = 8) => geo(`cone|${r}|${h}|${seg}`, () => new THREE.ConeGeometry(r, h, seg));
const unitCyl = (r, seg = 5) => geo(`ucyl|${r}|${seg}`, () => new THREE.CylinderGeometry(r, r, 1, seg));

const _q = new THREE.Quaternion(), _e = new THREE.Euler(), _up = new THREE.Vector3(0, 1, 0);
/** thin stick between two points (a mergeColored part) */
function seg(a, b, r, color) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const d = B.clone().sub(A), len = d.length();
  _q.setFromUnitVectors(_up, d.normalize());
  _e.setFromQuaternion(_q);
  return { g: unitCyl(r), pos: A.add(B).multiplyScalar(0.5).toArray(), rot: [_e.x, _e.y, _e.z], scale: [1, len, 1], color };
}

/** one vertex-coloured outlined mesh, geometry cached by `key` */
function vcMesh(key, parts, o = 1.8, spacing = 0.035) {
  const g = geo('acc|' + key, () => mergeColored(parts()));
  return mk(g, VC(spacing), { o });
}
function group(slot, extra = {}) {
  const g = new THREE.Group();
  g.userData = { slot, ...extra };
  return g;
}

const STEEL = 0xcdd6dc, STEEL_D = 0x9eabb4, GLASS = 0xe3f1f5, TEA = 0xb4763f, WOOD = PASTEL.wood;

// ---- chai gear -----------------------------------------------------------------------------------
export function makeKettle() {
  const g = group('handR', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } });
  g.scale.setScalar(0.88);
  const body = vcMesh('kettle', () => [
    { g: lathe([[0, -0.4], [0.12, -0.4], [0.165, -0.33], [0.175, -0.26], [0.145, -0.18], [0.095, -0.145], [0.06, -0.135], [0, -0.135]], 10), color: STEEL },
    { g: sph(0.04, 6, 4), pos: [0, -0.125, 0], color: STEEL_D },
    { g: cone(0.05, 0.2, 6), pos: [0, -0.255, 0.215], rot: [1.15, 0, 0], color: STEEL },
    { g: torus(0.115, 0.014, Math.PI, 4, 8), pos: [0, -0.13, 0], color: STEEL_D },
  ], 2);
  g.add(body);
  // the thin tea stream (hidden until poured); kept vertical by the animator via userData.desiredQuat
  const stream = new THREE.Mesh(geo('stream', () => { const c = new THREE.CylinderGeometry(0.013, 0.01, 1, 5); c.translate(0, -0.5, 0); return c; }), basic(TEA));
  stream.position.set(0, -0.215, 0.31);
  stream.scale.y = 0.0001; stream.visible = false;
  stream.layers.set(OVERLAY_LAYER);
  g.add(stream);
  g.userData.stream = stream;
  g.userData.pour = (amt, len = 0.5) => { stream.visible = amt > 0.02; stream.scale.y = Math.max(0.0001, len * amt); };
  g.userData.update = () => { stream.quaternion.copy(g.userData.invDesired ?? new THREE.Quaternion()); };
  return g;
}

export function makeChaiGlass() {
  const g = group('handL', { orient: 'up', baseTilt: { x: 0.0, z: 0 }, tilt: { x: 0, z: 0 } });
  g.add(vcMesh('chaiGlass', () => [
    { g: cyl(0.048, 0.037, 0.12, 7), pos: [0, 0.06, 0], color: GLASS },
    { g: cyl(0.04, 0.04, 0.012, 8), pos: [0, 0.1, 0], color: TEA },
  ], 1.6, 0.03));
  return g;
}

export function makeWireCarrier() {
  const g = group('handL', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } });
  const frame = vcMesh('carrierFrame', () => {
    const parts = [
      { g: torus(0.1, 0.012, Math.PI, 4, 8), pos: [0, -0.1, 0], rot: [0, 0, 0], color: STEEL_D },
      { g: torus(0.15, 0.011, Math.PI * 2, 3, 10), pos: [0, -0.215, 0], rot: [Math.PI / 2, 0, 0], color: STEEL_D },
      { g: cyl(0.15, 0.15, 0.012, 10), pos: [0, -0.315, 0], color: STEEL },
    ];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.5;
      parts.push(seg([0, -0.1, 0], [Math.sin(a) * 0.15, -0.215, Math.cos(a) * 0.15], 0.007, STEEL_D));
      parts.push(seg([Math.sin(a) * 0.15, -0.215, Math.cos(a) * 0.15], [Math.sin(a) * 0.15, -0.31, Math.cos(a) * 0.15], 0.007, STEEL_D));
    }
    return parts;
  }, 1.6, 0.03);
  const pivot = new THREE.Group(); // glasses jiggle about the rim
  pivot.position.y = -0.215;
  const glassGeo = geo('acc|carrierGlasses', () => {
    const p = [], t = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2, x = Math.sin(a) * 0.092, z = Math.cos(a) * 0.092;
      p.push({ g: cyl(0.042, 0.033, 0.115, 6), pos: [x, -0.04, z], color: GLASS });
    }
    return mergeColored(p);
  });
  const glasses = mk(glassGeo, VC(0.03), { o: 1.5 });
  const teaGeo = geo('acc|carrierTea', () => {
    const t = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      t.push({ g: cyl(0.034, 0.034, 0.01, 6), pos: [Math.sin(a) * 0.092, 0.012, Math.cos(a) * 0.092], color: TEA });
    }
    return mergeColored(t);
  });
  const tea = new THREE.Mesh(teaGeo, VC(0.03));
  pivot.add(glasses, tea);
  g.add(frame, pivot);
  g.userData.update = (dt, c) => {
    const e = 0.25 + c.walk * 1.4;
    pivot.rotation.x = Math.sin(c.t * 17 + 1) * 0.045 * e;
    pivot.rotation.z = Math.sin(c.t * 13) * 0.05 * e + Math.sin(c.phase * 2) * 0.03 * c.walk;
  };
  return g;
}

// ---- cloth & bags -----------------------------------------------------------------------------------
export function makeGamcha(o = {}) {
  const g = group('shoulderL');
  const bw = o.bw ?? 1, rad = 0.3 * bw;
  const c1 = o.color ?? PASTEL.red;
  // soft checked cloth: a puffy drape over the shoulder, a long hanging end in front, a short one behind
  const gg = geo(`acc|gamcha|${bw}`, () => mergeColored([
    { g: new THREE.SphereGeometry(0.11, 7, 5), pos: [0, 0.03, 0], scale: [1.3, 0.75, 2.4] },
    { g: new THREE.CylinderGeometry(0.095, 0.13, 0.44, 7), pos: [0.03, -0.19, rad * 0.78 - 0.01], rot: [0.3, 0, 0.18], scale: [1, 1, 0.3] },
    { g: new THREE.CylinderGeometry(0.07, 0.085, 0.3, 7), pos: [0.0, -0.12, -rad * 0.78 + 0.02], rot: [-0.32, 0, -0.05], scale: [1, 1, 0.38] },
    { g: new THREE.SphereGeometry(0.13, 7, 4), pos: [0.09, -0.42, rad * 0.78 - 0.09], rot: [0.32, 0, 0], scale: [1, 0.35, 0.4] },
  ], { uv: true }));
  g.add(mk(gg, cloth('checks', c1, 0xfff6ea, null, { spacing: 0.06, strength: 0.35 }), { o: 1.5 }));
  return g;
}

export function makeJhola(o = {}) {
  const g = group('spine');
  const bw = o.bw ?? 1, th = o.torsoH ?? 0.56;
  const r = (y) => (0.095 + 0.205 * (y / th)) * bw;
  const strap = geo(`acc|jholaStrap|${bw}`, () => {
    const pts = [];
    const N = 8;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const y = th + 0.02 - (th * 0.95) * t, x = 0.2 * bw - 0.5 * bw * t;
      const z = Math.sqrt(Math.max(0, r(Math.max(0, y)) ** 2 - x * x)) + 0.012 - (i === 0 ? 0.2 : 0);
      pts.push(new THREE.Vector3(x, y, i === 0 ? -0.1 : z));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 10, 0.016, 3, false);
  });
  const col = o.color ?? PASTEL.marigold;
  g.add(mk(strap, mat(col, { spacing: 0.03 }), { o: 1.4 }));
  const bag = mk(geo('acc|jholaBag', () => new THREE.SphereGeometry(0.13, 7, 5)), cloth('dots', col, 0xfff3d2, null, { spacing: 0.04 }), { o: 1.8 });
  bag.scale.set(0.5, 1.0, 0.95);
  bag.position.set(-0.3 * bw - 0.02, 0.0, -0.04);
  g.add(bag);
  return g;
}

export function makeSabziBag() {
  const g = group('handL', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } });
  const bag = mk(geo('acc|sabziBag', () => new THREE.SphereGeometry(0.17, 7, 5)), cloth('vstripes', PASTEL.pistachio, 0xfff6e0, null), { o: 1.8 });
  bag.scale.set(1, 1.15, 0.8); bag.position.y = -0.3;
  g.add(bag);
  g.add(vcMesh('sabziVeg', () => [
    { g: torus(0.05, 0.01, Math.PI, 4, 8), pos: [0, -0.04, 0], color: PASTEL.sand },
    { g: sph(0.07, 6, 5), pos: [0.07, -0.12, 0.03], color: 0xe4574a },
    { g: sph(0.065, 6, 5), pos: [-0.06, -0.12, 0.02], color: 0xf4a03d },
    { g: sph(0.06, 6, 5), pos: [0.0, -0.12, -0.06], color: 0x8ccf6c },
    { g: cone(0.05, 0.2, 6), pos: [0.0, -0.08, 0.07], rot: [-0.3, 0, 0.2], color: 0x7ac26a },
    { g: cone(0.04, 0.18, 6), pos: [-0.05, -0.07, -0.02], rot: [0.2, 0, -0.5], color: 0x9bd681 },
  ], 1.5));
  return g;
}

export function makeUmbrella(o = {}) {
  const g = group('handR', { orient: 'up', baseTilt: { x: -0.05, z: 0.3 }, tilt: { x: 0, z: 0 } });
  const c1 = o.color ?? PASTEL.lilac, c2 = o.color2 ?? PASTEL.cream;
  g.add(vcMesh('umbrellaPole', () => [
    { g: cyl(0.014, 0.014, 1.5, 5), pos: [0, 0.6, 0], color: 0x6b5a52 },
    { g: torus(0.045, 0.013, Math.PI, 4, 8), pos: [0.045, -0.15, 0], rot: [0, 0, Math.PI], color: 0x6b5a52 },
    { g: cone(0.02, 0.1, 5), pos: [0, 1.4, 0], color: 0xd8b348 },
  ], 1.4));
  const dome = mk(geo('acc|dome', () => new THREE.SphereGeometry(0.64, 8, 2, 0, Math.PI * 2, 0, Math.PI / 2)),
    cloth('vstripes', c1, c2, null, { spacing: 0.05, double: true }), { o: 2 });
  dome.scale.y = 0.5; dome.position.y = 1.05;
  g.add(dome);
  g.userData.update = (dt, c) => { g.userData.tilt.z = Math.sin(c.t * 0.9) * 0.03; };
  return g;
}

// ---- head loads ----------------------------------------------------------------------------------
export function makeTiffinCrate() {
  const g = group('head');
  g.add(vcMesh('crate', () => {
    const p = [
      { g: box(0.9, 0.05, 0.36), pos: [0, 0.025, 0], color: WOOD },
      { g: box(0.04, 0.3, 0.36), pos: [-0.45, 0.17, 0], color: 0xb98652 },
      { g: box(0.04, 0.3, 0.36), pos: [0.45, 0.17, 0], color: 0xb98652 },
      { g: box(0.9, 0.04, 0.03), pos: [0, 0.09, 0.17], color: 0xb98652 },
      { g: box(0.9, 0.04, 0.03), pos: [0, 0.09, -0.17], color: 0xb98652 },
    ];
    const layer = [0xe3e9ec, 0xbfd3df, 0xe3e9ec, 0xf0d8a8];
    for (let i = 0; i < 4; i++) {
      const x = -0.31 + i * 0.205;
      for (let j = 0; j < 2; j++) p.push({ g: cyl(0.085, 0.085, 0.15, 6), pos: [x, 0.13 + j * 0.155, 0], color: layer[(i + j) % 4] });
      p.push({ g: sph(0.03, 5, 4), pos: [x, 0.36, 0], color: STEEL_D });
      p.push({ g: box(0.012, 0.3, 0.012), pos: [x + 0.09, 0.26, 0], color: STEEL_D });
    }
    return p;
  }, 2, 0.04));
  return g;
}

export function makeFishBasket() {
  const g = group('head');
  g.add(vcMesh('fishBasket', () => {
    const p = [
      { g: torus(0.13, 0.06, Math.PI * 2, 4, 8), pos: [0, 0.04, 0], rot: [Math.PI / 2, 0, 0], color: 0xe9776a }, // cloth ring (chumbal)
      { g: lathe([[0, 0.08], [0.2, 0.08], [0.34, 0.14], [0.46, 0.26], [0.5, 0.33], [0.46, 0.34], [0.42, 0.28], [0.3, 0.19], [0, 0.16]], 8), color: 0xd9a96a },
    ];
    const cols = [0xcfe2ee, 0xf4c6cf, 0xdfe9ee, 0xf1d6b6, 0xcfe2ee, 0xf4c6cf];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.3, rr = i === 5 ? 0.0 : 0.22;
      p.push({ g: sph(0.085, 6, 4), pos: [Math.sin(a) * rr, 0.25 + (i % 2) * 0.03, Math.cos(a) * rr], rot: [0, a + 1.57, 0.12], scale: [1.9, 0.55, 0.75], color: cols[i] });
      p.push({ g: cone(0.045, 0.1, 4), pos: [Math.sin(a) * rr + Math.cos(a) * 0.17, 0.25 + (i % 2) * 0.03, Math.cos(a) * rr - Math.sin(a) * 0.17], rot: [0, a, 1.57], color: cols[i] });
    }
    return p;
  }, 2, 0.04));
  return g;
}

export function makeBalloons() {
  const g = group('handL', { orient: 'up', baseTilt: { x: 0.1, z: 0 }, tilt: { x: 0, z: 0 } });
  const cols = [0xe9776a, 0xf6c453, 0x6cc3bd, 0xf0a3c3, 0xf29b4b, 0xc9b7e8, 0xa8d878];
  const spots = [[0, 1.45, 0], [-0.26, 1.28, 0.05], [0.27, 1.25, -0.04], [-0.12, 1.12, 0.2], [0.14, 1.08, -0.18], [-0.34, 1.02, -0.12], [0.34, 0.98, 0.14]];
  g.add(vcMesh('balloons', () => spots.map((p, i) => ({ g: sph(0.17, 6, 4), pos: p, scale: [1, 1.18, 1], color: cols[i] })), 2, 0.05));
  g.add(vcMesh('balloonStrings', () => spots.map((p) => seg([0, 0, 0], [p[0] * 0.98, p[1] - 0.2, p[2] * 0.98], 0.006, INK_COLOR)), 0, 0.2));
  g.userData.update = (dt, c) => { g.userData.tilt.z = Math.sin(c.t * 1.7) * 0.07; g.userData.tilt.x = 0.1 + Math.sin(c.t * 1.3 + 1) * 0.04; };
  return g;
}

// ---- hand tools -----------------------------------------------------------------------------------
export function makeCricketBat() {
  const g = group('handR', { orient: 'hang', baseTilt: { x: -0.45, z: 0 }, tilt: { x: 0, z: 0 } });
  g.add(vcMesh('bat', () => [
    { g: cyl(0.024, 0.024, 0.3, 6), pos: [0, 0.08, 0], color: 0xf0ece0 },
    { g: cyl(0.026, 0.026, 0.03, 6), pos: [0, 0.05, 0], color: 0xe9776a },
    { g: cyl(0.03, 0.05, 0.1, 6), pos: [0, -0.1, 0], color: 0xd9a46a },
    { g: box(0.15, 0.5, 0.05), pos: [0, -0.4, 0], color: 0xe7bd82 },
    { g: box(0.06, 0.5, 0.05), pos: [0, -0.4, -0.04], color: 0xd49a5c },
  ], 1.8));
  return g;
}

export function makeStumps() {
  const g = group('ground');
  g.add(vcMesh('stumps', () => [
    ...[-0.1, 0, 0.1].map((x) => ({ g: cyl(0.022, 0.022, 0.72, 6), pos: [x, 0.36, 0], color: 0xe7bd82 })),
    { g: cyl(0.012, 0.012, 0.1, 5), pos: [-0.05, 0.73, 0], rot: [0, 0, 1.57], color: 0xf0ece0 },
    { g: cyl(0.012, 0.012, 0.1, 5), pos: [0.05, 0.73, 0], rot: [0, 0, 1.57], color: 0xf0ece0 },
  ], 1.8));
  return g;
}

export function makeBall() {
  const g = group('handR');
  g.add(vcMesh('ball', () => [{ g: sph(0.045, 8, 6), pos: [0, -0.03, 0], color: 0xe9776a }], 1.3));
  return g;
}

export function makeWhistle() {
  const g = group('mouth');
  g.add(vcMesh('whistle', () => [
    { g: cyl(0.02, 0.02, 0.08, 6), pos: [0, 0, 0.05], rot: [Math.PI / 2, 0, 0], color: 0xeef2f4 },
    { g: sph(0.028, 6, 5), pos: [0, 0.02, 0.08], color: 0xd7dde2 },
  ], 1.3));
  return g;
}

export function makeTicketMachine(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.18, z = ((0.095 + 0.205 * (y / (o.torsoH ?? 0.56))) * bw) + 0.07;
  const m = vcMesh('ticketMachine', () => [
    { g: box(0.26, 0.2, 0.12), color: 0x86aec6 },
    { g: box(0.2, 0.07, 0.02), pos: [0, 0.03, 0.065], color: 0xd8f1f6 },
    { g: cyl(0.045, 0.045, 0.1, 8), pos: [0.05, 0.12, -0.01], rot: [0, 0, Math.PI / 2], color: 0xfaf5e8 },
    { g: box(0.2, 0.025, 0.02), pos: [0, -0.05, 0.065], color: 0x44506a },
    { g: sph(0.13, 8, 6), pos: [-0.27, -0.2, 0.03], scale: [0.55, 0.8, 0.6], color: 0xa77a58 },
  ], 1.6, 0.03);
  m.position.set(0, 0.0, z);
  g.add(m);
  g.position.y = y;
  return g;
}

export function makeJhara() {
  const g = group('handR');
  g.add(vcMesh('jhara', () => [
    { g: cyl(0.016, 0.016, 0.62, 5), pos: [0, -0.22, 0], color: STEEL_D },
    { g: cyl(0.11, 0.11, 0.022, 8), pos: [0, -0.56, 0.0], rot: [Math.PI / 2, 0, 0], color: STEEL },
    { g: torus(0.11, 0.01, Math.PI * 2, 3, 8), pos: [0, -0.56, 0], rot: [0, 0, 0], color: STEEL_D },
  ], 1.5));
  return g;
}

export function makeSunglasses() {
  const g = group('face');
  g.add(vcMesh('sunglasses2', () => {
    const p = [{ g: box(0.09, 0.02, 0.02), pos: [0, 0.045, 0.3], color: 0xd9b348 }];
    for (const s of [-1, 1]) {
      // aviator teardrop lens: wide top ellipse + narrower lower one
      p.push({ g: cyl(0.1, 0.1, 0.02, 8), pos: [s * 0.14, 0.02, 0.272], rot: [Math.PI / 2, 0, 0], scale: [1.1, 1, 0.8], color: 0x3d3158 });
      p.push({ g: cyl(0.07, 0.07, 0.02, 7), pos: [s * 0.125, -0.05, 0.278], rot: [Math.PI / 2, 0, 0], scale: [1, 1, 0.9], color: 0x3d3158 });
      p.push({ g: box(0.018, 0.018, 0.3), pos: [s * 0.255, 0.03, 0.12], color: 0xd9b348 });
      p.push({ g: box(0.035, 0.012, 0.012), pos: [s * 0.12, 0.07, 0.287], rot: [0, 0, -0.5], color: 0xf1e6ff });
    }
    return p;
  }, 0, 0.03));
  return g;
}

export function makePhone() {
  const g = group('handL');
  g.add(vcMesh('phone', () => [
    { g: box(0.075, 0.13, 0.012), pos: [0, -0.02, 0.045], color: 0x2e2a40 },
    { g: box(0.062, 0.11, 0.004), pos: [0, -0.02, 0.052], color: 0xbfe9f5 },
  ], 1.3, 0.03));
  return g;
}

// ---- food & stall gear -------------------------------------------------------------------------------
export function makeNewspaper() {
  const g = group('handR', { orient: 'up', baseTilt: { x: 0.25, z: 0 }, tilt: { x: 0, z: 0 } });
  const tex = geo('newsTex', () => { const t = newsCanvas(); return t; });
  const sheet = mk(geo('acc|sheet', () => { const b = new THREE.BoxGeometry(0.34, 0.46, 0.012); b.translate(0, 0.24, 0); return b; }),
    mat(0xffffff, { spacing: 0.05, strength: 0.4, map: tex, mapKey: 'news', double: false }), { o: 1.6 });
  g.add(sheet);
  return g;
}
function newsCanvas() {
  const { c, ctx } = makeCanvas(128, 160);
  const r = rng(11);
  ctx.fillStyle = '#f2ead6'; ctx.fillRect(0, 0, 128, 160);
  drawText(ctx, 'THE DAILY', 64, 22, { size: 20, r });
  ctx.fillStyle = '#7a7280';
  for (let y = 38; y < 150; y += 7) { ctx.fillRect(10, y, 108, 2.5); if (y % 21 === 3) ctx.fillRect(10, y, 60, 2.5); }
  ctx.fillStyle = '#c9c2b4'; ctx.fillRect(14, 50, 44, 34);
  return toTexture(c);
}

export function makeNewspaperBundle() {
  const g = group('handL', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } });
  g.add(vcMesh('bundle', () => [
    seg([0, 0, 0], [0, -0.2, 0], 0.01, 0xa77a58),
    { g: box(0.34, 0.05, 0.24), pos: [0, -0.23, 0], color: 0xefe6d0 },
    { g: box(0.33, 0.05, 0.23), pos: [0.01, -0.28, 0], rot: [0, 0.1, 0], color: 0xe6dcc3 },
    { g: box(0.34, 0.05, 0.24), pos: [-0.01, -0.33, 0], rot: [0, -0.06, 0], color: 0xf3ecd8 },
    { g: box(0.355, 0.012, 0.03), pos: [0, -0.28, 0], color: 0xa77a58 },
  ], 1.6, 0.04));
  return g;
}

export function makeKadhai() {
  const g = group('ground');
  g.add(vcMesh('kadhai', () => [
    { g: lathe([[0, 0], [0.15, 0.005], [0.3, 0.06], [0.4, 0.15], [0.42, 0.18], [0.38, 0.18], [0.28, 0.09], [0, 0.04]], 10), pos: [0, 0.82, 0], color: 0x4b4660 },
    { g: cyl(0.3, 0.3, 0.01, 10), pos: [0, 0.93, 0], color: 0xe7a73a },
    ...[[-0.1, 0.05], [0.12, 0.1], [0, -0.14], [-0.17, -0.1], [0.2, -0.08]].map(([x, z]) => ({ g: sph(0.07, 6, 4), pos: [x, 0.96, z], color: 0xe0a14a })),
    { g: cyl(0.2, 0.26, 0.4, 10), pos: [0, 0.4, 0], color: 0xd7a27a },
    { g: box(0.7, 0.04, 0.5), pos: [0, 0.2, 0], color: 0xb98652 },
  ], 2, 0.05));
  return g;
}

export function makeBhelTub(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.1, z = (0.095 + 0.205 * (y / (o.torsoH ?? 0.56))) * bw + 0.24;
  const m = vcMesh('bhelTub', () => {
    const p = [
      { g: lathe([[0, 0], [0.2, 0], [0.3, 0.06], [0.33, 0.13], [0.3, 0.13], [0.27, 0.07], [0, 0.04]], 10), color: STEEL },
      { g: sph(0.26, 8, 4), pos: [0, 0.07, 0], scale: [1, 0.5, 1], color: 0xf7ecc8 },
    ];
    const bits = [0xe9776a, 0x8ccf6c, 0xf4a03d, 0xe9776a, 0x8ccf6c, 0xf6c453];
    bits.forEach((c, i) => { const a = i * 1.9; p.push({ g: sph(0.035, 5, 4), pos: [Math.sin(a) * (0.08 + i * 0.025), 0.17 - i * 0.004, Math.cos(a) * (0.08 + i * 0.02)], color: c }); });
    return p;
  }, 2, 0.04);
  m.position.set(0, 0, z - 0.1);
  g.add(m);
  g.position.y = y;
  return g;
}

export function makeGolaTray(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.08, z = (0.095 + 0.205 * (y / (o.torsoH ?? 0.56))) * bw + 0.2;
  const m = vcMesh('golaTray', () => [
    { g: box(0.56, 0.04, 0.3), color: WOOD },
    { g: box(0.22, 0.17, 0.2), pos: [-0.14, 0.105, 0], color: 0xd6eef7 },
    { g: cyl(0.035, 0.035, 0.16, 7), pos: [0.05, 0.1, 0.04], color: 0xe9776a },
    { g: cyl(0.035, 0.035, 0.16, 7), pos: [0.13, 0.1, -0.04], color: 0xf6c453 },
    { g: cyl(0.035, 0.035, 0.16, 7), pos: [0.21, 0.1, 0.04], color: 0x8ccf6c },
    { g: cyl(0.015, 0.015, 0.04, 5), pos: [0.05, 0.2, 0.04], color: 0xffffff },
    { g: cyl(0.015, 0.015, 0.04, 5), pos: [0.13, 0.2, -0.04], color: 0xffffff },
    { g: cyl(0.015, 0.015, 0.04, 5), pos: [0.21, 0.2, 0.04], color: 0xffffff },
  ], 1.8, 0.04);
  m.position.set(0, 0, z - 0.05);
  g.add(m);
  g.position.y = y;
  return g;
}

export function makeGolaStick() {
  const g = group('handL', { orient: 'up', baseTilt: { x: 0.2, z: 0 }, tilt: { x: 0, z: 0 } });
  g.add(vcMesh('golaStick', () => [
    { g: cyl(0.014, 0.014, 0.32, 5), pos: [0, 0.06, 0], color: 0xd9a46a },
    { g: sph(0.085, 6, 4), pos: [0, 0.25, 0], scale: [1, 1.15, 1], color: 0xf4fafc },
    { g: sph(0.088, 6, 3), pos: [0, 0.28, 0], scale: [1, 0.7, 1], color: 0xe9776a },
    { g: cone(0.03, 0.06, 6), pos: [0, 0.34, 0], color: 0xf6c453 },
  ], 1.6, 0.03));
  return g;
}

// ---- registry -------------------------------------------------------------------------------------
export const ACCESSORIES = {
  kettle: makeKettle, chaiGlass: makeChaiGlass, wireCarrier: makeWireCarrier, gamcha: makeGamcha, tiffinCrate: makeTiffinCrate,
  jhola: makeJhola, umbrella: makeUmbrella, sabziBag: makeSabziBag, cricketBat: makeCricketBat, stumps: makeStumps, ball: makeBall,
  whistle: makeWhistle, ticketMachine: makeTicketMachine, fishBasket: makeFishBasket, balloons: makeBalloons,
  newspaperBundle: makeNewspaperBundle, newspaper: makeNewspaper, jhara: makeJhara, sunglasses: makeSunglasses, phone: makePhone,
  kadhai: makeKadhai, bhelTub: makeBhelTub, golaTray: makeGolaTray, golaStick: makeGolaStick,
};

export function makeAccessory(name, opts = {}) {
  const f = ACCESSORIES[name];
  if (!f) throw new Error('unknown accessory: ' + name);
  return f(opts);
}
