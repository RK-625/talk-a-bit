// Shared dialogue validator for any world (Mumbai's own validate.mjs is untouched).
// Run: node scripts/validate-dialogue.mjs <world folder> <cast .md file> [--min N]
//   e.g. node scripts/validate-dialogue.mjs src/worlds/bengaluru docs/BENGALURU_CAST.md --min 130
// Loads <world folder>/dialogue/index.js (default export = { id: dialogue }, named export GREETINGS). Same checks as Mumbai's, plus
// lang 'kn' / 'ta' / 'te' / 'ml' (script text in Kannada / Tamil / Telugu / Malayalam script, Latin roman, English en) and an optional `place` string. --min = least number of dialogues / cast ids (default 65).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const minIx = args.indexOf('--min');
const MIN = minIx >= 0 ? Number(args.splice(minIx, 2)[1]) || 65 : 65;
const [worldDir, castFile] = args;
if (!worldDir || !castFile) { console.error('usage: node scripts/validate-dialogue.mjs <world folder> <cast .md file> [--min N]'); process.exit(2); }
const { default: dialogues, GREETINGS } = await import(pathToFileURL(path.resolve(worldDir, 'dialogue/index.js')).href);

let errors = 0;
const err = (where, msg) => { errors++; console.error(`FAIL ${where}: ${msg}`); };
const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const line = (where, l) => {
  if (!l || typeof l !== 'object') return err(where, 'missing line object');
  for (const k of ['text', 'roman', 'en']) if (!isStr(l[k])) err(where, `missing ${k}`);
};
const hasDevanagari = (s) => /[ऀ-ॿ]/.test(s);
const hasKannada = (s) => /[\u0C80-\u0CFF]/.test(s);
const hasTamil = (s) => /[\u0B80-\u0BFF]/.test(s);
const hasTelugu = (s) => /[\u0C00-\u0C7F]/.test(s);
const hasMalayalam = (s) => /[\u0D00-\u0D7F]/.test(s);
const SCRIPTS = { kn: ['Kannada', hasKannada], ta: ['Tamil', hasTamil], te: ['Telugu', hasTelugu], ml: ['Malayalam', hasMalayalam] };
const ids = new Set();
const entries = Object.entries(dialogues);
if (entries.length < MIN) err('index', `only ${entries.length} dialogues (need ${MIN})`);

for (const [key, d] of entries) {
  const w = key;
  if (d.id !== key) err(w, `id "${d.id}" does not match key`);
  if (ids.has(d.id)) err(w, 'duplicate id'); ids.add(d.id);
  for (const k of ['name', 'role', 'persona', 'goal']) if (!isStr(d[k])) err(w, `missing ${k}`);
  if (d.place !== undefined && !isStr(d.place)) err(w, 'place must be a non-empty string');
  if (!['hi', 'en', 'kn', 'ta', 'te', 'ml'].includes(d.lang)) err(w, `bad lang ${d.lang}`);
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
    if (SCRIPTS[d.lang]) {
      const [nm, has] = SCRIPTS[d.lang];
      if (!has(s.npc?.text || '')) err(sw, `npc.text should be ${nm} script`);
      if (s.npc && has(s.npc.roman)) err(sw, `npc.roman contains ${nm} script`);
      if (s.suggest && !has(s.suggest.text)) err(sw, `suggest.text should be ${nm} script`);
      if (s.suggest && has(s.suggest.roman)) err(sw, `suggest.roman contains ${nm} script`);
      for (const k of ['onValid', 'onRetry']) { if (s[k] && !has(s[k].text || '')) err(sw, `${k}.text should be ${nm} script`); }
    }
    const words = (s.npc?.text || '').split(/\s+/).length;
    if (words > 15) err(sw, `npc line has ${words} words (>15)`);
  });
  line(`${w}.outro`, d.outro);
  if (!Array.isArray(d.learned) || d.learned.length < 1 || d.learned.length > 3 || !d.learned.every((l) => isStr(l.roman) && isStr(l.en))) err(w, 'learned needs 1-3 {roman,en}');
}
if (!Array.isArray(GREETINGS) || GREETINGS.length < 10 || GREETINGS.length > 15) err('GREETINGS', `need 10-15, has ${GREETINGS?.length}`);
(GREETINGS || []).forEach((g, i) => line(`GREETINGS[${i}]`, g));

// every talkable id in the cast file has its own dialogue (no one falls back to the greeting)
try {
  const cast = readFileSync(path.resolve(castFile), 'utf8');
  const castIds = [...cast.matchAll(/^\|\s*([A-Za-z][\w-]*)\s*\|/gm)].map((m) => m[1]).filter((id) => id !== 'id');
  if (castIds.length < MIN) err('cast', `parsed only ${castIds.length} ids (need ${MIN})`);
  for (const id of castIds) if (!dialogues[id]) err('cast', `talkable "${id}" has no dialogue`);
  for (const id of Object.keys(dialogues)) if (!castIds.includes(id)) console.warn(`note: dialogue "${id}" is not in the cast file`);
} catch (e) { err('cast', `cannot read: ${e.message}`); }

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
console.log(`OK: ${oneStep} 1-step, ${entries.length} dialogues, ${entries.reduce((n, [, d]) => n + d.steps.length, 0)} steps, ${GREETINGS?.length} greetings`);
