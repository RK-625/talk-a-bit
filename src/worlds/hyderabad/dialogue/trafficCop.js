// Traffic policeman at the Charminar road junction.
import { dialogue as D, step as S } from './kit.js';

export default D('trafficCop', {
  name: 'Inspector Raju', role: 'traffic policeman', site: 'Charminar road junction', diff: 3,
  voice: { rate: 1.0, pitch: 0.8 },
  persona: 'Strict but fair traffic policeman in a white shirt and cap; happy to give directions to a young job-seeker.',
  goal: 'Ask the way to Cyber Towers, ask if it is far, and thank him.',
  steps: [
    S('way', ['ఇక్కడ పార్కింగ్ లేదు. ఎక్కడికి వెళ్ళాలి?', 'No parking here. Where do you want to go?'],
      'Ask the way to Cyber Towers.', 'సైబర్ టవర్స్ కి దారి ఎటు?',
      ['cyber towers ki daari etu', 'cyber towers ki ela vellali', 'sir cyber towers ki daari cheppandi', 'cyber towers ki route enti', 'సైబర్ టవర్స్ కి దారి ఎటు'],
      ['Ask for the way.', 'Way = "daari". Which side = "etu".'],
      ['మెట్రో ఎక్కండి, లేదా నేరుగా వెళ్ళి అమీర్ పేట్ మీదుగా వెళ్ళండి.', 'Take the metro, or go straight via Ameerpet.'],
      ['ఎక్కడికి అని అడుగుతున్నావు? స్పష్టంగా చెప్పు.', 'Where are you asking about? Say it clearly.']),
    S('far', ['అక్కడికి ఇక్కడి నుంచి కొంచెం దూరం.', 'It is a bit far from here.'],
      'Ask if it is very far.', 'చాలా దూరమా సార్?',
      ['chala duram a sir', 'chala dooram aa', 'duram ga undha sir', 'ekkuva duram a', 'చాలా దూరమా'],
      ['Ask if it is far.', 'Far = "duram".'],
      ['ఇరవై కిలోమీటర్లు. మెట్రోలో తొందరగా చేరుతావు.', 'Twenty kilometres. You will reach fast by metro.'],
      ['దూరమా, దగ్గరా? అడుగు.', 'Far or near? Ask.']),
    S('thanks', ['ఇంటర్వ్యూ ఉందా? ఆల్ ది బెస్ట్, జాగ్రత్తగా వెళ్ళు.', 'Got an interview? All the best, go carefully.'],
      'Thank the policeman.', 'చాలా ధన్యవాదాలు సార్.',
      ['chala dhanyavadalu sir', 'thanks sir', 'thank you sir', 'dhanyavadalu sir', 'చాలా థాంక్స్ సార్'],
      ['Thank him politely.', 'Thank you = "dhanyavadalu".'],
      ['సరే సరే, రూల్స్ పాటించు. బై!', 'Fine, fine, follow the rules. Bye!'],
      ['ఏమీ అనవా? ఒక థాంక్స్ చెప్పు.', 'Nothing to say? Say a thanks.']),
  ],
  outro: ['జాగ్రత్తగా వెళ్ళు సమీర్, సిగ్నల్ దగ్గర ఆగు.', 'Go carefully, Sameer, and stop at the signal.'],
  learned: [['cyber towers ki daari etu', 'which way to Cyber Towers'], ['chala duram a', 'is it very far']],
  again: ['సమీర్, ఇంకా దారి కావాలా?', 'Sameer, still need directions?'],
});
