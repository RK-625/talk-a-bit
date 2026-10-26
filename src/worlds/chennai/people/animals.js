/**
 * people/animals.js: the street animals, in the same Warli-cute ink style. Small, simple, ~10 meshes each.
 *
 * createDog(ink, seed)    napping stray dog (curled, sleepy face, floating z's). loops: 'nap' (default), 'twitch', 'perk'
 * createCrow(ink, seed)   crow.   loops: 'idle', 'peck' (default), 'hop', 'flap'
 * createPigeon(ink, seed) pigeon. loops: 'idle', 'peck' (default), 'hop', 'flap'
 * All: feet/base at y=0, facing +Z, userData.animate(dt, state) / setLookTarget(v) / playLoop(name).
 */
import * as THREE from 'three';
import { mk, mat, basic, geo, sph, cyl, mergeColored, PASTEL, OVERLAY_LAYER, INK_COLOR } from './kit.js';
import { makeCanvas, toTexture, drawZ, rng } from '../../../engine/doodle.js';

const damp = (a, b, l, dt) => a + (b - a) * (1 - Math.exp(-l * dt));
const hex = (n) => '#' + n.toString(16).padStart(6, '0');
const INKC = hex(INK_COLOR);

/** spherical-cap face sticker with a painter(ctx, w, h) */
function faceCap(r, paint, phi = 1.7, theta = 1.2, key = 'f') {
  const W = 192, H = Math.round(W * theta / phi);
  const { c, ctx } = makeCanvas(W, H);
  paint(ctx, W, H);
  const g = geo(`animalFace|${r}|${key}`, () => new THREE.SphereGeometry(r * 1.02, 16, 10, Math.PI / 2 - phi / 2, phi, Math.PI / 2 - theta / 2, theta));
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: toTexture(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
  m.layers.set(OVERLAY_LAYER);
  return m;
}

// ---- dog -------------------------------------------------------------------------------------------------
export function createDog(ink, seed = 1) {
  const r = rng(Math.floor(seed * 977) + 5);
  const fur = [0xc08a58, 0xb07a4a, 0xcb9a66][Math.floor(r() * 3)];
  const dark = 0x7e5232;
  const g = new THREE.Group();
  const root = new THREE.Group(); g.add(root);
  const furM = mat(fur, { spacing: 0.04, strength: 0.6 });
  const darkM = mat(dark, { spacing: 0.035, strength: 0.7 });
  const whiteM = mat(0xfbf3e4, { spacing: 0.035, strength: 0.4 });

  const body = mk(sph(0.36, 14, 10), furM, { o: 2.2 });
  body.scale.set(0.95, 0.62, 1.35); body.position.set(0, 0.23, -0.35);
  root.add(body);
  const patch = mk(sph(0.2, 9, 7), whiteM, { o: 0 });
  patch.scale.set(1, 0.55, 1.1); patch.position.set(0.12, 0.38, -0.3);
  root.add(patch);
  // head resting on front paws
  const headG = new THREE.Group(); headG.position.set(0.05, 0.24, 0.42); root.add(headG);
  const head = mk(sph(0.27, 11, 8), furM, { o: 2.2 }); head.scale.set(1.05, 0.92, 1); headG.add(head);
  const snout = mk(sph(0.14, 8, 6), whiteM, { o: 1.8 }); snout.scale.set(1, 0.75, 1.0); snout.position.set(0, -0.08, 0.19); headG.add(snout);
  const nose = mk(sph(0.05, 6, 5), basic(INK_COLOR), { o: 0 }); nose.position.set(0, -0.04, 0.32); headG.add(nose);
  const face = faceCap(0.27, (ctx, w, h) => {
    ctx.strokeStyle = INKC; ctx.lineWidth = 9; ctx.lineCap = 'round';
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(w / 2 + s * 42, h * 0.42, 20, 0.12 * Math.PI, 0.88 * Math.PI); ctx.stroke(); }
    ctx.fillStyle = 'rgba(244,120,155,0.5)';
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(w / 2 + s * 72, h * 0.62, 18, 11, 0, 0, 7); ctx.fill(); }
  }, 1.9, 1.2, 'dog');
  face.position.y = 0.0; headG.add(face);
  const ears = [];
  for (const s of [-1, 1]) {
    const ear = mk(sph(0.15, 7, 5), darkM, { o: 1.8 });
    ear.scale.set(0.42, 1.35, 0.8); ear.position.set(s * 0.25, -0.02, -0.04); ear.rotation.z = s * 0.35;
    headG.add(ear); ears.push(ear);
  }
  // paws + tail
  for (const s of [-1, 1]) {
    const paw = mk(sph(0.085, 6, 5), whiteM, { o: 1.6 }); paw.scale.set(1, 0.7, 1.5); paw.position.set(s * 0.12, 0.06, 0.52); root.add(paw);
  }
  const tail = mk(geo('dogTail2', () => new THREE.TorusGeometry(0.17, 0.055, 5, 9, Math.PI * 1.6)), furM, { o: 1.8 });
  tail.position.set(-0.2, 0.34, -0.78); tail.rotation.set(0, 0.5, 0); root.add(tail);
  const hindLeg = mk(sph(0.14, 9, 7), furM, { o: 1.8 }); hindLeg.scale.set(0.8, 0.75, 1.2); hindLeg.position.set(0.28, 0.14, -0.2); root.add(hindLeg);

  // floating z's
  const zTex = (() => { const { c, ctx } = makeCanvas(64, 64); ctx.strokeStyle = INKC; ctx.lineWidth = 7; drawZ(ctx, 12, 12, 40); return toTexture(c); })();
  const zs = [];
  for (let i = 0; i < 3; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: zTex, transparent: true, depthWrite: false }));
    sp.layers.set(OVERLAY_LAYER); sp.scale.setScalar(0.3);
    g.add(sp); zs.push(sp);
  }

  let t = r() * 10, loop = 'nap', lt = 0, look = null, yaw = 0, perk = 0;
  const _v = new THREE.Vector3();
  g.userData.animate = (dt) => {
    dt = Math.min(dt, 0.1); t += dt; lt += dt;
    const br = Math.sin(t * 1.6);
    body.scale.set(0.95 + br * 0.012, 0.62 + br * 0.025, 1.35);
    head.position.y = br * 0.004;
    let twitch = 0;
    if (loop === 'twitch') twitch = Math.max(0, Math.sin(lt * 14)) * (Math.sin(lt * 1.5) > 0.4 ? 1 : 0);
    hindLeg.rotation.z = twitch * 0.25; hindLeg.position.x = 0.28 + twitch * 0.02;
    // tail + ear flick
    tail.rotation.z = Math.sin(t * 0.9) * 0.05 + (loop === 'twitch' ? Math.sin(lt * 8) * 0.15 * twitch : 0);
    const flick = Math.max(0, Math.sin(t * 0.7 + 2) - 0.85) * 6;
    perk = damp(perk, loop === 'perk' || look ? 1 : 0, 4, dt);
    ears[0].rotation.z = -0.35 - flick * 0.4 - perk * 0.3; ears[1].rotation.z = 0.35 + perk * 0.3;
    let yawT = 0;
    if (look) { g.updateWorldMatrix(true, false); _v.copy(look); g.worldToLocal(_v); yawT = THREE.MathUtils.clamp(Math.atan2(_v.x - headG.position.x, _v.z - headG.position.z), -0.55, 0.55); }
    yaw = damp(yaw, yawT, 5, dt);
    headG.rotation.y = yaw; headG.rotation.x = -perk * 0.12 + br * 0.01;
    for (let i = 0; i < 3; i++) {
      const u = ((t * 0.28 + i / 3) % 1);
      const sp = zs[i];
      sp.position.set(0.25 + u * 0.35, 0.65 + u * 0.75, 0.4 + u * 0.1);
      sp.material.opacity = Math.sin(u * Math.PI) * 0.9;
      sp.scale.setScalar(0.16 + u * 0.22);
    }
  };
  g.userData.setLookTarget = (v) => { look = v ? (look ?? new THREE.Vector3()).copy(v) : null; };
  g.userData.playLoop = (n) => { loop = n ?? 'nap'; lt = 0; };
  g.userData.radius = 0.7;
  g.userData.role = 'strayDog';
  g.userData.animate(0.016);
  return g;
}

