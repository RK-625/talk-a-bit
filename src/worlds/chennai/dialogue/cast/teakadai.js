// Tea-kadai square: the gully, the news stand, the fruit and jasmine stalls, the kolam and the Pongal poster.
import { dialogue as D, step as S } from '../kit.js';

export const bowler = D('chowk-cricket-bowler', {
  name: 'Gopi', role: 'gully cricket bowler', site: 'Tea-kadai square, cricket gully', diff: 2,
  voice: { rate: 1.15, pitch: 1.35 },
  persona: 'Kid in a pink checked shirt with a tennis ball, arguing with the batter about the last ball.',
  goal: 'Agree the last ball was out, then tell him to bowl.',
  steps: [
    S('out', ['அது அவுட் தான்! நீங்களே சொல்லுங்க அக்கா!', 'Adhu out thaan! Neengale sollunga akka!', 'That was out! You tell him, akka!'],
      'Agree that it was out.', ['Aamaa, adhu out thaan.', 'ஆமா, அது அவுட் தான்.'],
      ['aamaa adhu out thaan', 'adhu out thaan thambi', 'out thaan', 'aamaa out', 'nee sonnadhu sari out thaan', 'ஆமா அது அவுட் தான்', 'அது அவுட் தான் தம்பி'],
      'agree_it_was_out', ['Take his side.', '"Out" is the same word.', 'Say: "Aamaa, adhu out thaan."'],
      ['பாத்தீங்களா! அக்காவும் அவுட்னு சொல்றாங்க!', 'Paatheengalaa! Akkaavum outnu solraanga!', 'See! Even akka says it is out!'],
      ['அவுட்டா, நாட் அவுட்டா? சீக்கிரம்!', 'Out-aa, not out-aa? Seekkiram!', 'Out or not out? Quick!']),
    S('bowl', ['அடுத்த பால் யார்க்கர் போடவா?', 'Adutha ball yorker podavaa?', 'Shall I bowl a yorker next?'],
      'Tell him to go ahead and bowl.', ['Podu thambi, naan paakkaren.', 'போடு தம்பி, நான் பாக்கறேன்.'],
      ['podu thambi naan paakkaren', 'podu thambi', 'podunga naan paakkaren', 'bowl pannu thambi', 'seri podu', 'போடு தம்பி நான் பாக்கறேன்', 'சரி போடு தம்பி'],
      'tell_him_to_bowl', ['Say go ahead.', '"Podu" = throw it.', 'Say: "Podu thambi, naan paakkaren."'],
      ['ஹேய்! க்ளீன் போல்டு!', 'Hey! Clean bowled!', 'Hey! Clean bowled!'],
      ['போடவா வேணாமா அக்கா?', 'Podavaa venaamaa akka?', 'Shall I bowl or not, akka?']),
  ],
  outro: ['நாளைக்கு என் பவுலிங்கை பாக்க வாங்க அக்கா!', 'Naalaikku en bowlingai paakka vaanga akka!', 'Come tomorrow and watch my bowling, akka!'],
  learned: [['adhu out thaan', 'that is out']],
  again: ['அக்கா, இன்னொரு பால் போடவா?', 'Akka, innoru ball podavaa?', 'Akka, shall I bowl another ball?'],
});

