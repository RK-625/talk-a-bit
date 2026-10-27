// Puttu and appam seller at the chaya kada square.
import { dialogue as D, step as S } from './kit.js';

export default D('vadaPavWala', {
  name: 'Raghavan Chettan', role: 'puttu and appam seller', site: 'Chaya kada square, puttu and appam cart', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Chatty puttu seller whose hands are always busy; he lets Ananya taste kadala curry and teaches her the names of everything on the cart.',
  goal: 'Order one puttu with kadala curry, ask for less spice, and pay thirty rupees.',
  steps: [
    S('order', ['പുട്ടും കടലയും ഉണ്ട് മോളേ. എന്താ വേണ്ടത്?', 'Puttum kadalayum undu mole. Enthaa vendathu?', 'Puttu and kadala curry, dear. What do you want?'],
      'Order one puttu with kadala curry.', ['Chetta, oru puttum kadalayum tharamo?', 'ചേട്ടാ, ഒരു പുട്ടും കടലയും തരാമോ?'],
      ['oru puttum kadalayum venam', 'oru puttu kadala curry tharu chetta', 'chetta oru puttu kadala', 'puttum kadalayum venam chetta', 'puttu kadala tharamo', 'ഒരു പുട്ടും കടലയും വേണം'],
      'order_puttu_kadala', ['Ask for puttu and kadala.', '"Puttum kadalayum" = puttu and kadala curry.'],
      ['ദാ, ആവി പറക്കുന്ന പുട്ട്! കടല ഇപ്പോൾ ഒഴിക്കാം.', 'Daa, aavi parakkunna puttu! Kadala ippol ozhikkaam.', 'Here, steaming puttu! I will pour the kadala now.'],
      ['എന്താ? പുട്ട് വേണോ അപ്പം വേണോ?', 'Enthaa? Puttu veno appam veno?', 'What? Puttu or appam?']),
    S('spice', ['എരിവ് കൂടുതൽ വേണോ മോളേ?', 'Erivu kooduthal veno mole?', 'Do you want it extra spicy, dear?'],
      'Ask for less spice.', ['Erivu kurachu mathi chetta.', 'എരിവ് കുറച്ച് മതി ചേട്ടാ.'],
      ['erivu kuravu mathi', 'erivu kooduthal venda chetta', 'erivu kuraykkamo chetta', 'kurachu erivu mathi', 'erivu venda chetta', 'എരിവ് കുറയ്ക്കാമോ'],
      'ask_less_spice', ['Say you want less spice.', '"Erivu" = spice. "Kurachu mathi" = a little is enough.'],
      ['ശരി മോളേ, എരിവ് കുറച്ച് ഒഴിക്കാം.', 'Shari mole, erivu kurachu ozhikkaam.', 'Okay dear, I will pour it mild.'],
      ['എരിവ് വേണോ വേണ്ടയോ?', 'Erivu veno vendayo?', 'Spicy or not?']),
    S('pay', ['ഇതാ പ്ലേറ്റ്. മുപ്പത് രൂപ.', 'Ithaa plate. Muppathu roopa.', 'Here is your plate. Thirty rupees.'],
      'Pay thirty rupees and say thanks.', ['Ithaa chetta, muppathu roopa. Nanni.', 'ഇതാ ചേട്ടാ, മുപ്പത് രൂപ. നന്ദി.'],
      ['ithaa muppathu roopa', 'muppathu roopa chetta nanni', 'nanni chetta ithaa', 'ithaa chetta paisa', 'muppathu roopa tharam chetta', 'ഇതാ മുപ്പത് രൂപ'],
      'pay_and_thank', ['Hand over the money.', '"Ithaa" = here you are. "Nanni" = thanks.'],
      ['നന്ദി മോളേ! ഒരു ദിവസം അപ്പവും സ്റ്റ്യൂവും കഴിച്ച് നോക്കണം.', 'Nanni mole! Oru divasam appavum stewvum kazhichu nokkanam.', 'Thanks dear! Try appam and stew one day too.'],
      ['കാശ് തരണ്ടേ മോളേ?', 'Kaashu tharande mole?', 'Will you not pay, dear?']),
  ],
  outro: ['ഇനി വരുമ്പോൾ ചൂട് അപ്പം കൂടി കഴിക്കണം, കേട്ടോ!', 'Ini varumbol choodu appam koodi kazhikkanam, kettoo!', 'Next time have hot appam too, okay!'],
  learned: [['puttum kadalayum venam', 'I want puttu and kadala curry'], ['erivu kurachu mathi', 'less spice is enough'], ['ithaa, nanni', 'here you are, thanks']],
  again: ['എന്താ മോളേ, ഒരു പ്ലേറ്റ് കൂടി വേണോ?', 'Enthaa mole, oru plate koodi veno?', 'What, dear, one more plate?'],
});
