// Delhi traffic police at the Red Fort junction.
import { dialogue as D, step as S } from './kit.js';

export default D('trafficCop', {
  name: 'Yadav Ji', role: 'traffic police constable', site: 'Red Fort road junction', diff: 3,
  voice: { rate: 1.0, pitch: 0.8 },
  persona: 'Strict but fair traffic constable with a whistle and white gloves, who patiently gives directions and lectures about the signal.',
  goal: 'Ask the way to the Chandni Chowk metro station, ask if it is far, and promise to follow the signal.',
  steps: [
    S('way', ['हाँ जी, बोलिए। रास्ता भटक गए क्या?', 'Haan ji, boliye. Raasta bhatak gaye kya?', 'Yes, tell me. Did you lose your way?'],
      'Ask the way to the Chandni Chowk metro station.', ['Sir, Chandni Chowk metro ka raasta kidhar hai?', 'सर, चांदनी चौक मेट्रो का रास्ता किधर है?'],
      ['chandni chowk metro ka raasta kidhar hai', 'sir chandni chowk metro kahaan hai', 'chandni chowk metro station kaise jaun', 'paaji chandni chowk metro kidhar hai', 'chandni chowk metro kis taraf hai sir', 'metro ka raasta bata dijiye sir', 'चांदनी चौक मेट्रो का रास्ता'],
      ['Ask where the metro is.', 'Way = "raasta". Where = "kidhar".'],
      ['सीधे जाओ, फिर दाएँ मुड़ जाना। सामने ही मेट्रो है।', 'Seedhe jao, phir daayen mud jaana. Saamne hi metro hai.', 'Go straight, then turn right. The metro is right there.'],
      ['धीरे बोलो, मैं सीटी की आवाज़ में सुन नहीं पाया।', 'Dheere bolo, main seeti ki awaaz mein sun nahi paya.', 'Speak slowly, I could not hear over the whistle.']),
    S('far', ['सीधे जाओ, फिर दाएँ मुड़ना। सिग्नल के बाद।', 'Seedhe jao, phir daayen mudna. Signal ke baad.', 'Go straight, then turn right, after the signal.'],
      'Ask if it is very far.', ['Sir, kya wo bahut door hai?', 'सर, क्या वो बहुत दूर है?'],
      ['kya wo bahut door hai sir', 'bahut door hai kya sir', 'paidal ja sakte hain kya', 'sir wo kitni door hai', 'paaji wahan tak paidal jaa sakta hoon', 'door toh nahi hai na sir', 'क्या वो बहुत दूर है'],
      ['Ask about the distance.', 'Is it far = "door hai kya". Very = "bahut".'],
      ['नहीं नहीं, पाँच मिनट पैदल। आराम से पहुँच जाओगे।', 'Nahi nahi, paanch minute paidal. Aaram se pahunch jaoge.', 'No no, five minutes on foot. You will reach easily.'],
      ['दूर पूछ रहे हो? फिर से बोलो।', 'Door puchh rahe ho? Phir se bolo.', 'Are you asking about distance? Say it again.']),
    S('signal', ['पैदल जाओ तो ज़ेब्रा पर ही सड़क पार करना। समझे?', 'Paidal jao toh zebra par hi sadak paar karna. Samjhe?', 'If you walk, cross only at the zebra. Understood?'],
      'Promise to cross only at the zebra and follow the signal.', ['Ji sir, main signal dekhkar hi cross karunga.', 'जी सर, मैं सिग्नल देखकर ही क्रॉस करूँगा।'],
      ['ji sir signal dekhkar hi cross karunga', 'haan sir zebra crossing se hi jaunga', 'theek hai sir signal ka dhyan rakhunga', 'paaji main signal dekh ke hi chalunga', 'ji sir samajh gaya, signal follow karunga', 'sir main zebra par hi sadak paar karunga', 'जी सर, मैं सिग्नल देखकर क्रॉस करूँगा'],
      ['Promise to follow the rule.', 'Signal = "signal". I will watch and cross = "dekhkar cross karunga".'],
      ['शाबाश! पढ़े-लिखे लोग ही नियम मानते हैं। ऑल द बेस्ट।', 'Shabaash! Padhe-likhe log hi niyam maante hain. All the best.', 'Well done! Only educated people follow rules. All the best.'],
      ['सिर्फ़ हाँ बोलने से नहीं चलेगा, पक्का वादा करो।', 'Sirf haan bolne se nahi chalega, pakka vaada karo.', 'Just saying yes will not do, make a firm promise.']),
  ],
  outro: ['जाओ बेटा, तैयारी करो। चालान से हमेशा बचो!', 'Jao beta, taiyaari karo. Challan se hamesha bacho!', 'Go, beta, prepare well. Always stay away from challans!'],
  learned: [['metro ka raasta kidhar hai?', 'where is the way to the metro?'], ['kya wo bahut door hai?', 'is it very far?'], ['main signal dekhkar chalunga', 'I will go by the signal']],
  again: ['अरे तुम फिर? रास्ता याद है ना?', 'Arre tum phir? Raasta yaad hai na?', 'You again? You remember the way, right?'],
});
