// Ten Hyderabadis standing about on open ground.
import { P, step as S } from '../kit.js';

export const street1 = P('street-1', 'Anand', 'Hyderabadi man', 'open ground', 'm', 'Tell him his friend will come soon.', [
  S('wait', ['ఫ్రెండ్ కోసం ఎదురు చూస్తున్నా, ఇంకా రాలేదు.', 'I am waiting for a friend, he has not come yet.'],
    'Tell him the friend will come soon.', 'మీ ఫ్రెండ్ త్వరలో వస్తాడు లెండి.',
    ['mee friend tvaralo vastadu lendi', 'friend vastadu anna', 'vastadu anna konchem sepu', 'mee friend tondaraga vastadu', 'మీ ఫ్రెండ్ త్వరలో వస్తాడు'],
    ['Reassure him.', 'Soon = "tvaralo". He will come = "vastadu".'],
    ['అవునా? థాంక్స్ అండి.', 'Is that so? Thanks.'],
    ['ఏమన్నారు? ఫోన్ చూస్తున్నా.', 'What did you say? Looking at my phone.']),
], ['బై, ఉద్యోగం త్వరగా దొరకాలి మీకు!', 'Bye, may you find a job soon!'],
  [['friend tvaralo vastadu', 'your friend will come soon']], ['ఫ్రెండ్ ఇంకా రాలేదండి.', 'The friend has not come yet.']);

export const street2 = P('street-2', 'Sridevi', 'Hyderabadi woman', 'open ground', 'f', 'Ask what she is looking at.', [
  S('watch', ['ఇక్కడ నిలబడి చూస్తుంటే టైమ్ తెలియదు.', 'Standing and watching here, you lose track of time.'],
    'Ask what she is looking at.', 'మీరు ఏం చూస్తున్నారు?',
    ['meeru em chustunnaru', 'em chustunnaru akka', 'meeru enti chustunnaru', 'akka em chustunnaru', 'మీరు ఏం చూస్తున్నారు'],
    ['Ask her.', 'What = "em". Looking = "chustunnaru".'],
    ['అలా జనం వెళ్ళడం చూస్తున్నా. భలే సరదా.', 'Just watching people go by. Great fun.'],
    ['ఏం అడిగారు? మళ్ళీ చెప్పండి.', 'What did you ask? Say again.']),
], ['మీరు కూడా కాసేపు ఆగండి, బాగుంటుంది.', 'You also stop for a while, it is nice.'],
  [['meeru em chustunnaru', 'what are you looking at']], ['మళ్ళీ కనిపించారే?', 'You appear again?']);

export const street3 = P('street-3', 'Teja', 'Hyderabadi teen', 'open ground', 'q', 'Ask what happened in the story.', [
  S('story', ['ఏమైందో తెలుసా అన్నా, నిన్న కాలేజీలో...', 'You know what happened anna, yesterday in college...'],
    'Ask what happened.', 'ఏమైంది, చెప్పు.',
    ['emaindi cheppu', 'emaindi cheppu teja', 'enti jarigindi cheppu', 'emaindi anna cheppu', 'ఏమైంది, చెప్పు'],
    ['Ask him to go on.', 'What happened = "emaindi".'],
    ['ఒక పెద్ద ఇంటర్వ్యూ మిస్ అయ్యాడు, మన సీనియర్!', 'Our senior missed a big interview!'],
    ['చెప్పనా వద్దా అన్నా?', 'Shall I tell or not, anna?']),
], ['నువ్వు మాత్రం టైమ్ కి వెళ్ళు అన్నా!', 'You make sure you reach on time anna!'],
  [['emaindi cheppu', 'what happened, tell me']], ['అన్నా, ఇంకో కథ చెప్పనా?', 'Anna, shall I tell another story?']);

