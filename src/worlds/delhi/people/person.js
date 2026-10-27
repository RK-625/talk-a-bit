/**
 * people/person.js: the Warli-inspired person factory.
 *
 * createPerson(spec, ink) -> THREE.Group   (feet at y=0, facing +Z, ~spec.height tall, default 2.2)
 *
 * Two cones meet at a pinched waist (inverted torso cone above, skirt cone / two leg cones below), a slightly big round head,
 * thin tapered stick limbs with ball hands and feet, jointed at elbows and knees. Clothes are pastel pencil fills with
 * optional Warli white triangle+dot hems. Faces are painted stickers (dot eyes, blush, tiny smile).
 *
 * spec = {
 *   height: 2.2,                          total height in world units (adult 2.2, Chotu 1.6)
 *   build: 'thin' | 'normal' | 'round',   (or a number: width multiplier)
 *   headScale: 1, legScale: 1, armScale: 1, torsoScale: 1,    proportions (kids: bigger head, shorter legs)
 *   skin: 0..5 | 0xRRGGBB,                warm Indian skin tones, light to deep (kit.SKIN)
 *   outfit: 'shirtTrousers' | 'shirtShorts' | 'kurtaPyjama' | 'saree' | 'nauvari' | 'banyanLungi' | 'uniform' | 'dhoti' | 'sherwani' | 'abaya',
 *   top: 0xRRGGBB, topPattern: 'plain'|'stripes'|'vstripes'|'checks'|'dots'|'belt', top2: second colour of the pattern,
 *   bottom, bottomPattern, bottom2,       trousers / shorts / skirt / lungi / saree cloth
 *   sleeves: 'long' | 'short' | 'none',   (default per outfit)
 *   trim: 0xRRGGBB | null,                Warli white triangle + dot border on the hem
 *   pallu: 0xRRGGBB,                      saree / nauvari shoulder cloth colour (default = bottom2 or bottom)
 *   hair: 'short'|'messy'|'bun'|'plait'|'bald'|'cap'|'topi'|'turban'|'skullcap'|'hijab'   or { style, color, hat }
 *         (cap = peaked uniform cap in `hat`; topi = white Gandhi cap; turban = wrapped cloth in `hat`)
 *   face: { eyes: 'dot'|'sleepy'|'happy', eyeScale, moustache: false|'handlebar'|'thick'|'thin', bindi: false|true|0xRRGGBB,
 *           specs: false|true, blush: true, freckles, brows: false|'thin'|'thick', lashes, smile: 'small'|'big', smudge,
 *           beard: false|'short'|'full' (+ beardColor) }
 *   footwear: 'chappal' | 'shoes' | 'bare', footColor,
 *   accessories: ['kettle', { name:'jhola', slot:'handL', ...opts }, ...]     see accessories.js
 *   gait: { stride, knee, armSwing, bob, sway, lean, bounce, speed }           walk style overrides (animate.js)
 *   hold: { armL:{x,z,e,ez}, armR:{...}, swing: 0..1 }                          arm pose held while walking
 *   seed: number
 * }
 *
 * userData: animate(dt, state), setLookTarget(vec3|null), playLoop(name), rig, radius, slots, acc (name -> accessory Group),
 *           height, face (setState('open'|'blink'|'shout'))
 */
import * as THREE from 'three';
import { mk, mat, geo, cloth, basic, mergeColored, cyl, sph, r3, SKIN, HAIR, PASTEL, OVERLAY_LAYER, INK_COLOR } from './kit.js';
import { makeCanvas, toTexture, rng } from '../../../engine/doodle.js';
import { makeAccessory } from './accessories.js';
import { attachAnimator } from './animate.js';
import { bakePerson } from './bake.js';

const OUTFITS = {
  shirtTrousers: { sleeves: 'short', legs: 'trousers', skirt: null },
  shirtShorts: { sleeves: 'short', legs: 'shorts', skirt: null },
  kurtaPyjama: { sleeves: 'long', legs: 'trousers', skirt: { len: 0.56, flare: 0.3, color: 'top' }, stride: 0.85 },
  saree: { sleeves: 'short', legs: 'skin', skirt: { len: 0.84, flare: 0.5, color: 'bottom' }, pallu: true, stride: 0.5 },
  nauvari: { sleeves: 'short', legs: 'trousers', skirt: null, pallu: true, pleats: true, stride: 0.9 },
  banyanLungi: { sleeves: 'none', legs: 'skin', skirt: { len: 0.62, flare: 0.32, color: 'bottom' }, stride: 0.75 },
  uniform: { sleeves: 'short', legs: 'trousers', skirt: null, belt: true },
  dhoti: { sleeves: 'none', legs: 'skin', skirt: { len: 0.72, flare: 0.3, color: 'bottom' }, pallu: true, bare: true, stride: 0.75 },
  sherwani: { sleeves: 'long', legs: 'trousers', skirt: { len: 0.8, flare: 0.2, color: 'top' }, stride: 0.8 },
  abaya: { sleeves: 'long', legs: 'skin', skirt: { len: 0.96, flare: 0.3, color: 'top' }, stride: 0.7 }, // plain long gown (old-city women), worn with the 'hijab' hair style
  shirtTie: { sleeves: 'long', legs: 'trousers', skirt: null, tie: true },
};

