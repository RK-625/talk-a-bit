// Necklace Road park: the stalls, the camel and horse ride, the Bathukamma display and the families.
import { P, step as S } from '../kit.js';

export const corn = P('juhu-pavbhaji-cook', 'Ramesh', 'pani puri stall cook', 'Necklace Road park, pani puri stall', 'm', 'Ask for a spicy potato chaat.', [
  S('chaat', ['పూరీలు పగలగొడుతున్నా! ఏం కావాలి సార్?', 'I am cracking the puris! What do you want, sir?'],
    'Ask for a plate of dahi puri.', 'ఒక ప్లేట్ దహీ పూరీ ఇవ్వండి.',
    ['oka plate dahi puri ivvandi', 'dahi puri oka plate', 'dahi puri kavali anna', 'oka dahi puri ivvandi', 'ఒక ప్లేట్ దహీ పూరీ కావాలి'],
    ['Order a plate.', 'Curd puri = "dahi puri".'],
    ['ఇదిగో, పెరుగు, బంగాళదుంప, సేవ్ అన్నీ ఉన్నాయి.', 'Here, curd, potato and sev, all are there.'],
    ['ఏం కావాలి సార్? గట్టిగా చెప్పండి.', 'What do you want, sir? Say loudly.']),,
  S('count', ['ఎన్ని పూరీలు వేయనా సార్?', 'How many puris shall I put, sir?'],
    'Ask for six puris.', 'ఆరు పూరీలు వేయండి.',
    ['aaru puri veyandi', 'aaru puri ivvandi anna', 'aaru puris veyandi', 'six puri veyandi', 'ఆరు పూరీలు వేయండి'],
    ['Say the number.', 'Six = "aaru".'],
    ['ఇదిగో ఆరు పూరీలు, కారంగా ఉంటాయి.', 'Here are six puris, they are spicy.'],
    ['ఎన్ని పూరీలు? చెప్పండి.', 'How many puris? Tell me.'])
], ['మళ్ళీ రండి సార్, రోజూ ఇక్కడే ఉంటాను.', 'Come again sir, I am here every day.'],
  [['oka plate dahi puri ivvandi', 'give me one plate of dahi puri']], ['సార్, ఇంకో ప్లేట్?', 'Sir, another plate?']);

export const bhutta = P('juhu-bhutta-seller', 'Devaiah', 'roasted-corn seller', 'Necklace Road park, corn cart', 'o', 'Order one roasted corn with lemon and chilli.', [
  S('corn', ['కాల్చిన మొక్కజొన్న, వేడి వేడి! నిమ్మకాయ వేయనా?', 'Roasted corn, hot hot! Shall I add lemon?'],
    'Order one corn with lemon and chilli.', 'ఒక మొక్కజొన్న కంకి, నిమ్మకాయ కారంతో ఇవ్వండి.',
    ['oka mokkajonna kanki nimmakaya karamto ivvandi', 'oka corn ivvandi nimmakaya karam tho', 'mokkajonna kanki ivvandi tatagaru', 'oka bhutta ivvandi karam tho', 'ఒక మొక్కజొన్న కంకి ఇవ్వండి'],
    ['Order one corn.', 'Corn = "mokkajonna". Lemon = "nimmakaya".'],
    ['ఇదిగో, నిప్పుల మీద కాల్చాను. తిని చూడు.', 'Here, roasted on coals. Eat and see.'],
    ['ఏం కావాలి బాబూ? చెప్పు.', 'What do you want, dear? Say.']),
  S('pay', ['ఇరవై రూపాయలు బాబూ.', 'Twenty rupees, dear.'],
    'Say here is twenty rupees.', 'ఇదిగోండి, ఇరవై రూపాయలు.',
    ['idigondi iravai rupayalu', 'idigo iravai rupayalu tata', 'iravai ivvanu idigondi', 'idigondi money', 'ఇదిగోండి, ఇరవై రూపాయలు'],
    ['Pay him.', 'Twenty = "iravai". Here you are = "idigondi".'],
    ['సరే బాబూ, ఇంటికి జాగ్రత్తగా వెళ్ళు.', 'Okay dear, go home safely.'],
    ['డబ్బులు ఇవ్వు బాబూ.', 'Give the money, dear.']),
], ['బాగా తిను బాబూ, ఆరోగ్యంగా ఉండు.', 'Eat well dear, stay healthy.'],
  [['oka mokkajonna kanki ivvandi', 'give me one corn cob'], ['idigondi iravai rupayalu', 'here is twenty rupees']], ['బాబూ, ఇంకో కంకి కావాలా?', 'Dear, want another corn?'], 2);

