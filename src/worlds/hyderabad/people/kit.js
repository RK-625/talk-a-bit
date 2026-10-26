/**
 * people/kit.js: shared helpers for the Hyderabad characters (caches so 20 people share geometry, materials, outlines).
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
import { createInkMaterial, addOutline, OVERLAY_LAYER, INK_COLOR, inkUniforms } from '../../../engine/ink.js';
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
const FLOWERS = [[20, 22], [84, 22], [52, 62], [116, 62], [20, 102], [84, 102]];
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
  } else if (kind === 'floral') {
    ctx.fillStyle = hex(c2);
    for (const [x, y] of FLOWERS) for (let p = 0; p < 5; p++) { const a = p * 1.2566; ctx.beginPath(); ctx.arc(x + Math.cos(a) * 5, y + Math.sin(a) * 5, 3.6, 0, 7); ctx.fill(); }
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
  const m = mat(c1, { spacing: opts.spacing ?? 0.045, strength: opts.strength ?? 0.8, map: tex, mapKey: `${kind}|${c1}|${c2}|${trim}|${opts.trimH ?? 0.2}`, double: !!opts.double });
  m.userData.cloth = { kind, c1, c2, trim };
  return m;
}

export const cyl = (rt, rb, h, seg = 8, hs = 1, open = false) =>
  geo(`cyl|${R3(rt)}|${R3(rb)}|${R3(h)}|${seg}|${hs}|${open}`, () => new THREE.CylinderGeometry(rt, rb, h, seg, hs, open));
export const sph = (r, ws = 14, hs = 10) => geo(`sph|${R3(r)}|${ws}|${hs}`, () => new THREE.SphereGeometry(r, ws, hs));

// ---- shared "people atlas": one skinned ink material for every person --------------------------------
// Pattern MASKS (red channel) live in a 4x4 atlas of 128px swatches. In the shader the albedo is
// mix(vertexColor, aColor2, mask), so any colour pair x pattern needs no extra texture or material.
export const PATTERN_KINDS = ['plain', 'stripes', 'vstripes', 'checks', 'dots', 'floral', 'belt'];
export const patSlot = (kind, hem) => Math.max(0, PATTERN_KINDS.indexOf(kind)) + (hem ? PATTERN_KINDS.length : 0);
let ATLAS = null;
function maskAtlas() {
  if (ATLAS) return ATLAS;
  const { c, ctx } = makeCanvas(512, 512);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 512, 512);
  const r = rng(77);
  for (let i = 0; i < 14; i++) {
    const kind = PATTERN_KINDS[i % 7], hem = i >= 7;
    const ox = (i % 4) * 128, oy = Math.floor(i / 4) * 128;
    ctx.save(); ctx.beginPath(); ctx.rect(ox, oy, 128, 128); ctx.clip(); ctx.translate(ox, oy);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff';
    if (kind === 'stripes') for (let y = 8; y < 128; y += 32) ctx.fillRect(0, y + (r() - 0.5) * 2, 128, 14);
    else if (kind === 'vstripes') for (let x = 0; x < 128; x += 16) ctx.fillRect(x + (r() - 0.5) * 2, 0, 6, 128);
    else if (kind === 'checks') { ctx.lineWidth = 5; for (let q = 0; q <= 128; q += 21) { ctx.beginPath(); ctx.moveTo(q, 0); ctx.lineTo(q, 128); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(128, q); ctx.stroke(); } }
    else if (kind === 'dots') for (let y = 10; y < 128; y += 22) for (let x = (y / 22) % 2 ? 6 : 17; x < 128; x += 22) { ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 7); ctx.fill(); }
    else if (kind === 'floral') for (const [x, y] of FLOWERS) for (let p = 0; p < 5; p++) { const a = p * 1.2566; ctx.beginPath(); ctx.arc(x + Math.cos(a) * 5, y + Math.sin(a) * 5, 3.6, 0, 7); ctx.fill(); }
    else if (kind === 'belt') ctx.fillRect(0, 128 * 0.82, 128, 128 * 0.18);
    if (hem) { // Warli hem: a line, triangles and dots along the bottom edge
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 102); ctx.lineTo(128, 102); ctx.stroke();
      for (let t = 0; t < 8; t++) { const x = t * 16; ctx.beginPath(); ctx.moveTo(x + 2, 125); ctx.lineTo(x + 8, 125 - 20); ctx.lineTo(x + 14, 125); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.arc(x + 8, 108, 2.4, 0, 7); ctx.fill(); }
    }
    ctx.restore();
  }
  ATLAS = new THREE.CanvasTexture(c);
  ATLAS.colorSpace = THREE.NoColorSpace;
  return ATLAS;
}
/** atlas uv for a swatch slot, local uv in 0..1 */
export function atlasUv(slot, u, v) {
  const ox = (slot % 4) * 128, oy = (3 - Math.floor(slot / 4)) * 128; // canvas row 0 is the top (flipY)
  return [(ox + 1 + Math.min(Math.max(u, 0), 1) * 126) / 512, (oy + 1 + Math.min(Math.max(v, 0), 1) * 126) / 512];
}

