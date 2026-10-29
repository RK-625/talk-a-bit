// Hyderabad ("Mana Hyderabad"): world 3, a reskin of the Mumbai skeleton. See docs/HYDERABAD.md, layout.js (the map) and build.js (assembly).
import { createHero } from './people/index.js';
import { PLANET } from './ground.js';
import { buildWorld } from './build.js';
import { skyExtras } from './skyExtras.js';

export default {
  id: 'hyderabad',
  name: 'Mana Hyderabad',
  seed: 2026,
  planet: PLANET,
  sky: { paper: '#f3ead0', doodles: { sun: true, moon: true, clouds: 7, stars: 44, bunting: false }, extra: skyExtras },
  spawn: { dir: [0, 1, 0], facing: [0, 0, 1] },
  createHero: (ink) => createHero(ink),
  build(ctx) { return buildWorld(ctx); },
};
