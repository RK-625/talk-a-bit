// Food-delivery rider at his scooter, Fort St. George grounds.
import { dialogue as D, step as S } from './kit.js';

export default D('dabbawala', {
  name: 'Arun', role: 'food-delivery rider', site: 'Fort St. George grounds, delivery scooter', diff: 3,
  voice: { rate: 1.2, pitch: 1.0 },
  persona: 'Thin delivery rider in a red cap checking an order on his phone; always late, talks about traffic and addresses, and knows every tiffin spot in the city.',
  goal: 'Ask permission to ask a question, ask how he delivers so fast, and praise his work.',
  steps: [
    S('ask', ['மேடம், ஆர்டர் லேட் ஆகுது. சீக்கிரம் சொல்லுங்க!', 'Madam, order late aagudhu. Seekkiram sollunga!', 'Madam, the order is getting late. Tell me quickly!'],
      'Ask if you may ask one question.', ['Oru kelvi kekkalaamaa?', 'ஒரு கேள்வி கேக்கலாமா?'],
      ['oru kelvi kekkalaamaa', 'oru kelvi kekkalaama anna', 'oru question kekkalaamaa', 'konjam kekkalaamaa anna', 'oru nimisham kekkalaamaa', 'ஒரு கேள்வி கேக்கலாமா', 'ஒரு கேள்வி கேக்கலாமா அண்ணா'],
      'ask_permission_question', ['Ask if you can ask something.', '"Kelvi" = question.', 'Say: "Oru kelvi kekkalaamaa?"'],
      ['சரி, ஒரே ஒரு கேள்வி. ஸ்கூட்டர் ஸ்டார்ட் ஆயிட்டே இருக்கு.', 'Sari, ore oru kelvi. Scooter start aayitte irukku.', 'Okay, just one question. The scooter is already running.'],
      ['என்ன? ஹெல்மெட் போட்டிருக்கேன், கேக்கல.', 'Enna? Helmet pottirukken, kekkala.', 'What? I have my helmet on, cannot hear.']),
    S('fast', ['கேளுங்க கேளுங்க, ஆனா சீக்கிரம்.', 'Kelunga kelunga, aana seekkiram.', 'Ask, ask, but quickly.'],
      'Ask how he delivers so fast.', ['Eppadi seekkiram delivery pannureenga?', 'எப்படி சீக்கிரம் டெலிவரி பண்றீங்க?'],
      ['eppadi seekkiram delivery pannureenga', 'eppadi seekkiram pogareenga', 'neenga eppadi fast delivery pannureenga', 'eppadi indha speed-la poreenga', 'seekkiram eppadi anna', 'எப்படி சீக்கிரம் டெலிவரி பண்றீங்க', 'எப்படி இவ்ளோ வேகமா போறீங்க'],
      'ask_how_so_fast', ['Ask how he is so quick.', '"Eppadi" = how. "Seekkiram" = quickly.', 'Say: "Eppadi seekkiram delivery pannureenga?"'],
      ['சந்து சந்தா தெரியும் மேடம். ஜிபிஎஸ் விட நான் வேகம்!', 'Sandhu sandhaa theriyum madam. GPS vida naan vegam!', 'I know every lane, madam. I am faster than GPS!'],
      ['எப்படின்னு கேக்கறீங்களா? திரும்ப சொல்லுங்க.', 'Eppadinnu kekkareengalaa? Thirumba sollunga.', 'Are you asking how? Say it again.']),
    S('praise', ['எல்லாரும் லேட்டுன்னு திட்டுவாங்க. நீங்க எப்படி?', 'Ellaarum lettunnu thittuvaanga. Neenga eppadi?', 'Everyone scolds me for being late. What about you?'],
      'Praise him: say he works very well.', ['Neenga romba nalla velai pannureenga.', 'நீங்க ரொம்ப நல்லா வேலை பண்றீங்க.'],
      ['neenga romba nalla velai pannureenga', 'romba nalla velai anna', 'neenga super anna', 'nalla velai pannureenga', 'neenga romba seekkiram anna', 'நீங்க ரொம்ப நல்லா வேலை பண்றீங்க', 'நீங்க சூப்பர் அண்ணா'],
      'praise_delivery_rider', ['Say something nice about his work.', '"Nalla velai" = good work.', 'Say: "Neenga romba nalla velai pannureenga."'],
      ['நன்றி மேடம்! இது போல யாரும் சொல்லல. இந்தாங்க, ஒரு ஸ்வீட் எடுத்துக்கோங்க.', 'Nandri madam! Idhu pola yaarum sollala. Indhaanga, oru sweet edutthukkonga.', 'Thanks, madam! No one says this. Here, take a sweet.'],
      ['என்னை பத்தி நல்லதா சொல்லுங்க, ப்ளீஸ்!', 'Ennai patthi nalladhaa sollunga, please!', 'Say something nice about me, please!']),
  ],
  outro: ['ஆர்டர் போகணும், பை மீரா மேடம்!', 'Order poganum, bye Meera madam!', 'I must deliver this order, bye Meera madam!'],
  learned: [['oru kelvi kekkalaamaa?', 'may I ask one question?'], ['eppadi seekkiram?', 'how so fast?'], ['nalla velai pannureenga', 'you work well']],
  again: ['மேடம், இன்னொரு ஆர்டர் வந்துடுச்சு!', 'Madam, innoru order vandhuduchu!', 'Madam, another order has arrived!'],
});
