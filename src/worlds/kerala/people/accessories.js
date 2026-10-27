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
  g.add(mk(gg, cloth(o.pattern ?? 'checks', c1, o.color2 ?? 0xfff6ea, null, { spacing: 0.06, strength: 0.35 }), { o: 1.5 }));
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

// ---- extra role gear ---------------------------------------------------------------------------------
const dyn = (g) => { g.userData.dynamic = true; return g; };
export function makeTie(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.36, z = (0.115 + 0.2 * Math.pow(y / (o.torsoH ?? 0.56), 0.85)) * bw + 0.02;
  const m = vcMesh('tie', () => [
    { g: cone(0.045, 0.1, 5), pos: [0, 0.2, 0], rot: [Math.PI, 0, 0], color: o.color ?? 0xe9776a },
    { g: cone(0.06, 0.34, 5), pos: [0, 0.02, 0.0], rot: [Math.PI, 0, 0], scale: [0.8, 1, 0.3], color: o.color ?? 0xe9776a },
  ], 0, 0.03);
  m.position.set(0, 0, z); g.add(m); g.position.y = y - 0.14;
  return g;
}
export function makeThali() { // brass plate with a lit diya, kept level
  const g = dyn(group('handL', { orient: 'up', baseTilt: { x: 0.1, z: 0 }, tilt: { x: 0, z: 0 } }));
  g.add(vcMesh('thali', () => [
    { g: cyl(0.17, 0.12, 0.03, 9), pos: [0, 0.02, 0], color: 0xe3b84a },
    { g: cyl(0.09, 0.09, 0.015, 8), pos: [0, 0.04, 0], color: 0xc9992e },
    { g: sph(0.045, 6, 4), pos: [0, 0.06, 0], scale: [1, 0.6, 1], color: 0xd9a46a },
    { g: cone(0.02, 0.075, 5), pos: [0, 0.12, 0], color: 0xffd34a },
    { g: sph(0.03, 5, 3), pos: [0.1, 0.05, 0.03], color: 0xe9776a }, { g: sph(0.03, 5, 3), pos: [-0.09, 0.05, -0.04], color: 0xf6c453 },
  ], 1.5, 0.03));
  return g;
}
export function makeBell() {
  const g = dyn(group('handR', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } }));
  g.add(vcMesh('bell', () => [
    { g: cyl(0.015, 0.015, 0.12, 5), pos: [0, -0.04, 0], color: 0xc9992e },
    { g: lathe([[0.1, -0.3], [0.09, -0.25], [0.06, -0.19], [0.03, -0.14], [0, -0.13]], 7), color: 0xe3b84a },
    { g: sph(0.02, 4, 3), pos: [0, -0.31, 0], color: 0xc9992e },
  ], 1.5, 0.03));
  return g;
}
export function makeFlowerBasket() {
  const g = dyn(group('handL', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } }));
  g.add(vcMesh('flowerBasket', () => {
    const p = [
      { g: torus(0.12, 0.012, Math.PI, 4, 8), pos: [0, -0.1, 0], color: 0xb98652 },
      { g: lathe([[0, -0.32], [0.1, -0.32], [0.15, -0.22], [0.17, -0.16], [0, -0.16]], 8), color: 0xd9a96a },
    ];
    [[0.06, 0.04], [-0.07, 0.0], [0, -0.07], [0.0, 0.08], [-0.08, 0.08], [0.09, -0.05]].forEach(([x, z], i) => p.push({ g: sph(0.06, 5, 4), pos: [x, -0.15 + (i % 2) * 0.02, z], color: [0xf6a53d, 0xf9d56a, 0xe9776a][i % 3] }));
    return p;
  }, 1.6, 0.03));
  return g;
}
export function makeTripod() { // photographer's tripod + camera (stands on the ground in front of the person)
  const g = group('ground');
  g.add(vcMesh('tripod', () => [
    seg([0, 1.25, 0], [0.4, 0, 0.1], 0.025, 0x4a4560), seg([0, 1.25, 0], [-0.4, 0, 0.1], 0.025, 0x4a4560), seg([0, 1.25, 0], [0, 0, -0.42], 0.025, 0x4a4560),
    { g: box(0.3, 0.2, 0.16), pos: [0, 1.38, 0], color: 0x59557a }, { g: cyl(0.075, 0.09, 0.2, 7), pos: [0, 1.38, 0.18], rot: [Math.PI / 2, 0, 0], color: 0x3d3a55 },
    { g: sph(0.05, 5, 4), pos: [0, 1.38, 0.3], color: 0x9fd0e8 },
  ], 1.6, 0.04));
  return g;
}
export function makeCamera() { // hand-held / neck camera
  const g = group('handL');
  g.add(vcMesh('camera', () => [
    { g: box(0.2, 0.12, 0.1), pos: [0, 0, 0.05], color: 0x59557a }, { g: cyl(0.045, 0.055, 0.1, 7), pos: [0, 0, 0.14], rot: [Math.PI / 2, 0, 0], color: 0x3d3a55 },
    { g: box(0.06, 0.03, 0.04), pos: [0.06, 0.08, 0.05], color: 0xd9d4e6 },
  ], 1.4, 0.03));
  return g;
}
export function makeBackpack() {
  const g = group('back');
  const bw = o_bw(arguments[0]);
  const m = vcMesh('backpack', () => [
    { g: sph(0.2, 7, 5), pos: [0, 0, 0], scale: [1, 1.15, 0.6], color: 0xe9776a }, { g: sph(0.12, 6, 4), pos: [0, -0.1, -0.1], scale: [1.1, 0.8, 0.6], color: 0xc65a4e },
  ], 1.8, 0.04);
  m.position.set(0, -0.0, -0.3 * bw - 0.05); g.add(m);
  return g;
}
const o_bw = (o) => (o && o.bw) || 1;
export function makeBriefcase() {
  const g = dyn(group('handR', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } }));
  g.add(vcMesh('briefcase', () => [
    { g: torus(0.06, 0.012, Math.PI, 4, 8), pos: [0, -0.04, 0], color: 0x3d3a55 }, { g: box(0.34, 0.24, 0.1), pos: [0, -0.19, 0], color: 0x8a6a52 },
    { g: box(0.04, 0.03, 0.02), pos: [0, -0.1, 0.055], color: 0xe3b84a },
  ], 1.6, 0.04));
  return g;
}
export function makeTiffinBag() {
  const g = dyn(group('handL', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } }));
  g.add(vcMesh('tiffinBag', () => [
    { g: torus(0.05, 0.01, Math.PI, 4, 8), pos: [0, -0.04, 0], color: 0xc9992e },
    ...[0, 1, 2].map((i) => ({ g: cyl(0.08, 0.08, 0.07, 7), pos: [0, -0.12 - i * 0.075, 0], color: [0xdfe5e9, 0xbfd3df, 0xdfe5e9][i] })),
  ], 1.5, 0.03));
  return g;
}
export function makeLuggage() { // coolie's head load
  const g = group('head');
  g.add(vcMesh('luggage', () => [
    { g: box(0.62, 0.3, 0.38), pos: [0, 0.15, 0], color: 0x8a6a52 }, { g: box(0.64, 0.04, 0.4), pos: [0, 0.2, 0], color: 0x5a4a52 },
    { g: box(0.44, 0.24, 0.3), pos: [0.04, 0.42, 0], rot: [0, 0.3, 0], color: 0x6c8fb0 }, { g: cyl(0.1, 0.1, 0.5, 7), pos: [-0.04, 0.68, 0], rot: [0, 0, Math.PI / 2], color: 0xcdbb7f },
    { g: box(0.04, 0.3, 0.4), pos: [0.15, 0.15, 0], color: 0xe3b84a },
  ], 2, 0.04));
  return g;
}
export function makeArmband() {
  const g = group('armR');
  g.add(vcMesh('armband', () => [{ g: cyl(0.09, 0.09, 0.07, 8), color: 0xe3b84a }, { g: box(0.05, 0.05, 0.02), pos: [0, 0, 0.09], color: 0xb98652 }], 1.2, 0.03));
  return g;
}
export function makeWatch() {
  const g = group('wristL');
  g.add(vcMesh('watch', () => [{ g: cyl(0.055, 0.055, 0.05, 7), color: 0x59557a }, { g: cyl(0.04, 0.04, 0.012, 7), pos: [0, 0, 0.0], rot: [Math.PI / 2, 0, 0], color: 0xfff6ea }], 1, 0.03));
  g.children[0].position.z = 0.0;
  return g;
}
export function makeRegister() {
  const g = group('handL');
  g.add(vcMesh('register', () => [
    { g: box(0.2, 0.28, 0.04), pos: [0, 0.0, 0.06], color: 0xb23a48 }, { g: box(0.17, 0.25, 0.03), pos: [0.01, 0.0, 0.085], color: 0xfaf3df },
  ], 1.5, 0.03));
  return g;
}
export function makeBroom() {
  const g = group('handR');
  g.add(vcMesh('broom', () => [
    { g: cyl(0.018, 0.018, 1.3, 5), pos: [0, -0.35, 0], color: 0xb98652 },
    { g: cone(0.14, 0.34, 7), pos: [0, -1.12, 0], rot: [Math.PI, 0, 0], color: 0xe3c46a },
    { g: cyl(0.06, 0.06, 0.07, 7), pos: [0, -0.96, 0], color: 0xe9776a },
  ], 1.6, 0.04));
  return g;
}
export function makeBooks() {
  const g = group('handL');
  g.add(vcMesh('books', () => [
    { g: box(0.2, 0.05, 0.26), pos: [0, 0.0, 0.07], color: 0x6c8fb0 }, { g: box(0.19, 0.045, 0.25), pos: [0.01, 0.05, 0.07], color: 0xe9776a },
    { g: box(0.2, 0.05, 0.26), pos: [0, 0.1, 0.07], color: 0xf6c453 }, { g: box(0.17, 0.04, 0.24), pos: [0, 0.145, 0.07], color: 0x8ccf9c },
  ], 1.5, 0.03));
  return g;
}
export function makeBookTray(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.08, z = (0.115 + 0.2 * Math.pow(y / (o.torsoH ?? 0.56), 0.85)) * bw + 0.2;
  const cols = [0x6c8fb0, 0xe9776a, 0xf6c453, 0x8ccf9c, 0xc9b7e8, 0xf0a3c3];
  const m = vcMesh('bookTray', () => [
    { g: box(0.6, 0.03, 0.34), color: 0xb98652 },
    ...cols.map((c, i) => ({ g: box(0.085, 0.24 + (i % 3) * 0.03, 0.22), pos: [-0.25 + i * 0.1, 0.14, 0], rot: [0, 0, (i % 2 ? 0.08 : -0.06)], color: c })),
  ], 1.6, 0.04);
  m.position.set(0, 0, z - 0.05); g.add(m); g.position.y = y;
  return g;
}
export function makeChanaBasket(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.08, z = (0.115 + 0.2 * Math.pow(y / (o.torsoH ?? 0.56), 0.85)) * bw + 0.22;
  const m = vcMesh('chanaBasket', () => [
    { g: lathe([[0, 0], [0.16, 0], [0.26, 0.12], [0.27, 0.14], [0.24, 0.14], [0.14, 0.05], [0, 0.04]], 8), color: 0xd9a96a },
    { g: sph(0.2, 7, 4), pos: [0, 0.1, 0], scale: [1, 0.45, 1], color: 0xd9b66a },
    ...[[0.1, 0.1], [-0.1, 0.05], [0, -0.12]].map(([x, zz], i) => ({ g: cone(0.045, 0.14, 5), pos: [x, 0.21, zz], color: [0xfaf3df, 0xf0d9b0, 0xfaf3df][i] })),
  ], 1.6, 0.04);
  m.position.set(0, 0, z - 0.1); g.add(m); g.position.y = y;
  return g;
}
export function makePalmFan() {
  const g = group('handR');
  g.add(vcMesh('palmFan', () => [{ g: cyl(0.014, 0.014, 0.22, 5), pos: [0, -0.1, 0], color: 0xb98652 }, { g: cyl(0.13, 0.13, 0.015, 8), pos: [0, -0.3, 0], rot: [0, 0, 0], color: 0xe3c46a }], 1.3, 0.03));
  return g;
}
export function makeCoconut() {
  const g = group('handL');
  g.add(vcMesh('coconut', () => [{ g: sph(0.1, 6, 5), pos: [0, 0.02, 0.04], color: 0x7fbf6a }, seg([0.02, 0.1, 0.04], [0.06, 0.24, 0.0], 0.008, 0xf0ece0)], 1.4, 0.03));
  return g;
}
export function makeTorch() {
  const g = group('handR');
  g.add(vcMesh('torch', () => [{ g: cyl(0.035, 0.03, 0.22, 6), pos: [0, -0.1, 0.0], color: 0x59557a }, { g: cyl(0.055, 0.04, 0.06, 6), pos: [0, -0.24, 0], color: 0xd9d4e6 }], 1.3, 0.03));
  return g;
}
export function makeCart(o = {}) { // bhutta / coconut cart (ground prop in front of the seller)
  const kind = o.kind ?? 'bhutta';
  const g = group('ground');
  g.add(vcMesh('cart|' + kind, () => {
    const p = [
      { g: box(1.0, 0.1, 0.6), pos: [0, 0.75, 0], color: kind === 'bhutta' ? 0xe9a73a : 0x6fb3a0 },
      { g: box(1.0, 0.45, 0.6), pos: [0, 0.45, 0], color: 0xb98652 },
      { g: cyl(0.22, 0.22, 0.06, 9), pos: [-0.5, 0.22, 0.34], rot: [Math.PI / 2, 0, 0], color: 0x4a4560 }, { g: cyl(0.22, 0.22, 0.06, 9), pos: [-0.5, 0.22, -0.34], rot: [Math.PI / 2, 0, 0], color: 0x4a4560 },
      seg([0.55, 0.4, 0], [0.9, 0.1, 0], 0.03, 0x4a4560),
    ];
    if (kind === 'bhutta') {
      p.push({ g: lathe([[0, 0], [0.16, 0], [0.22, 0.12], [0.2, 0.12], [0, 0.05]], 8), pos: [0.2, 0.8, 0], color: 0x4a4560 }, { g: sph(0.15, 6, 4), pos: [0.2, 0.86, 0], scale: [1, 0.5, 1], color: 0xe9553a });
      [-0.35, -0.2, -0.05].forEach((x, i) => p.push({ g: cyl(0.045, 0.045, 0.26, 6), pos: [x, 0.86, 0.1 - i * 0.04], rot: [0, 0, 1.4], color: 0xf6d34a }));
    } else {
      [[-0.3, 0.1], [-0.1, -0.1], [0.15, 0.1], [0.3, -0.12], [-0.2, -0.2], [0.0, 0.2], [0.2, -0.0], [-0.05, 0.02]].forEach(([x, z], i) => p.push({ g: sph(0.14, 6, 4), pos: [x, 0.93 + (i > 4 ? 0.18 : 0), z], color: 0x7fbf6a }));
      p.push(seg([0.1, 1.0, 0], [0.2, 1.3, 0.05], 0.01, 0xf0ece0), seg([-0.1, 1.0, 0.05], [-0.18, 1.28, 0.0], 0.01, 0xf0ece0));
    }
    return p;
  }, 2, 0.05));
  return g;
}