export const coconutCart = P('juhu-coconut-seller', 'Sattar', 'coconut and raw-mango cart man', 'Necklace Road park, coconut cart', 'm', 'Ask for raw mango with chilli salt.', [
  S('mango', ['కొబ్బరి బొండాం, పచ్చి మామిడి కాయ! ఏది కావాలి?', 'Tender coconut, raw mango! Which one do you want?'],
    'Ask for raw mango with chilli salt.', 'కారం ఉప్పుతో మామిడి ముక్కలు ఇవ్వండి.',
    ['karam upputo mamidi mukkalu ivvandi', 'mamidi mukkalu ivvandi karam tho', 'raw mango ivvandi bhai', 'mamidi kaya ivvandi', 'కారం ఉప్పుతో మామిడి ముక్కలు ఇవ్వండి'],
    ['Ask for the snack.', 'Mango = "mamidi". Pieces = "mukkalu".'],
    ['ఇదిగో, పుల్ల పుల్లగా ఉంటాయి సార్!', 'Here, they will be nice and tangy, sir!'],
    ['మామిడా, కొబ్బరా? చెప్పండి సార్.', 'Mango or coconut? Tell me, sir.']),,
  S('water', ['కొబ్బరి నీళ్ళు కూడా ఇవ్వనా సార్?', 'Shall I give coconut water too, sir?'],
    'Say yes, one tender coconut.', 'అవును, ఒక బొండాం ఇవ్వండి.',
    ['avunu oka bondam ivvandi', 'oka bondam ivvandi', 'kobbari neellu ivvandi', 'avunu oka kobbari bondam', 'అవును, ఒక బొండాం ఇవ్వండి'],
    ['Say yes and ask.', 'Tender coconut = "bondam".'],
    ['ఇదిగో చల్లటి కొబ్బరి నీళ్ళు, తాగండి సార్.', 'Here is cool coconut water, drink sir.'],
    ['కొబ్బరి కావాలా, వద్దా?', 'Coconut or not?'])
], ['ఎండలో కొబ్బరి నీళ్ళు తాగండి సార్!', 'Drink coconut water in the heat, sir!'],
  [['mamidi mukkalu ivvandi', 'give me mango pieces']], ['సార్, కొబ్బరి బొండాం కూడా కావాలా?', 'Sir, tender coconut too?']);

export const cartKid = P('juhu-horse-rider-kid', 'Rahul', 'kid on the camel ride', 'Necklace Road park, camel and horse ride', 'k', 'Ask if he is scared of the camel.', [
  S('scared', ['అన్నా చూడు, నేను ఒంటె ఎక్కాను!', 'Anna look, I am on the camel!'],
    'Ask if he is scared.', 'నీకు భయంగా లేదా?',
    ['neeku bhayanga leda', 'bhayam ledha neeku', 'neeku bhayam ledha', 'bhayanga undha', 'నీకు భయంగా లేదా'],
    ['Ask about fear.', 'Fear = "bhayam". Are you not = "leda".'],
    ['లేదు అన్నా! నేను ధైర్యవంతుణ్ణి!', 'No anna! I am brave!'],
    ['ఏమన్నావు అన్నా? నేను ఊగుతున్నా!', 'What did you say anna? I am swaying!']),
], ['అన్నా, నువ్వు కూడా ఎక్కు!', 'Anna, you ride too!'],
  [['neeku bhayanga leda', 'are you not scared']], ['అన్నా, చూడు నా ఒంటె!', 'Anna, see my camel!']);

