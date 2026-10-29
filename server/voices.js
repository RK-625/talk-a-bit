/**
 * server/voices.js: the live NPC voice catalogue. Node only, never imported by src/.
 *   buildLines()  -> Map<lineId, { text, lang, speaker, model, pace, world, npcId, g, age }> for every spoken NPC line.
 *   The browser only ever sends a lineId (GET /api/tts?id=...); the text, speaker, model and pace come from here, never from the client.
 *
 * Line ids (wired in src/game/talk/talk.js):
 *   <world>/<npcId>/<stepId>-npc | -valid | -retry,  <world>/<npcId>/outro,  <world>/<npcId>/again,
 *   <world>/_greetings/g<N>-<m|f>-<kid|teen|adult|elder> (ambient greeting, voiced to match the passer-by),  shared/greetings-en/g<N>-<m|f>-<age> (English).
 *
 * Casting: scripts/voices.people.json gives every NPC a gender (f|m) and an age (kid|teen|adult|elder). A voice is chosen from VOICES by
 * (language, gender, age): NEVER across gender, the closest age wins, and within a world the least-used fitting voice is taken so people
 * do not all share one. An NPC's `voiceId` field overrides the casting. Voice catalogue:
 * https://docs.sarvam.ai/api/api-guides-tutorials/text-to-speech/voices (bulbul:v4-flash ids are <name>_<lang>_<style>, bulbul:v3 uses short names).
 * Malayalam is not on v4-flash, so it uses bulbul:v3. Speaker ids are lowercase.
 */
import fs from 'node:fs';
import mumbai, * as mumbaiMod from '../src/worlds/mumbai/dialogue/index.js';
import bengaluru, * as bengaluruMod from '../src/worlds/bengaluru/dialogue/index.js';
import chennai, * as chennaiMod from '../src/worlds/chennai/dialogue/index.js';
import delhi, * as delhiMod from '../src/worlds/delhi/dialogue/index.js';
import hyderabad, * as hyderabadMod from '../src/worlds/hyderabad/dialogue/index.js';
import kerala, * as keralaMod from '../src/worlds/kerala/dialogue/index.js';
import { GREETINGS_EN } from '../src/game/talk/sampleDialogue.js';

import { LEARNER_SPEED } from '../src/game/talk/learnerSpeed.js'; // learners need slower, clearer speech; the browser fallback in src/game/talk/speak.js uses the same number
export { LEARNER_SPEED };
export const V4 = 'bulbul:v4-flash', V3 = 'bulbul:v3';
export const LANG_CODE = { hi: 'hi-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', ml: 'ml-IN', en: 'en-IN' };
export const RUPEES_PER_10K = { [V4]: 20, [V3]: 30 };
export const SAMPLE_RATE = 24000;

