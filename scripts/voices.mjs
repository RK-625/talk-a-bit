#!/usr/bin/env node
/**
 * scripts/voices.mjs: checker for the LIVE NPC voices (server/voices.js). Nothing is generated or written to disk.
 *   npm run voices -- --dry         totals, characters, estimated worst-case cost, and the casting; ASSERTS no NPC got a voice of the wrong gender
 *   npm run voices -- --validate    ONE tiny request per distinct speaker / model / language in use (about a hundred short greetings, a few rupees)
 *   npm run voices -- --only kerala[/npcId]   limit the casting listing to one world or NPC
 *
 * SECURITY: the key (SARVAM_API_KEY) is read from the project-root .env here, in Node only, and goes only into the `api-subscription-key` header of
 * https://api.sarvam.ai. It is never printed, logged or written to a file.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLines, castReport, speakerGender, LANG_CODE, RUPEES_PER_10K, SAMPLE_RATE, V4, V3, BLOCKED } from '../server/voices.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2), flag = (n) => argv.includes(n), opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const ONLY = opt('--only');
const nchars = (t) => [...t].length, pad = (s, n) => String(s).padEnd(n);

const lines = buildLines(), { npcs, usage } = castReport();

if (flag('--validate')) {
  try { process.loadEnvFile(path.join(ROOT, '.env')); } catch { /* no .env */ }
  const KEY = process.env.SARVAM_API_KEY;
  if (!KEY) { console.error('SARVAM_API_KEY is not set in .env'); process.exit(1); }
  const HELLO = { hi: 'नमस्ते', kn: 'ನಮಸ್ಕಾರ', ta: 'வணக்கம்', te: 'నమస్కారం', ml: 'നമസ്കാരം', en: 'Hello' };
  const combos = new Map();
  for (const l of lines.values()) combos.set(`${l.speaker}|${l.model}|${l.lang}`, { speaker: l.speaker, model: l.model, lang: l.lang });
  const todo = [...combos.values()];
  console.log(`validating ${todo.length} speaker / model / language combinations (one tiny request each)`);
  const bad = [], fatal = { v: null };
  let next = 0, ok = 0, chars = 0;
  const one = async (c) => {
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await fetch('https://api.sarvam.ai/text-to-speech', {
          method: 'POST', headers: { 'api-subscription-key': KEY, 'content-type': 'application/json' }, signal: AbortSignal.timeout(15000),
          body: JSON.stringify({ text: HELLO[c.lang], language_code: LANG_CODE[c.lang], model: c.model, speaker: c.speaker, pace: 1, speech_sample_rate: SAMPLE_RATE, output_audio_codec: 'mp3' }),
        });
        if (res.ok) { const j = await res.json(); if (j.audios?.[0]) { ok++; chars += nchars(HELLO[c.lang]); return; } bad.push({ ...c, why: 'no audio' }); return; }
        const body = (await res.text()).slice(0, 200).replace(/\s+/g, ' ');
        if ([401, 402, 403].includes(res.status) || /credit|quota|balance|insufficient|exhaust/i.test(body)) { fatal.v = `HTTP ${res.status}`; return; }
        if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 1500 * 2 ** attempt)); continue; }
        bad.push({ ...c, why: `HTTP ${res.status}: ${body}` }); return;
      } catch (e) { if (attempt === 3) { bad.push({ ...c, why: `network: ${e.message}` }); return; } }
    }
    bad.push({ ...c, why: 'rate limited or server error after 4 tries' });
  };
  await Promise.all([0, 1].map(async () => { while (next < todo.length && !fatal.v) await one(todo[next++]); }));
  console.log(`\nvalid: ${ok} / ${todo.length}   characters sent: ${chars}`);
  for (const b of bad) console.log(`  FAIL ${b.speaker} (${b.model}) ${b.lang}: ${b.why}`);
  if (fatal.v) console.log(`\nStopped: Sarvam refused the request (${fatal.v}: credits used up, or the key is wrong).`);
  if (bad.length) console.log(`\nAdd the failing "speaker|lang" pairs to BLOCKED in server/voices.js; they are re-cast to other voices automatically.`);
  process.exit(bad.length || fatal.v ? 1 : 0);
}

// ---------------- dry run (default) ----------------
const byWL = {}, byModel = { [V4]: 0, [V3]: 0 }; let total = 0;
for (const l of lines.values()) { const k = `${l.world}|${l.lang}`; (byWL[k] ??= { n: 0, chars: 0 }); byWL[k].n++; byWL[k].chars += nchars(l.text); byModel[l.model] += nchars(l.text); total += nchars(l.text); }
console.log('Lines per world / language');
for (const [k, v] of Object.entries(byWL)) console.log(`  ${pad(k.replace('|', '  '), 18)} ${pad(v.n, 6)} lines  ${v.chars} chars`);
let cost = 0;
console.log(`\nTotal: ${lines.size} lines, ${total} characters (worst case: every line played once)`);
for (const [m, c] of Object.entries(byModel)) { const r = (c / 10000) * RUPEES_PER_10K[m]; cost += r; console.log(`  ${pad(m, 14)} ${pad(c, 8)} chars  ~Rs ${r.toFixed(0)} (Rs ${RUPEES_PER_10K[m]} per 10,000 chars)`); }
console.log(`  worst-case total ~Rs ${cost.toFixed(0)}; live use only pays for lines actually played, and each is cached\n`);

const mismatches = npcs.filter((n) => n.why === 'cast' && speakerGender(n.speaker) !== n.g);
const counts = {};
for (const n of npcs) counts[`${n.g}/${n.age}`] = (counts[`${n.g}/${n.age}`] ?? 0) + 1;
console.log('NPCs by gender/age:', counts);
console.log('Casting (world/npc | name | lang | gender/age | speaker (model) | pace)');
for (const n of npcs.filter((x) => !ONLY || `${x.world}/${x.npcId}`.startsWith(ONLY))) {
  console.log(`  ${pad(`${n.world}/${n.npcId}`, 44)} ${pad((n.name ?? '').slice(0, 24), 25)} ${n.lang}  ${n.g}/${pad(n.age, 6)} ${n.speaker}${n.model === V3 ? ' (v3)' : ''}  pace ${n.pace.toFixed(2)}`);
}
const used = new Set(npcs.map((n) => n.speaker));
console.log(`\n${npcs.length} NPCs, ${used.size} distinct speakers; ${BLOCKED.size} blocked voice/language pairs. Dry run: no API calls, nothing written.`);
if (mismatches.length) { console.error(`\nGENDER MISMATCH for ${mismatches.length} NPCs:`); for (const m of mismatches) console.error(`  ${m.world}/${m.npcId} wants ${m.g}, got ${m.speaker}`); process.exit(1); }
console.log('Assertion passed: 0 gender mismatches.');
