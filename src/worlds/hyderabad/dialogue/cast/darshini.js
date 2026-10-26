// Irani cafe square (the spawn square), the cricket gully and the old-city houses.
import { P, step as S } from '../kit.js';

export const bowler = P('chowk-cricket-bowler', 'Bunty', 'gully cricket bowler', 'Irani cafe square, cricket gully', 'k', 'Say the ball was not out, then agree to another over.', [
  S('out', ['అన్నా, ఆ బంతికి అవుట్ అన్నాను, ఇతను ఒప్పుకోడు!', 'Anna, I said out for that ball, he will not agree!'],
    'Say it was not out.', 'కాదు, అది నాట్ అవుట్.',
    ['kadu adi not out', 'adi not out anna', 'kadu not out bunty', 'not out anna', 'కాదు, అది నాట్ అవుట్'],
    ['Take the batter\'s side.', 'No = "kadu". Not out = "not out".'],
    ['ఛీ! సరే, నువ్వు అంపైర్ కదా.', 'Ugh! Okay, you are the umpire after all.'],
    ['అవుటా, నాట్ అవుటా? చెప్పు అన్నా.', 'Out or not out? Tell me, anna.']),
  S('over', ['ఇంకో ఓవర్ ఆడతావా అన్నా?', 'Will you play one more over, anna?'],
    'Say yes, one more over.', 'సరే, ఇంకో ఓవర్ ఆడదాం.',
    ['sare inko over aadadam', 'inko over aadadam anna', 'sare aadadam inko over', 'ok inko over', 'సరే, ఇంకో ఓవర్ ఆడదాం'],
    ['Agree to play more.', 'Another over = "inko over". Let us play = "aadadam".'],
    ['ఏయ్! ఈసారి యార్కర్ వేస్తా!', 'Hey! This time I will bowl a yorker!'],
    ['ఆడతావా లేదా అన్నా?', 'Do you play or not, anna?']),
], ['బంతి వేసి వస్తా, ఇక్కడే ఉండు అన్నా!', 'I will fetch the ball, stay here anna!'],
  [['adi not out', 'that is not out'], ['inko over aadadam', 'let us play one more over']], ['అన్నా, నా బంతి చూసావా?', 'Anna, did you see my ball?']);

export const newsVendor = P('chowk-newspaper-vendor', 'Abdul Kareem', 'newspaper vendor', 'Irani cafe square, news stand', 'o', 'Ask which paper has the job ads.', [
  S('ads', ['ఈ రోజు పేపర్, ఈ రోజు పేపర్! ఏ పేపర్ కావాలి?', "Today's paper, today's paper! Which paper do you want?"],
    'Ask which paper has the job ads.', 'ఉద్యోగ ప్రకటనలు ఏ పేపర్ లో ఉంటాయి?',
    ['udyoga prakatanalu ye paper lo untayi', 'job ads ye paper lo untayi', 'job ads ekkada untayi anna', 'ye paper lo jobs untayi', 'ఉద్యోగాల ప్రకటనలు ఏ పేపర్ లో'],
    ['Ask about job ads.', 'Job = "udyogam". Which paper = "ye paper".'],
    ['గురువారం పేపర్ లో ఎక్కువ ఉంటాయి బాబూ. ఈ రోజు కొనుక్కో.', 'Thursday paper has more, dear. Buy today\'s one anyway.'],
    ['ఏం పేపర్ కావాలో అడుగు బాబూ.', 'Ask which paper you need, dear.']),,
  S('paper', ['కావాలంటే ఈ పేపర్ కొనుక్కో బాబూ, పది రూపాయలే.', 'Buy this paper if you like, dear, only ten rupees.'],
    'Ask for a Telugu paper.', 'ఒక తెలుగు పేపర్ ఇవ్వండి.',
    ['oka telugu paper ivvandi', 'telugu paper ivvandi tatagaru', 'oka paper ivvandi', 'telugu dinapatrika ivvandi', 'ఒక తెలుగు పేపర్ కావాలి'],
    ['Ask for a paper.', 'Telugu paper = "telugu paper".'],
    ['ఇదిగో బాబూ, నేటి పేపర్. జాబ్ పేజీ మూడో పేజీలో ఉంది.', 'Here dear, todays paper. The job page is on page three.'],
    ['ఏ పేపర్ కావాలి బాబూ?', 'Which paper do you want, dear?'])
], ['అన్ని షాపుల కబుర్లు నాకే తెలుసు, మళ్ళీ రా!', 'I know the gossip of every shop, come again!'],
  [['job ads ye paper lo untayi', 'which paper has job ads']], ['బాబూ, ఉద్యోగం దొరికిందా?', 'Dear, did you find a job?']);

