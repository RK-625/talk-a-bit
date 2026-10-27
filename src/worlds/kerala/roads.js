/**
 * kerala/roads.js: everything that dresses the roads and the ground between the landmarks.
 *   - dashed white lane doodles (one merged ribbon mesh following each road curve)
 *   - street furniture + trees through the chunked instance bank (lamp posts, hydrants, bollards, potholes, manholes, stools,
 *     crates, palms, banyans, beach umbrellas, sandcastles, stumps, dog bowl) around the chowk, roads, Juhu and the shore
 *   - traffic signals at the two big junctions, wires strung between the chowk poles
 * roads(W, S) uses the placed scenery in S.items for anchors.
 */
import * as THREE from 'three';
import { PATHS, GEO, R, polar, stepAlong, tangentTo, seaField, beachness, dist, pathNearest, MARINE, bayAngle, BRIDGE } from './geo.js';
import { PLACED, resolveAt } from './layout.js';
import { createTrafficSignal, createWires, createRoadSign } from './props/index.js';
import { frameAt, localToDir } from '../../engine/place.js';
import { flagShadows } from './world.js';

const DASH = 1.7, GAP = 1.9, HALF_W = 0.11;

export function roads(W, S) {
  dashes(W);
  furniture(W, S);
  junctions(W, S);
  wiresAndPoles(W, S);
}

/** one merged ribbon mesh of white dashes along every driven road's centreline */
function dashes(W) {
  const pos = [], nor = [], col = [];
  const white = new THREE.Color(0xfffaf0);
  const f = {}, q = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3(), c0 = new THREE.Vector3(), c1 = new THREE.Vector3();
  const quad = (p0, p1, lat) => {
    // quad from p0 to p1 (dirs), half-width HALF_W along the left vector
    for (const [dd, side] of [[p0, -1], [p0, 1], [p1, -1], [p1, 1]]) void dd, void side;
  };
  void quad;
  const zero = new THREE.Vector3();
  for (const id of ['ring', 'great', 'east', 'west', 'juhuRoad', 'marine']) {
    const path = PATHS[id];
    const skipStart = id === 'great' ? 7 : id === 'east' || id === 'west' ? 6 : id === 'marine' ? 0 : 0;
    for (let s = skipStart; s < path.length - (path.closed ? 0 : 2); s += DASH + GAP) {
      if (id === 'ring' && skipRingNearJunction(path, s)) continue;
      const p = [];
      for (const ds of [0, DASH * 0.5, DASH]) { path.at(s + ds, f); p.push({ dir: f.dir.clone(), left: f.left.clone() }); }
      const rr = (d) => W.planet.getSurfaceRadius(d) + 0.05;
      for (let i = 0; i < 2; i++) {
        const A = p[i], B = p[i + 1];
        const v = [A, B].map((P) => [stepAlong(P.dir, P.left, HALF_W), stepAlong(P.dir, P.left, -HALF_W)]);
        const pts = [v[0][0], v[0][1], v[1][0], v[1][1]].map((d) => d.clone().multiplyScalar(rr(d)));
        for (const k of [0, 1, 2, 1, 3, 2]) { pos.push(pts[k].x, pts[k].y, pts[k].z); const n = pts[k].clone().normalize(); nor.push(n.x, n.y, n.z); col.push(white.r, white.g, white.b); }
      }
    }
  }
  void zero; void q; void a; void b; void c0; void c1;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, side: THREE.DoubleSide });
  const m = new THREE.Mesh(g, mat);
  m.name = 'lane-dashes';
  m.receiveShadow = true;
  m.frustumCulled = false;
  W.root.add(m);
}
function skipRingNearJunction(path, s) {
  // keep the ring's dashes off the four lane/road mouths so junctions read as open crossings
  const f = path.at(s, {});
  const h = pathNearest(f.dir, ['road']);
  return false && h.p === null;
}

// ---- dressing -----------------------------------------------------------------------------------------------------------
import { freeSpot, clearOfRoads } from './spots.js';

