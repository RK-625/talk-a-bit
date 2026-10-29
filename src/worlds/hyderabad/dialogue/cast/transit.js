// Hyderabad Metro station and the Durgam Cheruvu bridge toll plaza.
import { P, step as S } from '../kit.js';

export const stationCoffee = P('station-chaiwala', 'Salman', 'platform chai seller', 'Hyderabad Metro station, platform chai stall', 'm', 'Order a cup of chai and ask for it with less sugar.', [
  S('chai', ['చాయ్, చాయ్! గరం చాయ్, ప్లాట్ఫామ్ పైన!', 'Chai, chai! Hot chai, on the platform!'],
    'Order one cup of chai.', 'ఒక కప్పు చాయ్ ఇవ్వండి.',
    ['oka cuppu chai ivvandi', 'oka chai ivvandi bhai', 'oka cup chai kavali', 'bhai oka chai', 'ఒక కప్పు చాయ్ ఇవ్వండి'],
    ['Order one cup.', 'Cup = "cuppu". Chai = "chai".'],
    ['ఇదిగో బాబూ, వేడిగా ఉంది, జాగ్రత్త.', 'Here dear, it is hot, careful.'],
    ['ఏం కావాలి? చాయ్ కావాలా?', 'What do you want? Chai?']),
  S('sugar', ['చక్కెర ఎక్కువ వేయనా?', 'Shall I put extra sugar?'],
    'Ask for less sugar.', 'చక్కెర తక్కువ వేయండి.',
    ['chakkera takkuva veyandi', 'sugar takkuva veyandi', 'takkuva chakkera bhai', 'konchem chakkera chalu', 'చక్కెర తక్కువ వేయండి'],
    ['Ask for less.', 'Sugar = "chakkera". Less = "takkuva".'],
    ['సరే, తక్కువ చక్కెర. ఆరోగ్యానికి మంచిది.', 'Okay, less sugar. Good for health.'],
    ['ఎక్కువా తక్కువా? చెప్పు.', 'More or less? Say.']),
], ['మెట్రో వచ్చేస్తోంది, త్వరగా తాగి వెళ్ళు!', 'The metro is coming, drink fast and go!'],
  [['oka cuppu chai ivvandi', 'give me one cup of chai'], ['chakkera takkuva veyandi', 'less sugar please']], ['బాబూ, ఇంకో చాయ్ కావాలా?', 'Dear, another chai?'], 2);

export const womenCoach = P('station-ladies-a', 'Kavitha', 'women\'s-coach commuter', 'Hyderabad Metro station, women\'s coach marker', 'f', 'Ask her if this marker is the women\'s coach.', [
  S('coach', ['మహిళల కోచ్ ఇక్కడే ఆగుతుంది, నేను వేచి ఉన్నా.', 'The women\'s coach stops here, I am waiting.'],
    'Ask if the first coach is only for women.', 'మొదటి కోచ్ మహిళలకే కదా?',
    ['modati coach mahilalake kada', 'modati coach women ki kada', 'first coach ladies ke kada madam', 'ee coach ladies ki aa', 'మొదటి కోచ్ మహిళలకే కదా'],
    ['Check the rule.', 'First = "modati". Women = "mahilalu".'],
    ['అవును, మీరు వెనుక కోచ్ లో ఎక్కండి.', 'Yes, you board a rear coach.'],
    ['ఏమన్నారు? మళ్ళీ అడగండి.', 'What did you say? Ask again.']),
], ['జాగ్రత్తగా వెళ్ళండి, ఆల్ ది బెస్ట్!', 'Go carefully, all the best!'],
  [['modati coach mahilalake kada', 'the first coach is only for women, right']], ['మీరు ఇంకా ఇక్కడే ఉన్నారా?', 'You are still here?']);

