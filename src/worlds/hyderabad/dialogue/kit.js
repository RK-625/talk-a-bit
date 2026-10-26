// Tiny helpers so the Hyderabad dialogues stay readable. Output matches the schema in docs/DIALOGUE.md (lang 'te' unless told otherwise).
// A line is written [Telugu script, English]; the romanised line shown under it is made from the Telugu script by `roman()` below
// (English-speaking tourists: a line is just one string).

const IND = {
  'అ': 'a', 'ఆ': 'a', 'ఇ': 'i', 'ఈ': 'ee', 'ఉ': 'u', 'ఊ': 'oo', 'ఋ': 'ru', 'ఎ': 'e', 'ఏ': 'e', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'o', 'ఔ': 'au',
};
const SIGN = { 'ా': 'a', 'ి': 'i', 'ీ': 'ee', 'ు': 'u', 'ూ': 'oo', 'ృ': 'ru', 'ె': 'e', 'ే': 'e', 'ై': 'ai', 'ొ': 'o', 'ో': 'o', 'ౌ': 'au' };
const CONS = {
  'క': 'k', 'ఖ': 'kh', 'గ': 'g', 'ఘ': 'gh', 'ఙ': 'ng', 'చ': 'ch', 'ఛ': 'chh', 'జ': 'j', 'ఝ': 'jh', 'ఞ': 'ny',
  'ట': 't', 'ఠ': 'th', 'డ': 'd', 'ఢ': 'dh', 'ణ': 'n', 'త': 't', 'థ': 'th', 'ద': 'd', 'ధ': 'dh', 'న': 'n',
  'ప': 'p', 'ఫ': 'f', 'బ': 'b', 'భ': 'bh', 'మ': 'm', 'య': 'y', 'ర': 'r', 'ఱ': 'r', 'ల': 'l', 'ళ': 'l', 'వ': 'v',
  'శ': 'sh', 'ష': 'sh', 'స': 's', 'హ': 'h',
};
// Common English / Urdu loanwords and names, written in Telugu script in the lines, mapped to the usual Latin spelling.
// EXACT words match whole; STEMS also match with a Telugu ending (ఇంటర్వ్యూకి -> interview + ki).
const EXACT = {
  'సమీర్': 'Sameer', 'సలీం': 'Saleem', 'భాయ్': 'bhai', 'సార్': 'sir', 'ఇన్': 'in', 'అప్': 'up', 'ది': 'the', 'ఆల్': 'all', 'బై': 'bye', 'ట్రై': 'try', 'డే': 'day',
  'లక్': 'luck', 'ఫ్రీ': 'free', 'హాయ్': 'hi', 'హాల్': 'hall', 'క్యూ': 'queue', 'గోల్': 'goal', 'సీట్': 'seat', 'మిస్': 'miss', 'బోర్': 'bored', 'టోల్': 'toll', 'మనీ': 'money',
  'కోచ్': 'coach', 'ఐడీ': 'ID', 'ఐటీ': 'IT', 'టీ': 'tea', 'రేటే': 'rate', 'బస్': 'bus', 'శభాష్': 'shabash', 'నోట్': 'note', 'పాస్': 'pass', 'ఐస్': 'ice', 'షో': 'show', 'లేట్': 'late', 'కాల్': 'call', 'రోజ్': 'rose', 'క్రీమ్': 'cream',
};
const STEMS = {
  'ఇంటర్వ్యూ': 'interview', 'ఆఫీస్': 'office', 'ఆఫీసు': 'office', 'ఆఫీ': 'office', 'ఆటో': 'auto', 'మెట్రో': 'metro', 'బస్సు': 'bus', 'టికెట్': 'ticket', 'టైమ్': 'time', 'టైం': 'time', 'ఫోన్': 'phone',
  'ఫోటోగ్రాఫర్': 'photographer', 'ఫోటో': 'photo', 'ఫ్రెండ్': 'friend', 'ఫ్రెషర్': 'fresher', 'ఫ్లోర్': 'floor', 'ఫ్లాట్': 'flat', 'ఫోల్డర్': 'folder', 'ఫలూదా': 'falooda', 'ఫుట్బాల్': 'football', 'ఫుట్పాత్': 'footpath',
  'ఫౌంటెన్': 'fountain', 'ఫేమస్': 'famous', 'ఫస్ట్': 'first', 'పేపర్': 'paper', 'ప్లేట్': 'plate', 'బెలూన్': 'balloon', 'బజ్జీ': 'bajji', 'పానీ': 'pani', 'పూరీ': 'puri', 'బిస్కెట్': 'biscuit', 'లస్సీ': 'lassi',
  'హలీమ్': 'haleem', 'బౌల్': 'bowl', 'క్యాష్': 'cash', 'యూపీఐ': 'UPI', 'కార్డ్': 'card', 'స్మార్ట్': 'smart', 'టోకెన్': 'token', 'క్యాబ్': 'cab', 'కస్టమర్': 'customer', 'డెలివరీ': 'delivery', 'ఆర్డర్': 'order',
  'పార్సెల్': 'parcel', 'అడ్రస్': 'address', 'లిఫ్ట్': 'lift', 'రిజిస్టర్': 'register', 'రెజ్యూమ్': 'resume', 'రెడీ': 'ready', 'ప్లాట్ఫామ్': 'platform', 'ట్రైన్': 'train', 'నంబర్': 'number', 'కౌంటర్': 'counter',
  'రీఛార్జ్': 'recharge', 'క్లిక్': 'click', 'ప్రింట్': 'print', 'బోర్డు': 'board', 'బోర్డ్': 'board', 'బ్యాగ్': 'bag', 'గైడ్': 'guide', 'ప్యాలెస్': 'palace', 'గెస్ట్': 'guest', 'గెస్ట': 'guest', 'ప్లాన్': 'plan',
  'వీకెండ్': 'weekend', 'హ్యాపీ': 'happy', 'జర్నీ': 'journey', 'థాంక్స్': 'thanks', 'థాంక్యూ': 'thank you', 'టెన్షన్': 'tension', 'మ్యాచ్': 'match', 'కీపర్': 'keeper', 'ఓవర్': 'over', 'అంపైర్': 'umpire',
  'యార్కర్': 'yorker', 'స్ట్రైకర్': 'striker', 'క్వీన్': 'queen', 'కేరమ్స్': 'carrom', 'గేమ్': 'game', 'టోర్నమెంట్': 'tournament', 'బాల్కనీ': 'balcony', 'పోస్టర్': 'poster', 'సూపర్': 'super', 'హీరో': 'hero',
  'పోజ్': 'pose', 'డైలాగ్': 'dialogue', 'లక్కీ': 'lucky', 'పార్టీ': 'party', 'ప్రిపరేషన్': 'preparation', 'ఇంజనీరింగ్': 'engineering', 'ఇంజనీర్': 'engineer', 'స్కూల్': 'school', 'పాకెట్': 'pocket', 'బెంచీ': 'bench',
  'కంపెనీ': 'company', 'రైడ్': 'ride', 'ఇంజిన్': 'engine', 'బోటు': 'boat', 'బోట్': 'boat', 'బాటిల్': 'bottle', 'కోన్': 'cone', 'రౌండ్': 'round', 'ప్లేలిస్ట్': 'playlist', 'సెల్ఫీ': 'selfie', 'కుల్ఫీ': 'kulfi', 'సిరప్': 'syrup',
  'ఓల్డ్': 'old', 'సిటీ': 'city', 'హైటెక్': 'HITEC', 'సైబర్': 'Cyber', 'టవర్స్': 'Towers', 'చార్మినార్': 'Charminar', 'హుస్సేన్': 'Hussain', 'సాగర్': 'Sagar', 'సికింద్రాబాద్': 'Secunderabad', 'కోఠీ': 'Koti', 'అమీర్': 'Ameer',
  'పేట్': 'pet', 'సేవ్': 'sev', 'స్క్రీన్': 'screen', 'యాప్': 'app', 'ఐడియా': 'idea', 'మెసేజ్': 'message', 'సీనియర్': 'senior', 'కాలేజీ': 'college', 'హైలైట్స్': 'highlights', 'బ్రో': 'bro', 'ఛాంపియన్': 'champion',
  'హెడ్లైన్': 'headline', 'ఛార్జీ': 'charge', 'క్యాచ్': 'catch', 'ట్యాప్': 'tap', 'స్లాట్': 'slot', 'డెడ్లైన్': 'deadline', 'కాపీ': 'copy', 'స్కెచ్': 'sketch', 'ఆర్చీ': 'arch', 'షేడింగ్': 'shading', 'గుల్జార్': 'Gulzar',
  'హౌజ్': 'Houz', 'క్లియర్': 'clear', 'విజిటర్': 'visitor', 'రూల్': 'rule', 'హలో': 'hello', 'వాక్': 'walk', 'ప్లీజ్': 'please', 'ఓకే': 'okay', 'మేడం': 'madam', 'లైసెన్స్': 'licence', 'లైన్': 'line', 'హెల్ప్': 'help',
  'ఉస్మానియా': 'Osmania', 'ఇరానీ': 'Irani', 'హైదరాబాద్': 'Hyderabad', 'బిర్యానీ': 'biryani', 'చాయ్': 'chai', 'రూపాయలు': 'rupayalu', 'యాదగిరి': 'Yadagiri', 'తిరుపతి': 'Tirupati', 'నోటు': 'note', 'బెస్ట్': 'best',
  'గుడ్': 'good', 'షాప్': 'shop', 'ట్యాక్స్': 'tax', 'ఫ్రెష': 'fresh', 'క్లాస్': 'class', 'డ్రైవ్': 'drive', 'డ్రైవర్': 'driver', 'ఛార్జ్': 'charge', 'సిగ్నల్': 'signal', 'ఫొటో': 'photo', 'ఈవెంట్': 'event', 'డైరెక్ట్': 'direct',
  'ఎక్స్': 'x', 'గ్లాస్': 'glass', 'సెట్': 'set', 'డిజైన్': 'design', 'ఎంట్రీ': 'entry', 'పరీక్షకు': 'pareekshaku', 'ప్లాట్': 'plat', 'మార్కెట్': 'market', 'కిలోమీటర్': 'kilometre', 'సైజు': 'size', 'సైజ': 'size', 'స్టాండ్': 'stand',
  'స్టార్ట్': 'start', 'రెసిపీ': 'recipe', 'వీడియో': 'video', 'ఫోల్': 'fol', 'నెక్స్ట్': 'next', 'లాస్ట్': 'last', 'ఫ్రెషర్స్': 'freshers', 'బోనస్': 'bonus', 'జోష్': 'josh', 'ఛీ': 'chee', 'క్యూ': 'queue',
};
Object.assign(STEMS, {
  'క్రికెట్': 'cricket', 'కెప్టెన్': 'captain', 'బ్యాటింగ్': 'batting', 'బౌలింగ్': 'bowling', 'అవుట్': 'out', 'నాట్': 'not', 'హోటల్': 'hotel', 'టిఫిన్': 'tiffin', 'గల్లీ': 'gully', 'స్టేషన్': 'station',
  'స్టాప్': 'stop', 'పార్కింగ్': 'parking', 'లంచ్': 'lunch', 'ప్యాసింజర్': 'passenger', 'పికప్': 'pickup', 'పాయింట్': 'point', 'జాబ్': 'job', 'కవర్': 'cover', 'షాట్': 'shot', 'అంకుల్': 'uncle', 'బ్యాట్': 'bat',
  'లీటర్': 'litre', 'రింగ్': 'ring', 'రోడ్': 'road', 'బ్రిడ్జ్': 'bridge', 'లైట్': 'light', 'వాచ్': 'watch', 'ప్లేస్మెంట్': 'placement', 'ఆంటీ': 'aunty', 'రేటు': 'rate', 'ఆర్చీ': 'archi', 'లాడ్': 'Laad', 'బజార్': 'Bazaar',
});
const stemKeys = Object.keys(STEMS).sort((a, b) => b.length - a.length);
const vowelSign = (c) => SIGN[c];
export function roman(te) {
  return te.replace(/[ఀ-౿‌‍]+/g, (raw) => {
    const word = raw.replace(/[‌‍]/g, '');
    if (EXACT[word]) return EXACT[word];
    for (const s of stemKeys) if (word.startsWith(s)) { const rest = word.slice(s.length); return STEMS[s] + (['కి', 'కు', 'లో', 'తో', 'ని'].includes(rest) ? ' ' : '') + (rest ? conv(rest) : ''); }
    return conv(word);
  });
}
function conv(w) {
  const cs = [...w.replace(/[‌‍]/g, '')];
  let out = '';
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i], nx = cs[i + 1];
    if (IND[c] !== undefined) out += IND[c];
    else if (CONS[c] !== undefined) {
      out += CONS[c];
      if (nx === '్') { i++; continue; }
      if (nx && SIGN[nx] !== undefined) { out += (i + 2 === cs.length && cs.length > 2 && (nx === 'ీ' || nx === 'ూ')) ? (nx === 'ీ' ? 'i' : 'u') : SIGN[nx]; i++; continue; }
      out += 'a';
    } else if (c === 'ం') {
      const n = cs[i + 1];
      out += (!n || 'పఫబభమ'.includes(n)) ? 'm' : 'n';
    } else if (c === 'ః') out += 'h';
    else if (SIGN[c] !== undefined) out += SIGN[c];
  }
  // a bare final consonant never keeps the inherent "a"
  return out;
}
const cap = (s) => s.replace(/(^|[.!?]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase());
const ln = (a) => (typeof a === 'string' ? { text: a, roman: a, en: a } : { text: a[0], roman: cap(roman(a[0])), en: a[1] });
const norm = (s) => s.toLowerCase().replace(/[.,!?'"]/g, '').replace(/\s+/g, ' ').trim();
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).slice(0, 7).join('_');
const hasTe = (s) => /[ఀ-౿]/.test(s);

/**
 * S(id, npcLine [te, en], instruction, suggestTe, accept[], [hint1, hint2], onValid [te, en], onRetry [te, en])
 * suggestTe: the Telugu script of the phrase to say; its roman is made automatically. accept: romanised / Tenglish variants plus
 * one Telugu-script variant (the suggested phrase itself is added automatically). Hint 3 is always the full phrase. The intent is the
 * instruction as snake_case.
 */
export const step = (id, npc, instruction, suggestTe, accept, hints, onValid, onRetry) => {
  const sroman = cap(roman(suggestTe));
  const acc = [...new Set([norm(sroman), suggestTe.replace(/[.!?]$/, ''), ...accept, sroman, norm(sroman) + ' please'])].slice(0, 10);
  return {
    id, npc: ln(npc), instruction, suggest: { roman: sroman, text: suggestTe }, accept: acc, intent: slug(instruction),
    hints: [hints[0], hints[1], `Say: "${sroman}"`], onValid: ln(onValid), onRetry: ln(onRetry),
  };
};

// voice presets: m man, f woman, k kid, o old man/woman
const VOICES = { m: { rate: 1.0, pitch: 0.9 }, f: { rate: 1.0, pitch: 1.15 }, k: { rate: 1.1, pitch: 1.3 }, o: { rate: 0.9, pitch: 0.85 }, q: { rate: 1.15, pitch: 1.0 } };

/** dialogue(id, { name, role, site, diff, voice, persona, goal, steps, outro [te, en], learned: [[roman, en]...], again [te, en], lang?, place?, tutorial? }) */
export const dialogue = (id, o) => ({
  id, name: o.name, role: o.role, lang: o.lang ?? 'te', site: o.site, difficulty: o.diff ?? 2,
  ...(o.place ? { place: o.place } : {}), ...(o.tutorial ? { tutorial: true } : {}),
  voice: typeof o.voice === 'string' ? VOICES[o.voice] : (o.voice ?? { rate: 1.0, pitch: 1.0 }),
  persona: o.persona, goal: o.goal, steps: o.steps,
  outro: ln(o.outro), learned: o.learned.map(([r, en]) => ({ roman: r, en })), again: ln(o.again),
});

/** P(id, name, role, site, voice, goal, steps[], outro [te, en], learned [[roman, en]...], again [te, en], diff?) for the single-person cast dialogues. */
export const P = (id, name, role, site, voice, goal, steps, outro, learned, again, diff = 1, lang) =>
  dialogue(id, { name, role, site, voice, persona: `${name}, ${role}, at ${site}.`, goal, steps, outro, learned, again, diff, lang });