export const street4 = P('street-4', 'Venkataiah', 'elderly man', 'open ground', 'o', 'Ask what the headline is.', [
  S('headline', ['ఛ ఛ, ఏం వార్తలు ఇవన్నీ!', 'Tsk tsk, what news is all this!'],
    'Ask him what the headline says.', 'హెడ్‌లైన్ ఏం చెబుతోంది తాతగారూ?',
    ['headline em chebutondi tatagaru', 'headline enti tata', 'em rasaru tatagaru', 'pedda varta enti', 'హెడ్ లైన్ ఏం చెబుతోంది'],
    ['Ask about the news.', 'Headline = "headline". Says = "chebutondi".'],
    ['ధరలు పెరిగాయట. మరి నీ ఉద్యోగ వార్త ఎప్పుడు?', 'Prices are up. And when is your job news?'],
    ['ఏం అడిగావు బాబూ? చెప్పు గట్టిగా.', 'What did you ask dear? Say loudly.']),
], ['జాగ్రత్తగా ఉండు బాబూ, నీ కాలం వస్తుంది.', 'Take care dear, your time will come.'],
  [['headline em chebutondi', 'what does the headline say']], ['బాబూ, ఈ రోజు పేపర్ చదివావా?', "Dear, read today's paper?"]);

export const street5 = P('street-5', 'Shiva', 'Hyderabadi man', 'open ground', 'm', 'Suggest an auto instead of a cab.', [
  S('cab', ['క్యాబ్ ఎంత సేపటికీ రావట్లేదు, ఏం చేయాలి?', 'The cab is not coming at all, what to do?'],
    'Suggest taking an auto instead.', 'ఆటో తీసుకోండి అన్నా, తొందరగా వెళ్ళొచ్చు.',
    ['auto teesukondi anna tondaraga vellochu', 'auto teesuko anna', 'auto ekkandi anna', 'auto better anna', 'ఆటో తీసుకోండి అన్నా'],
    ['Give advice.', 'Take an auto = "auto teesukondi".'],
    ['సరే, మంచి ఐడియా! థాంక్స్.', 'Okay, good idea! Thanks.'],
    ['ఏమన్నారు? ఫోన్ చూసుకుంటున్నా.', 'What did you say? Checking my phone.']),
], ['ఆల్ ది బెస్ట్ ఉద్యోగ వేటలో!', 'All the best for the job hunt!'],
  [['auto teesukondi anna', 'take an auto, anna']], ['అన్నా, ఆటో దొరికిందా?', 'Anna, did you get an auto?']);

export const street6 = P('street-6', 'Haritha', 'Hyderabadi woman', 'open ground', 'f', 'Ask what is so funny.', [
  S('smile', ['హిహి, ఈ మెసేజ్ చూడు, భలే ఉంది!', 'Hehe, look at this message, it is so funny!'],
    'Ask what is so funny.', 'ఏంటి అంత నవ్వు?',
    ['enti anta navvu', 'enti anta navvutunnaru akka', 'enti anta funny', 'em navvutunnaru', 'ఏంటి అంత నవ్వు'],
    ['Ask what is funny.', 'Smile = "navvu".'],
    ['మా ఫ్రెండ్ ఇంటర్వ్యూ లో జరిగిన తమాషా కథ!', "A funny tale from my friend's interview!"],
    ['ఏమన్నావు? చూడలేదు, మళ్ళీ చెప్పు.', 'What did you say? Missed it, say again.']),
], ['నువ్వు కూడా నవ్వుతూ ఉండు, ఇంటర్వ్యూ లో హెల్ప్ అవుతుంది.', 'You keep smiling too, it helps in interviews.'],
  [['enti anta navvu', 'what is so funny']], ['సమీర్, మళ్ళీ కలిశావా!', 'Sameer, we meet again!']);

export const street7 = P('street-7', 'Seshaiah', 'elderly man', 'open ground, in the shade', 'o', 'Agree that the sun is strong.', [
  S('shade', ['ఎండ తీవ్రంగా ఉంది బాబూ, నీడలో కూర్చున్నా.', 'The sun is strong dear, I am sitting in the shade.'],
    'Say the sun is very strong today.', 'ఈ రోజు ఎండ చాలా ఎక్కువగా ఉంది.',
    ['ee roju enda chala ekkuvaga undi', 'enda chala ekkuva undi tatagaru', 'chala enda undi ee roju', 'ee roju chala vedi', 'ఈ రోజు ఎండ చాలా ఎక్కువగా ఉంది'],
    ['Agree about the heat.', 'Sun = "enda". Very much = "chala ekkuvaga".'],
    ['అవును బాబూ, నీళ్ళు తాగుతూ ఉండు.', 'Yes dear, keep drinking water.'],
    ['ఎండ గురించి చెప్పు బాబూ.', 'Say something about the sun, dear.']),
], ['నీడలో నడువు బాబూ.', 'Walk in the shade, dear.'],
  [['ee roju enda chala ekkuvaga undi', 'the sun is very strong today']], ['బాబూ, నీళ్ళు తాగావా?', 'Dear, did you drink water?']);

