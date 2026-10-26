// Chennai Central forecourt, Ripon Building and the Triumph of Labour statue, Madras High Court book stall, Valluvar Kottam ledge.
import { dialogue as D, step as S } from '../kit.js';

export const sorter1 = D('cst-tiffin-sorter', {
  name: 'Faizal', role: 'food-delivery rider sorting parcels', site: 'Chennai Central forecourt, delivery scooters', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Rider in an orange cap matching parcels to orders among the scooters, stuck on a smudged address.',
  goal: 'Offer to read the address on a parcel.',
  steps: [
    S('parcel', ['இந்த பார்சல் யாருதுன்னு தெரியல, உதவி பண்றீங்களா?', 'Indha parcel yaaruthunnu theriyala, udhavi pannureengalaa?', 'I cannot tell whose parcel this is, will you help?'],
      'Offer to read the address.', ['Seri, address paathu solren.', 'சரி, அட்ரஸ் பாத்து சொல்றேன்.'],
      ['seri address paathu solren', 'address paathu solren', 'naan address padikkaren', 'seri anna address paakkaren', 'address kaattunga naan paakkaren', 'சரி அட்ரஸ் பாத்து சொல்றேன்', 'அட்ரஸ் பாத்து சொல்றேன்'],
      'offer_to_read_address', ['Offer to help read it.', '"Paathu solren" = I will look and tell.', 'Say: "Seri, address paathu solren."'],
      ['ஆமா, இது தான் சரியான அட்ரஸ். நன்றி!', 'Aamaa, idhu thaan sariyaana address. Nandri!', 'Yes, this is the right address. Thanks!'],
      ['உதவி பண்றீங்களா இல்லையா?', 'Udhavi pannureengalaa illaiyaa?', 'Will you help or not?']),
  ],
  outro: ['இப்போ டெலிவரிக்கு கிளம்பறேன். பை!', 'Ippo delivery-kku kilambaren. Bye!', 'Off for the delivery now. Bye!'],
  learned: [['address paathu solren', 'I will check the address']],
  again: ['மேடம், இன்னொரு பார்சல் சிக்கிடுச்சு!', 'Madam, innoru parcel sikkiduchu!', 'Madam, another parcel is stuck!'],
});

export const sorter2 = D('cst-tiffin-sorter-2', {
  name: 'Lokesh', role: 'delivery rider sorting parcels', site: 'Chennai Central forecourt, delivery scooters', diff: 1,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Rider grumbling about customers who write unclear addresses.',
  goal: 'Sympathise that addresses are hard.',
  steps: [
    S('grumble', ['இந்த கஸ்டமர்ஸ் அட்ரஸ் சரியா எழுத மாட்டாங்க!', 'Indha customers address sariyaa ezhudha maattaanga!', 'These customers never write the address properly!'],
      'Sympathise that it is hard.', ['Aamaa anna, romba kashtam thaan.', 'ஆமா அண்ணா, ரொம்ப கஷ்டம் தான்.'],
      ['aamaa anna romba kashtam thaan', 'romba kashtam thaan anna', 'aamaa kashtam anna', 'kashtam thaan anna', 'romba kashtamaa irukkum anna', 'ஆமா அண்ணா ரொம்ப கஷ்டம் தான்', 'ரொம்ப கஷ்டம் தான்'],
      'sympathise_addresses_hard', ['Sympathise with him.', '"Kashtam" = hard, difficult.', 'Say: "Aamaa anna, romba kashtam thaan."'],
      ['அதே தான் மேடம்! உங்களுக்கும் புரியுது.', 'Adhe thaan madam! Ungalukkum puriyudhu.', 'Exactly, madam! You understand too.'],
      ['ஆமாவா இல்லையா மேடம்?', 'Aamaavaa illaiyaa madam?', 'Yes or no, madam?']),
  ],
  outro: ['சென்னைல டெலிவரின்னா இப்படித்தான்!', 'Chennai-la delivery-nnaa ippadithaan!', 'That is what delivery in Chennai is like!'],
  learned: [['romba kashtam thaan', 'it really is hard']],
  again: ['மேடம், இந்த அட்ரஸ பாருங்களேன்.', 'Madam, indha address-a paarungalen.', 'Madam, please look at this address.'],
});

