// Gully cricket batter on the Irani cafe square.
import { dialogue as D, step as S } from './kit.js';

export default D('cricketKid', {
  name: 'Chintu', role: 'gully cricket batter', site: 'Irani cafe square, cricket gully', diff: 1,
  voice: 'k',
  persona: 'Bossy kid batter who loves arguing about the rules but lets any friendly grown-up join.',
  goal: 'Ask to join the game, choose to bat, and say you are ready.',
  steps: [
    S('join', ['అన్నా, మేము గల్లీ క్రికెట్ ఆడుతున్నాం! నువ్వు ఆడతావా?', 'Anna, we are playing gully cricket! Will you play?'],
      'Ask to join the game.', 'నేను కూడా ఆడొచ్చా?',
      ['nenu kuda adocha', 'nenu kuda aadatanu', 'nenu adochha', 'nenu kuda aadacha', 'నేనూ ఆడొచ్చా'],
      ['Ask if you can play too.', 'Me too = "nenu kuda". Can I play = "adocha".'],
      ['సరే, రా! కానీ నేనే కెప్టెన్.', 'Okay, come! But I am the captain.'],
      ['ఏంటి? ఆడతావా లేదా చెప్పు.', 'What? Tell me if you play or not.']),
    S('bat', ['ముందు ఎవరు బ్యాటింగ్ చేస్తారు?', 'Who will bat first?'],
      'Say you will bat first.', 'నేను ముందు బ్యాటింగ్ చేస్తాను.',
      ['nenu mundu batting chestanu', 'nenu first batting chestanu', 'mundu nenu batting', 'nenu batting chestanu', 'నేను ముందు బ్యాటింగ్ చేస్తాను'],
      ['Choose batting.', 'First = "mundu". I will bat = "batting chestanu".'],
      ['సరే, కానీ మూడు బంతులే! ఓకేనా?', 'Okay, but only three balls! Okay?'],
      ['బ్యాటింగా, బౌలింగా? ఏదో ఒకటి చెప్పు.', 'Batting or bowling? Say one.']),
    S('ready', ['రెడీనా అన్నా? బంతి వేస్తున్నా!', 'Ready, anna? I am bowling!'],
      'Say you are ready.', 'నేను రెడీ, వేయి.',
      ['nenu ready veyi', 'ready anna veyi', 'nenu ready bantiveyi', 'ready ga unnanu', 'నేను రెడీ'],
      ['Tell him you are ready.', 'Ready = "ready". Throw = "veyi".'],
      ['ఇదిగో! అరే, అవుట్! ... కాదు, నాట్ అవుట్!', 'Here! Oh, out! ... no, not out!'],
      ['రెడీ అయితే చెప్పు, లేకపోతే నేను వేసేస్తా.', 'Say if you are ready, or I will just bowl.']),
  ],
  outro: ['నువ్వు బాగా ఆడావు అన్నా! రేపు కూడా రా.', 'You played well, anna! Come tomorrow too.'],
  learned: [['nenu kuda adocha', 'can I play too'], ['nenu ready', 'I am ready']],
  again: ['అన్నా, మళ్ళీ ఆడదామా?', 'Anna, shall we play again?'],
});
