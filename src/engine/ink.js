/**
 * engine/ink.js: the shared ballpoint-pen + colored-pencil look. Every world and asset uses these.
 *
 * INK_COLOR (0x2b2440), PAPER_COLOR (0xece6d6), AMBIENT_INTENSITY (the AmbientLight intensity ink shading assumes)
 * OVERLAY_LAYER   layer for things drawn in the main pass but skipped by the crease-line normal pass
 *                 (outline hulls, sky sprites, face stickers). `obj.layers.set(OVERLAY_LAYER)`.
 *
 * createInkMaterial({ color=0xffffff, vertexColors=false, hatchSpacing=0.14, hatchColor=null, hatchStrength=1,
 *                     lightHatch=0, hatchAttribute=false }) -> MeshLambertMaterial
 *     toon-banded lit material; pencil hatch in object space (triplanar, no UVs, doesn't swim).
 *     hatchSpacing = object units between strokes (smaller for small things: character 0.06, flowers 0.04).
 *     hatchColor null = derived darker saturated shade of the albedo. lightHatch>0 adds sparse strokes in light;
 *     hatchAttribute = geometry has vec2 attribute `aHatch` (amount, angle) that modulates it (planet ground).
 *     Works with vertexColors and InstancedMesh (instanceColor).
 * addOutline(mesh, { thickness=2.4 (px), color=INK_COLOR, wobble=1, wobbleFreq=1.5, geometry=null }) -> outline Mesh
 *     inverted-hull ink line with time-stepped "boiling" wobble; child of `mesh`, works on InstancedMesh (shares
 *     instanceMatrix). `geometry` = alternative geometry to inflate (e.g. only the body parts, no face stickers).
 * smoothOutlineGeometry(geometry) -> welded smooth-normal copy used for hulls
 * createDecal(canvas, w, h, { depth=0.05, thickness=2, frame=0xf3edda }) -> Group
 *     a flat painted plaque (sign, poster, mural): `canvas` (Canvas 2D, any size, aspect should match w:h) painted
 *     on the front of a thin outlined slab, facing +Z, centred on its origin. Use engine/doodle.js to paint it.
 * createPaperPass(normalPass|null) -> ShaderPass       grain/fibres/vignette (+ crease lines if NormalPass given)
 * NormalPass(scene, camera, scale)                     normal pre-pass feeding the crease lines
 * updateInk(renderer, camera, time)                    per frame: feeds time + pixel scale to outline shaders
 */
// The shared ballpoint-pen + colored-pencil look.
//   createInkMaterial()   toon-banded lit material with object-space (triplanar) pencil hatching
//   addOutline()          inverted-hull ink line with time-stepped "boiling" wobble
//   createPaperPass()     subtle paper grain / fibres / vignette post pass
//   updateInk()           call once per frame (feeds time + screen scale to the shaders)
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ---- tunables --------------------------------------------------------------
export const INK_COLOR = 0x2b2440; // dark brown-navy ballpoint
export const PAPER_COLOR = 0xece6d6; // warm cream
const BOIL_INTERVAL = 0.15; // seconds between outline redraws
// Objects on this layer are drawn in the main pass but skipped by the normal pass that feeds
// the inner-line detector (outline hulls, sky doodles, face stickers).
export const OVERLAY_LAYER = 1;
// Light bands. `x` is lighting normalised to 0..1 (0 = ambient only/shadow, 1 = fully lit).
const BAND_MID = 0.55; // below this: diagonal hatch
const BAND_DARK = 0.22; // below this: cross-hatch too

// Shared per-frame uniforms (one object so every material sees the same values).
export const inkUniforms = {
  uBoil: { value: 0 },
  uPxScale: { value: 0.001 }, // world units per screen pixel at distance 1
};

export function updateInk(renderer, camera, time) {
  inkUniforms.uBoil.value = Math.floor(time / BOIL_INTERVAL) % 97;
  const h = renderer.domElement.height / renderer.getPixelRatio();
  // Constant-ish line thickness in CSS px: world size of one px at distance d is d * pxScale.
  inkUniforms.uPxScale.value = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) / h;
}

// ---- GLSL shared helpers ---------------------------------------------------
const NOISE_GLSL = /* glsl */ `
float inkHash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float inkNoise2(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(inkHash21(i), inkHash21(i + vec2(1,0)), f.x),
             mix(inkHash21(i + vec2(0,1)), inkHash21(i + vec2(1,1)), f.x), f.y);
}
`;