export const skipGirl = P('chowk-skip-girl', 'Pinky', 'skipping girl', 'Irani cafe square, open ground by the bajji cart', 'k', 'Ask how many skips she can do.', [
  S('count', ['ఒకటి, రెండు, మూడు... నేను వంద సార్లు ఎగరగలను!', 'One, two, three... I can skip a hundred times!'],
    'Ask how many times she can skip.', 'నువ్వు ఎన్ని సార్లు ఎగరగలవు?',
    ['nuvvu enni sarlu egaragalavu', 'enni sarlu egaruthav', 'nuvvu enni sarlu skip chestav', 'enni sarlu skip', 'నువ్వు ఎన్ని సార్లు ఎగరగలవు'],
    ['Ask her count.', 'How many times = "enni sarlu".'],
    ['నూరు! నువ్వు కూడా ట్రై చెయ్యి!', 'Hundred! You try too!'],
    ['ఏమన్నావు? నేను లెక్కపెడుతున్నా.', 'What did you say? I am counting.']),
  S('try', ['నువ్వు కూడా ఎగురుతావా? తాడు ఇవ్వనా?', 'Will you skip too? Shall I give the rope?'],
    'Say you will try once.', 'సరే, నేను ఒక్కసారి ప్రయత్నిస్తాను.',
    ['sare nenu okkasari prayatnistanu', 'nenu okkasari try chestanu', 'sare okkasari chestanu', 'ivvu nenu try chestanu', 'సరే, నేను ఒక్కసారి ప్రయత్నిస్తాను'],
    ['Agree to try.', 'Once = "okkasari". I will try = "prayatnistanu".'],
    ['అయ్యో! తాడు కాళ్ళకి తగిలింది! హహ.', 'Oops! The rope got your feet! Haha.'],
    ['ఎగురుతావా, లేదా? చెప్పు.', 'Will you skip or not? Say.']),
], ['రేపు కూడా రా, పోటీ పెడదాం!', 'Come tomorrow too, let us have a contest!'],
  [['nuvvu enni sarlu egaragalavu', 'how many times can you skip'], ['nenu try chestanu', 'I will try']], ['అన్నయ్యా, మళ్ళీ ఆడదామా?', 'Brother, shall we play again?']);

export const kiteBoy = P('chowk-kite-boy', 'Sai', 'kite-flying boy', 'Irani cafe square, lane south of the cafe', 'k', 'Warn him about the wires.', [
  S('wires', ['అన్నా, నా గాలిపటం తీగలకు చిక్కుకుంటుందేమో!', 'Anna, my kite might get stuck in the wires!'],
    'Tell him to fly it away from the wires.', 'తీగల దగ్గర ఎగరేయకు, అటు వెళ్ళు.',
    ['teegala daggara egareyaku atu vellu', 'teegalu unnayi egareyaku', 'teegala daggara vaddu', 'atu egareyyi', 'తీగల దగ్గర ఎగరేయకు'],
    ['Warn him.', 'Do not fly = "egareyaku". Wires = "teegalu".'],
    ['సరే అన్నా, మైదానంలోకి వెళ్తా. థాంక్స్!', 'Okay anna, I will go to the open ground. Thanks!'],
    ['ఏమన్నావు అన్నా? గాలిపటం చూస్తున్నా.', 'What did you say anna? I am watching the kite.']),,
  S('later', ['నువ్వు కూడా గాలిపటం ఎగరేస్తావా అన్నా?', 'Will you fly a kite too, anna?'],
    'Say you will fly one later.', 'తర్వాత నేనూ ఎగరేస్తాను.',
    ['tarvata nenu kuda egareestanu', 'nenu kuda egareestanu tarvata', 'tarvata egareestanu anna', 'tarvata nenu try chestanu', 'తర్వాత నేనూ ఎగరేస్తాను'],
    ['Promise to try.', 'Later = "tarvata". I will fly = "egareestanu".'],
    ['సరే అన్నా, నా గాలిపటం ఇస్తా!', 'Okay anna, I will lend you my kite!'],
    ['ఎగరేస్తావా లేదా అన్నా?', 'Will you fly or not anna?'])
], ['ఎగురుతోంది అన్నా, చూడు! చూడు!', 'It is flying anna, look! Look!'],
  [['teegala daggara egareyaku', 'do not fly near the wires']], ['అన్నా, నా గాలిపటం ఎంత పైకి వెళ్ళిందో చూడు!', 'Anna, see how high my kite went!']);

