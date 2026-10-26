/**
 * people/hero.js: Sameer, the 22-year-old fresh engineering graduate who has just moved to Hyderabad to find a job (and is learning Telugu).
 *
 * createHero(ink) -> Group (feet at y=0, facing +Z, 2.28 tall: full adult proportions, a touch taller than the average local).
 * Plugs straight into engine/player.js: userData.animate(dt, {speed, walk, grounded, vr, time, phase}),
 * userData.radius, userData.rig, userData.setLookTarget(v), userData.playLoop('wave'), userData.playOnce('wave', 2).
 * Look: neat black hair, a crisp pale-blue formal shirt with the sleeves rolled to the elbow, charcoal trousers, dark brown leather shoes, a belt,
 * a wristwatch, a small olive day pack, and a clear file folder of resumes held to his chest with the left arm. No lanyard, no check shirt,
 * no laptop bag, no phone: nothing of Bengaluru's Rohan. No NPC wears this combination (see variation.js notSameer).
 */
import { createPerson } from './person.js';
import { PASTEL, HAIR } from './kit.js';

export const HERO_SPEC = {
  detail: 'high', height: 2.28, build: 'normal', headScale: 1.1, legScale: 0.98, armScale: 1.04, torsoScale: 1.06, trim: null,
  skin: 0xdba67c,
  outfit: 'shirtTrousers', sleeves: 'short',
  top: 0xb9d3ee, topPattern: 'plain', top2: 0xfffaf0,
  bottom: 0x33384a, bottomPattern: 'plain',
  hair: { style: 'short', color: HAIR.black },
  face: { eyes: 'dot', eyeScale: 1.0, brows: 'thin', blush: false, smile: 'small', smudge: false, freckles: false },
  footwear: 'shoes', footColor: 0x3a2a24,
  accessories: [
    { name: 'backpack', color: 0x5f7a4c, color2: 0x46603a },
    'resumeFolder',
    'watch',
  ],
  hold: { armL: { x: 0.2, z: 0.2, e: 1.5, ez: -0.15 }, swing: 0.9 },
  gait: { stride: 0.66, knee: 1.2, armSwing: 0.5, bounce: 0.07, sway: 0.06, lean: 0.1, twist: 0.12, speed: 1.2 },
  seed: 22,
};

export function createHero(ink) {
  const hero = createPerson(HERO_SPEC, ink);
  hero.name = 'Sameer';
  hero.userData.radius = 0.5;
  return hero;
}
export default createHero;
