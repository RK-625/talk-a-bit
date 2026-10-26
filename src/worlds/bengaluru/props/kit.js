/**
 * bengaluru/props/kit.js: shared helpers for the Mumbai vehicles, stalls and street props.
 *
 *   C                         pastel palette (kaali-peeli, BEST red, chai amber...)
 *   Mix extends Parts         box / round / ball / cyl / cone / tube / curve / lathe / side / paint / include helpers
 *   meshOf(ink, parts, opts)  -> Mesh with shared vertex-colour ink material + ink outline hull
 *   vcMat(ink, spacing)       shared vertex-colour ink material (cached per ink module)
 *   texMat(ink, canvas)       ink material that carries a Canvas texture (painted train sides, tarps)
 *   plaque(ink, w, h, fn)     hand-painted sign (Canvas 2D) on a thin outlined slab, facing +Z
 *   hand(ctx, text, x, y)     hand-lettered text (Latin per-glyph jitter, Devanagari whole-string), sticker outline
 *   wonk(geo, amt, seed)      smooth low-frequency wobble of a geometry (hand-drawn proportions)
 *   taperTube(points, r0, r1) tapered capped tube along a Catmull-Rom curve
 *   finish(group, {...})      sets group.userData footprint/colliders
 *   rig(group, ...)           vehicle animate() wiring (wheel spin, body bounce)
 *   steam(...)                little rising smoke/steam doodle sprites
 *   triCount(obj)             triangle count of a group (outline hulls optional)
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import * as INKMOD from '../../../engine/ink.js';
import { computeBounds } from './meta.js';
import { Parts, mulberry32, sphere, cyl, cone } from '../../../engine/scatter.js';
import { makeCanvas, rng, drawShape, wobblyLine, INK, toTexture as baseToTexture } from '../../../engine/doodle.js';
import { KN_FONT, isKannada, kannadaReady, onKannadaReady } from '../kannada.js';

// canvas -> texture, so a sign painted before the Kannada font loaded can be repainted and re-uploaded
const texOf = new WeakMap();
export function toTexture(c, ...rest) { const t = baseToTexture(c, ...rest); texOf.set(c, t); return t; }

export { mulberry32, sphere, cyl, cone, rng, INK, makeCanvas, drawShape, wobblyLine };
export const INKC = INKMOD.INK_COLOR;
export const resolveInk = (ink) => (ink && ink.createInkMaterial ? ink : INKMOD);

/** Pastel Mumbai palette. */
export const C = {
  ink: 0x2b2440,
  kaali: 0x4b4363, peeli: 0xf6d86a, butter: 0xfbe9a0,
  bestRed: 0xe45d52, bestDark: 0xc4453f, cream: 0xf7f0da, white: 0xfbf8ee,
  steel: 0xc8d1d8, steelDark: 0x9aa7b1, tin: 0xb4c4cd, brass: 0xe4b95a,
  glass: 0xbfdce6, glassDark: 0x8fb3c4,
  wood: 0xcf9f6c, woodDark: 0xa97a4c, woodLight: 0xe3be8c,
  tyre: 0x41394f, hub: 0xdfe4e8,
  marigold: 0xf6a634, marigoldY: 0xf9cf4a, rose: 0xf08aa6, leaf: 0x86c97c, leafDark: 0x62ab70,
  teal: 0x8fd3c6, sky: 0xa9d2ee, pistachio: 0xbfe0b5, pink: 0xf4b6c6, lilac: 0xc4b2ee, terracotta: 0xd98a68,
  maroon: 0xb9566a, purple: 0x9c7bd0, sand: 0xedd39a, asphalt: 0xb9b6c9,
  skin1: 0xe9b58f, skin2: 0xc98a62, skin3: 0xa56a48, skin4: 0xf1c9a5,
  red: 0xe9625a, green: 0x79c47e, blue: 0x7fb4e8, yellow: 0xf6d65e, orange: 0xf4a05a, white2: 0xffffff,
};

// ---- materials --------------------------------------------------------------
const matCache = new WeakMap();
function cache(ink) { const k = resolveInk(ink); if (!matCache.has(k)) matCache.set(k, new Map()); return [k, matCache.get(k)]; }

