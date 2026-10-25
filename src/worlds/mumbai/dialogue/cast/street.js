// The ten everyday Mumbaikars (street-1 ... street-10) who fill the empty stretches of the city.
// Their idle pose is seeded (phone, chat, newspaper), so each dialogue stands on its own wherever they are.
import { dialogue as D, step as S } from './kit.js';

export const street1 = D('street-1', {
  name: 'Anil Bhai', role: 'Mumbaikar (man)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Tired office clerk on his way home who is craving a cup of tea and has no idea where the nearest tapri is.',
  goal: 'Tell him where to find tea and give simple directions.',
  steps: [
    S('chai', ['भाई, आसपास चाय कहाँ मिलेगी?', 'Bhai, aaspaas chai kahan milegi?', 'Brother, where can I get tea around here?'],
      'Tell him there is a tapri nearby, straight ahead.', ['Paas mein tapri hai, seedha jaiye.', 'पास में टपरी है, सीधा जाइए।'],
      ['paas mein tapri hai seedha jaiye', 'tapri paas mein hai', 'seedha jaiye tapri milegi', 'wahan tapri hai', 'पास में टपरी है सीधा जाइए', 'सीधा जाइए टपरी मिलेगी', 'there is a tapri nearby go straight', 'seedha jaake tapri hai'],
      'direct_to_tapri', ['Point him to a tea stall.', '"tapri" = tea stall, "seedha" = straight.', 'Say: "Paas mein tapri hai, seedha jaiye."'],
      ['शुक्रिया! जान बचा दी तूने।', 'Shukriya! Jaan bacha di toone.', 'Thank you! You saved my life.'],
      ['चाय कहाँ मिलेगी, बता ना?', 'Chai kahan milegi, bata na?', 'Where will I find tea, tell me?']),
  ],
  outro: ['चल, तुझे भी एक कटिंग पिलाता हूँ।', 'Chal, tujhe bhi ek cutting pilata hoon.', 'Come, I will treat you to a cutting too.'],
  learned: [['paas mein tapri hai, seedha jaiye', 'there is a tapri nearby, go straight']],
  again: ['चाय मिल गई थी, शुक्रिया! अब क्या हाल?', 'Chai mil gayi thi, shukriya! Ab kya haal?', 'I found my tea, thanks! How are you now?'],
});

export const street2 = D('street-2', {
  name: 'Sunita Aunty', role: 'Mumbaikar (woman)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Cheerful aunty with a shopping bag and a loose sandal strap, thankful for any help, loves to chat.',
  goal: 'Hold her shopping bag while she fixes her sandal.',
  steps: [
    S('bag', ['बेटा, ज़रा ये थैला पकड़ना, चप्पल ठीक करूँ।', 'Beta, zara ye thaila pakadna, chappal theek karun.', 'Child, hold this bag, let me fix my sandal.'],
      'Say yes, give the bag.', ['Haan aunty, de dijiye.', 'हाँ आंटी, दे दीजिए।'],
      ['haan aunty de dijiye', 'de dijiye aunty', 'laiye aunty main pakadta hoon', 'haan main pakad leta hoon', 'हाँ आंटी दे दीजिए', 'दे दीजिए आंटी', 'yes aunty give it', 'aunty laiye'],
      'hold_bag', ['Offer to hold it.', '"de dijiye" = please give it.', 'Say: "Haan aunty, de dijiye."'],
      ['जीता रह! बस दो मिनट में हो जाएगा।', 'Jeeta rah! Bas do minute mein ho jayega.', 'Bless you! It will be done in two minutes.'],
      ['थैला पकड़ेगा कि नहीं?', 'Thaila pakdega ki nahi?', 'Will you hold the bag or not?']),
  ],
  outro: ['भगवान तुझे सुखी रखे, बेटा।', 'Bhagwan tujhe sukhi rakhe, beta.', 'May God keep you happy, child.'],
  learned: [['haan aunty, de dijiye', 'yes aunty, please give it']],
  again: ['अरे वही समझदार बच्चा! चप्पल अब पक्की है।', 'Arre wahi samajhdar bachcha! Chappal ab pakki hai.', 'The sensible child again! My sandal is fixed now.'],
});

