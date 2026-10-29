// Dozy Hollow: the stage-1 world. Gentle pastel hills, sleepy rocks, a pink blob hero.
import * as THREE from 'three';
import { noise3, hash3 } from '../../engine/planet.js';
import { createCharacter } from './character.js';
import { buildProps, GROUPS, SPAWN_CLEAR, EXTRA_SPACING } from './props.js';

// ---- terrain ---------------------------------------------------------------
const HILL_HEIGHT = 1.5; // max +/- radial displacement
// [frequency on the unit sphere, weight] per octave
const OCTAVES = [
  [2.0, 0.62],
  [4.4, 0.3],
  [9.0, 0.08],
];
function heightFn(d) {
  const x = d.x, y = d.y, z = d.z;
  let n = 0;
  for (let i = 0; i < OCTAVES.length; i++) {
    const [f, wgt] = OCTAVES[i];
    n += noise3(x * f + 11.3 * i, y * f - 4.1 * i, z * f + 7.7) * wgt;
  }
  n = Math.max(-1, Math.min(1, n * 1.15)); // gentle shaping
  return HILL_HEIGHT * n;
}

const C_BASE = new THREE.Color(0xa9d68f);
const C_LIGHT = new THREE.Color(0xc6e5a2);
const C_DARK = new THREE.Color(0x8dc98c);
const C_YELLOW = new THREE.Color(0xd8e49a);
const _c = new THREE.Color();
const U32 = 4294967295;

// per-face colour: light/dark patches, yellow-green patches, patchwork of pencil hatching
function colorFn(cen, _height, f) {
  const a = noise3(cen.x * 3 + 40, cen.y * 3, cen.z * 3) * 1.2;
  const b = noise3(cen.x * 2.2, cen.y * 2.2 + 90, cen.z * 2.2);
  const p = noise3(cen.x * 4.5 - 30, cen.y * 4.5, cen.z * 4.5 + 5);
  _c.copy(C_BASE);
  _c.lerp(a > 0 ? C_LIGHT : C_DARK, Math.min(1, Math.abs(a)) * 0.9);
  _c.lerp(C_YELLOW, THREE.MathUtils.smoothstep(b, 0.15, 0.5) * 0.7);
  _c.multiplyScalar(1 + (hash3(f, 3, 7) / U32 - 0.5) * 0.06); // uneven colouring
  return {
    color: _c,
    hatch: 0.3 + 0.7 * THREE.MathUtils.smoothstep(p, -0.08, 0.12), // about half strongly hatched
    angle: noise3(cen.x * 3.3 + 70, cen.y * 3.3 - 20, cen.z * 3.3) * 0.9 + (hash3(f, 11, 5) / U32 - 0.5) * 0.12,
  };
}

export default {
  id: 'dozy-hollow',
  name: 'Dozy Hollow',
  seed: 1234,
  planet: { radius: 50, detail: 26, heightFn, colorFn, sea: null },
  sky: { paper: '#ece6d6', doodles: { sun: true, moon: true, clouds: 10, stars: 44, bunting: false }, extra: null },
  spawn: { dir: [0, 1, 0], facing: [0, 0, -1] },
  scatter: { groups: GROUPS, spawnClear: SPAWN_CLEAR, extraSpacing: EXTRA_SPACING },
  createHero: (ink) => createCharacter(ink),
  build(ctx) {
    return buildProps(ctx); // { colliders }
  },
};