export const officeGoer1 = D('cst-officegoer', {
  name: 'Arvind', role: 'office-goer hurrying to work', site: 'Chennai Central forecourt', diff: 2,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Man with a lunch bag and an ID on a lanyard, hurrying to catch the bus to the IT park.',
  goal: 'Point him to the bus stop.',
  steps: [
    S('bus', ['மேடம், ஐடி பார்க் பஸ் எங்க நிக்கும்?', 'Madam, IT park bus enga nikkum?', 'Madam, where does the IT park bus stop?'],
      'Point to the bus stop over there.', ['Andha pakkam bus stop irukku.', 'அந்த பக்கம் பஸ் ஸ்டாப் இருக்கு.'],
      ['andha pakkam bus stop irukku', 'bus stop andha pakkam irukku', 'andha pakkam ponga bus stop irukku', 'andha pakkam bus nikkum', 'bus stop angey irukku', 'அந்த பக்கம் பஸ் ஸ்டாப் இருக்கு', 'பஸ் ஸ்டாப் அந்த பக்கம் இருக்கு'],
      'point_to_bus_stop', ['Point him that way.', '"Andha pakkam" = that side.', 'Say: "Andha pakkam bus stop irukku."'],
      ['ஓஹோ, நன்றி! இன்னைக்கு ரொம்ப லேட்.', 'Oho, nandri! Innaikku romba late.', 'Oh, thanks! I am very late today.'],
      ['எங்கன்னு சொல்லுங்க மேடம், நேரம் ஆச்சு.', 'Engannu sollunga madam, neram aachu.', 'Tell me where, madam, it is getting late.']),
  ],
  outro: ['உதவிக்கு நன்றி! நானும் ஐடி பார்க்ல தான் வேலை.', 'Udhavikku nandri! Naanum IT park-la thaan velai.', 'Thanks for the help! I work at the IT park too.'],
  learned: [['andha pakkam', 'that way']],
  again: ['மேடம், பஸ் போயிடுச்சா?', 'Madam, bus poyiduchaa?', 'Madam, has the bus gone?'],
});

export const porter2 = D('cst-coolie-2', {
  name: 'Murali', role: 'porter', site: 'Chennai Central forecourt, east end', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Porter in a coral-red shirt with a brass armband, standing and waiting for a passenger with luggage.',
  goal: 'Politely say you need no porter now, and say you will call if needed.',
  steps: [
    S('offer', ['மேடம், லக்கேஜ் இருக்கா? கொடுங்க, தூக்கறேன்.', 'Madam, luggage irukkaa? Kodunga, thookkaren.', 'Madam, any luggage? Give it, I will carry it.'],
      'Say you do not need a porter right now.', ['Illa anna, ippo venaam.', 'இல்ல அண்ணா, இப்போ வேணாம்.'],
      ['illa anna ippo venaam', 'ippo venaam anna', 'illa anna venaam', 'ippo thevai illa anna', 'luggage illa anna', 'இல்ல அண்ணா இப்போ வேணாம்', 'இப்போ வேணாம் அண்ணா'],
      'decline_porter', ['Say no politely.', '"Ippo venaam" = not now.', 'Say: "Illa anna, ippo venaam."'],
      ['சரிம்மா, பரவாயில்ல. நான் இங்கதான் இருப்பேன்.', 'Sarimmaa, paravaayilla. Naan ingadhaan iruppen.', 'Okay, no problem. I will be right here.'],
      ['வேணுமா வேணாமா மேடம்?', 'Venumaa venaamaa madam?', 'Do you need me or not, madam?']),
    S('call', ['பெட்டி தூக்கணும்னா கூப்பிடுங்க. என் நம்பர் இதுதான்.', 'Petti thookkanumnaa kooppidunga. En number idhuthaan.', 'If you need a bag carried, call me. This is my number.'],
      'Say you will call if needed.', ['Seri anna, thevai-na kooppiduren.', 'சரி அண்ணா, தேவைன்னா கூப்பிடுறேன்.'],
      ['seri anna thevai-na kooppiduren', 'thevai-na kooppiduren anna', 'kooppiduren anna', 'seri thevai-na solren', 'nandri anna kooppiduren', 'சரி அண்ணா தேவைன்னா கூப்பிடுறேன்', 'தேவைன்னா கூப்பிடுறேன்'],
      'say_will_call_if_needed', ['Say you will call him.', '"Kooppiduren" = I will call.', 'Say: "Seri anna, thevai-na kooppiduren."'],
      ['நல்லது மேடம். சென்ட்ரல்ல என்னை எல்லாரும் தெரியும்.', 'Nalladhu madam. Central-la ennai ellaarum theriyum.', 'Good, madam. Everyone at Central knows me.'],
      ['கூப்பிடுவீங்களா மேடம்?', 'Kooppiduveengalaa madam?', 'Will you call, madam?']),
  ],
  outro: ['நல்ல பயணம் அமையட்டும் மீரா!', 'Nalla payanam amaiyattum Meera!', 'Have a good journey, Meera!'],
  learned: [['ippo venaam', 'not now, thanks'], ['kooppiduren', 'I will call']],
  again: ['மேடம், லக்கேஜ் வந்துடுச்சா?', 'Madam, luggage vandhuduchaa?', 'Madam, has your luggage come?'],
});

