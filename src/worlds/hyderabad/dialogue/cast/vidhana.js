// Charminar bus stop and footpath, the boating booth, Falaknuma Palace gate and the tourists. (File name kept from the copied structure.)
import { P, step as S } from '../kit.js';

export const busWaiter1 = P('fort-bus-waiter-1', 'Sunanda', 'woman waiting for a bus', 'Charminar bus stop', 'f', 'Ask which bus goes to Secunderabad.', [
  S('bus', ['అబ్బా, బస్సు ఇంకా రాలేదు. ఎంత సేపు?', 'Oh, the bus has not come yet. How long?'],
    'Ask which bus goes to Secunderabad.', 'సికింద్రాబాద్ కి ఏ బస్సు వెళ్తుంది?',
    ['secunderabad ki ye bus veltundi', 'secunderabad bus number enti', 'ye bus secunderabad ki velthundi', 'secunderabad ki ye bus', 'సికింద్రాబాద్ కి ఏ బస్సు వెళ్తుంది'],
    ['Ask for the route.', 'Which bus = "ye bus". Goes = "veltundi".'],
    ['నూట ఇరవై ఏడు వెళ్తుంది. నేనూ అదే కోసం చూస్తున్నా.', 'Number one twenty-seven goes. I am waiting for that too.'],
    ['ఏ బస్సు అని అడుగుతున్నారా?', 'Are you asking which bus?']),
], ['బస్సు వస్తే చెప్తాను, ఇక్కడే ఉండండి.', 'I will tell you when the bus comes, stay here.'],
  [['secunderabad ki ye bus veltundi', 'which bus goes to Secunderabad']], ['బస్సు ఇంకా రాలేదు కదా?', 'The bus has not come yet, has it?']);

export const busWaiter2 = P('fort-bus-waiter-2', 'Vamsi', 'young man waiting for a bus', 'Charminar bus stop', 'q', 'Ask if the bus tracking app is accurate.', [
  S('app', ['యాప్ లో బస్సు ఐదు నిమిషాల్లో అని చూపిస్తోంది.', 'The app shows the bus in five minutes.'],
    'Ask if the bus app is correct.', 'ఆ యాప్ సరిగ్గా చూపిస్తుందా?',
    ['aa app sariga chupistunda', 'app correct ga chupistunda', 'ee app sariga untunda', 'app nijam chebutunda', 'ఆ యాప్ సరిగ్గా చూపిస్తుందా'],
    ['Ask if it works.', 'App = "app". Correctly = "sariga".'],
    ['కొన్నిసార్లు తప్పు చూపిస్తుంది బ్రో, ఐనా బాగుంటుంది.', 'Sometimes it shows wrong bro, but it is useful.'],
    ['ఏమన్నావు బ్రో? స్క్రీన్ చూస్తున్నా.', 'What did you say bro? Looking at the screen.']),
], ['ఉద్యోగం వచ్చాక బైక్ కొనుక్కో బ్రో!', 'Buy a bike once you get a job, bro!'],
  [['aa app sariga chupistunda', 'does that app show correctly']], ['బ్రో, బస్సు వచ్చిందా?', 'Bro, has the bus come?']);

export const deliveryWalker = P('fort-dabbawala-walker', 'Mahendar', 'delivery rider on foot', 'Charminar Road footpath', 'q', 'Offer help finding a house number.', [
  S('number', ['ఈ ఇంటి నంబర్ ఎక్కడుందో తెలియట్లేదు, సార్!', 'I cannot find this house number, sir!'],
    'Offer to help him look for the house.', 'నేను కూడా వెతకడానికి సాయం చేస్తాను.',
    ['nenu kuda vetakadaniki sayam chestanu', 'nenu sayam chestanu anna', 'nenu kuda chustanu', 'inti number chupinchandi', 'నేను కూడా వెతకడానికి సాయం చేస్తాను'],
    ['Offer help.', 'Help = "sayam". To search = "vetakadaniki".'],
    ['థాంక్స్ సార్! ఈ గల్లీ లోనే ఉండాలి.', 'Thanks sir! It must be in this lane itself.'],
    ['సాయం చేస్తారా? చెప్పండి.', 'Will you help? Tell me.']),
], ['దొరికింది సార్, బై!', 'Found it sir, bye!'],
  [['nenu sayam chestanu', 'I will help']], ['సార్, ఇంకో అడ్రస్ చూడగలరా?', 'Sir, can you look at another address?']);

