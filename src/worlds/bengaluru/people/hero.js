/**
 * people/hero.js: Rohan, the 22-year-old tech intern from Delhi who is the hero of Bengaluru.
 *
 * createHero(ink) -> Group (feet at y=0, facing +Z, 2.28 tall: full adult proportions, a touch taller than the average local).
 * Plugs straight into engine/player.js (same contract as Chotu): userData.animate(dt, {speed, walk, grounded, vr, time, phase}),
 * userData.radius, userData.rig, userData.setLookTarget(v), userData.playLoop('wave'), userData.playOnce('wave', 2).
 * Look: neat black hair, bold red-and-navy checked shirt (sleeves rolled), khaki chinos, white sneakers, navy laptop backpack,
 * office ID badge on a bright blue lanyard, phone in the right hand. No NPC wears this combination (see variation.js notRohan).
 */
import { createPerson } from './person.js';
import { PASTEL, HAIR } from './kit.js';

export const HERO_SPEC = {
  detail: 'high', height: 2.28, build: 'normal', headScale: 1.1, legScale: 0.98, armScale: 1.04, torsoScale: 1.06, trim: null,
  skin: 0xe9b48c,
  outfit: 'shirtTrousers', sleeves: 'short',
  top: 0xd9574c, topPattern: 'checks', top2: 0x2f3b6d,
  bottom: 0xc2ad78, bottomPattern: 'plain',
  hair: { style: 'short', color: HAIR.black },
  face: { eyes: 'dot', eyeScale: 1.0, brows: 'thin', blush: false, smile: 'small', smudge: false, freckles: false },
  footwear: 'shoes', footColor: PASTEL.white,
  accessories: [
    { name: 'laptopBackpack', color: 0x2f3b6d, color2: 0x5a6aa6 },
    { name: 'lanyard', color: 0x2f6fe0, card: 0x2f6fe0 },
    'phone',
  ],
  gait: { stride: 0.66, knee: 1.2, armSwing: 0.5, bounce: 0.07, sway: 0.06, lean: 0.1, twist: 0.12, speed: 1.2 },
  seed: 22,
};

export function createHero(ink) {
  const hero = createPerson(HERO_SPEC, ink);
  hero.name = 'Rohan';
  hero.userData.radius = 0.5;
  return hero;
}
export default createHero;
