// Elliot's Beach: the molaga bajji stall, the corn and coconut carts, the pony ride, the sand art, the shoreline.
import { dialogue as D, step as S } from '../kit.js';

export const bajjiCook = D('juhu-pavbhaji-cook', {
  name: 'Palani', role: 'molaga bajji stall cook', site: "Elliot's Beach, molaga bajji stall", diff: 3,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Man in a pink shirt with a palm fan, slicing big green chillies, dipping them in batter and lifting golden bajjis out of the hot oil.',
  goal: 'Ask how he makes bajji and say it looks easy.',
  steps: [
    S('how', ['மிளகாய வெட்டி மாவுல தோய்ச்சு பஜ்ஜி போடறேன். பாத்தீங்களா?', 'Milagaaya vetti maavula thoichchu bajji podaren. Paatheengalaa?', 'I slit the chillies, dip them in batter and fry bajji. See?'],
      'Ask him to show you how he makes it.', ['Eppadi seiyareenga? Solli kudunga.', 'எப்படி செய்யறீங்க? சொல்லிக் கொடுங்க.'],
      ['eppadi seiyareenga solli kudunga', 'eppadi seiyareenga anna', 'bajji eppadi seiyareenga', 'solli kudunga anna eppadi', 'eppadi pannureenga anna', 'எப்படி செய்யறீங்க சொல்லிக் கொடுங்க', 'எப்படி செய்யறீங்க அண்ணா'],
      'ask_how_bajji_is_made', ['Ask about his method.', '"Eppadi seiyareenga?" = how do you make it?', 'Say: "Eppadi seiyareenga? Solli kudunga."'],
      ['பச்சை மிளகா, கடலை மாவு, உப்பு, ஓமம். அவ்வளவுதான்!', 'Pachchai milagaa, kadalai maavu, uppu, omam. Avvalavudhaan!', 'Green chilli, gram flour, salt, ajwain. That is all!'],
      ['எதை சொல்லித்தரணும் மேடம்?', 'Edhai sollitharanum madam?', 'What should I teach, madam?']),
    S('easy', ['மாவு கெட்டியா இருக்கணும். எண்ணெய் நல்லா காயணும்.', 'Maavu getti-yaa irukkanum. Ennai nallaa kaayanum.', 'The batter should be thick. The oil must be hot.'],
      'Say it looks easy, you will try.', ['Romba easy-aa irukku, naan try pannuren.', 'ரொம்ப ஈஸியா இருக்கு, நான் ட்ரை பண்றேன்.'],
      ['romba easy-aa irukku naan try pannuren', 'easy-aa irukku try pannuren', 'romba easy anna naan try pannuren', 'naan veettula try pannuren', 'easy thaan try pannuren', 'ரொம்ப ஈஸியா இருக்கு நான் ட்ரை பண்றேன்', 'ஈஸியா இருக்கு'],
      'say_bajji_looks_easy', ['Say you will try it.', '"Easy-aa irukku" = it looks easy.', 'Say: "Romba easy-aa irukku, naan try pannuren."'],
      ['ஹா ஹா, பாக்க ஈஸி, பண்ண கஷ்டம்! முயற்சி பண்ணுங்க.', 'Haa haa, paakka easy, panna kashtam! Muyarchi pannunga.', 'Ha ha, easy to watch, hard to do! Give it a try.'],
      ['ஈஸியா கஷ்டமான்னு சொல்லுங்க.', 'Easiyaa kashtamaannu sollunga.', 'Tell me if it is easy or hard.']),
  ],
  outro: ['உங்க ப்ளாக்ல என் பஜ்ஜி படம் போடுங்க மீரா!', 'Unga blog-la en bajji padam podunga Meera!', 'Put a picture of my bajji on your blog, Meera!'],
  learned: [['eppadi seiyareenga?', 'how do you make it?'], ['easy-aa irukku', 'it looks easy']],
  again: ['மேடம், இன்னொரு பஜ்ஜி சாப்பிடுங்க!', 'Madam, innoru bajji saappidunga!', 'Madam, have another bajji!'],
});

