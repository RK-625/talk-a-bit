// Hyderabad landmarks (same factory names/ids as the Mumbai fork they replace; see docs/HYDERABAD.md for the mapping): every factory is createX(ink) -> THREE.Group (y up, base y=0, front +Z).
// group.userData = { footprint, height, colliders: [{x,z,radius,height}], walkable?, bounds, pad, anchors, occluder }
//   walkable entries: { shape:'rect', x, z, w, d, y, kind? } | { shape:'circle', x, z, radius, y }
//                     | { shape:'ramp', x, z, w, d, y0, y1, rising:'+x'|'-x' }     (y = surface height above local y=0)
//   bounds  {min:[x,y,z], max:[x,y,z]} local box of the drawn geometry       pad  {w,d} of the real plinth
//   anchors { name: {x,y,z,facing?} } local spots for NPCs/props (facing = yaw radians, 0 faces +Z)
//   occluder false => never fade when the camera is behind it (small things)
import { annotate } from './meta.js';
import { createGateway as _gateway } from './gateway.js';
import { createTaj as _taj } from './taj.js';
import { createCST as _cst } from './cst.js';
import { createBSE as _bse } from './bse.js';
import { createRajabai as _rajabai } from './rajabai.js';
import { createFloraFountain as _flora } from './floraFountain.js';
import { createArtDeco as _deco, createStreetlight as _light, createTetrapods as _tetra, createPromenadeSegment as _prom } from './marineDrive.js';
import { createPylon as _pylon, createDeckSegment as _deck, createPier as _pier, createEmbankment as _emb } from './seaLink.js';
import { createAntilia as _antilia } from './antilia.js';
import { createHajiAli as _haji, createCauseway as _cause } from './hajiAli.js';
import { createChawl as _chawl } from './chawl.js';
import { createStation as _station, createFootbridge as _fb } from './station.js';
import { createIraniCafe as _cafe, createPaanShop as _paan, createFilmPosterWall as _poster, createTempleShrine as _temple } from './shops.js';
import { createShowcase as _showcase } from './showcase.js';