// ---- skipping rope -------------------------------------------------------------------------------------
/** A rope held in BOTH hands. It swings in the kid's side plane, once per skip hop (the 'skip' loop hops at sin(9*lt)), and sweeps under
 *  the feet at the top of each jump. Rebuilt every frame from the real hand bones as a thin dark ink tube (overlay layer: no hatching). */
export function makeJumpRope() {
  const g = group('ground', { dynamic: true });
  const N = 26, RAD = 4;
  const pos = new Float32Array((N + 1) * RAD * 3), idx = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < RAD; j++) { const a = i * RAD + j, b = i * RAD + ((j + 1) % RAD), c = a + RAD, d = b + RAD; idx.push(a, b, c, b, d, c); }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geom.setIndex(idx);
  const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 0x3f3150, side: THREE.DoubleSide }));
  mesh.frustumCulled = false; mesh.name = 'jump-rope';
  g.add(mesh);
  const hL = new THREE.Vector3(), hR = new THREE.Vector3(), head = new THREE.Vector3(), mid = new THREE.Vector3(), ax = new THREE.Vector3();
  const P = new THREE.Vector3(), T = new THREE.Vector3(), Nn = new THREE.Vector3(), Bn = new THREE.Vector3(), d = new THREE.Vector3();
  const pts = Array.from({ length: N + 1 }, () => new THREE.Vector3());
  let psi = 0;
  g.userData.update = (dt, c) => {
    const person = g.parent?.parent;
    const sl = person?.userData.slots;
    if (!sl) return;
    person.updateMatrixWorld(true);
    sl.handL.getWorldPosition(hL); sl.handR.getWorldPosition(hR); sl.head.getWorldPosition(head);
    g.worldToLocal(hL); g.worldToLocal(hR); g.worldToLocal(head);
    // phase of the hop: the skip loop jumps at sin(9*lt) = 1 (psi = 0 = rope under the feet); the rope turns forward once per hop
    const w = c.lt ?? c.t ?? 0;
    psi = 9 * w - Math.PI / 2;
    mid.copy(hL).add(hR).multiplyScalar(0.5);
    ax.copy(hR).sub(hL);
    const down = Math.max(0.05, mid.y - 0.03); // the rope's lowest point skims the ground
    const up = Math.max(down, head.y - mid.y + 0.14); // over the head
    const rho = down + (up - down) * 0.5 * (1 - Math.cos(psi));
    d.set(0, -Math.cos(psi), Math.sin(psi)); // apex direction in the side plane (+z forward)
    d.addScaledVector(ax, -d.dot(ax) / Math.max(1e-6, ax.lengthSq())).normalize();
    for (let i = 0; i <= N; i++) {
      const u = i / N;
      pts[i].copy(hL).addScaledVector(ax, u).addScaledVector(d, rho * Math.pow(Math.sin(Math.PI * u), 0.85));
    }
    const r = 0.024;
    for (let i = 0; i <= N; i++) {
      T.copy(pts[Math.min(N, i + 1)]).sub(pts[Math.max(0, i - 1)]).normalize();
      Nn.crossVectors(T, Math.abs(T.y) < 0.9 ? Bn.set(0, 1, 0) : Bn.set(1, 0, 0)).normalize();
      Bn.crossVectors(T, Nn);
      for (let j = 0; j < RAD; j++) {
        const a = (j / RAD) * Math.PI * 2 + 0.78;
        P.copy(pts[i]).addScaledVector(Nn, Math.cos(a) * r).addScaledVector(Bn, Math.sin(a) * r);
        const k = (i * RAD + j) * 3;
        pos[k] = P.x; pos[k + 1] = P.y; pos[k + 2] = P.z;
      }
    }
    geom.attributes.position.needsUpdate = true;
  };
  return g;
}