export const paperMan = D('chowk-newspaper-vendor', {
  name: 'Ramasamy Thaatha', role: 'newspaper vendor', site: 'Tea-kadai square, news stand', diff: 2,
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Thin old vendor in specs, holding up the morning paper and calling headlines; knows every bit of gossip on the street.',
  goal: 'Ask for a Tamil newspaper.',
  steps: [
    S('paper', ['இன்னைக்கு தினசரி! சூடான செய்தி! வாங்கறீங்களா?', 'Innaikku dhinasari! Soodaana seidhi! Vaangareengalaa?', 'Today paper! Hot news! Will you buy one?'],
      'Ask for a Tamil newspaper.', ['Oru Tamil paper kudunga thaatha.', 'ஒரு தமிழ் பேப்பர் கொடுங்க தாத்தா.'],
      ['oru tamil paper kudunga thaatha', 'oru tamil paper kudunga', 'thaatha oru paper kudunga', 'tamil paper venum thaatha', 'oru dhinasari kudunga', 'ஒரு தமிழ் பேப்பர் கொடுங்க', 'தாத்தா ஒரு பேப்பர் வேணும்'],
      'ask_for_tamil_paper', ['Ask for the paper.', '"Paper" and "kudunga" are enough.', 'Say: "Oru Tamil paper kudunga thaatha."'],
      ['தமிழ் படிச்சா தமிழ் நல்லா வரும்! இந்தாங்க.', 'Tamizh padichchaa Tamizh nallaa varum! Indhaanga.', 'Read Tamil and your Tamil improves! Here you go.'],
      ['என்ன வேணும்? ஆங்கிலமா, தமிழா?', 'Enna venum? Aangilamaa, Tamizhaa?', 'What do you want? English or Tamil?']),
  ],
  outro: ['தினமும் படிங்க மீரா, சென்னை புரியும்!', 'Dhinamum padinga Meera, Chennai puriyum!', 'Read daily, Meera, and you will understand Chennai!'],
  learned: [['oru Tamil paper kudunga', 'give me a Tamil newspaper']],
  again: ['இன்னொரு பேப்பர் வேணுமா மீரா?', 'Innoru paper venumaa Meera?', 'Another paper, Meera?'],
});

export const skipGirl = D('chowk-skip-girl', {
  name: 'Kaviya', role: 'skipping girl', site: 'Tea-kadai square, open ground by the sundal cart', diff: 1,
  voice: { rate: 1.1, pitch: 1.4 },
  persona: 'Little girl in a pink churidar top skipping rope and counting out loud in Tamil.',
  goal: 'Join her skipping and say how many times you jumped.',
  steps: [
    S('join', ['ஒண்ணு, ரெண்டு, மூணு... அக்கா, நீங்களும் தாண்டுறீங்களா?', 'Onnu, rendu, moonu... Akka, neengalum thaandureengalaa?', 'One, two, three... Akka, will you jump too?'],
      'Say okay, you will jump too.', ['Seri, naanum thaanduren.', 'சரி, நானும் தாண்டுறேன்.'],
      ['seri naanum thaanduren', 'naanum thaanduren', 'naanum thaandalaamaa', 'seri kudu naan thaanduren', 'naanum jump pannuren', 'சரி நானும் தாண்டுறேன்', 'நானும் தாண்டுறேன்'],
      'join_skipping', ['Say yes.', '"Naanum" = me too. "Thaanduren" = I will jump.', 'Say: "Seri, naanum thaanduren."'],
      ['ஹே! அக்கா தாண்டுறாங்க! நான் எண்றேன்!', 'Hey! Akka thaandurangaa! Naan enren!', 'Hey! Akka is jumping! I will count!'],
      ['தாண்டுறீங்களா இல்லையா அக்கா?', 'Thaandureengalaa illaiyaa akka?', 'Will you jump or not, akka?']),
    S('count', ['ஐயோ, கால்ல தட்டிடுச்சு! எத்தனை தடவ தாண்டுனீங்க?', 'Ayyo, kaalla thattiduchu! Etthanai thadavai thaandunneenga?', 'Oops, the rope caught your foot! How many times did you jump?'],
      'Say you jumped five times.', ['Naan anju thadavai thaandinen.', 'நான் அஞ்சு தடவை தாண்டினேன்.'],
      ['naan anju thadavai thaandinen', 'anju thadavai thaandinen', 'anju thadavai', 'naan anju jump pannen', 'anju thadavai thaandunen akka', 'நான் அஞ்சு தடவை தாண்டினேன்', 'அஞ்சு தடவை'],
      'say_jumped_five_times', ['Say a number.', 'Five = "anju". Times = "thadavai".', 'Say: "Naan anju thadavai thaandinen."'],
      ['அஞ்சா! நான் இருபது தாண்டுவேன்!', 'Anjaa! Naan irubadhu thaanduven!', 'Five! I can jump twenty!'],
      ['எத்தனைன்னு சொல்லுங்க அக்கா!', 'Etthanainnu sollunga akka!', 'Tell me how many, akka!']),
  ],
  outro: ['நாளைக்கும் வாங்க அக்கா, ரெண்டு பேரும் தாண்டலாம்!', 'Naalaikkum vaanga akka, rendu perum thaandalaam!', 'Come tomorrow too, akka, we can both jump!'],
  learned: [['naanum thaanduren', 'I will jump too'], ['anju thadavai', 'five times']],
  again: ['அக்கா, இன்னொரு ரவுண்டு தாண்டலாமா?', 'Akka, innoru round thaandalaamaa?', 'Akka, shall we jump another round?'],
});