/** Shared vertex-colour ink material. */
export function vcMat(ink, spacing = 0.09, strength = 0.9) {
  const [I, m] = cache(ink);
  const key = `vc${spacing}/${strength}`;
  if (!m.has(key)) m.set(key, I.createInkMaterial({ vertexColors: true, hatchSpacing: spacing, hatchStrength: strength }));
  return m.get(key);
}

/** Ink material carrying a canvas texture (not shared: one per canvas). */
export function texMat(ink, canvas, { spacing = 0.07, strength = 0.8, lightHatch = 0 } = {}) {
  const I = resolveInk(ink);
  const mat = I.createInkMaterial({ color: 0xffffff, hatchSpacing: spacing, hatchStrength: strength, lightHatch });
  mat.map = toTexture(canvas);
  return mat;
}

/** Flat unlit colour (lamps, bulbs). */
export function glowMat(color) { return new THREE.MeshBasicMaterial({ color }); }

// ---- geometry helpers ---------------------------------------------------------
export function rbox(w, h, d, r = 0.1, seg = 1) {
  const rr = Math.min(r, Math.min(w, h, d) * 0.45);
  return new RoundedBoxGeometry(w, h, d, seg, rr);
}

/** Smooth wobble (position-based, so seams stay closed). */
export function wonk(geo, amt = 0.03, seed = 1) {
  const g = geo.clone();
  const p = g.attributes.position;
  const r = mulberry32(seed * 977 + 3);
  const ph = [r() * 6, r() * 6, r() * 6];
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    p.setXYZ(i, x + amt * Math.sin(y * 2.1 + z * 1.3 + ph[0]), y + amt * Math.sin(z * 1.9 + x * 1.7 + ph[1]), z + amt * Math.sin(x * 2.3 + y * 1.1 + ph[2]));
  }
  return g;
}

/** Polygon with rounded corners (quadratic) as a Shape. pts = [[x,y]...] */
export function roundedShape(pts, r = 0.15) {
  const s = new THREE.Shape();
  const n = pts.length;
  const V = (p) => new THREE.Vector2(p[0], p[1]);
  for (let i = 0; i < n; i++) {
    const p = V(pts[i]), a = V(pts[(i + n - 1) % n]), b = V(pts[(i + 1) % n]);
    const rr = Math.min(r, p.distanceTo(a) * 0.45, p.distanceTo(b) * 0.45);
    const p0 = p.clone().add(a.clone().sub(p).setLength(rr));
    const p1 = p.clone().add(b.clone().sub(p).setLength(rr));
    if (i === 0) s.moveTo(p0.x, p0.y); else s.lineTo(p0.x, p0.y);
    s.quadraticCurveTo(p.x, p.y, p1.x, p1.y);
  }
  s.closePath();
  return s;
}

/** Extrude a side profile [[z,y]...] across the vehicle width (centred on x=0, front = +z). Bevel grows the profile. */
export function sideGeo(pts, width, { bevel = 0.07, round = 0.25 } = {}) {
  const s = round > 0 ? roundedShape(pts, round) : new THREE.Shape(pts.map((p) => new THREE.Vector2(p[0], p[1])));
  const depth = Math.max(0.01, width - bevel * 2);
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 4, steps: 1 });
  g.translate(0, 0, -depth / 2);
  g.rotateY(-Math.PI / 2);
  return g;
}

