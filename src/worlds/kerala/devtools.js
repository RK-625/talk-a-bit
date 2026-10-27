/**
 * kerala/devtools.js (dev server only): window.__kerala for screenshots, perf numbers and scripted walks.
 *   __kerala.spots                          named places { id: {dir, fwd} }
 *   __kerala.goto(name, { dist=14, pitch, zoom })   teleport the hero in front of a landmark and frame it
 *   __kerala.perf() -> { mainCalls, mainTris, frameCalls, frameTris, culled, items }   renderer.info for ONE frame
 *   __kerala.frameTime(n=120) -> Promise<{ avgMs, maxMs }>
 *   __kerala.walk(targets, { timeout=80 }) -> [{to, outcome:'reached'|'stuck'|'fell'|'timeout', seconds, minR}]   walks the real player
 *       with held-W key events toward each target dir, stepping the engine synchronously (collisions, water, step rule apply)
 *   __kerala.view(distance, pitch)          set the camera orbit
 */
import * as THREE from 'three';
import { R, polar, polarOf, stepAlong, tangentTo, dist, BRIDGE, GEO, MARINE, bayAngle, PATHS, shorePoint } from './geo.js';
import { JUHU } from './layout.js';
import { frameAt } from '../../engine/place.js';
import { segmentPoint } from '../../engine/colliders.js';

