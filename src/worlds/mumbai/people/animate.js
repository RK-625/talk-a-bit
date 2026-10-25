/**
 * people/animate.js: shared procedural animation for every createPerson() figure. No clips, just maths.
 *
 * attachAnimator(person, rig, cfg) installs on person.userData:
 *   animate(dt, state)        state = { speed, walk 0..1, grounded, vr, time, phase }  (what engine/player.js passes; any field
 *                             may be missing, NPCs can just call animate(dt) ). Idle breathing/sway, walk cycle (hip swing, knee
 *                             bend, counter-swinging elbows, bob, twist), jump pose, blink, look-at, loop, accessories.
 *   setLookTarget(vec3|null)  world-space point the head turns toward (clamped yaw/pitch, body twists a little; ignored if behind)
 *   playLoop(name|null)       role loop (cross-faded): see LOOPS below. null = back to plain idle.
 *   playOnce(name, seconds)   one-shot overlay loop (e.g. playOnce('wave', 2))
 *   loop                      current loop name
 *
 * LOOPS: wave frying pouring leaning carry headLoad ticket whistle texting chat sabzi bat bowl pose stir crank sell shout
 * Add your own: LOOPS.myLoop = (c) => { c.arm(c.P.armR, {x:1, e:.5}, c.w); ... }  (c: P pose, w weight, lt loop time, t, acc, talk)
 *
 * Pose conventions (radians): arm.x forward swing (+ = forward/up), arm.z outward spread (+ = away from body), arm.e elbow bend
 * (forearm forward), arm.ez forearm outward; leg.h hip swing (+ = forward), leg.k knee bend, leg.a toe-up, leg.s spread.
 *
 * autoAnimate(person, state?) -> person: animates itself via a render hook (for the lab turntable / quick demos).
 */
import * as THREE from 'three';

const clamp = THREE.MathUtils.clamp;
const sstep = THREE.MathUtils.smoothstep;
const lerp = THREE.MathUtils.lerp;
const damp = (a, b, l, dt) => a + (b - a) * (1 - Math.exp(-l * dt));
const TAU = Math.PI * 2;

const GAIT = { stride: 0.52, knee: 1.05, armSwing: 0.55, elbow: 0.55, bounce: 0, sway: 0.04, lean: 0.05, twist: 0.12, strideMul: 1, speed: 1, rest: 0.12 };

const newArm = () => ({ x: 0, z: 0.12, e: 0.12, ez: 0 });
const newLeg = () => ({ h: 0, k: 0, a: 0, s: 0 });
function newPose() {
  return {
    hipY: 0, hipRx: 0, hipRy: 0, hipRz: 0, spX: 0, spY: 0, spZ: 0, hdX: 0, hdY: 0, hdZ: 0, skX: 0, skZ: 0,
    armL: newArm(), armR: newArm(), legL: newLeg(), legR: newLeg(),
  };
}
function resetPose(P, rest) {
  P.hipY = P.hipRx = P.hipRy = P.hipRz = P.spX = P.spY = P.spZ = P.hdX = P.hdY = P.hdZ = P.skX = P.skZ = 0;
  for (const A of [P.armL, P.armR]) { A.x = 0; A.z = rest; A.e = 0.12; A.ez = 0; }
  for (const L of [P.legL, P.legR]) { L.h = L.k = L.a = L.s = 0; }
}
/** blend arm/leg fields toward a target by w */
function to(o, tgt, w) { for (const k in tgt) o[k] += (tgt[k] - o[k]) * w; }
const sm = (a, b, x) => sstep(x, a, b); // smoothstep(edge0, edge1, x)

