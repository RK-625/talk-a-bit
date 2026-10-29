// Necklace Road promenade (Hussain Sagar) and the Buddha island causeway.
import { P, step as S } from '../kit.js';

export const walkStudent = P('marine-walk-student', 'Chaitanya', 'college student', 'Necklace Road promenade', 'q', 'Agree the lake is calm and say you like Telugu songs.', [
  S('lake', ['హాయ్! ఈ సరస్సు ఎంత ప్రశాంతంగా ఉంది కదా?', 'Hi! This lake is so peaceful, isn\'t it?'],
    'Agree that the lake is calm.', 'అవును, ఈ సరస్సు చాలా ప్రశాంతంగా ఉంది.',
    ['avunu ee sarassu chala prashantanga undi', 'avunu lake chala calm ga undi', 'ee lake chala bagundi', 'chala prashantanga undi', 'అవును, ఈ లేక్ చాలా ప్రశాంతంగా ఉంది'],
    ['Agree with him.', 'Calm = "prashantanga". Lake = "sarassu" or "lake".'],
    ['అవును! ఇక్కడికి వస్తే టెన్షన్ అంతా మర్చిపోతాం.', 'Yes! Coming here we forget all tension.'],
    ['సరస్సు ఎలా ఉందో చెప్పు.', 'Tell me how the lake is.']),
  S('songs', ['నేను తెలుగు పాటలు వింటున్నా. నువ్వేం వింటావు?', 'I am listening to Telugu songs. What do you listen to?'],
    'Say you like Telugu songs.', 'నాకు తెలుగు పాటలు ఇష్టం.',
    ['naaku telugu patalu ishtam', 'naaku telugu songs ishtam', 'telugu patalu ishtam', 'nenu telugu patalu vintanu', 'నాకు తెలుగు పాటలు ఇష్టం'],
    ['Say what you like.', 'I like = "naaku ishtam". Songs = "patalu".'],
    ['సూపర్! నీకు ఒక ప్లేలిస్ట్ పంపిస్తా.', 'Super! I will send you a playlist.'],
    ['ఏ పాటలు ఇష్టమో చెప్పు.', 'Tell me which songs you like.']),
], ['ప్లేలిస్ట్ వచ్చాక వినండి. బై సమీర్!', 'Listen once the playlist arrives. Bye Sameer!'],
  [['ee sarassu chala prashantanga undi', 'this lake is very peaceful'], ['naaku telugu patalu ishtam', 'I like Telugu songs']], ['సమీర్, పాటలు విన్నావా?', 'Sameer, did you listen to the songs?'], 2);

export const benchMan = P('marine-bench-man', 'Narayana Rao', 'man on a lake bench', 'Necklace Road promenade, bench', 'o', 'Say the Buddha statue looks great.', [
  S('buddha', ['ఆ బుద్ధుడి విగ్రహం చూడు, ఎంత పెద్దది!', 'Look at that Buddha statue, how big!'],
    'Say the statue is very grand.', 'అవును, విగ్రహం చాలా గొప్పగా ఉంది.',
    ['avunu vigraham chala goppaga undi', 'vigraham chala goppaga undi', 'avunu statue chala pedda ga undi', 'chala goppaga undi sir', 'అవును, విగ్రహం చాలా గొప్పగా ఉంది'],
    ['Agree about the statue.', 'Statue = "vigraham". Grand = "goppaga".'],
    ['అవునా! రోజూ వచ్చి ఇదే చూస్తూ కూర్చుంటా.', 'Right! I come daily and sit looking at it.'],
    ['విగ్రహం గురించి చెప్పు బాబూ.', 'Say something about the statue, dear.']),
  S('boat', ['నీకు బోటు ఎక్కాలని ఉందా బాబూ?', 'Do you want to take a boat ride, dear?'],
    'Say you will take a boat on Sunday.', 'ఆదివారం బోటు ఎక్కుతాను.',
    ['adivaram botu ekkutanu', 'adivaram boat ekkutanu', 'nenu adivaram boat ekkutanu', 'adivaram boat ride chestanu', 'ఆదివారం బోటు ఎక్కుతాను'],
    ['Say your plan.', 'Sunday = "adivaram". I will board = "ekkutanu".'],
    ['మంచిది, సాయంత్రం వెళ్ళు, చాలా అందంగా ఉంటుంది.', 'Good, go in the evening, it is lovely.'],
    ['ఎప్పుడు వెళ్తావో చెప్పు.', 'Tell me when you will go.'])
], ['మంచి రోజు గడపండి సమీర్.', 'Have a good day, Sameer.'],
  [['vigraham chala goppaga undi', 'the statue is very grand']], ['రండి సమీర్, బెంచీ మీద కూర్చోండి.', 'Come Sameer, sit on the bench.']);

