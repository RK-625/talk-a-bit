// Tollywood fan at the Telugu film poster wall.
import { dialogue as D, step as S } from './kit.js';

export default D('bollywoodHopeful', {
  name: 'Mahesh', role: 'Tollywood fan', site: 'Irani cafe square, film poster wall', diff: 2,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Dramatic young film fan striking hero poses before the posters, sure that Sameer should also try for a hero role.',
  goal: 'Compliment his pose, ask which film he is acting out, and wish him luck.',
  steps: [
    S('pose', ['చూడు చూడు! ఈ పోజ్ ఎలా ఉంది?', 'Look, look! How is this pose?'],
      'Say his pose is super.', 'మీ పోజ్ సూపర్ అన్నా!',
      ['mee pose super anna', 'pose chala bagundi anna', 'super pose anna', 'mee pose adirindi', 'మీ పోజ్ చాలా బాగుంది'],
      ['Compliment him.', 'Your pose = "mee pose". Super = "super".'],
      ['థాంక్స్! హీరో అంటే ఇలాగే ఉండాలి.', 'Thanks! A hero should look just like this.'],
      ['ఏమన్నావు? మళ్ళీ చెప్పు, హీరోకి వినపడలేదు.', 'What did you say? Say again, the hero did not hear.']),
    S('film', ['ఈ డైలాగ్ ఏ సినిమాలోదో చెప్పు చూద్దాం!', 'Tell me which film this dialogue is from!'],
      'Ask which film it is.', 'ఇది ఏ సినిమా డైలాగ్?',
      ['idi ye cinema dialogue', 'ye cinema lo dialogue idi', 'idi ye movie anna', 'ye film dialogue idi', 'ఇది ఏ సినిమా'],
      ['Ask about the film.', 'Which film = "ye cinema".'],
      ['ఈ సినిమా పేరు "మన బస్తీ హీరో", ఫస్ట్ డే ఫస్ట్ షో చూడాలి!', 'The film is "Mana Basti Hero", you must see the first day first show!'],
      ['ఏ సినిమానో అడుగు, ధైర్యంగా అడుగు.', 'Ask which film, ask boldly.']),
    S('luck', ['నేను హీరో అవుతా, చూస్తూ ఉండు! నువ్వూ ట్రై చెయ్యి!', 'I will become a hero, just watch! You also try!'],
      'Wish him good luck.', 'మీరు తప్పకుండా హీరో అవుతారు, ఆల్ ది బెస్ట్!',
      ['meeru tappakunda hero avutaru all the best', 'tappakunda hero avutaru anna', 'hero avutaru all the best', 'mee kala nijam avutundi', 'మీరు తప్పకుండా హీరో అవుతారు'],
      ['Encourage him.', 'You will surely become = "tappakunda avutaru".'],
      ['సూపర్! నువ్వు ఉద్యోగం సాధించు, నేను హీరో అవుతా.', 'Super! You get a job, I will become a hero.'],
      ['మంచి మాట చెప్పు అన్నా, లక్ కోసం.', 'Say a kind word, anna, for luck.']),
  ],
  outro: ['నా మొదటి సినిమాకి నీకు ఫ్రీ టికెట్ ఇస్తా సమీర్!', 'I will give you a free ticket for my first film, Sameer!'],
  learned: [['mee pose super', 'your pose is super'], ['ye cinema', 'which film']],
  again: ['సమీర్, ఈ డైలాగ్ విను: "అదరగొడతా!"', 'Sameer, hear this dialogue: "I will rock it!"'],
});