// ---- Hatching material -----------------------------------------------------
// MeshLambertMaterial gives us lights + shadow maps for free. In onBeforeCompile we
//  1. grab the albedo and force it to white, so Lambert's output is a pure light scalar,
//  2. replace the final colour with band-quantised albedo + hatch strokes.
const HATCH_PARS = /* glsl */ `
varying vec3 vOPos;
varying vec3 vONorm;
#ifdef INK_AHATCH
varying vec2 vHatchP; // x: how strongly this patch is hatched in light, y: stroke angle offset (radians)
#endif
#ifdef INK_LAYERS
varying vec4 vLA; // per-vertex signed distances (units) to the edge of paint layers 0..3 (negative = inside)
varying vec4 vLB; // layers 4..7
#endif
`;

const HATCH_FRAG_FUNCS = /* glsl */ `
${NOISE_GLSL}
uniform float uSpacing;     // distance between hatch lines in object units
uniform float uHatchStrength;
uniform float uLightHatch;  // strength of sparse hatch in the lit band
uniform vec3  uHatchColor;
uniform float uUseHatchColor;
float inkHatchX = 1.0; // light-hatch amount / stroke angle offset actually used by inkShade (the paint layers override them per fragment)
float inkHatchY = 0.0;
#ifdef INK_LAYERS
uniform vec3 uLayerCol[INK_NLAYERS];
uniform float uLayerHatch[INK_NLAYERS];
uniform float uLayerLine[INK_NLAYERS];
uniform float uLayerFill[INK_NLAYERS];
#endif

// One family of diagonal pencil strokes on a 2D plane. dirSign flips the diagonal.
// Returns stroke coverage 0..1 with irregular width, wobble, broken ends and grain.
float pencilStrokes(vec2 uv, float ang, float seed, float density){
  vec2 q = uv / uSpacing;
  vec2 dirA = vec2(cos(ang), sin(ang));
  float s = dot(q, dirA);                      // across the strokes
  float t = dot(q, vec2(-dirA.y, dirA.x));     // along the strokes
  float id = floor(s);
  float r = inkHash21(vec2(id, seed));
  float centre = 0.5 + (r - 0.5) * 0.35 + (inkNoise2(vec2(id * 0.37 + seed, t * 0.16)) - 0.5) * 0.3;
  float width  = mix(0.11, 0.27, inkNoise2(vec2(id + seed * 3.1, t * 0.35)));
  // strokes start and stop at random places along their length
  float present = smoothstep(1.0 - density, 1.0 - density + 0.18, inkNoise2(vec2(id * 2.7 + seed, t * 0.11)));
  float aa = max(fwidth(s), 0.02);
  float d = abs(fract(s) - centre);
  float a = 1.0 - smoothstep(width - aa, width + aa, d);
  a *= present;
  a *= mix(0.6, 1.0, inkNoise2(vec2(s * 4.0, t * 1.1 + seed))); // crayon grain
  // far away the lines are sub-pixel: fade to their average coverage so nothing shimmers
  float far = smoothstep(0.35, 0.8, aa);
  return mix(a, width * 2.0 * density * 0.8, far);
}

// Triplanar hatch in object space: pick up to three planes by the normal, so strokes stay
// glued to the surface (no swimming) with no UVs.
float triHatch(vec3 p, vec3 n, float ang, float seed, float density){
  vec3 w = pow(abs(n), vec3(6.0));
  w /= (w.x + w.y + w.z + 1e-4);
  float h = 0.0;
  if (w.x > 0.02) h += w.x * pencilStrokes(p.yz, ang, seed, density);
  if (w.y > 0.02) h += w.y * pencilStrokes(p.xz, ang, seed + 5.0, density);
  if (w.z > 0.02) h += w.z * pencilStrokes(p.xy, ang, seed + 9.0, density);
  return h;
}

vec3 inkShade(vec3 base, float lit, vec3 p, vec3 n){
  // sun intensity 1 + ambient AMBIENT: remap lit to 0..1
  float x = clamp((lit - INK_AMBIENT) / 1.0, 0.0, 1.0);
  float mid  = 1.0 - smoothstep(${BAND_MID.toFixed(2)} - 0.03, ${BAND_MID.toFixed(2)} + 0.03, x);
  float dark = 1.0 - smoothstep(${BAND_DARK.toFixed(2)} - 0.03, ${BAND_DARK.toFixed(2)} + 0.03, x);

  // coloured pencil: a saturated darker shade of the albedo, nudged toward indigo (never grey)
  vec3 hatchCol = uUseHatchColor > 0.5 ? uHatchColor
                : mix(base * base * 0.95, vec3(0.04, 0.06, 0.2), 0.14);
  vec3 col = base;
  col *= mix(1.0, 0.95, mid);
  col *= mix(vec3(1.0), vec3(0.93, 0.94, 1.0), dark);

  float angOff = 0.0;
  float lightAmt = uLightHatch;
  #ifdef INK_AHATCH
  lightAmt *= inkHatchX;
  angOff = inkHatchY;
  #endif
  const float D45 = 0.7853982;
  // light band: "drawn on" strokes in patches (strength + direction vary per patch)
  if (lightAmt > 0.01) {
    float a = triHatch(p, n, D45 + angOff, 21.0, 0.35 + 0.6 * lightAmt) * lightAmt;
    col = mix(col, hatchCol, clamp(a * 0.85, 0.0, 1.0));
  }
  // mid band: diagonal strokes
  if (mid > 0.01) {
    float a = triHatch(p, n, D45 + angOff, 3.0, 0.85) * mid;
    col = mix(col, hatchCol, clamp(a * 0.8 * uHatchStrength, 0.0, 1.0));
  }
  // dark band / shadow: the other diagonal too
  if (dark > 0.01) {
    float a = triHatch(p, n, -D45 + angOff * 0.6, 11.0, 0.92) * dark;
    col = mix(col, mix(hatchCol, vec3(0.05, 0.05, 0.24), 0.32), clamp(a * 0.85 * uHatchStrength, 0.0, 1.0)); // shadows lean indigo
  }
  return col;
}
`;