/** Tapered, capped tube along a smooth curve through `pts`. r0/r1 numbers or fn(t). */
export function taperTube(pts, r0, r1 = r0, radial = 6, { steps = null, cap = true } = {}) {
  const vp = pts.map((p) => (p.isVector3 ? p : new THREE.Vector3(...p)));
  const curve = vp.length > 2 ? new THREE.CatmullRomCurve3(vp, false, 'centripetal') : new THREE.LineCurve3(vp[0], vp[1]);
  const n = steps ?? Math.max(2, (vp.length - 1) * 3);
  const fr = curve.computeFrenetFrames(n, false);
  const pos = [], idx = [];
  const rad = (t) => (typeof r0 === 'function' ? r0(t) : r0 + (r1 - r0) * t);
  for (let i = 0; i <= n; i++) {
    const t = i / n, p = curve.getPointAt(t), N = fr.normals[i], B = fr.binormals[i], r = rad(t);
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      pos.push(p.x + (N.x * Math.cos(a) + B.x * Math.sin(a)) * r, p.y + (N.y * Math.cos(a) + B.y * Math.sin(a)) * r, p.z + (N.z * Math.cos(a) + B.z * Math.sin(a)) * r);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j, b = i * radial + ((j + 1) % radial), c = a + radial, d = b + radial;
      idx.push(a, b, c, b, d, c);
    }
  }
  if (cap) {
    for (const [ring, flip] of [[0, true], [n, false]]) {
      const p = curve.getPointAt(ring / n);
      const ci = pos.length / 3;
      pos.push(p.x, p.y, p.z);
      for (let j = 0; j < radial; j++) {
        const a = ring * radial + j, b = ring * radial + ((j + 1) % radial);
        if (flip) idx.push(ci, b, a); else idx.push(ci, a, b);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

const _q = new THREE.Quaternion(), _up = new THREE.Vector3(0, 1, 0), _e = new THREE.Euler();

/** Parts with convenience adders. */
export class Mix extends Parts {
  add(geo, color, o = {}) {
    const g = o.wonk ? wonk(geo, o.wonk, o.seed ?? 1) : geo;
    return super.add(g, color, o);
  }
  box(w, h, d, color, o = {}) { return this.add(new THREE.BoxGeometry(w, h, d), color, o); }
  round(w, h, d, color, o = {}) { return this.add(rbox(w, h, d, o.r ?? 0.12, o.seg ?? 1), color, o); }
  ball(r, color, o = {}) { return this.add(sphere(r, o.w ?? 10, o.h ?? 7), color, o); }
  cyl(rt, rb, h, color, o = {}) { return this.add(cyl(rt, rb, h, o.seg ?? 8), color, o); }
  cone(r, h, color, o = {}) { return this.add(cone(r, h, o.seg ?? 8), color, o); }
  lathe(pts, color, o = {}) { return this.add(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), o.seg ?? 10), color, o); }
  /** straight tube between two points */
  tube(a, b, r, color, o = {}) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const d = B.clone().sub(A), len = d.length();
    _q.setFromUnitVectors(_up, d.normalize());
    _e.setFromQuaternion(_q);
    return this.add(cyl(r, r, len, o.seg ?? 6), color, { ...o, pos: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], rot: [_e.x, _e.y, _e.z] });
  }
  /** tapered curved tube */
  curve(pts, r0, r1, color, o = {}) { return this.add(taperTube(pts, r0, r1, o.radial ?? 6, o), color, o); }
  side(pts, width, color, o = {}) { return this.add(sideGeo(pts, width, o), color, o); }
  /** vertex-colour painting by triangle centroid: fn(x,y,z,nx,ny,nz) -> colour */
  paint(geo, fn, { pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], outline = true } = {}) {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    g.deleteAttribute('uv');
    const p = g.attributes.position, n = p.count;
    const col = new Float32Array(n * 3);
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), nn = new THREE.Vector3(), cc = new THREE.Color();
    for (let i = 0; i < n; i += 3) {
      a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); c.fromBufferAttribute(p, i + 2);
      nn.crossVectors(b.clone().sub(a), c.clone().sub(a)).normalize();
      const cx = (a.x + b.x + c.x) / 3, cy = (a.y + b.y + c.y) / 3, cz = (a.z + b.z + c.z) / 3;
      cc.set(fn(cx, cy, cz, nn.x, nn.y, nn.z));
      for (let k = 0; k < 3; k++) { col[(i + k) * 3] = cc.r; col[(i + k) * 3 + 1] = cc.g; col[(i + k) * 3 + 2] = cc.b; }
    }
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(...pos), new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)), new THREE.Vector3(...scale)));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    this.all.push(g);
    if (outline) { const h = g.clone(); h.deleteAttribute('color'); h.deleteAttribute('normal'); this.hull.push(h); }
    return this;
  }
  /** merge another Parts (or Mix) in with a transform */
  include(o, { pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1] } = {}) {
    const m = new THREE.Matrix4().compose(new THREE.Vector3(...pos), new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)), new THREE.Vector3(...(typeof scale === 'number' ? [scale, scale, scale] : scale)));
    for (const g of o.all) this.all.push(g.clone().applyMatrix4(m));
    for (const g of o.hull) this.hull.push(g.clone().applyMatrix4(m));
    return this;
  }
}

