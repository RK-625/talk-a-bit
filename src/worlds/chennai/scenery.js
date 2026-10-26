/**
 * chennai/scenery.js: turns layout.ITEMS into placed landmarks, shops and stalls (and the Marine Drive strip).
 * scenery(W) -> { items: Map id -> placed group }
 */
import * as THREE from 'three';
import * as L from './landmarks/index.js';
import * as P from './props/index.js';
import { ITEMS, resolveAll, checkOverlaps, JUHU, place as layoutPlace } from './layout.js';
import { PATHS, MARINE, GEO, stepAlong, tangentTo, bayAngle, R } from './geo.js';

// kind -> [factory(ink, opts), maxDist (units from the camera), tall?]
const INF = Infinity;
const KINDS = {
  tapri: [(i) => P.createChaiTapri(i), 60], vada: [(i) => P.createVadaPavStall(i), 55], paanS: [(i) => P.createPaanStall(i), 50],
  news: [(i) => P.createNewspaperStand(i), 50], fruit: [(i) => P.createFruitCart(i), 50], marigold: [(i) => P.createMarigoldMat(i), 45],
  bhel: [(i) => P.createBhelCart(i), 60], gola: [(i) => P.createGolaStall(i), 60],
  irani: [(i) => L.createIraniCafe(i), 85], poster: [(i) => L.createFilmPosterWall(i), 70], shrine: [(i) => L.createTempleShrine(i), 70],
  paanShop: [(i) => L.createPaanShop(i), 70],
  chawl: [(i, o) => L.createChawl(i, o.seed ?? 1), 170],
  gateway: [(i) => L.createGateway(i), INF], taj: [(i) => L.createTaj(i), INF], cst: [(i) => L.createCST(i), INF],
  antilia: [(i) => L.createAntilia(i), 160], bse: [(i) => L.createBSE(i), INF], rajabai: [(i) => L.createRajabai(i), INF], flora: [(i) => L.createFloraFountain(i), 140],
  busStop: [(i, o, it) => P.createBusStop(i, it?.id === 'cstBusStop' ? { name: 'CENTRAL', nameHi: 'சென்ட்ரல்' } : { name: 'FORT', nameHi: 'கோட்டை' }), 60], balloons: [(i) => P.createBalloonBunch(i), 55], taxi: [(i) => P.createTaxi(i, { seed: 3 }), 60],
  dabbaBike: [(i) => P.createDabbawalaBike(i), 55], laundry: [(i, o) => P.createLaundryLine(i, { length: o.length ?? 8 }), 60],
  pole: [(i) => P.createWirePole(i), 60], toll: [(i) => P.createTollBooth(i), 90], deco0: [(i) => L.createArtDeco(i, 0), 150], deco1: [(i, o, it) => (it?.id === 'deco4' ? L.createLighthouse(i) : L.createArtDeco(i, 1)), 150], deco2: [(i) => L.createArtDeco(i, 2), 150],
};

export function scenery(W) {
  const { ink } = W;
  const items = new Map();
  const placedItems = resolveAll(W.dens < 0.7 ? 0.5 : 1);
  for (const it of placedItems) {
    if (it.skipScenery) continue;
    const k = KINDS[it.kind];
    if (!k) { console.warn('scenery: no factory for', it.kind); continue; }
    if (W.dens < 0.7 && /^(fortChawl|eastChawl|ch[6-9])/.test(it.id ?? '')) continue; // touch devices: fewer filler blocks
    const g = k[0](ink, it.opts ?? {}, it);
    g.name = it.id ?? it.kind;
    W.add(g, { dir: it.dir, fwd: it.fwd, maxDist: k[1] });
    if (it.id) items.set(it.id, g);
  }
  const promenade = [];
  marineDrive(W, promenade);
  juhuStalls(W, items);
  return { items, promenade };
}

// ---- Marina Beach: promenade strip + low sea wall, lamp posts, kattumarams on the sand ---------------------------------
function marineDrive(W, promenade) {
  const { ink } = W;
  const segLen = 4;
  const a0 = -MARINE.span + 5, a1 = MARINE.span - 5;
  // promenade pieces along the shoreline: each piece local +Z = toward the sea (the bay centre), +X along the arc
  const arc = (a) => ((a * Math.PI) / 180) * (MARINE.shore(a) + 2.4);
  let total = 0; for (let a = a0; a < a1; a += 1) total += arc(a + 1) - arc(a);
  const n = Math.round(total / segLen);
  const lights = [];
  for (let i = 0; i < n; i++) {
    // invert arc length -> angle (monotonic)
    const target = ((i + 0.5) / n) * total;
    let a = a0, acc = 0;
    while (a < a1 && acc + (arc(a + 0.5) - arc(a)) < target) { acc += arc(a + 0.5) - arc(a); a += 0.5; }
    const dir = MARINE.pt(a, 2.4);
    const aheadDir = MARINE.pt(a + 1.5, 2.4);
    const toSea = tangentTo(dir, MARINE.c);
    const g = L.createPromenadeSegment(ink, segLen + 0.12);
    W.add(g, { dir, fwd: toSea, maxDist: 75 });
    promenade.push(g);
    if (i % 2 === 1) lights.push({ dir: MARINE.pt(a, 1.35), toSea }); // on the sea-wall line
    void aheadDir;
  }
  // streetlights on the wall line (every ~8 units): the Queen's Necklace
  for (const l of lights) {
    const g = L.createStreetlight(ink);
    W.add(g, { dir: l.dir, fwd: l.toSea, maxDist: 110, height: 6 });
  }
  // kattumaram boats pulled up at the waterline
  const nT = Math.round(10 * Math.min(1, W.dens + 0.2));
  for (let i = 0; i < nT; i++) {
    const a = a0 + 6 + (i / Math.max(1, nT - 1)) * (a1 - a0 - 12);
    const dir = MARINE.pt(a, -1.8 + (i % 2) * 1.2);
    const g = L.createKattumaram(ink, 3, 5 + i);
    W.add(g, { dir, fwd: tangentTo(dir, MARINE.c).applyAxisAngle(dir, i), radius: W.seaR + 0.05, maxDist: 70, collide: true, walkable: false });
  }
}

// ---- Juhu: bhel puri cart and gola stall on the sand, facing the sea ------------------------------------------------
function juhuStalls(W, items) {
  const pole = new THREE.Vector3(0, 1, 0);
  for (const [id, spot, make] of [['bhel', JUHU.bhel, (i) => P.createBhelCart(i)], ['gola', JUHU.gola, (i) => P.createGolaStall(i)]]) {
    const g = make(W.ink);
    g.name = id;
    const fwd = tangentTo(spot, pole).negate();
    W.add(g, { dir: spot, fwd, maxDist: 70 });
    if (!(import.meta.env.DEV && new URLSearchParams(location.search).has('before'))) layoutPlace({ id, kind: id, at: { fixed: { dir: spot, fwd } } }); // registered so the scatter keeps palms/umbrellas off the stalls
    items.set(id, g);
  }
}
