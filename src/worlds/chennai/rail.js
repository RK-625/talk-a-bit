/**
 * chennai/rail.js: the suburban railway loop round the city (same track and crossings as the Mumbai rail loop; only the train is new).
 *   track     instanced track segments along the closed rail path (sunk into the ground so roads cross it at one level)
 *   station   the platform on the straight stretch (walkable, step-up ramps at both ends)
 *   train     Chennai suburban EMU: motor coach + 4 coaches (cream and bottle green; one ladies coach) on engine actors; stops 3.5 s at the platform, then accelerates away; moving segment colliders
 *   crossings level crossings wherever a road meets the rail; barriers close as the train approaches (and block walkers/vehicles)
 * rail(W) -> { train, crossings, update(dt) }.  W.crossings is filled for the traffic module.
 */
import * as THREE from 'three';
import { PATHS, ROAD_DEFS, R, stepAlong, tangentTo, pathNearest, dist, STATION_B, polar, RAIL_RADIUS } from './geo.js';
import { createTrainCar, createLevelCrossing, C } from './props/index.js';
import { vcMat } from './props/kit.js';
import * as THREE_ from 'three';
import { createStation } from './landmarks/index.js';
import { STATION } from './layout.js';
import { setSegment } from '../../engine/colliders.js';
import { flagShadows } from './world.js';

const RAIL_TOP = 0.44; // rail head above the ground (wheels sit here)
const TRAIN = { vmax: 12.5, acc: 3.0, dec: 3.2, dwell: 3.5, cars: 5, spacing: 8.3, ladiesCar: 3 };

