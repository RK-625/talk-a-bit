// English-speaking foreign tourist in the pedal-boat queue. Rohan helps in English (reverse practice).
import { dialogue as D, step as S } from './kit.js';

export default D('tourist', {
  name: 'Emma', role: 'foreign tourist', site: 'Vidhana Soudha, pedal-boat booth queue', diff: 4, lang: 'en',
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Friendly foreign tourist in a floral shirt and white cap, a little lost, queueing for a pedal boat. Speaks only English.',
  goal: 'Help the tourist find the pedal boats, tell her how long the ride is, recommend something to eat, and say you are new too.',
  steps: [
    S('boats', 'Hi! Where can I find the pedal boats? Is this the right queue?',
      'Tell her the pedal boats are at Ulsoor Lake, near the jetty.', ['Yes! The pedal boats are at Ulsoor Lake, near the jetty.', 'Yes! The pedal boats are at Ulsoor Lake, near the jetty.'],
      ['the pedal boats are at ulsoor lake near the jetty', 'pedal boats are by the lake at the jetty', 'go to ulsoor lake the boats are there', 'the boats are at the lake near the jetty', 'ulsoor lake has the pedal boats by the jetty', 'they are at ulsoor lake, close to the jetty'],
      'direct_to_pedal_boats', ['Say where the boats are.', 'Say the lake name: Ulsoor Lake.', 'Say: "Yes! The pedal boats are at Ulsoor Lake, near the jetty."'],
      'Oh wonderful, thank you so much!', 'Sorry, I did not catch that. Where did you say the boats are?'),
    S('time', 'Great! How long is a ride, do you know?',
      'Tell her a ride is about thirty minutes.', ['A ride is about thirty minutes.', 'A ride is about thirty minutes.'],
      ['a ride is about thirty minutes', 'it takes about thirty minutes', 'about half an hour', 'around thirty minutes for a ride', 'the ride is half an hour', 'maybe thirty minutes'],
      'tell_ride_duration', ['Give her the time in minutes or hours.', 'Thirty minutes = half an hour.', 'Say: "A ride is about thirty minutes."'],
      'Perfect, that is just enough time!', 'Sorry, how long did you say it was?'),
    S('food', 'I am starving! What local food should I try?',
      'Recommend masala dosa or filter coffee.', ['You should try a masala dosa with filter coffee.', 'You should try a masala dosa with filter coffee.'],
      ['you should try a masala dosa with filter coffee', 'try masala dosa', 'have a masala dosa and filter coffee', 'masala dosa is very good here', 'you must try filter coffee and dosa', 'dosa and coffee are the best'],
      'recommend_local_food', ['Suggest a Bengaluru dish.', 'Think of dosa or filter coffee.', 'Say: "You should try a masala dosa with filter coffee."'],
      'Masala dosa, I will find one right away!', 'Hm, what should I eat? Any idea?'),
    S('local', 'Are you from Bengaluru yourself? You speak so well!',
      'Say you are new here too, from Delhi.', ['No, I am new here too. I am from Delhi.', 'No, I am new here too. I am from Delhi.'],
      ['no i am new here too i am from delhi', 'i am from delhi and new here', 'not really, i am from delhi', 'i am also new, from delhi', 'no, i moved from delhi recently', 'i am new in bengaluru too'],
      'say_new_from_delhi', ['Tell her where you are from.', 'You came from Delhi.', 'Say: "No, I am new here too. I am from Delhi."'],
      'Ha, then we are both learning! Nice to meet you.', 'Sorry, are you from here or not?'),
  ],
  outro: 'Thanks so much for your help. Enjoy the city, and good luck with your Kannada!',
  learned: [['pedal boats are at Ulsoor Lake', 'directions in English'], ['try a masala dosa', 'recommending local food']],
  again: 'Hi again! I am still looking for that jetty.',
});
