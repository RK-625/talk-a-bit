// HITEC City tower: the second gate guard, the gardener, the cab driver, the delivery rider and the walkers.
import { P, step as S } from '../kit.js';

export const gateWatchman = P('antilia-gate-watchman', 'Mallaiah', 'second gate guard', 'HITEC City tower gate', 'm', 'Ask where the cab pick-up point is.', [
  S('cab', ['క్యాబ్ లు ఇక్కడ ఆపకూడదు సార్, పక్కకి వెళ్ళండి.', 'Cabs should not stop here, sir, move aside.'],
    'Ask where the cab pickup point is.', 'క్యాబ్ పికప్ పాయింట్ ఎక్కడ ఉంది?',
    ['cab pickup point ekkada undi', 'cab ekkada ekkali', 'pickup point ekkada sir', 'cab pickup ekkada', 'క్యాబ్ పికప్ పాయింట్ ఎక్కడ ఉంది'],
    ['Ask where.', 'Pickup point = "pickup point".'],
    ['ఆ తెల్ల క్యాబ్ ల లైన్ దగ్గర సార్.', 'Near the line of white cabs, sir.'],
    ['ఎక్కడ అని అడుగుతున్నారా సార్?', 'Are you asking where, sir?']),
], ['జాగ్రత్తగా వెళ్ళండి సార్, ట్రాఫిక్ ఉంది.', 'Go carefully sir, there is traffic.'],
  [['cab pickup point ekkada undi', 'where is the cab pickup point']], ['సార్, క్యాబ్ దొరికిందా?', 'Sir, did you get a cab?']);

export const mali = P('antilia-mali', 'Chandraiah', 'campus gardener', 'HITEC City tower garden', 'o', 'Say the gulmohar flowers are pretty.', [
  S('petals', ['గుల్మోహర్ రేకులు ఊడ్చి ఊడ్చి అలిసిపోయా బాబూ.', 'Tired of sweeping gulmohar petals again and again, dear.'],
    'Say the gulmohar flowers are pretty.', 'గుల్మోహర్ పూలు చాలా అందంగా ఉన్నాయి.',
    ['gulmohar poolu chala andanga unnayi', 'gulmohar chala bagundi', 'ee poolu chala andanga unnayi', 'poolu super ga unnayi', 'గుల్మోహర్ పూలు చాలా అందంగా ఉన్నాయి'],
    ['Compliment the flowers.', 'Flowers = "poolu". Pretty = "andanga".'],
    ['అవును బాబూ, వీటి కోసమే ఈ పని చేస్తా.', 'Yes dear, I do this work for them.'],
    ['ఏమిటి బాబూ? చీపురు చప్పుడులో వినపడలేదు.', 'What dear? I could not hear over the sweeping.']),
  S('plant', ['ఈ మొక్కలు నేనే నాటాను. నీకు నచ్చాయా?', 'I planted these myself. Do you like them?'],
    'Say you like them a lot.', 'నాకు చాలా నచ్చాయి.',
    ['naaku chala nachchayi', 'chala nachchayi tatagaru', 'naaku bagunnayi', 'nenu chala ishtapaddanu', 'నాకు చాలా నచ్చాయి'],
    ['Say you like them.', 'I liked = "naaku nachchayi".'],
    ['సంతోషం బాబూ! పని కూడా పూజే.', 'I am happy dear! Work is also worship.'],
    ['నచ్చాయా లేదా బాబూ?', 'Did you like them or not, dear?']),
], ['ఉద్యోగం వచ్చాక ఇక్కడే పని చేస్తావు కదా బాబూ!', 'You will work here once you get the job, right dear!'],
  [['gulmohar poolu chala andanga unnayi', 'the gulmohar flowers are very pretty'], ['naaku chala nachchayi', 'I liked them a lot']], ['బాబూ, ఈ పూలు చూసావా?', 'Dear, have you seen these flowers?'], 2);

export const chauffeur = P('antilia-chauffeur', 'Mustafa', 'cab driver', 'HITEC City tower, line of white cabs', 'm', 'Ask how long he has been driving.', [
  S('years', ['నా ప్యాసింజర్ కోసం ఎదురు చూస్తున్నా సార్.', 'I am waiting for my passenger, sir.'],
    'Ask how many years he has been driving.', 'మీరు ఎన్ని సంవత్సరాలుగా డ్రైవ్ చేస్తున్నారు?',
    ['meeru enni samvatsaraluga drive chestunnaru', 'enni years nundi drive chestunnaru', 'enni sanvatsaralu ayindi driving', 'enni years ayindi anna', 'మీరు ఎన్ని సంవత్సరాలుగా డ్రైవ్ చేస్తున్నారు'],
    ['Ask about his experience.', 'How many years = "enni samvatsaralu".'],
    ['పదేళ్ళు సార్! హైదరాబాద్ అంతా నాకు తెలుసు.', 'Ten years, sir! I know all of Hyderabad.'],
    ['ఏం అడిగారు సార్? మళ్ళీ చెప్పండి.', 'What did you ask sir? Say again.']),
], ['ఎక్కడికైనా వెళ్ళాలంటే చెప్పండి సార్!', 'Tell me whenever you need to go anywhere, sir!'],
  [['enni samvatsaraluga drive chestunnaru', 'how many years have you been driving']], ['సార్, క్యాబ్ కావాలా?', 'Sir, need a cab?']);