export const cornSeller = D('juhu-bhutta-seller', {
  name: 'Anbu', role: 'roasted-corn seller', site: "Elliot's Beach, corn cart", diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Man in a rose striped shirt with a palm fan, fanning the coals, roasting corn and rubbing it with lemon and chilli.',
  goal: 'Order one corn with little spice.',
  steps: [
    S('corn', ['சோளம் சுட்டது! எலுமிச்சை, மிளகா தடவி தரவா?', 'Cholam suttadhu! Elumichai, milagaa thadavi tharavaa?', 'Roasted corn! Shall I rub it with lemon and chilli?'],
      'Order one corn with little spice.', ['Oru cholam kudunga, kaaram kammi.', 'ஒரு சோளம் கொடுங்க, காரம் கம்மி.'],
      ['oru cholam kudunga kaaram kammi', 'oru cholam kudunga', 'cholam onnu kaaram kammi', 'oru cholam podunga kaaram kammiyaa', 'oru corn kudunga kaaram kammi', 'ஒரு சோளம் கொடுங்க காரம் கம்மி', 'ஒரு சோளம் கொடுங்க'],
      'order_corn_less_spice', ['Say what you want.', '"Cholam" = corn. "Kaaram kammi" = less spice.', 'Say: "Oru cholam kudunga, kaaram kammi."'],
      ['இதோ, சூடா இருக்கு, ஊதி சாப்பிடுங்க!', 'Idho, soodaa irukku, oodhi saappidunga!', 'Here, it is hot, blow on it before eating!'],
      ['சோளம் வேணுமா மேடம்? சொல்லுங்க.', 'Cholam venumaa madam? Sollunga.', 'Want corn, madam? Tell me.']),
  ],
  outro: ['கடல் காத்துல சோளம் சூப்பர் மீரா!', 'Kadal kaatthula cholam super Meera!', 'Corn in the sea breeze is super, Meera!'],
  learned: [['oru cholam kudunga', 'give me one corn']],
  again: ['மேடம், இன்னொரு சோளம்?', 'Madam, innoru cholam?', 'Madam, another corn?'],
});

export const coconutCartMan = D('juhu-coconut-seller', {
  name: 'Elumalai', role: 'coconut and raw-mango cart man', site: "Elliot's Beach, coconut cart", diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Man in a cream vest with a sky-blue towel and a coconut in hand, slicing coconut pieces and raw mango with chilli salt.',
  goal: 'Order raw mango pieces with only salt.',
  steps: [
    S('mango', ['தேங்கா துண்டு, மாங்கா! உப்பு மிளகா போடவா?', 'Thengaa thundu, maangaa! Uppu milagaa podavaa?', 'Coconut pieces, raw mango! Shall I add salt and chilli?'],
      'Ask for raw mango pieces.', ['Maangaa thundu kudunga anna.', 'மாங்கா துண்டு கொடுங்க அண்ணா.'],
      ['maangaa thundu kudunga anna', 'maangaa thundu kudunga', 'maangaa thundu venum anna', 'oru plate maangaa kudunga', 'maangaa thundu podunga', 'மாங்கா துண்டு கொடுங்க அண்ணா', 'மாங்கா துண்டு வேணும்'],
      'order_mango_pieces', ['Ask for the mango.', '"Thundu" = piece.', 'Say: "Maangaa thundu kudunga anna."'],
      ['இந்தாங்க, இருபது ரூபா. உப்பு, காரம் போடட்டுமா?', 'Indhaanga, irubadhu rubaa. Uppu, kaaram podattumaa?', 'Here, twenty rupees. Shall I add salt and chilli?'],
      ['மாங்காவா தேங்காவா மேடம்?', 'Maangaavaa thengaavaa madam?', 'Mango or coconut, madam?']),
    S('salt', ['உப்பு மட்டும் போடவா, காரமும் போடவா?', 'Uppu mattum podavaa, kaaramum podavaa?', 'Only salt, or chilli too?'],
      'Say only salt.', ['Uppu mattum podunga anna.', 'உப்பு மட்டும் போடுங்க அண்ணா.'],
      ['uppu mattum podunga anna', 'uppu mattum podunga', 'uppu mattum anna', 'kaaram vendaam uppu mattum', 'uppu mattum podu anna', 'உப்பு மட்டும் போடுங்க அண்ணா', 'உப்பு மட்டும் போடுங்க'],
      'ask_only_salt', ['Choose the seasoning.', '"Uppu mattum" = only salt.', 'Say: "Uppu mattum podunga anna."'],
      ['சரி மேடம், சூப்பரா இருக்கும். சாப்பிட்டு பாருங்க.', 'Sari madam, superaa irukkum. Saappittu paarunga.', 'Okay, madam, it will be super. Taste it.'],
      ['உப்பு மட்டுமா காரமுமா?', 'Uppu mattumaa kaaramumaa?', 'Only salt or chilli too?']),
  ],
  outro: ['மாங்கா புளிப்பா இருக்கும், ஜாக்கிரதை மீரா!', 'Maangaa pulippaa irukkum, jaakkiradhai Meera!', 'The mango is tangy, be careful, Meera!'],
  learned: [['maangaa thundu kudunga', 'give me mango pieces'], ['uppu mattum podunga', 'only salt please']],
  again: ['மேடம், தேங்கா துண்டும் வேணுமா?', 'Madam, thengaa thundum venumaa?', 'Madam, coconut pieces too?'],
});

