// npm run jev:eval : runs a fixed test set through server/jev.js against the real Jev API and prints a table.
// Needs JEV_API_KEY in the project-root .env. Costs a fraction of a cent. Use it to tune the thresholds in server/jev.js.
import fs from 'node:fs';
import mumbai from '../src/worlds/mumbai/dialogue/index.js';
import { createJev, summarize } from '../server/jev.js';

const env = { ...process.env };
try { for (const l of fs.readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/); if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, ''); } } catch { /* no .env */ }
if (!env.JEV_API_KEY) { console.error('JEV_API_KEY missing in .env'); process.exit(1); }
const jev = createJev({ apiKey: env.JEV_API_KEY, model: env.JEV_MODEL });

// two sample Kannada dialogues (Bengaluru world), written inline so the eval does not depend on src/worlds/bengaluru
const kn = (text, roman, en) => ({ text, roman, en });
const dialogues = {
  ...mumbai,
  kn_darshini: {
    id: 'kn_darshini', name: 'Shankar Anna', role: 'chaiwalaUncle', lang: 'kn', worldId: 'bengaluru',
    persona: 'Friendly darshini owner who is kind to Rohan, a newcomer learning Kannada.',
    goal: 'Order a filter coffee at the darshini.',
    steps: [
      { id: 'order', npc: kn('ಏನು ಬೇಕು ರೋಹನ್?', 'Enu beku Rohan?', 'What do you want, Rohan?'), instruction: 'Ask for one coffee.',
        suggest: { roman: 'Ondu coffee kodi.', text: 'ಒಂದು ಕಾಫಿ ಕೊಡಿ.' }, intent: 'order_one_coffee',
        accept: ['ondu coffee kodi', 'ondu coffee beku', 'ondu kaafi kodi', 'anna ondu coffee kodi', 'ಒಂದು ಕಾಫಿ ಬೇಕು', 'coffee kodi anna', 'ondu filter coffee kodi'] },
      { id: 'idli', npc: kn('ಇಡ್ಲಿ ಬೇಕಾ?', 'Idli beka?', 'Want idli?'), instruction: 'Say no thanks, only coffee is enough.',
        suggest: { roman: 'Beda anna, coffee saaku.', text: 'ಬೇಡ ಅಣ್ಣ, ಕಾಫಿ ಸಾಕು.' }, intent: 'decline_idli',
        accept: ['beda anna coffee saaku', 'illa beda', 'beda coffee mathra', 'ಬೇಡ ಅಣ್ಣ', 'beda saaku', 'beda anna'] },
    ],
  },
  kn_auto: {
    id: 'kn_auto', name: 'Manjunath', role: 'taxiDriver', lang: 'kn', worldId: 'bengaluru',
    persona: 'Chatty auto driver who haggles over the meter.',
    goal: 'Ask an auto driver to take you to MG Road.',
    steps: [
      { id: 'where', npc: kn('ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು ಸಾರ್?', 'Elli hogbeku sar?', 'Where do you want to go, sir?'), instruction: 'Tell him you want to go to MG Road.',
        suggest: { roman: 'MG Road ge hogbeku.', text: 'ಎಂಜಿ ರೋಡ್ ಗೆ ಹೋಗಬೇಕು.' }, intent: 'say_destination_mg_road',
        accept: ['MG Road ge hogbeku', 'MG Road ge hogona', 'anna MG Road ge barthira', 'MG Road ge hogbeku anna', 'ಎಂಜಿ ರೋಡ್ ಗೆ ಹೋಗಬೇಕು', 'MG Road ge bartheera'] },
    ],
  },
};

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
  // ---- Kannada (lang kn) ----
  ['kn_darshini', 0, 'KN suggested phrase', 'Ondu coffee kodi.', V],
  ['kn_darshini', 0, 'KN accepted variant', 'anna ondu coffee beku', V],
  ['kn_darshini', 0, 'KN Kannada script', 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', V],
  ['kn_darshini', 0, 'KN Kanglish paraphrase', 'anna one filter coffee kodi please', V],
  ['kn_darshini', 0, 'KN Whisper misspelt', 'ondu kaafi kodee', V],
  ['kn_darshini', 0, 'KN wrong item (tea)', 'ondu tea kodi', R, 'off_task'],
  ['kn_darshini', 0, 'KN wrong number', 'eradu coffee kodi', R],
  ['kn_darshini', 0, 'KN pure Hindi', 'bhaiya ek coffee dena', R, 'language'],
  ['kn_darshini', 0, 'KN Hindi Devanagari', 'भैया एक कॉफ़ी दो', R, 'language'],
  ['kn_darshini', 0, 'KN pure English', 'Give me one coffee please', R, 'language'],
  ['kn_darshini', 0, 'KN pizza + answer', 'i like pizza anna ondu coffee kodi', R, 'extra'],
  ['kn_darshini', 0, 'KN off-task Kannada', 'ನಾನು ನಾಳೆ ಊರಿಗೆ ಹೋಗ್ತೀನಿ', R],
  ['kn_darshini', 0, 'KN gibberish', 'asdf qwer zxcv', R],
  ['kn_darshini', 0, 'KN rude', 'you stupid old man ondu coffee kodi', R, 'rude'],
  ['kn_darshini', 1, 'KN decline: roman', 'beda anna coffee saaku', V],
  ['kn_darshini', 1, 'KN decline: script', 'ಬೇಡ ಅಣ್ಣ, ಕಾಫಿ ಸಾಕು', V],
  ['kn_darshini', 1, 'KN decline: partial', 'ಬೇಡ ಅಣ್ಣ', R],
  ['kn_auto', 0, 'KN auto suggested', 'MG Road ge hogbeku.', V],
  ['kn_auto', 0, 'KN auto script', 'ಎಂಜಿ ರೋಡ್ ಗೆ ಹೋಗಬೇಕು', V],
  ['kn_auto', 0, 'KN auto Hindi', 'bhaiya MG Road chalo', R, 'language'],
  ['kn_auto', 0, 'KN auto English', 'Take me to MG Road please', R, 'language'],
  ['kn_auto', 0, 'KN auto wrong place', 'airport ge hogbeku', R],
];

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
const ok = (c, out) => out.verdict === c[4] && (!c[5] || out.reason === c[5]);
console.log(`model request: ${jev.model}`);
console.log(`${pad('npc/step', 17)} ${pad('case', 28)} ${pad('exp', 6)} ${pad('got', 6)} ${pad('reason', 9)} ${pad('task', 5)} ${pad('unrel', 5)} ${pad('lang', 12)} ${pad('rude', 5)} ok`);
let bad = 0, used = '';
const rows = await Promise.all(CASES.map(async (c) => {
  const d = dialogues[c[0]], step = d.steps[c[1]];
  try {
    return [c, await jev.classify({ lang: d.lang, worldId: d.worldId, persona: d.persona, goal: d.goal, npcName: d.name, npcRole: d.role, step, reply: c[3] })];
  } catch (e) { return [c, { error: String(e?.message ?? e) }]; }
}));
for (const [c, out] of rows) {
  if (out.error) { bad++; console.log(`${pad(c[0] + '/' + c[1], 17)} ${pad(c[2], 28)} ERROR ${out.error}`); continue; }
  used = out.model; const s = summarize(out.answers), good = ok(c, out); if (!good) bad++;
  console.log(`${pad(c[0] + '/' + c[1], 17)} ${pad(c[2], 28)} ${pad(c[4] + (c[5] ? ':' + c[5].slice(0, 3) : ''), 6)} ${pad(out.verdict, 6)} ${pad(out.reason ?? '-', 9)} ${pad(s.does_task, 5)} ${pad(s.unrelated, 5)} ${pad(s.lang + ' ' + s.lang_conf, 12)} ${pad(s.rude, 5)} ${good ? 'ok' : 'MISS'}`);
}
console.log(`\nmodel used: ${used}; ${CASES.length - bad}/${CASES.length} as expected`);
process.exit(0);