export const deliveryBoy = P('antilia-delivery-boy', 'Akhil', 'delivery rider', 'HITEC City tower, outside the gate', 'q', 'Ask which order he is waiting for.', [
  S('lunch', ['కస్టమర్ కిందకి రాలేదు, లంచ్ ఆర్డర్ చల్లారిపోతోంది!', 'The customer has not come down, the lunch order is getting cold!'],
    'Suggest he call the customer.', 'కస్టమర్ కి కాల్ చేయండి.',
    ['customer ki call cheyandi', 'call cheyandi anna', 'customer ki phone cheyandi', 'ring cheyandi anna', 'కస్టమర్ కి కాల్ చేయండి'],
    ['Suggest calling.', 'Call = "call". To the customer = "customer ki".'],
    ['అవును అన్నా! కాల్ చేసి చూస్తా, థాంక్స్.', 'Yes anna! I will try calling, thanks.'],
    ['ఏమన్నావు అన్నా? ఆర్డర్ చూస్తున్నా.', 'What did you say anna? Looking at the order.']),
  S('luck', ['ఈ ఆఫీస్ లో నీకు ఇంటర్వ్యూ నా?', 'Is it an interview for you in this office?'],
    'Say yes, today is your interview.', 'అవును, ఈ రోజు నా ఇంటర్వ్యూ.',
    ['avunu ee roju naa interview', 'avunu interview undi ee roju', 'ee roju naa interview anna', 'avunu interview ki vachanu', 'అవును, ఈ రోజు నా ఇంటర్వ్యూ'],
    ['Say yes.', 'Today = "ee roju". My interview = "naa interview".'],
    ['ఆల్ ది బెస్ట్ అన్నా! టెన్షన్ వద్దు.', 'All the best anna! Do not worry.'],
    ['ఇంటర్వ్యూ ఆ కాదా అన్నా?', 'Is it an interview or not, anna?']),
], ['బై అన్నా, కస్టమర్ వచ్చేసాడు!', 'Bye anna, the customer has come!'],
  [['customer ki call cheyandi', 'call the customer'], ['ee roju naa interview', 'today is my interview']], ['అన్నా, ఇంటర్వ్యూ ఎలా అయింది?', 'Anna, how did the interview go?'], 2);

export const laneWalker = P('antilia-lane-walker', 'Ramanaiah', 'elderly man on a morning walk', 'quiet residential lane near the HITEC tower', 'o', 'Greet him and ask where the nearest tea shop is.', [
  S('tea', ['పొద్దున్నే నడక, పేపర్ చదువుతూ! నువ్వెవరు బాబూ?', 'Morning walk, reading the paper! Who are you, dear?'],
    'Ask where the nearest tea shop is.', 'దగ్గరలో టీ కొట్టు ఎక్కడ ఉంది?',
    ['daggaralo tea kottu ekkada undi', 'tea shop ekkada undi tatagaru', 'daggara tea ekkada dorukutundi', 'chai kottu ekkada', 'దగ్గరలో టీ కొట్టు ఎక్కడ ఉంది'],
    ['Ask for a tea shop.', 'Nearby = "daggaralo". Tea shop = "tea kottu".'],
    ['ఆ మలుపు తిరిగి కుడివైపు, మంచి చాయ్ దొరుకుతుంది.', 'Turn at that bend, to the right, you get good chai.'],
    ['టీ గురించా బాబూ? చెప్పు.', 'About tea, dear? Say.']),
], ['బాగా నడువు బాబూ, ఆరోగ్యం ముఖ్యం.', 'Walk well dear, health matters.'],
  [['daggaralo tea kottu ekkada undi', 'where is the nearest tea shop']], ['బాబూ, పేపర్ చూసావా?', 'Dear, seen the paper?']);

export const decoOffice = P('deco-office-woman', 'Ritika', 'office-going woman', 'near the Cyber Towers side', 'f', 'Tell her the cab is already here.', [
  S('late', ['అయ్యో, ఆఫీస్ కి చాలా లేట్! టైమ్ చూడు!', 'Oh, so late for office! Look at the time!'],
    'Tell her not to worry, you will help.', 'కంగారు పడకండి, నేను సాయం చేస్తాను.',
    ['kangaru padakandi nenu sayam chestanu', 'kangaru padakandi madam', 'tension padakandi nenu sayam', 'nenu sahayam chestanu', 'కంగారు పడకండి, నేను సాయం చేస్తాను'],
    ['Be kind.', 'Do not worry = "kangaru padakandi".'],
    ['థాంక్స్! మెట్రో ఎటు వైపు అని చెప్పండి.', 'Thanks! Just tell me which way the metro is.'],
    ['ఏమన్నారు? టైమ్ లేదు.', 'What did you say? No time.']),
  S('metro', ['మెట్రో స్టేషన్ ఏ వైపు ఉంది?', 'Which way is the metro station?'],
    'Point her to the metro station.', 'మెట్రో స్టేషన్ ఆ వైపు ఉంది.',
    ['metro station aa vaipu undi', 'metro aa vaipu undi madam', 'station aa vaipu', 'metro station akkada undi', 'మెట్రో స్టేషన్ ఆ వైపు ఉంది'],
    ['Point the way.', 'That side = "aa vaipu".'],
    ['థాంక్స్ అన్నా! నీ ఇంటర్వ్యూ కి ఆల్ ది బెస్ట్!', 'Thanks anna! All the best for your interview!'],
    ['ఎటు వైపు అని చెప్పండి.', 'Tell me which way.']),
], ['బై, పరిగెడుతున్నా!', 'Bye, I am running!'],
  [['kangaru padakandi', 'do not worry'], ['metro station aa vaipu undi', 'the metro station is that way']], ['మీరు మళ్ళీ కలిశారా?', 'You again?'], 2);
