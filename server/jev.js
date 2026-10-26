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
import { toRoman, hasKannada } from '../src/game/translit.js';

// ---- thresholds (tune with `npm run jev:eval`) ----
export const DOES_TASK_MIN = 0.7;       // does_task >= this -> the reply does the task
export const PARTIAL_MIN = 0.3;         // does_task in [PARTIAL_MIN, DOES_TASK_MIN) -> 'partial', below -> 'off_task'
export const UNRELATED_MAX = 0.5;       // has_unrelated_content must be below this
export const RUDE_MAX = 0.7;            // is_rude must be below this
export const HINDI_PROB_MIN = 0.5;      // lang 'hi': P(reply_language = hindi) must be at least this (pure English scored ~0.2, Hinglish ~0.9)
export const HINDI_OK_EN_TASK = 2;      // lang 'en': a 'hindi' pick is tolerated when does_task is at least this (2 = never: Hindi to an English NPC retries)
export const KANNADA_PROB_MIN = 0.5;     // lang 'kn': P(reply_language = kannada) must be at least this
export const DEFAULT_MODEL = 'jev-latest';
export const SDK_TIMEOUT_MS = 6000;
export const SDK_RETRIES = 1;

const SETTING = 'A language-practice game set in Mumbai. The player (Chotu, a chai-seller kid) is talking to a local.';
const SETTING_BLR = 'A language-practice game set in Bengaluru. The player (Rohan, a 22-year-old tech intern from Delhi, new in the city and learning Kannada) is talking to a local.';
const hasDevanagari = (s) => /[ऀ-ॿ]/.test(s);
const EXPECTED = { hi: 'Hindi (romanised Hindi, Devanagari or Hinglish all count)', kn: 'Kannada (Kannada script, romanised Kannada or Kanglish with a few English words all count)', en: 'English' };

export function buildRequest({ lang = 'hi', worldId, persona, goal, step, npcName, npcRole, reply }) {
  const r = String(reply ?? '').trim();
  const examples = [step.suggest?.roman, ...(step.accept ?? [])].filter(Boolean);
  const state = {
    setting: lang === 'kn' || worldId === 'bengaluru' ? SETTING_BLR : SETTING,
    npc: { name: npcName ?? 'a local', role: npcRole ?? 'local', persona: persona ?? '' },
    conversation_goal: goal ?? '',
    npc_line: { original: step.npc?.text, romanised: step.npc?.roman, english: step.npc?.en },
    task_for_player: step.instruction,
    expected_language: EXPECTED[lang] ?? EXPECTED.en,
    example_good_replies: examples,
    player_reply: r,
    ...(hasDevanagari(r) || hasKannada(r) ? { player_reply_romanised: toRoman(r) } : {}),
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
      : choice('Which language is `player_reply` written in? Romanised Hindi counts as Hindi.', {
        hindi: 'Hindi or Hinglish, any script', english: 'English only', other: 'Another language', none: 'Not language / gibberish',
      }),
    is_rude: noul('Is `player_reply` rude or insulting to the NPC?'),
  };
  return { state, questions };
}

const r2 = (n) => (typeof n === 'number' ? +n.toFixed(2) : n);

/** pure decision from the raw answers */
export function decide(a, lang = 'hi') {
  const task = a.does_task.noul, extra = a.has_unrelated_content.noul, rude = a.is_rude.noul;
  const lc = a.reply_language.choice, pHindi = a.reply_language.probabilities?.hindi ?? (lc === 'hindi' ? 1 : 0);
  const pKn = a.reply_language.probabilities?.kannada ?? (lc === 'kannada' ? 1 : 0);
  const langOk = lang === 'kn'
    ? lc === 'kannada' || pKn >= KANNADA_PROB_MIN
    : lang === 'hi'
    ? lc === 'hindi' || pHindi >= HINDI_PROB_MIN
    : lc === 'english' || (lc === 'hindi' && task >= HINDI_OK_EN_TASK);
  let reason = null;
  if (rude >= RUDE_MAX) reason = 'rude';
  else if (!langOk) reason = lc === 'none' ? 'off_task' : 'language';
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
      const d = decide(res.answers, payload.lang ?? 'hi');
      return { ...d, model: res.model, answers: res.answers };
    },
  };
}