export const ponyKid = D('juhu-horse-rider-kid', {
  name: 'Dhanush', role: 'kid on the pony ride', site: "Elliot's Beach, pony ride", diff: 1,
  voice: { rate: 1.15, pitch: 1.4 },
  persona: 'Kid in a mint T-shirt riding the pony and waving at everyone.',
  goal: 'Cheer him on and tell him to sit carefully.',
  steps: [
    S('ride', ['அக்கா அக்கா! பாருங்க நான் குதிரை ஓட்டுறேன்!', 'Akka akka! Paarunga naan kudhirai ottureen!', 'Akka, akka! Look, I am riding the horse!'],
      'Cheer him on and tell him to sit carefully.', ['Super thambi, paathu ukkaaru!', 'சூப்பர் தம்பி, பாத்து உக்காரு!'],
      ['super thambi paathu ukkaaru', 'paathu ukkaaru thambi', 'super thambi', 'romba nalla ottureenga paathu', 'super paathu thambi', 'சூப்பர் தம்பி பாத்து உக்காரு', 'பாத்து உக்காரு தம்பி'],
      'cheer_pony_kid', ['Cheer him on.', '"Paathu ukkaaru" = sit carefully.', 'Say: "Super thambi, paathu ukkaaru!"'],
      ['ஹே! நான் ஜாக்கி மாதிரி! அக்கா போட்டோ எடுங்க!', 'Hey! Naan jockey maadhiri! Akka photo edunga!', 'Hey! I am like a jockey! Akka, take a photo!'],
      ['என்ன சொன்னீங்க அக்கா? குதிரை சத்தம்!', 'Enna sonneenga akka? Kudhirai saththam!', 'What did you say, akka? The horse is noisy!']),
  ],
  outro: ['நாளைக்கும் வரேன் அக்கா, நீங்களும் வாங்க!', 'Naalaikkum varen akka, neengalum vaanga!', 'I will come tomorrow too, akka, you come too!'],
  learned: [['paathu ukkaaru', 'sit carefully']],
  again: ['அக்கா, இன்னொரு ரவுண்டு ஓட்டவா?', 'Akka, innoru round ottavaa?', 'Akka, shall I ride another round?'],
});

