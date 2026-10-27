/**
 * delhi/population4.js: "pass 4" of the cast. Doubles the population from 65 to about 130 talkable people, each with an
 * explicit stable id (all listed in docs/DELHI_CAST.md).
 *
 *   population4(h)   h = { W, S, N, props, sites, pose, local, person, citizen, pathOf, okSpot, standR }   (details.js calls it after ambient())
 *
 * Two kinds of people:
 *   - SITE people stand at a named anchor of a landmark / prop (diner on the pav bhaji stool, waiter at the bus stop ...);
 *   - FILL people stand in the empty stretches between the sites. Their spots were measured with the farthest-point fill
 *     (dev: ?fill=N), then frozen below as polar [distance, bearing]; each is snapped to the nearest valid open ground.
 * Looks come from the seeded variation system plus the explicit Delhi look in people/castLooks.js (by id), so each person is described
 * exactly in docs/DELHI_CAST.md.
 * The original 65 (and the street-N fillers) are placed before this runs and never move.
 */
import * as THREE from 'three';
import { mulberry32 } from '../../engine/scatter.js';
import { lookOf } from './people/castLooks.js';
import { resolveAt } from './layout.js';
import { MARINE, PATHS, tangentTo, polarOf, polar, shorePoint, stepAlong, pathNearest } from './geo.js';
import { nearCollider } from './spots.js';

const V3 = THREE.Vector3;
const POLE = new V3(0, 1, 0);
const W_ = 0xfffaf0;

