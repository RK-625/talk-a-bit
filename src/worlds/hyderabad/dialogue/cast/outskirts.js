// People on open ground and lanes away from the main sites.
import { P, step as S } from '../kit.js';

export const railKiteKid = P('rail-kite-kid', 'Ajay', 'kite-flying kid', 'open ground beside the metro viaduct', 'k', 'Ask how high his kite can go.', [
  S('high', ['నా గాలిపటం మెట్రో కన్నా పైకి ఎగురుతుంది చూడు!', 'My kite flies higher than the metro, look!'],
    'Ask how high it can go.', 'అది ఎంత పైకి వెళ్ళగలదు?',
    ['adi enta paiki vellagaladu', 'enta paiki velthundi anna', 'ee kite enta paiki vellagaladu', 'enta pai ki ekkutundi', 'అది ఎంత పైకి వెళ్ళగలదు'],
    ['Ask about the height.', 'How high = "enta paiki".'],
    ['ఆకాశం వరకు అన్నా! ఇంకా దారం ఉంది!', 'Up to the sky anna! There is more string!'],
    ['ఏమన్నావు అన్నా? నా పతంగ్ చూడు!', 'What did you say anna? Look at my kite!']),
], ['నువ్వూ ఒకటి కొనుక్కో అన్నా!', 'You buy one too, anna!'],
  [['adi enta paiki vellagaladu', 'how high can it go']], ['అన్నా, నా పతంగ్ చూసావా?', 'Anna, have you seen my kite?']);

export const laneGossip = P('lane-aunty-gossip', 'Sakkubai', 'gossiping woman', 'open ground by an old-city house block', 'f', 'Say you have no idea about the neighbours.', [
  S('gossip', ['ఆ పక్కింటి వాళ్ళ గురించి విన్నావా బాబూ?', 'Have you heard about the neighbours next door, dear?'],
    'Say you do not know anything.', 'నాకు ఏమీ తెలియదు ఆంటీ.',
    ['naaku emi teliyadu aunty', 'naaku emi teliyadu', 'nenu emi vinaledu aunty', 'naaku teliyadu aunty', 'నాకు ఏమీ తెలియదు ఆంటీ'],
    ['Say you do not know.', 'I do not know = "naaku teliyadu".'],
    ['అయ్యో! అయితే నేను చెబుతా విను...', 'Oh! Then let me tell you, listen...'],
    ['తెలుసా లేదా? చెప్పు బాబూ.', 'Do you know or not? Say dear.']),
  S('cut', ['ఉండు, నీకు ఇంటర్వ్యూ ఉందా అన్నావు కదా?', 'Wait, did you say you have an interview?'],
    'Say you must go, sorry.', 'క్షమించండి ఆంటీ, నేను వెళ్ళాలి.',
    ['kshaminchandi aunty nenu vellali', 'sorry aunty nenu vellali', 'nenu vellali aunty sorry', 'inka time ledu aunty', 'క్షమించండి ఆంటీ, నేను వెళ్ళాలి'],
    ['Excuse yourself politely.', 'Sorry = "kshaminchandi". I must go = "nenu vellali".'],
    ['సరే బాబూ, వెళ్ళి రా. ఈ కథ రేపు చెప్తా!', 'Okay dear, go. I will tell this story tomorrow!'],
    ['వెళ్ళాలా? చెప్పు బాబూ.', 'Must you go? Say dear.']),
], ['జాగ్రత్తగా వెళ్ళి రా బాబూ!', 'Go safe and return, dear!'],
  [['naaku emi teliyadu', 'I do not know anything'], ['nenu vellali aunty sorry', 'I must go, sorry']], ['బాబూ, నేను ఇంకో కథ చెప్పనా?', 'Dear, shall I tell another story?'], 2);

export const schoolgirl = P('east-schoolgirl', 'Sneha', 'schoolgirl', 'open ground near the east road', 'k', 'Ask which class she studies in.', [
  S('class', ['అన్నయ్యా, నేను స్కూల్ నుంచి ఇంటికి వెళ్తున్నా!', 'Brother, I am going home from school!'],
    'Ask which class she is in.', 'నువ్వు ఏ తరగతి చదువుతున్నావు?',
    ['nuvvu ye taragati chaduvutunnavu', 'ye class chaduvutunnav', 'nuvvu ye class lo unnav', 'ye taragati papa', 'నువ్వు ఏ తరగతి చదువుతున్నావు'],
    ['Ask about school.', 'Which class = "ye taragati". Studying = "chaduvutunnavu".'],
    ['ఆరో తరగతి! నాకు తెలుగు అంటే ఇష్టం.', 'Sixth class! I like Telugu.'],
    ['ఏమన్నావు అన్నయ్యా?', 'What did you say brother?']),
], ['బై అన్నయ్యా, అమ్మ ఎదురు చూస్తోంది!', 'Bye brother, mom is waiting!'],
  [['nuvvu ye taragati chaduvutunnavu', 'which class are you studying in']], ['అన్నయ్యా, నువ్వు కూడా స్కూల్ కి వెళ్ళావా?', 'Brother, did you go to school too?']);

