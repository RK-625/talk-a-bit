// Kacheguda station, Cyber Towers, Osmania University Arts College and the Gulzar Houz fountain.
import { P, step as S } from '../kit.js';

export const sorter1 = P('cst-tiffin-sorter', 'Ganesh', 'delivery rider sorting parcels', 'Kacheguda station, delivery bikes', 'q', 'Ask how he finds the right parcel and wish him luck.', [
  S('sort', ['ఈ పార్సెల్ ఎవరిదో తెలియట్లేదు, చాలా ఆర్డర్లు!', 'I do not know whose parcel this is, so many orders!'],
    'Ask him to check the name on the parcel.', 'పార్సెల్ మీద పేరు చూడండి.',
    ['parcel meeda peru chudandi', 'parcel lo peru chudandi anna', 'peru chudandi parcel meeda', 'name chudandi anna', 'పార్సెల్ మీద పేరు చూడండి'],
    ['Give a tip.', 'Name = "peru". Look = "chudandi".'],
    ['అరే నిజమే! ఇదిగో పేరు ఉంది. థాంక్స్ అన్నా.', 'Arre true! Here is the name. Thanks anna.'],
    ['ఏమన్నావు అన్నా? పార్సెల్స్ లో ఉన్నా.', 'What did you say anna? Buried in parcels.']),
  S('luck', ['ఈ రోజు ముప్పై డెలివరీలు ఉన్నాయి!', 'Thirty deliveries today!'],
    'Wish him good luck.', 'ఆల్ ది బెస్ట్, నువ్వు చేయగలవు.',
    ['all the best nuvvu cheyagalavu', 'all the best anna', 'nuvvu cheyagalavu anna', 'best of luck anna', 'ఆల్ ది బెస్ట్, నువ్వు చేయగలవు'],
    ['Encourage him.', 'You can do it = "nuvvu cheyagalavu".'],
    ['థాంక్స్ అన్నా! నీకు ఉద్యోగం రావాలి.', 'Thanks anna! May you get a job.'],
    ['ఏదైనా మంచి మాట చెప్పు అన్నా.', 'Say a kind word anna.']),
], ['బై అన్నా, బైక్ స్టార్ట్ చేస్తున్నా!', 'Bye anna, starting my bike!'],
  [['parcel meeda peru chudandi', 'look at the name on the parcel'], ['nuvvu cheyagalavu', 'you can do it']], ['అన్నా, ఇంకో పార్సెల్ చూస్తావా?', 'Anna, will you check another parcel?'], 2);

export const sorter2 = P('cst-tiffin-sorter-2', 'Praveen', 'delivery rider sorting parcels', 'Kacheguda station, delivery bikes', 'q', 'Ask why he is grumbling.', [
  S('address', ['కస్టమర్లు అడ్రస్ సరిగ్గా రాయరు, చిరాకు!', 'Customers do not write addresses properly, so annoying!'],
    'Ask what is wrong with the address.', 'అడ్రస్ లో ఏం సమస్య?',
    ['address lo em samasya', 'address lo enti problem', 'address em kaledu anna', 'em problem address lo', 'అడ్రస్ లో ఏం సమస్య'],
    ['Ask about the trouble.', 'Problem = "samasya". Address = "address".'],
    ['ఫ్లాట్ నంబరే లేదు అన్నా! వెతికి వెతికి విసుగు.', 'No flat number at all anna! Tired of searching.'],
    ['ఏం అడిగావు అన్నా?', 'What did you ask anna?']),
], ['నీకు ఈ ఇబ్బంది లేదు కదా అన్నా!', 'You do not have this trouble, right anna!'],
  [['address lo em samasya', 'what is the problem with the address']], ['అన్నా, నీ అడ్రస్ ఎంత క్లియర్!', 'Anna, your address is so clear!']);

