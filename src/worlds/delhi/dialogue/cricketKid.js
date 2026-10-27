// Gully cricket batter at the chai-stall square.
import { dialogue as D, step as S } from './kit.js';

export default D('cricketKid', {
  name: 'Chintu', role: 'gully cricket batter', site: "Bittu Bhaiya's chai-stall square, cricket gully", diff: 2,
  voice: 'k',
  persona: 'Bossy kid batter in the gully who makes up the rules as he goes and shouts "out hai" and "not out" at everyone.',
  goal: 'Ask to join the game, choose to bowl first, and tell the kid the ball was out.',
  steps: [
    S('join', ['ओए भैया, चाय छोड़ो! खेलोगे क्या हमारे साथ?', 'Oye bhaiya, chai chhodo! Khelonge kya hamare saath?', 'Oye brother, leave the chai! Will you play with us?'],
      'Ask if you can join the game.', ['Haan, main bhi khel sakta hoon kya?', 'हाँ, मैं भी खेल सकता हूँ क्या?'],
      ['main bhi khel sakta hoon kya', 'mujhe bhi khilao yaar', 'oye main bhi khelunga', 'mujhe bhi team mein le lo', 'kya main bhi game mein aa jaun', 'main bhi khelna chahta hoon', 'मैं भी खेल सकता हूँ क्या'],
      ['Ask to be included.', 'Can I play = "khel sakta hoon". Also = "bhi".'],
      ['चल आ जा! पर नियम मेरे चलेंगे, एक टप्पा आउट!', 'Chal aa ja! Par niyam mere chalenge, ek tappa out!', 'Come on! But my rules apply, one bounce is out!'],
      ['क्या बोले? खेलना है या सिर्फ़ देखना है?', 'Kya bole? Khelna hai ya sirf dekhna hai?', 'What did you say? Do you want to play or just watch?']),
    S('bowl', ['पहले बैटिंग मेरी! तुम बॉलिंग करोगे ना?', 'Pehle batting meri! Tum bowling karoge na?', 'I bat first! You will bowl, right?'],
      'Say yes, you will bowl first.', ['Theek hai, pehle main bowling karunga.', 'ठीक है, पहले मैं बॉलिंग करूँगा।'],
      ['pehle main bowling karunga', 'haan bowling main karta hoon', 'oye theek hai main bowl karunga', 'chal pehle main gend dalta hoon', 'theek hai bowling meri', 'main pehle bowling karunga yaar', 'ठीक है पहले मैं बॉलिंग करूँगा'],
      ['Agree to bowl.', 'I will bowl = "bowling karunga". First = "pehle".'],
      ['ये ली गेंद! और याद रखना, टप्पा खाकर आए तो वाइड है।', 'Ye li gend! Aur yaad rakhna, tappa khaakar aaye toh wide hai.', 'Here is the ball! And remember, if it bounces it is a wide.'],
      ['बैटिंग मेरी है, बॉलिंग तुम्हारी। हाँ या ना?', 'Batting meri hai, bowling tumhari. Haan ya na?', 'Batting is mine, bowling yours. Yes or no?']),
    S('out', ['अरे! गेंद पैड पर लगी। नॉट आउट है ना, भैया?', 'Are! Gend pad par lagi. Not out hai na, bhaiya?', 'Hey! The ball hit my pad. Not out, right, brother?'],
      'Say no, it is out.', ['Nahi bhai, ye to out hai!', 'नहीं भाई, ये तो आउट है!'],
      ['nahi bhai ye to out hai', 'oye out hai out hai', 'bilkul out hai chintu', 'nahi yaar ye out hai', 'out hai bhai pad par lagi', 'ye out hai chintu hat ja', 'नहीं भाई ये आउट है'],
      ['Disagree with the kid.', 'No = "nahi". It is out = "out hai".'],
      ['धत्त! अच्छा ठीक है, आउट। अगली बार तुम्हारी ख़ैर नहीं!', 'Dhatt! Accha theek hai, out. Agli baar tumhari khair nahi!', 'Darn! Fine, out. Next time you are in trouble!'],
      ['आउट बोलो या नॉट आउट, जल्दी बोलो!', 'Out bolo ya not out, jaldi bolo!', 'Say out or not out, quickly!']),
  ],
  outro: ['मज़ा आया भैया! कल फिर आना, टीम में जगह पक्की!', 'Maza aaya bhaiya! Kal phir aana, team mein jagah pakki!', 'That was fun, brother! Come again tomorrow, your place is fixed!'],
  learned: [['main bhi khel sakta hoon kya?', 'can I play too?'], ['pehle main bowling karunga', 'I will bowl first'], ['ye to out hai', 'this is out']],
  again: ['भैया आ गए! चलो, एक ओवर और!', 'Bhaiya aa gaye! Chalo, ek over aur!', 'Brother is here! Come on, one more over!'],
});
