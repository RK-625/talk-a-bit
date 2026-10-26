/**
 * people/variation.js: the seeded variation system. Curated pastel Chennai palettes (silk-border sarees, salwar, jeans + T-shirts, veshti / lungi
 * with half-sleeve shirts, office wear with lanyards, malli (jasmine) in the hair), fabric patterns (plain, stripes, checks, dots, florals), outfit kinds, hair, skin,
 * build, height, specs / moustache / bindi / flower, and small extras.
 *
 *   look(r)                       -> { top, topPattern, top2 }          a shirt / kurta / blouse look
 *   citizenSpec(r, kind)          -> createPerson spec for a generic Mumbaikar   kind: man | woman | kid | elder | teen
 *   vary(spec, r, v)              post-process any role spec (v: height, build, skin, look, grey, specs, moustache, flower, extras)
 *   pick(r, arr), chance(r, p)
 */
import { PASTEL as P, HAIR, SKIN } from './kit.js';

export const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
export const chance = (r, p) => r() < p;

export const SHIRTS = [P.sky, P.mint, P.butter, P.pink, P.lilac, P.terracotta, P.pistachio, P.sand, P.marigold, P.teal, P.denim, P.rose, P.cream, P.saffron, P.magenta, P.olive];
export const TROUSERS = [P.denim, P.khaki, P.sand, 0xc9c4d6, 0x9aa8c8, 0xb8a98c, 0x7d8fb5, P.olive, 0xa9b4a0, 0xd8c9b0];
export const SAREES = [
  [P.teal, P.magenta, P.marigold], [P.marigold, P.teal, P.red], [P.pink, P.sky, P.saffron], [P.butter, P.rose, P.lilac], [P.mint, P.terracotta, P.cream],
  [P.lilac, P.olive, P.pink], [P.sky, P.saffron, P.cream], [P.rose, P.pistachio, P.butter], [P.terracotta, P.sky, P.marigold],
  [P.marigold, 0x8f6ab0, P.cream], [P.pistachio, P.magenta, P.butter], [P.cream, 0x6aa882, P.terracotta], // Kanchipuram-silk-ish: gold border, purple, bottle green
];
export const LANYARDS = [0xf08a3c, 0x3fa37e, 0xb23a48, 0x8d5fc9, 0x4fb3bf]; // office badge straps (never the hero's bright blue)
export const KURTIS = [P.pink, P.sky, P.butter, P.mint, P.lilac, P.rose, P.saffron, P.pistachio, P.teal, P.terracotta, P.cream];
export const HAIR_MALE = [HAIR.black, HAIR.black, HAIR.black, HAIR.brown, HAIR.grey];
const CLOSE = 0xfffaf0;

/** pattern odds: plain most often, then stripes, checks, dots, vertical stripes, florals (florals only if allowed) */
export function look(r, { floral = false, base = null } = {}) {
  const k = r();
  const kind = k < 0.36 ? 'plain' : k < 0.55 ? 'stripes' : k < 0.72 ? 'checks' : k < 0.82 ? 'dots' : k < 0.88 ? 'vstripes' : floral ? 'floral' : 'plain';
  const top = base ?? pick(r, SHIRTS);
  return { top, topPattern: kind, top2: pick(r, [CLOSE, P.cream, P.white, top === P.sky ? P.marigold : P.sky]) };
}

const skinFor = (r, idx) => SKIN[pick(r, idx)];
const buildFor = (r, w = [1, 2, 1]) => { const x = r() * (w[0] + w[1] + w[2]); return x < w[0] ? 'thin' : x < w[0] + w[1] ? 'normal' : 'round'; };

const HERO_KURTA = 0xe3a82b, HERO_JEANS = 0x3f5f93;
const BLUES = [P.denim, P.navy, 0x8db4de, 0x7d8fb5, 0x9aa8c8];
/** Meera (the hero) is unique: nobody else wears her turmeric short kurta with the white print over blue jeans, her tan sling bag, her neck camera or her red notebook */
export function notMeera(s, r) {
  if (s.outfit === 'kurtaPyjama' && (s.top === HERO_KURTA || s.top === P.marigold) && (s.bottom === HERO_JEANS || s.bottom === P.denim)) s.top = pick(r, [P.pink, P.lilac, P.mint, P.sky]);
  if (s.topPattern === 'checks' && (s.top === P.red || s.top === P.terracotta || s.top === 0xd9574c) && (s.top2 === P.navy || s.top2 === 0x2f3b6d)) s.top2 = CLOSE;
  s.accessories = (s.accessories ?? []).filter((a) => !['slingBag', 'neckCamera', 'notebook', 'laptopBackpack', 'kettle', 'wireCarrier'].includes(a.name ?? a) && !((a.name ?? a) === 'lanyard' && (a.color ?? 0x2f6fe0) === 0x2f6fe0));
  return s;
}
const notRohan = notMeera;
export const notChotu = notMeera; // (kept: older call sites)
export { notRohan };
void BLUES;

