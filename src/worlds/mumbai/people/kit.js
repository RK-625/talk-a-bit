/**
 * people/kit.js: shared helpers for the Mumbai characters (caches so 20 people share geometry, materials, outlines).
 *
 *   geo(key, make)              cached geometry
 *   mat(color, opts)            cached ink material ({spacing, strength, map, mapKey, vertexColors, lightHatch})
 *   basic(color)                cached unlit sticker material
 *   mk(geometry, material, {o}) Mesh with a (shared) ink outline of thickness `o` px (0 = none)
 *   outline(mesh, thickness)    like addOutline() but the hull geometry + material are shared per (geometry, thickness)
 *   mergeColored(parts)         merge [{g, color, pos, rot, scale}] into ONE geometry with vertex colours
 *   pattern(kind, c1, c2, trim) cached pencil-fabric canvas texture (stripes / checks / Warli hem / belt)
 *   SKIN, HAIR, PASTEL          palettes
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createInkMaterial, addOutline, OVERLAY_LAYER, INK_COLOR } from '../../../engine/ink.js';
import { makeCanvas, toTexture, rng } from '../../../engine/doodle.js';

export { INK_COLOR, OVERLAY_LAYER };

// ---- palettes (pastel pencil) -----------------------------------------------
export const SKIN = [0xf6d8bd, 0xf0c6a1, 0xe4ae86, 0xd69b70, 0xc7875c, 0xad6e4a];
export const HAIR = { black: 0x2f2a3a, brown: 0x57392c, grey: 0xb8b3c0, white: 0xe9e6ee, henna: 0x9a5a3c };
export const PASTEL = {
  marigold: 0xf6c453, saffron: 0xf29b4b, terracotta: 0xe39b7b, pistachio: 0xbfe0a8, sky: 0xa9d3ea,
  pink: 0xf4b6c6, magenta: 0xe78bb2, lilac: 0xc9b7e8, mint: 0xa8e0cf, cream: 0xf6efd8, red: 0xe9776a,
  teal: 0x6cc3bd, khaki: 0xdccb90, white: 0xfbf7ea, denim: 0x8fb0d8, navy: 0x6f7fb0, butter: 0xf7e08a,
  rose: 0xf0a3a3, olive: 0xb9c47f, sand: 0xe6cfa3, steel: 0xcfd8de, wood: 0xcf9d68, brown: 0xa77a58,
};

const hex = (n) => '#' + n.toString(16).padStart(6, '0');
const R3 = (x) => Math.round(x * 1000) / 1000;
export { R3 as r3 };

// ---- caches -------------------------------------------------------------------
const GEO = new Map();
export function geo(key, make) {
  let g = GEO.get(key);
  if (!g) { g = make(); GEO.set(key, g); }
  return g;
}

const MAT = new Map();
export function mat(color, { spacing = 0.05, strength = 0.85, map = null, mapKey = '', vertexColors = false, lightHatch = 0, double = false } = {}) {
  const key = `${color}|${spacing}|${strength}|${mapKey}|${vertexColors}|${lightHatch}|${double}`;
  let m = MAT.get(key);
  if (!m) {
    m = createInkMaterial({
      color: vertexColors || map ? 0xffffff : color,
      vertexColors, hatchSpacing: spacing, hatchStrength: strength, lightHatch,
    });
    if (map) m.map = map;
    if (double) m.side = THREE.DoubleSide;
    MAT.set(key, m);
  }
  return m;
}

const BASIC = new Map();
export function basic(color, extra = {}) {
  const key = color + JSON.stringify(extra);
  let m = BASIC.get(key);
  if (!m) { m = new THREE.MeshBasicMaterial({ color, ...extra }); BASIC.set(key, m); }
  return m;
}

// ---- outlines (shared hull geometry + material) ---------------------------------
const OUT = new Map();
export function outline(mesh, thickness = 2) {
  const key = mesh.geometry.uuid + '|' + thickness;
  const hit = OUT.get(key);
  if (!hit) {
    const o = addOutline(mesh, { thickness, wobbleFreq: 2.2 });
    OUT.set(key, { geometry: o.geometry, material: o.material });
    return o;
  }
  const o = new THREE.Mesh(hit.geometry, hit.material);
  o.frustumCulled = false; o.castShadow = false; o.receiveShadow = false;
  o.name = 'ink-outline';
  o.layers.set(OVERLAY_LAYER);
  mesh.add(o);
  return o;
}

export function mk(geometry, material, { o = 2, name } = {}) {
  const m = new THREE.Mesh(geometry, material);
  m.castShadow = true; m.receiveShadow = true;
  if (name) m.name = name;
  if (o) outline(m, o);
  return m;
}

// ---- geometry merging with per-part colours ------------------------------------
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _s = new THREE.Vector3();
export function mergeColored(parts, { uv = false } = {}) {
  const list = parts.map((p) => {
    const g = p.g.clone();
    if (!uv) g.deleteAttribute('uv');
    _e.set(...(p.rot ?? [0, 0, 0]));
    _q.setFromEuler(_e);
    const sc = p.scale ?? [1, 1, 1];
    _m4.compose(_v.set(...(p.pos ?? [0, 0, 0])), _q, _s.set(...(Array.isArray(sc) ? sc : [sc, sc, sc])));
    g.applyMatrix4(_m4);
    if (!uv) {
      const c = new THREE.Color(p.color ?? 0xffffff);
      const n = g.attributes.position.count;
      const arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
      g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    }
    return g;
  });
  const merged = mergeGeometries(list, false);
  list.forEach((g) => g.dispose());
  return merged;
}

// ---- pencil fabric textures ----------------------------------------------------
const TEX = new Map();
/**
 * kind: 'plain' | 'stripes' (horizontal) | 'vstripes' | 'checks' | 'belt' (dark band at the bottom) | 'dots'
 * trim: null or a colour: Warli white triangle/zig-zag + dot hem border along the bottom edge (u wraps around).
 */