// ---- faces ----------------------------------------------------------------------
/** Cartoon eyes (white + dark pupils) and a smile on a surface facing +z (sgn -1: facing -z). */
export function eyes(p, { x = 0.6, y = 1, z = 0, r = 0.2, sgn = 1, look = [0, 0.02], sleepy = false, flat = 0.55 } = {}) {
  for (const sx of (x === 0 ? [0] : [-1, 1])) {
    if (sleepy) {
      p.add(new THREE.TorusGeometry(r * 0.8, r * 0.18, 5, 10, Math.PI), INKC, { pos: [sx * x, y + r * 0.2, z * sgn], rot: [0, sgn < 0 ? Math.PI : 0, Math.PI], outline: false });
    } else {
      p.add(sphere(r, 10, 7), C.white, { pos: [sx * x, y, z * sgn], scale: [1, 1, flat], outline: true });
      p.add(sphere(r * 0.52, 8, 6), INKC, { pos: [sx * x + look[0] * r, y + look[1] * r, (z + r * flat * 0.75) * sgn], scale: [1, 1, 0.5], outline: false });
      p.add(sphere(r * 0.16, 5, 4), C.white, { pos: [sx * x + r * 0.12, y + r * 0.2, (z + r * flat * 1.12) * sgn], outline: false });
    }
  }
}
export function smile(p, { x = 0, y = 0.8, z = 0, R = 0.3, t = 0.04, sgn = 1 } = {}) {
  p.add(new THREE.TorusGeometry(R, t, 5, 12, Math.PI), INKC, { pos: [x, y + R * 0.6, z * sgn], rot: [0, sgn < 0 ? Math.PI : 0, Math.PI], outline: false });
}
export function blush(p, { x = 0.9, y = 0.9, z = 0, r = 0.1, sgn = 1 } = {}) {
  for (const sx of [-1, 1]) p.add(sphere(r, 6, 4), 0xf49bb2, { pos: [sx * x, y, z * sgn], scale: [1, 0.6, 0.3], outline: false });
}

// ---- meshes ---------------------------------------------------------------------
export function meshOf(ink, parts, { spacing = 0.09, strength = 0.9, thickness = 2.2, wobbleFreq = 1.4, cast = true, outline = true } = {}) {
  const I = resolveInk(ink);
  const geometry = mergeGeometries(parts.all);
  const mesh = new THREE.Mesh(geometry, vcMat(ink, spacing, strength));
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  if (outline && parts.hull.length) I.addOutline(mesh, { thickness, geometry: mergeGeometries(parts.hull), wobbleFreq });
  return mesh;
}

export function plainMesh(ink, geo, color, { spacing = 0.09, thickness = 2.2, outline = true, map = null, cast = true } = {}) {
  const I = resolveInk(ink);
  const mat = I.createInkMaterial({ color, hatchSpacing: spacing, hatchStrength: 0.9 });
  if (map) mat.map = map;
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast; m.receiveShadow = true;
  if (outline) I.addOutline(m, { thickness });
  return m;
}

// ---- painting ---------------------------------------------------------------------
export const FONT = "'Bradley Hand','Marker Felt','Noteworthy','Segoe Print','Comic Sans MS',cursive";
export const DEV_FONT = "'Kohinoor Devanagari','Devanagari Sangam MN','Noto Sans Devanagari','Mukta','Nirmala UI',sans-serif";
const isDev = (t) => /[ऀ-ॿ]/.test(t) || isKannada(t); // whole-string lettering (conjuncts must not be split per glyph)
const fontFor = (t) => (isKannada(t) ? KN_FONT : DEV_FONT);

