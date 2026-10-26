// Shared Hyderabad building parts (reference-photo driven): pointed-arch wall, minaret, domed chhatri, onion dome, jali screen, clock face.
import * as THREE from 'three';
import { PAL, makeCanvas, handRng, INK, wobblyLine, polyShape } from './kit.js';

export const LM = { body: PAL.lime, light: PAL.limeLight, dark: PAL.limeDark, gold: PAL.gold };

/** a wall slab w x h with a pointed-arch hole (half-width aw, springing `spring`, apex `apex`), for k.extrude(colour, shape, depth) */
export function archWall(w, h, aw, spring, apex) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.closePath();
  const p = new THREE.Path();
  p.moveTo(-aw, 0); p.lineTo(-aw, spring);
  p.quadraticCurveTo(-aw, spring + (apex - spring) * 0.78, 0, apex);
  p.quadraticCurveTo(aw, spring + (apex - spring) * 0.78, aw, spring);
  p.lineTo(aw, 0); p.closePath();
  s.holes.push(p);
  return s;
}

/** pointed-arch flat opening shape (no hole): like kit archShape(pointed) but taller point */
export function pointedShape(w, h) {
  const hs = Math.max(0.01, h * 0.55);
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, hs);
  s.quadraticCurveTo(w / 2, hs + (h - hs) * 0.75, 0, h);
  s.quadraticCurveTo(-w / 2, hs + (h - hs) * 0.75, -w / 2, hs);
  s.closePath();
  return s;
}

/** onion-ish dome profile via lathe: base radius r on y0 */
export function onion(k, color, r, x, y0, z, { seg = 8, tall = 1.15 } = {}) {
  const prof = [[0.01, 0], [r * 0.92, 0.02 * r], [r * 1.08, 0.38 * r * tall], [r * 0.92, 0.78 * r * tall], [r * 0.45, 1.12 * r * tall], [r * 0.1, 1.38 * r * tall], [0.005, 1.46 * r * tall]];
  return k.lathe(color, prof, x, y0, z, { seg });
}

/** small domed chhatri (four slim posts, a slab, a dome and a finial) */
export function chhatri(k, x, y, z, s = 1, { col = PAL.lime, light = PAL.limeLight, dome = PAL.limeLight } = {}) {
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.cyl(col, 0.07 * s, 0.09 * s, 0.8 * s, x + dx * 0.34 * s, y, z + dz * 0.34 * s, { seg: 5 });
  k.box(light, 0.95 * s, 0.1 * s, 0.95 * s, x, y + 0.8 * s, z);
  onion(k, dome, 0.42 * s, x, y + 0.9 * s, z, { seg: 8, tall: 1.0 });
  k.cone(PAL.gold, 0.04 * s, 0.4 * s, x, y + 0.9 * s + 0.58 * s, z, { seg: 4 });
}

/** a Charminar minaret: fluted shaft in three stages, three balconies, a lantern with arched openings and a domed top. Height ~ 16.4 above y0 */
export function minaret(k, x, y0, z, { s = 1, col = LM.body, light = LM.light, dark = LM.dark } = {}) {
  const sg = 8;
  k.cyl(dark, 1.0 * s, 1.15 * s, 0.9 * s, x, y0, z, { seg: sg });
  k.cyl(col, 0.78 * s, 0.9 * s, 6.5 * s, x, y0 + 0.9 * s, z, { seg: sg });
  // flutes: a ring of thin ridges
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; k.box(light, 0.1 * s, 6.0 * s, 0.1 * s, x + Math.sin(a) * 0.86 * s, y0 + 1.1 * s, z + Math.cos(a) * 0.86 * s, { ry: a, outline: false }); }
  const balcony = (y, r) => {
    k.cyl(dark, r * 0.72, r, 0.34 * s, x, y, z, { seg: 10 });          // corbelled underside
    k.cyl(light, r * 1.04, r * 1.04, 0.14 * s, x, y + 0.34 * s, z, { seg: 10 });
    k.cyl(col, r * 0.98, r * 0.98, 0.42 * s, x, y + 0.48 * s, z, { seg: 10 }); // parapet drum
    k.cyl(light, r * 1.04, r * 1.04, 0.1 * s, x, y + 0.9 * s, z, { seg: 10 });
  };
  balcony(y0 + 7.4 * s, 1.22 * s);
  k.cyl(col, 0.66 * s, 0.76 * s, 3.2 * s, x, y0 + 8.3 * s, z, { seg: sg });
  balcony(y0 + 11.5 * s, 1.0 * s);
  k.cyl(col, 0.55 * s, 0.62 * s, 2.2 * s, x, y0 + 12.4 * s, z, { seg: sg });
  balcony(y0 + 14.6 * s, 0.82 * s);
  // lantern with little arched openings, then the dome
  k.cyl(light, 0.46 * s, 0.5 * s, 1.1 * s, x, y0 + 15.5 * s, z, { seg: 8 });
  for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) k.flat(PAL.glassDark, pointedShape(0.26 * s, 0.7 * s), x + Math.sin(a) * 0.5 * s, y0 + 15.65 * s, z + Math.cos(a) * 0.5 * s, { ry: a });
  k.cyl(dark, 0.62 * s, 0.62 * s, 0.14 * s, x, y0 + 16.6 * s, z, { seg: 8 });
  onion(k, light, 0.56 * s, x, y0 + 16.72 * s, z, { seg: 8, tall: 1.0 });
  k.cone(PAL.gold, 0.05 * s, 0.7 * s, x, y0 + 17.45 * s + 0.0, z, { seg: 4 });
}