// ---- role loops -------------------------------------------------------------------------------------------
export const LOOPS = {
  wave(c) {
    const { P, w, lt } = c;
    to(P.armR, { x: 0.15, z: 2.35 + Math.sin(lt * 9) * 0.28, e: 0.35 + Math.sin(lt * 9 + 1) * 0.2, ez: 0 }, w);
    P.hdZ += w * -0.08; P.spZ += w * 0.04;
  },
  frying(c) {
    const { P, w, lt } = c;
    to(P.armR, { x: 0.95 + Math.sin(lt * 2.6) * 0.1, z: 0.12 + Math.cos(lt * 2.6) * 0.1, e: 0.6 + Math.cos(lt * 2.6) * 0.12, ez: 0 }, w);
    to(P.armL, { x: 0.05, z: 0.6, e: 1.45, ez: -0.7 }, w);
    P.spX += w * (0.1 + Math.sin(lt * 1.3) * 0.02); P.hdX += w * 0.22; P.hdZ += w * Math.sin(lt * 0.6) * 0.05;
  },
  pouring(c) {
    const { P, w, lt } = c;
    const T = 5.4, u = (lt % T) / T;
    const up = sm(0, 0.14, u) * (1 - sm(0.76, 0.9, u));
    const pour = sm(0.2, 0.34, u) * (1 - sm(0.62, 0.74, u));
    to(P.armR, { x: lerp(0.35, 1.05, up), z: 0.1, e: lerp(0.5, 0.75, up), ez: 0 }, w);
    to(P.armL, { x: lerp(0.3, 1.0, up), z: lerp(0.1, -0.5, up), e: lerp(0.9, 0.7, up), ez: -0.2 }, w);
    P.hdX += w * 0.28 * up; P.spX += w * 0.05 * up;
    const k = c.acc.kettle;
    if (k) { k.userData.tilt.x = pour * 0.85 * w; k.userData.pour?.(pour * w, 0.5); }
  },
  leaning(c) {
    const { P, w, lt } = c;
    // arms folded across the chest, body leaning back, one foot propped up behind
    to(P.armL, { x: 0.6, z: -0.1, e: 2.2, ez: -1.45 }, w);
    to(P.armR, { x: 0.75, z: -0.1, e: 2.3, ez: -1.45 }, w);
    P.spX += w * -0.2; P.hdX += w * 0.1; P.hdZ += w * 0.08 + Math.sin(lt * 0.5) * 0.04 * w; P.hdY += w * Math.sin(lt * 0.35) * 0.4;
    P.hipRx += w * 0.12; P.hipRz += w * 0.06;
    to(P.legL, { h: 0.12, s: -0.16 }, w);   // ankles crossed
    to(P.legR, { h: 0.05, k: 0.1, s: -0.12 }, w);
    P.legR.a += w * Math.max(0, Math.sin(lt * 3)) * (Math.sin(lt * 0.4) > 0.3 ? 0.35 : 0); // occasional toe tap
  },
  carry(c) { // tiffin crate on the head, both hands steady it
    const { P, w, lt } = c;
    to(P.armL, { x: 0.1, z: 2.9, e: 0.2, ez: -0.25 }, w);
    to(P.armR, { x: 0.1, z: 2.9, e: 0.2, ez: -0.25 }, w);
    P.spX += w * -0.04; P.hdX += w * 0.02;
  },
  headLoad(c) { // fish basket on the head, one hand up, one swinging
    const { P, w, lt } = c;
    to(P.armR, { x: 0.1, z: 2.9, e: 0.2, ez: -0.3 }, w);
    to(P.armL, { z: 0.55, e: 0.6, ez: 0.0 }, w);
    P.hipRz += w * Math.sin(lt * 0.9) * 0.03;
  },
  ticket(c) {
    const { P, w, lt } = c;
    const T = 4.6, u = (lt % T) / T;
    const bell = sm(0.62, 0.68, u) * (1 - sm(0.9, 0.96, u));
    to(P.armR, { x: 0.55 + Math.sin(lt * 5) * 0.05, z: 0.05, e: 1.55 + Math.sin(lt * 5) * 0.08, ez: -0.1 }, w);
    to(P.armL, { x: lerp(0.9, 0.2, bell), z: lerp(0.3, 2.45, bell) + Math.sin(lt * 14) * 0.08 * bell, e: lerp(0.5, 0.15, bell), ez: 0 }, w);
    P.hdY += w * Math.sin(lt * 0.8) * 0.3;
  },
  whistle(c) {
    const { P, w, lt } = c;
    const T = 7, u = (lt % T) / T;
    const stop = sm(0.0, 0.08, u) * (1 - sm(0.42, 0.5, u));
    const wave = sm(0.52, 0.6, u) * (1 - sm(0.92, 0.98, u));
    to(P.armR, { x: lerp(0.15, 1.5, stop), z: lerp(0.15, 0.1, stop), e: 0.1, ez: 0 }, w * Math.max(stop, 0.0001) + 0);
    to(P.armR, { x: 0.6 + Math.sin(lt * 5) * 0.55, z: 0.35, e: 0.9, ez: 0 }, w * wave);
    to(P.armL, { x: 0.1, z: 0.55, e: 1.3, ez: -0.85 }, w);
    P.hdY += w * lerp(0, -0.25, wave);
    const wh = c.acc.whistle;
    if (wh) { const s = 1 + Math.max(0, Math.sin(lt * 9)) * 0.25 * (stop + wave > 0.3 ? 1 : 0); wh.scale.setScalar(s); }
  },
  texting(c) {
    const { P, w, lt } = c;
    to(P.armL, { x: 0.8, z: 0.0, e: 1.6, ez: -0.2 }, w);
    to(P.armR, { x: 0.1, z: 0.14, e: 0.4, ez: 0 }, w);
    P.hdX += w * (0.36 + Math.sin(lt * 1.1) * 0.03); P.spX += w * 0.06;
    const ph = c.acc.phone;
  },
  chat(c) {
    const { P, w, lt } = c;
    const g = Math.sin(lt * 2.2);
    to(P.armL, { x: 0.15, z: 0.12, e: 1.7, ez: -0.1 }, w);
    to(P.armR, { x: 0.7 + g * 0.2, z: 0.35 + g * 0.1, e: 1.05 + g * 0.3, ez: 0.1 }, w);
    P.hdX += w * Math.sin(lt * 3.1) * 0.06; P.hdY += w * Math.sin(lt * 0.7) * 0.25; P.hipRz += w * 0.05;
    c.talk(w > 0.5 && Math.sin(lt * 7) + Math.sin(lt * 2.3) * 0.8 > 0.5);
  },
  sabzi(c) {
    const { P, w, lt } = c;
    to(P.armR, { x: 0.45, z: 0.25, e: 1.15, ez: 0 }, w);
    to(P.armL, { x: 0.12, z: 0.1, e: 0.35, ez: 0 }, w);
    P.hdY += w * Math.sin(lt * 0.9) * 0.35; P.hdZ += w * Math.sin(lt * 1.8) * 0.07; P.hipRz += w * Math.sin(lt * 0.6) * 0.03;
  },
  bat(c) {
    const { P, w, lt } = c;
    const T = 4.4, u = (lt % T) / T;
    const back = sm(0.55, 0.68, u) * (1 - sm(0.7, 0.72, u));
    const swing = sm(0.7, 0.78, u) * (1 - sm(0.86, 0.98, u));
    const bat = c.acc.cricketBat;
    const tap = Math.max(0, Math.sin(lt * 3.5)) * (1 - sm(0.5, 0.58, u)) * (u < 0.5 ? 1 : 0);
    to(P.legL, { s: 0.2, k: 0.4, h: 0.15 }, w); to(P.legR, { s: 0.2, k: 0.3, h: -0.1 }, w);
    P.hipY += w * -0.07; P.spX += w * 0.28; P.hdX += w * -0.15;
    P.spY += w * (lerp(0.45, -0.7, swing) * (1) - back * 0.2);
    to(P.armR, { x: 0.8, z: 0.0, e: 0.55, ez: 0 }, w);
    to(P.armL, { x: 0.8, z: -0.05, e: 0.6, ez: -0.35 }, w);
    P.hdY += w * (-P.spY * 0.6);
    if (bat) bat.userData.tilt.x = w * (0.35 * tap + back * 1.5 - swing * 1.6);
  },
  bowl(c) {
    const { P, w, lt } = c;
    const T = 3.6, u = (lt % T) / T;
    const run = 1 - sm(0.42, 0.5, u);
    const thr = sm(0.5, 0.64, u);
    const hop = Math.abs(Math.sin(lt * 7)) * run;
    P.hipY += w * hop * 0.08;
    P.legL.h += w * Math.sin(lt * 7) * 0.5 * run; P.legR.h += w * -Math.sin(lt * 7) * 0.5 * run;
    P.legL.k += w * Math.max(0, Math.cos(lt * 7)) * 0.9 * run; P.legR.k += w * Math.max(0, -Math.cos(lt * 7)) * 0.9 * run;
    P.armR.x += w * (thr * TAU * 0.98 + Math.sin(lt * 7) * 0.4 * run);
    P.armR.e += w * 0.1; P.armR.z += w * 0.1;
    to(P.armL, { x: lerp(1.0, 0.2, sm(0.5, 0.7, u)), z: 0.3, e: 0.2, ez: 0 }, w * (u > 0.1 ? 1 : 0.5));
    P.spX += w * (0.15 + 0.3 * sm(0.55, 0.64, u) * (1 - sm(0.7, 0.85, u)));
    const ball = c.acc.ball;
    if (ball) ball.visible = !(u > 0.58 && u < 0.88);
  },
  pose(c) {
    const { P, w, lt } = c;
    const keys = [POSE_A, POSE_B, POSE_C];
    const D = 2.6, n = keys.length, tt = (lt / D) % n, i = Math.floor(tt), f = sm(0.7, 1.0, tt - i);
    const a = keys[i], b = keys[(i + 1) % n];
    for (const arm of ['armL', 'armR']) {
      const t = {};
      for (const k of ['x', 'z', 'e', 'ez']) t[k] = lerp(a[arm][k], b[arm][k], f);
      to(P[arm], t, w);
    }
    for (const k of ['hipRz', 'spX', 'hdX', 'hdY', 'hdZ', 'spZ', 'hipY']) P[k] += w * lerp(a[k] ?? 0, b[k] ?? 0, f);
    for (const L of ['legL', 'legR']) for (const k of ['h', 'k', 's']) P[L][k] += w * lerp(a[L]?.[k] ?? 0, b[L]?.[k] ?? 0, f);
  },
  stir(c) {
    const { P, w, lt } = c;
    to(P.armR, { x: 0.95 + Math.sin(lt * 5) * 0.1, z: 0.18 + Math.cos(lt * 5) * 0.1, e: 0.85, ez: 0 }, w);
    to(P.armL, { x: 0.6 + Math.max(0, Math.sin(lt * 2.5)) * 0.35, z: 0.45, e: 1.1, ez: -0.2 }, w);
    P.hdX += w * 0.25; P.spX += w * 0.08; P.hdY += w * Math.sin(lt * 0.5) * 0.15;
  },
  crank(c) {
    const { P, w, lt } = c;
    to(P.armR, { x: 0.65 + Math.sin(lt * 4) * 0.28, z: 0.3, e: 1.45 + Math.cos(lt * 4) * 0.3, ez: 0 }, w);
    to(P.armL, { x: 0.55, z: 0.5, e: 1.2, ez: -0.1 }, w);
    P.hdX += w * 0.2; P.spX += w * 0.06; P.spY += w * Math.sin(lt * 4) * 0.05;
  },
  sell(c) {
    const { P, w, lt } = c;
    const T = 5.5, u = (lt % T) / T;
    const wv = sm(0.5, 0.58, u) * (1 - sm(0.85, 0.92, u));
    to(P.armL, { x: 0.35, z: 0.5, e: 1.15, ez: 0 }, w);
    to(P.armR, { x: 0.15, z: 2.35 + Math.sin(lt * 9) * 0.25, e: 0.35, ez: 0 }, w * wv);
    P.hdZ += w * Math.sin(lt * 1.1) * 0.08; P.hipRz += w * Math.sin(lt * 0.8) * 0.04;
  },
  shout(c) {
    const { P, w, lt } = c;
    const T = 2.2, u = (lt % T) / T;
    const s = sm(0.0, 0.1, u) * (1 - sm(0.45, 0.55, u));
    to(P.armR, { x: 0.45, z: lerp(0.75, 1.15, s) + Math.sin(lt * 3) * 0.08, e: lerp(1.1, 0.8, s), ez: 0.1 }, w);
    to(P.armL, { x: 0.1, z: 0.12, e: 0.4, ez: 0 }, w);
    P.hdX += w * -0.18 * s; P.spX += w * -0.05 * s;
    c.talk(w > 0.5 && s > 0.3);
  },
};

