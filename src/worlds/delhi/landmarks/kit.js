/**
 * landmarks/kit.js: shared building kit for the Hyderabad landmarks.
 *
 * Everything static in a landmark is collected into ONE vertex-coloured geometry (Parts) so a landmark costs
 * ~2 draw calls (mesh + ink hull) plus a handful of painted Canvas planes (signs, clock faces, posters).
 *
 * class Kit(ink, { hatch=0.16, thickness=2.4, seed=1 })
 *   .box(color, w,h,d, x,y0,z, {ry,rx,rz,outline})        y0 = bottom of the box
 *   .cyl(color, rTop, rBot, h, x,y0,z, {seg,outline})
 *   .cone(color, r, h, x,y0,z, {seg}) .dome(color, r, x,y0,z, {sy,seg,ring})  hemisphere on y0
 *   .ball(color, r, x,y,z, {sx,sy,sz,seg})  .lathe(color, [[r,y]...], x,y0,z, {seg})
 *   .extrude(color, shape, depth, x,y0,z, {ry})   shape in XY, extruded centred on z
 *   .flat(color, shape, x,y,z, {ry})              flat painted-on shape (no ink hull): windows, panels
 *   .base(w, d, {color, step})                    foundation plinth reaching below y=0 so it sits on the curved planet
 *   .face(ox,oy,oz, ry) -> Face   local frame on a wall (u right, v up, n outward) with .window/.box/.flat/.plane
 *   .plane(canvas, w,h, [x,y,z], ry)              unlit painted plane (Canvas 2D), on the overlay layer
 *   .finish({ lean }) -> THREE.Group              builds mesh + outline, adds painted planes
 * Shapes: archShape(w,h,pointed), rectShape(w,h), ringArch(...)
 * Painting: paintBoard(), inkText(), latin(), PAL
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as engineInk from '../../../engine/ink.js';
import { Parts, mulberry32 } from '../../../engine/scatter.js';
import { DV_FONT, KN_FONT, TE_SYS, isDevanagari, isTelugu, loadDevanagariFont, onDevanagariReady, devanagariReady } from '../devanagari.js';
import { INK, makeCanvas, drawText, rng as handRng, wobblyLine, drawShape } from '../../../engine/doodle.js';

export { mulberry32, handRng, makeCanvas, drawText, wobblyLine, drawShape, INK };
export const OVERLAY = engineInk.OVERLAY_LAYER;

export const PAL = {
  basalt: 0xe9c677, basaltLight: 0xf3dea4, basaltDark: 0xc9a259,
  sandstone: 0xeed6a2, cream: 0xf6ecd2, white: 0xfaf6ea, offwhite: 0xf1ebdb,
  peachWall: 0xf0d4b0, terracotta: 0xd9795a, domeRed: 0xd4604a, brick: 0xb85a42,
  glass: 0x6f93ad, glassDark: 0x4a6a85, glassWarm: 0x8aa7a4,
  stone: 0xcfc6bb, stoneDark: 0xb3a999, plinth: 0xbfb4a0, concrete: 0xd9d4ca,
  wood: 0xb98c64, woodDark: 0x8a5e3e, green: 0x8fcf84, leaf: 0x7fc08a, ink: engineInk.INK_COLOR,
  pistachio: 0xc8dfb2, pink: 0xf2bccb, sky: 0xb2d5ec, butter: 0xf6e29a, marigold: 0xf5a742,
  red: 0xd9503f, teal: 0x7ec4bd, lavender: 0xcabfe8, peach: 0xf8c9a6, mint: 0xb8e4cf,
  gold: 0xe8b84a, water: 0xa6d4e6, asphalt: 0xc8c3d2, slate: 0x9db8b0, rose: 0xe9a1b4,
  // Hyderabad
  granite: 0xbfaea6, graniteLight: 0xd8cbc2, graniteDark: 0x9c8b84, laterite: 0xc9705a, tile: 0xd0694a, tileDark: 0xa9503a,
  metro: 0x8f4fb3, metroLight: 0xc8a4e0, kaRed: 0xd9372c, kaYellow: 0xf6c62d, pompeii: 0xc4504a, ivory: 0xf7f0dc,
  // Hyderabad (from the reference photos): Charminar limestone, white Italianate / Indo-Saracenic, Deccan granite, Hyderabad Metro
  lime: 0xeadfc2, limeLight: 0xf6eed8, limeDark: 0xc9bb99, palaceWhite: 0xf3f1ea, palaceBlue: 0xcfd6dc, deccan: 0xc7b8a2, deccanDark: 0xa39580,
  maroon: 0x8a3a34, teal2: 0x4fb3a8, sandy: 0xe3c58f, hyMetro: 0x2f7fb0, hyMetroGreen: 0x4fae6a, pearl: 0xf4eee6, pearlPink: 0xf1d9d6,
};

// ---- materials (shared across all landmarks; keyed by hatch spacing) -------------------------------------------
const matCache = new Map();
function inkMat(inkApi, hatch) {
  const key = hatch;
  if (!matCache.has(key)) matCache.set(key, inkApi.createInkMaterial({ vertexColors: true, hatchSpacing: hatch }));
  return matCache.get(key);
}
const planeMatCache = new WeakMap();
function planeMaterial(canvas) {
  let m = planeMatCache.get(canvas);
  if (!m) {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.05, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    planeMatCache.set(canvas, m);
  }
  return m;
}

// ---- shapes ----------------------------------------------------------------------------------------------------
export function rectShape(w, h) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.closePath();
  return s;
}
/** Window / door opening: base at y=0, centred on x. pointed = gothic arch, otherwise round arch (rounded: h includes arch). */
export function archShape(w, h, pointed = false) {
  const s = new THREE.Shape();
  const hs = Math.max(0.01, h - w * (pointed ? 0.62 : 0.5));
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, hs);
  if (pointed) {
    s.quadraticCurveTo(w / 2, hs + (h - hs) * 0.7, 0, h);
    s.quadraticCurveTo(-w / 2, hs + (h - hs) * 0.7, -w / 2, hs);
  } else {
    s.absarc(0, hs, w / 2, 0, Math.PI, false);
  }
  s.closePath();
  return s;
}
/** Polygon from [[x,y]...]. */
export function polyShape(pts) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  s.closePath();
  return s;
}
/** A U-shaped arched ring (door surround): outer half-width ro, inner ri, springing at y=hs, base at y=0. */
export function ringArch(ri, ro, hs, pointed = false) {
  const s = new THREE.Shape();
  const k = pointed ? 1.35 : 1;
  const arc = (r, rev) => {
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const a = (i / 12) * Math.PI; // right to left
      pts.push([Math.cos(a) * r, hs + Math.sin(a) * r * k]);
    }
    return rev ? pts.reverse() : pts;
  };
  s.moveTo(ro, 0);
  arc(ro, false).forEach(([x, y]) => s.lineTo(x, y));
  s.lineTo(-ro, 0); s.lineTo(-ri, 0);
  arc(ri, true).forEach(([x, y]) => s.lineTo(x, y));
  s.lineTo(ri, 0); s.closePath();
  return s;
}

