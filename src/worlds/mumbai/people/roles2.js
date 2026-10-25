/**
 * people/roles2.js: the second batch of Mumbai roles (place-specific characters). Merged into createNPC by roles.js.
 * Each def: { loop, make(r, opts) -> spec, vary? }. Props that the role stands at (carts, tripod) are added unless opts.props === false.
 */
import { PASTEL as P, HAIR } from './kit.js';
import { pick, chance, notChotu, citizenSpec, look, SHIRTS, SAREES, TROUSERS } from './variation.js';
import { SKIN } from './kit.js';

const W = 0xfffaf0;
const warm = (r, idx) => SKIN[pick(r, idx)];

export const EXTRA_DEFS = {
  priest: {
    loop: 'ring', vary: { height: 0.04, build: [1, 2, 2], specs: 0.2, moustache: 0.3 },
    make: (r) => ({
      height: 2.15, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'dhoti', top: 0xe4ae86, bottom: 0xfbf7ea, trim: 0xe3b84a, pallu: pick(r, [P.saffron, P.marigold, 0xf2a44a]),
      hair: r() > 0.5 ? { style: 'bald' } : { style: 'short', color: HAIR.grey },
      face: { eyes: 'dot', tilak: r() > 0.5 ? 'ash' : 'red', brows: 'thin', blush: true, smile: 'small' },
      accessories: ['thali', 'bell'], footwear: 'bare',
    }),
  },
  pilgrim: {
    loop: 'pray',
    make: (r, o) => {
      const woman = (o.variant ?? (r() > 0.5 ? 1 : 0)) === 1;
      const green = pick(r, [0x6fbf9a, P.mint, P.teal, P.pistachio]);
      if (woman) { const [blouse, saree, pallu] = pick(r, SAREES); return { height: 2.0, build: 'normal', skin: warm(r, [1, 2, 3, 4]), outfit: 'saree', top: blouse, bottom: saree, bottomPattern: 'dots', bottom2: W, pallu, trim: W, hair: { style: 'bun', color: HAIR.black }, face: { eyes: 'happy', lashes: true, bindi: true, blush: true, smile: 'small' }, accessories: [{ name: 'gamcha', slot: 'shoulderR', color: green, pattern: 'plain' }, 'flowerBasket'], footwear: 'bare' }; }
      return { height: 2.15, build: pick(r, ['thin', 'normal']), skin: warm(r, [2, 3, 4, 5]), outfit: 'kurtaPyjama', sleeves: 'long', top: pick(r, [P.white, P.cream, P.mint, P.sky]), bottom: 0xf3ecd9, trim: 0xf2c46a, hair: { style: 'topi', color: HAIR.black, hat: pick(r, [P.white, green]) }, face: { eyes: 'dot', moustache: pick(r, [false, 'thin', 'thick']), brows: 'thin', blush: true, specs: chance(r, 0.2) }, accessories: [{ name: 'gamcha', slot: 'shoulderL', color: green, pattern: 'stripes', color2: W }, 'flowerBasket'], footwear: 'chappal', footColor: P.brown };
    },
  },
  photographer: {
    loop: 'snap', vary: { height: 0.05, look: true, specs: 0.2 },
    make: (r, o) => ({
      height: 2.2, build: 'normal', skin: warm(r, [1, 2, 3]), outfit: 'shirtTrousers', sleeves: 'short', ...look(r), bottom: pick(r, TROUSERS),
      hair: { style: 'cap', color: HAIR.black, hat: pick(r, [P.teal, P.red, P.butter, P.sky]) }, face: { eyes: 'dot', brows: 'thin', blush: true, smile: 'small', moustache: chance(r, 0.3) ? 'thin' : false },
      accessories: [...(o.props === false ? [] : [{ name: 'tripod', pos: [0, 0, 0.85] }])], footwear: 'shoes', footColor: P.white,
    }),
  },
  tourist: {
    loop: 'snap', vary: { height: 0.06, build: [1, 2, 2] },
    make: (r) => ({
      height: 2.15, build: 'normal', skin: warm(r, [0, 1, 2, 3]), outfit: pick(r, ['shirtShorts', 'shirtTrousers']), sleeves: 'short',
      top: pick(r, [P.sky, P.pink, P.butter, P.mint, P.saffron]), topPattern: pick(r, ['floral', 'floral', 'stripes', 'dots']), top2: pick(r, [W, P.marigold, P.teal]),
      bottom: pick(r, [P.khaki, P.sand, P.denim]), hair: { style: 'cap', color: pick(r, [HAIR.brown, HAIR.black, HAIR.henna]), hat: pick(r, [P.white, P.red, P.sky, P.butter]) },
      face: { eyes: 'happy', blush: true, smile: 'big', freckles: chance(r, 0.4), specs: chance(r, 0.3) }, accessories: ['camera', 'backpack'], footwear: 'shoes', footColor: P.white,
    }),
  },
  jogger: {
    loop: 'run', vary: { height: 0.05 },
    make: (r) => ({
      height: 2.15, build: pick(r, ['thin', 'thin', 'normal']), skin: warm(r, [1, 2, 3, 4]), outfit: 'shirtShorts', sleeves: pick(r, ['short', 'none']),
      top: pick(r, [P.teal, P.pink, P.saffron, P.lilac, P.mint]), topPattern: pick(r, ['plain', 'stripes']), top2: W, bottom: pick(r, [0x6f7fb0, 0x4a4560, P.denim]),
      hair: { style: 'messy', color: HAIR.black, band: pick(r, [P.red, P.butter, P.sky, P.pink]) }, face: { eyes: 'dot', blush: true, smile: 'big' }, footwear: 'shoes', footColor: P.white,
    }),
  },
  beachKid: {
    loop: 'play',
    make: (r, o) => {
      const s = citizenSpec(r, 'kid'); s.accessories = chance(r, 0.4) ? ['ball'] : []; s.footwear = 'bare';
      s.top = pick(r, [P.pink, P.sky, P.mint, P.teal, P.lilac]); return notChotu(s, r);
    },
  },
  bhuttaSeller: {
    loop: 'fan', vary: { height: 0.04, look: true, specs: 0.1 },
    make: (r, o) => ({
      height: 2.1, build: pick(r, ['normal', 'round']), skin: warm(r, [3, 4, 5]), outfit: pick(r, ['shirtTrousers', 'banyanLungi']), sleeves: 'short',
      top: 0xf6efdb, bottom: pick(r, [P.sky, P.mint, P.khaki]), bottomPattern: 'checks', bottom2: W, hair: { style: 'topi', color: HAIR.black, hat: pick(r, [P.white, P.sky, P.butter]) },
      face: { eyes: 'dot', moustache: pick(r, ['thin', 'thick']), blush: true, smile: 'big' }, accessories: ['palmFan', ...(o.props === false ? [] : [{ name: 'cart', kind: 'bhutta', pos: [0, 0, 0.95] }])], footwear: 'chappal', footColor: P.sky,
    }),
  },
  coconutSeller: {
    loop: 'sell', vary: { height: 0.04, specs: 0.1 },
    make: (r, o) => ({
      height: 2.1, build: 'normal', skin: warm(r, [3, 4, 5]), outfit: 'banyanLungi', top: 0xf6efdb, bottom: pick(r, [P.mint, P.butter, P.rose]), bottomPattern: 'checks', bottom2: W, trim: W,
      hair: { style: 'turban', color: HAIR.black, hat: pick(r, [P.pink, P.teal, P.marigold, W]) }, face: { eyes: 'dot', moustache: 'thick', blush: true, smile: 'big' },
      accessories: ['coconut', ...(o.props === false ? [] : [{ name: 'cart', kind: 'coconut', pos: [0, 0, 0.95] }])], footwear: 'chappal', footColor: P.brown,
    }),
  },
  officeGoer: {
    loop: (o) => ((o.seed ?? 1) % 2 ? 'watch' : 'texting'), vary: { height: 0.05, build: [1, 3, 1], specs: 0.25 },
    make: (r) => ({
      height: 2.2, build: 'normal', skin: warm(r, [1, 2, 3, 4]), outfit: 'shirtTie', sleeves: 'long', top: pick(r, [P.white, P.sky, P.cream, P.mint, P.pink]), topPattern: pick(r, ['plain', 'plain', 'stripes', 'checks']), top2: pick(r, [W, P.sky]),
      bottom: pick(r, [0x7f8fb5, 0xa9b4a0, 0x9a9ab4, 0x8f8aa6]), hair: { style: 'short', color: pick(r, [HAIR.black, HAIR.black, HAIR.brown]) },
      face: { eyes: 'dot', brows: 'thin', blush: true, moustache: chance(r, 0.25) ? 'thin' : false, smile: 'small' },
      accessories: [{ name: 'tie', color: pick(r, [P.red, P.saffron, P.teal, P.lilac]) }, 'briefcase', ...(chance(r, 0.5) ? ['tiffinBag'] : [])], footwear: 'shoes', footColor: 0x5a4f6e,
    }),
  },
  coolie: {
    loop: 'carry', vary: { height: 0.04, moustache: 0.4, grey: 0.3 },
    make: (r) => ({
      height: 2.15, build: pick(r, ['thin', 'normal']), skin: warm(r, [3, 4, 5]), outfit: 'shirtTrousers', sleeves: 'short', top: 0xe8695d, bottom: pick(r, [P.sand, 0xd8c9b0, P.khaki]), trim: null,
      hair: { style: 'short', color: HAIR.black }, face: { eyes: 'dot', brows: 'thick', blush: true, smile: 'small' }, accessories: ['luggage', 'armband'], footwear: 'chappal', footColor: P.brown,
    }),
  },
  commuter: {
    loop: 'watch',
    make: (r, o) => { const s = citizenSpec(r, pick(r, ['man', 'man', 'woman', 'woman', 'teen'])); s.accessories = [chance(r, 0.5) ? 'briefcase' : { name: 'jhola', color: pick(r, [P.marigold, P.teal, P.terracotta]) }, 'watch']; return s; },
  },
  ladiesCommuter: {
    loop: 'watch',
    make: (r) => { const s = citizenSpec(r, 'woman'); s.accessories = [{ name: 'jhola', color: pick(r, [P.marigold, P.teal, P.pink, P.lilac]) }, ...(chance(r, 0.4) ? ['watch'] : [])]; return s; },
  },
  securityGuard: {
    loop: 'guard', vary: { height: 0.05, build: [1, 2, 2] },
    make: (r) => ({
      height: 2.25, build: 'normal', skin: warm(r, [2, 3, 4, 5]), outfit: 'uniform', top: 0x93a9c9, topPattern: 'belt', top2: 0x4a4a66, bottom: 0x6f7fa6,
      hair: { style: 'cap', color: HAIR.black, hat: 0x6f84ad }, face: { eyes: 'dot', moustache: pick(r, ['thick', 'thin', 'handlebar']), brows: 'thick', blush: true, smile: 'small' },
      accessories: ['register'], footwear: 'shoes', footColor: 0x3d3a55,
    }),
  },
  watchman: {
    loop: 'guard', vary: { height: 0.05, specs: 0.3 },
    make: (r) => ({
      height: 2.1, build: pick(r, ['thin', 'normal']), skin: warm(r, [3, 4, 5]), outfit: 'kurtaPyjama', sleeves: 'long', top: pick(r, [P.khaki, P.sand, 0xc9b88a]), bottom: 0xe9e1cd, trim: null,
      hair: { style: 'topi', color: HAIR.grey, hat: pick(r, [0x8f9a74, P.khaki]) }, face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, specs: chance(r, 0.3) },
      accessories: [{ name: 'gamcha', slot: 'shoulderL', color: 0x8f7a68, pattern: 'plain' }, 'torch'], footwear: 'chappal', footColor: P.brown,
    }),
  },
  sweeper: {
    loop: 'sweep',
    make: (r) => { const [blouse, saree, pallu] = pick(r, SAREES); return { height: 1.98, build: 'normal', skin: warm(r, [3, 4, 5]), outfit: 'saree', top: blouse, bottom: saree, pallu, trim: null, hair: { style: 'bun', color: HAIR.black }, face: { eyes: 'dot', bindi: true, lashes: true, blush: true, smile: 'small' }, accessories: ['broom'], footwear: 'bare' }; },
  },
  doorman: {
    loop: 'greet', vary: { height: 0.03 },
    make: (r) => ({
      height: 2.35, build: 'normal', skin: warm(r, [2, 3, 4]), outfit: 'sherwani', top: pick(r, [0xd98f8f, 0xb8527a, 0x8f9fd0, 0xd9a35a]), topPattern: 'plain', bottom: W, trim: 0xe3b84a,
      hair: { style: 'turban', color: HAIR.black, hat: pick(r, [W, P.saffron, 0xd8c070]) }, face: { eyes: 'dot', moustache: 'handlebar', brows: 'thick', blush: true, smile: 'big' },
      accessories: [{ name: 'gamcha', slot: 'shoulderR', color: 0xe3b84a, pattern: 'plain' }], footwear: 'shoes', footColor: 0x3d3a55,
    }),
  },
  studentWithBooks: {
    loop: 'chat', vary: { look: true },
    make: (r) => { const s = citizenSpec(r, pick(r, ['teen', 'woman', 'man'])); s.height = Math.min(s.height, 2.1); s.accessories = ['books', ...(chance(r, 0.5) ? [{ name: 'jhola', color: pick(r, [P.terracotta, P.sky, P.marigold]) }] : [])]; return s; },
  },
  bookSeller: {
    loop: 'sell', vary: { height: 0.04, look: true },
    make: (r) => ({
      height: 2.1, build: 'normal', skin: warm(r, [2, 3, 4]), outfit: pick(r, ['shirtTrousers', 'kurtaPyjama']), sleeves: 'long', top: pick(r, [P.sand, P.sky, P.cream, P.mint]), topPattern: 'checks', top2: W, bottom: pick(r, [0xc9c4d6, 0xe9e1cd]),
      hair: { style: 'short', color: HAIR.grey }, face: { eyes: 'dot', specs: true, moustache: chance(r, 0.4) ? 'thin' : false, brows: 'thin', blush: true }, accessories: ['bookTray'], footwear: 'chappal', footColor: P.brown,
    }),
  },
  chanaSeller: {
    loop: 'scoop', vary: { height: 0.05, specs: 0.15 },
    make: (r) => ({
      height: 2.05, build: pick(r, ['thin', 'normal']), skin: warm(r, [3, 4, 5]), outfit: 'banyanLungi', top: 0xf6efdb, bottom: pick(r, [P.butter, P.lilac, P.mint]), bottomPattern: 'checks', bottom2: P.terracotta, trim: null,
      hair: { style: 'topi', color: HAIR.black, hat: pick(r, [P.white, P.sky, P.pink]) }, face: { eyes: 'dot', moustache: 'thin', blush: true, smile: 'big' }, accessories: ['chanaBasket'], footwear: 'chappal', footColor: P.red,
    }),
  },
};
