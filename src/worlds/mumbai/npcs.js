/**
 * mumbai/npcs.js: the whole cast, at contextual spots. NPCs only animate (and are only visible) when near the camera;
 * within 7 units of Chotu they turn their heads toward him and a few wave once.
 *
 * People come from ./people (createNPC / createDog / createCrow / createPigeon), used through their public API only:
 *   userData.animate(dt, state?), setLookTarget(vec3|null), playLoop(name), playOnce(name, s), userData.radius.
 * npcs(W, S) -> { npcs, update }
 */
import * as THREE from 'three';
import { createNPC, createDog, createCrow, createPigeon, createCitizen, createCouple, createCrowdLOD } from './people/index.js';
import { createBalloonBunch } from './props/index.js';
import { PATHS, MARINE, GEO, R, stepAlong, tangentTo, dist, shorePoint, polar, bayAngle, shoreToward } from './geo.js';
import { resolveAt, placed, JUHU } from './layout.js';
import { frameAt, localToDir } from '../../engine/place.js';
import { flagShadows } from './world.js';
import { talkHook } from './talkHook.js';

const POLE = new THREE.Vector3(0, 1, 0);
const _q = new THREE.Quaternion(), _m = new THREE.Matrix4(), _v = new THREE.Vector3(), _s = new THREE.Sphere();