export const rangoliArtist = P('juhu-sand-artist', 'Sujatha', 'Bathukamma flower-stack artist', 'Necklace Road park, Bathukamma display', 'f', 'Ask how many flower layers she stacks.', [
  S('layers', ['బంతి, గునుగు, చామంతి పూలతో పేర్చుతున్నా, చూడు.', 'I am stacking marigold, gunuka and chamanti flowers, see.'],
    'Ask how many layers there are.', 'ఇందులో ఎన్ని వరుసలు ఉన్నాయి?',
    ['indulo enni varusalu unnayi', 'enni varusalu unnayi akka', 'enni layers unnayi', 'enni vaarusalu', 'ఇందులో ఎన్ని వరుసలు ఉన్నాయి'],
    ['Ask about layers.', 'How many = "enni". Rows = "varusalu".'],
    ['తొమ్మిది వరుసలు, ప్రతిదానికి ఒక రంగు.', 'Nine layers, each with a colour.'],
    ['ఏమన్నారు? పూలు పేర్చడంలో ఉన్నా.', 'What did you say? I am busy stacking flowers.']),
  S('liked', ['నా బతుకమ్మ నచ్చిందా సార్?', 'Did you like my Bathukamma, sir?'],
    'Say it is very beautiful.', 'చాలా అందంగా ఉంది అక్కా.',
    ['chala andanga undi akka', 'baga undi akka', 'chala bagundi bathukamma', 'super ga undi akka', 'చాలా అందంగా ఉంది అక్కా'],
    ['Compliment her.', 'Beautiful = "andanga". Sister = "akka".'],
    ['ధన్యవాదాలు! పండుగకి ఇంకా పెద్దది చేస్తా.', 'Thank you! I will make a bigger one for the festival.'],
    ['నచ్చిందా లేదా సార్?', 'Did you like it or not, sir?']),
], ['పండుగకి మిమ్మల్ని పిలుస్తా సార్, రండి!', 'I will invite you for the festival, sir, come!'],
  [['enni varusalu unnayi', 'how many layers are there'], ['chala andanga undi akka', 'it is very beautiful, akka']], ['సార్, మళ్ళీ వచ్చారా?', 'Sir, you came again?'], 2);

export const lakesideKid = P('juhu-gola-kid', 'Gopi', 'park kid', 'Necklace Road park, near the park stalls', 'k', 'Ask if he wants to play.', [
  S('play', ['అన్నా, నాతో ఆడతావా? నేను ఒక్కడినే ఉన్నా.', 'Anna, will you play with me? I am alone.'],
    'Say yes, you will play a bit.', 'సరే, కొద్దిసేపు ఆడదాం.',
    ['sare koddisepu aadadam', 'sare konchem sepu aadadam', 'ok aadadam gopi', 'sare aadatanu', 'సరే, కొద్దిసేపు ఆడదాం'],
    ['Agree to play.', 'A little while = "koddisepu".'],
    ['యే! రా అన్నా, ఇటు రా!', 'Yay! Come anna, come here!'],
    ['నాతో ఆడతావా, లేదా?', 'Will you play with me, or not?']),
], ['బై అన్నా, అమ్మ పిలుస్తోంది!', 'Bye anna, mom is calling!'],
  [['sare koddisepu aadadam', 'okay, let us play a little']], ['అన్నా, మళ్ళీ ఆడదాం!', 'Anna, let us play again!']);

export const cornDiner = P('juhu-pavbhaji-diner-1', 'Mohan', 'man eating pani puri', 'Necklace Road park, pani puri stool', 'm', 'Ask if the pani puri is too spicy.', [
  S('hot', ['ష్... ష్... చాలా కారంగా ఉంది! కళ్ళలో నీళ్ళు!', 'Sss... sss... so spicy! Tears in my eyes!'],
    'Offer him some water.', 'కొంచెం నీళ్ళు తాగండి.',
    ['konchem neellu tagandi', 'neellu tagandi anna', 'water tagandi konchem', 'neellu istanu tagandi', 'కొంచెం నీళ్ళు తాగండి'],
    ['Suggest water.', 'Some water = "konchem neellu".'],
    ['అయ్యో థాంక్స్! కారం ఎక్కువ అడిగాను నేనే.', 'Oh thanks! I asked for extra spice myself.'],
    ['ఏమన్నావు? నోరు మండుతోంది!', 'What did you say? My mouth is burning!']),
], ['ఇంకో పూరీ తింటా, ఏం కాదులే!', 'I will eat one more puri, nothing will happen!'],
  [['konchem neellu tagandi', 'drink some water']], ['అన్నా, పూరీ కారం చూసావా?', 'Anna, have you seen how spicy the puri is?']);

