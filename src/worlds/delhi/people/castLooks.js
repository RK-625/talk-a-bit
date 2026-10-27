/**
 * people/castLooks.js: explicit Delhi look overrides for the named people (docs/DELHI_CAST.md describes every one).
 *
 *   LOOKS[id]        -> { loop?, ...spec overrides }  (see tw() below for the keys: any createPerson spec field, plus
 *                       hair / face (merged into the seeded ones), acc (replace the accessory list) and accAdd (append))
 *   lookOf(id)       -> { loop, tweak } | null        npcs.js / population4.js pass these to createNPC / createCitizen
 *
 * People not listed here keep their role's own look (people/roles.js, roles2.js) or the seeded citizen look (variation.js).
 * Nobody here has Rahul's (the hero's) stack of books, khaki jhola or mustard-kurta-over-indigo-jeans combination.
 * Delhi clothing: salwar-kameez with a dupatta, sarees, kurta-pajama, jeans + jackets / sweaters, Sikh men in plain turbans (a patka or full turban
 * with a beard, shown respectfully), office wear with lanyards near Cyber Hub. No jasmine in the hair (that was Hyderabad); a few red ribbons / clips.
 */
import { PASTEL as P } from './kit.js';

const W_ = 0xfffaf0;
const GREY = 0xcfcfcf, BLACK = 0x2b2330;

/** turn a plain object into a (spec, r) tweak */
export const tw = (o = {}) => (s) => {
  const { acc, accAdd, hair, face, loop, ...rest } = o;
  void loop;
  Object.assign(s, rest);
  if (hair) s.hair = { ...s.hair, ...(typeof hair === 'string' ? { style: hair } : hair) };
  if (face) s.face = { ...s.face, ...face };
  if (acc) s.accessories = acc;
  if (accAdd) s.accessories = [...(s.accessories ?? []), ...accAdd];
  return s;
};
// outfit shorthands (all return spec fragments)
export const saree = (blouse, body, pallu, extra = {}) => ({ outfit: 'saree', top: blouse, bottom: body, pallu, bottom2: W_, top2: W_, trim: W_, bottomPattern: 'plain', ...extra });
export const salwar = (top, bottom, extra = {}) => ({ outfit: 'kurtaPyjama', sleeves: 'long', top, bottom, topPattern: 'plain', ...extra });
export const tee = (top, bottom, extra = {}) => ({ outfit: 'shirtTrousers', sleeves: 'short', top, bottom, topPattern: 'plain', ...extra });
export const shirt = (top, bottom, extra = {}) => ({ outfit: 'shirtTrousers', sleeves: 'long', top, bottom, topPattern: 'plain', ...extra });
/** a jacket or sweater over jeans (Delhi winters): long sleeves, a solid darker top */
export const jacket = (top, bottom, extra = {}) => ({ outfit: 'shirtTrousers', sleeves: 'long', top, bottom, topPattern: 'plain', trim: null, ...extra });
/** kurta-pajama (kurta in `top`, pyjama in `bottom`) */
export const kp = (top, bottom = 0xfbf7ea, extra = {}) => ({ outfit: 'kurtaPyjama', sleeves: 'long', top, bottom, topPattern: 'plain', bottomPattern: 'plain', bottom2: W_, trim: null, ...extra });
/** Sikh man: a plain turban in `color` with a full beard (`beardCol`), shown respectfully and without any caricature */
export const sikh = (color, beardCol = BLACK, beard = 'full') => ({ hair: { style: 'turban', hat: color, color: BLACK }, face: { beard, beardColor: beardCol, moustache: false } });
/** woman with her dupatta drawn over her head (gurudwara) */
export const covered = (color) => ({ hair: { style: 'hijab', color: BLACK, hat: color } });
const RED = 0xd9453f; // delivery riders' plain red
const lan = (color) => ({ name: 'lanyard', color });
const towel = (color, slot = 'shoulderR', extra = {}) => ({ name: 'gamcha', slot, color, ...extra });
const ORANGE = 0xf08a3c, NAVY_T = 0x2a3f86, WHITE_T = 0xf4f0e6, SKY_T = 0x6fa8dc, MAROON_T = 0x7a2f3a;

