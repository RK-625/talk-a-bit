// Run: node src/worlds/mumbai/dialogue/validate.mjs
import { readFileSync } from 'node:fs';
import dialogues, { GREETINGS } from './index.js';

let errors = 0;
const err = (where, msg) => { errors++; console.error(`FAIL ${where}: ${msg}`); };
const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const line = (where, l) => {
  if (!l || typeof l !== 'object') return err(where, 'missing line object');
  for (const k of ['text', 'roman', 'en']) if (!isStr(l[k])) err(where, `missing ${k}`);
};
const hasDevanagari = (s) => /[ऀ-ॿ]/.test(s);
const ids = new Set();
const entries = Object.entries(dialogues);
if (entries.length < 65) err('index', `only ${entries.length} dialogues`);

for (const [key, d] of entries) {
  const w = key;
  if (d.id !== key) err(w, `id "${d.id}" does not match key`);
  if (ids.has(d.id)) err(w, 'duplicate id'); ids.add(d.id);
  for (const k of ['name', 'role', 'persona', 'goal']) if (!isStr(d[k])) err(w, `missing ${k}`);
  if (!['hi', 'en'].includes(d.lang)) err(w, `bad lang ${d.lang}`);
  if (!d.voice || typeof d.voice.rate !== 'number' || typeof d.voice.pitch !== 'number') err(w, 'bad voice');
  if (!(d.difficulty >= 1 && d.difficulty <= 5)) err(w, 'bad difficulty');
  if (!Array.isArray(d.steps) || d.steps.length < 1 || d.steps.length > 4) err(w, 'steps must be 1-4');
  const stepIds = new Set();
  (d.steps || []).forEach((s, i) => {
    const sw = `${w}.${s.id ?? i}`;
    if (!isStr(s.id)) err(sw, 'missing id'); else if (stepIds.has(s.id)) err(sw, 'duplicate step id'); stepIds.add(s.id);
    line(`${sw}.npc`, s.npc); line(`${sw}.onValid`, s.onValid); line(`${sw}.onRetry`, s.onRetry);
    if (!isStr(s.instruction)) err(sw, 'missing instruction');
    if (!s.suggest || !isStr(s.suggest.roman) || !isStr(s.suggest.text)) err(sw, 'bad suggest');
    if (!Array.isArray(s.accept) || s.accept.length < 6 || s.accept.length > 10 || !s.accept.every(isStr)) err(sw, `accept needs 6-10 strings (has ${s.accept?.length})`);
    if (!/^[a-z][a-z0-9_]*$/.test(s.intent || '')) err(sw, 'intent must be snake_case');
    if (!Array.isArray(s.hints) || s.hints.length !== 3 || !s.hints.every(isStr)) err(sw, 'need exactly 3 hints');
    if (d.lang === 'hi') {
      if (!hasDevanagari(s.npc?.text || '')) err(sw, 'npc.text should be Devanagari');
      if (s.npc && hasDevanagari(s.npc.roman)) err(sw, 'npc.roman contains Devanagari');
      if (s.suggest && !hasDevanagari(s.suggest.text)) err(sw, 'suggest.text should be Devanagari');
    }
    const words = (s.npc?.text || '').split(/\s+/).length;
    if (words > 15) err(sw, `npc line has ${words} words (>15)`);
  });
  line(`${w}.outro`, d.outro);
  if (!Array.isArray(d.learned) || d.learned.length < 1 || d.learned.length > 3 || !d.learned.every((l) => isStr(l.roman) && isStr(l.en))) err(w, 'learned needs 1-3 {roman,en}');
}
if (GREETINGS.length < 10 || GREETINGS.length > 15) err('GREETINGS', `need 10-15, has ${GREETINGS.length}`);
GREETINGS.forEach((g, i) => line(`GREETINGS[${i}]`, g));

// every talkable id in docs/CAST.md has its own dialogue (no one falls back to the greeting)
try {
  const cast = readFileSync(new URL('../../../../docs/CAST.md', import.meta.url), 'utf8');
  const castIds = [...cast.matchAll(/^\|\s*([A-Za-z][\w-]*)\s*\|/gm)].map((m) => m[1]).filter((id) => id !== 'id');
  if (castIds.length < 65) err('CAST.md', `parsed only ${castIds.length} ids`);
  for (const id of castIds) if (!dialogues[id]) err('CAST.md', `talkable "${id}" has no dialogue`);
  for (const id of Object.keys(dialogues)) if (!castIds.includes(id)) console.warn(`note: dialogue "${id}" is not in docs/CAST.md`);
} catch (e) { err('CAST.md', `cannot read: ${e.message}`); }

// no line may be shared between two dialogues (or twice in one): npc lines, reactions, outro, again, suggested phrases
const seen = new Map();
const norm = (s) => String(s).replace(/\s+/g, ' ').trim().toLowerCase();
const claim = (where, ...strs) => { for (const s of strs) { if (!s) continue; const k = norm(s); if (seen.has(k) && seen.get(k) !== where) err(where, `line shared with ${seen.get(k)}: "${s}"`); else seen.set(k, where); } };
for (const [key, d] of entries) {
  (d.steps || []).forEach((s) => {
    claim(`${key}.${s.id}`, s.npc?.text, s.npc?.roman, s.onValid?.text, s.onValid?.roman, s.onRetry?.text, s.onRetry?.roman, s.suggest?.roman, s.suggest?.text);
  });
  claim(key + '.outro', d.outro?.text, d.outro?.roman);
  if (d.again) { line(`${key}.again`, d.again); claim(key + '.again', d.again.text, d.again.roman); }
  if (new Set((d.learned || []).map((l) => norm(l.roman))).size !== (d.learned || []).length) err(key, 'duplicate learned phrase');
}
// learned phrases: warn (not fail) when two people teach the same one
const learnedSeen = new Map();
for (const [key, d] of entries) for (const l of d.learned || []) { const k = norm(l.roman); if (learnedSeen.has(k)) console.warn(`note: learned "${l.roman}" repeats (${learnedSeen.get(k)}, ${key})`); else learnedSeen.set(k, key); }

if (errors) { console.error(`\n${errors} problem(s)`); process.exit(1); }
const oneStep = entries.filter(([, d]) => d.steps.length === 1).length;
console.log(`OK: ${oneStep} 1-step, ${entries.length} dialogues, ${entries.reduce((n, [, d]) => n + d.steps.length, 0)} steps, ${GREETINGS.length} greetings`);
