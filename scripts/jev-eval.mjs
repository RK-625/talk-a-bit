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

// two sample Tamil dialogues (Chennai) and two Telugu ones (Hyderabad), inline for the same reason
const southern = (id, name, role, lang, worldId, persona, goal, steps) => ({ id, name, role, lang, worldId, persona, goal, steps });
Object.assign(dialogues, {
  ta_teakadai: southern('ta_teakadai', 'Murugan Anna', 'chaiwalaUncle', 'ta', 'chennai', 'Warm tea-kadai owner who is kind to Meera, a food blogger learning Tamil.', 'Order a tea at the tea kadai.', [
    { id: 'order', npc: kn('என்ன வேணும் மீரா?', 'Enna venum Meera?', 'What do you want, Meera?'), instruction: 'Ask for one tea.',
      suggest: { roman: 'Anna, oru tea kudunga.', text: 'அண்ணே, ஒரு டீ கொடுங்க.' }, intent: 'order_one_tea',
      accept: ['anna oru tea kudunga', 'oru tea venum anna', 'oru tea kudunga', 'anne oru tee kodunga', 'ஒரு டீ வேணும்', 'tea kudunga anna', 'oru chai kudunga anna'] },
    { id: 'biscuit', npc: kn('பிஸ்கட் வேணுமா?', 'Biscuit venuma?', 'Want a biscuit?'), instruction: 'Say no thanks, only tea is enough.',
      suggest: { roman: 'Venaam anna, tea mattum podhum.', text: 'வேணாம் அண்ணே, டீ மட்டும் போதும்.' }, intent: 'decline_biscuit',
      accept: ['venaam anna tea mattum podhum', 'venam anna', 'vendaam tea mattum podhum', 'வேணாம் அண்ணே', 'illa anna tea podhum', 'venaam podhum'] },
  ]),
  ta_auto: southern('ta_auto', 'Selvam', 'taxiDriver', 'ta', 'chennai', 'Chatty auto driver who haggles over the fare.', 'Ask an auto driver to take you to Marina Beach.', [
    { id: 'where', npc: kn('எங்க போகணும் மேடம்?', 'Enga poganum madam?', 'Where do you want to go, madam?'), instruction: 'Ask if he will go to Marina Beach.',
      suggest: { roman: 'Anna, Marina Beach varuma?', text: 'அண்ணே, மெரினா பீச் வருமா?' }, intent: 'ask_go_marina_beach',
      accept: ['anna marina beach varuma', 'marina beach varuma', 'marina beach pogaNum anna', 'anne marina beach varuvingala', 'மெரினா பீச் வருமா', 'marina beach poganum'] },
    { id: 'fare', npc: kn('நூறு ரூபா ஆகும்.', 'Nooru rubaa aagum.', 'It will be a hundred rupees.'), instruction: 'Say that is too much and offer seventy rupees.',
      suggest: { roman: 'Romba jaasthi anna, ezhupadhu rubaa tharen.', text: 'ரொம்ப ஜாஸ்தி அண்ணே, எழுபது ரூபா தர்றேன்.' }, intent: 'haggle_seventy',
      accept: ['romba jaasthi anna ezhupadhu rubaa tharen', 'jaasthi anna ezhupadhu rubaa', 'ezhupadhu rubaa tharen anna', 'romba athigam anna ezhupadhu', 'எழுபது ரூபா தர்றேன்', 'seventy rupees tharen anna'] },
  ]),
  te_irani: southern('te_irani', 'Saleem Bhai', 'chaiwalaUncle', 'te', 'hyderabad', 'Warm Irani cafe owner who encourages Sameer, a fresh graduate learning Telugu.', 'Order an Irani chai at the cafe.', [
    { id: 'order', npc: kn('ఏం కావాలి సమీర్?', 'Em kavali Sameer?', 'What do you want, Sameer?'), instruction: 'Ask for one Irani chai.',
      suggest: { roman: 'Anna, oka Irani chai ivvandi.', text: 'అన్నా, ఒక ఇరానీ చాయ్ ఇవ్వండి.' }, intent: 'order_one_irani_chai',
      accept: ['anna oka irani chai ivvandi', 'oka irani chai kavali', 'oka chai ivvandi anna', 'bhai oka irani chai ivvandi', 'ఒక ఇరానీ చాయ్ కావాలి', 'irani chai ivvandi anna'] },
    { id: 'biscuit', npc: kn('ఉస్మానియా బిస్కెట్ కావాలా?', 'Osmania biscuit kavala?', 'Want an Osmania biscuit?'), instruction: 'Say no thanks, only chai is enough.',
      suggest: { roman: 'Vaddu anna, chai chalu.', text: 'వద్దు అన్నా, చాయ్ చాలు.' }, intent: 'decline_biscuit',
      accept: ['vaddu anna chai chalu', 'vaddu anna', 'vaddandi chai chalu', 'వద్దు అన్నా', 'ledu anna chai chalu', 'vaddu chalu'] },
  ]),
  te_auto: southern('te_auto', 'Yadagiri', 'taxiDriver', 'te', 'hyderabad', 'Chatty auto driver who haggles over the meter.', 'Ask an auto driver to take you to Charminar.', [
    { id: 'where', npc: kn('ఎక్కడికి వెళ్ళాలి సార్?', 'Ekkadiki vellali sir?', 'Where do you want to go, sir?'), instruction: 'Ask if he will go to Charminar.',
      suggest: { roman: 'Anna, Charminar ki vastara?', text: 'అన్నా, చార్మినార్ కి వస్తారా?' }, intent: 'ask_go_charminar',
      accept: ['anna charminar ki vastara', 'charminar ki vastara', 'charminar ki vellali anna', 'anna charminar ki velthara', 'చార్మినార్ కి వస్తారా', 'charminar vastara anna'] },
    { id: 'fare', npc: kn('నూటయాభై అవుతుంది.', 'Nootayabhai avuthundi.', 'It will be one hundred fifty.'), instruction: 'Say that is too much and offer one hundred rupees.',
      suggest: { roman: 'Chala ekkuva anna, nooru rupayalu istanu.', text: 'చాలా ఎక్కువ అన్నా, నూరు రూపాయలు ఇస్తాను.' }, intent: 'haggle_hundred',
      accept: ['chala ekkuva anna nooru rupayalu istanu', 'ekkuva anna nooru istanu', 'nooru rupayalu istanu anna', 'chala ekkuva anna nooru', 'నూరు రూపాయలు ఇస్తాను', 'hundred rupees istanu anna'] },
  ]),
});