const AMBIENT_LEVEL = 0.5; // must match the AmbientLight intensity in main.js
export const AMBIENT_INTENSITY = AMBIENT_LEVEL;

export function createInkMaterial({
  color = 0xffffff,
  vertexColors = false,
  hatchSpacing = 0.14, // object units between strokes
  hatchColor = null, // null: derive a darker pencil shade from the albedo
  hatchStrength = 1,
  lightHatch = 0, // sparse hatch in lit areas (0 = none)
  hatchAttribute = false, // modulate lightHatch with geometry attribute `aHatch`
  layers = null, // paint layers resolved PER FRAGMENT from per-vertex distances (geometry attributes aLayerA, aLayerB: vec4 each):
  //   [{ color, hatch (light-hatch amount), line (0..1 ink edge line), fill = true }] (max 8, painted in order). Smooth, wobbly,
  //   hand-drawn boundaries instead of per-face stair steps (see engine/planet.js `layers`).
} = {}) {
  const mat = new THREE.MeshLambertMaterial({ color, vertexColors });
  const u = {
    uSpacing: { value: hatchSpacing },
    uHatchStrength: { value: hatchStrength },
    uLightHatch: { value: lightHatch },
    uHatchColor: { value: new THREE.Color(hatchColor ?? 0x000000) },
    uUseHatchColor: { value: hatchColor === null ? 0 : 1 },
  };
  if (hatchAttribute) mat.defines = { INK_AHATCH: '' };
  if (layers) {
    mat.defines = { ...(mat.defines ?? {}), INK_LAYERS: '', INK_NLAYERS: layers.length };
    u.uLayerCol = { value: layers.map((l) => new THREE.Color(l.color ?? 0xffffff)) };
    u.uLayerHatch = { value: layers.map((l) => l.hatch ?? 0.3) };
    u.uLayerLine = { value: layers.map((l) => l.line ?? 0) };
    u.uLayerFill = { value: layers.map((l) => (l.fill === false ? 0 : 1)) };
  }
  mat.userData.ink = u;
  mat.customProgramCacheKey = () => 'ink' + (hatchAttribute ? 'A' : '') + (layers ? 'L' + layers.length : '');

  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
${HATCH_PARS}
#ifdef INK_AHATCH
attribute vec2 aHatch;
#endif
#ifdef INK_LAYERS
attribute vec4 aLayerA;
attribute vec4 aLayerB;
#endif`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
vOPos = position; vONorm = normal;
#ifdef INK_AHATCH
vHatchP = aHatch;
#endif
#ifdef INK_LAYERS
vLA = aLayerA; vLB = aLayerB;
#endif`
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
${HATCH_PARS}
#define INK_AMBIENT ${AMBIENT_LEVEL.toFixed(3)}
${HATCH_FRAG_FUNCS}`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
vec3 inkBase = diffuseColor.rgb;
diffuseColor.rgb = vec3(1.0);
#ifdef INK_AHATCH
inkHatchX = vHatchP.x; inkHatchY = vHatchP.y;
#endif
#ifdef INK_LAYERS
{
  float lv[8];
  lv[0] = vLA.x; lv[1] = vLA.y; lv[2] = vLA.z; lv[3] = vLA.w; lv[4] = vLB.x; lv[5] = vLB.y; lv[6] = vLB.z; lv[7] = vLB.w;
  // hand-drawn wobble: low + mid frequency noise shifts every edge a little, the same way for all layers
  float wob = (inkNoise2(vOPos.xz * 1.9 + vOPos.y * 1.3) - 0.5) * 0.34 + (inkNoise2(vOPos.xy * 6.3 + vOPos.z * 2.1) - 0.5) * 0.12;
  float mott = 0.95 + 0.1 * inkNoise2(vOPos.xz * 3.1 + vOPos.y);
  for (int i = 0; i < INK_NLAYERS; i++) {
    float d = lv[i] + wob;
    float aa = max(fwidth(lv[i]) * 0.9, 0.05);
    float cov = uLayerFill[i] * (1.0 - smoothstep(-aa, aa, d));
    inkBase = mix(inkBase, uLayerCol[i] * mott, cov);
    inkHatchX = mix(inkHatchX, uLayerHatch[i], cov);
    float ln = (1.0 - smoothstep(0.0, 0.05 + aa * 1.3, abs(d))) * uLayerLine[i];
    inkBase = mix(inkBase, vec3(0.17, 0.14, 0.25), ln * 0.6);
  }
}
#endif`
      )
      .replace(
        '#include <opaque_fragment>',
        `{
  float inkLit = dot(outgoingLight, vec3(0.3333)) * 3.14159265;
  outgoingLight = inkShade(inkBase, inkLit, vOPos, normalize(vONorm));
}
#include <opaque_fragment>`
      );
  };
  return mat;
}