export const LOOKS = {
  // ================= Bittu Bhaiya's chai-stall square (the chowk) ======================================================
  // Bittu Bhaiya: round, 40s, a blue-and-white checked half-sleeve shirt over dark trousers, a saffron towel on the shoulder, thick moustache, kettle + glass
  chaiwalaUncle: { ...shirt(0x6fa3d8, 0x3d3a55, { sleeves: 'short', topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: 0x4a4358 }, face: { moustache: 'thick', specs: false, tilak: false }, acc: ['kettle', { name: 'chaiGlass', slot: 'handL' }, towel(P.saffron, 'shoulderR', { pattern: 'plain' })], footwear: 'chappal' },
  // chole kulche wala: a rust half-sleeve shirt, a white cloth cap, a white apron-ish gamcha, steel ladle
  vadaPavWala: { ...tee(0xc9603a, 0x3d3a55, { sleeves: 'short' }), hair: { style: 'topi', hat: W_, color: BLACK }, face: { moustache: 'thick', tilak: false }, acc: [towel(W_, 'shoulderR', { pattern: 'checks', color2: 0xd9453f }), 'jhara'], footwear: 'chappal' },
  // reel-making influencer (young woman): crop-style pink tee, black jeans, sunglasses, phone held up
  bollywoodHopeful: { ...tee(0xf06aa0, 0x2b2b33, { topPattern: 'plain' }), height: 2.12, build: 'thin', hair: { style: 'short', color: BLACK }, face: { lashes: true, moustache: false, smile: 'big', bindi: false }, acc: ['sunglasses', 'phone'], footwear: 'shoes', footColor: P.white },
  cricketKid: {},
  'chowk-cricket-bowler': {},
  'chowk-newspaper-vendor': { ...shirt(0x9a8f78, 0xc9c4d6, { topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: GREY }, face: { moustache: 'thin', specs: true }, acc: ['newspaper', 'newspaperBundle'], footwear: 'chappal' },
  'chowk-skip-girl': { loop: 'skip', ...salwar(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK, band: 0xe05a4a }, face: { bindi: true, lashes: true }, acc: ['jumpRope'], footwear: 'bare' },
  'chowk-kite-boy': { loop: 'kite', ...tee(P.sky, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  // old Delhi havelis
  'chawl-carrom-man': { ...tee(0xf6efdb, 0x6d6a8a, { sleeves: 'none' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [] },
  'chawl-carrom-elder': { ...kp(P.white, 0xece6d4), hair: { style: 'topi', hat: W_, color: GREY }, face: { specs: true, moustache: 'thin', tilak: false }, acc: [] },
  'chawl-tap-woman': { ...salwar(0x3fa37e, P.cream, { trim: W_ }), hair: { style: 'bun', color: BLACK }, face: { bindi: true }, acc: [towel(P.marigold, 'shoulderL', { pattern: 'plain' })] },
  // transit at the Red Fort bus stop
  busConductor: {},
  taxiDriver: {},
  dabbawala: {},
  trafficCop: {},
  auntyWithSabzi: { ...salwar(0xc2306b, 0xf3e3c6, { trim: W_ }), hair: { style: 'bun', color: 0x7a6a76 }, face: { bindi: true, specs: true }, acc: ['sabziBag', { name: 'umbrella', color: P.lilac, color2: P.cream }] },
  'marine-walk-student': {},
  balloonSeller: {},
  // Sarojini-market style clothes seller (id kept): bright printed salwar suit, a mustard dupatta on the shoulder, a tray of folded kurtis and dupattas
  koliFisherwoman: { ...salwar(0xe05a8a, 0x2f9a8a, { trim: 0xf2c230 }), hair: { style: 'bun', color: BLACK }, face: { bindi: true, lashes: true, smile: 'big' }, acc: ['clothStack', towel(0xf2b43a, 'shoulderL', { pattern: 'dots', color2: W_ })], footwear: 'chappal' },
  tourist: {},
  photographer: {},
  // paddle-boat booth clerk at the boat club
  'gateway-ferry-clerk': { ...shirt(P.sky, 0x4a4560, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: true }, acc: [lan(0xf08a3c)], footwear: 'shoes' },
  // Red Fort Lahori Gate: an ASI gate guard in a khaki uniform with a green beret-cap, and a licensed guide
  'taj-doorman': { outfit: 'uniform', top: 0xc9b98a, topPattern: 'belt', top2: 0x4a5a3a, bottom: 0x8f8a62, hair: { style: 'cap', hat: 0x3f6a45, color: BLACK }, face: { moustache: 'handlebar', specs: false }, acc: ['register'], footwear: 'shoes', footColor: 0x2f2a3a },
  'taj-bellboy': { ...shirt(0xfbf7ea, 0x6f6a82, { sleeves: 'short' }), hair: { style: 'cap', hat: P.saffron, color: BLACK }, face: { moustache: 'thin' }, acc: [lan(0x3fa37e), { name: 'jhola', color: P.terracotta }], footwear: 'shoes' },
  // Old Delhi station forecourt
  coolie: {},
  'cst-tiffin-sorter': {},
  'cst-officegoer': {},
  'cst-coolie-2': { top: 0xe8695d },
  'cst-tiffin-sorter-2': {},
  'cst-officegoer-2': {},
  // Connaught Place colonnade + the giant charkha
  'bse-bull-tourist': { loop: 'snap' },
  'bse-guard': { outfit: 'uniform', top: 0x3a3f5c, topPattern: 'belt', top2: 0xe3b84a, bottom: 0x2f3350, hair: { style: 'cap', hat: 0x2f3350, color: BLACK }, face: { moustache: 'thin' }, acc: ['whistle'], footwear: 'shoes' },
  'bse-broker': { ...jacket(0x3d3a55, 0x7f8fb5), hair: { style: 'short', color: BLACK }, face: { moustache: false, specs: true }, acc: ['phone', lan(0x8d5fc9), 'watch'], footwear: 'shoes' },
  // Qutub Minar book stall: old NCERT / UPSC guides, heritage guidebooks
  'rajabai-book-seller': { ...kp(0xd9a441, 0xc9c4d6, { topPattern: 'plain' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: ['bookTray'], footwear: 'chappal' },
  'rajabai-student-a': { ...jacket(0x5b6f8a, 0x2f3a58), hair: { style: 'cap', hat: P.butter, color: BLACK }, face: { moustache: false }, acc: ['books', { name: 'jhola', color: P.terracotta }], footwear: 'shoes' },
  'rajabai-book-browser': { ...tee(P.mint, P.denim, { topPattern: 'stripes', top2: W_ }), hair: { style: 'messy', color: BLACK }, face: { specs: true }, acc: ['books', lan(0x3fa37e)], footwear: 'shoes' },
  // Yamuna boat-club promenade
  'marine-bench-man': { ...jacket(0x6f7a62, P.khaki), hair: { style: 'short', color: GREY }, face: { moustache: 'thin', specs: true }, acc: ['newspaper'], footwear: 'shoes' },
  'marine-couple': {},
  'marine-chana-seller': { ...kp(P.cream, P.lilac, { sleeves: 'short' }), hair: { style: 'topi', hat: W_, color: BLACK }, face: { moustache: 'thin' }, acc: ['chanaBasket'], footwear: 'chappal' },
  'marine-jogger': {},
  'marine-bench-aunty': { ...salwar(0x7a8fc4, P.cream, { trim: W_ }), hair: { style: 'bun', color: GREY }, face: { specs: true, bindi: true }, acc: [{ name: 'sabziBag' }, towel(P.rose, 'shoulderL', { pattern: 'plain' })] },
  'marine-bench-reader': { ...kp(P.mint, W_), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thick', tilak: false }, acc: ['newspaper'] },
  'marine-couple-2': {},
  'marine-jogger-2': { top: P.sky, bottom: 0x4a4560, sleeves: 'none', hair: { style: 'short', color: BLACK, band: undefined } },
  'marine-morning-walker': { ...jacket(0xb8b2a2, 0x9a9ab4), hair: { style: 'cap', hat: 0x6f6a82, color: GREY }, face: { specs: true }, acc: ['umbrella'], footwear: 'shoes', footColor: P.white },
  // Lotus Temple causeway: flower and prasad stalls, shikanji stall
  'haji-chadar-seller': { ...saree(P.marigold, P.pink, P.cream), hair: { style: 'bun', color: BLACK }, face: { bindi: true, lashes: true }, acc: ['flowerBasket'], footwear: 'chappal' },
  // the pilgrim role: a Sikh sevadar bringing karah prasad (an orange turban, white kurta-pajama, a short grey beard)
  pilgrim: { ...kp(P.white, 0xece6d4), ...sikh(ORANGE, 0x8a8a8a, 'full'), acc: ['thali'], footwear: 'bare' },
  'haji-juice-man': { ...tee(0xfbf7ea, 0x4a4560, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [towel(P.white, 'shoulderR', { pattern: 'plain' }), { name: 'chaiGlass', slot: 'handL' }], footwear: 'chappal' },
  'haji-chadar-seller-2': { ...tee(P.sky, P.khaki, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'chappal' },
  'haji-juice-customer': { ...salwar(P.rose, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK }, face: { bindi: true }, acc: [towel(P.mint)] },
  'haji-pilgrim-2': { ...kp(P.white, 0xece6d4), hair: { style: 'topi', hat: W_, color: GREY }, face: { moustache: 'thick', specs: false, tilak: false }, acc: [], footwear: 'chappal' },
  // Cyber Hub tower (Gurugram side): office wear, a guard in a navy uniform
  securityGuard: {},
  'antilia-gate-watchman': {},
  'antilia-mali': {},
  'antilia-chauffeur': { ...shirt(0xf6f3ea, 0x3d3a55, { sleeves: 'short' }), ...sikh(SKY_T, 0x5a5a66, 'full'), acc: [lan(0x4fb3bf)], footwear: 'shoes', trim: null },
  'antilia-delivery-boy': { ...tee(RED, 0x3d3a55), hair: { style: 'cap', hat: 0x3d3a55, color: BLACK }, acc: [{ name: 'deliveryBag', color: RED }, 'phone'], footwear: 'shoes', footColor: P.white },
  'antilia-lane-walker': { ...jacket(0xb8b2a2, 0x9a9ab4), hair: { style: 'cap', hat: 0x8a6f4f, color: GREY }, face: { specs: true }, acc: ['newspaper'], footwear: 'shoes', footColor: P.white },
  'deco-office-woman': { ...shirt(P.white, 0x3d4466, { sleeves: 'short' }), hair: { style: 'bun', color: BLACK }, face: { lashes: true }, acc: [lan(0x8d5fc9), 'watch', { name: 'jhola', color: P.sky }], footwear: 'shoes' },
  // India Gate lawns
  'juhu-pavbhaji-cook': { ...tee(P.pink, P.khaki, { topPattern: 'plain' }), hair: { style: 'cap', hat: P.white, color: BLACK }, face: { moustache: 'thick', specs: true }, acc: ['jhara', towel(RED, 'shoulderR', { pattern: 'checks', color2: W_ })], footwear: 'chappal' },
  'juhu-bhutta-seller': { ...tee(P.rose, P.khaki, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin' }, acc: ['palmFan'], footwear: 'chappal' },
  'juhu-coconut-seller': { ...tee(P.cream, 0x5a6a8a, { sleeves: 'none' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [towel(P.sky, 'shoulderL', { pattern: 'checks', color2: W_ }), 'coconut'], footwear: 'chappal' },
  'juhu-horse-rider-kid': { ...tee(P.mint, P.navy, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'chappal' },
  // rangoli artist on the lawns (a woman laying coloured powder)
  'juhu-sand-artist': { ...salwar(0xf6c453, 0x8f3a8a, { trim: W_ }), height: 2.02, build: 'normal', hair: { style: 'plait', color: BLACK }, face: { bindi: true, lashes: true, moustache: false, specs: false, tilak: false }, acc: [towel(P.marigold, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' },
  'juhu-gola-kid': {},
  'juhu-pavbhaji-diner-1': { ...tee(P.butter, P.denim, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'chappal' },
  'juhu-horse-handler': { ...kp(0xf6efdb, 0xb8a98c, { sleeves: 'short' }), ...sikh(0xe8e0d0, 0x6a6a72, 'short'), acc: [towel(P.terracotta, 'shoulderR', { pattern: 'plain' })], footwear: 'chappal' },
  'juhu-family-mom': { ...salwar(0x9a5a7a, P.cream, { trim: W_ }), hair: { style: 'bun', color: BLACK }, face: { specs: false, smile: 'small', bindi: true }, acc: ['phone', { name: 'jhola', color: P.teal }], footwear: 'chappal' },
  'juhu-family-dad': { ...jacket(0x5b7a9a, P.khaki), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: true }, acc: ['camera'], footwear: 'shoes' },
  'juhu-family-kid': { ...tee(P.teal, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: ['ball'], footwear: 'bare' },
  'juhu-lifeguard': { outfit: 'shirtShorts', top: 0xd9453f, topPattern: 'plain', bottom: 0x3d3a55, hair: { style: 'cap', hat: P.white, color: BLACK }, face: { specs: false, moustache: 'thin' }, acc: ['whistle'], footwear: 'bare' },
  // gurudwara (the shrine site): granthi, devotees, the prasad stall, the shoe-keeper (jora ghar sevadar)
  priest: {},
  'temple-bell-devotee': { ...salwar(P.pink, 0xf3e3c6, { trim: W_ }), ...covered(0xf2a0b8), face: { bindi: false, lashes: true }, acc: [], footwear: 'bare' },
  'temple-offering-pilgrim': { ...salwar(0x6a8fd0, P.cream, { trim: W_ }), ...covered(0xf6efd8), face: { bindi: false }, acc: ['thali'], footwear: 'bare' },
  'temple-flower-seller': { ...salwar(P.marigold, P.saffron, { trim: W_ }), ...covered(0xf29b4b), face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' },
  'temple-shoe-keeper': { ...kp(0xece8dc, 0xf0ede4), ...sikh(0xf08a3c, 0xcfcfcf, 'full'), face: { specs: true, moustache: false, beard: 'full', beardColor: 0xcfcfcf }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' },
  // Delhi Metro station (Rajiv Chowk style)
  commuter: {},
  'station-chaiwala': { ...tee(0xfbf7ea, 0x2f7ac4, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: false, tilak: false }, height: 2.1, build: 'thin', acc: ['kettle', { name: 'chaiGlass', slot: 'handL' }, towel(RED, 'shoulderR', { pattern: 'plain' })] },
  'station-ladies-a': {},
  'station-bench-elder': { ...kp(P.white, W_), ...sikh(WHITE_T, 0xdcdcdc, 'full'), face: { specs: true, tilak: false, beard: 'full', beardColor: 0xdcdcdc, moustache: false }, acc: [{ name: 'jhola', color: P.terracotta }], footwear: 'shoes' },
  'station-commuter-2': { ...shirt(P.sky, 0x4a4560, { topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: false }, acc: ['backpack', lan(0xb23a48), 'watch'], footwear: 'shoes' },
  'station-ticket-clerk': { ...tee(0xa9d3ea, 0x4a4560, { sleeves: 'short' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: [lan(0x2f86cf)], footwear: 'shoes' },
  // Signature Bridge toll plaza
  'toll-attendant': { top: 0xf08a3c, topPattern: 'plain', hair: { hat: 0x2f3b6d } },
  'toll-collector': { top: 0xf08a3c, topPattern: 'plain', top2: W_, hair: { hat: 0x2f3b6d } },
  // street-1 .. street-10: everyday Dilliwalas (kinds fixed by details.js: man woman teen elder man woman elder teen man woman)
  'street-1': { loop: 'phone', ...jacket(0x3a6a8a, P.denim), hair: { style: 'short', color: BLACK }, face: { moustache: false }, acc: ['phone', lan(0x3fa37e)], footwear: 'shoes' },
  'street-2': { loop: 'idle', ...salwar(0x7a4a6a, 0xe9e1d0, { trim: W_ }), hair: { style: 'bun', color: BLACK }, face: { specs: false, bindi: true }, acc: [{ name: 'jhola', color: P.teal }, towel(0xe9776a, 'shoulderL', { pattern: 'plain' })] },
  'street-3': { loop: 'chat', ...jacket(0x5a4a8a, P.denim, { sleeves: 'long' }), hair: { style: 'messy', color: BLACK }, face: { specs: false }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'street-4': { loop: 'news', ...kp(P.cream, W_), hair: { style: 'topi', hat: W_, color: GREY }, face: { specs: true, moustache: 'thin', tilak: false }, acc: [{ name: 'umbrella', color: P.sky, color2: P.cream }] },
  'street-5': { loop: 'idle', ...shirt(P.butter, 0x6f6a82, { topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [lan(0xb23a48), 'backpack'], footwear: 'shoes' },
  'street-6': { loop: 'phone', ...salwar(P.mint, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK }, face: { bindi: true, specs: true }, acc: ['phone'] },
  'street-7': { loop: 'idle', ...kp(P.white, 0xb8b2a2, { sleeves: 'short' }), hair: { style: 'bald' }, face: { specs: true, moustache: 'thick', tilak: false }, acc: [towel(P.sky, 'shoulderL')] },
  'street-8': { loop: 'phone', ...tee(0xd9453f, 0x3d3a55, { topPattern: 'vstripes', top2: W_ }), hair: { style: 'cap', hat: P.teal, color: BLACK }, face: { specs: false }, acc: ['phone'], footwear: 'shoes', footColor: P.white },
  'street-9': { loop: 'chat', ...jacket(0x6a5a46, P.khaki), ...sikh(NAVY_T, 0x3a3a44, 'full'), acc: [towel(0x3fa37e, 'shoulderR', { pattern: 'checks', color2: W_ })], footwear: 'shoes' },
  'street-10': { loop: 'idle', ...salwar(P.pink, 0x7f8fb5, { sleeves: 'long' }), hair: { style: 'bun', color: BLACK }, face: { bindi: true }, acc: [{ name: 'sabziBag' }] },
  // chowk bystanders
  'chowk-vada-customer': { ...tee(P.white, P.navy), hair: { style: 'short' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'chowk-fruit-seller': { ...salwar(P.teal, P.magenta, { trim: P.marigold }), hair: { style: 'bun', color: BLACK }, face: { bindi: true }, acc: [towel(P.mint)] },
  'chowk-marigold-seller': { ...saree(P.saffron, P.cream, P.red), hair: { style: 'plait', color: BLACK }, face: { bindi: true }, acc: ['malligeBasket'] },
  'chowk-news-reader': { ...kp(P.cream, W_), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin', tilak: false }, acc: [] },
  'chowk-rangoli-girl': { ...salwar(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK }, face: { lashes: true, bindi: true, smile: 'big' }, acc: [], footwear: 'bare' },
  'chowk-ganpati-devotee': { ...salwar(0xf9cf4a, 0xe05a4a, { trim: W_ }), ...covered(0xf6efd8), face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' },
  'chowk-tag-kid-1': { ...tee(P.mint, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'chowk-tag-kid-2': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { lashes: true }, acc: ['ball'], footwear: 'bare' },
  'chawl-grandma-doorstep': { ...saree(0x8a5a7a, 0xe9e1d0, P.cream, { sleeves: 'long' }), hair: { style: 'bun', color: 0xd8d4d0 }, face: { specs: true, bindi: true }, acc: [towel(0xd9c9b0, 'shoulderL', { pattern: 'plain' })], height: 1.9, footwear: 'bare' },
  'chawl-lane-sweeper': { top: P.pink, bottom: 0x3fa37e, pallu: P.marigold },
  'fort-bus-waiter-1': { ...salwar(P.lilac, P.denim, { sleeves: 'long' }), hair: { style: 'plait', color: BLACK }, face: { bindi: true }, acc: [{ name: 'umbrella', color: P.lilac, color2: P.cream }] },
  'fort-bus-waiter-2': { ...jacket(0x4a6a9a, P.denim), hair: { style: 'messy', color: BLACK }, acc: ['phone', 'backpack'], footwear: 'shoes' },
  'fort-dabbawala-walker': {},
  'flora-ledge-reader': { ...tee(0x6a8fd0, P.denim, { sleeves: 'long', topPattern: 'plain' }), hair: { style: 'plait', color: BLACK }, face: { specs: true, lashes: true }, acc: ['books'], footwear: 'shoes' },
  'flora-ledge-sketcher': { ...tee(P.lilac, P.khaki, { topPattern: 'dots', top2: W_ }), hair: { style: 'cap', hat: 0xe05a4a, color: BLACK }, acc: [{ name: 'jhola', color: P.sky }], footwear: 'shoes' },
  'gateway-tourist-a': { skin: 0xffe0c8, top: P.pink, topPattern: 'floral', hair: { style: 'cap', hat: P.white, color: 0xb8864b }, outfit: 'shirtShorts' },
  'gateway-tourist-b': { skin: 0xf2c9a6, top: P.sky, topPattern: 'stripes', hair: { style: 'cap', hat: P.red, color: BLACK }, outfit: 'shirtTrousers' },
  'gateway-dana-seller': { ...salwar(P.rose, P.teal, { trim: P.butter }), hair: { style: 'bun', color: BLACK }, face: { bindi: true }, acc: [{ name: 'sabziBag' }, towel(P.butter, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' },
  'gateway-boatman': { ...tee(P.sky, P.navy, { outfit: 'shirtShorts', topPattern: 'checks', top2: W_ }), hair: { style: 'cap', hat: 0xf08a3c, color: BLACK }, face: { moustache: 'thick' }, acc: [lan(0xf08a3c)], footwear: 'chappal' },
  // the open stretches
  'rail-kite-kid': { ...tee(P.sky, P.khaki, { outfit: 'shirtShorts', topPattern: 'checks', top2: W_ }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'lane-aunty-gossip': { ...salwar(0xe8559a, 0xf3e3c6, { trim: W_ }), hair: { style: 'bun', color: BLACK }, face: { bindi: true, specs: false }, acc: [{ name: 'jhola', color: P.lilac }, towel(P.saffron, 'shoulderL', { pattern: 'plain' })] },
  'east-schoolgirl': { ...salwar(P.white, P.navy, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK, band: 0xe05a4a }, face: { lashes: true, smile: 'big' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'gateway-road-tourist': { skin: 0xf6d2b4, top: P.mint, topPattern: 'floral', outfit: 'shirtShorts', hair: { style: 'cap', hat: P.butter, color: 0x9a5b32 } },
  'scrub-elder-umbrella': { ...jacket(0xb2a48a, 0xece6d4), hair: { style: 'topi', hat: W_, color: GREY }, face: { moustache: 'thick', specs: true, tilak: false }, acc: [{ name: 'umbrella', color: P.teal, color2: P.cream }], footwear: 'shoes' },
  'east-road-rickshaw-driver': { outfit: 'uniform', top: 0xc7b27a, topPattern: 'belt', top2: 0x3d3a55, bottom: 0xa8996a, hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: ['phone', towel(0x2f9a54, 'shoulderL', { pattern: 'plain' })], footwear: 'chappal' },
  'seaview-selfie-teen': { ...tee(P.pink, P.denim, { topPattern: 'dots', top2: W_ }), hair: { style: 'messy', color: BLACK }, acc: ['phone', 'sunglasses'], footwear: 'shoes' },
  'bridge-road-shopper': { ...salwar(P.terracotta, P.cream, { sleeves: 'long' }), hair: { style: 'plait', color: BLACK }, face: { bindi: true }, acc: ['sabziBag', { name: 'jhola', color: P.teal }] },
  'juhu-road-ball-teen': { ...tee(0x4a90d9, P.white, { outfit: 'shirtShorts', topPattern: 'stripes', top2: W_ }), hair: { style: 'cap', hat: P.sky, color: BLACK }, acc: ['ball'], footwear: 'shoes', footColor: P.red },
  'chawl-lane-vegetable-woman': { ...salwar(P.butter, 0x3fa37e, { trim: P.rose }), hair: { style: 'bun', color: 0x8a8088 }, face: { bindi: true }, acc: ['sabziBag', towel(P.rose, 'shoulderL', { pattern: 'plain' })] },
  'chawl-lane-milkman': { ...kp(P.cream, P.khaki, { bottomPattern: 'plain' }), hair: { style: 'topi', hat: W_, color: BLACK }, face: { moustache: 'thin' }, acc: ['kettle'], footwear: 'chappal' },
  'east-field-ball-kid': { ...tee(P.lilac, P.olive, { outfit: 'shirtShorts' }), hair: { style: 'short', color: BLACK }, acc: ['ball'], footwear: 'bare' },
  'field-batting-uncle': { ...tee(P.sand, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'short', color: GREY }, face: { moustache: 'thick' }, acc: ['cricketBat'], footwear: 'shoes', footColor: P.white },
  'field-phone-woman': { ...salwar(P.lilac, P.denim, { sleeves: 'long' }), hair: { style: 'plait', color: BLACK }, face: { specs: true, bindi: true }, acc: ['phone'] },
  'north-field-backpacker-teen': { ...jacket(0x4a8a7a, P.navy), hair: { style: 'messy', color: BLACK }, face: { specs: true }, acc: ['backpack'], footwear: 'shoes' },
  'beach-road-peanut-seller': { ...kp(P.cream, P.teal, { sleeves: 'short' }), hair: { style: 'topi', hat: W_, color: BLACK }, face: { moustache: 'thin' }, acc: ['chanaBasket'], footwear: 'chappal' },
  // India Gate souvenir sellers (ids kept from the bangle stalls): an old man with a tray of mini arches, flags and keyrings, and a young woman
  'laad-bangle-seller-bangleA': { ...kp(P.cream, 0xece6d4), hair: { style: 'topi', hat: W_, color: GREY }, face: { specs: true, moustache: 'thin', tilak: false }, acc: ['souvenirTray'], footwear: 'chappal' },
  'laad-bangle-seller-bangleB': { ...salwar(0x3fa37e, 0xf1e7d0, { trim: 0xf2c230 }), hair: { style: 'plait', color: BLACK, band: 0xe05a4a }, face: { bindi: true, lashes: true, smile: 'big' }, acc: ['souvenirTray'], footwear: 'chappal' },
};

/** -> { loop, tweak } for a named person, or null when the role / seeded look stands */
export function lookOf(id) {
  const o = id && LOOKS[id];
  if (!o || !Object.keys(o).length) return null;
  return { loop: o.loop, tweak: tw(o) };
}
