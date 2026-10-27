// Mollywood fan striking hero poses in front of the film cut-outs.
import { dialogue as D, step as S } from './kit.js';

export default D('bollywoodHopeful', {
  name: 'Jishnu', role: 'Mollywood fan', site: 'Chaya kada square, Malayalam film poster and cut-out wall', diff: 3,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'First-day-first-show fanatic in a black shirt and folded mundu who strikes mass-hero poses and quotes his own invented film lines.',
  goal: 'Compliment his pose, ask which film it is from, and wish him luck.',
  steps: [
    S('pose', ['എങ്ങനെയുണ്ട് എന്റെ മാസ് പോസ്?', 'Enganeyundu ente mass pose?', 'How is my mass pose?'],
      'Compliment his pose.', ['Pose kidilam chetta!', 'പോസ് കിടിലം ചേട്ടാ!'],
      ['pose super aanu', 'nalla pose chetta', 'mass pose aanu chetta', 'kollaam chetta pose', 'pose valare nannayittundu', 'പോസ് സൂപ്പർ'],
      'compliment_the_pose', ['Say the pose is great.', '"Kidilam" = awesome.'],
      ['ഹ! ഫസ്റ്റ് ഡേ ഫസ്റ്റ് ഷോ ലെവൽ!', 'Ha! First day first show level!', 'Ha! First-day-first-show level!'],
      ['പോസ് ഇഷ്ടപ്പെട്ടോ ഇല്ലയോ?', 'Pose ishtappettoo illayo?', 'Did you like the pose or not?']),
    S('film', ['ഇത് എന്റെ ഫേവറിറ്റ് സിനിമയിലെ എൻട്രിയാ!', 'Ithu ente favourite cinemayile entryyaa!', 'This is the entry from my favourite film!'],
      'Ask which film it is.', ['Ethu cinemayaa chetta?', 'ഏതു സിനിമയാ ചേട്ടാ?'],
      ['ethu cinema chetta', 'ethu padam aanu', 'ethu cinemayile entry', 'cinema ethaanu', 'ethu padamaa chetta', 'ഏതു സിനിമ'],
      'ask_which_film', ['Ask which film.', '"Ethu cinema?" = which film?'],
      ['"ഇടിമിന്നൽ രാജ"! ഇത് എന്റെ സ്വന്തം സിനിമയാ, ഞാൻ എഴുതിയത്!', '"Idiminnal Raja"! Ithu ente swantham cinemayaa, njaan ezhuthiyathu!', '"Idiminnal Raja"! It is my own film, I wrote it!'],
      ['ഏതു സിനിമയെന്ന് ചോദിക്ക്.', 'Ethu cinemayennu chodikku.', 'Ask which film.']),
    S('luck', ['ഒരു ദിവസം ഞാൻ പോസ്റ്ററിൽ വരും, കാണൂ!', 'Oru divasam njaan posteril varum, kaanoo!', 'One day I will be on a poster, you will see!'],
      'Wish him luck.', ['All the best chetta!', 'ഓൾ ദ ബെസ്റ്റ് ചേട്ടാ!'],
      ['aashamsakal chetta', 'nannayi varatte chetta', 'bhagyam undaavatte chetta', 'nalla bhagyam chetta', 'best of luck chetta', 'ആശംസകൾ ചേട്ടാ'],
      'wish_him_luck', ['Wish him luck.', 'Manglish works: "all the best".'],
      ['താങ്ക്സ് മോളേ! ആദ്യ ടിക്കറ്റ് മോൾക്ക്.', 'Thanks mole! Aadya ticket molkku.', 'Thanks dear! The first ticket is yours.'],
      ['ഒരു ആശംസ പറയൂ മോളേ.', 'Oru aashamsa parayoo mole.', 'Give me a good wish, dear.']),
  ],
  outro: ['പോസ്റ്ററിൽ കണ്ടാൽ മറക്കല്ലേ!', 'Posteril kandaal marakkalle!', 'If you see me on a poster, do not forget!'],
  learned: [['pose kidilam', 'the pose is awesome'], ['ethu cinemayaa?', 'which film is it?'], ['all the best', 'good luck']],
  again: ['ഇനിയൊരു പോസ് കൂടി കാണണോ?', 'Iniyoru pose koodi kaanano?', 'Want to see one more pose?'],
});