export const officegoer1 = P('cst-officegoer', 'Sandeep', 'office-goer hurrying to work', 'Kacheguda station forecourt', 'q', 'Wish him a good day at work.', [
  S('rush', ['మెట్రో మిస్ అవుతా, ఆఫీస్ కి లేట్!', 'I will miss the metro, late for office!'],
    'Wish him a good day at work.', 'మీ రోజు బాగా గడవాలి.',
    ['mee roju baga gadavali', 'have a good day sir', 'mee roju bagundali', 'all the best sir', 'మీ రోజు బాగా గడవాలి'],
    ['Wish him well.', 'Your day = "mee roju". Should go well = "baga gadavali".'],
    ['థాంక్స్! నువ్వు కూడా ఉద్యోగంలో చేరాలి త్వరలో.', 'Thanks! You should also join a job soon.'],
    ['ఏమన్నారు? పరిగెడుతున్నా!', 'What did you say? I am running!']),
], ['బై! మెట్రో వచ్చింది!', 'Bye! The metro came!'],
  [['mee roju baga gadavali', 'may your day go well']], ['అయ్యో, మళ్ళీ లేట్!', 'Oh no, late again!']);

export const officegoer2 = P('cst-officegoer-2', 'Rajesh', 'office-goer hurrying to work', 'Kacheguda station forecourt, front lane', 'm', 'Tell him the metro runs every five minutes.', [
  S('watch', ['టైమ్ ఎంతైంది? నా వాచ్ ఆగిపోయింది.', 'What time is it? My watch has stopped.'],
    'Tell him it is nine o clock.', 'ఇప్పుడు తొమ్మిది గంటలు అయింది.',
    ['ippudu tommidi gantalu ayindi', 'time tommidi ayindi', 'tommidi gantalu ayindi sir', 'ippudu 9 ayindi', 'ఇప్పుడు తొమ్మిది గంటలు అయింది'],
    ['Say the time.', 'Nine = "tommidi". Hours = "gantalu".'],
    ['అమ్మో, తొమ్మిది! త్వరగా వెళ్ళాలి. థాంక్స్!', 'Oh no, nine! Must hurry. Thanks!'],
    ['టైమ్ ఎంత? చెప్పండి.', 'What is the time? Tell me.']),
], ['బై సార్, ఆల్ ది బెస్ట్!', 'Bye sir, all the best!'],
  [['ippudu tommidi gantalu ayindi', 'it is nine o clock now']], ['టైమ్ ఎంతైంది ఇప్పుడు?', 'What is the time now?']);

export const coolie2 = P('cst-coolie-2', 'Narayana', 'Kacheguda porter', 'Kacheguda station forecourt, east end', 'o', 'Tell him a passenger needs a porter.', [
  S('porter', ['ఎవరైనా సామాను మోయడానికి పిలుస్తారేమో అని చూస్తున్నా.', 'I am looking in case someone calls me to carry luggage.'],
    'Tell him a passenger over there needs him.', 'అక్కడ ఒక ప్రయాణికుడికి మీరు కావాలి.',
    ['akkada oka prayanikudiki meeru kavali', 'akkada passenger ni pilustunnaru', 'aa sir ku porter kavali', 'akkada luggage undi', 'అక్కడ ఒక ప్రయాణికుడికి మీరు కావాలి'],
    ['Point him out.', 'Passenger = "prayanikudu". Need = "kavali".'],
    ['సరే బాబూ, వెళ్తాను. నీకు మంచి జరుగుతుంది.', 'Okay dear, I will go. Good things will happen to you.'],
    ['ఎక్కడ? చూపించు బాబూ.', 'Where? Show me, dear.']),
], ['ఇప్పుడే వెళ్తున్నా బాబూ!', 'Going right now, dear!'],
  [['akkada oka prayanikudiki meeru kavali', 'a passenger there needs you']], ['బాబూ, సామాను ఉందా?', 'Dear, any luggage?']);