export const sandArtist = D('juhu-sand-artist', {
  name: 'Manikandan', role: 'sand sculptor', site: "Elliot's Beach, sand art", diff: 2,
  voice: { rate: 0.95, pitch: 0.9 },
  persona: 'Man in a sky-blue cap and a saffron towel, barefoot, shaping a big sand sculpture with a spatula, line by line.',
  goal: 'Ask what the sculpture is and say it is beautiful.',
  steps: [
    S('what', ['மணல்ல சிற்பம் செய்யறேன். என்ன மாதிரி இருக்கு?', 'Manalla sirpam seiyaren. Enna maadhiri irukku?', 'I am making a sculpture in the sand. How does it look?'],
      'Ask what it is.', ['Idhu enna anna?', 'இது என்ன அண்ணா?'],
      ['idhu enna anna', 'idhu enna sirpam anna', 'enna idhu anna', 'idhu yaaru anna', 'anna idhu enna', 'இது என்ன அண்ணா', 'இது என்ன சிற்பம் அண்ணா'],
      'ask_what_sculpture_is', ['Ask what he is making.', '"Idhu enna?" = what is this?', 'Say: "Idhu enna anna?"'],
      ['இது கடல் அம்மன்! இன்னும் நிறைய வேலை இருக்கு.', 'Idhu kadal amman! Innum niraiya velai irukku.', 'This is the sea goddess! Lots more work to do.'],
      ['என்னன்னு கேக்கறீங்களா மேடம்?', 'Ennannu kekkareengalaa madam?', 'Are you asking what it is, madam?']),
    S('praise', ['அலை வந்தா அழிஞ்சிடும். ஆனாலும் செய்வேன்.', 'Alai vandhaa azhinjidum. Aanaalum seiven.', 'It will wash away when the waves come. Still, I make it.'],
      'Say it is very beautiful.', ['Romba azhagaa irukku anna!', 'ரொம்ப அழகா இருக்கு அண்ணா!'],
      ['romba azhagaa irukku anna', 'azhagaa irukku anna', 'sirpam romba azhagu anna', 'super anna romba azhagaa irukku', 'romba nalla irukku anna', 'ரொம்ப அழகா இருக்கு அண்ணா', 'அழகா இருக்கு அண்ணா'],
      'praise_sand_sculpture', ['Praise his art.', '"Azhagaa irukku" = looks beautiful.', 'Say: "Romba azhagaa irukku anna!"'],
      ['நன்றி மேடம்! ஒரு போட்டோ எடுத்துக்கோங்க.', 'Nandri madam! Oru photo eduthukkonga.', 'Thanks, madam! Take a photo.'],
      ['எப்படி இருக்குன்னு சொல்லுங்க மேடம்.', 'Eppadi irukkunnu sollunga madam.', 'Tell me how it looks, madam.']),
  ],
  outro: ['படத்துல நிக்கட்டும், மணல் போனாலும்!', 'Padatthula nikkattum, manal ponaalum!', 'Let it stay in the picture, even if the sand goes!'],
  learned: [['idhu enna?', 'what is this?'], ['romba azhagaa irukku', 'it is very beautiful']],
  again: ['மேடம், இன்னொரு சிற்பம் பாக்கறீங்களா?', 'Madam, innoru sirpam paakkareengalaa?', 'Madam, want to see another sculpture?'],
});

export const beachKid = D('juhu-gola-kid', {
  name: 'Yuvan', role: 'beach kid', site: "Elliot's Beach, near the tender-coconut stall", diff: 1,
  voice: { rate: 1.1, pitch: 1.4 },
  persona: 'Kid in a mint T-shirt bouncing a ball and waving, playing alone on the sand.',
  goal: 'Agree to play and tell him to throw the ball.',
  steps: [
    S('ball', ['அக்கா, என் கூட பந்து விளையாடறீங்களா?', 'Akka, en kooda pandhu vilaiyaadureengalaa?', 'Akka, will you play ball with me?'],
      'Agree and tell him to throw the ball here.', ['Seri thambi, pandhai inga podu.', 'சரி தம்பி, பந்தை இங்க போடு.'],
      ['seri thambi pandhai inga podu', 'pandhai inga podu thambi', 'seri podu pandhai', 'seri thambi vilaiyaadalaam', 'pandhai inga podu', 'சரி தம்பி பந்தை இங்க போடு', 'பந்தை இங்க போடு'],
      'agree_to_play_ball', ['Say yes.', '"Pandhu" = ball. "Podu" = throw.', 'Say: "Seri thambi, pandhai inga podu."'],
      ['ஹே! அக்கா கேட்ச் பிடிச்சாங்க!', 'Hey! Akka catch pidichchaanga!', 'Hey! Akka caught it!'],
      ['விளையாடறீங்களா இல்லையா அக்கா?', 'Vilaiyaadureengalaa illaiyaa akka?', 'Will you play or not, akka?']),
  ],
  outro: ['நாளைக்கும் வாங்க அக்கா, பந்து விளையாடலாம்!', 'Naalaikkum vaanga akka, pandhu vilaiyaadalaam!', 'Come tomorrow too, akka, we can play ball!'],
  learned: [['pandhai inga podu', 'throw the ball here']],
  again: ['அக்கா, இன்னொரு தடவை?', 'Akka, innoru thadavai?', 'Akka, one more time?'],
});