// ---- birds ----------------------------------------------------------------------------------------------
function createBird(kind, seed = 1) {
  const crow = kind === 'crow';
  const r = rng(Math.floor(seed * 733) + 3);
  const S = crow ? 1.5 : 1.4;
  const body = crow ? 0x2f2c3b : 0xa8b9d4, head = crow ? 0x2a2734 : 0x93a8c8, wing = crow ? 0x232030 : 0x8196b8, beakC = crow ? 0x6f6b7d : 0xf2b38a;
  const g = new THREE.Group();
  const root = new THREE.Group(); g.add(root);
  const bodyM = mat(body, { spacing: 0.03, strength: 0.7 }), headM = mat(head, { spacing: 0.03, strength: 0.7 }), wingM = mat(wing, { spacing: 0.03, strength: 0.7 });
  const torso = new THREE.Group(); torso.position.y = 0.32 * S; root.add(torso);
  const b = mk(sph(0.2 * S, 12, 9), bodyM, { o: 2 }); b.scale.set(crow ? 0.85 : 1.0, crow ? 0.8 : 0.95, crow ? 1.3 : 1.2); b.rotation.x = -0.25; torso.add(b);
  const neck = new THREE.Group(); neck.position.set(0, 0.1 * S, 0.17 * S); torso.add(neck);
  const h = mk(sph(0.11 * S, 10, 8), headM, { o: 1.8 }); h.position.set(0, 0.08 * S, 0.03 * S); neck.add(h);
  const beak = mk(geo(`beak|${kind}`, () => new THREE.ConeGeometry(0.035 * S, 0.12 * S, 6)), mat(beakC, { spacing: 0.02 }), { o: 1.4 });
  beak.rotation.x = Math.PI / 2; beak.position.set(0, 0.075 * S, 0.14 * S); neck.add(beak);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(sph(0.018 * S, 6, 5), basic(crow ? 0xf4e7c4 : 0xf29b4b));
    eye.position.set(s * 0.07 * S, 0.11 * S, 0.08 * S); neck.add(eye);
    const pupil = new THREE.Mesh(sph(0.01 * S, 5, 4), basic(INK_COLOR)); pupil.position.set(s * 0.078 * S, 0.112 * S, 0.092 * S); neck.add(pupil);
    const cheek = new THREE.Mesh(sph(0.025 * S, 6, 5), basic(0xf4a0b5, { transparent: true, opacity: 0.6 })); cheek.scale.set(1, 0.6, 0.4); cheek.position.set(s * 0.085 * S, 0.06 * S, 0.075 * S); neck.add(cheek);
  }
  // neck patch: crow = grey collar, pigeon = iridescent green/purple ring with dots
  neck.add(mk(geo('neckPatch|' + kind, () => mergeColored(crow
    ? [{ g: new THREE.TorusGeometry(0.1, 0.035, 4, 8), rot: [Math.PI / 2 - 0.4, 0, 0], color: 0x9a97aa }]
    : [
      { g: new THREE.TorusGeometry(0.105, 0.04, 4, 9), rot: [Math.PI / 2 - 0.4, 0, 0], color: 0x5fbf9f },
      { g: new THREE.TorusGeometry(0.1, 0.025, 4, 9), pos: [0, -0.03, -0.02], rot: [Math.PI / 2 - 0.4, 0, 0], color: 0xa07fd0 },
      ...[0, 1, 2, 3, 4].map((i) => ({ g: new THREE.SphereGeometry(0.018, 4, 3), pos: [Math.sin(i - 2) * 0.09, 0.02, 0.07 + Math.cos(i - 2) * 0.03], color: i % 2 ? 0xa07fd0 : 0x7fe0b8 })),
    ])), mat(0xffffff, { vertexColors: true, spacing: 0.02 }), { o: 0 }));
  const wings = [];
  for (const s of [-1, 1]) {
    const piv = new THREE.Group(); piv.position.set(s * 0.15 * S, 0.06 * S, -0.02 * S); torso.add(piv);
    const w = mk(sph(0.14 * S, 9, 7), wingM, { o: 1.8 }); w.scale.set(0.22, 0.75, 1.5); w.position.set(s * 0.02 * S, -0.02 * S, -0.1 * S); piv.add(w);
    wings.push(piv);
  }
  const tail = mk(geo('birdTail', () => new THREE.ConeGeometry(0.1, 0.3, 5)), wingM, { o: 1.6 });
  tail.scale.set(1.5, 1, 0.3); tail.rotation.x = -Math.PI / 2 + 0.3; tail.position.set(0, -0.02 * S, -0.34 * S); tail.scale.multiplyScalar(S); torso.add(tail);
  const legs = [];
  for (const s of [-1, 1]) {
    const lg = new THREE.Group(); lg.position.set(s * 0.06 * S, 0.0, 0.0); root.add(lg);
    const stick = mk(geo('birdLeg', () => { const c = new THREE.CylinderGeometry(0.012, 0.012, 0.3, 5); c.translate(0, 0.15, 0); return c; }), mat(0xd9a07a, { spacing: 0.02 }), { o: 1 });
    stick.scale.y = S;
    const foot = mk(sph(0.035 * S, 6, 5), mat(0xd9a07a, { spacing: 0.02 }), { o: 1.2 }); foot.scale.set(1.2, 0.5, 1.7); foot.position.set(0, 0.01, 0.025);
    lg.add(stick, foot); legs.push(lg);
  }

  let t = r() * 20, loop = 'peck', lt = 0, look = null, yaw = 0;
  const _v = new THREE.Vector3();
  g.userData.animate = (dt) => {
    dt = Math.min(dt, 0.1); t += dt; lt += dt;
    let hop = 0, peck = 0, flap = 0, headTurn = 0;
    if (loop === 'peck') { const T = 3.4, u = (lt % T) / T; peck = Math.pow(Math.max(0, Math.sin(Math.min(u / 0.5, 1) * Math.PI * 3)), 2) * (u < 0.5 ? 1 : 0); headTurn = Math.sin(t * 0.8) * 0.5 * (u > 0.5 ? 1 : 0); }
    if (loop === 'hop') { const T = 1.2, u = (lt % T) / T; hop = Math.max(0, Math.sin(u * Math.PI * 2 * 0.5 * 2)) * (u < 0.5 ? 1 : 0); peck = 0; }
    if (loop === 'flap') { flap = 1; hop = Math.max(0, Math.sin(lt * 14)) * 0.5; }
    if (loop === 'idle') { headTurn = Math.sin(t * 1.1) * 0.7 * (Math.sin(t * 0.37) > 0 ? 1 : 0.2); }
    if (look) { g.updateWorldMatrix(true, false); _v.copy(look); g.worldToLocal(_v); headTurn += THREE.MathUtils.clamp(Math.atan2(_v.x, _v.z), -1.0, 1.0); }
    yaw = damp(yaw, headTurn, 9, dt);
    torso.position.y = 0.32 * S + hop * 0.12 * S + Math.sin(t * 2.4) * 0.004;
    torso.rotation.x = peck * 0.55 - hop * 0.15;
    neck.rotation.x = peck * 0.5; neck.rotation.y = yaw;
    const f = flap ? Math.sin(lt * 26) * 0.9 : (loop === 'hop' ? hop * 0.5 : 0);
    wings[0].rotation.z = -0.15 - Math.abs(f) * 1.2 - f * 0.2; wings[1].rotation.z = 0.15 + Math.abs(f) * 1.2 + f * 0.2;
    legs.forEach((l) => { l.position.y = hop * 0.12 * S; });
    root.rotation.y = 0;
  };
  g.userData.setLookTarget = (v) => { look = v ? (look ?? new THREE.Vector3()).copy(v) : null; };
  g.userData.playLoop = (n) => { loop = n ?? 'idle'; lt = 0; };
  g.userData.radius = 0.25;
  g.userData.role = kind;
  g.userData.animate(0.016);
  return g;
}
export const createCrow = (ink, seed) => createBird('crow', seed);
export const createPigeon = (ink, seed) => createBird('pigeon', seed);