// ---- Ink outline (inverted hull) -------------------------------------------
const OUTLINE_VERT = /* glsl */ `
uniform float uBoil;
uniform float uPxScale;
uniform float uThick;
uniform float uWobble;
uniform float uWobbleFreq;
float h31(vec3 p){ p = fract(p * 0.1031); p += dot(p, p.yzx + 33.33); return fract((p.x + p.y) * p.z); }
float n3(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1,0,0)), f.x), mix(h31(i + vec3(0,1,0)), h31(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h31(i + vec3(0,0,1)), h31(i + vec3(1,0,1)), f.x), mix(h31(i + vec3(0,1,1)), h31(i + vec3(1,1,1)), f.x), f.y), f.z);
}
void main(){
  vec4 lp = vec4(position, 1.0);
  vec3 ln = normal;
  #ifdef USE_INSTANCING
    lp = instanceMatrix * lp;
    ln = mat3(instanceMatrix) * ln;
  #endif
  vec4 wp = modelMatrix * lp;
  vec3 wn = normalize(mat3(modelMatrix) * ln);
  float px = uPxScale * length(cameraPosition - wp.xyz); // world size of one pixel here
  // Low-frequency noise in world space, re-seeded every BOIL_INTERVAL: the line "boils".
  vec3 q = wp.xyz * uWobbleFreq + vec3(uBoil * 1.7, uBoil * 2.3, uBoil * 0.9);
  float a = n3(q), b = n3(q * 1.9 + 7.1), c = n3(q * 1.3 + 3.7);
  float thick = uThick * (1.0 + (a - 0.5) * uWobble * 1.3);
  float off = clamp(thick * px, 0.003, 1.2);
  vec3 jitter = (vec3(a, b, c) - 0.5) * uWobble * uThick * px * 1.2;
  wp.xyz += wn * off + jitter;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;
const OUTLINE_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
void main(){ gl_FragColor = vec4(uColor, uAlpha); }
`;

