// English-speaking foreign tourist in the water-metro queue at Fort Kochi. Ananya helps in English (reverse practice).
import { dialogue as D, step as S } from './kit.js';

export default D('tourist', {
  name: 'Hannah', role: 'foreign tourist', site: 'Fort Kochi, water-metro booth queue', diff: 4, lang: 'en',
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Friendly foreign tourist in a pink floral shirt and white cap, a little lost, queueing for the boat. Speaks only English.',
  goal: 'Help the tourist find the water-metro queue, tell her how long the ride is, recommend food, and say you are new too.',
  steps: [
    S('queue', 'Hi! Is this the right queue for the water metro boat? I am so confused.',
      'Tell her yes, this is the queue for the water metro.', ['Yes! This is the queue for the water metro.', 'Yes! This is the queue for the water metro.'],
      ['yes this is the queue for the water metro', 'yes this is the right queue for the boat', 'you are in the right queue for the water metro', 'yes the water metro queue is here', 'this is the water metro queue', 'yes you are in the correct queue for the boats'],
      'confirm_water_metro_queue', ['Tell her she is in the right line.', 'Say: yes, the water metro queue.'],
      'Oh wonderful, thank you so much!', 'Sorry, I did not catch that. Is this the right queue?'),
    S('time', 'Great! How long is the boat ride, do you know?',
      'Tell her the ride is about twenty-five minutes.', ['The ride is about twenty-five minutes.', 'The ride is about twenty-five minutes.'],
      ['the ride is about twenty five minutes', 'it takes around twenty five minutes', 'the boat ride is twenty five minutes', 'about twenty five minutes i think', 'it is about twenty five minutes long', 'roughly twenty five minutes'],
      'tell_boat_duration', ['Say how long the ride is.', 'Say: about twenty-five minutes.'],
      'Perfect, that fits my afternoon!', 'Sorry, how long did you say?'),
    S('food', 'And what should I eat here? Everything smells amazing.',
      'Recommend appam with stew or puttu with kadala curry.', ['You must try appam and stew!', 'You must try appam and stew!'],
      ['you must try appam and stew', 'try the appam and stew', 'have some appam and stew', 'appam and stew are great here', 'i recommend appam and stew', 'you should eat puttu and kadala curry'],
      'recommend_local_food', ['Recommend something local to eat.', 'Say: appam and stew.'],
      'Appam and stew? I am writing that down!', 'Sorry, what did you say I should eat?'),
    S('new', 'You seem to know everything. Are you from here?',
      'Say you are new here too, from Jaipur.', ['No, I am new here too. I am from Jaipur.', 'No, I am new here too. I am from Jaipur.'],
      ['no i am new here too i am from jaipur', 'i am new here too from jaipur', 'no i am also new i come from jaipur', 'not really i am from jaipur and new here', 'i am new here as well from jaipur', 'no i am from jaipur i am new too'],
      'say_new_here_too', ['Say whether you are local.', 'Say you are new too, from Jaipur.'],
      'Ha, a fellow explorer! Let us enjoy Kochi together.', 'Sorry, are you from here or not?'),
  ],
  outro: 'Thank you for everything. See you on the boat!',
  learned: [['the queue for the water metro', 'pointing out the boat queue'], ['about twenty-five minutes', 'a ride duration'], ['I am new here too', 'sharing that you are new']],
  again: 'Oh, hi again! Any more tips for me?',
});