export const carromMan = P('chawl-carrom-man', 'Venkat', 'carrom player', 'Old-city house balcony', 'm', 'Ask who is winning, then ask to watch one game.', [
  S('score', ['బాల్కనీలో కేరమ్స్ ఆడుతున్నాం, ఏంటి చూస్తున్నావు?', 'We are playing carrom on the balcony, what are you looking at?'],
    'Ask who is winning.', 'ఎవరు గెలుస్తున్నారు?',
    ['evaru gelustunnaru', 'evaru gelustunnaru anna', 'ee game lo evaru win', 'evaru munduna unnaru', 'ఎవరు గెలుస్తున్నారు'],
    ['Ask who is ahead.', 'Who = "evaru". Winning = "gelustunnaru".'],
    ['నేనే ముందున్నా, కానీ ఈ తాత మోసం చేస్తాడు!', 'I am ahead, but this old man cheats!'],
    ['ఏమన్నావు? స్ట్రైకర్ కి గురి పెడుతున్నా.', 'What did you say? I am aiming the striker.']),
  S('watch', ['ఇంకో గేమ్ ఉంది. కూర్చుంటావా?', 'There is one more game. Will you sit?'],
    'Say you will watch one game.', 'సరే, ఒక్క గేమ్ చూస్తాను.',
    ['sare okka game chustanu', 'okka game chustanu anna', 'sare chustanu', 'oka game chusi vastanu', 'సరే, ఒక్క గేమ్ చూస్తాను'],
    ['Agree to watch.', 'One game = "okka game". I will watch = "chustanu".'],
    ['రా, ఇక్కడ కూర్చో. ఈసారి క్వీన్ నాదే!', 'Come, sit here. The queen is mine this time!'],
    ['కూర్చుంటావా లేదా? చెప్పు.', 'Will you sit or not? Say.']),
], ['ఉద్యోగం వచ్చాక వచ్చి ఆడు, మనకి టోర్నమెంట్ ఉంది!', 'Come play once you get a job, we have a tournament!'],
  [['evaru gelustunnaru', 'who is winning'], ['okka game chustanu', 'I will watch one game']], ['ఏం సమీర్, ఈసారి ఆడతావా?', 'Hey Sameer, will you play this time?'], 2);

export const carromElder = P('chawl-carrom-elder', 'Bashir Saab', 'elder carrom player', 'Old-city house balcony', 'o', 'Ask him for a tip to win at carrom.', [
  S('tip', ['నెమ్మదిగా ఆడాలి బాబూ, తొందర వద్దు. ఇది నా పద్ధతి.', 'Play slowly, dear, no hurry. This is my method.'],
    'Ask for a tip to win.', 'గెలవడానికి ఒక చిట్కా చెప్పండి.',
    ['gelavadaniki oka chitka cheppandi', 'oka tip cheppandi', 'ela gelavali cheppandi', 'gelavadaniki tip ivvandi', 'గెలవడానికి ఒక చిట్కా చెప్పండి'],
    ['Ask for advice.', 'A tip = "oka chitka". To win = "gelavadaniki".'],
    ['ఓపిక, బాబూ ఓపిక! ఉద్యోగ వేటకీ అదే సూత్రం.', 'Patience, dear, patience! Same rule for job hunting.'],
    ['ఏం అడుగుతున్నావు బాబూ? చెవులు సరిగా వినవు.', 'What are you asking, dear? My ears are not great.']),
], ['ఓపికగా ఉండు బాబూ, అంతా మంచే జరుగుతుంది.', 'Stay patient, dear, all will go well.'],
  [['oka chitka cheppandi', 'tell me a tip']], ['బాబూ, ఒక ఆట ఆడతావా?', 'Dear, will you play a game?']);

