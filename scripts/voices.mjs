#!/usr/bin/env node
/**
 * scripts/voices.mjs: pre-generate NPC voice lines with Sarvam AI Bulbul and ship them as static mp3 files.
 *   npm run voices -- --dry                 list counts, characters, estimated cost and the casting; no API calls, no key needed
 *   npm run voices                          generate every missing / changed line
 *   npm run voices -- --only kerala         one world   (or --only kerala/chaiwalaUncle for one NPC)
 *   npm run voices -- --limit 6             stop after 6 new API requests
 *   npm run voices -- --bitrate 24k         with ffmpeg installed, re-encode each mp3 (default 32k mono; Sarvam itself returns 128 kbps)
 *
 * Output: public/voices/<world>/<npcId>/<stepId>-<kind>.mp3 + public/voices/manifest.json { [lineId]: { file, hash } }.
 *   lineId = <world>/<npcId>/<stepId>-<npc|valid|retry>, <world>/<npcId>/outro, <world>/<npcId>/again, <world>/_greetings/g<N>, shared/greetings-en/g<N>.
 *   hash = sha1(model | speaker | pace | language | text). A line whose hash is unchanged and whose file exists is NEVER regenerated (credits are money).
 *   scripts/voices.cast.json remembers each NPC's speaker so adding NPCs later never recasts (and re-bills) the existing ones.
 *
 * SECURITY: the key (SARVAM_API_KEY) is read from the project-root .env here, in Node only, and goes only into the `api-subscription-key`
 * header of https://api.sarvam.ai. It is never printed, logged or written to a file.
 *
 * Sarvam docs used: REST   https://docs.sarvam.ai/api-reference/text-to-speech/convert
 *                   models https://docs.sarvam.ai/api/getting-started/models/bulbul
 *                   voices https://docs.sarvam.ai/api/api-guides-tutorials/text-to-speech/voices   (source of the speaker tables below)
 *   POST /text-to-speech { text, language_code, model, speaker, pace, speech_sample_rate, output_audio_codec } -> { request_id, audios: [base64] }
 *   bulbul:v4-flash has no Malayalam, so ml-IN uses bulbul:v3. v4-flash only has a few Kannada / Tamil / Telugu voices (no Tamil female), so
 *   the tables below top those up with bulbul:v3 speakers (v3 short names work in every v3 language).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/voices');
const CAST_FILE = path.join(ROOT, 'scripts/voices.cast.json');
const API = 'https://api.sarvam.ai/text-to-speech';
const SAMPLE_RATE = 24000;
const V4 = 'bulbul:v4-flash', V3 = 'bulbul:v3';
const RUPEES_PER_10K = { [V4]: 20, [V3]: 30 };
const LANG_CODE = { hi: 'hi-IN', kn: 'kn-IN', ta: 'ta-IN', te: 'te-IN', ml: 'ml-IN', en: 'en-IN' };

// ---------------- args ----------------
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const DRY = flag('--dry');
const ONLY = opt('--only');
const LIMIT = opt('--limit') ? Number(opt('--limit')) : Infinity;
const BITRATE = opt('--bitrate') ?? '32k'; // only used when ffmpeg is installed: Sarvam returns 128 kbps mp3, far too big for ~5,700 lines

// ---------------- speaker tables ----------------
// [speaker id, model, gender m|f, ages (k = kid, a = adult, o = elder), optional tags]. Order = preference.
const v3 = (id, g, ages) => [id, V3, g, ages];
const V3_POOL = [
  v3('rahul', 'm', 'a'), v3('amit', 'm', 'a'), v3('aditya', 'm', 'a'), v3('manan', 'm', 'a'), v3('sumit', 'm', 'a'), v3('kabir', 'm', 'a'), v3('dev', 'm', 'a'),
  v3('ratan', 'm', 'o'), v3('anand', 'm', 'o'), v3('ashutosh', 'm', 'o'), v3('mani', 'm', 'ao'), v3('gokul', 'm', 'ao'), v3('vijay', 'm', 'a'),
  v3('rehan', 'm', 'k'), v3('sunny', 'm', 'k'),
  v3('priya', 'f', 'a'), v3('kavya', 'f', 'a'), v3('ritu', 'f', 'a'), v3('shreya', 'f', 'a'), v3('neha', 'f', 'a'), v3('shruti', 'f', 'a'), v3('suhani', 'f', 'a'),
  v3('simran', 'f', 'o'), v3('roopa', 'f', 'o'), v3('kavitha', 'f', 'ao'), v3('rupali', 'f', 'ao'),
  v3('tanya', 'f', 'k'), v3('pooja', 'f', 'k'),
];
const POOLS = {
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
  // Kannada: v4-flash has Chaitra (f), Suchitra (f, narration), Chetan (m) only.
  kn: [['chetan_kn_conversation', V4, 'm', 'a'], ['chaitra_kn_conversation', V4, 'f', 'ak'], ['suchitra_kn_narration', V4, 'f', 'ao'], ...V3_POOL],
  // Tamil: v4-flash has only male voices (Gokul, Vijay; Aravind is ads / suspense so skipped).
  ta: [['gokul_ta_narration', V4, 'm', 'ao'], ['vijay_ta_narration', V4, 'm', 'a'], ...V3_POOL],
  // Telugu: v4-flash has Kavitha (f), Pooja (f), Tarun (m, narration).
  te: [['kavitha_te_conversation', V4, 'f', 'ao'], ['pooja_te_conversation', V4, 'f', 'ak'], ['tarun_te_narration', V4, 'm', 'a'], ...V3_POOL],
  // Malayalam: not on v4-flash, bulbul:v3 only.
  ml: [...V3_POOL],
};
const V3_NAMES = new Set(V3_POOL.map((v) => v[0]));
const speakerModel = (id) => (V3_NAMES.has(id) ? V3 : V4);

// ---------------- profile heuristics (persona / role / name / voice.pitch -> gender + age) ----------------
const F_RE = /\b(she|her|hers|woman|women|lady|ladies|girl|mother|mom|wife|sister|grandmother|grandma|aunty|auntie|aunt|mausi|tai|didi|baji|amma|akka|chechi|chitti|paati|patti|ajji|aaji|maaji|nani|dadi|bai|madam|mrs|ms|miss|bhabhi|maami|mami|fisherwoman|granny)\b/gi;
const M_RE = /\b(he|him|his|man|men|boy|father|dad|husband|brother|uncle|sir|dada|bhai|bhaiya|anna|chacha|kaka|chettan|mama|thatha|ajja|sahab|saheb|saab|mr|guy|gentleman|bhau|appa|chetta|aiya|saar|babu|baba|ji)\b/gi;
const KID_ROLE_RE = /\b(kid|child|girl|boy|schoolgirl|schoolboy)\b/i, NOT_KID_RE = /\b(delivery|college|bell|office|old)\s+(boy|girl)\b|college girl/i;
const KID_PERSONA_RE = /\b(kid|schoolgirl|schoolboy|little boy|little girl|tiny|hyper little)\b/i;
const OLD_RE = /\b(old|elder|elderly|retired|grandfather|grandmother|granny|grandma|veteran|aaji|paati|ajji|thatha|baba|maaji|grey|grey-haired|kaka|chacha|uncle|aunty|auntie|amma|dada ji|panditji|priest|pandit)\b/i;
const PRIEST_RE = /\b(priest|pandit|panditji|pujari|archaka|poojari)\b/i;

// The same cast ids exist in every world; these fix the few the keyword / pitch guess gets wrong.
const GENDER_FIX = { 'chowk-cricket-bowler': 'm', 'flora-ledge-sketcher': 'm', 'juhu-gola-kid': 'm', 'marine-couple-2': 'f' };
const AGE_FIX = { 'marine-couple': 'a', 'marine-couple-2': 'a' };

// first names (and name endings) that settle gender when the persona text does not
const F_NAMES = new Set('divya sandhya sunitha sunita preethi sirisha mounika madhavi swapna anita sujatha neha pooja isha anu aditi meera ishita harini sana aanya sneha muskaan simran ammu chinni lena mary sarla shanti selvi bhargavi gulabo kamla kamal emma linda sophie lucy ingrid hannah anna sarah julia mia kate sumitra vijaya padma bhagya thangam pankajam kalyani ammini janaki saraswathi saraswati rajeshwari vasantha vasanthi saroja sumathi padmini sridevi sunanda prabha radha leelamma rathnamma gangamma yellamma sarojamma lakshmamma mariyamma gowramma kenchamma susheelamma lalitha phoolwati suma nisha rekha meena sunanda tanya'.split(' '));
const F_END = /(amma|ajji|akka|bee|kaur|devi|mma)$/i, M_END = /(appa|ayya|aiah|anna|swamy|gowda|singh|rao|chettan)$/i;
const camel = (x) => String(x ?? '').replace(/([a-z])([A-Z])/g, '$1 $2');

function profile(d, key) {
  const first = String(d.name ?? '').toLowerCase().split(/[\s(]/)[0].replace(/[^a-z]/g, '');
  const head = `${camel(d.name)} ${camel(d.role)} ${key.replace(/-/g, ' ')}`, hay = `${head} ${d.persona ?? ''}`;
  const nameF = F_NAMES.has(first) || (first.length > 4 && F_END.test(first) && !M_END.test(first)), nameM = !nameF && first.length > 4 && M_END.test(first);
  const f = (hay.match(F_RE) || []).length + (nameF ? 2 : 0), m = (hay.match(M_RE) || []).length + (nameM ? 2 : 0);
  const pitch = d.voice?.pitch ?? 1;
  let age = 'a';
  if ((KID_ROLE_RE.test(`${d.role} ${key.replace(/-/g, ' ')}`) && !NOT_KID_RE.test(`${d.role} ${key}`)) || KID_PERSONA_RE.test(d.persona ?? '')) age = 'k';
  else if (OLD_RE.test(`${head} ${(d.persona ?? '').split('.')[0]}`)) age = 'o';
  const g = f > m ? 'f' : m > f ? 'm' : pitch >= (age === 'k' ? 1.45 : 1.15) ? 'f' : 'm';
  return { g: GENDER_FIX[key] ?? g, age: AGE_FIX[key] ?? age, tags: PRIEST_RE.test(head) ? ['priest'] : [] };
}

const hashOf = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const cast = fs.existsSync(CAST_FILE) ? JSON.parse(fs.readFileSync(CAST_FILE, 'utf8')) : {}; // "world/npcId" -> { speaker, model }
const castBefore = JSON.stringify(cast);
const usage = {}; // world -> speaker -> count

function pickSpeaker(world, castKey, lang, prof, voiceId) {
  const u = (usage[world] ??= {});
  if (voiceId) { const r = { speaker: voiceId, model: speakerModel(voiceId), why: 'voiceId' }; u[r.speaker] = (u[r.speaker] ?? 0) + 1; return r; }
  if (cast[castKey]) { const r = { ...cast[castKey], why: 'saved' }; u[r.speaker] = (u[r.speaker] ?? 0) + 1; return r; }
  const pool = POOLS[lang] ?? POOLS.hi;
  let c = pool.filter((v) => v[2] === prof.g && v[3].includes(prof.age));
  if (!c.length) c = pool.filter((v) => v[2] === prof.g);
  const tagged = c.filter((v) => v[4]?.some((t) => prof.tags.includes(t)));
  if (tagged.length) c = tagged;
  // least used in this world first (v3 voices cost extra "uses" so v4-flash is preferred), ties broken by a stable per-NPC hash
  const h = hashOf(castKey);
  const scored = c.map((v, i) => ({ v, s: (u[v[0]] ?? 0) + (v[1] === V3 ? 2 : 0), t: (i + h) % c.length })).sort((a, b) => a.s - b.s || a.t - b.t);
  const v = scored[0].v;
  u[v[0]] = (u[v[0]] ?? 0) + 1;
  cast[castKey] = { speaker: v[0], model: v[1] };
  return { speaker: v[0], model: v[1], why: 'cast' };
}

// ---------------- collect lines ----------------
const worldsDir = path.join(ROOT, 'src/worlds');
const worlds = fs.readdirSync(worldsDir).filter((w) => fs.existsSync(path.join(worldsDir, w, 'dialogue/index.js'))).sort();
const lines = []; // { id, file, world, npcId, lang, text, speaker, model, pace }
const npcs = []; // casting report

for (const world of worlds) {
  let mod;
  try { mod = await import(pathToFileURL(path.join(worldsDir, world, 'dialogue/index.js')).href); }
  catch (e) { console.error(`! ${world}: dialogue/index.js failed to load in Node: ${e.message}`); continue; }
  const dialogues = mod.default ?? {};
  const langCount = {};
  for (const d of Object.values(dialogues)) if (d.lang !== 'en') langCount[d.lang] = (langCount[d.lang] ?? 0) + 1;
  const worldLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'hi';

  const add = (id, file, npcId, lang, line, sp, pace) => {
    const text = (line?.text || line?.roman || '').trim();
    if (!text) return;
    lines.push({ id, file, world, npcId, lang, text, speaker: sp.speaker, model: sp.model, pace });
  };

  for (const [key, d] of Object.entries(dialogues)) {
    const npcId = d.id ?? key, lang = d.lang ?? 'hi';
    const prof = profile(d, key);
    const sp = pickSpeaker(world, `${world}/${npcId}`, lang, prof, d.voiceId);
    const pace = Math.min(2, Math.max(0.5, Number(d.voice?.rate) || 1));
    npcs.push({ world, npcId, name: d.name, lang, prof, sp, pace });
    const dir = npcId.replace(/[^\w.-]/g, '_');
    for (const [si, st] of (d.steps ?? []).entries()) {
      if (!st) { console.warn(`! ${world}/${npcId}: steps[${si}] is empty (data bug, line skipped)`); continue; }
      const sid = String(st.id).replace(/[^\w.-]/g, '_');
      add(`${world}/${npcId}/${st.id}-npc`, `${world}/${dir}/${sid}-npc.mp3`, npcId, lang, st.npc, sp, pace);
      add(`${world}/${npcId}/${st.id}-valid`, `${world}/${dir}/${sid}-valid.mp3`, npcId, lang, st.onValid, sp, pace);
      add(`${world}/${npcId}/${st.id}-retry`, `${world}/${dir}/${sid}-retry.mp3`, npcId, lang, st.onRetry, sp, pace);
    }
    add(`${world}/${npcId}/outro`, `${world}/${dir}/outro.mp3`, npcId, lang, d.outro, sp, pace);
    add(`${world}/${npcId}/again`, `${world}/${dir}/again.mp3`, npcId, lang, d.again, sp, pace);
  }
  // ambient greetings (an NPC with no dialogue says one when you press E): alternate a man's and a woman's voice
  (mod.GREETINGS ?? []).forEach((g, i) => {
    const gender = i % 2 ? 'f' : 'm';
    const sp = pickSpeaker(world, `${world}/_greeter-${gender}`, worldLang, { g: gender, age: 'a', tags: [] }, null);
    add(`${world}/_greetings/g${i}`, `${world}/_greetings/g${i}.mp3`, '_greetings', worldLang, g, sp, 1);
  });
}
{ // English greetings for foreign-role ambient NPCs (shared by all worlds; game/talk/sampleDialogue.js)
  const { GREETINGS_EN = [] } = await import(pathToFileURL(path.join(ROOT, 'src/game/talk/sampleDialogue.js')).href);
  GREETINGS_EN.forEach((g, i) => {
    const gender = i % 2 ? 'f' : 'm';
    const sp = pickSpeaker('shared', `shared/_greeter-en-${gender}`, 'en', { g: gender, age: 'a', tags: [] }, null);
    lines.push({ id: `shared/greetings-en/g${i}`, file: `shared/greetings-en/g${i}.mp3`, world: 'shared', npcId: '_greetings', lang: 'en', text: (g.text || g.roman).trim(), speaker: sp.speaker, model: sp.model, pace: 1 });
  });
}

// ---------------- filter, hash ----------------
const want = lines.filter((l) => !ONLY || l.id.startsWith(ONLY.endsWith('/') ? ONLY : ONLY + '/'));
const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');
for (const l of want) l.hash = sha1([l.model, l.speaker, l.pace, LANG_CODE[l.lang], l.text].join('|'));
const nchars = (t) => [...t].length;
const rupees = (model, chars) => (chars / 10000) * RUPEES_PER_10K[model];

const manifestPath = path.join(OUT, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
const isDone = (l) => manifest[l.id]?.hash === l.hash && fs.existsSync(path.join(OUT, l.file));

// ---------------- dry run ----------------
if (DRY) {
  const pad = (s, n) => String(s).padEnd(n);
  const byWL = {};
  for (const l of want) { const k = `${l.world}|${l.lang}`; (byWL[k] ??= { n: 0, chars: 0 }); byWL[k].n++; byWL[k].chars += nchars(l.text); }
  console.log('Lines per world / language');
  for (const [k, v] of Object.entries(byWL)) console.log(`  ${pad(k.replace('|', '  '), 18)} ${pad(v.n, 6)} lines  ${v.chars} chars`);
  const byModel = { [V4]: 0, [V3]: 0 }; let total = 0, pending = 0, pendingChars = 0;
  const seen = new Set();
  for (const l of want) { byModel[l.model] += nchars(l.text); total += nchars(l.text); if (!isDone(l) && !seen.has(l.hash)) { seen.add(l.hash); pending++; pendingChars += nchars(l.text); } }
  console.log(`\nTotal: ${want.length} lines, ${total} characters (${pending} lines / ${pendingChars} chars not yet generated)`);
  let cost = 0;
  for (const [m, c] of Object.entries(byModel)) { const r = rupees(m, c); cost += r; console.log(`  ${pad(m, 14)} ${pad(c, 8)} chars  ~Rs ${r.toFixed(0)} (Rs ${RUPEES_PER_10K[m]} per 10,000 chars)`); }
  console.log(`  estimated full-set cost ~Rs ${cost.toFixed(0)}\n`);
  console.log('Casting (world/npc | name | lang | profile | speaker (model) | pace)');
  for (const n of npcs.filter((x) => !ONLY || `${x.world}/${x.npcId}`.startsWith(ONLY))) {
    console.log(`  ${pad(`${n.world}/${n.npcId}`, 44)} ${pad((n.name ?? '').slice(0, 26), 27)} ${n.lang}  ${n.prof.g}/${n.prof.age}  ${n.sp.speaker}${n.sp.model === V3 ? ' (v3)' : ''}  pace ${n.pace}`);
  }
  const used = new Set(npcs.map((n) => n.sp.speaker));
  console.log(`\n${npcs.length} NPCs, ${used.size} distinct speakers. Dry run: no API calls, nothing written.`);
  process.exit(0);
}

// ---------------- real run ----------------
try { process.loadEnvFile(path.join(ROOT, '.env')); } catch { /* no .env */ }
const KEY = process.env.SARVAM_API_KEY;
if (!KEY) {
  console.error('SARVAM_API_KEY is not set. Add a line  SARVAM_API_KEY=your-key  to the project-root .env (it is gitignored), then run again.\nTry `npm run voices -- --dry` to preview without a key.');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let langField = 'language_code'; // the current REST docs name it language_code; older docs say target_language_code (auto-switched on a 422)
const hasFfmpeg = spawnSync('ffmpeg', ['-version']).status === 0;

async function synth(l) {
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(API, {
        method: 'POST',
        headers: { 'api-subscription-key': KEY, 'content-type': 'application/json' },
        body: JSON.stringify({ text: l.text, [langField]: LANG_CODE[l.lang], model: l.model, speaker: l.speaker, pace: l.pace, speech_sample_rate: SAMPLE_RATE, output_audio_codec: 'mp3' }),
      });
    } catch (e) {
      if (attempt < 5) { await sleep(1000 * 2 ** attempt); continue; }
      throw new Error(`network error: ${e.message}`);
    }
    if (res.ok) {
      const j = await res.json();
      const b64 = j.audios?.[0];
      if (!b64) throw new Error('response had no audios[0]');
      return Buffer.from(b64, 'base64');
    }
    const body = (await res.text()).slice(0, 400);
    if ([401, 402, 403].includes(res.status) || /credit|quota|balance|insufficient|exhaust/i.test(body)) throw Object.assign(new Error(`HTTP ${res.status}: ${body}`), { fatal: true });
    if (res.status === 422 && /language_code/.test(body) && attempt < 2) { langField = langField === 'language_code' ? 'target_language_code' : 'language_code'; continue; }
    if ((res.status === 429 || res.status >= 500) && attempt < 5) { await sleep(1500 * 2 ** attempt); continue; }
    throw new Error(`HTTP ${res.status} for ${l.id} (${l.model} ${l.speaker}): ${body}`);
  }
}

