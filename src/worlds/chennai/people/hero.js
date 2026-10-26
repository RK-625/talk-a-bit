/**
 * people/hero.js: Meera, the 26-year-old food blogger from Pune who is the hero of Chennai (on a food trail, learning Tamil to talk to vendors).
 *
 * createHero(ink) -> Group (feet at y=0, facing +Z, 2.22 tall: full adult proportions, about the height of the local adults).
 * Plugs straight into engine/player.js (same contract as Chotu and Rohan): userData.animate(dt, {speed, walk, grounded, vr, time, phase}),
 * userData.radius, userData.rig, userData.setLookTarget(v), userData.playLoop('wave'), userData.playOnce('wave', 2).
 * Look: a short turmeric-yellow kurta with a white block print over blue jeans, white sneakers, black hair in a high messy bun (no flowers),
 * a camera on a strap across the chest, a tan leather sling bag on one hip, and a small red notebook with a pen in her right hand.
 * No NPC wears this combination (see variation.js notMeera).
 */
import { createPerson } from './person.js';
import { PASTEL, HAIR } from './kit.js';

export const HERO_SPEC = {
  detail: 'high', height: 2.22, build: 'normal', headScale: 1.1, legScale: 0.99, armScale: 1.03, torsoScale: 1.04, trim: null,
  skin: 0xe6b08a,
  outfit: 'kurtaPyjama', sleeves: 'short', skirtLen: 0.72, skirtFlare: 0.75, // a SHORT kurta: the jeans show below it
  top: 0xe3a82b, topPattern: 'dots', top2: 0xfff6dc, // turmeric kurta, white block-print dots
  bottom: 0x3f5f93, bottomPattern: 'plain', // blue jeans
  hair: { style: 'bun', color: HAIR.black },
  face: { eyes: 'dot', eyeScale: 1.0, brows: 'thin', lashes: true, blush: false, smile: 'big', smudge: false, freckles: false, bindi: 0xe05a4a },
  footwear: 'shoes', footColor: PASTEL.white,
  accessories: [
    { name: 'slingBag', color: 0xb9824f },
    'neckCamera',
    'notebook',
  ],
  gait: { stride: 0.66, knee: 1.2, armSwing: 0.5, bounce: 0.07, sway: 0.07, lean: 0.1, twist: 0.12, speed: 1.2 },
  seed: 26,
};

export function createHero(ink) {
  const hero = createPerson(HERO_SPEC, ink);
  hero.name = 'Meera';
  hero.userData.radius = 0.5;
  return hero;
}
export default createHero;
