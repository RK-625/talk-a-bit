// Renderer, scene, game loop and wiring.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { createPlanet } from './planet.js';
import { createScatter } from './scatter.js';
import { createSky } from './sky.js';
import { createPlayer } from './player.js';
import { createCameraRig } from './camera.js';
import { createInput, isTouchDevice } from './input.js';
import { createPaperPass, updateInk, NormalPass, OVERLAY_LAYER } from './ink.js';
import { QUALITY } from './quality.js';

// ---- tunables --------------------------------------------------------------
const MAX_DT = 0.05;
const FOV = 50;

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.pixelRatio));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, 1, 0.3, 2500);
camera.layers.enable(OVERLAY_LAYER); // outlines, doodles, face stickers

const sky = createSky(scene, { shadowMapSize: QUALITY.shadowSize });
scene.add(createPlanet());
const scatter = createScatter();
scene.add(scatter.group);

const input = createInput(renderer.domElement);
const player = createPlayer({ colliders: scatter.colliders });
scene.add(player.object);
const cameraRig = createCameraRig(camera, player);

// post: scene -> paper pass -> sRGB output
const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: QUALITY.msaa });
const composer = new EffectComposer(renderer, target);
const normalPass = QUALITY.edges ? new NormalPass(scene, camera, QUALITY.edgeScale) : null;
const paper = createPaperPass(normalPass);
composer.addPass(new RenderPass(scene, camera));
if (normalPass) composer.addPass(normalPass);
composer.addPass(paper);
composer.addPass(new OutputPass());

function resize() {
  const w = Math.max(1, window.innerWidth), h = Math.max(1, window.innerHeight);
  renderer.setSize(w, h);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(w, h);
  paper.uniforms.uPR.value = renderer.getPixelRatio();
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

const timer = new THREE.Timer();
let time = 0;
function frame() {
  timer.update();
  const dt = Math.min(timer.getDelta(), MAX_DT);
  time += dt;
  const state = input.read();
  player.update(dt, state, cameraRig.heading);
  cameraRig.update(dt, state);
  sky.update(dt, player.object.position, player.up, cameraRig.zoom01);
  updateInk(renderer, camera, time);
  composer.render(dt);
}
renderer.setAnimationLoop(frame);

if (import.meta.env.DEV) window.__game = { renderer, composer, player, camera, cameraRig, scene, colliders: scatter.colliders };