export const tapWoman = P('chawl-tap-woman', 'Fatima Bee', 'woman at the common tap', 'Old-city house, common tap', 'f', 'Ask what time the water comes.', [
  S('water', ['ఉదయం ఆరింటికి నీళ్ళు వస్తాయి, ఇప్పుడు క్యూ ఉంది.', 'Water comes at six in the morning, there is a queue now.'],
    'Ask what time the water comes.', 'నీళ్ళు ఏ టైమ్ కి వస్తాయి?',
    ['neellu ye time ki vastayi', 'neellu enni gantalaku vastayi', 'water ye time ki vastundi', 'neellu eppudu vastayi', 'నీళ్ళు ఏ టైమ్ కి వస్తాయి'],
    ['Ask about the timing.', 'Water = "neellu". Which time = "ye time".'],
    ['రెండు సార్లు బాబూ, ఉదయం ఆరు, సాయంత్రం ఐదు.', 'Twice, dear, six in the morning and five in the evening.'],
    ['ఏమన్నావు బాబూ? కుండలు చూసుకుంటున్నా.', 'What did you say dear? I am minding my pots.']),
  S('room', ['నువ్వు కొత్తగా వచ్చినట్టున్నావు. ఇల్లు చూస్తున్నావా?', 'You seem new here. Looking for a house?'],
    'Say yes, you are looking for a room.', 'అవును, నేను ఒక గది వెతుకుతున్నాను.',
    ['avunu nenu oka gadi vetukutunnanu', 'avunu room vetukutunnanu', 'oka room kavali madam', 'room chustunnanu', 'అవును, నేను ఒక గది వెతుకుతున్నాను'],
    ['Say yes and what you need.', 'Room = "gadi". I am looking = "vetukutunnanu".'],
    ['ఇదే వీధిలో ఒక గది ఖాళీగా ఉంది, అడుగు.', 'A room is empty on this very street, ask there.'],
    ['గది కావాలా? చెప్పు బాబూ.', 'Need a room? Tell me, dear.']),
], ['ఏదైనా కావాలంటే అడుగు బాబూ.', 'Ask me if you need anything, dear.'],
  [['neellu ye time ki vastayi', 'what time does the water come'], ['oka gadi vetukutunnanu', 'I am looking for a room']], ['బాబూ, గది దొరికిందా?', 'Dear, did you find a room?'], 2);

export const vadaCustomer = P('chowk-vada-customer', 'Rohit', 'school boy', 'Irani cafe square, customer side of the bajji cart', 'k', 'Ask if the bajji is spicy.', [
  S('spicy', ['అన్నా, ఈ బజ్జీ కారంగా ఉంటుందా?', 'Anna, will this bajji be spicy?'],
    'Tell him it is a bit spicy but tasty.', 'కొంచెం కారం, కానీ చాలా రుచిగా ఉంటుంది.',
    ['konchem karam kani chala ruchiga untundi', 'karam ga untundi kani bagutundi', 'konchem karam untundi', 'ruchiga untundi konchem karam', 'కొంచెం కారం, కానీ రుచిగా ఉంటుంది'],
    ['Describe the taste.', 'A bit spicy = "konchem karam". Tasty = "ruchiga".'],
    ['సరే అన్నా, తిని చూస్తా. పాకెట్ మనీ ఉంది!', 'Okay anna, I will try. I have pocket money!'],
    ['కారమా, కాదా అన్నా? చెప్పు.', 'Spicy or not, anna? Tell me.']),
], ['థాంక్స్ అన్నా, స్కూల్ కి లేట్ అవుతోంది!', 'Thanks anna, I am getting late for school!'],
  [['konchem karam kani ruchiga untundi', 'a bit spicy but tasty']], ['అన్నా, బజ్జీ బాగుంది!', 'Anna, the bajji is nice!']);