export const cartman = P('juhu-horse-handler', 'Ismail', 'camel and horse handler', 'Necklace Road park, camel and horse ride', 'm', 'Ask the price of a camel ride.', [
  S('ride', ['ఒంటె సవారీ! గుర్రం సవారీ! రండి రండి!', 'Camel ride! Horse ride! Come come!'],
    'Ask the price of a camel ride.', 'ఒంటె సవారీ ఎంత?',
    ['onte savari enta', 'onte ride enta anna', 'camel ride enta', 'oka round enta', 'ఒంటె సవారీ ఎంత'],
    ['Ask the price.', 'Camel = "onte". Ride = "savari".'],
    ['ఒక రౌండ్ వంద రూపాయలు సార్.', 'One round is a hundred rupees, sir.'],
    ['ఏం అడిగావు సార్? మళ్ళీ చెప్పు.', 'What did you ask, sir? Say again.']),,
  S('rounds', ['ఎన్ని రౌండ్లు కావాలి సార్?', 'How many rounds do you want, sir?'],
    'Ask for two rounds.', 'రెండు రౌండ్లు కావాలి.',
    ['rendu rounds kavali', 'rendu rounds veyandi', 'rendu round chestanu', 'two rounds kavali', 'రెండు రౌండ్లు కావాలి'],
    ['Say how many.', 'Two = "rendu".'],
    ['సరే సార్, రెండు రౌండ్లు, రెండు వందలు.', 'Okay sir, two rounds, two hundred.'],
    ['ఒకటా, రెండా సార్?', 'One or two, sir?'])
], ['ఈ ఒంటె చాలా నెమ్మదిగా నడుస్తుంది సార్, భయపడకండి.', 'This camel walks very slowly sir, do not worry.'],
  [['onte savari enta', 'how much is the camel ride']], ['సార్, ఒక రౌండ్ వేస్తారా?', 'Sir, will you take a round?']);

export const familyMom = P('juhu-family-mom', 'Anuradha', 'mother in a park family', 'Necklace Road park, near the water', 'f', 'Offer to take a family photo.', [
  S('photo', ['మా కుటుంబం మొత్తం కలిసి ఒక ఫోటో కావాలి.', 'We want one photo with the whole family together.'],
    'Offer to take their family photo.', 'నేను మీ కుటుంబ ఫోటో తీస్తాను.',
    ['nenu mee kutumba photo teestanu', 'nenu family photo teestanu', 'mee family photo teestanu madam', 'photo teestanu nenu', 'నేను మీ కుటుంబ ఫోటో తీస్తాను'],
    ['Offer help.', 'Family = "kutumbam". I will take = "teestanu".'],
    ['థాంక్స్ బాబూ! అందరం ఇక్కడ నిలబడతాం.', 'Thanks dear! We will all stand here.'],
    ['ఫోటో తీస్తావా లేదా బాబూ?', 'Will you take the photo or not, dear?']),
  S('smile', ['ఒక్క నిమిషం, పిల్లలూ నవ్వండి!', 'One minute, kids smile!'],
    'Tell them to smile and say one, two, three.', 'అందరూ నవ్వండి, ఒకటి రెండు మూడు!',
    ['andaru navvandi okati rendu moodu', 'navvandi okati rendu moodu', 'andaru smile cheyandi', 'ready okati rendu moodu', 'అందరూ నవ్వండి, ఒకటి రెండు మూడు'],
    ['Count down.', 'Smile = "navvandi". 1-2-3 = "okati rendu moodu".'],
    ['బాగా వచ్చింది! మీరు చాలా మంచి ఫోటోగ్రాఫర్!', 'It came out well! You are a great photographer!'],
    ['నవ్వమని చెప్పండి బాబూ.', 'Tell them to smile, dear.']),
], ['ఉద్యోగం వచ్చాక మా ఇంటికి భోజనానికి రా బాబూ.', 'Come to our house for a meal once you get a job, dear.'],
  [['nenu mee kutumba photo teestanu', 'I will take your family photo'], ['andaru navvandi', 'everyone smile']], ['బాబూ, ఇంకో ఫోటో తీస్తావా?', 'Dear, will you take another photo?'], 2);

