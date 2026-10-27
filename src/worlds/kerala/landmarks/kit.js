/**
 * landmarks/kit.js: shared building kit for the Mumbai landmarks.
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
import { INK, makeCanvas, drawText, rng as handRng, wobblyLine, drawShape } from '../../../engine/doodle.js';
import { TA_FONT, loadTamilFont, onTamilReady, tamilReady } from '../malayalam.js';

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
  // Kochi
  laterite: 0xc9825a, lateriteDark: 0xa9663f, ochre: 0xe6b95c, ochreWall: 0xedd08a, kTile: 0xa94a35, kTileDark: 0x853a2b, kTileLight: 0xc0623f,
  copper: 0xc0794a, copperGreen: 0x7fb59a, brass: 0xe0b341, timber: 0x9a7b59, timberDark: 0x6e5238, bamboo: 0xd9c67e, netCol: 0x4b5a5a,
  kochiBlue: 0x2f5f9b, metroTeal: 0x2fa7a0, thatch: 0xcdb26b, thatchDark: 0xa98c4a, kathGreen: 0x6fb36a,
  // Chennai (legacy names kept so older kits keep working)
  chRed: 0xc8483a, chRedDark: 0xa23a30, chRedLight: 0xdc6b57, madrasWhite: 0xfbf8ee, chalk: 0xf3efe2, tile: 0xcf6a48, tileDark: 0xa9503a,
  gopuramA: 0xe8a23c, gopuramB: 0x4fa6a0, gopuramC: 0xd9604d, gopuramD: 0x6c8fd0, gopuramE: 0xf0d36a, templeStripe: 0xd9503f,
  tnGreen: 0x3f9b6a, tnYellow: 0xf6c62d, mtcMaroon: 0x8e2f3a, mtcBlue: 0x3f7ca8, roof: 0xb9826a,
};

// ---- materials (shared across all landmarks; keyed by hatch spacing) -------------------------------------------
const matCache = new Map();
function inkMat(inkApi, hatch) {
  const key = hatch;
  if (!matCache.has(key)) matCache.set(key, inkApi.createInkMaterial({ vertexColors: true, hatchSpacing: hatch }));
  return matCache.get(key);
}
const planeMatCache = new WeakMap();
const netMatCache = new WeakMap();
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

/** Hip roof geometry: eaves rectangle w x d at y=0, ridge at y=h (ridge length w - inset*2, along X). Flat-shaded faces. */
export function hipGeo(w, d, h, inset = null) {
  const ins = inset ?? Math.min(d * 0.5, w * 0.35);
  const E = [[-w / 2, 0, d / 2], [w / 2, 0, d / 2], [w / 2, 0, -d / 2], [-w / 2, 0, -d / 2]];
  const R0 = [-w / 2 + ins, h, 0], R1 = [w / 2 - ins, h, 0];
  const t = [E[0], E[1], R1, E[0], R1, R0,       // front slope
    E[2], E[3], R0, E[2], R0, R1,                 // back slope
    E[1], E[2], R1,                               // right hip
    E[3], E[0], R0];                              // left hip
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(t.flat(), 3));
  g.computeVertexNormals();
  return g;
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
// ---- Tamil lettering: see ../tamil.js ("Baloo Thambi 2", repaint when it loads) ---------------------------------------
export { TA_FONT, loadTamilFont };
/** A canvas painted by fn(ctx, W, H, r) that is repainted once the Tamil font is ready (falls back gracefully before that). */
export function paintLive(W, H, fn, seed = 3) {
  const { c, ctx } = makeCanvas(W, H);
  const paint = () => { ctx.clearRect(0, 0, W, H); fn(ctx, W, H, handRng(seed)); };
  paint();
  if (!tamilReady()) onTamilReady(() => { paint(); const m = planeMatCache.get(c); if (m?.map) m.map.needsUpdate = true; });
  return c;
}
/** Hand-lettered whole-string text (safe for Devanagari conjuncts); two nudged ballpoint passes. */
export function inkText(ctx, text, x, y, size, { color = INK, align = 'center', devanagari = false, tamil = false, r = handRng(5), tilt = 0.012, maxW = 0 } = {}) {
  const font = tamil ? TA_FONT : devanagari
    ? `'Kohinoor Devanagari','Devanagari Sangam MN','Noto Sans Devanagari','Mukta','Nirmala UI',sans-serif`
    : `'Marker Felt','Bradley Hand','Segoe Print','Comic Sans MS',cursive`;
  if (tamil) loadTamilFont();
  ctx.save();
  if (maxW) { ctx.font = `bold ${size}px ${font}`; const mw = ctx.measureText(text).width; if (mw > maxW) size *= maxW / mw; }
  ctx.font = `bold ${size}px ${font}`;
  ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = color;
  ctx.translate(x, y); ctx.rotate((r() - 0.5) * tilt * 2);
  ctx.fillText(text, 0, 0);
  ctx.globalAlpha = 0.5; ctx.fillText(text, 0.8, 0.6);
  ctx.restore();
}
/** Tamil lettering (see TA_FONT). */
export function taText(ctx, text, x, y, size, opts = {}) { inkText(ctx, text, x, y, size, { ...opts, tamil: true }); }
/** A two-line board: Tamil on top (big), English below. opts: fill, hatch, tc, ec, sub */
export function bilingualBoard(w, h, ta, en, { fill = '#f6efd8', hatch = '#e0cf9a', tc = '#7a2f2f', ec = '#2b2440', sub = null, seed = 7, px = 90, taSize = 0.5, enSize = 0.2 } = {}) {
  return paintBoard(w, h, fill, hatch, (ctx, W, H) => {
    taText(ctx, ta, W / 2, H * (sub ? 0.5 : 0.58), H * taSize, { color: tc, maxW: W * 0.9 });
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
  /** hip roof (tiles) with eaves rectangle w x d sitting on y0 */
  hip(color, w, d, h, x = 0, y0 = 0, z = 0, o = {}) {
    return this.add(hipGeo(w, d, h, o.inset), color, { pos: [x, y0, z], rot: [o.rx ?? 0, o.ry ?? 0, o.rz ?? 0], outline: o.outline ?? true });
  }
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
  /** a thin rod (cylinder) between two points a=[x,y,z] and b: ropes, poles, braces. No ink hull by default. */
  rod(color, a, b, r = 0.04, o = {}) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), dv = B.clone().sub(A);
    const len = dv.length();
    if (len < 1e-4) return this;
    const g = new THREE.CylinderGeometry(o.r2 ?? r, r, len, o.seg ?? 5, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dv.normalize());
    g.applyMatrix4(new THREE.Matrix4().compose(A.clone().add(B).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1)));
    return this.add(g, color, { outline: o.outline ?? false });
  }
  /** a custom painted (double-sided) mesh sharing the overlay material: nets, sails */
  paintedMesh(canvas, geometry) {
    let m = netMatCache.get(canvas);
    if (!m) { m = planeMaterial(canvas).clone(); m.side = THREE.DoubleSide; m.map = planeMaterial(canvas).map; netMatCache.set(canvas, m); }
    const mesh = new THREE.Mesh(geometry, m);
    mesh.layers.set(OVERLAY);
    this.planes.push(mesh);
    return mesh;
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

/** A Kathakali face (green pacha make-up, white chutti frame, tall gold crown + halo, red ruff). s = face half-width in px. Invented stylisation. */
export function drawKathakali(ctx, cx, cy, s, { crown = true } = {}) {
  const ink = INK;
  ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = ink; ctx.lineWidth = Math.max(2, s * 0.05);
  const ell = (x, y, rx, ry, fill) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.stroke(); };
  if (crown) {
    // halo: concentric rings behind the head
    const hy = cy - s * 0.7;
    [['#c9302c', 2.15], ['#f6edd2', 1.95], ['#2f8a56', 1.72], ['#e0b341', 1.5], ['#c9302c', 1.3], ['#f6edd2', 1.12]].forEach(([c, r]) => ell(cx, hy, s * r, s * r * 1.02, c));
    // tiered crown
    const tiers = [['#e0b341', 1.0, 0.85], ['#c9302c', 0.84, 0.74], ['#2f8a56', 0.7, 0.62], ['#e0b341', 0.58, 0.52], ['#c9302c', 0.46, 0.4]];
    let y = cy - s * 1.1;
    for (const [c, wb, wt] of tiers) {
      const h = s * 0.42;
      ctx.beginPath(); ctx.moveTo(cx - s * wb * 0.55, y); ctx.lineTo(cx + s * wb * 0.55, y); ctx.lineTo(cx + s * wt * 0.5, y - h); ctx.lineTo(cx - s * wt * 0.5, y - h); ctx.closePath();
      ctx.fillStyle = c; ctx.fill(); ctx.stroke(); y -= h;
    }
    ctx.beginPath(); ctx.moveTo(cx - s * 0.12, y); ctx.lineTo(cx, y - s * 0.45); ctx.lineTo(cx + s * 0.12, y); ctx.closePath(); ctx.fillStyle = '#e0b341'; ctx.fill(); ctx.stroke();
  }
  // red wool ruff + chest
  ell(cx, cy + s * 1.25, s * 1.25, s * 0.55, '#c9302c');
  // white chutti: a scalloped white frame round the green face
  for (let i = 0; i < 22; i++) { const a = (i / 22) * 6.283; ell(cx + Math.cos(a) * s * 1.14, cy + 0.04 * s + Math.sin(a) * s * 1.24, s * 0.2, s * 0.2, '#fbf7ea'); }
  ell(cx, cy + 0.04 * s, s * 1.1, s * 1.2, '#fbf7ea');
  ell(cx, cy + 0.06 * s, s * 0.9, s * 1.02, '#4f9f60');
  // eyes: black brows + almond eyes with red
  for (const sx of [-1, 1]) {
    ctx.beginPath(); ctx.moveTo(cx + sx * s * 0.12, cy - s * 0.3); ctx.quadraticCurveTo(cx + sx * s * 0.45, cy - s * 0.62, cx + sx * s * 0.8, cy - s * 0.3); ctx.lineWidth = s * 0.12; ctx.stroke(); ctx.lineWidth = Math.max(2, s * 0.05);
    ctx.beginPath(); ctx.moveTo(cx + sx * s * 0.12, cy - s * 0.12); ctx.quadraticCurveTo(cx + sx * s * 0.45, cy - s * 0.38, cx + sx * s * 0.78, cy - s * 0.12); ctx.quadraticCurveTo(cx + sx * s * 0.45, cy + s * 0.08, cx + sx * s * 0.12, cy - s * 0.12); ctx.fillStyle = '#fbf7ea'; ctx.fill(); ctx.stroke();
    ell(cx + sx * s * 0.45, cy - s * 0.17, s * 0.13, s * 0.13, '#c9302c');
  }
  // white nose ball + forehead ball, red lips
  ell(cx, cy + s * 0.28, s * 0.16, s * 0.16, '#fbf7ea'); ell(cx, cy - s * 0.52, s * 0.11, s * 0.11, '#fbf7ea');
  ctx.beginPath(); ctx.moveTo(cx - s * 0.36, cy + s * 0.62); ctx.quadraticCurveTo(cx, cy + s * 0.46, cx + s * 0.36, cy + s * 0.62); ctx.quadraticCurveTo(cx, cy + s * 0.88, cx - s * 0.36, cy + s * 0.62); ctx.fillStyle = '#c9302c'; ctx.fill(); ctx.stroke();
  ctx.restore();
}
let kathCache = null;
/** Square canvas with a Kathakali face; cached */
export function kathakaliCanvas(px = 256) {
  if (kathCache && kathCache.width === px) return kathCache;
  const { c, ctx } = makeCanvas(px, px);
  drawKathakali(ctx, px / 2, px * 0.52, px * 0.2);
  return (kathCache = c);
}