export const benchElder = P('station-bench-elder', 'Raghavaiah', 'elderly passenger', 'Hyderabad Metro station, platform bench', 'o', 'Ask which metro goes to Ameerpet.', [
  S('ameerpet', ['అమీర్ పేట్ వెళ్ళే మెట్రో కోసం చూస్తున్నా, ఇంకా రాలేదు.', 'I am waiting for the Ameerpet metro, it has not come yet.'],
    'Tell him the next train is coming soon.', 'తర్వాత ట్రైన్ త్వరలో వస్తుంది.',
    ['tarvata train tvaralo vastundi', 'next train tvaralo vastundi', 'train tondaraga vastundi', 'inka konchem sepu train vastundi', 'తర్వాత ట్రైన్ త్వరలో వస్తుంది'],
    ['Reassure him.', 'Soon = "tvaralo". Comes = "vastundi".'],
    ['అవునా, థాంక్స్ బాబూ. కాళ్ళ నొప్పులు ఉన్నాయి.', 'Is that so, thanks dear. My legs are aching.'],
    ['ఏం చెప్పావు బాబూ? వినపడలేదు.', 'What did you say dear? I could not hear.']),
], ['జాగ్రత్తగా వెళ్ళు బాబూ, ఉద్యోగం వస్తుంది.', 'Go carefully dear, you will get a job.'],
  [['tarvata train tvaralo vastundi', 'the next train comes soon']], ['బాబూ, ఏ ట్రైన్ ఎక్కావు?', 'Dear, which train did you board?']);

export const lateCommuter = P('station-commuter-2', 'Naveen', 'office-goer', 'Hyderabad Metro station, near the platform board', 'q', 'Tell him the board shows the next train in two minutes.', [
  S('late', ['అయ్యో, స్టాండ్-అప్ కి లేట్ అవుతోంది! ట్రైన్ ఎప్పుడు?', 'Oh, I am late for stand-up! When is the train?'],
    'Tell him the train comes in two minutes.', 'రెండు నిమిషాల్లో ట్రైన్ వస్తుంది.',
    ['rendu nimishallo train vastundi', 'rendu minutes lo train vastundi', 'train rendu nimishalu', 'board lo rendu minutes undi', 'రెండు నిమిషాల్లో ట్రైన్ వస్తుంది'],
    ['Read the board.', 'Two minutes = "rendu nimishalu".'],
    ['అమ్మయ్య! థాంక్స్ బ్రో, టైమ్ కి చేరతా.', 'Phew! Thanks bro, I will reach on time.'],
    ['ఏమన్నావు బ్రో? టైమ్ లేదు.', 'What did you say bro? No time.']),
], ['ఆల్ ది బెస్ట్ ఇంటర్వ్యూకి బ్రో!', 'All the best for the interview bro!'],
  [['rendu nimishallo train vastundi', 'the train comes in two minutes']], ['బ్రో, మళ్ళీ కలిశాం!', 'Bro, we meet again!']);

export const ticketClerk = P('station-ticket-clerk', 'Madhavi', 'metro ticket clerk', 'Hyderabad Metro station, ticket window', 'f', 'Ask for a ticket to HITEC City and a card top-up.', [
  S('ticket', ['నెక్స్ట్! ఎక్కడికి టికెట్ కావాలి?', 'Next! Where do you need a ticket to?'],
    'Ask for one ticket to HITEC City.', 'హైటెక్ సిటీకి ఒక టికెట్ ఇవ్వండి.',
    ['hitec city ki oka ticket ivvandi', 'hitec city ticket ivvandi madam', 'oka ticket hitec city ki', 'hitec city ki ticket kavali', 'హైటెక్ సిటీకి ఒక టికెట్ ఇవ్వండి'],
    ['Ask for the ticket.', 'To HITEC City = "hitec city ki".'],
    ['యాభై ఐదు రూపాయలు. ఇదిగో టోకెన్.', 'Fifty-five rupees. Here is the token.'],
    ['ఎక్కడికి కావాలి? క్యూ లో ఉన్నారు.', 'To where? People are in the queue.']),
  S('topup', ['కార్డ్ రీఛార్జ్ చేయించుకుంటారా?', 'Would you like to recharge a card?'],
    'Ask for a top-up of two hundred.', 'కార్డ్ లో రెండు వందలు రీఛార్జ్ చేయండి.',
    ['card lo rendu vandalu recharge cheyandi', 'rendu vandalu recharge cheyandi', 'card ki 200 recharge', 'recharge cheyandi rendu vandalu', 'కార్డ్ లో రెండు వందలు రీఛార్జ్ చేయండి'],
    ['Top up the card.', 'Two hundred = "rendu vandalu". Recharge = "recharge".'],
    ['అయింది. రేపటి నుంచి టికెట్ కోసం లైన్ లో ఉండక్కర్లేదు.', 'Done. From tomorrow you need not queue for a ticket.'],
    ['ఎంత రీఛార్జ్ కావాలి?', 'How much recharge do you want?']),
], ['ఇంటర్వ్యూ కి ఆల్ ది బెస్ట్ సార్!', 'All the best for the interview, sir!'],
  [['hitec city ki oka ticket ivvandi', 'give me one ticket to HITEC City'], ['recharge cheyandi', 'please recharge it']], ['నెక్స్ట్! సార్ మళ్ళీ వచ్చారా?', 'Next! Sir, you are back?'], 3);

