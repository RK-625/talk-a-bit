/**
 * game/translit.js: tiny helpers for the mock classifier. Devanagari -> rough Latin, and a normaliser that makes romanised Hindi
 * spellings comparable (aa/a, ee/i, w/v, ph/f, aspirates, doubled letters...).
 *   toRoman(str) -> str     normalize(str) -> lowercase, punctuation-free, Latin-normalised string
 *   tokens(str) -> [normalised word]     tokenMatch(a, b) -> bool (fuzzy)     levenshtein(a, b)
 */
const CONS = { 'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'n', 'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'f', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'ळ': 'l', 'क़': 'k', 'ख़': 'kh', 'ग़': 'g', 'ज़': 'z', 'ड़': 'r', 'ढ़': 'rh', 'फ़': 'f' };
const VOW = { 'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ऑ': 'o' };
const MATRA = { 'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ृ': 'ri', 'ॉ': 'o', 'ॅ': 'e' };
const NUKTA = '़', VIRAMA = '्';
const isDev = (c) => c >= 'ऀ' && c <= 'ॿ';

export function toRoman(str) {
  const s = String(str ?? '').normalize('NFC');
  if (![...s].some(isDev)) return s;
  const out = [];
  const cs = [...s];
  for (let i = 0; i < cs.length; i++) {
    let c = cs[i];
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
const SYN = {
  chai: ['cha', 'tea', 'chay', 'chaay', 'chaye'], do: ['two', '2'], ek: ['one', '1'], teen: ['three', '3'], char: ['four', '4'],
  dena: ['dijiye', 'dijie', 'dedo', 'dedijiye', 'de', 'dijiyega', 'deejiye', 'give'], chahiye: ['chaiye', 'chahie', 'chahiyea', 'want', 'need'],
  namaste: ['hello', 'hi', 'namaskar', 'namaskaar', 'hey'], sorry: ['maaf', 'maafi', 'sory', 'sorri', 'maaf karo'], shukriya: ['thanks', 'thank', 'dhanyavad', 'dhanyavaad', 'thankyou', 'danyavad'],
  kitna: ['kitne', 'how much'], paisa: ['paise', 'rupaye', 'rupees'], haan: ['han', 'ha', 'yes', 'ji'], nahi: ['nahin', 'no', 'nahee'],
};
const CANON = new Map();
for (const [k, vs] of Object.entries(SYN)) for (const v of [k, ...vs]) CANON.set(key(v.replace(/\s+/g, '')), key(k));

export function levenshtein(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
const skel = (w) => w[0] + w.slice(1).replace(/[aeiou]/g, '');

export function tokens(str) { return normalize(str).split(' ').filter(Boolean).map((w) => { const k = key(w); return CANON.get(k) ?? k; }); }

export function tokenMatch(a, b) {
  if (a === b) return true;
  const L = Math.max(a.length, b.length);
  if (L <= 2) return false;
  if (L >= 3 && skel(a) === skel(b) && skel(a).length >= 2) return true;
  return L >= 4 && levenshtein(a, b) / L <= 0.3;
}
