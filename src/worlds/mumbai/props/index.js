/**
 * mumbai/props: vehicles, stalls and street props for the Mumbai world.
 * Re-exports every factory plus createShowcase(ink) for the lab turntable review.
 */
import * as THREE from 'three';
import { buildInstanced } from '../../../engine/scatter.js';
import { createInkMaterial, OVERLAY_LAYER } from '../../../engine/ink.js';
import { nameCard, triCount, resolveInk, vcMat } from './kit.js';
import * as V from './vehicles.js';
import * as S from './stalls.js';
import * as T from './street.js';

export * from './vehicles.js';
export * from './stalls.js';
export * from './street.js';
export { C, Mix, triCount, nameCard, meshOf, plaque, hand } from './kit.js';

/** everything, in showcase order: [label, sublabel, factory, opts?] */
export const CATALOG = [
  ['Taxi', 'kaali-peeli', V.createTaxi],
  ['BEST bus', 'double-decker', V.createBus],
  ['Auto-rickshaw', '', V.createAutoRickshaw],
  ['Dabbawala cycle', '', V.createDabbawalaBike],
  ['Train car', 'cabin + crowd', V.createTrainCar],
  ['Train engine', 'cab front', (ink) => V.createTrainCar(ink, { isEngine: true, livery: 'purple' })],
  ['Track', 'segment x2', (ink) => { const g = new THREE.Group(); const a = V.createTrackSegment(ink, 4); const b = V.createTrackSegment(ink, 4); b.position.z = 4; g.add(a, b); g.position.z = 0; g.userData = { footprint: { w: 4, l: 8 } }; return g; }],
  ['Level crossing', '', V.createLevelCrossing],
  ['Vada pav stall', 'the star', S.createVadaPavStall],
  ['Chai tapri', "Chotu's home", S.createChaiTapri],
  ['Bhel puri cart', '', S.createBhelCart],
  ['Gola stall', '', S.createGolaStall],
  ['Fruit cart', '', S.createFruitCart],
  ['Marigold mat', '', S.createMarigoldMat],
  ['Paan stall', '', S.createPaanStall],
  ['Newspaper stand', '', S.createNewspaperStand],
  ['Balloons', 'bobbing', S.createBalloonBunch],
  ['Lamp post', '', T.createLampPost],
  ['Bus stop', 'BEST', T.createBusStop],
  ['Name sign', '', (ink) => T.createRoadSign(ink, { kind: 'name' })],
  ['Speed sign', '', (ink) => T.createRoadSign(ink, { kind: 'speed' })],
  ['School sign', '', (ink) => T.createRoadSign(ink, { kind: 'school' })],
  ['Slow sign', '', (ink) => T.createRoadSign(ink, { kind: 'slow' })],
  ['No parking', '', (ink) => T.createRoadSign(ink, { kind: 'noparking' })],
  ['One way', '', (ink) => T.createRoadSign(ink, { kind: 'oneway' })],
  ['Bollard', '', T.createBollard],
  ['Traffic signal', 'cycles', T.createTrafficSignal],
  ['Hydrant', '', T.createHydrant],
  ['Manhole', 'decal', T.createManhole],
  ['Pothole', '', T.createPothole],
  ['Dog bowl', '', T.createDogBowl],
  ['Stool', '', T.createStool],
  ['Crates', '', T.createCrate],
  ['Stumps', 'gully cricket', T.createStumps],
  ['Laundry line', 'length 8', (ink) => T.createLaundryLine(ink, { length: 8 })],
  ['Wires', 'catenary', (ink) => T.createWires(ink, { from: [-4, 3, 0], to: [4, 3.2, 0] })],
  ['Wire pole', '', T.createWirePole],
  ['Banyan', '', T.createBanyan],
  ['Coconut palm', '', T.createCoconutPalm],
  ['Beach umbrella', '', T.createBeachUmbrella],
  ['Sandcastle', '', T.createSandcastle],
  ['Boat', 'bobbing', T.createBoat],
  ['Kite', 'patang', T.createKite],
];

