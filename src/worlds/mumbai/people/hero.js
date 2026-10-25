/**
 * people/hero.js: Chotu, the ~10-year-old chaiwala kid and hero of Mumbai.
 *
 * createHero(ink) -> Group (feet at y=0, facing +Z, 1.6 tall, big head, short legs). Plugs straight into engine/player.js:
 *   userData.animate(dt, {speed, walk, grounded, vr, time, phase}), userData.radius, userData.rig (fallback contract),
 *   userData.setLookTarget(v), userData.playLoop('wave'), userData.playOnce('wave', 2).
 * Messy hair, half-sleeve striped shirt (marigold + cream), faded-blue shorts, rubber chappals, red gamcha on the shoulder,
 * steel kettle in the right hand, wire carrier of cutting-chai glasses in the left (the glasses jiggle when he runs).
 */
import { createPerson } from './person.js';
import { PASTEL, HAIR } from './kit.js';

export const HERO_SPEC = {
  detail: 'high', height: 1.6, build: 0.92, headScale: 1.46, legScale: 0.72, armScale: 0.85, torsoScale: 0.85, trim: 0xfffaf0,
  skin: 0xe2a57b,
  outfit: 'shirtShorts', sleeves: 'short',
  top: PASTEL.marigold, topPattern: 'stripes', top2: 0xfff4d6,
  bottom: 0x8db4de, bottomPattern: 'plain',
  hair: { style: 'messy', color: HAIR.black },
  face: { eyes: 'dot', eyeScale: 1.28, blush: true, smile: 'big', smudge: true, freckles: false },
  footwear: 'chappal', footColor: 0xe9776a,
  accessories: [{ name: 'gamcha', slot: 'shoulderL', color: PASTEL.red }, 'kettle', 'wireCarrier'],
  hold: { armR: { x: 0.12, z: 0.2, e: 0.45 }, armL: { x: 0.12, z: 0.2, e: 0.55 }, swing: 0.45 },
  gait: { stride: 0.6, knee: 1.35, armSwing: 0.4, bounce: 0.09, sway: 0.08, lean: 0.12, twist: 0.14, speed: 1.2 },
  seed: 7,
};

export function createHero(ink) {
  const hero = createPerson(HERO_SPEC, ink);
  hero.name = 'Chotu';
  hero.userData.radius = 0.46;
  return hero;
}
export default createHero;