export const lakeCouple = P('marine-couple', 'Divya and Kiran', 'seated couple (HITEC colleagues)', 'Necklace Road promenade, lake wall', 'f', 'Say you are a fresher and will go to Charminar at the weekend.', [
  S('work', ['మేము హైటెక్ సిటీలో పని చేస్తాం. మీరు?', 'We work in HITEC City. And you?'],
    'Say you are a fresher job-seeking.', 'నేను ఫ్రెషర్, ఉద్యోగం వెతుకుతున్నాను.',
    ['nenu fresher udyogam vetukutunnanu', 'nenu fresher job kosam chustunnanu', 'nenu fresher ni', 'fresher ni job vetukutunnanu', 'నేను ఫ్రెషర్ని, ఉద్యోగం వెతుకుతున్నాను'],
    ['Tell them about yourself.', 'Fresher = "fresher". Job = "udyogam".'],
    ['అయ్యో! కంగారు పడకు, మా ఆఫీసులో వాక్-ఇన్ ఉంది.', 'Oh! Do not worry, our office has a walk-in.'],
    ['మీ గురించి చెప్పండి సార్.', 'Tell us about yourself, sir.']),
  S('weekend', ['ఈ వీకెండ్ ఏం ప్లాన్ సమీర్?', 'What is your weekend plan, Sameer?'],
    'Say you will visit Charminar.', 'చార్మినార్ చూడటానికి వెళ్తాను.',
    ['charminar chudataniki veltanu', 'weekend charminar veltanu', 'charminar chudadaniki veltanu', 'charminar ki veltanu', 'చార్మినార్ చూడటానికి వెళ్తాను'],
    ['Say your plan.', 'To see = "chudataniki". I will go = "veltanu".'],
    ['సూపర్! అక్కడ ఇరానీ చాయ్ తాగడం మర్చిపోవద్దు.', 'Super! Do not forget to drink Irani chai there.'],
    ['ఏ ప్లాన్ ఉంది? చెప్పండి.', 'What plan do you have? Tell us.']),
], ['ఆల్ ది బెస్ట్ సమీర్, ఇంటర్వ్యూ తర్వాత కలుద్దాం!', 'All the best Sameer, let us meet after the interview!'],
  [['nenu fresher', 'I am a fresher'], ['charminar chudataniki veltanu', 'I will go to see Charminar']], ['సమీర్, ఇంటర్వ్యూ ఎలా ఉంది?', 'Sameer, how was the interview?'], 3);