export const bullTourist = P('bse-bull-tourist', 'Daniel', 'foreign tourist taking a selfie', 'Cyber Towers, giant pearl sculpture', 'm', 'Explain that Hyderabad is the City of Pearls.', [
  S('pearls', 'Why is there a giant pearl here? Is Hyderabad famous for pearls?',
    'Say yes, Hyderabad is called the City of Pearls.', 'Yes, Hyderabad is called the City of Pearls.',
    ['yes hyderabad is the city of pearls', 'it is called the city of pearls', 'yes hyderabad is famous for pearls', 'pearls are famous here', 'Yes, it is the City of Pearls'],
    ['Say yes.', 'Hyderabad = City of Pearls.'],
    'Oh, that is cool! Thanks for telling me.', 'Sorry, what is Hyderabad famous for?'),
  S('selfie', 'Can you take a selfie with me and the pearl?',
    'Say sure, you will take a selfie.', 'Sure, let us take a selfie together.',
    ['sure lets take a selfie', 'okay selfie together', 'yes i can take a selfie', 'sure come here', 'Sure, smile!'],
    ['Agree.', 'Say sure.'],
    'Awesome! Say cheese!', 'Sorry, selfie or not?'),
], 'Thanks a lot, you made my day!', [['the City of Pearls', 'a famous nickname in English'], ['let us take a selfie', 'agreeing in English']], 'Hi again! The pearl is huge.', 2, 'en');

export const ubGuard = P('bse-guard', 'Balaiah', 'Cyber Towers security guard', 'Cyber Towers gate', 'm', 'Ask whether visitors may enter and sign the register.', [
  S('enter', ['నమస్తే సార్! విజిటర్ రిజిస్టర్ లో రాయండి.', 'Namaste sir! Please write in the visitor register.'],
    'Ask if you may go in for the interview.', 'ఇంటర్వ్యూ కోసం లోపలికి వెళ్ళొచ్చా?',
    ['interview kosam lopaliki vellocha', 'lopaliki vellochha sir', 'interview ki lopalaki vellocha', 'lopaliki vellocha interview undi', 'ఇంటర్వ్యూ కోసం లోపలికి వెళ్ళొచ్చా'],
    ['Ask politely.', 'Inside = "lopaliki". Can I go = "vellocha".'],
    ['అవును సార్, ఎక్కడ రాయాలో చూపిస్తాను.', 'Yes sir, I will show you where to write.'],
    ['లోపలికి వెళ్ళాలా? స్పష్టంగా చెప్పండి.', 'Do you want to go in? Say clearly.']),
  S('pass', ['ఈ పాస్ మెడలో వేసుకోండి సార్.', 'Wear this pass around your neck, sir.'],
    'Thank him and say you will wear it.', 'సరే, వేసుకుంటాను, థాంక్స్.',
    ['sare vesukuntanu thanks', 'sare thanks sir vesukuntanu', 'thanks vesukuntanu', 'pass teesukuntanu thanks', 'సరే, వేసుకుంటాను, థాంక్స్'],
    ['Accept the pass.', 'I will wear = "vesukuntanu".'],
    ['గుడ్ లక్ సార్, లిఫ్ట్ ఎడమవైపు.', 'Good luck sir, the lift is on the left.'],
    ['పాస్ తీసుకుంటారా సార్?', 'Will you take the pass, sir?']),
], ['నిజంగా ఆల్ ది బెస్ట్ సార్!', 'Truly all the best, sir!'],
  [['interview kosam lopaliki vellocha', 'may I go inside for the interview'], ['vesukuntanu', 'I will wear it']], ['సార్, పాస్ ఉందా?', 'Sir, do you have the pass?'], 2);

