/**
 * mumbai/traffic.js: kaali-peeli taxis, red BEST double-deckers and auto-rickshaws driving three road loops, on the left.
 *   loop 1  the ring road round the chowk (closed circle, two directions = two lanes)
 *   loop 2  the Great Road racetrack (Fort -> toward the Gateway and back), crosses the railway
 *   loop 3  Marine Drive racetrack along Back Bay
 * Each vehicle is an engine actor on a lane path with a moving segment collider (the player bumps off it).
 *   loop 4  over the Sea Link: west road -> toll plaza -> deck -> Juhu road, and back
 * Vehicles slow/stop for: the player in front of them, the vehicle ahead (queueing), closed level crossings.
 * traffic(W) -> { vehicles }
 */
import * as THREE from 'three';
import { PATHS, R, stepAlong, buildPath, BRIDGE } from './geo.js';
import { createTaxi, createBus, createAutoRickshaw } from './props/index.js';
import { flagShadows } from './world.js';

const KINDS = {
  taxi: { make: (ink, i) => createTaxi(ink, { seed: 3 + i }), len: 5.5, collider: { radius: 1.25, height: 2.6, length: 2.6 }, cruise: 6.2 },
  bus: { make: (ink, i) => createBus(ink, { seed: 2 + i }), len: 10.7, collider: { radius: 1.6, height: 4.5, length: 7.4 }, cruise: 5.2 },
  auto: { make: (ink, i) => createAutoRickshaw(ink, { seed: 5 + i }), len: 3.9, collider: { radius: 1.05, height: 2.4, length: 1.4 }, cruise: 5.8 },
};
const CRUISE = 5.8; // one speed per lane keeps vehicles from catching each other up; queueing handles stops

const smoothstep = THREE.MathUtils.smoothstep;
const _a = new THREE.Vector3(), _b = new THREE.Vector3();

export function traffic(W) {
  const lanes = [];
  // loop 1: ring, both directions
  lanes.push({ id: 'ring+', dirs: offsetLoop(PATHS.ring, +1.65, 6), sign: 1, mix: ['taxi', 'bus', 'auto'] });
  lanes.push({ id: 'ring-', dirs: offsetLoop(PATHS.ring, -1.65, 6), sign: -1, mix: ['auto', 'taxi', 'bus'] });
  // loop 2: Great Road racetrack
  lanes.push({ id: 'great', dirs: racetrack(PATHS.great, { s0: 12, s1: 92, off: 1.75, capNear: 3.1, capFar: 4.4 }), sign: 1, mix: ['taxi', 'auto', 'bus', 'taxi'] });
  // loop 3: Marine Drive racetrack
  lanes.push({ id: 'marine', dirs: racetrack(PATHS.marine, { s0: 8, s1: PATHS.marine.length - 8, off: 1.9, capNear: 4.2, capFar: 4.2 }), sign: 1, mix: ['taxi', 'bus', 'auto'] });

  // loop 4: across the Sea Link: the west road through the toll plaza, over the deck, down the Juhu road and back the other lane
  const seaLink = seaLinkPath();
  lanes.push({ id: 'seaLink', dirs: racetrack(seaLink, { s0: 2, s1: seaLink.length - 2, off: 1.0, capNear: 1.6, capFar: 1.6 }), sign: 1, mix: ['taxi', 'auto', 'taxi'], deck: true });

  const vehicles = [];
  const player = W.player;
  const dens = W.dens;
  lanes.forEach((lane, li) => {
    const full = [...lane.mix, ...lane.mix.slice(1), lane.mix[0]]; // twice the lane's mix, rotated so the same kind never runs twice in a row
    const mix = full.slice(0, Math.max(2, Math.round(full.length * (0.45 + 0.55 * dens))));
    const n = mix.length;
    const members = [];
    mix.forEach((kind, i) => {
      const spec = KINDS[kind];
      const g = spec.make(W.ink, i + li * 5);
      flagShadows(g);
      const speed = CRUISE;
      const phase = (i + (li % 2) * 0.37) / n;
      const actor = W.actors.add(g, { type: 'spline', dirs: lane.dirs, speed: lane.sign * speed, closed: true, phase },
        { radiusFn: lane.deck ? (d) => W.planet.getWalkRadius(d) : (d) => W.planet.getSurfaceRadius(d), collider: spec.collider }); // deck lanes ride the bridge surface
      W.root.add(g);
      const item = W.cull(g, { maxDist: 62, radius: 6, height: 6, dynamic: true, outlineDist: 30 });
      const v = { g, actor, spec, lane, item, speed, target: speed, sign: lane.sign };
      members.push(v);
      vehicles.push(v);
    });
    lane.members = members;
  });

  W.updaters.push((dt) => {
    const crossings = W.crossings ?? [];
    const pu = player.up;
    for (const lane of lanes) {
      const m = lane.members;
      for (let i = 0; i < m.length; i++) {
        const v = m[i];
        const fwd = v.actor.forward, dir = v.actor.dir;
        let target = CRUISE;
        // player in front?
        _a.copy(pu).addScaledVector(dir, -pu.dot(dir));
        const dp = Math.acos(THREE.MathUtils.clamp(pu.dot(dir), -1, 1)) * R;
        if (dp < 16) {
          const along = _a.dot(fwd) * dp / Math.max(1e-6, _a.length());
          const lat = Math.abs(_b.crossVectors(dir, fwd).dot(_a)) * dp / Math.max(1e-6, _a.length());
          const reach = v.spec.len * 0.5 + 3.2 + v.speed * 0.9;
          if (along > 0 && along < reach && lat < 2.8) target = 0;
        }
        // leader in the lane
        const L = m[(i + (v.sign > 0 ? 1 : m.length - 1)) % m.length];
        if (L !== v) {
          _a.copy(L.actor.dir).addScaledVector(dir, -L.actor.dir.dot(dir));
          const dl = Math.acos(THREE.MathUtils.clamp(L.actor.dir.dot(dir), -1, 1)) * R;
          const ahead = dl > 1e-3 ? _a.normalize().dot(fwd) : 0;
          const need = (v.spec.len + L.spec.len) / 2 + 3.5;
          // only a leader driving the same way counts: on a short racetrack it can be oncoming in the other lane
          if (ahead > 0.6 && L.actor.forward.dot(fwd) > 0.3 && dl < need + 8) target = Math.min(target, dl < need ? 0 : CRUISE * (dl - need) / 8);
        }
        // closed crossings
        for (const x of crossings) {
          if (!x.closed) continue;
          const dx = Math.acos(THREE.MathUtils.clamp(x.dir.dot(dir), -1, 1)) * R;
          if (dx > 15) continue;
          _a.copy(x.dir).addScaledVector(dir, -x.dir.dot(dir)).normalize();
          const ahead = _a.dot(fwd);
          if (ahead > 0.5 && dx > v.spec.len * 0.5 + 3.2 && dx < v.spec.len * 0.5 + 12) target = 0;
        }
        v.target = target;
        v.speed += (target - v.speed) * Math.min(1, dt * (target < v.speed ? 3.5 : 1.4));
        if (v.speed < 0.02 && target === 0) v.speed = 0;
        v.actor.speed = v.sign * v.speed;
        if (v.item.near) v.g.userData.animate?.(dt, v.speed);
      }
    }
  });
  return { vehicles, lanes };
}