export const scrubElder = P('scrub-elder-umbrella', 'Papaiah', 'elderly man with an umbrella', 'open scrubland, far from the sites', 'o', 'Ask if he needs help finding the road.', [
  S('road', ['ఎండ ఎక్కువగా ఉంది, గొడుగు పట్టుకుని నిలబడ్డా బాబూ.', 'The sun is strong, I stand holding an umbrella dear.'],
    'Ask if he needs help to reach the road.', 'రోడ్ దాకా సాయం కావాలా తాతా?',
    ['road daka sayam kavala tata', 'road daka vastanu tata', 'sayam kavala tatagaru', 'road daggara vadilipettana', 'రోడ్ దాకా సాయం కావాలా తాతా'],
    ['Offer help.', 'Until the road = "road daka". Need help = "sayam kavala".'],
    ['వద్దు బాబూ, నేను నెమ్మదిగా వెళ్ళగలను. మంచివాడివి.', 'No need dear, I can go slowly. You are kind.'],
    ['ఏమంటున్నావు బాబూ? గొడుగు అడ్డం.', 'What are you saying dear? The umbrella is in the way.']),
], ['నీకు మంచి జరుగుతుంది బాబూ.', 'Good things will happen to you dear.'],
  [['road daka sayam kavala tata', 'do you need help to the road, grandpa']], ['బాబూ, నువ్వు ఇక్కడ ఏం చేస్తున్నావు?', 'Dear, what are you doing here?']);

export const selfieTeen = P('seaview-selfie-teen', 'Nikhil', 'teen taking selfies', 'open ground with a view of the Durgam Cheruvu bridge', 'q', 'Offer to take a photo with the bridge behind.', [
  S('selfie', ['ఈ బ్రిడ్జ్ తో సెల్ఫీ తీసుకోవడం కష్టంగా ఉంది!', 'It is hard to take a selfie with this bridge!'],
    'Offer to take his photo.', 'నేను నీ ఫోటో తీస్తాను, ఫోన్ ఇవ్వు.',
    ['nenu nee photo teestanu phone ivvu', 'phone ivvu nenu teestanu', 'nenu photo teestanu anna', 'photo teestanu ivvandi', 'నేను నీ ఫోటో తీస్తాను'],
    ['Offer help.', 'Give the phone = "phone ivvu".'],
    ['థాంక్స్ అన్నా! బ్రిడ్జ్ మొత్తం రావాలి.', 'Thanks anna! The whole bridge should come in.'],
    ['ఫోటో తీస్తావా అన్నా?', 'Will you take the photo, anna?']),
  S('bridge', ['ఈ బ్రిడ్జ్ తీగలతో ఉంటుంది కదా, అందుకే ఫేమస్!', 'This bridge has cables, that is why it is famous!'],
    'Say the bridge looks beautiful at night.', 'రాత్రిపూట ఈ బ్రిడ్జ్ చాలా అందంగా ఉంటుంది.',
    ['ratripoota ee bridge chala andanga untundi', 'night bridge chala bagundi', 'raatri bridge andanga untundi', 'night lo bridge super', 'రాత్రిపూట ఈ బ్రిడ్జ్ చాలా అందంగా ఉంటుంది'],
    ['Talk about the bridge.', 'At night = "ratripoota". Beautiful = "andanga".'],
    ['అవును అన్నా! లైట్లు వెలుగుతాయి.', 'Yes anna! The lights glow.'],
    ['బ్రిడ్జ్ గురించి చెప్పు అన్నా.', 'Say something about the bridge anna.']),
], ['సూపర్ ఫోటో అన్నా, థాంక్స్!', 'Super photo anna, thanks!'],
  [['nenu nee photo teestanu', 'I will take your photo'], ['ratripoota ee bridge chala andanga untundi', 'the bridge is beautiful at night']], ['అన్నా, ఇంకో ఫోటో!', 'Anna, one more photo!'], 2);