export const bajjiDiner = D('juhu-pavbhaji-diner-1', {
  name: 'Gokul', role: 'man eating molaga bajji', site: "Elliot's Beach, stall stool", diff: 1,
  voice: { rate: 1.05, pitch: 1.0 },
  persona: 'Man in a butter-yellow shirt seated on a stool, tucking into a plate of bajjis.',
  goal: 'Say you want a plate too.',
  steps: [
    S('plate', ['இந்த பஜ்ஜி சூப்பர்! நீங்களும் சாப்பிடுங்க.', 'Indha bajji super! Neengalum saappidunga.', 'This bajji is super! You eat too.'],
      'Say you want a plate too.', ['Enakkum oru plate venum.', 'எனக்கும் ஒரு பிளேட் வேணும்.'],
      ['enakkum oru plate venum', 'enakkum oru plate', 'naanum oru plate saappidaren', 'enakkum bajji venum', 'naanum saappidaren', 'எனக்கும் ஒரு பிளேட் வேணும்', 'எனக்கும் பஜ்ஜி வேணும்'],
      'ask_for_a_plate_too', ['Say you want some too.', '"Enakkum" = for me too.', 'Say: "Enakkum oru plate venum."'],
      ['அண்ணாகிட்ட சொல்லுங்க, சூடா தருவாரு!', 'Annakitta sollunga, soodaa tharuvaaru!', 'Tell the anna, he will give it hot!'],
      ['பஜ்ஜி வேணுமா வேணாமா மேடம்?', 'Bajji venumaa venaamaa madam?', 'Bajji or not, madam?']),
  ],
  outro: ['நல்லா சாப்பிடுங்க மீரா, காரம் ஜாஸ்தி தான்!', 'Nallaa saappidunga Meera, kaaram jaasthi thaan!', 'Eat well, Meera, it is quite spicy!'],
  learned: [['enakkum oru plate venum', 'I want a plate too']],
  again: ['மேடம், இன்னொரு பிளேட் ஆர்டர் பண்ணலாமா?', 'Madam, innoru plate order pannalaamaa?', 'Madam, shall we order another plate?'],
});