// ---------------- the voice table ----------------
// [speaker id, model, gender m|f, ages (k kid, a adult, o elder; a voice may list several), tags]. Ages are the apparent age of the voice.
const v3 = (id, g, ages) => [id, V3, g, ages];
export const V3_POOL = [
  v3('rahul', 'm', 'a'), v3('amit', 'm', 'a'), v3('aditya', 'm', 'a'), v3('manan', 'm', 'a'), v3('sumit', 'm', 'a'), v3('kabir', 'm', 'a'), v3('dev', 'm', 'a'),
  v3('ratan', 'm', 'o'), v3('anand', 'm', 'o'), v3('ashutosh', 'm', 'o'), v3('mani', 'm', 'ao'), v3('gokul', 'm', 'ao'), v3('vijay', 'm', 'a'),
  v3('rehan', 'm', 'k'), v3('sunny', 'm', 'k'),
  v3('priya', 'f', 'a'), v3('kavya', 'f', 'a'), v3('ritu', 'f', 'a'), v3('shreya', 'f', 'a'), v3('neha', 'f', 'a'), v3('shruti', 'f', 'a'), v3('suhani', 'f', 'a'),
  v3('simran', 'f', 'o'), v3('roopa', 'f', 'o'), v3('kavitha', 'f', 'ao'), v3('rupali', 'f', 'ao'),
  v3('tanya', 'f', 'k'), v3('pooja', 'f', 'k'),
];
export const VOICES = {
  hi: [
    ['rahul_hi_conversational', V4, 'm', 'a'], ['amit_hi_conversational', V4, 'm', 'a'], ['aayan_hi_conversational', V4, 'm', 'a'], ['kabir_hi_conversational', V4, 'm', 'a'],
    ['manan_hi_conversational', V4, 'm', 'a'], ['sumit_hi_conversational', V4, 'm', 'a'], ['mohit_hi_conversational', V4, 'm', 'a'], ['tarun_hi_conversational', V4, 'm', 'a'],
    ['aditya_hi_conversational', V4, 'm', 'a'],
    ['ratan_hi_devotional', V4, 'm', 'o', ['priest']], ['nachiket_hi_devotional', V4, 'm', 'a', ['priest']],
    ['anand_hi_documentary', V4, 'm', 'o'], ['mahesh_hi_documentary', V4, 'm', 'o'], ['ratan_hi_documentary', V4, 'm', 'o'], ['ashutosh_hi_conversational', V4, 'm', 'ao'],
    ['mani_hi_conversational', V4, 'm', 'ao'], ['ashok_hi_character', V4, 'm', 'o'],
    ['kunal_hi_kids', V4, 'm', 'k'],
    ['kavya_hi_conversational', V4, 'f', 'a'], ['shreya_hi_conversational', V4, 'f', 'a'], ['ritu_hi_conversation', V4, 'f', 'a'], ['sarika_hi_conversation', V4, 'f', 'a'],
    ['roopa_hi_conversational', V4, 'f', 'a'], ['shalini_hi_companion', V4, 'f', 'a'], ['sanchita_hi_assistant', V4, 'f', 'a'], ['aparna_hi_customer', V4, 'f', 'a'],
    ['simran_hi_conversation', V4, 'f', 'o'], ['suman_hi_companion', V4, 'f', 'o'], ['roopa_hi_companion', V4, 'f', 'o'],
    ['chhavi_hi_kids', V4, 'f', 'k'], ['ritu_hi_kids', V4, 'f', 'k'],
  ],
  en: [
    ['dev_en_conversational', V4, 'm', 'a'], ['deven_en_conversation', V4, 'm', 'a'], ['shubh_en_narration', V4, 'm', 'a'], ['ojas_en_social', V4, 'm', 'a'],
    ['kalpit_en_edtech', V4, 'm', 'a'], ['sarang_en_narration', V4, 'm', 'a'], ['ashwin_en_sports', V4, 'm', 'a'],
    ['girish_en_documentary', V4, 'm', 'o'], ['shubh_en_narration_gentle', V4, 'm', 'o'], ['sunny_en_social', V4, 'm', 'k'],
    ['amelia_en_conversational', V4, 'f', 'a'], ['sophia_en_conversational', V4, 'f', 'a'], ['roopa_en_conversational', V4, 'f', 'a'], ['zarina_en_conversation', V4, 'f', 'a'],
    ['simran_en_conversation', V4, 'f', 'a'], ['shalini_en_customer', V4, 'f', 'a'], ['aparna_en_edtech', V4, 'f', 'a'],
    ['simran_en_narration', V4, 'f', 'o'], ['chandrika_en_stories', V4, 'f', 'o'], ['nupur_en_kids', V4, 'f', 'k'],
  ],
  // Kannada: v4-flash has Chaitra (f), Suchitra (f, narration), Chetan (m) only; the rest comes from bulbul:v3 (its short names work in every v3 language).
  kn: [['chetan_kn_conversation', V4, 'm', 'a'], ['chaitra_kn_conversation', V4, 'f', 'a'], ['suchitra_kn_narration', V4, 'f', 'ao'], ...V3_POOL],
  // Tamil: v4-flash has only male voices (Gokul, Vijay).
  ta: [['gokul_ta_narration', V4, 'm', 'ao'], ['vijay_ta_narration', V4, 'm', 'a'], ...V3_POOL],
  // Telugu: v4-flash has Kavitha (f), Pooja (f), Tarun (m, narration).
  te: [['kavitha_te_conversation', V4, 'f', 'ao'], ['pooja_te_conversation', V4, 'f', 'a'], ['tarun_te_narration', V4, 'm', 'a'], ...V3_POOL],
  // Malayalam: not on v4-flash, bulbul:v3 only.
  ml: [...V3_POOL],
};
// speaker|lang pairs Sarvam rejected in `npm run voices -- --validate` (they are never cast)
export const BLOCKED = new Set([]);
const ALL = new Map();
for (const list of [...Object.values(VOICES), V3_POOL]) for (const v of list) ALL.set(v[0], v);
const speakerModel = (id) => ALL.get(id)?.[1] ?? (/^[a-z]+_[a-z]{2}_/.test(id) ? V4 : V3);
export const speakerGender = (id) => ALL.get(id)?.[2] ?? null;

