// Fish seller by the Chinese nets, quay beside the fishing boats.
import { dialogue as D, step as S } from './kit.js';

export default D('koliFisherwoman', {
  name: 'Thankamma Chechi', role: 'fish seller', site: 'Fort Kochi quay by the Chinese nets', diff: 3,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Sharp bargainer with a big laugh, a basket of fresh fish on her head; she explains how the nets are lowered with the counterweight stones.',
  goal: 'Ask the price of sardines per kilo, bargain, and buy half a kilo.',
  steps: [
    S('price', ['മത്തി, അയല, ചെമ്മീൻ! എന്താ വേണ്ടത് മോളേ?', 'Mathi, ayala, chemmeen! Enthaa vendathu mole?', 'Sardine, mackerel, prawns! What do you want, dear?'],
      'Ask the price of sardines (mathi) per kilo.', ['Chechi, mathi kilo ethra?', 'ചേച്ചി, മത്തി കിലോ എത്ര?'],
      ['mathi ethra roopa kilo', 'mathi kilo ethrayaa chechi', 'chechi mathi vila ethra', 'mathikku ethrayaa', 'mathi ethrayaa chechi', 'മത്തി കിലോ എത്രയാ'],
      'ask_sardine_price', ['Ask the price of mathi.', '"Kilo ethra?" = how much per kilo?'],
      ['മത്തി കിലോ നൂറ്റി ഇരുപത് രൂപ, പച്ച മീനാ!', 'Mathi kilo nootti irupathu roopa, pachcha meenaa!', 'Sardines are a hundred and twenty a kilo, fresh fish!'],
      ['ഏതു മീനാ വേണ്ടത്? വില ചോദിക്ക്.', 'Ethu meenaa vendathu? Vila chodikku.', 'Which fish do you want? Ask the price.']),
    S('bargain', ['നൂറ്റി ഇരുപതേ. വേറെ ആരും വില കുറയ്ക്കില്ല.', 'Nootti irupathe. Vere aarum vila kuraykkilla.', 'A hundred and twenty. Nobody else will lower it.'],
      'Bargain: ask her to make it a hundred.', ['Kurachu kuraykkamo chechi? Nooru roopa.', 'കുറച്ച് കുറയ്ക്കാമോ ചേച്ചി? നൂറ് രൂപ.'],
      ['nooru roopa mathi chechi', 'kurachu kuraykkoo chechi', 'nooruvinu tharamo', 'vila kurakkamo chechi', 'nooru roopaykku tharamo', 'കുറച്ച് കുറയ്ക്കൂ ചേച്ചി'],
      'bargain_hundred', ['Ask for a lower price.', '"Kuraykkamo?" = can you reduce?'],
      ['ഹ ഹ, മിടുക്കി! നൂറ്റി പത്ത് തരാം.', 'Ha ha, midukki! Nootti pathu tharaam.', 'Ha ha, clever girl! I will do a hundred and ten.'],
      ['വില കുറയ്ക്കണോ വേണ്ടയോ?', 'Vila kuraykkano vendayo?', 'Reduce the price or not?']),
    S('buy', ['എത്ര വേണം? ഒരു കിലോ?', 'Ethra venam? Oru kilo?', 'How much do you want? One kilo?'],
      'Say you want half a kilo.', ['Arakkilo mathi chechi.', 'അരക്കിലോ മതി ചേച്ചി.'],
      ['arakkilo tharoo chechi', 'arakkilo mathi', 'arakkilo venam chechi', 'pakuthi kilo mathi', 'arakkilo mathi tharoo', 'അരക്കിലോ തരൂ ചേച്ചി'],
      'buy_half_kilo', ['Say half a kilo.', '"Arakkilo" = half a kilo.'],
      ['അരക്കിലോ! ഇതാ, ഇന്ന് തന്നെ വറുത്ത് കഴിക്കണം.', 'Arakkilo! Ithaa, innu thanne varuthu kazhikkanam.', 'Half a kilo! Here, fry and eat it today.'],
      ['ഒരു കിലോ ആണോ അര കിലോ ആണോ?', 'Oru kilo aano ara kilo aano?', 'One kilo or half a kilo?']),
  ],
  outro: ['വല വലിക്കുന്നത് കാണാൻ വൈകുന്നേരം വരൂ മോളേ!', 'Vala valikkunnathu kaanaan vaikunnere varoo mole!', 'Come in the evening to see them pull the net, dear!'],
  learned: [['mathi kilo ethra?', 'how much is a kilo of sardines?'], ['kurachu kuraykkamo?', 'can you reduce it a little?'], ['arakkilo mathi', 'half a kilo is enough']],
  again: ['മീൻ വേണോ മോളേ? ഇനിയും ഉണ്ട്.', 'Meen veno mole? Iniyum undu.', 'Want fish, dear? There is more.'],
});
