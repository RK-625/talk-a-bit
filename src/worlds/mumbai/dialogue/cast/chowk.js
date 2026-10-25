// The chowk (tapri square) and the chawl: bowler, newspaper vendor, skipping girl, kite boy, carrom players, tap woman.
import { dialogue as D, step as S } from './kit.js';

export const chowkCricketBowler = D('chowk-cricket-bowler', {
  name: 'Pappu', role: 'gully cricket bowler', site: 'Gully cricket pitch, the chowk', diff: 2,
  voice: { rate: 1.15, pitch: 1.35 },
  persona: 'Sweaty, bossy fast bowler of the gully team. Wants a fair umpire for once.',
  goal: 'Agree to be the umpire and give a decision.',
  steps: [
    S('umpire', ['छोटू, तू अंपायर बन जा ना!', 'Chotu, tu umpire ban ja na!', 'Chotu, be our umpire!'],
      'Agree to be the umpire.', ['Haan, main umpire banta hoon.', 'हाँ, मैं अंपायर बनता हूँ।'],
      ['haan main umpire banta hoon', 'main umpire banunga', 'theek hai umpire main', 'umpire main ban jata hoon', 'हाँ मैं अंपायर बनता हूँ', 'मैं अंपायर बनूँगा', 'ok i will be umpire', 'chalo main umpire'],
      'agree_to_umpire', ['Say yes, you will be the umpire.', '"umpire" is the same word; "banta hoon" = I become.', 'Say: "Haan, main umpire banta hoon."'],
      ['शाबाश! चल, पोज़ीशन ले।', 'Shabash! Chal, position le.', 'Well done! Come, take your position.'],
      ['अरे, अंपायर बनेगा या नहीं?', 'Arre, umpire banega ya nahi?', 'Hey, will you be umpire or not?']),
    S('decision', ['बॉल पैड पे लगी! आउट है ना?', 'Ball pad pe lagi! Out hai na?', 'It hit the pad! He is out, right?'],
      'Give your decision: he is out.', ['Out hai, ungli upar!', 'आउट है, उँगली ऊपर!'],
      ['out hai ungli upar', 'out hai', 'haan out hai', 'out diya', 'bilkul out hai', 'आउट है', 'आउट है उँगली ऊपर', 'its out', 'out hai bhai'],
      'give_out_decision', ['Say if the batter is out.', '"out hai" = he is out.', 'Say: "Out hai, ungli upar!"'],
      ['वाह! एकदम सही फ़ैसला!', 'Wah! Ekdum sahi faisla!', 'Wow! A perfectly correct decision!'],
      ['आउट या नॉट आउट? जल्दी बोल!', 'Out ya not out? Jaldi bol!', 'Out or not out? Say it fast!']),
  ],
  outro: ['तू तो असली अंपायर है, छोटू!', 'Tu toh asli umpire hai, Chotu!', 'You are a real umpire, Chotu!'],
  learned: [['main umpire banta hoon', 'I will be the umpire'], ['out hai, ungli upar', 'he is out, finger up']],
  again: ['फिर आया? इस बार फ़ैसला बदलना मत!', 'Phir aaya? Is baar faisla badalna mat!', 'Back again? Do not change your decision this time!'],
});

export const chowkNewspaperVendor = D('chowk-newspaper-vendor', {
  name: 'Ramesh Bhaiya', role: 'newspaper vendor', site: 'News stand, the chowk', diff: 2,
  voice: { rate: 1.05, pitch: 0.95 },
  persona: 'Cheerful paper-wala who reads every headline before he sells it. Loud morning voice.',
  goal: 'Buy a Hindi newspaper and react to the weather news.',
  steps: [
    S('paper', ['ताज़ा अख़बार! हिंदी या अंग्रेज़ी?', 'Taaza akhbaar! Hindi ya Angrezi?', 'Fresh paper! Hindi or English?'],
      'Ask for a Hindi newspaper.', ['Ek Hindi akhbaar dena.', 'एक हिंदी अख़बार देना।'],
      ['ek hindi akhbaar dena', 'hindi akhbaar dijiye', 'hindi wala dena', 'hindi akhbaar chahiye', 'एक हिंदी अख़बार देना', 'हिंदी अख़बार', 'one hindi paper', 'hindi mein dena'],
      'ask_hindi_newspaper', ['Say which paper you want.', '"Hindi akhbaar" = Hindi newspaper.', 'Say: "Ek Hindi akhbaar dena."'],
      ['ये ले, आज की गरमा-गरम ख़बरें!', 'Ye le, aaj ki garma-garam khabrein!', 'Here, today\'s hot news!'],
      ['कौन सा अख़बार चाहिए, भाई?', 'Kaun sa akhbaar chahiye, bhai?', 'Which paper do you want, brother?']),
  ],
  outro: ['पढ़ता रह छोटू, दुनिया की ख़बर रख।', 'Padhta rah Chotu, duniya ki khabar rakh.', 'Keep reading, Chotu, keep up with the world.'],
  learned: [['ek Hindi akhbaar dena', 'give me one Hindi newspaper']],
  again: ['आज दूसरा अख़बार लेगा क्या?', 'Aaj doosra akhbaar lega kya?', 'Will you take another paper today?'],
});

