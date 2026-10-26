// Delivery rider at the Charminar auto stand.
import { dialogue as D, step as S } from './kit.js';

export default D('dabbawala', {
  name: 'Ravi', role: 'delivery rider', site: 'Charminar auto stand, delivery scooter', diff: 2,
  voice: { rate: 1.15, pitch: 1.0 },
  persona: 'Always-late delivery rider who talks about traffic and addresses and is secretly happy to chat with a fellow job-seeker.',
  goal: 'Ask for a minute, ask how many deliveries he does a day, and cheer him on.',
  steps: [
    S('minute', ['అరె, ఆర్డర్ లేట్ అవుతోంది! ఏంటి సార్?', 'Arre, the order is getting late! What is it, sir?'],
      'Ask if you can talk for a minute.', 'ఒక్క నిమిషం మాట్లాడొచ్చా?',
      ['okka nimisham matladocha', 'okka nimishamandi matladocha', 'konchem matladocha anna', 'oka minute matladocha', 'ఒక్క నిమిషం మాట్లాడొచ్చా'],
      ['Ask politely for a minute.', 'One minute = "okka nimisham".'],
      ['సరే, ఒక్క నిమిషమే. ఫోన్ చూసుకుంటూ మాట్లాడతా.', 'Okay, just one minute. I will talk while checking my phone.'],
      ['త్వరగా చెప్పు, ఆర్డర్ వెయిట్ చేస్తోంది.', 'Say it quickly, the order is waiting.']),
    S('count', ['రోజుకి అంతా తిరుగుడే సార్, ట్రాఫిక్ చాలా ఉంది.', 'It is all running around every day, sir, so much traffic.'],
      'Ask how many deliveries he does a day.', 'రోజుకు ఎన్ని డెలివరీలు చేస్తారు?',
      ['rojuku enni deliveries chestaru', 'oka roju lo enni delivery chestaru', 'rojuku enni orders anna', 'daily enni deliveries', 'రోజుకు ఎన్ని డెలివరీలు చేస్తారు'],
      ['Ask about the numbers.', 'How many = "enni". Per day = "rojuku".'],
      ['ఇరవై ముప్పై వరకు చేస్తాను, అంతా నగరం నాకు తెలుసు.', 'Twenty to thirty, I know the whole city.'],
      ['ఏం అడుగుతున్నావు? మళ్ళీ చెప్పు.', 'What are you asking? Say it again.']),
    S('cheer', ['నువ్వేం చేస్తుంటావు సార్? ఆఫీసా?', 'What do you do, sir? Office job?'],
      'Say his work is hard and wish him luck.', 'మీ పని చాలా కష్టం, ఆల్ ది బెస్ట్!',
      ['mee pani chala kashtam all the best', 'mee pani kashtam anna all the best', 'chala kashtapadataru all the best', 'mee kashtam ki all the best', 'మీ పని చాలా కష్టం'],
      ['Say something kind.', 'Hard = "kashtam". Your work = "mee pani".'],
      ['థాంక్స్ సార్! నువ్వు కూడా ఇంటర్వ్యూ లో అదరగొట్టు.', 'Thanks, sir! You also rock your interview.'],
      ['ఏమైనా మంచిగా చెప్పు సార్.', 'Say something nice, sir.']),
  ],
  outro: ['నేను పోతా సార్, ఆర్డర్ చల్లారిపోతుంది! బై.', 'I go now, sir, the order will get cold! Bye.'],
  learned: [['okka nimisham matladocha', 'can I talk for a minute'], ['rojuku enni', 'how many per day']],
  again: ['సార్, మళ్ళీ కలిశాం! ఈసారి ఎక్కడికి డెలివరీ?', 'Sir, we meet again! Which delivery this time?'],
});