// Hull normals must be smooth or faces separate when inflated: weld by position and recompute.
export function smoothOutlineGeometry(geometry) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', geometry.attributes.position);
  if (geometry.index) g.setIndex(geometry.index);
  const welded = mergeVertices(g, 1e-3);
  welded.computeVertexNormals();
  return welded;
}

export function addOutline(
  mesh,
  { thickness = 2.4, color = INK_COLOR, wobble = 1, wobbleFreq = 1.5, geometry = null } = {}
) {
  const geo = smoothOutlineGeometry(geometry ?? mesh.geometry);
  const mat = new THREE.ShaderMaterial({
    vertexShader: OUTLINE_VERT,
    fragmentShader: OUTLINE_FRAG,
    side: THREE.BackSide,
    uniforms: {
      ...inkUniforms,
      uThick: { value: thickness },
      uWobble: { value: wobble },
      uWobbleFreq: { value: wobbleFreq },
      uColor: { value: new THREE.Color(color) },
      uAlpha: { value: 1 }, // < 1 (with material.transparent) fades the line: engine/occlusion.js
    },
  });
  let outline;
  if (mesh.isInstancedMesh) {
    outline = new THREE.InstancedMesh(geo, mat, mesh.count);
    outline.instanceMatrix = mesh.instanceMatrix; // share transforms
  } else {
    outline = new THREE.Mesh(geo, mat);
  }
  outline.frustumCulled = false;
  outline.castShadow = false;
  outline.receiveShadow = false;
  outline.name = 'ink-outline';
  outline.layers.set(OVERLAY_LAYER);
  mesh.add(outline);
  return outline;
}

// ---- Inner ink lines: normal pre-pass --------------------------------------
// Renders view-space normals (alpha 0 = empty) at reduced resolution. The paper pass compares
// neighbouring normals to find creases. Outline hulls / doodles / stickers sit on OVERLAY_LAYER
// and are skipped here.
export class NormalPass extends Pass {
  constructor(scene, camera, scale = 0.6) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.scale = scale;
    this.needsSwap = false;
    this.target = new THREE.WebGLRenderTarget(1, 1, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    this.material = new THREE.MeshNormalMaterial();
    this._clear = new THREE.Color();
  }
  setSize(w, h) {
    this.target.setSize(Math.max(1, Math.round(w * this.scale)), Math.max(1, Math.round(h * this.scale)));
  }
  render(renderer) {
    const bg = this.scene.background;
    const oldTarget = renderer.getRenderTarget();
    const oldAlpha = renderer.getClearAlpha();
    renderer.getClearColor(this._clear);
    const oldShadow = renderer.shadowMap.enabled;
    this.scene.background = null;
    this.scene.overrideMaterial = this.material;
    this.camera.layers.disable(OVERLAY_LAYER);
    renderer.shadowMap.enabled = false;
    renderer.setClearColor(0x000000, 0);
    renderer.setRenderTarget(this.target);
    renderer.clear();
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(oldTarget);
    renderer.setClearColor(this._clear, oldAlpha);
    renderer.shadowMap.enabled = oldShadow;
    this.camera.layers.enable(OVERLAY_LAYER);
    this.scene.overrideMaterial = null;
    this.scene.background = bg;
  }
  dispose() { this.target.dispose(); this.material.dispose(); }
}

// ---- Decal ------------------------------------------------------------------
export function createDecal(canvas, w, h, { depth = 0.05, thickness = 2, frame = 0xf3edda } = {}) {
  const g = new THREE.Group();
  const slab = new THREE.Mesh(new THREE.BoxGeometry(w, h, depth), createInkMaterial({ color: frame, hatchSpacing: 0.05 }));
  slab.castShadow = true;
  slab.receiveShadow = true;
  addOutline(slab, { thickness, wobbleFreq: 2 });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.96, h * 0.96),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.02, polygonOffset: true, polygonOffsetFactor: -1 })
  );
  face.position.z = depth / 2 + 0.002;
  face.layers.set(OVERLAY_LAYER); // painted detail: no crease lines
  g.add(slab, face);
  return g;
}