/** A painted clock face (white dial, ink ring, ticks, two hands). Cached by key. */
const clockCache = new Map();
export function clockFace(hour = 10, min = 10, { dial = '#fbf7e8', ring = '#2b2440', px = 128 } = {}) {
  const key = `${hour}:${min}:${dial}:${px}`;
  if (clockCache.has(key)) return clockCache.get(key);
  const { c, ctx } = makeCanvas(px, px);
  const r = handRng(17), cx = px / 2, cy = px / 2, R0 = px * 0.46;
  ctx.fillStyle = dial; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 6.283); ctx.fill();
  wobblyLine(ctx, Array.from({ length: 20 }, (_, i) => [cx + Math.cos((i / 20) * 6.283) * R0, cy + Math.sin((i / 20) * 6.283) * R0]), { r, amp: 1.2, lw: px / 22, closed: true });
  ctx.strokeStyle = ring; ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.283, l = i % 3 === 0 ? 0.2 : 0.1;
    ctx.lineWidth = i % 3 === 0 ? px / 28 : px / 48;
    ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * R0 * (0.92 - l), cy - Math.cos(a) * R0 * (0.92 - l)); ctx.lineTo(cx + Math.sin(a) * R0 * 0.9, cy - Math.cos(a) * R0 * 0.9); ctx.stroke();
  }
  const hand = (ang, len, w) => { ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(ang) * R0 * len, cy - Math.cos(ang) * R0 * len); ctx.stroke(); };
  hand(((hour % 12) + min / 60) / 12 * 6.283, 0.5, px / 18); hand(min / 60 * 6.283, 0.78, px / 30);
  clockCache.set(key, c);
  return c;
}