let BODY_MAT = null;
/** the single skinned, vertex-coloured, pattern-masked ink material shared by all people */
export function bodyMaterial() {
  if (BODY_MAT) return BODY_MAT;
  const m = createInkMaterial({ vertexColors: true, hatchSpacing: 0.045, hatchStrength: 0.85 });
  const base = m.onBeforeCompile;
  m.onBeforeCompile = (shader) => {
    base(shader);
    shader.uniforms.uMask = { value: maskAtlas() };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aColor2; attribute vec2 aMaskUv; attribute float aHS;\nvarying vec3 vC2; varying vec2 vMUv; varying float vHS;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvC2 = aColor2; vMUv = aMaskUv; vHS = aHS;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D uMask; varying vec3 vC2; varying vec2 vMUv; varying float vHS;')
      .replace('vec3 inkBase = diffuseColor.rgb;', 'vec3 inkBase = mix(diffuseColor.rgb, vC2, texture2D(uMask, vMUv).r);')
      .split('* uHatchStrength, 0.0, 1.0)').join('* uHatchStrength * vHS, 0.0, 1.0)');
  };
  m.customProgramCacheKey = () => 'ink-people-atlas';
  BODY_MAT = m;
  return m;
}

const OUT_VERT = /* glsl */ `
uniform float uBoil; uniform float uPxScale; uniform float uWobble; uniform float uWobbleFreq;
attribute float aThick;
#include <common>
#include <skinning_pars_vertex>
float h31(vec3 p){ p = fract(p * 0.1031); p += dot(p, p.yzx + 33.33); return fract((p.x + p.y) * p.z); }
float n3(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1,0,0)), f.x), mix(h31(i + vec3(0,1,0)), h31(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h31(i + vec3(0,0,1)), h31(i + vec3(1,0,1)), f.x), mix(h31(i + vec3(0,1,1)), h31(i + vec3(1,1,1)), f.x), f.y), f.z);
}
void main(){
  #include <beginnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <begin_vertex>
  #include <skinning_vertex>
  vec4 wp = modelMatrix * vec4(transformed, 1.0);
  vec3 wn = normalize(mat3(modelMatrix) * objectNormal);
  float px = uPxScale * length(cameraPosition - wp.xyz);
  vec3 q = wp.xyz * uWobbleFreq + vec3(uBoil * 1.7, uBoil * 2.3, uBoil * 0.9);
  float a = n3(q), b = n3(q * 1.9 + 7.1), c = n3(q * 1.3 + 3.7);
  float thick = aThick * (1.0 + (a - 0.5) * uWobble * 1.3);
  float off = clamp(thick * px, 0.003, 1.2);
  vec3 jitter = (vec3(a, b, c) - 0.5) * uWobble * aThick * px * 1.2;
  wp.xyz += wn * off + jitter;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
let OUT_MAT = null;
/** inverted-hull outline material that works on SkinnedMesh and plain Mesh, thickness per vertex (aThick) */
export function bodyOutlineMaterial() {
  if (OUT_MAT) return OUT_MAT;
  OUT_MAT = new THREE.ShaderMaterial({
    vertexShader: OUT_VERT,
    fragmentShader: 'uniform vec3 uColor; void main(){ gl_FragColor = vec4(uColor, 1.0); }',
    side: THREE.BackSide,
    uniforms: { ...inkUniforms, uWobble: { value: 1 }, uWobbleFreq: { value: 2.2 }, uColor: { value: new THREE.Color(INK_COLOR) } },
  });
  return OUT_MAT;
}
