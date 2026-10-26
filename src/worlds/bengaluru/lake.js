/**
 * bengaluru/lake.js: makes the water read as a lake: lotus pads (instanced, via the bank's `lotus` spec) and a few ducks near the shores.
 * Boats are placed by bridges.js (boats()); this file only adds the calm-water life. All positions are rejection-sampled on the water
 * (0 < sea field < ~16), kept off the Sea-Link / Haji Ali corridor and every placed footprint, so nothing in layout.js moves.
 */
import * as THREE from 'three';
import { GEO, seaField, dist, stepAlong, polar } from './geo.js';
import { freeSpot } from './spots.js';
import { Mix, meshOf, finish } from './props/kit.js';

const TAU = Math.PI * 2;

/** a small mallard-style duck (white/brown), facing +Z, waterline at y=0 */
export function createDuck(ink, { seed = 0 } = {}) {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const p = new Mix();
  const brown = seed % 3 === 0;
  const body = brown ? 0xb08a5e : 0xfbf6e8, wing = brown ? 0x8a6a46 : 0xe9e1cc;
  p.ball(0.3, body, { pos: [0, 0.2, 0], scale: [0.85, 0.7, 1.25], w: 8, h: 6 });
  p.ball(0.2, wing, { pos: [0, 0.3, -0.18], scale: [0.95, 0.5, 1.2], w: 6, h: 5, outline: false });
  p.ball(0.15, brown ? 0x3f7c5f : 0xfbf6e8, { pos: [0, 0.52, 0.3], w: 7, h: 5 });
  p.cone(0.065, 0.2, 0xf2a03a, { pos: [0, 0.5, 0.52], rot: [Math.PI / 2, 0, 0], seg: 5, outline: false });
  for (const sx of [-1, 1]) p.ball(0.03, 0x2b2440, { pos: [sx * 0.085, 0.56, 0.4], w: 4, h: 3, outline: false });
  inner.add(meshOf(ink, p, { spacing: 0.05, thickness: 1.5 }));
  let t = seed * 1.7;
  g.userData.animate = (dt) => { t += dt; inner.position.y = Math.sin(t * 1.4) * 0.025; inner.rotation.z = Math.sin(t * 1.1) * 0.05; inner.rotation.y = Math.sin(t * 0.35) * 0.35; };
  return finish(g, { footprint: { w: 0.8, l: 1 }, colliders: [] });
}

export function lake(W) {
  const rnd = W.rng;
  const dens = W.dens;
  const up = new THREE.Vector3(0, 1, 0);
  const isle = GEO.hajiIsle.c;
  const sample = (lo, hi, minPole = 40) => {
    for (let i = 0; i < 400; i++) {
      const z = rnd() * 2 - 1, a = rnd() * TAU, rr = Math.sqrt(1 - z * z);
      const dir = new THREE.Vector3(rr * Math.cos(a), z, rr * Math.sin(a));
      const s = seaField(dir);
      if (s < lo || s > hi || dist(dir, up) < minPole || dist(dir, isle) < 12) continue;
      if (!freeSpot(dir, 1.6)) continue;
      return dir;
    }
    return null;
  };
  // lotus beds: clusters of pads in the shallows
  const beds = Math.round(36 * dens);
  for (let b = 0; b < beds; b++) {
    const c = sample(2.5, 12);
    if (!c) continue;
    const n = 3 + Math.floor(rnd() * 4);
    for (let k = 0; k < n; k++) {
      const t = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5);
      t.addScaledVector(c, -t.dot(c)).normalize();
      const dir = stepAlong(c, t, rnd() * 3.2);
      if (seaField(dir) < 1.5 || !freeSpot(dir, 1.2)) continue;
      W.bank.add('lotus', dir, rnd() * TAU, 0.8 + rnd() * 0.7, { collide: false, lift: W.seaR - W.planet.getSurfaceRadius(dir) + 0.03 });
    }
  }
  // ducks: little flocks of 2-4 near the shore
  const flocks = Math.round(9 * Math.min(1, dens + 0.1));
  let id = 0;
  for (let f = 0; f < flocks; f++) {
    const c = sample(4, 14);
    if (!c) continue;
    const head = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).addScaledVector(c, 0).normalize();
    head.addScaledVector(c, -head.dot(c)).normalize();
    const n = 2 + Math.floor(rnd() * 3);
    for (let k = 0; k < n; k++) {
      const t = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5);
      t.addScaledVector(c, -t.dot(c)).normalize();
      const dir = stepAlong(c, t, 0.8 + rnd() * 2.4);
      if (seaField(dir) < 3 || !freeSpot(dir, 0.8)) continue;
      const duck = createDuck(W.ink, { seed: id++ });
      const fwd = head.clone().addScaledVector(dir, -head.dot(dir)).normalize();
      W.add(duck, { dir, fwd, radius: W.seaR - 0.02, maxDist: 70, height: 1, collide: false, walkable: false });
    }
  }
  void polar;
}
