// Balloon seller on the Charminar steps.
import { dialogue as D, step as S } from './kit.js';

export default D('balloonSeller', {
  name: 'Srinu', role: 'balloon seller', site: 'Charminar steps', diff: 2,
  voice: { rate: 1.05, pitch: 1.0 },
  persona: 'Cheerful balloon seller who holds his bunch up to children and tourists and bargains for ten rupees.',
  goal: 'Ask the price, bargain to ten rupees, and buy a red balloon for a child.',
  steps: [
    S('price', ['బెలూన్లు, బెలూన్లు! రంగు రంగుల బెలూన్లు!', 'Balloons, balloons! Colourful balloons!'],
      'Ask the price of a balloon.', 'ఒక బెలూన్ ఎంత?',
      ['oka balloon enta', 'balloon enta anna', 'ee balloon enta', 'balloon price enta', 'ఒక బెలూన్ ఎంత అన్నా'],
      ['Ask how much one costs.', 'One = "oka". How much = "enta".'],
      ['ఒకటి ఇరవై రూపాయలు సార్. చాలా పెద్దది!', 'One is twenty rupees, sir. It is quite big!'],
      ['ఏం అడుగుతున్నావు సార్? మళ్ళీ అడుగు.', 'What are you asking, sir? Ask again.']),
    S('bargain', ['ఇరవై కన్నా తగ్గదు సార్.', 'It will not come below twenty, sir.'],
      'Ask him to give it for ten rupees.', 'పది రూపాయలకు ఇవ్వండి అన్నా.',
      ['padi rupayalaku ivvandi anna', 'padi rupayalu istanu anna', 'padi ki ivvandi', 'padi rupayalaku inkoncham taggandi', 'పది రూపాయలకు ఇవ్వండి'],
      ['Bargain down.', 'Ten rupees = "padi rupayalu". For = "ku".'],
      ['సరే సార్, పదిహేనుకి ఇస్తా. లాస్ట్!', 'Okay sir, I will give for fifteen. Last!'],
      ['బేరం చెయ్యి సార్, నీ రేటు చెప్పు.', 'Bargain, sir, say your rate.']),
    S('buy', ['ఏ రంగు బెలూన్ కావాలి? ఎవరికి?', 'Which colour balloon? For whom?'],
      'Ask for a red balloon for a child.', 'ఒక చిన్న పిల్లవాడికి ఎర్ర బెలూన్ ఇవ్వండి.',
      ['erra balloon ivvandi chinna pillavadiki', 'oka erra balloon ivvandi', 'pillavadiki erra balloon', 'erra balloon kavali pilla kosam', 'ఎర్ర బెలూన్ ఇవ్వండి'],
      ['Say the colour and who it is for.', 'Red = "erra". Child = "pillavadu".'],
      ['ఇదిగో ఎర్ర బెలూన్! పిల్లవాడు చాలా సంతోషిస్తాడు.', 'Here is the red balloon! The child will be so happy.'],
      ['రంగు చెప్పు సార్, ఎవరికో చెప్పు.', 'Tell me the colour, sir, and who it is for.']),
  ],
  outro: ['చార్మినార్ దగ్గర ఎప్పుడూ ఉంటాను సమీర్, మళ్ళీ రా!', 'I am always near Charminar, Sameer, come again!'],
  learned: [['oka balloon enta', 'how much is one balloon'], ['padi rupayalaku ivvandi', 'give it for ten rupees']],
  again: ['సమీర్ సార్, ఇంకో బెలూన్ కావాలా?', 'Sameer sir, want another balloon?'],
});