export function npcs(W, S) {
  const { player, planet, ink } = W;
  const list = []; // { g, item, dir, kind, ... }
  const birds = [];
  const frustum = new THREE.Frustum(), pv = new THREE.Matrix4();
  const head = new THREE.Vector3();
  const NPC_DIST = 52, NPC_OUTLINE = 26;

  /** local frame of a placed scenery item, with a helper to turn local (x_obj, z) offsets into dirs */
  const itemFrame = (id) => {
    const g = S.items.get(id);
    if (!g) return null;
    const pl = g.userData.placement;
    const fr = frameAt(pl.dir, pl.fwd, {});
    return { fr, g, at: (x, z) => localToDir(fr, x, z, R, new THREE.Vector3()), anchor: (name) => { const a = g.userData.anchors?.[name]; return a ? localToDir(fr, a[0], a[2], R, new THREE.Vector3()) : null; } };
  };

  // every person goes through the crowd LOD (full / far merged / hidden by distance) and a static or moving collider
  const crowd = createCrowdLOD([], W.dens < 0.7 ? { near: 14, hide: 54 } : { near: 24, hide: 62 }); // touch: the far (merged) body sooner
  let lodT = 0;
  const talkers = talkHook(W); // conversations: every person is talkable, dialogue by placement id or role
  function register(g, n) {
    list.push(n);
    crowd.add(g);
    talkers.register(g, n);
    return n;
  }
  /** put a ready-made person/group on the sphere (feet at `radius` or the ground) */
  function addPerson(g, dir, fwd, o = {}) {
    g.name = g.name || o.role;
    flagShadows(g);
    W.add(g, { dir, fwd, radius: o.radius ?? null, collide: false, walkable: false, noAnim: true, cull: false, occlude: false, height: 3 });
    if (o.collide !== false) W.colliders.add({ dir: dir.clone(), radius: g.userData.radius ?? 0.5, height: 2.4, person: true });
    return register(g, { g, id: o.id, convo: o.convo, owner: o.owner, ownerSite: o.ownerSite, dir: dir.clone(), role: o.role ?? g.userData.role, wave: !!o.wave, waved: false, waveCool: 0, look: false, lookAt: o.lookAt !== false, sitting: !!o.sitting });
  }
    const skip = () => false; // the same ~60-person cast on every device (the cast is small; far people are merged by the crowd LOD)
  function person(role, o, dir, fwd, radius = null) {
    if (skip(o)) return null;
    const g = createNPC(role, ink, o.seed ?? 1, { variant: o.variant, loop: o.loop, props: o.props, tweak: o.tweak });
    return addPerson(g, dir, fwd, { ...o, role, radius });
  }
  function citizen(seed, o, dir, fwd, radius = null) {
    if (skip(o, seed)) return null;
    const g = createCitizen(ink, seed, { kind: o.kind, loop: o.loop, seatHeight: o.seatHeight, tweak: o.tweak });
    return addPerson(g, dir, fwd, { ...o, role: 'citizen', radius, sitting: o.loop === 'sit' });
  }
  function couple(seed, o, dir, fwd, radius = null) {
    if (skip(o, seed)) return null;
    const g = createCouple(ink, seed, { seatHeight: o.seatHeight });
    return addPerson(g, dir, fwd, { ...o, role: 'couple', radius, collide: false, sitting: true });
  }

  // ---- stall people (anchors from the props) -----------------------------------------------------------------------
  const tapri = itemFrame('tapri');
  if (tapri) {
    person('chaiwalaUncle', { seed: 3, wave: true, convo: true, id: 'chaiwalaUncle', owner: tapri.g }, tapri.anchor('uncle'), tapri.fr.fwd);
    // stray dog napping by the bench
    const dd = tapri.at(-3.7, 2.2);
    const dog = createDog(ink, 2);
    flagShadows(dog);
    W.add(dog, { dir: dd, fwd: tapri.fr.fwd.clone().applyAxisAngle(dd, 0.9), collide: false, walkable: false, maxDist: NPC_DIST, noAnim: true, cullR: 1, outlineDist: NPC_OUTLINE });
    list.push({ g: dog, item: W.culler.items[W.culler.items.length - 1], dir: dd, role: 'dog', lookAt: false });
  }
  const vada = itemFrame('vada');
  if (vada) person('vadaPavWala', { seed: 5, wave: true, convo: true, id: 'vadaPavWala', owner: vada.g }, vada.anchor('vendor'), vada.fr.fwd);
  const news = itemFrame('news');
  if (news) person('newspaperVendor', { seed: 4, id: 'chowk-newspaper-vendor', owner: news.g }, news.anchor('vendor'), news.fr.fwd);
  const fruit = itemFrame('fruit');
  void fruit;

  // ---- the chowk: Bollywood hopeful at the film posters; gully cricket ------------------------------------------------
  const sp = (right, fwd) => resolveAt({ sp: [right, fwd] });
  person('bollywoodHopeful', { seed: 2, wave: true, convo: true, id: 'bollywoodHopeful' }, sp(2.6, -10.6).dir, sp(2.6, -10.6).fwd);
  const pitchA = sp(-14, -2.0), pitchB = sp(-14, 3.6);
  person('cricketKid', { seed: 11, variant: 'batter', wave: true, convo: true, id: 'cricketKid' }, pitchA.dir, pitchA.fwd);
  person('cricketKid', { seed: 12, variant: 'bowler', id: 'chowk-cricket-bowler' }, pitchB.dir, pitchB.fwd.clone().negate());

  // ---- the Fort: bus stop conductor, parked taxi + driver, dabbawala, cop -------------------------------------------------
  const bus = itemFrame('busStopFort');
  if (bus) person('busConductor', { seed: 6, wave: true, convo: true, id: 'busConductor' }, bus.at(-3.4, 0.2), bus.fr.fwd);
  const taxi = itemFrame('parkedTaxi');
  if (taxi) {
    const side = taxi.fr.right.clone();
    const d = taxi.at(1.95, 0.4);
    person('taxiDriver', { seed: 8, wave: true, convo: true, id: 'taxiDriver' }, d, side);
  }
  const dabba = itemFrame('dabbaBike');
  if (dabba) person('dabbawala', { seed: 9, convo: true, id: 'dabbawala' }, dabba.at(1.6, 0.4), dabba.fr.fwd.clone().applyAxisAngle(dabba.fr.up, 0.9));
  const cop = resolveAt({ road: 'great', s: 12.5, lat: 6.3 });
  person('trafficCop', { seed: 10, wave: true, convo: true, id: 'trafficCop' }, cop.dir, tangentTo(cop.dir, PATHS.great.at(12.5).dir ?? cop.dir));

  // ---- the Gateway: balloon seller, pigeons ------------------------------------------------------------------------------
  const bal = itemFrame('balloons');
  if (bal) {
    person('balloonSeller', { seed: 14, wave: true, convo: true, id: 'balloonSeller' }, bal.at(-1.2, 0.2), bal.fr.fwd);
  }
  const gw = itemFrame('gateway');
  if (gw) {
    // Koli fisherwoman on the quay beside the boats
    const sh = shoreToward(GEO.harbour.c, gw.fr.up.clone());
    const quay = stepAlong(sh.dir, sh.heading, 2.6); // a little inland of the waterline, facing the boats
    person('koliFisherwoman', { seed: 15, wave: true, convo: true, id: 'koliFisherwoman' }, quay, sh.heading.clone().negate());
    // pigeon flock on the plaza in front of the arch
    const nP = Math.round(10 * Math.max(0.5, W.dens));
    for (let i = 0; i < nP; i++) {
      const a = (i / nP) * 6.28 + 0.4, r = 1.4 + (i % 3) * 1.1; // round the dana mat at the Gateway's pigeonFeeder anchor
      const d = gw.at(-2.2 + Math.cos(a) * r, 7.0 + Math.sin(a) * r);
      bird('pigeon', i, d, 0, { flee: 6.5, home: d });
    }
  }

  // ---- Juhu beach: bhel puri and gola ------------------------------------------------------------------------------------
  for (const [spot, kind] of [[JUHU.bhel, 'bhel'], [JUHU.gola, 'gola']]) {
    const away = tangentTo(spot, POLE).negate(); // toward the sea
    // the stall itself is placed by scenery.js; here only the vendor
    const vendorDir = stepAlong(spot, away, -1.6); // behind the cart (its rear rack ends at -0.7), never inside it
    person(kind === 'bhel' ? 'bhelWala' : 'golaWala', { seed: kind === 'bhel' ? 16 : 17, wave: true, convo: true, id: kind === 'bhel' ? 'bhelWala' : 'golaWala' }, vendorDir, away);
  }

  // ---- walkers: aunty with sabzi, students on the promenade and footpaths -------------------------------------------------
  walker('auntyWithSabzi', { seed: 18, convo: true, id: 'auntyWithSabzi' }, pathLine('great', 21, 58, 5.5), 1.25);
  walker('collegeStudent', { seed: 22, variant: 1, id: 'marine-walk-student' }, pathArc(-6, 44, 2.2), 1.3);

  function pathLine(id, s0, s1, lat) {
    const p = PATHS[id];
    const out = [];
    const n = Math.max(2, Math.round(Math.abs(s1 - s0) / 9));
    for (let i = 0; i <= n; i++) out.push(p.lateral(s0 + (s1 - s0) * (i / n), lat));
    return out;
  }
  function pathArc(a0, a1, r) {
    const out = [];
    const n = Math.max(2, Math.round(Math.abs(a1 - a0) / 8));
    for (let i = 0; i <= n; i++) out.push(MARINE.pt(a0 + (a1 - a0) * (i / n), r));
    return out;
  }
  function walker(role, o, dirs, speed, phase = 0) {
    const g = role === 'citizen' ? createCitizen(ink, o.seed ?? 1, { kind: o.kind, loop: 'walk', tweak: o.tweak }) : createNPC(role, ink, o.seed ?? 1, { variant: o.variant, loop: false, tweak: o.tweak });
    flagShadows(g);
    W.root.add(g);
    const actor = W.actors.add(g, { type: 'spline', dirs, speed, closed: !!o.closed, phase }, { radiusFn: (d) => planet.getWalkRadius(d) + (o.lift ?? 0), collider: o.solid === false ? null : { radius: g.userData.radius ?? 0.45, height: 2.4 } });
    return register(g, { g, id: o.id, convo: o.convo, dir: actor.dir, role, walker: true, solid: o.solid !== false, actor, speed, lookAt: o.lookAt !== false, wave: !!o.wave, waved: false, waveCool: 0, look: false });
  }

  // ---- birds: pigeons on the plaza, crows on wires and roofs -------------------------------------------------------------
  function bird(kind, i, dir, height, o) {
    const g = (kind === 'pigeon' ? createPigeon : createCrow)(ink, i + 1);
    flagShadows(g);
    W.root.add(g);
    const item = W.cull(g, { maxDist: 42, radius: 1, height: height + 2, dynamic: true, outlineDist: 22 });
    const home = { dir: dir.clone(), h: height };
    const b = { g, item, kind, home, dir: dir.clone(), h: height, state: 'ground', t: 0, fwd: tangentTo(dir, POLE).applyAxisAngle(dir, i * 1.7), flee: o.flee ?? 6, rest: 0, heading: new THREE.Vector3(), seed: i };
    birds.push(b);
    g.userData.playLoop?.(kind === 'pigeon' ? 'peck' : i % 2 ? 'idle' : 'peck');
    poseBird(b);
    return b;
  }
  function poseBird(b) {
    const f = frameAt(b.dir, b.fwd, {});
    _m.makeBasis(f.right, f.up, f.fwd);
    b.g.quaternion.setFromRotationMatrix(_m);
    b.g.position.copy(f.up).multiplyScalar(planet.getSurfaceRadius(f.up) + b.h);
  }
  // crows: on the chowk wires and on a few chawl roofs
  const crowSpots = [];
  (W.wires ?? []).slice(0, 2).forEach((w, k) => {
    const g = w.group;
    const pl = g.userData.placement;
    const fr = frameAt(pl.dir, pl.fwd, {});
    for (const u of k ? [0.35] : [0.3, 0.62]) {
      const x = (u - 0.5) * 2 * w.half;
      const y = w.from + (w.to - w.from) * u - w.sag * 4 * u * (1 - u) + 0.1;
      const d = localToDir(fr, x, 0, R, new THREE.Vector3());
      crowSpots.push({ dir: d, fwd: fr.right.clone(), h: y + (planet.getSurfaceRadius(d) - planet.getSurfaceRadius(pl.dir)) });
    }
  });
  for (const id of ['ch1', 'ch3', 'ch5', 'ch2']) {
    const g = S.items.get(id);
    if (!g || W.dens < 0.7 && id === 'ch2') continue;
    const pl = g.userData.placement;
    const H = (g.userData.size?.[2] ?? 7) + 0.5;
    crowSpots.push({ dir: stepAlong(pl.dir, pl.right, ((id.charCodeAt(2) % 3) - 1) * 2.5), fwd: pl.fwd.clone(), h: H });
  }
  crowSpots.forEach((c, i) => bird('crow', i, c.dir, c.h, { flee: 5 }));

  // ---- per-frame ---------------------------------------------------------------------------------------------------------
  const walkState = { speed: 0, walk: 0, grounded: true, vr: 0, time: 0, phase: 0 };
  let tAcc = 0;
  function update(dt) {
    tAcc += dt;
    W.camera.updateMatrixWorld();
    pv.multiplyMatrices(W.camera.projectionMatrix, W.camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(pv);
    const pu = player.up;
    head.copy(player.object.position).addScaledVector(pu, 1.15);
    lodT -= dt;
    if (lodT <= 0) { lodT = 0.25; crowd.update(W.camera.position); }
    for (let i = 0; i < list.length; i++) {
      const n = list[i];
      const lv = n.g.userData.lodLevel ? n.g.userData.lodLevel() : (n.g.userData.lod ? 0 : 0);
      if (lv !== 0 && !(n.g.userData.people && n.g.visible)) { if (n.walker) n.actor.speed = n.speed; continue; }
      if (n.walker && n.solid) { // wait for Chotu if he stands in the way
        const dw = Math.acos(THREE.MathUtils.clamp(pu.dot(n.actor.dir), -1, 1)) * R;
        if (dw < 2.6) { // wait for Chotu; if he stays in the way for a moment, turn round (never deadlock a narrow causeway)
          n.actor.speed = 0; n.blocked = (n.blocked ?? 0) + dt;
          if (n.blocked > 1.3) { n.speed = -n.speed; n.blocked = 0; n.actor.speed = n.speed; }
        } else { n.actor.speed = n.speed; n.blocked = 0; }
      }
      if (n.talking && n.walker) n.actor.speed = 0; // in conversation: stand still
      n.g.getWorldPosition(_v);
      _s.set(_v, 2.5);
      if (!frustum.intersectsSphere(_s)) continue; // off-screen: skip the animation (it still wakes up in its idle pose)
      const d = Math.acos(THREE.MathUtils.clamp(pu.dot(n.walker ? n.actor.dir : n.dir), -1, 1)) * R;
      const u = n.g.userData;
      if (n.lookAt) {
        if (d < 7 && !n.look) { n.look = true; }
        else if (d > 9 && n.look) { n.look = false; u.setLookTarget?.(null); }
        if (n.look) u.setLookTarget?.(head);
        if (n.wave) {
          n.waveCool -= dt;
          if (d < 5.6 && !n.waved && n.waveCool <= 0) { n.waved = true; n.waveCool = 14; u.playOnce?.('wave', 2); }
          else if (d > 11) n.waved = false;
        }
      }
      if (n.walker) {
        const sp = Math.abs(n.actor.speed);
        walkState.speed = sp; walkState.walk = THREE.MathUtils.clamp(sp / 4, 0, 1); walkState.time = tAcc; walkState.phase = tAcc * (3 + sp);
        u.animate(dt, walkState);
      } else u.animate(dt);
    }
    // birds
    for (const b of birds) updateBird(b, dt, pu);
  }

  function updateBird(b, dt, pu) {
    const near = b.item.near;
    b.t += dt;
    const d = Math.acos(THREE.MathUtils.clamp(pu.dot(b.dir), -1, 1)) * R;
    if (b.state === 'ground') {
      if (d < b.flee && near) {
        b.state = 'fly'; b.t = 0;
        b.heading.copy(tangentTo(b.dir, pu)).negate().applyAxisAngle(b.dir, (b.seed % 5 - 2) * 0.28);
        b.fwd.copy(b.heading);
        b.g.userData.playLoop?.('hop');
        b.hopT = 0.35;
      }
    } else if (b.state === 'fly') {
      if (b.hopT > 0) { b.hopT -= dt; if (b.hopT <= 0) b.g.userData.playLoop?.('flap'); }
      else {
        // fly away along the heading and up, then vanish for a while
        const sp = 7.5 + (b.seed % 3);
        stepAlong(b.dir, b.heading, sp * dt, _v);
        b.heading.addScaledVector(_v, -b.heading.dot(_v)).normalize();
        b.dir.copy(_v);
        b.h += (6 + (b.seed % 4) - b.h) * Math.min(1, dt * 1.4) + 1.5 * dt;
        b.fwd.copy(b.heading);
        if (b.t > 2.6) { b.state = 'away'; b.t = 0; b.item.disabled = true; b.g.visible = false; }
      }
    } else if (b.state === 'away') {
      const dh = Math.acos(THREE.MathUtils.clamp(pu.dot(b.home.dir), -1, 1)) * R;
      if (b.t > 10 && dh > b.flee * 2.2) { b.state = 'ground'; b.dir.copy(b.home.dir); b.h = b.home.h; b.item.disabled = false; b.g.userData.playLoop?.(b.kind === 'pigeon' ? 'peck' : 'idle'); }
    }
    if (b.state !== 'away' && (near || b.state === 'fly')) {
      poseBird(b);
      b.g.userData.animate(dt);
    }
  }

  return { npcs: list, birds, update, crowd, person, citizen, couple, walker, addPerson, bird, frustum };
}
void createBalloonBunch; void MARINE; void GEO; void polar; void dist; void placed;
