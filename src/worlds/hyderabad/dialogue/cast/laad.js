// Two more Laad Bazaar bangle sellers at the Charminar plaza stalls.
import { P, step as S } from '../kit.js';

export const bangleA = P('laad-bangle-seller-bangleA', 'Haji Saab', 'Laad Bazaar bangle seller (elderly man)', 'Laad Bazaar stalls by Charminar, stall A', 'o', 'Ask the difference between lac and glass bangles.', [
  S('lac', ['లక్క గాజులు, పెళ్ళి గాజులు! సైజు ప్రకారం పెడుతున్నా.', 'Lac bangles, wedding bangles! I am arranging them by size.'],
    'Ask what a lac bangle is.', 'లక్క గాజులు అంటే ఏమిటి?',
    ['lakka gajulu ante emiti', 'lakka gajulu ante enti', 'lac bangles ante enti saab', 'lakka gajulu enti', 'లక్క గాజులు అంటే ఏమిటి'],
    ['Ask about lac bangles.', 'Lac = "lakka". What is = "ante emiti".'],
    ['లక్కతో చేసి రంగురాళ్ళు అద్దుతాం బాబూ. ఇది లాడ్ బజార్ ప్రత్యేకత.', 'Made of lac with stones set in, dear. A Laad Bazaar speciality.'],
    ['ఏమన్నావు బాబూ? చెవి సరిగా వినదు.', 'What did you say dear? My ears are weak.']),
  S('size', ['మీ అమ్మగారి చేతి సైజు ఎంత?', 'What is your mother\'s wrist size?'],
    'Say you do not know the size.', 'నాకు సైజు తెలియదు.',
    ['naaku size teliyadu', 'size teliyadu saab', 'naaku measurement teliyadu', 'size teleedu', 'నాకు సైజు తెలియదు'],
    ['Be honest.', 'Size = "size". I do not know = "teliyadu".'],
    ['పర్లేదు బాబూ, మధ్యస్థంది ఇస్తాను, మార్చుకోవచ్చు.', 'No problem dear, I will give a medium one, you can exchange.'],
    ['సైజు తెలుసా బాబూ? చెప్పు.', 'Do you know the size, dear? Say.']),
], ['అమ్మకి నా సలాం చెప్పు బాబూ, ఆల్ ది బెస్ట్.', 'Give my salaam to your mother dear, all the best.'],
  [['lakka gajulu ante emiti', 'what are lac bangles'], ['naaku size teliyadu', 'I do not know the size']], ['బాబూ, అమ్మకి గాజులు నచ్చాయా?', 'Dear, did your mother like the bangles?'], 3);

export const bangleB = P('laad-bangle-seller-bangleB', 'Nasreen', 'Laad Bazaar bangle seller (young woman)', 'Laad Bazaar stalls by Charminar, stall B', 'f', 'Ask her to be gentle fitting the bangles and thank her.', [
  S('gentle', ['చేయి ఇవ్వండి, గాజులు తొడుగుతున్నా! కొంచెం నొప్పి ఉంటుంది.', 'Give your hand, I am fitting the bangles! It may hurt a little.'],
    'Ask her to do it slowly.', 'మెల్లగా తొడగండి, ప్లీజ్.',
    ['mellaga todagandi please', 'mellaga todagandi akka', 'konchem mellaga akka', 'mellaga cheyandi', 'మెల్లగా తొడగండి, ప్లీజ్'],
    ['Ask her to be gentle.', 'Slowly = "mellaga". Put on = "todagandi".'],
    ['సరే అన్నయ్యా, మెల్లగా. చేతికి నూనె రాస్తాను.', 'Okay brother, slowly. I will put some oil on the hand.'],
    ['ఏమన్నారు అన్నయ్యా?', 'What did you say, brother?']),
  S('thanks', ['అయిపోయింది! ఎంత బాగా సరిపోయాయో చూడండి!', 'Done! See how well they fit!'],
    'Say they look lovely and thank her.', 'చాలా బాగున్నాయి, ధన్యవాదాలు అక్కా.',
    ['chala bagunnayi dhanyavadalu akka', 'chala bagunnayi akka thanks', 'super unnayi akka', 'thanks akka bagunnayi', 'చాలా బాగున్నాయి, ధన్యవాదాలు అక్కా'],
    ['Compliment and thank.', 'They are nice = "bagunnayi".'],
    ['సంతోషం అన్నయ్యా! మళ్ళీ రండి, కొత్త డిజైన్లు వస్తాయి.', 'Happy brother! Come again, new designs are coming.'],
    ['నచ్చాయా లేదా అన్నయ్యా?', 'Do you like them or not, brother?']),
], ['ఉద్యోగం రాగానే చెల్లికి కూడా గాజులు తీసుకెళ్ళండి!', 'When you get the job, take bangles for your sister too!'],
  [['mellaga todagandi', 'put them on slowly'], ['chala bagunnayi dhanyavadalu akka', 'they are lovely, thank you akka']], ['అన్నయ్యా, ఇంకో సెట్ చూస్తారా?', 'Brother, want to see another set?'], 3);
