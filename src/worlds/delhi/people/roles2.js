/**
 * people/roles2.js: the second batch of roles for Delhi (place-specific characters). Merged into createNPC by roles.js.
 * Each def: { loop, make(r, opts) -> spec, vary? }. Props that the role stands at (carts, tripod) are added unless opts.props === false.
 */
import { PASTEL as P, HAIR } from './kit.js';
import { pick, chance, notRahul, LANYARDS, citizenSpec, look, SHIRTS, SAREES, TROUSERS } from './variation.js';
import { SKIN } from './kit.js';

const W = 0xfffaf0;
const warm = (r, idx) => SKIN[pick(r, idx)];

export const EXTRA_DEFS = {
  // granthi: a white kurta-pajama, a navy turban, a long grey beard, a saffron stole (rumala) over the shoulder; hands joined in prayer (Sikh, shown plainly and respectfully)
  priest: {
    loop: 'pray', vary: { height: 0.04, build: [1, 2, 2], specs: 0.2 },
    make: (r) => ({
      height: 2.15, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'kurtaPyjama', sleeves: 'long', top: 0xfbf7ea, topPattern: 'plain', bottom: 0xf3efe4, bottomPattern: 'plain', bottom2: W, trim: null,
      hair: { style: 'turban', color: HAIR.black, hat: pick(r, [0x2a3f86, 0x2a3f86, 0x1f3a6a]) },
      face: { eyes: 'dot', moustache: false, beard: 'full', beardColor: 0xc8c8c8, brows: 'thin', blush: true, smile: 'small' },
      accessories: [{ name: 'gamcha', slot: 'shoulderL', color: P.saffron, pattern: 'plain' }], footwear: 'bare',
    }),
  },
  // gurudwara sevadar / devotee: an orange turban and white kurta-pajama (a man), or a salwar suit with the dupatta drawn over the head (a woman); a steel thali of karah prasad
  pilgrim: {
    loop: 'pray',
    make: (r, o) => {
      const woman = (o.variant ?? (r() > 0.5 ? 1 : 0)) === 1;
      if (woman) { return { height: 2.0, build: 'normal', skin: warm(r, [1, 2, 3, 4]), outfit: 'kurtaPyjama', sleeves: 'long', top: pick(r, [P.pink, P.sky, P.butter, P.mint]), topPattern: 'plain', bottom: P.cream, trim: W, hair: { style: 'hijab', color: HAIR.black, hat: pick(r, [0xf6efd8, 0xf2a0b8, 0xf29b4b]) }, face: { eyes: 'happy', lashes: true, bindi: false, blush: true, smile: 'small' }, accessories: ['thali'], footwear: 'bare' }; }
      return { height: 2.15, build: pick(r, ['thin', 'normal']), skin: warm(r, [2, 3, 4, 5]), outfit: 'kurtaPyjama', sleeves: 'long', top: P.white, topPattern: 'plain', bottom: 0xece6d4, bottomPattern: 'plain', trim: null, hair: { style: 'turban', color: HAIR.black, hat: pick(r, [0xf08a3c, 0xf08a3c, 0x2a3f86]) }, face: { eyes: 'dot', moustache: false, beard: 'full', beardColor: pick(r, [0x8a8a8a, 0x3a3a44]), brows: 'thin', blush: true, specs: chance(r, 0.2) }, accessories: ['thali'], footwear: 'bare' };
    },
  },
  photographer: {
    loop: 'snap', vary: { height: 0.05, look: true, specs: 0.2 },
    make: (r, o) => ({
      height: 2.2, build: 'normal', skin: warm(r, [1, 2, 3]), outfit: 'shirtTrousers', sleeves: 'short', ...look(r), bottom: pick(r, [P.denim, P.navy, 0x4a4560]),
      hair: { style: 'cap', color: HAIR.black, hat: pick(r, [P.teal, P.red, P.butter, P.sky]) }, face: { eyes: 'dot', brows: 'thin', blush: true, smile: 'small', moustache: chance(r, 0.3) ? 'thin' : false },
      accessories: [{ name: 'lanyard', color: 0xf08a3c, card: 0xe9776a }, ...(o.props === false ? [] : [{ name: 'tripod', pos: [0, 0, 0.85] }])], footwear: 'shoes', footColor: P.white,
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
      const s = citizenSpec(r, 'kid'); s.accessories = o.loop === 'skip' ? ['jumpRope'] : chance(r, 0.4) ? ['ball'] : []; s.footwear = 'bare';
      s.top = pick(r, [P.pink, P.sky, P.mint, P.teal, P.lilac]); return notRahul(s, r);
    },
  },
  bhuttaSeller: {
    loop: 'fan', vary: { height: 0.04, look: true, specs: 0.1 },
    make: (r, o) => ({
      height: 2.1, build: pick(r, ['normal', 'round']), skin: warm(r, [3, 4, 5]), outfit: 'banyanLungi', sleeves: 'short',
      top: pick(r, [0xf6efdb, P.butter, P.mint]), bottom: pick(r, [P.sky, P.mint, P.khaki]), bottomPattern: 'checks', bottom2: W, hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'dot', moustache: pick(r, ['thin', 'thick']), blush: true, smile: 'big' }, accessories: ['palmFan', ...(o.props === false ? [] : [{ name: 'cart', kind: 'bhutta', pos: [0, 0, 0.95] }])], footwear: 'chappal', footColor: P.sky,
    }),
  },
  coconutSeller: {
    loop: 'sell', vary: { height: 0.04, specs: 0.1 },
    make: (r, o) => ({
      height: 2.1, build: 'normal', skin: warm(r, [3, 4, 5]), outfit: 'banyanLungi', top: 0xf6efdb, bottom: pick(r, [P.mint, P.butter, P.rose]), bottomPattern: 'checks', bottom2: W, trim: W,
      hair: { style: 'short', color: HAIR.black }, face: { eyes: 'dot', moustache: 'thick', blush: true, smile: 'big' },
      accessories: [{ name: 'gamcha', slot: 'shoulderL', color: P.sky, pattern: 'checks', color2: W }, 'coconut', ...(o.props === false ? [] : [{ name: 'cart', kind: 'coconut', pos: [0, 0, 0.95] }])], footwear: 'chappal', footColor: P.brown,
    }),
  },
  // techie in a hurry: long-sleeve shirt (sleeves down, no tie), chinos or trousers, an office ID on a coloured lanyard, a lunch bag
  officeGoer: {
    loop: (o) => ((o.seed ?? 1) % 2 ? 'watch' : 'texting'), vary: { height: 0.05, build: [1, 3, 1], specs: 0.25 },
    make: (r) => ({
      height: 2.2, build: 'normal', skin: warm(r, [1, 2, 3, 4]), outfit: 'shirtTrousers', sleeves: 'long', top: pick(r, [P.white, P.sky, P.cream, P.mint, P.pink, P.lilac]), topPattern: pick(r, ['plain', 'plain', 'stripes', 'checks']), top2: pick(r, [W, P.sky]),
      bottom: pick(r, [0x7f8fb5, 0xa9b4a0, 0x9a9ab4, 0x8f8aa6, P.khaki]), hair: { style: 'short', color: pick(r, [HAIR.black, HAIR.black, HAIR.brown]) },
      face: { eyes: 'dot', brows: 'thin', blush: true, moustache: chance(r, 0.25) ? 'thin' : false, smile: 'small' },
      accessories: [{ name: 'lanyard', color: pick(r, LANYARDS) }, 'phone', ...(chance(r, 0.5) ? ['tiffinBag'] : [])], footwear: 'shoes', footColor: 0x5a4f6e,
    }),
  },
  coolie: {
    loop: 'carry', vary: { height: 0.04, moustache: 0.4, grey: 0.3 },
    make: (r) => ({
      height: 2.15, build: pick(r, ['thin', 'normal']), skin: warm(r, [3, 4, 5]), outfit: 'shirtTrousers', sleeves: 'short', top: 0xe8695d, bottom: pick(r, [P.sand, 0xd8c9b0, P.khaki]), trim: null,
      hair: { style: 'short', color: HAIR.black }, face: { eyes: 'dot', brows: 'thick', blush: true, smile: 'small' }, accessories: ['luggage', 'armband'], footwear: 'chappal', footColor: P.brown,
    }),
  },
  // metro commuter: office wear with a lanyard and a blue smart card (a bag over the shoulder), checking the timetable
  commuter: {
    loop: 'watch',
    make: (r, o) => { const s = citizenSpec(r, pick(r, ['man', 'man', 'woman', 'woman', 'teen'])); s.accessories = [chance(r, 0.5) ? 'backpack' : { name: 'jhola', color: pick(r, [P.marigold, P.teal, P.terracotta]) }, 'watch', { name: 'lanyard', color: pick(r, LANYARDS) }]; return s; },
  },
  // women's-coach commuter: salwar or office wear, bag, smart card
  ladiesCommuter: {
    loop: 'watch',
    make: (r) => { const s = citizenSpec(r, 'woman'); s.accessories = [{ name: 'jhola', color: pick(r, [P.marigold, P.teal, P.pink, P.lilac]) }, 'metroCard', ...(chance(r, 0.4) ? ['watch'] : [])]; return s; },
  },
  securityGuard: {
    loop: 'guard', vary: { height: 0.05, build: [1, 2, 2] },
    make: (r) => ({
      height: 2.25, build: 'normal', skin: warm(r, [2, 3, 4, 5]), outfit: 'uniform', top: 0x8fa0b8, topPattern: 'belt', top2: 0x2f3550, bottom: 0x3f4a6a,
      hair: { style: 'cap', color: HAIR.black, hat: 0x2f3b6d }, face: { eyes: 'dot', moustache: pick(r, ['thick', 'thin', 'handlebar']), brows: 'thick', blush: true, smile: 'small' },
      accessories: ['register', { name: 'lanyard', color: 0x4fb3bf, card: 0x4fb3bf }], footwear: 'shoes', footColor: 0x2f2a3a,
    }),
  },
  // gate guard / toll attendant: khaki shirt, cap, torch, a towel on the shoulder
  watchman: {
    loop: 'guard', vary: { height: 0.05, specs: 0.3 },
    make: (r) => ({
      height: 2.1, build: pick(r, ['thin', 'normal']), skin: warm(r, [3, 4, 5]), outfit: 'uniform', top: pick(r, [P.khaki, 0xc9b88a, 0xb9ae86]), topPattern: 'belt', top2: 0x6a5a4a, bottom: 0x6f6a58, trim: null,
      hair: { style: 'cap', color: HAIR.grey, hat: pick(r, [0x8f9a74, 0x6f84ad, P.khaki]) }, face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, specs: chance(r, 0.3) },
      accessories: [{ name: 'gamcha', slot: 'shoulderL', color: 0x8f7a68, pattern: 'plain' }, 'torch'], footwear: 'shoes', footColor: P.brown,
    }),
  },
  sweeper: {
    loop: 'sweep',
    make: (r) => { const [blouse, saree, pallu] = pick(r, SAREES); return { height: 1.98, build: 'normal', skin: warm(r, [3, 4, 5]), outfit: 'saree', top: blouse, bottom: saree, pallu, trim: null, hair: { style: 'bun', color: HAIR.black }, face: { eyes: 'dot', bindi: true, lashes: true, blush: true, smile: 'small' }, accessories: ['broom'], footwear: 'bare' }; },
  },
  doorman: {
    loop: 'greet', vary: { height: 0.03 },
    make: (r) => ({
      height: 2.35, build: 'normal', skin: warm(r, [2, 3, 4]), outfit: 'sherwani', top: pick(r, [0x2f2a38, 0x6a1f2e, 0x1f4a3a]), topPattern: 'plain', bottom: W, trim: 0xe3b84a,
      hair: { style: 'turban', color: HAIR.black, hat: pick(r, [0xfffaf0, 0xf1e7d0, 0xe3b84a]) }, face: { eyes: 'dot', moustache: 'handlebar', brows: 'thick', blush: true, smile: 'big' },
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
