// Falooda and kulfi seller at the Necklace Road park stall.
import { dialogue as D, step as S } from './kit.js';

export default D('golaWala', {
  name: 'Imran', role: 'falooda and kulfi seller', site: 'Necklace Road park, falooda stall', diff: 2,
  voice: { rate: 0.95, pitch: 0.9 },
  persona: 'Proud falooda maker with an Old City recipe who builds each glass layer by layer.',
  goal: 'Order a falooda, ask for kulfi on top, and pay.',
  steps: [
    S('order', ['ఓల్డ్ సిటీ ఫలూదా! ఒకటి చేయనా సార్?', 'Old City falooda! Shall I make one, sir?'],
      'Order one falooda.', 'ఒక ఫలూదా ఇవ్వండి.',
      ['oka falooda ivvandi', 'oka falooda kavali bhai', 'bhai oka falooda ivvandi', 'one falooda ivvandi', 'ఒక ఫలూదా కావాలి'],
      ['Order one falooda.', 'One = "oka". Please give = "ivvandi".'],
      ['రోజ్ సిరప్, సేమ్యా, సబ్జా గింజలు... అన్నీ వేస్తున్నా!', 'Rose syrup, sev, basil seeds... adding everything!'],
      ['ఏం కావాలో గట్టిగా చెప్పండి సార్.', 'Say loudly what you want, sir.']),
    S('kulfi', ['పైన ఐస్ క్రీమ్ వేయనా?', 'Shall I put ice cream on top?'],
      'Ask for kulfi on top.', 'పైన కుల్ఫీ వేయండి.',
      ['paina kulfi veyandi', 'paina kulfi kavali bhai', 'kulfi veyandi paina', 'kulfi kuda veyandi', 'పైన కుల్ఫీ కావాలి'],
      ['Ask for the topping.', 'On top = "paina". Add = "veyandi".'],
      ['ఇదిగో, పెద్ద కుల్ఫీ ముక్క! చాలా రుచిగా ఉంటుంది.', 'Here, a big piece of kulfi! It will taste great.'],
      ['కుల్ఫీ కావాలా? అవును అనో కాదు అనో చెప్పండి.', 'Want kulfi? Say yes or no.']),
    S('pay', ['ఫలూదా రెడీ! యాభై రూపాయలు సార్.', 'Falooda is ready! Fifty rupees, sir.'],
      'Hand over fifty rupees and say it is delicious.', 'ఇదిగోండి యాభై రూపాయలు, చాలా రుచిగా ఉంది!',
      ['idigondi yabhai rupayalu chala ruchiga undi', 'yabhai rupayalu idigo bhai', 'idigondi bhai chala bagundi', 'yabhai ichanu bhai ruchiga undi', 'ఇదిగోండి యాభై రూపాయలు'],
      ['Pay and compliment him.', 'Fifty = "yabhai". Tasty = "ruchiga".'],
      ['శుక్రియా సార్! ఇంటర్వ్యూ తర్వాత మళ్ళీ రండి.', 'Shukriya, sir! Come again after your interview.'],
      ['డబ్బులు ఇవ్వండి సార్, ఫలూదా కరిగిపోతుంది.', 'Pay please, sir, the falooda is melting.']),
  ],
  outro: ['ఎండలో చల్లటి ఫలూదా, ఇంటర్వ్యూ బాగా చెయ్యి సమీర్!', 'Cool falooda in the heat. Do well in the interview, Sameer!'],
  learned: [['oka falooda ivvandi', 'give me one falooda'], ['paina kulfi veyandi', 'put kulfi on top']],
  again: ['సమీర్ భాయ్, ఇంకో ఫలూదా చేయనా?', 'Sameer bhai, shall I make another falooda?'],
});