export function installDevTools(W, { S, R: RL, B, T, N, D }) {
  const G = () => window.__game; // engine sets __game after build returns
  const spots = {};
  const POLE = new THREE.Vector3(0, 1, 0);
  for (const [id, grp] of S.items) {
    const pl = grp.userData.placement;
    if (pl) spots[id] = { dir: pl.dir.clone(), fwd: pl.fwd.clone() };
  }
  for (const [id, grp] of D?.props ?? []) { const pl = grp?.userData?.placement; if (pl && !spots[id]) spots[id] = { dir: pl.dir.clone(), fwd: pl.fwd.clone() }; }
  spots.spawn = { dir: POLE.clone(), fwd: new THREE.Vector3(0, 0, 1) };
  const station = RL.station.userData.placement;
  spots.station = { dir: station.dir.clone(), fwd: station.fwd.clone() };
  const sl = B.seaLink;
  spots.seaLinkWest = { dir: sl.point(-30), fwd: sl.tangentAt(-30) };
  spots.seaLinkMid = { dir: sl.point(0), fwd: sl.tangentAt(0) };
  spots.seaLinkEast = { dir: sl.point(30), fwd: sl.tangentAt(30) };
  spots.juhu = { dir: JUHU.bhel.clone(), fwd: tangentTo(JUHU.bhel, POLE).negate() };
  { const d = MARINE.pt(0, 5); spots.marine = { dir: d, fwd: tangentTo(d, MARINE.c) }; }
  { const d = MARINE.pt(-50, 5); spots.marineEnd = { dir: d, fwd: tangentTo(d, MARINE.c) }; }
  const hj = B.haji.shrine.userData.placement;
  spots.hajiAli = { dir: hj.dir.clone(), fwd: hj.fwd.clone() };

  const api = {
    W, spots,
    view(distance, pitch) { G().cameraRig.setView({ distance, pitch, snap: true }); },
    goto(name, { dist: d = 14, pitch = 0.42, zoom = 14, side = 0 } = {}) {
      const sp = spots[name];
      if (!sp) throw new Error('unknown spot ' + name + ': ' + Object.keys(spots).join(', '));
      // stand `d` units in front of it (along its facing), looking at it
      const fr = frameAt(sp.dir, sp.fwd, {});
      const at = side ? stepAlong(sp.dir, fr.right, d * side) : stepAlong(sp.dir, sp.fwd, d);
      const look = tangentTo(at, sp.dir);
      G().player.teleport(at, look);
      G().cameraRig.heading.copy(look);
      G().cameraRig.setView({ distance: zoom, pitch, snap: true });
    },
    /** render one frame and save the canvas as docs/screens/<name>.png through the dev server */
    async shot(name) {
      const G_ = G();
      G_.step(0.001, true);
      const blob = await new Promise((res) => G_.renderer.domElement.toBlob(res, 'image/png'));
      const r = await fetch('/__shot?name=' + encodeURIComponent(name), { method: 'POST', body: blob });
      return r.text();
    },
    perf() {
      const r = G().renderer;
      r.info.autoReset = false;
      const prevAuto = r.shadowMap.autoUpdate;
      r.info.reset();
      G().post.render(0);
      const frameCalls = r.info.render.calls, frameTris = r.info.render.triangles;
      r.shadowMap.autoUpdate = false;
      r.info.reset();
      r.setRenderTarget(null);
      r.render(G().scene, G().camera);
      const mainCalls = r.info.render.calls, mainTris = r.info.render.triangles;
      r.shadowMap.autoUpdate = prevAuto;
      r.info.autoReset = true;
      return { mainCalls, mainTris, frameCalls, frameTris, culledVisible: G().culler.stats.visible, items: G().culler.stats.total, geometries: r.info.memory.geometries, textures: r.info.memory.textures };
    },
    frameTime(n = 120) {
      return new Promise((res) => {
        const ts = [];
        let last = performance.now();
        const f = () => {
          const now = performance.now(); ts.push(now - last); last = now;
          if (ts.length < n) requestAnimationFrame(f);
          else { ts.shift(); res({ avgMs: +(ts.reduce((a, b) => a + b, 0) / ts.length).toFixed(2), maxMs: +Math.max(...ts).toFixed(1), n: ts.length }); }
        };
        requestAnimationFrame(f);
      });
    },
    /** walk the real player toward each target dir with simulated held-W (collisions, sea, step rule all apply).
     *  Steps the engine synchronously (no animation frames needed): returns [{to, reached, seconds, stuck, minR, fell}] */
    walk(targets, { timeout = 80, dt = 1 / 30 } = {}) {
      const G_ = G(), p = G_.player;
      const key = (down) => window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code: 'KeyW' }));
      const results = [];
      key(true);
      for (let i = 0; i < targets.length; i++) {
        const tgt = targets[i], td = tgt.dir ?? tgt;
        let sec = 0, stuckT = 0, lastD = 1e9, minR = 1e9, maxMove = 0, detour = 0, detourSign = 1, detours = 0;
        let outcome = null;
        while (!outcome) {
          const d = Math.acos(THREE.MathUtils.clamp(p.up.dot(td), -1, 1)) * R;
          minR = Math.min(minR, p.radius);
          if (d < 2.2) outcome = 'reached';
          else if (sec > timeout) outcome = 'timeout';
          else if (p.radius < W.seaR - 0.35) outcome = 'fell';
          else if (stuckT > 6) outcome = 'stuck';
          if (outcome) { results.push({ to: tgt.name ?? i, outcome, seconds: +sec.toFixed(1), remaining: +d.toFixed(1), minR: +minR.toFixed(2), at: p.up.toArray().map((v) => +v.toFixed(3)) }); break; }
          G_.cameraRig.heading.copy(tangentTo(p.up, td));
          if (detour > 0) { G_.cameraRig.heading.applyAxisAngle(p.up, detourSign * 0.95); detour--; } // sidestep an obstacle (people, props)
          G_.step(dt, false);
          sec += dt;
          if (lastD - d < 0.015) { stuckT += dt; if (stuckT > 0.9 && detour === 0) { detour = 22; detourSign = -detourSign; detours++; if (detours % 3 !== 0) stuckT = 0.3; } } else stuckT = Math.max(0, stuckT - dt * 0.5);
          lastD = d;
          if (p.up.dot(td) > 1) break;
        }
      }
      key(false);
      return results;
    },
    /** the scripted walk around the world: legs of waypoints, each from a teleport; returns a compact report */
    walkTests(only = null) {
      const G_ = G();
      const path = (id, s0, s1, lat, step = 8) => { const p = PATHS[id]; const r = []; for (let s = s0; s1 > s0 ? s <= s1 : s >= s1; s += s1 > s0 ? step : -step) r.push({ dir: p.lateral(s, lat), name: id + ':' + s }); return r; };
      const start = (dir, fwd) => { G_.player.teleport(dir, fwd); G_.step(0.05, false); };
      const rep = (name, res) => ({ leg: name, results: res.map((r) => `${r.to}:${r.outcome}${r.outcome === 'reached' ? '' : '@' + r.remaining}`), seconds: +res.reduce((a, r) => a + r.seconds, 0).toFixed(0), minR: Math.min(...res.map((r) => r.minR)), bad: res.filter((r) => r.outcome !== 'reached').length });
      const legs = {
        // Great Road footpath out to the Gateway, through the arch to the quay
        greatRoad() { const p = PATHS.great; start(p.lateral(2, 4.6), p.at(2, {}).tan); const gw = spots.gateway;
          return walkWith([...path('great', 8, 112, 4.6), { dir: stepAlong(gw.dir, gw.fwd, -9), name: 'preGateway' }, { dir: stepAlong(gw.dir, gw.fwd, 7), name: 'beyondArch' }]); },
        // across the level crossing + east road to CST
        eastRoad() { const p = PATHS.east; start(p.lateral(1, -3.6), p.at(1, {}).tan); return walkWith(path('east', 8, 70, -3.6)); },
        // onto the station platform from the road side (step-up rule + end ramp), along it
        station() { const st = spots.station; const fr = frameAt(st.dir, st.fwd, {});
          start(stepAlong(st.dir, fr.right, -16), tangentTo(stepAlong(st.dir, fr.right, -16), st.dir));
          const at = (x, z) => stepAlong(stepAlong(st.dir, fr.right, x), st.fwd, z);
          return walkWith([{ dir: at(11, 0), name: 'platformEndRamp' }, { dir: at(-1.2, 0.3), name: 'platformMid' }, { dir: at(-2.6, 0.2), name: 'platformBack' }]); },
        // Marine Drive promenade along the bay
        marineDrive() { const a = (ang) => MARINE.pt(ang, 2.6); start(a(-48), tangentTo(a(-48), a(-44)));
          const t = []; for (let ang = -44; ang <= 48; ang += 8) t.push({ dir: a(ang), name: 'prom' + ang }); return walkWith(t); },
        // Haji Ali: causeway from the shore to the island and back
        hajiAli() { const hj = B.haji; const c = spots.hajiAli; const t0 = tangentTo(c.dir, POLE);
          start(stepAlong(c.dir, t0, hj.shoreDist + 3), tangentTo(stepAlong(c.dir, t0, hj.shoreDist + 3), c.dir));
          return walkWith([{ dir: stepAlong(c.dir, t0, 14), name: 'midCauseway' }, { dir: stepAlong(c.dir, t0, 7.5), name: 'islandGate' }, { dir: stepAlong(c.dir, t0, 3), name: 'islandCourt' }, { dir: stepAlong(c.dir, t0, hj.shoreDist + 3), name: 'backToShore' }]); },
        // Sea Link: west shore -> across the deck -> east shore (and a step toward the water to prove it blocks)
        seaLink() { start(sl.point(-40), sl.tangentAt(-40)); return walkWith([-34, -20, -10, 0, 10, 20, 34, 40].map((s) => ({ dir: sl.point(s), name: 'sl' + s }))); },
        // Juhu: along the sand, then try to walk into the sea (must stop at the shore, not fall in)
        juhu() { const j = JUHU.bhel; const away = tangentTo(j, POLE).negate(); const fr = frameAt(j, away, {});
          const at = (f, sd) => stepAlong(stepAlong(j, away, f), fr.right, sd);
          start(at(-6, 7), away);
          return walkWith([{ dir: at(5, 7), name: 'toBeach' }, { dir: at(40, 7), name: 'intoSea(expect stuck)' }]); },
      };
      const sl = B.seaLink;
      const walkWith = (t) => api.walk(t, { timeout: 40 });
      const names = only ?? Object.keys(legs);
      return names.map((n) => { try { return rep(n, legs[n]()); } catch (e) { return { leg: n, error: String(e) }; } });
    },
    /** random-walk fuzz: n walks of `secs` game seconds from random land spots with random turns; reports falls into the sea,
     *  players embedded in colliders (stuck in buildings) and long no-progress stalls */
    fuzz(n = 30, secs = 25) {
      const G_ = G(), p = G_.player, key = (d) => window.dispatchEvent(new KeyboardEvent(d ? 'keydown' : 'keyup', { code: 'KeyW' }));
      let a = 12345; const rnd = () => ((a = (a * 16807) % 2147483647) / 2147483647);
      const V3 = POLE.constructor;
      const rep = { walks: 0, fell: [], embedded: [], stalled: [], seconds: 0 };
      const cols = G_.colliders;
      const embedded = () => { for (const c of cols) { if (c.height < 0) continue; let cd = c.dir; if (c.a) { cd = segPt(c, p.up); } const d = Math.acos(THREE.MathUtils.clamp(p.up.dot(cd), -1, 1)) * R; if (d < c.radius * 0.55 && p.radius - W.planet.getWalkRadius(p.up) < c.height - 0.3) return true; } return false; };
      const segPt = (c, up) => { const out = new V3(); return segmentPoint(c, up, out); };
      for (let i = 0; i < n; i++) {
        let dir, tries = 0;
        do {
          const z = rnd() * 2 - 1, th = rnd() * 6.2832, rr = Math.sqrt(1 - z * z);
          dir = new V3(rr * Math.cos(th), z, rr * Math.sin(th));
          tries++;
        } while (tries < 400 && (W.planet.getSurfaceRadius(dir) < W.seaR + 0.4 || dir.y < -0.35));
        G_.player.teleport(dir, tangentTo(dir, POLE.clone().add(new V3(rnd() - 0.5, 0, rnd() - 0.5)).normalize()));
        G_.step(0.05, false);
        key(true);
        let t = 0, turn = 0, lastPos = p.up.clone(), noProg = 0;
        while (t < secs) {
          if (t >= turn) { turn = t + 1 + rnd() * 3; const hd = G_.cameraRig.heading; hd.applyAxisAngle(p.up, (rnd() - 0.5) * 3.2); }
          G_.step(1 / 30, false); t += 1 / 30;
          if (p.radius < W.seaR - 0.4) { rep.fell.push(p.up.toArray().map((v) => +v.toFixed(3))); break; }
          if (((t * 30) | 0) % 150 === 0) { const moved = Math.acos(THREE.MathUtils.clamp(p.up.dot(lastPos), -1, 1)) * R; if (moved < 1.0) { noProg++; if (noProg >= 2) { // stalled 10 s: can it get out in any of 8 directions? (a real trap if not)
                const start = p.up.clone(); let out = 0;
                for (let k = 0; k < 8 && !out; k++) { G_.cameraRig.heading.applyAxisAngle(p.up, Math.PI / 4); for (let q = 0; q < 45; q++) G_.step(1 / 30, false); if (Math.acos(THREE.MathUtils.clamp(p.up.dot(start), -1, 1)) * R > 2.5) out = 1; }
                rep.stalled.push({ at: start.toArray().map((v) => +v.toFixed(5)), escaped: !!out }); noProg = 0; } } else noProg = 0; lastPos.copy(p.up); }
        }
        rep.walks++; rep.seconds += t;
        if (embedded()) rep.embedded.push(p.up.toArray().map((v) => +v.toFixed(3)));
      }
      key(false);
      return { ...rep, seconds: Math.round(rep.seconds) };
    },
    /** how far (units) the hero's feet are above (+) / below (-) the first rendered surface straight below, at the current spot */
    footGap() {
      const G_ = G(), p = G_.player;
      const rc = new THREE.Raycaster(); rc.layers.enableAll();
      const origin = p.up.clone().multiplyScalar(p.radius + 3);
      rc.set(origin, p.up.clone().negate());
      const objs = [];
      G_.scene.traverse((o) => { if (o.isMesh && o.visible && o.name !== 'ink-outline' && !o.isInstancedMesh && o.material && !o.material.transparent && o.name !== 'sea-curls' && o.name !== 'sea' && o.name !== 'lane-dashes') { let q = o, hero = false; while (q) { if (q === p.object) hero = true; q = q.parent; } if (!hero) objs.push(o); } });
      const hits = rc.intersectObjects(objs, false);
      if (!hits.length) return null;
      return +((p.radius - (origin.length() - hits[0].distance))).toFixed(3);
    },
    /** coverage check: n random walkable land spots with the default camera; how many have NO person in view (frustum, not behind
     *  the planet, within the crowd LOD's hide distance)? -> { n, zeroPct, avgInView, zero:[{polar}] } */
    coverage(n = 200) {
      const G_ = G(), p = G_.player, cam = G_.camera;
      let a = 987; const rnd = () => ((a = (a * 16807) % 2147483647) / 2147483647);
      const V3 = POLE.constructor;
      const fr = new THREE.Frustum(), pv = new THREE.Matrix4(), sph = new THREE.Sphere(new V3(), 1.6), wp = new V3(), cd = new V3();
      let zero = 0, total = 0, sum = 0; const zeros = [];
      for (let i = 0; i < n; i++) {
        let dir, tries = 0;
        do { const z = rnd() * 2 - 1, th = rnd() * 6.2832, rr = Math.sqrt(1 - z * z); dir = new V3(rr * Math.cos(th), z, rr * Math.sin(th)); tries++; }
        while (tries < 500 && (W.planet.getSurfaceRadius(dir) < W.seaR + 0.7 || !W.planet.isWalkable(dir)));
        const heading = tangentTo(dir, POLE.clone().add(new V3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5)).normalize());
        p.teleport(dir, heading);
        G_.cameraRig.heading.copy(heading);
        G_.cameraRig.setView({ distance: 14, pitch: 0.44, snap: true });
        for (let k = 0; k < 3; k++) G_.step(1 / 60, false);
        N.crowd.update(cam.position);
        cam.updateMatrixWorld();
        pv.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse); fr.setFromProjectionMatrix(pv);
        const cl = cam.position.length(); cd.copy(cam.position).divideScalar(cl);
        const hz = Math.acos(Math.min(1, R / cl)) + 0.08;
        let c = 0;
        for (const e of N.npcs) {
          if (e.role === 'dog') continue;
          const g = e.g; if (!g.visible) continue;
          const lv = g.userData.lodLevel ? g.userData.lodLevel() : 0; if (lv >= 2) continue;
          g.getWorldPosition(wp);
          if (Math.acos(THREE.MathUtils.clamp(wp.clone().normalize().dot(cd), -1, 1)) > hz) continue;
          sph.center.copy(wp); sph.center.addScaledVector(p.up, 1);
          if (fr.intersectsSphere(sph)) c++;
        }
        total++; sum += c;
        if (c === 0) { zero++; const po = polarOf(dir); zeros.push({ d: Math.round(po.d), b: Math.round(po.b) }); }
      }
      return { n: total, zeroPct: +(100 * zero / total).toFixed(1), avgInView: +(sum / total).toFixed(2), zero: zeros.slice(0, 40) };
    },
    peopleBreakdown() { const c = {}; for (const n of N.npcs) { const k = n.walker ? 'walker:' + n.role : n.role; c[k] = (c[k] || 0) + 1; } return { total: N.npcs.length, c }; },
    traffic: T, npcs: N, rail: RL, bridges: B,
  };
  window.__kerala = api;
  void polar; void dist; void BRIDGE; void GEO; void PATHS; void shorePoint;
}