// two sample Malayalam dialogues (Kochi) and two Delhi Hindi ones, inline for the same reason
Object.assign(dialogues, {
  ml_chayakada: southern('ml_chayakada', 'Kuttan Chettan', 'chaiwalaUncle', 'ml', 'kerala', 'Warm chaya kada owner who is kind to Ananya, a backpacker learning Malayalam.', 'Order a chaya at the chaya kada.', [
    { id: 'order', npc: kn('എന്താ വേണ്ടത് മോളേ?', 'Entha vendathu mole?', 'What do you want, dear?'), instruction: 'Ask for one tea.',
      suggest: { roman: 'Chettaa, oru chaya tharamo?', text: 'ചേട്ടാ, ഒരു ചായ തരാമോ?' }, intent: 'order_one_tea',
      accept: ['chetta oru chaya tharamo', 'oru chaya venam chetta', 'oru chaya tharu chetta', 'chettaa oru chaya', 'ഒരു ചായ വേണം', 'chaya tharamo chetta', 'oru tea tharamo chetta'] },
    { id: 'pori', npc: kn('പഴം പൊരി വേണോ?', 'Pazham pori veno?', 'Want some pazham pori?'), instruction: 'Say yes, you want one pazham pori too.',
      suggest: { roman: 'Venam chetta, oru pazham pori kudi.', text: 'വേണം ചേട്ടാ, ഒരു പഴം പൊരി കൂടി.' }, intent: 'accept_pazham_pori',
      accept: ['venam chetta oru pazham pori kudi', 'venam chetta', 'athe oru pazham pori tharu', 'oru pazham pori venam', 'വേണം ചേട്ടാ', 'pazham pori venam chetta'] },
  ]),
  ml_auto: southern('ml_auto', 'Sajan', 'taxiDriver', 'ml', 'kerala', 'Chatty auto driver who haggles over the fare.', 'Ask an auto driver to take you to Fort Kochi.', [
    { id: 'where', npc: kn('എവിടെ പോകണം മാഡം?', 'Evide pokanam madam?', 'Where do you want to go, madam?'), instruction: 'Ask if he will go to Fort Kochi.',
      suggest: { roman: 'Chetta, Fort Kochi varumo?', text: 'ചേട്ടാ, ഫോർട്ട് കൊച്ചി വരുമോ?' }, intent: 'ask_go_fort_kochi',
      accept: ['chetta fort kochi varumo', 'fort kochi varumo', 'fort kochi pokanam chetta', 'chetta fort kochi varuvo', 'ഫോർട്ട് കൊച്ചി വരുമോ', 'fort kochi varamo chetta'] },
    { id: 'fare', npc: kn('നൂറു രൂപ ആകും.', 'Nooru roopa aakum.', 'It will be a hundred rupees.'), instruction: 'Say that is too much and offer seventy rupees.',
      suggest: { roman: 'Kooduthal aanu chetta, ezhupathu roopa tharam.', text: 'കൂടുതൽ ആണ് ചേട്ടാ, എഴുപത് രൂപ തരാം.' }, intent: 'haggle_seventy',
      accept: ['kooduthal aanu chetta ezhupathu roopa tharam', 'kooduthal chetta ezhupathu roopa', 'ezhupathu roopa tharam chetta', 'valare kooduthal ezhupathu', 'എഴുപത് രൂപ തരാം', 'seventy roopa tharam chetta'] },
  ]),
  hi_dilli_chai: southern('hi_dilli_chai', 'Bittu Bhaiya', 'chaiwalaUncle', 'hi', 'delhi', 'Chatty Delhi chai-stall owner who looks out for Rahul, a UPSC aspirant from Patna.', 'Order a chai and a bun-makhan at the stall.', [
    { id: 'order', npc: kn('हाँ बेटा, क्या चाहिए?', 'Haan beta, kya chahiye?', 'Yes son, what do you want?'), instruction: 'Ask for one chai.',
      suggest: { roman: 'Bhaiya, ek chai dena.', text: 'भैया, एक चाय देना।' }, intent: 'order_one_chai',
      accept: ['bhaiya ek chai dena', 'ek chai chahiye bhaiya', 'bhaiya ek chai de do', 'ek chai pilao bhaiya', 'भैया एक चाय देना', 'ek kadak chai dena bhaiya'] },
    { id: 'bun', npc: kn('साथ में बन-मक्खन लेगा?', 'Saath mein bun-makhan lega?', 'Will you have a bun-makhan with it?'), instruction: 'Say yes, one bun-makhan too.',
      suggest: { roman: 'Haan bhaiya, ek bun-makhan bhi dena.', text: 'हाँ भैया, एक बन-मक्खन भी देना।' }, intent: 'accept_bun_makhan',
      accept: ['haan bhaiya ek bun makhan bhi dena', 'haan ek bun makhan de do', 'bun makhan bhi dena bhaiya', 'haan bhaiya bun makhan', 'हाँ भैया बन मक्खन', 'ek bun makhan bhi'] },
  ]),
  hi_dilli_auto: southern('hi_dilli_auto', 'Pappu', 'taxiDriver', 'hi', 'delhi', 'Chatty Delhi auto driver who haggles over the fare.', 'Ask an auto driver to take you to Connaught Place.', [
    { id: 'where', npc: kn('कहाँ चलना है भाई?', 'Kahan chalna hai bhai?', 'Where do you want to go, brother?'), instruction: 'Ask if he will go to Connaught Place.',
      suggest: { roman: 'Bhaiya, Connaught Place chaloge?', text: 'भैया, कनॉट प्लेस चलोगे?' }, intent: 'ask_go_cp',
      accept: ['bhaiya connaught place chaloge', 'connaught place chaloge', 'cp chaloge bhaiya', 'bhaiya cp chalna hai', 'भैया कनॉट प्लेस चलोगे', 'connaught place jaana hai bhaiya'] },
    { id: 'fare', npc: kn('दो सौ लगेंगे।', 'Do sau lagenge.', 'It will be two hundred.'), instruction: 'Say that is too much and offer one hundred rupees.',
      suggest: { roman: 'Bahut zyada hai bhaiya, sau rupaye dunga.', text: 'बहुत ज़्यादा है भैया, सौ रुपये दूँगा।' }, intent: 'haggle_hundred',
      accept: ['bahut zyada hai bhaiya sau rupaye dunga', 'zyada hai bhaiya sau dunga', 'sau rupaye dunga bhaiya', 'bahut mehnga hai sau doonga', 'सौ रुपये दूँगा भैया', 'bhaiya sau de dunga'] },
  ]),
});

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
  // ---- Tamil (lang ta) ----
  ['ta_teakadai', 0, 'TA suggested phrase', 'Anna, oru tea kudunga.', V],
  ['ta_teakadai', 0, 'TA accepted variant', 'oru tea venum anna', V],
  ['ta_teakadai', 0, 'TA Tamil script', 'ஒரு டீ கொடுங்க', V],
  ['ta_teakadai', 0, 'TA Tanglish paraphrase', 'anna one strong tea kudunga please', V],
  ['ta_teakadai', 0, 'TA Whisper misspelt', 'anne oru thee kodunga', V],
  ['ta_teakadai', 0, 'TA wrong item (coffee)', 'anna oru coffee kudunga', R, 'off_task'],
  ['ta_teakadai', 0, 'TA wrong number', 'anna anju tea kudunga', R],
  ['ta_teakadai', 0, 'TA pure Hindi', 'bhaiya ek chai dena', R, 'language'],
  ['ta_teakadai', 0, 'TA Hindi Devanagari', 'भैया एक चाय दो', R, 'language'],
  ['ta_teakadai', 0, 'TA pure English', 'Give me one tea please', R, 'language'],
  ['ta_teakadai', 0, 'TA pizza + answer', 'i like pizza anna oru tea kudunga', R, 'extra'],
  ['ta_teakadai', 0, 'TA off-task Tamil', 'நான் நாளைக்கு ஊருக்குப் போறேன்', R],
  ['ta_teakadai', 0, 'TA gibberish', 'asdf qwer zxcv', R],
  ['ta_teakadai', 0, 'TA rude', 'you stupid old man oru tea kudunga', R, 'rude'],
  ['ta_teakadai', 1, 'TA decline: roman', 'venaam anna tea mattum podhum', V],
  ['ta_teakadai', 1, 'TA decline: script', 'வேணாம் அண்ணே, டீ மட்டும் போதும்', V],
  ['ta_teakadai', 1, 'TA decline: partial', 'வேணாம் அண்ணே', R],
  ['ta_auto', 0, 'TA auto suggested', 'Anna, Marina Beach varuma?', V],
  ['ta_auto', 0, 'TA auto script', 'அண்ணே, மெரினா பீச் வருமா', V],
  ['ta_auto', 0, 'TA auto Hindi', 'bhaiya Marina Beach chaloge', R, 'language'],
  ['ta_auto', 0, 'TA auto English', 'Take me to Marina Beach please', R, 'language'],
  ['ta_auto', 0, 'TA auto wrong place', 'anna airport varuma', R],
  ['ta_auto', 1, 'TA haggle suggested', 'Romba jaasthi anna, ezhupadhu rubaa tharen.', V],
  ['ta_auto', 1, 'TA haggle wrong amount', 'romba jaasthi anna, aimbadhu rubaa tharen', R],
  // ---- Telugu (lang te) ----
  ['te_irani', 0, 'TE suggested phrase', 'Anna, oka Irani chai ivvandi.', V],
  ['te_irani', 0, 'TE accepted variant', 'oka irani chai kavali', V],
  ['te_irani', 0, 'TE Telugu script', 'ఒక ఇరానీ చాయ్ ఇవ్వండి', V],
  ['te_irani', 0, 'TE Tenglish paraphrase', 'anna one irani chai ivvandi please', V],
  ['te_irani', 0, 'TE Whisper misspelt', 'ana oka irani chay ivandi', V],
  ['te_irani', 0, 'TE wrong item (coffee)', 'anna oka coffee ivvandi', R, 'off_task'],
  ['te_irani', 0, 'TE wrong number', 'anna aidu irani chai ivvandi', R],
  ['te_irani', 0, 'TE pure Hindi', 'bhai ek irani chai dena', R, 'language'],
  ['te_irani', 0, 'TE Hindi Devanagari', 'भाई एक ईरानी चाय दो', R, 'language'],
  ['te_irani', 0, 'TE pure English', 'Give me one Irani chai please', R, 'language'],
  ['te_irani', 0, 'TE pizza + answer', 'i like pizza anna oka irani chai ivvandi', R, 'extra'],
  ['te_irani', 0, 'TE off-task Telugu', 'నేను రేపు ఊరికి వెళ్తున్నాను', R],
  ['te_irani', 0, 'TE gibberish', 'asdf qwer zxcv', R],
  ['te_irani', 0, 'TE rude', 'you stupid old man oka irani chai ivvandi', R, 'rude'],
  ['te_irani', 1, 'TE decline: roman', 'vaddu anna chai chalu', V],
  ['te_irani', 1, 'TE decline: script', 'వద్దు అన్నా, చాయ్ చాలు', V],
  ['te_irani', 1, 'TE decline: partial', 'వద్దు అన్నా', R],
  ['te_auto', 0, 'TE auto suggested', 'Anna, Charminar ki vastara?', V],
  ['te_auto', 0, 'TE auto script', 'అన్నా, చార్మినార్ కి వస్తారా', V],
  ['te_auto', 0, 'TE auto Hindi', 'bhaiya Charminar chaloge', R, 'language'],
  ['te_auto', 0, 'TE auto English', 'Take me to Charminar please', R, 'language'],
  ['te_auto', 0, 'TE auto wrong place', 'anna airport ki vastara', R],
  ['te_auto', 1, 'TE haggle suggested', 'Chala ekkuva anna, nooru rupayalu istanu.', V],
  ['te_auto', 1, 'TE haggle wrong amount', 'chala ekkuva anna, aravai rupayalu istanu', R],
  // ---- Malayalam (lang ml) ----
  ['ml_chayakada', 0, 'ML suggested phrase', 'Chettaa, oru chaya tharamo?', V],
  ['ml_chayakada', 0, 'ML accepted variant', 'oru chaya venam chetta', V],
  ['ml_chayakada', 0, 'ML Malayalam script', 'ഒരു ചായ തരാമോ', V],
  ['ml_chayakada', 0, 'ML Manglish paraphrase', 'chetta one strong chaya tharamo please', V],
  ['ml_chayakada', 0, 'ML Whisper misspelt', 'chetta oru chaaya tharumo', V],
  ['ml_chayakada', 0, 'ML wrong item (coffee)', 'chetta oru coffee tharamo', R, 'off_task'],
  ['ml_chayakada', 0, 'ML wrong number', 'chetta anju chaya tharamo', R],
  ['ml_chayakada', 0, 'ML pure Hindi', 'bhaiya ek chai dena', R, 'language'],
  ['ml_chayakada', 0, 'ML Hindi Devanagari', 'भैया एक चाय दो', R, 'language'],
  ['ml_chayakada', 0, 'ML Tamil reply', 'anna oru tea kudunga', R, 'language'],
  ['ml_chayakada', 0, 'ML pure English', 'Give me one tea please', R, 'language'],
  ['ml_chayakada', 0, 'ML pizza + answer', 'i like pizza chetta oru chaya tharamo', R, 'extra'],
  ['ml_chayakada', 0, 'ML off-task Malayalam', 'ഞാൻ നാളെ നാട്ടിൽ പോകും', R],
  ['ml_chayakada', 0, 'ML gibberish', 'asdf qwer zxcv', R],
  ['ml_chayakada', 0, 'ML rude', 'you stupid old man oru chaya tharamo', R, 'rude'],
  ['ml_chayakada', 1, 'ML yes: roman', 'venam chetta, oru pazham pori kudi', V],
  ['ml_chayakada', 1, 'ML yes: script', 'വേണം ചേട്ടാ, ഒരു പഴം പൊരി കൂടി', V],
  ['ml_chayakada', 1, 'ML yes: vennam spelling', 'vennam chetta oru pazhampori', V],
  ['ml_chayakada', 1, 'ML yes: partial', 'വേണം ചേട്ടാ', R],
  ['ml_auto', 0, 'ML auto suggested', 'Chetta, Fort Kochi varumo?', V],
  ['ml_auto', 0, 'ML auto script', 'ചേട്ടാ, ഫോർട്ട് കൊച്ചി വരുമോ', V],
  ['ml_auto', 0, 'ML auto Hindi', 'bhaiya Fort Kochi chaloge', R, 'language'],
  ['ml_auto', 0, 'ML auto English', 'Take me to Fort Kochi please', R, 'language'],
  ['ml_auto', 0, 'ML auto Tamil (romanised)', 'anna Fort Kochi ku varuveengala, meter podunga', R, 'language'],
  ['ml_chayakada', 0, 'ML Tamil Tanglish', 'anna enakku oru tea venum', R, 'language'],
  ['ml_auto', 0, 'ML auto wrong place', 'chetta airport varumo', R],
  ['ml_auto', 1, 'ML haggle suggested', 'Kooduthal aanu chetta, ezhupathu roopa tharam.', V],
  ['ml_auto', 1, 'ML haggle wrong amount', 'kooduthal aanu chetta, aimbathu roopa tharam', R],
  // ---- Delhi Hindi (lang hi, worldId delhi) ----
  ['hi_dilli_chai', 0, 'DEL suggested phrase', 'Bhaiya, ek chai dena.', V],
  ['hi_dilli_chai', 0, 'DEL Punjabi-flavoured', 'paaji ek chai dena', V],
  ['hi_dilli_chai', 0, 'DEL slang paraphrase', 'oye bhaiya ek kadak chai pila de yaar', V],
  ['hi_dilli_chai', 0, 'DEL Devanagari', 'भैया एक चाय देना', V],
  ['hi_dilli_chai', 0, 'DEL wrong item (coffee)', 'bhaiya ek coffee dena', R, 'off_task'],
  ['hi_dilli_chai', 0, 'DEL pure English', 'One tea please sir', R, 'language'],
  ['hi_dilli_chai', 0, 'DEL Tamil reply', 'anna oru tea kudunga', R, 'language'],
  ['hi_dilli_chai', 0, 'DEL pizza + answer', 'mujhe pizza pasand hai bhaiya ek chai dena', R, 'extra'],
  ['hi_dilli_chai', 1, 'DEL bun: yes', 'haan bhaiya ek bun makhan bhi dena', V],
  ['hi_dilli_chai', 1, 'DEL bun: slang', 'haan yaar, bun makhan bhi laga de', V],
  ['hi_dilli_chai', 1, 'DEL bun: no (wrong)', 'nahi bhaiya sirf chai', R],
  ['hi_dilli_auto', 0, 'DEL auto suggested', 'Bhaiya, Connaught Place chaloge?', V],
  ['hi_dilli_auto', 0, 'DEL auto CP slang', 'paaji CP chalna hai, chalega', V],
  ['hi_dilli_auto', 0, 'DEL auto English', 'Take me to Connaught Place please', R, 'language'],
  ['hi_dilli_auto', 1, 'DEL haggle suggested', 'Bahut zyada hai bhaiya, sau rupaye dunga.', V],
  ['hi_dilli_auto', 1, 'DEL haggle Punjabi', 'oye paaji bahut zyada hai, sau de dunga', V],
  ['hi_dilli_auto', 1, 'DEL haggle wrong amount', 'bahut zyada hai bhaiya, pachaas rupaye dunga', R],
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