/** painted jali lattice (perforated screen): returns a canvas of dark square holes on a pale ground (tile horizontally) */
let _jali = null;
export function jaliCanvas() {
  if (_jali) return _jali;
  const { c, ctx } = makeCanvas(256, 64);
  const r = handRng(9);
  ctx.fillStyle = '#f6f1e2'; ctx.fillRect(0, 0, 256, 64);
  ctx.fillStyle = 'rgba(70,60,70,0.78)';
  for (let i = 0; i < 16; i++) for (let j = 0; j < 3; j++) {
    const x = 6 + i * 15.6, y = 7 + j * 19;
    ctx.beginPath();
    ctx.moveTo(x, y + 14); ctx.lineTo(x, y + 6); ctx.quadraticCurveTo(x, y, x + 5, y - 1); ctx.quadraticCurveTo(x + 11, y, x + 11, y + 6); ctx.lineTo(x + 11, y + 14); ctx.closePath(); ctx.fill();
  }
  wobblyLine(ctx, [[2, 62], [254, 62]], { r, amp: 1, lw: 3 });
  wobblyLine(ctx, [[2, 2], [254, 2]], { r, amp: 1, lw: 3 });
  _jali = c;
  return c;
}

export function clockFace() {
  const { c, ctx } = makeCanvas(160, 160);
  const r = handRng(3);
  ctx.fillStyle = '#fbf6e6'; ctx.beginPath(); ctx.arc(80, 80, 72, 0, 6.283); ctx.fill();
  wobblyLine(ctx, Array.from({ length: 14 }, (_, i) => [80 + Math.cos((i / 14) * 6.283) * 72, 80 + Math.sin((i / 14) * 6.283) * 72]), { r, amp: 2, lw: 6, closed: true });
  ctx.fillStyle = INK;
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.283; ctx.beginPath(); ctx.arc(80 + Math.sin(a) * 54, 80 - Math.cos(a) * 54, i % 3 === 0 ? 5 : 3, 0, 6.283); ctx.fill(); }
  wobblyLine(ctx, [[80, 80], [80 + Math.sin(2.4) * 32, 80 - Math.cos(2.4) * 32]], { r, amp: 1, lw: 6 });
  wobblyLine(ctx, [[80, 80], [80 + Math.sin(5.6) * 46, 80 - Math.cos(5.6) * 46]], { r, amp: 1, lw: 4 });
  ctx.beginPath(); ctx.arc(80, 80, 5, 0, 6.283); ctx.fill();
  return c;
}

export const hip = (k, color, w, d, h, x, y, z) => k.add(new THREE.ConeGeometry(1, h, 4, 1).rotateY(Math.PI / 4).scale(w / 1.414, 1, d / 1.414), color, { pos: [x, y + h / 2, z] });
export const gable = (k, color, w, h, d, x, y, z, ry = 0) => k.extrude(color, polyShape([[-w / 2, 0], [w / 2, 0], [0, h]]), d, x, y, z, { ry });

/** a simple palm: tapering trunk + a crown of drooping fronds (cheap: 1 cylinder, 7 boxes) */
export function palm(k, x, z, h = 4.2, { y0 = 0, lean = 0 } = {}) {
  k.cyl(0xb59a76, 0.13, 0.2, h, x, y0, z, { seg: 5 });
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    k.box(i % 2 ? 0x6fb06a : 0x7fc07a, 0.34, 0.05, 1.7, x + Math.sin(a) * 0.7, y0 + h + 0.05, z + Math.cos(a) * 0.7, { ry: a, rx: 0.5, outline: false });
  }
  k.ball(0x9a7a4a, 0.16, x, y0 + h - 0.1, z, { seg: 5, ring: 4, outline: false });
}
