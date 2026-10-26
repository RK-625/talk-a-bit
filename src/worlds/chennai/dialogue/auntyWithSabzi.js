// Paati with jasmine and vegetables, walking on the Fort St. George road footpath.
import { dialogue as D, step as S } from './kit.js';

export default D('auntyWithSabzi', {
  name: 'Lakshmi Paati', role: 'paati with vegetables', site: 'Fort St. George road footpath', diff: 2,
  voice: { rate: 0.9, pitch: 1.15 },
  persona: 'Round old paati with a jasmine strand and a heavy vegetable bag, humming on her way to the market, who loves giving advice and feeding the newcomer.',
  goal: 'Offer to carry her bag, tell her your name, and say you are from Pune.',
  steps: [
    S('bag', ['அய்யோ, பை ரொம்ப கனமா இருக்கு கண்ணு!', 'Ayyo, bai romba kanamaa irukku kannu!', 'Oh dear, the bag is so heavy, dear!'],
      'Offer to carry her bag.', ['Naan edukkaren paati, kudunga.', 'நான் எடுக்கறேன் பாட்டி, கொடுங்க.'],
      ['naan edukkaren paati kudunga', 'paati naan edukkaren', 'naan edukkavaa paati', 'bag kudunga paati naan edukkaren', 'நான் எடுக்கறேன் பாட்டி', 'பாட்டி நான் எடுக்கறேன் கொடுங்க', 'naan thookren paati'],
      'offer_to_carry_bag', ['Offer to help.', '"Naan edukkaren" = I will carry it.', 'Say: "Naan edukkaren paati, kudunga."'],
      ['நல்ல புள்ள! இந்தா, கீரைய பாத்து புடிச்சுக்கோ.', 'Nalla pulla! Indhaa, keeraiya paathu pudichukko.', 'Good girl! Here, hold the greens carefully.'],
      ['என்னம்மா சொன்ன? காது கொஞ்சம் மந்தம்.', 'Ennammaa sonna? Kaadhu konjam mandham.', 'What did you say, dear? My hearing is a bit dull.']),
    S('name', ['உன் பேரு என்ன கண்ணு?', 'Un peru enna kannu?', 'What is your name, dear?'],
      'Tell her your name.', ['En peru Meera, paati.', 'என் பேரு மீரா, பாட்டி.'],
      ['en peru meera paati', 'en peyar meera', 'en peru meera', 'paati en peru meera', 'naan meera paati', 'என் பேரு மீரா', 'என் பெயர் மீரா பாட்டி'],
      'tell_name', ['Say your name.', '"En peru" = my name is.', 'Say: "En peru Meera, paati."'],
      ['மீரா! நல்ல பேரு. எங்க வீட்டு பொண்ணு மாதிரி இருக்க.', 'Meera! Nalla peru. Enga veettu ponnu maadhiri irukka.', 'Meera! A lovely name. You look like a girl from our home.'],
      ['பேரு சொல்லு கண்ணு, வெட்கப்படாத.', 'Peru sollu kannu, vetkappadaadha.', 'Tell me your name, dear, do not be shy.']),
    S('from', ['நீ எந்த ஊரு கண்ணு? இந்த ஊரு மாதிரி தெரியலயே.', 'Nee endha ooru kannu? Indha ooru maadhiri theriyalaiye.', 'Which town are you from? You do not look local.'],
      'Say you are from Pune.', ['Naan Pune la irundhu vandhen.', 'நான் புனேல இருந்து வந்தேன்.'],
      ['naan pune la irundhu vandhen', 'naan pune', 'naan pune ooru paati', 'pune la irundhu vandhen paati', 'en ooru pune', 'நான் புனேல இருந்து வந்தேன்', 'என் ஊரு புனே பாட்டி'],
      'say_from_pune', ['Say where you come from.', '"Irundhu vandhen" = I came from.', 'Say: "Naan Pune la irundhu vandhen."'],
      ['புனேவா! வா, வீட்டுக்கு வந்து சாம்பார் சாதம் சாப்பிட்டு போ.', 'Punevaa! Vaa, veettukku vandhu saambaar saadham saappittu po.', 'Pune! Come home and eat sambar rice before you go.'],
      ['எந்த ஊருன்னு சொன்ன? திருப்பி சொல்லு.', 'Endha oorunnu senna? Thirupi sollu.', 'Which town did you say? Say it again.']),
  ],
  outro: ['போய்ட்டு வா கண்ணு, உன் ப்ளாக்ல என்னை பத்தியும் எழுது!', 'Poittu vaa kannu, un blog-la ennai patthiyum ezhudhu!', 'Go and come back, dear, write about me in your blog too!'],
  learned: [['naan edukkaren', 'I will carry it'], ['en peru Meera', 'my name is Meera'], ['naan Pune la irundhu vandhen', 'I came from Pune']],
  again: ['அடடே மீரா, திரும்ப வந்தியா? இந்த கீரைய பாரு!', 'Adade Meera, thirumba vandhiyaa? Indha keeraiya paaru!', 'Oh Meera, back again? Look at these greens!'],
});
