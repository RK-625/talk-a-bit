// Boot: pick a world with ?world=<id> (default: mumbai; ?world=dozy-hollow for the stage-1 world) and start the engine.
// To add a world, add one line to WORLDS. Worlds import from ./engine only; the engine never imports a world.
import { createEngine } from './engine/engine.js';

const WORLDS = {
  'dozy-hollow': () => import('./worlds/dozy-hollow/index.js'),
  mumbai: () => import('./worlds/mumbai/index.js'),
};
const DEFAULT_WORLD = 'mumbai';

const id = new URLSearchParams(location.search).get('world') ?? DEFAULT_WORLD;
const load = WORLDS[id] ?? WORLDS[DEFAULT_WORLD];
const world = (await load()).default;
document.title = world.name;
createEngine(world).start();