export const ponyHandler = D('juhu-horse-handler', {
  name: 'Mookan', role: 'pony handler', site: "Elliot's Beach, pony ride", diff: 3,
  voice: { rate: 1.0, pitch: 0.8 },
  persona: 'Man in a white turban and a butter-checked veshti with a handlebar moustache, leading the pony and waving to attract riders.',
  goal: 'Ask the price of a round and say you are just watching.',
  steps: [
    S('price', ['குதிரை சவாரி? கடற்கரை முழுக்க ஒரு ரவுண்டு!', 'Kudhirai savaari? Kadarkarai muzhukka oru round!', 'Pony ride? One round of the whole beach!'],
      'Ask the price of one round.', ['Oru round evvalavu anna?', 'ஒரு ரவுண்டு எவ்வளவு அண்ணா?'],
      ['oru round evvalavu anna', 'oru round evvalavu', 'savaari evvalavu anna', 'kudhirai round evvalavu', 'round evvalavu anna', 'ஒரு ரவுண்டு எவ்வளவு அண்ணா', 'ஒரு ரவுண்டு எவ்வளவு'],
      'ask_pony_ride_price', ['Ask the price.', '"Round" = one ride.', 'Say: "Oru round evvalavu anna?"'],
      ['நூறு ரூபா மேடம். பயமா இருந்தா நான் புடிச்சுக்கறேன்.', 'Nooru rubaa madam. Bayamaa irundhaa naan pudichchukkaren.', 'A hundred rupees, madam. If you are scared, I will hold you.'],
      ['எந்த சவாரி மேடம்?', 'Endha savaari madam?', 'Which ride, madam?']),
    S('watch', ['நூறு ரூபா. ஏறுங்க, பயம் வேணாம்.', 'Nooru rubaa. Erunga, bayam venaam.', 'A hundred rupees. Get on, no fear.'],
      'Say you are only watching for now.', ['Ippo paakka mattum thaan anna.', 'இப்போ பாக்க மட்டும் தான் அண்ணா.'],
      ['ippo paakka mattum thaan anna', 'paakka mattum thaan', 'ippo paakka mattum', 'naan paakka mattum vandhen anna', 'ippo venaam paakka mattum', 'இப்போ பாக்க மட்டும் தான் அண்ணா', 'பாக்க மட்டும் தான்'],
      'say_only_watching', ['Decline politely.', '"Paakka mattum" = only to look.', 'Say: "Ippo paakka mattum thaan anna."'],
      ['சரி மேடம், பரவாயில்ல. மனசு மாறினா சொல்லுங்க.', 'Sari madam, paravaayilla. Manasu maarinaa sollunga.', 'Okay, madam, fine. Tell me if you change your mind.'],
      ['ஏறுவீங்களா மாட்டீங்களா?', 'Eruveengalaa maatteengalaa?', 'Will you ride or not?']),
  ],
  outro: ['குதிரைக்கு பேரு ராஜா! நாளைக்கு வாங்க.', 'Kudhiraikku peru Raja! Naalaikku vaanga.', 'The horse is called Raja! Come tomorrow.'],
  learned: [['oru round evvalavu?', 'how much for a round?'], ['paakka mattum thaan', 'only looking']],
  again: ['மேடம், குதிரை ரெடி, ஏறுங்க!', 'Madam, kudhirai ready, erunga!', 'Madam, the pony is ready, get on!'],
});

export const familyMom = D('juhu-family-mom', {
  name: 'Uma', role: 'mother on the beach', site: "Elliot's Beach, near the shore", diff: 2,
  voice: { rate: 1.05, pitch: 1.2 },
  persona: 'Woman in a pink churidar top looking at her phone while watching her family, wanting a family photo.',
  goal: 'Agree to take the family photo and tell them to get ready.',
  steps: [
    S('photo', ['ஒரு போட்டோ எடுக்க முடியுமா? எல்லாரும் வந்துட்டாங்க.', 'Oru photo edukka mudiyumaa? Ellaarum vandhuttaanga.', 'Could you take a photo? Everyone is here.'],
      'Agree and ask everyone to stand.', ['Seri akka, ellaarum nillunga.', 'சரி அக்கா, எல்லாரும் நில்லுங்க.'],
      ['seri akka ellaarum nillunga', 'ellaarum nillunga akka', 'seri akka photo edukkaren', 'ellaarum onnaa nillunga', 'seri ellaarum ready', 'சரி அக்கா எல்லாரும் நில்லுங்க', 'எல்லாரும் நில்லுங்க'],
      'agree_family_photo', ['Say yes.', '"Ellaarum nillunga" = everyone stand.', 'Say: "Seri akka, ellaarum nillunga."'],
      ['நன்றி! பின்னாடி கடல் தெரியணும், சரியா?', 'Nandri! Pinnaadi kadal theriyanum, sariyaa?', 'Thanks! The sea should show behind, okay?'],
      ['எடுப்பீங்களா இல்லையா?', 'Eduppeengalaa illaiyaa?', 'Will you take it or not?']),
    S('count', ['எல்லாரும் சிரிங்க! மீரா, நீங்க எடுங்க.', 'Ellaarum sirunga! Meera, neenga edunga.', 'Everyone smile! Meera, you take it.'],
      'Count down to take the photo.', ['Ready? Onnu, rendu, moonu!', 'ரெடியா? ஒண்ணு, ரெண்டு, மூணு!'],
      ['ready onnu rendu moonu', 'onnu rendu moonu', 'ready ellaarum onnu rendu moonu', 'sirunga onnu rendu moonu', 'moonu rendu onnu', 'ரெடியா ஒண்ணு ரெண்டு மூணு', 'ஒண்ணு ரெண்டு மூணு'],
      'count_down_photo', ['Count one, two, three.', '"Onnu, rendu, moonu" = one, two, three.', 'Say: "Ready? Onnu, rendu, moonu!"'],
      ['சூப்பர்! நல்லா வந்திருக்கு. நன்றி மீரா!', 'Super! Nallaa vandhirukku. Nandri Meera!', 'Super! It came out well. Thanks, Meera!'],
      ['கவுண்ட் பண்ணுங்க அக்கா!', 'Count pannunga akka!', 'Count it, akka!']),
  ],
  outro: ['எங்க பேமிலிக்கு ஒரு ஞாபகம் ஆச்சு. நன்றி!', 'Enga family-kku oru gnaabagam aachu. Nandri!', 'A memory for our family. Thank you!'],
  learned: [['ellaarum nillunga', 'everyone stand'], ['onnu, rendu, moonu', 'one, two, three']],
  again: ['மீரா, இன்னொரு போட்டோ எடுக்கலாமா?', 'Meera, innoru photo edukkalaamaa?', 'Meera, can we take one more photo?'],
});