const hexCss = (n) => '#' + n.toString(16).padStart(6, '0');

// ---------------------------------------------------------------------------------------------------------
function resolve(spec) {
  const s = { ...spec };
  s.height ??= 2.2;
  s.build ??= 'normal';
  s.headScale ??= 1.12; s.legScale ??= 1; s.armScale ??= 1; s.torsoScale ??= 1;
  s.skin = typeof s.skin === 'number' && s.skin < 16 ? SKIN[s.skin] : s.skin ?? SKIN[2];
  s.outfit ??= 'shirtTrousers';
  s.top ??= PASTEL.sky; s.topPattern ??= 'plain'; s.top2 ??= PASTEL.white;
  s.bottom ??= PASTEL.denim; s.bottomPattern ??= 'plain'; s.bottom2 ??= PASTEL.white;
  s.trim ??= null;
  s.hair = typeof s.hair === 'string' ? { style: s.hair } : { style: 'short', ...s.hair };
  s.hair.color ??= HAIR.black;
  s.face = { eyes: 'dot', eyeScale: 1, moustache: false, bindi: false, specs: false, blush: true, freckles: false, brows: false, lashes: false, smile: 'small', smudge: false, ...s.face };
  s.footwear ??= 'chappal';
  s.footColor ??= PASTEL.sky;
  s.accessories ??= [];
  s.seed ??= 1;
  return s;
}

