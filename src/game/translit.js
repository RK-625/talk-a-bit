/**
 * game/translit.js: tiny helpers for the mock classifier. Devanagari, Kannada, Tamil, Telugu and Malayalam script -> rough Latin, and a normaliser that makes
 * romanised Hindi / Kannada / Tamil / Telugu / Malayalam spellings comparable (aa/a, ee/i, w/v, ph/f, aspirates, doubled letters...).
 *   toRoman(str) -> str     normalize(str) -> lowercase, punctuation-free, Latin-normalised string
 *   tokens(str, lang?) -> [normalised word]   (lang 'kn' uses the Kannada spelling key: e/ee, o/oo, final -u/-nu, kaafi/coffee...; 'ta' also merges the
 *   unvoiced/voiced pairs Tamil spelling never distinguishes (k/g, t/d, p/b, ch/s, zh/l); 'te' is the Kannada key plus Telugu synonyms;
 *   'ml' (Manglish) merges zh/l, doubled letters, aa/a, ee/e, oo/o, nt/nd, nj/n and a final -u / -m: venam = vennam, undo = undoo)
 *   tokenMatch(a, b) -> bool (fuzzy)     levenshtein(a, b)     hasKannada / hasTamil / hasTelugu / hasMalayalam / hasDevanagari (str)
 */
const CONS = { 'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'n', 'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'f', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'ळ': 'l', 'क़': 'k', 'ख़': 'kh', 'ग़': 'g', 'ज़': 'z', 'ड़': 'r', 'ढ़': 'rh', 'फ़': 'f' };
const VOW = { 'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ऑ': 'o' };
const MATRA = { 'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ृ': 'ri', 'ॉ': 'o', 'ॅ': 'e' };
const NUKTA = '़', VIRAMA = '्';
const isDev = (c) => c >= 'ऀ' && c <= 'ॿ';

// ---- Kannada ----
const K_CONS = { 'ಕ': 'k', 'ಖ': 'kh', 'ಗ': 'g', 'ಘ': 'gh', 'ಙ': 'n', 'ಚ': 'ch', 'ಛ': 'chh', 'ಜ': 'j', 'ಝ': 'jh', 'ಞ': 'n', 'ಟ': 't', 'ಠ': 'th', 'ಡ': 'd', 'ಢ': 'dh', 'ಣ': 'n', 'ತ': 't', 'ಥ': 'th', 'ದ': 'd', 'ಧ': 'dh', 'ನ': 'n', 'ಪ': 'p', 'ಫ': 'ph', 'ಬ': 'b', 'ಭ': 'bh', 'ಮ': 'm', 'ಯ': 'y', 'ರ': 'r', 'ಱ': 'r', 'ಲ': 'l', 'ವ': 'v', 'ಶ': 'sh', 'ಷ': 'sh', 'ಸ': 's', 'ಹ': 'h', 'ಳ': 'l', 'ೞ': 'l' };
const K_VOW = { 'ಅ': 'a', 'ಆ': 'aa', 'ಇ': 'i', 'ಈ': 'ii', 'ಉ': 'u', 'ಊ': 'uu', 'ಋ': 'ru', 'ೠ': 'ruu', 'ಎ': 'e', 'ಏ': 'ee', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'oo', 'ಔ': 'au' };
const K_MATRA = { 'ಾ': 'aa', 'ಿ': 'i', 'ೀ': 'ii', 'ು': 'u', 'ೂ': 'uu', 'ೃ': 'ru', 'ೆ': 'e', 'ೇ': 'ee', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'oo', 'ೌ': 'au' };
const K_VIRAMA = '್';
const isKn = (c) => c >= '\u0C80' && c <= '\u0CFF';
export const hasKannada = (s) => /[\u0C80-\u0CFF]/.test(String(s ?? ''));
export const hasDevanagari = (s) => /[\u0900-\u097F]/.test(String(s ?? ''));