export const familyDad = P('juhu-family-dad', 'Krishna Murthy', 'father in a park family', 'Necklace Road park, near the water', 'm', 'Recommend the falooda.', [
  S('eat', ['ఏం తినాలో అర్థం కావట్లేదు, ఏదైనా సలహా ఇవ్వండి.', 'I cannot decide what to eat, give me a suggestion.'],
    'Recommend the falooda.', 'ఇక్కడ ఫలూదా చాలా బాగుంటుంది.',
    ['ikkada falooda chala bagutundi', 'falooda try cheyandi sir', 'falooda chala baguntundi ikkada', 'falooda tinandi', 'ఇక్కడ ఫలూదా చాలా బాగుంటుంది'],
    ['Give a food tip.', 'Falooda = "falooda". Tasty = "bagutundi".'],
    ['ఓహో! పిల్లలకి కూడా నచ్చుతుంది. థాంక్స్!', 'Oho! The kids will like it too. Thanks!'],
    ['ఏం చెప్పావు బాబూ? మళ్ళీ చెప్పు.', 'What did you say dear? Say again.']),
], ['మంచి సలహా ఇచ్చావు బాబూ.', 'You gave good advice, dear.'],
  [['ikkada falooda chala bagutundi', 'the falooda is very good here']], ['బాబూ, ఇంకేమైనా సలహా ఉందా?', 'Dear, any other suggestion?']);

export const familyKid = P('juhu-family-kid', 'Bittu', 'child in a park family', 'Necklace Road park, near the water', 'k', 'Ask him to throw the ball to you.', [
  S('ball', ['అన్నా, ఈ బంతి పట్టుకో! పట్టుకో!', 'Anna, catch this ball! Catch!'],
    'Ask him to throw the ball to you.', 'బంతి నా వైపు వేయి.',
    ['banti naa vaipu veyi', 'banti naaku veyi', 'banti ikkadiki veyi', 'ball ivvu naaku', 'బంతి నా వైపు వేయి'],
    ['Ask for the ball.', 'Ball = "banti". Toward me = "naa vaipu".'],
    ['ఇదిగో! పట్టుకున్నావా! హుర్రే!', 'Here! Did you catch it! Hurray!'],
    ['బంతి వేయమనా, వద్దనా అన్నా?', 'Should I throw or not, anna?']),
], ['నేను గెలిచాను, నేను గెలిచాను!', 'I won, I won!'],
  [['banti naa vaipu veyi', 'throw the ball toward me']], ['అన్నా, ఇంకో సారి ఆడదాం!', 'Anna, let us play once more!']);

