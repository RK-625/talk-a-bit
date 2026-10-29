// Mumbai ("Aamchi Mumbai"): world definition. See docs/MUMBAI.md, layout.js (the map) and build.js (assembly).
import { createHero } from './people/index.js';
import { PLANET } from './ground.js';
import { buildWorld } from './build.js';
import { skyExtras } from './skyExtras.js';

export default {
  id: 'mumbai',
  name: 'Aamchi Mumbai',
  seed: 2026,
  planet: PLANET,
  sky: { paper: '#f6e6c8', doodles: { sun: true, moon: true, clouds: 10, stars: 44, bunting: false }, extra: skyExtras },
  spawn: { dir: [0, 1, 0], facing: [0, 0, 1] },
  createHero: (ink) => createHero(ink),
  build(ctx) { return buildWorld(ctx); },
};