export const broker = P('bse-broker', 'Mounika', 'job-seeker on a call', 'Cyber Towers, near the Walk-in interview board', 'f', 'Ask which companies are doing walk-ins.', [
  S('walkin', ['అవును సార్, స్లాట్ కావాలి, డెడ్‌లైన్ రేపే! ఉండండి...', 'Yes sir, I need a slot, deadline is tomorrow! Hold on...'],
    'Ask which companies have walk-ins today.', 'ఈ రోజు ఏ కంపెనీల వాక్-ఇన్ ఉన్నాయి?',
    ['ee roju ye companyla walk in unnayi', 'ye companies walk in chestunnayi', 'walk in ye company lo undi', 'ee roju walk in ekkada', 'ఈ రోజు ఏ కంపెనీల వాక్-ఇన్ ఉన్నాయి'],
    ['Ask her.', 'Companies = "companylu". Walk-in = "walk-in".'],
    ['ఈ బోర్డ్ చూడండి. మూడు కంపెనీలు ఫ్రెషర్స్ ని తీసుకుంటున్నాయి!', 'Look at this board. Three companies are taking freshers!'],
    ['ఏ కంపెనీల గురించి అడుగుతున్నారు?', 'Which companies are you asking about?']),
  S('resume', ['రెజ్యూమ్ తెచ్చారా?', 'Did you bring your resume?'],
    'Say yes, you have copies.', 'అవును, నా దగ్గర కాపీలు ఉన్నాయి.',
    ['avunu naa daggara copies unnayi', 'resume copies unnayi naa daggara', 'avunu resume undi', 'copies teesukochanu', 'అవును, నా దగ్గర కాపీలు ఉన్నాయి'],
    ['Say yes.', 'Copies = "copies". With me = "naa daggara".'],
    ['శభాష్! ఫోల్డర్ లో పెట్టుకుని వెళ్ళండి. ఆల్ ది బెస్ట్!', 'Great! Keep them in a folder and go. All the best!'],
    ['తెచ్చారా లేదా? చెప్పండి.', 'Brought it or not? Tell me.']),
], ['నేను కూడా వచ్చా, ఇద్దరం అదరగొడదాం!', 'I am here too, let us both rock it!'],
  [['ye companyla walk in unnayi', 'which companies have walk-ins'], ['naa daggara copies unnayi', 'I have copies with me']], ['మళ్ళీ కలిశారా? ఎలా ఉంది?', 'You again? How is it going?'], 3);

export const bookSeller = P('rajabai-book-seller', 'Haribabu', 'second-hand book seller', 'Osmania University Arts College, book stall', 'o', 'Ask for an engineering guide and a Telugu novel.', [
  S('guide', ['పాత పుస్తకాలు, తెలుగు నవలలు, ఇంజనీరింగ్ గైడ్లు! ఏం కావాలి?', 'Old books, Telugu novels, engineering guides! What do you need?'],
    'Ask for an interview preparation guide.', 'ఇంటర్వ్యూ ప్రిపరేషన్ పుస్తకం ఉందా?',
    ['interview preparation pustakam undha', 'interview book undha sir', 'interview ki pustakam unda', 'interview preparation guide undi a', 'ఇంటర్వ్యూ ప్రిపరేషన్ పుస్తకం ఉందా'],
    ['Ask if he has one.', 'Book = "pustakam". Is there = "unda".'],
    ['ఉంది బాబూ, ఇదిగో ఈ పాత గైడ్, చాలా పనికొస్తుంది.', 'There is, dear, this old guide, very useful.'],
    ['ఏ పుస్తకం కావాలి బాబూ?', 'Which book do you want, dear?']),
  S('novel', ['తెలుగు చదువు వచ్చా నీకు?', 'Do you know how to read Telugu?'],
    'Say you are just learning Telugu.', 'నేను ఇప్పుడే తెలుగు నేర్చుకుంటున్నాను.',
    ['nenu ippude telugu nerchukuntunnanu', 'telugu nerchukuntunnanu sir', 'nenu telugu nerchukuntunna', 'ippude telugu nerchukuntunnanu', 'నేను ఇప్పుడే తెలుగు నేర్చుకుంటున్నాను'],
    ['Say you are learning.', 'I am learning = "nerchukuntunnanu".'],
    ['అయితే ఈ పిల్లల కథల పుస్తకం తీసుకో, సులభంగా ఉంటుంది.', 'Then take this children\'s story book, it is easy.'],
    ['తెలుగు వచ్చా? చెప్పు బాబూ.', 'Do you know Telugu? Say, dear.']),
], ['చదివి మళ్ళీ రా బాబూ, ఇంకా పుస్తకాలు ఉన్నాయి.', 'Read it and come back dear, there are more books.'],
  [['interview preparation pustakam unda', 'is there an interview preparation book'], ['nenu telugu nerchukuntunnanu', 'I am learning Telugu']], ['బాబూ, పుస్తకం చదివావా?', 'Dear, did you read the book?'], 2);