// ---- Chennai gear (the Bengaluru additions below are shared: lanyard, laptop bag, delivery bag, coffee tumbler, jasmine, machete) -------------------------------------------------------------------------------------
/** office ID badge on a lanyard (chest). opts: color (strap), card (badge header colour). Keyed by colour so each tint caches once. */
export function makeLanyard(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, th = o.torsoH ?? 0.56, col = o.color ?? 0x2f6fe0, card = o.card ?? col;
  const zAt = (y) => (0.115 + 0.2 * Math.pow(Math.max(0.05, y) / th, 0.85)) * bw + 0.018; // front of the torso at height y (torso space)
  const y0 = th * 0.5; // slot height
  const neckY = th * 0.97, cardY = th * 0.5 - 0.1;
  const m = vcMesh(`lanyard|${col}|${card}|${bw}|${th}`, () => {
    const p = [];
    for (const s of [-1, 1]) {
      const a = [s * 0.075 * bw, neckY - y0, zAt(neckY)], b = [s * 0.02 * bw, cardY + 0.07 - y0, zAt(cardY + 0.07)];
      p.push(seg(a, b, 0.014, col));
      p.push(seg([s * 0.075 * bw, neckY - y0, zAt(neckY) - 0.01], [s * 0.2 * bw, neckY + 0.03 - y0, 0.0], 0.014, col)); // over the shoulder
    }
    const z = zAt(cardY) + 0.012;
    p.push({ g: box(0.115, 0.15, 0.014), pos: [0, cardY - y0, z], color: 0xfbf7ea });
    p.push({ g: box(0.115, 0.04, 0.016), pos: [0, cardY + 0.055 - y0, z + 0.002], color: card });
    p.push({ g: box(0.05, 0.05, 0.016), pos: [0, cardY - 0.01 - y0, z + 0.002], color: 0xc9b7a8 }); // photo
    p.push({ g: box(0.08, 0.012, 0.016), pos: [0, cardY - 0.06 - y0, z + 0.002], color: 0x9aa0b5 });
    return p;
  }, 1.1, 0.03);
  g.add(m);
  return g;
}