/** Hand-lettered text with an optional sticker outline. Latin is jittered glyph by glyph; Devanagari stays whole. */
export function hand(ctx, text, x, y, { size = 40, fill = INK, stroke = null, sw = null, align = 'center', seed = 5, rot = 0, weight = 'bold', jitter = 1, shadow = null, maxW = 0 } = {}) {
  if (maxW) { // shrink to fit
    ctx.save();
    ctx.font = `${weight} ${size}px ${isDev(text) ? fontFor(text) : FONT}`;
    const w = ctx.measureText(text).width;
    ctx.restore();
    if (w > maxW) size *= maxW / w;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const dev = isDev(text);
  ctx.font = `${weight} ${size}px ${dev ? fontFor(text) : FONT}`;
  ctx.textBaseline = 'alphabetic';
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = sw ?? size * 0.17;
  const pass = (dx, dy, f, s) => {
    if (dev) {
      ctx.textAlign = align;
      if (s) { ctx.lineWidth = lw; ctx.strokeStyle = s; ctx.strokeText(text, dx, dy); }
      ctx.fillStyle = f; ctx.fillText(text, dx, dy);
      return;
    }
    const w = [...text].map((ch) => ctx.measureText(ch).width * 0.97);
    const total = w.reduce((a, b) => a + b, 0);
    let cx = align === 'center' ? -total / 2 : align === 'right' ? -total : 0;
    const rr = rng(seed * 131 + 11);
    [...text].forEach((ch, i) => {
      ctx.save();
      ctx.translate(cx + w[i] / 2 + dx + (rr() - 0.5) * size * 0.07 * jitter, dy + (rr() - 0.5) * size * 0.12 * jitter);
      ctx.rotate((rr() - 0.5) * 0.16 * jitter);
      ctx.scale(1, 0.94 + rr() * 0.12);
      ctx.textAlign = 'center';
      if (s) { ctx.lineWidth = lw; ctx.strokeStyle = s; ctx.strokeText(ch, 0, 0); }
      ctx.fillStyle = f; ctx.fillText(ch, 0, 0);
      ctx.restore();
      cx += w[i];
    });
  };
  if (shadow) pass(size * 0.06, size * 0.07, shadow, shadow === '#000' ? null : stroke);
  pass(0, 0, fill, stroke);
  ctx.restore();
}

/** Lay several hand-lettered words side by side, centred on x. parts: [{text,size,fill,stroke,sw,seed,dy}] */
export function handRow(ctx, parts, x, y, { gap = 0.3 } = {}) {
  const widths = parts.map((p) => {
    ctx.save();
    ctx.font = `${p.weight ?? 'bold'} ${p.size}px ${isDev(p.text) ? fontFor(p.text) : FONT}`;
    const w = ctx.measureText(p.text).width * (isDev(p.text) ? 1 : 0.97);
    ctx.restore();
    return w;
  });
  const gp = (parts[0]?.size ?? 30) * gap;
  const total = widths.reduce((a, b) => a + b, 0) + gp * (parts.length - 1);
  let cx = x - total / 2;
  parts.forEach((p, i) => { hand(ctx, p.text, cx, y + (p.dy ?? 0), { ...p, align: 'left' }); cx += widths[i] + gp; });
}

/** Pencil-filled wobbly rectangle (sign board). */
export function boardRect(ctx, x, y, w, h, { fill = '#fdf0b0', hatch = 'rgba(200,150,60,0.6)', r = rng(9), amp = 3, lw = 4, round = 14, cw = 1024, ch = 512 } = {}) {
  const pts = [[x + round, y], [x + w / 2, y - 1], [x + w - round, y], [x + w, y + round], [x + w + 1, y + h / 2], [x + w, y + h - round], [x + w - round, y + h], [x + w / 2, y + h + 1], [x + round, y + h], [x, y + h - round], [x - 1, y + h / 2], [x, y + round]];
  drawShape(ctx, pts, { fill, hatch, w: cw, h: ch, r, amp, lw });
}

export function paintCanvas(w, h, fn) {
  const { c, ctx } = makeCanvas(w, h);
  fn(ctx, w, h);
  // repaint once the Kannada font has loaded (the first paint used the fallback stack)
  if (!kannadaReady()) onKannadaReady(() => { ctx.clearRect(0, 0, w, h); fn(ctx, w, h); const t = texOf.get(c); if (t) t.needsUpdate = true; });
  return c;
}

/** Painted sign: a canvas on a thin outlined slab, +z facing. 1 unit = `ppu` pixels. */
export function plaque(ink, w, h, fn, { ppu = 160, depth = 0.06, frame = 0xf3edda, thickness = 2 } = {}) {
  const I = resolveInk(ink);
  const cw = Math.round(w * ppu), ch = Math.round(h * ppu);
  const c = paintCanvas(cw, ch, fn);
  const decal = I.createDecal(c, w, h, { depth, thickness, frame });
  const m = decal.children[1]?.material?.map;
  if (m) texOf.set(c, m);
  return decal;
}

export function plateText(seed, series = '01') {
  const r = mulberry32(seed * 31 + 5);
  const L = 'ABCDEFGHJKLMNPRSTUVXZ';
  return `KA ${series} ${L[Math.floor(r() * L.length)]}${L[Math.floor(r() * L.length)]} ${1000 + Math.floor(r() * 8999)}`;
}

/** Number plate plaque (w x h units). */
export function plateDecal(ink, text, { w = 1, h = 0.3, bg = '#1f1b2b', fg = '#f6d86a' } = {}) {
  return plaque(ink, w, h, (ctx, cw, ch) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, ch);
    ctx.strokeStyle = fg; ctx.lineWidth = 3; ctx.strokeRect(5, 5, cw - 10, ch - 10);
    ctx.font = `bold ${Math.round(ch * 0.62)}px ${FONT}`;
    ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, cw / 2, ch * 0.54, cw * 0.92);
  }, { ppu: 200, depth: 0.04, frame: bg === '#1f1b2b' ? 0x2a2438 : 0xf6d86a, thickness: 1.4 });
}

