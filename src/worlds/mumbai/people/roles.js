/**
 * people/roles.js: the Mumbai NPC cast. Presets built on createPerson + a role loop from animate.js.
 *
 * createNPC(role, ink, seed = 1, opts = {}) -> Group (feet at y=0, facing +Z; role loop already playing)
 *   seed varies skin tone, cloth colours, hair and face inside the role (same seed = same person).
 *   opts: { variant, loop (false = idle only, or a loop name), props (true adds the kadhai / stumps that the role stands at) }
 *   returns group.userData: animate(dt, state), setLookTarget(v), playLoop(name), role, + everything createPerson gives.
 *
 * ROLES: vadaPavWala chaiwalaUncle taxiDriver dabbawala koliFisherwoman busConductor trafficCop collegeStudent (variant 0|1;
 *        aliases collegeStudentA / collegeStudentB) auntyWithSabzi cricketKid (batter; alias cricketKidBatter) cricketKidBowler
 *        bollywoodHopeful bhelWala golaWala balloonSeller newspaperVendor strayDog crow pigeon
 * ROLE_LOOPS: role -> default loop name
 */
import * as THREE from 'three';
import { createPerson } from './person.js';
import { createDog, createCrow, createPigeon } from './animals.js';
import { PASTEL, HAIR, SKIN } from './kit.js';
import { rng } from '../../../engine/doodle.js';
import { EXTRA_DEFS } from './roles2.js';
import { createCitizen, createCouple } from './citizens.js';
import { vary, chance } from './variation.js';

const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
const warm = (r, idx) => SKIN[pick(r, idx)];