const POSE_A = { // arms wide open, chest out
  armL: { x: 0.25, z: 1.55, e: 0.2, ez: 0 }, armR: { x: 0.25, z: 1.55, e: 0.2, ez: 0 },
  spX: -0.12, hdX: -0.15, hdZ: 0.15, hipRz: 0.06, legL: { s: 0.12 }, legR: { s: 0.12 },
};
const POSE_B = { // salute-gaze into the distance
  armL: { x: 0.1, z: 0.6, e: 1.4, ez: -0.8 }, armR: { x: 1.0, z: 0.25, e: 2.3, ez: -0.1 },
  hdY: 0.35, hdX: 0.04, hipRz: 0.12, spZ: -0.06, legR: { h: 0.35, k: 0.3 },
};
const POSE_C = { // disco point
  armL: { x: 0.0, z: 0.5, e: 1.2, ez: -0.6 }, armR: { x: 0.25, z: 2.6, e: 0.1, ez: 0 },
  hipRz: -0.16, hdZ: -0.14, hdX: -0.08, spZ: 0.1, legL: { h: 0.12, k: 0.15, s: 0.1 }, legR: { h: -0.3, s: 0.08 },
};

// ---- the animator -------------------------------------------------------------------------------------------
const _q1 = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _qd = new THREE.Quaternion(), _e = new THREE.Euler();
const _v = new THREE.Vector3();