// ---- Tamil and Telugu (same shape as Kannada: consonant + matra / virama / inherent 'a') ----
const T_CONS = { 'க': 'k', 'ங': 'ng', 'ச': 'ch', 'ஞ': 'nj', 'ட': 't', 'ண': 'n', 'த': 'th', 'ந': 'n', 'ப': 'p', 'ம': 'm', 'ய': 'y', 'ர': 'r', 'ல': 'l', 'வ': 'v', 'ழ': 'zh', 'ள': 'l', 'ற': 'r', 'ன': 'n', 'ஜ': 'j', 'ஷ': 'sh', 'ஸ': 's', 'ஹ': 'h' };
const T_VOW = { 'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ii', 'உ': 'u', 'ஊ': 'uu', 'எ': 'e', 'ஏ': 'ee', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'oo', 'ஔ': 'au' };
const T_MATRA = { 'ா': 'aa', 'ி': 'i', 'ீ': 'ii', 'ு': 'u', 'ூ': 'uu', 'ெ': 'e', 'ே': 'ee', 'ை': 'ai', 'ொ': 'o', 'ோ': 'oo', 'ௌ': 'au' };
const TE_CONS = { 'క': 'k', 'ఖ': 'kh', 'గ': 'g', 'ఘ': 'gh', 'ఙ': 'n', 'చ': 'ch', 'ఛ': 'chh', 'జ': 'j', 'ఝ': 'jh', 'ఞ': 'n', 'ట': 't', 'ఠ': 'th', 'డ': 'd', 'ఢ': 'dh', 'ణ': 'n', 'త': 't', 'థ': 'th', 'ద': 'd', 'ధ': 'dh', 'న': 'n', 'ప': 'p', 'ఫ': 'ph', 'బ': 'b', 'భ': 'bh', 'మ': 'm', 'య': 'y', 'ర': 'r', 'ఱ': 'r', 'ల': 'l', 'వ': 'v', 'శ': 'sh', 'ష': 'sh', 'స': 's', 'హ': 'h', 'ళ': 'l' };
const TE_VOW = { 'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ii', 'ఉ': 'u', 'ఊ': 'uu', 'ఋ': 'ru', 'ఎ': 'e', 'ఏ': 'ee', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'oo', 'ఔ': 'au' };
const TE_MATRA = { 'ా': 'aa', 'ి': 'i', 'ీ': 'ii', 'ు': 'u', 'ూ': 'uu', 'ృ': 'ru', 'ె': 'e', 'ే': 'ee', 'ై': 'ai', 'ొ': 'o', 'ో': 'oo', 'ౌ': 'au' };
const TABLES = {
  ta: { cons: T_CONS, vow: T_VOW, matra: T_MATRA, virama: '்', digit: 0xBE6, anusvara: false },
  te: { cons: TE_CONS, vow: TE_VOW, matra: TE_MATRA, virama: '్', digit: 0xC66, anusvara: true },
};
const isTa = (c) => c >= '஀' && c <= '௿';
const isTe = (c) => c >= 'ఀ' && c <= '౿';
export const hasTamil = (s) => /[஀-௿]/.test(String(s ?? ''));
export const hasTelugu = (s) => /[ఀ-౿]/.test(String(s ?? ''));

// ---- Malayalam: consonant + matra / virama / inherent 'a'; chillu letters stand alone; a word-final virama is the 'u' of ഒന്ന് (onnu) ----
const ML_CONS = { 'ക': 'k', 'ഖ': 'kh', 'ഗ': 'g', 'ഘ': 'gh', 'ങ': 'ng', 'ച': 'ch', 'ഛ': 'chh', 'ജ': 'j', 'ഝ': 'jh', 'ഞ': 'nj', 'ട': 't', 'ഠ': 'th', 'ഡ': 'd', 'ഢ': 'dh', 'ണ': 'n', 'ത': 'th', 'ഥ': 'th', 'ദ': 'd', 'ധ': 'dh', 'ന': 'n', 'പ': 'p', 'ഫ': 'f', 'ബ': 'b', 'ഭ': 'bh', 'മ': 'm', 'യ': 'y', 'ര': 'r', 'ല': 'l', 'വ': 'v', 'ശ': 'sh', 'ഷ': 'sh', 'സ': 's', 'ഹ': 'h', 'ള': 'l', 'ഴ': 'zh', 'റ': 'r' };
const ML_CHILLU = { 'ൺ': 'n', 'ൻ': 'n', 'ർ': 'r', 'ൽ': 'l', 'ൾ': 'l', 'ൿ': 'k' };
const ML_VOW = { 'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ii', 'ഉ': 'u', 'ഊ': 'uu', 'ഋ': 'ru', 'എ': 'e', 'ഏ': 'ee', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'oo', 'ഔ': 'au' };
const ML_MATRA = { 'ാ': 'aa', 'ി': 'i', 'ീ': 'ii', 'ു': 'u', 'ൂ': 'uu', 'ൃ': 'ru', 'െ': 'e', 'േ': 'ee', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'oo', 'ൌ': 'au', 'ൗ': 'au' };
const ML_VIRAMA = '്', ZWJ = '‍', ZWNJ = '‌';
const isMl = (c) => c >= 'ഀ' && c <= 'ൿ';
export const hasMalayalam = (s) => /[ഀ-ൿ]/.test(String(s ?? ''));