/** laptop backpack: taller and squarer than the school backpack, with a front pocket, a top handle and a laptop-sleeve seam. opts: color, color2 */
export function makeLaptopBackpack(o = {}) {
  const g = group('back');
  const bw = o_bw(o), c1 = o.color ?? 0x39425f, c2 = o.color2 ?? 0x59658c;
  const m = vcMesh(`laptopBackpack|${c1}|${c2}`, () => [
    { g: box(0.42, 0.56, 0.17), pos: [0, 0.02, 0], color: c1 },
    { g: box(0.34, 0.24, 0.07), pos: [0, -0.1, -0.1], color: c2 },
    { g: box(0.3, 0.03, 0.02), pos: [0, 0.12, -0.092], color: 0xcdd6dc }, // zip seam
    { g: torus(0.07, 0.014, Math.PI, 4, 8), pos: [0, 0.3, 0], rot: [0, 0, 0], color: c2 }, // top handle
    { g: box(0.08, 0.02, 0.02), pos: [0, -0.02, -0.095], color: 0xe3b84a }, // zip pull
  ], 1.8, 0.04);
  m.position.set(0, 0.06, -0.3 * bw - 0.1); g.add(m);
  // shoulder straps seen from the front
  const st = vcMesh(`lbStrap|${c2}`, () => [seg([0.1, 0.34, -0.16], [0.14, 0.12, 0.0], 0.02, c2), seg([-0.1, 0.34, -0.16], [-0.14, 0.12, 0.0], 0.02, c2)], 1, 0.03);
  st.position.set(0, 0.0, -0.3 * bw + 0.04); g.add(st);
  return g;
}

