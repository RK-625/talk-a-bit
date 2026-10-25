/**
 * people/lineup.js: review sheet. createLineup(ink, { animate = true }) -> Group with Chotu and one of every role in a grid,
 * each with a small hand-lettered name card. Open on the lab turntable:
 *   /lab/people.html?asset=/src/worlds/mumbai/people/index.js&export=createLineup&rotate=0
 * (the figures animate themselves through autoAnimate's render hook).
 */
import * as THREE from 'three';
import { createDecal } from '../../../engine/ink.js';
import { makeCanvas, drawText, rng } from '../../../engine/doodle.js';
import { createHero } from './hero.js';
import { createNPC } from './roles.js';
import { autoAnimate } from './animate.js';
import { mat, mk } from './kit.js';

const ROWS = [
  [['hero', 'Chotu (hero)'], ['vadaPavWala', 'vada pav wala'], ['chaiwalaUncle', 'chai uncle'], ['taxiDriver', 'taxi driver'], ['dabbawala', 'dabbawala'], ['koliFisherwoman', 'Koli fisherwoman'], ['busConductor', 'bus conductor']],
  [['trafficCop', 'traffic cop'], ['collegeStudentA', 'student A'], ['collegeStudentB', 'student B'], ['auntyWithSabzi', 'aunty + sabzi'], ['cricketKidBatter', 'cricket: batter'], ['cricketKidBowler', 'cricket: bowler'], ['bollywoodHopeful', 'Bollywood hopeful']],
  [['bhelWala', 'bhel wala'], ['golaWala', 'gola wala'], ['balloonSeller', 'balloon seller'], ['newspaperVendor', 'newspaper vendor'], ['strayDog', 'stray dog'], ['crow', 'crow'], ['pigeon', 'pigeon']],
];

function nameCard(text) {
  const { c, ctx } = makeCanvas(384, 112);
  const r = rng(text.length * 37 + 5);
  ctx.fillStyle = '#f7f0dc'; ctx.fillRect(0, 0, 384, 112);
  drawText(ctx, text, 192, 70, { size: text.length > 14 ? 42 : 52, r });
  return createDecal(c, 1.7, 0.5, { depth: 0.06, thickness: 1.6 });
}

export function createLineup(ink, { animate = true } = {}) {
  const g = new THREE.Group();
  const DX = 2.9, DZ = 3.6;
  const floor = mk(new THREE.BoxGeometry(DX * 7 + 1, 0.3, DZ * 3 + 0.5), mat(0xc4e4a8, { spacing: 0.15, strength: 1, lightHatch: 1 }), { o: 3 });
  floor.position.set(0, -0.17, -DZ + 0.1);
  g.add(floor);
  ROWS.forEach((row, ri) => {
    row.forEach(([role, label], ci) => {
      const seed = ri * 7 + ci + 1;
      const p = role === 'hero' ? createHero(ink) : createNPC(role, ink, seed, { props: true });
      p.position.set((ci - 3 + (row.length === 6 ? 0.5 : 0)) * DX, 0, -ri * DZ);
      if (animate) autoAnimate(p);
      g.add(p);
      const card = nameCard(label);
      card.position.set(p.position.x, 0.25, p.position.z + 1.35);
      card.rotation.x = -0.25;
      g.add(card);
    });
  });
  return g;
}
export default createLineup;

/**
 * createPreview(spec): one figure on the turntable, animated. spec = 'taxiDriver' | 'hero' | { role, seed, walk (0..1), loop }.
 *   /lab/people.html?asset=/src/worlds/mumbai/people/index.js&export=createPreview&spec="koliFisherwoman"&rotate=0
 */
export function createPreview(spec = 'hero') {
  const s = typeof spec === 'string' ? { role: spec } : spec?.role ? spec : { role: 'hero' };
  const p = s.role === 'hero' ? createHero() : createNPC(s.role, undefined, s.seed ?? 1, { props: true, loop: s.loop });
  const st = { walk: s.walk ?? 0, speed: (s.walk ?? 0) * 6 };
  if (s.at) { // fast-forward to a moment of the loop (review mid-action); s.freeze keeps it still
    for (let i = 0; i < s.at * 60; i++) p.userData.animate(1 / 60, { ...st, phase: i * 0.2 });
  }
  if (!s.freeze) autoAnimate(p, st);
  return p;
}
