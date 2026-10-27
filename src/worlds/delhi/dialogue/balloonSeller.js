// Balloon seller on the India Gate steps.
import { dialogue as D, step as S } from './kit.js';

export default D('balloonSeller', {
  name: 'Guddu', role: 'balloon seller', site: 'India Gate steps, plaza', diff: 2,
  voice: { rate: 1.05, pitch: 1.0 },
  persona: 'Cheerful balloon seller holding a huge bunch up to children, who always tries to sell tricolour balloons and bargains by ten rupees.',
  goal: 'Ask the price of a tricolour balloon, bargain for three, and say they are for your nephew.',
  steps: [
    S('price', ['गुब्बारे ले लो, गुब्बारे! तिरंगे वाले भी हैं!', 'Gubbare le lo, gubbare! Tiranga wale bhi hain!', 'Balloons, get your balloons! Tricolour ones too!'],
      'Ask the price of one tricolour balloon.', ['Bhaiya, tiranga gubbara kitne ka hai?', 'भैया, तिरंगा गुब्बारा कितने का है?'],
      ['tiranga gubbara kitne ka hai', 'bhaiya ye gubbara kitne ka hai', 'ek gubbare ka kya rate hai', 'paaji tiranga gubbara kitne da hai', 'ye tiranga wala kya bhaav hai', 'gubbare ka daam kya hai bhaiya', 'तिरंगा गुब्बारा कितने का है'],
      ['Ask the price of one balloon.', 'How much = "kitne ka". Balloon = "gubbara".'],
      ['दस रुपये का एक, भैया। बिल्कुल नया हवा भरा है!', 'Das rupaye ka ek, bhaiya. Bilkul naya hawa bhara hai!', 'Ten rupees each, brother. Freshly filled with air!'],
      ['क्या कहा भैया? भीड़ में सुनाई नहीं दिया।', 'Kya kaha bhaiya? Bheed mein sunai nahi diya.', 'What did you say, brother? I could not hear in the crowd.']),
    S('bargain', ['दस का एक, तीन के तीस। इससे कम नहीं।', 'Das ka ek, teen ke tees. Isse kam nahi.', 'Ten each, three for thirty. Not lower.'],
      'Bargain: three balloons for twenty-five.', ['Teen gubbare pachchis mein de do na.', 'तीन गुब्बारे पच्चीस में दे दो न।'],
      ['teen gubbare pachchis mein de do', 'bhaiya pachchis mein teen dedo', 'paaji teen da pachchis lagao', 'thoda kam karo teen pachchis mein', 'teen ke pachchis mein pakka karo', 'pachchis mein teen de do yaar', 'तीन गुब्बारे पच्चीस में दो'],
      ['Ask for a discount on three.', 'Three = "teen". Twenty-five = "pachchis".'],
      ['अच्छा चलो, पढ़ाई वाले भैया के लिए पच्चीस ही सही।', 'Accha chalo, padhai wale bhaiya ke liye pachchis hi sahi.', 'Okay fine, twenty-five for the studious brother.'],
      ['तीन के कितने दोगे? पैसे बोलो न।', 'Teen ke kitne doge? Paise bolo na.', 'How much for three? Name the money.']),
    S('child', ['किसके लिए ले रहे हो? बच्चा है क्या घर में?', 'Kiske liye le rahe ho? Bachcha hai kya ghar mein?', 'Who are you buying for? Is there a child at home?'],
      'Say they are for your little nephew.', ['Ye mere chhote bhaanje ke liye hain.', 'ये मेरे छोटे भांजे के लिए हैं।'],
      ['ye mere chhote bhaanje ke liye hain', 'bhaanje ke liye le raha hoon', 'ye balloons bhatije ke liye hain', 'paaji ghar ke bachche ke liye hain', 'chhote bachche ke liye le raha hoon', 'mere bhanje ko pasand hain gubbare', 'ये मेरे भांजे के लिए हैं'],
      ['Say who the balloons are for.', 'For my nephew = "mere bhaanje ke liye".'],
      ['वाह! मामा हो तो ऐसा। लो, एक छोटा सा सफ़ेद भी मेरी तरफ़ से।', 'Wah! Mama ho toh aisa. Lo, ek chhota sa safed bhi meri taraf se.', 'Wow! A good uncle indeed. Here, a small white one from me too.'],
      ['बच्चे के लिए हैं या अपने लिए? बताओ।', 'Bachche ke liye hain ya apne liye? Batao.', 'For a child or for yourself? Tell me.']),
  ],
  outro: ['ले जाओ भैया! हवा में छोड़ना मत, डोरी पकड़कर रखना।', 'Le jao bhaiya! Hawa mein chhodna mat, dori pakadkar rakhna.', 'Take them, brother! Do not let go, hold the string tight.'],
  learned: [['tiranga gubbara kitne ka hai?', 'how much is the tricolour balloon?'], ['teen pachchis mein de do', 'give three for twenty-five'], ['mere bhaanje ke liye', 'for my nephew']],
  again: ['अरे फिर आए? इस बार लाल वाला लो!', 'Arre phir aaye? Is baar laal wala lo!', 'Back again? Take the red one this time!'],
});
