// Golgappe wala at the India Gate lawns.
import { dialogue as D, step as S } from './kit.js';

export default D('bhelWala', {
  name: 'Ramu Bhaiya', role: 'golgappe wala', site: 'India Gate lawns, golgappe cart', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Joking golgappe seller who tosses puris with potato and tangy water and counts how many you can eat in a row.',
  goal: 'Order a plate of golgappe, ask for spicy water with less chilli, and pay twenty rupees.',
  steps: [
    S('order', ['गोलगप्पे खाएगा, भाई? कितने लगाऊँ?', 'Golgappe khaayega, bhai? Kitne lagaun?', 'Will you have golgappe, brother? How many shall I serve?'],
      'Order one plate of golgappe.', ['Bhaiya, ek plate golgappe lagao.', 'भैया, एक प्लेट गोलगप्पे लगाओ।'],
      ['ek plate golgappe lagao bhaiya', 'bhaiya ek plate golgappe dena', 'paaji ek plate golgappe', 'golgappe khilao bhaiya ek plate', 'ek plate golgappe chahiye', 'oye bhaiya ek plate lagana', 'एक प्लेट गोलगप्पे दो'],
      ['Ask for one plate.', 'One plate = "ek plate". Serve = "lagao".'],
      ['ये ले पहला! मुँह पूरा खोल, एक बार में पूरा जाएगा।', 'Ye le pehla! Munh poora khol, ek baar mein poora jaayega.', 'Here is the first! Open your mouth wide, it goes in whole.'],
      ['कितने गोलगप्पे? ज़रा साफ़ बोल भाई।', 'Kitne golgappe? Zara saaf bol bhai.', 'How many golgappe? Speak a bit clearly, brother.']),
    S('spice', ['पानी तीखा डालूँ या मीठा?', 'Paani teekha daalun ya meetha?', 'Shall I use spicy water or sweet?'],
      'Ask for spicy water but with less chilli.', ['Pani teekha, par mirchi kam rakhna.', 'पानी तीखा, पर मिर्च कम रखना।'],
      ['teekha pani par mirchi kam', 'pani teekha dena mirchi kam rakhna', 'thoda teekha dena zyada mirchi nahi', 'paaji teekha pani te mirchi ghat', 'bhaiya mirchi kam teekha pani', 'teekha chalega par mirchi kam', 'पानी तीखा पर मिर्च कम'],
      ['Say spicy, but not too much.', 'Spicy water = "pani teekha". Less chilli = "mirchi kam".'],
      ['अच्छा, पढ़ाकू के लिए हल्का तीखा। ले, पूरा पी जा।', 'Accha, padhaku ke liye halka teekha. Le, poora pi ja.', 'Okay, mildly spicy for the bookworm. Here, drink it all.'],
      ['तीखा या मीठा, बस एक बोल।', 'Teekha ya meetha, bas ek bol.', 'Spicy or sweet, just say one.']),
    S('pay', ['छह हो गए! बीस रुपये की प्लेट है।', 'Chhe ho gaye! Bees rupaye ki plate hai.', 'Six done! The plate is twenty rupees.'],
      'Pay twenty rupees.', ['Ye lo bhaiya, bees rupaye.', 'ये लो भैया, बीस रुपये।'],
      ['ye lo bees rupaye', 'bhaiya bees rupaye ye lijiye', 'paaji bees rupaye ye lo', 'bees ka note ye lo bhaiya', 'bees rupaye de raha hoon bhaiya', 'ye lijiye bees rupaye', 'ये लो बीस रुपये'],
      ['Say the amount as you pay.', 'Twenty = "bees". Rupees = "rupaye".'],
      ['शाबाश! अब एक सूखा पुड़ी मुफ़्त, मेरी तरफ़ से।', 'Shabaash! Ab ek sukha puri muft, meri taraf se.', 'Well done! Now a free dry puri from me.'],
      ['बीस रुपये बोल, कितने दे रहा है?', 'Bees rupaye bol, kitne de raha hai?', 'Say twenty rupees, how much are you giving?']),
  ],
  outro: ['जा भाई, कल फिर आना। गिनती याद रखना, कल सात खाने हैं!', 'Ja bhai, kal phir aana. Ginti yaad rakhna, kal saat khaane hain!', 'Go brother, come tomorrow. Remember the count, seven tomorrow!'],
  learned: [['ek plate golgappe lagao', 'serve one plate of golgappe'], ['mirchi kam rakhna', 'keep the chilli low'], ['ye lo, bees rupaye', 'here, twenty rupees']],
  again: ['आ गया गोलगप्पे वाला शौक़ीन! प्लेट लगाऊँ?', 'Aa gaya golgappe wala shauqeen! Plate lagaun?', 'The golgappe lover is back! Shall I serve a plate?'],
});
