// The ten Chennaiites on the open ground in the quiet stretches of the city.
import { dialogue as D, step as S } from '../kit.js';

export const street1 = D('street-1', {
  name: 'Vignesh', role: 'Chennaiite on the phone', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Man in a teal T-shirt with a green office lanyard, thumbs scrolling on his phone.',
  goal: 'Say you also have no signal.',
  steps: [
    S('signal', ['ஹலோ... சிக்னல் இல்ல. மேடம், இங்க நெட்வொர்க் இருக்கா?', 'Hello... signal illa. Madam, inga network irukkaa?', 'Hello... no signal. Madam, is there network here?'],
      'Say you do not have signal either.', ['Enakkum signal illa saar.', 'எனக்கும் சிக்னல் இல்ல சார்.'],
      ['enakkum signal illa saar', 'signal illa saar', 'enakkum network illa', 'inga signal kammi saar', 'enakkum signal varala', 'எனக்கும் சிக்னல் இல்ல சார்', 'சிக்னல் இல்ல சார்'],
      'say_no_signal_either', ['Say you have none either.', '"Enakkum" = for me too.', 'Say: "Enakkum signal illa saar."'],
      ['சரி, மேல கொஞ்சம் நடந்து பாக்கறேன்.', 'Sari, mela konjam nadandhu paakkaren.', 'Okay, I will walk up a bit and see.'],
      ['சிக்னல் இருக்கா இல்லையா மேடம்?', 'Signal irukkaa illaiyaa madam?', 'Is there signal or not, madam?']),
  ],
  outro: ['சரி மேடம், அப்புறம் பேசறேன். நன்றி!', 'Sari madam, appuram pesaren. Nandri!', 'Okay madam, I will talk later. Thanks!'],
  learned: [['enakkum signal illa', 'I have no signal either']],
  again: ['மேடம், சிக்னல் வந்துடுச்சா?', 'Madam, signal vandhuduchaa?', 'Madam, did the signal come?'],
});

export const street2 = D('street-2', {
  name: 'Padmini', role: 'Chennaiite woman', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a purple saree with a teal jhola and jasmine in her bun, standing idle and watching the street.',
  goal: 'Ask where to get good food, then say you will go and see.',
  steps: [
    S('ask', ['வாங்கம்மா, என்ன தேடறீங்க?', 'Vaangammaa, enna thedareenga?', 'Come, dear, what are you looking for?'],
      'Ask where you can find good food.', ['Inga nalla saappaadu kidaikkumaa?', 'இங்க நல்ல சாப்பாடு கிடைக்குமா?'],
      ['inga nalla saappaadu kidaikkumaa', 'nalla saappaadu enga kidaikkum', 'inga nalla mess irukkaa', 'akka nalla saappaadu enga', 'nalla saappaadu kidaikkumaa akka', 'இங்க நல்ல சாப்பாடு கிடைக்குமா', 'நல்ல சாப்பாடு எங்க கிடைக்கும்'],
      'ask_where_good_food', ['Ask about food.', '"Saappaadu" = food, meal.', 'Say: "Inga nalla saappaadu kidaikkumaa?"'],
      ['அந்த தெருவுல ஒரு மெஸ் இருக்கு. வாழை இலை சாப்பாடு!', 'Andha theruvula oru mess irukku. Vaazhai ilai saappaadu!', 'There is a mess on that street. Banana-leaf meals!'],
      ['என்ன கேட்டீங்க கண்ணு?', 'Enna ketteenga kannu?', 'What did you ask, dear?']),
    S('go', ['போங்க, அங்க சாம்பார், ரசம், பொரியல் எல்லாம் அளவில்லாம கிடைக்கும்.', 'Ponga, anga saambaar, rasam, poriyal ellaam alavillaama kidaikkum.', 'Go, you get unlimited sambar, rasam and poriyal there.'],
      'Say you will go and see.', ['Naan poi paakkaren akka.', 'நான் போய் பாக்கறேன் அக்கா.'],
      ['naan poi paakkaren akka', 'poi paakkaren akka', 'naan poi paakkaren', 'seri akka poi paakkaren', 'nandri akka poi paakkaren', 'நான் போய் பாக்கறேன் அக்கா', 'போய் பாக்கறேன்'],
      'say_will_go_and_see', ['Say you will check it out.', '"Poi paakkaren" = I will go and see.', 'Say: "Naan poi paakkaren akka."'],
      ['போய்ட்டு வாங்க. முதல்ல தண்ணி தருவாங்க, பாத்துக்கோங்க.', 'Poittu vaanga. Mudhalla thanni tharuvaanga, paathukkonga.', 'Go on. They will give water first, take note.'],
      ['போறீங்களா இல்லையா கண்ணு?', 'Poreengalaa illaiyaa kannu?', 'Will you go or not, dear?']),
  ],
  outro: ['சாப்பிட்டு எனக்கும் சொல்லுங்க மீரா!', 'Saappittu enakkum sollunga Meera!', 'Eat and tell me too, Meera!'],
  learned: [['inga nalla saappaadu kidaikkumaa?', 'can I get good food here?'], ['naan poi paakkaren', 'I will go and see']],
  again: ['கண்ணு, மெஸ் கிடைச்சதா?', 'Kannu, mess kidaichchadhaa?', 'Dear, did you find the mess?'],
});

