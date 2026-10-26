// Temple priest at the Telangana-style temple door.
import { dialogue as D, step as S } from './kit.js';

export default D('priest', {
  name: 'Pantulu garu', role: 'temple priest', site: 'Telangana-style temple, temple door', diff: 2,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Serene priest who rings the bell, waves the aarti and offers prasadam; blesses young job-seekers.',
  goal: 'Greet the priest, ask about the Bonalu festival, and ask for prasadam.',
  steps: [
    S('greet', ['రండి బాబూ, దర్శనం చేసుకోండి.', 'Come, dear, take darshan.'],
      'Greet the priest respectfully.', 'నమస్కారం పంతులు గారు.',
      ['namaskaram pantulu garu', 'namaste pantulu garu', 'namaskaram pantulugaru', 'pantulu garu namaskaram', 'నమస్కారం పంతులు గారూ'],
      ['Greet him politely.', 'Hello (respectful) = "namaskaram".'],
      ['శుభం కలుగుగాక. లోపలికి వెళ్ళండి.', 'May good come to you. Go inside.'],
      ['నమస్కారం చెప్పండి బాబూ.', 'Say namaskaram, dear.']),
    S('festival', ['ఈ నెలలో మన గుడిలో ఉత్సవం ఉంది.', 'There is a festival in our temple this month.'],
      'Ask when the Bonalu festival is.', 'బోనాల పండుగ ఎప్పుడు?',
      ['bonala panduga eppudu', 'bonalu eppudu pantulu garu', 'bonala utsavam eppudu', 'bonalu panduga ye roju', 'బోనాల పండుగ ఎప్పుడు'],
      ['Ask about the festival date.', 'Festival = "panduga". When = "eppudu".'],
      ['ఆషాఢ మాసంలో బాబూ. అమ్మవారికి బోనం సమర్పిస్తారు.', 'In the month of Ashadha, dear. The Goddess is offered bonam.'],
      ['ఏ పండుగ గురించి అడుగుతున్నావు?', 'Which festival are you asking about?']),
    S('prasadam', ['దేవుడి ఆశీర్వాదం తీసుకో బాబూ.', "Take the God's blessing, dear."],
      'Ask for prasadam.', 'ప్రసాదం ఇవ్వండి పంతులు గారు.',
      ['prasadam ivvandi pantulu garu', 'prasadam kavali', 'konchem prasadam ivvandi', 'pantulu garu prasadam ivvandi', 'ప్రసాదం ఇవ్వండి'],
      ['Ask for the blessed food.', 'Prasadam = "prasadam". Give = "ivvandi".'],
      ['ఇదిగో ప్రసాదం. నీకు ఉద్యోగం రావాలని దేవుణ్ణి కోరతాను.', 'Here is prasadam. I will pray for you to get a job.'],
      ['ప్రసాదం కావాలా? చెప్పండి బాబూ.', 'Want prasadam? Tell me, dear.']),
  ],
  outro: ['శుభం కలుగుగాక సమీర్, ఆల్ ది బెస్ట్.', 'May good come to you Sameer, all the best.'],
  learned: [['namaskaram pantulu garu', 'greetings, priest'], ['prasadam ivvandi', 'please give prasadam']],
  again: ['బాబూ, మళ్ళీ వచ్చావా? దేవుడి దయ ఉంటుంది.', "Dear, you came again? God's grace will be with you."],
});