export const street8 = P('street-8', 'Karthik', 'Hyderabadi teen', 'open ground', 'q', 'Suggest going to the lake.', [
  S('bored', ['చాలా బోర్ కొడుతోంది అన్నా, ఎక్కడికైనా వెళ్దామా?', 'So bored anna, shall we go somewhere?'],
    'Suggest going to the lake.', 'హుస్సేన్ సాగర్ కి వెళ్ళండి, అక్కడ బాగుంటుంది.',
    ['hussain sagar ki vellandi akkada bagutundi', 'lake ki vellandi', 'hussain sagar ki vellu', 'necklace road ki vellandi', 'హుస్సేన్ సాగర్ కి వెళ్ళండి'],
    ['Suggest a place.', 'Go to = "ki vellandi". There = "akkada".'],
    ['అవును అన్నా! బోటు కూడా ఎక్కొచ్చు.', 'Yes anna! We can take a boat too.'],
    ['ఏమన్నావు అన్నా? ఫోన్ లో ఉన్నా.', 'What did you say anna? Stuck on my phone.']),
], ['థాంక్స్ అన్నా, వెళ్తా!', 'Thanks anna, I will go!'],
  [['hussain sagar ki vellandi', 'go to Hussain Sagar']], ['అన్నా, సాగర్ బాగుందా?', 'Anna, is the lake nice?']);

export const street9 = P('street-9', 'Bhaskar Rao', 'Hyderabadi man', 'open ground', 'm', 'Say you did not see the match.', [
  S('cricket', ['నిన్న మ్యాచ్ చూశావా? ఎంత అద్భుతం!', "Did you see yesterday's match? So amazing!"],
    'Say you did not see it, but love cricket.', 'నేను చూడలేదు, కానీ క్రికెట్ అంటే ఇష్టం.',
    ['nenu chudaledu kani cricket ante ishtam', 'chudaledu cricket ishtam anna', 'nenu chudaledu', 'cricket naaku ishtam', 'నేను చూడలేదు, కానీ క్రికెట్ ఇష్టం'],
    ['Be honest.', 'I did not see = "chudaledu". I love = "ishtam".'],
    ['అయ్యో! నేను హైలైట్స్ చూపిస్తాను రా.', 'Oh! I will show you highlights, come.'],
    ['చూశావా లేదా? చెప్పు.', 'Did you see or not? Say.']),
], ['ఉద్యోగం వచ్చాక కలిసి మ్యాచ్ చూద్దాం!', 'Let us watch a match together once you get a job!'],
  [['nenu chudaledu', 'I did not watch it']], ['క్రికెట్ ఈ రోజు ఉందా?', 'Is there cricket today?']);

export const street10 = P('street-10', 'Padmavathi', 'Hyderabadi woman', 'open ground', 'f', 'Offer to help carry her shopping.', [
  S('bags', ['బాబూ, ఈ సంచులు చాలా బరువు, ఊపిరి ఆడట్లేదు.', 'Dear, these bags are so heavy, I am out of breath.'],
    'Offer to carry one bag.', 'ఒక సంచి నేను మోస్తాను.',
    ['oka sanchi nenu mostanu', 'oka bag nenu mostanu amma', 'sanchi ivvandi nenu mostanu', 'nenu kuda mostanu', 'ఒక సంచి నేను మోస్తాను'],
    ['Offer help.', 'One bag = "oka sanchi". I will carry = "mostanu".'],
    ['నువ్వు చాలా మంచివాడివి బాబూ. ఇదిగో తీసుకో.', 'You are very kind dear. Here, take it.'],
    ['ఏమన్నావు బాబూ? సరిగ్గా చెప్పు.', 'What did you say dear? Say clearly.']),
], ['దేవుడు నీకు మంచి ఉద్యోగం ఇస్తాడు బాబూ.', 'God will give you a good job, dear.'],
  [['oka sanchi nenu mostanu', 'I will carry one bag']], ['బాబూ, ఇంకా సంచులు ఉన్నాయి!', 'Dear, there are more bags!']);
