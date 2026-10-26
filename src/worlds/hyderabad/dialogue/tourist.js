// A foreign tourist (English) in the Hussain Sagar boat queue. The player helps; the tourist speaks English.
import { dialogue as D, step as S } from './kit.js';

export default D('tourist', {
  name: 'Emma', role: 'foreign tourist', site: 'Charminar and the boating booth queue', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Friendly tourist in a floral shirt, a little lost, asking a local for directions and food tips.',
  goal: 'Help her find the boats, tell her how long the ride is, suggest food, and say you are new too.',
  steps: [
    S('boats', 'Hi! Excuse me, do you know where the boat booth is?',
      'Tell her the boats are by the lake.', 'Yes, the boat booth is near the lake, that way.',
      ['the boat booth is near the lake', 'boats are by the lake that way', 'yes go that way to the lake', 'the lake boats are over there', 'Yes the booth is by the lake'],
      ['Point her to the lake.', 'Say the booth is near the lake.'],
      'Oh great, thank you so much!', 'Sorry, I did not catch that. Where did you say?'),
    S('ride', 'How long does the boat ride take?',
      'Say it takes about thirty minutes.', 'It takes about thirty minutes.',
      ['about thirty minutes', 'the ride is thirty minutes', 'it is thirty minutes long', 'around half an hour', 'It takes half an hour'],
      ['Give a rough time.', 'Say thirty minutes.'],
      'Perfect, that fits my schedule!', 'Sorry, how long did you say?'),
    S('food', 'And what food should I try in Hyderabad?',
      'Suggest biryani and haleem.', 'You must try Hyderabadi biryani and haleem.',
      ['try the biryani and haleem', 'you should eat hyderabadi biryani', 'biryani and haleem are famous here', 'eat biryani and haleem', 'Try biryani and haleem'],
      ['Name a famous local dish.', 'Biryani and haleem.'],
      'Yum, I am so hungry already!', 'Sorry, what food did you say?'),
    S('new', 'Are you from here? You speak so kindly.',
      'Say you are new in Hyderabad too.', 'No, I am new in Hyderabad too.',
      ['i am new here too', 'no i just moved here', 'i am also new in hyderabad', 'not really i am new', 'No I am new too'],
      ['Tell her your story.', 'Say you are new here too.'],
      'Ha, we are both exploring then! Good luck with everything.', 'Sorry, are you from here or not?'),
  ],
  outro: 'Thanks so much, enjoy your day!',
  learned: [['it takes thirty minutes', 'answering how long in English'], ['try the biryani and haleem', 'a food tip in English']],
  again: 'Hi again! The boats look so pretty.',
});
