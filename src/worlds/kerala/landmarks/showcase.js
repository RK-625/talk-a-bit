// Review sheet for the lab turntable: every landmark in a grid with a hand-lettered name card in front.
import * as THREE from 'three';
import { Kit, PAL, paintBoard, latin } from './kit.js';
import { createGateway } from './gateway.js';
import { createTaj } from './taj.js';
import { createCST } from './cst.js';
import { createBSE } from './bse.js';
import { createRajabai } from './rajabai.js';
import { createFloraFountain } from './floraFountain.js';
import { createArtDeco, createStreetlight, createKattumaram, createLighthouse, createPromenadeSegment, createRainbowArch } from './marineDrive.js';
import { createPylon, createDeckSegment, createPier, createEmbankment } from './seaLink.js';
import { createAntilia } from './antilia.js';
import { createHajiAli, createCauseway } from './hajiAli.js';
import { createChawl } from './chawl.js';
import { createStation } from './station.js';
import { createIraniCafe, createPaanShop, createFilmPosterWall, createTempleShrine } from './shops.js';

function nameCard(ink, text, w = 6) {
  const k = new Kit(ink, { hatch: 0.08, thickness: 2, seed: 9 });
  k.cyl(PAL.woodDark, 0.09, 0.11, 1.8, -w * 0.38, 0, 0, { seg: 5 });
  k.cyl(PAL.woodDark, 0.09, 0.11, 1.8, w * 0.38, 0, 0, { seg: 5 });
  k.box(0xf6efd8, w, 1.5, 0.1, 0, 0.9, 0);
  const c = paintBoard(w, 1.5, '#f6efd8', '#e0cf9a', (ctx, W, H) => latin(ctx, text, W / 2, H * 0.66, Math.min(H * 0.55, (W / text.length) * 1.45), {}), { seed: 5, px: 70 });
  k.plane(c, w * 0.96, 1.44, [0, 1.65, 0.08], 0);
  return k.finish({ lean: 0.01, shadow: false });
}

export function createShowcase(ink) {
  const g = new THREE.Group();
  const rows = [
    [['Chinese Fishing Nets', createGateway], ['Mattancherry Palace', createTaj], ['Ernakulam Junction', createCST]],
    [['Aspinwall House', createBSE], ['St. Francis Church', createRajabai], ['Jew Town Clock Tower', createFloraFountain], ['Bolgatty Palace', createHajiAli]],
    [['Heritage House', (i) => createArtDeco(i, 0)], ['Apartments', (i) => createArtDeco(i, 1)], ['Shop-house row', (i) => createArtDeco(i, 2)], ['Streetlight', createStreetlight], ['Country boats', createKattumaram], ['Lighthouse', createLighthouse], ['Walkway', (i) => createPromenadeSegment(i, 6)], ['Rainbow arch', createRainbowArch]],
    [['Infopark', createAntilia], ['Goshree Bridge span', createSeaLinkSpan]],
    [['Goshree arches + pillars', createPylon], ['Pier (10 deep)', (i) => createPier(i, 10)], ['Embankment', (i) => createEmbankment(i, 8, 4)], ['Deck segment x3', (i) => { const s = new THREE.Group(); for (let n = -1; n <= 1; n++) { const d = createDeckSegment(i, 4); d.position.z = n * 4; s.add(d); } s.userData = { footprint: 7 }; return s; }], ['Causeway', (i) => createCauseway(i, 6)]],
    [['House/Flats 1', (i) => createChawl(i, 1)], ['House/Flats 2', (i) => createChawl(i, 2)], ['House/Flats 3', (i) => createChawl(i, 3)], ['House/Flats 4', (i) => createChawl(i, 4)]],
    [['Kochi Metro station', (i) => createStation(i, { footbridge: true })], ['Meals Hotel', createIraniCafe], ['Petti Kada', createPaanShop], ['Film Poster + Cut-outs', createFilmPosterWall], ['Kerala Temple', createTempleShrine]],
  ];
  const boxes = rows.map((row) => row.map(([name, make]) => {
    const o = make(ink);
    const b = new THREE.Box3().setFromObject(o);
    return { name, o, w: Math.max(6, b.max.x - b.min.x), d: Math.max(5, b.max.z - b.min.z), cx: (b.max.x + b.min.x) / 2, cz: (b.max.z + b.min.z) / 2, maxZ: b.max.z };
  }));
  const GAP = 5;
  let z = 0;
  const rowInfo = boxes.map((row) => {
    const width = row.reduce((s, c) => s + c.w, 0) + GAP * (row.length - 1);
    const depth = Math.max(...row.map((c) => c.d));
    const info = { width, depth, z };
    z += depth + 9;
    return info;
  });
  const totalW = Math.max(...rowInfo.map((r) => r.width)), totalD = z - 9;
  boxes.forEach((row, ri) => {
    let x = -rowInfo[ri].width / 2;
    const rz = rowInfo[ri].z + rowInfo[ri].depth / 2 - totalD / 2;
    for (const c of row) {
      c.o.position.set(x + c.w / 2 - c.cx, 0, rz - c.cz);
      g.add(c.o);
      const card = nameCard(ink, c.name, Math.max(6, Math.min(10, c.name.length * 0.62)));
      card.position.set(x + c.w / 2, 0, rz + c.d / 2 + 3.4);
      g.add(card);
      x += c.w + GAP;
    }
  });
  void totalW;
  g.name = 'landmarkShowcase';
  return g;
}

/** A review span: 8 deck segments, 2 piers at joints, the pylon in the middle and an embankment at one end. */
export function createSeaLinkSpan(i) {
  const s = new THREE.Group();
  for (let n = -4; n <= 3; n++) { const d = createDeckSegment(i, 4); d.position.z = n * 4 + 2; s.add(d); }
  for (const z of [-8, 8]) { const pr = createPier(i, 9); pr.position.z = z; s.add(pr); }
  s.add(createPylon(i));
  const e = createEmbankment(i, 8, 3.5); e.position.z = -20; s.add(e);
  s.userData = { footprint: 30 };
  return s;
}