export const studentA = P('rajabai-student-a', 'Naresh', 'university student', 'Osmania University Arts College steps', 'q', 'Ask about the campus placement drive.', [
  S('exam', ['రేపు పరీక్ష ఉంది, ఇంకా చదవలేదు!', 'Exam tomorrow, and I have not studied yet!'],
    'Wish him luck for the exam.', 'పరీక్షకు ఆల్ ది బెస్ట్!',
    ['pareekshaku all the best', 'exam ki all the best anna', 'pariksha baga rayandi', 'all the best exam ki', 'పరీక్షకు ఆల్ ది బెస్ట్'],
    ['Wish him luck.', 'Exam = "pareeksha".'],
    ['థాంక్స్ అన్నా! ప్లేస్‌మెంట్ డ్రైవ్ కూడా దగ్గరలో ఉంది.', 'Thanks anna! The placement drive is near too.'],
    ['ఏమన్నావు అన్నా? పుస్తకంలో ఉన్నా.', 'What did you say anna? Buried in my book.']),
  S('drive', ['మీ ఇంజనీరింగ్ కాలేజీలో ప్లేస్‌మెంట్స్ ఎలా?', 'How are placements in your engineering college?'],
    'Say you are still looking for a job.', 'నేను ఇంకా ఉద్యోగం వెతుకుతున్నాను.',
    ['nenu inka udyogam vetukutunnanu', 'inka job vetukutunnanu', 'nenu inka job kosam chustunnanu', 'inka job raledu', 'నేను ఇంకా ఉద్యోగం వెతుకుతున్నాను'],
    ['Say your situation.', 'Still = "inka". Looking = "vetukutunnanu".'],
    ['ధైర్యంగా ఉండు అన్నా, తప్పకుండా వస్తుంది.', 'Stay strong anna, it will surely come.'],
    ['ఇంకా దొరకలేదా అన్నా? చెప్పు.', 'Not yet found anna? Say.']),
], ['ఇద్దరం గెలుద్దాం అన్నా!', 'Both of us will win, anna!'],
  [['pareekshaku all the best', 'all the best for the exam'], ['nenu inka udyogam vetukutunnanu', 'I am still looking for a job']], ['అన్నా, పరీక్ష ఎలా రాసావు?', 'Anna, how was your exam?'], 3);

export const bookBrowser = P('rajabai-book-browser', 'Sirisha', 'student browsing books', 'Osmania University Arts College, second-hand book stall', 'f', 'Recommend a Telugu novel.', [
  S('novel', ['తెలుగు నవలలు చదవాలని ఉంది, ఏదైనా సూచించు.', 'I want to read Telugu novels, suggest something.'],
    'Suggest she starts with a short story.', 'ముందు ఒక చిన్న కథ చదవండి.',
    ['mundu oka chinna katha chadavandi', 'chinna katha chadavandi madam', 'mundu short story chadavandi', 'chinna novel chadavandi', 'ముందు ఒక చిన్న కథ చదవండి'],
    ['Give advice.', 'Short story = "chinna katha".'],
    ['మంచి సలహా! సులభంగా మొదలుపెడతా.', 'Good advice! I will begin easily.'],
    ['ఏం చెప్పావు? ఇంకోసారి చెప్పు.', 'What did you say? Once more.']),
], ['థాంక్స్, నీ ఇంటర్వ్యూకి గుడ్ లక్!', 'Thanks, good luck for your interview!'],
  [['mundu oka chinna katha chadavandi', 'first read a short story']], ['ఏ పుస్తకం తీసుకున్నావు?', 'Which book did you take?']);

