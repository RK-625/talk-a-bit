/**
 * mumbai/rail.js: the Western Railway loop round the city.
 *   track     instanced track segments along the closed rail path (sunk into the ground so roads cross it at one level)
 *   station   the platform on the straight stretch (walkable, step-up ramps at both ends)
 *   train     engine + 4 cars on engine actors; stops 3.5 s at the platform, then accelerates away; moving segment colliders
 *   crossings level crossings wherever a road meets the rail; barriers close as the train approaches (and block walkers/vehicles)
 * rail(W) -> { train, crossings, update(dt) }.  W.crossings is filled for the traffic module.
 */
import * as THREE from 'three';
import { PATHS, ROAD_DEFS, R, stepAlong, tangentTo, pathNearest, dist, STATION_B, polar, RAIL_RADIUS } from './geo.js';
import { createTrackSegment, trackParts, createTrainCar, createLevelCrossing, Mix, C } from './props/index.js';
import * as THREE_ from 'three';
import { createStation } from './landmarks/index.js';
import { STATION } from './layout.js';
import { setSegment } from '../../engine/colliders.js';
import { flagShadows } from './world.js';

const SINK = 0.36; // track sunk into the ground
const RAIL_TOP = 0.44; // rail head above the ground (wheels sit here)
const TRAIN = { vmax: 12.5, acc: 3.0, dec: 3.2, dwell: 3.5, cars: 5, spacing: 8.3, ladiesCar: 3 };

export function rail(W) {
  const path = PATHS.rail;
  const out = { crossings: [], train: null };
  W.crossings = out.crossings;

  // ---- track -------------------------------------------------------------------------------------------------------
  const tp = trackBed(4); // own track parts: sleepers must stand clear of the ground even though the bed is sunk
  W.bank.specs.track = { parts: tp, collide: null, bodyRadius: 2, scale: [1, 1], hatch: 0.1, thickness: 1.5 };
  const f = {};
  const nSeg = Math.round(path.length / 4);
  for (let i = 0; i < nSeg; i++) {
    const s = (i + 0.5) * (path.length / nSeg);
    path.at(s, f);
    W.bank.add('track', f.dir, f.tan, path.length / nSeg / 4, { collide: false, lift: -SINK + 0.0 });
  }

  // ---- station -----------------------------------------------------------------------------------------------------
  const sc = STATION.s;
  const stationDir = STATION.dir, zObj = STATION.fwd;
  const station = createStation(W.ink, { names: ['चर्चगेट', 'CHURCHGATE'] });
  station.name = 'station';
  W.add(station, { dir: stationDir, fwd: zObj, maxDist: Infinity, height: 8, occlude: false });
  out.station = station;
  out.stationS = sc;

  // ---- level crossings ---------------------------------------------------------------------------------------------
  for (const id of ['great', 'east', 'west', 'juhuRoad']) {
    const rd = PATHS[id];
    let best = null;
    for (let i = 0; i < rd.samples.length; i++) {
      const dd = pathNearest(rd.samples[i].dir, ['rail']);
      if (dd.d < 3 && (!best || dd.d < best.d)) best = { d: dd.d, i, rs: dd.s };
      if (best && dd.d > 12) { out.crossings.push(makeCrossing(W, rd, best, path)); best = null; }
    }
    if (best) out.crossings.push(makeCrossing(W, rd, best, path));
  }

  // ---- the train ---------------------------------------------------------------------------------------------------
  const cars = [];
  const dirs = ROAD_DEFS.rail.dirs;
  const L = path.length;
  const sStop = sc + 2 * TRAIN.spacing; // head position when the middle car is at the platform centre
  let sHead = sStop - 150; // start a little before the station
  for (let i = 0; i < TRAIN.cars; i++) {
    const car = createTrainCar(W.ink, { isEngine: i === 0, ladies: i === TRAIN.ladiesCar, livery: i % 2 ? 'maroon' : 'purple', seed: 40 + i }); // exactly ONE ladies car
    flagShadows(car);
    const sCar = sHead - i * TRAIN.spacing;
    const actor = W.actors.add(car, { type: 'spline', dirs, speed: 0, closed: true, phase: (((sCar % L) + L) % L) / L },
      { radiusFn: (d) => W.planet.getSurfaceRadius(d) + RAIL_TOP, collider: { radius: 1.6, height: 4.2, length: 6.6 } });
    W.root.add(car);
    const item = W.cull(car, { maxDist: 130, radius: 6, height: 5, dynamic: true, outlineDist: 50 });
    cars.push({ car, actor, item });
  }
  const train = { cars, v: 0, sHead, state: 'run', dwellT: 0, applied: 0 };
  out.train = train;
  const mod = (x, m) => ((x % m) + m) % m;
  const wrapHalf = (x) => mod(x + L / 2, L) - L / 2;

  function updateTrain(dt) {
    train.sHead += train.applied * dt;
    const d = wrapHalf(sStop - train.sHead);
    let v = train.v;
    if (train.state === 'dwell') {
      v = 0; train.dwellT += dt;
      if (train.dwellT >= TRAIN.dwell) { train.state = 'go'; }
    } else {
      let target = TRAIN.vmax;
      if (train.state === 'run' && d > -1 && d < 70) target = Math.min(target, Math.sqrt(2 * TRAIN.dec * 0.85 * Math.max(0, d)) + 0.0);
      v += THREE.MathUtils.clamp(target - v, -TRAIN.dec * dt, TRAIN.acc * dt);
      if (train.state === 'run' && d < 0.35 && v < 0.9) { train.state = 'dwell'; train.dwellT = 0; v = 0; }
      if (train.state === 'go' && d < -6) train.state = 'run';
    }
    train.v = v; train.applied = v;
    for (const c of cars) c.actor.speed = v;
    // wheels
    for (const c of cars) if (c.item.near) c.car.userData.animate?.(dt, v);
  }

  // ---- crossings follow the train ----------------------------------------------------------------------------------
  function updateCrossings(dt) {
    for (const x of out.crossings) {
      let m = 1e9;
      for (const c of cars) { const dd = dist(x.dir, c.actor.dir); if (dd < m) m = dd; }
      const closed = m < 23 || (x.closed && m < 28); // hysteresis
      if (closed !== x.closed) { x.closed = closed; for (const u of x.units) u.group.userData.setClosed(closed); }
      for (const u of x.units) { u.group.userData.animate(dt); u.collider.height = u.group.userData.boomColliders().length ? 1.7 : -1; }
    }
  }

  out.update = (dt) => { updateTrain(dt); updateCrossings(dt); };
  W.updaters.push((dt) => out.update(dt));
  return out;
}