export const chanaSeller = P('marine-chana-seller', 'Narsaiah', 'boiled-groundnut seller', 'Necklace Road promenade', 'o', 'Ask for a cone of groundnuts.', [
  S('cone', ['పల్లీలు, ఉడకబెట్టిన పల్లీలు! ఒక కోన్ ఇవ్వనా?', 'Groundnuts, boiled groundnuts! Shall I give a cone?'],
    'Ask for one cone of groundnuts.', 'ఒక కోన్ పల్లీలు ఇవ్వండి.',
    ['oka cone palleelu ivvandi', 'oka cone palli ivvandi tatha', 'palleelu ivvandi oka cone', 'ten rupees palleelu ivvandi', 'ఒక కోన్ పల్లీలు ఇవ్వండి'],
    ['Order a cone.', 'Groundnuts = "palleelu". Cone = "cone".'],
    ['ఇదిగో వేడి వేడి పల్లీలు, ఉప్పు వేశాను.', 'Here are hot groundnuts, I put salt.'],
    ['ఏం కావాలి బాబూ? గట్టిగా చెప్పు.', 'What do you want, dear? Say loudly.']),
  S('salt', ['ఉప్పు ఎక్కువ వేయనా బాబూ?', 'Shall I add more salt, dear?'],
    'Ask for less salt.', 'ఉప్పు తక్కువ వేయండి తాతగారూ.',
    ['uppu takkuva veyandi tatagaru', 'takkuva uppu veyandi', 'uppu takkuva tata', 'konchem uppu chalu', 'ఉప్పు తక్కువ వేయండి'],
    ['Ask for less.', 'Salt = "uppu". Less = "takkuva".'],
    ['సరే బాబూ, ఆరోగ్యానికి అదే మంచిది.', 'Okay dear, that is better for health.'],
    ['ఉప్పు ఎక్కువా, తక్కువా బాబూ?', 'More salt or less, dear?'])
], ['ఇంటర్వ్యూకి ముందు పల్లీలు తింటే మెదడు పని చేస్తుంది!', 'Eat groundnuts before the interview and your brain works!'],
  [['oka cone palleelu ivvandi', 'give me one cone of groundnuts']], ['బాబూ, ఇంకో కోన్ కావాలా?', 'Dear, want another cone?']);

export const jogger = P('marine-jogger', 'Prasad', 'lake jogger', 'Necklace Road promenade', 'q', 'Ask how many rounds he runs.', [
  S('rounds', ['హ్హ... హ్హ... ఉదయం పరుగు... ఐదు రౌండ్లు!', 'Huh... huh... morning run... five rounds!'],
    'Ask how many rounds he runs daily.', 'రోజూ ఎన్ని రౌండ్లు పరిగెడతారు?',
    ['rojoo enni rounds parigedataru', 'roju enni rounds', 'enni rounds parugettaru anna', 'daily enni rounds', 'రోజూ ఎన్ని రౌండ్లు పరిగెడతారు'],
    ['Ask how many.', 'Every day = "rojoo". How many = "enni".'],
    ['ఐదు రౌండ్లు, రోజూ! ఆరోగ్యమే మహాభాగ్యం!', 'Five rounds, daily! Health is wealth!'],
    ['ఏమన్నారు? ఊపిరి ఆడట్లేదు, మళ్ళీ చెప్పండి.', 'What did you say? I am out of breath, say again.']),
  S('tomorrow', ['నువ్వు కూడా కాసేపు నాతో పరిగెడతావా?', 'Will you run with me for a bit too?'],
    'Say not today, but tomorrow.', 'ఈ రోజు కాదు, రేపు వస్తాను.',
    ['ee roju kadu repu vastanu', 'repu vastanu ee roju kadu', 'ippudu kadu repu vastanu', 'repu udayam vastanu', 'ఈ రోజు కాదు, రేపు వస్తాను'],
    ['Decline and promise.', 'Tomorrow = "repu". I will come = "vastanu".'],
    ['సరే, రేపు ఉదయం ఆరింటికి, మర్చిపోకు!', 'Okay, six tomorrow morning, do not forget!'],
    ['వస్తావా లేదా చెప్పండి.', 'Tell me whether you will come.'])
], ['నువ్వు కూడా రేపటి నుంచి రా సమీర్!', 'You come too from tomorrow, Sameer!'],
  [['rojoo enni rounds parigedataru', 'how many rounds do you run daily']], ['హ్హ... మళ్ళీ కలిశాం సమీర్!', 'Huh... we meet again Sameer!']);