export const fruitSeller = P('chowk-fruit-seller', 'Pochamma', 'fruit seller', 'Irani cafe square, fruit cart', 'f', 'Ask the price of sapota and buy half a kilo.', [
  S('price', ['సపోటా, బత్తాయి, అరటి పండ్లు! తీసుకోండి సార్!', 'Sapota, sweet lime, bananas! Take some, sir!'],
    'Ask the price of sapota.', 'సపోటా కిలో ఎంత?',
    ['sapota kilo enta', 'sapota kilo enta amma', 'sapota rate enta', 'kilo sapota enta', 'సపోటా కిలో ఎంత'],
    ['Ask the price per kilo.', 'Kilo = "kilo". How much = "enta".'],
    ['ఎనభై రూపాయలు కిలో. తాజావి!', 'Eighty rupees a kilo. Fresh ones!'],
    ['ఏ పండు అడుగుతున్నావు సార్?', 'Which fruit are you asking, sir?']),
  S('buy', ['ఎంత కావాలి సార్?', 'How much do you want, sir?'],
    'Ask for half a kilo.', 'అర కిలో ఇవ్వండి.',
    ['ara kilo ivvandi', 'ara kilo sapota ivvandi', 'ara kilo kavali amma', 'half kilo ivvandi', 'అర కిలో ఇవ్వండి'],
    ['Ask for half a kilo.', 'Half = "ara". Give = "ivvandi".'],
    ['ఇదిగో అర కిలో. తీపిగా ఉంటాయి సార్.', 'Here is half a kilo. They are sweet, sir.'],
    ['ఎంత కావాలి? చెప్పండి సార్.', 'How much do you want? Tell me, sir.']),
], ['పండ్లు తింటే ఇంటర్వ్యూలో జోష్ ఉంటుంది సార్!', 'Eat fruit and you will have energy in the interview, sir!'],
  [['sapota kilo enta', 'how much is a kilo of sapota'], ['ara kilo ivvandi', 'give me half a kilo']], ['సార్, ఇంకా పండ్లు కావాలా?', 'Sir, want more fruit?'], 2);

export const flowerSeller = P('chowk-marigold-seller', 'Parvathi', 'flower-garland seller', 'Irani cafe square, flower stall', 'f', 'Ask for a jasmine string.', [
  S('jasmine', ['మల్లెపూలు, బంతిపూల మాలలు! ఏం కావాలి?', 'Jasmine and marigold garlands! What do you need?'],
    'Ask for one jasmine string.', 'ఒక మల్లెపూల దండ ఇవ్వండి.',
    ['oka mallepoola danda ivvandi', 'oka malle danda ivvandi', 'mallepoolu ivvandi amma', 'oka jasmine danda', 'ఒక మల్లెపూల దండ ఇవ్వండి'],
    ['Ask for jasmine.', 'Jasmine = "malle". String = "danda".'],
    ['ఇదిగో, ఘుమఘుమలాడే మల్లెలు. పది రూపాయలు.', 'Here, fragrant jasmine. Ten rupees.'],
    ['ఏ పూలు కావాలి? మళ్ళీ చెప్పండి.', 'Which flowers? Say again.']),,
  S('price', ['ఇంకా ఏమైనా కావాలా? గుడికి పువ్వులు?', 'Anything else? Flowers for the temple?'],
    'Ask how much the jasmine is.', 'ఇవి ఎంత అయ్యాయి అమ్మా?',
    ['ivi enta ayyayi amma', 'enta ayindi amma', 'mallepoolu enta amma', 'ivi enta amma', 'ఇవి ఎంత అయ్యాయి అమ్మా'],
    ['Ask the price.', 'How much = "enta".'],
    ['పది రూపాయలు బాబూ, చాలా చవక.', 'Ten rupees dear, very cheap.'],
    ['ధర అడుగుతున్నావా బాబూ?', 'Are you asking the price, dear?'])
], ['గుడికి వెళ్ళేటప్పుడు తప్పకుండా పూలు తీసుకెళ్ళండి.', 'Do take flowers when you go to the temple.'],
  [['oka mallepoola danda ivvandi', 'give me one jasmine string']], ['బాబూ, మళ్ళీ పూలు కావాలా?', 'Dear, want flowers again?']);

