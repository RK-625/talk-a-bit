/**
 * mumbai/population4.js: "pass 4" of the cast. Doubles the Mumbai population from 65 to about 130 talkable people, each with an
 * explicit stable id (all listed in docs/CAST.md under "Added in pass 4").
 *
 *   population4(h)   h = { W, S, N, props, sites, pose, local, person, citizen, pathOf, okSpot, standR }   (details.js calls it after ambient())
 *
 * Two kinds of people:
 *   - SITE people stand at a named anchor of a landmark / prop (diner on the pav bhaji stool, waiter at the bus stop ...);
 *   - FILL people stand in the empty stretches between the sites. Their spots were measured with the farthest-point fill
 *     (dev: ?fill=N), then frozen below as polar [distance, bearing]; each is snapped to the nearest valid open ground.
 * Looks come from the seeded variation system plus a small explicit `tweak`, so each person is described exactly in CAST.md.
 * The original 65 (and the street-N fillers) are placed before this runs and never move.
 */
import * as THREE from 'three';
import { mulberry32 } from '../../engine/scatter.js';
import { PASTEL as P } from './people/kit.js';
import { resolveAt } from './layout.js';
import { MARINE, PATHS, tangentTo, polarOf, polar, shorePoint, stepAlong, pathNearest } from './geo.js';
import { nearCollider } from './spots.js';

const V3 = THREE.Vector3;
const POLE = new V3(0, 1, 0);
const W_ = 0xfffaf0;

