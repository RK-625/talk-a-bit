/**
 * people/hero.js: Rahul, the 23-year-old UPSC aspirant from Patna, in Delhi for civil-services coaching (docs/DELHI.md).
 *
 * createHero(ink) -> Group (feet at y=0, facing +Z, 2.28 tall: full adult proportions, a touch taller than the average local).
 * Plugs straight into engine/player.js: userData.animate(dt, {speed, walk, grounded, vr, time, phase}),
 * userData.radius, userData.rig, userData.setLookTarget(v), userData.playLoop('wave'), userData.playOnce('wave', 2).
 * Look: a mustard-turmeric kurta over dark-indigo jeans, round glasses, a thick stack of books pinned under the left arm, a khaki cloth jhola
 * slung over the right shoulder, brown sandals, short messy black hair, a wristwatch. No lanyard, no laptop, no backpack, no folder, no check shirt
 * (those are the other worlds' heroes). No NPC wears this combination (see variation.js notRahul).
 */
import { createPerson } from './person.js';
import { HAIR } from './kit.js';

export const HERO_SPEC = {
  detail: 'high', height: 2.28, build: 'normal', headScale: 1.1, legScale: 0.98, armScale: 1.04, torsoScale: 1.06, trim: null,
  skin: 0xd9a07a,
  outfit: 'kurtaPyjama', sleeves: 'long',
  top: 0xdca62e, topPattern: 'plain', top2: 0xfffaf0, // mustard kurta, falling over the jeans
  bottom: 0x2e3f6a, bottomPattern: 'plain', // dark-indigo jeans
  hair: { style: 'messy', color: HAIR.black },
  face: { eyes: 'dot', eyeScale: 1.0, brows: 'thin', blush: false, smile: 'small', smudge: false, freckles: false, specs: true },
  footwear: 'chappal', footColor: 0x8a5a3a, // brown sandals
  accessories: [
    { name: 'jhola', color: 0xc9a56a, size: 1.7, lift: 0.18 }, // khaki cloth jhola slung over the right shoulder
    'bookStack',
    'watch',
  ],
  hold: { armL: { x: 0.12, z: 0.3, e: 0.5, ez: -0.1 }, swing: 0.9 },
  gait: { stride: 0.66, knee: 1.2, armSwing: 0.5, bounce: 0.07, sway: 0.06, lean: 0.1, twist: 0.12, speed: 1.2 },
  seed: 23,
};

export function createHero(ink) {
  const hero = createPerson(HERO_SPEC, ink);
  hero.name = 'Rahul';
  hero.userData.radius = 0.5;
  return hero;
}
export default createHero;