/** unbranded insulated food-delivery bag worn as a big cube on the back. opts: color */
export function makeDeliveryBag(o = {}) {
  const g = group('back');
  const bw = o_bw(o), c1 = o.color ?? 0xf08a3c;
  const m = vcMesh(`deliveryBag|${c1}`, () => [
    { g: box(0.58, 0.54, 0.48), pos: [0, 0, 0], color: c1 },
    { g: box(0.6, 0.06, 0.5), pos: [0, 0.27, 0], color: 0xd9722a },
    { g: box(0.5, 0.03, 0.02), pos: [0, 0.12, 0.245], color: 0xfbf7ea }, // a plain reflective strip, no logo
    { g: box(0.5, 0.03, 0.02), pos: [0, -0.18, 0.245], color: 0xfbf7ea },
  ], 1.8, 0.04);
  m.position.set(0, 0.2, -0.3 * bw - 0.2); g.add(m);
  return g;
}

/** steel filter-coffee tumbler in its dabara saucer (right hand, held level) */
export function makeCoffeeTumbler() {
  const g = group('handR', { orient: 'up', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } });
  g.add(vcMesh('coffeeTumbler', () => [
    { g: lathe([[0, 0], [0.1, 0], [0.13, 0.025], [0.12, 0.035], [0.09, 0.02], [0, 0.015]], 9), color: STEEL },
    { g: cyl(0.062, 0.05, 0.1, 8), pos: [0, 0.07, 0], color: STEEL_D },
    { g: cyl(0.056, 0.056, 0.012, 8), pos: [0, 0.122, 0], color: 0xb4763f },
    { g: sph(0.03, 5, 4), pos: [0.02, 0.15, 0.0], scale: [1.3, 0.5, 1], color: 0xf1ebe0 }, // a puff of steam
  ], 1.5, 0.03));
  return g;
}

/** basket of white malli (jasmine) blossoms and a couple of hanging strands (left hand) */
export function makeJasmineBasket() {
  const g = dyn(group('handL', { orient: 'hang', baseTilt: { x: 0, z: 0 }, tilt: { x: 0, z: 0 } }));
  g.add(vcMesh('jasmineBasket', () => {
    const p = [
      { g: torus(0.12, 0.012, Math.PI, 4, 8), pos: [0, -0.1, 0], color: 0xb98652 },
      { g: lathe([[0, -0.32], [0.1, -0.32], [0.15, -0.22], [0.17, -0.16], [0, -0.16]], 8), color: 0xd9a96a },
    ];
    [[0.06, 0.04], [-0.07, 0.0], [0, -0.07], [0.0, 0.08], [-0.08, 0.08], [0.09, -0.05], [0.03, 0.0]].forEach(([x, z], i) => p.push({ g: sph(0.06, 5, 4), pos: [x, -0.14 + (i % 2) * 0.02, z], color: i % 3 === 0 ? 0xfffaf0 : 0xf4f0e2 }));
    for (const [x, z] of [[0.16, 0.0], [-0.16, 0.02]]) { // hanging strands tied to the basket rim
      p.push(seg([x, -0.2, z], [x, -0.52, z], 0.006, 0x6fae6a));
      for (let k = 0; k < 6; k++) p.push({ g: sph(0.028, 4, 3), pos: [x, -0.24 - k * 0.05, z], color: 0xfffaf0 });
    }
    return p;
  }, 1.6, 0.03));
  return g;
}

/** a strand of jasmine tucked on the shoulder-length hair (used by tweaks that want it on the back of the head) */
export function makeJasmineStrand() {
  const g = group('head');
  g.add(vcMesh('jasmineStrand', () => {
    const p = [];
    for (let k = 0; k < 7; k++) p.push({ g: sph(0.032, 4, 3), pos: [0.0, 0.02 - k * 0.04, -0.2 - k * 0.012], color: k % 2 ? 0xfffaf0 : 0xf4f0e2 });
    return p;
  }, 1.0, 0.03));
  return g;
}

/** the ilaneer seller's machete: a wooden grip and a broad steel blade (right hand) */
export function makeMachete() {
  const g = group('handR');
  g.add(vcMesh('machete', () => [
    { g: cyl(0.022, 0.022, 0.13, 5), pos: [0, 0.0, 0.0], color: 0x8a5a3c },
    { g: box(0.015, 0.05, 0.3), pos: [0, 0.04, 0.2], rot: [0.0, 0, 0], color: STEEL },
    { g: box(0.017, 0.012, 0.3), pos: [0, 0.015, 0.2], color: STEEL_D },
  ], 1.3, 0.03));
  return g;
}