export const benchAunty = P('marine-bench-aunty', 'Rukmini Aunty', 'aunty on a lake bench', 'Necklace Road promenade, bench', 'f', 'Ask if you can sit and say the breeze is nice.', [
  S('sit', ['ఆగు బాబూ, ఇక్కడ కూర్చుని కాస్త విశ్రాంతి తీసుకో.', 'Wait dear, sit here and rest a bit.'],
    'Ask politely if you can sit.', 'ఆంటీ, ఇక్కడ కూర్చోవచ్చా?',
    ['aunty ikkada kurchovacha', 'aunty kurchovacha', 'ikkada kurchovachha', 'sit cheyochha aunty', 'ఆంటీ, ఇక్కడ కూర్చోవచ్చా'],
    ['Ask permission.', 'Sit = "kurchovacha". Here = "ikkada".'],
    ['కూర్చో కూర్చో. సరస్సు గాలి చాలా బాగుంటుంది.', 'Sit, sit. The lake breeze is lovely.'],
    ['కూర్చుంటావా బాబూ? చెప్పు.', 'Will you sit, dear? Say.']),
  S('breeze', ['ఇక్కడ గాలి ఎంత చల్లగా ఉంటుందో చూడు!', 'See how cool the breeze is here!'],
    'Agree the breeze is cool.', 'అవును, గాలి చాలా చల్లగా ఉంది.',
    ['avunu gali chala challaga undi', 'gali chala challaga undi aunty', 'avunu chala challaga undi', 'gali bagundi aunty', 'అవును, గాలి చాలా చల్లగా ఉంది'],
    ['Agree about the breeze.', 'Breeze = "gali". Cool = "challaga".'],
    ['అవునా! నేను రోజూ ఇక్కడికే వస్తా.', 'Yes! I come only here every day.'],
    ['గాలి ఎలా ఉందో చెప్పు బాబూ.', 'Tell me how the breeze is, dear.']),
], ['ఆరోగ్యం జాగ్రత్త బాబూ, ఇంటర్వ్యూ బాగా చెయ్యి.', 'Mind your health dear, do well in the interview.'],
  [['ikkada kurchovacha', 'can I sit here'], ['gali chala challaga undi', 'the breeze is very cool']], ['బాబూ, మళ్ళీ వచ్చావా?', 'Dear, you came again?'], 2);

export const benchReader = P('marine-bench-reader', 'Subba Rao', 'old man with a newspaper', 'Necklace Road promenade, same bench', 'o', 'Ask what he is reading.', [
  S('read', ['పేపర్ లో ఈ ఉద్యోగ ప్రకటన చూసావా?', 'Have you seen this job ad in the paper?'],
    'Ask what he is reading.', 'మీరు ఏం చదువుతున్నారు?',
    ['meeru em chaduvutunnaru', 'meeru em chaduvutunnaru tatagaru', 'em chaduvutunnaru', 'paper lo em undi', 'మీరు ఏం చదువుతున్నారు'],
    ['Ask what he reads.', 'You = "meeru". Reading = "chaduvutunnaru".'],
    ['ఒక ఐటీ కంపెనీ ఫ్రెషర్స్ ని తీసుకుంటోంది. చూడు!', 'An IT company is hiring freshers. Look!'],
    ['ఏమన్నావు బాబూ? చదవడంలో ఉన్నా.', 'What did you say dear? I am reading.']),
  S('when', ['ఇంటర్వ్యూ ఎప్పుడు ఉంది నీకు?', 'When is your interview?'],
    'Say it is tomorrow morning.', 'రేపు ఉదయం ఉంది.',
    ['repu udayam undi', 'interview repu udayam', 'repu udayam undi tatagaru', 'repu morning undi', 'రేపు ఉదయం ఉంది'],
    ['Give the time.', 'Tomorrow morning = "repu udayam".'],
    ['తప్పకుండా గెలుస్తావు, ధైర్యంగా వెళ్ళు.', 'You will surely win, go boldly.'],
    ['ఎప్పుడో చెప్పు బాబూ.', 'Tell me when, dear.'])
], ['ఆ ప్రకటన నోట్ చేసుకో బాబూ.', 'Note that ad down, dear.'],
  [['meeru em chaduvutunnaru', 'what are you reading']], ['బాబూ, ఆ ప్రకటన చూసావా?', 'Dear, did you see the ad?']);