export const ballKid = P('east-field-ball-kid', 'Rinku', 'kid with a ball', 'open ground east', 'k', 'Ask if he wants a game of catch.', [
  S('friends', ['నాతో ఆడే వాళ్ళెవరూ లేరు అన్నా!', 'Nobody is there to play with me anna!'],
    'Say you will play catch with him.', 'నేను నీతో క్యాచ్ ఆడతాను.',
    ['nenu neetho catch aadatanu', 'nenu catch aadatanu', 'neetho aadatanu rinku', 'catch aadadam ra', 'నేను నీతో క్యాచ్ ఆడతాను'],
    ['Offer to play.', 'With you = "neetho". I will play = "aadatanu".'],
    ['యే! పట్టుకో అన్నా, పట్టుకో!', 'Yay! Catch it anna, catch!'],
    ['నాతో క్యాచ్ ఆడతావా?', 'Will you play catch with me?']),
], ['మళ్ళీ రా అన్నా, ఇక్కడే ఉంటా!', 'Come again anna, I will be here!'],
  [['nenu neetho catch aadatanu', 'I will play catch with you']], ['అన్నా, నాతో ఆడతావా?', 'Anna, will you play with me?']);

export const phoneWoman = P('field-phone-woman', 'Shilpa', 'woman on the phone', 'open ground', 'f', 'Say you will not disturb her.', [
  S('call', ['ఒక్క నిమిషం, ఫోన్ లో ఉన్నా... ఏంటి?', 'One minute, I am on the phone... what is it?'],
    'Say sorry, you will not disturb her.', 'క్షమించండి, మిమ్మల్ని ఇబ్బంది పెట్టను.',
    ['kshaminchandi mimmalni ibbandi pettanu', 'sorry madam disturb cheyanu', 'sorry nenu aagutanu', 'meeru matladandi madam', 'క్షమించండి, మిమ్మల్ని ఇబ్బంది పెట్టను'],
    ['Be polite.', 'Sorry = "kshaminchandi". I will not disturb = "ibbandi pettanu".'],
    ['అరే, పర్లేదు! నువ్వు మంచివాడివి.', 'Arre, it is fine! You are polite.'],
    ['ఏమన్నారు? కాల్ లో ఉన్నా.', 'What did you say? I am on a call.']),
], ['బై, నా ఫోన్ రింగ్ అవుతోంది!', 'Bye, my phone is ringing!'],
  [['kshaminchandi mimmalni ibbandi pettanu', 'sorry, I will not disturb you']], ['ఇంకా ఇక్కడే నిలబడ్డారా?', 'Still standing here?']);

export const backpackerTeen = P('north-field-backpacker-teen', 'Rishi', 'teen with a backpack', 'open ground north of the city', 'q', 'Recommend visiting Charminar.', [
  S('explore', ['ఈ ఊరిలో ఏం చూడాలో తెలియట్లేదు అన్నా.', 'I do not know what to see in this city anna.'],
    'Recommend Charminar and Hussain Sagar.', 'చార్మినార్, హుస్సేన్ సాగర్ చూడండి.',
    ['charminar hussain sagar chudandi', 'charminar chudandi anna', 'hussain sagar kuda chudandi', 'charminar and hussain sagar', 'చార్మినార్, హుస్సేన్ సాగర్ చూడండి'],
    ['Recommend places.', 'See = "chudandi".'],
    ['సూపర్ అన్నా! రేపే వెళ్తా.', 'Super anna! I will go tomorrow.'],
    ['ఏం చూడాలో చెప్పు అన్నా.', 'Tell me what to see anna.']),
  S('food', ['అక్కడ ఏం తినాలి మరి?', 'What should I eat there then?'],
    'Suggest Irani chai and biryani.', 'ఇరానీ చాయ్, బిర్యానీ తినండి.',
    ['irani chai biryani tinandi', 'biryani tinandi anna', 'irani chai tagandi', 'biryani and irani chai', 'ఇరానీ చాయ్, బిర్యానీ తినండి'],
    ['Suggest food.', 'Eat = "tinandi". Drink = "tagandi".'],
    ['అమ్మో నోరూరుతోంది! థాంక్స్ అన్నా.', 'My mouth is watering! Thanks anna.'],
    ['ఏం తినాలో చెప్పు అన్నా.', 'Say what to eat anna.']),
], ['ఆల్ ది బెస్ట్ నీ జాబ్ కి అన్నా!', 'All the best for your job anna!'],
  [['charminar hussain sagar chudandi', 'see Charminar and Hussain Sagar'], ['irani chai biryani tinandi', 'have Irani chai and biryani']], ['అన్నా, ఇంకా ఎక్కడికి వెళ్ళాలి?', 'Anna, where else should I go?'], 2);

