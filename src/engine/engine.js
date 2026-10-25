/**
 * engine/engine.js: boots a world. The engine never imports a world; main.js hands it the world definition.
 *
 * createEngine(world) -> { scene, camera, renderer, planet, player, sky, colliders, actors, cameraRig, culler, step(dt, draw=true), start() }
 *   step(dt, draw) advances the simulation by dt seconds without waiting for animation frames (scripted tests; dev: window.__game.step)
 *   world contract (see docs/ARCHITECTURE.md):
 *   { id, name, seed?, planet:{radius,detail,heightFn,colorFn,sea?, outlinePx?, hatchSpacing?}, 
 *     sky:{paper, doodles, extra(skyApi)}, spawn:{dir,facing}, createHero(ink)->Group,
 *     build(ctx)->{ colliders?:[], update?(dt,t) } }
 *   ctx = { scene, camera, renderer, planet, ink, quality, rng, player, actors, colliders, placer, culler, occlusion, talk }
 *     talk = game/talk/talk.js conversation system: talk.register({ id, role, object, ... }) marks an NPC talkable, talk.setDialogues(map)
 *     occlusion = engine/occlusion.js (register buildings that should fade when they block the camera's view of the hero)
 *     culler = engine/lod.js distance/horizon culler (the engine calls culler.update() each frame, after build.update)
 *     helpers worlds import directly: engine/place.js (placeOnSphere, registerAsset, frameAt, localToDir)
 *     ink = the engine/ink.js namespace; placer = engine/scatter.js placer (world.scatter.groups configures its clusters)
 *   world.scatter = { groups:{name:count}, spawnClear?, extraSpacing? }  (optional)
 */
import * as THREE from 'three';
import * as ink from './ink.js';
import { createPlanet } from './planet.js';
import { createSky } from './sky.js';
import { createPlayer } from './player.js';
import { createCameraRig } from './camera.js';
import { createInput } from './input.js';
import { createColliders } from './colliders.js';
import { createActors } from './actors.js';
import { createPlacer, mulberry32 } from './scatter.js';
import { createCuller } from './lod.js';
import { createOcclusion } from './occlusion.js';
import { createPost } from './post.js';
import { QUALITY } from './quality.js';
import { createTalk } from '../game/talk/talk.js';

const MAX_DT = 0.05;
const FOV = 50;

export function createEngine(world) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.pixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.3, 2500);
  camera.layers.enable(ink.OVERLAY_LAYER); // outlines, doodles, face stickers

  const sky = createSky(scene, { shadowMapSize: QUALITY.shadowSize, ...world.sky });
  const planet = createPlanet(world.planet);
  scene.add(planet.object);

  const input = createInput(renderer.domElement);
  const colliders = createColliders({ planetRadius: planet.radius });
  const culler = createCuller({ camera, planet });
  const actors = createActors({ planet, colliders });
  const spawnDir = new THREE.Vector3(...(world.spawn?.dir ?? [0, 1, 0])).normalize();
  const rng = mulberry32(world.seed ?? 1);
  const placer = createPlacer({ planet, rng, spawnDir, ...(world.scatter ?? {}) });

  const player = createPlayer({ hero: world.createHero(ink), planet, colliders, spawn: world.spawn });
  const occlusion = createOcclusion({ camera, player });
  const cameraRig = createCameraRig(camera, player, planet);
  const talk = createTalk({ camera, player, cameraRig, input, worldId: world.id });
  const built = world.build({ scene, camera, renderer, planet, ink, quality: QUALITY, rng, player, actors, colliders, placer, culler, occlusion, talk }) ?? {};
  (built.colliders ?? []).forEach((c) => colliders.add(c));
  scene.add(player.object);

  const post = createPost({ renderer, scene, camera, quality: QUALITY });
  function resize() {
    const w = Math.max(1, window.innerWidth), h = Math.max(1, window.innerHeight);
    renderer.setSize(w, h);
    post.resize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const timer = new THREE.Timer();
  let time = 0;
  /** advance the simulation by dt seconds (and render unless draw=false) */
  function advance(dt, draw = true) {
    time += dt;
    const state = input.read();
    player.update(dt, state, cameraRig.heading);
    actors.update(dt);
    colliders.update(dt);
    built.update?.(dt, time);
    talk.update(dt);
    cameraRig.update(dt, state);
    camera.updateMatrixWorld();
    culler.update();
    occlusion.update(dt);
    planet.update(dt, time);
    sky.update(dt, player.object.position, player.up, cameraRig.zoom01);
    if (draw) {
      ink.updateInk(renderer, camera, time);
      post.render(dt);
    }
  }
  function frame() {
    timer.update();
    advance(Math.min(timer.getDelta(), MAX_DT));
  }

  const engine = { scene, camera, renderer, planet, player, sky, colliders, actors, cameraRig, culler, occlusion, talk, input, step: advance, start() { renderer.setAnimationLoop(frame); } };
  if (import.meta.env.DEV) window.__game = { talk, input, occlusion, step: advance, renderer, composer: post.composer, post, player, camera, cameraRig, scene, colliders: colliders.list, planet, culler, actors, world, built, QUALITY };
  return engine;
}
