// Street photographer with a tripod at Fort St. George.
import { dialogue as D, step as S } from './kit.js';

export default D('photographer', {
  name: 'Sathish', role: 'street photographer', site: 'Fort St. George, photo tripod', diff: 2,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Friendly street photographer with a press badge, framing shots of the old fort and offering photos for fifty rupees.',
  goal: 'Ask for a photo, ask the price, and ask when it will be ready.',
  steps: [
    S('photo', ['கோட்டை பின்னாடி ஒரு போட்டோ எடுக்கவா மேடம்?', 'Kottai pinnaadi oru photo edukkavaa madam?', 'Shall I take a photo with the fort behind you, madam?'],
      'Say yes, ask him to take a photo.', ['Aamaa anna, oru photo edunga.', 'ஆமா அண்ணா, ஒரு போட்டோ எடுங்க.'],
      ['aamaa anna oru photo edunga', 'oru photo edunga anna', 'photo edunga anna', 'aamaa photo edukkalaam', 'oru photo venum anna', 'ஆமா அண்ணா ஒரு போட்டோ எடுங்க', 'ஒரு போட்டோ எடுங்க'],
      'ask_for_photo', ['Say yes to the photo.', '"Aamaa" = yes. "Edunga" = please take.', 'Say: "Aamaa anna, oru photo edunga."'],
      ['சூப்பர்! கொடிமரம் பக்கத்துல நில்லுங்க, சிரிங்க!', 'Super! Kodimaram pakkatthula nillunga, sirunga!', 'Great! Stand beside the flagstaff and smile!'],
      ['போட்டோ வேணுமா வேணாமா மேடம்?', 'Photo venumaa venaamaa madam?', 'Photo or no photo, madam?']),
    S('price', ['நல்லா வந்திருக்கு! அருமையான ஃபிரேம்.', 'Nallaa vandhirukku! Arumaiyaana frame.', 'It has come out nicely! A wonderful frame.'],
      'Ask how much the photo is.', ['Photo evvalavu anna?', 'போட்டோ எவ்வளவு அண்ணா?'],
      ['photo evvalavu anna', 'photo evvalavu', 'indha photo evvalavu', 'oru photo evvalavu anna', 'photo vilai evvalavu', 'போட்டோ எவ்வளவு அண்ணா', 'போட்டோ எவ்வளவு'],
      'ask_photo_price', ['Ask the price.', '"Evvalavu" = how much.', 'Say: "Photo evvalavu anna?"'],
      ['ஐம்பது ரூபா மேடம், பிரிண்டோட.', 'Aimbadhu rubaa madam, printoda.', 'Fifty rupees, madam, with the print.'],
      ['விலை கேக்கறீங்களா மேடம்?', 'Vilai kekkareengalaa madam?', 'Asking the price, madam?']),
    S('ready', ['ஐம்பது ரூபா. பிரிண்ட் எடுக்கணும்.', 'Aimbadhu rubaa. Print edukkanum.', 'Fifty rupees. I need to take the print.'],
      'Ask when it will be ready.', ['Eppo ready aagum anna?', 'எப்போ ரெடி ஆகும் அண்ணா?'],
      ['eppo ready aagum anna', 'eppo ready aagum', 'eppo kidaikkum anna', 'ready aaga evvalavu neram', 'eppo vandhu vaanganum', 'எப்போ ரெடி ஆகும் அண்ணா', 'எப்போ ரெடி ஆகும்'],
      'ask_when_ready', ['Ask when you can collect it.', '"Eppo" = when. "Ready aagum" = will be ready.', 'Say: "Eppo ready aagum anna?"'],
      ['பத்து நிமிஷத்துல மேடம். போய் காபி குடிச்சுட்டு வாங்க.', 'Patthu nimishatthula madam. Poi coffee kudichittu vaanga.', 'In ten minutes, madam. Go and have a coffee.'],
      ['எப்போன்னு கேளுங்க மேடம்.', 'Epponnu kelunga madam.', 'Ask me when, madam.']),
  ],
  outro: ['அருமையான போட்டோ மீரா மேடம், ப்ளாக்ல போடுங்க!', 'Arumaiyaana photo Meera madam, blog-la podunga!', 'A wonderful photo, Meera madam, put it on the blog!'],
  learned: [['oru photo edunga', 'please take a photo'], ['photo evvalavu?', 'how much is the photo?'], ['eppo ready aagum?', 'when will it be ready?']],
  again: ['மேடம், இன்னொரு போட்டோ எடுக்கவா?', 'Madam, innoru photo edukkavaa?', 'Madam, shall I take another photo?'],
});