/** closed loop of dirs for a closed path, offset to the left of travel by `off`, every `step` units */
function offsetLoop(path, off, step) {
  const out = [];
  const f = {};
  const n = Math.round(path.length / step);
  for (let i = 0; i < n; i++) { path.at((i / n) * path.length, f); out.push(stepAlong(f.dir, f.left, off)); }
  return out;
}

/** out along the left lane of `path` from s0 to s1, round a U-turn cap, back along the other lane, round the near cap */
function racetrack(path, { s0, s1, off, capNear, capFar }) {
  const pts = [];
  const f = {};
  const P = (s, l) => {
    const sc = THREE.MathUtils.clamp(s, 0, path.length);
    path.at(sc, f);
    let d = f.dir.clone();
    if (s !== sc) d = stepAlong(d, f.tan, s - sc);
    return stepAlong(d, f.left, l);
  };
  const STEP = 5, blend = 9;
  const cn = s0 + capNear, cf = s1 - capFar;
  const sm = (u) => smoothstep(u, 0, 1);
  // coming off the near cap onto the out lane (left of travel = +l)
  for (let k = 0; k < 4; k++) { const u = k / 4; pts.push(P(cn + blend * u, lerp(capNear, off, sm(u)))); }
  for (let s = cn + blend; s < cf - blend - 1; s += STEP) pts.push(P(s, off));
  for (let k = 0; k < 4; k++) { const u = k / 4; pts.push(P(cf - blend + blend * u, lerp(off, capFar, sm(u)))); }
  // far cap: semicircle round the far end
  for (let k = 0; k <= 8; k++) { const phi = (k / 8) * Math.PI; pts.push(P(cf + capFar * Math.sin(phi), capFar * Math.cos(phi))); }
  // back along the other lane
  for (let k = 1; k <= 4; k++) { const u = k / 4; pts.push(P(cf - blend * u, -lerp(capFar, off, sm(u)))); }
  for (let s = cf - blend - STEP; s > cn + blend + 1; s -= STEP) pts.push(P(s, -off));
  for (let k = 0; k <= 4; k++) { const u = k / 4; pts.push(P(cn + blend - blend * u, -lerp(off, capNear, sm(u)))); }
  // near cap
  for (let k = 1; k < 8; k++) { const phi = (k / 8) * Math.PI; pts.push(P(cn - capNear * Math.sin(phi), -capNear * Math.cos(phi))); }
  return pts;
}
const lerp = THREE.MathUtils.lerp;

/** one open path: the last stretch of the west road (through the toll plaza), the bridge deck, the straight foot of the Juhu ramp (the Juhu road hairpins right after it) */
function seaLinkPath() {
  const west = PATHS.west, juhu = PATHS.juhuRoad;
  const dirs = [];
  const f = {};
  for (let s = west.length - 42; s < west.length - 6; s += 4) dirs.push(west.at(s, f).dir.clone());
  for (let k = 1; k <= BRIDGE.half * 2 - 1; k += 4) dirs.push(stepAlong(BRIDGE.start, BRIDGE.t, k));
  for (let s = 8; s <= 12; s += 4) dirs.push(juhu.at(s, f).dir.clone());
  return buildPath(dirs, false);
}