export const lakeCouple2 = P('marine-couple-2', 'Anita and Prakash', 'seated couple', 'Necklace Road promenade, lake wall', 'f', 'Say you will take their photo.', [
  S('photo', ['మా ఇద్దరి ఫోటో తీస్తారా? సరస్సు వెనుక ఉండేలా.', 'Will you take a photo of us both? With the lake behind.'],
    'Offer to take their photo.', 'సరే, నేను మీ ఫోటో తీస్తాను.',
    ['sare nenu mee photo teestanu', 'nenu mee photo teestanu', 'sare photo teestanu', 'photo teestanu ivvandi phone', 'సరే, నేను మీ ఫోటో తీస్తాను'],
    ['Say you will do it.', 'I will take = "teestanu". Your photo = "mee photo".'],
    ['థాంక్స్! ఇదిగో ఫోన్, ఒకటి రెండు తీయండి.', 'Thanks! Here is the phone, take one or two.'],
    ['ఫోటో తీస్తారా లేదా? చెప్పండి.', 'Will you take it or not? Tell us.']),
  S('first', ['మీరు ఇక్కడికి ఎప్పుడూ వస్తారా?', 'Do you come here often?'],
    'Say this is your first time.', 'ఇదే నాకు మొదటిసారి.',
    ['ide naaku modatisari', 'idi modatisari', 'modati sari ikkadiki', 'nenu modatisari vachanu', 'ఇదే నాకు మొదటిసారి'],
    ['Say how often.', 'First time = "modatisari".'],
    ['అయితే సరస్సు బాగా చూడండి, చాలా అందమైనది.', 'Then see the lake well, it is very beautiful.'],
    ['మొదటిసారా, కాదా?', 'First time or not?'])
], ['చాలా బాగా వచ్చింది ఫోటో, థాంక్యూ సమీర్!', 'The photo came out great, thank you Sameer!'],
  [['nenu mee photo teestanu', 'I will take your photo']], ['సమీర్, ఇంకో ఫోటో?', 'Sameer, one more photo?']);

export const jogger2 = P('marine-jogger-2', 'Sunitha', 'lake jogger', 'Necklace Road promenade, opposite way', 'f', 'Tell her to drink water.', [
  S('water', ['హూ... పరుగు కష్టంగా ఉంది... దాహం వేస్తోంది.', 'Phew... the run is hard... I am thirsty.'],
    'Tell her to drink some water.', 'కొంచెం నీళ్ళు తాగండి, అక్కా.',
    ['konchem neellu tagandi akka', 'neellu tagandi akka', 'konchem water tagandi', 'akka neellu tagandi', 'కొంచెం నీళ్ళు తాగండి అక్కా'],
    ['Be kind to her.', 'Water = "neellu". Drink = "tagandi".'],
    ['అవును, అవును! థాంక్స్, నీ బాటిల్ ఇస్తావా?', 'Yes, yes! Thanks, will you give me your bottle?'],
    ['ఏం చెప్పావు? గాలి పీల్చుకుంటున్నా.', 'What did you say? I am catching my breath.']),
], ['బై! రేపు మళ్ళీ ఇక్కడే పరుగు.', 'Bye! Tomorrow I run here again.'],
  [['konchem neellu tagandi akka', 'please drink some water, akka']], ['అరే సమీర్, మళ్ళీ కనిపించావు!', 'Oh Sameer, you appeared again!']);

