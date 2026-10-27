/**
 * server/jev.js: the Jev (TypeSafe AI "System One") judge for the player's reply. SERVER ONLY (Node): the SDK refuses to run in
 * a browser and the API key must never reach one. Imported by vite.config.js (dev proxy) and scripts/jev-eval.mjs.
 * Jev only judges; it never writes dialogue. See docs/JEV.md.
 *
 *   createJev({ apiKey, model?, timeoutMs?, maxRetries? }) -> { model, classify(payload, { signal }) }
 *   decide(answers) -> { verdict, reason, confidence }     (pure, unit-testable)
 *   buildRequest(payload) -> { state, questions }
 */
import { TypeSafeClient, noul, choice } from '@typesafe-ai/sdk';
import { toRoman, hasKannada, hasTamil, hasTelugu, hasMalayalam } from '../src/game/translit.js';

// ---- thresholds (tune with `npm run jev:eval`) ----
export const DOES_TASK_MIN = 0.7;       // does_task >= this -> the reply does the task
export const PARTIAL_MIN = 0.3;         // does_task in [PARTIAL_MIN, DOES_TASK_MIN) -> 'partial', below -> 'off_task'
export const UNRELATED_MAX = 0.5;       // has_unrelated_content must be below this
export const RUDE_MAX = 0.7;            // is_rude must be below this
export const HINDI_PROB_MIN = 0.5;      // lang 'hi': P(reply_language = hindi) must be at least this (pure English scored ~0.2, Hinglish ~0.9)
export const HINDI_OK_EN_TASK = 2;      // lang 'en': a 'hindi' pick is tolerated when does_task is at least this (2 = never: Hindi to an English NPC retries)
export const KANNADA_PROB_MIN = 0.5;     // lang 'kn': P(reply_language = kannada) must be at least this
export const TAMIL_PROB_MIN = 0.75;      // lang 'ta': P(reply_language = tamil) must be at least this (checked on the probability, not the argmax: Hindi with a Tamil place name scored tamil 0.61; genuine Tamil/Tanglish scored >= 0.97)
export const TELUGU_PROB_MIN = 0.75;     // lang 'te': same rule for Telugu (Hindi with a Telugu place name scored hindi 0.64; genuine Telugu/Tenglish scored >= 0.89)
export const MALAYALAM_PROB_MIN = 0.75;  // lang 'ml': same rule for Malayalam (checked on the probability, not the argmax: a Tamil reply scored malayalam 0.35, Hindi with a Kochi place name 0.43; genuine Malayalam/Manglish scored >= 0.90)
export const DEFAULT_MODEL = 'jev-latest';
export const SDK_TIMEOUT_MS = 6000;
export const SDK_RETRIES = 1;

const SETTING = 'A language-practice game set in Mumbai. The player (Chotu, a chai-seller kid) is talking to a local.';
const SETTING_BLR = 'A language-practice game set in Bengaluru. The player (Rohan, a 22-year-old tech intern from Delhi, new in the city and learning Kannada) is talking to a local.';
const SETTING_CHE = 'A language-practice game set in Chennai. The player (Meera, a 26-year-old food blogger from Pune on a Chennai food trail, learning Tamil to talk to vendors) is talking to a local.';
const SETTING_HYD = 'A language-practice game set in Hyderabad. The player (Sameer, a 22-year-old fresh engineering graduate who just moved to Hyderabad for a job hunt and is learning Telugu) is talking to a local.';
const SETTING_KER = 'A language-practice game set in Kochi, Kerala. The player (Ananya, a 24-year-old backpacker from Jaipur travelling through Kochi and the backwaters, learning Malayalam on the road) is talking to a local.';
const SETTING_DEL = 'A language-practice game set in Delhi. The player (Rahul, a 23-year-old UPSC aspirant from Patna, in Delhi for civil-services coaching) is talking to a local. Delhi Hindi, with light Punjabi words like paaji, oye or chak de, counts as Hindi.';
const hasDevanagari = (s) => /[ऀ-ॿ]/.test(s);
const EXPECTED = { hi: 'Hindi (romanised Hindi, Devanagari or Hinglish all count)', kn: 'Kannada (Kannada script, romanised Kannada or Kanglish with a few English words all count)', ta: 'Tamil (Tamil script, romanised Tamil or Tanglish with a few English words all count)', te: 'Telugu (Telugu script, romanised Telugu or Tenglish with a few English words all count)', ml: 'Malayalam (Malayalam script, romanised Malayalam or Manglish with a few English words all count)', en: 'English' };

