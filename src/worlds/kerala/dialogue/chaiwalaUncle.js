// Tutorial: the easiest conversation. Keyed by role `chaiwalaUncle` (Kuttan Chettan at the chaya kada, the spawn spot).
import { dialogue as D, step as S } from './kit.js';

export default D('chaiwalaUncle', {
  name: 'Kuttan Chettan', role: 'chaya kada owner', site: 'Chaya kada square, Kuttan Chettan chaya kada (spawn)', diff: 1, tutorial: true, place: 'chaya kada',
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Warm, slightly teasing chaya kada owner who treats Ananya, a backpacker from Jaipur learning Malayalam, like a niece. Speaks simply and slowly, corrects her kindly.',
  goal: 'Order one tea from Kuttan Chettan, say yes to a pazham pori, and praise the tea (tutorial).',
  steps: [
    S('order', ['ആഹാ, മോള് വന്നോ! എന്താ വേണ്ടത്?', 'Aahaa, molu vanno! Enthaa vendathu?', 'Ah, you came, dear! What would you like?'],
      'Ask Kuttan Chettan for one tea.', ['Chetta, oru chaya tharamo?', 'ചേട്ടാ, ഒരു ചായ തരാമോ?'],
      ['oru chaya venam chetta', 'chetta oru chaya venam', 'oru chaya tharu chetta', 'chetta oru chaya', 'chaya tharamo chetta', 'oru chaya please chetta', 'ഒരു ചായ വേണം ചേട്ടാ'],
      'order_one_tea', ['Ask for tea. Chaya = tea.', '"Oru chaya" = one tea. "Tharamo?" = can you give?'],
      ['ദാ മോളേ, ചൂടുള്ള ചായ. മലയാളം പഠിക്കുന്ന കുട്ടിയല്ലേ?', 'Daa mole, choodulla chaya. Malayalam padikkunna kuttiyalle?', 'Here, dear, hot tea. You are the girl learning Malayalam, right?'],
      ['ഏ? ഒന്നൂടെ പറയൂ മോളേ.', 'Ae? Onnoode parayoo mole.', 'Eh? Say it once more, dear.']),
    S('pori', ['ചായയുടെ കൂടെ പഴം പൊരി വേണോ? ചൂടോടെയുണ്ട്.', 'Chaayayude koode pazham pori veno? Choodoteyundu.', 'Want pazham pori with the tea? It is piping hot.'],
      'Say yes, you would like one pazham pori.', ['Venam chetta, oru pazham pori tharoo.', 'വേണം ചേട്ടാ, ഒരു പഴം പൊരി തരൂ.'],
      ['venam chetta', 'venam oru pazham pori', 'pazham pori venam chetta', 'oru pazham pori tharamo', 'athe chetta pazham pori', 'വേണം ചേട്ടാ'],
      'accept_pazham_pori', ['Say yes: "venam" means I want it.', 'Add: one pazham pori = "oru pazham pori".'],
      ['ഇതാ, പഴം പൊരി. ഇവിടത്തെ സ്പെഷ്യലാണ്.', 'Ithaa, pazham pori. Ivideththe special aanu.', 'Here, pazham pori. It is our special.'],
      ['പഴം പൊരി വേണോ വേണ്ടയോ?', 'Pazham pori veno vendayo?', 'Pazham pori, yes or no?']),
    S('praise', ['എങ്ങനെയുണ്ട് ചായ? ഇഷ്ടപ്പെട്ടോ?', 'Enganeyundu chaya? Ishtappettoo?', 'How is the tea? Did you like it?'],
      'Tell him the tea is very tasty.', ['Chaya nalla ruchiyundu chetta.', 'ചായ നല്ല രുചിയുണ്ട് ചേട്ടാ.'],
      ['chaya super aanu chetta', 'nalla ruchiyundu', 'chaya valare nannayittundu chetta', 'chaya nannayittundu', 'nalla chaya aanu chetta', 'ruchiyundu chetta', 'ചായ നന്നായിട്ടുണ്ട്'],
      'praise_the_tea', ['Say the tea is tasty.', '"Nalla ruchi" = very tasty.'],
      ['ഹ ഹ, കേട്ടോ! ഇനി ഫോർട്ട് കൊച്ചി കാണാൻ പോകണം.', 'Ha ha, kettoo! Ini Fort Kochi kaanaan pokanam.', 'Ha ha, you hear that! Now you must go see Fort Kochi.'],
      ['ചായ എങ്ങനെയുണ്ടെന്ന് പറയൂ മോളേ.', 'Chaya enganeyundennu parayoo mole.', 'Tell me how the tea is, dear.']),
  ],
  outro: ['കൊച്ചി നന്നായി കണ്ടിട്ട് വാ മോളേ. ചൈനീസ് വലയും മറക്കരുത്!', 'Kochi nannayi kandittu vaa mole. Chineese valayum marakkaruthu!', 'Go see Kochi well, dear. Do not forget the Chinese nets!'],
  learned: [['oru chaya tharamo', 'can I have a tea?'], ['pazham pori venam', 'I would like pazham pori'], ['nalla ruchiyundu', 'it tastes very good']],
  again: ['ആഹാ, വീണ്ടും വന്നോ? ഒരു ചായ കൂടി?', 'Aahaa, veendum vanno? Oru chaya koodi?', 'Oh, back again? One more tea?'],
});