/** Generic Chennaiite spec */
export function citizenSpec(r, kind = 'man') {
  const s = citizenSpecRaw(r, kind);
  // adults: a touch more torso, a touch less leg, so they do not read as stilts on a plank; grey hair never spiky
  if (s.torsoScale == null && s.legScale == null && s.armScale == null) { s.torsoScale = 1.08; s.legScale = 0.92; s.armScale = 1.05; }
  if (s.hair && s.hair.style === 'messy' && (s.hair.color === HAIR.grey || s.hair.color === HAIR.white)) s.hair = { ...s.hair, style: 'short' };
  return notMeera(s, r);
}
function citizenSpecRaw(r, kind = 'man') {
  const s = { footwear: pick(r, ['chappal', 'chappal', 'shoes']), footColor: pick(r, [P.sky, P.red, P.brown, P.white, P.pink]), accessories: [], face: {} };
  const spiceUp = (list) => { s.accessories.push(...list); };
  if (kind === 'man' || kind === 'elder' || kind === 'teen') {
    const old = kind === 'elder', teen = kind === 'teen';
    s.height = teen ? 1.95 + r() * 0.15 : old ? 2.05 + r() * 0.1 : 2.12 + r() * 0.16;
    s.headScale = teen ? 1.2 : 1.12;
    s.skin = skinFor(r, [0, 1, 2, 3, 4, 5]);
    s.build = old ? buildFor(r, [2, 2, 1]) : buildFor(r);
    const o = r();
    const veshti = old ? 0.42 : 0.1;
    if (o < veshti) { // veshti (white cloth with a coloured border) or a checked lungi, with a shirt
      const lungi = chance(r, 0.45);
      s.outfit = 'banyanLungi'; s.sleeves = chance(r, 0.6) ? 'short' : 'long';
      Object.assign(s, look(r, { base: pick(r, [P.cream, P.white, P.sky, P.mint, P.butter, P.sand]) })); s.topPattern = chance(r, 0.6) ? 'plain' : s.topPattern;
      if (lungi) { s.bottom = pick(r, [P.sky, P.mint, P.rose, P.butter, P.lilac, P.teal]); s.bottomPattern = 'checks'; s.bottom2 = CLOSE; s.trim = null; }
      else { s.bottom = 0xfbf7ea; s.bottomPattern = 'plain'; s.bottom2 = CLOSE; s.trim = pick(r, [0xe3b84a, 0xb23a48, 0x4a7fb0]); }
    } else if (o < veshti + (teen ? 0.55 : 0.28)) { // jeans + T-shirt
      s.outfit = 'shirtTrousers'; s.sleeves = 'short'; Object.assign(s, look(r)); s.topPattern = chance(r, 0.75) ? 'plain' : s.topPattern;
      s.bottom = pick(r, [P.denim, P.navy, 0x7d8fb5, 0x4a4560, P.denim]); s.trim = null;
      if (!teen && chance(r, 0.3)) spiceUp([{ name: 'lanyard', color: pick(r, LANYARDS) }]);
    } else if (o < veshti + (teen ? 0.55 : 0.28) + 0.22 && !old) { // office wear with an ID badge
      s.outfit = 'shirtTrousers'; s.sleeves = 'long'; Object.assign(s, look(r, { base: pick(r, [P.white, P.sky, P.cream, P.mint, P.pink, P.lilac]) })); s.topPattern = chance(r, 0.5) ? 'plain' : s.topPattern;
      s.bottom = pick(r, [0x7f8fb5, 0xa9b4a0, 0x9a9ab4, 0x8f8aa6, 0x6f6a82, P.khaki]); s.trim = null; s.footwear = 'shoes';
      spiceUp([{ name: 'lanyard', color: pick(r, LANYARDS) }]);
    } else if (o > 0.9 && !old) { s.outfit = 'shirtShorts'; Object.assign(s, look(r)); s.bottom = pick(r, TROUSERS); }
    else { s.outfit = 'shirtTrousers'; s.sleeves = chance(r, 0.45) ? 'long' : 'short'; Object.assign(s, look(r)); s.bottom = pick(r, TROUSERS); s.trim = chance(r, 0.12) ? CLOSE : null; }
    const hair = r();
    const grey = old ? 0.85 : 0.04;
    const col = chance(r, grey) ? pick(r, [HAIR.grey, HAIR.white]) : pick(r, HAIR_MALE);
    s.hair = hair < (old ? 0.3 : 0.06) ? { style: 'bald' } : hair < 0.5 ? { style: 'short', color: col } : hair < 0.75 ? { style: 'messy', color: col } : hair < 0.85 && old ? { style: 'topi', color: col, hat: pick(r, [P.white, P.cream, P.sky]) } : { style: 'short', color: col };
    if (teen && chance(r, 0.35)) s.hair = { style: 'cap', color: col, hat: pick(r, [P.red, P.sky, P.teal, P.butter]) };
    s.face = { eyes: pick(r, ['dot', 'dot', 'happy']), moustache: !teen && chance(r, old ? 0.45 : 0.35) ? pick(r, ['thin', 'thick', 'handlebar']) : false, brows: chance(r, 0.4) ? 'thin' : false, specs: chance(r, old ? 0.55 : 0.18), blush: true, freckles: teen && chance(r, 0.2), smile: chance(r, 0.4) ? 'big' : 'small' };
    if (chance(r, teen ? 0.6 : 0.18)) spiceUp(['phone']);
    else if (chance(r, 0.18)) spiceUp([{ name: 'jhola', color: pick(r, [P.marigold, P.terracotta, P.sky, P.mint]) }]);
    else if (chance(r, 0.12)) spiceUp([{ name: 'umbrella', color: pick(r, [P.sky, P.pink, 0xc9c4d6]), color2: P.cream }]);
    if (teen && chance(r, 0.4)) spiceUp(['backpack']);
  } else if (kind === 'woman') {
    s.height = 1.98 + r() * 0.14; s.skin = skinFor(r, [0, 1, 2, 3, 4, 5]); s.build = buildFor(r, [2, 2, 1]);
    const o = r();
    if (o < 0.3) { const [blouse, saree, pallu] = pick(r, SAREES); Object.assign(s, { outfit: 'saree', top: blouse, bottom: saree, bottomPattern: chance(r, 0.4) ? 'floral' : chance(r, 0.4) ? 'dots' : 'plain', bottom2: CLOSE, pallu, top2: CLOSE, trim: chance(r, 0.6) ? CLOSE : null }); }
    else if (o < 0.58) { Object.assign(s, { outfit: 'kurtaPyjama', sleeves: chance(r, 0.5) ? 'short' : 'long' }, look(r, { floral: true, base: pick(r, KURTIS) })); s.bottom = pick(r, [P.denim, 0xc9c4d6, P.cream, P.mint, P.pink, 0x9aa8c8]); s.trim = chance(r, 0.5) ? CLOSE : null; } // salwar kameez
    else if (o < 0.86) { s.outfit = 'shirtTrousers'; s.sleeves = chance(r, 0.6) ? 'short' : 'long'; Object.assign(s, look(r, { floral: true, base: pick(r, KURTIS) })); s.bottom = pick(r, [P.denim, P.denim, P.navy, 0x4a4560, P.khaki]); } // jeans + top / kurti
    else { s.outfit = 'shirtTrousers'; s.sleeves = 'long'; Object.assign(s, look(r, { base: pick(r, [P.white, P.sky, P.pink, P.lilac, P.mint]) })); s.topPattern = chance(r, 0.6) ? 'plain' : s.topPattern; s.bottom = pick(r, [0x7f8fb5, 0x6f6a82, 0xa9b4a0]); s.footwear = 'shoes'; spiceUp([{ name: 'lanyard', color: pick(r, LANYARDS) }]); } // office wear + badge
    const hr = r(), grey = chance(r, 0.1);
    const col = grey ? HAIR.grey : pick(r, [HAIR.black, HAIR.black, HAIR.brown, HAIR.henna]);
    const jas = chance(r, 0.5) ? 'jasmine' : false; // malli (jasmine) in the hair
    s.hair = hr < 0.35 ? { style: 'bun', color: col, flower: jas || chance(r, 0.15) } : hr < 0.7 ? { style: 'plait', color: col, flower: jas } : { style: 'short', color: col };
    s.face = { eyes: pick(r, ['dot', 'happy', 'happy']), lashes: true, bindi: chance(r, 0.65) ? (chance(r, 0.3) ? pick(r, [0x6cc3bd, 0x7a4fc0]) : true) : false, specs: chance(r, 0.12), blush: true, smile: chance(r, 0.5) ? 'big' : 'small', freckles: chance(r, 0.1) };
    s.footwear = pick(r, ['chappal', 'chappal', 'shoes']);
    if (chance(r, 0.4)) spiceUp([{ name: 'jhola', color: pick(r, [P.marigold, P.terracotta, P.teal, P.pink, P.lilac]) }]);
    else if (chance(r, 0.18)) spiceUp(['phone']);
    else if (chance(r, 0.12)) spiceUp(['sabziBag']);
    else if (chance(r, 0.1)) spiceUp([{ name: 'umbrella', color: pick(r, [P.lilac, P.pink, P.mint]), color2: P.cream }]);
  } else { // kid
    const girl = r() < 0.5;
    s.height = 1.3 + r() * 0.22; s.headScale = 1.38; s.legScale = 0.78; s.armScale = 0.86; s.torsoScale = 0.88; s.build = 0.92 + r() * 0.12;
    s.skin = skinFor(r, [0, 1, 2, 3, 4, 5]); s.footwear = pick(r, ['bare', 'chappal', 'shoes']);
    if (girl) { Object.assign(s, { outfit: 'kurtaPyjama', sleeves: 'short', trim: CLOSE }, look(r, { floral: true, base: pick(r, KURTIS) })); s.bottom = pick(r, [P.denim, P.cream, P.pink]); s.hair = { style: pick(r, ['plait', 'bun', 'short']), color: HAIR.black, flower: chance(r, 0.2) }; s.face = { eyes: 'happy', lashes: true, bindi: chance(r, 0.3), blush: true, smile: 'big' }; }
    else { Object.assign(s, { outfit: 'shirtShorts', sleeves: 'short', trim: chance(r, 0.4) ? CLOSE : null }, look(r)); s.bottom = pick(r, [P.denim, P.khaki, 0x6f7fb0, P.olive]); s.hair = { style: pick(r, ['messy', 'short']), color: HAIR.black }; s.face = { eyes: pick(r, ['dot', 'happy']), eyeScale: 1.2, blush: true, smile: 'big', smudge: chance(r, 0.3), freckles: chance(r, 0.2) }; }
    if (chance(r, 0.35)) spiceUp(['backpack']); else if (chance(r, 0.2)) spiceUp(['ball']);
  }
  return s;
}

