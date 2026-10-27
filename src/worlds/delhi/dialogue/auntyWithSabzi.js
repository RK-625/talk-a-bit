// Delhi aunty with a vegetable bag on Red Fort Road.
import { dialogue as D, step as S } from './kit.js';

export default D('auntyWithSabzi', {
  name: 'Sharma Aunty', role: 'Delhi aunty', site: 'Red Fort Road footpath', diff: 2,
  voice: { rate: 0.95, pitch: 1.1 },
  persona: 'Kind, nosy Delhi aunty going to the sabzi mandi, full of advice about PG rooms, tiffin and marriage for any young newcomer.',
  goal: 'Offer to carry her bag, tell her your name, and say you are from Patna preparing for UPSC.',
  steps: [
    S('bag', ['अरे बेटा, ये थैला बहुत भारी है। कमर दुख गई।', 'Arre beta, ye thaila bahut bhaari hai. Kamar dukh gayi.', 'Oh beta, this bag is so heavy. My back hurts.'],
      'Offer to carry her bag.', ['Laiye aunty, main thaila utha leta hoon.', 'लाइए आंटी, मैं थैला उठा लेता हूँ।'],
      ['aunty main thaila utha leta hoon', 'laiye aunty main utha deta hoon', 'aunty ji thaila mujhe dijiye', 'aunty bag mujhe de dijiye', 'main utha leta hoon aunty', 'aunty ji main le chalta hoon', 'लाइए आंटी मैं उठा लेता हूँ'],
      ['Offer to help with the bag.', 'Bag = "thaila". I will lift = "utha leta hoon".'],
      ['जीते रहो! आजकल ऐसे बच्चे कहाँ मिलते हैं।', 'Jeete raho! Aajkal aise bachche kahaan milte hain.', 'God bless you! Where do you find such kids these days.'],
      ['क्या बोला बेटा? कान में हवा गई, फिर से कहो।', 'Kya bola beta? Kaan mein hawa gayi, phir se kaho.', 'What did you say, beta? The wind got in my ear, say it again.']),
    S('name', ['चल साथ-साथ चलते हैं। तेरा नाम क्या है?', 'Chal saath-saath chalte hain. Tera naam kya hai?', 'Come, let us walk together. What is your name?'],
      'Tell her your name is Rahul.', ['Mera naam Rahul hai, aunty.', 'मेरा नाम राहुल है, आंटी।'],
      ['mera naam rahul hai', 'main rahul hoon aunty', 'aunty ji mera naam rahul hai', 'mujhe rahul kehte hain aunty', 'rahul naam hai mera', 'meri pehchaan rahul hai aunty', 'मेरा नाम राहुल है'],
      ['Say "my name is".', 'My name = "mera naam". Is = "hai".'],
      ['राहुल! अच्छा नाम है। मेरे भांजे का भी यही नाम है।', 'Rahul! Accha naam hai. Mere bhaanje ka bhi yahi naam hai.', 'Rahul! Nice name. My nephew has the same name.'],
      ['नाम बताना है बेटा, नाम। क्या है तेरा?', 'Naam batana hai beta, naam. Kya hai tera?', 'Tell me your name, beta, your name. What is it?']),
    S('from', ['कहाँ से है तू? क्या करता है दिल्ली में?', 'Kahaan se hai tu? Kya karta hai Dilli mein?', 'Where are you from? What do you do in Delhi?'],
      'Say you are from Patna and preparing for UPSC.', ['Main Patna se hoon, UPSC ki taiyaari kar raha hoon.', 'मैं पटना से हूँ, यूपीएससी की तैयारी कर रहा हूँ।'],
      ['main patna se hoon upsc ki taiyaari kar raha hoon', 'patna se hoon aunty upsc de raha hoon', 'aunty main patna ka hoon upsc prepare kar raha hoon', 'patna se aaya hoon upsc ki padhai karta hoon', 'main upsc ki taiyaari ke liye patna se aaya hoon', 'aunty ji patna se hoon upsc kar raha hoon', 'मैं पटना से हूँ यूपीएससी की तैयारी'],
      ['Say where you are from and what you do.', 'From Patna = "Patna se". Preparing = "taiyaari kar raha hoon".'],
      ['वाह! अफ़सर बनेगा! अच्छा बेटा, शादी कब करनी है?', 'Wah! Afsar banega! Accha beta, shaadi kab karni hai?', 'Wow! You will be an officer! So, beta, when are you getting married?'],
      ['कहाँ से और क्या करता है, दोनों बता।', 'Kahaan se aur kya karta hai, dono bata.', 'Tell both, where from and what you do.']),
  ],
  outro: ['चल बेटा, यहीं तक आना था। खाना टाइम पर खाना!', 'Chal beta, yahin tak aana tha. Khaana time par khaana!', 'That is far enough, beta. Eat on time!'],
  learned: [['main thaila utha leta hoon', 'I will carry the bag'], ['mera naam Rahul hai', 'my name is Rahul'], ['main Patna se hoon', 'I am from Patna']],
  again: ['अरे राहुल बेटा! खाना खाया कि नहीं?', 'Arre Rahul beta! Khaana khaya ki nahi?', 'Oh Rahul beta! Have you eaten or not?'],
});
