/**
 * kerala/details.js: the small contextual things that make every site feel lived-in, placed through the assets' own
 * `userData.anchors` (local {x,y,z,facing}; facing = yaw, 0 faces the asset's +Z), plus the people who belong to them.
 *
 *   details(W, S, N, sites) -> { props: Map id -> group }
 *     S      scenery result (S.items: id -> placed group, S.promenade: promenade pieces)
 *     N      the npcs() API (person, citizen, couple, walker, bird)
 *     sites  { station, haji: {shrine, t0, shoreDist}, ... } things that are not in S.items
 * Every prop registers its real footprint (`userData.pad`) in layout.PLACED, so validate.js checks it like any other item.
 */
import * as THREE from 'three';
import * as P from './props/index.js';
import { place as layoutPlace, resolveAt } from './layout.js';
import { GEO, MARINE, PATHS, R, stepAlong, tangentTo, shorePoint, seaField, pathNearest, dist } from './geo.js';
import { freeSpot, nearCollider, onBridge, footprintOf } from './spots.js';
import { frameAt, localToDir } from '../../engine/place.js';
import { JUHU } from './layout.js';
import { population4 } from './population4.js';

const V3 = THREE.Vector3;
const FAR = 3.2; // units from an asset's origin beyond which its flat tangent plane no longer matches the ground
const POLE = new V3(0, 1, 0);
const FACT = {
  ferry: P.createFerry, elephanta: P.createElephantaBooth, tripod: P.createPhotographerTripod, dana: P.createDanaMat,
  vintageCar: P.createVintageCar, bull: P.createBullStatue, ticker: P.createStockTicker, tiffin: P.createTiffinPile,
  trolley: P.createLuggageTrolley, bookStall: P.createBookStall, marineBench: P.createMarineBench, toll: P.createTollBooth,
  chadar: P.createChadarStall, juice: P.createHajiAliJuice, pavBhaji: P.createPavBhajiStall, horse: P.createHorse,
  sandArt: P.createSandArt, bhutta: P.createBhuttaCart, coconut: P.createCoconutCart, carrom: P.createCarromBoard,
  tap: P.createCommonTap, rangoli: P.createRangoli, ganpati: P.createGanpatiPoster, puddle: P.createPuddle, bells: P.createTempleBells,
  offering: P.createOfferingStall, chappals: P.createChappalRow, timetable: P.createTimetableBoard, fastSlow: P.createFastSlowIndicator,
  platformChai: P.createPlatformChaiStall, stools: P.createStoolCluster, crates: P.createCrateStack, taxi: P.createTaxi,
};