export const officeGoer2 = D('cst-officegoer-2', {
  name: 'Karthik', role: 'office-goer', site: 'Chennai Central forecourt, front lane', diff: 1,
  voice: { rate: 1.2, pitch: 0.95 },
  persona: 'Man in a pastel shirt with an ID lanyard, hurrying across the forecourt and looking at his watch.',
  goal: 'Tell him the bus is still there.',
  steps: [
    S('late', ['மேடம் மணி என்ன? பஸ் மிஸ் ஆகும் போல!', 'Madam mani enna? Bus miss aagum pola!', 'Madam, what time is it? I may miss my bus!'],
      'Tell him to run, the bus is still there.', ['Odunga, bus innum irukku!', 'ஓடுங்க, பஸ் இன்னும் இருக்கு!'],
      ['odunga bus innum irukku', 'bus innum irukku odunga', 'odunga saar innum irukku', 'seekkiram odunga bus irukku', 'bus innum pogala odunga', 'ஓடுங்க பஸ் இன்னும் இருக்கு', 'பஸ் இன்னும் இருக்கு'],
      'tell_him_bus_still_there', ['Tell him to hurry.', '"Odunga" = run.', 'Say: "Odunga, bus innum irukku!"'],
      ['நன்றி மேடம்! ஓடறேன்!', 'Nandri madam! Odaren!', 'Thanks, madam! I am running!'],
      ['மணி என்ன மேடம்? சொல்லுங்க!', 'Mani enna madam? Sollunga!', 'What is the time, madam? Tell me!']),
  ],
  outro: ['பிடிச்சுட்டேன்! நல்ல நாள் மீரா!', 'Pidichchuttaen! Nalla naal Meera!', 'Caught it! Have a nice day, Meera!'],
  learned: [['odunga', 'run']],
  again: ['மேடம், பஸ் கிடைச்சுதா?', 'Madam, bus kidaichchudhaa?', 'Madam, did I get the bus?'],
});