export const chowkSkipGirl = D('chowk-skip-girl', {
  name: 'Guddi', role: 'skipping kid', site: 'Open ground by the vada stall, the chowk', diff: 1,
  voice: { rate: 1.2, pitch: 1.5 },
  persona: 'Tiny show-off with a jump rope who keeps a score of her jumps and dares everyone to beat it.',
  goal: 'Count her jumps aloud and ask her to teach you.',
  steps: [
    S('count', ['छोटू! गिनती कर, मैं कूद रही हूँ!', 'Chotu! Ginti kar, main kood rahi hoon!', 'Chotu! Count, I am jumping!'],
      'Count her jumps: one to five.', ['Ek, do, teen, chaar, paanch!', 'एक, दो, तीन, चार, पाँच!'],
      ['ek do teen char paanch', 'ek do teen chaar paanch', 'एक दो तीन चार पाँच', 'ek do teen', 'one two three four five', 'ginti ek se paanch', 'ek, do, teen, chaar, paanch'],
      'count_to_five', ['Count her jumps out loud.', 'Hindi numbers: ek, do, teen...', 'Say: "Ek, do, teen, chaar, paanch!"'],
      ['वाह! तूने सही गिना!', 'Wah! Tune sahi gina!', 'Wow! You counted right!'],
      ['गिनती तो कर! ऊँची आवाज़ में!', 'Ginti toh kar! Unchi awaaz mein!', 'Do count! In a loud voice!']),
    S('teach', ['अब तू कूद! चल, चल, चल!', 'Ab tu kood! Chal, chal, chal!', 'Now you jump! Come on, come on!'],
      'Say you cannot skip and ask her to teach you.', ['Mujhe nahi aata, sikhao na.', 'मुझे नहीं आता, सिखाओ ना।'],
      ['mujhe nahi aata sikhao na', 'mujhe nahi aata', 'mujhe sikhao', 'sikhao na mujhe', 'मुझे नहीं आता सिखाओ ना', 'मुझे सिखाओ', 'i dont know teach me', 'mujhe sikhana'],
      'ask_to_be_taught', ['Tell her you do not know how.', '"sikhao" = teach me.', 'Say: "Mujhe nahi aata, sikhao na."'],
      ['ठीक है! पहले रस्सी ऐसे पकड़।', 'Theek hai! Pehle rassi aise pakad.', 'Okay! First hold the rope like this.'],
      ['कूदेगा कि नहीं? बोल ना!', 'Koodega ki nahi? Bol na!', 'Will you jump or not? Say it!']),
  ],
  outro: ['तू जल्दी सीख जाएगा, देखना!', 'Tu jaldi seekh jayega, dekhna!', 'You will learn fast, just see!'],
  learned: [['ek, do, teen, chaar, paanch', 'one, two, three, four, five'], ['mujhe nahi aata, sikhao na', 'I do not know how, teach me']],
  again: ['अरे आ गया! अब मैं सौ बार कूदूँगी!', 'Arre aa gaya! Ab main sau baar koodungi!', 'Oh you came! Now I will jump a hundred times!'],
});

