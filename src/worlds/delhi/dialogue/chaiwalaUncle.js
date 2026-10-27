// Tutorial: the easiest conversation. Keyed by role `chaiwalaUncle` (Bittu Bhaiya at the chai stall, the spawn spot).
import { dialogue as D, step as S } from './kit.js';

export default D('chaiwalaUncle', {
  name: 'Bittu Bhaiya', role: 'chai-stall owner', site: "Bittu Bhaiya's chai-stall square, chai stall counter (spawn)", diff: 1, tutorial: true, place: 'chai stall',
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Warm, teasing chai-stall owner who treats Rahul, the UPSC aspirant from Patna, like a younger brother. Speaks simply and slowly, calls him beta and bhai.',
  goal: 'Order one ginger chai and a bun-makhan from Bittu Bhaiya (tutorial).',
  steps: [
    S('order', ['आ जा राहुल बेटा, बैठ! बोल, क्या पिएगा?', 'Aa ja Rahul beta, baith! Bol, kya piyega?', 'Come, Rahul beta, sit! Tell me, what will you drink?'],
      'Order one ginger (adrak) chai.', ['Bhaiya, ek adrak wali chai dena.', 'भैया, एक अदरक वाली चाय देना।'],
      ['ek adrak wali chai chahiye bhaiya', 'bhaiya ek chai dena', 'bhaiya ek chai pila do', 'paaji ek adrak chai dena', 'oye bhaiya ek chai laga de', 'mujhe ek adrak wali chai chahiye', 'भैया एक चाय दो'],
      ['Call him "bhaiya" and ask for one chai.', 'One = "ek", ginger = "adrak", please give = "dena".'],
      ['ये ले, कड़क अदरक वाली। गरम है, फूँक के पीना।', 'Ye le, kadak adrak wali. Garam hai, phoonk ke peena.', 'Here, strong ginger chai. It is hot, blow before you sip.'],
      ['अरे, भीड़ में सुनाई नहीं दिया। फिर से बोल।', 'Arre, bheed mein sunai nahi diya. Phir se bol.', 'Hey, I could not hear in the crowd. Say it again.']),
    S('bun', ['साथ में बन-मक्खन भी चलेगा, यूपीएससी वाले?', 'Saath mein bun-makhan bhi chalega, UPSC wale?', 'Will a bun-makhan go with it, UPSC man?'],
      'Say yes, you want a bun-makhan too.', ['Haan bhaiya, bun-makhan bhi laga do.', 'हाँ भैया, बन-मक्खन भी लगा दो।'],
      ['haan bun makhan bhi de do', 'bun makhan bhi dena bhaiya', 'haan paaji bun makhan laga do', 'haan ji bun makhan chalega', 'haan yaar bun makhan bhi', 'हाँ भैया बन मक्खन भी'],
      ['Say yes, then name the bun.', 'Yes = "haan", also = "bhi", put on = "laga do".'],
      ['ले, मक्खन मोटा लगाया है। दिमाग को ताक़त मिलेगी!', 'Le, makhan mota lagaya hai. Dimaag ko taaqat milegi!', 'Here, thick butter. Your brain will get strength!'],
      ['हाँ बोल या ना बोल, बन ठंडा हो रहा है।', 'Haan bol ya na bol, bun thanda ho raha hai.', 'Say yes or no, the bun is getting cold.']),
    S('thanks', ['चल, चाय पी और पढ़ाई पर लग जा। पैसे बाद में।', 'Chal, chai pi aur padhai par lag ja. Paise baad mein.', 'Go on, drink your chai and get to studying. Money later.'],
      'Say thank you to Bittu Bhaiya.', ['Shukriya bhaiya, chai bahut badhiya hai!', 'शुक्रिया भैया, चाय बहुत बढ़िया है!'],
      ['shukriya bhaiya', 'thank you bhaiya', 'dhanyavaad bhaiya', 'shukriya paaji', 'thanks bhaiya chai mast hai', 'bahut shukriya bhaiya', 'शुक्रिया भैया'],
      ['Thank him in Hindi.', 'Thank you = "shukriya". Add "bhaiya".'],
      ['अरे, शुक्रिया छोड़। बस पेपर में टॉप कर, फिर पार्टी देना!', 'Arre, shukriya chhod. Bas paper mein top kar, phir party dena!', 'Forget thanks. Just top the paper, then throw a party!'],
      ['कुछ तो बोल, चाय का शुक्रिया भी नहीं?', 'Kuch toh bol, chai ka shukriya bhi nahi?', 'Say something, not even thanks for the chai?']),
  ],
  outro: ['शाबाश राहुल! अब पूरी दिल्ली घूम आ। ऑल द बेस्ट!', 'Shabaash Rahul! Ab poori Dilli ghoom aa. All the best!', 'Well done, Rahul! Now go and explore all of Delhi. All the best!'],
  learned: [['ek chai dena', 'give me one chai'], ['bun-makhan bhi laga do', 'add a bun-makhan too'], ['shukriya bhaiya', 'thank you, brother']],
  again: ['आ गया? चाय तैयार है, बैठ जा।', 'Aa gaya? Chai taiyaar hai, baith ja.', 'You are here? Chai is ready, sit down.'],
});
