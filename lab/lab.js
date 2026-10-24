/**
 * lab/lab.js: shared turntable for inspecting ONE asset in isolation (dev only), in the engine's ink style.
 *
 * Open (dev server):  /lab/people.html   or   /lab/landmarks.html
 *   ?asset=/src/worlds/<world>/<path>.js     module to load (default: the Dozy Hollow pink blob)
 *   &export=createPerson                     export name to call (default: first of default, createAsset,
 *                                            createHero, createCharacter, createPerson, createLandmark)
 *   &spec={"height":2.2}                     optional JSON passed as the factory's first argument
 *   &rotate=0                                stop the turntable (drag to orbit; wheel to zoom)
 * The factory is called as factory(spec ?? ink) and must return a THREE.Object3D (feet/base at y=0, facing +Z).
 * People use a ground disc of radius 4, landmarks radius 12. Press "r" to toggle turntable rotation.
 * Paper background, ink post chain (outlines, crease lines, paper grain), hatched ground, one sun with shadows.
 */
import * as THREE from 'three';
import * as ink from '../src/engine/ink.js';
import { createPost } from '../src/engine/post.js';
import { QUALITY } from '../src/engine/quality.js';

const modules = import.meta.glob('/src/worlds/**/*.js'); // lazy; works in dev and build
const DEFAULT_ASSET = '/src/worlds/dozy-hollow/character.js';
const FACTORIES = ['default', 'createAsset', 'createHero', 'createCharacter', 'createPerson', 'createLandmark'];

const kind = document.body.dataset.kind ?? 'people';
const q = new URLSearchParams(location.search);
const assetPath = q.get('asset') ?? DEFAULT_ASSET;
const groundR = kind === 'landmarks' ? 12 : 4;

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, QUALITY.pixelRatio));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(ink.PAPER_COLOR);
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500);
camera.layers.enable(ink.OVERLAY_LAYER);

const sun = new THREE.DirectionalLight(0xfff1d6, 1);
sun.position.set(6, 12, 8).multiplyScalar(groundR / 4);
sun.castShadow = true;
sun.shadow.mapSize.set(QUALITY.shadowSize, QUALITY.shadowSize);
const sc = sun.shadow.camera;
sc.left = sc.bottom = -groundR * 1.6; sc.right = sc.top = groundR * 1.6; sc.near = 1; sc.far = 120;
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.05;
scene.add(sun, new THREE.AmbientLight(0xfff4e6, ink.AMBIENT_INTENSITY));

// small hatched ground disc
const ground = new THREE.Mesh(
  new THREE.CylinderGeometry(groundR, groundR, 0.3, 40),
  ink.createInkMaterial({ color: 0xa9d68f, hatchSpacing: 0.15, lightHatch: 1, hatchStrength: 1 })
);
ground.position.y = -0.15;
ground.receiveShadow = true;
ink.addOutline(ground, { thickness: 3, wobbleFreq: 0.4 });
scene.add(ground);

// asset
const turntable = new THREE.Group();
scene.add(turntable);
(async () => {
  const load = modules[assetPath];
  if (!load) { console.error('lab: unknown asset', assetPath, 'available:', Object.keys(modules)); return; }
  const mod = await load();
  const names = q.get('export') ? [q.get('export')] : FACTORIES;
  const name = names.find((n) => typeof mod[n] === 'function');
  if (!name) { console.error('lab: no factory export in', assetPath, Object.keys(mod)); return; }
  const spec = q.get('spec') ? JSON.parse(q.get('spec')) : ink;
  const obj = await mod[name](spec);
  obj.traverse((o) => { if (o.isMesh && o.name !== 'ink-outline') { o.castShadow = true; o.receiveShadow = true; } });
  turntable.add(obj);
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  target.y = Math.max(1, size.y * 0.5);
  dist = Math.max(8, Math.max(size.x, size.y, size.z) * 2.6);
  distT = dist;
})();

// orbit camera: drag = yaw/pitch, wheel = zoom
const target = new THREE.Vector3(0, 1, 0);
let yaw = 0.6, pitch = 0.3, dist = 9, distT = 9;
let rotate = q.get('rotate') !== '0';
const el = renderer.domElement;
let dragging = false;
el.addEventListener('pointerdown', (e) => { dragging = true; el.setPointerCapture(e.pointerId); });
el.addEventListener('pointerup', () => (dragging = false));
el.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  yaw -= e.movementX * 0.006;
  pitch = THREE.MathUtils.clamp(pitch + e.movementY * 0.006, -0.1, 1.4);
});
el.addEventListener('wheel', (e) => { e.preventDefault(); distT = THREE.MathUtils.clamp(distT * (1 + e.deltaY * 0.0012), 2, 80); }, { passive: false });
addEventListener('keydown', (e) => { if (e.key === 'r') rotate = !rotate; });

const post = createPost({ renderer, scene, camera, quality: QUALITY });
function resize() {
  const w = Math.max(1, innerWidth), h = Math.max(1, innerHeight);
  renderer.setSize(w, h);
  post.resize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

const timer = new THREE.Timer();
let time = 0;
renderer.setAnimationLoop(() => {
  timer.update();
  const dt = Math.min(timer.getDelta(), 0.05);
  time += dt;
  if (rotate && !dragging) turntable.rotation.y += dt * 0.5;
  dist += (distT - dist) * (1 - Math.exp(-8 * dt));
  camera.position.set(
    target.x + Math.sin(yaw) * Math.cos(pitch) * dist,
    target.y + Math.sin(pitch) * dist,
    target.z + Math.cos(yaw) * Math.cos(pitch) * dist
  );
  camera.lookAt(target);
  ink.updateInk(renderer, camera, time);
  post.render(dt);
});
