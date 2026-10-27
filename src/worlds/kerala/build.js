/**
 * kerala/build.js: assembles the world from the data in layout.js / geo.js.
 *   scenery (landmarks, shops, stalls, Marine Drive) -> roads (lane dashes, lamp posts, trees) -> rail (track, station,
 *   crossings, train) -> bridges (Sea Link, Haji Ali, boats) -> traffic -> npcs. Returns { update(dt, t) } for the engine.
 */
import { makeWorld } from './world.js';
import { scenery } from './scenery.js';
import { roads } from './roads.js';
import { rail } from './rail.js';
import { bridges } from './bridges.js';
import { traffic } from './traffic.js';
import { npcs } from './npcs.js';
import { details } from './details.js';
import { BRIDGE, stepAlong } from './geo.js';
import { installDevTools } from './devtools.js';
import { validateWorld } from './validate.js';

export function buildWorld(ctx) {
  const t0 = performance.now();
  const W = makeWorld(ctx);
  const S = scenery(W);
  roads(W, S);
  const R = rail(W);
  const B = bridges(W);
  const T = traffic(W);
  const N = npcs(W, S);
  const side = BRIDGE.center.clone().cross(BRIDGE.t).normalize();
  const tb = stepAlong(stepAlong(BRIDGE.start, BRIDGE.t, -2), side, 9);
  const D = details(W, S, N, { station: R.station, haji: B.haji, bridgeStart: { dir: tb, fwd: BRIDGE.t.clone().negate(), radius: null } });
  W.updaters.push(N.update);
  W.bank.build();
  if (import.meta.env.DEV) {
    console.log(`[kerala] built in ${(performance.now() - t0).toFixed(0)} ms: ${ctx.culler.items.length} culled items, ${ctx.colliders.list.length} colliders, ${W.bank.count()} instances`);
    installDevTools(W, { S, R, B, T, N, D });
    window.__keralaValidation = validateWorld(W, { T, S, N, D });
  }
  return {
    update(dt, t) { for (let i = 0; i < W.updaters.length; i++) W.updaters[i](dt, t); },
  };
}
