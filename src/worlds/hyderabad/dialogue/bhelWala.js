// Pani puri seller at the cart in the Necklace Road park.
import { dialogue as D, step as S } from './kit.js';

export default D('bhelWala', {
  name: 'Kishan', role: 'pani puri seller', site: 'Necklace Road park, pani puri cart', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Joking pani puri seller who cracks puris, fills them with potato and tamarind water, and hands them out one by one.',
  goal: 'Order a plate of pani puri, ask for it sweeter and milder, and ask for one extra puri.',
  steps: [
    S('order', ['పానీ పూరీ, పానీ పూరీ! ఒక ప్లేటా, రెండా?', 'Pani puri, pani puri! One plate or two?'],
      'Order one plate of pani puri.', 'ఒక ప్లేట్ పానీ పూరీ ఇవ్వండి.',
      ['oka plate pani puri ivvandi', 'oka plate pani puri kavali anna', 'anna oka plate pani puri', 'one plate pani puri ivvandi', 'ఒక ప్లేట్ పానీ పూరీ కావాలి'],
      ['Order one plate.', 'One plate = "oka plate".'],
      ['ఇదిగో, ఒక్కొక్కటి తీసుకో. వేడి వేడి నీళ్ళతో!', 'Here, take them one by one. With spicy water!'],
      ['ఎన్ని ప్లేట్లు? గట్టిగా చెప్పు.', 'How many plates? Say it loudly.']),
    S('sweet', ['కారం పానీ వేయనా, తియ్యటి చింతపండు పానీ వేయనా?', 'Spicy water, or the sweet tamarind water?'],
      'Ask for the sweet tamarind water.', 'తియ్యటి చింతపండు పానీ వేయండి.',
      ['tiyyati chintapandu pani veyandi', 'tiyyati pani veyandi anna', 'karam vaddu tiyyati pani', 'chintapandu pani kavali', 'తియ్యటి పానీ వేయండి'],
      ['Choose the sweet one.', 'Sweet = "tiyyati". Tamarind = "chintapandu".'],
      ['సరే, తీపి పానీ. పిల్లలు కూడా ఇదే ఇష్టపడతారు.', 'Okay, sweet water. Even kids like this one.'],
      ['కారమా, తీపా? ఏదో ఒకటి చెప్పు.', 'Spicy or sweet? Say one.']),
    S('extra', ['అయిపోయింది! ఇంకేమైనా కావాలా?', 'Done! Do you want anything else?'],
      'Ask for one more puri.', 'ఇంకో పూరీ ఇవ్వండి, ప్లీజ్.',
      ['inko puri ivvandi please', 'inka oka puri ivvandi anna', 'inko puri kavali', 'oka puri ekkuva ivvandi', 'ఇంకో పూరీ ఇవ్వండి'],
      ['Ask for another one.', 'Another = "inko". Puri = "puri".'],
      ['ఇదిగో, బోనస్ పూరీ! ఇంటర్వ్యూకి లక్కీ.', 'Here, a bonus puri! Lucky for the interview.'],
      ['ఇంకో పూరీ అని అడుగు, భయపడకు.', 'Ask for another puri, do not be shy.']),
  ],
  outro: ['మళ్ళీ రా సమీర్, ఇంటర్వ్యూ తర్వాత పానీ పూరీ పార్టీ!', 'Come again Sameer, a pani puri party after the interview!'],
  learned: [['oka plate pani puri ivvandi', 'give me one plate of pani puri'], ['inko puri ivvandi', 'give me one more puri']],
  again: ['సమీర్ సార్, పూరీలు రెడీ! ఇంకో ప్లేట్?', 'Sameer sir, puris are ready! Another plate?'],
});