export const street3 = D('street-3', {
  name: 'Rohit', role: 'Chennaiite teen', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Teen in a lilac T-shirt with a backpack, chatting with friends.',
  goal: 'Tell them to enjoy themselves.',
  steps: [
    S('friends', ['அக்கா, எங்க ஃப்ரெண்ட்ஸ் கூட பேசிட்டு இருக்கோம்!', 'Akka, enga friends kooda pesittu irukkom!', 'Akka, we are chatting with our friends!'],
      'Tell them to have fun.', ['Sari, nalla enjoy pannunga.', 'சரி, நல்லா என்ஜாய் பண்ணுங்க.'],
      ['sari nalla enjoy pannunga', 'nalla enjoy pannunga', 'enjoy pannunga thambi', 'sari jolly-aa irunga', 'nalla pesunga enjoy pannunga', 'சரி நல்லா என்ஜாய் பண்ணுங்க', 'நல்லா என்ஜாய் பண்ணுங்க'],
      'tell_teens_to_enjoy', ['Wish them well.', '"Enjoy pannunga" = enjoy yourselves.', 'Say: "Sari, nalla enjoy pannunga."'],
      ['நன்றி அக்கா! நீங்களும் என்ஜாய் பண்ணுங்க!', 'Nandri akka! Neengalum enjoy pannunga!', 'Thanks, akka! You enjoy too!'],
      ['என்ன சொன்னீங்க அக்கா?', 'Enna sonneenga akka?', 'What did you say, akka?']),
  ],
  outro: ['அக்கா, உங்க ப்ளாக் பேரு என்ன?', 'Akka, unga blog peru enna?', 'Akka, what is your blog called?'],
  learned: [['nalla enjoy pannunga', 'have a good time']],
  again: ['அக்கா, எங்க கூட செல்ஃபி எடுக்கறீங்களா?', 'Akka, enga kooda selfie edukkareengalaa?', 'Akka, will you take a selfie with us?'],
});

