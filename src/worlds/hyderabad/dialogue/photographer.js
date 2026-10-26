// Street photographer with a tripod at Charminar.
import { dialogue as D, step as S } from './kit.js';

export default D('photographer', {
  name: 'Anwar', role: 'street photographer', site: 'Charminar, photo tripod', diff: 2,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Cheerful street photographer framing Charminar with the pigeons and offering photos for fifty rupees.',
  goal: 'Ask for a photo, ask the price, and ask when it will be ready.',
  steps: [
    S('photo', ['చార్మినార్ ముందు ఫోటో కావాలా సార్? పావురాలు కూడా వస్తాయి!', 'Want a photo in front of Charminar, sir? The pigeons come too!'],
      'Ask him to take a photo of you.', 'నా ఫోటో తీస్తారా?',
      ['naa photo teestara', 'naa photo teeyandi anna', 'oka photo teestara', 'charminar mundu photo teestara', 'నా ఫోటో తీస్తారా'],
      ['Ask him to take your photo.', 'My photo = "naa photo". Will you take = "teestara".'],
      ['తప్పకుండా సార్! ఇక్కడ నిలబడండి, నవ్వండి.', 'Of course, sir! Stand here and smile.'],
      ['ఫోటో కావాలా వద్దా? చెప్పండి సార్.', 'Photo or not? Tell me, sir.']),
    S('price', ['ఫోటో చాలా బాగా వస్తుంది సార్.', 'The photo will come out very well, sir.'],
      'Ask how much he charges.', 'ఎంత తీసుకుంటారు?',
      ['enta teesukuntaru', 'photo ki enta anna', 'enta avtundi', 'photo rate enta', 'ఫోటోకి ఎంత'],
      ['Ask the charge.', 'How much do you take = "enta teesukuntaru".'],
      ['యాభై రూపాయలు సార్, ప్రింట్ తో సహా.', 'Fifty rupees, sir, including the print.'],
      ['రేటు అడగండి సార్, ఇంకోసారి.', 'Ask the rate, sir, once more.']),
    S('ready', ['ఒకటి, రెండు, మూడు... క్లిక్! అయిపోయింది.', 'One, two, three... click! Done.'],
      'Ask when the photo will be ready.', 'ఫోటో ఎప్పుడు వస్తుంది?',
      ['photo eppudu vastundi', 'photo eppudu ready avutundi', 'print eppudu vastundi', 'photo ela eppudu', 'ఫోటో ఎప్పుడు వస్తుంది'],
      ['Ask about the timing.', 'When = "eppudu".'],
      ['పది నిమిషాల్లో సార్. అక్కడ నీడలో కూర్చోండి.', 'In ten minutes, sir. Sit there in the shade.'],
      ['ఎప్పుడు కావాలని అడుగుతున్నారా? మళ్ళీ చెప్పండి.', 'Asking when you want it? Say again.']),
  ],
  outro: ['ఈ ఫోటో మీ రెజ్యూమ్ కి కూడా బాగుంటుంది సార్!', 'This photo will look good on your resume too, sir!'],
  learned: [['naa photo teestara', 'will you take my photo'], ['photo eppudu vastundi', 'when will the photo be ready']],
  again: ['సార్, ఇంకో ఫోటో తీయనా? పావురాలు రెడీ!', 'Sir, shall I take another? The pigeons are ready!'],
});
