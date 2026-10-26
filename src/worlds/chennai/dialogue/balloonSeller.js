// Balloon seller on the Fort St. George steps.
import { dialogue as D, step as S } from './kit.js';

export default D('balloonSeller', {
  name: 'Muthu', role: 'balloon seller', site: 'Fort St. George steps', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Cheerful thin man with a big bunch of balloons held up to children and tourists, who happily bargains for ten rupees.',
  goal: 'Ask the price, buy a red balloon, and say it is for a child.',
  steps: [
    S('price', ['பலூன் பலூன்! வண்ண வண்ண பலூன் வாங்குங்க மேடம்!', 'Balloon balloon! Vanna vanna balloon vaangunga madam!', 'Balloons, balloons! Colourful balloons, buy some, madam!'],
      'Ask the price of a balloon.', ['Balloon evvalavu anna?', 'பலூன் எவ்வளவு அண்ணா?'],
      ['balloon evvalavu anna', 'balloon evvalavu', 'oru balloon evvalavu anna', 'balloon vilai evvalavu', 'ithu evvalavu anna balloon', 'பலூன் எவ்வளவு அண்ணா', 'ஒரு பலூன் எவ்வளவு'],
      'ask_balloon_price', ['Ask how much one costs.', '"Evvalavu?" = how much?', 'Say: "Balloon evvalavu anna?"'],
      ['ஒண்ணு பத்து ரூபா மேடம். பெரிய பலூன்.', 'Onnu patthu rubaa madam. Periya balloon.', 'Ten rupees each, madam. Big balloons.'],
      ['என்ன கேட்டீங்க மேடம்? விலையா?', 'Enna ketteenga madam? Vilaiyaa?', 'What did you ask, madam? The price?']),
    S('colour', ['எந்த கலர் வேணும்? சிவப்பு, நீலம், மஞ்சள் இருக்கு.', 'Endha colour venum? Sivappu, neelam, manjal irukku.', 'Which colour? I have red, blue and yellow.'],
      'Ask for one red balloon.', ['Sivappu balloon onnu kudunga.', 'சிவப்பு பலூன் ஒண்ணு கொடுங்க.'],
      ['sivappu balloon onnu kudunga', 'oru sivappu balloon kudunga', 'red balloon onnu kudunga anna', 'sivappu balloon venum', 'sivappu onnu podunga anna', 'சிவப்பு பலூன் ஒண்ணு கொடுங்க', 'சிவப்பு பலூன் வேணும்'],
      'buy_red_balloon', ['Choose the colour.', 'Red = "sivappu". One = "onnu".', 'Say: "Sivappu balloon onnu kudunga."'],
      ['இந்தாங்க சிவப்பு பலூன்! நூல இறுக்கமா புடிங்க.', 'Indhaanga sivappu balloon! Noola irukkamaa pudinga.', 'Here is the red balloon! Hold the string tight.'],
      ['கலர் சொல்லுங்க மேடம், காத்துல பறக்குது.', 'Colour sollunga madam, kaatthula parakkudhu.', 'Tell me the colour, madam, they are flying in the wind.']),
    S('child', ['நீங்களே விளையாட போறீங்களா? யாருக்கு இது?', 'Neengale vilaiyaada poreengalaa? Yaarukku idhu?', 'Going to play with it yourself? Who is it for?'],
      'Say it is for a child.', ['Idhu oru kuzhandhaikku anna.', 'இது ஒரு குழந்தைக்கு அண்ணா.'],
      ['idhu oru kuzhandhaikku anna', 'idhu kuzhandhaikku', 'kuzhandhaikku anna', 'oru kutty paapaavukku anna', 'chinna paiyanukku anna', 'இது ஒரு குழந்தைக்கு', 'குழந்தைக்கு அண்ணா'],
      'say_for_a_child', ['Say who the balloon is for.', '"Kuzhandhai" = child.', 'Say: "Idhu oru kuzhandhaikku anna."'],
      ['ஓ, குழந்தைக்கா! அப்போ ஒரு பலூன் இலவசம்!', 'O, kuzhandhaikkaa! Appo oru balloon ilavasam!', 'Oh, for a child! Then one balloon free!'],
      ['யாருக்குன்னு சொல்லுங்க மேடம்.', 'Yaarukkunnu sollunga madam.', 'Tell me who it is for, madam.']),
  ],
  outro: ['குழந்தை சிரிச்சா அதுவே போதும் மேடம்!', 'Kuzhandhai sirichchaa adhuve podhum madam!', 'If the child laughs, that is enough, madam!'],
  learned: [['balloon evvalavu?', 'how much is the balloon?'], ['sivappu balloon onnu kudunga', 'give me one red balloon'], ['kuzhandhaikku', 'for the child']],
  again: ['மேடம், இன்னொரு பலூன் வேணுமா?', 'Madam, innoru balloon venumaa?', 'Madam, another balloon?'],
});