function furniture(W, S) {
  const { bank, planet, rng } = W;
  const rnd = rng;
  const dens = W.dens;
  const frames = {};
  // lamp posts along roads (alternating sides), with hydrants / bollards sprinkled
  const lampSpacing = 17;
  const sideOf = { ring: 1, great: 1, east: 1, west: 1, juhuRoad: 1 };
  for (const id of Object.keys(sideOf)) {
    const path = PATHS[id];
    let k = 0;
    for (let s = id === 'ring' ? 9 : 15; s < path.length - 6; s += lampSpacing) {
      const f = path.at(s, {});
      const side = k++ % 2 ? 1 : -1;
      const lat = side * (path.w / 2 + 1.9);
      const dir = stepAlong(f.dir, f.left, lat);
      if (!freeSpot(dir, 1.2)) continue;
      if (nearRail(dir, 5)) continue;
      if (id === 'juhuRoad' && dist(dir, BRIDGE.end) < 20) continue; // the Juhu road hairpins off the ramp: a lamp here stands between both legs, in the Sea Link cars' U-turn
      const face = tangentTo(dir, f.dir); // lamp arm toward the road
      bank.add('lampPost', dir, face);
      if (!(id === 'great' && s > 74 && s < 106) && rnd() < 0.5 * dens) bank.add('hydrant', stepAlong(dir, f.tan, 3.2), face);
    }
    // potholes & manholes on the carriageway
    const nHoles = Math.round(path.length / 30 * dens);
    for (let i = 0; i < nHoles; i++) {
      const s = 8 + rnd() * (path.length - 16);
      const f = path.at(s, {});
      const dir = stepAlong(f.dir, f.left, (rnd() - 0.5) * (path.w - 2.2));
      if (nearRail(dir, 6) || !freeSpot(dir, 0.5)) continue;
      bank.add(rnd() < 0.55 ? 'pothole' : 'manhole', dir, rnd() * 6.28, 1, { collide: false });
    }
  }
  // chowk dressing: stools & crates by the stalls, dog bowl at the tapri, stumps in the gully
  const around = (id, list) => {
    const g = S.items.get(id);
    if (!g) return;
    const pl = g.userData.placement;
    const fr = frameAt(pl.dir, pl.fwd, {});
    for (const [name, x, z, yaw = 0] of list) {
      const d = localToDir(fr, x, z, R, new THREE.Vector3());
      bank.add(name, d, fr.fwd.clone().applyAxisAngle(d, yaw), 1, { collide: name !== 'dogBowl' });
    }
  };
  around('tapri', [['stool', 3.4, 2.4], ['stoolBlue', 4.2, 1.6], ['crate', -3.4, 1.2, 0.5], ['dogBowl', 2.3, 0.9]]);
  around('vada', [['stool', 3.0, 2.3], ['stool', 2.4, 3.4], ['crateYellow', -3.2, 0.4, 0.3]]);
  around('paanStall', [['stoolBlue', -2.5, 2.2], ['crate', 2.4, 0.3]]);
  around('news', [['crateYellow', 2.7, 0.8]]);
  around('irani', [['stool', -5.4, 5.5], ['stoolBlue', -4.4, 6.4], ['stool', -3.5, 5.6]]);
  // gully cricket (left lane): stumps at both ends of the pitch
  const stump = (right, fwd, yaw = 0) => { const d = resolveAt({ sp: [right, fwd] }).dir; bank.add('stumps', d, yaw, 1, { collide: false }); };
  stump(-14, -3.5); stump(-14, 4.5, Math.PI);
  // banyans: chowk corners, green maidans, Fort lawns
  const banyanSpots = [{ sp: [14.5, -3] }, { sp: [-14, 12] }, { sp: [-30, -1] }, { sp: [34, 12] }, { road: 'great', s: 48, lat: 38 }, { road: 'great', s: 86, lat: -34 },
    { sp: [46, -46] }, { sp: [-50, -40] }, { sp: [-30, 62] }, { sp: [-60, 20] }, { road: 'east', s: 62, lat: 20 }, { road: 'great', s: 30, lat: 12 }];
  for (const at of banyanSpots) {
    const dir = resolveAt(at).dir;
    const kind = rnd() < 0.35 ? 'banyan' : rnd() < 0.5 ? 'mango' : 'jackfruit', sc = 0.9 + rnd() * 0.3;
    if (!freeSpot(dir, CANOPY[kind] * sc + 1.8) || !clearOfRoads(dir, 6)) continue;
    bank.add(kind, dir, rnd() * 6.28, sc); // banyans and peepals at the chowk corners and lawns
  }
  // palms and beach life along the coast, scattered by rejection sampling on the sphere
  scatterShore(W, rnd, dens);
  roadsideTrees(W, rnd);
  // scattered coconut palms and neem inland
  for (let i = 0, n = 0; i < 1400 && n < Math.round(90 * dens); i++) {
    const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, rr = Math.sqrt(1 - z * z);
    const dir = new THREE.Vector3(rr * Math.cos(a), z, rr * Math.sin(a));
    if (dir.y < -0.1 || seaField(dir) > -8) continue;
    const kind = pickTree(rnd, 0.5), sc = 0.9 + rnd() * 0.4;
    if (!freeSpot(dir, CANOPY[kind] * sc + 1.8) || !clearOfRoads(dir, 5.5) || dist(dir, new THREE.Vector3(0, 1, 0)) < 30) continue;
    if (pathNearest(dir, ['rail']).d < 8) continue;
    bank.add(kind, dir, rnd() * 6.28, sc); n++;
  }
}
/** Kerala trees: coconut palms dominant, then banana plants, jackfruit, mango; a little neem/peepal. `palmShare` of the picks are palms. Canopy radius = SCENIC in world.js (spacing rule: canopy + ~1.8). */
const CANOPY = { palm: 1.9, palm2: 1.9, neem: 3.2, neem2: 3.2, peepal: 3.4, banyan: 3.4, jackfruit: 3.0, jackfruit2: 3.0, mango: 3.6, mango2: 3.6, banana: 1.4, banana2: 1.4 };
function pickTree(rnd, palmShare = 0.55) {
  const u = rnd();
  if (u < palmShare) return rnd() < 0.5 ? 'palm' : 'palm2';
  const v = (u - palmShare) / (1 - palmShare), two = rnd() < 0.5;
  if (v < 0.34) return two ? 'banana' : 'banana2';
  if (v < 0.60) return two ? 'jackfruit' : 'jackfruit2';
  if (v < 0.84) return two ? 'mango' : 'mango2';
  return v < 0.94 ? (two ? 'neem' : 'neem2') : 'peepal';
}
/** a row of shade trees along both sides of the roads, skipping the bridge, rail, junctions and anything placed */
function roadsideTrees(W, rnd) {
  const { bank } = W;
  for (const id of ['ring', 'great', 'east', 'west', 'juhuRoad']) {
    const path = PATHS[id];
    let k = 0;
    for (let s = (id === 'ring' ? 14 : 22) + rnd() * 6; s < path.length - 8; s += 16 + rnd() * 10) {
      const f = path.at(s, {});
      const side = k++ % 3 === 2 ? -1 : (k % 2 ? 1 : -1);
      const dir = stepAlong(f.dir, f.left, side * (path.w / 2 + 4.6 + rnd() * 1.2));
      if (dist(dir, new THREE.Vector3(0, 1, 0)) < 24 || nearRail(dir, 9) || seaField(dir) > -5) continue;
      const kind = pickTree(rnd, 0.55), sc = 0.95 + rnd() * 0.3;
      if (!clearOfRoads(dir, 4.6) || !freeSpot(dir, CANOPY[kind] * sc + 1.8)) continue;
      bank.add(kind, dir, rnd() * 6.28, sc);
    }
  }
}
function nearRail(dir, m) { return pathNearest(dir, ['rail']).d < m; }