export const street4 = D('street-4', {
  name: 'Sivaraman Thaatha', role: 'Chennaiite elder', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elder in a veshti and vibhuti with a sky umbrella, reading the news.',
  goal: 'Agree it is very sunny and promise to drink ilaneer.',
  steps: [
    S('sun', ['என்ன மேடம், ரொம்ப வெயில் இல்ல?', 'Enna madam, romba veyil illa?', 'So, madam, is it not very sunny?'],
      'Agree it is very sunny.', ['Aamaa thaatha, veyil romba jaasthi.', 'ஆமா தாத்தா, வெயில் ரொம்ப ஜாஸ்தி.'],
      ['aamaa thaatha veyil romba jaasthi', 'veyil romba jaasthi thaatha', 'aamaa thaatha romba veyil', 'veyil jaasthi thaatha', 'aamaa veyil thaangala', 'ஆமா தாத்தா வெயில் ரொம்ப ஜாஸ்தி', 'வெயில் ரொம்ப ஜாஸ்தி தாத்தா'],
      'agree_very_sunny', ['Agree about the heat.', '"Veyil" = sun, heat.', 'Say: "Aamaa thaatha, veyil romba jaasthi."'],
      ['ஆமா கண்ணு. குடை எடுத்துட்டு தான் நடக்கணும்.', 'Aamaa kannu. Kudai eduttuttu thaan nadakkanum.', 'Yes, dear. One must walk with an umbrella.'],
      ['வெயிலா மழையா மேடம்?', 'Veyilaa mazhaiyaa madam?', 'Sun or rain, madam?']),
    S('coconut', ['இளநீர் குடிங்க. உடம்பு குளுகுளுன்னு ஆகும்.', 'Ilaneer kudinga. Udambu kulirkulunnu aagum.', 'Drink tender coconut. Your body will cool right down.'],
      'Say okay, you will drink ilaneer.', ['Seri thaatha, ilaneer kudikkaren.', 'சரி தாத்தா, இளநீர் குடிக்கறேன்.'],
      ['seri thaatha ilaneer kudikkaren', 'ilaneer kudikkaren thaatha', 'seri ilaneer kudikkaren', 'nandri thaatha ilaneer kudikkaren', 'ilaneer thaan kudikkanum', 'சரி தாத்தா இளநீர் குடிக்கறேன்', 'இளநீர் குடிக்கறேன் தாத்தா'],
      'promise_to_drink_ilaneer', ['Agree to the advice.', '"Kudikkaren" = I will drink.', 'Say: "Seri thaatha, ilaneer kudikkaren."'],
      ['நல்ல பொண்ணு! வெயில்ல தண்ணி முக்கியம்.', 'Nalla ponnu! Veyilla thanni mukkiyam.', 'Good girl! Water matters in the heat.'],
      ['இளநீர் குடிப்பீங்களா மேடம்?', 'Ilaneer kudippeengalaa madam?', 'Will you drink ilaneer, madam?']),
  ],
  outro: ['சென்னை வெயிலுக்கு இளநீர் தான் மருந்து!', 'Chennai veyilukku ilaneer thaan marundhu!', 'For the Chennai heat, ilaneer is the cure!'],
  learned: [['veyil romba jaasthi', 'the sun is very strong'], ['ilaneer kudikkaren', 'I will drink ilaneer']],
  again: ['மேடம், குடை வேணுமா?', 'Madam, kudai venumaa?', 'Madam, need an umbrella?'],
});

export const street5 = D('street-5', {
  name: 'Mahesh', role: 'Chennaiite man', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Man in a striped shirt with a red lanyard and a backpack, standing idle.',
  goal: 'Say you do not know where the ATM is, and suggest asking at a shop.',
  steps: [
    S('atm', ['மேடம், இங்க பக்கத்துல ATM எங்க இருக்கு?', 'Madam, inga pakkatthula ATM enga irukku?', 'Madam, where is the ATM near here?'],
      'Say you do not know, tell him to ask at a shop.', ['Theriyala saar, kadaila kelunga.', 'தெரியல சார், கடைல கேளுங்க.'],
      ['theriyala saar kadaila kelunga', 'kadaila kelunga saar', 'theriyala saar', 'enakku theriyala kadaila kelunga', 'theriyaadhu saar kadaila kelunga', 'தெரியல சார் கடைல கேளுங்க', 'கடைல கேளுங்க சார்'],
      'tell_him_ask_at_shop', ['Say you are not sure.', '"Kadaila kelunga" = ask in a shop.', 'Say: "Theriyala saar, kadaila kelunga."'],
      ['சரி மேடம், நன்றி. அங்க கேக்கறேன்.', 'Sari madam, nandri. Anga kekkaren.', 'Okay, madam, thanks. I will ask there.'],
      ['ATM தெரியுமா மேடம்?', 'ATM theriyumaa madam?', 'Do you know the ATM, madam?']),
  ],
  outro: ['நல்ல நாள் மீரா மேடம்!', 'Nalla naal Meera madam!', 'Have a good day, Meera madam!'],
  learned: [['kadaila kelunga', 'ask at a shop']],
  again: ['மேடம், இன்னொரு விஷயம் கேக்கலாமா?', 'Madam, innoru vishayam kekkalaamaa?', 'Madam, may I ask another thing?'],
});