export function buildRequest({ lang = 'hi', worldId, persona, goal, step, npcName, npcRole, reply }) {
  const r = String(reply ?? '').trim();
  const examples = [step.suggest?.roman, ...(step.accept ?? [])].filter(Boolean);
  const state = {
    setting: worldId === 'kerala' || lang === 'ml' ? SETTING_KER : worldId === 'delhi' ? SETTING_DEL : worldId === 'chennai' || lang === 'ta' ? SETTING_CHE : worldId === 'hyderabad' || lang === 'te' ? SETTING_HYD : lang === 'kn' || worldId === 'bengaluru' ? SETTING_BLR : SETTING,
    npc: { name: npcName ?? 'a local', role: npcRole ?? 'local', persona: persona ?? '' },
    conversation_goal: goal ?? '',
    npc_line: { original: step.npc?.text, romanised: step.npc?.roman, english: step.npc?.en },
    task_for_player: step.instruction,
    expected_language: EXPECTED[lang] ?? EXPECTED.en,
    example_good_replies: examples,
    player_reply: r,
    ...(hasDevanagari(r) || hasKannada(r) || hasTamil(r) || hasTelugu(r) || hasMalayalam(r) ? { player_reply_romanised: toRoman(r) } : {}),
    note: 'The reply was dictated with speech-to-text: expect spelling mistakes, missing punctuation, mixed scripts.',
  };
  const questions = {
    does_task: noul(
      'Does `player_reply` do what `task_for_player` asks, as a reply to `npc_line`? Wording may differ from `example_good_replies`; the meaning must match.',
      { true: 'Says the thing the task asks for (same meaning as an example)', false: 'Says something else, only part of it, the opposite, or nothing meaningful' }),
    has_unrelated_content: noul('Does `player_reply` also contain words or sentences unrelated to this conversation?'),
    reply_language: lang === 'kn'
      ? choice('Which language is `player_reply` written in? Romanised Kannada counts as Kannada.', {
        kannada: 'Kannada, romanised Kannada or Kanglish (Kannada with a few English words), any script', hindi: 'Hindi or Hinglish, any script', english: 'English only', other: 'Another language', none: 'Not language / gibberish',
      })
      : lang === 'ta'
      ? choice('Which language is `player_reply` written in? Romanised Tamil counts as Tamil.', {
        tamil: 'Tamil, romanised Tamil or Tanglish (Tamil with a few English words), any script', hindi: 'Hindi or Hinglish, any script', english: 'English only', malayalam: 'Malayalam, romanised Malayalam or Manglish', other: 'Another language (Kannada, Telugu...)', none: 'Not language / gibberish',
      })
      : lang === 'ml'
      ? choice('Which language is `player_reply` written in? Romanised Malayalam (Manglish) counts as Malayalam.', {
        malayalam: 'Malayalam, romanised Malayalam or Manglish (Malayalam with a few English words), any script', hindi: 'Hindi or Hinglish, any script', english: 'English only', tamil: 'Tamil, romanised Tamil or Tanglish (close to Malayalam but a different language: e.g. "kudunga", "venum", "enga", "podunga")', other: 'Another language (Kannada, Telugu...)', none: 'Not language / gibberish',
      })
      : lang === 'te'
      ? choice('Which language is `player_reply` written in? Romanised Telugu counts as Telugu.', {
        telugu: 'Telugu, romanised Telugu or Tenglish (Telugu with a few English words), any script', hindi: 'Hindi or Hinglish, any script (Urdu-style Hyderabadi Hindi counts as Hindi)', english: 'English only', other: 'Another language (Kannada, Tamil, Malayalam...)', none: 'Not language / gibberish',
      })
      : choice('Which language is `player_reply` written in? Romanised Hindi counts as Hindi.', {
        hindi: 'Hindi or Hinglish, any script', english: 'English only', other: 'Another language', none: 'Not language / gibberish',
      }),
    is_rude: noul('Is `player_reply` rude or insulting to the NPC?'),
  };
  return { state, questions };
}

const r2 = (n) => (typeof n === 'number' ? +n.toFixed(2) : n);