export const street3 = D('street-3', {
  name: 'Sahil', role: 'Mumbaikar (teen)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Cricket-crazy teen glued to his phone, refreshing the live score every ten seconds.',
  goal: 'Tell him India is winning and say you will watch tomorrow\'s match.',
  steps: [
    S('score', ['भाई, मैच का स्कोर पता है? कौन जीत रहा है?', 'Bhai, match ka score pata hai? Kaun jeet raha hai?', 'Bro, do you know the score? Who is winning?'],
      'Say India is winning.', ['Haan, India jeet raha hai!', 'हाँ, इंडिया जीत रहा है!'],
      ['haan india jeet raha hai', 'india jeet raha hai', 'india jeet rahi hai', 'india aage hai', 'हाँ इंडिया जीत रहा है', 'इंडिया जीत रहा है', 'india is winning', 'india jeetegi'],
      'say_india_winning', ['Tell him who is winning.', '"jeet raha hai" = is winning.', 'Say: "Haan, India jeet raha hai!"'],
      ['यस! मुझे पता था, ब्रो!', 'Yes! Mujhe pata tha, bro!', 'Yes! I knew it, bro!'],
      ['कौन जीत रहा है? इंडिया?', 'Kaun jeet raha hai? India?', 'Who is winning? India?']),
  ],
  outro: ['चल बाय, स्कोर अपडेट आ गया!', 'Chal bye, score update aa gaya!', 'Bye, a score update just came!'],
  learned: [['India jeet raha hai', 'India is winning']],
  again: ['भाई, वापस आ गया! अब क्या स्कोर है?', 'Bhai, wapas aa gaya! Ab kya score hai?', 'Bro, you are back! What is the score now?'],
});

export const street4 = D('street-4', {
  name: 'Dada Ji', role: 'Mumbaikar (elder)', site: 'Everyday street', diff: 3,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Forgetful grandfather who has misplaced his spectacles for the third time this week.',
  goal: 'Offer to look for his glasses and tell him your name.',
  steps: [
    S('glasses', ['बेटा, मेरा चश्मा कहीं गिर गया है।', 'Beta, mera chashma kahin gir gaya hai.', 'Child, my glasses have fallen somewhere.'],
      'Offer to look for them.', ['Dada ji, main dhoondhta hoon.', 'दादा जी, मैं ढूँढता हूँ।'],
      ['dada ji main dhoondhta hoon', 'main dhoondhta hoon', 'main dekhta hoon dada ji', 'ruko main dhoondh deta hoon', 'दादा जी मैं ढूँढता हूँ', 'मैं ढूँढता हूँ', 'i will look for it dada', 'main chashma dhoondhta hoon'],
      'offer_find_glasses', ['Offer to help find them.', '"dhoondhta hoon" = I look for it.', 'Say: "Dada ji, main dhoondhta hoon."'],
      ['अरे यह रहा! मेरी जेब में ही था।', 'Arre yeh raha! Meri jeb mein hi tha.', 'Oh here it is! It was in my pocket all along.'],
      ['चश्मा ढूँढ दे बेटा, कुछ दिखता नहीं।', 'Chashma dhoondh de beta, kuch dikhta nahi.', 'Find my glasses, child, I cannot see.']),
    S('name', ['तू बड़ा भला है। तेरा नाम क्या है?', 'Tu bada bhala hai. Tera naam kya hai?', 'You are very kind. What is your name?'],
      'Tell him your name is Chotu.', ['Main Chotu hoon, dada ji.', 'मैं छोटू हूँ, दादा जी।'],
      ['main chotu hoon dada ji', 'mera naam chotu hai', 'chotu hoon dada ji', 'main chotu', 'मैं छोटू हूँ दादा जी', 'मेरा नाम छोटू है', 'my name is chotu', 'chotu naam hai mera'],
      'tell_name_to_elder', ['Say your name.', '"main ... hoon" = I am ...', 'Say: "Main Chotu hoon, dada ji."'],
      ['छोटू नाम है, पर दिल बड़ा है।', 'Chotu naam hai, par dil bada hai.', 'Your name is small, but your heart is big.'],
      ['नाम क्या बताया? ज़रा ज़ोर से।', 'Naam kya bataya? Zara zor se.', 'What name did you say? A little louder.']),
  ],
  outro: ['जा बेटा, लंबी उम्र हो तेरी।', 'Ja beta, lambi umr ho teri.', 'Go child, may you live long.'],
  learned: [['main dhoondhta hoon', 'I will look for it'], ['main Chotu hoon', 'I am Chotu']],
  again: ['अरे छोटू! आज चश्मा नाक पे ही है।', 'Arre Chotu! Aaj chashma naak pe hi hai.', 'Hey Chotu! Today the glasses are on my nose.'],
});