export const boatClerk = P('gateway-ferry-clerk', 'Rafiq', 'boating booth clerk', 'Hussain Sagar boating booth', 'm', 'Buy two boat tickets.', [
  S('tickets', ['కిటికీ దగ్గరకి రండి! ఎన్ని టికెట్లు?', 'Come to the window! How many tickets?'],
    'Ask for two boat tickets.', 'రెండు బోటు టికెట్లు ఇవ్వండి.',
    ['rendu botu tickets ivvandi', 'rendu boat tickets ivvandi', 'rendu tickets kavali anna', 'two tickets ivvandi', 'రెండు బోటు టికెట్లు ఇవ్వండి'],
    ['Ask for tickets.', 'Two = "rendu". Boat = "botu".'],
    ['ఇదిగో రెండు టికెట్లు, మూడు వందలు.', 'Here are two tickets, three hundred.'],
    ['ఎన్ని టికెట్లు? చెప్పండి.', 'How many tickets? Tell me.']),
  S('time', ['బోటు ఎప్పుడు వస్తుందా అని చూస్తున్నారా?', 'Are you looking for when the boat comes?'],
    'Ask when the next boat leaves.', 'తర్వాత బోటు ఎప్పుడు బయల్దేరుతుంది?',
    ['tarvata botu eppudu bayalderutundi', 'next boat eppudu', 'boat eppudu veltundi', 'tarvata boat eppudu', 'తర్వాత బోటు ఎప్పుడు బయల్దేరుతుంది'],
    ['Ask when.', 'Next = "tarvata". Leaves = "bayalderutundi".'],
    ['పది నిమిషాల్లో, ఆ జెట్టీ దగ్గర నిలబడండి.', 'In ten minutes, stand by that jetty.'],
    ['ఎప్పుడు అని అడగండి సార్.', 'Ask when, sir.']),
], ['బుద్ధుడిని బాగా చూసి రండి సార్!', 'Have a good look at the Buddha, sir!'],
  [['rendu botu tickets ivvandi', 'give me two boat tickets'], ['tarvata botu eppudu', 'when is the next boat']], ['సార్, ఇంకో టికెట్ కావాలా?', 'Sir, another ticket?'], 2);

export const palaceDoorman = P('taj-doorman', 'Nawab Ali', 'Falaknuma Palace gate attendant', 'Falaknuma Palace entrance', 'o', 'Ask where the ticket counter is.', [
  S('counter', ['స్వాగతం! నిజాం కాలం నాటి భవనం ఇది.', 'Welcome! This building is from the Nizam era.'],
    'Ask where the ticket counter is.', 'టికెట్ కౌంటర్ ఎక్కడ ఉంది?',
    ['ticket counter ekkada undi', 'ticket counter ekkada sir', 'counter ekkada undi', 'tickets ekkada istaru', 'టికెట్ కౌంటర్ ఎక్కడ ఉంది'],
    ['Ask where.', 'Counter = "counter". Where = "ekkada".'],
    ['ఆ ఎడమవైపు, తెల్ల స్తంభాల పక్కన సార్.', 'On the left, next to the white pillars, sir.'],
    ['ఎక్కడ అని అడిగారా సార్?', 'Did you ask where, sir?']),
  S('hall', ['లోపల భోజనశాల చూడాలనుకుంటున్నారా?', 'Do you want to see the dining hall inside?'],
    'Say yes, you want to see it.', 'అవును, భోజనశాల చూడాలి.',
    ['avunu bhojanashala chudali', 'bhojanashala chudali', 'avunu dining hall chudali', 'dining hall chudali sir', 'అవును, భోజనశాల చూడాలి'],
    ['Say yes.', 'To see = "chudali".'],
    ['ఇదిగో ఈ దారి, నేరుగా వెళ్ళండి సార్.', 'This is the way, go straight sir.'],
    ['చూడాలా వద్దా సార్?', 'Want to see it or not, sir?'])
], ['లోపల భోజనశాల తప్పక చూడండి సార్.', 'Do see the dining hall inside, sir.'],
  [['ticket counter ekkada undi', 'where is the ticket counter']], ['సార్, టికెట్ దొరికిందా?', 'Sir, did you get a ticket?']);

export const palaceUsher = P('taj-bellboy', 'Rehman', 'Falaknuma Palace usher', 'Falaknuma Palace entrance', 'm', 'Say you are only visiting to see the palace.', [
  S('visit', ['నమస్తే సార్, బ్యాగ్ మోయనా? గెస్టా మీరు?', 'Namaste sir, shall I carry the bag? Are you a guest?'],
    'Say you are only visiting the palace.', 'నేను కేవలం ప్యాలెస్ చూడటానికి వచ్చాను.',
    ['nenu kevalam palace chudataniki vachanu', 'palace chudataniki vachanu', 'nenu guest kaadu chudataniki vachanu', 'nenu visit ki vachanu', 'నేను కేవలం ప్యాలెస్ చూడటానికి వచ్చాను'],
    ['Say why you came.', 'To see = "chudataniki". I came = "vachanu".'],
    ['సరే సార్, లోపల ఫోటోలు తీసుకోవచ్చు.', 'Okay sir, you can take photos inside.'],
    ['గెస్ట్ ఆ లేదా విజిటర్ ఆ సార్?', 'Guest or visitor, sir?']),
], ['అందమైన భవనం కదా సార్, ఆనందించండి.', 'Beautiful building, isn\'t it sir, enjoy.'],
  [['palace chudataniki vachanu', 'I came to see the palace']], ['సార్, గైడ్ కావాలా?', 'Sir, need a guide?']);

