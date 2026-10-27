// Kulfi and ice-cream seller at the India Gate lawns.
import { dialogue as D, step as S } from './kit.js';

export default D('golaWala', {
  name: 'Shiv Kumar', role: 'kulfi seller', site: 'India Gate lawns, ice-cream stall', diff: 2,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Cheerful kulfi seller promising the coldest cup on the lawn, popular with families and couples, with a soft spot for students.',
  goal: 'Order a malai kulfi, choose kesar topping, and pay fifty rupees.',
  steps: [
    S('order', ['ठंडी-ठंडी कुल्फ़ी! बोलो, कौन-सी चलेगी?', 'Thandi-thandi kulfi! Bolo, kaun-si chalegi?', 'Ice-cold kulfi! Tell me, which one?'],
      'Order one malai kulfi.', ['Bhaiya, ek malai kulfi dena.', 'भैया, एक मलाई कुल्फ़ी देना।'],
      ['ek malai kulfi dena bhaiya', 'bhaiya ek malai kulfi chahiye', 'paaji ek malai kulfi pa do', 'ek malai kulfi de do', 'oye bhaiya ek malai kulfi', 'mujhe ek malai kulfi chahiye', 'एक मलाई कुल्फ़ी दो'],
      ['Ask for one kulfi and name the flavour.', 'One = "ek". Cream kulfi = "malai kulfi".'],
      ['ये लो, सबसे ठंडी वाली। गर्मी भाग जाएगी!', 'Ye lo, sabse thandi wali. Garmi bhaag jaayegi!', 'Here, the coldest one. The heat will run away!'],
      ['कौन-सी कुल्फ़ी? ज़रा ऊँची आवाज़ में बोलो।', 'Kaun-si kulfi? Zara oonchi awaaz mein bolo.', 'Which kulfi? Speak up a little.']),
    S('topping', ['ऊपर से केसर डालूँ या पिस्ता?', 'Upar se kesar daalun ya pista?', 'Shall I put saffron on top, or pistachio?'],
      'Ask for saffron on top.', ['Upar se kesar daal dijiye.', 'ऊपर से केसर डाल दीजिए।'],
      ['upar se kesar daal do', 'kesar hi daalna bhaiya', 'paaji kesar pa do upar', 'kesar wali kulfi dena', 'bhaiya kesar upar se', 'mujhe kesar chahiye upar', 'ऊपर से केसर डालो'],
      ['Choose saffron.', 'Saffron = "kesar". On top = "upar se".'],
      ['केसर! राजा-महाराजा वाली पसंद है तुम्हारी।', 'Kesar! Raja-maharaja wali pasand hai tumhari.', 'Saffron! You have a royal taste.'],
      ['केसर या पिस्ता? एक चुनो।', 'Kesar ya pista? Ek chuno.', 'Saffron or pistachio? Pick one.']),
    S('pay', ['लो तैयार है। पचास रुपये हुए।', 'Lo taiyaar hai. Pachaas rupaye hue.', 'Here, it is ready. That is fifty rupees.'],
      'Pay fifty rupees.', ['Ye lijiye, pachaas rupaye.', 'ये लीजिए, पचास रुपये।'],
      ['ye lijiye pachaas rupaye', 'bhaiya pachaas rupaye ye lo', 'paaji pachaas rupaye ye lo', 'pachaas ka note ye lijiye', 'ye lo bhaiya pachaas', 'pachaas rupaye de raha hoon', 'ये लीजिए पचास रुपये'],
      ['Say the amount while paying.', 'Fifty = "pachaas".'],
      ['शुक्रिया! जल्दी खा लो, वरना पिघल जाएगी।', 'Shukriya! Jaldi kha lo, warna pighal jaayegi.', 'Thanks! Eat quickly or it will melt.'],
      ['कितने दे रहे हो? पचास रुपये की है।', 'Kitne de rahe ho? Pachaas rupaye ki hai.', 'How much are you giving? It costs fifty rupees.']),
  ],
  outro: ['पेपर में भी ऐसी ही ठंडक रखना, भाई! ऑल द बेस्ट।', 'Paper mein bhi aisi hi thandak rakhna, bhai! All the best.', 'Keep this same cool in the exam, brother! All the best.'],
  learned: [['ek malai kulfi dena', 'give me one malai kulfi'], ['upar se kesar daal dijiye', 'please put saffron on top'], ['ye lijiye, pachaas rupaye', 'here you go, fifty rupees']],
  again: ['कुल्फ़ी वाला याद है ना? आ जाओ, ठंडी है।', 'Kulfi wala yaad hai na? Aa jao, thandi hai.', 'You remember the kulfi man? Come, it is cold.'],
});
