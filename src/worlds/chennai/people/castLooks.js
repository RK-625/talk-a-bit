/**
 * people/castLooks.js: explicit Chennai look overrides for named people (docs/CHENNAI_CAST.md describes every one).
 *
 *   LOOKS[id]        -> { loop?, ...spec overrides }  (see tw() below for the keys: any createPerson spec field, plus
 *                       hair / face (merged into the seeded ones), acc (replace the accessory list) and accAdd (append))
 *   lookOf(id)       -> { loop, tweak } | null        npcs.js / population4.js pass these to createNPC / createCitizen
 *
 * People not listed here keep their role's own look (people/roles.js, roles2.js) or the seeded citizen look (variation.js).
 * Nobody here uses Meera's turmeric short kurta over blue jeans, tan sling bag, neck camera or red notebook.
 */
import { PASTEL as P } from './kit.js';

const W_ = 0xfffaf0;
const GREY = 0xcfcfcf, BLACK = 0x2b2330;
const JAS = 'jasmine';

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
export const veshti = (top, extra = {}) => ({ outfit: 'banyanLungi', sleeves: 'short', top, topPattern: 'plain', bottom: 0xfbf7ea, bottomPattern: 'plain', bottom2: W_, trim: 0xb23a48, ...extra });
export const lungi = (top, bottom, extra = {}) => ({ outfit: 'banyanLungi', sleeves: 'short', top, topPattern: 'plain', bottom, bottomPattern: 'checks', bottom2: W_, trim: null, ...extra });
const lan = (color) => ({ name: 'lanyard', color });
const towel = (color, slot = 'shoulderR', extra = {}) => ({ name: 'gamcha', slot, color, ...extra });