export const familyDad = D('juhu-family-dad', {
  name: 'Ramesh', role: 'father on the beach', site: "Elliot's Beach, near the shore", diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Man in a sky-blue checked shirt with a camera in hand, chatting and deciding what to eat.',
  goal: 'Recommend molaga bajji.',
  steps: [
    S('eat', ['மனைவிக்கு பஜ்ஜி, பிள்ளைக்கு சோளம்... என்ன சாப்பிடலாம்?', 'Manaivikku bajji, pillaikku cholam... Enna saappidalaam?', 'Bajji for my wife, corn for my child... what shall we eat?'],
      'Recommend molaga bajji.', ['Molaga bajji nalla irukkum saar.', 'மொளகா பஜ்ஜி நல்லா இருக்கும் சார்.'],
      ['molaga bajji nalla irukkum saar', 'molaga bajji saappidunga saar', 'bajji nalla irukkum saar', 'molaga bajji try pannunga', 'molaga bajji super saar', 'மொளகா பஜ்ஜி நல்லா இருக்கும் சார்', 'மொளகா பஜ்ஜி சாப்பிடுங்க சார்'],
      'recommend_molaga_bajji', ['Suggest a dish.', '"Molaga bajji" = chilli fritter.', 'Say: "Molaga bajji nalla irukkum saar."'],
      ['சரி மேடம், நீங்க சொல்றீங்கன்னா ஒரு பிளேட் வாங்கறேன்.', 'Sari madam, neenga solreenganaa oru plate vaangaren.', 'Okay, madam, if you say so I will buy a plate.'],
      ['என்ன சொன்னீங்க மேடம்? பசங்க சத்தம்.', 'Enna sonneenga madam? Pasanga saththam.', 'What did you say, madam? The kids are noisy.']),
  ],
  outro: ['அருமையான சாய்ஸ்! நன்றி மீரா.', 'Arumaiyaana choice! Nandri Meera.', 'Excellent choice! Thanks, Meera.'],
  learned: [['molaga bajji nalla irukkum', 'molaga bajji is good']],
  again: ['மேடம், இன்னும் ஏதாவது ஸ்பெஷல்?', 'Madam, innum edhaavadhu special?', 'Madam, anything else special?'],
});