function scatterShore(W, rnd, dens) {
  const { bank } = W;
  const pole = new THREE.Vector3(0, 1, 0);
  let palms = 0, umb = 0, castles = 0, tries = 0;
  const wantPalms = Math.round(90 * dens), wantUmb = Math.round(8 * dens), wantCastle = Math.round(4 * dens);
  while (tries++ < 6000 && (palms < wantPalms || umb < wantUmb || castles < wantCastle)) {
    const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, rr = Math.sqrt(1 - z * z);
    const dir = new THREE.Vector3(rr * Math.cos(a), z, rr * Math.sin(a));
    if (dir.y > 0.35) continue; // shores are far from the spawn
    const s = seaField(dir);
    const beach = beachness(dir);
    if (s > -2.0 || s < -12) continue;
    if (!freeSpot(dir, 1.5) || !clearOfRoads(dir, 5.6)) continue;
    const juhu = dist(dir, GEO.juhu.c) < GEO.juhu.r;
    if (beach > 0.4 && s > -7.5 && s < -3.5) {
      if (umb < wantUmb && rnd() < 0.18) { const sc = 0.9 + rnd() * 0.3; if (freeSpot(dir, 1.9 * sc)) { bank.add('beachUmbrella', dir, rnd() * 6.28, sc); umb++; continue; } }
      if (castles < wantCastle && rnd() < 0.1) { const sc = 0.6 + rnd() * 0.3; if (freeSpot(dir, 1.9 * sc)) { bank.add('sandcastle', dir, rnd() * 6.28, sc); castles++; continue; } }
    }
    if (palms < wantPalms && (juhu ? rnd() < 0.7 : rnd() < 0.2) && s < -2.0) { const sc = 0.85 + rnd() * 0.5; const kind = pickTree(rnd, 0.92); if (!freeSpot(dir, CANOPY[kind] * sc + 1.8)) continue; bank.add(kind, dir, rnd() * 6.28, sc); palms++; }
  }
  void pole; void MARINE; void bayAngle; void BRIDGE; void R; void polar;
}