export const kiteBoy = D('chowk-kite-boy', {
  name: 'Sakthi', role: 'kite-flying boy', site: 'Tea-kadai square, lane south of the tea kadai', diff: 1,
  voice: { rate: 1.1, pitch: 1.3 },
  persona: 'Boy in a sky-blue tee flying a kite with his head tipped back, worried about the electric wires.',
  goal: 'Calm him and tell him to pull the string slowly.',
  steps: [
    S('wires', ['அக்கா, பட்டம் கம்பில சிக்கிடும் போல! பயமா இருக்கு!', 'Akka, pattam kambila sikkidum pola! Bayamaa irukku!', 'Akka, the kite may get stuck in the wires! I am scared!'],
      'Tell him not to worry and pull slowly.', ['Bayappadaadha thambi, methuvaa ilu.', 'பயப்படாத தம்பி, மெதுவா இழு.'],
      ['bayappadaadha thambi methuvaa ilu', 'bayappadaadha methuvaa ilu', 'methuvaa ilu thambi', 'bayam vendaam methuvaa ilu', 'konjam konjamaa ilu thambi', 'பயப்படாத தம்பி மெதுவா இழு', 'மெதுவா இழு தம்பி'],
      'tell_to_pull_slowly', ['Calm him down.', '"Methuvaa ilu" = pull slowly.', 'Say: "Bayappadaadha thambi, methuvaa ilu."'],
      ['ஆஹா! வந்துடுச்சு! அக்கா, நீங்க சூப்பர்!', 'Aaha! Vandhuduchu! Akka, neenga super!', 'Wow! It came down! Akka, you are super!'],
      ['அக்கா, என்ன சொன்னீங்க? காத்து சத்தம்!', 'Akka, enna sonneenga? Kaathu saththam!', 'Akka, what did you say? The wind is loud!']),
  ],
  outro: ['அடுத்த தடவை உங்களுக்கும் ஒரு பட்டம் தரேன்!', 'Adutha thadavai ungalukkum oru pattam tharen!', 'Next time I will give you a kite too!'],
  learned: [['methuvaa ilu', 'pull slowly']],
  again: ['அக்கா, பட்டம் மறுபடி மேல போகுது பாருங்க!', 'Akka, pattam marubadi mela pogudhu paarunga!', 'Akka, look, the kite is going up again!'],
});

export const schoolCustomer = D('chowk-vada-customer', {
  name: 'Dinesh', role: 'schoolboy', site: 'Tea-kadai square, customer side of the sundal cart', diff: 1,
  voice: { rate: 1.1, pitch: 1.25 },
  persona: 'Schoolboy with a backpack and pocket money, waiting for his murukku at the sundal cart.',
  goal: 'Tell him the murukku is very good.',
  steps: [
    S('murukku', ['அக்கா, இங்க முறுக்கு நல்லா இருக்குமா?', 'Akka, inga murukku nallaa irukkumaa?', 'Akka, is the murukku good here?'],
      'Say yes, it is very good.', ['Aamaa thambi, romba nalla irukkum.', 'ஆமா தம்பி, ரொம்ப நல்லா இருக்கும்.'],
      ['aamaa thambi romba nalla irukkum', 'romba nalla irukkum thambi', 'aamaa nalla irukkum', 'super-aa irukkum thambi', 'nee vaangi paaru thambi', 'ஆமா தம்பி ரொம்ப நல்லா இருக்கும்', 'ரொம்ப நல்லா இருக்கும் தம்பி'],
      'say_murukku_is_good', ['Say yes, it is good.', '"Nalla irukkum" = it will be good.', 'Say: "Aamaa thambi, romba nalla irukkum."'],
      ['சூப்பர்! அப்போ ரெண்டு வாங்கறேன்!', 'Super! Appo rendu vaangaren!', 'Great! Then I will buy two!'],
      ['நல்லா இருக்குமா இல்லையா அக்கா?', 'Nallaa irukkumaa illaiyaa akka?', 'Will it be good or not, akka?']),
  ],
  outro: ['நீங்க சொன்னா சரியாதான் இருக்கும் அக்கா!', 'Neenga sonnaa sariyaadhaan irukkum akka!', 'If you say so, it must be right, akka!'],
  learned: [['romba nalla irukkum', 'it will be very good']],
  again: ['அக்கா, இன்னும் ஏதாவது நல்லா இருக்கா?', 'Akka, innum edhaavadhu nallaa irukkaa?', 'Akka, is anything else good here?'],
});