// ---- face stickers ------------------------------------------------------------------------------------
const FACE_W = 256, FACE_H = 176;
const FACE_PHI = 1.9, FACE_THETA = 1.3; // radians of head surface covered
const FACES = new Map();
function faceTexture(f, state) {
  const key = JSON.stringify(f) + state;
  let t = FACES.get(key);
  if (t) return t;
  const { c, ctx } = makeCanvas(FACE_W, FACE_H);
  const ink = hexCss(INK_COLOR);
  const ex = 50, ey = 92, cx = FACE_W / 2;
  const er = 12.5 * f.eyeScale;
  ctx.strokeStyle = ink; ctx.fillStyle = ink;
  ctx.lineWidth = 5;
  const closed = state === 'blink' || f.eyes === 'sleepy';
  for (const s of [-1, 1]) {
    const x = cx + s * ex;
    if (closed) { ctx.beginPath(); ctx.arc(x, ey - 4, er * 1.0, 0.12 * Math.PI, 0.88 * Math.PI); ctx.stroke(); }
    else if (f.eyes === 'happy') { ctx.beginPath(); ctx.arc(x, ey + 8, er * 1.05, 1.12 * Math.PI, 1.88 * Math.PI); ctx.stroke(); }
    else {
      ctx.beginPath(); ctx.ellipse(x, ey, er, er * 1.08, 0, 0, 7); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath(); ctx.arc(x - er * 0.3, ey - er * 0.34, er * 0.3, 0, 7); ctx.fill();
      ctx.fillStyle = ink;
    }
    if (f.lashes) {
      ctx.lineWidth = 3.4;
      for (const a of [-0.35, 0.15]) {
        ctx.beginPath(); ctx.moveTo(x + s * (er * 0.9), ey - 4 + a * 10); ctx.lineTo(x + s * (er * 1.8), ey - 12 + a * 22); ctx.stroke();
      }
      ctx.lineWidth = 5;
    }
    if (f.brows) {
      ctx.lineWidth = f.brows === 'thick' ? 8 : 4;
      ctx.beginPath(); ctx.moveTo(x - 17, ey - 25); ctx.quadraticCurveTo(x, ey - 34, x + 17, ey - 26 + s * 2); ctx.stroke();
      ctx.lineWidth = 5;
    }
    if (f.blush) {
      ctx.fillStyle = 'rgba(244,120,155,0.55)';
      ctx.beginPath(); ctx.ellipse(cx + s * 86, ey + 26, 21, 12, 0, 0, 7); ctx.fill();
      ctx.fillStyle = ink;
    }
    if (f.freckles) {
      ctx.fillStyle = 'rgba(140,86,60,0.7)';
      for (const [dx, dy] of [[-8, 4], [4, 9], [10, -1]]) { ctx.beginPath(); ctx.arc(cx + s * 86 + dx, ey + 18 + dy, 2.3, 0, 7); ctx.fill(); }
      ctx.fillStyle = ink;
    }
  }
  if (f.smudge) { ctx.fillStyle = 'rgba(60,50,75,0.4)'; ctx.beginPath(); ctx.ellipse(cx - 76, ey + 40, 15, 7, -0.4, 0, 7); ctx.fill(); ctx.fillStyle = ink; }
  if (f.specs) {
    ctx.lineWidth = 3.6;
    for (const s of [-1, 1]) {
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath(); ctx.arc(cx + s * ex, ey, 25, 0, 7); ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(cx - ex + 24, ey - 3); ctx.quadraticCurveTo(cx, ey - 12, cx + ex - 24, ey - 3); ctx.stroke();
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + s * (ex + 24), ey - 4); ctx.lineTo(cx + s * 118, ey - 6); ctx.stroke(); }
    ctx.fillStyle = ink;
  }
  // beard (Sikh men and old men): a jaw-shaped fill from the sideburns round the chin, leaving the mouth clear; f.beardColor
  if (f.beard) {
    const full = f.beard === 'full';
    ctx.save();
    ctx.fillStyle = hexCss(f.beardColor ?? 0x9a9a9a); ctx.strokeStyle = ink; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 96, 92); ctx.quadraticCurveTo(cx - 100, 150, cx - 52, FACE_H + 4); ctx.lineTo(cx + 52, FACE_H + 4); ctx.quadraticCurveTo(cx + 100, 150, cx + 96, 92);
    ctx.quadraticCurveTo(cx + 84, 128, cx + 52, 134); ctx.quadraticCurveTo(cx, full ? 146 : 152, cx - 52, 134); ctx.quadraticCurveTo(cx - 84, 128, cx - 96, 92);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 2; ctx.globalAlpha = 0.5;
    for (const dx of [-36, -12, 12, 36]) { ctx.beginPath(); ctx.moveTo(cx + dx, 150); ctx.lineTo(cx + dx * 1.1, FACE_H); ctx.stroke(); }
    ctx.restore();
  }
  // mouth
  const my = f.moustache ? 132 : 122;
  if (f.moustache) {
    const m = f.moustache;
    ctx.lineWidth = m === 'thin' ? 5 : m === 'thick' ? 13 : 9;
    for (const s of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(cx + s * 3, my - 17);
      ctx.quadraticCurveTo(cx + s * (m === 'thick' ? 26 : 30), my - 8, cx + s * (m === 'handlebar' ? 52 : 40), my - (m === 'handlebar' ? 24 : 12)); ctx.stroke();
    }
  }
  ctx.lineWidth = 4.6;
  if (state === 'shout') {
    ctx.fillStyle = ink; ctx.beginPath(); ctx.ellipse(cx, my + 4, 14, 18, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#ee8aa0'; ctx.beginPath(); ctx.ellipse(cx, my + 12, 9, 7, 0, 0, 7); ctx.fill();
  } else if (f.smile === 'big') {
    ctx.fillStyle = ink; ctx.beginPath(); ctx.moveTo(cx - 24, my - 6); ctx.quadraticCurveTo(cx, my + 4, cx + 24, my - 6); ctx.quadraticCurveTo(cx + 18, my + 28, cx, my + 28); ctx.quadraticCurveTo(cx - 18, my + 28, cx - 24, my - 6); ctx.fill();
    ctx.fillStyle = '#ee8aa0'; ctx.beginPath(); ctx.ellipse(cx, my + 21, 11, 6, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#fffdf3'; ctx.fillRect(cx - 15, my - 3, 30, 5);
  } else {
    ctx.beginPath(); ctx.arc(cx, my - 5, 16, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
  }
  if (f.tilak === 'ash') { // three ash bars
    ctx.fillStyle = '#f4efe6'; ctx.strokeStyle = 'rgba(80,60,70,0.5)'; ctx.lineWidth = 1.6;
    for (const y of [30, 42, 54]) { ctx.beginPath(); ctx.roundRect(cx - 24, y, 48, 6, 3); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle = '#d9304f'; ctx.beginPath(); ctx.arc(cx, 70, 5, 0, 7); ctx.fill();
  } else if (f.tilak) { // vertical red/orange tilak with a white sandal bar
    ctx.fillStyle = '#f4efe6'; ctx.beginPath(); ctx.roundRect(cx - 16, 52, 32, 7, 3); ctx.fill();
    ctx.fillStyle = '#e8532e'; ctx.beginPath(); ctx.roundRect(cx - 4, 22, 8, 34, 4); ctx.fill();
  }
  if (f.bindi) {
    ctx.fillStyle = typeof f.bindi === 'number' ? hexCss(f.bindi) : '#d9304f';
    ctx.beginPath(); ctx.arc(cx, 46, 7.5, 0, 7); ctx.fill();
    ctx.lineWidth = 1.6; ctx.stroke();
  }
  t = toTexture(c);
  FACES.set(key, t);
  return t;
}

// ---- hair ------------------------------------------------------------------------------------------------
function dirEuler(dir) {
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  const e = new THREE.Euler().setFromQuaternion(q);
  return [e.x, e.y, e.z];
}
function cap(r, L = 1.5, tilt = -0.5, scale = 1.045) {
  const g = new THREE.SphereGeometry(r * scale, 9, 5, 0, Math.PI * 2, 0, L);
  g.rotateX(tilt);
  return g;
}
function buildHair(h, r, seed) {
  const out = [];
  const col = h.color;
  const hm = mat(col, { spacing: 0.04, strength: 0.9 });
  const rr = r3(r);
  const part = (g, o = 2) => mk(g, hm, { o });
  switch (h.style) {
    case 'bald': break;
    case 'short': out.push(part(geo(`hair|short|${rr}`, () => cap(r, 1.55, -0.5)))); break;
    case 'messy': {
      const k = seed % 3;
      out.push(mk(geo(`hair|messy|${rr}|${k}`, () => {
        const parts = [{ g: cap(r, 1.45, -0.42), color: 0xffffff }];
        const rnd = rng(31 + k * 17);
        for (let i = 0; i < 7; i++) {
          const th = 0.15 + rnd() * 0.95, ph = i * 0.9 + rnd();
          const d = new THREE.Vector3(Math.sin(th) * Math.sin(ph), Math.cos(th), Math.sin(th) * Math.cos(ph) * 0.8 - 0.25);
          parts.push({ g: new THREE.ConeGeometry(r * 0.2, r * 0.62, 6), pos: d.clone().multiplyScalar(r * 0.98).toArray(), rot: dirEuler(d), color: 0xffffff });
        }
        return mergeColored(parts);
      }), hm, { o: 2 }));
      break;
    }
    case 'bun': {
      out.push(part(geo(`hair|bun|${rr}`, () => mergeColored([
        { g: cap(r, 1.55, -0.5) },
        { g: new THREE.SphereGeometry(r * 0.36, 7, 5), pos: [0, r * 0.72, -r * 0.7] },
      ]))));
      break;
    }
    case 'plait': {
      out.push(part(geo(`hair|plait|${rr}`, () => mergeColored([
        { g: cap(r, 1.6, -0.48) },
        { g: new THREE.SphereGeometry(r * 0.24, 7, 5), pos: [0, -r * 0.1, -r * 1.02] },
        { g: new THREE.SphereGeometry(r * 0.22, 7, 5), pos: [0, -r * 0.62, -r * 1.06] },
        { g: new THREE.SphereGeometry(r * 0.2, 7, 5), pos: [0, -r * 1.12, -r * 1.0] },
        { g: new THREE.SphereGeometry(r * 0.17, 7, 5), pos: [0, -r * 1.58, -r * 0.92] },
        { g: new THREE.ConeGeometry(r * 0.16, r * 0.4, 6), pos: [0, -r * 1.95, -r * 0.88], rot: [Math.PI, 0, 0] },
      ]))));
      break;
    }
    case 'cap': { // peaked uniform cap
      const hat = h.hat ?? PASTEL.white;
      out.push(part(geo(`hair|capHair|${rr}`, () => cap(r, 1.6, -0.35, 1.03))));
      out.push(mk(geo(`hat|peak|${rr}`, () => mergeColored([
        { g: new THREE.SphereGeometry(r * 1.1, 9, 5, 0, Math.PI * 2, 0, 1.22), pos: [0, r * 0.1, 0], scale: [1, 0.85, 1.02] },
        { g: new THREE.CylinderGeometry(r * 1.08, r * 1.08, r * 0.2, 9), pos: [0, r * 0.36, 0], scale: [1, 1, 1.02] },
        { g: new THREE.CylinderGeometry(r * 0.75, r * 0.75, 0.025, 12, 1, false, -Math.PI / 2, Math.PI), pos: [0, r * 0.3, r * 0.92], rot: [0.28, 0, 0] },
      ])), hatVC(hat), { o: 2 }));
      out.push(mk(geo('hat|badge', () => new THREE.SphereGeometry(0.035, 6, 5)), mat(0xe9b73d, { spacing: 0.03 }), { o: 0 }));
      out[out.length - 1].position.set(0, r * 0.62, r * 1.08);
      break;
    }
    case 'topi': { // white Gandhi cap
      const hat = h.hat ?? PASTEL.white;
      out.push(part(geo(`hair|topiHair|${rr}`, () => cap(r, 1.6, -0.35, 1.03))));
      out.push(mk(geo(`hat|topi|${rr}`, () => mergeColored([
        { g: new THREE.CylinderGeometry(r * 0.9, r * 0.97, r * 0.6, 9), pos: [0, r * 0.72, -r * 0.02], scale: [1, 1, 1.05] },
        { g: new THREE.SphereGeometry(r * 0.9, 10, 4, 0, Math.PI * 2, 0, 0.7), pos: [0, r * 0.9, -r * 0.02], scale: [1, 0.35, 1.05] },
      ])), hatVC(hat), { o: 2 }));
      break;
    }
    case 'turban': {
      const hat = h.hat ?? PASTEL.saffron;
      out.push(mk(geo(`hat|turban|${rr}`, () => mergeColored([
        { g: new THREE.SphereGeometry(r * 1.1, 9, 5, 0, Math.PI * 2, 0, 1.55), pos: [0, r * 0.12, 0], scale: [1, 0.9, 1.05], rot: [-0.15, 0, 0] },
        { g: new THREE.TorusGeometry(r * 0.98, r * 0.2, 5, 12), pos: [0, r * 0.55, 0], rot: [Math.PI / 2 - 0.25, 0, 0.2] },
        { g: new THREE.TorusGeometry(r * 0.9, r * 0.17, 5, 12), pos: [0, r * 0.82, 0.02], rot: [Math.PI / 2 + 0.12, 0, -0.35] },
        { g: new THREE.SphereGeometry(r * 0.3, 7, 5), pos: [r * 0.42, r * 1.0, r * 0.45] },
      ])), hatVC(hat), { o: 2 }));
      break;
    }
    case 'skullcap': { // a close-fitting white crocheted prayer cap (men in the old city), hair below it
      const hat = h.hat ?? PASTEL.white;
      out.push(part(geo(`hair|capHair|${rr}`, () => cap(r, 1.6, -0.35, 1.03))));
      out.push(mk(geo(`hat|skullcap|${rr}`, () => mergeColored([
        { g: new THREE.SphereGeometry(r * 1.0, 10, 5, 0, Math.PI * 2, 0, 1.0), pos: [0, r * 0.2, -r * 0.04], scale: [1.02, 0.95, 1.0] },
        { g: new THREE.TorusGeometry(r * 0.84, r * 0.05, 4, 12), pos: [0, r * 0.52, -r * 0.04], rot: [Math.PI / 2, 0, 0] },
      ])), hatVC(hat), { o: 2 }));
      break;
    }
    case 'hijab': { // a plain head scarf: top + sides + back, an open front for the face, a short drape over the shoulders
      const hat = h.hat ?? 0x2b2330;
      out.push(mk(geo(`hat|hijab|${rr}`, () => mergeColored([
        { g: new THREE.SphereGeometry(r * 1.07, 12, 7, 0, Math.PI * 2, 0, 0.95), pos: [0, 0.0, -r * 0.03], scale: [1.05, 0.97, 1.02] },
        { g: new THREE.SphereGeometry(r * 1.07, 12, 8, Math.PI / 2 + 1.0, Math.PI * 2 - 2.0, 0, 2.15), pos: [0, 0.0, -r * 0.03], scale: [1.05, 0.97, 1.02] },
        { g: new THREE.CylinderGeometry(r * 1.0, r * 1.6, r * 1.1, 10, 1, true), pos: [0, -r * 1.05, -r * 0.1], scale: [1, 1, 0.9] },
      ])), hatVC(hat), { o: 2 }));
      break;
    }
    default: break;
  }
  if (h.band) out.push(mk(geo(`hair|band|${rr}`, () => mergeColored([{ g: new THREE.TorusGeometry(r * 1.0, r * 0.075, 4, 12), pos: [0, r * 0.42, -r * 0.05], rot: [Math.PI / 2 - 0.12, 0, 0] }])), mat(h.band, { spacing: 0.03 }), { o: 0 }));
  if (h.flower === 'jasmine') { // a mallige gajra: a string of white blossoms ringing the bun or running down the plait
    const plait = h.style === 'plait';
    out.push(mk(geo(`hair|jasmine|${rr}|${plait}`, () => {
      const parts = [];
      if (plait) for (let k = 0; k < 7; k++) parts.push({ g: new THREE.SphereGeometry(r * 0.12, 5, 4), pos: [0, -r * (0.05 + k * 0.28), -r * (1.12 - k * 0.02)], color: k % 2 ? 0xfffaf0 : 0xf6f1e3 });
      else for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; parts.push({ g: new THREE.SphereGeometry(r * 0.13, 5, 4), pos: [Math.cos(a) * r * 0.4, r * 0.72 + Math.sin(a) * r * 0.4, -r * 0.7 - r * 0.2], color: k % 2 ? 0xfffaf0 : 0xf6f1e3 }); }
      return mergeColored(parts);
    }), mat(0xffffff, { vertexColors: true, spacing: 0.03 }), { o: 0 }));
  } else if (h.flower) out.push(mk(geo(`hair|flower|${rr}`, () => mergeColored([
    { g: new THREE.SphereGeometry(r * 0.16, 5, 4), pos: [r * 0.78, r * 0.45, -r * 0.28], color: 0xf6a53d },
    { g: new THREE.SphereGeometry(r * 0.13, 5, 4), pos: [r * 0.9, r * 0.28, -r * 0.18], color: 0xf9d56a },
    { g: new THREE.SphereGeometry(r * 0.12, 5, 4), pos: [r * 0.66, r * 0.58, -r * 0.4], color: 0xfff1f4 },
  ])), mat(0xffffff, { vertexColors: true, spacing: 0.03 }), { o: 0 }));
  return out;
}
function hatVC(col) { return mat(col, { spacing: 0.045, strength: 0.85 }); }
const HAT_LIFT = { cap: 0.2, topi: 0.2, turban: 0.2, bun: 0.1, messy: 0.1, skullcap: 0.12, hijab: 0.1 };

// ---- limbs ------------------------------------------------------------------------------------------------
function uvByHeight(g) {
  g.computeBoundingBox();
  const { min, max } = g.boundingBox, pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setY(i, (pos.getY(i) - min.y) / (max.y - min.y));
  return g;
}
function limb(rt, rb, len, seg = 6, round = true) {
  return geo(`limb|${r3(rt)}|${r3(rb)}|${r3(len)}|${seg}|${round}`, () => {
    // bottom-first lathe profile, soft rounded ends (no flat blocky tops)
    const pts = round
      ? [new THREE.Vector2(0, -len - rb * 0.7), new THREE.Vector2(rb * 0.75, -len - rb * 0.4), new THREE.Vector2(rb, -len)]
      : [new THREE.Vector2(0, -len), new THREE.Vector2(rb, -len)];
    pts.push(new THREE.Vector2(rt, 0));
    for (let i = 1; i <= 2; i++) {
      const a = (i / 2) * (Math.PI / 2);
      pts.push(new THREE.Vector2(rt * Math.cos(a), rt * 0.85 * Math.sin(a)));
    }
    return uvByHeight(new THREE.LatheGeometry(pts, seg));
  });
}

// ---------------------------------------------------------------------------------------------------------
export function createPerson(spec = {}, ink) {
  if (spec && (spec.createInkMaterial || spec.addOutline)) spec = {}; // lab passes the ink namespace when no spec is given
  const S = resolve(spec);
  const O = OUTFITS[S.outfit] ?? OUTFITS.shirtTrousers;
  const bw = typeof S.build === 'number' ? S.build : { thin: 0.86, normal: 1, round: 1.32 }[S.build] ?? 1;
  const bws = Math.sqrt(bw);
  const hr = 0.31 * S.headScale;
  const ankleY = 0.055;
  const legLen = 1.02 * S.legScale, torsoH = 0.56 * S.torsoScale;
  const hipY = legLen;
  const headOff = hr * 0.88; // head centre above the neck pivot
  const rawH = hipY + torsoH + headOff + hr;
  const k = S.height / rawH;
  const thighLen = (hipY - ankleY) * 0.5, shinLen = thighLen;
  const ua = 0.34 * S.armScale, fa = 0.32 * S.armScale;
  const seed = Math.abs(S.seed | 0);

  const group = new THREE.Group();
  group.scale.setScalar(k);
  const root = new THREE.Bone(); group.add(root);
  const hips = new THREE.Bone(); hips.position.y = hipY; root.add(hips);
  const spine = new THREE.Bone(); hips.add(spine);

  const skinM = mat(S.skin, { spacing: 0.07, strength: 0.1 });
  skinM.userData.smooth = true;
  const topM = O.bare ? skinM : cloth(S.topPattern, S.top, S.top2, null, { spacing: 0.045 });
  const topBeltM = O.belt ? cloth('belt', S.top, 0x4a4060, null, { spacing: 0.045 }) : topM;
  const botM = cloth(S.bottomPattern, S.bottom, S.bottom2, null, { spacing: 0.045 });
  const botT = S.trim !== null ? cloth(S.bottomPattern, S.bottom, S.bottom2, S.trim, { spacing: 0.045, trimH: 0.18 }) : botM;

  // ---- torso: inverted cone, pinched at the waist
  const torso = mk(geo(`torso|${r3(bw)}|${r3(torsoH)}`, () => {
    // soft teardrop: rounded waist, gently widening to rounded shoulders
    const pts = [new THREE.Vector2(0, -0.04), new THREE.Vector2(0.07 * bw, -0.032), new THREE.Vector2(0.115 * bw, 0.0)];
    const N = 4;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      pts.push(new THREE.Vector2((0.115 + 0.2 * Math.pow(t, 0.85) + Math.sin(t * Math.PI) * 0.03) * bw, torsoH * t));
    }
    pts.push(new THREE.Vector2(0.3 * bw, torsoH + 0.035), new THREE.Vector2(0.2 * bw, torsoH + 0.065), new THREE.Vector2(0, torsoH + 0.08));
    return uvByHeight(new THREE.LatheGeometry(pts, 8));
  }), O.belt ? topBeltM : topM, { o: 2.2 });
  spine.add(torso);

  // ---- legs
  const legX = 0.1 * bws;
  const cloLegs = O.legs === 'trousers' || O.legs === 'shorts';
  const legs = [];
  for (const s of [1, -1]) {
    const hip = new THREE.Bone(); hip.position.set(s * legX, 0, 0); hips.add(hip);
    const knee = new THREE.Bone(); knee.position.y = -thighLen; hip.add(knee);
    const ankle = new THREE.Bone(); ankle.position.y = -shinLen; knee.add(ankle);
    let thigh, shin;
    if (O.legs === 'trousers') {
      thigh = mk(limb(0.13 * bws, 0.105 * bws, thighLen, 6, false), botM, { o: 2 });
      shin = mk(limb(0.105 * bws, 0.075 * bws, shinLen, 6, false), botT, { o: 2 });
    } else if (O.legs === 'shorts') {
      thigh = mk(limb(0.13 * bws, 0.125 * bws, thighLen * 0.9, 6, false), botT, { o: 2 });
      shin = mk(limb(0.06 * bws, 0.043 * bws, shinLen, 6), skinM, { o: 2 });
    } else {
      thigh = mk(limb(0.07 * bws, 0.06 * bws, thighLen, 6), skinM, { o: 2 });
      shin = mk(limb(0.06 * bws, 0.043 * bws, shinLen, 6), skinM, { o: 2 });
    }
    hip.add(thigh); knee.add(shin);
    // foot
    const fr = S.footwear === 'shoes' ? 0.095 : 0.082;
    const foot = mk(sph(fr, 6, 4), S.footwear === 'shoes' ? mat(S.footColor, { spacing: 0.035 }) : skinM, { o: 1.8 });
    foot.scale.set(1, 0.62, 1.45); foot.position.set(0, -0.012, 0.04);
    ankle.add(foot);
    if (S.footwear === 'chappal') {
      const sole = mk(geo('sole', () => { const g = new THREE.CylinderGeometry(0.095, 0.095, 0.022, 8); g.scale(1, 1, 1.75); return g; }), mat(S.footColor, { spacing: 0.03 }), { o: 0 });
      sole.position.set(0, -0.05, 0.05);
      ankle.add(sole);
    }
    legs.push({ hip, knee, ankle });
  }

  // ---- skirt (saree / lungi / kurta tail): an upright cone hanging from the waist
  let skirt = null;
  if (O.skirt) {
    const sk = O.skirt;
    skirt = new THREE.Bone(); hips.add(skirt);
    const len = Math.min(sk.len * S.legScale, hipY - 0.12);
    const rh = (0.17 + sk.flare) * bws * (S.build === 'round' ? 1.08 : 1);
    const rt = 0.13 * bws;
    const trimmed = S.trim !== null && sk.color === 'bottom';
    const m = sk.color === 'top'
      ? cloth(S.topPattern, S.top, S.top2, S.trim, { spacing: 0.045 })
      : cloth(S.bottomPattern, S.bottom, S.bottom2, S.trim, { spacing: 0.045 });
    const mesh = mk(geo(`skirt|${r3(len)}|${r3(rh)}|${r3(rt)}`, () => {
      const pts = [];
      for (let i = 0; i <= 4; i++) {
        const t = i / 4; // 0 hem .. 1 top
        pts.push(new THREE.Vector2(rt + (rh - rt) * Math.pow(1 - t, 1.2), -len * (1 - t) + 0.02 * t));
      }
      return new THREE.LatheGeometry(pts, 8);
    }), m, { o: 2.2 });
    skirt.add(mesh);
  }
  // nauvari: pleats fan at the front
  if (O.pleats) {
    const mesh = mk(geo(`pleat|${r3(bws)}`, () => {
      const pts = [new THREE.Vector2(0.2 * bws, -0.95 * 0.75), new THREE.Vector2(0.09 * bws, -0.3), new THREE.Vector2(0.01, 0.0)];
      const g = new THREE.ConeGeometry(0.19 * bws, 0.72, 6, 1, true);
      g.translate(0, -0.36, 0.06 * bws); g.rotateX(Math.PI); g.translate(0, -0.72, 0);
      g.scale(1.0, 1, 0.55);
      return g;
    }), cloth('stripes', S.pallu ?? S.bottom, S.top, S.trim, { spacing: 0.04, double: true }), { o: 1.8 });
    mesh.position.set(0, -0.02, 0.1 * bws);
    hips.add(mesh);
  }

  // ---- pallu (shoulder cloth)
  if (O.pallu) {
    const pc = S.pallu ?? S.bottom2 ?? S.bottom;
    const rr = (y) => (0.115 + 0.2 * Math.pow(Math.max(0, y) / torsoH, 0.85) + Math.sin(Math.max(0, y) / torsoH * Math.PI) * 0.03) * bw;
    const band = mk(geo(`pallu|${r3(bw)}|${r3(torsoH)}`, () => {
      const pts = [new THREE.Vector3(0.2 * bw, torsoH + 0.03, -0.14 * bw)];
      const N = 6;
      for (let i = 0; i <= N; i++) {
        const t = i / N, y = torsoH * (0.98 - 0.85 * t), x = (0.2 - 0.36 * t) * bw;
        pts.push(new THREE.Vector3(x, y, Math.sqrt(Math.max(0, rr(y) ** 2 - x * x)) + 0.03));
      }
      pts.push(new THREE.Vector3(-0.2 * bw, torsoH * 0.04, rr(0.05) * 0.5 + 0.1));
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.058, 5, false);
    }), cloth('stripes', pc, S.top2 === PASTEL.white ? 0xfffaf0 : S.top2, null, { spacing: 0.04 }), { o: 1.6 });
    spine.add(band);
  }

  // ---- head
  const neck = new THREE.Bone(); neck.position.y = torsoH; spine.add(neck);
  const headG = neck;
  const HI = S.detail === 'high';
  const head = mk(geo(`head|${r3(hr)}|${HI}`, () => new THREE.SphereGeometry(hr, HI ? 16 : 10, HI ? 11 : 7)), skinM, { o: 2.4 });
  head.position.y = headOff; head.scale.set(1.05, 0.95, 1.0);
  headG.add(head);
  for (const sd of [-1, 1]) { // little ball ears
    const ear = mk(sph(hr * 0.2, 5, 3), skinM, { o: 0 });
    ear.scale.set(0.55, 1, 0.8); ear.position.set(sd * hr * 0.99, headOff - hr * 0.05, -hr * 0.05);
    headG.add(ear);
  }
  const faceGeo = geo(`face|${r3(hr)}|${HI}`, () =>
    new THREE.SphereGeometry(hr * 1.02, HI ? 14 : 8, HI ? 8 : 5, Math.PI / 2 - FACE_PHI / 2, FACE_PHI, Math.PI / 2 - FACE_THETA / 2, FACE_THETA));
  const faceMat = new THREE.MeshBasicMaterial({ map: faceTexture(S.face, 'open'), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  const faceMesh = new THREE.Mesh(faceGeo, faceMat);
  faceMesh.position.y = headOff; faceMesh.scale.set(1.05, 0.95, 1.0);
  faceMesh.layers.set(OVERLAY_LAYER); faceMesh.name = 'face'; faceMesh.userData.noBake = true; faceMesh.renderOrder = 2;
  headG.add(faceMesh);
  let faceState = 'open';
  const face = {
    mesh: faceMesh, spec: S.face,
    setState(st) {
      if (st === faceState) return;
      faceState = st;
      faceMat.map = faceTexture(S.face, st);
    },
    get state() { return faceState; },
  };
  const hairMeshes = buildHair(S.hair, hr, seed);
  for (const m of hairMeshes) { m.position.y += headOff; headG.add(m); }
  const hatLift = (HAT_LIFT[S.hair.style] ?? 0) * hr;

  // ---- arms
  const arms = [];
  const sleeves = S.sleeves ?? O.sleeves;
  for (const s of [1, -1]) {
    const sh = new THREE.Bone(); sh.position.set(s * (0.3 * bw - 0.01), torsoH - 0.035, 0); spine.add(sh);
    const el = new THREE.Bone(); el.position.y = -ua; sh.add(el);
    const hand = new THREE.Bone(); hand.position.y = -fa; el.add(hand);
    const upperM = sleeves === 'none' ? skinM : topM;
    const foreM = sleeves === 'long' ? topM : skinM;
    const upper = mk(limb(sleeves === 'none' ? 0.058 : 0.075, sleeves === 'none' ? 0.046 : 0.062, ua, 5), upperM, { o: 1.9 });
    const fore = mk(limb(sleeves === 'long' ? 0.064 : 0.048, sleeves === 'long' ? 0.054 : 0.04, fa, 5), foreM, { o: 1.9 });
    sh.add(upper); el.add(fore);
    const ball = mk(sph(0.076 * Math.sqrt(S.armScale), 5, 4), skinM, { o: 1.7 });
    hand.add(ball);
    arms.push({ sh, el, hand });
  }

  // ---- slots + accessories
  const mkSlot = (parent, x, y, z) => { const o = new THREE.Object3D(); o.position.set(x, y, z); parent.add(o); return o; };
  const slots = {
    handL: arms[0].hand, handR: arms[1].hand,
    head: mkSlot(headG, 0, headOff + hr * 0.97 + hatLift, 0),
    face: mkSlot(headG, 0, headOff, 0),
    mouth: mkSlot(headG, 0, headOff - hr * 0.36, hr * 0.94),
    chest: mkSlot(spine, 0, torsoH * 0.5, 0),
    shoulderL: mkSlot(spine, 0.17 * bw, torsoH, 0),
    shoulderR: mkSlot(spine, -0.17 * bw, torsoH, 0),
    spine: mkSlot(spine, 0, 0, 0),
    back: mkSlot(spine, 0, torsoH * 0.55, 0),
    armL: mkSlot(arms[0].sh, 0, -ua * 0.55, 0), armR: mkSlot(arms[1].sh, 0, -ua * 0.55, 0),
    wristL: mkSlot(arms[0].el, 0, -fa * 0.8, 0), wristR: mkSlot(arms[1].el, 0, -fa * 0.8, 0),
    ground: mkSlot(group, 0, 0, 0),
  };
  const acc = {};
  const accList = [];
  for (const entry of S.accessories) {
    const e = typeof entry === 'string' ? { name: entry } : entry;
    const o = makeAccessory(e.name, { bw, torsoH, headR: hr, seed, ...e });
    const slotName = e.slot ?? o.userData.slot;
    slots[slotName].add(o);
    if (e.pos) o.position.fromArray(e.pos);
    if (slotName === 'shoulderR') o.scale.x = -1;
    o.userData.dynamic = !!(o.userData.orient || o.userData.update || e.name === 'whistle' || e.name === 'ball');
    acc[e.name] = o;
    accList.push({ obj: o, name: e.name, slot: slotName });
  }

  // ---- bake rigid parts into one skinned mesh (+ one outline) and a static far copy
  const bones = [];
  group.traverse((o) => { if (o.isBone) bones.push(o); });
  const baked = bakePerson(group, bones);
  let lodLevel = 0;
  group.userData.lod = (level) => {
    if (level === lodLevel) return lodLevel;
    lodLevel = level;
    group.visible = level < 2;
    const near = level === 0;
    baked.body.visible = baked.outline.visible = near;
    baked.farBody.visible = baked.farOutline.visible = level === 1;
    faceMesh.visible = near;
    for (const a of accList) if (a.obj.userData.dynamic) a.obj.visible = near;
    return lodLevel;
  };
  group.userData.lodLevel = () => lodLevel;
  group.userData.baked = baked;

  // ---- animation
  const rig = { root, hips, spine, headG, headBaseY: hipY + torsoH, arms, legs, skirt, face, acc: accList, accMap: acc, hipY, scale: k };
  group.userData.rig = { root, body: hips, feet: legs.map((l) => l.ankle), eyes: [] }; // engine fallback contract
  group.userData.slots = slots;
  group.userData.acc = acc;
  group.userData.face = face;
  group.userData.height = S.height;
  group.userData.radius = 0.36 * bws * Math.max(1, k * 0.6 + 0.4) + 0.12;
  group.userData.spec = S;
  attachAnimator(group, rig, {
    gait: { ...(O.stride ? { strideMul: O.stride } : {}), ...S.gait },
    hold: S.hold, seed, kid: S.height < 1.8, lodLevel: () => lodLevel,
  });
  if (S.sit != null) group.userData.sit(S.sit === true ? 0.5 : S.sit);
  group.traverse((o) => { if (o.isMesh && o.material.isMeshBasicMaterial) o.layers.set(OVERLAY_LAYER); });
  return group;
}

export default createPerson;