export const rickshawDriver = P('east-road-rickshaw-driver', 'Narender', 'auto driver', 'by the east road', 'm', 'Tell him you are not travelling, thanks.', [
  S('fare', ['ఆటో కావాలా సార్? ఎక్కడికైనా వెళ్తా.', 'Need an auto, sir? I will go anywhere.'],
    'Say no thanks, you are walking.', 'వద్దు అన్నా, నేను నడిచి వెళ్తాను.',
    ['vaddu anna nenu nadichi veltanu', 'vaddu anna thanks', 'vaddandi nenu nadustanu', 'auto vaddu anna', 'వద్దు అన్నా, నేను నడిచి వెళ్తాను'],
    ['Decline politely.', 'No = "vaddu". I will walk = "nadichi veltanu".'],
    ['సరే సార్, అవసరమైతే పిలవండి.', 'Okay sir, call me if you need.'],
    ['కావాలా వద్దా సార్?', 'Yes or no, sir?']),
], ['బై సార్, జాగ్రత్తగా నడవండి!', 'Bye sir, walk carefully!'],
  [['vaddu anna nenu nadichi veltanu', 'no thanks, I will walk']], ['సార్, ఇప్పుడైనా ఆటో కావాలా?', 'Sir, auto now?']);

export const shopper = P('bridge-road-shopper', 'Sarala', 'woman with shopping', 'open ground near the bridge west road', 'f', 'Tell her which bus goes to the city.', [
  S('bus', ['కాళ్ళు నొప్పులు, బస్సు ఎప్పుడు వస్తుందో!', 'My legs ache, when will the bus come!'],
    'Say the bus stop is just ahead.', 'బస్ స్టాప్ ఇంకొంచెం ముందే ఉంది.',
    ['bus stop inkonchem munde undi', 'bus stop munde undi', 'konchem munduki vellandi stop undi', 'bus stop daggara undi', 'బస్ స్టాప్ ఇంకొంచెం ముందే ఉంది'],
    ['Point her ahead.', 'A little ahead = "inkonchem munde".'],
    ['అయ్యో థాంక్స్ బాబూ, అంత దూరం నడవాలా!', 'Thanks dear, I have to walk that far!'],
    ['ఎక్కడ ఉందో చెప్పు బాబూ.', 'Tell me where it is, dear.']),
  S('bag', ['ఈ సంచి కొంచెం పట్టుకుంటావా?', 'Will you hold this bag a little?'],
    'Say yes, of course.', 'అయ్యో, తప్పకుండా పట్టుకుంటాను.',
    ['tappakunda pattukuntanu', 'sare pattukuntanu amma', 'ivvandi pattukuntanu', 'ok sanchi ivvandi', 'తప్పకుండా పట్టుకుంటాను'],
    ['Agree to help.', 'Surely = "tappakunda".'],
    ['నువ్వు మంచి అబ్బాయివి. ఇదిగో.', 'You are a good boy. Here.'],
    ['పట్టుకుంటావా లేదా బాబూ?', 'Will you hold it or not dear?']),
], ['జాగ్రత్తగా వెళ్ళు బాబూ, నీకు శుభం.', 'Take care dear, may you be well.'],
  [['bus stop inkonchem munde undi', 'the bus stop is a little ahead'], ['tappakunda pattukuntanu', 'sure, I will hold it']], ['బాబూ, బస్సు వచ్చిందా?', 'Dear, has the bus come?'], 2);