export const fruitSeller = D('chowk-fruit-seller', {
  name: 'Valli Akka', role: 'fruit seller', site: 'Tea-kadai square, fruit stall', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Fruit seller with a mint towel on her shoulder, calling out with arms spread like a hawker.',
  goal: 'Ask the price of a bunch of bananas and buy one.',
  steps: [
    S('price', ['வாழைப்பழம் வாங்கிக்கோங்க! செவ்வாழை, ரஸ்தாளி இருக்கு!', 'Vaazhaippazham vaangikkonga! Sevvaazhai, rasthaali irukku!', 'Buy bananas! I have red bananas and rasthali!'],
      'Ask the price of one bunch.', ['Oru seeppu evvalavu akka?', 'ஒரு சீப்பு எவ்வளவு அக்கா?'],
      ['oru seeppu evvalavu akka', 'seeppu evvalavu akka', 'vaazhaippazham evvalavu akka', 'oru seeppu vilai evvalavu', 'rasthaali evvalavu akka', 'ஒரு சீப்பு எவ்வளவு அக்கா', 'வாழைப்பழம் எவ்வளவு அக்கா'],
      'ask_banana_bunch_price', ['Ask the price of a bunch.', '"Seeppu" = a bunch of bananas.', 'Say: "Oru seeppu evvalavu akka?"'],
      ['நாற்பது ரூபா. தித்திப்பா இருக்கும்!', 'Naarpadhu rubaa. Thitthippaa irukkum!', 'Forty rupees. They are sweet!'],
      ['எந்த பழம்? விலையா கேக்கறீங்க?', 'Endha pazham? Vilaiyaa kekkareenga?', 'Which fruit? Are you asking the price?']),
    S('buy', ['நாற்பது ரூபாதான். எடுத்துக்கறீங்களா?', 'Naarpadhu rubaadhaan. Edutthukkareengalaa?', 'Just forty rupees. Will you take it?'],
      'Say okay, ask for one bunch.', ['Seri akka, oru seeppu podunga.', 'சரி அக்கா, ஒரு சீப்பு போடுங்க.'],
      ['seri akka oru seeppu podunga', 'oru seeppu podunga akka', 'oru seeppu kudunga', 'seri oru seeppu venum', 'rasthaali oru seeppu podunga', 'சரி அக்கா ஒரு சீப்பு போடுங்க', 'ஒரு சீப்பு கொடுங்க'],
      'buy_banana_bunch', ['Say you will take one.', '"Seri" = okay. "Podunga" = please put.', 'Say: "Seri akka, oru seeppu podunga."'],
      ['இந்தாங்க! பழுத்த பழம், இன்னைக்கே சாப்பிடுங்க.', 'Indhaanga! Pazhutha pazham, innaikke saappidunga.', 'Here! Ripe fruit, eat it today.'],
      ['வேணுமா வேணாமா? சொல்லுங்க.', 'Venumaa venaamaa? Sollunga.', 'Want it or not? Tell me.']),
  ],
  outro: ['பழம் சாப்பிட்டா உடம்புக்கு நல்லது மீரா!', 'Pazham saappittaa udambukku nalladhu Meera!', 'Eating fruit is good for health, Meera!'],
  learned: [['oru seeppu evvalavu?', 'how much for a bunch?'], ['oru seeppu podunga', 'give me one bunch']],
  again: ['மீரா, இன்னொரு சீப்பு வேணுமா?', 'Meera, innoru seeppu venumaa?', 'Meera, another bunch?'],
});

