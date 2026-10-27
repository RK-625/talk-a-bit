// Boot: no/unknown ?world= shows the home page (no engine, no music); ?world=<id> starts that world's engine.
// To add a world, add one line to WORLDS (and a card in src/home/home.js). Worlds import from ./engine only; the engine never imports a world.
const WORLDS = {
  'dozy-hollow': () => import('./worlds/dozy-hollow/index.js'),
  mumbai: () => import('./worlds/mumbai/index.js'),
  bengaluru: () => import('./worlds/bengaluru/index.js'),
  hyderabad: () => import('./worlds/hyderabad/index.js'),
  chennai: () => import('./worlds/chennai/index.js'),
  delhi: () => import('./worlds/delhi/index.js'),
  kerala: () => import('./worlds/kerala/index.js'),
};

const id = new URLSearchParams(location.search).get('world');
if (!Object.hasOwn(WORLDS, id ?? '')) {
  (await import('./home/home.js')).mountHome();
} else {
  const [{ createEngine }, { createMusic }, { mountHomeButton }] = await Promise.all([
    import('./engine/engine.js'),
    import('./game/audio/music.js'),
    import('./game/homeButton.js'),
  ]);
  const world = (await WORLDS[id]()).default;
  document.title = world.name;
  createEngine(world).start();
  mountHomeButton();

  const music = createMusic(); // starts on the first key/click; M toggles; ducks on 'talkabit:conversation'
  if (import.meta.env.DEV) window.__music = music;
}