/** steel box of change + sling for the MTC conductor is the ticketMachine; this one is a small suburban-ticket / smart-card (hand) */
export function makeTicketCard() {
  const g = group('handL');
  g.add(vcMesh('ticketCard', () => [
    { g: box(0.09, 0.13, 0.008), pos: [0, -0.02, 0.045], color: 0x2f7a52 },
    { g: box(0.09, 0.03, 0.01), pos: [0, 0.03, 0.045], color: 0xfbf7ea },
  ], 1.2, 0.03));
  return g;
}

/** the hero's tan leather sling bag: a cross-body strap and a small flapped bag on the hip (spine slot, same mount as the jhola). opts: color */
export function makeSlingBag(o = {}) {
  const g = group('spine');
  const bw = o.bw ?? 1, th = o.torsoH ?? 0.56;
  const r = (y) => (0.095 + 0.205 * (y / th)) * bw;
  const col = o.color ?? 0xb9824f, dark = 0x8a5a36;
  const strap = geo(`acc|slingStrap|${bw}`, () => {
    const pts = [];
    const N = 8;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const y = th + 0.02 - (th * 0.95) * t, x = 0.2 * bw - 0.5 * bw * t;
      const z = Math.sqrt(Math.max(0, r(Math.max(0, y)) ** 2 - x * x)) + 0.012 - (i === 0 ? 0.2 : 0);
      pts.push(new THREE.Vector3(x, y, i === 0 ? -0.1 : z));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 10, 0.02, 3, false);
  });
  g.add(mk(strap, mat(col, { spacing: 0.03 }), { o: 1.4 }));
  g.add((() => {
    const m = vcMesh(`slingBag|${col}`, () => [
      { g: box(0.1, 0.26, 0.3), pos: [0, 0, 0], color: col },
      { g: box(0.11, 0.1, 0.31), pos: [0, 0.1, 0], color: dark }, // flap
      { g: box(0.115, 0.04, 0.05), pos: [0, 0.06, 0.0], color: 0xe3b84a }, // buckle
    ], 1.8, 0.04);
    m.position.set(-0.3 * bw - 0.05, -0.02, -0.04);
    return m;
  })());
  return g;
}

/** a camera on a neck strap, resting on the chest (chest slot): body, lens, flash, strap loop to the neck. opts: color */
export function makeNeckCamera(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, th = o.torsoH ?? 0.56, y0 = th * 0.5;
  const zAt = (y) => (0.115 + 0.2 * Math.pow(Math.max(0.05, y) / th, 0.85)) * bw + 0.02;
  const neckY = th * 0.97, camY = th * 0.5 - 0.06;
  const m = vcMesh(`neckCamera|${bw}|${th}`, () => {
    const p = [];
    for (const s of [-1, 1]) {
      p.push(seg([s * 0.075 * bw, neckY - y0, zAt(neckY)], [s * 0.06, camY + 0.05 - y0, zAt(camY) + 0.04], 0.013, 0x2b2840));
      p.push(seg([s * 0.075 * bw, neckY - y0, zAt(neckY) - 0.01], [s * 0.2 * bw, neckY + 0.03 - y0, 0.0], 0.013, 0x2b2840));
    }
    const z = zAt(camY) + 0.07;
    p.push({ g: box(0.22, 0.13, 0.09), pos: [0, camY - y0, z], color: 0x3d3a55 });
    p.push({ g: box(0.22, 0.04, 0.095), pos: [0, camY - y0 + 0.045, z], color: 0xd9d4e6 }); // silver top plate
    p.push({ g: cyl(0.055, 0.06, 0.09, 8), pos: [0, camY - y0, z + 0.07], rot: [Math.PI / 2, 0, 0], color: 0x2b2840 });
    p.push({ g: cyl(0.04, 0.04, 0.02, 8), pos: [0, camY - y0, z + 0.12], rot: [Math.PI / 2, 0, 0], color: 0x9fd3ea }); // glass
    p.push({ g: box(0.05, 0.03, 0.03), pos: [0.07, camY - y0 + 0.08, z], color: 0xd9d4e6 }); // flash
    return p;
  }, 1.4, 0.03);
  g.add(m);
  return g;
}

/** a small red notebook with a pen clipped across the cover (hand) */
export function makeNotebook() {
  const g = group('handR');
  g.add(vcMesh('notebook', () => [
    { g: box(0.2, 0.012, 0.28), pos: [0, 0.0, 0.14], color: 0xc4453f },
    { g: box(0.19, 0.01, 0.27), pos: [0, -0.01, 0.14], color: 0xf7f0da }, // pages
    { g: box(0.012, 0.014, 0.28), pos: [-0.09, 0.006, 0.14], color: 0x7a2420 }, // spine
    { g: cyl(0.008, 0.008, 0.2, 5), pos: [0.05, 0.016, 0.15], rot: [Math.PI / 2, 0, 0.1], color: 0x2f58a5 }, // pen
  ], 1.3, 0.03));
  return g;
}