export const jasmineSeller = D('chowk-marigold-seller', {
  name: 'Jaya Akka', role: 'jasmine and flower seller', site: 'Tea-kadai square, flower stall', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Flower seller with a basket of jasmine strings, calling out to sell malli for hair and for the temple.',
  goal: 'Buy a mozham of jasmine and ask her to put it in your hair.',
  steps: [
    S('buy', ['மல்லிப்பூ, மல்லிப்பூ! முழம் இருபது ரூபா!', 'Malli poo, malli poo! Mozham irubadhu rubaa!', 'Jasmine, jasmine! Twenty rupees a mozham!'],
      'Ask for one mozham of jasmine.', ['Oru mozham malli kudunga akka.', 'ஒரு முழம் மல்லி கொடுங்க அக்கா.'],
      ['oru mozham malli kudunga akka', 'oru mozham malli kudunga', 'malli poo oru mozham', 'akka oru mozham malli venum', 'oru mozham malli podunga', 'ஒரு முழம் மல்லி கொடுங்க', 'ஒரு முழம் மல்லிப்பூ கொடுங்க அக்கா'],
      'buy_jasmine_mozham', ['Ask for jasmine.', 'One = "oru". A hand-length = "mozham".', 'Say: "Oru mozham malli kudunga akka."'],
      ['இந்தாங்க, வாசனை பாருங்க! கமகமன்னு இருக்கு!', 'Indhaanga, vaasanai paarunga! Kamakamannu irukku!', 'Here, smell it! So fragrant!'],
      ['எவ்வளவு வேணும்? முழமா, ரெண்டு முழமா?', 'Evvalavu venum? Mozhamaa, rendu mozhamaa?', 'How much? One mozham or two?']),
    S('hair', ['தலைல வெச்சுக்கோங்க. நல்லா இருக்கும்.', 'Thalaila vechukkonga. Nallaa irukkum.', 'Wear it in your hair. It will look nice.'],
      'Ask her to put it in your hair.', ['Neengale vechchu vidunga akka.', 'நீங்களே வெச்சு விடுங்க அக்கா.'],
      ['neengale vechchu vidunga akka', 'neengale vechu vidunga', 'akka vechchu vidunga', 'enakku vechchu vidunga', 'konjam vechchu vidunga akka', 'நீங்களே வெச்சு விடுங்க அக்கா', 'எனக்கு வெச்சு விடுங்க'],
      'ask_to_put_jasmine', ['Ask her to help.', '"Vechchu vidunga" = please put it.', 'Say: "Neengale vechchu vidunga akka."'],
      ['அட, அழகா இருக்கீங்க! சென்னை பொண்ணு மாதிரி!', 'Ada, azhagaa irukkeenga! Chennai ponnu maadhiri!', 'Oh, you look lovely! Like a Chennai girl!'],
      ['என்ன கேட்டீங்க கண்ணு? திரும்ப சொல்லுங்க.', 'Enna ketteenga kannu? Thirumba sollunga.', 'What did you ask, dear? Say it again.']),
  ],
  outro: ['இனிமே தினமும் மல்லி வெச்சுக்கோங்க மீரா!', 'Inimel dhinamum malli vechukkonga Meera!', 'From now on wear jasmine every day, Meera!'],
  learned: [['oru mozham malli kudunga', 'give me one mozham of jasmine'], ['vechchu vidunga', 'please put it on for me']],
  again: ['மீரா, இன்னும் மல்லி வேணுமா?', 'Meera, innum malli venumaa?', 'Meera, more jasmine?'],
});