export function attachAnimator(person, rig, cfg = {}) {
  const G = { ...GAIT, ...(cfg.kid ? { stride: 0.6, knee: 1.25, armSwing: 0.5, bounce: 0.05, sway: 0.07, lean: 0.1, twist: 0.16, speed: 1.15 } : {}), ...cfg.gait };
  const hold = cfg.hold ?? null;
  const seed = (cfg.seed ?? 1) * 1.37;
  const P = newPose();
  const legL = rig.legs[0], legR = rig.legs[1], armL = rig.arms[0], armR = rig.arms[1];
  const legLen = rig.hipY - 0.055;
  let t = seed * 3.1, ph = seed, walkS = 0;
  let loopCur = null, loopPrev = null, wCur = 0, wPrev = 0, lt = 0, ltPrev = 0;
  const once = [];
  const look = { target: null, yaw: 0, pitch: 0 };
  let blinkT = 1.5 + (seed % 2), blinkOn = 0, mouth = false;
  let squash = 0, squashV = 0, wasGround = true, wasVr = 0;
  const swayTilt = new Map();

  const ctx = { P, w: 1, lt: 0, t: 0, acc: rig.accMap, talk: (b) => { mouth = b; }, arm: to, face: rig.face };

  function runLoop(name, w, time) {
    const f = LOOPS[name];
    if (!f || w < 0.001) return;
    ctx.w = w; ctx.lt = time; ctx.t = t;
    f(ctx);
  }

  function animate(dt, s = {}) {
    dt = Math.min(Math.max(dt, 0), 0.1);
    t += dt;
    const walkIn = s.walk ?? (s.speed != null ? clamp(s.speed / 6, 0, 1) : 0);
    walkS = walkIn;
    const grounded = s.grounded ?? true;
    const vr = s.vr ?? 0;
    if (s.phase != null) ph = s.phase * G.speed; else ph += dt * (6 + 8 * walkIn) * G.speed;
    const w = walkS * (grounded ? 1 : 0.2);

    resetPose(P, G.rest);
    // idle: breathing, weight shift, little head drift
    const idle = 1 - walkS;
    P.hipY += Math.sin(t * 2.1 + seed) * 0.006 * idle;
    P.spX += Math.sin(t * 2.1 + seed) * 0.012 * idle;
    P.armL.z += Math.sin(t * 2.1 + seed) * 0.02; P.armR.z += Math.sin(t * 2.1 + seed) * 0.02;
    P.hipRz += Math.sin(t * 0.45 + seed) * 0.025 * idle;
    P.hdZ += Math.sin(t * 0.7 + seed * 2) * 0.03 * idle;
    P.hdY += Math.sin(t * 0.33 + seed) * 0.12 * idle;
    P.armL.x += Math.sin(t * 0.8 + seed) * 0.03 * idle; P.armR.x -= Math.sin(t * 0.8 + seed) * 0.03 * idle;

    // held arm pose (carrying things while walking)
    const swingAmt = hold?.swing ?? 1;
    if (hold) { if (hold.armL) to(P.armL, hold.armL, 1); if (hold.armR) to(P.armR, hold.armR, 1); }

    // ---- walk cycle
    if (w > 0.001) {
      const s1 = Math.sin(ph), c1 = Math.cos(ph);
      const A = G.stride * G.strideMul * w;
      P.legL.h += s1 * A; P.legR.h -= s1 * A;
      P.legL.k += G.knee * w * Math.max(0, c1) * (0.5 + 0.5 * G.strideMul); P.legR.k += G.knee * w * Math.max(0, -c1) * (0.5 + 0.5 * G.strideMul);
      P.legL.a += w * (0.35 * Math.max(0, c1) - 0.4 * Math.max(0, -c1) * (s1 < 0 ? 1 : 0.3));
      P.legR.a += w * (0.35 * Math.max(0, -c1) - 0.4 * Math.max(0, c1) * (s1 > 0 ? 1 : 0.3));
      P.hipY += legLen * (Math.cos(A * Math.abs(s1)) - 1) + G.bounce * w * (0.5 + 0.5 * Math.cos(2 * ph));
      const asw = G.armSwing * w * swingAmt;
      P.armL.x -= s1 * asw; P.armR.x += s1 * asw;
      P.armL.e += w * G.elbow * (0.35 + 0.65 * Math.max(0, -s1)) * swingAmt;
      P.armR.e += w * G.elbow * (0.35 + 0.65 * Math.max(0, s1)) * swingAmt;
      P.spY += s1 * G.twist * w; P.hdY -= s1 * G.twist * w * 0.8;
      P.hipRz += s1 * G.sway * w; P.spZ -= s1 * G.sway * 0.6 * w; P.hdZ += s1 * G.sway * 0.5 * w;
      P.spX += G.lean * w + Math.abs(c1) * 0.02 * w;
      P.skX += -Math.abs(s1) * 0.06 * w; P.skZ += c1 * 0.05 * w;
    }
    // ---- in the air
    if (!grounded) {
      const a = 1 - (s.walk != null ? 0 : 0);
      P.legL.h += 0.45; P.legL.k += 1.0; P.legR.h -= 0.15; P.legR.k += 0.5;
      to(P.armL, { x: 0.2, z: 1.0, e: 0.5 }, 0.8); to(P.armR, { x: 0.2, z: 1.0, e: 0.5 }, 0.8);
    }
    // landing / take-off squash
    if (wasGround && !grounded && vr > 0) squashV -= 5;
    if (!wasGround && grounded) squashV += 7;
    wasGround = grounded; wasVr = vr;
    squashV += (-240 * squash - 16 * squashV) * dt; squash += squashV * dt;

    // ---- loops (cross-faded), one-shots
    const target = loopCur ? 1 : 0;
    wCur = damp(wCur, target, 5, dt); wPrev = damp(wPrev, 0, 5, dt);
    lt += dt; ltPrev += dt;
    const lw = LOOP_WALK.has(loopCur) ? 1 : 1 - walkS;
    if (loopPrev) runLoop(loopPrev, wPrev * (LOOP_WALK.has(loopPrev) ? 1 : 1 - walkS), ltPrev);
    if (loopCur) runLoop(loopCur, wCur * lw, lt);
    for (let i = once.length - 1; i >= 0; i--) {
      const o = once[i]; o.t += dt;
      const env = Math.sin(clamp(o.t / o.dur, 0, 1) * Math.PI);
      runLoop(o.name, clamp(env * 2.2, 0, 1), o.t);
      if (o.t >= o.dur) once.splice(i, 1);
    }

    // ---- look-at
    let yawT = 0, pitchT = 0;
    if (look.target) {
      person.updateWorldMatrix(true, false);
      _v.copy(look.target);
      person.worldToLocal(_v);
      _v.y -= rig.headBaseY + 0.27;
      const rawYaw = Math.atan2(_v.x, _v.z);
      if (Math.abs(rawYaw) < 2.4) {
        yawT = clamp(rawYaw, -1.15, 1.15);
        pitchT = clamp(-Math.atan2(_v.y, Math.hypot(_v.x, _v.z)), -0.5, 0.45);
      }
    }
    look.yaw = damp(look.yaw, yawT, 7, dt); look.pitch = damp(look.pitch, pitchT, 7, dt);
    P.hdY += look.yaw * 0.72 + 0; P.spY += look.yaw * 0.28;
    P.hdX += look.pitch;

    // ---- apply pose
    const sq = clamp(squash, -0.4, 0.4);
    const stretch = grounded ? 0 : clamp(vr * 0.012, -0.08, 0.12);
    const sy = 1 - sq * 0.35 + stretch;
    rig.root.scale.set(1 / Math.sqrt(Math.max(0.5, sy)), sy, 1 / Math.sqrt(Math.max(0.5, sy)));
    rig.hips.position.y = rig.hipY + P.hipY - sq * 0.12;
    rig.hips.rotation.set(P.hipRx, P.hipRy, P.hipRz);
    rig.spine.rotation.set(P.spX, P.spY, P.spZ - P.hipRz * 0.6);
    rig.headG.rotation.set(P.hdX, P.hdY, P.hdZ - P.hipRz * 0.4);
    if (rig.skirt) rig.skirt.rotation.set(P.skX, 0, P.skZ);
    rig.arms.forEach((a, i) => {
      const A = i ? P.armR : P.armL, sd = i ? -1 : 1;
      a.sh.rotation.set(-A.x, 0, sd * A.z);
      a.el.rotation.set(-A.e, 0, sd * A.ez);
    });
    rig.legs.forEach((l, i) => {
      const L = i ? P.legR : P.legL, sd = i ? -1 : 1;
      l.hip.rotation.set(-L.h, 0, sd * L.s);
      l.knee.rotation.x = L.k;
      l.ankle.rotation.x = -L.a;
    });

    // ---- blink / mouth
    blinkT -= dt;
    if (blinkT <= 0) { blinkOn = 0.13; blinkT = 2.2 + ((Math.sin(t * 12.9898 + seed) * 43758.5453) % 1 + 1) % 1 * 3.5; }
    blinkOn = Math.max(0, blinkOn - dt);
    rig.face.setState(mouth ? 'shout' : blinkOn > 0 ? 'blink' : 'open');
    mouth = false;

    // ---- accessories: orientation (hang / up), per-frame hooks
    const c = { t, walk: walkS, phase: ph };
    for (const a of rig.acc) {
      const u = a.obj.userData;
      if (u.orient) {
        const hand = a.slot === 'handL' ? armL : a.slot === 'handR' ? armR : null;
        if (hand) {
          let sw = swayTilt.get(a.obj);
          if (!sw) { sw = { x: 0, z: 0 }; swayTilt.set(a.obj, sw); }
          const A = a.slot === 'handL' ? P.armL : P.armR;
          const tx = u.orient === 'hang' ? 0.32 * A.x : 0, tz = u.orient === 'hang' ? -(a.slot === 'handL' ? 1 : -1) * 0.5 * (A.z - 0.12) : 0;
          sw.x = damp(sw.x, tx, 14, dt); sw.z = damp(sw.z, tz, 14, dt);
          _e.set(u.baseTilt.x + u.tilt.x + sw.x, 0, u.baseTilt.z + u.tilt.z + sw.z);
          _qd.setFromEuler(_e);
          _q1.copy(rig.hips.quaternion).multiply(rig.spine.quaternion).multiply(hand.sh.quaternion).multiply(hand.el.quaternion);
          _q1.premultiply(rig.root.quaternion);
          a.obj.quaternion.copy(_q1.invert().multiply(_qd));
          (u.invDesired ??= new THREE.Quaternion()).copy(_qd).invert();
        }
      }
      u.update?.(dt, c);
    }
    // loop-driven tilt is a per-frame input: clear it so a stopped loop lets go
    for (const a of rig.acc) if (a.obj.userData.tilt && !(loopCur || loopPrev || once.length)) { a.obj.userData.tilt.x = damp(a.obj.userData.tilt.x, 0, 8, dt); }
  }

  person.userData.animate = animate;
  person.userData.setLookTarget = (v) => { look.target = v ? (look.target ?? new THREE.Vector3()).copy(v) : null; };
  person.userData.playLoop = (name) => {
    if (name === loopCur) return;
    if (name && !LOOPS[name]) { console.warn('unknown loop', name); return; }
    loopPrev = loopCur; wPrev = wCur; ltPrev = lt;
    loopCur = name ?? null; lt = 0; wCur = 0;
    person.userData.loop = loopCur;
  };
  person.userData.playOnce = (name, dur = 1.8) => { if (LOOPS[name]) once.push({ name, dur, t: 0 }); };
  person.userData.loop = null;
  person.userData.time = () => t;
  animate(0.016, {}); // settle into the rest pose
}

// loops that keep running while walking (carrying poses)
const LOOP_WALK = new Set(['carry', 'headLoad', 'sabzi', 'texting']);

// ---- demo helper --------------------------------------------------------------------------------------------
/** Make `person` animate itself during rendering (lab turntable / demos). state: mutable { walk, speed, grounded }. */
export function autoAnimate(person, state = {}) {
  const probe = new THREE.Mesh(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3)),
    new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false })
  );
  probe.frustumCulled = false;
  probe.name = 'auto-animate';
  let last = performance.now();
  probe.onBeforeRender = () => {
    const now = performance.now(), dt = (now - last) / 1000;
    if (dt < 0.006) return;
    last = now;
    person.userData.animate(Math.min(dt, 0.05), { ...state, time: now / 1000 });
  };
  person.add(probe);
  return person;
}
