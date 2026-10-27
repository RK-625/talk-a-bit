// Granthi at the gurudwara door.
import { dialogue as D, step as S } from './kit.js';

export default D('priest', {
  name: 'Giani Gurmeet Singh', role: 'granthi', site: 'Gurudwara door, golden dome and nishan sahib', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Serene, humble granthi in a navy turban who gently explains how to cover the head, wash the feet and eat langar, and blesses every visitor.',
  goal: 'Greet him with Sat Sri Akal, ask for a cloth to cover your head, and accept langar.',
  steps: [
    S('greet', ['वाहेगुरु जी का खालसा, वाहेगुरु जी की फ़तेह! आइए बेटा।', 'Waheguru ji ka Khalsa, Waheguru ji ki fateh! Aaiye beta.', 'Waheguru ji ka Khalsa, Waheguru ji ki fateh! Come, beta.'],
      'Greet him with Sat Sri Akal.', ['Sat Sri Akal ji, giani ji.', 'सत श्री अकाल जी, ज्ञानी जी।'],
      ['sat sri akal ji', 'sat sri akal giani ji', 'sat sri akal ji main rahul hoon', 'waheguru ji ka khalsa', 'sat shri akaal paaji', 'sat sri akal giani ji namaste', 'सत श्री अकाल जी'],
      ['Greet him the Sikh way.', '"Sat Sri Akal" is the greeting. Add "ji" to be respectful.'],
      ['सत श्री अकाल जी। भगवान आपका भला करे।', 'Sat Sri Akal ji. Waheguru aapka bhala kare.', 'Sat Sri Akal. May God bless you.'],
      ['धीरे से कहिए बेटा, सतनाम वाहेगुरु।', 'Dheere se kahiye beta, Satnam Waheguru.', 'Say it softly, beta. Satnam Waheguru.']),
    S('head', ['अंदर जाने से पहले सिर ढक लीजिए।', 'Andar jaane se pehle sir dhak lijiye.', 'Please cover your head before going in.'],
      'Ask for a cloth to cover your head.', ['Sir dhakne ke liye rumaal mil sakta hai?', 'सिर ढकने के लिए रुमाल मिल सकता है?'],
      ['sir dhakne ke liye rumaal mil sakta hai', 'giani ji sir dhakne ko kapda chahiye', 'rumaal mil jayega ji', 'paaji sir dhakne ke liye rumaal dijiye', 'mere paas rumaal nahi hai ji', 'kya yahan rumaal milega', 'सिर ढकने के लिए रुमाल मिल सकता है'],
      ['Ask for a cloth.', 'Head cover = "sir dhakna". Handkerchief = "rumaal".'],
      ['ये लीजिए, भगवे रंग का साफ़ रुमाल है। जूते उधर रख दीजिए।', 'Ye lijiye, bhagwe rang ka saaf rumaal hai. Joote udhar rakh dijiye.', 'Take this, a clean saffron cloth. Leave your shoes over there.'],
      ['क्या चाहिए बेटा? ज़रा खुलकर कहिए।', 'Kya chahiye beta? Zara khulkar kahiye.', 'What do you need, beta? Say it openly.']),
    S('langar', ['दर्शन के बाद लंगर छक कर जाना। प्रसाद भी लेंगे?', 'Darshan ke baad langar chhak kar jaana. Prasad bhi lenge?', 'After darshan, have langar before leaving. Will you take prasad?'],
      'Say yes, you will take prasad and langar.', ['Ji zaroor, main prasad aur langar lunga.', 'जी ज़रूर, मैं प्रसाद और लंगर लूँगा।'],
      ['ji zaroor main prasad aur langar lunga', 'haan ji prasad bhi langar bhi', 'zaroor giani ji langar chakhunga', 'ji paaji karah prasad bhi dijiye', 'haan ji main langar khaunga', 'prasad aur langar dono lunga ji', 'जी ज़रूर प्रसाद और लंगर'],
      ['Say yes politely.', 'Surely = "zaroor". I will take = "lunga".'],
      ['वाहेगुरु! पेट भर खाना, यहाँ कोई भूखा नहीं जाता।', 'Waheguru! Pet bhar khaana, yahan koi bhookha nahi jaata.', 'Waheguru! Eat to your fill, no one leaves hungry here.'],
      ['हाँ या ना, बेटा? लंगर में सबका स्वागत है।', 'Haan ya na, beta? Langar mein sabka swagat hai.', 'Yes or no, beta? Everyone is welcome at langar.']),
  ],
  outro: ['जाइए बेटा, मेहनत कीजिए। वाहेगुरु आपकी पढ़ाई में बरकत दें।', 'Jaiye beta, mehnat kijiye. Waheguru aapki padhai mein barkat den.', 'Go, beta, work hard. May Waheguru bless your studies.'],
  learned: [['Sat Sri Akal ji', 'the Sikh greeting'], ['sir dhakne ke liye rumaal mil sakta hai?', 'can I get a cloth to cover my head?'], ['main prasad aur langar lunga', 'I will take prasad and langar']],
  again: ['सत श्री अकाल बेटा। फिर आए, अच्छा लगा।', 'Sat Sri Akal beta. Phir aaye, accha laga.', 'Sat Sri Akal, beta. Nice to see you again.'],
});
