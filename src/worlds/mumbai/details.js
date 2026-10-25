/**
 * mumbai/details.js: the small contextual things that make every site feel lived-in, placed through the assets' own
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
import { freeSpot, nearCollider, onBridge } from './spots.js';
import { JUHU } from './layout.js';

const V3 = THREE.Vector3;
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
  const warn = (what, e) => { if (import.meta.env.DEV) console.warn('[mumbai details]', what, e?.message ?? e); };

  /** world pose of an anchor on a group: { dir, fwd, radius } (flat: stand on the group's base plane instead of at anchor.y) */
  function pose(g, name, off = [0, 0, 0], { flat = false, yaw = 0 } = {}) {
    const a = g.userData.anchors?.[name];
    if (!a) throw new Error(`no anchor "${name}" on ${g.name}`);
    g.updateMatrixWorld(true);
    const v = new V3(a.x + off[0], flat ? 0 : a.y + off[1], a.z + off[2]);
    g.localToWorld(v);
    const th = (a.facing ?? 0) + yaw;
    const fwd = new V3(Math.sin(th), 0, Math.cos(th)).transformDirection(g.matrixWorld);
    return { dir: v.clone().normalize(), fwd, radius: v.length() };
  }
  const local = (g, x, y, z, yaw = 0) => {
    g.updateMatrixWorld(true);
    const v = new V3(x, y, z); g.localToWorld(v);
    return { dir: v.clone().normalize(), fwd: new V3(Math.sin(yaw), 0, Math.cos(yaw)).transformDirection(g.matrixWorld), radius: v.length() };
  };

  /** place a prop at a pose, registering its footprint for validation */
  function prop(kind, id, ps, o = {}) {
    const g = FACT[kind](ink, o.opts);
    g.name = id;
    W.add(g, { dir: ps.dir, fwd: ps.fwd, radius: o.ground ? null : ps.radius, maxDist: o.maxDist ?? 52, collide: o.collide !== false, walkable: !!o.walkable, occlude: false, height: o.height ?? 3 });
    const pad = g.userData.pad ?? { w: 2, d: 2 };
    if (!o.free) layoutPlace({ id, kind, at: { fixed: ps }, size: [pad.w, pad.d], inside: o.inside, noOverlap: o.noOverlap });
    props.set(id, g);
    return g;
  }
  const safe = (what, f) => { try { f(); } catch (e) { warn(what, e); } };
  const person = (role, o, ps) => N.person(role, o, ps.dir, ps.fwd, ps.radius);
  const citizen = (seed, o, ps) => N.citizen(seed, o, ps.dir, ps.fwd, ps.radius);
  const seat = (seed, kind, h, ps, loop = 'sit') => N.citizen(seed, { kind, loop, seatHeight: h }, ps.dir, ps.fwd, ps.radius);
  const flatPose = (g, name, off, opts) => pose(g, name, off, { flat: true, ...opts });
  /** path (array of dirs) from local points of a group */
  const pathOf = (g, pts) => pts.map(([x, y, z]) => local(g, x, y, z).dir);

  // ============================== Gateway =========================================================================
  safe('gateway', () => {
    const gw = S.items.get('gateway');
    const booth = prop('elephanta', 'elephantaBooth', pose(gw, 'ferryBooth'), { inside: 'gateway' });
    citizen(41, { kind: 'man', loop: 'idle' }, pose(booth, 'clerk'));
    person('tourist', { seed: 42 }, pose(booth, 'queue', [-0.6, 0, 0]));
    person('tourist', { seed: 43, variant: 1 }, pose(booth, 'queue', [0.7, 0, 0.9]));
    const tripod = prop('tripod', 'tripod', pose(gw, 'photographer'), { inside: 'gateway' });
    person('photographer', { seed: 44, props: false }, pose(tripod, 'photographer'));
    person('tourist', { seed: 45, variant: 0, loop: 'pose' }, pose(tripod, 'client'));
    const dana = prop('dana', 'danaMat', pose(gw, 'pigeonFeeder'), { inside: 'gateway' });
    citizen(46, { kind: 'woman', loop: 'idle' }, pose(dana, 'feeder'));
    sites.danaPose = pose(dana, 'feeder');
    safe('ferry', () => {
      const ferry = prop('ferry', 'ferry', { ...local(gw, 9.5, 0, 17.5, Math.PI / 2), radius: W.seaR - 0.3 }, { collide: false, ground: false, free: true, maxDist: 90, height: 6 });
      citizen(47, { kind: 'man', loop: 'idle' }, pose(ferry, 'captain'));
    });
  });
  // Taj
  safe('taj', () => {
    const taj = S.items.get('taj');
    person('doorman', { seed: 48, wave: true }, pose(taj, 'doorman'));
    const car = prop('vintageCar', 'vintageCar', pose(taj, 'vintageCar'), { inside: 'taj' });
    citizen(49, { kind: 'man', loop: 'phone' }, pose(taj, 'bellboy'));
    void car;
  });
  // CST
  safe('cst', () => {
    const cst = S.items.get('cst');
    person('coolie', { seed: 50 }, pose(cst, 'coolieA'));
    person('coolie', { seed: 51 }, pose(cst, 'coolieB'));
    const tiffin = prop('tiffin', 'tiffinPile', pose(cst, 'tiffinSorting'), { inside: 'cst' });
    person('dabbawala', { seed: 52, loop: false }, pose(tiffin, 'sorterA'));
    person('dabbawala', { seed: 53, loop: false }, pose(tiffin, 'sorterB'));
    const trolley = prop('trolley', 'luggageTrolley', pose(cst, 'luggageTrolley'), { inside: 'cst' });
    person('coolie', { seed: 54 }, pose(trolley, 'coolie'));
    for (let i = 0; i < 3; i++) person('commuter', { seed: 55 + i, variant: i % 2 }, pose(cst, 'commuters', [-3.2 + i * 3.4, 0, 0.6 + (i % 2) * 1.2], { yaw: (i - 1) * 0.5 }));
    const lane = (z) => pathOf(cst, [[-9, 0.05, z], [-3, 0.05, z + 0.5], [4, 0.05, z], [10, 0.05, z + 0.5]]);
    N.walker('officeGoer', { seed: 58 }, lane(9.5), 1.7);
    N.walker('officeGoer', { seed: 59, variant: 1 }, lane(10.6), 1.5, 0.5);
  });
  // BSE
  safe('bse', () => {
    const bse = S.items.get('bse');
    const bull = prop('bull', 'bull', pose(bse, 'bull'), { inside: 'bse' });
    citizen(60, { kind: 'woman', loop: 'chat' }, pose(bull, 'admirer'));
    person('tourist', { seed: 61, loop: 'snap' }, pose(bull, 'selfie'));
    const tk = prop('ticker', 'stockTicker', pose(bse, 'ticker'), { inside: 'bse' });
    person('officeGoer', { seed: 62 }, pose(tk, 'reader', [-0.7, 0, 0]));
    person('officeGoer', { seed: 63, variant: 1 }, pose(tk, 'reader', [0.8, 0, 0.4]));
    person('securityGuard', { seed: 64 }, pose(bse, 'guard'));
  });
  // Rajabai + Flora
  safe('rajabai', () => {
    const rj = S.items.get('rajabai');
    const stall = prop('bookStall', 'bookStall', pose(rj, 'bookSeller'), { inside: 'rajabai' });
    person('bookSeller', { seed: 65 }, pose(stall, 'seller'));
    citizen(66, { kind: 'teen', loop: 'idle' }, pose(stall, 'browser'));
    for (let i = 0; i < 3; i++) person('studentWithBooks', { seed: 67 + i }, pose(rj, 'student', [i * 1.1, 0, i * 0.9 - 0.4], { yaw: 2.4 + i * 0.4 }));
    const fl = S.items.get('flora');
    seat(70, 'man', 0.45, pose(fl, 'sitterA', [0, 0, 0], { flat: true }));
    seat(71, 'elder', 0.45, pose(fl, 'sitterB', [0, 0, 0], { flat: true }));
  });

  // ============================== Marine Drive ====================================================================
  safe('marine', () => {
    const pcs = S.promenade ?? [];
    const benchAt = [3, 9, 15];
    benchAt.forEach((k, bi) => {
      const pc = pcs[k]; if (!pc) return;
      const ps = flatPose(pc, 'benchSeat', [0, 0, 0.1], { yaw: Math.PI });
      const bench = prop('marineBench', 'bench' + bi, ps, { collide: true });
      const kinds = [['man', 'woman'], ['elder', 'elder'], ['woman', 'kid']][bi];
      seat(72 + bi * 3, kinds[0], 0.74, pose(bench, 'seatL', [0, 0, 0], { flat: true }));
      seat(73 + bi * 3, kinds[1], 0.74, pose(bench, 'seatR', [0, 0, 0], { flat: true }));
    });
    [6, 12, 18].forEach((k, ci) => {
      const pc = pcs[k]; if (!pc) return;
      const ps = flatPose(pc, 'parapetSeat', [0, 0, 0.05], { yaw: 0 });
      ps.radius = pc.position.length() + 0.0;
      N.couple(80 + ci, { seatHeight: 1.12 }, ps.dir, ps.fwd, ps.radius);
    });
    const ch = pcs[1];
    if (ch) person('chanaSeller', { seed: 90 }, flatPose(ch, 'jogger', [0, 0, 0]));
    // joggers loop the promenade
    const arc = (a0, a1, off) => { const out = []; for (let i = 0; i <= 8; i++) out.push(MARINE.pt(a0 + (a1 - a0) * (i / 8), off)); return out; };
    N.walker('jogger', { seed: 91 }, arc(-44, 44, 2.2), 3.4);
    N.walker('jogger', { seed: 92, variant: 1 }, arc(40, -40, 3.2), 3.0, 0.3);
    N.walker('citizen', { seed: 93, kind: 'woman' }, arc(-20, 36, 2.8), 1.1);
  });

  // ============================== Haji Ali ========================================================================
  safe('haji', () => {
    const h = sites.haji; if (!h) return;
    const sh = h.shrine;
    const c = sh.userData.placement.dir;
    const stallA = prop('chadar', 'chadarA', pose(sh, 'flowerSeller', [-1.0, 0, 0]), { inside: 'haji' });
    person('pilgrim', { seed: 100, variant: 1 }, pose(stallA, 'seller'));
    const sp = pose(sh, 'flowerSeller', [6.2, 0, 0]);
    const stallB = prop('chadar', 'chadarB', sp, { inside: 'haji' });
    citizen(101, { kind: 'woman', loop: 'idle' }, pose(stallB, 'seller'));
    person('pilgrim', { seed: 102, variant: 0 }, pose(sh, 'pilgrimGate', [2.2, 0, 0.4]));
    // juice centre on the shore where the causeway starts
    const t0 = h.t0;
    const shoreBase = stepAlong(c, t0, h.shoreDist + 6.5);
    const side = new V3().crossVectors(shoreBase, t0).normalize();
    const jp = stepAlong(shoreBase, side, 7);
    const juice = prop('juice', 'hajiJuice', { dir: jp, fwd: tangentTo(jp, shoreBase), radius: null }, { ground: true });
    person('chanaSeller', { seed: 103 }, pose(juice, 'juiceMan'));
    citizen(104, { kind: 'man', loop: 'idle' }, pose(juice, 'customer'));
    seat(105, 'woman', 0.45, pose(juice, 'stool', [0, 0, 0], { flat: true }));
    // pilgrims walk the causeway
    const line = (lat) => { const out = []; for (let d = 8; d <= h.shoreDist + 3; d += 4) out.push(stepAlong(stepAlong(c, t0, d), side, lat)); return out; };
    N.walker('pilgrim', { seed: 106, variant: 0, solid: false }, line(0), 1.2);
    N.walker('pilgrim', { seed: 107, variant: 1, solid: false }, line(0), 1.1, 0.55);
  });

  // ============================== Antilia =========================================================================
  safe('antilia', () => {
    const an = S.items.get('antilia'); if (!an) return;
    person('securityGuard', { seed: 110 }, pose(an, 'guardBooth'));
    person('watchman', { seed: 111, wave: true }, pose(an, 'gateGuard'));
    person('sweeper', { seed: 112 }, pose(an, 'mali'));
    const line = pose(an, 'carLine');
    for (let i = 0; i < 3; i++) {
      const ps = local(an, 3.5 + i * 0 - 0, 0, 13 + 0, 0);
      void ps;
    }
    for (let i = 0; i < 3; i++) {
      const ps = pose(an, 'carLine', [i * 5.6 - 5.6, 0, 0]);
      prop(i === 1 ? 'vintageCar' : 'taxi', 'antiliaCar' + i, ps, { inside: 'antilia', opts: i === 1 ? undefined : { seed: 20 + i } });
    }
    void line;
  });

  // ============================== Juhu ============================================================================
  safe('juhu', () => {
    const spot = (b, depth) => { const d = shorePoint(b, depth); return { dir: d, fwd: tangentTo(d, POLE).negate(), radius: null }; };
    const mk = (kind, id, b, depth) => prop(kind, id, spot(b, depth), { ground: true });
    const pb = mk('pavBhaji', 'pavBhaji', 183, 10.5);
    person('bhuttaSeller', { seed: 120, props: false }, pose(pb, 'cook'));
    citizen(121, { kind: 'man', loop: 'chat' }, pose(pb, 'customer'));
    seat(122, 'woman', 0.45, pose(pb, 'stoolA', [0, 0, 0], { flat: true }));
    const bh = mk('bhutta', 'bhutta', 176, 10.5);
    person('bhuttaSeller', { seed: 123, props: false }, pose(bh, 'seller'));
    citizen(124, { kind: 'teen', loop: 'phone' }, pose(bh, 'customer'));
    const co = mk('coconut', 'coconut', 202, 10.5);
    person('coconutSeller', { seed: 125, props: false }, pose(co, 'seller'));
    citizen(126, { kind: 'man', loop: 'idle' }, pose(co, 'customer'));
    const hs = mk('horse', 'horse', 208, 8.5);
    citizen(127, { kind: 'kid', loop: 'wave' }, pose(hs, 'rider'));
    citizen(128, { kind: 'man', loop: 'idle' }, pose(hs, 'handler'));
    const sa = mk('sandArt', 'sandArt', 171, 7.5);
    citizen(129, { kind: 'man', loop: 'idle' }, pose(sa, 'artist'));
    citizen(130, { kind: 'woman', loop: 'chat' }, pose(sa, 'onlooker'));
    for (let i = 0; i < 4; i++) {
      const d = shorePoint(186 + i * 6.5, 6 + (i % 2) * 2.5);
      person('beachKid', { seed: 131 + i, loop: 'play' }, { dir: d, fwd: tangentTo(d, POLE).applyAxisAngle(d, i * 1.7), radius: null });
    }
    for (let i = 0; i < 3; i++) {
      const d = shorePoint(180 + i * 10, 5.2);
      citizen(140 + i, { kind: i % 2 ? 'woman' : 'man', loop: i === 1 ? 'chat' : 'idle' }, { dir: d, fwd: tangentTo(d, POLE).negate(), radius: null });
    }
  });

  // ============================== temple + chowk + chawls ==========================================================
  safe('temple', () => {
    const sh = S.items.get('shrine'); if (!sh) return;
    person('priest', { seed: 150 }, pose(sh, 'priest'));
    const bells = prop('bells', 'templeBells', pose(sh, 'bells'), { inside: 'shrine', collide: false });
    citizen(151, { kind: 'woman', loop: 'idle' }, pose(bells, 'devotee'));
    const off = prop('offering', 'offeringStall', pose(sh, 'devotee', [-3.4, 0, 0.8]), { inside: 'shrine' });
    person('pilgrim', { seed: 152, variant: 1, loop: 'pray' }, pose(off, 'devotee'));
    prop('chappals', 'chappalRow', pose(sh, 'shoes'), { inside: 'shrine', collide: false });
    person('pilgrim', { seed: 153, variant: 0, loop: 'pray' }, pose(sh, 'devotee'));
  });
  safe('chawls', () => {
    const c1 = S.items.get('ch1'), c2 = S.items.get('ch2'), c3 = S.items.get('ch3'), c7 = S.items.get('ch7');
    if (c1) {
      const cr = prop('carrom', 'carrom', pose(c1, 'carrom'), { inside: 'ch1', collide: false });
      seat(160, 'man', 0.38, pose(cr, 'seatN', [0, 0, 0], { flat: true }), 'sit');
      seat(161, 'elder', 0.38, pose(cr, 'seatS', [0, 0, 0], { flat: true }), 'sit');
      seat(162, 'teen', 0.38, pose(cr, 'seatE', [0, 0, 0], { flat: true }), 'sit');
    }
    if (c2) {
      const tp = prop('tap', 'commonTap', pose(c2, 'tap'), { inside: 'ch2' });
      citizen(163, { kind: 'woman', loop: 'idle' }, pose(tp, 'waiter'));
      citizen(164, { kind: 'woman', loop: 'chat' }, pose(tp, 'carrier'));
    }
    for (const [c, id] of [[c3, 'rangoli3'], [c7, 'rangoli7']]) {
      if (!c) continue;
      const rg = prop('rangoli', id, pose(c, 'rangoli'), { inside: c.name, collide: false, noOverlap: true });
      citizen(165 + id.length, { kind: 'woman', loop: 'idle' }, pose(rg, 'artist'));
    }
  });
  safe('station', () => {
    const st = sites.station; if (!st) return;
    const tt = prop('timetable', 'timetable', pose(st, 'ticketWindow', [-3.4, 0, -0.6]), { inside: 'station' });
    person('commuter', { seed: 170 }, pose(tt, 'reader'));
    const fs = prop('fastSlow', 'fastSlow', pose(st, 'commuterA', [-2.6, 0, -1.2]), { inside: 'station', collide: false });
    citizen(171, { kind: 'man', loop: 'phone' }, pose(fs, 'waiter'));
    const chai = prop('platformChai', 'platformChai', pose(st, 'chaiStall', [7.0, 0, -0.55]), { inside: 'station' });
    person('chaiwalaUncle', { seed: 172 }, pose(chai, 'chaiwala'));
    for (let i = 0; i < 3; i++) person('ladiesCommuter', { seed: 174 + i }, pose(st, 'edge', [-8.2 + i * 1.5, 0, -0.1 - (i % 2) * 0.45], { yaw: 0 }));
    person('commuter', { seed: 177 }, pose(st, 'commuterB'));
    seat(178, 'woman', 0.45, pose(st, 'benchSeat1', [0, 0, 0], { flat: true }));
    seat(179, 'elder', 0.45, pose(st, 'benchSeat2', [0, 0, 0], { flat: true }));
  });
  safe('chowk', () => {
    const sp = (x, z, yaw = 0) => { const r = resolveAt({ sp: [x, z] }); return { dir: r.dir, fwd: r.fwd.clone().applyAxisAngle(r.dir, -yaw), radius: null }; };
    const stoolsA = prop('stools', 'stoolsA', sp(-5.5, -9), {});
    seat(180, 'man', 0.5, pose(stoolsA, 'seatA', [0, 0, 0], { flat: true }));
    seat(181, 'man', 0.5, pose(stoolsA, 'seatB', [0, 0, 0], { flat: true }));
    const stoolsB = prop('stools', 'stoolsB', sp(13.4, 11.4), {});
    seat(182, 'elder', 0.5, pose(stoolsB, 'seatC', [0, 0, 0], { flat: true }));
    prop('crates', 'cratesA', sp(8.2, -10.8), {});
    prop('crates', 'cratesB', sp(-11.5, -9.2), {});
    prop('puddle', 'puddle1', sp(5.5, -8.2), { collide: false, noOverlap: true });
    prop('puddle', 'puddle2', sp(-5.6, 7.4), { collide: false, noOverlap: true });
    prop('puddle', 'puddle3', sp(3.4, 7.8), { collide: false, noOverlap: true });
    prop('rangoli', 'rangoliChowk', sp(4.2, -3.2), { collide: false, noOverlap: true });
    prop('ganpati', 'ganpatiPoster', sp(4.2, 11.8, Math.PI), {});
    for (let i = 0; i < 3; i++) { const q = sp(-5 + i * 1.3, -2.4 + (i % 2) * 1.5); person('beachKid', { seed: 190 + i, loop: 'play' }, q); }
    const q = sp(7, -1.6); citizen(194, { kind: 'woman', loop: 'chat' }, q);
    const q2 = sp(8.2, -0.8); citizen(195, { kind: 'woman', loop: 'chat' }, { ...q2, fwd: tangentTo(q2.dir, q.dir) });
  });

  // ============================== Sea Link toll booth ============================================================
  safe('toll', () => {
    const bs = sites.bridgeStart; if (!bs) return;
    const tb = prop('toll', 'tollBooth', bs, { ground: true });
    person('watchman', { seed: 196 }, pose(tb, 'collector'));
  });

  ambient();
  return { props };

  // ============================== everyday Mumbaikars ==============================================================
  /** citizens scattered over all the land (a Poisson-ish spacing), pairs chatting, plus a few footpath strollers */
  function ambient() {
    const rnd = W.rng;
    const maxN = Math.round(70 * W.dens), gapTarget = W.dens < 0.7 ? 30 : 20;
    const loops = ['idle', 'phone', 'chat', 'news', 'idle', 'chat'];
    const okSpot = (d, near = 1.6) => planet.getSurfaceRadius(d) > W.seaR + 0.7 && seaField(d) < -6 && freeSpot(d, near + 1) && pathNearest(d, ['road', 'rail', 'lane', 'promenade']).d > 5.4 && !nearCollider(W.colliders, d, near);
    // farthest-point filling: always put the next citizen where the nearest existing person is farthest away, until no gap is wider than gapTarget
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
      const seed = 300 + placedAt.length * 7;
      const t = tangentTo(d, POLE).applyAxisAngle(d, rnd() * 6.28);
      const pair = rnd() < 0.4;
      citizen(seed, { loop: pair ? 'chat' : loops[Math.floor(rnd() * loops.length)] }, { dir: d, fwd: t, radius: null });
      if (pair) {
        const d2 = stepAlong(d, t, 1.5);
        if (okSpot(d2, 0.7)) citizen(seed + 3, { loop: 'chat' }, { dir: d2, fwd: tangentTo(d2, d), radius: null });
      }
    }
    // strollers on the footpaths (never on a carriageway)
    const strolls = [['great', 20, 58, 4.4, 0], ['great', 70, 112, -4.4, 0.4], ['ring', 6, 70, -4.6, 0.2], ['ring', 120, 190, 4.6, 0.6], ['east', 8, 60, -4.2, 0.1], ['west', 8, 70, 4.2, 0.5], ['west', 80, 120, -4.2, 0.2]];
    strolls.forEach(([id, s0, s1, lat, ph], i) => {
      const p = PATHS[id];
      const pts = [];
      const n = Math.max(2, Math.round(Math.abs(s1 - s0) / 7));
      for (let k = 0; k <= n; k++) pts.push(p.lateral(s0 + (s1 - s0) * (k / n), lat));
      if (pts.some((d) => !freeSpot(d, 0.9) || nearCollider(W.colliders, d, 0.9))) return;
      N.walker('citizen', { seed: 400 + i * 5, kind: ['man', 'woman', 'teen', 'woman', 'elder', 'man', 'kid'][i] }, pts, 1.05 + (i % 3) * 0.2, ph);
    });
    props.set('_ambientCount', placedAt.length);
  }
}