export const street5 = D('street-5', {
  name: 'Prakash Ji', role: 'Mumbaikar (man)', site: 'Everyday street', diff: 3,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Retired shopkeeper reading the morning paper aloud and commenting on prices to anyone nearby.',
  goal: 'Agree that things are costly and share what you want to be when you grow up.',
  steps: [
    S('price', ['पेट्रोल फिर महँगा! सब कुछ महँगा हो गया।', 'Petrol phir mehenga! Sab kuch mehenga ho gaya.', 'Petrol is costly again! Everything has become expensive.'],
      'Agree that everything is costly.', ['Haan, aajkal sab kuch mehenga hai.', 'हाँ, आजकल सब कुछ महँगा है।'],
      ['haan aajkal sab kuch mehenga hai', 'sab kuch mehenga hai', 'sach mein sab mehenga hai', 'bahut mehengai hai', 'हाँ आजकल सब कुछ महँगा है', 'सब कुछ महँगा है', 'yes everything is costly', 'haan mehengai badh gayi'],
      'agree_things_costly', ['Agree with him.', '"mehenga" = expensive.', 'Say: "Haan, aajkal sab kuch mehenga hai."'],
      ['तू बच्चा होके भी समझता है, वाह!', 'Tu bachcha hoke bhi samajhta hai, wah!', 'You are just a child and you understand, wow!'],
      ['तू क्या कहता है, महँगाई है कि नहीं?', 'Tu kya kehta hai, mehengai hai ki nahi?', 'What do you say, is there inflation or not?']),
    S('dream', ['बड़ा होके तू क्या बनेगा?', 'Bada hoke tu kya banega?', 'What will you become when you grow up?'],
      'Say you want to be a cricketer.', ['Main cricketer banna chahta hoon.', 'मैं क्रिकेटर बनना चाहता हूँ।'],
      ['main cricketer banna chahta hoon', 'cricketer banna chahta hoon', 'main cricketer banunga', 'mujhe cricketer banna hai', 'मैं क्रिकेटर बनना चाहता हूँ', 'क्रिकेटर बनना चाहता हूँ', 'i want to be a cricketer', 'cricketer banunga'],
      'tell_dream_job', ['Say your dream job.', '"banna chahta hoon" = I want to become.', 'Say: "Main cricketer banna chahta hoon."'],
      ['वाह! तो सचिन जैसा बनना।', 'Wah! Toh Sachin jaisa banna.', 'Wow! Then become like Sachin.'],
      ['कुछ तो सोचा होगा, क्या बनेगा?', 'Kuch toh socha hoga, kya banega?', 'You must have thought of something, what will you be?']),
  ],
  outro: ['सपने बड़े रख और मेहनत कर, बेटा।', 'Sapne bade rakh aur mehnat kar, beta.', 'Dream big and work hard, child.'],
  learned: [['aajkal sab kuch mehenga hai', 'these days everything is expensive'], ['main cricketer banna chahta hoon', 'I want to become a cricketer']],
  again: ['अरे सचिन आ गया! आज का भाव सुन।', 'Arre Sachin aa gaya! Aaj ka bhaav sun.', 'Oh, Sachin is here! Hear today\'s prices.'],
});