// ---------------- casting ----------------
const WANT = { kid: 'k', teen: 'a', adult: 'a', elder: 'o' };
/** how far a voice's apparent age is from the wanted age (0 exact); Infinity = never use (a kid voice for an adult, an adult voice for a kid is allowed only as a last resort) */
function ageGap(voiceAges, age) {
  const want = WANT[age];
  if (voiceAges.includes(want)) return 0;
  if (age === 'kid') return 6;
  if (voiceAges.includes('k')) return Infinity;
  if (age === 'elder') return 2; // an adult voice for an old person
  if (age === 'teen' || age === 'adult') return voiceAges.includes('a') ? 0 : 1; // an elder-only voice for a younger adult
  return 3;
}
const hashOf = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const PRIEST_RE = /\b(priest|pandit|panditji|pujari|archaka|poojari)\b/i;

/** chooses a voice for (lang, gender, age); `usage` counts how often each speaker is already used in this world so the cast is spread out */
export function chooseVoice(lang, g, age, usage, { key = '', priest = false } = {}) {
  const ok = (v) => v[2] === g && !BLOCKED.has(`${v[0]}|${lang}`);
  let pool = (VOICES[lang] ?? VOICES.hi).filter(ok);
  const fits = (list) => list.filter((v) => ageGap(v[3], age) <= 1);
  if (!fits(pool).length) pool = [...pool, ...V3_POOL.filter((v) => ok(v) && !pool.includes(v))]; // the language has no fitting voice: same gender on the other model
  if (age === 'kid' && !fits(pool).length && lang === 'hi') pool = VOICES.hi.filter(ok);
  const h = hashOf(key);
  const scored = pool.map((v, i) => ({ v, s: ageGap(v[3], age) * 100 + (usage[v[0]] ?? 0) + (v[1] === V3 ? 2 : 0) - (priest && v[4]?.includes('priest') ? 50 : 0), t: (i + h) % pool.length }))
    .filter((x) => Number.isFinite(x.s)).sort((a, b) => a.s - b.s || a.t - b.t);
  if (!scored.length) throw new Error(`no ${g} voice for ${lang}/${age}`);
  return scored[0].v;
}

const PEOPLE = JSON.parse(fs.readFileSync(new URL('../scripts/voices.people.json', import.meta.url), 'utf8'));
const WORLDS = { mumbai: [mumbai, mumbaiMod], bengaluru: [bengaluru, bengaluruMod], chennai: [chennai, chennaiMod], delhi: [delhi, delhiMod], hyderabad: [hyderabad, hyderabadMod], kerala: [kerala, keralaMod] };

export const paceFor = (rate) => Math.min(1.2, Math.max(0.6, (Number(rate) || 1) * LEARNER_SPEED));
const clean = (s) => String(s).replace(/[^\w.-]/g, '_');

let built = null;
const AGES = ['kid', 'teen', 'adult', 'elder'];