export const morningWalker = P('marine-morning-walker', 'Lakshmaiah', 'elderly morning walker', 'Necklace Road promenade', 'o', 'Greet him good morning.', [
  S('morning', ['ఉదయం నడక ఆరోగ్యానికి మంచిది బాబూ.', 'A morning walk is good for health, dear.'],
    'Wish him good morning.', 'శుభోదయం తాతగారూ.',
    ['shubhodayam tatagaru', 'good morning tatagaru', 'shubhodayam tata', 'namaskaram tatagaru', 'శుభోదయం తాతగారూ'],
    ['Greet him.', 'Good morning = "shubhodayam". Grandfather = "tata".'],
    ['శుభోదయం బాబూ, పక్షుల కిలకిలలు వింటున్నావా?', 'Good morning dear, can you hear the birds chirp?'],
    ['శుభోదయం చెప్పు బాబూ.', 'Say good morning, dear.']),
  S('birds', ['ఈ పక్షుల శబ్దం వినిపిస్తోందా నీకు?', 'Can you hear these birds?'],
    'Say you can hear them, it is lovely.', 'అవును, చాలా బాగా వినిపిస్తోంది.',
    ['avunu chala baga vinipistondi', 'avunu vinipistondi tatagaru', 'chala baga vinipistondi', 'avunu chala bagundi', 'అవును, చాలా బాగా వినిపిస్తోంది'],
    ['Say you hear them.', 'It is heard = "vinipistondi".'],
    ['అదే ఆనందం బాబూ, డబ్బులు కొనలేనిది.', 'That is joy, dear, which money cannot buy.'],
    ['వినిపిస్తోందా లేదా బాబూ?', 'Can you hear it or not, dear?']),
], ['నెమ్మదిగా వెళ్ళు బాబూ, తొందర లేదు.', 'Go slowly dear, there is no hurry.'],
  [['shubhodayam tatagaru', 'good morning, grandfather'], ['chala baga vinipistondi', 'I can hear very well']], ['శుభోదయం బాబూ, మళ్ళీ కలిశాం.', 'Good morning dear, we meet again.'], 2);

export const boatman = P('gateway-boatman', 'Mallesh', 'boat attendant', 'Hussain Sagar jetty, tourist boats', 'm', 'Ask the ticket price to the Buddha statue.', [
  S('ride', ['బుద్ధుడి దగ్గరకి బోటు రైడ్! రండి రండి!', 'Boat ride to the Buddha! Come come!'],
    'Ask how much the ticket is.', 'టికెట్ ఎంత?',
    ['ticket enta', 'ticket enta anna', 'boat ticket enta', 'oka ticket enta', 'టికెట్ ఎంత అన్నా'],
    ['Ask the ticket price.', 'Ticket = "ticket". How much = "enta".'],
    ['నూట యాభై రూపాయలు, వెళ్ళి రావడానికి.', 'One-fifty rupees, round trip.'],
    ['ఏం అడిగావు? ఇంజిన్ శబ్దంలో వినపడలేదు.', 'What did you ask? Could not hear over the engine.']),
  S('time', ['ఇప్పుడే బయల్దేరుతోంది, రండి!', 'It is leaving right now, come!'],
    'Ask how long the ride takes.', 'ఎంత సేపు పడుతుంది?',
    ['enta sepu padutundi', 'enta time padutundi', 'ride enta sepu', 'enta sepu undi ride', 'ఎంత సేపు పడుతుంది'],
    ['Ask about duration.', 'How long = "enta sepu".'],
    ['అర గంట. చాలా బాగుంటుంది సార్.', 'Half an hour. It is lovely, sir.'],
    ['ఎంత సేపు అని అడుగుతున్నావా?', 'Are you asking how long?']),
], ['హ్యాపీ జర్నీ సార్, బుద్ధుడికి నమస్కారం చెప్పండి!', 'Happy journey sir, say hello to the Buddha!'],
  [['ticket enta', 'how much is the ticket'], ['enta sepu padutundi', 'how long does it take']], ['సార్, బోటు ఎక్కుతారా ఇప్పుడు?', 'Sir, boarding the boat now?'], 2);

