/**
 * people/roles.js: the Hyderabad NPC cast (role keys unchanged from Mumbai; the looks are Hyderabad). Presets built on createPerson + a role loop from animate.js.
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
const P_ = PASTEL; // (PASTEL is imported above; P_ keeps the role tables short)
const PASTEL_WHITE = PASTEL.white;

const ROLE_DEFS = {
  // mirchi bajji man: pale-yellow half-sleeve shirt, a brick-red checked lungi, red-checked towel on the shoulder, a strainer at the kadhai
  vadaPavWala: {
    loop: 'frying',
    make: (r, o) => ({
      height: 2.15, build: 'round', skin: warm(r, [3, 4, 5]),
      outfit: 'banyanLungi', sleeves: 'short', top: pick(r, [0xf3e6b8, 0xf6efdb, 0xf5dfa0]), bottom: pick(r, [0xb5503c, 0x3b5f9a, 0x6a4a8a]), bottomPattern: 'checks', bottom2: 0xfffaf0,
      trim: null,
      hair: pick(r, [{ style: 'short', color: HAIR.black }, { style: 'short', color: HAIR.grey }, { style: 'bald' }]),
      face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, smile: 'big', tilak: false },
      accessories: [{ name: 'gamcha', slot: 'shoulderR', color: 0xd9453f, pattern: 'checks', color2: 0xfffaf0 }, 'jhara', ...(o.props ? [{ name: 'kadhai', pos: [0, 0, 0.95] }] : [])],
      footwear: 'chappal', footColor: pick(r, [P_.sky, P_.red]),
    }),
  },
  // Saleem Bhai, the Irani café owner (tutorial NPC): white skullcap, cream kurta over white pyjama, round specs, grey moustache, a steel chai kettle and a small cup
  chaiwalaUncle: {
    loop: 'pouring',
    make: (r) => ({
      height: 2.2, build: 'round', skin: warm(r, [2, 3, 4]),
      outfit: 'kurtaPyjama', sleeves: 'long', top: pick(r, [0xf3ecd8, 0xf6efdb]), topPattern: 'plain', bottom: 0xfbf7ea, bottomPattern: 'plain', bottom2: 0xfffaf0, trim: null,
      hair: { style: 'skullcap', color: HAIR.grey, hat: 0xfffaf0 },
      face: { eyes: 'dot', moustache: 'thick', brows: 'thin', specs: true, blush: true, tilak: false },
      accessories: ['kettle', { name: 'chaiGlass', slot: 'handL' }, { name: 'gamcha', slot: 'shoulderR', color: 0xfffaf0, pattern: 'plain' }],
      footwear: 'chappal', footColor: P_.brown,
    }),
  },
  // auto driver: khaki half-sleeve shirt and khaki trousers, a maroon towel, a badge on a green lanyard
  taxiDriver: {
    loop: 'leaning',
    make: (r) => ({
      height: 2.2, build: 'normal', skin: warm(r, [3, 4]),
      outfit: 'uniform', top: 0xc7b27a, topPattern: 'belt', top2: 0x6a5a40, bottom: 0xa8996a,
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, smile: 'small' },
      accessories: [{ name: 'gamcha', slot: 'shoulderL', color: 0x9a3a3a, pattern: 'plain' }, { name: 'lanyard', color: 0x3fa37e, card: 0xf6d86a }],
      footwear: 'chappal', footColor: 0x3d3a55,
    }),
  },
  // delivery rider (unbranded): red T-shirt, dark trousers, sneakers, dark cap, a plain red insulated bag on the back, phone in hand
  dabbawala: {
    loop: 'texting',
    make: (r) => ({
      height: 2.2, build: 'thin', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', sleeves: 'short', top: pick(r, [0xd9453f, 0xc93f45]), topPattern: 'plain', bottom: 0x3d3a55, trim: null,
      hair: { style: 'cap', color: HAIR.black, hat: pick(r, [0x2f2d3d, 0x3d3a55]) },
      face: { eyes: 'dot', moustache: r() > 0.6 ? 'thin' : false, brows: 'thin', blush: true },
      accessories: [{ name: 'deliveryBag', color: 0xd9453f }, 'phone'],
      footwear: 'shoes', footColor: PASTEL_WHITE,
    }),
  },
  // Laad Bazaar bangle seller: a bright salwar kameez with a colourful dupatta over the hair, a tray of glass and lac bangles on her chest strap
  koliFisherwoman: {
    loop: 'sell',
    make: (r) => {
      const [kameez, pyjama, dupatta] = pick(r, [[0xc2306b, 0x2f8f6a, 0x2fa89a], [0x2f7ac4, 0xf1e7d0, 0xe8559a], [0x8a4fc8, 0xf1e7d0, 0xf2c230], [0xe9776a, 0x2f8f6a, 0xfbf7ea]]);
      return {
        height: 2.05, build: 'round', skin: warm(r, [2, 3, 4]),
        outfit: 'kurtaPyjama', sleeves: 'long', top: kameez, topPattern: 'plain', bottom: pyjama, bottomPattern: 'plain', trim: 0xe3b84a,
        hair: { style: 'hijab', color: HAIR.black, hat: dupatta },
        face: { eyes: 'dot', lashes: true, blush: true, smile: 'big' },
        accessories: ['bangleTray'],
        footwear: 'chappal', footColor: P_.brown,
      };
    },
  },
  // TSRTC conductor: khaki uniform, a cash bag, ticket machine, a badge on a lanyard
  busConductor: {
    loop: 'ticket',
    make: (r) => ({
      height: 2.15, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'uniform', top: 0xc9b98a, topPattern: 'belt', top2: 0x6a5a4a, bottom: 0xa89c76,
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'dot', moustache: 'thin', brows: 'thin', blush: true },
      accessories: ['ticketMachine', { name: 'lanyard', color: 0xd9453f, card: 0xfffaf0 }],
      footwear: 'shoes', footColor: 0x5a4f6e,
    }),
  },
  // Hyderabad traffic police: white shirt and cap, dark trousers, whistle
  trafficCop: {
    loop: 'whistle',
    make: (r) => ({
      height: 2.25, build: 'normal', skin: warm(r, [2, 3, 4]),
      outfit: 'uniform', top: 0xfbf7ea, topPattern: 'belt', top2: 0x3d4468, bottom: 0x4d5578,
      hair: { style: 'cap', color: HAIR.black, hat: 0xfffdf6 },
      face: { eyes: 'dot', moustache: 'thick', brows: 'thick', blush: true, smile: 'small' },
      accessories: ['whistle'],
      footwear: 'shoes', footColor: 0x2f2a3a,
    }),
  },
  collegeStudent: {
    loop: (o) => (o.variant === 1 ? 'texting' : 'chat'),
    make: (r, o) => {
      if (o.variant === 1) { // jeans, T-shirt and a backpack
        return {
          height: 2.15, build: 'thin', skin: warm(r, [1, 2, 3]),
          outfit: 'shirtTrousers', sleeves: 'short', top: pick(r, [P_.lilac, P_.mint, P_.pink, P_.teal]), topPattern: 'plain', top2: 0xfffaf0, bottom: P_.denim,
          hair: { style: 'messy', color: pick(r, [HAIR.black, HAIR.brown]) },
          face: { eyes: 'dot', specs: r() > 0.5, blush: true, freckles: r() > 0.6, smile: 'small' },
          accessories: ['phone', 'backpack'],
          footwear: 'shoes', footColor: P_.white,
        };
      }
      return { // salwar kameez, plait with jasmine
        height: 2.05, build: 'thin', skin: warm(r, [1, 2, 3]),
        outfit: 'kurtaPyjama', sleeves: 'short', top: pick(r, [P_.pink, P_.sky, P_.butter, P_.mint]), bottom: pick(r, [P_.denim, P_.cream]), trim: 0xfffaf0,
        hair: { style: 'plait', color: HAIR.black, flower: 'jasmine' },
        face: { eyes: 'happy', lashes: true, bindi: pick(r, [true, 0x6cc3bd]), blush: true, smile: 'big' },
        accessories: [{ name: 'jhola', color: P_.marigold }],
        footwear: 'chappal', footColor: P_.pink,
      };
    },
  },
  auntyWithSabzi: {
    loop: 'sabzi',
    make: (r) => ({
      height: 2.0, build: 'round', skin: warm(r, [2, 3]),
      outfit: 'saree', top: pick(r, [P_.terracotta, P_.butter, 0x3fa37e]), bottom: pick(r, [0x8f6ab0, P_.rose, P_.lilac, P_.teal]), trim: 0xfffaf0, pallu: pick(r, [P_.cream, P_.marigold]),
      hair: { style: 'bun', color: pick(r, [HAIR.black, HAIR.grey, HAIR.henna]), flower: 'jasmine' },
      face: { eyes: 'dot', bindi: true, specs: r() > 0.4, blush: true, smile: 'small' },
      accessories: ['sabziBag', { name: 'umbrella', color: pick(r, [P_.lilac, P_.pink, P_.mint]), color2: P_.cream }],
      footwear: 'chappal', footColor: P_.brown,
    }),
  },
  cricketKid: {
    loop: (o) => (o.variant === 'bowler' ? 'bowl' : 'bat'),
    make: (r, o) => ({
      height: 1.5, build: 0.92, headScale: 1.34, legScale: 0.76, armScale: 0.86, torsoScale: 0.88, trim: 0xfffaf0, skin: warm(r, [2, 3, 4]),
      outfit: 'shirtShorts', top: o.variant === 'bowler' ? 0xe98a8a : 0x86a9e3, topPattern: o.variant === 'bowler' ? 'checks' : 'stripes', top2: 0xfff6dc, bottom: o.variant === 'bowler' ? 0xc9b97a : 0xf3efe2,
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'dot', eyeScale: 1.2, blush: true, smile: 'big', smudge: r() > 0.5 },
      accessories: o.variant === 'bowler' ? ['ball'] : ['cricketBat', ...(o.props ? [{ name: 'stumps', pos: [0, 0, -1.15] }] : [])],
      footwear: r() > 0.5 ? 'bare' : 'shoes', footColor: P_.white,
    }),
  },
  // Tollywood fan: a loud printed tee in hero-poster red, dark jeans, shades, a tied headband
  bollywoodHopeful: {
    loop: 'pose',
    make: (r) => ({
      height: 2.25, build: 'thin', skin: warm(r, [1, 2]),
      outfit: 'shirtTrousers', sleeves: 'short', top: 0xd9453f, topPattern: 'dots', top2: 0xf6d86a, bottom: 0x3d3a55,
      hair: { style: 'messy', color: HAIR.black, band: 0xf6d86a },
      face: { eyes: 'happy', brows: 'thin', blush: true, smile: 'big' },
      accessories: ['sunglasses'],
      footwear: 'shoes', footColor: PASTEL_WHITE,
    }),
  },
  // pani puri seller: striped shirt, cap, a steel tub of puris and a ladle for the spicy water
  bhelWala: {
    loop: 'stir',
    make: (r) => ({
      height: 2.1, build: 'round', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', top: pick(r, [P_.sky, P_.mint, P_.butter]), topPattern: 'stripes', top2: 0xfffaf0, bottom: pick(r, [P_.khaki, 0x4a4560]), trim: 0xfffaf0,
      hair: { style: 'cap', color: HAIR.black, hat: pick(r, [P_.teal, P_.butter, P_.pink]) },
      face: { eyes: 'dot', moustache: r() > 0.5 ? 'thin' : false, blush: true, smile: 'big' },
      accessories: ['bhelTub', 'jhara'],
      footwear: 'chappal', footColor: P_.red,
    }),
  },
  // falooda / kulfi seller: white vest-kurta, white skullcap, a red-checked towel, a tray of tall falooda glasses
  golaWala: {
    loop: 'sell',
    make: (r) => ({
      height: 2.1, build: 'thin', skin: warm(r, [3, 4, 5]),
      outfit: 'banyanLungi', sleeves: 'short', top: pick(r, [0xfbf7ea, 0xf6efdb]), bottom: 0xfbf7ea, bottomPattern: 'plain', bottom2: 0xfffaf0, trim: 0xe3b84a,
      hair: { style: 'skullcap', color: HAIR.black, hat: 0xfffaf0 },
      face: { eyes: 'dot', moustache: 'thin', blush: true, smile: 'big' },
      accessories: ['golaTray', { name: 'gamcha', slot: 'shoulderL', color: 0xd9453f, pattern: 'checks', color2: 0xfffaf0 }],
      footwear: 'chappal', footColor: P_.sky,
    }),
  },
  balloonSeller: {
    loop: 'sell',
    make: (r) => ({
      height: 2.1, build: 'thin', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', sleeves: 'short', top: pick(r, [P_.butter, P_.pink, P_.mint, P_.teal]), topPattern: 'vstripes', top2: 0xfffaf0, bottom: pick(r, [P_.denim, P_.sand]),
      hair: { style: 'short', color: HAIR.black },
      face: { eyes: 'happy', blush: true, smile: 'big', freckles: true },
      accessories: ['balloons', { name: 'gamcha', slot: 'shoulderR', color: P_.teal }],
      footwear: 'chappal', footColor: P_.red,
    }),
  },
  newspaperVendor: {
    loop: 'shout',
    make: (r) => ({
      height: 2.1, build: 'thin', skin: warm(r, [2, 3, 4]),
      outfit: 'shirtTrousers', sleeves: 'long', top: pick(r, [P_.sand, P_.sky]), topPattern: 'checks', top2: 0xfffaf0, bottom: 0xc9c4d6,
      hair: { style: 'short', color: HAIR.white },
      face: { eyes: 'dot', specs: true, moustache: 'thin', brows: 'thick', blush: true },
      accessories: ['newspaper', 'newspaperBundle'],
      footwear: 'chappal', footColor: P_.brown,
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
  vadaPavWala: { build: [1, 1, 2], moustache: 0.0, grey: 0.25 }, chaiwalaUncle: { grey: 0.1, build: true },
  taxiDriver: { grey: 0.2, build: true }, dabbawala: { build: true, moustache: 0.3 }, koliFisherwoman: { flower: 0.5, build: [1, 1, 2] },
  busConductor: { grey: 0.15, build: true }, trafficCop: { build: true, grey: 0.1 }, collegeStudent: { look: true, flower: 0.3 },
  auntyWithSabzi: { flower: 0.4, grey: 0.4, build: [0, 1, 3] }, cricketKid: {}, bollywoodHopeful: { build: true },
  bhelWala: { grey: 0.2 }, golaWala: { grey: 0.1 }, balloonSeller: { look: true, floral: false, specs: 0.1 }, newspaperVendor: { look: true },
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
  if (o.tweak) o.tweak(spec, r); // explicit look overrides for a named person (hyderabad/population4.js)
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