export const newsReader = P('chowk-news-reader', 'Gopal Rao', 'elderly newspaper reader', 'Irani cafe square, news stand', 'o', 'Ask what the news is today.', [
  S('news', ['ఈ రాజకీయాలు చూడు, ఏం జరుగుతోందో!', 'Look at this politics, what is happening!'],
    'Ask what the main news is today.', 'ఈ రోజు ముఖ్యమైన వార్త ఏమిటి?',
    ['ee roju mukhyamaina varta emiti', 'ee roju varta enti', 'ee roju news enti', 'mukhyamaina varta enti tatagaru', 'ఈ రోజు వార్త ఏంటి'],
    ['Ask about the news.', 'Today = "ee roju". News = "varta".'],
    ['మెట్రో ఛార్జీలు పెరిగాయట. ఉద్యోగాల వార్తలు కూడా ఉన్నాయి.', 'Metro fares have gone up. There is job news too.'],
    ['ఏం చదవమంటావు బాబూ? మళ్ళీ అడుగు.', 'What should I read, dear? Ask again.']),,
  S('habit', ['నువ్వు కూడా పేపర్ చదువుతావా?', 'Do you read the paper too?'],
    'Say yes, every morning.', 'అవును, ప్రతి ఉదయం చదువుతాను.',
    ['avunu prati udayam chaduvutanu', 'prati udayam chaduvutanu', 'roju udayam paper chaduvutanu', 'avunu roju chaduvutanu', 'అవును, ప్రతి ఉదయం చదువుతాను'],
    ['Say how often.', 'Every morning = "prati udayam".'],
    ['మంచి అలవాటు! అందుకే నువ్వు తెలివైనవాడివి.', 'Good habit! That is why you are clever.'],
    ['చదువుతావా లేదా బాబూ?', 'Do you read or not, dear?'])
], ['పేపర్ చదివే అలవాటు పెట్టుకో బాబూ.', 'Make a habit of reading the paper, dear.'],
  [['ee roju varta enti', 'what is the news today']], ['బాబూ, పేపర్ చదివావా?', 'Dear, have you read the paper?']);

export const rangoliGirl = P('chowk-rangoli-girl', 'Meghana', 'little girl drawing muggu', 'Irani cafe square, beside the muggu', 'k', 'Say her muggu is pretty and ask which flower it is.', [
  S('pretty', ['చూడు అన్నా, నేను ముగ్గు వేస్తున్నా!', 'Look anna, I am drawing a muggu!'],
    'Say her muggu is beautiful.', 'నీ ముగ్గు చాలా అందంగా ఉంది.',
    ['nee muggu chala andanga undi', 'muggu chala bagundi', 'nee muggu super ga undi', 'chala andanga undi muggu', 'నీ ముగ్గు చాలా అందంగా ఉంది'],
    ['Compliment her.', 'Your muggu = "nee muggu". Beautiful = "andanga".'],
    ['థాంక్స్ అన్నా! పండుగకి ఇంకా పెద్దది వేస్తా.', 'Thanks anna! I will draw a bigger one for the festival.'],
    ['ఏమన్నావు అన్నా? నేను ముగ్గులో ఉన్నా.', 'What did you say anna? I am in my muggu.']),
  S('shape', ['ఈ ముగ్గు ఏంటో చెప్పు చూద్దాం?', 'Guess what this muggu is?'],
    'Guess that it is a flower.', 'ఇది పువ్వు కదా?',
    ['idi puvvu kada', 'idi oka puvvu kada', 'puvvu kada idi', 'idi flower kada', 'ఇది పువ్వు కదా'],
    ['Make a guess.', 'Flower = "puvvu". Is it not = "kada".'],
    ['అవును! తామర పువ్వు! నువ్వు తెలివైనవాడివి.', 'Yes! A lotus! You are clever.'],
    ['ఏంటో చెప్పు అన్నా, ఊహించు.', 'Say what it is anna, guess.']),
], ['ముగ్గు తొక్కకు అన్నా, నాకు కోపం వస్తుంది!', 'Do not step on my muggu anna, I will get angry!'],
  [['nee muggu chala andanga undi', 'your muggu is very pretty'], ['idi puvvu kada', 'this is a flower, right']], ['అన్నా, ఇంకో ముగ్గు వేయనా?', 'Anna, shall I draw another muggu?'], 2);