/** the temple priest's sacred thread (poonal): a thin white loop from the left shoulder across the chest to the right hip (chest slot) */
export function makePoonal(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, th = o.torsoH ?? 0.56, y0 = th * 0.5;
  const zAt = (y) => (0.115 + 0.2 * Math.pow(Math.max(0.05, y) / th, 0.85)) * bw + 0.016;
  const m = vcMesh(`poonal|${bw}|${th}`, () => {
    const p = [];
    const pts = [[0.2 * bw, th * 0.99], [0.13 * bw, th * 0.78], [0.04 * bw, th * 0.6], [-0.06 * bw, th * 0.4], [-0.14 * bw, th * 0.2], [-0.19 * bw, th * 0.05]];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      p.push(seg([x1, y1 - y0, zAt(y1)], [x2, y2 - y0, zAt(y2)], 0.011, 0xfbf7ea));
    }
    p.push(seg([0.2 * bw, th * 0.99 - y0, zAt(th * 0.99) - 0.03], [0.22 * bw, th * 0.99 - y0, -0.05], 0.011, 0xfbf7ea)); // up over the shoulder
    p.push(seg([-0.19 * bw, th * 0.05 - y0, zAt(th * 0.05) - 0.03], [-0.2 * bw, th * 0.05 - y0, -0.12], 0.011, 0xfbf7ea)); // round the back
    return p;
  }, 1.0, 0.03);
  g.add(m);
  return g;
}

/** molaga bajji tray: a newspaper-lined steel tray of golden chilli fritters with long green chillies on top (chest slot) */
export function makeBajjiTray(o = {}) {
  const g = group('chest');
  const bw = o.bw ?? 1, y = 0.06, z = (0.115 + 0.2 * Math.pow(y / (o.torsoH ?? 0.56), 0.85)) * bw + 0.2;
  const m = vcMesh('bajjiTray', () => [
    { g: lathe([[0, 0], [0.2, 0], [0.27, 0.07], [0.26, 0.09], [0.0, 0.06]], 8), color: STEEL },
    { g: sph(0.22, 7, 4), pos: [0, 0.08, 0], scale: [1, 0.2, 1], color: 0xf1ead8 }, // newspaper
    ...[[0.1, 0.06], [-0.1, 0.05], [0, -0.1], [0.12, -0.07], [-0.08, -0.06], [0.0, 0.08]].map(([x, zz], i) => ({ g: cone(0.04, 0.2, 5), pos: [x, 0.15, zz], rot: [0.3 * (i % 3 - 1), 0, 0.4 * (i % 2 ? 1 : -1)], color: [0xe8b64a, 0xdea53a, 0xf0c25a][i % 3] })),
    ...[[0.0, 0.0], [0.06, -0.04]].map(([x, zz]) => ({ g: cone(0.02, 0.2, 5), pos: [x, 0.22, zz], rot: [1.4, 0, 0.5], color: 0x4fa14a })),
  ], 1.6, 0.04);
  m.position.set(0, 0, z - 0.1); g.add(m); g.position.y = y;
  return g;
}


// ---- Ananya's travel kit (the Kochi hero) and Kerala extras -----------------------------------------------------------

/** the hero's big backpacker rucksack: a tall rust-orange pack with a front pocket, side bottle, and a blue foam sleeping mat rolled across the top and strapped. back slot. opts: color */
export function makeRucksack(o = {}) {
  const g = group('back');
  const bw = o_bw(o), c1 = o.color ?? 0xc9603a, c2 = 0xa24a2c;
  const m = vcMesh(`rucksack|${c1}`, () => [
    { g: box(0.5, 0.7, 0.26), pos: [0, 0.02, 0], color: c1 },
    { g: sph(0.2, 7, 5), pos: [0, -0.2, -0.12], scale: [1.15, 0.8, 0.5], color: c2 }, // front pocket
    { g: box(0.3, 0.03, 0.02), pos: [0, 0.1, -0.133], color: 0xe3b84a }, // zip
    { g: cyl(0.05, 0.05, 0.3, 7), pos: [0.31, -0.12, 0.0], color: 0x4fa3b8 }, // water bottle in the side pocket
    { g: cyl(0.1, 0.1, 0.62, 9), pos: [0, 0.46, 0], rot: [0, 0, Math.PI / 2], color: 0x3e86c9 }, // rolled sleeping mat
    { g: cyl(0.075, 0.075, 0.63, 9), pos: [0, 0.46, 0], rot: [0, 0, Math.PI / 2], color: 0x2e69a8 }, // (inner roll)
    ...[-0.2, 0.2].map((x) => ({ g: box(0.035, 0.2, 0.24), pos: [x, 0.46, 0], color: 0xf0e4c8 })), // straps round the roll
    { g: torus(0.07, 0.014, Math.PI, 4, 8), pos: [0, 0.37, 0], color: c2 }, // top handle
  ], 1.9, 0.04);
  m.position.set(0, 0.06, -0.3 * bw - 0.13); g.add(m);
  const st = vcMesh('rucksackStrap', () => [seg([0.1, 0.34, -0.16], [0.15, 0.1, 0.0], 0.022, c2), seg([-0.1, 0.34, -0.16], [-0.15, 0.1, 0.0], 0.022, c2)], 1, 0.03);
  st.position.set(0, 0.0, -0.3 * bw + 0.04); g.add(st);
  g.scale.setScalar(1.22); g.position.y = -0.05;
  return g;
}