export const LOOKS = {
  // ================= the original 65 (reskinned where the role default needs help) =================================
  'chowk-skip-girl': { loop: 'skip', ...salwar(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true, lashes: true }, acc: ['jumpRope'], footwear: 'bare' },
  'chowk-kite-boy': { loop: 'kite', ...tee(P.sky, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'chawl-carrom-man': { ...lungi(0xf6efdb, P.sky, { sleeves: 'none' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [] },
  'chawl-carrom-elder': { ...veshti(P.white, { sleeves: 'long' }), hair: { style: 'short', color: GREY }, face: { specs: true, tilak: 'ash' }, acc: [] },
  'chawl-tap-woman': { ...saree(P.teal, P.magenta, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [] },
  'marine-walk-student': {}, // college student (walker): the role's own jeans + T-shirt + backpack
  'gateway-ferry-clerk': { ...shirt(P.sky, 0x4a4560, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: true }, acc: [lan(0xf08a3c)], footwear: 'shoes' },
  'taj-doorman': { outfit: 'sherwani', top: 0xe9dfc4, topPattern: 'plain', bottom: W_, trim: 0xa8403c, hair: { style: 'cap', hat: 0xa8403c, color: BLACK }, face: { moustache: 'thick' }, acc: [towel(0xa8403c, 'shoulderR', { pattern: 'plain' })], footwear: 'shoes' }, // Chepauk Palace gate attendant: cream long coat, maroon cap and sash
  'cst-officegoer': {},
  'bse-bull-tourist': { loop: 'snap' },
  'bse-guard': { top: 0x3a3f5c, top2: 0xe3b84a, bottom: 0x2f3350, hair: { hat: 0x2f3350 } },
  'marine-bench-man': { ...shirt(P.mint, P.khaki, { topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: GREY }, face: { moustache: 'thin', specs: true }, acc: ['newspaper'], footwear: 'shoes' },
  'haji-juice-man': { ...lungi(0xf6efdb, P.mint, { sleeves: 'none' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [towel(P.mint, 'shoulderR', { pattern: 'plain' }), { name: 'chaiGlass', slot: 'handL' }] },
  'juhu-horse-rider-kid': { ...tee(P.mint, P.navy, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'chappal' },
  'juhu-sand-artist': { ...tee(P.sand, P.khaki, { outfit: 'shirtShorts', topPattern: 'dots', top2: P.pink }), hair: { style: 'cap', hat: P.sky, color: BLACK }, face: { moustache: 'thin' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' }, // sand sculptor in shorts, cap and a saffron towel
  'temple-bell-devotee': { ...saree(P.marigold, 0x3fa37e, P.cream), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [], footwear: 'bare' },
  'station-chaiwala': { ...lungi(0xfbf7ea, 0x3fa37e, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: false, tilak: false }, height: 2.1, build: 'thin', acc: ['kettle', { name: 'coffeeTumbler', slot: 'handL' }, towel(0xb23a48, 'shoulderR', { pattern: 'plain' })] },
  'station-ladies-a': {},
  'toll-attendant': { top: 0xf08a3c, topPattern: 'plain', hair: { hat: 0x2f3b6d } },
  // street-1 .. street-10: everyday Chennaiites (kinds fixed by details.js: man woman teen elder man woman elder teen man woman)
  'street-1': { loop: 'phone', ...tee(P.teal, P.denim), hair: { style: 'short', color: BLACK }, face: { moustache: false }, acc: ['phone', lan(0x3fa37e)], footwear: 'shoes' },
  'street-2': { loop: 'idle', ...saree(P.rose, 0x8f6ab0, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [{ name: 'jhola', color: P.teal }] },
  'street-3': { loop: 'chat', ...tee(P.lilac, P.denim), hair: { style: 'messy', color: BLACK }, face: { specs: false }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'street-4': { loop: 'news', ...veshti(P.cream, { sleeves: 'long' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin', tilak: 'ash' }, acc: [{ name: 'umbrella', color: P.sky, color2: P.cream }] },
  'street-5': { loop: 'idle', ...shirt(P.butter, 0x6f6a82, { topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [lan(0xb23a48), 'backpack'], footwear: 'shoes' },
  'street-6': { loop: 'phone', ...salwar(P.mint, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true, specs: true }, acc: ['phone'] },
  'street-7': { loop: 'idle', ...lungi(P.white, P.butter, { sleeves: 'short' }), hair: { style: 'bald' }, face: { specs: true, moustache: 'thick' }, acc: [towel(P.sky, 'shoulderL')] },
  'street-8': { loop: 'phone', ...tee(0xf9cf4a, 0x3d3a55, { topPattern: 'vstripes', top2: 0xe05a4a }), hair: { style: 'cap', hat: P.teal, color: BLACK }, face: { specs: false }, acc: ['phone'], footwear: 'shoes', footColor: P.white },
  'street-9': { loop: 'chat', ...tee(P.sand, P.khaki, { sleeves: 'short' }), hair: { style: 'short', color: GREY }, face: { moustache: 'handlebar' }, acc: [towel(0x3fa37e, 'shoulderR', { pattern: 'checks', color2: W_ })], footwear: 'chappal' },
  'street-10': { loop: 'idle', ...salwar(P.pink, 0x7f8fb5, { sleeves: 'long' }), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [{ name: 'sabziBag' }] },

  // ================= added in pass 4 (65) ===========================================================================
  // tea-kadai square
  'chowk-vada-customer': { ...tee(P.white, P.navy), hair: { style: 'short' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'chowk-fruit-seller': { ...saree(P.teal, P.magenta, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [towel(P.mint)] },
  'chowk-marigold-seller': { ...saree(P.saffron, P.cream, P.red), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: ['jasmineBasket'] },
  'chowk-news-reader': { ...veshti(P.cream, { sleeves: 'long' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin', tilak: 'ash' }, acc: [] },
  'chowk-rangoli-girl': { ...salwar(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK, flower: JAS }, face: { lashes: true, bindi: true, smile: 'big' }, acc: [], footwear: 'bare' },
  'chowk-ganpati-devotee': { ...saree(0xf9cf4a, 0xe05a4a, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' },
  'chowk-tag-kid-1': { ...tee(P.mint, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'chowk-tag-kid-2': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { lashes: true }, acc: ['ball'], footwear: 'bare' },
  // Mylapore tiled houses and the temple
  'chawl-grandma-doorstep': { ...saree(P.lilac, 0x3fa37e, P.pink), hair: { style: 'bun', color: GREY, flower: JAS }, face: { specs: true, bindi: true }, acc: [], height: 1.9 },
  'chawl-lane-sweeper': { top: P.pink, bottom: 0x3fa37e, pallu: P.marigold },
  'temple-flower-seller': { ...saree(P.marigold, P.saffron, P.cream), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: ['jasmineBasket'], footwear: 'bare' },
  'temple-shoe-keeper': { ...veshti(0xf0ede4, { sleeves: 'long', pallu: P.saffron }), hair: { style: 'bald' }, face: { moustache: 'thin', specs: true, tilak: 'ash' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' },
  // suburban station
  'station-bench-elder': { ...veshti(P.white, { sleeves: 'long' }), hair: { style: 'topi', hat: P.white, color: GREY }, face: { specs: true, tilak: 'ash' }, acc: [{ name: 'jhola', color: P.terracotta }] },
  'station-commuter-2': { ...shirt(P.sky, 0x9aa8c8, { topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: false }, acc: ['backpack', lan(0xb23a48), 'watch'], footwear: 'shoes' },
  'station-ticket-clerk': { ...tee(0xcdb8ec, 0x4a4560, { sleeves: 'short' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: [lan(0x8d5fc9)], footwear: 'shoes' },
  // Fort St. George stand, Chennai Central, Madras High Court, Valluvar Kottam, Ripon Building
  'fort-bus-waiter-1': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: [{ name: 'umbrella', color: P.lilac, color2: P.cream }] },
  'fort-bus-waiter-2': { ...tee(P.pink, P.denim), hair: { style: 'messy', color: BLACK }, acc: ['phone', 'backpack'], footwear: 'shoes' },
  'fort-dabbawala-walker': {},
  'cst-coolie-2': { top: 0xe8695d },
  'cst-tiffin-sorter-2': {},
  'cst-officegoer-2': {},
  'rajabai-book-browser': { ...tee(P.mint, P.denim, { topPattern: 'stripes', top2: W_ }), hair: { style: 'messy', color: BLACK }, face: { specs: true }, acc: ['books', lan(0x3fa37e)], footwear: 'shoes' },
  'flora-ledge-reader': { ...salwar(P.butter, P.denim, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, acc: ['books'], face: { specs: true, bindi: true } },
  'flora-ledge-sketcher': { ...tee(P.lilac, P.khaki, { topPattern: 'dots', top2: W_ }), hair: { style: 'cap', hat: 0xe05a4a, color: BLACK }, acc: [{ name: 'jhola', color: P.sky }], footwear: 'shoes' },
  'bse-broker': { ...shirt(0x3d3a55, 0x7f8fb5, { sleeves: 'long' }), hair: { style: 'short', color: BLACK }, face: { moustache: false, specs: true }, acc: ['phone', lan(0x8d5fc9), 'watch'], footwear: 'shoes' },
  // Chepauk Palace and Fort St. George
  'taj-bellboy': { ...tee(0xf6efdb, 0x3d3a55, { sleeves: 'short' }), hair: { style: 'cap', hat: 0xa8403c, color: BLACK }, face: { moustache: 'thin' }, acc: ['luggage', towel(0xa8403c, 'shoulderR', { pattern: 'plain' })], footwear: 'shoes' },
  'gateway-tourist-a': { skin: 0xffe0c8, top: P.pink, topPattern: 'floral', hair: { style: 'cap', hat: P.white, color: 0xb8864b }, outfit: 'shirtShorts' },
  'gateway-tourist-b': { skin: 0xf2c9a6, top: P.sky, topPattern: 'stripes', hair: { style: 'cap', hat: P.red, color: BLACK }, outfit: 'shirtTrousers' },
  'gateway-dana-seller': { ...saree(P.rose, P.teal, P.butter), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [{ name: 'sabziBag' }], footwear: 'bare' },
  'gateway-boatman': { ...lungi(0xf6efdb, P.sky, { sleeves: 'none' }), hair: { style: 'turban', hat: P.teal, color: BLACK }, face: { moustache: 'thick' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' }, // boat-ride booth boatman
  // Marina Beach promenade
  'marine-bench-aunty': { ...saree(P.sky, P.rose, P.cream), hair: { style: 'bun', color: GREY, flower: JAS }, face: { specs: true, bindi: true }, acc: [{ name: 'sabziBag' }] },
  'marine-bench-reader': { ...veshti(P.mint, { sleeves: 'long' }), hair: { style: 'bald' }, face: { specs: true, moustache: 'thick', tilak: 'ash' }, acc: ['newspaper'] },
  'marine-jogger-2': { top: P.sky, bottom: 0x4a4560, sleeves: 'none', hair: { style: 'short', color: BLACK, band: undefined } },
  'marine-morning-walker': { ...shirt(P.white, 0x9a9ab4, { sleeves: 'short' }), hair: { style: 'cap', hat: P.white, color: GREY }, face: { specs: true }, acc: ['umbrella'], footwear: 'shoes', footColor: P.white },
  // Santhome Basilica
  'haji-chadar-seller-2': { ...veshti(0xf0e6c8, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' },
  'haji-juice-customer': { ...salwar(P.rose, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: [towel(P.mint)] },
  'haji-pilgrim-2': { ...shirt(P.white, 0x4a4560, { sleeves: 'long' }), hair: { style: 'short', color: GREY }, face: { moustache: 'thick', specs: false, tilak: false }, acc: [], footwear: 'bare' }, // Santhome Basilica: an old man in white shirt and dark trousers, quietly praying
  'pilgrim': { ...shirt(0xf6f2e4, 0x4a4560, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: true, tilak: false }, acc: ['flowerBasket'], footwear: 'bare' }, // Santhome Basilica devotee with white flowers and candles
  // IT park
  'antilia-chauffeur': { outfit: 'shirtTrousers', sleeves: 'short', top: 0xf6f3ea, topPattern: 'plain', bottom: 0x3d3a55, hair: { style: 'cap', hat: 0x3d3a55, color: BLACK }, face: { moustache: 'thin' }, acc: [lan(0x4fb3bf)], footwear: 'shoes', trim: null },
  'antilia-delivery-boy': { ...tee(0xf08a3c, 0x3d3a55), hair: { style: 'cap', hat: 0x3d3a55, color: BLACK }, acc: ['deliveryBag', 'phone'], footwear: 'shoes', footColor: P.white },
  // Elliot's Beach
  'juhu-pavbhaji-diner-1': { ...tee(P.butter, P.denim, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'chappal' },
  'juhu-horse-handler': { ...veshti(0xf6efdb, { sleeves: 'none', bottom: P.butter, bottomPattern: 'checks', trim: null }), hair: { style: 'turban', hat: W_, color: BLACK }, face: { moustache: 'handlebar' }, acc: [towel(P.terracotta, 'shoulderR', { pattern: 'plain' })], footwear: 'bare' },
  'juhu-family-mom': { ...salwar(P.pink, P.denim, { sleeves: 'short' }), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: ['phone', { name: 'jhola', color: P.teal }] },
  'juhu-family-dad': { ...tee(P.sky, P.khaki, { outfit: 'shirtShorts', topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin' }, acc: ['camera'], footwear: 'chappal' },
  'juhu-family-kid': { ...tee(P.teal, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: ['ball'], footwear: 'bare' },
  'juhu-lifeguard': { outfit: 'shirtShorts', top: 0xf08a3c, topPattern: 'plain', bottom: 0x3d3a55, hair: { style: 'cap', hat: P.white, color: BLACK }, face: { specs: false, moustache: 'thin' }, acc: ['whistle'], footwear: 'bare' },
  // Napier Bridge checkpost
  'toll-collector': { top: 0xf08a3c, topPattern: 'plain', top2: W_, hair: { hat: 0x2f3b6d } },
  // empty stretches
  'rail-kite-kid': { ...tee(P.sky, P.khaki, { outfit: 'shirtShorts', topPattern: 'checks', top2: W_ }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'lane-aunty-gossip': { ...saree(P.rose, P.sky, P.saffron), hair: { style: 'bun', flower: JAS }, face: { bindi: true, specs: false }, acc: [{ name: 'jhola', color: P.lilac }] },
  'east-schoolgirl': { ...salwar(P.white, P.navy, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK, band: 0xe05a4a }, face: { lashes: true, smile: 'big' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'gateway-road-tourist': { skin: 0xf6d2b4, top: P.mint, topPattern: 'floral', outfit: 'shirtShorts', hair: { style: 'cap', hat: P.butter, color: 0x9a5b32 } },
  'scrub-elder-umbrella': { ...veshti(P.sand, { sleeves: 'long' }), hair: { style: 'topi', hat: P.white, color: GREY }, face: { moustache: 'thick', specs: true, tilak: 'ash' }, acc: [{ name: 'umbrella', color: P.teal, color2: P.cream }] },
  'east-road-rickshaw-driver': { outfit: 'uniform', top: 0xc7b27a, topPattern: 'belt', top2: 0x3d3a55, bottom: 0x4a4560, hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: ['phone', towel(0x3fa37e, 'shoulderL', { pattern: 'checks', color2: W_ })], footwear: 'chappal' },
  'seaview-selfie-teen': { ...tee(P.pink, P.denim, { topPattern: 'dots', top2: W_ }), hair: { style: 'messy', color: BLACK }, acc: ['phone', 'sunglasses'], footwear: 'shoes' },
  'bridge-road-shopper': { ...salwar(P.terracotta, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: ['sabziBag', { name: 'jhola', color: P.teal }] },
  'juhu-road-ball-teen': { ...tee(0x4a90d9, P.white, { outfit: 'shirtShorts', topPattern: 'stripes', top2: W_ }), hair: { style: 'cap', hat: P.sky, color: BLACK }, acc: ['ball'], footwear: 'shoes', footColor: P.red },
  'antilia-lane-walker': { ...shirt(P.white, 0x9a9ab4), hair: { style: 'cap', hat: P.white, color: GREY }, face: { specs: true }, acc: [], footwear: 'shoes', footColor: P.white },
  'chawl-lane-vegetable-woman': { ...saree(P.butter, 0x3fa37e, P.rose), hair: { style: 'bun', color: GREY, flower: JAS }, face: { bindi: true }, acc: ['sabziBag'] },
  'chawl-lane-milkman': { ...shirt(P.cream, P.khaki), hair: { style: 'cap', hat: P.sky, color: BLACK }, face: { moustache: 'thin' }, acc: ['kettle'], footwear: 'chappal' },
  'deco-office-woman': { ...shirt(P.white, 0x7f8fb5, { sleeves: 'short' }), hair: { style: 'bun' }, face: { lashes: true }, acc: [lan(0x8d5fc9), 'watch', { name: 'jhola', color: P.sky }], footwear: 'shoes' },
  'east-field-ball-kid': { ...tee(P.lilac, P.olive, { outfit: 'shirtShorts' }), hair: { style: 'short', color: BLACK }, acc: ['ball'], footwear: 'bare' },
  'field-batting-uncle': { ...tee(P.sand, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'short', color: GREY }, face: { moustache: 'thick' }, acc: ['cricketBat'], footwear: 'shoes', footColor: P.white },
  'field-phone-woman': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { specs: true, bindi: true }, acc: ['phone'] },
  'north-field-backpacker-teen': { ...shirt(P.mint, P.navy, { topPattern: 'checks', top2: W_ }), hair: { style: 'messy', color: BLACK }, face: { specs: true }, acc: ['backpack'], footwear: 'shoes' },
  'beach-road-peanut-seller': { bottom: P.lilac },
};

/** -> { loop, tweak } for a named person, or null when the role / seeded look stands */
export function lookOf(id) {
  const o = id && LOOKS[id];
  if (!o || !Object.keys(o).length) return null;
  return { loop: o.loop, tweak: tw(o) };
}