export const chowkKiteBoy = D('chowk-kite-boy', {
  name: 'Pintu', role: 'kite-flying kid', site: 'Lane south of the tapri, the chowk', diff: 2,
  voice: { rate: 1.1, pitch: 1.3 },
  persona: 'Dreamy kid with his head in the sky, fighting kite battles with the rooftop boys.',
  goal: 'Hold the charkhi (spool) and tell him to loosen the string.',
  steps: [
    S('spool', ['छोटू, ज़रा मेरी चरखी पकड़ ना!', 'Chotu, zara meri charkhi pakad na!', 'Chotu, hold my spool for a second!'],
      'Say yes and ask for the spool.', ['Haan, de, main pakadta hoon.', 'हाँ, दे, मैं पकड़ता हूँ।'],
      ['haan de main pakadta hoon', 'de main pakad leta hoon', 'haan charkhi de', 'laao main pakadta hoon', 'हाँ दे मैं पकड़ता हूँ', 'दे मैं पकड़ता हूँ', 'yes give me the spool', 'main pakad leta hoon'],
      'agree_hold_spool', ['Say yes, you will hold it.', '"pakadta hoon" = I hold.', 'Say: "Haan, de, main pakadta hoon."'],
      ['ये ले! कसके पकड़ना, भागने मत देना।', 'Ye le! Kaske pakadna, bhaagne mat dena.', 'Here! Hold it tight, do not let it run away.'],
      ['पकड़ेगा या नहीं? पतंग उड़ रही है!', 'Pakdega ya nahi? Patang ud rahi hai!', 'Will you hold it or not? The kite is flying!']),
  ],
  outro: ['तूने तो पेच जिता दिया! वो काटा!', 'Tune toh pench jita diya! Woh kata!', 'You won the kite fight! It is cut!'],
  learned: [['main pakadta hoon', 'I will hold it']],
  again: ['चरखी फिर पकड़ेगा? हवा आज बढ़िया है!', 'Charkhi phir pakdega? Hawa aaj badhiya hai!', 'Will you hold the spool again? The wind is great today!'],
});

export const chawlCarromMan = D('chawl-carrom-man', {
  name: 'Dinesh Kaka', role: 'carrom player', site: 'Chawl first-floor balcony', diff: 2,
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Vest-and-lungi chawl uncle who never loses at carrom, and tells you so every evening.',
  goal: 'Accept a game of carrom and let him go first.',
  steps: [
    S('play', ['आ बैठ, एक बोर्ड खेलेगा क्या?', 'Aa baith, ek board khelega kya?', 'Come sit, will you play a board?'],
      'Say yes, you will play a board.', ['Haan kaka, ek board khelte hain.', 'हाँ काका, एक बोर्ड खेलते हैं।'],
      ['haan kaka ek board khelte hain', 'ek board khelte hain', 'haan kaka khelunga', 'chalo kaka khelte hain', 'हाँ काका एक बोर्ड खेलते हैं', 'चलो काका खेलते हैं', 'yes kaka lets play', 'haan khelunga'],
      'accept_carrom_game', ['Say yes to the game.', '"khelte hain" = let us play.', 'Say: "Haan kaka, ek board khelte hain."'],
      ['शाबाश! पाउडर मैं डालता हूँ।', 'Shabash! Powder main daalta hoon.', 'Great! I will sprinkle the powder.'],
      ['खेलना है कि सिर्फ़ देखना है?', 'Khelna hai ki sirf dekhna hai?', 'Do you want to play or just watch?']),
  ],
  outro: ['तू अच्छा सीख रहा है, कल बदला लेना!', 'Tu achha seekh raha hai, kal badla lena!', 'You are learning well, take revenge tomorrow!'],
  learned: [['ek board khelte hain', 'let us play a board']],
  again: ['फिर आ गया? आज रानी मेरी ही है!', 'Phir aa gaya? Aaj rani meri hi hai!', 'Back again? Today the queen is mine!'],
});

