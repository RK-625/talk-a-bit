// The small Telangana-style temple: the bells, the offering stall and the chappal stand.
import { P, step as S } from '../kit.js';

export const bellDevotee = P('temple-bell-devotee', 'Padma', 'devotee at the bells', 'Temple, bell torana', 'f', 'Ask if it is okay to ring the bell.', [
  S('bell', ['గంట కొట్టి మనసులో ప్రార్థించుకో బాబూ.', 'Ring the bell and pray in your mind, dear.'],
    'Ask if you may ring the bell.', 'గంట కొట్టవచ్చా అమ్మా?',
    ['ganta kottavacha amma', 'ganta kottochha amma', 'ganta kottacha', 'ee ganta kottavacha', 'గంట కొట్టవచ్చా అమ్మా'],
    ['Ask politely.', 'Bell = "ganta". Hit = "kottu".'],
    ['కొట్టు బాబూ, ఒకసారి మెల్లగా.', 'Ring it, dear, once, gently.'],
    ['ఏమన్నావు బాబూ? మళ్ళీ చెప్పు.', 'What did you say dear? Say again.']),
], ['నీ కోరిక నెరవేరుతుంది బాబూ.', 'Your wish will come true, dear.'],
  [['ganta kottavacha amma', 'may I ring the bell, mother']], ['బాబూ, గంట మోగించావా?', 'Dear, did you ring the bell?']);

export const offeringWoman = P('temple-offering-pilgrim', 'Rajeshwari', 'devotee at the offering stall', 'Temple, coconut and flower stall', 'f', 'Ask what to offer the goddess.', [
  S('offer', ['కొబ్బరికాయ కొట్టి అమ్మవారికి సమర్పిస్తున్నా.', 'I am breaking a coconut and offering it to the Goddess.'],
    'Ask what else to offer.', 'అమ్మవారికి ఇంకా ఏం సమర్పించాలి?',
    ['ammavariki inka em samarpinchali', 'ammavariki em samarpinchali', 'inka em ivvali ammavariki', 'ammavariki em teesukellali', 'అమ్మవారికి ఇంకా ఏం సమర్పించాలి'],
    ['Ask what else.', 'To the Goddess = "ammavariki". Offer = "samarpinchu".'],
    ['పూలు, పసుపు, కుంకుమ ఇవ్వండి. అంతే చాలు.', 'Give flowers, turmeric and kumkum. That is enough.'],
    ['ఏం అడుగుతున్నారు? స్పష్టంగా చెప్పండి.', 'What are you asking? Say it clearly.']),
  S('wish', ['నువ్వు ఏం కోరుకుంటున్నావు బాబూ?', 'What are you wishing for, dear?'],
    'Say you pray for a job.', 'నేను ఉద్యోగం రావాలని కోరుకుంటున్నాను.',
    ['nenu udyogam ravalani korukuntunnanu', 'udyogam ravalani korukuntunnanu', 'naaku job ravali', 'job ravalani korukuntunnanu', 'నేను ఉద్యోగం రావాలని కోరుకుంటున్నాను'],
    ['Say your wish.', 'Job = "udyogam". Wish = "korukuntunnanu".'],
    ['అమ్మవారు తప్పకుండా దీవిస్తుంది బాబూ.', 'The Goddess will surely bless you, dear.'],
    ['ఏం కోరుకుంటున్నావో చెప్పు.', 'Tell me what you wish for.']),
], ['జయ అమ్మవారికి, నీకు శుభం కలగాలి.', 'Victory to the Goddess, may you have good luck.'],
  [['ammavariki em samarpinchali', 'what should I offer the Goddess'], ['udyogam ravalani korukuntunnanu', 'I wish to get a job']], ['బాబూ, ప్రార్థన అయిందా?', 'Dear, is the prayer done?'], 2);

export const templeFlowers = P('temple-flower-seller', 'Saraswati', 'flower and coconut seller', 'Temple, offering stall', 'f', 'Buy one coconut and flowers.', [
  S('buy', ['పువ్వులు, కొబ్బరికాయలు! పూజకి కావాలా?', 'Flowers, coconuts! Need them for puja?'],
    'Ask for a coconut and some flowers.', 'ఒక కొబ్బరికాయ, కొన్ని పూలు ఇవ్వండి.',
    ['oka kobbarikaya konni poolu ivvandi', 'kobbarikaya poolu ivvandi', 'oka kobbarikaya ivvandi amma', 'puja saamagri ivvandi', 'ఒక కొబ్బరికాయ, కొన్ని పూలు ఇవ్వండి'],
    ['Order the puja items.', 'Coconut = "kobbarikaya". Flowers = "poolu".'],
    ['ఇదిగో బాబూ, ముప్పై రూపాయలు.', 'Here dear, thirty rupees.'],
    ['పూలా, కొబ్బరికాయా? చెప్పు బాబూ.', 'Flowers or coconut? Say dear.']),
], ['ప్రార్థన బాగా చేయి బాబూ.', 'Pray well, dear.'],
  [['oka kobbarikaya konni poolu ivvandi', 'give me a coconut and some flowers']], ['బాబూ, పూలు కావాలా మళ్ళీ?', 'Dear, want flowers again?']);

export const shoeKeeper = P('temple-shoe-keeper', 'Appaiah', 'chappal-stand keeper', 'Temple, by the row of chappals', 'o', 'Leave your chappals and ask for a token.', [
  S('token', ['చెప్పులు ఇక్కడ వదులు బాబూ, టోకెన్ ఇస్తాను.', 'Leave your chappals here dear, I will give a token.'],
    'Ask for a token for your chappals.', 'నా చెప్పులకు టోకెన్ ఇవ్వండి.',
    ['naa cheppulaku token ivvandi', 'cheppulaku token ivvandi tatagaru', 'token ivvandi naa cheppulaku', 'oka token ivvandi', 'నా చెప్పులకు టోకెన్ ఇవ్వండి'],
    ['Ask for the token.', 'My chappals = "naa cheppulu". Token = "token".'],
    ['ఇదిగో టోకెన్ నంబర్ పన్నెండు. పోగొట్టుకోకు.', 'Here is token number twelve. Do not lose it.'],
    ['టోకెన్ కావాలా బాబూ? చెప్పు.', 'Want a token, dear? Say.']),
  S('rate', ['టోకెన్ తో వస్తే నేను చెప్పులు ఇస్తాను.', 'Come with the token and I give the chappals.'],
    'Ask how much to pay.', 'ఎంత ఇవ్వాలి?',
    ['enta ivvali', 'enta ivvalandi tatagaru', 'dabbulu enta', 'enta ivvali chappals ki', 'ఎంత ఇవ్వాలి'],
    ['Ask the fee.', 'How much to give = "enta ivvali".'],
    ['రెండు రూపాయలే బాబూ, అదీ నీ ఇష్టం.', 'Just two rupees dear, and that too as you wish.'],
    ['ఏం అడిగావు బాబూ?', 'What did you ask, dear?']),
], ['దర్శనం బాగా చేసి రా బాబూ.', 'Have a good darshan and come back, dear.'],
  [['naa cheppulaku token ivvandi', 'give me a token for my chappals'], ['enta ivvali', 'how much to give']], ['బాబూ, టోకెన్ ఉందా?', 'Dear, do you have the token?'], 2);
