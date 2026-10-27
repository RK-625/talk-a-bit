/**
 * delhi/bridges.js: the Bandra-Worli Sea Link, Haji Ali's island and causeway, and the harbour boats.
 *   Sea Link: deck segments laid along a great-circle arc across the channel at a fixed deckH above the sea (ramping up from
 *             each shore), two pylons in the water, one continuous walkable floor following the same height profile.
 *   Haji Ali: the shrine on its island + createCauseway pieces from the shore to the island, walkable.
 * bridges(W) -> { seaLink: { surface, heightAt(s) } }
 */
import * as THREE from 'three';
import { BRIDGE, GEO, R, stepAlong, tangentTo, seaField, smooth, LAND_H, polar, dist, shoreToward } from './geo.js';
import { createDeckSegment, createPylon, createPier, createEmbankment, createHajiAli, createCauseway } from './landmarks/index.js';
import { createBoat } from './props/index.js';
import { HAJI } from './layout.js';

const lerp = THREE.MathUtils.lerp;

export function bridges(W) {
  const out = {};
  seaLink(W, out);
  hajiAli(W, out);
  boats(W);
  return out;
}

function seaLink(W, out) {
  const { center: c, t, half, deckH, ramp } = BRIDGE;
  const seaR = W.seaR;
  const h = (s) => lerp(LAND_H + 0.05, deckH, smooth(half - Math.abs(s), 0, ramp)); // height of the deck top above the sea
  const point = (s, outv = new THREE.Vector3()) => {
    const a = s / R;
    return outv.copy(c).multiplyScalar(Math.cos(a)).addScaledVector(t, Math.sin(a)).normalize();
  };
  const tangentAt = (s, outv = new THREE.Vector3()) => {
    const a = s / R;
    return outv.copy(t).multiplyScalar(Math.cos(a)).addScaledVector(c, -Math.sin(a)).normalize();
  };
  const SEG = 4;
  const n = Math.round((2 * half) / SEG);
  for (let i = 0; i < n; i++) {
    const s = -half + (i + 0.5) * ((2 * half) / n);
    const g = createDeckSegment(W.ink, (2 * half) / n + 0.08);
    const dir = point(s);
    const pitch = Math.atan2(h(s + 1) - h(s - 1), 2);
    W.add(g, { dir, fwd: tangentAt(s), radius: seaR + h(s), maxDist: 120, height: 7, walkable: false, shadow: true });
    g.rotateX(-pitch); // nose up while climbing (+z forward)
    g.updateMatrixWorld(true);
  }
  // piers under the water spans (down to the sea bed) and embankments carrying the land approaches down to the ground
  const bed = 2.8; // sea bed is ~2.4 below the sea surface out here
  for (const s of [-15.5, -0.5, 15.5]) {
    const g = createPier(W.ink, h(s) + bed);
    const pitch = Math.atan2(h(s + 1) - h(s - 1), 2);
    W.add(g, { dir: point(s), fwd: tangentAt(s), radius: seaR + h(s), maxDist: 120, height: 7, walkable: false, collide: false });
    g.rotateX(-pitch);
  }
  const EB = 4.1;
  for (const side of [-1, 1]) {
    for (let k = 0; k < 5; k++) {
      const s = side * (17.5 + EB * (k + 0.5));
      if (Math.abs(s) > half - 0.5) break;
      const depth = Math.max(1.2, h(s) - (LAND_H - 0.1) + 0.9);
      const g = createEmbankment(W.ink, EB + 0.1, depth);
      const pitch = Math.atan2(h(s + 1) - h(s - 1), 2);
      W.add(g, { dir: point(s), fwd: tangentAt(s), radius: seaR + h(s), maxDist: 110, height: 5, walkable: false });
      g.rotateX(-pitch);
    }
  }
  // pylons in the water
  for (const s of [-8, 8]) {
    const g = createPylon(W.ink, { baseDepth: deckH + 3.2, lean: Math.sign(s) }); // caissons reach the river bed; each steel pylon leans away from the span's middle
    W.add(g, { dir: point(s), fwd: tangentAt(s), radius: seaR + deckH, maxDist: Infinity, height: 24, walkable: false });
  }
  // one walkable floor for the whole bridge
  const n_ = new THREE.Vector3().crossVectors(c, t).normalize();
  const hw = 3.35, ROAD_HALF = 1.95, FOOT = 0.22; // deck: road 3.6 wide flanked by 1.5 footpaths raised 0.22
  const surface = {
    c: c.clone(), cosR: Math.cos((half + 4) / R),
    contains(d) {
      if (d.dot(c) < 0.5) return false;
      const lat = Math.asin(THREE.MathUtils.clamp(d.dot(n_), -1, 1)) * R;
      if (Math.abs(lat) > hw) return false;
      const s = Math.atan2(d.dot(t), d.dot(c)) * R;
      return Math.abs(s) <= half;
    },
    heightAt(d) {
      const s = Math.atan2(d.dot(t), d.dot(c)) * R;
      const lat = Math.abs(Math.asin(THREE.MathUtils.clamp(d.dot(n_), -1, 1)) * R);
      return seaR + h(THREE.MathUtils.clamp(s, -half, half)) + (lat > ROAD_HALF ? FOOT : 0) + 0.06;
    },
  };
  W.planet.addWalkableSurface(surface);
  out.seaLink = { surface, heightAt: h, point, tangentAt };
}

