/**
 * people/citizens.js: generic Hyderabadis and seated couples, all from the seeded variation system.
 *
 * createCitizen(ink, seed, { kind?: 'man'|'woman'|'kid'|'elder'|'teen', loop?, seatHeight?, tweak?(spec, r) }) -> Group (same hooks as createNPC)
 * CITIZEN_LOOPS: ['idle','phone','chat','sit','walk','wave','news']   pass any to userData.playLoop(name)
 *   idle = breathing + glances; phone = texting; chat = gesturing + talking; sit = sits on a seat `seatHeight` high (default 0.5,
 *   a bench; ~0.9 a parapet/ledge; ~0.3 a step) with thighs forward; walk = walks in place (the world moves them);
 *   wave = a friendly wave; news = reading a newspaper.   playLoop('stand') gets up again.
 * createCouple(ink, seed, { seatHeight }) -> Group with two seated people (userData.people), for a parapet or bench.
 */
import * as THREE from 'three';
import { createPerson } from './person.js';
import { citizenSpec, pick, chance } from './variation.js';
import { rng } from '../../../engine/doodle.js';

export const CITIZEN_LOOPS = ['idle', 'phone', 'chat', 'sit', 'walk', 'wave', 'news'];
const KINDS = ['man', 'man', 'man', 'woman', 'woman', 'woman', 'kid', 'elder', 'teen'];
const DEFAULT_LOOPS = {
  man: ['idle', 'phone', 'chat', 'walk', 'news', 'idle'], woman: ['idle', 'phone', 'chat', 'walk', 'idle', 'chat'],
  kid: ['idle', 'chat', 'walk', 'wave'], elder: ['idle', 'news', 'sit', 'idle'], teen: ['phone', 'chat', 'phone', 'walk'],
};
const seedRng = (seed, salt) => { const r = rng(Math.abs(Math.floor(seed * 7919 + salt)) % 2147483646 + 1); r(); r(); return r; };

export function createCitizen(ink, seed = 1, opts = {}) {
  const r = seedRng(seed, 17);
  const kind = opts.kind ?? pick(r, KINDS);
  const spec = citizenSpec(r, kind);
  if (opts.tweak) opts.tweak(spec, r); // explicit look overrides for a named person (see hyderabad/population4.js)
  const loop = opts.loop ?? pick(r, DEFAULT_LOOPS[kind]);
  if (loop === 'phone' && !spec.accessories.some((a) => (a.name ?? a) === 'phone')) spec.accessories.push('phone');
  if (loop === 'news') spec.accessories = [...spec.accessories.filter((a) => (a.name ?? a) !== 'umbrella'), 'newspaper'];
  spec.seed = Math.floor(seed * 3 + 1);
  const p = createPerson(spec);
  p.name = 'citizen-' + kind;
  p.userData.role = 'citizen'; p.userData.kind = kind;
  if (loop === 'sit') { p.userData.sit(opts.seatHeight ?? 0.5); p.userData.playLoop(chance(r, 0.5) ? 'chat' : null); }
  else p.userData.playLoop(loop);
  p.userData.citizenLoop = loop;
  return p;
}

export function createCouple(ink, seed = 1, opts = {}) {
  const g = new THREE.Group();
  const h = opts.seatHeight ?? 0.55;
  const a = createCitizen(ink, seed * 2 + 1, { kind: 'man', loop: 'sit', seatHeight: h });
  const b = createCitizen(ink, seed * 2 + 2, { kind: 'woman', loop: 'sit', seatHeight: h });
  a.position.set(-0.55, 0, 0); b.position.set(0.55, 0, 0);
  a.rotation.y = 0.28; b.rotation.y = -0.28;
  a.userData.playLoop('chat'); b.userData.playLoop(chance(seedRng(seed, 5), 0.5) ? 'chat' : 'phone');
  g.add(a, b);
  const people = [a, b];
  g.name = 'couple';
  g.userData = {
    role: 'couple', people, radius: 0.9,
    animate: (dt, s) => people.forEach((p) => p.userData.animate(dt, s)),
    setLookTarget: (v) => people.forEach((p) => p.userData.setLookTarget(v)),
    playLoop: (n) => people.forEach((p) => p.userData.playLoop(n)),
    playOnce: (n, d) => people.forEach((p) => p.userData.playOnce(n, d)),
    lod: (lv) => people.forEach((p) => p.userData.lod(lv)),
    lodLevel: () => people[0].userData.lodLevel(),
  };
  return g;
}