/** Points around a rectangle (n per edge) so wobblyPath hugs the edges instead of cutting the corners into an oval. */
export function rectPts(x0, y0, x1, y1, n = 5) {
  const p = [];
  for (let i = 0; i < n; i++) p.push([x0 + ((x1 - x0) * i) / n, y0]);
  for (let i = 0; i < n; i++) p.push([x1, y0 + ((y1 - y0) * i) / n]);
  for (let i = 0; i < n; i++) p.push([x1 - ((x1 - x0) * i) / n, y1]);
  for (let i = 0; i < n; i++) p.push([x0, y1 - ((y1 - y0) * i) / n]);
  return p;
}

// ---- painted helpers ---------------------------------------------------------------------------------------------
// ---- Devanagari lettering: see ../devanagari.js ("Tiro Devanagari Hindi", repaint when it loads; Telugu/Kannada = legacy system fonts) ---------------------------------------
export { DV_FONT, KN_FONT, loadDevanagariFont };
/** A canvas painted by fn(ctx, W, H, r) that is repainted once the Devanagari font is ready (falls back gracefully before that). */
export function paintLive(W, H, fn, seed = 3) {
  const { c, ctx } = makeCanvas(W, H);
  const paint = () => { ctx.clearRect(0, 0, W, H); fn(ctx, W, H, handRng(seed)); };
  paint();
  if (!devanagariReady()) onDevanagariReady(() => { paint(); const m = planeMatCache.get(c); if (m?.map) m.map.needsUpdate = true; });
  return c;
}
/** Hand-lettered whole-string text (safe for Devanagari conjuncts); two nudged ballpoint passes. */
export function inkText(ctx, text, x, y, size, { color = INK, align = 'center', devanagari = false, kannada = false, telugu = false, r = handRng(5), tilt = 0.012 } = {}) {
  const oldTe = isTelugu(text); // legacy Hyderabad signs (system font)
  const dv = devanagari || isDevanagari(text);
  const font = oldTe ? TE_SYS : dv ? DV_FONT : kannada
    ? KN_FONT
    : `'Marker Felt','Bradley Hand','Segoe Print','Comic Sans MS',cursive`;
  if (dv) loadDevanagariFont();
  ctx.save();
  ctx.font = `bold ${size}px ${font}`;
  ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = color;
  ctx.translate(x, y); ctx.rotate((r() - 0.5) * tilt * 2);
  ctx.fillText(text, 0, 0);
  ctx.globalAlpha = 0.5; ctx.fillText(text, 0.8, 0.6);
  ctx.restore();
}
/** Hindi lettering (Devanagari, see DV_FONT). */
export function teText(ctx, text, x, y, size, opts = {}) { inkText(ctx, text, x, y, size, { ...opts, devanagari: true }); }
/** Legacy Kannada lettering (system fonts; Telugu text passed here is detected and uses TE_FONT). */
export function knText(ctx, text, x, y, size, opts = {}) { inkText(ctx, text, x, y, size, { ...opts, kannada: true }); }
/** A two-line board: Telugu on top (big), English below (Telugu script is detected by inkText and uses TE_FONT). */
export function teBoard(w, h, te, en, o = {}) { return bilingualBoard(w, h, te, en, o); }
/** (legacy name) A two-line board: Kannada on top (big), English below. opts: fill, hatch, kc, ec, sub */
export function bilingualBoard(w, h, kn, en, { fill = '#f6efd8', hatch = '#e0cf9a', kc = '#7a2f2f', ec = '#2b2440', sub = null, seed = 7, px = 90, knSize = 0.5, enSize = 0.2 } = {}) {
  return paintBoard(w, h, fill, hatch, (ctx, W, H) => {
    knText(ctx, kn, W / 2, H * (sub ? 0.5 : 0.58), H * knSize, { color: kc });
    latin(ctx, en, W / 2, H * (sub ? 0.76 : 0.9), H * enSize, { color: ec });
    if (sub) latin(ctx, sub, W / 2, H * 0.93, H * 0.13, { color: ec });
  }, { seed, px });
}
/** English lettering with per-glyph jitter. */
export function latin(ctx, text, x, y, size, opts = {}) {
  drawText(ctx, text, x, y, { size, r: handRng(11 + text.length), ...opts });
}
/** A pencil-filled board with a double ink border; returns the canvas. */
export function paintBoard(w, h, fill, hatch, painter, { border = true, px = 96, seed = 3, transparent = false } = {}) {
  const W = Math.max(8, Math.round(w * px)), H = Math.max(8, Math.round(h * px));
  return paintLive(W, H, (ctx, W_, H_, r) => {
    if (!transparent) drawShape(ctx, rectPts(6, 6, W - 6, H - 6, Math.max(3, Math.round(W / 60))), { fill, hatch, w: W, h: H, r, amp: 2, lw: border ? 4 : 0.01 });
    painter?.(ctx, W, H, r);
  }, seed);
}

