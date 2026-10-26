// Chennai traffic police at the Fort St. George junction.
import { dialogue as D, step as S } from './kit.js';

export default D('trafficCop', {
  name: 'Raman Saar', role: 'traffic police', site: 'Fort St. George road junction', diff: 2,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Strict but fair traffic policeman in khaki with a white cap, who explains the signal and the one-way slowly to a newcomer.',
  goal: 'Ask the way to Santhome church, ask if it is far, and thank him.',
  steps: [
    S('way', ['என்ன மேடம், வழி தெரியலயா? எங்க போகணும்?', 'Enna madam, vazhi theriyalaiyaa? Enga poganum?', 'What, madam, do not know the way? Where do you want to go?'],
      'Ask the way to Santhome church.', ['Saar, Santhome church ku vazhi sollunga.', 'சார், சாந்தோம் சர்ச்சுக்கு வழி சொல்லுங்க.'],
      ['santhome church ku vazhi sollunga', 'saar santhome ku vazhi sollunga', 'santhome church epdi poganum saar', 'santhome ku vazhi enna saar', 'saar santhome church eppadi pogalaam', 'சாந்தோம் சர்ச்சுக்கு வழி சொல்லுங்க', 'சார் சாந்தோம் எப்படி போகணும்'],
      'ask_way_to_santhome', ['Ask for the way to the church.', '"Vazhi" = way. "Sollunga" = please tell.', 'Say: "Saar, Santhome church ku vazhi sollunga."'],
      ['சாந்தோமா? நேரா போங்க, கடற்கரை சாலைல இடது பக்கம்.', 'Santhomaa? Neraa ponga, kadarkarai saalai-la idadhu pakkam.', 'Santhome? Go straight, then left on the beach road.'],
      ['எந்த இடம்னு சரியா சொல்லுங்க.', 'Endha idamnu sariyaa sollunga.', 'Say clearly which place.']),
    S('far', ['சிக்னல் தாண்டி போய் இடது பக்கம் திரும்புங்க.', 'Signal thaandi poi idadhu pakkam thirumbunga.', 'Cross the signal and turn to the left.'],
      'Ask if it is very far.', ['Romba dhooramaa saar?', 'ரொம்ப தூரமா சார்?'],
      ['romba dhooramaa saar', 'romba dhooramaa', 'dhooram jaasthiyaa saar', 'dhooramaa irukkum saar', 'இது தூரமா சார்', 'ரொம்ப தூரமா', 'romba doorama saar'],
      'ask_if_far', ['Ask if it is far.', '"Dhooram" = distance. "Romba" = very.', 'Say: "Romba dhooramaa saar?"'],
      ['இல்ல இல்ல, பஸ்ல போனா இருபது நிமிஷம்தான்.', 'Illa illa, bus-la ponaa irubadhu nimishamdhaan.', 'No no, only twenty minutes by bus.'],
      ['தூரமான்னு கேக்கறீங்களா? சொல்லுங்க.', 'Dhooramaannu kekkareengalaa? Sollunga.', 'Are you asking if it is far? Say so.']),
    S('thanks', ['சிக்னல் பச்சை ஆனதும் தாண்டுங்க. பார்த்து போங்க.', 'Signal pacchai aanadhum thaandunga. Paarthu ponga.', 'Cross when the signal turns green. Go carefully.'],
      'Thank the policeman.', ['Romba nandri saar.', 'ரொம்ப நன்றி சார்.'],
      ['romba nandri saar', 'nandri saar', 'ungalukku nandri saar', 'thank you saar nandri', 'ரொம்ப நன்றி சார்', 'நன்றி சார்', 'nandri polis saar'],
      'thank_policeman', ['Thank him politely.', 'Thanks = "nandri". Sir = "saar".', 'Say: "Romba nandri saar."'],
      ['பரவாயில்ல மேடம். ஹெல்மெட் இல்லாம வண்டி ஓட்டாதீங்க!', 'Paravaayilla madam. Helmet illaama vandi ottaadheenga!', 'No problem, madam. Never ride without a helmet!'],
      ['ஒண்ணும் சொல்லலயா? நான் கெளம்பவா?', 'Onnum sollalayaa? Naan kelambavaa?', 'Nothing to say? Shall I go?']),
  ],
  outro: ['சென்னைல கவனமா போங்க மீரா மேடம்!', 'Chennai-la gavanamaa ponga Meera madam!', 'Go carefully in Chennai, Meera madam!'],
  learned: [['vazhi sollunga', 'please tell me the way'], ['romba dhooramaa?', 'is it very far?'], ['nandri saar', 'thank you, sir']],
  again: ['மேடம், இன்னும் வழி வேணுமா?', 'Madam, innum vazhi venumaa?', 'Madam, need directions again?'],
});
