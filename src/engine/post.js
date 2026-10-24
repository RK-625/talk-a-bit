/**
 * engine/post.js: the ink post chain shared by the game and the lab pages.
 *
 * createPost({ renderer, scene, camera, quality }) -> { composer, resize(w, h), render(dt) }
 *   scene -> [normal pre-pass for crease lines if quality.edges] -> paper pass -> sRGB output, MSAA half-float target.
 *   Call resize(innerWidth, innerHeight) after renderer.setSize; it also updates pixel ratio uniforms.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { createPaperPass, NormalPass } from './ink.js';

export function createPost({ renderer, scene, camera, quality }) {
  const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: quality.msaa });
  const composer = new EffectComposer(renderer, target);
  const normalPass = quality.edges ? new NormalPass(scene, camera, quality.edgeScale) : null;
  const paper = createPaperPass(normalPass);
  composer.addPass(new RenderPass(scene, camera));
  if (normalPass) composer.addPass(normalPass);
  composer.addPass(paper);
  composer.addPass(new OutputPass());
  return {
    composer,
    resize(w, h) {
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(w, h);
      paper.uniforms.uPR.value = renderer.getPixelRatio();
    },
    render(dt) { composer.render(dt); },
  };
}