// ---- Kit ---------------------------------------------------------------------------------------------------------
const Y_AXIS = new THREE.Vector3(0, 1, 0);

export class Kit {
  constructor(inkApi, { hatch = 0.16, thickness = 2.4, seed = 1 } = {}) {
    this.ink = inkApi && inkApi.createInkMaterial ? inkApi : engineInk;
    this.parts = new Parts();
    this.hatch = hatch;
    this.thickness = thickness;
    this.r = mulberry32(seed * 7919 + 13);
    this.planes = [];
    this.group = new THREE.Group();
  }
  add(geo, color, o = {}) { this.parts.add(geo, color, o); return this; }
  _o(x, y, z, o, dy = 0) {
    return { pos: [x, y + dy, z], rot: [o.rx ?? 0, o.ry ?? 0, o.rz ?? 0], scale: o.scale, outline: o.outline ?? true };
  }
  box(color, w, h, d, x = 0, y = 0, z = 0, o = {}) {
    return this.add(new THREE.BoxGeometry(w, h, d), color, this._o(x, y, z, o, h / 2));
  }
  cyl(color, rt, rb, h, x = 0, y = 0, z = 0, o = {}) {
    return this.add(new THREE.CylinderGeometry(rt, rb, h, o.seg ?? 10, 1), color, this._o(x, y, z, o, h / 2));
  }
  cone(color, r, h, x = 0, y = 0, z = 0, o = {}) {
    return this.add(new THREE.ConeGeometry(r, h, o.seg ?? 10, 1), color, this._o(x, y, z, o, h / 2));
  }
  ball(color, r, x = 0, y = 0, z = 0, o = {}) {
    const oo = this._o(x, y, z, o);
    oo.scale = [o.sx ?? 1, o.sy ?? 1, o.sz ?? 1];
    return this.add(new THREE.SphereGeometry(r, o.seg ?? 10, o.ring ?? 7), color, oo);
  }
  dome(color, r, x = 0, y = 0, z = 0, o = {}) {
    const oo = this._o(x, y, z, o);
    oo.scale = [1, o.sy ?? 1, 1];
    return this.add(new THREE.SphereGeometry(r, o.seg ?? 12, o.ring ?? 6, 0, Math.PI * 2, 0, Math.PI / 2), color, oo);
  }
  /** flat horizontal disc facing up (water, paving) */
  disc(color, r, x = 0, y = 0, z = 0, o = {}) {
    return this.add(new THREE.CircleGeometry(r, o.seg ?? 16).rotateX(-Math.PI / 2), color, this._o(x, y, z, { ...o, outline: false }));
  }
  lathe(color, prof, x = 0, y = 0, z = 0, o = {}) {
    const pts = prof.map(([r, yy]) => new THREE.Vector2(r, yy));
    return this.add(new THREE.LatheGeometry(pts, o.seg ?? 14), color, this._o(x, y, z, o));
  }
  extrude(color, shape, depth, x = 0, y = 0, z = 0, o = {}) {
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: o.curve ?? 8 });
    g.translate(0, 0, -depth / 2);
    return this.add(g, color, this._o(x, y, z, o));
  }
  flat(color, shape, x = 0, y = 0, z = 0, o = {}) {
    return this.add(new THREE.ShapeGeometry(shape, o.curve ?? 6), color, this._o(x, y, z, { ...o, outline: false }));
  }
  /** foundation under a footprint w x d; reaches deep enough that the curved planet (R=75) never shows a gap */
  base(w, d, { color = PAL.plinth, step = true, top = 0.05, h = null, y0 = 0 } = {}) {
    const drop = (Math.hypot(w / 2, d / 2) ** 2) / 150;
    const depth = h ?? 0.8 + drop;
    this.box(color, w, depth + top, d, 0, y0 - depth, 0);
    if (step) this.box(PAL.stoneDark, w + 0.5, 0.16, d + 0.5, 0, y0 - 0.1, 0, { outline: true });
    return this;
  }
  face(ox, oy, oz, ry = 0) { return new Face(this, ox, oy, oz, ry); }
  plane(canvas, w, h, pos, ry = 0, rx = 0) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), planeMaterial(canvas));
    m.position.set(...pos);
    m.rotation.set(rx, ry, 0);
    m.layers.set(OVERLAY);
    this.planes.push(m);
    return m;
  }
  /** several faces sharing one canvas -> one draw call. faces = [{w,h,pos,ry}] */
  planes_(canvas, faces) {
    const gs = faces.map(({ w, h, pos, ry = 0 }) => {
      const g = new THREE.PlaneGeometry(w, h);
      g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(...pos), new THREE.Quaternion().setFromAxisAngle(Y_AXIS, ry), new THREE.Vector3(1, 1, 1)));
      return g;
    });
    const m = new THREE.Mesh(mergeGeometries(gs), planeMaterial(canvas));
    m.layers.set(OVERLAY);
    this.planes.push(m);
    return m;
  }
  /** Builds the merged mesh + ink hull and returns the group. */
  finish({ lean = 0.008, shadow = true } = {}) {
    const { geometry, hull } = this.parts.build();
    const mesh = new THREE.Mesh(geometry, inkMat(this.ink, this.hatch));
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    this.ink.addOutline(mesh, { thickness: this.thickness, geometry: hull, wobbleFreq: 1.2 });
    this.group.add(mesh);
    for (const p of this.planes) this.group.add(p);
    this.mesh = mesh;
    if (lean) { // hand-drawn lean: whole building a hair off vertical
      const r = this.r;
      mesh.rotation.z = (r() - 0.5) * 2 * lean;
      mesh.rotation.x = (r() - 0.5) * lean;
      for (const p of this.planes) { if (!p.rotation.x) p.rotation.z = mesh.rotation.z; }
    }
    return this.group;
  }
}

