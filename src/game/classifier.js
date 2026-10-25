/**
 * game/classifier.js: judges the player's reply for the current dialogue step.
 *
 *   classify({ worldId, npcId, lang, persona, goal, step: { id, intent, instruction, npc, suggest, accept }, attempt, reply })
 *     -> Promise<{ verdict: 'valid' | 'retry', confidence?: number, reason?: string, source: 'mock' | 'jev' }>
 *
 *   Modes (?classifier=mock|jev). Default: jev when the dev server reports an API key, otherwise mock.
 *   'jev' POSTs to /api/classify (Vite dev middleware, vite.config.js: the key stays server side). Timeout 6 s, any error:
 *   console warning and fall back to the mock, so the player is never blocked.
 *   'mock': normalised fuzzy matching against accept + suggest (tolerant of romanised/Devanagari spelling, punctuation,
 *   Whisper-style casing and filler).
 */
import { tokens, tokenMatch, normalize } from './translit.js';

const TIMEOUT_MS = 6000;
const THRESHOLD = 0.55; // Dice score on fuzzy-matched tokens

/** local classifier */
export function mockClassify({ step, reply }) {
  const r = tokens(reply);
  if (!r.length) return { verdict: 'retry', confidence: 0, reason: 'empty', source: 'mock' };
  const cands = [...(step.accept ?? []), step.suggest?.roman, step.suggest?.text].filter(Boolean);
  let best = 0, bestC = null;
  for (const c of cands) {
    const t = tokens(c);
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

async function jevClassify(payload) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch('/api/classify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    if (j.verdict !== 'valid' && j.verdict !== 'retry') throw new Error('bad verdict');
    return { ...j, source: 'jev' };
  } finally { clearTimeout(timer); }
}

const requested = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('classifier') : null;

export async function classify(payload) {
  let mode = requested === 'mock' || requested === 'jev' ? requested : (await probe()) ? 'jev' : 'mock';
  if (mode === 'jev') {
    try { return await jevClassify(payload); }
    catch (e) { console.warn('[classifier] jev unavailable (' + (e?.message ?? e) + '); using the local mock'); }
  }
  return mockClassify(payload);
}

export { normalize };