export function population4(h) {
  const { W, S, N, props, pose, local, person, citizen, pathOf, okSpot } = h;
  if (import.meta.env.DEV && new URLSearchParams(location.search).get('pop4') === '0') return; // dev: ?pop4=0 shows the 65-person world for before/after measurements
  const item = (id) => S.items.get(id) ?? props.get(id);
  const sp = (x, z, yaw = 0) => { const r = resolveAt({ sp: [x, z] }); return { dir: r.dir, fwd: r.fwd.clone().applyAxisAngle(r.dir, -yaw), radius: null }; };
  const at = (dir, yaw = 0) => ({ dir, fwd: tangentTo(dir, POLE).applyAxisAngle(dir, yaw), radius: null });
  /** pose at a named anchor; the chowk stalls store anchors as [x, y, z] arrays (customers face the stall), later props as { x, y, z, facing } */
  const ps = (g, name, off = [0, 0, 0], o = {}) => {
    const a = g.userData.anchors?.[name];
    if (Array.isArray(a)) return local(g, a[0] + off[0], a[1] + off[1], a[2] + off[2], (name === 'customer' ? Math.PI : 0) + (o.yaw ?? 0));
    return pose(g, name, off, o);
  };
  /** stand on the real walkable surface under a pose (plazas, platforms and quays are not at the prop's own base height) */
  const gnd = (p) => ({ ...p, far: true, yoff: 0 });
  const seatP = (g, name, off = [0, 0, 0]) => gnd(pose(g, name, off, { flat: true }));
  // every person's Delhi look comes from people/castLooks.js, keyed by id
  const sit = (seed, kind, hgt, id, p) => citizen(seed, { kind, loop: 'sit', seatHeight: hgt, id, tweak: lookOf(id)?.tweak }, p);
  const cit = (seed, kind, loop, id, p, extra = {}) => citizen(seed, { kind, loop: lookOf(id)?.loop ?? loop, id, tweak: lookOf(id)?.tweak, ...extra }, p);
  const per = (role, seed, id, p, extra = {}) => person(role, { seed, id, tweak: lookOf(id)?.tweak, ...extra }, p);
  /** nudge a pose away from the nearest carriageway until it is `min` units from its centreline (so waiting people never crowd the traffic lane) */
  const clearRoad = (p, min = 5.0) => {
    const r = pathNearest(p.dir, ['road']);
    if (r.p && r.d < min) {
      const rp = r.p.at(r.s, {}).dir;
      const away = tangentTo(p.dir, rp).negate();
      return { ...p, dir: stepAlong(p.dir, away, min - r.d), radius: null, far: true };
    }
    return p;
  };
  /** dev: warn where a walker's route passes through a static collider */
  const checkRoute = (id, dirs) => {
    if (!import.meta.env.DEV) return;
    for (let i = 0; i < dirs.length - 1; i++) for (let k = 0; k <= 8; k++) {
      const d = dirs[i].clone().lerp(dirs[i + 1], k / 8).normalize();
      for (const c of W.colliders.list) { if (c.person || c.update || c.height < 0.5 || c.a) continue; if (d.dot(c.dir) > Math.cos((c.radius + 0.6) / 75)) { console.warn('[delhi population4] route ' + id + ' passes a collider at', polarOf(d)); return; } }
    }
  };
  const guard = (fn) => { try { fn(); } catch (e) { console.warn('[delhi population4]', e?.message ?? e); } };

  // =============================== Chowk (the tapri square) ========================================================
  guard(() => {
    const vada = item('vada'), fruit = item('fruit'), mari = item('marigold'), news = item('news');
    cit(401, 'teen', 'idle', 'chowk-vada-customer', ps(vada, 'customer'));
    cit(402, 'woman', 'sell', 'chowk-fruit-seller', ps(fruit, 'vendor'));
    cit(403, 'woman', 'sell', 'chowk-marigold-seller', ps(mari, 'seller'));
    cit(404, 'elder', 'news', 'chowk-news-reader', ps(news, 'customer'));
    cit(405, 'kid', 'marbles', 'chowk-rangoli-girl', ps(props.get('rangoliChowk'), 'artist'));
    cit(406, 'woman', 'pray', 'chowk-ganpati-devotee', ps(props.get('ganpatiPoster'), 'devotee'));
    cit(407, 'kid', 'tag', 'chowk-tag-kid-1', sp(8.4, 4.0, 0.4));
    cit(408, 'kid', 'tag', 'chowk-tag-kid-2', sp(10.4, 5.6, 2.6));
  });

  // =============================== chawls ==========================================================================
  guard(() => {
    const c3 = S.items.get('ch3'), lau = S.items.get('laundry1');
    sit(410, 'woman', 0.3, 'chawl-grandma-doorstep', ps(c3, 'doorstep', [-1.6, 0, 0.9], { flat: true, yaw: 0 }));
    per('sweeper', 411, 'chawl-lane-sweeper', gnd(local(lau, 2.4, 0, 1.6, 0.3)));
  });

  // =============================== temple ==========================================================================
  guard(() => {
    const off = props.get('offeringStall'), chap = props.get('chappalRow');
    cit(413, 'woman', 'sell', 'temple-flower-seller', ps(off, 'seller'));
    cit(414, 'elder', 'guard', 'temple-shoe-keeper', ps(chap, 'owner'));
  });

  // =============================== railway station =================================================================
  guard(() => {
    const st = h.sites.station; if (!st) return;
    sit(420, 'elder', 0.5, 'station-bench-elder', local(st, 1.8, 0.45, -1.4, 0));
    cit(421, 'man', 'watch', 'station-commuter-2', ps(st, 'commuterB'));
    cit(422, 'man', 'sell', 'station-ticket-clerk', ps(st, 'ticketWindow', [0.2, 0, 0.0]));
  });

  // =============================== Fort: bus stops, CST, Rajabai, Flora, BSE ======================================
  guard(() => {
    const bus = S.items.get('busStopFort'), cbus = S.items.get('cstBusStop'), cst = S.items.get('cst'), tp = props.get('tiffinPile'), bk = props.get('bookStall');
    cit(430, 'woman', 'idle', 'fort-bus-waiter-1', clearRoad(local(bus, 1.2, 0, 1.6, 0.1), 5.2));
    cit(431, 'man', 'phone', 'fort-bus-waiter-2', clearRoad(local(bus, -1.4, 0, 1.7, -0.1), 5.2));
    per('coolie', 432, 'cst-coolie-2', ps(cst, 'coolieB'));
    per('dabbawala', 433, 'cst-tiffin-sorter-2', gnd(ps(tp, 'sorterB')), { loop: false });
    cit(434, 'teen', 'chat', 'rajabai-book-browser', gnd(ps(bk, 'browser')));
    const fl = S.items.get('flora');
    sit(435, 'woman', 0.9, 'flora-ledge-reader', seatP(fl, 'sitterA'));
    sit(436, 'teen', 0.9, 'flora-ledge-sketcher', seatP(fl, 'sitterB'));
    const bse = S.items.get('bse');
    cit(437, 'man', 'phone', 'bse-broker', ps(bse, 'broker'));
  });

  guard(() => { // two more walkers: a dabbawala on the Great Road footpath, a second office-goer on the CST forecourt
    const g = PATHS.great, line = [];
    for (let i = 0; i <= 5; i++) line.push(g.lateral(77 + i * 8, -6.6));
    checkRoute('fort-dabbawala-walker', line);
    N.walker('dabbawala', { seed: 438, id: 'fort-dabbawala-walker' }, line, 1.35);
    const cst = S.items.get('cst');
    const lane = pathOf(cst, [[10, 0.05, 11.6], [4, 0.05, 12.0], [-3, 0.05, 11.6], [-9, 0.05, 12.0]]);
    checkRoute('cst-officegoer-2', lane);
    N.walker('officeGoer', { seed: 439, id: 'cst-officegoer-2' }, lane, 1.6);
  });

  // =============================== Taj + Gateway ==================================================================
  guard(() => {
    const taj = S.items.get('taj'), gw = S.items.get('gateway'), dana = props.get('danaMat');
    cit(440, 'man', 'greet', 'taj-bellboy', ps(taj, 'bellboy'));
    per('tourist', 441, 'gateway-tourist-a', ps(gw, 'tourists', [-0.8, 0, 0]), { loop: 'snap' });
    per('tourist', 442, 'gateway-tourist-b', ps(gw, 'tourists', [1.4, 0, 0.6]), { loop: 'snap' });
    cit(443, 'woman', 'sell', 'gateway-dana-seller', gnd(ps(dana, 'seller')));
    cit(444, 'man', 'wave', 'gateway-boatman', gnd(ps(gw, 'jetty', [-3.6, 0, -1.6])));
  });

  // =============================== Marine Drive ====================================================================
  guard(() => {
    const b1 = props.get('bench1'), b2 = props.get('bench2');
    sit(450, 'woman', 0.74, 'marine-bench-aunty', pose(b1, 'seatL', [0, 0, 0], { flat: true }));
    sit(451, 'elder', 0.74, 'marine-bench-reader', pose(b1, 'seatR', [0, 0, 0], { flat: true }));
    const pcs = S.promenade ?? [];
    if (pcs[6]) {
      const pp = pose(pcs[6], 'parapetSeat', [0, 0, 0.05], { flat: true });
      pp.radius = pcs[6].position.length();
      N.couple(88, { seatHeight: 1.12, id: 'marine-couple-2' }, pp.dir, pp.fwd, pp.radius);
    }
    const arc = (a0, a1, off) => { const out = []; for (let i = 0; i <= 8; i++) out.push(MARINE.pt(a0 + (a1 - a0) * (i / 8), off)); return out; };
    N.walker('jogger', { seed: 452, id: 'marine-jogger-2' }, arc(46, -46, 3.4), 2.9);
    N.walker('citizen', { seed: 453, kind: 'elder', id: 'marine-morning-walker' }, arc(-30, 34, 3.9), 0.9);
    void b2;
  });

  // =============================== Haji Ali ========================================================================
  guard(() => {
    const cb = props.get('chadarB'), juice = props.get('hajiJuice'), sh = h.sites.haji?.shrine;
    cit(460, 'man', 'sell', 'haji-chadar-seller-2', ps(cb, 'seller'));
    cit(461, 'woman', 'idle', 'haji-juice-customer', ps(juice, 'customer'));
    if (sh) cit(462, 'man', 'pray', 'haji-pilgrim-2', ps(sh, 'pilgrimA'));
  });

  // =============================== Antilia =========================================================================
  guard(() => {
    const an = S.items.get('antilia'), car = props.get('antiliaCar1');
    cit(470, 'man', 'wave', 'antilia-chauffeur', ps(car, 'doorman'));
    cit(471, 'teen', 'idle', 'antilia-delivery-boy', ps(an, 'gateGuard', [-5.4, 0, 0.4]));
  });

  // =============================== Juhu ============================================================================
  guard(() => {
    const pb = props.get('pavBhaji'), hs = props.get('horse');
    sit(480, 'man', 0.42, 'juhu-pavbhaji-diner-1', seatP(pb, 'stoolA'));
    cit(481, 'man', 'wave', 'juhu-horse-handler', ps(hs, 'handler'));
    const fam = shorePoint(166, 9);
    cit(482, 'woman', 'phone', 'juhu-family-mom', at(stepAlong(fam, tangentTo(fam, POLE), 0.0), 0.3));
    cit(483, 'man', 'chat', 'juhu-family-dad', at(stepAlong(fam, tangentTo(fam, POLE).applyAxisAngle(fam, 1.5), 2.0), 3.4));
    cit(484, 'kid', 'idle', 'juhu-family-kid', at(stepAlong(fam, tangentTo(fam, POLE).applyAxisAngle(fam, -1.3), 1.8), -1.2));
    const lg = shorePoint(190, 5.5);
    cit(485, 'man', 'guard', 'juhu-lifeguard', at(lg, 1.0));
  });

  // =============================== Sea Link toll plaza =============================================================
  guard(() => {
    const tb = S.items.get('tollBooth'); if (!tb) return;
    per('watchman', 490, 'toll-collector', local(tb, 0, 0, -0.6, 0));
  });

  // =============================== fills: the empty stretches between the sites ===============================================
  // Frozen farthest-point picks ([distance, bearing] from the spawn, measured with the fill algorithm after every site person above was placed);
  // each snaps to the nearest open ground. Together with the sites they take `__delhi.coverage()` from ~35% empty frames to ~0%.
  const rnd = mulberry32(4242);
  const snap = (d, b) => {
    const base = polar(d, b);
    if (okSpot(base)) return base;
    for (let r = 0.8; r < 9; r += 0.8) for (let k = 0; k < 8; k++) { const c = stepAlong(base, tangentTo(base, POLE).applyAxisAngle(base, k * 0.785), r); if (okSpot(c)) return c; }
    return base;
  };
  const fillAt = (d, b) => { const dir = snap(d, b); return { dir, fwd: tangentTo(dir, POLE).applyAxisAngle(dir, rnd() * 6.28), radius: null }; };
  const FILL = [
    () => cit(601, 'kid', 'kite', 'rail-kite-kid', fillAt(50.5, -95.5)),
    () => cit(602, 'woman', 'chat', 'lane-aunty-gossip', fillAt(82.2, 84.8)),
    () => cit(603, 'kid', 'wave', 'east-schoolgirl', fillAt(107.5, -62.8)),
    () => per('tourist', 604, 'gateway-road-tourist', fillAt(129.9, 15.3), { loop: 'snap' }),
    () => cit(605, 'elder', 'idle', 'scrub-elder-umbrella', fillAt(105.7, -102.9)),
    () => cit(606, 'man', 'phone', 'east-road-rickshaw-driver', fillAt(46, -49.5)),
    () => cit(607, 'teen', 'phone', 'seaview-selfie-teen', fillAt(109.1, 122.6)),
    () => cit(608, 'woman', 'idle', 'bridge-road-shopper', fillAt(139.8, 123.2)),
    () => cit(609, 'teen', 'idle', 'juhu-road-ball-teen', fillAt(104.2, 174.8)),
    () => cit(610, 'elder', 'news', 'antilia-lane-walker', fillAt(74.5, 141.2)),
    () => cit(611, 'woman', 'idle', 'chawl-lane-vegetable-woman', fillAt(44.9, -175.1)),
    () => cit(612, 'man', 'wave', 'chawl-lane-milkman', fillAt(44.7, 112.5)),
    () => cit(613, 'woman', 'watch', 'deco-office-woman', fillAt(74.5, 63)),
    () => cit(614, 'kid', 'idle', 'east-field-ball-kid', fillAt(114.3, -82.2)),
    () => cit(615, 'man', 'bat', 'field-batting-uncle', fillAt(72, -152.6)),
    () => cit(616, 'woman', 'phone', 'field-phone-woman', fillAt(75.9, -100.9)),
    () => cit(617, 'teen', 'idle', 'north-field-backpacker-teen', fillAt(103.8, -132.7)),
    () => per('chanaSeller', 618, 'beach-road-peanut-seller', fillAt(111.1, -166.2)),
  ];
  FILL.forEach((f) => guard(f));
  void W; void pathOf; void PATHS;
}
