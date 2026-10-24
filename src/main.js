// Boot: pick a world with ?world=<id> (default: dozy-hollow) and start the engine.
// To add a world, add one line to WORLDS. Worlds import from ./engine only; the engine never imports a world.
import { createEngine } from './engine/engine.js';

const WORLDS = {
  'dozy-hollow': () => import('./worlds/dozy-hollow/index.js'),
};
const DEFAULT_WORLD = 'dozy-hollow';

const id = new URLSearchParams(location.search).get('world') ?? DEFAULT_WORLD;
const load = WORLDS[id] ?? WORLDS[DEFAULT_WORLD];
const world = (await load()).default;
document.title = world.name;
createEngine(world).start();