function hajiAli(W, out) {
  const c = HAJI.dir;
  const seaR = W.seaR;
  // direction toward the nearest shore: straight inland (toward the pole)
  const t0 = tangentTo(c, new THREE.Vector3(0, 1, 0));
  let Lc = 30;
  for (let d = 8; d < 60; d += 0.5) { if (seaField(stepAlong(c, t0, d)) < -2.5) { Lc = d; break; } }
  const shrine = createHajiAli(W.ink);
  W.add(shrine, { dir: c, fwd: t0, maxDist: Infinity, height: 10 });
  const from = 5.2, to = Lc + 2.5;
  const n = Math.ceil((to - from) / 4);
  const segL = (to - from) / n;
  for (let i = 0; i < n; i++) {
    const s = from + (i + 0.5) * segL;
    const dir = stepAlong(c, t0, s);
    const g = createCauseway(W.ink, segL + 0.1);
    W.add(g, { dir, fwd: t0, radius: seaR + 0.45, maxDist: 110, height: 3 });
  }
  out.haji = { shrine, causewayLength: to - from, shoreDist: Lc, t0 };
}

function boats(W) {
  const n = Math.round(9 * Math.min(1, W.dens + 0.1));
  const spots = [
    { c: stepAlong(shoreToward(GEO.harbour.c, polar(140, 0)).dir, shoreToward(GEO.harbour.c, polar(140, 0)).heading.clone().negate(), 11), r: 11, k: 5 }, // Gateway harbour, off the quay
    { c: polar(150, 50), r: 14, k: 2 }, // Back Bay
    { c: polar(140, 192), r: 24, k: 2 }, // off Juhu
    { c: GEO.hajiBay.c, r: 7, k: 1 },
  ];
  let i = 0;
  const rnd = W.rng;
  for (const sp of spots) for (let k = 0; k < sp.k && i < n; k++) {
    for (let tries = 0; tries < 40; tries++) {
      const rr = rnd() * sp.r;
      const t = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5);
      t.addScaledVector(sp.c, -t.dot(sp.c)).normalize();
      const dir = stepAlong(sp.c, t, rr);
      if (seaField(dir) < 5) continue;
      const b = createBoat(W.ink, { seed: i });
      W.add(b, { dir, fwd: t, radius: W.seaR - 0.28, maxDist: 100, height: 4, collide: false, walkable: false });
      i++; break;
    }
  }
  void dist;
}