// ---- finishing / animation helpers -----------------------------------------------------
export function finish(group, { footprint = { w: 1, l: 1 }, colliders = [], ...extra } = {}) {
  // integration defaults: props never fade (occluder false), pad = footprint, bounds of the drawn geometry, anchors {}
  group.userData = { occluder: false, pad: { w: footprint.w, d: footprint.l }, anchors: {}, ...group.userData, footprint, colliders, ...extra };
  try { group.userData.bounds = computeBounds(group); } catch (e) { /* bounds are best-effort */ }
  group.traverse((o) => { if (o.isMesh && o.name !== 'ink-outline') { o.castShadow = o.castShadow !== false; o.receiveShadow = true; } });
  return group;
}

/** Wire vehicle animation: wheels = [{mesh, r}], body = group that bounces. */
export function rig(group, { body, wheels, bounce = 0.03, pitch = 0.008, idle = 0.008, extra = null }) {
  let t = 0;
  group.userData.wheels = wheels.map((w) => w.mesh);
  group.userData.body = body;
  group.userData.animate = (dt, speed = 0) => {
    t += dt;
    const k = Math.min(1, Math.abs(speed) / 6);
    for (const w of wheels) w.mesh.rotation.x += (speed * dt) / w.r;
    const by = Math.sin(t * 11) * bounce * k + Math.sin(t * 17) * idle * (1 - k * 0.5);
    body.position.y = by + (body.userData.baseY ?? 0);
    body.rotation.x = Math.sin(t * 6.3) * pitch * k + Math.sin(t * 2.1) * 0.003;
    body.rotation.z = Math.sin(t * 4.7) * pitch * 0.6 * k;
    if (extra) extra(dt, t, speed, k);
  };
  return group;
}

