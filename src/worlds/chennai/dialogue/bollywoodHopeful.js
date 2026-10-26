// Kollywood fan posing before the film cut-outs at the tea-kadai square.
import { dialogue as D, step as S } from './kit.js';

export default D('bollywoodHopeful', {
  name: 'Kutty', role: 'Kollywood fan', site: 'Tea-kadai square, Tamil film poster and cut-out wall', diff: 3,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Tall thin young fan in sunglasses and a headband, striking hero poses in front of the cut-outs and quoting invented punch dialogues.',
  goal: 'Compliment his pose, ask which film it is, and wish him luck.',
  steps: [
    S('pose', ['ஹாய்! எப்படி இருக்கு என் ஹீரோ போஸ்? தலைவர் ஸ்டைல்!', 'Hi! Eppadi irukku en hero pose? Thalaivar style!', 'Hi! How is my hero pose? Thalaivar style!'],
      'Compliment his pose.', ['Ungal pose romba super anna.', 'உங்க போஸ் ரொம்ப சூப்பர் அண்ணா.'],
      ['ungal pose romba super anna', 'unga pose super anna', 'pose romba nalla irukku anna', 'pose super anna', 'neenga hero maadhiri irukkeenga', 'உங்க போஸ் ரொம்ப சூப்பர்', 'போஸ் சூப்பர் அண்ணா'],
      'compliment_pose', ['Say something nice about the pose.', '"Pose super" works. Very = "romba".', 'Say: "Ungal pose romba super anna."'],
      ['ஹா! பாத்தீங்களா? கூலிங் கிளாஸ் போட்டா இன்னும் மாஸ்!', 'Haa! Paatheengalaa? Cooling glass pottaa innum mass!', 'Ha! See? With sunglasses it is even more mass!'],
      ['போஸ் எப்படின்னு சொல்லுங்க அக்கா!', 'Pose eppadinnu sollunga akka!', 'Tell me how the pose is, akka!']),
    S('film', ['இது அடுத்த வாரம் ரிலீஸ் ஆகுற படத்தோட கட் அவுட்!', 'Idhu adutha vaaram release aagura padatthoda cut out!', 'This is the cut-out of the film releasing next week!'],
      'Ask which film it is.', ['Edhu padam anna?', 'எது படம் அண்ணா?'],
      ['edhu padam anna', 'edhu padam', 'enna padam anna', 'indha padam peru enna', 'padam peru enna anna', 'எது படம் அண்ணா', 'என்ன படம் அண்ணா'],
      'ask_which_film', ['Ask the name of the film.', '"Edhu padam?" = which film?', 'Say: "Edhu padam anna?"'],
      ['மெட்ராஸ் மின்னல்! முதல் நாள் முதல் ஷோ டிக்கெட் எடுத்தாச்சு!', 'Madras Minnal! Mudhal naal mudhal show ticket edutthaachu!', 'Madras Minnal! I already have a first-day-first-show ticket!'],
      ['படம் பத்தி கேக்கறீங்களா? தெளிவா கேளுங்க.', 'Padam patthi kekkareengalaa? Thelivaa kelunga.', 'Asking about the film? Ask clearly.']),
    S('luck', ['படம் ஹிட் ஆனா நானும் ஹீரோ ஆயிடுவேன்!', 'Padam hit aanaa naanum hero aayiduven!', 'If the film is a hit, I will become a hero too!'],
      'Wish him luck.', ['Vaazhthukkal anna, jeyichiduveenga!', 'வாழ்த்துக்கள் அண்ணா, ஜெயிச்சிடுவீங்க!'],
      ['vaazhthukkal anna jeyichiduveenga', 'vaazhthukkal anna', 'all the best anna', 'jeyichiduveenga anna', 'nalla irukkum anna vaazhthukkal', 'வாழ்த்துக்கள் அண்ணா', 'ஜெயிச்சிடுவீங்க அண்ணா'],
      'wish_him_luck', ['Wish him well.', '"Vaazhthukkal" = best wishes.', 'Say: "Vaazhthukkal anna, jeyichiduveenga!"'],
      ['நன்றி அக்கா! நீங்க என் முதல் ரசிகை!', 'Nandri akka! Neenga en mudhal rasigai!', 'Thanks, akka! You are my first fan!'],
      ['வாழ்த்து சொல்ல மாட்டீங்களா அக்கா?', 'Vaazhthu solla maatteengalaa akka?', 'Will you not wish me luck, akka?']),
  ],
  outro: ['நான் பெரிய ஸ்டார் ஆனா, உங்களுக்கு பிரீ டிக்கெட்!', 'Naan periya star aanaa, ungalukku free ticket!', 'When I become a big star, a free ticket for you!'],
  learned: [['edhu padam?', 'which film?'], ['super', 'great'], ['vaazhthukkal', 'best wishes']],
  again: ['அக்கா, இன்னொரு போஸ் பாக்கறீங்களா?', 'Akka, innoru pose paakkareengalaa?', 'Akka, want to see another pose?'],
});