export const vegWoman = P('chawl-lane-vegetable-woman', 'Gangamma', 'vegetable woman', 'lane near an old-city house block', 'f', 'Ask the price of brinjal.', [
  S('veg', ['వంకాయలు, బెండకాయలు, టమోటాలు! తాజా కూరగాయలు!', 'Brinjal, okra, tomatoes! Fresh vegetables!'],
    'Ask the price of brinjal per kilo.', 'వంకాయలు కిలో ఎంత?',
    ['vankayalu kilo enta', 'vankayalu enta amma', 'baigan kilo enta', 'kilo vankaya enta', 'వంకాయలు కిలో ఎంత'],
    ['Ask the price.', 'Brinjal = "vankaya". Per kilo = "kilo".'],
    ['కిలో నలభై రూపాయలు బాబూ. మంచివి ఇవి.', 'Forty rupees a kilo, dear. These are good.'],
    ['ఏ కూర అడుగుతున్నావు బాబూ?', 'Which vegetable are you asking, dear?']),
  S('gossip', ['ఆ మూల ఇంట్లో కొత్త కుటుంబం వచ్చిందట, తెలుసా?', 'A new family came to that corner house, you know?'],
    'Say you are new here too.', 'నేను కూడా ఇక్కడ కొత్త.',
    ['nenu kuda ikkada kotta', 'nenu kuda kotta amma', 'nenu kuda ikkada kottaga vachanu', 'nenu new ikkada', 'నేను కూడా ఇక్కడ కొత్త'],
    ['Say you are new.', 'New = "kotta". Me too = "nenu kuda".'],
    ['అవునా! అయితే కూరగాయలు ఇక్కడే కొనుక్కో.', 'Is that so! Then buy vegetables here itself.'],
    ['కొత్తవాడివా? చెప్పు బాబూ.', 'Are you new? Say dear.']),
], ['రేపు మళ్ళీ రా బాబూ, ఇంకా తాజావి తెస్తా.', 'Come tomorrow dear, I will bring fresher ones.'],
  [['vankayalu kilo enta', 'how much is brinjal per kilo'], ['nenu kuda ikkada kotta', 'I am new here too']], ['బాబూ, కూరగాయలు కావాలా?', 'Dear, need vegetables?'], 2);

export const milkman = P('chawl-lane-milkman', 'Yadav', 'milkman', 'lane near an old-city house block', 'm', 'Ask how much a litre of milk costs.', [
  S('milk', ['పాలు, పాలు! పొద్దున్నే తాజా పాలు!', 'Milk, milk! Fresh milk early morning!'],
    'Ask the price per litre.', 'లీటర్ పాలు ఎంత?',
    ['litre palu enta', 'palu litre enta anna', 'oka litre palu enta', 'palu rate enta', 'లీటర్ పాలు ఎంత'],
    ['Ask the price.', 'Milk = "palu". Litre = "litre".'],
    ['లీటర్ అరవై రూపాయలు సార్.', 'Sixty rupees a litre, sir.'],
    ['ఏం అడుగుతున్నావు సార్?', 'What are you asking, sir?']),
], ['రేపు పొద్దున్నే ఇంటికి తెస్తాను సార్!', 'I will bring it to your house tomorrow morning, sir!'],
  [['litre palu enta', 'how much is a litre of milk']], ['సార్, పాలు కావాలా?', 'Sir, need milk?']);

export const battingUncle = P('field-batting-uncle', 'Murali', 'uncle practising cricket', 'open field', 'm', 'Praise his batting shot.', [
  S('shot', ['చూడండి, ఇదే నా కవర్ డ్రైవ్! ఎలా ఉంది?', 'Look, this is my cover drive! How is it?'],
    'Say his shot is superb.', 'మీ షాట్ అదిరిపోయింది అంకుల్!',
    ['mee shot adiripoyindi uncle', 'shot super uncle', 'mee batting chala bagundi uncle', 'adiripoyindi shot', 'మీ షాట్ అదిరిపోయింది అంకుల్'],
    ['Praise him.', 'Your shot = "mee shot". Superb = "adiripoyindi".'],
    ['థాంక్స్! నువ్వు కూడా ఒకసారి ప్రయత్నించు.', 'Thanks! You also try once.'],
    ['ఏమన్నావు? షాట్ గురించి చెప్పు.', 'What did you say? Tell me about the shot.']),
  S('try', ['బ్యాట్ పట్టుకో, ఒక బంతి వేస్తా!', 'Hold the bat, I will bowl one ball!'],
    'Say okay, one ball only.', 'సరే, ఒక్క బంతే వేయండి.',
    ['sare okka bantey veyandi', 'okka banti veyandi uncle', 'sare try chestanu', 'ok ball veyandi', 'సరే, ఒక్క బంతే వేయండి'],
    ['Agree.', 'One ball = "okka banti".'],
    ['శభాష్! ఇదిగో బంతి, సిద్ధంగా ఉండు!', 'Bravo! Here comes the ball, be ready!'],
    ['ఆడతావా లేదా? చెప్పు.', 'Will you play or not? Say.']),
], ['బాగా ఆడావు! ఉద్యోగం కూడా అలాగే కొట్టు!', 'You played well! Hit the job like that too!'],
  [['mee shot adiripoyindi uncle', 'your shot was superb, uncle'], ['okka banti veyandi', 'bowl just one ball']], ['సమీర్, ఇంకో బంతి?', 'Sameer, one more ball?'], 2);