function mlToRoman(cs, i, out) {
  const c = cs[i];
  if (ML_CHILLU[c]) { out.push(ML_CHILLU[c]); return i; }
  if (ML_CONS[c]) {
    const nx = cs[i + 1];
    if (nx && ML_MATRA[nx]) { out.push(ML_CONS[c], ML_MATRA[nx]); return i + 1; }
    if (nx === ML_VIRAMA) {
      out.push(ML_CONS[c]);
      const after = cs[i + 2];
      if (after === ZWJ) return i + 2;              // old-style chillu (ന + ് + ZWJ): a bare consonant
      if (!after || !isMl(after)) out.push('u');     // word-final virama: onnu, aanu, undu
      return i + 1;                                  // otherwise a conjunct: unda, kutti
    }
    out.push(ML_CONS[c], 'a'); return i;
  }
  if (ML_VOW[c]) out.push(ML_VOW[c]);
  else if (c === 'ം' || c === 'ഁ') out.push('m');  // pazham, venam
  else if (c === 'ഃ') out.push('h');
  else if (c >= '൦' && c <= '൯') out.push(String(c.charCodeAt(0) - 0xD66));
  return i;
}

function indicToRoman(T, cs, i, out) {
  const c = cs[i];
  if (T.cons[c]) {
    const nx = cs[i + 1];
    if (nx && T.matra[nx]) { out.push(T.cons[c], T.matra[nx]); return i + 1; }
    if (nx === T.virama) { out.push(T.cons[c]); return i + 1; }
    out.push(T.cons[c], 'a'); return i; // keeps the inherent 'a' (Tamil final -ம், -ன் carry a pulli, so they stay bare)
  }
  if (T.vow[c]) out.push(T.vow[c]);
  else if (T.anusvara && (c === 'ం' || c === 'ఁ')) { const n = T.cons[cs[i + 1]]; out.push(!n || /^[pbm]/.test(n) ? 'm' : 'n'); } // andi, bengaluru
  else if (c === 'ః' || c === 'ஃ') out.push('h');
  else if (c >= String.fromCharCode(T.digit) && c <= String.fromCharCode(T.digit + 9)) out.push(String(c.charCodeAt(0) - T.digit));
  return i;
}

function knToRoman(cs, i, out) {
  const c = cs[i];
  if (K_CONS[c]) {
    const nx = cs[i + 1];
    if (nx && K_MATRA[nx]) { out.push(K_CONS[c], K_MATRA[nx]); return i + 1; }
    if (nx === K_VIRAMA) { out.push(K_CONS[c]); return i + 1; }
    out.push(K_CONS[c], 'a'); return i; // Kannada keeps the inherent 'a' even at the end of a word
  }
  if (K_VOW[c]) out.push(K_VOW[c]);
  else if (c === 'ಂ' || c === 'ಁ') { const n = K_CONS[cs[i + 1]]; out.push(!n || /^[pbm]/.test(n) ? 'm' : 'n'); } // omdu -> ondu, bemgaluru -> bengaluru
  else if (c === 'ಃ') out.push('h');
  else if (c >= '೦' && c <= '೯') out.push(String(c.charCodeAt(0) - 0xCE6));
  return i;
}

