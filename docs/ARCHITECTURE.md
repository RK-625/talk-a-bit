# Architecture: one engine, many worlds

Every world is a tiny planet drawn in the same ballpoint pen + colored pencil style.
The **engine** owns everything that is the same in every world; a **world** is only data and content.

```
src/
  main.js                 boot: pick world from ?world=<id> (default: mumbai once it exists), start engine
  engine/
    engine.js             createEngine(world): renderer, composer, loop, wiring of all below
    planet.js             createPlanet({radius, detail, heightFn, colorFn, sea}) -> {mesh, getSurfaceRadius, getSurfaceNormal, isWalkable}
    ink.js                createInkMaterial, addOutline, paper + normal/crease passes, INK_COLOR, PAPER_COLOR
    sky.js                createSky({paper, doodles}) — shared doodle painters (sun, moon, clouds, stars, bunting)
                          + a hook for world-specific doodles (kites, crows...)
    doodle.js             Canvas 2D helpers for wobbly ballpoint strokes/fills used by sky + props (faces, z's, signs)
    player.js             sphere movement, jump, collision vs colliders, walkability check; character-agnostic
    camera.js, input.js, quality.js
    scatter.js            generic seeded clustered placement on the sphere: place(spec, rng) -> instances
    actors.js             moving things on great-circle or custom paths (vehicles, trains, NPC strolls); moving segment colliders
    colliders.js          circle + segment (wall/rail/train-car capsule) colliders on the sphere
    place.js              placeOnSphere / registerAsset: assets -> sphere, local colliders (merged into segments) + walkable floors
    lod.js                distance + behind-the-planet culler (visibility flags, outline LOD) for big worlds
  worlds/
    dozy-hollow/          world 1 (the stage-1 world, unchanged look)
      index.js            world definition (see contract)
      props.js            trees, rocks, pebbles, flowers, mushrooms, tufts
      character.js        pink blob hero
    mumbai/               world 2
      index.js (definition), geo.js (coast, roads, rail as maths), layout.js (THE map: where everything goes),
      ground.js (terrain + paint), world.js (assembly helpers + instance bank), scenery.js, roads.js, rail.js,
      bridges.js, traffic.js, npcs.js, skyExtras.js, devtools.js (dev only), landmarks/, people/, props/
lab/                      dev-only pages: turntables (people.html, landmarks.html; &dist= zoom 2..250, right/shift-drag pans) and
                          map.html (top-down map of the Mumbai layout)
```

## World contract (`src/worlds/<id>/index.js`)
```js
export default {
  id: 'dozy-hollow',
  name: 'Dozy Hollow',
  planet: {
    radius: 50, detail: 26,
    heightFn(dir) -> number,               // radial offset, gentle
    colorFn(dir, height) -> { color, hatch, angle },  // per-face pastel + hatch strength + stroke angle
    sea: null | { level, color },          // optional water shell; below-sea land is not walkable
  },
  sky: { paper: '#ece6d6', doodles: { sun: true, moon: true, clouds: 10, stars: 44, bunting: true }, extra(skyApi) {} },
  spawn: { dir: [0,1,0], facing: [0,0,1] },
  createHero(ink) -> THREE.Group,          // feet at y=0, facing +Z, userData.rig for animation
  build(ctx) -> { colliders, update(dt, t) },  // ctx = { scene, camera, renderer, planet, ink, quality, rng, player, actors, colliders, placer, culler }
}
```
Engine never imports from a world folder. Worlds import only from `src/engine/`.

## Rules (all worlds)
- Plain JavaScript ES modules, Vite, three.js only. No TypeScript, no other runtime deps.
- No static image/model assets. Geometry from code, shaders, Canvas 2D textures at runtime.
- Desktop keyboard/mouse + mobile touch. Quality flag gates heavy work on touch devices.
- `npm run build` clean; no console errors.

## Engine additions for big worlds (Mumbai)
- `colliders`: `{dir,radius,height}` circles and `{a,b,radius,height}` segments (`setSegment`); the player slides off both.
  `actors.add(..., { collider: { radius, height, length } })` makes a moving segment collider (vehicles, train cars).
- `planet.addWalkableSurface({contains, heightAt, c?, cosR?})`: bridges, decks, platforms. The player steps up at most 0.5
  (`STEP_UP` in player.js): higher floors are walls unless you jump or use a ramp.
- `engine/place.js`: `placeOnSphere(group, dir, facing, {planet})`, `registerAsset(group, {planet, colliders})` (reads the
  asset's `userData.colliders` / `walkable`), `frameAt`, `localToDir`.
- `engine/lod.js`: `ctx.culler.add(obj, { maxDist, height, dynamic, outlineDist })`; `item.near` tells you whether to animate.
- `QUALITY.density` / `cullScale` / `touch` (`?quality=low` forces the touch settings on desktop); `engine.step(dt, draw)` advances
  the simulation without animation frames (scripted tests); dev only: `window.__game`, `window.__mumbai` (see worlds/mumbai/devtools.js).