const PI = Math.PI;
export const createGateway = annotate(_gateway, {
  pad: { w: 17, d: 12 },
  anchors: { photographer: { x: 4.6, y: 0.05, z: 6.4, facing: PI }, balloonSeller: { x: -4.8, y: 0.05, z: 5.4, facing: PI }, pigeonFeeder: { x: -2.2, y: 0.05, z: 7.0, facing: PI }, tourists: { x: 1.6, y: 0.05, z: 6.8, facing: PI }, ferryBooth: { x: 6.2, y: 0.05, z: 4.2, facing: 0 }, bangleA: { x: -7.2, y: 0.05, z: 0.4, facing: 0.35 }, bangleB: { x: 7.3, y: 0.05, z: -0.6, facing: -0.35 }, jetty: { x: 0, y: -0.8, z: 9.4, facing: 0 } },
});
export const createTaj = annotate(_taj, { pad: { w: 23, d: 7 }, anchors: { doorman: { x: 0, y: 0.05, z: 5.0, facing: 0 }, vintageCar: { x: -4.5, y: 0.05, z: 7.6, facing: 0 }, bellboy: { x: 3.0, y: 0.05, z: 5.0, facing: 0 } } });
export const createCST = annotate(_cst, { pad: { w: 27, d: 10 }, anchors: { coolieA: { x: -5.5, y: 0.05, z: 5.6, facing: 0 }, coolieB: { x: 5.5, y: 0.05, z: 5.6, facing: 0 }, tiffinSorting: { x: 8.5, y: 0.05, z: 6.4, facing: 0 }, luggageTrolley: { x: -9, y: 0.05, z: 6.2, facing: 0 }, commuters: { x: 0, y: 0.05, z: 6.5, facing: 0 } } });
export const createBSE = annotate(_bse, { pad: { w: 12, d: 8 }, anchors: { bull: { x: 3.6, y: 0.05, z: 5.2, facing: 0 }, ticker: { x: -4.6, y: 0.05, z: 4.9, facing: 0 }, broker: { x: -1.5, y: 0.05, z: 4.6, facing: 0 }, guard: { x: 1.2, y: 0.05, z: 4.2, facing: 0 } } });
export const createRajabai = annotate(_rajabai, { pad: { w: 7, d: 7 }, anchors: { student: { x: 3.4, y: 0.05, z: 3.6, facing: 0 }, bookSeller: { x: -4.4, y: 0.05, z: 3.4, facing: 0 } } });
export const createFloraFountain = annotate(_flora, { pad: { w: 8.8, d: 8.8 }, occluder: false, anchors: { sitterA: { x: 4.6, y: 0.4, z: 0, facing: -PI / 2 }, sitterB: { x: -4.6, y: 0.4, z: 0, facing: PI / 2 } } });
export const createArtDeco = annotate(_deco, { pad: { w: 8.2, d: 5.6 }, anchors: { doorway: { x: 0, y: 0.05, z: 3.0, facing: 0 } } });
export const createStreetlight = annotate(_light, { pad: { w: 0.8, d: 0.8 }, occluder: false });
export const createTetrapods = annotate(_tetra, { pad: { w: 4.4, d: 3.6 }, occluder: false });
export const createPromenadeSegment = annotate(_prom, (g) => ({ pad: { w: g.userData.length, d: 4.2 }, occluder: false, anchors: { benchSeat: { x: 0, y: 0.07, z: -1.6, facing: PI }, jogger: { x: 0, y: 0.07, z: -0.4, facing: PI / 2 }, parapetSeat: { x: 0, y: 1.2, z: 1.1, facing: 0 } } }));
export const createPylon = annotate(_pylon, { pad: { w: 12, d: 3.6 }, occluder: false });
export const createDeckSegment = annotate(_deck, (g) => ({ pad: { w: 7.6, d: g.userData.length }, occluder: false, anchors: { footpathL: { x: -2.55, y: 0.22, z: 0, facing: 0 }, footpathR: { x: 2.55, y: 0.22, z: 0, facing: 0 } } }));
export const createPier = annotate(_pier, { pad: { w: 6, d: 3 }, occluder: false });
export const createEmbankment = annotate(_emb, (g) => ({ pad: { w: 7.6 + g.userData.height * 1.8, d: g.userData.length }, occluder: false }));
export const createAntilia = annotate(_antilia, { pad: { w: 22, d: 20 }, anchors: { guardBooth: { x: 5.2, y: 0, z: 9.7, facing: 0 }, gateGuard: { x: 2.6, y: 0, z: 9.7, facing: 0 }, carLine: { x: 3.5, y: 0, z: 13, facing: PI / 2 }, mali: { x: -6, y: 0, z: 6, facing: 0 }, lobby: { x: -1.5, y: 0.1, z: 1.4, facing: 0 } } });
export const createHajiAli = annotate(_haji, { pad: { w: 13.8, d: 13.8 }, anchors: { pilgrimGate: { x: 0, y: 0.1, z: 5.6, facing: PI }, flowerSeller: { x: -2.6, y: 0.1, z: 6.2, facing: 0 }, pilgrimA: { x: 1.8, y: 0.1, z: 5.0, facing: PI }, minaretBase: { x: 3.9, y: 0.1, z: 4.6, facing: 0 } } });
export const createCauseway = annotate(_cause, (g) => ({ pad: { w: 2.6, d: g.userData.length }, occluder: false, anchors: { stall: { x: 1.9, y: 0.1, z: 0, facing: -PI / 2 }, pilgrim: { x: 0, y: 0.1, z: 0, facing: 0 } } }));
export const createChawl = annotate(_chawl, (g) => {
  const [W, Dz] = g.userData.size;
  return { pad: { w: W + 1, d: Dz + 3.2 }, anchors: { rangoli: { x: -W / 2 + 1.4, y: 0.05, z: Dz / 2 + 1.2, facing: 0 }, tap: { x: W / 2 + 1.6, y: 0.05, z: 0.8, facing: 0 }, carrom: { x: W / 2 - 2.2, y: 0.05, z: Dz / 2 + 1.2, facing: 0 }, doorstep: { x: 0, y: 0.05, z: Dz / 2 + 0.9, facing: 0 }, mural: { x: W / 2 + 1.2, y: 0.05, z: 0, facing: PI / 2 } } };
});
export const createStation = annotate(_station, { pad: { w: 19, d: 6 }, anchors: { benchSeat0: { x: -6.8, y: 0.95, z: -1.4, facing: 0 }, benchSeat1: { x: 1.8, y: 0.95, z: -1.4, facing: 0 }, benchSeat2: { x: 7.0, y: 0.95, z: -1.4, facing: 0 }, commuterA: { x: -3.5, y: 0.45, z: 1.2, facing: 0 }, commuterB: { x: 3.5, y: 0.45, z: 1.4, facing: 0 }, chaiStall: { x: -9, y: 0.45, z: -1.2, facing: 0 }, ticketWindow: { x: 7.1, y: 0.45, z: 0.4, facing: 0 }, edge: { x: 0, y: 0.45, z: 1.9, facing: 0 } } });
export const createFootbridge = annotate(_fb, { pad: { w: 4, d: 12 }, occluder: false });
export const createIraniCafe = annotate(_cafe, { pad: { w: 7.6, d: 8.4 }, anchors: { owner: { x: 0, y: 0.05, z: 3.4, facing: 0 }, table1: { x: -1.6, y: 0.05, z: 4.4, facing: PI }, table2: { x: 1.8, y: 0.05, z: 4.4, facing: PI } } });
export const createPaanShop = annotate(_paan, { pad: { w: 3.6, d: 3.4 }, occluder: false, anchors: { vendor: { x: 0, y: 0.2, z: 0.1, facing: 0 }, customer: { x: 0, y: 0.05, z: 1.8, facing: PI } } });
export const createFilmPosterWall = annotate(_poster, { pad: { w: 9.4, d: 2.4 }, anchors: { hopeful: { x: 0, y: 0.05, z: 1.6, facing: 0 }, loiterer: { x: 3, y: 0.05, z: 1.4, facing: 0 } } });
export const createTempleShrine = annotate(_temple, { pad: { w: 4.2, d: 4.4 }, occluder: false, anchors: { priest: { x: 0, y: 0.3, z: 1.5, facing: 0 }, devotee: { x: 0.9, y: 0.05, z: 2.8, facing: PI }, shoes: { x: -1.6, y: 0.05, z: 2.4, facing: 0 }, coconutStall: { x: 2.8, y: 0.05, z: 1.0, facing: -PI / 2 }, bells: { x: 0, y: 0.05, z: 2.2, facing: 0 } } });
export const createShowcase = _showcase;
export { _showcase as createLandmark };
export { createSeaLinkSpan } from './showcase.js';