const ROLE_DEFS = {
  vadaPavWala: {
    loop: 'frying',
    make: (r, o) => ({
      height: 2.15, build: 'round', skin: warm(r, [3, 4, 5]),
      outfit: 'banyanLungi', top: 0xf6efdb, bottom: pick(r, [PASTEL.sky, PASTEL.mint, PASTEL.rose]), bottomPattern: 'checks', bottom2: 0xfffaf0,
      trim: r() > 0.5 ? 0xfffaf0 : null,
      hair: pick(r, [{ style: 'bald' }, { style: 'short', color: HAIR.grey }, { style: 'short', color: HAIR.black }]),
      face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, smile: 'big' },
      accessories: [{ name: 'gamcha', slot: 'shoulderR', color: pick(r, [PASTEL.terracotta, PASTEL.teal, PASTEL.marigold]) }, 'jhara', ...(o.props ? [{ name: 'kadhai', pos: [0, 0, 0.95] }] : [])],
      footwear: 'chappal', footColor: pick(r, [PASTEL.sky, PASTEL.red]),
    }),
  },
  chaiwalaUncle: {
    loop: 'pouring',
    make: (r) => ({
      height: 2.2, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', sleeves: 'long', top: pick(r, [PASTEL.mint, PASTEL.sky, PASTEL.butter]), topPattern: 'checks', top2: 0xfffaf0,
      bottom: pick(r, [PASTEL.sand, 0xc9c4d6]), trim: 0xfffaf0, hair: { style: 'short', color: HAIR.grey },
      face: { eyes: 'dot', moustache: 'thin', brows: 'thin', specs: true, blush: true },
      accessories: ['kettle', 'chaiGlass', { name: 'gamcha', slot: 'shoulderR', color: PASTEL.sky }],
      footwear: 'chappal', footColor: PASTEL.brown,
    }),
  },
  taxiDriver: {
    loop: 'leaning',
    make: (r) => ({
      height: 2.2, build: 'normal', skin: warm(r, [3, 4]),
      outfit: 'uniform', top: PASTEL.khaki, topPattern: 'belt', top2: 0x6c5d58, bottom: 0xc9b87e,
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'dot', moustache: 'handlebar', brows: 'thick', blush: true, smile: 'small' },
      accessories: [{ name: 'gamcha', slot: 'shoulderL', color: PASTEL.white }],
      footwear: 'shoes', footColor: 0x5a4f6e,
    }),
  },
  dabbawala: {
    loop: 'carry',
    make: (r) => ({
      height: 2.2, build: 'thin', skin: warm(r, [2, 3, 4]),
      outfit: 'kurtaPyjama', top: 0xfbf7ea, bottom: 0xf3ecd9, trim: 0xf2c46a,
      hair: { style: 'topi', color: HAIR.black, hat: 0xfffdf4 },
      face: { eyes: 'dot', moustache: r() > 0.4 ? 'thin' : false, brows: 'thin', blush: true },
      accessories: ['tiffinCrate'],
      footwear: 'chappal', footColor: PASTEL.brown,
    }),
  },
  koliFisherwoman: {
    loop: 'headLoad',
    make: (r) => {
      const [blouse, saree, pallu] = pick(r, [[PASTEL.teal, PASTEL.magenta, PASTEL.marigold], [PASTEL.marigold, PASTEL.teal, PASTEL.red], [PASTEL.pink, PASTEL.sky, PASTEL.saffron]]);
      return {
        height: 2.05, build: 'round', skin: warm(r, [3, 4]),
        outfit: 'nauvari', top: blouse, bottom: saree, bottomPattern: 'dots', bottom2: 0xfffaf0, pallu, top2: 0xfffaf0, trim: 0xfffaf0,
        hair: { style: 'bun', color: HAIR.black },
        face: { eyes: 'dot', bindi: true, lashes: true, blush: true, smile: 'big' },
        accessories: ['fishBasket'],
        footwear: 'bare',
      };
    },
  },
  busConductor: {
    loop: 'ticket',
    make: (r) => ({
      height: 2.15, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'uniform', top: PASTEL.khaki, topPattern: 'belt', top2: 0x5a4d63, bottom: 0xb5a46e,
      hair: { style: 'cap', color: HAIR.black, hat: 0xcdbb7f },
      face: { eyes: 'dot', moustache: 'thin', brows: 'thin', blush: true },
      accessories: ['ticketMachine'],
      footwear: 'shoes', footColor: 0x5a4f6e,
    }),
  },
  trafficCop: {
    loop: 'whistle',
    make: (r) => ({
      height: 2.25, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'uniform', top: 0xfbf7ea, topPattern: 'belt', top2: 0x4d4568, bottom: 0xf1ecdc,
      hair: { style: 'cap', color: HAIR.black, hat: 0xfffdf6 },
      face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, smile: 'small' },
      accessories: ['whistle'],
      footwear: 'shoes', footColor: 0x4d4568,
    }),
  },
  collegeStudent: {
    loop: (o) => (o.variant === 1 ? 'texting' : 'chat'),
    make: (r, o) => {
      if (o.variant === 1) {
        return {
          height: 2.15, build: 'thin', skin: warm(r, [1, 2, 3]),
          outfit: 'shirtTrousers', top: pick(r, [PASTEL.lilac, PASTEL.mint, PASTEL.pink]), topPattern: 'stripes', top2: 0xfffaf0, bottom: PASTEL.denim,
          hair: { style: 'messy', color: pick(r, [HAIR.black, HAIR.brown]) },
          face: { eyes: 'dot', specs: r() > 0.5, blush: true, freckles: r() > 0.6, smile: 'small' },
          accessories: ['phone', { name: 'jhola', color: PASTEL.terracotta }],
          footwear: 'shoes', footColor: PASTEL.white,
        };
      }
      return {
        height: 2.05, build: 'thin', skin: warm(r, [1, 2, 3]),
        outfit: 'kurtaPyjama', sleeves: 'short', top: pick(r, [PASTEL.pink, PASTEL.sky, PASTEL.butter]), bottom: PASTEL.denim, trim: 0xfffaf0,
        hair: { style: 'plait', color: HAIR.black },
        face: { eyes: 'happy', lashes: true, bindi: pick(r, [true, 0x6cc3bd]), blush: true, smile: 'big' },
        accessories: [{ name: 'jhola', color: PASTEL.marigold }],
        footwear: 'chappal', footColor: PASTEL.pink,
      };
    },
  },
  auntyWithSabzi: {
    loop: 'sabzi',
    make: (r) => ({
      height: 2.0, build: 'round', skin: warm(r, [2, 3]),
      outfit: 'saree', top: pick(r, [PASTEL.terracotta, PASTEL.butter]), bottom: pick(r, [PASTEL.olive, PASTEL.rose, PASTEL.lilac]), trim: 0xfffaf0, pallu: PASTEL.cream,
      hair: { style: 'bun', color: pick(r, [HAIR.black, HAIR.grey, HAIR.henna]) },
      face: { eyes: 'dot', bindi: true, specs: r() > 0.4, blush: true, smile: 'small' },
      accessories: ['sabziBag', { name: 'umbrella', color: pick(r, [PASTEL.lilac, PASTEL.pink, PASTEL.mint]), color2: PASTEL.cream }],
      footwear: 'chappal', footColor: PASTEL.brown,
    }),
  },
  cricketKid: {
    loop: (o) => (o.variant === 'bowler' ? 'bowl' : 'bat'),
    make: (r, o) => ({
      height: 1.5, build: 0.92, headScale: 1.34, legScale: 0.76, armScale: 0.86, torsoScale: 0.88, trim: 0xfffaf0, skin: warm(r, [2, 3, 4]),
      outfit: 'shirtShorts', top: o.variant === 'bowler' ? 0xe98a8a : 0x86a9e3, topPattern: o.variant === 'bowler' ? 'checks' : 'stripes', top2: 0xfff6dc, bottom: o.variant === 'bowler' ? 0xc9b97a : 0xf3efe2, // (nobody but Chotu wears yellow stripes + blue shorts)
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'dot', eyeScale: 1.2, blush: true, smile: 'big', smudge: r() > 0.5 },
      accessories: o.variant === 'bowler' ? ['ball'] : ['cricketBat', ...(o.props ? [{ name: 'stumps', pos: [0, 0, -1.15] }] : [])],
      footwear: r() > 0.5 ? 'bare' : 'shoes', footColor: PASTEL.white,
    }),
  },
  bollywoodHopeful: {
    loop: 'pose',
    make: (r) => ({
      height: 2.25, build: 'thin', skin: warm(r, [1, 2]),
      outfit: 'shirtTrousers', sleeves: 'long', top: pick(r, [PASTEL.magenta, PASTEL.teal, PASTEL.lilac]), topPattern: 'dots', top2: 0xfffaf0, bottom: 0xf6f0e0,
      hair: { style: 'messy', color: HAIR.black },
      face: { eyes: 'happy', brows: 'thin', blush: true, smile: 'big' },
      accessories: ['sunglasses'],
      footwear: 'shoes', footColor: PASTEL.white,
    }),
  },
  bhelWala: {
    loop: 'stir',
    make: (r) => ({
      height: 2.1, build: 'round', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', top: pick(r, [PASTEL.sky, PASTEL.mint]), topPattern: 'stripes', top2: 0xfffaf0, bottom: PASTEL.khaki, trim: 0xfffaf0,
      hair: { style: 'topi', color: HAIR.black, hat: pick(r, [PASTEL.sky, PASTEL.butter, PASTEL.pink]) },
      face: { eyes: 'dot', moustache: r() > 0.5 ? 'thin' : false, blush: true, smile: 'big' },
      accessories: ['bhelTub', 'jhara'],
      footwear: 'chappal', footColor: PASTEL.red,
    }),
  },
  golaWala: {
    loop: 'crank',
    make: (r) => ({
      height: 2.1, build: 'thin', skin: warm(r, [3, 4, 5]),
      outfit: 'banyanLungi', top: 0xf6efdb, bottom: PASTEL.butter, bottomPattern: 'checks', bottom2: PASTEL.terracotta,
      hair: { style: 'turban', color: HAIR.black, hat: pick(r, [PASTEL.pink, PASTEL.marigold, PASTEL.teal]) },
      face: { eyes: 'dot', moustache: 'handlebar', blush: true, smile: 'big' },
      accessories: ['golaTray', 'golaStick'],
      footwear: 'chappal', footColor: PASTEL.sky,
    }),
  },
  balloonSeller: {
    loop: 'sell',
    make: (r) => ({
      height: 2.1, build: 'thin', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', top: pick(r, [PASTEL.butter, PASTEL.pink, PASTEL.mint]), topPattern: 'vstripes', top2: 0xfffaf0, bottom: pick(r, [PASTEL.denim, PASTEL.sand]),
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'happy', blush: true, smile: 'big', freckles: true },
      accessories: ['balloons', { name: 'gamcha', slot: 'shoulderR', color: PASTEL.teal }],
      footwear: 'chappal', footColor: PASTEL.red,
    }),
  },
  newspaperVendor: {
    loop: 'shout',
    make: (r) => ({
      height: 2.1, build: 'thin', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', sleeves: 'long', top: pick(r, [PASTEL.sand, PASTEL.sky]), topPattern: 'checks', top2: 0xfffaf0, bottom: 0xc9c4d6,
      hair: { style: 'short', color: HAIR.white },
      face: { eyes: 'dot', specs: true, moustache: 'thin', brows: 'thick', blush: true },
      accessories: ['newspaper', 'newspaperBundle'],
      footwear: 'chappal', footColor: PASTEL.brown,
    }),
  },
};

