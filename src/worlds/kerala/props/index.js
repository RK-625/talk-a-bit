/**
 * kerala/props: vehicles, stalls and street props for the Kochi world.
 * Re-exports every factory plus createShowcase(ink) for the lab turntable review.
 */
import * as THREE from 'three';
import { buildInstanced } from '../../../engine/scatter.js';
import { createInkMaterial, OVERLAY_LAYER } from '../../../engine/ink.js';
import { nameCard, triCount, resolveInk, vcMat } from './kit.js';
import * as V from './vehicles.js';
import * as S from './stalls.js';
import * as T from './street.js';
import * as D from './siteDetails.js';
import * as D2 from './siteDetails2.js';

export * from './vehicles.js';
export * from './stalls.js';
export * from './street.js';
export * from './siteDetails.js';
export * from './siteDetails2.js';
export { C, Mix, triCount, nameCard, meshOf, plaque, hand } from './kit.js';


// ---- integration metadata for the site-detail props (explicit exports shadow the `export *` above) --------------
// userData.anchors: { name: {x,y,z,facing?} } where NPCs / props belong (facing = yaw radians, 0 faces +z);
// userData.pad {w,d}, userData.bounds {min,max}, userData.occluder (false = never fades).
import { annotate } from './meta.js';
const PI = Math.PI;
const A = (anchors, extra = {}) => ({ anchors, ...extra });
export const createElephantaBooth = annotate(D.createElephantaBooth, A({ clerk: { x: 0, y: 0.3, z: 0.1, facing: 0 }, queue: { x: 0, y: 0, z: 3.4, facing: PI } }));
export const createFerry = annotate(D.createFerry, A({ captain: { x: 0, y: 4.9, z: 2.4, facing: 0 }, deck: { x: 0, y: 2.1, z: -1.5, facing: 0 }, gangway: { x: 0, y: 2.1, z: -5.3, facing: PI } }));
export const createPhotographerTripod = annotate(D.createPhotographerTripod, A({ photographer: { x: 0, y: 0, z: -1.2, facing: 0 }, client: { x: 0, y: 0, z: 3.2, facing: PI } }));
export const createDanaMat = annotate(D.createDanaMat, A({ seller: { x: -1.3, y: 0.1, z: -0.5, facing: 0.6 }, feeder: { x: 0.2, y: 0, z: 1.8, facing: PI } }));
export const createVintageCar = annotate(D.createVintageCar, A({ doorman: { x: 1.8, y: 0, z: 0.6, facing: -PI / 2 }, driver: { x: -0.4, y: 0.8, z: -0.2, facing: 0 } }));
export const createBullStatue = annotate(D.createBullStatue, A({ admirer: { x: 0, y: 0, z: 2.6, facing: PI }, selfie: { x: 2.6, y: 0, z: 1.8, facing: PI } }));
export const createStockTicker = annotate(D.createStockTicker, A({ reader: { x: 0, y: 0, z: 1.6, facing: PI } }));
export const createTiffinPile = annotate(D.createTiffinPile, A({ sorterA: { x: -0.8, y: 0, z: 1.5, facing: PI }, sorterB: { x: 1.0, y: 0, z: 1.6, facing: PI }, tallyKeeper: { x: 0, y: 0, z: -1.7, facing: 0 } }));
export const createLuggageTrolley = annotate(D.createLuggageTrolley, A({ coolie: { x: 0, y: 0, z: 3.1, facing: PI } }));
export const createBookStall = annotate(D.createBookStall, A({ seller: { x: 0, y: 0.4, z: -0.4, facing: 0 }, browser: { x: -0.8, y: 0, z: 2.2, facing: PI }, stool: { x: 2.0, y: 0.5, z: 1.9, facing: PI } }));
export const createMarineBench = annotate(D.createMarineBench, A({ seatL: { x: -0.8, y: 0.74, z: 0.05, facing: 0 }, seatR: { x: 0.8, y: 0.74, z: 0.05, facing: 0 }, seatMid: { x: 0, y: 0.74, z: 0.05, facing: 0 } }));
export const createTollBooth = annotate(D.createTollBooth, A({ collector: { x: 0, y: 0.3, z: -0.6, facing: 0 }, laneL: { x: -1.9, y: 0, z: 3, facing: PI }, laneR: { x: 1.9, y: 0, z: 3, facing: PI } }));
export const createChadarStall = annotate(D.createChadarStall, A({ seller: { x: 0, y: 0, z: -0.4, facing: 0 }, pilgrim: { x: 0.4, y: 0, z: 1.9, facing: PI } }));
export const createHajiAliJuice = annotate(D.createHajiAliJuice, A({ juiceMan: { x: 0, y: 0.2, z: 0.2, facing: 0 }, customer: { x: 0, y: 0, z: 2.9, facing: PI }, stool: { x: 2.0, y: 0.5, z: 2.8, facing: PI } }));
export const createPavBhajiStall = annotate(D2.createPavBhajiStall, A({ cook: { x: -0.8, y: 0.2, z: -0.8, facing: 0 }, customer: { x: 0, y: 0, z: 2.0, facing: PI }, stoolA: { x: 1.7, y: 0.45, z: 2.2, facing: PI }, stoolB: { x: 2.5, y: 0.45, z: 2.0, facing: PI } }));
export const createHorse = annotate(D2.createHorse, A({ rider: { x: 0, y: 2.75, z: 0.05, facing: 0 }, handler: { x: 1.3, y: 0, z: 1.0, facing: -PI / 2 } }));
export const createSandArt = annotate(D2.createSandArt, A({ artist: { x: -2.9, y: 0, z: 0.8, facing: PI / 2 }, onlooker: { x: 0, y: 0, z: 3.4, facing: PI } }));
export const createBhuttaCart = annotate(D2.createBhuttaCart, A({ seller: { x: -0.55, y: 0, z: -1.2, facing: 0 }, customer: { x: 0, y: 0, z: 1.7, facing: PI } }));
export const createCoconutCart = annotate(D2.createCoconutCart, A({ seller: { x: 0, y: 0, z: -1.2, facing: 0 }, customer: { x: 0, y: 0, z: 1.8, facing: PI } }));
export const createCarromBoard = annotate(D2.createCarromBoard, A({ seatN: { x: 0, y: 0.38, z: -1.55, facing: 0 }, seatS: { x: 0, y: 0.38, z: 1.55, facing: PI }, seatE: { x: 1.55, y: 0.38, z: 0, facing: -PI / 2 }, seatW: { x: -1.55, y: 0.38, z: 0, facing: PI / 2 } }));
export const createCommonTap = annotate(D2.createCommonTap, A({ waiter: { x: 0, y: 0.16, z: 1.5, facing: PI }, carrier: { x: -1.2, y: 0.16, z: 1.4, facing: PI } }));
export const createRangoli = annotate(D2.createRangoli, A({ artist: { x: 0, y: 0, z: 1.6, facing: PI } }, { occluder: false }));
export const createGanpatiPoster = annotate(D2.createGanpatiPoster, A({ devotee: { x: 0, y: 0, z: 1.9, facing: PI } }));
export const createPuddle = annotate(D2.createPuddle, A({}));
export const createTempleBells = annotate(D2.createTempleBells, A({ devotee: { x: 0, y: 0, z: 1.2, facing: PI } }));
export const createOfferingStall = annotate(D2.createOfferingStall, A({ seller: { x: 0, y: 0, z: -0.4, facing: 0 }, devotee: { x: 0.4, y: 0, z: 2.0, facing: PI } }));
export const createChappalRow = annotate(D2.createChappalRow, A({ owner: { x: 2.3, y: 0, z: 0.4, facing: PI } }));
export const createTimetableBoard = annotate(D2.createTimetableBoard, A({ reader: { x: 0, y: 0, z: 1.6, facing: PI } }));
export const createFastSlowIndicator = annotate(D2.createFastSlowIndicator, A({ waiter: { x: 0, y: 0, z: 1.4, facing: PI } }));
export const createPlatformChaiStall = annotate(D2.createPlatformChaiStall, A({ chaiwala: { x: 0, y: 0, z: -0.4, facing: 0 }, customer: { x: 0, y: 0, z: 1.9, facing: PI } }));
export const createStoolCluster = annotate(D2.createStoolCluster, (g) => ({ anchors: { seatA: { x: 1.0, y: 0.5, z: 0, facing: PI / 2 }, seatB: { x: -1.0, y: 0.5, z: 0, facing: -PI / 2 }, seatC: { x: 0, y: 0.5, z: 1.0, facing: PI }, seatD: { x: 0, y: 0.5, z: -1.0, facing: 0 } } }));
export const createCrateStack = annotate(D2.createCrateStack, A({}));