export const touristStatue = D('bse-bull-tourist', {
  name: 'Jake', role: 'foreign tourist taking a selfie', site: 'Ripon Building, Triumph of Labour statue', diff: 3, lang: 'en',
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Thin tourist in a sky-blue floral shirt taking a selfie with the four bronze workers pushing the rock. Speaks only English.',
  goal: 'Explain the statue and say he can take the selfie.',
  steps: [
    S('meaning', 'Hey! What does this statue mean? Four people pushing a huge rock?',
      'Tell him it shows hard work, workers pushing together.', ['It is called Triumph of Labour. It shows workers pushing together.', 'It is called Triumph of Labour. It shows workers pushing together.'],
      ['it is called triumph of labour it shows workers pushing together', 'it shows hard work four workers pushing a rock', 'it is the triumph of labour statue about working together', 'it shows workers working hard together', 'the statue is about hard work and teamwork', 'it is a tribute to workers pushing a rock together'],
      'explain_triumph_of_labour', ['Say what it shows.', 'Say: workers, hard work, together.', 'Say: "It is called Triumph of Labour. It shows workers pushing together."'],
      'Cool! Hard work and teamwork. I love that.', 'Sorry, what does it show?'),
    S('selfie', 'Is it okay if I take a selfie with them?',
      'Tell him yes, it is a popular spot.', ['Yes, go ahead. It is a very popular spot.', 'Yes, go ahead. It is a very popular spot.'],
      ['yes go ahead it is a very popular spot', 'sure take a selfie it is popular here', 'yes please do many people take photos here', 'of course go ahead take the selfie', 'yes it is fine everyone takes selfies here', 'yes you can it is a popular photo spot'],
      'allow_selfie', ['Say yes.', 'Say: yes, go ahead.', 'Say: "Yes, go ahead. It is a very popular spot."'],
      'Great, smile! Thanks for your help!', 'Sorry, can I take the selfie?'),
  ],
  outro: 'Thanks so much, you are a great guide!',
  learned: [['Triumph of Labour', 'the statue name'], ['go ahead', 'permission']],
  again: 'Hi again! One more photo?',
});

export const riponGuard = D('bse-guard', {
  name: 'Ismail', role: 'Ripon Building security guard', site: 'Ripon Building gate', diff: 2,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Thin guard in a charcoal uniform with a handlebar moustache and a visitor register, checking every visitor politely.',
  goal: 'Ask where to get a visitor pass.',
  steps: [
    S('pass', ['மேடம், உள்ளே போக விசிட்டர் பாஸ் வேணும்.', 'Madam, ulle poga visitor pass venum.', 'Madam, you need a visitor pass to go inside.'],
      'Ask where to get the pass.', ['Pass enga kidaikkum saar?', 'பாஸ் எங்க கிடைக்கும் சார்?'],
      ['pass enga kidaikkum saar', 'pass enga kidaikkum', 'visitor pass enga saar', 'pass enga vaanganum saar', 'pass enga edukkanum', 'பாஸ் எங்க கிடைக்கும் சார்', 'பாஸ் எங்க கிடைக்கும்'],
      'ask_where_visitor_pass', ['Ask where the pass is.', '"Enga kidaikkum?" = where is it available?', 'Say: "Pass enga kidaikkum saar?"'],
      ['அந்த ஆபீஸ்ல வாங்குங்க. ஐடி கார்டு எடுத்துட்டு போங்க.', 'Andha office-la vaangunga. ID card eduttuttu ponga.', 'Get it at that office. Take your ID card.'],
      ['பாஸ் பத்தி கேக்கறீங்களா மேடம்?', 'Pass patthi kekkareengalaa madam?', 'Are you asking about the pass, madam?']),
  ],
  outro: ['கவனமா போங்க மேடம், வெள்ளை கட்டிடம் அழகா இருக்கும்.', 'Gavanamaa ponga madam, vellai kattidam azhagaa irukkum.', 'Go carefully, madam, the white building is beautiful.'],
  learned: [['pass enga kidaikkum?', 'where do I get a pass?']],
  again: ['மேடம், ஐடி கார்டு இருக்கா?', 'Madam, ID card irukkaa?', 'Madam, do you have an ID card?'],
});

