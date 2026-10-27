/**
 * game/classifier.js: judges the player's reply for the current dialogue step.
 *
 *   classify({ worldId, npcId, lang, persona, goal, step: { id, intent, instruction, npc, suggest, accept }, attempt, reply })
 *     -> Promise<{ verdict: 'valid' | 'retry', confidence?: number, reason?: string, source: 'mock' | 'jev', model?, answers? }>
 *   classify(payload, { signal })  an aborted signal (Esc) rejects with an AbortError; the caller ignores it.
 *
 *   Modes (?classifier=mock|jev). Default: jev when the dev server reports an API key, otherwise mock.
 *   'jev' POSTs to /api/classify (Vite dev middleware -> server/jev.js: the key stays server side). Timeout 8 s, any error:
 *   console warning and fall back to the mock, so the player is never blocked. One dev-console line per verdict ([jev] ...).
 *   reasonLine(reason, lang?) -> short kind English line for the UI ('language' | 'extra' | 'rude' | 'partial').
 *   'mock': normalised fuzzy matching against accept + suggest (tolerant of romanised/Devanagari spelling, punctuation,
 *   Whisper-style casing and filler).
 */
import { tokens, tokenMatch, normalize } from './translit.js';

const TIMEOUT_MS = 8000;
const THRESHOLD = 0.55; // Dice score on fuzzy-matched tokens

/** local classifier */
export function mockClassify({ step, reply, lang }) {
  const r = tokens(reply, lang);
  if (!r.length) return { verdict: 'retry', confidence: 0, reason: 'empty', source: 'mock' };
  const cands = [...(step.accept ?? []), step.suggest?.roman, step.suggest?.text].filter(Boolean);
  let best = 0, bestC = null;
  for (const c of cands) {
    const t = tokens(c, lang);
    if (!t.length) continue;
    const used = new Set(); let m = 0;
    for (const w of r) { const j = t.findIndex((x, i) => !used.has(i) && tokenMatch(w, x)); if (j >= 0) { used.add(j); m++; } }
    const dice = (2 * m) / (r.length + t.length);
    const recall = m / t.length;
    const score = Math.max(dice, m >= 3 ? recall : 0);
    if (score > best) { best = score; bestC = c; }
  }
  return { verdict: best >= THRESHOLD ? 'valid' : 'retry', confidence: +best.toFixed(2), reason: bestC ? `closest: "${bestC}"` : 'no examples', source: 'mock' };
}

let serverHasKey = null; // null = unknown
async function probe() {
  if (serverHasKey !== null) return serverHasKey;
  try {
    const r = await fetch('/api/classify/status', { signal: AbortSignal.timeout(1500) });
    serverHasKey = r.ok && !!(await r.json()).hasKey;
  } catch { serverHasKey = false; }
  return serverHasKey;
}

async function jevClassify(payload, outer) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const onAbort = () => ctrl.abort();
  outer?.addEventListener('abort', onAbort, { once: true });
  try {
    const r = await fetch('/api/classify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    if (j.verdict !== 'valid' && j.verdict !== 'retry') throw new Error('bad verdict');
    return { ...j, source: 'jev' };
  } finally { clearTimeout(timer); outer?.removeEventListener('abort', onAbort); }
}

const f2 = (n) => (typeof n === 'number' ? n.toFixed(2).replace(/^0/, '') : '?');
function logVerdict(j) {
  const a = j.answers;
  if (!import.meta.env?.DEV) return;
  console.log(`[jev] ${j.verdict}${j.reason ? ' (' + j.reason + ')' : ''} ${f2(j.confidence)} (${j.model ?? '?'})` + (a ? ` does_task=${f2(a.does_task?.noul)} extra=${f2(a.has_unrelated_content?.noul)} lang=${a.reply_language?.choice} rude=${f2(a.is_rude?.noul)}` : ''));
}

const REASON_LINES = { language: 'Try it in Hindi.', extra: 'Just the answer, nothing extra.', rude: 'Arre, tameez se!', partial: 'Almost! Say the whole thing.' };
const REASON_LINES_KN = { ...REASON_LINES, language: 'Try it in Kannada.', rude: 'Please be polite!' };
const REASON_LINES_TA = { ...REASON_LINES_KN, language: 'Try it in Tamil.' };
const REASON_LINES_TE = { ...REASON_LINES_KN, language: 'Try it in Telugu.' };
const REASON_LINES_ML = { ...REASON_LINES_KN, language: 'Try it in Malayalam.' };
export const reasonLine = (reason, lang) => ({ kn: REASON_LINES_KN, ta: REASON_LINES_TA, te: REASON_LINES_TE, ml: REASON_LINES_ML }[lang] ?? REASON_LINES)[reason] ?? null;

const requested = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('classifier') : null;
const abortErr = () => { const e = new Error('aborted'); e.name = 'AbortError'; return e; };

export async function classify(payload, { signal } = {}) {
  if (signal?.aborted) throw abortErr();
  const mode = requested === 'mock' || requested === 'jev' ? requested : (await probe()) ? 'jev' : 'mock';
  if (signal?.aborted) throw abortErr();
  if (mode === 'jev') {
    try { const j = await jevClassify(payload, signal); logVerdict(j); return j; }
    catch (e) {
      if (signal?.aborted) throw abortErr(); // cancelled by the player: no fallback
      console.warn('[classifier] jev unavailable (' + (e?.message ?? e) + '); using the local mock');
    }
  }
  return mockClassify(payload);
}

export { normalize };
