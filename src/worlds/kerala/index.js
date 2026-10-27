// Kerala ("Nammude Kochi"): world definition. See docs/KERALA.md, layout.js (the map) and build.js (assembly).
import { createHero } from './people/index.js';
import { PLANET } from './ground.js';
import { buildWorld } from './build.js';
import { skyExtras } from './skyExtras.js';

export default {
  id: 'kerala',
  name: 'Nammude Kochi',
  seed: 2026,
  planet: PLANET,
  sky: { paper: '#eef0e0', doodles: { sun: true, moon: true, clouds: 4, stars: 44, bunting: true }, extra: skyExtras },
  spawn: { dir: [0, 1, 0], facing: [0, 0, 1] },
  createHero: (ink) => createHero(ink),
  build(ctx) { return buildWorld(ctx); },
};