export const chawlCarromElder = D('chawl-carrom-elder', {
  name: 'Joshi Sir', role: 'elder carrom player', site: 'Chawl first-floor balcony', diff: 3,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Retired maths teacher in spectacles who quizzes every child who passes the balcony.',
  goal: 'Tell him school is going well and answer a times-table question.',
  steps: [
    S('school', ['छोटू, स्कूल कैसा चल रहा है?', 'Chotu, school kaisa chal raha hai?', 'Chotu, how is school going?'],
      'Say your studies are going well.', ['Haan sir, padhai achhi chal rahi hai.', 'हाँ सर, पढ़ाई अच्छी चल रही है।'],
      ['haan sir padhai achhi chal rahi hai', 'padhai achhi chal rahi hai', 'sab theek hai sir', 'school badhiya hai sir', 'हाँ सर पढ़ाई अच्छी चल रही है', 'पढ़ाई अच्छी चल रही है', 'my studies are going well', 'bahut achha chal raha hai'],
      'say_studies_going_well', ['Tell him school is fine.', '"padhai" = studies.', 'Say: "Haan sir, padhai achhi chal rahi hai."'],
      ['वाह! तो अब मुझे एक सवाल का जवाब दे।', 'Wah! Toh ab mujhe ek sawaal ka jawaab de.', 'Good! Now answer one question for me.'],
      ['पढ़ाई का हाल बता, छोटू।', 'Padhai ka haal bata, Chotu.', 'Tell me how your studies are, Chotu.']),
    S('maths', ['बता, सात आठ कितने होते हैं?', 'Bata, saat aath kitne hote hain?', 'Tell me, how much is seven eights?'],
      'Answer: seven eights are fifty-six.', ['Saat aath chhappan.', 'सात आठ छप्पन।'],
      ['saat aath chhappan', 'chhappan', 'saat aath chappan', 'सात आठ छप्पन', 'छप्पन', 'fifty six', '56', 'saat aath chhappan hote hain'],
      'answer_seven_eights', ['Use the times table.', '56 in Hindi is "chhappan".', 'Say: "Saat aath chhappan."'],
      ['शाबाश! गणित का राजा!', 'Shabash! Ganit ka raja!', 'Bravo! King of maths!'],
      ['सोच, सात आठ... कितने?', 'Soch, saat aath... kitne?', 'Think, seven eights... how many?']),
  ],
  outro: ['पढ़ता रह, एक दिन बड़ा आदमी बनेगा।', 'Padhta rah, ek din bada aadmi banega.', 'Keep studying, one day you will be a big man.'],
  learned: [['padhai achhi chal rahi hai', 'my studies are going well'], ['saat aath chhappan', 'seven eights are fifty-six']],
  again: ['आ गया? चल, आज नौ सात पूछता हूँ।', 'Aa gaya? Chal, aaj nau saat poochta hoon.', 'You are here? Come, today I ask nine sevens.'],
});

export const chawlTapWoman = D('chawl-tap-woman', {
  name: 'Kamla Tai', role: 'woman at the common tap', site: 'Chawl second-floor common tap', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Tired but warm chawl tai, queueing for water with a row of steel pots, knows everyone\'s business.',
  goal: 'Help lift her bucket and ask when the water comes.',
  steps: [
    S('bucket', ['बेटा, मेरी बाल्टी उठाने में मदद करेगा?', 'Beta, meri balti uthane mein madad karega?', 'Child, will you help me lift my bucket?'],
      'Offer to lift the bucket for her.', ['Haan tai, main utha deta hoon.', 'हाँ ताई, मैं उठा देता हूँ।'],
      ['haan tai main utha deta hoon', 'main utha deta hoon', 'tai laiye main uthata hoon', 'haan madad karta hoon', 'हाँ ताई मैं उठा देता हूँ', 'मैं उठा देता हूँ', 'yes i will lift it', 'laao tai main utha leta hoon'],
      'offer_lift_bucket', ['Offer to help with the bucket.', '"utha deta hoon" = I lift it for you.', 'Say: "Haan tai, main utha deta hoon."'],
      ['जीता रह बेटा! तू बड़ा भला है।', 'Jeeta rah beta! Tu bada bhala hai.', 'Bless you, child! You are very kind.'],
      ['बाल्टी भारी है, मदद करेगा?', 'Balti bhaari hai, madad karega?', 'The bucket is heavy, will you help?']),
  ],
  outro: ['शुक्रिया बेटा, चाय पीने आना कभी।', 'Shukriya beta, chai peene aana kabhi.', 'Thank you child, come for tea sometime.'],
  learned: [['main utha deta hoon', 'I will lift it for you']],
  again: ['अरे बेटा, फिर आया? आज बाल्टी तीन हैं!', 'Arre beta, phir aaya? Aaj balti teen hain!', 'Oh child, back again? Today there are three buckets!'],
});