export const newsReader = D('chowk-news-reader', {
  name: 'Subramani Thaatha', role: 'elderly newspaper reader', site: 'Tea-kadai square, customer side of the news stand', diff: 2,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Elderly man in a veshti reading an open newspaper, looking up now and then to comment on the weather.',
  goal: 'Say it is sunny, not rainy.',
  steps: [
    S('rain', ['பேப்பர்ல இன்னைக்கு மழை வருமாம்னு போட்டிருக்கு. நம்புறீங்களா?', 'Paper-la innaikku mazhai varumaamnu pottirukku. Nambureengalaa?', 'The paper says rain today. Do you believe it?'],
      'Say no, it is only sunny.', ['Illa thaatha, veyil dhaan adikkudhu.', 'இல்ல தாத்தா, வெயில் தான் அடிக்குது.'],
      ['illa thaatha veyil dhaan adikkudhu', 'illa thaatha veyil thaan', 'veyil dhaan adikkudhu thaatha', 'mazhai varaadhu veyil adikkudhu', 'nambala thaatha veyil', 'இல்ல தாத்தா வெயில் தான் அடிக்குது', 'வெயில் தான் அடிக்குது'],
      'say_sunny_not_rainy', ['Say you do not believe it.', '"Veyil" = sun. "Adikkudhu" = is beating.', 'Say: "Illa thaatha, veyil dhaan adikkudhu."'],
      ['ஹா ஹா! சரியா சொன்னீங்க. சென்னை வெயில் அப்படித்தான்!', 'Haa haa! Sariyaa sonneenga. Chennai veyil appadithaan!', 'Ha ha! You said it right. Chennai sun is like that!'],
      ['மழையா வெயிலா? சொல்லுங்க.', 'Mazhaiyaa veyilaa? Sollunga.', 'Rain or sun? Tell me.']),
  ],
  outro: ['குடை எடுத்துட்டு போங்க, எதுக்கும் இருக்கட்டும்!', 'Kudai eduthuttu ponga, edhukkum irukkattum!', 'Take an umbrella anyway, just in case!'],
  learned: [['veyil dhaan adikkudhu', 'it is only sunny']],
  again: ['மீரா, இன்னைக்கு செய்தி கேட்டீங்களா?', 'Meera, innaikku seidhi ketteengalaa?', 'Meera, have you heard today news?'],
});

export const kolamGirl = D('chowk-rangoli-girl', {
  name: 'Anitha', role: 'little girl drawing a kolam', site: 'Tea-kadai square, beside the kolam', diff: 2,
  voice: { rate: 1.0, pitch: 1.4 },
  persona: 'Little girl crouched over a kolam, drawing it with white rice-flour powder.',
  goal: 'Praise her kolam and ask her to teach you.',
  steps: [
    S('praise', ['அக்கா, இது என் கோலம்! எப்படி இருக்கு?', 'Akka, idhu en kolam! Eppadi irukku?', 'Akka, this is my kolam! How is it?'],
      'Say the kolam is very beautiful.', ['Kolam romba azhagaa irukku.', 'கோலம் ரொம்ப அழகா இருக்கு.'],
      ['kolam romba azhagaa irukku', 'kolam azhagaa irukku', 'romba azhagaa irukku kolam', 'kolam super-aa irukku', 'nee nalla poduraa kolam', 'கோலம் ரொம்ப அழகா இருக்கு', 'கோலம் அழகா இருக்கு'],
      'praise_kolam', ['Say something nice about it.', '"Azhagu" = beauty.', 'Say: "Kolam romba azhagaa irukku."'],
      ['நன்றி அக்கா! புள்ளி வெச்சு போடணும் தெரியுமா?', 'Nandri akka! Pulli vechchu podanum theriyumaa?', 'Thanks, akka! You have to start with dots, you know?'],
      ['கோலம் எப்படி இருக்குன்னு சொல்லுங்க அக்கா.', 'Kolam eppadi irukkunnu sollunga akka.', 'Tell me how the kolam is, akka.']),
    S('teach', ['நீங்களும் போடுவீங்களா? இந்தாங்க மாவு.', 'Neengalum podureengalaa? Indhaanga maavu.', 'Will you draw one too? Here, take the powder.'],
      'Ask her to teach you.', ['Enakku solli kudu, naan kathukkuren.', 'எனக்கு சொல்லிக்கொடு, நான் கத்துக்கறேன்.'],
      ['enakku solli kudu naan kathukkuren', 'enakku solli kudu', 'solli kudunga naan kathukkuren', 'naan kathukkuren solli kudu', 'enakku kolam solli kudu', 'எனக்கு சொல்லிக்கொடு நான் கத்துக்கறேன்', 'எனக்கு சொல்லிக்கொடு'],
      'ask_to_be_taught_kolam', ['Ask her to teach you.', '"Solli kudu" = teach me.', 'Say: "Enakku solli kudu, naan kathukkuren."'],
      ['சரி! முதல்ல புள்ளி, அப்புறம் கோடு. வாங்க!', 'Sari! Mudhalla pulli, appuram kodu. Vaanga!', 'Okay! First dots, then lines. Come!'],
      ['கத்துக்கணுமா வேணாமா அக்கா?', 'Katthukkanumaa venaamaa akka?', 'Do you want to learn or not, akka?']),
  ],
  outro: ['நீங்க நல்லா கத்துக்கறீங்க அக்கா!', 'Neenga nallaa katthukkareenga akka!', 'You are learning well, akka!'],
  learned: [['kolam romba azhagaa irukku', 'the kolam is very beautiful'], ['enakku solli kudu', 'teach me']],
  again: ['அக்கா, இன்னொரு கோலம் போடலாமா?', 'Akka, innoru kolam podalaamaa?', 'Akka, shall we draw another kolam?'],
});