export const broker = D('bse-broker', {
  name: 'Sridhar', role: 'Ripon Building clerk on the phone', site: 'Ripon Building, near the notice board', diff: 2,
  voice: { rate: 1.2, pitch: 0.95 },
  persona: 'Clerk with specs and a purple lanyard on the phone, arguing about a file number.',
  goal: 'Tell him to finish his call, you can wait.',
  steps: [
    S('file', ['ஃபைல் நம்பர் தப்பா இருக்கு! மேடம், ஒரு நிமிஷம்.', 'File number thappaa irukku! Madam, oru nimisham.', 'The file number is wrong! Madam, one minute.'],
      'Tell him it is fine, finish and come.', ['Paravaalla saar, neenga mudichittu vaanga.', 'பரவாயில்ல சார், நீங்க முடிச்சிட்டு வாங்க.'],
      ['paravaalla saar neenga mudichittu vaanga', 'paravaalla saar mudichittu vaanga', 'neenga mudichittu vaanga saar', 'naan kaathirukkaren saar', 'paravaayilla saar neenga pesunga', 'பரவாயில்ல சார் நீங்க முடிச்சிட்டு வாங்க', 'நீங்க முடிச்சிட்டு வாங்க சார்'],
      'tell_him_finish_the_call', ['Say you can wait.', '"Mudichittu vaanga" = finish and come.', 'Say: "Paravaalla saar, neenga mudichittu vaanga."'],
      ['நன்றி மேடம்! இந்த ஃபைல் ஒரே தலைவலி!', 'Nandri madam! Indha file ore thalaivali!', 'Thanks, madam! This file is a real headache!'],
      ['என்ன சொன்னீங்க மேடம்? போன்ல சத்தம்.', 'Enna sonneenga madam? Phone-la saththam.', 'What did you say, madam? The phone is noisy.']),
  ],
  outro: ['சாரி மேடம், வேலை அதிகம்!', 'Sorry madam, velai adhigam!', 'Sorry, madam, too much work!'],
  learned: [['paravaalla saar', 'no problem, sir']],
  again: ['மேடம், ஒரு நிமிஷம் இருங்க.', 'Madam, oru nimisham irunga.', 'Madam, please wait a minute.'],
});

export const bookSeller = D('rajabai-book-seller', {
  name: 'Ananthan', role: 'second-hand book seller', site: 'Madras High Court, book stall', diff: 3,
  voice: { rate: 0.95, pitch: 0.9 },
  persona: 'Man in a mustard long kurta with specs, dusting a cover and recommending old Tamil novels.',
  goal: 'Ask for a good Tamil novel and say you will take his suggestion.',
  steps: [
    S('novel', ['பழைய தமிழ் நாவல்கள் இருக்கு மேடம். பாருங்க.', 'Pazhaiya Tamizh novels irukku madam. Paarunga.', 'I have old Tamil novels, madam. Have a look.'],
      'Ask if he has a good Tamil novel.', ['Nalla Tamil novel edhaavadhu irukkaa?', 'நல்ல தமிழ் நாவல் ஏதாவது இருக்கா?'],
      ['nalla tamil novel edhaavadhu irukkaa', 'nalla tamil novel irukkaa saar', 'oru nalla novel irukkaa', 'tamil novel edhaavadhu irukkaa', 'saar nalla novel sollunga', 'நல்ல தமிழ் நாவல் ஏதாவது இருக்கா', 'ஒரு நல்ல நாவல் இருக்கா'],
      'ask_for_good_tamil_novel', ['Ask for a recommendation.', '"Edhaavadhu irukkaa?" = is there any?', 'Say: "Nalla Tamil novel edhaavadhu irukkaa?"'],
      ['இந்த சமையல் கதை புத்தகம் எடுங்க. உங்களுக்கு பிடிக்கும்.', 'Indha samaiyal kadhai puttagam edunga. Ungalukku pidikkum.', 'Take this cooking-story book. You will like it.'],
      ['எந்த மாதிரி புத்தகம் வேணும் மேடம்?', 'Endha maadhiri puttagam venum madam?', 'What kind of book do you want, madam?']),
    S('take', ['சமையல் குறிப்போட கதையும் இருக்கு. ஐம்பது ரூபா தான்.', 'Samaiyal kurippoda kadhaiyum irukku. Aimbadhu rubaa thaan.', 'It has recipes along with the story. Only fifty rupees.'],
      'Say okay, you will take it.', ['Seri, idhai edukkaren anna.', 'சரி, இதை எடுக்கறேன் அண்ணா.'],
      ['seri idhai edukkaren anna', 'idhai edukkaren', 'seri naan edukkaren', 'idhu pothum edukkaren anna', 'seri anna idhai kudunga', 'சரி இதை எடுக்கறேன் அண்ணா', 'இதை எடுக்கறேன்'],
      'take_the_recommended_book', ['Say you will take it.', '"Edukkaren" = I will take.', 'Say: "Seri, idhai edukkaren anna."'],
      ['நல்ல முடிவு! படிச்சுட்டு உங்க ப்ளாக்ல எழுதுங்க.', 'Nalla mudivu! Padichchuttu unga blog-la ezhudhunga.', 'Good decision! Read it and write on your blog.'],
      ['எடுக்கறீங்களா இல்லையா மேடம்?', 'Edukkareengalaa illaiyaa madam?', 'Will you take it or not, madam?']),
  ],
  outro: ['புத்தகம் படிங்க மீரா, தமிழ் இன்னும் நல்லா வரும்!', 'Puttagam padinga Meera, Tamizh innum nallaa varum!', 'Read the book, Meera, your Tamil will improve!'],
  learned: [['nalla Tamil novel irukkaa?', 'is there a good Tamil novel?'], ['idhai edukkaren', 'I will take this']],
  again: ['மேடம், இன்னொரு புத்தகம் பாக்கறீங்களா?', 'Madam, innoru puttagam paakkareengalaa?', 'Madam, want to see another book?'],
});

