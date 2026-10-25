// Mumbai landmarks: every factory is createX(ink) -> THREE.Group (y up, base y=0, front +Z).
// group.userData = { footprint, height, colliders: [{x,z,radius,height}], walkable?: [...] }  (local coordinates)
//   walkable entries: { shape:'rect', x, z, w, d, y }  |  { shape:'circle', x, z, radius, y }
//                     | { shape:'ramp', x, z, w, d, y0, y1, rising:'+x'|'-x' }     (y = surface height above local y=0)
export { createGateway } from './gateway.js';
export { createTaj } from './taj.js';
export { createCST } from './cst.js';
export { createBSE } from './bse.js';
export { createRajabai } from './rajabai.js';
export { createFloraFountain } from './floraFountain.js';
export { createArtDeco, createStreetlight, createTetrapods, createPromenadeSegment } from './marineDrive.js';
export { createPylon, createDeckSegment } from './seaLink.js';
export { createHajiAli, createCauseway } from './hajiAli.js';
export { createChawl } from './chawl.js';
export { createStation, createFootbridge } from './station.js';
export { createIraniCafe, createPaanShop, createFilmPosterWall, createTempleShrine } from './shops.js';
export { createShowcase, createShowcase as createLandmark } from './showcase.js';