export const hajiFlowerWoman = P('haji-chadar-seller', 'Yashoda', 'flower and boat-ticket stall woman', 'Buddha island causeway, flower stall', 'f', 'Ask where to buy boat tickets.', [
  S('ticket', ['పూలు, పూలు! టికెట్ల గురించి చెప్పనా?', 'Flowers, flowers! Shall I tell you about the tickets?'],
    'Ask where the boat tickets are sold.', 'బోటు టికెట్లు ఎక్కడ దొరుకుతాయి?',
    ['botu tickets ekkada dorukutayi', 'boat tickets ekkada dorukutayi', 'tickets ekkada amma', 'boat ticket ekkada dorukutundi', 'బోటు టికెట్లు ఎక్కడ దొరుకుతాయి'],
    ['Ask where tickets are.', 'Where = "ekkada". Are available = "dorukutayi".'],
    ['అదిగో ఆ కిటికీ దగ్గర, క్యూ లో నిలబడు బాబూ.', 'There at that window, stand in the queue dear.'],
    ['టికెట్ల గురించి అడుగు బాబూ.', 'Ask about the tickets, dear.']),
], ['పూలు కూడా తీసుకెళ్ళు బాబూ, బుద్ధుడికి సమర్పించు.', 'Take flowers too dear, offer them to the Buddha.'],
  [['botu tickets ekkada dorukutayi', 'where are boat tickets sold']], ['బాబూ, టికెట్ దొరికిందా?', 'Dear, did you get a ticket?']);

export const juiceMan = P('haji-juice-man', 'Rasheed', 'haleem and lassi stall man', 'Lakeside causeway, haleem and lassi stall', 'm', 'Order a bowl of haleem, less spicy, and a lassi.', [
  S('haleem', ['వేడి వేడి హలీమ్! మా రెసిపీ ఫేమస్ సార్!', 'Hot haleem! Our recipe is famous, sir!'],
    'Order one bowl of haleem.', 'ఒక బౌల్ హలీమ్ ఇవ్వండి.',
    ['oka bowl haleem ivvandi', 'oka haleem ivvandi bhai', 'haleem oka bowl', 'bhai oka haleem kavali', 'ఒక బౌల్ హలీమ్ ఇవ్వండి'],
    ['Order one bowl.', 'One bowl = "oka bowl".'],
    ['ఇదిగో, నెయ్యి వేశాను. చాలా రుచిగా ఉంటుంది!', 'Here, I added ghee. It will taste great!'],
    ['ఏం కావాలి సార్? మళ్ళీ చెప్పండి.', 'What do you want, sir? Say again.']),
  S('lassi', ['లస్సీ కూడా కావాలా? తియ్యటిది?', 'Lassi too? The sweet one?'],
    'Say yes, a sweet lassi.', 'అవును, ఒక తియ్యటి లస్సీ కూడా ఇవ్వండి.',
    ['avunu oka tiyyati lassi kuda ivvandi', 'avunu lassi kuda ivvandi', 'oka lassi ivvandi bhai', 'sweet lassi ivvandi', 'అవును, ఒక లస్సీ ఇవ్వండి'],
    ['Say yes and ask for it.', 'Also = "kuda". Sweet = "tiyyati".'],
    ['సూపర్! చల్లటి లస్సీ, ఎండకి సరైనది.', 'Super! Cool lassi, perfect for the heat.'],
    ['లస్సీ కావాలా వద్దా? చెప్పండి.', 'Lassi or not? Tell me.']),
], ['ఉద్యోగం వచ్చాక హలీమ్ పార్టీ ఇవ్వండి సార్!', 'Throw a haleem party once you get the job, sir!'],
  [['oka bowl haleem ivvandi', 'give me one bowl of haleem'], ['lassi kuda ivvandi', 'give me a lassi too']], ['సార్, ఇంకో బౌల్ హలీమ్?', 'Sir, another bowl of haleem?'], 2);