export const street6 = D('street-6', {
  name: 'Gayathri', role: 'Chennaiite woman on a call', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Woman in a mint churidar top with specs, on a phone call.',
  goal: 'Tell her to carry on talking, then ask where to get good coffee.',
  steps: [
    S('call', ['ஹலோ அம்மா, அப்புறம் பேசறேன்... மேடம், ஒரு நிமிஷம்.', 'Hello amma, appuram pesaren... Madam, oru nimisham.', 'Hello Amma, I will talk later... Madam, one minute.'],
      'Tell her it is fine, go on talking.', ['Paravaayilla, pesunga.', 'பரவாயில்ல, பேசுங்க.'],
      ['paravaayilla pesunga', 'paravaayilla akka pesunga', 'pesunga naan kaathirukken', 'paravaayilla neenga pesunga', 'seri pesunga akka', 'பரவாயில்ல பேசுங்க', 'பரவாயில்ல அக்கா பேசுங்க'],
      'tell_her_carry_on_call', ['Say it is okay.', '"Pesunga" = please talk.', 'Say: "Paravaayilla, pesunga."'],
      ['சாரி! இப்போ சொல்லுங்க, என்ன வேணும்?', 'Sorry! Ippo sollunga, enna venum?', 'Sorry! Now tell me, what do you need?'],
      ['என்ன சொன்னீங்க? போன்ல சத்தம்.', 'Enna sonneenga? Phone-la saththam.', 'What did you say? The phone is noisy.']),
    S('coffee', ['என்ன கேக்கணும்னு சொல்லுங்க, நான் உதவறேன்.', 'Enna kekkanumnu sollunga, naan udhavaren.', 'Tell me what you want to ask, I will help.'],
      'Ask where to get good coffee.', ['Inga nalla coffee enga kidaikkum?', 'இங்க நல்ல காபி எங்க கிடைக்கும்?'],
      ['inga nalla coffee enga kidaikkum', 'nalla coffee enga kidaikkum akka', 'filter coffee enga kidaikkum', 'inga nalla coffee irukkaa', 'akka nalla coffee enga', 'இங்க நல்ல காபி எங்க கிடைக்கும்', 'நல்ல காபி எங்க கிடைக்கும்'],
      'ask_where_good_coffee', ['Ask about coffee.', '"Coffee" is the same word.', 'Say: "Inga nalla coffee enga kidaikkum?"'],
      ['அந்த டீ கடைல குடிங்க. நுரை பொங்க ஃபில்டர் காபி!', 'Andha tea kadaila kudinga. Nurai ponga filter coffee!', 'Drink at that tea kadai. Filter coffee with a frothy top!'],
      ['காபியா டீயா மேடம்?', 'Coffeeyaa teeyaa madam?', 'Coffee or tea, madam?']),
  ],
  outro: ['காபி குடிச்சிட்டு உங்க ப்ளாக்ல எழுதுங்க!', 'Coffee kudichittu unga blog-la ezhudhunga!', 'Drink the coffee and write on your blog!'],
  learned: [['paravaayilla, pesunga', 'no problem, go on talking'], ['nalla coffee enga kidaikkum?', 'where can I get good coffee?']],
  again: ['மேடம், இன்னும் ஏதாவது கேக்கணுமா?', 'Madam, innum edhaavadhu kekkanumaa?', 'Madam, anything else to ask?'],
});

export const street7 = D('street-7', {
  name: 'Kuppusamy Thaatha', role: 'Chennaiite elder', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Bald elder in specs with a sky towel on his shoulder, standing idle.',
  goal: 'Say you will visit the temple too.',
  steps: [
    S('temple', ['காலைல கோயில் போனேன். தரிசனம் சூப்பர்!', 'Kaalaila kovil ponen. Dharisanam super!', 'I went to the temple this morning. The darshan was great!'],
      'Say good, you will go too.', ['Nalladhu thaatha, naanum poren.', 'நல்லது தாத்தா, நானும் போறேன்.'],
      ['nalladhu thaatha naanum poren', 'naanum poren thaatha', 'nalladhu naanum kovil poren', 'seri thaatha naanum poren', 'naanum kovil poren thaatha', 'நல்லது தாத்தா நானும் போறேன்', 'நானும் போறேன் தாத்தா'],
      'say_will_visit_temple', ['Say you will go too.', '"Naanum poren" = I will go too.', 'Say: "Nalladhu thaatha, naanum poren."'],
      ['போங்க கண்ணு. செருப்பை வெளியே விடுங்க.', 'Ponga kannu. Seruppai veliye vidunga.', 'Go, dear. Leave your chappals outside.'],
      ['கோயிலுக்கு போவீங்களா கண்ணு?', 'Kovilukku poveengalaa kannu?', 'Will you go to the temple, dear?']),
  ],
  outro: ['கோயில்ல பிரசாதம் மறக்காம வாங்குங்க!', 'Kovilla prasaadham marakkaama vaangunga!', 'Do not forget to take prasadam at the temple!'],
  learned: [['naanum poren', 'I will go too']],
  again: ['கண்ணு, கோயிலுக்கு போனீங்களா?', 'Kannu, kovilukku poneengalaa?', 'Dear, did you go to the temple?'],
});