export const touristA = P('gateway-tourist-a', 'Tom', 'foreign tourist', 'Charminar steps, by the arches', 'm', 'Offer to take his photo with Charminar.', [
  S('photo', 'Excuse me! Could you take my photo with Charminar?',
    'Say yes and offer to take his photo.', 'Sure, I will take your photo with Charminar.',
    ['sure i will take your photo', 'yes i can take your photo', 'sure give me the camera', 'okay i will take a photo', 'Sure, happy to take your photo'],
    ['Say yes.', 'Offer to take the photo.'],
    'Wow, perfect! The minarets are huge!', 'Sorry, could you repeat that?'),
], 'Thank you so much, have a lovely day!', [['I will take your photo', 'offering help in English']], 'Hello again! Great place, this.', 1, 'en');

export const touristB = P('gateway-tourist-b', 'Hannah', 'foreign tourist', 'Charminar steps, by the arches', 'f', 'Tell her to take a boat on Hussain Sagar.', [
  S('boat', 'Hi! Is there a boat ride nearby? I heard about a lake.',
    'Say there is a boat ride on Hussain Sagar.', 'Yes, you can take a boat ride on Hussain Sagar.',
    ['yes there is a boat on hussain sagar', 'take a boat on the lake', 'you can go to hussain sagar for a boat', 'yes the lake has boats', 'Yes, try the Hussain Sagar boats'],
    ['Tell her about the lake.', 'Name the lake: Hussain Sagar.'],
    'Lovely, I will go there tomorrow morning!', 'Sorry, what lake did you say?'),
  S('way', 'And how do I get there from here?',
    'Say she can take an auto or the metro.', 'You can take an auto or the metro from here.',
    ['take an auto or the metro', 'an auto is the easiest way', 'go by auto or metro', 'the metro or an auto will work', 'Take an auto, it is easy'],
    ['Suggest transport.', 'Auto or metro.'],
    'Great, an auto sounds like fun!', 'Sorry, how can I go there?'),
], 'You are so kind, thank you!', [['take an auto or the metro', 'giving directions in English']], 'Hi again! Was that the lake?', 2, 'en');

export const danaSeller = P('gateway-dana-seller', 'Sattaiah', 'bird-feed seller', 'Charminar steps, pigeon-feeding mat', 'o', 'Buy a small packet of grain for the pigeons.', [
  S('dana', ['గింజలు, గింజలు! పావురాలకు వేయండి సార్!', 'Grain, grain! Feed the pigeons, sir!'],
    'Ask for one packet of grain.', 'పావురాలకు ఒక ప్యాకెట్ గింజలు ఇవ్వండి.',
    ['pavuralaku oka packet ginjalu ivvandi', 'oka packet ginjalu ivvandi', 'pavuralaku ginjalu ivvandi tatagaru', 'oka packet dana ivvandi', 'పావురాలకు ఒక ప్యాకెట్ గింజలు ఇవ్వండి'],
    ['Ask for grain.', 'Pigeons = "pavuralu". Grain = "ginjalu".'],
    ['ఇదిగో సార్, పది రూపాయలు. చేతిలో వేసి చూడండి.', 'Here sir, ten rupees. Try feeding from your palm.'],
    ['గింజలు కావాలా సార్? చెప్పండి.', 'Want grain, sir? Tell me.']),
], ['పావురాలు చాలా సంతోషిస్తాయి సార్!', 'The pigeons will be very happy, sir!'],
  [['pavuralaku oka packet ginjalu ivvandi', 'give me a packet of grain for the pigeons']], ['సార్, ఇంకో ప్యాకెట్?', 'Sir, another packet?']);

export const roadTourist = P('gateway-road-tourist', 'Lucas', 'foreign tourist', 'Charminar Road, on the way to the lake', 'm', 'Tell him the lake is straight ahead.', [
  S('lost', 'Hi, I think I am lost. Which way to the lake?',
    'Tell him to go straight, the lake is ahead.', 'Go straight, the lake is ahead.',
    ['go straight and you will see the lake', 'the lake is straight ahead', 'walk straight ahead', 'it is straight, not far', 'Go straight for ten minutes'],
    ['Give directions.', 'Say "straight".'],
    'Perfect, thank you very much!', 'Sorry, which way again?'),
], 'You saved me, thank you!', [['go straight, the lake is ahead', 'giving directions in English']], 'Hello again! I found the lake!', 1, 'en');