export function toRoman(str) {
  const s = String(str ?? '').normalize('NFC');
  if (![...s].some((c) => isDev(c) || isKn(c) || isTa(c) || isTe(c) || isMl(c))) return s;
  const out = [];
  const cs = [...s];
  for (let i = 0; i < cs.length; i++) {
    let c = cs[i];
    if (isMl(c)) { i = mlToRoman(cs, i, out); continue; }
    if ((c === ZWJ || c === ZWNJ) && hasMalayalam(s)) continue;
    if (isKn(c)) { i = knToRoman(cs, i, out); continue; }
    if (isTa(c)) { i = indicToRoman(TABLES.ta, cs, i, out); continue; }
    if (isTe(c)) { i = indicToRoman(TABLES.te, cs, i, out); continue; }
    if (!isDev(c)) { out.push(c); continue; }
    if (cs[i + 1] === NUKTA) { c = c + NUKTA; i++; c = c.normalize('NFC'); }
    if (CONS[c]) {
      const nx = cs[i + 1];
      if (nx && (MATRA[nx])) { out.push(CONS[c], MATRA[nx]); i++; }
      else if (nx === VIRAMA) { out.push(CONS[c]); i++; }
      else { // inherent 'a', dropped at the end of a word or before another word-final consonant+vowel-less cluster
        const atEnd = !nx || !isDev(nx);
        out.push(CONS[c]); if (!atEnd) out.push('a');
      }
    } else if (VOW[c]) out.push(VOW[c]);
    else if (c === 'ं' || c === 'ँ') out.push('n');
    else if (c === 'ः') out.push('h');
    else if (c === '।' || c === '॥') out.push(' ');
    else if (c >= '०' && c <= '९') out.push(String(c.charCodeAt(0) - 0x966));
  }
  return out.join('');
}

