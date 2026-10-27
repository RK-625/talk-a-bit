// Banana-chips (upperi) seller at Cherai beach.
import { dialogue as D, step as S } from './kit.js';

export default D('bhelWala', {
  name: 'Mohanan Chettan', role: 'banana-chips seller', site: 'Cherai beach, banana-chips cart', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Round, generous chips seller frying nendran banana chips; he gives tastes freely and is curious about Ananya\'s rucksack and rolled mat.',
  goal: 'Order two packets of banana chips, taste the jaggery chips, and pay forty rupees.',
  steps: [
    S('order', ['ഉപ്പേരി, ഉപ്പേരി! ചൂടുള്ള ഏത്തയ്ക്ക ഉപ്പേരി!', 'Upperi, upperi! Choodulla ethakka upperi!', 'Banana chips, banana chips! Hot nendran chips!'],
      'Order two packets of banana chips.', ['Chetta, randu packet upperi tharoo.', 'ചേട്ടാ, രണ്ട് പാക്കറ്റ് ഉപ്പേരി തരൂ.'],
      ['randu packet upperi venam', 'randu upperi tharamo chetta', 'chetta randu packet', 'upperi randu packet', 'randu pack upperi chetta', 'രണ്ട് പാക്കറ്റ് ഉപ്പേരി വേണം'],
      'order_two_upperi', ['Ask for two packets.', '"Randu" = two. "Upperi" = banana chips.'],
      ['ദാ, രണ്ട് പാക്കറ്റ്! ചൂടോടെ കഴിച്ച് നോക്ക്.', 'Daa, randu packet! Choodote kazhichu nokku.', 'Here, two packets! Eat them hot.'],
      ['എത്ര പാക്കറ്റ്? ഒന്നൂടെ പറയൂ.', 'Ethra packet? Onnoode parayoo.', 'How many packets? Say again.']),
    S('taste', ['ശർക്കര ഉപ്പേരിയും രുചിച്ച് നോക്കുന്നോ?', 'Sharkkara upperiyum ruchichu nokkunno?', 'Want to taste the jaggery chips too?'],
      'Say yes, you would like to taste it.', ['Venam chetta, kurachu tharoo.', 'വേണം ചേട്ടാ, കുറച്ച് തരൂ.'],
      ['sharkara upperi venam', 'ruchi nokkatte chetta', 'venam chetta', 'tharoo chetta kurachu', 'athe chetta sharkara upperi', 'വേണം ചേട്ടാ'],
      'taste_jaggery_chips', ['Say yes.', '"Kurachu" = a little. "Tharoo" = give.'],
      ['ഇതാ, ശർക്കര ഉപ്പേരി. മധുരം കുറച്ചേ ഉള്ളൂ.', 'Ithaa, sharkara upperi. Madhuram kurachee ulloo.', 'Here, jaggery chips. Only a little sweet.'],
      ['രുചിച്ച് നോക്കുന്നോ ഇല്ലയോ?', 'Ruchichu nokkunno illayo?', 'Will you taste it or not?']),
    S('pay', ['രണ്ട് പാക്കറ്റ് നാല്പത് രൂപ.', 'Randu packet naalpathu roopa.', 'Two packets, forty rupees.'],
      'Pay forty rupees.', ['Ithaa chetta, naalpathu roopa.', 'ഇതാ ചേട്ടാ, നാല്പത് രൂപ.'],
      ['naalpathu roopa ithaa', 'ithaa naalpathu roopa chetta', 'nanni chetta ithaa kaash', 'naalpathu roopa tharam', 'ithaa chetta kaash', 'ഇതാ നാല്പത് രൂപ'],
      'pay_forty_rupees', ['Hand over the money.', '"Naalpathu" = forty.'],
      ['നന്ദി! ചെറായി ബീച്ചിൽ കടൽക്കാറ്റ് കൊണ്ട് കഴിക്കണം.', 'Nanni! Cherai beachil kadalkkaattu kondu kazhikkanam.', 'Thanks! Eat them in the sea breeze at Cherai beach.'],
      ['നാല്പത് രൂപ തരണം മോളേ.', 'Naalpathu roopa tharanam mole.', 'Forty rupees, please, dear.']),
  ],
  outro: ['റുക്സാക്കിൽ വെച്ചോ, യാത്രയിൽ കഴിക്കാം!', 'Rucksackil vecho, yaathrayil kazhikkaam!', 'Keep it in your rucksack, eat it on the road!'],
  learned: [['randu packet upperi', 'two packets of banana chips'], ['kurachu tharoo', 'give me a little'], ['naalpathu roopa', 'forty rupees']],
  again: ['ഉപ്പേരി തീർന്നിട്ടില്ല, ഇനിയും വേണോ?', 'Upperi theernnittilla, iniyum veno?', 'The chips are not finished, want more?'],
});