export const street6 = D('street-6', {
  name: 'Rekha Madam', role: 'Mumbaikar (woman)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Brisk schoolteacher out for her Sunday errands, keeps an eye out for her students everywhere.',
  goal: 'Explain that there is no school today because it is Sunday.',
  steps: [
    S('sunday', ['छोटू, आज स्कूल क्यों नहीं गए?', 'Chotu, aaj school kyun nahi gaye?', 'Chotu, why did you not go to school today?'],
      'Say it is Sunday, school is closed.', ['Aaj Sunday hai, school band hai.', 'आज संडे है, स्कूल बंद है।'],
      ['aaj sunday hai school band hai', 'aaj sunday hai', 'school band hai', 'aaj chhutti hai', 'आज संडे है स्कूल बंद है', 'आज संडे है', 'today is sunday school is closed', 'aaj ravivar hai'],
      'explain_sunday_no_school', ['Give the reason.', '"band hai" = is closed.', 'Say: "Aaj Sunday hai, school band hai."'],
      ['अरे हाँ! मैं भी भूल गई थी।', 'Arre haan! Main bhi bhool gayi thi.', 'Oh yes! I had forgotten too.'],
      ['स्कूल क्यों नहीं गए? वजह बताओ।', 'School kyun nahi gaye? Wajah batao.', 'Why did you not go to school? Give a reason.']),
  ],
  outro: ['अच्छा, सोमवार को टाइम पे आना।', 'Achha, somvaar ko time pe aana.', 'Okay, come on time on Monday.'],
  learned: [['aaj Sunday hai, school band hai', 'today is Sunday, school is closed']],
  again: ['आज भी स्कूल नहीं? कौन सा दिन है?', 'Aaj bhi school nahi? Kaun sa din hai?', 'No school today either? Which day is it?'],
});

export const street7 = D('street-7', {
  name: 'Ramabai', role: 'Mumbaikar (elder)', site: 'Everyday street', diff: 3,
  voice: { rate: 0.85, pitch: 1.0 },
  persona: 'Elderly grandmother with a walking stick who wants to cross the busy road and trusts children more than traffic.',
  goal: 'Help her cross the road and warn her about a car.',
  steps: [
    S('cross', ['बेटा, मुझे सड़क पार करवा दे।', 'Beta, mujhe sadak paar karwa de.', 'Child, help me cross the road.'],
      'Offer your hand and say you will help.', ['Haan, mera haath pakad lijiye.', 'हाँ, मेरा हाथ पकड़ लीजिए।'],
      ['haan mera haath pakad lijiye', 'mera haath pakad lijiye', 'haath pakadiye main le chalta hoon', 'aaiye main paar karata hoon', 'हाँ मेरा हाथ पकड़ लीजिए', 'मेरा हाथ पकड़ लीजिए', 'hold my hand i will help you cross', 'aaiye maaji'],
      'help_cross_road', ['Offer your hand.', '"haath" = hand.', 'Say: "Haan, mera haath pakad lijiye."'],
      ['जीता रह, तेरे हाथ में हिम्मत है।', 'Jeeta rah, tere haath mein himmat hai.', 'Bless you, your hand has strength.'],
      ['सड़क पार करवाएगा कि नहीं?', 'Sadak paar karwayega ki nahi?', 'Will you help me cross or not?']),
    S('car', ['अरे, गाड़ी आ रही है, क्या करूँ?', 'Arre, gaadi aa rahi hai, kya karun?', 'Oh, a car is coming, what do I do?'],
      'Tell her to wait until the car passes.', ['Ruk jaiye, pehle gaadi nikalne dijiye.', 'रुक जाइए, पहले गाड़ी निकलने दीजिए।'],
      ['ruk jaiye pehle gaadi nikalne dijiye', 'ruk jaiye', 'gaadi nikalne dijiye', 'ruko pehle gaadi jaane do', 'रुक जाइए पहले गाड़ी निकलने दीजिए', 'रुक जाइए', 'wait let the car pass', 'ek minute ruk jaiye'],
      'warn_wait_for_car', ['Tell her to stop.', '"ruk jaiye" = please stop.', 'Say: "Ruk jaiye, pehle gaadi nikalne dijiye."'],
      ['शाबाश! अब चल, रास्ता साफ़ है।', 'Shabash! Ab chal, rasta saaf hai.', 'Good! Now go, the way is clear.'],
      ['जल्दी बोल, गाड़ी पास आ गई!', 'Jaldi bol, gaadi paas aa gayi!', 'Say it quickly, the car is near!']),
  ],
  outro: ['तूने बुढ़िया की जान बचा दी, बेटा।', 'Toone budhiya ki jaan bacha di, beta.', 'You saved an old woman\'s life, child.'],
  learned: [['mera haath pakad lijiye', 'please hold my hand'], ['ruk jaiye, pehle gaadi nikalne dijiye', 'wait, let the car pass first']],
  again: ['बेटा, फिर वही सड़क! चल, एक बार और।', 'Beta, phir wahi sadak! Chal, ek baar aur.', 'Child, the same road again! Come, once more.'],
});