/** Post-process a role spec: slight, seeded individuality. v flags (all optional):
 *  height (± fraction), build (bool), skin (array of skin indices), look (bool: re-roll shirt colours/patterns), grey (p), specs (p),
 *  moustache (p, men only), flower (p, women), extras (array of accessory names picked at random, p in extraP) */
export function vary(spec, r, v = {}) {
  if (v.height) spec.height = (spec.height ?? 2.2) * (1 + (r() - 0.5) * 2 * v.height);
  if (v.build) spec.build = buildFor(r, v.build === true ? [1, 3, 1] : v.build);
  if (v.skin) spec.skin = skinFor(r, v.skin);
  if (v.look) { const l = look(r, { floral: !!v.floral, base: v.look === 'keep' ? spec.top : null }); spec.topPattern = l.topPattern; spec.top2 = l.top2; if (v.look !== 'keep') spec.top = l.top; }
  if (v.bottom) spec.bottom = pick(r, v.bottom);
  if (v.grey && chance(r, v.grey) && spec.hair && spec.hair.style !== 'bald') spec.hair = { ...spec.hair, color: pick(r, [HAIR.grey, HAIR.white]) };
  if (v.specs != null) spec.face = { ...spec.face, specs: spec.face?.specs || chance(r, v.specs) };
  if (v.moustache != null && !spec.face?.moustache && chance(r, v.moustache)) spec.face = { ...spec.face, moustache: pick(r, ['thin', 'thick', 'handlebar']) };
  if (v.flower && spec.hair && (spec.hair.style === 'bun' || spec.hair.style === 'plait') && chance(r, v.flower)) spec.hair = { ...spec.hair, flower: chance(r, 0.7) ? 'jasmine' : true };
  if (v.eyes) spec.face = { ...spec.face, eyes: pick(r, v.eyes) };
  if (v.extras && chance(r, v.extraP ?? 0.4)) spec.accessories = [...(spec.accessories ?? []), pick(r, v.extras)];
  return spec;
}