/** A wheel mesh (axis = x) with tyre, hub and spokes so spinning reads. */
export function wheelMesh(ink, R, w = 0.3, { spokes = 5, hub = C.hub, tyre = C.tyre, hubR = 0.55, seg = 14 } = {}) {
  const p = new Mix();
  p.add(new THREE.CylinderGeometry(R, R, w, seg), tyre, { rot: [0, 0, Math.PI / 2] });
  p.add(new THREE.CylinderGeometry(R * hubR, R * hubR, w * 1.08, Math.max(6, seg - 2)), hub, { rot: [0, 0, Math.PI / 2] });
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI;
    p.box(w * 1.2, R * 0.12, R * hubR * 1.85, C.steelDark, { rot: [a, 0, 0], outline: false });
  }
  p.cyl(R * 0.16, R * 0.16, w * 1.3, C.steel, { rot: [0, 0, Math.PI / 2], seg: 6, outline: false });
  return meshOf(ink, p, { spacing: 0.06, thickness: 1.6 });
}

/** Thin-spoked cycle wheel (axis = x). */
export function cycleWheel(ink, R, { tyre = C.tyre, rim = C.steel, spokes = 8 } = {}) {
  const p = new Mix();
  p.add(new THREE.TorusGeometry(R, 0.065, 5, 20), tyre, { rot: [0, Math.PI / 2, 0] });
  p.add(new THREE.TorusGeometry(R * 0.92, 0.03, 4, 20), rim, { rot: [0, Math.PI / 2, 0], outline: false });
  for (let i = 0; i < spokes / 2; i++) p.box(0.03, R * 1.84, 0.03, C.steelDark, { rot: [(i / (spokes / 2)) * Math.PI, 0, 0], outline: false });
  p.cyl(0.1, 0.1, 0.18, C.steel, { rot: [0, 0, Math.PI / 2], seg: 6 });
  return meshOf(ink, p, { spacing: 0.05, thickness: 1.4 });
}

export function triCount(obj, { outlines = false } = {}) {
  let n = 0;
  obj.traverse((o) => {
    if (!o.isMesh && !o.isInstancedMesh) return;
    if (!outlines && o.name === 'ink-outline') return;
    const g = o.geometry;
    const t = (g.index ? g.index.count : g.attributes.position.count) / 3;
    n += t * (o.isInstancedMesh ? 1 : 1);
  });
  return Math.round(n);
}

// ---- steam / smoke doodle sprites ------------------------------------------------------------
let steamTex = null;
function steamTexture() {
  if (steamTex) return steamTex;
  const { c, ctx } = makeCanvas(128, 128);
  const r = rng(17);
  const puffs = [[64, 92, 26], [46, 66, 21], [78, 52, 19], [58, 30, 15]];
  for (const [x, y, rad] of puffs) {
    const pts = Array.from({ length: 9 }, (_, i) => [x + Math.cos((i / 9) * 6.283) * rad, y + Math.sin((i / 9) * 6.283) * rad * 0.85]);
    drawShape(ctx, pts, { fill: 'rgba(255,255,255,0.92)', hatch: 'rgba(150,175,205,0.9)', w: 128, h: 128, r, amp: 3, lw: 2.6 });
  }
  steamTex = toTexture(c);
  return steamTex;
}

/** Rising steam puffs at the origin; call update(t). */
export function steam({ count = 3, height = 1.4, size = 0.7, drift = 0.25, tint = 0xffffff } = {}) {
  const g = new THREE.Group();
  const sprites = [];
  for (let i = 0; i < count; i++) {
    const mat = new THREE.SpriteMaterial({ map: steamTexture(), transparent: true, depthWrite: false, color: tint, opacity: 0.8 });
    const s = new THREE.Sprite(mat);
    s.layers.set(INKMOD.OVERLAY_LAYER);
    g.add(s);
    sprites.push(s);
  }
  g.userData.update = (t) => {
    sprites.forEach((s, i) => {
      const u = ((t * 0.28 + i / count) % 1 + 1) % 1;
      s.position.set(Math.sin(u * 5 + i * 2) * drift * u, u * height, 0);
      const sc = size * (0.45 + u * 0.9);
      s.scale.set(sc, sc, 1);
      s.material.opacity = Math.sin(u * Math.PI) * 0.85;
    });
  };
  g.userData.update(0);
  return g;
}