export const familyKid = D('juhu-family-kid', {
  name: 'Aadhi', role: 'beach family child', site: "Elliot's Beach, near the shore", diff: 1,
  voice: { rate: 1.15, pitch: 1.4 },
  persona: 'Child in a teal shirt playing with a ball on the sand.',
  goal: 'Promise to get his ball from the water.',
  steps: [
    S('ball', ['அக்கா, பந்து கடல்ல போயிடுச்சு!', 'Akka, pandhu kadalla poyiduchu!', 'Akka, the ball has gone into the sea!'],
      'Tell him not to worry, you will get it.', ['Kavalaippadaadha, naan eduthu tharen.', 'கவலைப்படாத, நான் எடுத்து தரேன்.'],
      ['kavalaippadaadha naan eduthu tharen', 'naan eduthu tharen', 'kavalai vendaam eduthu tharen', 'bayappadaadhe naan eduthu tharen', 'eduthu tharen thambi', 'கவலைப்படாத நான் எடுத்து தரேன்', 'நான் எடுத்து தரேன்'],
      'promise_to_fetch_ball', ['Reassure him.', '"Eduthu tharen" = I will get it for you.', 'Say: "Kavalaippadaadha, naan eduthu tharen."'],
      ['சூப்பர் அக்கா! நீங்க என் ஃப்ரெண்ட்!', 'Super akka! Neenga en friend!', 'Super, akka! You are my friend!'],
      ['அக்கா, பந்து போச்சு! என்ன பண்றது?', 'Akka, pandhu pochu! Enna pannradhu?', 'Akka, the ball is gone! What to do?']),
  ],
  outro: ['நன்றி அக்கா! இந்த பந்து எனக்கு ரொம்ப புடிக்கும்.', 'Nandri akka! Indha pandhu enakku romba pudikkum.', 'Thanks, akka! I love this ball so much.'],
  learned: [['naan eduthu tharen', 'I will get it for you']],
  again: ['அக்கா, இன்னொரு தடவை விளையாடலாமா?', 'Akka, innoru thadavai vilaiyaadalaamaa?', 'Akka, shall we play once more?'],
});

export const lifeguard = D('juhu-lifeguard', {
  name: 'Selvaraj', role: 'lifeguard', site: "Elliot's Beach, shoreline", diff: 2,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Lifeguard in an orange shirt and a white cap with a whistle, standing watch over the swimmers.',
  goal: 'Promise to only wet your feet.',
  steps: [
    S('deep', ['மேடம், ஆழமா போகாதீங்க. அலை ஜாஸ்தி.', 'Madam, aazhamaa pogaadheenga. Alai jaasthi.', 'Madam, do not go deep. The waves are strong.'],
      'Say you will only wet your feet.', ['Seri anna, kaalai mattum nanaikkiren.', 'சரி அண்ணா, காலை மட்டும் நனைக்கிறேன்.'],
      ['seri anna kaalai mattum nanaikkiren', 'kaalai mattum nanaikkiren', 'kaal mattum nanaiyuren anna', 'aazhamaa pogamaatten anna', 'kaal mattum nanaikkaren', 'சரி அண்ணா காலை மட்டும் நனைக்கிறேன்', 'காலை மட்டும் நனைக்கிறேன்'],
      'promise_wet_feet_only', ['Promise to be careful.', '"Kaalai mattum" = only the feet.', 'Say: "Seri anna, kaalai mattum nanaikkiren."'],
      ['நல்லது மேடம். பாதுகாப்பா இருங்க.', 'Nalladhu madam. Paadhukaappaa irunga.', 'Good, madam. Stay safe.'],
      ['என்ன சொன்னீங்க? அலை சத்தம்!', 'Enna sonneenga? Alai saththam!', 'What did you say? The waves are loud!']),
  ],
  outro: ['கடல் அழகு தான், ஆனா எச்சரிக்கை மீரா!', 'Kadal azhagu thaan, aanaa echcharikkai Meera!', 'The sea is beautiful, but be careful, Meera!'],
  learned: [['kaalai mattum nanaikkiren', 'I will only wet my feet']],
  again: ['மேடம், கரைக்கு பக்கம் இருங்க.', 'Madam, karaikku pakkam irunga.', 'Madam, stay near the shore.'],
});