export const street8 = D('street-8', {
  name: 'Tarun', role: 'Chennaiite teen', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Teen in a yellow tee with red stripes and a teal cap, texting.',
  goal: 'Say his photo looks good and tell him to send it.',
  steps: [
    S('photo', ['அக்கா, இந்த போட்டோல நான் நல்லா இருக்கேனா?', 'Akka, indha photola naan nallaa irukkenaa?', 'Akka, do I look good in this photo?'],
      'Say yes, he looks very good.', ['Aamaa, romba nalla irukkeenga.', 'ஆமா, ரொம்ப நல்லா இருக்கீங்க.'],
      ['aamaa romba nalla irukkeenga', 'romba nalla irukkeenga', 'photo-la super-aa irukkeenga', 'aamaa nalla irukku', 'nee romba nalla irukka thambi', 'ஆமா ரொம்ப நல்லா இருக்கீங்க', 'ரொம்ப நல்லா இருக்கீங்க'],
      'say_photo_looks_good', ['Compliment him.', '"Nalla irukkeenga" = you look good.', 'Say: "Aamaa, romba nalla irukkeenga."'],
      ['சூப்பர்! அப்போ இதையே வைக்கறேன்.', 'Super! Appo idhaiye vaikkaren.', 'Super! Then I will keep this one.'],
      ['நல்லா இருக்கேனா இல்லையா?', 'Nallaa irukkenaa illaiyaa?', 'Do I look good or not?']),
    S('send', ['இதை எல்லாருக்கும் அனுப்பவா?', 'Idhai ellaarukkum anuppavaa?', 'Shall I send this to everyone?'],
      'Tell him to send it.', ['Anuppu thambi, nalla irukku.', 'அனுப்பு தம்பி, நல்லா இருக்கு.'],
      ['anuppu thambi nalla irukku', 'anuppu thambi', 'seri anuppu', 'anuppunga nalla irukku', 'anuppu nalla thaan irukku', 'அனுப்பு தம்பி நல்லா இருக்கு', 'அனுப்பு தம்பி'],
      'tell_him_to_send_photo', ['Say go ahead.', '"Anuppu" = send.', 'Say: "Anuppu thambi, nalla irukku."'],
      ['ஓகே அக்கா! அனுப்பிட்டேன்!', 'Okay akka! Anuppittaen!', 'Okay, akka! Sent!'],
      ['அனுப்பவா வேணாமா அக்கா?', 'Anuppavaa venaamaa akka?', 'Shall I send it or not, akka?']),
  ],
  outro: ['நன்றி அக்கா! நீங்க சூப்பர்!', 'Nandri akka! Neenga super!', 'Thanks, akka! You are super!'],
  learned: [['romba nalla irukkeenga', 'you look very good'], ['anuppu', 'send it']],
  again: ['அக்கா, இன்னொரு போட்டோ பாக்கறீங்களா?', 'Akka, innoru photo paakkareengalaa?', 'Akka, want to see another photo?'],
});

export const street9 = D('street-9', {
  name: 'Balu Anna', role: 'Chennaiite man', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Man with grey hair, a handlebar moustache and a green checked towel, chatting happily.',
  goal: 'Say you are a food blogger.',
  steps: [
    S('food', ['சென்னைல எல்லா இடத்துலயும் சாப்பாடு சூப்பர் தான்!', 'Chennai-la ellaa idatthulayum saappaadu super thaan!', 'Food is super everywhere in Chennai!'],
      'Say you are a food blogger.', ['Aamaa anna, naan food blogger.', 'ஆமா அண்ணா, நான் ஃபுட் பிளாகர்.'],
      ['aamaa anna naan food blogger', 'naan food blogger anna', 'naan food blogger', 'aamaa naan saappaadu blogger', 'naan saappaadu patthi ezhudhuven anna', 'ஆமா அண்ணா நான் ஃபுட் பிளாகர்', 'நான் ஃபுட் பிளாகர்'],
      'say_you_are_food_blogger', ['Tell him your job.', '"Food blogger" is understood.', 'Say: "Aamaa anna, naan food blogger."'],
      ['அட, அப்போ பிரியாணி, மீன் குழம்பு, எல்லாம் சாப்பிட்டு பாருங்க!', 'Ada, appo biryani, meen kuzhambu, ellaam saappittu paarunga!', 'Oh, then try biryani, fish curry, everything!'],
      ['நீங்க என்ன பண்றீங்க?', 'Neenga enna pannureenga?', 'What do you do?']),
  ],
  outro: ['சென்னைய சாப்பிட்டே தெரிஞ்சுக்கோங்க மீரா!', 'Chennaiya saappitte therinjukkonga Meera!', 'Get to know Chennai by eating, Meera!'],
  learned: [['naan food blogger', 'I am a food blogger']],
  again: ['மேடம், இன்னும் ஸ்பெஷல் சொல்லவா?', 'Madam, innum special sollavaa?', 'Madam, shall I tell you more specials?'],
});