/** Hand-lettered label card for the showcase (upright, faces +z). */
export function nameCard(text, sub = '') {
  const c = paintCanvas(512, 160, (ctx, w, h) => {
    boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#fff8de', hatch: 'rgba(240,190,90,0.5)', r: rng(text.length * 7 + 1), cw: w, ch: h, lw: 4 });
    hand(ctx, text, w / 2, sub ? h * 0.55 : h * 0.66, { size: sub ? 62 : 74, maxW: w * 0.9, fill: INK, seed: 4 });
    if (sub) hand(ctx, sub, w / 2, h * 0.84, { size: 30, fill: '#8a6a52', seed: 8, weight: 'normal' });
  });
  const tex = toTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.06), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.03 }));
  m.layers.set(INKMOD.OVERLAY_LAYER);
  const g = new THREE.Group();
  g.add(m);
  m.position.y = 0.55;
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 5), new THREE.MeshBasicMaterial({ color: INKC })));
  g.children[1].position.set(0, 0.2, -0.03);
  return g;
}

// ---- generic animation / small builders -----------------------------------------------------
/** Collects per-frame functions (dt, t) into group.userData.animate(dt). */
export function animator(g, fns) {
  let t = 0;
  g.userData.animate = (dt = 0.016) => { t += dt; for (const f of fns) f(dt, t); };
  return g;
}
/** Sway a pivot group about z/x. */
export const swing = (obj, { az = 0.05, ax = 0.0, f = 1.4, ph = 0 } = {}) => (dt, t) => {
  obj.rotation.z = Math.sin(t * f + ph) * az; obj.rotation.x = Math.sin(t * f * 0.83 + ph + 1) * ax;
};

/** Wavy corrugated tin sheet (waves along x, extruded along z). */
export function corrugated(w, d, { waves = 10, amp = 0.06, thick = 0.05 } = {}) {
  const n = waves * 5;
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(new THREE.Vector2(-w / 2 + (w * i) / n, amp * Math.sin((i / n) * waves * Math.PI * 2) + thick));
  for (let i = n; i >= 0; i--) pts.push(new THREE.Vector2(-w / 2 + (w * i) / n, amp * Math.sin((i / n) * waves * Math.PI * 2)));
  const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts), { depth: d, bevelEnabled: false, curveSegments: 1 });
  g.translate(0, 0, -d / 2);
  return g;
}

/** Umbrella canopy with sector colours; returns nothing, adds to Mix. */
export function umbrella(p, { r = 1.8, h = 0.7, pos = [0, 3, 0], tilt = [0, 0, 0], poleH = 2.8, colors = [C.bestRed, C.cream], sectors = 12, pole = C.steelDark } = {}) {
  const geo = new THREE.ConeGeometry(r, h, sectors, 1, false);
  p.paint(geo, (x, y, z, nx, ny) => {
    const a = Math.atan2(z, x);
    const k = Math.floor(((a + Math.PI) / (Math.PI * 2)) * sectors + 0.01);
    return colors[((k % colors.length) + colors.length) % colors.length];
  }, { pos: [pos[0], pos[1] + h / 2, pos[2]], rot: tilt });
  p.ball(0.09, C.brass, { pos: [pos[0], pos[1] + h + 0.04, pos[2]], w: 6, h: 4 });
  p.cyl(0.05, 0.05, poleH, pole, { pos: [pos[0], pos[1] + h * 0.3 - poleH / 2 + poleH * 0.0, pos[2]], seg: 6 });
}

/** Bamboo pole with nodes. */
export function bamboo(p, x, z, h, { r = 0.07, color = 0xd9c67e, y0 = 0 } = {}) {
  p.cyl(r, r * 1.1, h, color, { pos: [x, y0 + h / 2, z], seg: 6 });
  for (let k = 1; k < 5; k++) p.cyl(r * 1.35, r * 1.35, 0.05, 0xb59a52, { pos: [x, y0 + (h * k) / 5, z], seg: 6, outline: false });
}

/** Seeded sticker-like illustrations for signs */
export const ell = (cx, cy, rx, ry, n = 12) => Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * rx, cy + Math.sin((i / n) * Math.PI * 2) * ry]);