export function buildLines() {
  if (built) return built.lines;
  const lines = new Map(), npcs = [], usage = {};
  const useOf = (w) => (usage[w] ??= {});
  const cast = (world, key, lang, g, age, { voiceId = null, priest = false } = {}) => {
    const u = useOf(world);
    let speaker, model, why;
    if (voiceId) { speaker = String(voiceId).toLowerCase(); model = speakerModel(speaker); why = 'voiceId'; }
    else { const v = chooseVoice(lang, g, age, u, { key, priest }); speaker = v[0]; model = v[1]; why = 'cast'; }
    u[speaker] = (u[speaker] ?? 0) + 1;
    return { speaker, model, why };
  };
  for (const world of Object.keys(WORLDS).sort()) {
    const [dialogues, mod] = WORLDS[world];
    const langCount = {};
    for (const d of Object.values(dialogues)) if (d.lang !== 'en') langCount[d.lang] = (langCount[d.lang] ?? 0) + 1;
    const worldLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'hi';
    for (const [key, d] of Object.entries(dialogues)) {
      const npcId = d.id ?? key, lang = d.lang ?? 'hi', person = PEOPLE[`${world}/${npcId}`];
      if (!person) throw new Error(`voices.people.json has no entry for ${world}/${npcId}; run node scripts/voices.people.check.mjs --write`);
      const priest = PRIEST_RE.test(`${d.role ?? ''} ${d.name ?? ''} ${key}`);
      const sp = cast(world, `${world}/${npcId}`, lang, person.g, person.age, { voiceId: d.voiceId, priest });
      const pace = paceFor(d.voice?.rate);
      npcs.push({ world, npcId, name: d.name, lang, g: person.g, age: person.age, ...sp, pace });
      const add = (id, line) => {
        const text = (line?.text || line?.roman || '').trim();
        if (text) lines.set(id, { text, lang, speaker: sp.speaker, model: sp.model, pace, world, npcId, g: person.g, age: person.age });
      };
      for (const [si, st] of Array.from(d.steps ?? []).entries()) {
        if (!st) { console.warn(`! ${world}/${npcId}: steps[${si}] is empty (data bug, line skipped)`); continue; }
        add(`${world}/${npcId}/${st.id}-npc`, st.npc); add(`${world}/${npcId}/${st.id}-valid`, st.onValid); add(`${world}/${npcId}/${st.id}-retry`, st.onRetry);
      }
      add(`${world}/${npcId}/outro`, d.outro); add(`${world}/${npcId}/again`, d.again);
    }
    // ambient greetings: one variant per (gender, age) of the passer-by, so a girl gets a girl's voice and an uncle an older man's
    (mod.GREETINGS ?? []).forEach((g, i) => {
      const text = (g.text || g.roman || '').trim();
      if (text) for (const gender of ['m', 'f']) for (const age of AGES) {
        const sp = cast(world, `${world}/_greeter-${gender}-${age}`, worldLang, gender, age);
        lines.set(`${world}/_greetings/g${i}-${gender}-${age}`, { text, lang: worldLang, ...sp, pace: paceFor(1), world, npcId: '_greetings', g: gender, age });
      }
    });
  }
  GREETINGS_EN.forEach((g, i) => {
    const text = (g.text || g.roman || '').trim();
    if (text) for (const gender of ['m', 'f']) for (const age of AGES) {
      const sp = cast('shared', `shared/_greeter-en-${gender}-${age}`, 'en', gender, age);
      lines.set(`shared/greetings-en/g${i}-${gender}-${age}`, { text, lang: 'en', ...sp, pace: paceFor(1), world: 'shared', npcId: '_greetings', g: gender, age });
    }
  });
  built = { lines, npcs, usage };
  return lines;
}
/** the casting report: one entry per NPC (+ the usage counts per world) */
export function castReport() { buildLines(); return built; }
export const lineInfo = (id) => (typeof id === 'string' && id.length < 200 ? buildLines().get(id) ?? null : null);