export const flagDevotee = P('chowk-ganpati-devotee', 'Vijaya', 'woman at the festival poster', 'Irani cafe square, festival poster', 'f', 'Ask when the Bathukamma festival starts.', [
  S('date', ['బతుకమ్మ, బోనాలు వచ్చేస్తున్నాయి. పోస్టర్ చూడు.', 'Bathukamma and Bonalu are coming. See the poster.'],
    'Ask when Bathukamma starts.', 'బతుకమ్మ ఎప్పుడు మొదలవుతుంది?',
    ['bathukamma eppudu modalavutundi', 'bathukamma eppudu start', 'bathukamma ye roju amma', 'bathukamma ela eppudu', 'బతుకమ్మ ఎప్పుడు మొదలవుతుంది'],
    ['Ask about the start.', 'When = "eppudu". Starts = "modalavutundi".'],
    ['వచ్చే ఆదివారం నుంచి తొమ్మిది రోజులు. పూలు పేర్చుతాం.', 'From next Sunday for nine days. We stack flowers.'],
    ['ఏ పండుగ బాబూ? స్పష్టంగా అడుగు.', 'Which festival, dear? Ask clearly.']),
], ['పండుగకి తప్పకుండా రా బాబూ, ప్రసాదం ఉంటుంది.', 'Do come for the festival, dear, there will be prasadam.'],
  [['bathukamma eppudu modalavutundi', 'when does Bathukamma start']], ['బాబూ, ఈసారి పండుగకి వస్తావా?', 'Dear, will you come for the festival this time?']);

export const tagKid1 = P('chowk-tag-kid-1', 'Tinku', 'playing boy', 'Irani cafe square, open ground east of the cafe', 'k', 'Say you cannot catch him, he is too fast.', [
  S('fast', ['నన్ను పట్టుకో అన్నా! పట్టుకోలేవు!', 'Catch me anna! You cannot catch me!'],
    'Say he is too fast.', 'నువ్వు చాలా వేగంగా పరిగెడుతున్నావు.',
    ['nuvvu chala veganga parigedutunnav', 'nuvvu chala fast ga parugettav', 'chala vegam ga parigeduthunnav', 'chala fast ga unnav', 'నువ్వు చాలా వేగంగా పరిగెడుతున్నావు'],
    ['Say how fast he is.', 'Fast = "veganga". You run = "parigedutunnav".'],
    ['హహ! నేనే ఛాంపియన్!', 'Haha! I am the champion!'],
    ['నన్ను పట్టుకో అన్నా! వినపడలేదా?', 'Catch me anna! Could you not hear?']),
], ['అలిసిపోయా అన్నా, ఆగుతా!', 'I am tired anna, I will stop!'],
  [['nuvvu chala veganga parigedutunnav', 'you run very fast']], ['అన్నా, మన ఆట ఇంకా అవ్వలేదు!', 'Anna, our game is not over yet!']);

export const tagKid2 = P('chowk-tag-kid-2', 'Chinni', 'playing girl', 'Irani cafe square, open ground east of the cafe', 'k', 'Ask her name and say yours.', [
  S('name', ['నన్ను పట్టుకో! నువ్వు ఎవరు అన్నా?', 'Catch me! Who are you anna?'],
    'Say your name is Sameer.', 'నా పేరు సమీర్.',
    ['naa peru sameer', 'nenu sameer', 'naa peru sameer chinni', 'sameer naa peru', 'నా పేరు సమీర్'],
    ['Tell her your name.', 'My name = "naa peru".'],
    ['సమీర్ అన్నా! నా పేరు చిన్ని.', 'Sameer anna! My name is Chinni.'],
    ['పేరు చెప్పు అన్నా, నాకు తెలియాలి.', 'Tell me your name anna, I want to know.']),
  S('catch', ['సరే సమీర్ అన్నా, ఇప్పుడు నన్ను పట్టుకో!', 'Okay Sameer anna, now catch me!'],
    'Say you will catch her.', 'నేను నిన్ను పట్టుకుంటాను.',
    ['nenu ninnu pattukuntanu', 'ninnu pattukuntanu chinni', 'nenu pattukuntanu', 'ninnu pattukuntanu ra', 'నేను నిన్ను పట్టుకుంటాను'],
    ['Accept the challenge.', 'Catch = "pattukuntanu". You = "ninnu".'],
    ['పట్టుకోలేవు! పట్టుకోలేవు!', 'You cannot catch me! You cannot!'],
    ['పట్టుకుంటావా లేదా అన్నా?', 'Will you catch me or not anna?']),
], ['బై అన్నా! రేపు మళ్ళీ ఆడదాం!', 'Bye anna! Let us play again tomorrow!'],
  [['nenu sameer', 'I am Sameer'], ['ninnu pattukuntanu', 'I will catch you']], ['సమీర్ అన్నా, ఇక్కడే ఉన్నావా?', 'Sameer anna, are you still here?'], 2);

