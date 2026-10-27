/**
 * people/hero.js: Ananya, the 24-year-old backpacker from Jaipur who is the hero of Kochi (backpacking through the city and the backwaters, learning
 * Malayalam on the road).
 *
 * createHero(ink) -> Group (feet at y=0, facing +Z, 2.22 tall: full adult proportions, about the height of the local adults).
 * Plugs straight into engine/player.js (same contract as the other worlds' heroes): userData.animate(dt, {speed, walk, grounded, vr, time, phase}),
 * userData.radius, userData.rig, userData.setLookTarget(v), userData.playLoop('wave'), userData.playOnce('wave', 2).
 * Look: a big rust-orange rucksack with a blue sleeping mat rolled and strapped on top, a wide straw hat with a red band, a folded paper map in her right
 * hand, a loose oatmeal cotton shirt (sleeves down) over cropped olive cargo pants, bare ankles and sandals, a long black plait.
 * No NPC wears this combination (see variation.js notAnanya) and it shares nothing with the other heroes (Chotu, Rohan, Meera and the rest).
 */
import { createPerson } from './person.js';
import { PASTEL, HAIR } from './kit.js';

export const HERO_SPEC = {
  detail: 'high', height: 2.22, build: 'normal', headScale: 1.1, legScale: 0.99, armScale: 1.03, torsoScale: 1.04, trim: null,
  skin: 0xe6b08a,
  outfit: 'shirtTrousers', sleeves: 'long',
  top: 0xe8d9b4, topPattern: 'plain', top2: PASTEL.white, // loose oatmeal cotton shirt
  bottom: 0x8a8f55, bottomPattern: 'plain', crop: 0.42, // cropped olive cargo pants, bare ankles
  hair: { style: 'plait', color: HAIR.black },
  face: { eyes: 'dot', eyeScale: 1.0, brows: 'thin', lashes: true, blush: false, smile: 'big', smudge: false, freckles: true, bindi: false },
  footwear: 'chappal', footColor: 0x8a5a36, // leather sandals
  accessories: [
    'rucksack',
    'strawHat',
    'foldedMap',
  ],
  gait: { stride: 0.66, knee: 1.2, armSwing: 0.5, bounce: 0.07, sway: 0.07, lean: 0.14, twist: 0.12, speed: 1.2 },
  seed: 24,
};

export function createHero(ink) {
  const hero = createPerson(HERO_SPEC, ink);
  hero.name = 'Ananya';
  hero.userData.radius = 0.5;
  return hero;
}
export default createHero;