export const lifeguard = P('juhu-lifeguard', 'Bhaskar', 'lake safety guard', 'Necklace Road park, water edge', 'm', 'Ask if it is safe near the water.', [
  S('safe', ['నీళ్ళ దగ్గర జాగ్రత్త సార్, పిల్లలను చూసుకోండి.', 'Be careful near the water, sir, watch the children.'],
    'Ask if it is safe to go near the edge.', 'ఇక్కడ నీళ్ళ దగ్గరికి వెళ్ళొచ్చా?',
    ['ikkada neella daggariki vellocha', 'neella daggariki vellochha sir', 'neella daggara safe a', 'edge daggariki vellocha', 'ఇక్కడ నీళ్ళ దగ్గరికి వెళ్ళొచ్చా'],
    ['Ask if it is allowed.', 'Near the water = "neella daggara".'],
    ['అంచు వరకు వెళ్ళకండి సార్, లోతు ఎక్కువ.', 'Do not go to the edge, sir, it is deep.'],
    ['ఏం అడుగుతున్నారో చెప్పండి సార్.', 'Tell me what you are asking, sir.']),,
  S('swim', ['మీకు ఈత వచ్చా సార్?', 'Do you know how to swim, sir?'],
    'Say no, you cannot swim.', 'లేదు, నాకు ఈత రాదు.',
    ['ledu naaku eeta radu', 'naaku eeta radu', 'eeta radu sir', 'nenu eeta kottalenu', 'లేదు, నాకు ఈత రాదు'],
    ['Be honest.', 'Swimming = "eeta". I cannot = "radu".'],
    ['అయితే నీళ్ళకి దూరంగా ఉండండి సార్.', 'Then stay away from the water, sir.'],
    ['ఈత వచ్చా, లేదా సార్?', 'Can you swim or not, sir?'])
], ['జాగ్రత్తగా ఉండండి సార్, బోటు కూడా ఎక్కొచ్చు.', 'Be careful sir, you may also take a boat.'],
  [['neella daggariki vellocha', 'can I go near the water']], ['సార్, ఇక్కడే నిలబడండి.', 'Sir, please stand right here.']);

export const ballTeen = P('juhu-road-ball-teen', 'Arjun', 'teen with a football', 'open ground on the road to the park', 'q', 'Say you can play one match.', [
  S('game', ['అన్నా, నాతో ఫుట్‌బాల్ ఆడతావా? ఎవరూ లేరు.', 'Anna, will you play football with me? Nobody else is here.'],
    'Say you will play one match.', 'సరే, ఒక మ్యాచ్ ఆడదాం.',
    ['sare oka match aadadam', 'ok oka match aadadam', 'sare oka game aadadam', 'sare aadadam arjun', 'సరే, ఒక మ్యాచ్ ఆడదాం'],
    ['Agree to play.', 'One match = "oka match". Let us play = "aadadam".'],
    ['సూపర్! నువ్వు గోల్ కీపర్ అన్నా.', 'Super! You be the goalkeeper anna.'],
    ['ఆడతావా లేదా అన్నా? చెప్పు.', 'Will you play or not anna? Say.']),
], ['మంచి గేమ్ అన్నా, మళ్ళీ ఆడదాం!', 'Good game anna, let us play again!'],
  [['sare oka match aadadam', 'okay, let us play a match']], ['అన్నా, ఈసారి నేను గెలుస్తా!', 'Anna, I will win this time!']);

export const peanutRoad = P('beach-road-peanut-seller', 'Linga Reddy', 'groundnut seller', 'road to the park', 'o', 'Ask for a cone of groundnuts for ten rupees.', [
  S('cone', ['వేరుశనగలు, వేడి వేడి! ఎన్ని కోన్లు సార్?', 'Groundnuts, hot hot! How many cones, sir?'],
    'Ask for ten rupees worth.', 'పది రూపాయలకు వేరుశనగలు ఇవ్వండి.',
    ['padi rupayalaku verusanagalu ivvandi', 'padi rupayalaki ivvandi tatagaru', 'padi rupayala verusanagalu', 'ten rupees verusanagalu', 'పది రూపాయలకు వేరుశనగలు ఇవ్వండి'],
    ['Say how much you want.', 'For ten rupees = "padi rupayalaku".'],
    ['ఇదిగో, ఒక కోన్ నిండా పోశాను సార్.', 'Here, I filled the cone full, sir.'],
    ['ఎంతకు కావాలి సార్?', 'For how much, sir?']),
], ['కాస్త పల్లీలు ఇంటర్వ్యూకి లక్కీ సార్!', 'A few groundnuts are lucky for the interview, sir!'],
  [['padi rupayalaku verusanagalu ivvandi', 'give me groundnuts for ten rupees']], ['సార్, ఇంకో కోన్ కావాలా?', 'Sir, another cone?']);