export const pongalDevotee = D('chowk-ganpati-devotee', {
  name: 'Parvathi Akka', role: 'woman devotee at the Pongal poster', site: 'Tea-kadai square, in front of the Pongal / kolam poster', diff: 2,
  voice: { rate: 0.95, pitch: 1.1 },
  persona: 'Woman in a coral saree with a basket of flowers, standing with hands joined before the Pongal poster.',
  goal: 'Say you do not know how to make pongal.',
  steps: [
    S('pongal', ['பொங்கல் வருது. நீங்க பொங்கல் வைப்பீங்களா?', 'Pongal varudhu. Neenga pongal vaippeengalaa?', 'Pongal is coming. Will you cook pongal?'],
      'Say you do not know how to make pongal.', ['Illa akka, enakku pongal vekka theriyaadhu.', 'இல்ல அக்கா, எனக்கு பொங்கல் வைக்க தெரியாது.'],
      ['illa akka enakku pongal vekka theriyaadhu', 'enakku pongal vekka theriyaadhu', 'pongal vekka theriyaadhu akka', 'illa akka theriyaadhu', 'naan pongal vechchadhu illa', 'இல்ல அக்கா எனக்கு பொங்கல் வைக்க தெரியாது', 'எனக்கு பொங்கல் வைக்க தெரியாது'],
      'say_cannot_cook_pongal', ['Say you do not know how.', '"Theriyaadhu" = I do not know.', 'Say: "Illa akka, enakku pongal vekka theriyaadhu."'],
      ['பரவாயில்ல, நான் சொல்லித்தரேன். புது பானைல பால் பொங்கணும்!', 'Paravaayilla, naan sollitharen. Pudhu paanaila paal ponganum!', 'No problem, I will teach you. Milk must boil over in a new pot!'],
      ['பொங்கல் தெரியுமா தெரியாதா கண்ணு?', 'Pongal theriyumaa theriyaadhaa kannu?', 'Do you know pongal or not, dear?']),
  ],
  outro: ['பொங்கலோ பொங்கல்! சந்தோஷமா இருங்க மீரா!', 'Pongalo Pongal! Santhoshamaa irunga Meera!', 'Pongalo Pongal! Stay happy, Meera!'],
  learned: [['enakku theriyaadhu', 'I do not know']],
  again: ['மீரா, பொங்கல் பத்தி இன்னும் சொல்லவா?', 'Meera, pongal patthi innum sollavaa?', 'Meera, shall I tell you more about pongal?'],
});

export const tagBoy = D('chowk-tag-kid-1', {
  name: 'Bharath', role: 'playing kid', site: 'Tea-kadai square, open ground east of the tea kadai', diff: 1,
  voice: { rate: 1.2, pitch: 1.3 },
  persona: 'Boy in a mint shirt playing tag, dodging and running in short bursts.',
  goal: 'Join the tag game and tell him you will catch him.',
  steps: [
    S('tag', ['அக்கா, நீங்க தான் அவுட்! என்னை பிடிங்க!', 'Akka, neenga thaan out! Ennai pidinga!', 'Akka, you are it! Catch me!'],
      'Tell him to stop, you will catch him.', ['Nillu, naan pidichiduven!', 'நில்லு, நான் புடிச்சிடுவேன்!'],
      ['nillu naan pidichiduven', 'nillu thambi naan pidichiduven', 'naan pidichiduven', 'nillu pidikkaren', 'odaadhe naan pidichiduven', 'நில்லு நான் புடிச்சிடுவேன்', 'நான் புடிச்சிடுவேன்'],
      'tell_him_you_will_catch', ['Play along.', '"Nillu" = stop. "Pidichiduven" = I will catch.', 'Say: "Nillu, naan pidichiduven!"'],
      ['ஹா ஹா! முடியாது முடியாது! ஓடுங்க!', 'Haa haa! Mudiyaadhu mudiyaadhu! Odunga!', 'Ha ha! You cannot, you cannot! Run!'],
      ['ஓடுங்க அக்கா, பிடிங்க என்னை!', 'Odunga akka, pidinga ennai!', 'Run, akka, catch me!']),
  ],
  outro: ['நீங்க ஃபாஸ்ட் அக்கா! நாளைக்கும் வாங்க!', 'Neenga fast akka! Naalaikkum vaanga!', 'You are fast, akka! Come tomorrow too!'],
  learned: [['naan pidichiduven', 'I will catch you']],
  again: ['அக்கா, இன்னொரு ரவுண்டு?', 'Akka, innoru round?', 'Akka, another round?'],
});

