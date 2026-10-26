/**
 * people/castLooks.js: explicit Hyderabad look overrides for the named people (docs/HYDERABAD_CAST.md describes every one).
 *
 *   LOOKS[id]        -> { loop?, ...spec overrides }  (see tw() below for the keys: any createPerson spec field, plus
 *                       hair / face (merged into the seeded ones), acc (replace the accessory list) and accAdd (append))
 *   lookOf(id)       -> { loop, tweak } | null        npcs.js / population4.js pass these to createNPC / createCitizen
 *
 * People not listed here keep their role's own look (people/roles.js, roles2.js) or the seeded citizen look (variation.js).
 * Nobody here has Sameer's (the hero's) clear resume folder, olive day pack or pale-blue-shirt-and-charcoal-trousers combination.
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

// ---- Hyderabad additions: kurta-pyjama men, skullcaps, abaya + scarf (old-city women, plain and respectful) ----------
export const kp = (top, bottom = 0xfbf7ea, extra = {}) => ({ outfit: 'kurtaPyjama', sleeves: 'long', top, bottom, topPattern: 'plain', bottomPattern: 'plain', bottom2: W_, trim: null, ...extra });
const skull = (color = GREY, hat = W_) => ({ style: 'skullcap', color, hat });
export const abaya = (top, scarf, extra = {}) => ({ outfit: 'abaya', sleeves: 'long', top, topPattern: 'plain', top2: W_, trim: null, bottom: P.cream, footwear: 'chappal', hair: { style: 'hijab', color: BLACK, hat: scarf }, ...extra });
const RED = 0xd9453f; // delivery riders' plain red
const lan = (color) => ({ name: 'lanyard', color });
const towel = (color, slot = 'shoulderR', extra = {}) => ({ name: 'gamcha', slot, color, ...extra });

export const LOOKS = {
  // ================= Irani café square (the chowk) =====================================================================
  // Saleem Bhai: white skullcap, cream kurta over white pyjama, round specs, thick grey moustache, steel kettle + small cup (see roles.js)
  chaiwalaUncle: { ...kp(0xf3ecd8, 0xfbf7ea), hair: skull(GREY), face: { moustache: 'thick', specs: true, tilak: false }, acc: ['kettle', { name: 'chaiGlass', slot: 'handL' }, towel(W_, 'shoulderR', { pattern: 'plain' })], footwear: 'chappal' },
  // mirchi bajji man
  vadaPavWala: { ...lungi(0xf3e6b8, 0xb5503c, { sleeves: 'short' }), bottom2: W_, hair: { style: 'short', color: BLACK }, face: { moustache: 'thick', tilak: false }, acc: [towel(RED, 'shoulderR', { pattern: 'checks', color2: W_ }), 'jhara'] },
  // Tollywood fan
  bollywoodHopeful: { ...tee(RED, 0x3d3a55, { topPattern: 'dots', top2: 0xf6d86a }), hair: { style: 'messy', color: BLACK, band: 0xf6d86a }, face: { moustache: false }, acc: ['sunglasses'], footwear: 'shoes', footColor: P.white },
  cricketKid: {},
  'chowk-cricket-bowler': {},
  'chowk-newspaper-vendor': { ...shirt(P.sky, 0xc9c4d6, { topPattern: 'checks', top2: W_ }), hair: skull(GREY), face: { moustache: 'thin', specs: true }, acc: ['newspaper', 'newspaperBundle'], footwear: 'chappal' },
  'chowk-skip-girl': { loop: 'skip', ...salwar(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true, lashes: true }, acc: ['jumpRope'], footwear: 'bare' },
  'chowk-kite-boy': { loop: 'kite', ...tee(P.sky, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  // old-city houses
  'chawl-carrom-man': { ...lungi(0xf6efdb, P.sky, { sleeves: 'none' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [] },
  'chawl-carrom-elder': { ...kp(P.white, 0xece6d4), hair: skull(GREY), face: { specs: true, moustache: 'thin', tilak: false }, acc: [] },
  'chawl-tap-woman': { ...saree(P.teal, P.magenta, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [] },
  // transit at Charminar
  busConductor: {},
  taxiDriver: {},
  dabbawala: {},
  trafficCop: {},
  auntyWithSabzi: { ...saree(P.terracotta, 0x8f6ab0, P.cream), hair: { style: 'bun', color: GREY, flower: JAS }, face: { bindi: true, specs: true }, acc: ['sabziBag', { name: 'umbrella', color: P.lilac, color2: P.cream }] },
  'marine-walk-student': {},
  balloonSeller: {},
  // Laad Bazaar bangle seller (see roles.js): colourful salwar kameez, a bright dupatta over her hair, a tray of bangles
  koliFisherwoman: { ...salwar(0xc2306b, 0x2f8f6a, { trim: 0xe3b84a }), hair: { style: 'hijab', color: BLACK, hat: 0x2fa89a }, face: { bindi: false, lashes: true, smile: 'big' }, acc: ['bangleTray'], footwear: 'chappal' },
  tourist: {},
  photographer: {},
  'gateway-ferry-clerk': { ...shirt(P.sky, 0x4a4560, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: true }, acc: [lan(0xf08a3c)], footwear: 'shoes' },
  // Falaknuma Palace
  'taj-doorman': { top: 0x1f4a3a, hair: { style: 'turban', hat: 0xfffaf0, color: BLACK } },
  'taj-bellboy': { outfit: 'sherwani', top: 0x1f4a3a, bottom: W_, trim: 0xe3b84a, hair: { style: 'turban', hat: 0xfffaf0, color: BLACK }, face: { moustache: 'thin' }, acc: ['luggage'], footwear: 'shoes' },
  // Kacheguda station
  coolie: {},
  'cst-tiffin-sorter': {},
  'cst-officegoer': {},
  'cst-coolie-2': { top: 0xe8695d },
  'cst-tiffin-sorter-2': {},
  'cst-officegoer-2': {},
  // Cyber Towers + the giant pearl
  'bse-bull-tourist': { loop: 'snap' },
  'bse-guard': { top: 0x3a3f5c, top2: 0xe3b84a, bottom: 0x2f3350, hair: { hat: 0x2f3350 } },
  'bse-broker': { ...shirt(0x3d3a55, 0x7f8fb5, { sleeves: 'long' }), hair: { style: 'short', color: BLACK }, face: { moustache: false, specs: true }, acc: ['phone', lan(0x8d5fc9), 'watch'], footwear: 'shoes' },
  // Osmania University Arts College
  'rajabai-book-seller': { ...kp(0xe3b84a, 0xc9c4d6, { topPattern: 'plain' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: ['bookTray'], footwear: 'chappal' },
  'rajabai-student-a': { ...shirt(P.sky, 0x8f6ab0, { topPattern: 'checks', top2: W_ }), hair: { style: 'cap', hat: P.butter, color: BLACK }, face: { moustache: false }, acc: ['books', { name: 'jhola', color: P.terracotta }], footwear: 'shoes' },
  'rajabai-book-browser': { ...tee(P.mint, P.denim, { topPattern: 'stripes', top2: W_ }), hair: { style: 'messy', color: BLACK }, face: { specs: true }, acc: ['books', lan(0x3fa37e)], footwear: 'shoes' },
  // Hussain Sagar / Necklace Road promenade
  'marine-bench-man': { ...shirt(P.mint, P.khaki, { topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: GREY }, face: { moustache: 'thin', specs: true }, acc: ['newspaper'], footwear: 'shoes' },
  'marine-couple': {},
  'marine-chana-seller': { ...lungi(P.cream, P.lilac, { sleeves: 'none' }), hair: skull(BLACK), face: { moustache: 'thin' }, acc: ['chanaBasket'], footwear: 'chappal' },
  'marine-jogger': {},
  'marine-bench-aunty': { ...saree(P.sky, P.rose, P.cream), hair: { style: 'bun', color: GREY, flower: JAS }, face: { specs: true, bindi: true }, acc: [{ name: 'sabziBag' }] },
  'marine-bench-reader': { ...kp(P.mint, W_), hair: skull(GREY), face: { specs: true, moustache: 'thick', tilak: false }, acc: ['newspaper'] },
  'marine-couple-2': {},
  'marine-jogger-2': { top: P.sky, bottom: 0x4a4560, sleeves: 'none', hair: { style: 'short', color: BLACK, band: undefined } },
  'marine-morning-walker': { ...shirt(P.white, 0x9a9ab4, { sleeves: 'short' }), hair: { style: 'cap', hat: P.white, color: GREY }, face: { specs: true }, acc: ['umbrella'], footwear: 'shoes', footColor: P.white },
  // Buddha island causeway: flower and boat-ticket stalls, haleem / lassi stall
  'haji-chadar-seller': { ...saree(P.marigold, P.pink, P.cream), hair: { style: 'bun', flower: JAS }, face: { bindi: true, lashes: true }, acc: ['flowerBasket'], footwear: 'chappal' },
  pilgrim: { ...kp(P.butter, 0xece6d4), hair: { style: 'short', color: BLACK }, face: { specs: true, tilak: 'red', moustache: 'thin' }, acc: ['flowerBasket'], footwear: 'bare' },
  'haji-juice-man': { ...lungi(0xfbf7ea, 0x8a3a3a, { sleeves: 'short' }), hair: skull(BLACK), face: { moustache: 'thick' }, acc: [towel(W_, 'shoulderR', { pattern: 'plain' }), { name: 'chaiGlass', slot: 'handL' }], footwear: 'chappal' },
  'haji-chadar-seller-2': { ...tee(P.sky, P.khaki, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'chappal' },
  'haji-juice-customer': { ...salwar(P.rose, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: [towel(P.mint)] },
  'haji-pilgrim-2': { ...kp(P.white, 0xece6d4), hair: skull(GREY, W_), face: { moustache: 'thick', specs: false, tilak: false }, acc: [], footwear: 'chappal' },
  // HITEC City tower
  securityGuard: {},
  'antilia-gate-watchman': {},
  'antilia-mali': {},
  'antilia-chauffeur': { outfit: 'shirtTrousers', sleeves: 'short', top: 0xf6f3ea, topPattern: 'plain', bottom: 0x3d3a55, hair: { style: 'cap', hat: 0x3d3a55, color: BLACK }, face: { moustache: 'thin' }, acc: [lan(0x4fb3bf)], footwear: 'shoes', trim: null },
  'antilia-delivery-boy': { ...tee(RED, 0x3d3a55), hair: { style: 'cap', hat: 0x3d3a55, color: BLACK }, acc: [{ name: 'deliveryBag', color: RED }, 'phone'], footwear: 'shoes', footColor: P.white },
  'antilia-lane-walker': { ...shirt(P.white, 0x9a9ab4), hair: { style: 'cap', hat: P.white, color: GREY }, face: { specs: true }, acc: ['newspaper'], footwear: 'shoes', footColor: P.white },
  'deco-office-woman': { ...shirt(P.white, 0x7f8fb5, { sleeves: 'short' }), hair: { style: 'bun' }, face: { lashes: true }, acc: [lan(0x8d5fc9), 'watch', { name: 'jhola', color: P.sky }], footwear: 'shoes' },
  // Necklace Road park
  'juhu-pavbhaji-cook': { ...tee(P.pink, P.khaki, { topPattern: 'plain' }), hair: { style: 'cap', hat: P.white, color: BLACK }, face: { moustache: 'thick', specs: true }, acc: ['jhara', towel(RED, 'shoulderR', { pattern: 'checks', color2: W_ })], footwear: 'chappal' },
  'juhu-bhutta-seller': { ...lungi(P.rose, P.khaki, { sleeves: 'short', topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin' }, acc: ['palmFan'], footwear: 'chappal' },
  'juhu-coconut-seller': { ...lungi(P.cream, P.rose, { sleeves: 'none' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [towel(P.sky, 'shoulderL', { pattern: 'checks', color2: W_ }), 'coconut'], footwear: 'chappal' },
  'juhu-horse-rider-kid': { ...tee(P.mint, P.navy, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'chappal' },
  // Bathukamma flower-stack artist (a woman arranging the flower tiers)
  'juhu-sand-artist': { ...saree(0xf6c453, 0x8f3a8a, P.marigold), height: 2.02, build: 'normal', hair: { style: 'bun', flower: JAS }, face: { bindi: true, lashes: true, moustache: false, specs: false, tilak: false }, acc: [], footwear: 'bare' },
  'juhu-gola-kid': {},
  'juhu-pavbhaji-diner-1': { ...tee(P.butter, P.denim, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'chappal' },
  'juhu-horse-handler': { ...veshti(0xf6efdb, { sleeves: 'none', bottom: P.butter, bottomPattern: 'checks', trim: null }), hair: { style: 'turban', hat: W_, color: BLACK }, face: { moustache: 'handlebar' }, acc: [towel(P.terracotta, 'shoulderR', { pattern: 'plain' })], footwear: 'bare' },
  'juhu-family-mom': { ...abaya(0x4a3a5a, 0xe9e1d0), face: { specs: false, smile: 'small' }, acc: ['phone', { name: 'jhola', color: P.teal }], footwear: 'chappal' },
  'juhu-family-dad': { ...kp(P.sky, P.khaki, { sleeves: 'short', bottomPattern: 'plain' }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thin', specs: true }, acc: ['camera'], footwear: 'chappal' },
  'juhu-family-kid': { ...tee(P.teal, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: ['ball'], footwear: 'bare' },
  'juhu-lifeguard': { outfit: 'shirtShorts', top: 0xd9453f, topPattern: 'plain', bottom: 0x3d3a55, hair: { style: 'cap', hat: P.white, color: BLACK }, face: { specs: false, moustache: 'thin' }, acc: ['whistle'], footwear: 'bare' },
  // temple
  priest: {},
  'temple-bell-devotee': { ...saree(P.marigold, 0x3fa37e, P.cream), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [], footwear: 'bare' },
  'temple-offering-pilgrim': { ...saree(P.terracotta, P.sky, P.cream), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' },
  'temple-flower-seller': { ...saree(P.marigold, P.saffron, P.cream), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: ['malligeBasket'], footwear: 'bare' },
  'temple-shoe-keeper': { ...veshti(0xf0ede4, { sleeves: 'long', pallu: P.saffron }), hair: { style: 'bald' }, face: { moustache: 'thin', specs: true, tilak: 'ash' }, acc: [towel(P.saffron, 'shoulderL', { pattern: 'plain' })], footwear: 'bare' },
  // Hyderabad Metro station
  commuter: {},
  'station-chaiwala': { ...lungi(0xfbf7ea, 0x2f7ac4, { sleeves: 'short' }), hair: skull(BLACK), face: { moustache: 'thin', specs: false, tilak: false }, height: 2.1, build: 'thin', acc: ['kettle', { name: 'chaiGlass', slot: 'handL' }, towel(RED, 'shoulderR', { pattern: 'plain' })] },
  'station-ladies-a': {},
  'station-bench-elder': { ...kp(P.white, W_), hair: skull(GREY, W_), face: { specs: true, tilak: false }, acc: [{ name: 'jhola', color: P.terracotta }], footwear: 'shoes' },
  'station-commuter-2': { ...shirt(P.sky, 0x9aa8c8, { topPattern: 'checks', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: false }, acc: ['backpack', lan(0xb23a48), 'watch'], footwear: 'shoes' },
  'station-ticket-clerk': { ...tee(0xa9d3ea, 0x4a4560, { sleeves: 'short' }), hair: { style: 'short', color: GREY }, face: { specs: true, moustache: 'thin' }, acc: [lan(0x2f86cf)], footwear: 'shoes' },
  // Durgam Cheruvu bridge toll plaza
  'toll-attendant': { top: 0xf08a3c, topPattern: 'plain', hair: { hat: 0x2f3b6d } },
  'toll-collector': { top: 0xf08a3c, topPattern: 'plain', top2: W_, hair: { hat: 0x2f3b6d } },
  // street-1 .. street-10: everyday Hyderabadis (kinds fixed by details.js: man woman teen elder man woman elder teen man woman)
  'street-1': { loop: 'phone', ...tee(P.teal, P.denim), hair: { style: 'short', color: BLACK }, face: { moustache: false }, acc: ['phone', lan(0x3fa37e)], footwear: 'shoes' },
  'street-2': { loop: 'idle', ...abaya(0x2b2b33, 0x2b2b33), face: { specs: false }, acc: [{ name: 'jhola', color: P.teal }] },
  'street-3': { loop: 'chat', ...tee(P.lilac, P.denim), hair: { style: 'messy', color: BLACK }, face: { specs: false }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'street-4': { loop: 'news', ...kp(P.cream, W_), hair: skull(GREY), face: { specs: true, moustache: 'thin', tilak: false }, acc: [{ name: 'umbrella', color: P.sky, color2: P.cream }] },
  'street-5': { loop: 'idle', ...shirt(P.butter, 0x6f6a82, { topPattern: 'stripes', top2: W_ }), hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: [lan(0xb23a48), 'backpack'], footwear: 'shoes' },
  'street-6': { loop: 'phone', ...salwar(P.mint, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true, specs: true }, acc: ['phone'] },
  'street-7': { loop: 'idle', ...lungi(P.white, P.butter, { sleeves: 'short' }), hair: { style: 'bald' }, face: { specs: true, moustache: 'thick' }, acc: [towel(P.sky, 'shoulderL')] },
  'street-8': { loop: 'phone', ...tee(0xd9453f, 0x3d3a55, { topPattern: 'vstripes', top2: W_ }), hair: { style: 'cap', hat: P.teal, color: BLACK }, face: { specs: false }, acc: ['phone'], footwear: 'shoes', footColor: P.white },
  'street-9': { loop: 'chat', ...tee(P.sand, P.khaki, { sleeves: 'short' }), hair: { style: 'short', color: GREY }, face: { moustache: 'handlebar' }, acc: [towel(0x3fa37e, 'shoulderR', { pattern: 'checks', color2: W_ })], footwear: 'chappal' },
  'street-10': { loop: 'idle', ...salwar(P.pink, 0x7f8fb5, { sleeves: 'long' }), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [{ name: 'sabziBag' }] },
  // chowk bystanders
  'chowk-vada-customer': { ...tee(P.white, P.navy), hair: { style: 'short' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'chowk-fruit-seller': { ...saree(P.teal, P.magenta, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [towel(P.mint)] },
  'chowk-marigold-seller': { ...saree(P.saffron, P.cream, P.red), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: ['malligeBasket'] },
  'chowk-news-reader': { ...kp(P.cream, W_), hair: skull(GREY), face: { specs: true, moustache: 'thin', tilak: false }, acc: [] },
  'chowk-rangoli-girl': { ...salwar(P.pink, P.cream, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK, flower: JAS }, face: { lashes: true, bindi: true, smile: 'big' }, acc: [], footwear: 'bare' },
  'chowk-ganpati-devotee': { ...saree(0xf9cf4a, 0xe05a4a, P.marigold), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: ['flowerBasket'], footwear: 'bare' },
  'chowk-tag-kid-1': { ...tee(P.mint, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'chowk-tag-kid-2': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'short', color: BLACK }, face: { lashes: true }, acc: ['ball'], footwear: 'bare' },
  'chawl-grandma-doorstep': { ...abaya(0x3d2f3a, 0xe9e1d0), face: { specs: true }, acc: [], height: 1.9, footwear: 'bare' },
  'chawl-lane-sweeper': { top: P.pink, bottom: 0x3fa37e, pallu: P.marigold },
  'fort-bus-waiter-1': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: [{ name: 'umbrella', color: P.lilac, color2: P.cream }] },
  'fort-bus-waiter-2': { ...tee(P.pink, P.denim), hair: { style: 'messy', color: BLACK }, acc: ['phone', 'backpack'], footwear: 'shoes' },
  'fort-dabbawala-walker': {},
  'flora-ledge-reader': { ...abaya(0x2f3a4f, 0xf1e7d0), face: { specs: true }, acc: ['books'], footwear: 'shoes' },
  'flora-ledge-sketcher': { ...tee(P.lilac, P.khaki, { topPattern: 'dots', top2: W_ }), hair: { style: 'cap', hat: 0xe05a4a, color: BLACK }, acc: [{ name: 'jhola', color: P.sky }], footwear: 'shoes' },
  'gateway-tourist-a': { skin: 0xffe0c8, top: P.pink, topPattern: 'floral', hair: { style: 'cap', hat: P.white, color: 0xb8864b }, outfit: 'shirtShorts' },
  'gateway-tourist-b': { skin: 0xf2c9a6, top: P.sky, topPattern: 'stripes', hair: { style: 'cap', hat: P.red, color: BLACK }, outfit: 'shirtTrousers' },
  'gateway-dana-seller': { ...saree(P.rose, P.teal, P.butter), hair: { style: 'bun', flower: JAS }, face: { bindi: true }, acc: [{ name: 'sabziBag' }], footwear: 'bare' },
  'gateway-boatman': { ...tee(P.sky, P.navy, { outfit: 'shirtShorts', topPattern: 'checks', top2: W_ }), hair: { style: 'cap', hat: 0xf08a3c, color: BLACK }, face: { moustache: 'thick' }, acc: [lan(0xf08a3c)], footwear: 'chappal' },
  // the open stretches
  'rail-kite-kid': { ...tee(P.sky, P.khaki, { outfit: 'shirtShorts', topPattern: 'checks', top2: W_ }), hair: { style: 'messy', color: BLACK }, acc: [], footwear: 'bare' },
  'lane-aunty-gossip': { ...saree(P.rose, P.sky, P.saffron), hair: { style: 'bun', flower: JAS }, face: { bindi: true, specs: false }, acc: [{ name: 'jhola', color: P.lilac }] },
  'east-schoolgirl': { ...salwar(P.white, P.navy, { sleeves: 'short' }), hair: { style: 'plait', color: BLACK, band: 0xe05a4a }, face: { lashes: true, smile: 'big' }, acc: ['backpack'], footwear: 'shoes', footColor: P.white },
  'gateway-road-tourist': { skin: 0xf6d2b4, top: P.mint, topPattern: 'floral', outfit: 'shirtShorts', hair: { style: 'cap', hat: P.butter, color: 0x9a5b32 } },
  'scrub-elder-umbrella': { ...kp(P.sand, 0xece6d4), hair: skull(GREY, W_), face: { moustache: 'thick', specs: true, tilak: false }, acc: [{ name: 'umbrella', color: P.teal, color2: P.cream }], footwear: 'shoes' },
  'east-road-rickshaw-driver': { outfit: 'uniform', top: 0xc7b27a, topPattern: 'belt', top2: 0x3d3a55, bottom: 0xa8996a, hair: { style: 'short', color: BLACK }, face: { moustache: 'thick' }, acc: ['phone', towel(0x9a3a3a, 'shoulderL', { pattern: 'plain' })], footwear: 'chappal' },
  'seaview-selfie-teen': { ...tee(P.pink, P.denim, { topPattern: 'dots', top2: W_ }), hair: { style: 'messy', color: BLACK }, acc: ['phone', 'sunglasses'], footwear: 'shoes' },
  'bridge-road-shopper': { ...salwar(P.terracotta, P.cream, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { bindi: true }, acc: ['sabziBag', { name: 'jhola', color: P.teal }] },
  'juhu-road-ball-teen': { ...tee(0x4a90d9, P.white, { outfit: 'shirtShorts', topPattern: 'stripes', top2: W_ }), hair: { style: 'cap', hat: P.sky, color: BLACK }, acc: ['ball'], footwear: 'shoes', footColor: P.red },
  'chawl-lane-vegetable-woman': { ...saree(P.butter, 0x3fa37e, P.rose), hair: { style: 'bun', color: GREY, flower: JAS }, face: { bindi: true }, acc: ['sabziBag'] },
  'chawl-lane-milkman': { ...kp(P.cream, P.khaki, { bottomPattern: 'plain' }), hair: skull(BLACK, W_), face: { moustache: 'thin' }, acc: ['kettle'], footwear: 'chappal' },
  'east-field-ball-kid': { ...tee(P.lilac, P.olive, { outfit: 'shirtShorts' }), hair: { style: 'short', color: BLACK }, acc: ['ball'], footwear: 'bare' },
  'field-batting-uncle': { ...tee(P.sand, P.khaki, { outfit: 'shirtShorts' }), hair: { style: 'short', color: GREY }, face: { moustache: 'thick' }, acc: ['cricketBat'], footwear: 'shoes', footColor: P.white },
  'field-phone-woman': { ...salwar(P.lilac, P.denim, { sleeves: 'short' }), hair: { style: 'plait', flower: JAS }, face: { specs: true, bindi: true }, acc: ['phone'] },
  'north-field-backpacker-teen': { ...shirt(P.mint, P.navy, { topPattern: 'checks', top2: W_ }), hair: { style: 'messy', color: BLACK }, face: { specs: true }, acc: ['backpack'], footwear: 'shoes' },
  'beach-road-peanut-seller': { ...lungi(P.cream, P.teal, { sleeves: 'none' }), hair: { style: 'topi', hat: W_, color: BLACK }, face: { moustache: 'thin' }, acc: ['chanaBasket'], footwear: 'chappal' },
};

/** -> { loop, tweak } for a named person, or null when the role / seeded look stands */
export function lookOf(id) {
  const o = id && LOOKS[id];
  if (!o || !Object.keys(o).length) return null;
  return { loop: o.loop, tweak: tw(o) };
}
