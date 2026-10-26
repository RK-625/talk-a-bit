// English-speaking foreign tourist in the boat-ride queue at Fort St. George. Meera helps in English (reverse practice).
import { dialogue as D, step as S } from './kit.js';

export default D('tourist', {
  name: 'Emma', role: 'foreign tourist', site: 'Fort St. George, boat-ride booth queue', diff: 4, lang: 'en',
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Friendly foreign tourist in a floral shirt and white cap, a little lost, queueing for a boat ride. Speaks only English.',
  goal: 'Help the tourist find the boat ride, tell her how long it is, recommend food, and say you are new too.',
  steps: [
    S('queue', 'Hi! Is this the right queue for the boat ride? I am so confused.',
      'Tell her yes, this is the queue for the boat ride.', ['Yes! This is the queue for the boat ride.', 'Yes! This is the queue for the boat ride.'],
      ['yes this is the queue for the boat ride', 'yes this is the right queue for the boats', 'you are in the right queue for the boat ride', 'yes the boat ride queue is here', 'this is the boat ride queue', 'yes you are in the correct queue for the boats'],
      'confirm_boat_queue', ['Tell her she is in the right line.', 'Say: yes, the boat ride queue.', 'Say: "Yes! This is the queue for the boat ride."'],
      'Oh wonderful, thank you so much!', 'Sorry, I did not catch that. Is this the right queue?'),
    S('time', 'Great! How long is a ride, do you know?',
      'Tell her a ride is about twenty minutes.', ['A ride is about twenty minutes.', 'A ride is about twenty minutes.'],
      ['a ride is about twenty minutes', 'it takes around twenty minutes', 'the boat ride is twenty minutes', 'about twenty minutes i think', 'it is about twenty minutes long', 'roughly twenty minutes'],
      'tell_ride_duration', ['Say how long the ride is.', 'Say: about twenty minutes.', 'Say: "A ride is about twenty minutes."'],
      'Perfect, that fits my day!', 'Sorry, how long did you say?'),
    S('food', 'And what should I eat here? Everything smells amazing.',
      'Recommend sundal or filter coffee.', ['You must try sundal and filter coffee!', 'You must try sundal and filter coffee!'],
      ['you must try sundal and filter coffee', 'try the sundal and the filter coffee', 'have some sundal and filter coffee', 'sundal and filter coffee are great here', 'i recommend sundal and filter coffee', 'you should eat sundal and drink filter coffee'],
      'recommend_local_food', ['Recommend something local to eat.', 'Say: sundal and filter coffee.', 'Say: "You must try sundal and filter coffee!"'],
      'Sundal? Filter coffee? I am writing that down!', 'Sorry, what did you say I should eat?'),
    S('new', 'You seem to know everything. Are you from here?',
      'Say you are new here too, from Pune.', ['No, I am new here too. I am from Pune.', 'No, I am new here too. I am from Pune.'],
      ['no i am new here too i am from pune', 'i am new here too from pune', 'no i am also new i come from pune', 'not really i am from pune and new here', 'i am new here as well from pune', 'no i am from pune i am new too'],
      'say_new_here_too', ['Say whether you are local.', 'Say you are new too, from Pune.', 'Say: "No, I am new here too. I am from Pune."'],
      'Ha, a fellow explorer! Let us enjoy Chennai together.', 'Sorry, are you from here or not?'),
  ],
  outro: 'Thank you for everything. See you at the boats!',
  learned: [['the queue for the boat ride', 'pointing out the boat queue'], ['about twenty minutes', 'a ride duration'], ['I am new here too', 'sharing that you are new']],
  again: 'Oh, hi again! Any more tips for me?',
});