/** explicit look overrides for a named person */
const tw = (o = {}) => (s) => {
  const { acc, accAdd, hair, face, ...rest } = o;
  Object.assign(s, rest);
  if (hair) s.hair = { ...s.hair, ...(typeof hair === 'string' ? { style: hair } : hair) };
  if (face) s.face = { ...s.face, ...face };
  if (acc) s.accessories = acc;
  if (accAdd) s.accessories = [...(s.accessories ?? []), ...accAdd];
  return s;
};
const saree = (blouse, body, pallu, extra = {}) => ({ outfit: 'saree', top: blouse, bottom: body, pallu, bottom2: W_, top2: W_, trim: W_, bottomPattern: 'plain', ...extra });
const kurta = (top, bottom, extra = {}) => ({ outfit: 'kurtaPyjama', sleeves: 'long', top, bottom, topPattern: 'plain', ...extra });
const shirt = (top, bottom, extra = {}) => ({ outfit: 'shirtTrousers', sleeves: 'short', top, bottom, topPattern: 'plain', ...extra });
const GREY = 0xcfcfcf;

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
  const sit = (seed, kind, hgt, id, p, look) => citizen(seed, { kind, loop: 'sit', seatHeight: hgt, id, tweak: tw(look) }, p);
  const cit = (seed, kind, loop, id, p, look, extra = {}) => citizen(seed, { kind, loop, id, tweak: tw(look), ...extra }, p);
  const per = (role, seed, id, p, look, extra = {}) => person(role, { seed, id, tweak: look ? tw(look) : undefined, ...extra }, p);
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
      for (const c of W.colliders.list) { if (c.person || c.update || c.height < 0.5 || c.a) continue; if (d.dot(c.dir) > Math.cos((c.radius + 0.6) / 75)) { console.warn('[mumbai population4] route ' + id + ' passes a collider at', polarOf(d)); return; } }
    }
  };
  /** two kids playing tag chase each other round a small loop on clear ground (standing still, their run-on-the-spot faced the nearest stall wall) */
  const tagKids = (kids, c, r = 1.6) => {
    const clear = (d) => !W.colliders.list.some((k) => !k.person && !k.update && k.height >= 0.3 && !k.a && d.dot(k.dir) > Math.cos((k.radius + 0.5) / 75));
    const t = tangentTo(c.dir, POLE), b = new V3().crossVectors(c.dir, t).normalize();
    const way = (a) => t.clone().multiplyScalar(Math.cos(a)).addScaledVector(b, Math.sin(a)).normalize();
    const ring = (o) => Array.from({ length: 10 }, (_, i) => stepAlong(o, way((i / 10) * Math.PI * 2), r));
    let dirs = null; // nearest centre (rings of 1.2 units outward) whose whole loop is clear of stalls, stools and walls
    for (let s = 0; s <= 6 && !dirs; s++) for (let j = 0; j < (s ? 8 : 1) && !dirs; j++) {
      const o = s ? stepAlong(c.dir, way((j / 8) * Math.PI * 2), s * 1.2) : c.dir, pts = ring(o);
      if (clear(o) && pts.every(clear)) dirs = pts;
    }
    if (!dirs) { console.warn('[population4] no clear ground for the tag kids'); return; }
    kids.forEach(([seed, id, tweak], k) => { const n = N.walker('citizen', { kind: 'kid', seed, id, tweak, closed: true }, dirs, 2.4, k * 0.45); n?.g.userData.playLoop('tag'); });
  };
  const guard = (fn) => { try { fn(); } catch (e) { console.warn('[mumbai population4]', e?.message ?? e); } };

  // =============================== Chowk (the tapri square) ========================================================
  guard(() => {
    const vada = item('vada'), fruit = item('fruit'), mari = item('marigold'), news = item('news');
    cit(401, 'teen', 'idle', 'chowk-vada-customer', ps(vada, 'customer'), { ...shirt(P.white, P.navy), hair: { style: 'short' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white });
    cit(402, 'woman', 'sell', 'chowk-fruit-seller', ps(fruit, 'vendor'), { ...saree(P.teal, P.magenta, P.marigold), hair: { style: 'bun', flower: true }, face: { bindi: true }, acc: [{ name: 'gamcha', slot: 'shoulderR', color: P.mint }] });
    cit(403, 'woman', 'sell', 'chowk-marigold-seller', ps(mari, 'seller'), { ...saree(P.saffron, P.marigold, P.red), hair: { style: 'plait', flower: true }, face: { bindi: true }, acc: ['flowerBasket'] });
    cit(404, 'elder', 'news', 'chowk-news-reader', ps(news, 'customer'), { ...kurta(P.cream, 0xf3ecd9), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: [] });
    cit(405, 'kid', 'marbles', 'chowk-rangoli-girl', ps(props.get('rangoliChowk'), 'artist'), { ...kurta(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: 0x2b2330 }, face: { lashes: true, bindi: true, smile: 'big' }, acc: [], footwear: 'bare' });
    cit(406, 'woman', 'pray', 'chowk-ganpati-devotee', ps(props.get('ganpatiPoster'), 'devotee'), { ...saree(P.mint, P.pistachio, P.saffron), hair: { style: 'bun' }, face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' });
    tagKids([[407, 'chowk-tag-kid-1', tw({ ...shirt(P.mint, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: 0x2b2330 }, acc: [], footwear: 'bare' })], [408, 'chowk-tag-kid-2', tw({ ...kurta(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'short', color: 0x2b2330 }, face: { lashes: true }, acc: ['ball'], footwear: 'bare' })]], sp(9.4, 4.8));
  });

  // =============================== chawls ==========================================================================
  guard(() => {
    const c3 = S.items.get('ch3'), lau = S.items.get('laundry1');
    sit(410, 'woman', 0.3, 'chawl-grandma-doorstep', ps(c3, 'doorstep', [-1.6, 0, 0.9], { flat: true, yaw: 0 }), { ...saree(P.lilac, P.olive, P.pink), hair: { style: 'bun', color: GREY }, face: { specs: true, bindi: false }, acc: [], height: 1.9 });
    per('sweeper', 411, 'chawl-lane-sweeper', gnd(local(lau, 2.4, 0, 1.6, 0.3)), { top: P.pink, bottom: P.sky, pallu: P.marigold });
  });

  // =============================== temple ==========================================================================
  guard(() => {
    const off = props.get('offeringStall'), chap = props.get('chappalRow');
    cit(413, 'woman', 'sell', 'temple-flower-seller', ps(off, 'seller'), { ...saree(P.marigold, P.saffron, P.cream), hair: { style: 'bun', flower: true }, face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' });
    cit(414, 'elder', 'guard', 'temple-shoe-keeper', ps(chap, 'owner'), { outfit: 'dhoti', top: 0xf0ede4, bottom: 0xfbf7ea, pallu: P.saffron, trim: 0xe3b84a, hair: { style: 'bald' }, face: { moustache: 'thin', specs: true, tilak: 'ash' }, acc: [{ name: 'gamcha', slot: 'shoulderL', color: P.saffron }], footwear: 'bare' });
  });

  // =============================== railway station =================================================================
  guard(() => {
    const st = h.sites.station; if (!st) return;
    sit(420, 'elder', 0.5, 'station-bench-elder', local(st, 1.8, 0.45, -1.4, 0), { ...kurta(P.white, 0xf3ecd9), hair: { style: 'topi', hat: P.white, color: GREY }, face: { specs: true }, acc: [{ name: 'jhola', color: P.terracotta }] });
    cit(421, 'man', 'watch', 'station-commuter-2', ps(st, 'commuterB'), { ...shirt(P.sky, 0x9aa8c8, { sleeves: 'long', topPattern: 'checks' }), hair: { style: 'short', color: 0x2b2330 }, acc: ['briefcase', 'watch'], footwear: 'shoes' });
    cit(422, 'man', 'sell', 'station-ticket-clerk', ps(st, 'ticketWindow', [0.2, 0, 0.0]), { ...shirt(0xe9e1cd, 0x6f7fa6, { sleeves: 'short' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: [], footwear: 'shoes' });
  });

  // =============================== Fort: bus stops, CST, Rajabai, Flora, BSE ======================================
  guard(() => {
    const bus = S.items.get('busStopFort'), cbus = S.items.get('cstBusStop'), cst = S.items.get('cst'), tp = props.get('tiffinPile'), bk = props.get('bookStall');
    cit(430, 'woman', 'idle', 'fort-bus-waiter-1', clearRoad(local(bus, 1.2, 0, 1.6, 0.1), 5.2), { ...kurta(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'plait' }, face: { bindi: true }, acc: [{ name: 'umbrella', color: P.lilac, color2: P.cream }] });
    cit(431, 'man', 'phone', 'fort-bus-waiter-2', clearRoad(local(bus, -1.4, 0, 1.7, -0.1), 5.2), { ...shirt(P.pink, P.khaki, { sleeves: 'long', topPattern: 'stripes' }), hair: { style: 'messy', color: 0x2b2330 }, acc: ['phone', 'backpack'], footwear: 'shoes' });
    per('coolie', 432, 'cst-coolie-2', ps(cst, 'coolieB'), { top: 0xe8695d });
    per('dabbawala', 433, 'cst-tiffin-sorter-2', gnd(ps(tp, 'sorterB')), null, { loop: false });
    cit(434, 'teen', 'chat', 'rajabai-book-browser', gnd(ps(bk, 'browser')), { ...shirt(P.mint, P.denim, { topPattern: 'stripes' }), hair: { style: 'messy', color: 0x2b2330 }, face: { specs: true }, acc: ['books'], footwear: 'shoes' });
    const fl = S.items.get('flora');
    sit(435, 'woman', 0.9, 'flora-ledge-reader', seatP(fl, 'sitterA'), { ...kurta(P.butter, P.denim, { sleeves: 'short' }), hair: { style: 'plait' }, acc: ['books'], face: { specs: true, bindi: true } });
    sit(436, 'teen', 0.9, 'flora-ledge-sketcher', seatP(fl, 'sitterB'), { ...shirt(P.lilac, P.khaki, { topPattern: 'dots' }), hair: { style: 'cap', hat: P.red, color: 0x2b2330 }, acc: [{ name: 'jhola', color: P.sky }], footwear: 'shoes' });
    const bse = S.items.get('bse');
    cit(437, 'man', 'phone', 'bse-broker', ps(bse, 'broker'), { outfit: 'shirtTie', sleeves: 'long', top: P.white, bottom: 0x7f8fb5, hair: { style: 'short', color: 0x2b2330 }, face: { moustache: 'thin' }, acc: [{ name: 'tie', color: P.red }, 'phone'], footwear: 'shoes' });
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
    cit(440, 'man', 'greet', 'taj-bellboy', ps(taj, 'bellboy'), { outfit: 'sherwani', top: 0x8f9fd0, bottom: W_, trim: 0xe3b84a, hair: { style: 'cap', hat: 0x8f9fd0, color: 0x2b2330 }, face: { moustache: 'thin' }, acc: ['luggage'], footwear: 'shoes' });
    per('tourist', 441, 'gateway-tourist-a', ps(gw, 'tourists', [-0.8, 0, 0]), { skin: 0xffe0c8, top: P.pink, topPattern: 'floral', hair: { style: 'cap', hat: P.white, color: 0xb8864b }, outfit: 'shirtShorts' }, { loop: 'snap' });
    per('tourist', 442, 'gateway-tourist-b', ps(gw, 'tourists', [1.4, 0, 0.6]), { skin: 0xf2c9a6, top: P.sky, topPattern: 'stripes', hair: { style: 'cap', hat: P.red, color: 0x2b2330 }, outfit: 'shirtTrousers' }, { loop: 'snap' });
    cit(443, 'woman', 'sell', 'gateway-dana-seller', gnd(ps(dana, 'seller')), { ...saree(P.rose, P.teal, P.butter), hair: { style: 'bun' }, face: { bindi: true }, acc: [{ name: 'sabziBag' }], footwear: 'bare' });
    cit(444, 'man', 'wave', 'gateway-boatman', gnd(ps(gw, 'jetty', [-3.6, 0, -1.6])), { outfit: 'banyanLungi', top: 0xf6efdb, bottom: P.sky, bottomPattern: 'checks', hair: { style: 'turban', hat: P.teal, color: 0x2b2330 }, face: { moustache: 'thick' }, acc: [], footwear: 'bare' });
  });

  // =============================== Marine Drive ====================================================================
  guard(() => {
    const b1 = props.get('bench1'), b2 = props.get('bench2');
    sit(450, 'woman', 0.74, 'marine-bench-aunty', pose(b1, 'seatL', [0, 0, 0], { flat: true }), { ...saree(P.sky, P.rose, P.cream), hair: { style: 'bun', color: GREY }, face: { specs: true, bindi: true }, acc: [{ name: 'sabziBag' }] });
    sit(451, 'elder', 0.74, 'marine-bench-reader', pose(b1, 'seatR', [0, 0, 0], { flat: true }), { ...kurta(P.mint, 0xf3ecd9), hair: { style: 'bald' }, face: { specs: true, moustache: 'thick' }, acc: ['newspaper'] });
    const pcs = S.promenade ?? [];
    if (pcs[6]) {
      const pp = pose(pcs[6], 'parapetSeat', [0, 0, 0.05], { flat: true });
      pp.radius = pcs[6].position.length();
      N.couple(88, { seatHeight: 1.12, id: 'marine-couple-2' }, pp.dir, pp.fwd, pp.radius);
    }
    const arc = (a0, a1, off) => { const out = []; for (let i = 0; i <= 8; i++) out.push(MARINE.pt(a0 + (a1 - a0) * (i / 8), off)); return out; };
    N.walker('jogger', { seed: 452, id: 'marine-jogger-2', tweak: tw({ top: P.sky, bottom: 0x4a4560, sleeves: 'none', hair: { style: 'short', color: 0x2b2330, band: undefined } }) }, arc(46, -46, 3.4), 2.9);
    N.walker('citizen', { seed: 453, kind: 'elder', id: 'marine-morning-walker', tweak: tw({ ...kurta(P.white, 0xf3ecd9), hair: { style: 'short', color: GREY }, face: { specs: true }, acc: ['umbrella'], footwear: 'shoes' }) }, arc(-30, 34, 3.9), 0.9);
    void b2;
  });

  // =============================== Haji Ali ========================================================================
  guard(() => {
    const cb = props.get('chadarB'), juice = props.get('hajiJuice'), sh = h.sites.haji?.shrine;
    cit(460, 'man', 'sell', 'haji-chadar-seller-2', ps(cb, 'seller'), { ...kurta(0x6fbf9a, W_), hair: { style: 'topi', hat: P.white }, face: { moustache: false, specs: false }, acc: [], footwear: 'chappal' });
    cit(461, 'woman', 'idle', 'haji-juice-customer', ps(juice, 'customer'), { ...kurta(P.rose, P.cream), hair: { style: 'plait' }, face: { bindi: false }, acc: [{ name: 'gamcha', slot: 'shoulderR', color: P.mint }] });
    if (sh) cit(462, 'man', 'pray', 'haji-pilgrim-2', ps(sh, 'pilgrimA'), { ...kurta(P.white, W_), hair: { style: 'topi', hat: P.white, color: GREY }, face: { moustache: 'thick', specs: false }, acc: [], footwear: 'bare' });
  });

  // =============================== Antilia =========================================================================
  guard(() => {
    const an = S.items.get('antilia'), car = props.get('antiliaCar1');
    cit(470, 'man', 'wave', 'antilia-chauffeur', ps(car, 'doorman'), { outfit: 'uniform', top: 0x6c7490, topPattern: 'belt', top2: 0x3d3a55, bottom: 0x4a4560, hair: { style: 'cap', hat: 0x6c7490, color: 0x2b2330 }, face: { moustache: 'thin' }, acc: [], footwear: 'shoes' });
    cit(471, 'teen', 'idle', 'antilia-delivery-boy', ps(an, 'gateGuard', [-5.4, 0, 0.4]), { ...shirt(P.saffron, 0x4a4560), hair: { style: 'cap', hat: P.red, color: 0x2b2330 }, acc: ['tiffinBag', 'backpack'], footwear: 'shoes' });
  });

  // =============================== Juhu ============================================================================
  guard(() => {
    const pb = props.get('pavBhaji'), hs = props.get('horse');
    sit(480, 'man', 0.42, 'juhu-pavbhaji-diner-1', seatP(pb, 'stoolA'), { ...shirt(P.butter, P.denim, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: 0x2b2330 }, acc: [], footwear: 'chappal' });
    cit(481, 'man', 'wave', 'juhu-horse-handler', ps(hs, 'handler'), { outfit: 'banyanLungi', top: 0xf6efdb, bottom: P.butter, bottomPattern: 'checks', hair: { style: 'turban', hat: P.pink, color: 0x2b2330 }, face: { moustache: 'handlebar' }, acc: [{ name: 'gamcha', slot: 'shoulderR', color: P.terracotta }], footwear: 'bare' });
    const fam = shorePoint(166, 9);
    cit(482, 'woman', 'phone', 'juhu-family-mom', at(stepAlong(fam, tangentTo(fam, POLE), 0.0), 0.3), { ...kurta(P.pink, P.denim, { sleeves: 'short' }), hair: { style: 'bun' }, face: { bindi: true }, acc: ['phone', { name: 'jhola', color: P.teal }] });
    cit(483, 'man', 'chat', 'juhu-family-dad', at(stepAlong(fam, tangentTo(fam, POLE).applyAxisAngle(fam, 1.5), 2.0), 3.4), { ...shirt(P.sky, P.khaki, { outfit: 'shirtShorts', topPattern: 'checks' }), hair: { style: 'short', color: 0x2b2330 }, face: { moustache: 'thin' }, acc: ['camera'], footwear: 'chappal' });
    cit(484, 'kid', 'idle', 'juhu-family-kid', at(stepAlong(fam, tangentTo(fam, POLE).applyAxisAngle(fam, -1.3), 1.8), -1.2), { ...shirt(P.teal, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: 0x2b2330 }, acc: ['ball'], footwear: 'bare' });
    const lg = shorePoint(190, 5.5);
    cit(485, 'man', 'guard', 'juhu-lifeguard', at(lg, 1.0), { outfit: 'shirtShorts', top: P.red, topPattern: 'plain', bottom: P.red, hair: { style: 'cap', hat: P.white, color: 0x2b2330 }, face: { specs: false, moustache: 'thin' }, acc: ['whistle'], footwear: 'bare' });
  });

  // =============================== Sea Link toll plaza =============================================================
  guard(() => {
    const tb = S.items.get('tollBooth'); if (!tb) return;
    per('watchman', 490, 'toll-collector', local(tb, 0, 0, -0.6, 0), { top: P.khaki });
  });

  // =============================== fills: the empty stretches between the sites ===============================================
  // Frozen farthest-point picks ([distance, bearing] from the spawn, measured with the fill algorithm after every site person above was placed);
  // each snaps to the nearest open ground. Together with the sites they take `__mumbai.coverage()` from ~35% empty frames to ~0%.
  const rnd = mulberry32(4242);
  const snap = (d, b) => {
    const base = polar(d, b);
    if (okSpot(base)) return base;
    for (let r = 0.8; r < 9; r += 0.8) for (let k = 0; k < 8; k++) { const c = stepAlong(base, tangentTo(base, POLE).applyAxisAngle(base, k * 0.785), r); if (okSpot(c)) return c; }
    return base;
  };
  const fillAt = (d, b) => { const dir = snap(d, b); return { dir, fwd: tangentTo(dir, POLE).applyAxisAngle(dir, rnd() * 6.28), radius: null }; };
  /** a FILL person who is just standing about strolls a small loop round their spot instead (npcs.js stroll) */
  const strl = (seed, kind, loop, id, p, look) => N.stroll(seed, { kind, loop, id, tweak: tw(look) }, p.dir);
  const FILL = [
    () => cit(601, 'kid', 'kite', 'rail-kite-kid', fillAt(50.5, -95.5), { ...shirt(P.sky, P.khaki, { outfit: 'shirtShorts', topPattern: 'checks' }), hair: { style: 'messy', color: 0x2b2330 }, acc: [], footwear: 'bare' }),
    () => strl(602, 'woman', 'chat', 'lane-aunty-gossip', fillAt(82.2, 84.8), { ...saree(P.rose, P.sky, P.saffron), hair: { style: 'bun', flower: true }, face: { bindi: true, specs: false }, acc: [{ name: 'jhola', color: P.lilac }] }),
    () => strl(603, 'kid', 'wave', 'east-schoolgirl', fillAt(107.5, -62.8), { ...kurta(P.white, P.navy, { sleeves: 'short' }), hair: { style: 'plait', color: 0x2b2330 }, face: { lashes: true, smile: 'big' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white }),
    () => per('tourist', 604, 'gateway-road-tourist', fillAt(129.9, 15.3), { skin: 0xf6d2b4, top: P.mint, topPattern: 'floral', outfit: 'shirtShorts', hair: { style: 'cap', hat: P.butter, color: 0x9a5b32 } }, { loop: 'snap' }),
    () => strl(605, 'elder', 'idle', 'scrub-elder-umbrella', fillAt(105.7, -102.9), { ...kurta(P.sand, 0xf3ecd9), hair: { style: 'topi', hat: P.white, color: GREY }, face: { moustache: 'thick', specs: true }, acc: [{ name: 'umbrella', color: P.teal, color2: P.cream }] }),
    () => strl(606, 'man', 'phone', 'east-road-rickshaw-driver', fillAt(46, -49.5), { outfit: 'uniform', top: P.khaki, topPattern: 'belt', top2: 0x6c5d58, bottom: 0xc9b87e, hair: { style: 'short', color: 0x2b2330 }, face: { moustache: 'thick' }, acc: ['phone'], footwear: 'chappal' }),
    () => strl(607, 'teen', 'phone', 'seaview-selfie-teen', fillAt(109.1, 122.6), { ...shirt(P.pink, P.denim, { topPattern: 'dots' }), hair: { style: 'messy', color: 0x2b2330 }, acc: ['phone', 'sunglasses'], footwear: 'shoes' }),
    () => strl(608, 'woman', 'idle', 'bridge-road-shopper', fillAt(139.8, 123.2), { ...kurta(P.terracotta, P.cream, { sleeves: 'short' }), hair: { style: 'plait' }, face: { bindi: true }, acc: ['sabziBag', { name: 'jhola', color: P.teal }] }),
    () => strl(609, 'teen', 'idle', 'juhu-road-ball-teen', fillAt(104.2, 174.8), { ...shirt(P.teal, P.khaki, { outfit: 'shirtShorts', topPattern: 'stripes' }), hair: { style: 'cap', hat: P.sky, color: 0x2b2330 }, acc: ['ball'], footwear: 'shoes', footColor: P.red }),
    () => cit(610, 'elder', 'news', 'antilia-lane-walker', fillAt(74.5, 141.2), { ...shirt(P.white, 0x9a9ab4, { sleeves: 'long' }), hair: { style: 'cap', hat: P.white, color: GREY }, face: { specs: true }, acc: [], footwear: 'shoes', footColor: P.white }),
    () => strl(611, 'woman', 'idle', 'chawl-lane-vegetable-woman', fillAt(44.9, -175.1), { ...saree(P.butter, P.olive, P.rose), hair: { style: 'bun', color: GREY }, face: { bindi: true }, acc: ['sabziBag'] }),
    () => strl(612, 'man', 'wave', 'chawl-lane-milkman', fillAt(44.7, 112.5), { ...shirt(P.cream, P.khaki, { sleeves: 'long' }), hair: { style: 'cap', hat: P.sky, color: 0x2b2330 }, face: { moustache: 'thin' }, acc: ['kettle'], footwear: 'chappal' }),
    () => strl(613, 'woman', 'watch', 'deco-office-woman', fillAt(74.5, 63), { ...shirt(P.white, 0x7f8fb5, { sleeves: 'short' }), hair: { style: 'bun' }, face: { lashes: true }, acc: ['briefcase', 'watch'], footwear: 'shoes' }),
    () => strl(614, 'kid', 'idle', 'east-field-ball-kid', fillAt(114.3, -82.2), { ...shirt(P.lilac, P.olive, { outfit: 'shirtShorts' }), hair: { style: 'short', color: 0x2b2330 }, acc: ['ball'], footwear: 'bare' }),
    () => cit(615, 'man', 'bat', 'field-batting-uncle', fillAt(72, -152.6), { ...shirt(P.sand, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'short', color: GREY }, face: { moustache: 'thick' }, acc: ['cricketBat'], footwear: 'shoes', footColor: P.white }),
    () => strl(616, 'woman', 'phone', 'field-phone-woman', fillAt(75.9, -100.9), { ...kurta(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'plait' }, face: { specs: true, bindi: true }, acc: ['phone'] }),
    () => strl(617, 'teen', 'idle', 'north-field-backpacker-teen', fillAt(103.8, -132.7), { ...shirt(P.mint, P.navy, { topPattern: 'checks', sleeves: 'long' }), hair: { style: 'messy', color: 0x2b2330 }, face: { specs: true }, acc: ['backpack'], footwear: 'shoes' }),
    () => per('chanaSeller', 618, 'beach-road-peanut-seller', fillAt(111.1, -166.2), { bottom: P.lilac }),
  ];
  FILL.forEach((f) => guard(f));
  void W; void pathOf; void PATHS;
}