/** everything, in showcase order: [label, sublabel, factory, opts?] */
export const CATALOG = [
  ['Cab', 'white', V.createTaxi],
  ['KSRTC bus', 'ordinary', V.createBus],
  ['Auto-rickshaw', '', V.createAutoRickshaw],
  ['Dabbawala cycle', '', V.createDabbawalaBike],
  ['Train car', 'general: mixed crowd', V.createTrainCar],
  ['Ladies car', 'സ്ത്രീകൾ / WOMEN', (ink) => V.createTrainCar(ink, { ladies: true, seed: 5 })],
  ['Train engine', 'cab front', (ink) => V.createTrainCar(ink, { isEngine: true, livery: 'purple' })],
  ['Track', 'segment x2', (ink) => { const g = new THREE.Group(); const a = V.createTrackSegment(ink, 4); const b = V.createTrackSegment(ink, 4); b.position.z = 4; g.add(a, b); g.position.z = 0; g.userData = { footprint: { w: 4, l: 8 } }; return g; }],
  ['Level crossing', '', V.createLevelCrossing],
  ['Puttu / appam cart', 'the star', S.createVadaPavStall],
  ['Chaya kada', "Kuttan Chettan's", S.createChaiTapri],
  ['Banana-chips cart', '', S.createBhelCart],
  ['Tender-coconut cart', '', S.createGolaStall],
  ['Fruit cart', '', S.createFruitCart],
  ['Flower mat', '', S.createMarigoldMat],
  ['Lottery kiosk', '', S.createPaanStall],
  ['Newspaper stand', '', S.createNewspaperStand],
  ['Balloons', 'bobbing', S.createBalloonBunch],
  ['Lamp post', '', T.createLampPost],
  ['Bus stop', 'KSRTC', T.createBusStop],
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
  ['Boat', 'houseboat / canoe', T.createBoat],
  ['Water-metro ticket booth', 'Fort Kochi', D.createElephantaBooth],
  ['Water-metro boat', 'bobbing', D.createFerry],
  ['Photographer', 'tripod stand', D.createPhotographerTripod],
  ['Dana mat', 'pigeon feed', D.createDanaMat],
  ['Vintage car', 'Mattancherry', D.createVintageCar],
  ['Kathakali mask', 'Aspinwall', D.createBullStatue],
  ['Now-hiring board', 'scrolls', D.createStockTicker],
  ['Delivery scooters', 'Ernakulam Jn', D.createTiffinPile],
  ['Luggage trolley', 'Ernakulam Jn', D.createLuggageTrolley],
  ['Book stall', 'St Francis', D.createBookStall],
  ['Marine bench', '', D.createMarineBench],
  ['Toll booth', 'Goshree', D.createTollBooth],
  ['Candle/flower stall', 'church', D.createChadarStall],
  ['Kulukki sarbath stall', 'shop', D.createHajiAliJuice],
  ['Pazham pori stall', 'Cherai', D2.createPavBhajiStall],
  ['Horse', 'rides, idle', D2.createHorse],
  ['Sand art', 'Cherai', D2.createSandArt],
  ['Bhutta cart', 'coals flicker', D2.createBhuttaCart],
  ['Coconut cart', '', D2.createCoconutCart],
  ['Carrom board', 'chawl', D2.createCarromBoard],
  ['Common tap', 'chawl', D2.createCommonTap],
  ['Pookalam 0', 'rings', (ink) => D2.createRangoli(ink, { seed: 0 })],
  ['Pookalam 1', 'petals', (ink) => D2.createRangoli(ink, { seed: 1 })],
  ['Pookalam 2', 'lamp', (ink) => D2.createRangoli(ink, { seed: 2 })],
  ['Pookalam 3', 'leaves', (ink) => D2.createRangoli(ink, { seed: 3 })],
  ['Onam poster', 'chowk', D2.createGanpatiPoster],
  ['Puddle', 'decal', (ink) => D2.createPuddle(ink, { seed: 2 })],
  ['Temple bells', 'swing', D2.createTempleBells],
  ['Offering stall', 'temple', D2.createOfferingStall],
  ['Chappal row', 'temple', D2.createChappalRow],
  ['Metro timetable', 'station', D2.createTimetableBoard],
  ['Platform 1/2', 'indicator', D2.createFastSlowIndicator],
  ['Platform chaya stall', 'station', D2.createPlatformChaiStall],
  ['Stool cluster', 'plastic', D2.createStoolCluster],
  ['Crate stack', '', D2.createCrateStack],
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
