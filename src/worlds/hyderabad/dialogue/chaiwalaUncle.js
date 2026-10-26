// Tutorial: the easiest conversation. Keyed by role `chaiwalaUncle` (Saleem Bhai at the Irani cafe, the spawn spot).
import { dialogue as D, step as S } from './kit.js';

export default D('chaiwalaUncle', {
  name: 'Saleem Bhai', role: 'Irani cafe owner', site: 'Irani cafe square, cafe counter (spawn)', diff: 1, tutorial: true, place: 'Irani café',
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Warm, slightly teasing Irani cafe owner who treats Sameer, the job-hunting graduate learning Telugu, like a nephew. Speaks simply and slowly.',
  goal: 'Order one Irani chai from Saleem Bhai (tutorial).',
  steps: [
    S('order', ['రా సమీర్, కూర్చో! ఏం కావాలి, చాయ్ ఇవ్వనా?', 'Come Sameer, sit down! What do you want, shall I give chai?'],
      'Order one Irani chai.', 'భాయ్, ఒక ఇరానీ చాయ్ ఇవ్వండి.',
      ['oka irani chai ivvandi', 'bhai oka chai ivvandi', 'oka irani chai kavali bhai', 'anna oka irani chai ivvandi', 'ఒక ఇరానీ చాయ్ కావాలి'],
      ['Say "one Irani chai" and "please give".', 'One = "oka". Please give = "ivvandi".'],
      ['ఇదిగో, వేడి వేడి చాయ్. జాగ్రత్త బాబూ.', 'Here, piping hot chai. Careful, my boy.'],
      ['ఏంటి బాబూ? కొంచెం గట్టిగా చెప్పు.', 'What was that, my boy? Say it a bit louder.']),
    S('biscuit', ['ఉస్మానియా బిస్కెట్ కూడా కావాలా?', 'Do you want an Osmania biscuit too?'],
      'Say yes and ask for one biscuit.', 'అవును భాయ్, ఒక బిస్కెట్ ఇవ్వండి.',
      ['avunu bhai oka biscuit ivvandi', 'avunu oka biscuit ivvandi', 'avunu biscuit kavali', 'oka biscuit ivvandi bhai', 'అవును భాయ్, ఒక బిస్కెట్ కావాలి'],
      ['Start with "yes".', 'Yes = "avunu". One biscuit = "oka biscuit".'],
      ['సరే, చాయ్ లో ముంచి తిను, చాలా బాగుంటుంది.', 'Okay, dip it in the chai and eat, it tastes great.'],
      ['అవునా, వద్దా? త్వరగా చెప్పు.', 'Yes or no? Tell me quickly.']),
    S('thanks', ['ఉద్యోగం కోసం వెతుకుతున్నావు కదా? ఆల్ ది బెస్ట్!', 'You are looking for a job, right? All the best!'],
      'Say thank you to Saleem Bhai.', 'ధన్యవాదాలు భాయ్!',
      ['dhanyavadalu bhai', 'thanks bhai', 'thank you bhai', 'chala thanks bhai', 'ధన్యవాదాలు భాయ్'],
      ['Thank him in Telugu.', 'Thank you = "dhanyavadalu".'],
      ['అరే, దీనికి థాంక్స్ ఎందుకు! వెళ్ళు, ఇంటర్వ్యూ బాగా చెయ్యి.', 'Arre, why thanks for this! Go, do well in the interview.'],
      ['ఏమీ అనవా? భాయ్ కి థాంక్స్ లేదా?', 'Nothing to say? No thanks for Bhai?']),
  ],
  outro: ['శభాష్ సమీర్! ఇప్పుడు హైదరాబాద్ అంతా తిరిగి రా.', 'Well done, Sameer! Now go and explore all of Hyderabad.'],
  learned: [['oka irani chai ivvandi', 'give me one Irani chai'], ['avunu', 'yes'], ['dhanyavadalu', 'thank you']],
  again: ['సమీర్, మళ్ళీ వచ్చావా? ఇంకో చాయ్ కావాలా?', 'Sameer, back again? Want another chai?'],
});