function writeManifest() {
  fs.mkdirSync(OUT, { recursive: true });
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => (a < b ? -1 : 1)));
  fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 1) + '\n');
}

// one request per distinct (hash): identical lines share the audio
const todo = [], skipped = [], dupes = new Map();
for (const l of want) {
  if (isDone(l)) { skipped.push(l); continue; }
  if (dupes.has(l.hash)) { dupes.get(l.hash).push(l); continue; }
  dupes.set(l.hash, [l]);
  todo.push(l);
}
const batch = todo.slice(0, LIMIT);
let generated = 0, chars = 0, rs = 0, failed = 0, next = 0;
let stop = null, streak = 0; // stop: why the run was halted (credits gone, bad key, Sarvam down); streak: failures in a row

function save(l, buf) {
  const file = path.join(OUT, l.file);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  if (hasFfmpeg) { // shrink: mono, 32 kbps is plenty for speech
    const tmp = file + '.tmp.mp3';
    if (spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', file, '-ac', '1', '-b:a', BITRATE, tmp]).status === 0) fs.renameSync(tmp, file); else fs.rmSync(tmp, { force: true });
  }
}

async function worker() {
  while (next < batch.length && !stop) {
    const l = batch[next++];
    try {
      const buf = await synth(l);
      for (const m of dupes.get(l.hash)) { save(m, buf); manifest[m.id] = { file: m.file, hash: m.hash }; }
      writeManifest();
      generated++; chars += nchars(l.text); rs += rupees(l.model, nchars(l.text));
      streak = 0;
      console.log(`  ok  ${l.id}  [${l.speaker}]  ${buf.length} bytes`);
    } catch (e) {
      failed++; streak++; console.error(`  FAIL ${e.message}`);
      if (e.fatal) stop ??= 'Sarvam refused the request (credits used up, or the key is wrong)';
      else if (streak >= 5) stop ??= '5 requests failed in a row (Sarvam may be down)';
    }
  }
}

console.log(`${want.length} lines selected, ${skipped.length} already up to date, ${todo.length} to generate${batch.length < todo.length ? ` (limited to ${batch.length})` : ''}.`);
await Promise.all([worker(), worker(), worker()]);
if (JSON.stringify(cast) !== castBefore) fs.writeFileSync(CAST_FILE, JSON.stringify(cast, null, 1) + '\n');
console.log(`\nSummary: generated ${generated}, skipped ${skipped.length}, failed ${failed}, characters sent ${chars}, estimated credits ~Rs ${rs.toFixed(2)}`);
if (!hasFfmpeg && generated) console.log('Note: ffmpeg not found, mp3s kept at the size Sarvam returned (install ffmpeg to shrink them to 32 kbps mono; Sarvam returns 128 kbps, ~45 KB per line).');
if (stop) console.log(`\nStopped early: ${stop}. Everything generated so far is saved in manifest.json and plays in the game;\nevery other line falls back to the browser voice. Fix the cause, then rerun the same command: finished lines are skipped, so nothing is paid for twice.`);
process.exit(failed ? 1 : 0);
