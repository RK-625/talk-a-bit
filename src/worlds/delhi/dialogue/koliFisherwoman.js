// Sarojini-style clothes seller at the India Gate quay.
import { dialogue as D, step as S } from './kit.js';

export default D('koliFisherwoman', {
  name: 'Sunita Didi', role: 'dupatta and kurti seller', site: 'India Gate quay, boat-club jetty', diff: 3,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Loud, laughing clothes seller with a tray of dupattas who bargains hard, matches colours, and calls everyone bhaiya or beta.',
  goal: 'Ask the price of a dupatta, bargain it down, and buy two.',
  steps: [
    S('price', ['आओ आओ भैया! बहन के लिए दुपट्टा ले जाओ, सौ में तीन!', 'Aao aao bhaiya! Behen ke liye dupatta le jao, sau mein teen!', 'Come come, brother! Take a dupatta for your sister, three for a hundred!'],
      'Ask the price of the marigold-yellow dupatta.', ['Didi, ye pila dupatta kitne ka hai?', 'दीदी, ये पीला दुपट्टा कितने का है?'],
      ['ye pila dupatta kitne ka hai', 'didi pila dupatta kya bhaav hai', 'ye dupatta kitne ka diya', 'didi ji ye dupatta kitne ka hai', 'ye wala dupatta kitne mein doge', 'paaji ye dupatta ka rate kya hai', 'ये पीला दुपट्टा कितने का है'],
      ['Ask the price of the dupatta.', 'How much = "kitne ka". Yellow = "pila".'],
      ['तुम्हारे लिए एक सौ चालीस का। सच कहती हूँ, सबसे बढ़िया कपड़ा है।', 'Tumhare liye ek sau chaalis ka. Sach kehti hoon, sabse badhiya kapda hai.', 'For you, one-forty. Honestly, it is the best cloth.'],
      ['क्या पूछा भैया? दाम का या रंग का?', 'Kya puchha bhaiya? Daam ka ya rang ka?', 'What did you ask, brother? Price or colour?']),
    S('bargain', ['एक सौ चालीस, इससे कम नहीं होगा। बोहनी का टाइम है।', 'Ek sau chaalis, isse kam nahi hoga. Bohni ka time hai.', 'One-forty, it cannot go lower. It is the first sale of the day.'],
      'Bargain: ask for two for one hundred twenty.', ['Thoda kam karo didi, do ek sau bees mein dedo.', 'थोड़ा कम करो दीदी, दो एक सौ बीस में दे दो।'],
      ['thoda kam karo didi do ek sau bees mein', 'do dupatte ek sau bees mein de do', 'didi do ke ek sau bees lagao', 'kam karo didi ek sau bees mein do', 'paaji do ek sau bees mein pakka karo', 'ek sau bees mein do dupatte dedo', 'थोड़ा कम करो दो एक सौ बीस में'],
      ['Ask for a lower price.', 'A little less = "thoda kam". Two = "do".'],
      ['अरे बाप रे, लूट रहे हो! चलो, तुम पढ़ने वाले हो, एक सौ बीस पक्का।', 'Are baap re, loot rahe ho! Chalo, tum padhne wale ho, ek sau bees pakka.', 'Goodness, you are robbing me! Fine, you are a student, one-twenty final.'],
      ['दाम बोलो भैया, कितने में लोगे?', 'Daam bolo bhaiya, kitne mein loge?', 'Name your price, brother, for how much will you take it?']),
    S('buy', ['चलो बोलो, कौन-से रंग के दूँ?', 'Chalo bolo, kaun-se rang ke dun?', 'Come on, tell me, which colours shall I give?'],
      'Say you will take one yellow and one pink.', ['Ek pila aur ek gulabi de dijiye.', 'एक पीला और एक गुलाबी दे दीजिए।'],
      ['ek pila aur ek gulabi dijiye', 'didi ek pila ek gulabi de do', 'pila aur gulabi dono pack karo', 'paaji ek pila te ek gulabi', 'mujhe pila aur gulabi chahiye', 'ek yellow ek pink de do didi', 'एक पीला और एक गुलाबी दीजिए'],
      ['Name the two colours.', 'Yellow = "pila", pink = "gulabi", and = "aur".'],
      ['ये लो, बैग में रख दिए। बहन खुश हो जाएगी!', 'Ye lo, bag mein rakh diye. Behen khush ho jaayegi!', 'Here, I put them in the bag. Your sister will be happy!'],
      ['रंग बताओ भैया, लाल, हरा, पीला?', 'Rang batao bhaiya, laal, hara, pila?', 'Tell me the colours, brother, red, green, yellow?']),
  ],
  outro: ['फिर आना भैया! अगली बार सौ में तीन ही दूँगी।', 'Phir aana bhaiya! Agli baar sau mein teen hi dungi.', 'Come again, brother! Next time I will give three for a hundred.'],
  learned: [['ye dupatta kitne ka hai?', 'how much is this dupatta?'], ['thoda kam karo', 'reduce it a little'], ['ek pila aur ek gulabi', 'one yellow and one pink']],
  again: ['अरे भैया आ गए! नया माल आया है।', 'Arre bhaiya aa gaye! Naya maal aaya hai.', 'Oh brother, you are here! New stock has come.'],
});
