// A foreign tourist (English) in the paddle-boat queue at the India Gate boat club.
import { dialogue as D, step as S } from './kit.js';

export default D('tourist', {
  name: 'Olivia', role: 'foreign tourist', site: 'India Gate, boat-club booth queue', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Friendly tourist in a floral shirt, camera around her neck, a little lost in the paddle-boat queue and asking a local for tips.',
  goal: 'Tell her where to buy tickets, the best time to see India Gate, what to eat, and say you are from Patna.',
  steps: [
    S('tickets', 'Hi there! Do you know where we buy the boat tickets?',
      'Point her to the ticket window by the water.', 'The ticket window is right there, by the water.',
      ['the ticket window is by the water', 'buy tickets at the booth near the water', 'the booth is over there on the left', 'tickets are at the window by the jetty', 'The ticket counter is by the water'],
      ['Point to the booth.', 'Say the ticket window is by the water.'],
      'Oh perfect, thank you so much!', 'Sorry, could you say that again? Where is the booth?'),
    S('time', 'When is the best time to see India Gate?',
      'Say the evening is best when it is lit up.', 'The evening is best, when the arch is lit up.',
      ['go in the evening when it is lit', 'evening is the best time for photos', 'the arch looks beautiful at night', 'come at sunset when the lights come on', 'The best time is the evening'],
      ['Give her a time of day.', 'Say it looks best in the evening.'],
      'Lovely, I will come back at sunset!', 'Sorry, what time of day did you say?'),
    S('food', 'And what Delhi food should I try?',
      'Suggest chole bhature and kulfi.', 'You must try chole bhature and kulfi.',
      ['try chole bhature and kulfi', 'you should eat chole bhature', 'chole bhature and kulfi are famous', 'have some kulfi and chole bhature', 'Eat chole bhature and kulfi'],
      ['Name a famous local dish.', 'Chole bhature and kulfi.'],
      'Yum, that sounds delicious, I am starving!', 'Sorry, what food did you suggest?'),
    S('from', 'Are you from Delhi? Your English is lovely.',
      'Say you are from Patna and study here.', 'No, I am from Patna and I study in Delhi.',
      ['i am from patna and study here', 'no i come from patna', 'i live here to study but i am from patna', 'not from delhi, i am from patna', 'No I am from Patna'],
      ['Tell her where you are from.', 'Say you are from Patna.'],
      'How wonderful, good luck with your studies!', 'Sorry, are you from Delhi or somewhere else?'),
  ],
  outro: 'Thanks so much, this was really helpful. Enjoy your day!',
  learned: [['the evening is best', 'a travel tip in English'], ['try chole bhature and kulfi', 'a food tip in English']],
  again: 'Hello again! The boats are fun, you should try them too.',
});