export const lawStudent = D('rajabai-student-a', {
  name: 'Harish', role: 'law college student', site: 'Madras High Court / Valluvar Kottam', diff: 2,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Young man in a butter-yellow cap with books under his arm, heading to class and worried about an exam.',
  goal: 'Wish him luck for the exam.',
  steps: [
    S('exam', ['நாளைக்கு எக்ஸாம், பயமா இருக்கு மேடம்!', 'Naalaikku exam, bayamaa irukku madam!', 'I have an exam tomorrow, I am scared, madam!'],
      'Wish him luck and tell him to study well.', ['All the best thambi, nalla padi.', 'ஆல் தி பெஸ்ட் தம்பி, நல்லா படி.'],
      ['all the best thambi nalla padi', 'all the best thambi', 'nalla padi thambi', 'jeyichiduveenga thambi all the best', 'bayappadaadha thambi nalla padi', 'ஆல் தி பெஸ்ட் தம்பி நல்லா படி', 'நல்லா படி தம்பி'],
      'wish_luck_exam', ['Wish him well.', '"All the best" works. "Padi" = study.', 'Say: "All the best thambi, nalla padi."'],
      ['நன்றி மேடம்! இனி நைட் முழுக்க படிக்கணும்.', 'Nandri madam! Ini night muzhukka padikkanum.', 'Thanks, madam! I must study all night now.'],
      ['என்ன சொன்னீங்க மேடம்? பதட்டத்துல கேக்கல.', 'Enna sonneenga madam? Padhattatthula kekkala.', 'What did you say, madam? I did not hear in my nervousness.']),
  ],
  outro: ['பாஸ் ஆயிட்டா ட்ரீட் தரேன் மீரா மேடம்!', 'Pass aayittaa treat tharen Meera madam!', 'If I pass, I will give you a treat, Meera madam!'],
  learned: [['all the best, nalla padi', 'all the best, study well']],
  again: ['மேடம், இன்னும் பயமா இருக்கு!', 'Madam, innum bayamaa irukku!', 'Madam, I am still scared!'],
});

