// Aunty with a vegetable bag on the Charminar Road footpath.
import { dialogue as D, step as S } from './kit.js';

export default D('auntyWithSabzi', {
  name: 'Lakshmi Aunty', role: 'aunty with a vegetable bag', site: 'Charminar Road footpath', diff: 2,
  voice: { rate: 0.95, pitch: 1.15 },
  persona: 'Round, chatty aunty on her way to the market who loves giving a newcomer advice about rooms, tiffin and interviews.',
  goal: 'Offer to carry her bag, tell her your name and job search, and ask where to eat tiffin.',
  steps: [
    S('bag', ['అబ్బా, ఈ సంచి చాలా బరువు ఉంది బాబూ.', 'Oh, this bag is so heavy, my boy.'],
      'Offer to carry her bag.', 'ఆంటీ, సంచి నేను పట్టుకుంటాను.',
      ['aunty sanchi nenu pattukuntanu', 'aunty bag nenu mostanu', 'sanchi ivvandi aunty nenu mostanu', 'aunty nenu pattukuntanu', 'ఆంటీ, సంచి నేను మోస్తాను'],
      ['Offer to help.', 'I will hold it = "nenu pattukuntanu".'],
      ['అబ్బా, నువ్వు మంచి అబ్బాయివి. ఇదిగో పట్టుకో.', 'Aha, you are a good boy. Here, hold it.'],
      ['ఏమన్నావు బాబూ? నాకు సరిగ్గా వినపడలేదు.', 'What did you say, dear? I did not hear well.']),
    S('name', ['నీ పేరేంటి బాబూ? ఏం చేస్తుంటావు?', 'What is your name, dear? What do you do?'],
      'Say your name and that you are looking for a job.', 'నా పేరు సమీర్, ఉద్యోగం వెతుకుతున్నాను.',
      ['naa peru sameer udyogam vetukutunnanu', 'naa peru sameer job vetukutunnanu', 'nenu sameer job kosam chustunnanu', 'sameer, udyogam vethukutunnanu', 'నా పేరు సమీర్, ఉద్యోగం కోసం చూస్తున్నాను'],
      ['Tell her your name and your situation.', 'My name is = "naa peru". Job = "udyogam".'],
      ['ఓహో, ఇంజనీరా! తప్పకుండా వస్తుంది ఉద్యోగం.', 'Oho, an engineer! You will surely get a job.'],
      ['పేరు చెప్పు బాబూ, ఏం చేస్తావో చెప్పు.', 'Tell me your name, dear, and what you do.']),
    S('tiffin', ['కొత్తగా వచ్చావు కదా, టిఫిన్ ఎక్కడ తింటున్నావు?', 'You are new here, right? Where do you eat tiffin?'],
      'Ask where to find good, cheap tiffin.', 'ఇక్కడ మంచి టిఫిన్ ఎక్కడ దొరుకుతుంది?',
      ['ikkada manchi tiffin ekkada dorukutundi', 'manchi tiffin ekkada dorukutundi aunty', 'tiffin center ekkada undi aunty', 'cheap tiffin ekkada dorukutundi', 'మంచి టిఫిన్ ఎక్కడ దొరుకుతుంది'],
      ['Ask where to eat.', 'Where = "ekkada". Is available = "dorukutundi".'],
      ['మన వీధి చివర హోటల్ ఉంది, చాలా చవక, రుచిగా ఉంటుంది.', 'There is a hotel at the end of our street, cheap and tasty.'],
      ['టిఫిన్ గురించి అడుగుతున్నావా? మళ్ళీ చెప్పు.', 'Are you asking about tiffin? Say it again.']),
  ],
  outro: ['ఇంటికి రా బాబూ, ఒక రోజు భోజనం పెడతాను. ఇంటర్వ్యూ బాగా చెయ్యి!', 'Come home one day, dear, I will feed you. Do well in the interview!'],
  learned: [['nenu pattukuntanu', 'I will hold it'], ['naa peru sameer', 'my name is Sameer'], ['tiffin ekkada dorukutundi', 'where can I get tiffin']],
  again: ['బాబూ, మళ్ళీ కనిపించావే! భోజనం అయిందా?', 'Dear, you appear again! Have you eaten?'],
});