// ---- Paper post pass (+ optional inner lines) ---------------------------------
const EDGE_THRESHOLD = [0.1, 0.32]; // 1 - dot(n1, n2): ~25 deg starts a line; planet facets stay below
const PAPER_SHADER = {
  name: 'PaperPass',
  uniforms: {
    tDiffuse: { value: null },
    tNormal: { value: null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPR: { value: 1 },
    uBoil: inkUniforms.uBoil,
    uPaper: { value: new THREE.Color(PAPER_COLOR) },
    uInk: { value: new THREE.Color(INK_COLOR) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tNormal;
    uniform vec2 uResolution;
    uniform float uPR;
    uniform float uBoil;
    uniform vec3 uPaper;
    uniform vec3 uInk;
    varying vec2 vUv;
    ${NOISE_GLSL}

    #ifdef INNER_LINES
    vec4 nrm(vec2 uv){ vec4 s = texture2D(tNormal, uv); return vec4(normalize(s.xyz * 2.0 - 1.0), s.a); }
    // crease strength between two samples; ignores silhouettes (alpha 0): hulls draw those
    float crease(vec4 a, vec4 b){
      float ok = step(0.5, a.a) * step(0.5, b.a);
      return ok * smoothstep(${EDGE_THRESHOLD[0].toFixed(2)}, ${EDGE_THRESHOLD[1].toFixed(2)}, 1.0 - dot(a.xyz, b.xyz));
    }
    #endif

    void main(){
      vec3 col = texture2D(tDiffuse, vUv).rgb;
      vec2 px = vUv * uResolution / uPR;                    // CSS-pixel coords: grain size is dpr independent

      #ifdef INNER_LINES
      {
        // wobble the sampling position with low-freq noise that re-seeds with the outline boil
        vec2 w = (vec2(inkNoise2(px * 0.045 + uBoil * 3.1), inkNoise2(px * 0.045 + 50.0 + uBoil * 1.7)) - 0.5) * 3.0;
        vec2 uv = vUv + w / uResolution * uPR;
        vec2 o = 1.25 * uPR / uResolution;
        vec4 c = nrm(uv);
        float e = max(crease(c, nrm(uv + vec2(o.x, 0.0))), crease(c, nrm(uv + vec2(0.0, o.y))));
        e = max(e, crease(c, nrm(uv - vec2(o.x, 0.0))) * 0.8);
        e = max(e, crease(c, nrm(uv - vec2(0.0, o.y))) * 0.8);
        // broken, uneven pen pressure
        e *= mix(0.55, 1.0, inkNoise2(px * 0.12 + uBoil));
        col = mix(col, uInk, clamp(e * 0.85, 0.0, 0.85));
      }
      #endif

      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(lum), col, 0.9);                       // slightly chalky pastels

      float grain = inkHash21(floor(px * 1.5));
      float fibres = inkNoise2(vec2(px.x * 0.025, px.y * 0.6)) * 0.5
                   + inkNoise2(vec2(px.x * 0.5, px.y * 0.03) + 17.0) * 0.5;
      float blotch = inkNoise2(px * 0.012);

      // pen/pencil skips on the tooth of the paper: dark marks break up where grain is high
      col = mix(col, uPaper, (1.0 - lum) * smoothstep(0.55, 1.0, grain) * 0.2);
      col *= 1.0 + (grain - 0.5) * 0.05 + (fibres - 0.5) * 0.04 + (blotch - 0.5) * 0.03;

      vec2 d = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
      float v = smoothstep(0.35, 1.15, length(d));
      col = mix(col, col * vec3(0.84, 0.8, 0.72), v * 0.55);  // soft warm vignette
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

/** @param normalPass optional NormalPass; when given, creases become ink lines. */
export function createPaperPass(normalPass = null) {
  const pass = new ShaderPass(PAPER_SHADER);
  if (normalPass) {
    pass.material.defines = { INNER_LINES: '' };
    pass.uniforms.tNormal.value = normalPass.target.texture;
  }
  pass.uniforms.uBoil = inkUniforms.uBoil; // ShaderPass clones its uniforms; re-share the boil seed
  const origSetSize = pass.setSize.bind(pass);
  pass.setSize = (w, h) => {
    origSetSize(w, h);
    pass.uniforms.uResolution.value.set(w, h);
  };
  return pass;
}