export const hajiFlowerMan = P('haji-chadar-seller-2', 'Gangaram', 'flower and boat-ticket stall man', 'Buddha island causeway, second stall', 'm', 'Ask the price of lotus flowers.', [
  S('lotus', ['తామర పూలు, బంతి పూలు! తీసుకోండి సార్!', 'Lotus flowers, marigolds! Take some, sir!'],
    'Ask the price of a lotus flower.', 'ఒక తామర పువ్వు ఎంత?',
    ['oka tamara puvvu enta', 'tamara puvvu enta anna', 'lotus puvvu enta', 'oka puvvu enta', 'ఒక తామర పువ్వు ఎంత'],
    ['Ask the price.', 'Lotus = "tamara". Flower = "puvvu".'],
    ['ఇరవై రూపాయలు సార్, ఉదయం కోసినవి.', 'Twenty rupees, sir, picked this morning.'],
    ['ఏ పువ్వు అడుగుతున్నావు సార్?', 'Which flower are you asking about, sir?']),
], ['బోటు టికెట్ కూడా ఇక్కడే దొరుకుతుంది సార్!', 'Boat tickets are available here too, sir!'],
  [['oka tamara puvvu enta', 'how much is one lotus']], ['సార్, పూలు తీసుకుంటారా?', 'Sir, will you take flowers?']);

export const juiceCustomer = P('haji-juice-customer', 'Zainab', 'woman at the lassi stall', 'Lakeside causeway, haleem and lassi stall', 'f', 'Say her lassi will be ready soon.', [
  S('wait', ['అబ్బా, లస్సీ కోసం చాలా సేపు ఎదురు చూస్తున్నా.', 'Oh, I have been waiting long for the lassi.'],
    'Say it will be ready soon.', 'ఇంకొంచెం సేపట్లో వస్తుంది.',
    ['inkonchem sepatlo vastundi', 'konchem sepatlo vastundi', 'tvaralo vastundi', 'inka konchem sepu', 'ఇంకొంచెం సేపట్లో వస్తుంది'],
    ['Reassure her.', 'In a little while = "konchem sepatlo".'],
    ['అవును, థాంక్స్. ఎండ చాలా ఎక్కువగా ఉంది.', 'Yes, thanks. The sun is really strong.'],
    ['ఏమన్నారు? మళ్ళీ చెప్పండి.', 'What did you say? Say again.']),
], ['లస్సీ తాగి వెళ్ళండి, ఆల్ ది బెస్ట్!', 'Drink lassi and go, all the best!'],
  [['konchem sepatlo vastundi', 'it will come in a little while']], ['మీరు కూడా లస్సీ కోసమా?', 'You too for a lassi?']);

export const hajiElder = P('haji-pilgrim-2', 'Ibrahim Saab', 'elderly visitor', 'Buddha island causeway, near the gate', 'o', 'Ask if the causeway is safe for walking.', [
  S('walk', ['బాబూ, ఈ మార్గం గుండా నడిచి వెళ్ళొచ్చా అని చూస్తున్నా.', 'Dear, I am checking whether one can walk this path.'],
    'Say the path is safe to walk.', 'అవును, ఈ దారి నడవడానికి సురక్షితం.',
    ['avunu ee daari nadavadaniki surakshitam', 'ee daari safe ga undi', 'nadavochu tatagaru', 'safe ga undi nadavochu', 'అవును, ఈ దారి సురక్షితం'],
    ['Reassure him.', 'Safe = "surakshitam". Path = "daari".'],
    ['సరే బాబూ, నెమ్మదిగా వెళ్తాను, అల్లా దయ.', 'Okay dear, I will go slowly, by God\'s grace.'],
    ['సురక్షితమా కాదా బాబూ?', 'Is it safe or not, dear?']),
], ['బుద్ధుణ్ణి చూసి రా బాబూ, ఖుదా హాఫిజ్.', 'Go see the Buddha dear, Khuda Hafiz.'],
  [['ee daari nadavadaniki surakshitam', 'this path is safe to walk']], ['బాబూ, మీరు కూడా వచ్చారా?', 'Dear, did you also come?']);