/** A frame on a wall: origin (ox,oy,oz) is the wall's base centre, ry turns +Z toward the wall's outward normal. */
export class Face {
  constructor(kit, ox, oy, oz, ry) {
    this.k = kit; this.o = [ox, oy, oz]; this.ry = ry;
    this.cos = Math.cos(ry); this.sin = Math.sin(ry);
  }
  pos(u, v, n = 0) { // right = (cos,0,-sin), normal = (sin,0,cos)
    return [this.o[0] + this.cos * u + this.sin * n, this.o[1] + v, this.o[2] - this.sin * u + this.cos * n];
  }
  box(color, u, v0, w, h, d, n0 = 0, o = {}) {
    const p = this.pos(u, v0, n0 + d / 2);
    return this.k.box(color, w, h, d, p[0], p[1], p[2], { ry: this.ry, ...o });
  }
  cyl(color, u, v0, r, h, n = 0, o = {}) {
    const p = this.pos(u, v0, n);
    return this.k.cyl(color, r, r, h, p[0], p[1], p[2], o);
  }
  flat(color, shape, u, v, n = 0.03) {
    const p = this.pos(u, v, n);
    return this.k.flat(color, shape, p[0], p[1], p[2], { ry: this.ry });
  }
  /** an opening: frame + dark glass, optionally pointed, with a little irregularity */
  window(u, v0, w, h, { pointed = false, rect = false, glass = PAL.glassDark, frame = PAL.cream, n = 0.02, jitter = 0.04, bars = 0, sill = true } = {}) {
    const r = this.k.r;
    const j = () => (r() - 0.5) * 2 * jitter;
    u += j(); v0 += j() * 0.7; w *= 1 + j(); h *= 1 + j();
    const shp = (ww, hh) => (rect ? rectShape(ww, hh) : archShape(ww, hh, pointed));
    this.flat(frame, shp(w + 0.16, h + 0.12), u, v0 - 0.05, n);
    this.flat(glass, shp(w, h), u, v0, n + 0.02);
    if (bars) { // cross bars
      this.flat(frame, rectShape(0.05, h * 0.82), u, v0, n + 0.04);
      this.flat(frame, rectShape(w * 0.92, 0.05), u, v0 + h * 0.4, n + 0.04);
    }
    if (sill) this.box(frame, u, v0 - 0.12, w + 0.28, 0.1, 0.16, n);
  }
  plane(canvas, w, h, u, v, n = 0.06) {
    const p = this.pos(u, v, n);
    return this.k.plane(canvas, w, h, p, this.ry);
  }
}

/** Soft glow sprite texture (shared). */
let glowTex = null;
export function glowSprite(color = '255,222,140', size = 2.4) {
  if (!glowTex) glowTex = {};
  if (!glowTex[color]) {
    const { c, ctx } = makeCanvas(64, 64);
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, `rgba(${color},0.95)`); g.addColorStop(0.3, `rgba(${color},0.45)`); g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    glowTex[color] = new THREE.SpriteMaterial({ map: t, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
  }
  const s = new THREE.Sprite(glowTex[color]);
  s.scale.set(size, size, 1);
  s.layers.set(OVERLAY);
  return s;
}

/** Circles along a straight segment for colliders. */
export function lineColliders(x0, z0, x1, z1, radius, height, spacing = radius * 1.6) {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(1, Math.ceil(len / spacing));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    out.push({ x: x0 + (x1 - x0) * t, z: z0 + (z1 - z0) * t, radius, height });
  }
  return out;
}