export function rail(W) {
  const path = PATHS.rail;
  const out = { crossings: [], train: null };
  W.crossings = out.crossings;

  // ---- track -------------------------------------------------------------------------------------------------------
  buildTrack(W, path); // ONE continuous swept track: ballast bed + two rails + evenly spaced sleepers, all following the ground

  // ---- station -----------------------------------------------------------------------------------------------------
  const sc = STATION.s;
  const stationDir = STATION.dir, zObj = STATION.fwd;
  const station = createStation(W.ink, {}); // (the station's own names live in landmarks/station.js)
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
    const car = createTrainCar(W.ink, { isEngine: i === 0, ladies: i === TRAIN.ladiesCar, seed: 40 + i }); // exactly ONE ladies car
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
void tangentTo;

/**
 * The track as one continuous sweep along the closed rail path (no segments, so no joints): per ~38-unit chunk of mesh
 *   ballast bed   a low trapezoid whose top follows the real ground height at every lateral point (flush with the ground, no wedge)
 *   rails         steel web + head boxes swept along the curve (one unbroken ribbon)
 *   sleepers      one box every SLEEPER_GAP units of ARC LENGTH (even spacing everywhere), each turned to the local tangent
 * Chunks share their end samples exactly, so the loop is watertight; each chunk is culled by distance.
 */
const SLEEPER_GAP = 0.7;
function buildTrack(W, path) {
  const T = THREE_;
  const L = path.length;
  const DS = 0.75; // sweep step along the curve
  const nChunks = Math.max(1, Math.round(L / 38));
  const stepsPer = Math.max(2, Math.round(L / nChunks / DS));
  const ds = L / (nChunks * stepsPer);
  const mat = vcMat(W.ink, 0.1, 0.9);
  const f = {};
  const col = (hex) => new T.Color(hex);
  const tmpP = new T.Vector3(), tmpD = new T.Vector3();
  const frames = []; // frames[k] = { dir, tan, left, r (centre ground radius) } at s = k*ds
  for (let k = 0; k <= nChunks * stepsPer; k++) {
    path.at(k * ds, f);
    frames.push({ dir: f.dir.clone(), tan: f.tan.clone(), left: f.left.clone(), r: W.planet.getSurfaceRadius(f.dir) });
  }
  /** world position of lateral offset x (left +) at frame fr; y relative to the ground there (follow) or to the centre ground */
  const at = (fr, x, y, follow, out) => {
    tmpD.copy(fr.dir).multiplyScalar(R).addScaledVector(fr.left, x).normalize();
    const rr = follow ? W.planet.getSurfaceRadius(tmpD) : fr.r;
    return out.copy(tmpD).multiplyScalar(rr + y);
  };
  /** sweep a convex profile [[x, y]] (x lateral, y above ground) between frames k0..k1; geometry non-indexed with flat colours */
  function sweep(prof, k0, k1, follow, color, pos, cols) {
    const n = prof.length;
    const ring = (fr) => prof.map(([x, y]) => at(fr, x, y, follow, new T.Vector3()));
    let prev = ring(frames[k0]);
    const c = col(color);
    const cen = new T.Vector3();
    for (let k = k0 + 1; k <= k1; k++) {
      const cur = ring(frames[k]);
      cen.set(0, 0, 0); for (const q of prev) cen.add(q); cen.divideScalar(n);
      for (let j = 0; j < n; j++) {
        const j2 = (j + 1) % n;
        const A = prev[j], B = prev[j2], C2 = cur[j2], D = cur[j];
        const nrm = new T.Vector3().subVectors(B, A).cross(tmpP.subVectors(D, A));
        const out = tmpD.copy(A).add(B).multiplyScalar(0.5).sub(cen);
        const quad = nrm.dot(out) >= 0 ? [A, B, C2, A, C2, D] : [A, C2, B, A, D, C2];
        for (const q of quad) { pos.push(q.x, q.y, q.z); cols.push(c.r, c.g, c.b); }
      }
      prev = cur;
    }
  }
  const sleeperGeo = new T.BoxGeometry(3.0, 0.2, 0.34);
  const m4 = new T.Matrix4();
  const nSleep = Math.round(L / SLEEPER_GAP), gap = L / nSleep;
  const sf = {};
  for (let c = 0; c < nChunks; c++) {
    const k0 = c * stepsPer, k1 = (c + 1) * stepsPer;
    const pos = [], cols = [];
    sweep([[-2.0, -0.4], [-1.55, 0.04], [1.55, 0.04], [2.0, -0.4]], k0, k1, true, 0xd7cbb8, pos, cols); // ballast bed
    for (const sx of [-0.95, 0.95]) {
      sweep([[sx - 0.08, 0.17], [sx + 0.08, 0.17], [sx + 0.08, 0.38], [sx - 0.08, 0.38]], k0, k1, false, C.steelDark, pos, cols); // web
      sweep([[sx - 0.13, 0.36], [sx + 0.13, 0.36], [sx + 0.13, 0.44], [sx - 0.13, 0.44]], k0, k1, false, C.steel, pos, cols); // head
    }
    // sleepers whose arc-length centre falls in this chunk
    const s0 = k0 * ds, s1 = k1 * ds;
    const sPos = [], sCol = [], sNrm = [];
    const wood = col(C.woodDark);
    for (let i = Math.ceil(s0 / gap - 1e-6); i * gap < s1 - 1e-6; i++) {
      path.at(i * gap, sf);
      const r = W.planet.getSurfaceRadius(sf.dir);
      m4.makeBasis(sf.left, sf.dir, sf.tan).setPosition(tmpP.copy(sf.dir).multiplyScalar(r + 0.1));
      const g = sleeperGeo.clone().toNonIndexed().applyMatrix4(m4);
      const p = g.attributes.position;
      for (let q = 0; q < p.count; q++) { sPos.push(p.getX(q), p.getY(q), p.getZ(q)); sCol.push(wood.r, wood.g, wood.b); }
    }
    const P = pos.concat(sPos), Cc = cols.concat(sCol);
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(P, 3));
    geo.setAttribute('color', new T.Float32BufferAttribute(Cc, 3));
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    const mesh = new T.Mesh(geo, mat);
    mesh.name = 'track' + c;
    mesh.receiveShadow = true;
    W.root.add(mesh);
    const mid = frames[Math.round((k0 + k1) / 2)].dir.clone().multiplyScalar(R);
    W.cull(mesh, { maxDist: 100, radius: 24, height: 2, position: mid });
  }
}