export function normalize(str) {
  let s = toRoman(str).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/[^a-z0-9\s]/g, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

/** one word -> a spelling-tolerant key (Hindi romanisation varies a lot) */
function key(w) {
  let s = w;
  s = s.replace(/ph/g, 'f').replace(/ch/g, '#').replace(/sh/g, '$').replace(/([kgjtdbp])h/g, '$1');
  s = s.replace(/w/g, 'v').replace(/z/g, 'j').replace(/x/g, 'ks').replace(/q/g, 'k').replace(/c/g, 'k').replace(/y$/g, 'i');
  s = s.replace(/aa/g, 'a').replace(/ee|ii/g, 'i').replace(/oo|uu/g, 'u').replace(/(.)\1+/g, '$1');
  s = s.replace(/#/g, 'ch').replace(/\$/g, 'sh');
  return s;
}
/** Kannada romanisation varies even more (beku / beeku / bekku, kodi / kodu, illa / ila, kaafi / coffee): a coarser key */
function keyKn(w) {
  let s = w;
  s = s.replace(/ph/g, 'f').replace(/ch/g, '#').replace(/sh/g, '$').replace(/([kgjtdbp])h/g, '$1');
  s = s.replace(/w/g, 'v').replace(/z/g, 'j').replace(/x/g, 'ks').replace(/q/g, 'k').replace(/c/g, 'k').replace(/y$/g, 'i');
  s = s.replace(/aa+/g, 'a').replace(/ee+/g, 'e').replace(/ii+/g, 'i').replace(/oo+/g, 'o').replace(/uu+/g, 'u').replace(/(.)\1+/g, '$1');
  s = s.replace(/ai$/g, 'ay').replace(/(.{2,})nu$/, '$1n').replace(/(.{3,})u$/, '$1'); // hogtinu / hogtini ; beku / bek
  s = s.replace(/#/g, 'ch').replace(/\$/g, 'sh');
  return s;
}
/** Tamil spelling never separates k/g, t/d, p/b, ch/s (and romanisers write zh, l, r, rr, ndr/nr freely): the coarsest key */
function keyTa(w) {
  let s = w;
  s = s.replace(/ph/g, 'f').replace(/sh/g, 's').replace(/zh/g, 'l').replace(/([kgjtdbp])h/g, '$1').replace(/ch/g, 's');
  s = s.replace(/w/g, 'v').replace(/z/g, 'j').replace(/x/g, 'ks').replace(/q/g, 'k').replace(/c/g, 'k').replace(/y$/g, 'i');
  s = s.replace(/g/g, 'k').replace(/d/g, 't').replace(/b/g, 'p').replace(/j/g, 's').replace(/f/g, 'p').replace(/ndr/g, 'nr').replace(/ng(?![aeiou])/g, 'n');
  s = s.replace(/aa+/g, 'a').replace(/ee+/g, 'e').replace(/ii+/g, 'i').replace(/oo+/g, 'o').replace(/uu+/g, 'u').replace(/(.)\1+/g, '$1');
  s = s.replace(/ai$/g, 'ay').replace(/(.{2,})ng?u$/, '$1n').replace(/(.{3,})u$/, '$1').replace(/(.{3,})m$/, '$1'); // onnu / onru / ondru ; venum / venu
  return s;
}
/** Malayalam romanisation (Manglish): zh/l, venam/vennam, undo/undoo, chaya/chai, final -u and -m dropped: a coarse key */
function keyMl(w) {
  let s = w;
  s = s.replace(/ph/g, 'f').replace(/sh/g, 's').replace(/zh/g, 'l').replace(/([kgjtdbp])h/g, '$1').replace(/ch/g, '#');
  s = s.replace(/w/g, 'v').replace(/z/g, 'j').replace(/x/g, 'ks').replace(/q/g, 'k').replace(/c/g, 'k').replace(/y$/g, 'i');
  s = s.replace(/aa+/g, 'a').replace(/ee+/g, 'e').replace(/ii+/g, 'i').replace(/oo+/g, 'o').replace(/uu+/g, 'u').replace(/(.)\1+/g, '$1');
  s = s.replace(/nj|ny/g, 'n').replace(/nt/g, 'nd').replace(/ai$/g, 'ay').replace(/(.{3,})u$/, '$1').replace(/(.{3,})m$/, '$1'); // njan / nyan ; unda / unta ; venam / vena
  return s.replace(/#/g, 'ch');
}
const SYN_KN = {
  kaafi: ['coffee', 'kapi', 'kaphi', 'kofi', 'cofee'], beku: ['beeku', 'bekku', 'beke', 'beku', 'want'], illa: ['ila', 'illa', 'illaa', 'no'], kodi: ['kodi', 'kodu', 'koodi', 'kodri', 'give', 'kodiri'],
  ondu: ['ondu', 'ond', 'ondhu', 'one', '1'], eradu: ['eradu', 'eraadu', 'yeradu', 'two', '2'], mooru: ['mooru', 'muru', 'three', '3'], hauda: ['houdu', 'haudu', 'hauda', 'yes', 'haudhu'],
  dhanyavadagalu: ['dhanyavada', 'dhanyavaadagalu', 'thanks', 'thank', 'thankyou', 'thanku'], namaskara: ['namaskaara', 'namaste', 'hello', 'hi'], estu: ['eshtu', 'estu', 'how much'],
  rupayi: ['rupai', 'rupee', 'rupees', 'rupaayi', 'rs'], neeru: ['neer', 'neeru', 'water'], bisi: ['bisi', 'hot'], saaku: ['saku', 'saaku', 'enough'],
};
const SYN_TA = {
  kaapi: ['coffee', 'kapi', 'kaphi', 'kofi', 'cofee', 'kaappi'], venum: ['veenum', 'venumm', 'vendum', 'venuma', 'want'], illa: ['ila', 'illai', 'illaa', 'no'], kudunga: ['kudunga', 'kuduga', 'kodunga', 'kodu', 'give', 'tharen'],
  onnu: ['onru', 'ondru', 'onnu', 'one', '1'], rendu: ['irandu', 'rendu', 'two', '2'], moonu: ['munu', 'moondru', 'moonru', 'three', '3'], aama: ['aamam', 'amam', 'ama', 'yes'],
  nandri: ['nanri', 'nandri', 'thanks', 'thank', 'thankyou', 'thanku'], vanakkam: ['vanakam', 'vannakam', 'hello', 'hi'], evvalavu: ['evlo', 'evalo', 'evvlo', 'how much'],
  rupaai: ['rupa', 'rupai', 'rupees', 'rupee', 'ruba', 'rs'], thanni: ['tanni', 'thanneer', 'water'], chai: ['tea', 'chaya', 'teaa'], podhum: ['podum', 'pothum', 'enough'],
};
const SYN_TE = {
  kaafi: ['coffee', 'kapi', 'kaphi', 'kofi', 'cofee'], kavali: ['kaavali', 'kavaali', 'kavalii', 'want'], ledu: ['ledhu', 'ledu', 'leduu', 'no'], ivvandi: ['ivvu', 'ivvandi', 'evvandi', 'ivandi', 'give'],
  okati: ['okkati', 'okati', 'oka', 'one', '1'], rendu: ['rendu', 'randu', 'two', '2'], moodu: ['mudu', 'moodu', 'three', '3'], avunu: ['awunu', 'avnu', 'avunu', 'yes'],
  dhanyavadalu: ['dhanyavadam', 'dhanyavaadalu', 'thanks', 'thank', 'thankyou', 'thanku'], namaskaram: ['namaste', 'namaskar', 'hello', 'hi'], entha: ['yentha', 'enta', 'how much'],
  rupayalu: ['rupayi', 'rupees', 'rupee', 'rupai', 'rs'], neellu: ['nellu', 'neeru', 'water'], chai: ['tea', 'chaay', 'teaa'], saaripoddi: ['saripothundi', 'saripoddi', 'saripodhi', 'enough'],
};
const SYN_ML = {
  chaya: ['chai', 'chay', 'tea', 'chaaya', 'chaa', 'teaa', 'thee'], kapi: ['coffee', 'kaapi', 'kappi', 'kofi', 'cofee', 'kaphi'], venam: ['vennam', 'venum', 'vendam', 'veno', 'want', 'vene'], illa: ['ila', 'illaa', 'illai', 'no', 'venda'],
  onnu: ['onn', 'onu', 'one', '1', 'oru'], randu: ['rand', 'rendu', 'two', '2'], moonnu: ['munnu', 'moonu', 'munu', 'three', '3'], athe: ['ate', 'ath', 'yes', 'sheri'], sheri: ['seri', 'shari', 'sari', 'ok', 'okay'],
  nanni: ['nandi', 'nanri', 'thanks', 'thank', 'thankyou', 'thanku'], namaskaram: ['namaskar', 'namaste', 'hello', 'hi'], ethra: ['yethra', 'ethre', 'how much'], rupa: ['rupaya', 'rupees', 'rupee', 'roopa', 'rs'],
  vellam: ['velam', 'water'], mathi: ['madhi', 'mati', 'enough', 'mathy'], tharamo: ['tharumo', 'taramo', 'tharuo', 'tharoo', 'taruo', 'give'],
};
const SYN = {
  chai: ['cha', 'tea', 'chay', 'chaay', 'chaye'], do: ['two', '2'], ek: ['one', '1'], teen: ['three', '3'], char: ['four', '4'],
  dena: ['dijiye', 'dijie', 'dedo', 'dedijiye', 'de', 'dijiyega', 'deejiye', 'give'], chahiye: ['chaiye', 'chahie', 'chahiyea', 'want', 'need'],
  namaste: ['hello', 'hi', 'namaskar', 'namaskaar', 'hey'], sorry: ['maaf', 'maafi', 'sory', 'sorri', 'maaf karo'], shukriya: ['thanks', 'thank', 'dhanyavad', 'dhanyavaad', 'thankyou', 'danyavad'],
  kitna: ['kitne', 'how much'], paisa: ['paise', 'rupaye', 'rupees'], haan: ['han', 'ha', 'yes', 'ji'], nahi: ['nahin', 'no', 'nahee'],
};
const CANON = new Map();
for (const [k, vs] of Object.entries(SYN)) for (const v of [k, ...vs]) CANON.set(key(v.replace(/\s+/g, '')), key(k));
const CANON_KN = new Map();
for (const [k, vs] of Object.entries(SYN_KN)) for (const v of [k, ...vs]) CANON_KN.set(keyKn(v.replace(/\s+/g, '')), keyKn(k));
const CANON_TA = new Map();
for (const [k, vs] of Object.entries(SYN_TA)) for (const v of [k, ...vs]) CANON_TA.set(keyTa(v.replace(/\s+/g, '')), keyTa(k));
const CANON_TE = new Map(); // Telugu uses the Kannada key (same sound system for these purposes)
for (const [k, vs] of Object.entries(SYN_TE)) for (const v of [k, ...vs]) CANON_TE.set(keyKn(v.replace(/\s+/g, '')), keyKn(k));
const CANON_ML = new Map();
for (const [k, vs] of Object.entries(SYN_ML)) for (const v of [k, ...vs]) CANON_ML.set(keyMl(v.replace(/\s+/g, '')), keyMl(k));
const KEYS = { kn: [keyKn, CANON_KN], ta: [keyTa, CANON_TA], te: [keyKn, CANON_TE], ml: [keyMl, CANON_ML] };

export function levenshtein(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
const skel = (w) => w[0] + w.slice(1).replace(/[aeiou]/g, '');

export function tokens(str, lang) {
  const [kf, canon] = KEYS[lang] ?? [key, CANON];
  return normalize(str).split(' ').filter(Boolean).map((w) => { const k = kf(w); return canon.get(k) ?? k; });
}

export function tokenMatch(a, b) {
  if (a === b) return true;
  const L = Math.max(a.length, b.length);
  if (L <= 2) return false;
  if (L >= 3 && skel(a) === skel(b) && skel(a).length >= 2) return true;
  return L >= 4 && levenshtein(a, b) / L <= 0.3;
}