export const street8 = D('street-8', {
  name: 'Zoya', role: 'Mumbaikar (teen)', site: 'Everyday street', diff: 3,
  voice: { rate: 1.15, pitch: 1.3 },
  persona: 'Teen with oversized headphones who treats every pause as a chance to share a new song.',
  goal: 'Say you like her song and name the kind of songs you like.',
  steps: [
    S('song', ['ब्रो, ये गाना सुना? मस्त है ना!', 'Bro, ye gaana suna? Mast hai na!', 'Bro, heard this song? It is awesome!'],
      'Say the song is really good.', ['Haan, gaana bahut badhiya hai.', 'हाँ, गाना बहुत बढ़िया है।'],
      ['haan gaana bahut badhiya hai', 'gaana bahut badhiya hai', 'mast gaana hai', 'kya gaana hai', 'हाँ गाना बहुत बढ़िया है', 'गाना बहुत बढ़िया है', 'yes the song is great', 'bahut achha gaana hai'],
      'praise_song', ['Say you like the song.', '"gaana" = song, "badhiya" = great.', 'Say: "Haan, gaana bahut badhiya hai."'],
      ['एक्ज़ैक्टली! मेरी प्लेलिस्ट का टॉप ट्रैक है।', 'Exactly! Meri playlist ka top track hai.', 'Exactly! It is the top track on my playlist.'],
      ['सुना कि नहीं? कैसा लगा?', 'Suna ki nahi? Kaisa laga?', 'Did you hear it or not? How is it?']),
    S('taste', ['और तुझे कौन से गाने पसंद हैं?', 'Aur tujhe kaun se gaane pasand hain?', 'And which songs do you like?'],
      'Say you like old film songs.', ['Mujhe purane filmi gaane pasand hain.', 'मुझे पुराने फ़िल्मी गाने पसंद हैं।'],
      ['mujhe purane filmi gaane pasand hain', 'purane filmi gaane pasand hain', 'mujhe purane gaane pasand hain', 'purane gaane mast lagte hain', 'मुझे पुराने फ़िल्मी गाने पसंद हैं', 'पुराने फ़िल्मी गाने', 'i like old film songs', 'purane filmi gaane'],
      'say_music_taste', ['Tell her your taste.', '"purane" = old, "pasand hain" = I like.', 'Say: "Mujhe purane filmi gaane pasand hain."'],
      ['ओल्ड इज़ गोल्ड! कभी ट्रैक शेयर करना।', 'Old is gold! Kabhi track share karna.', 'Old is gold! Share a track sometime.'],
      ['कौन से गाने पसंद हैं?', 'Kaun se gaane pasand hain?', 'Which songs do you like?']),
  ],
  outro: ['तू कूल है यार, फिर मिलते हैं!', 'Tu cool hai yaar, phir milte hain!', 'You are cool, see you again!'],
  learned: [['gaana bahut badhiya hai', 'the song is really good'], ['mujhe purane filmi gaane pasand hain', 'I like old film songs']],
  again: ['अरे, नया गाना सुनेगा? हेडफ़ोन लगा!', 'Arre, naya gaana sunega? Headphone laga!', 'Hey, want to hear a new song? Put on the headphones!'],
});

export const street9 = D('street-9', {
  name: 'Imtiyaz', role: 'Mumbaikar (man)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.05, pitch: 0.95 },
  persona: 'Impatient commuter with a phone to his ear, hunting for an auto and asking anyone who might know.',
  goal: 'Point him to the auto stand across the road.',
  steps: [
    S('auto', ['भाई, यहाँ ऑटो कहाँ मिलेगा?', 'Bhai, yahan auto kahan milega?', 'Brother, where can I find an auto here?'],
      'Tell him the auto stand is across the road.', ['Sadak ke us paar auto stand hai.', 'सड़क के उस पार ऑटो स्टैंड है।'],
      ['sadak ke us paar auto stand hai', 'us paar auto stand hai', 'sadak paar auto stand hai', 'wahan saamne auto stand hai', 'सड़क के उस पार ऑटो स्टैंड है', 'उस पार ऑटो स्टैंड है', 'auto stand is across the road', 'saamne auto stand hai'],
      'point_to_auto_stand', ['Tell him where the autos are.', '"us paar" = on the other side.', 'Say: "Sadak ke us paar auto stand hai."'],
      ['थैंक यू! ये लड़का तो गूगल मैप से तेज़ है!', 'Thank you! Ye ladka toh Google Map se tez hai!', 'Thank you! This boy is faster than Google Maps!'],
      ['ऑटो कहाँ मिलेगा? जल्दी बता!', 'Auto kahan milega? Jaldi bata!', 'Where do I find an auto? Tell me quickly!']),
  ],
  outro: ['चलता हूँ, मीटर से ही जाऊँगा।', 'Chalta hoon, meter se hi jaunga.', 'I am off, I will go by meter only.'],
  learned: [['sadak ke us paar auto stand hai', 'the auto stand is across the road']],
  again: ['मिल गया ऑटो! पर अब दूसरा रास्ता पूछना है।', 'Mil gaya auto! Par ab doosra rasta poochna hai.', 'Found the auto! But now I need another route.'],
});