export function pattern(kind, c1, c2 = 0xffffff, trim = null, trimH = 0.2) {
  const key = `${kind}|${c1}|${c2}|${trim}|${trimH}`;
  let t = TEX.get(key);
  if (t) return t;
  const S = 128;
  const { c, ctx } = makeCanvas(S, S);
  const r = rng(c1 % 9973 + 7);
  ctx.fillStyle = hex(c1); ctx.fillRect(0, 0, S, S);
  if (kind === 'stripes') {
    ctx.fillStyle = hex(c2);
    for (let y = 8; y < S; y += 32) ctx.fillRect(0, y + (r() - 0.5) * 2, S, 14);
  } else if (kind === 'vstripes') {
    ctx.fillStyle = hex(c2);
    for (let x = 0; x < S; x += 16) ctx.fillRect(x + (r() - 0.5) * 2, 0, 6, S);
  } else if (kind === 'checks') {
    ctx.strokeStyle = hex(c2); ctx.lineWidth = 5; ctx.globalAlpha = 0.85;
    for (let i = 0; i <= S; i += 21) {
      ctx.beginPath(); ctx.moveTo(i + (r() - 0.5) * 2, 0); ctx.lineTo(i + (r() - 0.5) * 2, S); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i + (r() - 0.5) * 2); ctx.lineTo(S, i + (r() - 0.5) * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else if (kind === 'belt') {
    ctx.fillStyle = hex(c2); ctx.fillRect(0, S * 0.84, S, S * 0.16);
    ctx.fillStyle = '#d9b44a'; ctx.fillRect(S * 0.46, S * 0.84, S * 0.1, S * 0.16);
  } else if (kind === 'dots') {
    ctx.fillStyle = hex(c2);
    for (let y = 10; y < S; y += 22) for (let x = (y / 22) % 2 ? 6 : 17; x < S; x += 22) { ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fill(); }
  }
  if (trim !== null) {
    const y0 = S * (1 - trimH);
    ctx.fillStyle = hex(trim); ctx.strokeStyle = hex(trim); ctx.lineWidth = 4;
    // Warli: a row of triangles on a line, dots between
    ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(S, y0); ctx.stroke();
    const n = 8, w = S / n, h = S * trimH * 0.62;
    for (let i = 0; i < n; i++) {
      const x = i * w;
      ctx.beginPath(); ctx.moveTo(x + 2, S - 3); ctx.lineTo(x + w / 2, S - 3 - h); ctx.lineTo(x + w - 2, S - 3); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(x + w / 2, y0 + 6, 2.4, 0, 7); ctx.fill();
    }
  }
  t = toTexture(c);
  t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
  TEX.set(key, t);
  return t;
}

/** Cloth/pencil material using a pattern texture. */
export function cloth(kind, c1, c2 = 0xffffff, trim = null, opts = {}) {
  const tex = pattern(kind, c1, c2, trim, opts.trimH);
  return mat(c1, { spacing: opts.spacing ?? 0.045, strength: opts.strength ?? 0.8, map: tex, mapKey: `${kind}|${c1}|${c2}|${trim}|${opts.trimH ?? 0.2}`, double: !!opts.double });
}

export const cyl = (rt, rb, h, seg = 8, hs = 1, open = false) =>
  geo(`cyl|${R3(rt)}|${R3(rb)}|${R3(h)}|${seg}|${hs}|${open}`, () => new THREE.CylinderGeometry(rt, rb, h, seg, hs, open));
export const sph = (r, ws = 14, hs = 10) => geo(`sph|${R3(r)}|${ws}|${hs}`, () => new THREE.SphereGeometry(r, ws, hs));
