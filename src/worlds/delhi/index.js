// Delhi ("Apni Dilli"): world 6, a reskin of the Mumbai skeleton. See docs/DELHI.md, layout.js (the map) and build.js (assembly).
import { createHero } from './people/index.js';
import { PLANET } from './ground.js';
import { buildWorld } from './build.js';
import { skyExtras } from './skyExtras.js';

export default {
  id: 'delhi',
  name: 'Apni Dilli',
  seed: 2026,
  planet: PLANET,
  sky: { paper: '#f1e7d0', doodles: { sun: true, moon: true, clouds: 7, stars: 44, bunting: false }, extra: skyExtras },
  spawn: { dir: [0, 1, 0], facing: [0, 0, 1] },
  createHero: (ink) => createHero(ink),
  build(ctx) { return buildWorld(ctx); },
};