export const tollAttendant = P('toll-attendant', 'Hari', 'toll attendant', 'Durgam Cheruvu bridge toll plaza', 'm', 'Ask which lane the autos use.', [
  S('lane', ['కార్లు ఈ లైన్ లో, అటు కుడివైపు ఆటోలు.', 'Cars in this lane, autos on the right side.'],
    'Ask which lane is for walkers.', 'నడిచేవాళ్ళకు ఏ లైన్?',
    ['nadichevallaku ye line', 'nadichevalla ki ye line anna', 'walk cheyadaniki ye line', 'ye line lo nadavali', 'నడిచేవాళ్ళకు ఏ లైన్'],
    ['Ask about the lane.', 'Walkers = "nadichevallu". Which lane = "ye line".'],
    ['నడిచేవాళ్ళకు ఇక్కడ దారి లేదు సార్, ఫుట్‌పాత్ మీద వెళ్ళండి.', 'No path for walkers here sir, go on the footpath.'],
    ['ఏమన్నావు సార్? కార్ల శబ్దం.', 'What did you say sir? Car noise.']),
  S('stop', ['ఇంకేమైనా సాయం కావాలా సార్?', 'Need any other help, sir?'],
    'Ask where the bus stop is.', 'బస్ స్టాప్ ఎక్కడ ఉంది?',
    ['bus stop ekkada undi', 'bus stop ekkada sir', 'stop ekkada undi', 'bus ekkada aagutundi', 'బస్ స్టాప్ ఎక్కడ ఉంది'],
    ['Ask where.', 'Bus stop = "bus stop".'],
    ['ఆ వంతెన అవతల ఉంది సార్.', 'It is across that bridge, sir.'],
    ['ఏం అడిగారో చెప్పండి సార్.', 'Tell me what you asked, sir.'])
], ['జాగ్రత్త సార్, ట్రాఫిక్ ఎక్కువ.', 'Careful sir, a lot of traffic.'],
  [['nadichevallaku ye line', 'which lane is for walkers']], ['సార్, ఇటు రాకండి.', 'Sir, please do not come this way.']);

export const tollCollector = P('toll-collector', 'Kondal Rao', 'toll collector', 'Durgam Cheruvu bridge toll plaza, booth', 'o', 'Ask how much the toll is for a car.', [
  S('fee', ['టోల్ ఇవ్వండి, తొందరగా వెళ్ళండి, వెనక ట్రాఫిక్ ఉంది!', 'Pay the toll, go quickly, there is traffic behind!'],
    'Ask how much the toll is.', 'టోల్ ఎంత?',
    ['toll enta', 'toll enta sir', 'toll fee enta', 'ee toll enta', 'టోల్ ఎంత సార్'],
    ['Ask the fee.', 'Toll = "toll". How much = "enta".'],
    ['కారుకి ఎనభై రూపాయలు సార్.', 'Eighty rupees for a car, sir.'],
    ['ఏమిటి? త్వరగా చెప్పండి సార్.', 'What? Say it quickly, sir.']),
  S('card', ['క్యాష్ ఇస్తారా, కార్డ్ ఇస్తారా?', 'Cash or card?'],
    'Say you will pay by card.', 'కార్డ్ తో చెల్లిస్తాను.',
    ['card tho chellistanu', 'card tho istanu sir', 'card pay chestanu', 'card tho dabbulu', 'కార్డ్ తో చెల్లిస్తాను'],
    ['Say how you pay.', 'By card = "card tho". I will pay = "chellistanu".'],
    ['సరే, ఇక్కడ ట్యాప్ చేయండి.', 'Okay, tap here.'],
    ['క్యాషా, కార్డా? త్వరగా చెప్పండి.', 'Cash or card? Quickly, please.']),
], ['హ్యాపీ జర్నీ సార్!', 'Happy journey, sir!'],
  [['toll enta', 'how much is the toll'], ['card tho chellistanu', 'I will pay by card']], ['సార్, మళ్ళీ ఇటువైపా?', 'Sir, this way again?'], 2);