export const tagGirl = D('chowk-tag-kid-2', {
  name: 'Divya', role: 'playing kid', site: 'Tea-kadai square, open ground east of the tea kadai', diff: 2,
  voice: { rate: 1.15, pitch: 1.45 },
  persona: 'Girl in a lilac top with a ball, playing tag with the other kid and curious about the lady with the camera.',
  goal: 'Tell her your name and that you write about food.',
  steps: [
    S('name', ['ஹாய் அக்கா! என் பேரு திவ்யா. உங்க பேரு என்ன?', 'Hi akka! En peru Divya. Unga peru enna?', 'Hi akka! My name is Divya. What is your name?'],
      'Tell her your name is Meera.', ['En peyar Meera.', 'என் பெயர் மீரா.'],
      ['en peyar meera', 'en peru meera', 'naan meera', 'enakku peru meera', 'en peyar meera divya', 'என் பெயர் மீரா', 'என் பேரு மீரா'],
      'tell_name_to_girl', ['Say your name.', '"Peyar" = name.', 'Say: "En peyar Meera."'],
      ['மீரா அக்கா! நல்ல பேரு!', 'Meera akka! Nalla peru!', 'Meera akka! A nice name!'],
      ['உங்க பேரு என்னன்னு சொல்லுங்க அக்கா!', 'Unga peru ennannu sollunga akka!', 'Tell me your name, akka!']),
    S('work', ['கேமரா வெச்சிருக்கீங்களே! நீங்க என்ன பண்றீங்க அக்கா?', 'Camera vechchirukkeengale! Neenga enna pannureenga akka?', 'You have a camera! What do you do, akka?'],
      'Say you write about food.', ['Naan saappaadu patthi ezhudhuren.', 'நான் சாப்பாடு பத்தி எழுதுறேன்.'],
      ['naan saappaadu patthi ezhudhuren', 'saappaadu patthi ezhudhuren', 'naan food blog ezhudhuren', 'naan saappaadu patthi ezhudhuven', 'saappaadu patthi ezhudhuradhu en velai', 'நான் சாப்பாடு பத்தி எழுதுறேன்', 'சாப்பாடு பத்தி எழுதுறேன்'],
      'say_you_write_about_food', ['Say what you do.', '"Saappaadu" = food. "Ezhudhuren" = I write.', 'Say: "Naan saappaadu patthi ezhudhuren."'],
      ['ஐயோ சூப்பர்! எங்க அம்மா சமையல் பத்தியும் எழுதுங்க!', 'Ayyo super! Enga amma samaiyal patthiyum ezhudhunga!', 'Wow, super! Write about my mother cooking too!'],
      ['என்ன வேலைன்னு சொல்லுங்க அக்கா.', 'Enna velainnu sollunga akka.', 'Tell me your job, akka.']),
  ],
  outro: ['நாளைக்கு எங்க வீட்டுக்கு வாங்க அக்கா, இட்லி சாப்பிடலாம்!', 'Naalaikku enga veettukku vaanga akka, idli saappidalaam!', 'Come to our house tomorrow, akka, we can eat idli!'],
  learned: [['en peyar Meera', 'my name is Meera'], ['saappaadu patthi ezhudhuren', 'I write about food']],
  again: ['அக்கா, இன்னொரு கேள்வி கேக்கவா?', 'Akka, innoru kelvi kekkavaa?', 'Akka, may I ask another question?'],
});