/** Lays every prop out in rows with hand-lettered name cards. Self-animates (rAF) while it is in a scene. */
export function createShowcase(inkArg, optsArg = {}) {
  // lab usage: ?spec={"only":["Kite","Boat"],"perRow":4} arrives as the first argument
  const fromSpec = inkArg && !inkArg.createInkMaterial && typeof inkArg === 'object';
  const ink = fromSpec ? undefined : inkArg;
  const { perRow = 7, cell = 10, extra = true, only = null } = fromSpec ? inkArg : optsArg;
  const root = new THREE.Group();
  const animated = [];
  const stats = [];
  let n = 0;
  const place = (obj, label, sub) => {
    const fp = obj.userData?.footprint ?? { w: 3, l: 3 };
    const k = Math.min(1, (cell - 1.5) / Math.max(fp.w, fp.l));
    const col = n % perRow, row = Math.floor(n / perRow);
    obj.scale.setScalar(k);
    obj.position.x += col * cell;
    obj.position.z += row * cell;
    root.add(obj);
    const card = nameCard(label, sub);
    card.position.set(col * cell, 0, row * cell + cell * 0.46);
    root.add(card);
    n++;
    if (obj.userData?.animate) animated.push(obj);
  };
  for (const [label, sub, make] of CATALOG) {
    if (only && !only.includes(label)) continue;
    let obj;
    try { obj = make(ink); } catch (e) { console.error('showcase: failed', label, e); continue; }
    stats.push([label, triCount(obj)]);
    place(obj, label, sub);
  }
  if (extra && (!only || only.includes('extras'))) {
    // a train on a short straight: engine + 2 cars on 4 track segments, plus instanced bollards/potholes/lamps
    const train = new THREE.Group();
    for (let i = 0; i < 6; i++) { const t = V.createTrackSegment(ink, 8); t.position.z = -12 + i * 8 + 4 - 8; train.add(t); }
    const cars = [V.createTrainCar(ink, { isEngine: true, seed: 3 }), V.createTrainCar(ink, { seed: 4 }), V.createTrainCar(ink, { seed: 5 })];
    cars.forEach((c, i) => { c.position.set(0, 0.55, 10 - i * 8.3 - 8); c.rotation.y = 0; train.add(c); });
    train.userData = { footprint: { w: 4, l: 40 } };
    train.rotation.y = Math.PI / 2;
    const holder = new THREE.Group(); holder.add(train);
    holder.position.set(14, 0, Math.ceil(n / perRow) * cell + 12);
    holder.userData = { footprint: { w: 0, l: 0 } };
    root.add(holder);
    const card = nameCard('Local train', 'engine + 2 cars on track');
    card.position.set(holder.position.x, 0, holder.position.z + 5);
    root.add(card);
    cars.forEach((c) => animated.push(c));

    const specs = T.instanceSpecs();
    const ibase = new THREE.Group();
    ibase.position.set(0, 0, holder.position.z + 14);
    root.add(ibase);
    const names = ['lampPost', 'bollard', 'hydrant', 'pothole', 'manhole', 'stool', 'crate', 'stumps', 'palm', 'dogBowl'];
    names.forEach((n, i) => {
      const sp = specs[n]; if (!sp) return;
      const mats = [];
      for (let k = 0; k < 4; k++) { const m = new THREE.Matrix4(); m.makeTranslation(i * 4.2 - 8, 0, k * 2.2 - 3); mats.push(m); }
      buildInstanced(ibase, sp.parts, vcMat(ink, sp.hatch, 0.9), mats, { thickness: sp.thickness });
    });
    const ic = nameCard('Instanced parts', 'buildInstanced x4 each');
    ic.position.set(ibase.position.x + 12, 0, ibase.position.z + 6);
    root.add(ic);
  }
  // floor (below the lab's own ground disc)
  const box = new THREE.Box3().setFromObject(root);
  if (box.isEmpty()) { root.userData = { footprint: { w: 1, l: 1 }, colliders: [], stats }; return root; }
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(box.max.x - box.min.x + 8, 0.3, box.max.z - box.min.z + 8),
    resolveInk(ink).createInkMaterial({ color: 0xd9d2f0, hatchSpacing: 0.18, lightHatch: 0.6, hatchStrength: 0.8 })
  );
  floor.position.set((box.max.x + box.min.x) / 2, -0.19, (box.max.z + box.min.z) / 2);
  floor.receiveShadow = true;
  root.add(floor);
  root.position.set(-(box.max.x + box.min.x) / 2, 0, -(box.max.z + box.min.z) / 2); // centre on the lab turntable
  // drive the animations while the showcase is alive
  let last = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    for (const o of animated) o.userData.animate(dt, o.userData.wheels ? 3 : 0);
    if (root.parent !== null || root.userData.alive !== false) requestAnimationFrame(loop);
  };
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(loop);
  root.userData = { footprint: { w: 100, l: 100 }, colliders: [], stats };
  return root;
}
