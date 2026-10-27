// Balloon seller on the steps by the Chinese nets.
import { dialogue as D, step as S } from './kit.js';

export default D('balloonSeller', {
  name: 'Pappan Chettan', role: 'balloon seller', site: 'Fort Kochi steps by the Chinese nets', diff: 2,
  voice: { rate: 1.1, pitch: 1.05 },
  persona: 'Cheerful balloon seller who holds his bunch up to children and tourists and bargains for ten rupees.',
  goal: 'Ask the price of a balloon, buy a red one, and say it is for a small child.',
  steps: [
    S('price', ['ബലൂൺ, ബലൂൺ! നല്ല നിറമുള്ള ബലൂൺ!', 'Balloon, balloon! Nalla niramulla balloon!', 'Balloons, balloons! Nice coloured balloons!'],
      'Ask the price of a balloon.', ['Chetta, balloon ethra roopa?', 'ചേട്ടാ, ബലൂൺ എത്ര രൂപ?'],
      ['balloon ethrayaa chetta', 'oru balloon ethra', 'balloonu ethra roopa', 'balloon vila ethra', 'ethra roopayaa balloon', 'ബലൂൺ എത്രയാ'],
      'ask_balloon_price', ['Ask the price.', '"Ethra roopa?" = how many rupees?'],
      ['ഒരെണ്ണത്തിന് ഇരുപത് രൂപ മോളേ.', 'Orennathinu irupathu roopa mole.', 'Twenty rupees each, dear.'],
      ['ബലൂൺ വേണോ മോളേ?', 'Balloon veno mole?', 'Want a balloon, dear?']),
    S('colour', ['ഏത് നിറം വേണം? ചുവപ്പ്, മഞ്ഞ, നീല?', 'Ethu niram venam? Chuvappu, manja, neela?', 'Which colour? Red, yellow, blue?'],
      'Ask for a red balloon.', ['Oru chuvanna balloon tharoo.', 'ഒരു ചുവന്ന ബലൂൺ തരൂ.'],
      ['chuvappu balloon venam', 'chuvanna balloon mathi chetta', 'oru red balloon tharoo', 'chuvappu mathi chetta', 'oru chuvappu balloon', 'ഒരു ചുവപ്പ് ബലൂൺ വേണം'],
      'buy_red_balloon', ['Pick the colour red.', '"Chuvappu" = red.'],
      ['ചുവപ്പ് തന്നെ! ഇതാ, നല്ല വീർപ്പുള്ളത്.', 'Chuvappu thanne! Ithaa, nalla veerppullathu.', 'Red it is! Here, a nicely puffed one.'],
      ['ഏത് നിറമാ?', 'Ethu niramaa?', 'Which colour?']),
    S('who', ['ആർക്കാ ബലൂൺ? മോൾക്കാണോ?', 'Aarkkaa balloon? Molkkaano?', 'Who is the balloon for? For you?'],
      'Say it is for a small child.', ['Ithu oru kunjinu vendiyaanu.', 'ഇത് ഒരു കുഞ്ഞിന് വേണ്ടിയാണ്.'],
      ['oru kuttikku vendiyaanu', 'kunjinu vendiyaanu chetta', 'kuttikku aanu chetta', 'ithu kuttikku vendiyaanu', 'oru kunju undu athinu vendi', 'ഒരു കുട്ടിക്ക് വേണ്ടിയാണ്'],
      'say_for_a_child', ['Say who it is for.', '"Kunjinu vendi" = for a small child.'],
      ['ആഹാ! കുഞ്ഞ് ഒത്തിരി സന്തോഷിക്കും.', 'Aahaa! Kunju otthiri santhoshikkum.', 'Lovely! The child will be so happy.'],
      ['ആർക്കാ എന്ന് പറഞ്ഞില്ല.', 'Aarkkaa ennu paranjilla.', 'You did not say who for.']),
  ],
  outro: ['കടപ്പുറത്ത് ഈ ബലൂൺ പറത്താതെ നോക്കണേ!', 'Kadappurathu ee balloon parathaathe nokkane!', 'Make sure the balloon does not fly off at the beach!'],
  learned: [['balloon ethra roopa?', 'how much is a balloon?'], ['oru chuvanna balloon', 'one red balloon'], ['kunjinu vendiyaanu', 'it is for a small child']],
  again: ['ഇനിയും ബലൂൺ വേണോ മോളേ?', 'Iniyum balloon veno mole?', 'Want another balloon, dear?'],
});