export function details(W, S, N, sites = {}) {
  const { ink, planet } = W;
  const props = new Map();
  const warn = (what, e) => { if (import.meta.env.DEV) console.warn('[kerala details]', what, e?.message ?? e); };

  /** world pose of an anchor on a group: { dir, fwd, radius } (flat: stand on the group's base plane instead of at anchor.y) */
  function pose(g, name, off = [0, 0, 0], { flat = false, yaw = 0 } = {}) {
    const a = g.userData.anchors?.[name];
    if (!a) throw new Error(`no anchor "${name}" on ${g.name}`);
    g.updateMatrixWorld(true);
    const v = new V3(a.x + off[0], flat ? 0 : a.y + off[1], a.z + off[2]);
    g.localToWorld(v);
    const th = (a.facing ?? 0) + yaw;
    const fwd = new V3(Math.sin(th), 0, Math.cos(th)).transformDirection(g.matrixWorld);
    // anchors far from the asset's origin lie on its flat tangent plane, which rises above the curved ground: those stand on the ground instead
    return { dir: v.clone().normalize(), fwd, radius: v.length(), owner: g, far: Math.hypot(a.x + off[0], a.z + off[2]) > FAR, yoff: flat ? 0 : a.y + off[1] };
  }
  const local = (g, x, y, z, yaw = 0) => {
    g.updateMatrixWorld(true);
    const v = new V3(x, y, z); g.localToWorld(v);
    return { dir: v.clone().normalize(), fwd: new V3(Math.sin(yaw), 0, Math.cos(yaw)).transformDirection(g.matrixWorld), radius: v.length(), far: Math.hypot(x, z) > FAR, yoff: y, owner: g };
  };
  /** ground height (walkable surfaces included) to stand on for a far pose */
  const standR = (ps) => ps.far ? planet.getWalkRadius(ps.dir) + (ps.yoff ?? 0) : ps.radius;
  /** lowest ground under a w x d footprint centred on `dir` (so a prop on a slope never floats at its downhill corner) */
  const lowestGround = (dir, fwd, w, d) => {
    const fr = frameAt(dir, fwd, {});
    let lo = planet.getWalkRadius(dir);
    for (const [x, z] of [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]]) lo = Math.min(lo, planet.getWalkRadius(localToDir(fr, x * 0.8, z * 0.8, R, new V3())));
    return lo;
  };

  /** place a prop at a pose, registering its footprint for validation */
  function prop(kind, id, ps, o = {}) {
    const g = FACT[kind](ink, o.opts);
    g.name = id;
    const pad0 = g.userData.pad ?? { w: 2, d: 2 };
    const settled = o.ground ? lowestGround(ps.dir, ps.fwd, pad0.w, pad0.d) : ps.far ? Math.max(lowestGround(ps.dir, ps.fwd, pad0.w, pad0.d), planet.getWalkRadius(ps.dir) - 0.6) : null; // every prop stands on the real ground
    W.add(g, { dir: ps.dir, fwd: ps.fwd, radius: settled ?? ps.radius, maxDist: o.maxDist ?? 52, collide: o.collide !== false, walkable: !!o.walkable, occlude: false, height: o.height ?? 3 });
    const pad = g.userData.pad ?? { w: 2, d: 2 };
    if (!o.free) layoutPlace({ id, kind, at: { fixed: ps }, size: [pad.w, pad.d], inside: o.inside, noOverlap: o.noOverlap });
    clearScatter(g);
    props.set(id, g);
    return g;
  }
  /** palms / umbrellas / banyans / sandcastles are scattered before the detail props exist: remove any whose canopy reaches a prop's footprint */
  const _l = new V3();
  function clearScatter(g, margin = 0.8) {
    const fp = footprintOf(g);
    if (!fp) return;
    W.bank.removeWhere((d) => {
      _l.copy(d.dir).multiplyScalar(g.position.length()).applyMatrix4(fp.inv);
      const dx = Math.max(fp.x0 - _l.x, 0, _l.x - fp.x1), dz = Math.max(fp.z0 - _l.z, 0, _l.z - fp.z1);
      return Math.hypot(dx, dz) < d.r * margin + 0.1;
    });
  }
  const clearAt = (dir, r = 0.5) => W.bank.removeWhere((d) => d.dir.dot(dir) > Math.cos((d.r + r) / R) && dist(d.dir, dir) < d.r * 0.5 + r + 0.2);
  const safe = (what, f) => { try { f(); } catch (e) { warn(what, e); } };
  const person = (role, o, ps) => { clearAt(ps.dir); return N.person(role, { ...o, owner: ps.owner }, ps.dir, ps.fwd, standR(ps)); };
  const citizen = (seed, o, ps) => { clearAt(ps.dir); return N.citizen(seed, { ...o, owner: ps.owner }, ps.dir, ps.fwd, standR(ps)); };
  const seat = (seed, kind, h, ps, loop = 'sit', id = undefined) => { clearAt(ps.dir); return N.citizen(seed, { kind, loop, seatHeight: h, owner: ps.owner, id }, ps.dir, ps.fwd, standR(ps)); };
  const flatPose = (g, name, off, opts) => pose(g, name, off, { flat: true, ...opts });
  /** path (array of dirs) from local points of a group */
  const pathOf = (g, pts) => pts.map(([x, y, z]) => local(g, x, y, z).dir);

  /** open ground for a free-standing person: land, off the road / rail / lane / promenade, clear of every footprint and collider */
  const okSpot = (d, near = 1.6, roadM = 5.4) => planet.getSurfaceRadius(d) > W.seaR + 0.7 && seaField(d) < -6 && freeSpot(d, near + 1) && pathNearest(d, ['road', 'rail', 'lane', 'promenade']).d > roadM && !nearCollider(W.colliders, d, near);

  for (const g of S.items.values()) clearScatter(g, 0.7); // the big landmarks / shops / chawls too

  // ============================== Gateway =========================================================================
  safe('gateway', () => {
    const gw = S.items.get('gateway');
    const booth = prop('elephanta', 'elephantaBooth', pose(gw, 'ferryBooth'), { inside: 'gateway' });
    citizen(41, { kind: 'man', loop: 'idle', id: 'gateway-ferry-clerk' }, pose(booth, 'clerk'));
    person('tourist', { seed: 42, convo: true, id: 'tourist' }, pose(booth, 'queue', [-0.6, 0, 0]));
    const tripod = prop('tripod', 'tripod', pose(gw, 'photographer'), { inside: 'gateway' });
    person('photographer', { seed: 44, props: false, convo: true, id: 'photographer' }, pose(tripod, 'photographer'));
    const dana = prop('dana', 'danaMat', pose(gw, 'pigeonFeeder'), { inside: 'gateway' });
    sites.danaPose = pose(dana, 'feeder'); // (the pigeon feeder herself was cut with the small-cast pass; the dana mat and flock stay)
    safe('ferry', () => {
      prop('ferry', 'ferry', { ...local(gw, 9.5, 0, 20.8, Math.PI / 2), far: false, radius: W.seaR - 0.3 }, { collide: false, ground: false, free: true, maxDist: 90, height: 6 });
    });
  });
  // Taj
  safe('taj', () => {
    const taj = S.items.get('taj');
    person('doorman', { seed: 48, wave: true, id: 'taj-doorman' }, pose(taj, 'doorman'));
    const car = prop('vintageCar', 'vintageCar', pose(taj, 'vintageCar'), { inside: 'taj' });
    void car;
  });
  // CST
  safe('cst', () => {
    const cst = S.items.get('cst');
    person('coolie', { seed: 50, convo: true, id: 'coolie' }, pose(cst, 'coolieA'));
    const tiffin = prop('tiffin', 'tiffinPile', pose(cst, 'tiffinSorting'), { inside: 'cst' });
    person('dabbawala', { seed: 52, loop: false, id: 'cst-tiffin-sorter' }, pose(tiffin, 'sorterA'));
    const trolley = prop('trolley', 'luggageTrolley', pose(cst, 'luggageTrolley'), { inside: 'cst' });
    void trolley;
    const lane = (z) => pathOf(cst, [[-9, 0.05, z], [-3, 0.05, z + 0.5], [4, 0.05, z], [10, 0.05, z + 0.5]]);
    N.walker('officeGoer', { seed: 58, id: 'cst-officegoer' }, lane(9.5), 1.7);
  });
  // BSE
  safe('bse', () => {
    const bse = S.items.get('bse');
    const bull = prop('bull', 'bull', pose(bse, 'bull'), { inside: 'bse' });
    person('tourist', { seed: 61, loop: 'snap', id: 'bse-bull-tourist' }, pose(bull, 'selfie'));
    const tk = prop('ticker', 'stockTicker', pose(bse, 'ticker'), { inside: 'bse' });
    person('securityGuard', { seed: 64, id: 'bse-guard' }, pose(bse, 'guard'));
  });
  // Rajabai + Flora
  safe('rajabai', () => {
    const rj = S.items.get('rajabai');
    const stall = prop('bookStall', 'bookStall', pose(rj, 'bookSeller'), { inside: 'rajabai' });
    person('bookSeller', { seed: 65, id: 'rajabai-book-seller' }, pose(stall, 'seller'));
    person('studentWithBooks', { seed: 67, id: 'rajabai-student-a' }, pose(rj, 'student', [0, 0, -0.4], { yaw: 2.4 }));
  });

  // ============================== Marine Drive ====================================================================
  safe('marine', () => {
    const pcs = S.promenade ?? [];
    const benchAt = [3, 9, 15];
    benchAt.forEach((k, bi) => {
      const pc = pcs[k]; if (!pc) return;
      const ps = flatPose(pc, 'benchSeat', [0, 0, 0.1], { yaw: Math.PI });
      const bench = prop('marineBench', 'bench' + bi, ps, { collide: true });
      if (bi === 0) seat(72, 'man', 0.74, pose(bench, 'seatL', [0, 0, 0], { flat: true }), 'sit', 'marine-bench-man');
    });
    [12].forEach((k, ci) => {
      const pc = pcs[k]; if (!pc) return;
      const ps = flatPose(pc, 'parapetSeat', [0, 0, 0.05], { yaw: 0 });
      ps.radius = pc.position.length() + 0.0;
      N.couple(81 + ci, { seatHeight: 1.12, id: 'marine-couple' }, ps.dir, ps.fwd, ps.radius);
    });
    const ch = pcs[1];
    if (ch) person('chanaSeller', { seed: 90, id: 'marine-chana-seller' }, flatPose(ch, 'jogger', [0, 0, 0]));
    // a jogger loops the promenade
    const arc = (a0, a1, off) => { const out = []; for (let i = 0; i <= 8; i++) out.push(MARINE.pt(a0 + (a1 - a0) * (i / 8), off)); return out; };
    N.walker('jogger', { seed: 91, id: 'marine-jogger' }, arc(-44, 44, 2.2), 3.4);
  });

  // ============================== Haji Ali ========================================================================
  safe('haji', () => {
    const h = sites.haji; if (!h) return;
    const sh = h.shrine;
    const c = sh.userData.placement.dir;
    const stallA = prop('chadar', 'chadarA', pose(sh, 'flowerSeller', [-1.0, 0, 0]), { inside: 'haji' });
    person('pilgrim', { seed: 100, variant: 1, id: 'haji-chadar-seller' }, pose(stallA, 'seller'));
    const sp = pose(sh, 'flowerSeller', [8.6, 0, 0]);
    prop('chadar', 'chadarB', sp, { inside: 'haji' });
    person('pilgrim', { seed: 102, variant: 0, convo: true, id: 'pilgrim' }, pose(sh, 'pilgrimGate', [2.2, 0, 0.4]));
    // juice centre on the shore where the causeway starts
    const t0 = h.t0;
    const shoreBase = stepAlong(c, t0, h.shoreDist + 6.5);
    const side = new V3().crossVectors(shoreBase, t0).normalize();
    const jp = stepAlong(shoreBase, side, 7);
    const juice = prop('juice', 'hajiJuice', { dir: jp, fwd: tangentTo(jp, shoreBase), radius: null }, { ground: true });
    person('chanaSeller', { seed: 103, id: 'haji-juice-man' }, pose(juice, 'juiceMan'));
  });

  // ============================== Antilia =========================================================================
  safe('antilia', () => {
    const an = S.items.get('antilia'); if (!an) return;
    person('securityGuard', { seed: 110, convo: true, id: 'securityGuard' }, pose(an, 'guardBooth'));
    person('watchman', { seed: 111, wave: true, id: 'antilia-gate-watchman' }, pose(an, 'gateGuard'));
    person('sweeper', { seed: 112, id: 'antilia-mali' }, pose(an, 'mali'));
    const line = pose(an, 'carLine');
    for (let i = 0; i < 3; i++) {
      const ps = local(an, 3.5 + i * 0 - 0, 0, 13 + 0, 0);
      void ps;
    }
    for (let i = 0; i < 3; i++) {
      const ps = pose(an, 'carLine', [i * 6.8 - 6.8, 0, -0.7]);
      prop(i === 1 ? 'vintageCar' : 'taxi', 'antiliaCar' + i, ps, { inside: 'antilia', opts: i === 1 ? undefined : { seed: 20 + i } });
    }
    void line;
  });

  // ============================== Juhu ============================================================================
  safe('juhu', () => {
    const spot = (b, depth) => { const d = shorePoint(b, depth); return { dir: d, fwd: tangentTo(d, POLE).negate(), radius: null }; };
    const mk = (kind, id, b, depth) => prop(kind, id, spot(b, depth), { ground: true });
    const pb = mk('pavBhaji', 'pavBhaji', 183, 10.5);
    person('bhuttaSeller', { seed: 120, props: false, id: 'juhu-pavbhaji-cook' }, pose(pb, 'cook'));
    const bh = mk('bhutta', 'bhutta', 176, 10.5);
    person('bhuttaSeller', { seed: 123, props: false, id: 'juhu-bhutta-seller' }, pose(bh, 'seller'));
    const co = mk('coconut', 'coconut', 202, 10.5);
    person('coconutSeller', { seed: 125, props: false, id: 'juhu-coconut-seller' }, pose(co, 'seller'));
    const hs = mk('horse', 'horse', 208, 8.5);
    citizen(127, { kind: 'kid', loop: 'wave', id: 'juhu-horse-rider-kid' }, pose(hs, 'rider'));
    const sa = mk('sandArt', 'sandArt', 171, 7.5);
    citizen(129, { kind: 'man', loop: 'idle', id: 'juhu-sand-artist' }, pose(sa, 'artist'));
    const kd = shorePoint(196, 6);
    person('beachKid', { seed: 132, loop: 'play', id: 'juhu-gola-kid' }, { dir: kd, fwd: tangentTo(kd, POLE).applyAxisAngle(kd, 1.7), radius: null });
  });

  // ============================== temple + chowk + chawls ==========================================================
  safe('temple', () => {
    const sh = S.items.get('shrine'); if (!sh) return;
    // The shrine's real footprint is its plinth + front steps: x in +-2.1, z in -2.2 .. 2.25 (local, front = +z). Everything else keeps clear of it.
    person('priest', { seed: 150, convo: true, id: 'priest' }, pose(sh, 'priest'));
    // bell torana across the approach, in front of the steps (a gap in the middle stays open)
    const bells = prop('bells', 'templeBells', local(sh, 0, 0, 4.2, 0), { inside: 'shrine', collide: false });
    citizen(151, { kind: 'woman', loop: 'idle', id: 'temple-bell-devotee' }, pose(bells, 'devotee'));
    // the coconut / flower stall: left of the approach, turned to face the path (+x), clear of the plinth
    const off = prop('offering', 'offeringStall', local(sh, -4.7, 0, 0.8, Math.PI / 2), { inside: 'shrine' });
    person('pilgrim', { seed: 152, variant: 1, loop: 'pray', id: 'temple-offering-pilgrim' }, pose(off, 'devotee'));
    // shoes: right of the approach, on open ground, facing the path (-x)
    prop('chappals', 'chappalRow', local(sh, 3.2, 0, 3.8, -Math.PI / 2), { inside: 'shrine', collide: false });
  });
  safe('chawls', () => {
    const c1 = S.items.get('ch1'), c2 = S.items.get('ch2'), c3 = S.items.get('ch3');
    if (c1) {
      const cr = prop('carrom', 'carrom', pose(c1, 'carrom'), { inside: 'ch1', collide: false });
      seat(160, 'man', 0.38, pose(cr, 'seatN', [0, 0, 0], { flat: true }), 'sit', 'chawl-carrom-man');
      seat(161, 'elder', 0.38, pose(cr, 'seatS', [0, 0, 0], { flat: true }), 'sit', 'chawl-carrom-elder');
    }
    if (c2) {
      const tp = prop('tap', 'commonTap', pose(c2, 'tap'), { inside: 'ch2' });
      citizen(163, { kind: 'woman', loop: 'idle', id: 'chawl-tap-woman' }, pose(tp, 'waiter'));
    }
    if (c3) {
      prop('rangoli', 'rangoli3', pose(c3, 'rangoli'), { inside: c3.name, collide: false, noOverlap: true });
    }
  });
  safe('station', () => {
    const st = sites.station; if (!st) return;
    const tt = prop('timetable', 'timetable', pose(st, 'ticketWindow', [-3.4, 0, -0.6]), { inside: 'station' });
    person('commuter', { seed: 170, convo: true, id: 'commuter' }, pose(tt, 'reader'));
    prop('fastSlow', 'fastSlow', pose(st, 'commuterA', [-2.6, 0, -1.2]), { inside: 'station', collide: false });
    const chai = prop('platformChai', 'platformChai', pose(st, 'chaiStall', [7.0, 0, 0.1]), { inside: 'station' });
    person('chaiwalaUncle', { seed: 172, id: 'station-chaiwala' }, pose(chai, 'chaiwala'));
    person('ladiesCommuter', { seed: 174, id: 'station-ladies-a' }, pose(st, 'edge', [-8.2, 0, -0.1], { yaw: 0 }));
  });
  safe('chowk', () => {
    const sp = (x, z, yaw = 0) => { const r = resolveAt({ sp: [x, z] }); return { dir: r.dir, fwd: r.fwd.clone().applyAxisAngle(r.dir, -yaw), radius: null }; };
    const stoolsA = prop('stools', 'stoolsA', sp(-5.5, -9), {});
    const stoolsB = prop('stools', 'stoolsB', sp(13.4, 11.4), {});
    prop('crates', 'cratesA', sp(8.2, -10.8), {});
    prop('crates', 'cratesB', sp(-11.5, -9.2), {});
    prop('puddle', 'puddle1', sp(5.5, -8.2), { collide: false, noOverlap: true });
    prop('puddle', 'puddle2', sp(-5.6, 7.4), { collide: false, noOverlap: true });
    prop('puddle', 'puddle3', sp(3.4, 7.8), { collide: false, noOverlap: true });
    prop('rangoli', 'rangoliChowk', sp(4.2, -3.2), { collide: false, noOverlap: true });
    prop('ganpati', 'ganpatiPoster', sp(4.2, 11.8, Math.PI), {});
    // gully games: a kid crouched over marbles, one skipping rope, one flying a kite (never the beach arms-out pose)
    const m1 = sp(-5.2, -2.2), m2 = sp(-4.0, -2.0);
    person('beachKid', { seed: 192, loop: 'skip', id: 'chowk-skip-girl' }, sp(-8.0, -0.6, 0.5)); // open ground in the chowk: the rope needs ~1 unit of room all round
    person('beachKid', { seed: 193, loop: 'kite', id: 'chowk-kite-boy' }, sp(-2.6, -6.6, 0.4));
  });

  // ============================== Sea Link toll booth (placed by layout.js on the approach road, built by scenery.js) ==========
  safe('toll', () => {
    const tb = S.items.get('tollBooth'); if (!tb) return;
    props.set('tollBooth', tb);
    // the attendant stands on the footpath beside the canopy post, facing the lanes (never inside the booth)
    person('watchman', { seed: 196, id: 'toll-attendant' }, local(tb, -4.5, 0, 0.2, Math.PI / 2));
  });

  ambient();
  // pass 4: the second ~65 people (named, anchored at sites, plus the frozen farthest-point fills), placed after everyone else so nobody moves
  safe('population4', () => population4({ W, S, N, props, sites, pose, local, person, citizen, pathOf, okSpot, standR }));
  return { props };

  // ============================== everyday Mumbaikars ==============================================================
  /** a few citizens where nobody else stands (farthest-point filling): the cast is deliberately small, so these only plug the biggest empty
   *  stretches of land. Everyone is a named, talkable Mumbaikar ('street-1' ...). */
  function ambient() {
    const rnd = W.rng;
    const maxN = 10, gapTarget = 17;
    const loops = ['idle', 'phone', 'chat', 'news', 'idle'];
    const kinds = ['man', 'woman', 'teen', 'elder', 'man', 'woman', 'elder', 'teen'];
    const have = N.npcs.map((e) => (e.walker ? e.actor.dir : e.dir));
    const cands = [];
    for (let tries = 0; tries < 14000 && cands.length < 1500; tries++) {
      const z = rnd() * 2 - 1, th = rnd() * 6.2832, rr = Math.sqrt(1 - z * z);
      const d = new V3(rr * Math.cos(th), z, rr * Math.sin(th));
      if (okSpot(d)) cands.push(d);
    }
    const minD = cands.map((c) => { let m = 1e9; for (const h of have) { const dd = dist(c, h); if (dd < m) m = dd; } return m; });
    const placedAt = [];
    while (placedAt.length < maxN) {
      let bi = -1, best = gapTarget;
      for (let i = 0; i < cands.length; i++) if (minD[i] > best) { best = minD[i]; bi = i; }
      if (bi < 0) break;
      const d = cands[bi];
      placedAt.push(d);
      for (let i = 0; i < cands.length; i++) { const dd = dist(cands[i], d); if (dd < minD[i]) minD[i] = dd; }
      const k = placedAt.length;
      const t = tangentTo(d, POLE).applyAxisAngle(d, rnd() * 6.28);
      citizen(300 + k * 7, { kind: kinds[(k - 1) % kinds.length], loop: loops[Math.floor(rnd() * loops.length)], id: 'street-' + k }, { dir: d, fwd: t, radius: null });
    }
    props.set('_ambientCount', placedAt.length);
  }
}