/** two full-width barriers (one each side of the track, on opposite sides of the road) + signal boxes */
function makeCrossing(W, road, best, rail) {
  const f = road.at(road.samples[best.i].s, {});
  const x = { dir: f.dir.clone(), tan: f.tan.clone(), road, closed: false, units: [] };
  const up = f.dir;
  const w = road.w;
  for (const sgn of [1, -1]) {
    // approach direction d = -sgn*tan (vehicles drive toward the track); unit stands 3.6 back from the track on that side
    const zObj = f.tan.clone().multiplyScalar(sgn); // object +Z points away from the track (toward oncoming traffic)
    const xObj = new THREE.Vector3().crossVectors(up, zObj).normalize(); // boom extends along +X
    const pos0 = stepAlong(f.dir, zObj, 3.7);
    const pos = stepAlong(pos0, xObj, -(w / 2 + 1.2)); // stand just off the near road edge, boom reaches across
    const g = createLevelCrossing(W.ink, { reach: w + 1.2, closed: false });
    g.userData.setClosed(false);
    W.add(g, { dir: pos, fwd: zObj, maxDist: 90, height: 5, collide: false, walkable: false });
    // boom collider (segment across the road), toggled by height
    const a = pos.clone(), b = stepAlong(pos, xObj, w + 1.2);
    const col = setSegment({ radius: 0.45, height: -1 }, a, b, R);
    W.colliders.add(col);
    // signal-box post collider
    W.colliders.add({ dir: pos.clone(), radius: 0.45, height: 3 });
    x.units.push({ group: g, collider: col });
  }
  return x;
}
void tangentTo; void createTrackSegment;

/** ballast bed + chunky wooden sleepers (clearly proud of the bed) + two steel rails; spans z in [-len/2, len/2] */
function trackBed(len) {
  const p = new Mix();
  const T = THREE_;
  const shape = new T.Shape([new T.Vector2(-1.9, 0), new T.Vector2(1.9, 0), new T.Vector2(1.45, 0.34), new T.Vector2(-1.45, 0.34)]);
  const bed = new T.ExtrudeGeometry(shape, { depth: len, bevelEnabled: false });
  bed.translate(0, 0, -len / 2);
  p.add(bed, 0xd7cbb8, { outline: false });
  const n = Math.round(len / 0.62), sp = len / n;
  for (let i = 0; i < n; i++) p.box(3.0, 0.2, 0.34, C.woodDark, { pos: [0, 0.43, -len / 2 + sp * (i + 0.5)], outline: false });
  for (const sx of [-1, 1]) {
    p.box(0.16, 0.26, len, C.steelDark, { pos: [sx * 0.95, 0.66, 0], outline: false });
    p.box(0.26, 0.07, len, C.steel, { pos: [sx * 0.95, 0.8, 0], outline: false });
  }
  const bedHull = bed.clone(); bedHull.deleteAttribute('normal'); bedHull.deleteAttribute('uv');
  const first = p.all[0].clone(); first.deleteAttribute('color'); first.deleteAttribute('normal');
  p.hull.push(first);
  return p;
}