// ---- junctions: traffic signals ------------------------------------------------------------------------------------------
function junctions(W, S) {
  const spots = [
    { at: { road: 'great', s: 11, lat: -5.0 }, face: 0 },
    { at: { road: 'great', s: 11, lat: 5.0 }, face: 180 },
  ];
  for (const sp of spots) {
    const r = resolveAt(sp.at);
    const g = createTrafficSignal(W.ink);
    const fwd = r.fwd.clone().applyAxisAngle(r.dir, -(sp.face * Math.PI) / 180);
    W.add(g, { dir: r.dir, fwd, maxDist: 70 });
  }
}

// ---- wires between the chowk poles ---------------------------------------------------------------------------------------
function wiresAndPoles(W, S) {
  const pairs = [['pole1', 'pole2'], ['pole1', 'pole3']];
  W.wires = [];
  for (const [a, b] of pairs) {
    const A = S.items.get(a), B = S.items.get(b);
    if (!A || !B) continue;
    const pa = A.position, pb = B.position;
    const mid = pa.clone().add(pb).multiplyScalar(0.5);
    const up = mid.clone().normalize();
    const along = pb.clone().sub(pa); along.addScaledVector(up, -along.dot(up));
    const len = along.length();
    along.normalize();
    // wires group: local +X along the span
    const fwd = new THREE.Vector3().crossVectors(along, up).normalize();
    const half = len / 2;
    const g = createWires(W.ink, { from: [-half, 5.8, 0], to: [half, 5.7, 0], count: 2, spread: 0.4, sag: len * 0.05 });
    W.add(g, { dir: up, fwd, radius: mid.length(), collide: false, walkable: false, maxDist: 70, height: 7, shadow: false });
    W.wires.push({ group: g, half, len, from: 5.8, to: 5.7, sag: len * 0.05 });
  }
  void flagShadows; void createRoadSign;
}