export const street10 = D('street-10', {
  name: 'Lata Tai', role: 'Mumbaikar (woman)', site: 'Everyday street', diff: 2,
  voice: { rate: 0.95, pitch: 1.15 },
  persona: 'Motherly tai carrying a lunch box, convinced that every skinny child in Mumbai needs feeding.',
  goal: 'Politely refuse extra food and say you will be home by evening.',
  steps: [
    S('food', ['बेटा, भूख लगी है? थोड़ा खाना खा ले।', 'Beta, bhookh lagi hai? Thoda khaana kha le.', 'Child, are you hungry? Have some food.'],
      'Politely say no thanks, you have eaten.', ['Nahi tai, shukriya, main kha chuka hoon.', 'नहीं ताई, शुक्रिया, मैं खा चुका हूँ।'],
      ['nahi tai shukriya main kha chuka hoon', 'main kha chuka hoon', 'nahi shukriya kha liya', 'tai maine kha liya', 'नहीं ताई शुक्रिया मैं खा चुका हूँ', 'मैं खा चुका हूँ', 'no thanks i already ate', 'shukriya pet bhara hai'],
      'refuse_food_politely', ['Decline kindly.', '"kha chuka hoon" = I have already eaten.', 'Say: "Nahi tai, shukriya, main kha chuka hoon."'],
      ['अच्छा चल, तो पानी तो पी ले।', 'Achha chal, toh paani toh pi le.', 'Okay, then at least drink some water.'],
      ['खाना खाएगा कि नहीं? हाँ या ना?', 'Khaana khayega ki nahi? Haan ya na?', 'Will you eat or not? Yes or no?']),
    S('home', ['घर कब जाएगा? माँ याद करती होगी।', 'Ghar kab jayega? Maa yaad karti hogi.', 'When will you go home? Your mother must be missing you.'],
      'Say you will reach home by evening.', ['Shaam tak ghar pahunch jaunga.', 'शाम तक घर पहुँच जाऊँगा।'],
      ['shaam tak ghar pahunch jaunga', 'shaam tak ghar jaunga', 'shaam ko ghar jaunga', 'main shaam tak pahunch jaunga', 'शाम तक घर पहुँच जाऊँगा', 'शाम तक घर जाऊँगा', 'i will reach home by evening', 'shaam ko wapas jaunga'],
      'promise_home_by_evening', ['Tell her when you will go home.', '"shaam" = evening.', 'Say: "Shaam tak ghar pahunch jaunga."'],
      ['ठीक है, माँ को मेरा नमस्ते कहना।', 'Theek hai, maa ko mera namaste kehna.', 'Okay, give my namaste to your mother.'],
      ['घर कब जाएगा? बता तो सही।', 'Ghar kab jayega? Bata toh sahi.', 'When will you go home? Do tell.']),
  ],
  outro: ['जा बेटा, ख़याल रखना अपना।', 'Ja beta, khayal rakhna apna.', 'Go child, take care of yourself.'],
  learned: [['main kha chuka hoon', 'I have already eaten'], ['shaam tak ghar pahunch jaunga', 'I will reach home by evening']],
  again: ['फिर आया बेटा? इस बार डिब्बे में लड्डू हैं!', 'Phir aaya beta? Is baar dabbe mein laddoo hain!', 'Back again, child? This time there are laddoos in the box!'],
});
