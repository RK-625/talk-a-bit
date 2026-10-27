// Chole kulche wala at the chai-stall square.
import { dialogue as D, step as S } from './kit.js';

export default D('vadaPavWala', {
  name: 'Sonu Bhaiya', role: 'chole kulche wala', site: "Bittu Bhaiya's chai-stall square, chole kulche cart", diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Chatty chole kulche seller, always counting plates, who likes the studious UPSC boy from Patna and tells him to eat properly.',
  goal: 'Order two plates of chole kulche, ask for onion and lemon, and pay Rs 120.',
  steps: [
    S('order', ['गरम-गरम छोले कुलचे! कितनी प्लेट लगाऊँ?', 'Garam-garam chole kulche! Kitni plate lagaun?', 'Hot chole kulche! How many plates shall I serve?'],
      'Order two plates of chole kulche.', ['Bhaiya, do plate chole kulche lagana.', 'भैया, दो प्लेट छोले कुलचे लगाना।'],
      ['do plate chole kulche dena bhaiya', 'bhaiya do plate chahiye', 'paaji do plate chole kulche laga do', 'do plate chole kulche', 'oye bhaiya do plate lagana', 'mujhe do plate chole kulche chahiye', 'दो प्लेट छोले कुलचे दो'],
      ['Say how many plates you want.', 'Two = "do", plate = "plate", serve = "lagana".'],
      ['दो प्लेट! आज तो रिवीज़न का दिन लगता है।', 'Do plate! Aaj toh revision ka din lagta hai.', 'Two plates! Looks like a revision day today.'],
      ['कितनी प्लेट बोला? भीड़ में सुनाई नहीं दिया।', 'Kitni plate bola? Bheed mein sunai nahi diya.', 'How many plates did you say? I could not hear in the crowd.']),
    S('extras', ['प्याज़ और नींबू डालूँ, या सिर्फ़ चटनी?', 'Pyaaz aur nimbu daalun, ya sirf chutney?', 'Shall I add onion and lemon, or only chutney?'],
      'Ask for onion and lemon on top.', ['Pyaaz aur nimbu zaroor daalna.', 'प्याज़ और नींबू ज़रूर डालना।'],
      ['pyaaz aur nimbu daal do bhaiya', 'pyaaz nimbu bhi daalna', 'haan pyaaz nimbu dono', 'paaji pyaaz te nimbu pa do', 'bhaiya pyaaz nimbu zyada', 'onion aur lemon daalna bhaiya', 'प्याज़ और नींबू डालना'],
      ['Name the two toppings.', 'Onion = "pyaaz", lemon = "nimbu", add = "daalna".'],
      ['ये लो, ऊपर से चटनी भी। ढेर सारा नींबू निचोड़ा है!', 'Ye lo, upar se chutney bhi. Dher saara nimbu nichoda hai!', 'Here, chutney on top too. I squeezed plenty of lemon!'],
      ['प्याज़ बोला या चटनी? साफ़ बोल भाई।', 'Pyaaz bola ya chutney? Saaf bol bhai.', 'Onion or chutney? Speak clearly, brother.']),
    S('pay', ['हो गया! एक सौ बीस रुपये हुए।', 'Ho gaya! Ek sau bees rupaye hue.', 'Done! That comes to a hundred and twenty rupees.'],
      'Hand over the money, one hundred twenty rupees.', ['Ye lo bhaiya, ek sau bees rupaye.', 'ये लो भैया, एक सौ बीस रुपये।'],
      ['ye lo ek sau bees rupaye', 'bhaiya sau bees rupaye ye lo', 'ye lijiye ek sau bees', 'paaji ye lo sau bees', 'bees upar sau, ye lo bhaiya', 'एक सौ बीस रुपये ये लो'],
      ['Say the amount while paying.', 'A hundred twenty = "ek sau bees".'],
      ['बढ़िया! पेट भर खाओ, फिर किताब खोलना।', 'Badhiya! Pet bhar khao, phir kitaab kholna.', 'Great! Eat your fill, then open the book.']
      , ['कितने दिए? गिनती ठीक कर, एक सौ बीस।', 'Kitne diye? Ginti theek kar, ek sau bees.', 'How much did you give? Count right, one twenty.']),
  ],
  outro: ['पेपर के बाद भी आना बेटा, कुलचा हमेशा गरम मिलेगा!', 'Paper ke baad bhi aana beta, kulcha hamesha garam milega!', 'Come after the exam too, beta, the kulcha will always be hot!'],
  learned: [['do plate chole kulche lagana', 'serve two plates of chole kulche'], ['pyaaz aur nimbu daalna', 'add onion and lemon'], ['ye lo, ek sau bees rupaye', 'here you go, 120 rupees']],
  again: ['अरे फिर आ गया? बैठ, प्लेट तैयार है।', 'Arre phir aa gaya? Baith, plate taiyaar hai.', 'Back again? Sit, the plate is ready.'],
});