export const ledgeReader = P('flora-ledge-reader', 'Anjali', 'college girl on the ledge', 'Gulzar Houz fountain, ledge', 'f', 'Ask what she is reading.', [
  S('book', ['ఈ ఫౌంటెన్ దగ్గర చదువుకోవడం చాలా హాయి.', 'Studying near this fountain is so pleasant.'],
    'Ask what book she is reading.', 'మీరు ఏ పుస్తకం చదువుతున్నారు?',
    ['meeru ye pustakam chaduvutunnaru', 'ye book chaduvutunnaru', 'em book chaduvutunnaru', 'meeru ye pustakam chadustunnaru', 'మీరు ఏ పుస్తకం చదువుతున్నారు'],
    ['Ask about the book.', 'Which book = "ye pustakam".'],
    ['ఒక కథల పుస్తకం, చాలా బాగుంది.', 'A book of stories, very good.'],
    ['ఏదైనా అడిగారా అండి?', 'Did you ask something?']),
], ['ఇంటర్వ్యూకి ఆల్ ది బెస్ట్ అండి.', 'All the best for the interview.'],
  [['meeru ye pustakam chaduvutunnaru', 'which book are you reading']], ['అండి, మీరు కూడా చదువుతారా?', 'Do you read too?']);

export const ledgeSketcher = P('flora-ledge-sketcher', 'Vinay', 'teen on the ledge', 'Gulzar Houz fountain, ledge', 'q', 'Say his sketch of the arches looks great.', [
  S('sketch', ['ఈ ఆర్చీలు గీయడం చాలా కష్టం అన్నా, చూడు.', 'These arches are so hard to draw anna, look.'],
    'Say his sketch is great.', 'నీ బొమ్మ చాలా బాగుంది.',
    ['nee bomma chala bagundi', 'bomma chala bagundi anna', 'nee sketch super ga undi', 'chala bagunda gesavu', 'నీ బొమ్మ చాలా బాగుంది'],
    ['Compliment him.', 'Your drawing = "nee bomma". Good = "bagundi".'],
    ['థాంక్స్ అన్నా! ఇంకా షేడింగ్ చేయాలి.', 'Thanks anna! Still have to shade it.'],
    ['ఏమన్నావు అన్నా? బొమ్మలో ఉన్నా.', 'What did you say anna? Lost in my drawing.']),
  S('where', ['ఈ గుల్జార్ హౌజ్ దగ్గర ఇంకా ఏం చూడాలి?', 'What else is there to see near Gulzar Houz?'],
    'Suggest he visit Charminar.', 'చార్మినార్ చూడండి, దగ్గరే ఉంది.',
    ['charminar chudandi daggarey undi', 'charminar kuda chudandi', 'charminar daggara undi anna', 'charminar ki vellandi', 'చార్మినార్ చూడండి, దగ్గరే ఉంది'],
    ['Suggest a place.', 'Near = "daggara".'],
    ['అరే అవును! రేపు స్కెచ్ వేసుకుని వెళ్తా.', 'Oh yes! Tomorrow I will take my sketchbook there.'],
    ['ఏమన్నావు? ఇంకోసారి చెప్పు.', 'What did you say? Once more.']),
], ['నీ స్కెచ్ చూపిస్తా రేపు అన్నా!', 'I will show you my sketch tomorrow anna!'],
  [['nee bomma chala bagundi', 'your drawing is very good'], ['charminar chudandi', 'go see Charminar']], ['అన్నా, నా బొమ్మ చూసావా?', 'Anna, have you seen my drawing?'], 2);