Object.assign(ROLE_DEFS, EXTRA_DEFS);

const ALIASES = {
  collegeStudentA: ['collegeStudent', { variant: 0 }],
  collegeStudentB: ['collegeStudent', { variant: 1 }],
  cricketKidBatter: ['cricketKid', { variant: 'batter' }],
  cricketKidBowler: ['cricketKid', { variant: 'bowler' }],
};

export const ROLES = [...Object.keys(ROLE_DEFS), 'cricketKidBowler', 'couple', 'strayDog', 'crow', 'pigeon'];
export const ROLE_LOOPS = Object.fromEntries(Object.entries(ROLE_DEFS).map(([k, v]) => [k, typeof v.loop === 'function' ? v.loop({}) : v.loop]));

// per-role variation flags for the original roles (uniform roles keep their colours; civilians get new looks)
const DEFAULT_VARY = {
  vadaPavWala: { build: [1, 1, 2], moustache: 0.0, grey: 0.25 }, chaiwalaUncle: { look: true, grey: 0.1, build: true },
  taxiDriver: { grey: 0.2, build: true }, dabbawala: { build: true, moustache: 0.3 }, koliFisherwoman: { flower: 0.5, build: [1, 1, 2] },
  busConductor: { grey: 0.15, build: true }, trafficCop: { build: true, grey: 0.1 }, collegeStudent: { look: true, flower: 0.3 },
  auntyWithSabzi: { flower: 0.4, grey: 0.4, build: [0, 1, 3] }, cricketKid: {}, bollywoodHopeful: { look: true, build: true },
  bhelWala: { look: true, grey: 0.2 }, golaWala: { grey: 0.1 }, balloonSeller: { look: true, floral: false, specs: 0.1 }, newspaperVendor: { look: true },
};
export function createNPC(role, ink, seed = 1, opts = {}) {
  if (role === 'strayDog') return Object.assign(createDog(ink, seed), { name: role });
  if (role === 'crow') return createCrow(ink, seed);
  if (role === 'pigeon') return createPigeon(ink, seed);
  if (role === 'couple') return createCouple(ink, seed, opts);
  if (ALIASES[role]) { const [r, o] = ALIASES[role]; return createNPC(r, ink, seed, { ...o, ...opts }); }
  const def = ROLE_DEFS[role];
  if (!def) throw new Error('unknown role: ' + role);
  const o = { variant: role === 'cricketKid' ? 'batter' : 0, ...opts };
  const r = rng(Math.abs(Math.floor(seed * 7919 + role.length * 131)) % 2147483646 + 1);
  r(); r();
  const spec = def.make(r, o);
  // seeded individuality for every role (heights, builds, shirt looks, grey hair, specs, flowers ...)
  vary(spec, r, { height: 0.04, build: false, specs: null, ...(def.vary ?? DEFAULT_VARY[role] ?? {}) });
  if (o.tweak) o.tweak(spec, r); // explicit look overrides for a named person (mumbai/population4.js)
  spec.seed = Math.floor(seed * 3 + 1);
  const p = createPerson(spec, ink);
  p.name = role;
  p.userData.role = role;
  const loop = o.loop === undefined ? (typeof def.loop === 'function' ? def.loop({ ...o, seed }) : def.loop) : o.loop;
  if (loop) p.userData.playLoop(loop);
  return p;
}
export default createNPC;
export { createCitizen, createCouple };