/** pure decision from the raw answers */
// Romanised Tamil and Malayalam are close enough that Jev labels one as the other. Words that only one of them uses
// (in Latin or in its own script) settle it: a Tamil giveaway with no Malayalam one is the wrong language, and vice versa.
const TAMIL_ONLY = /\b(kudunga|kodunga|venum|vendam|enakku|enga|podunga|sollunga|irukku|irukka|illai|romba|vaanga|paarunga|poganum|varuveengala|seri)\b|வேணும்|எனக்கு|கொடுங்க|இல்லை/i;
const MALAYALAM_ONLY = /\b(tharamo|tharumo|venda|enikku|chetta|chettaa|chechi|undo|aanu|alle|evide|ningal|pokaam|kittumo|varumo|mathi)\b|വേണം|എനിക്ക്|ചേട്ടാ|ഉണ്ടോ/i;
function wrongSibling(reply, lang) {
  const r = String(reply ?? '');
  if (lang === 'ml') return TAMIL_ONLY.test(r) && !MALAYALAM_ONLY.test(r);
  if (lang === 'ta') return MALAYALAM_ONLY.test(r) && !TAMIL_ONLY.test(r);
  return false;
}

export function decide(a, lang = 'hi', reply = null) {
  const task = a.does_task.noul, extra = a.has_unrelated_content.noul, rude = a.is_rude.noul;
  const lc = a.reply_language.choice, pHindi = a.reply_language.probabilities?.hindi ?? (lc === 'hindi' ? 1 : 0);
  const pKn = a.reply_language.probabilities?.kannada ?? (lc === 'kannada' ? 1 : 0);
  const pTa = a.reply_language.probabilities?.tamil ?? (lc === 'tamil' ? 1 : 0), pTe = a.reply_language.probabilities?.telugu ?? (lc === 'telugu' ? 1 : 0);
  const pMl = a.reply_language.probabilities?.malayalam ?? (lc === 'malayalam' ? 1 : 0);
  const langOk = lang === 'ml'
    ? pMl >= MALAYALAM_PROB_MIN
    : lang === 'ta'
    ? pTa >= TAMIL_PROB_MIN
    : lang === 'te'
    ? pTe >= TELUGU_PROB_MIN
    : lang === 'kn'
    ? lc === 'kannada' || pKn >= KANNADA_PROB_MIN
    : lang === 'hi'
    ? lc === 'hindi' || pHindi >= HINDI_PROB_MIN
    : lc === 'english' || (lc === 'hindi' && task >= HINDI_OK_EN_TASK);
  let reason = null;
  if (rude >= RUDE_MAX) reason = 'rude';
  else if (!langOk || wrongSibling(reply, lang)) reason = lc === 'none' ? 'off_task' : 'language';
  else if (extra >= UNRELATED_MAX && task >= PARTIAL_MIN) reason = 'extra';
  else if (task < PARTIAL_MIN) reason = 'off_task';
  else if (task < DOES_TASK_MIN) reason = 'partial';
  else if (extra >= UNRELATED_MAX) reason = 'extra';
  return { verdict: reason ? 'retry' : 'valid', reason: reason ?? undefined, confidence: r2(task) };
}

export function summarize(answers) {
  return {
    does_task: r2(answers.does_task.noul), unrelated: r2(answers.has_unrelated_content.noul),
    lang: answers.reply_language.choice, lang_conf: r2(answers.reply_language.probabilities?.[answers.reply_language.choice]), rude: r2(answers.is_rude.noul),
  };
}

export function createJev({ apiKey, model, timeoutMs = SDK_TIMEOUT_MS, maxRetries = SDK_RETRIES }) {
  if (!apiKey) throw new Error('JEV_API_KEY is not set');
  const client = new TypeSafeClient({ apiKey, timeout: timeoutMs, retry: { maxRetries }, defaultModel: model || DEFAULT_MODEL });
  return {
    model: model || DEFAULT_MODEL,
    /** payload: the client's classify() payload (+ optional npcName/npcRole) */
    async classify(payload, { signal } = {}) {
      const reply = String(payload.reply ?? '').trim();
      if (!reply) return { verdict: 'retry', confidence: 0, reason: 'empty', model: null, answers: null };
      const { state, questions } = buildRequest(payload);
      const res = await client.systemOne({ state, questions, model: model || DEFAULT_MODEL }, { signal });
      const d = decide(res.answers, payload.lang ?? 'hi', payload.reply);
      return { ...d, model: res.model, answers: res.answers };
    },
  };
}