export const street10 = D('street-10', {
  name: 'Vijaya', role: 'Chennaiite woman', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Woman in a pink churidar with a cloth vegetable bag and jasmine in her bun, standing idle.',
  goal: 'Offer to carry her bag and thank her for the invitation.',
  steps: [
    S('bag', ['கீரை, காய் எல்லாம் வாங்கிட்டேன். பை கனமா இருக்கு.', 'Keerai, kaai ellaam vaangittaen. Bai kanamaa irukku.', 'I bought greens and vegetables. The bag is heavy.'],
      'Offer to carry some of it.', ['Naan konjam edukkavaa akka?', 'நான் கொஞ்சம் எடுக்கவா அக்கா?'],
      ['naan konjam edukkavaa akka', 'konjam edukkavaa akka', 'naan edukkavaa akka', 'bag kudunga naan edukkaren', 'akka konjam edukkavaa', 'நான் கொஞ்சம் எடுக்கவா அக்கா', 'கொஞ்சம் எடுக்கவா அக்கா'],
      'offer_to_carry_some', ['Offer to help.', '"Edukkavaa?" = shall I carry?', 'Say: "Naan konjam edukkavaa akka?"'],
      ['வேணாம் கண்ணு, வீடு பக்கம் தான். ஆனா நல்ல மனசு!', 'Venaam kannu, veedu pakkam thaan. Aanaa nalla manasu!', 'No need, dear, home is close. But what a kind heart!'],
      ['என்ன சொன்னீங்க? திரும்ப சொல்லுங்க.', 'Enna sonneenga? Thirumba sollunga.', 'What did you say? Say it again.']),
    S('invite', ['சாப்பிட வாங்களேன், இட்லி சாம்பார் வெச்சிருக்கேன்!', 'Saappida vaangalaen, idli saambaar vechchirukken!', 'Do come to eat, I have idli and sambar ready!'],
      'Thank her, you will come another day.', ['Nandri akka, innoru naal varen.', 'நன்றி அக்கா, இன்னொரு நாள் வரேன்.'],
      ['nandri akka innoru naal varen', 'innoru naal varen akka', 'nandri akka naalaikku varen', 'seri akka innoru naal', 'romba nandri innoru naal varen', 'நன்றி அக்கா இன்னொரு நாள் வரேன்', 'இன்னொரு நாள் வரேன் அக்கா'],
      'thank_and_come_another_day', ['Thank her politely.', '"Innoru naal varen" = I will come another day.', 'Say: "Nandri akka, innoru naal varen."'],
      ['கண்டிப்பா வாங்க! என் வீடு எல்லாரும் தெரியும்.', 'Kandippaa vaanga! En veedu ellaarum theriyum.', 'Do come! Everyone knows my house.'],
      ['வருவீங்களா மாட்டீங்களா கண்ணு?', 'Varuveengalaa maatteengalaa kannu?', 'Will you come or not, dear?']),
  ],
  outro: ['இட்லி ஆறிடும் முன்னாடி வந்துடுங்க மீரா!', 'Idli aaridum munnaadi vandhuduunga Meera!', 'Come before the idli gets cold, Meera!'],
  learned: [['naan konjam edukkavaa?', 'shall I carry some?'], ['innoru naal varen', 'I will come another day']],
  again: ['கண்ணு, இன்னும் பை கனமா இருக்கு!', 'Kannu, innum bai kanamaa irukku!', 'Dear, the bag is still heavy!'],
});