export const grandma = P('chawl-grandma-doorstep', 'Ammamma', 'old-city grandmother', 'Old-city house doorstep', 'o', 'Greet her and say you have eaten.', [
  S('eaten', ['రా నాన్నా, భోజనం చేసావా? ఏమైనా తింటావా?', 'Come my child, have you eaten? Will you eat something?'],
    'Say you have already eaten.', 'తిన్నాను అమ్మమ్మా, ధన్యవాదాలు.',
    ['tinnanu ammamma dhanyavadalu', 'tinnanu ammamma', 'bhojanam chesanu ammamma', 'ippude tinnanu thanks ammamma', 'తిన్నాను అమ్మమ్మా'],
    ['Say you have eaten.', 'I ate = "tinnanu". Grandmother = "ammamma".'],
    ['అయ్యో, ఒక్క ముద్దన్నా తిను! కాస్త సన్నగా ఉన్నావు.', 'Oh, at least eat a mouthful! You look thin.'],
    ['తిన్నావా లేదా నాన్నా? చెప్పు.', 'Have you eaten or not, child? Say.']),
  S('wish', ['ఉద్యోగ ప్రయత్నాలు ఎలా సాగుతున్నాయి నాన్నా?', 'How is the job search going, my child?'],
    'Say it is going well.', 'బాగా సాగుతున్నాయి, ఆశీర్వదించండి.',
    ['baga sagutunnayi ashirvadinchandi', 'baga jarugutundi ammamma', 'baagane unnayi ashirvadam', 'chala bagundi ammamma', 'బాగా సాగుతున్నాయి'],
    ['Reply and ask for her blessing.', 'Going well = "baga sagutunnayi". Bless = "ashirvadinchandi".'],
    ['నీకు మంచి ఉద్యోగం వస్తుంది, నా ఆశీర్వాదం ఉంది.', 'You will get a good job, you have my blessing.'],
    ['ఏమన్నావు నాన్నా? మళ్ళీ చెప్పు.', 'What did you say child? Say again.']),
], ['జాగ్రత్తగా ఉండు నాన్నా, భోజనానికి రా.', 'Take care my child, come for a meal.'],
  [['tinnanu ammamma', 'I have eaten, grandma'], ['ashirvadinchandi', 'please bless me']], ['నాన్నా, ఇవాళ ఎక్కడికి?', 'Child, where to today?'], 2);

export const laneSweeper = P('chawl-lane-sweeper', 'Yellamma', 'lane sweeper', 'Old-city house lanes', 'f', 'Say the lane looks clean.', [
  S('clean', ['పొద్దున్నే వీధి ఊడుస్తున్నా బాబూ. చూడు ఎంత దుమ్ము!', 'I sweep the street at dawn, dear. See how much dust!'],
    'Say the lane looks very clean.', 'వీధి చాలా శుభ్రంగా ఉంది.',
    ['veedhi chala shubhranga undi', 'veedhi chala clean ga undi', 'veedhi baga undi amma', 'chala shubhram ga undi', 'వీధి చాలా శుభ్రంగా ఉంది'],
    ['Say it is clean.', 'Street = "veedhi". Clean = "shubhranga".'],
    ['థాంక్స్ బాబూ, ఎవరూ చెప్పరు ఇలా.', 'Thanks dear, nobody ever says this.'],
    ['ఏమన్నావు బాబూ? చీపురు శబ్దంలో వినపడలేదు.', 'What did you say, dear? The broom noise drowned it.']),
], ['జాగ్రత్తగా నడువు బాబూ, తడిగా ఉంది.', 'Walk carefully dear, it is wet.'],
  [['veedhi chala shubhranga undi', 'the street is very clean']], ['బాబూ, ఈ వైపు రాకు, ఊడుస్తున్నా.', 'Dear, do not come this way, I am sweeping.']);