export const bookBrowser = D('rajabai-book-browser', {
  name: 'Preethi', role: 'law student browsing books', site: 'Madras High Court, book stall', diff: 2,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Student with specs and a lanyard, browsing books and chatting about exams.',
  goal: 'Agree the law book is heavy, then say you are looking for a cookbook.',
  steps: [
    S('heavy', ['இந்த சட்ட புத்தகம் ரொம்ப கனம்!', 'Indha sattam puttagam romba kanam!', 'This law book is so heavy!'],
      'Agree that it is heavy.', ['Aamaa, romba kanamaa irukku.', 'ஆமா, ரொம்ப கனமா இருக்கு.'],
      ['aamaa romba kanamaa irukku', 'romba kanamaa irukku', 'aamaa kanam thaan', 'romba kanam', 'aamaa puttagam kanamaa irukku', 'ஆமா ரொம்ப கனமா இருக்கு', 'ரொம்ப கனமா இருக்கு'],
      'agree_book_is_heavy', ['Agree with her.', '"Kanam" = heavy.', 'Say: "Aamaa, romba kanamaa irukku."'],
      ['இதை படிச்சா தான் வக்கீல் ஆக முடியும்!', 'Idhai padichchaa thaan vakkeel aaga mudiyum!', 'Only by reading this can one become a lawyer!'],
      ['கனமா இருக்கா இல்லையா?', 'Kanamaa irukkaa illaiyaa?', 'Is it heavy or not?']),
    S('search', ['நீங்க என்ன புத்தகம் தேடறீங்க?', 'Neenga enna puttagam thedareenga?', 'What book are you looking for?'],
      'Say you are looking for a cookbook.', ['Naan samaiyal puttagam thedaren.', 'நான் சமையல் புத்தகம் தேடறேன்.'],
      ['naan samaiyal puttagam thedaren', 'samaiyal puttagam thedaren', 'samaiyal puttagam venum', 'naan cookbook thedaren', 'oru samaiyal puttagam thedaren', 'நான் சமையல் புத்தகம் தேடறேன்', 'சமையல் புத்தகம் தேடறேன்'],
      'say_looking_for_cookbook', ['Say what you want.', '"Samaiyal" = cooking.', 'Say: "Naan samaiyal puttagam thedaren."'],
      ['அந்த கடைசி ஷெல்ஃப்ல பாருங்க. பழைய சமையல் புத்தகம் இருக்கு.', 'Andha kadaisi shelf-la paarunga. Pazhaiya samaiyal puttagam irukku.', 'Look on that last shelf. There are old cookbooks.'],
      ['என்ன புத்தகம்னு சொல்லுங்க மேடம்.', 'Enna puttagamnu sollunga madam.', 'Tell me which book, madam.']),
  ],
  outro: ['கிடைச்சா எனக்கும் ரெசிபி சொல்லுங்க!', 'Kidaichchaa enakkum recipe sollunga!', 'If you find it, tell me a recipe too!'],
  learned: [['romba kanamaa irukku', 'it is very heavy'], ['samaiyal puttagam', 'cookbook']],
  again: ['மேடம், இன்னொரு புத்தகம் பாருங்க.', 'Madam, innoru puttagam paarunga.', 'Madam, look at another book.'],
});

export const ledgeReader = D('flora-ledge-reader', {
  name: 'Nandhini', role: 'college girl on the ledge', site: 'Valluvar Kottam ledge', diff: 1,
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'College girl with specs seated on the ledge reading a book.',
  goal: 'Say it is a nice spot and you will sit too.',
  steps: [
    S('spot', ['இங்க உக்காந்து படிக்க நல்லா இருக்கும். நீங்களும் வாங்க!', 'Inga ukkaandhu padikka nallaa irukkum. Neengalum vaanga!', 'It is nice to sit and read here. You come too!'],
      'Say it is a great spot and you will sit too.', ['Super idam akka, naanum ukkaaren.', 'சூப்பர் இடம் அக்கா, நானும் உக்காறேன்.'],
      ['super idam akka naanum ukkaaren', 'super idam naanum ukkaaren', 'nalla idam akka ukkaaren', 'naanum ukkaaren akka', 'romba nalla idam', 'சூப்பர் இடம் அக்கா நானும் உக்காறேன்', 'நல்ல இடம் அக்கா'],
      'say_nice_spot_will_sit', ['Say you will join her.', '"Idam" = place. "Ukkaaren" = I will sit.', 'Say: "Super idam akka, naanum ukkaaren."'],
      ['வாங்க! சாயந்திரம் காத்து சூப்பரா வரும்.', 'Vaanga! Saayandhiram kaathu superaa varum.', 'Come! The evening breeze is lovely.'],
      ['உக்காறீங்களா இல்லையா அக்கா?', 'Ukkaareengalaa illaiyaa akka?', 'Will you sit or not, akka?']),
  ],
  outro: ['இந்த இடம் எனக்கு ரொம்ப பிடிக்கும் அக்கா.', 'Indha idam enakku romba pidikkum akka.', 'I like this place a lot, akka.'],
  learned: [['naanum ukkaaren', 'I will sit too']],
  again: ['அக்கா, இந்த புத்தகம் படிச்சிருக்கீங்களா?', 'Akka, indha puttagam padichchirukkeengalaa?', 'Akka, have you read this book?'],
});