/** a wide-brimmed straw hat with a red band (head slot, origin = crown base). opts: headR */
export function makeStrawHat(o = {}) {
  const g = group('head');
  const r = o.headR ?? 0.32;
  g.add(vcMesh(`strawHat|${r}`, () => [
    { g: lathe([[0, -0.01], [r * 1.9, -0.01], [r * 2.0, 0.02], [r * 1.2, 0.04], [r * 1.02, 0.05]], 14), pos: [0, -r * 0.28, 0], color: 0xe3c27a }, // brim
    { g: lathe([[r * 1.02, 0.0], [r * 0.98, r * 0.5], [r * 0.82, r * 0.72], [0, r * 0.76]], 12), pos: [0, -r * 0.28, 0], color: 0xdcb866 }, // crown
    { g: cyl(r * 1.03, r * 1.04, r * 0.16, 12), pos: [0, -r * 0.18, 0], color: 0xc4453f }, // red band
  ], 2, 0.04));
  return g;
}

/** a folded paper map held in the hand: a panel of tan paper with a red route line and a blue patch of sea (handR) */
export function makeFoldedMap() {
  const g = group('handR');
  g.add(vcMesh('foldedMap', () => [
    { g: box(0.22, 0.012, 0.3), pos: [0, 0, 0.14], color: 0xf1e3b8 },
    { g: box(0.22, 0.014, 0.1), pos: [0, 0.002, 0.24], rot: [-0.18, 0, 0], color: 0xe9d8a4 }, // a lifted fold
    { g: box(0.07, 0.016, 0.08), pos: [-0.06, 0.008, 0.12], color: 0x8fc4dc }, // sea / backwater
    { g: box(0.015, 0.016, 0.22), pos: [0.05, 0.009, 0.14], rot: [0, 0.3, 0], color: 0xd9453b }, // route
  ], 1.3, 0.03));
  return g;
}

/** a football: a held ball (handR) or, with slot:'ground', one at the player's feet that hops a little (update hook) */
export function makeFootball(o = {}) {
  const g = group('handR');
  const m = vcMesh('football', () => [
    { g: sph(0.1, 8, 6), pos: [0, -0.06, 0], color: 0xf8f5ec },
    ...[[0, 0.1, 0], [0.09, -0.02, 0.04], [-0.09, -0.04, 0.03], [0.02, -0.06, 0.1]].map(([x, y, z]) => ({ g: sph(0.032, 5, 4), pos: [x, y - 0.06, z], color: 0x2b2840 })),
  ], 1.4);
  g.add(m);
  if (o.slot === 'ground') {
    g.userData.slot = 'ground';
    m.position.y = 0.1;
    g.userData.update = (dt, ctx) => { const t = (ctx?.lt ?? ctx?.t ?? 0) % 3.4; m.position.y = 0.1 + (t > 2.2 && t < 2.9 ? Math.sin(((t - 2.2) / 0.7) * Math.PI) * 0.35 : 0); };
  }
  return g;
}

/** a police lathi (long wooden baton) hanging from the right hand */
export function makeLathi() {
  const g = group('handR', { orient: 'hang', baseTilt: { x: -0.25, z: 0 }, tilt: { x: 0, z: 0 } });
  g.add(vcMesh('lathi', () => [{ g: cyl(0.022, 0.022, 1.0, 6), pos: [0, -0.4, 0], color: 0x8a5a36 }, { g: cyl(0.026, 0.026, 0.05, 6), pos: [0, 0.07, 0], color: 0x3d2a1c }], 1.4));
  return g;
}

// ---- registry -------------------------------------------------------------------------------------
export const ACCESSORIES = {
  kettle: makeKettle, chaiGlass: makeChaiGlass, wireCarrier: makeWireCarrier, gamcha: makeGamcha, tiffinCrate: makeTiffinCrate,
  jhola: makeJhola, umbrella: makeUmbrella, sabziBag: makeSabziBag, cricketBat: makeCricketBat, stumps: makeStumps, ball: makeBall,
  whistle: makeWhistle, ticketMachine: makeTicketMachine, fishBasket: makeFishBasket, balloons: makeBalloons,
  newspaperBundle: makeNewspaperBundle, newspaper: makeNewspaper, jhara: makeJhara, sunglasses: makeSunglasses, phone: makePhone,
  kadhai: makeKadhai, bhelTub: makeBhelTub, golaTray: makeGolaTray, golaStick: makeGolaStick,
  tie: makeTie, thali: makeThali, bell: makeBell, flowerBasket: makeFlowerBasket, tripod: makeTripod, camera: makeCamera,
  backpack: makeBackpack, briefcase: makeBriefcase, tiffinBag: makeTiffinBag, luggage: makeLuggage, armband: makeArmband, watch: makeWatch,
  register: makeRegister, broom: makeBroom, books: makeBooks, bookTray: makeBookTray, chanaBasket: makeChanaBasket, palmFan: makePalmFan,
  coconut: makeCoconut, torch: makeTorch, cart: makeCart, jumpRope: makeJumpRope,
  lanyard: makeLanyard, laptopBackpack: makeLaptopBackpack, deliveryBag: makeDeliveryBag, coffeeTumbler: makeCoffeeTumbler, jasmineBasket: makeJasmineBasket,
  jasmineStrand: makeJasmineStrand, ticketCard: makeTicketCard, machete: makeMachete,
  rucksack: makeRucksack, strawHat: makeStrawHat, foldedMap: makeFoldedMap, football: makeFootball, lathi: makeLathi, slingBag: makeSlingBag, neckCamera: makeNeckCamera, notebook: makeNotebook, poonal: makePoonal, bajjiTray: makeBajjiTray,
};

export function makeAccessory(name, opts = {}) {
  const f = ACCESSORIES[name];
  if (!f) throw new Error('unknown accessory: ' + name);
  return f(opts);
}
