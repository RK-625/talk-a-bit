// npm run jev:eval : runs a fixed test set through server/jev.js against the real Jev API and prints a table.
// Needs JEV_API_KEY in the project-root .env. Costs a fraction of a cent. Use it to tune the thresholds in server/jev.js.
import fs from 'node:fs';
import dialogues from '../src/worlds/mumbai/dialogue/index.js';
import { createJev, summarize } from '../server/jev.js';

const env = { ...process.env };
try { for (const l of fs.readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/); if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, ''); } } catch { /* no .env */ }
if (!env.JEV_API_KEY) { console.error('JEV_API_KEY missing in .env'); process.exit(1); }
const jev = createJev({ apiKey: env.JEV_API_KEY, model: env.JEV_MODEL });

const V = 'valid', R = 'retry';
// [npc, step index, label, reply, expected verdict, expected reason?]
const CASES = [
  ['chaiwalaUncle', 0, 'suggested phrase', 'Chacha, ek cutting dena.', V],
  ['chaiwalaUncle', 0, 'accepted variant', 'ek cutting chai chahiye', V],
  ['chaiwalaUncle', 0, 'Devanagari', 'चाचा एक कटिंग चाय दो', V],
  ['chaiwalaUncle', 0, 'Hinglish paraphrase', 'chacha mujhe ek kadak cutting chai pila do na', V],
  ['chaiwalaUncle', 0, 'Whisper misspelt', 'chacha ek katting deena', V],
  ['chaiwalaUncle', 0, 'Whisper no punct/caps', 'CHACHA EK CUTTING DENA', V],
  ['chaiwalaUncle', 0, 'wrong answer (vada pav)', 'Chacha, do vada pav dena.', R, 'off_task'],
  ['chaiwalaUncle', 0, 'wrong number', 'chacha paanch cutting dena', R],
  ['chaiwalaUncle', 0, 'pizza + answer', 'i like pizza chacha ek cutting dena', R, 'extra'],
  ['chaiwalaUncle', 0, 'pizza + answer (Hindi pizza)', 'mujhe pizza pasand hai chacha ek cutting dena', R, 'extra'],
  ['chaiwalaUncle', 0, 'pure English', 'Uncle, please give me one cutting chai', R, 'language'],
  ['chaiwalaUncle', 0, 'English "hello how are you"', 'hello how are you today', R],
  ['chaiwalaUncle', 0, 'gibberish', 'asdf qwer zxcv', R],
  ['chaiwalaUncle', 0, 'rude', 'chacha tu pagal hai, bewakoof budhe, ek cutting de', R, 'rude'],
  ['chaiwalaUncle', 0, 'only greeting (partial)', 'chacha namaste', R],
  ['chaiwalaUncle', 1, 'biscuit: no', 'nahi chacha sirf chai', V],
  ['chaiwalaUncle', 1, 'biscuit: yes Devanagari', 'हाँ चाचा', V],
  ['vadaPavWala', 0, 'suggested phrase', 'Do vada pav dena.', V],
  ['vadaPavWala', 0, 'Devanagari', 'दो वड़ापाव देना', V],
  ['vadaPavWala', 0, 'misspelt', 'bhaiya do wada paav dena', V],
  ['vadaPavWala', 0, 'wrong quantity', 'bhaiya ek vada pav dena', R],
  ['vadaPavWala', 0, 'pizza + answer', 'pizza is great do vada pav dena', R, 'extra'],
  ['vadaPavWala', 0, 'pure English', 'Two vada pav please sir', R, 'language'],
  ['taxiDriver', 0, 'suggested phrase', 'Bhaiya, CST chaloge?', V],
  ['taxiDriver', 0, 'Hinglish paraphrase', 'bhaiya mujhe CST jana hai, chalega kya', V],
  ['taxiDriver', 0, 'Devanagari', 'भैया सीएसटी चलोगे', V],
  ['taxiDriver', 0, 'wrong place', 'bhaiya airport chaloge', R],
  ['taxiDriver', 0, 'pure English', 'Will you take me to CST please', R, 'language'],
  ['taxiDriver', 0, 'gibberish', 'blah blah mmm', R],
  ['tourist', 0, 'suggested phrase', 'Yes! The ferry is near the Gateway, by the water.', V],
  ['tourist', 0, 'English paraphrase', 'the elephanta boats are right next to the gateway near the sea', V],
  ['tourist', 0, 'misspelt', 'ferry is near gatway by the watter', V],
  ['tourist', 0, 'wrong answer', 'The ferry is in Delhi, very far away.', R],
  ['tourist', 0, 'pizza + answer', 'i love pizza. the ferry is near the gateway by the water', R, 'extra'],
  ['tourist', 0, 'Hindi to English NPC', 'ferry gateway ke paas paani ke pass hai', R],
  ['tourist', 0, 'rude', 'go away you stupid tourist', R, 'rude'],
  ['tourist', 0, 'gibberish', 'asdkj lkj', R],
];

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
const ok = (c, out) => out.verdict === c[4] && (!c[5] || out.reason === c[5]);
console.log(`model request: ${jev.model}`);
console.log(`${pad('npc/step', 17)} ${pad('case', 28)} ${pad('exp', 6)} ${pad('got', 6)} ${pad('reason', 9)} ${pad('task', 5)} ${pad('unrel', 5)} ${pad('lang', 12)} ${pad('rude', 5)} ok`);
let bad = 0, used = '';
const rows = await Promise.all(CASES.map(async (c) => {
  const d = dialogues[c[0]], step = d.steps[c[1]];
  try {
    return [c, await jev.classify({ lang: d.lang, persona: d.persona, goal: d.goal, npcName: d.name, npcRole: d.role, step, reply: c[3] })];
  } catch (e) { return [c, { error: String(e?.message ?? e) }]; }
}));
for (const [c, out] of rows) {
  if (out.error) { bad++; console.log(`${pad(c[0] + '/' + c[1], 17)} ${pad(c[2], 28)} ERROR ${out.error}`); continue; }
  used = out.model; const s = summarize(out.answers), good = ok(c, out); if (!good) bad++;
  console.log(`${pad(c[0] + '/' + c[1], 17)} ${pad(c[2], 28)} ${pad(c[4] + (c[5] ? ':' + c[5].slice(0, 3) : ''), 6)} ${pad(out.verdict, 6)} ${pad(out.reason ?? '-', 9)} ${pad(s.does_task, 5)} ${pad(s.unrelated, 5)} ${pad(s.lang + ' ' + s.lang_conf, 12)} ${pad(s.rude, 5)} ${good ? 'ok' : 'MISS'}`);
}
console.log(`\nmodel used: ${used}; ${CASES.length - bad}/${CASES.length} as expected`);
process.exit(0);