export const ledgeTeen = D('flora-ledge-sketcher', {
  name: 'Ashwin', role: 'teen on the ledge', site: 'Valluvar Kottam ledge', diff: 2,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Teen with a red cap and a sky-blue jhola, people-watching from the ledge, bored and chatty.',
  goal: 'Ask what he is watching, then say you love food.',
  steps: [
    S('watch', ['போரடிக்குது அக்கா. எல்லாரையும் பாத்துட்டு இருக்கேன்.', 'Poradikkudhu akka. Ellaaraiyum paatthuttu irukken.', 'I am bored, akka. Just watching everybody.'],
      'Ask what he is watching.', ['Ennanna paakkureenga thambi?', 'என்னன்ன பாக்கறீங்க தம்பி?'],
      ['ennanna paakkureenga thambi', 'enna paakkureenga', 'ennai paakkureenga thambi', 'enna paakkura thambi', 'ennanna paakkura', 'என்னன்ன பாக்கறீங்க தம்பி', 'என்ன பாக்கறீங்க'],
      'ask_what_he_is_watching', ['Ask what he sees.', '"Enna paakkureenga?" = what are you watching?', 'Say: "Ennanna paakkureenga thambi?"'],
      ['கடல் காத்து, பறவைகள், சின்ன குழந்தைங்க. அதான் ரசிக்கிறேன்.', 'Kadal kaathu, paravaigal, chinna kuzhandhaingal. Adhaan rasikkiren.', 'Sea breeze, birds, small children. I enjoy that.'],
      ['பதில் சொல்றதுக்கு முன்னாடி கேளுங்க அக்கா.', 'Badhil soladhukku munnaadi kelunga akka.', 'Ask me clearly, akka.']),
    S('food', ['உங்களுக்கு என்ன பிடிக்கும் அக்கா?', 'Ungalukku enna pidikkum akka?', 'What do you like, akka?'],
      'Say you love food very much.', ['Enakku saappaadu romba pidikkum.', 'எனக்கு சாப்பாடு ரொம்ப பிடிக்கும்.'],
      ['enakku saappaadu romba pidikkum', 'saappaadu romba pidikkum', 'enakku saappaadu thaan pidikkum', 'enakku food romba pidikkum', 'naan food lover', 'எனக்கு சாப்பாடு ரொம்ப பிடிக்கும்', 'சாப்பாடு ரொம்ப பிடிக்கும்'],
      'say_you_love_food', ['Tell him your favourite thing.', '"Pidikkum" = I like.', 'Say: "Enakku saappaadu romba pidikkum."'],
      ['ஹா ஹா, நானும் தான்! பிரியாணி வேற லெவல்!', 'Haa haa, naanum thaan! Biryani vera level!', 'Ha ha, me too! Biryani is next level!'],
      ['உங்களுக்கு என்ன பிடிக்கும்னு சொல்லுங்க.', 'Ungalukku enna pidikkumnu sollunga.', 'Tell me what you like.']),
  ],
  outro: ['அடுத்த தடவை நல்ல பிரியாணி கடை சொல்றேன் அக்கா!', 'Adutha thadavai nalla biryani kadai solren akka!', 'Next time I will tell you a good biryani shop, akka!'],
  learned: [['enakku saappaadu romba pidikkum', 'I like food a lot']],
  again: ['அக்கா, இன்னும் போரடிக்குது!', 'Akka, innum poradikkudhu!', 'Akka, I am still bored!'],
});
