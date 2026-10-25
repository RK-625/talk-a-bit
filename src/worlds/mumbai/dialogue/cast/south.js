// South Mumbai: Marine Drive, Gateway, Taj, CST, BSE, Rajabai.
import { dialogue as D, step as S } from './kit.js';

export const marineWalkStudent = D('marine-walk-student', {
  name: 'Aditi', role: 'college student', site: 'Marine Drive promenade', diff: 2,
  voice: { rate: 1.1, pitch: 1.25 },
  persona: 'Hurried first-year student with a heavy backpack, always one lecture away from being late.',
  goal: 'Tell her the time so she can make her lecture.',
  steps: [
    S('time', ['यार, टाइम क्या हुआ? लेक्चर है मेरा!', 'Yaar, time kya hua? Lecture hai mera!', 'Dude, what is the time? I have a lecture!'],
      'Tell her it is half past nine.', ['Abhi saade nau baje hain.', 'अभी साढ़े नौ बजे हैं।'],
      ['abhi saade nau baje hain', 'saade nau baje hain', 'saade nau hue hain', 'nau bajke tees minute', 'अभी साढ़े नौ बजे हैं', 'साढ़े नौ बजे हैं', 'it is half past nine', 'saade nau'],
      'tell_time_half_nine', ['Tell her the time: 9:30.', '"saade nau" = half past nine.', 'Say: "Abhi saade nau baje hain."'],
      ['अरे बाप रे! भागना पड़ेगा, थैंक्स!', 'Arre baap re! Bhaagna padega, thanks!', 'Oh my! I must run, thanks!'],
      ['टाइम बता ना, देर हो रही है!', 'Time bata na, der ho rahi hai!', 'Tell me the time, I am getting late!']),
  ],
  outro: ['तू बड़ा काम का निकला, चल बाय!', 'Tu bada kaam ka nikla, chal bye!', 'You turned out useful, bye!'],
  learned: [['saade nau baje hain', 'it is half past nine']],
  again: ['अरे तू फिर? अब कितना टाइम हुआ?', 'Arre tu phir? Ab kitna time hua?', 'You again? What time is it now?'],
});

export const gatewayFerryClerk = D('gateway-ferry-clerk', {
  name: 'Salim Bhai', role: 'ferry ticket clerk', site: 'Elephanta ferry booth, Gateway', diff: 3,
  voice: { rate: 1.05, pitch: 0.95 },
  persona: 'Brisk ticket clerk behind a small window, shouting departure times all day, strict about life jackets.',
  goal: 'Buy two ferry tickets and promise to wear a life jacket.',
  steps: [
    S('tickets', ['एलिफेंटा का टिकट? कितने चाहिए?', 'Elephanta ka ticket? Kitne chahiye?', 'Elephanta ticket? How many do you need?'],
      'Ask for two tickets.', ['Do ticket dena, Elephanta ke.', 'दो टिकट देना, एलिफेंटा के।'],
      ['do ticket dena elephanta ke', 'do ticket dena', 'do ticket chahiye', 'elephanta ke do ticket', 'दो टिकट देना एलिफेंटा के', 'दो टिकट चाहिए', 'two tickets please', 'bhaiya do ticket'],
      'buy_two_ferry_tickets', ['Say how many tickets.', 'Two = "do".', 'Say: "Do ticket dena, Elephanta ke."'],
      ['ये लो टिकट, नाव सवा दस बजे जाएगी।', 'Ye lo ticket, naav sawa das baje jayegi.', 'Here are the tickets, the boat leaves at quarter past ten.'],
      ['कितने टिकट? उँगली से भी चलेगा।', 'Kitne ticket? Ungli se bhi chalega.', 'How many tickets? Fingers will do too.']),
  ],
  outro: ['जाओ, समंदर की हवा खा के आओ!', 'Jao, samandar ki hawa kha ke aao!', 'Go, enjoy the sea breeze!'],
  learned: [['do ticket dena', 'give me two tickets']],
  again: ['फिर टिकट चाहिए? लाइन में लग जा।', 'Phir ticket chahiye? Line mein lag ja.', 'Need a ticket again? Join the line.'],
});

export const tajDoorman = D('taj-doorman', {
  name: 'Gurung Sahab', role: 'Taj doorman', site: 'Taj Mahal Palace entrance', diff: 3,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Tall, impeccably polite doorman in a red coat with gold braid; formal Hindi, a little proud of the building.',
  goal: 'Decline a taxi politely and compliment the Taj.',
  steps: [
    S('taxi', ['नमस्ते! आपके लिए टैक्सी बुलाऊँ?', 'Namaste! Aapke liye taxi bulaoon?', 'Namaste! Shall I call a taxi for you?'],
      'Politely say no thanks, you will walk.', ['Nahi, shukriya, main paidal jaunga.', 'नहीं, शुक्रिया, मैं पैदल जाऊँगा।'],
      ['nahi shukriya main paidal jaunga', 'nahi shukriya', 'main paidal jaunga', 'taxi nahi chahiye shukriya', 'नहीं शुक्रिया मैं पैदल जाऊँगा', 'नहीं शुक्रिया', 'no thanks i will walk', 'paidal chala jaunga'],
      'decline_taxi_politely', ['Say no, politely.', '"paidal" = on foot.', 'Say: "Nahi, shukriya, main paidal jaunga."'],
      ['जैसी आपकी मर्ज़ी, छोटे साहब।', 'Jaisi aapki marzi, chhote sahab.', 'As you wish, young sir.'],
      ['माफ़ कीजिए, टैक्सी चाहिए या नहीं?', 'Maaf kijiye, taxi chahiye ya nahi?', 'Excuse me, do you need a taxi or not?']),
    S('praise', ['ये ताज सौ साल से भी पुराना है।', 'Ye Taj sau saal se bhi purana hai.', 'This Taj is more than a hundred years old.'],
      'Say it is very beautiful.', ['Wah, ye bahut sundar hai.', 'वाह, ये बहुत सुंदर है।'],
      ['wah ye bahut sundar hai', 'bahut sundar hai', 'ye bahut sundar hai', 'kitni sundar imaarat hai', 'वाह ये बहुत सुंदर है', 'बहुत सुंदर है', 'it is very beautiful', 'bahut khoobsurat hai'],
      'praise_the_taj', ['Say something nice about the hotel.', '"sundar" = beautiful.', 'Say: "Wah, ye bahut sundar hai."'],
      ['धन्यवाद! हमें भी बहुत गर्व है।', 'Dhanyavaad! Hamein bhi bahut garv hai.', 'Thank you! We are very proud too.'],
      ['कैसी लगी इमारत? बताइए ना।', 'Kaisi lagi imaarat? Bataiye na.', 'How do you like the building? Tell me.']),
  ],
  outro: ['फिर कभी आइए, आपका स्वागत है।', 'Phir kabhi aaiye, aapka swagat hai.', 'Do visit again, you are welcome.'],
  learned: [['nahi, shukriya, main paidal jaunga', 'no thanks, I will walk'], ['ye bahut sundar hai', 'this is very beautiful']],
  again: ['नमस्ते फिर से, छोटे साहब। सब ठीक?', 'Namaste phir se, chhote sahab. Sab theek?', 'Namaste again, young sir. All well?'],
});

export const cstTiffinSorter = D('cst-tiffin-sorter', {
  name: 'Bhau', role: 'dabbawala sorting tiffins', site: 'Tiffin pile, CST', diff: 3,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Quick, focused dabbawala who sorts hundreds of crates by colour codes and has no time for small talk.',
  goal: 'Help carry a tiffin crate to the right line.',
  steps: [
    S('help', ['ये क्रेट उठाने में हाथ लगाएगा?', 'Ye crate uthane mein haath lagayega?', 'Will you lend a hand lifting this crate?'],
      'Say yes and ask where to put it.', ['Haan, kahan rakhna hai?', 'हाँ, कहाँ रखना है?'],
      ['haan kahan rakhna hai', 'kahan rakhna hai', 'haan bhai kahan rakhun', 'laao kahan rakhna hai', 'हाँ कहाँ रखना है', 'कहाँ रखना है', 'yes where to put it', 'haan batao kahan rakhu'],
      'help_with_crate', ['Agree and ask where it goes.', '"kahan" = where.', 'Say: "Haan, kahan rakhna hai?"'],
      ['उधर, लाल निशान वाली लाइन में।', 'Udhar, laal nishaan wali line mein.', 'Over there, in the line with the red mark.'],
      ['मदद करेगा कि नहीं? देर हो रही है।', 'Madad karega ki nahi? Der ho rahi hai.', 'Will you help or not? We are getting late.']),
    S('done', ['वहाँ रख दे, ध्यान से।', 'Wahan rakh de, dhyan se.', 'Put it there, carefully.'],
      'Say it is done, you put it down.', ['Ho gaya, rakh diya.', 'हो गया, रख दिया।'],
      ['ho gaya rakh diya', 'rakh diya', 'ho gaya', 'maine rakh diya', 'हो गया रख दिया', 'रख दिया', 'done i put it down', 'rakh diya bhai'],
      'report_crate_placed', ['Tell him it is done.', '"rakh diya" = I put it down.', 'Say: "Ho gaya, rakh diya."'],
      ['बढ़िया! तू तो दबला-पतला पर तगड़ा है।', 'Badhiya! Tu toh dubla-patla par tagda hai.', 'Great! You look thin but you are strong.'],
      ['रख दिया क्या? बोल तो सही।', 'Rakh diya kya? Bol toh sahi.', 'Did you put it down? Say so.']),
  ],
  outro: ['आज का काम समय पर हुआ, तेरी वजह से।', 'Aaj ka kaam samay par hua, teri wajah se.', 'Today\'s work got done on time, thanks to you.'],
  learned: [['kahan rakhna hai?', 'where should I put it?'], ['ho gaya, rakh diya', 'done, I put it down']],
  again: ['फिर आ गया? ये क्रेट भी उठा दे।', 'Phir aa gaya? Ye crate bhi utha de.', 'Back again? Lift this crate too.'],
});

export const cstOfficegoer = D('cst-officegoer', {
  name: 'Vikas', role: 'office-goer', site: 'CST forecourt', diff: 3,
  voice: { rate: 1.15, pitch: 1.0 },
  persona: 'Nervous young man in his only tie with a briefcase, on the way to a job interview.',
  goal: 'Reassure him about his look and wish him luck.',
  steps: [
    S('tie', ['भाई, मेरी टाई ठीक है क्या? इंटरव्यू है।', 'Bhai, meri tie theek hai kya? Interview hai.', 'Brother, is my tie okay? I have an interview.'],
      'Tell him he looks great.', ['Haan, aap ekdum badhiya lag rahe ho.', 'हाँ, आप एकदम बढ़िया लग रहे हो।'],
      ['haan aap ekdum badhiya lag rahe ho', 'ekdum badhiya lag rahe ho', 'bahut badhiya lag rahe ho', 'tie ekdum theek hai', 'हाँ आप एकदम बढ़िया लग रहे हो', 'एकदम बढ़िया लग रहे हो', 'you look great', 'sab theek hai bhaiya'],
      'compliment_look', ['Reassure him.', '"badhiya lag rahe ho" = you look great.', 'Say: "Haan, aap ekdum badhiya lag rahe ho."'],
      ['थैंक्स यार, थोड़ी हिम्मत आई।', 'Thanks yaar, thodi himmat aayi.', 'Thanks, that gave me some courage.'],
      ['सच बता, टाई ठीक है कि नहीं?', 'Sach bata, tie theek hai ki nahi?', 'Tell me honestly, is the tie okay or not?']),
  ],
  outro: ['अगर नौकरी मिली तो पार्टी तेरी!', 'Agar naukri mili toh party teri!', 'If I get the job, the party is on me!'],
  learned: [['aap ekdum badhiya lag rahe ho', 'you look great']],
  again: ['अरे, इंटरव्यू से पहले एक बार और बोल दे!', 'Arre, interview se pehle ek baar aur bol de!', 'Say it once more before the interview!'],
});

export const bseBullTourist = D('bse-bull-tourist', {
  name: 'Jake', role: 'tourist', lang: 'en', site: 'Bronze bull, BSE', diff: 4,
  voice: { rate: 0.95, pitch: 1.0 },
  persona: 'Sunburnt American in shorts and a sun hat, cheerful, fascinated by the bronze bull and the stock exchange.',
  goal: 'Take his photo with the bull and explain what the bull means.',
  steps: [
    S('photo', ['Hey buddy! Could you snap a photo of me with this bull?', 'Hey buddy! Could you snap a photo of me with this bull?', 'Hey buddy! Could you snap a photo of me with this bull?'],
      'Say yes, you will take his photo.', ['Sure! Stand next to the bull and smile.', 'Sure! Stand next to the bull and smile.'],
      ['Sure! Stand next to the bull and smile.', 'Yes, I can take your photo', 'Okay, stand by the bull', 'Sure, smile please', 'Of course, I will take it', 'yes give me the camera', 'Sure, stand near the bull', 'okay I will take a photo'],
      'agree_take_photo', ['Say yes to taking the photo.', 'Use "sure" and "stand next to the bull".', 'Say: "Sure! Stand next to the bull and smile."'],
      ['Awesome, thanks a ton! Say cheese!', 'Awesome, thanks a ton! Say cheese!', 'Awesome, thanks a ton! Say cheese!'],
      ['Sorry, can you take my photo or not?', 'Sorry, can you take my photo or not?', 'Sorry, can you take my photo or not?']),
    S('meaning', ['Cool shot! Why is there a bull outside a stock exchange?', 'Cool shot! Why is there a bull outside a stock exchange?', 'Cool shot! Why is there a bull outside a stock exchange?'],
      'Explain that the bull means a rising market.', ['The bull means prices go up and the market grows.', 'The bull means prices go up and the market grows.'],
      ['The bull means prices go up and the market grows.', 'A bull market means prices are rising', 'The bull is a symbol of a growing market', 'It means the market goes up', 'The bull is for good luck and rising prices', 'bull means growth in the market', 'It shows share prices going up', 'bull is a sign of a rising market'],
      'explain_bull_symbol', ['Say what the bull stands for.', 'Use "prices go up" or "market grows".', 'Say: "The bull means prices go up and the market grows."'],
      ['Ha, makes sense! I will rub its horns for luck.', 'Ha, makes sense! I will rub its horns for luck.', 'Ha, makes sense! I will rub its horns for luck.'],
      ['Hm, but why a bull? Can you explain?', 'Hm, but why a bull? Can you explain?', 'Hm, but why a bull? Can you explain?']),
  ],
  outro: ['You are a great guide, thanks! Enjoy Mumbai!', 'You are a great guide, thanks! Enjoy Mumbai!', 'You are a great guide, thanks! Enjoy Mumbai!'],
  learned: [['stand next to the bull and smile', 'taking a photo for someone'], ['the bull means prices go up', 'explaining a symbol in English']],
  again: ['Hey, my photographer is back! One more shot?', 'Hey, my photographer is back! One more shot?', 'Hey, my photographer is back! One more shot?'],
});

export const bseGuard = D('bse-guard', {
  name: 'Sharma Ji', role: 'BSE security guard', site: 'BSE gate', diff: 3,
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Fatherly gate guard with a thick register, who has watched the Sensex rise and fall for twenty years.',
  goal: 'Admit you do not know the Sensex, and say you are too young to buy shares.',
  steps: [
    S('sensex', ['बेटा, तुझे सेंसेक्स पता है क्या?', 'Beta, tujhe Sensex pata hai kya?', 'Child, do you know what the Sensex is?'],
      'Say you do not know the Sensex.', ['Nahi, mujhe Sensex nahi pata.', 'नहीं, मुझे सेंसेक्स नहीं पता।'],
      ['nahi mujhe sensex nahi pata', 'mujhe sensex nahi pata', 'nahi pata', 'sensex kya hota hai', 'नहीं मुझे सेंसेक्स नहीं पता', 'मुझे सेंसेक्स नहीं पता', 'i dont know sensex', 'nahi jaanta'],
      'say_dont_know_sensex', ['Be honest: you do not know.', '"nahi pata" = I do not know.', 'Say: "Nahi, mujhe Sensex nahi pata."'],
      ['कोई बात नहीं। बाज़ार का थर्मामीटर है ये।', 'Koi baat nahi. Bazaar ka thermometer hai ye.', 'No problem. It is the market\'s thermometer.'],
      ['पता है या नहीं? सच बोल।', 'Pata hai ya nahi? Sach bol.', 'Do you know or not? Speak the truth.']),
  ],
  outro: ['बड़ा होकर आना, तब बात करेंगे।', 'Bada hokar aana, tab baat karenge.', 'Come back when you are grown up, we will talk then.'],
  learned: [['mujhe Sensex nahi pata', 'I do not know the Sensex']],
  again: ['फिर आया? आज बाज़ार ऊपर है!', 'Phir aaya? Aaj bazaar upar hai!', 'Back again? The market is up today!'],
});

export const rajabaiBookSeller = D('rajabai-book-seller', {
  name: 'Ghanshyam Kaka', role: 'second-hand book seller', site: 'Book stall, Rajabai tower', diff: 3,
  voice: { rate: 0.95, pitch: 0.9 },
  persona: 'Spectacled old book seller who loves haggling and knows the story of every second-hand book on his shelf.',
  goal: 'Ask for a storybook and bargain for a lower price.',
  steps: [
    S('book', ['पुरानी किताबें सस्ती हैं! क्या चाहिए?', 'Purani kitaabein sasti hain! Kya chahiye?', 'Old books are cheap! What do you want?'],
      'Ask for a storybook.', ['Mujhe kahaniyon ki kitaab chahiye.', 'मुझे कहानियों की किताब चाहिए।'],
      ['mujhe kahaniyon ki kitaab chahiye', 'kahaniyon ki kitaab', 'koi kahani ki kitaab dikhao', 'story book chahiye', 'मुझे कहानियों की किताब चाहिए', 'कहानियों की किताब', 'i want a story book', 'kahani wali kitaab'],
      'ask_story_book', ['Say what kind of book.', '"kahani" = story, "kitaab" = book.', 'Say: "Mujhe kahaniyon ki kitaab chahiye."'],
      ['ये ले, पंचतंत्र! पूरे बीस रुपये की।', 'Ye le, Panchatantra! Poore bees rupaye ki.', 'Here, Panchatantra! Twenty rupees only.'],
      ['कौन सी किताब? कहानी की, कविता की?', 'Kaun si kitaab? Kahani ki, kavita ki?', 'Which book? Stories, poems?']),
  ],
  outro: ['पढ़कर लौटाना, आधे दाम में वापस लूँगा।', 'Padhkar lautana, aadhe daam mein wapas lunga.', 'Return it after reading, I will buy it back at half price.'],
  learned: [['mujhe kahaniyon ki kitaab chahiye', 'I want a storybook']],
  again: ['किताब पढ़ ली? दूसरी भी है मेरे पास।', 'Kitaab padh li? Doosri bhi hai mere paas.', 'Finished the book? I have another one.'],
});

export const rajabaiStudentA = D('rajabai-student-a', {
  name: 'Neha', role: 'university student', site: 'Rajabai tower / Flora Fountain', diff: 2,
  voice: { rate: 1.1, pitch: 1.3 },
  persona: 'Chatty arts student with books under her arm, curious about everyone, always asking questions.',
  goal: 'Tell her you are still in school, not at the university.',
  steps: [
    S('college', ['क्या तुम भी मुंबई यूनिवर्सिटी में पढ़ते हो?', 'Kya tum bhi Mumbai University mein padhte ho?', 'Do you also study at Mumbai University?'],
      'Say no, you are still in school.', ['Nahi, main abhi school mein hoon.', 'नहीं, मैं अभी स्कूल में हूँ।'],
      ['nahi main abhi school mein hoon', 'main school mein hoon', 'abhi school mein padhta hoon', 'nahi school jaata hoon', 'नहीं मैं अभी स्कूल में हूँ', 'मैं स्कूल में हूँ', 'no i am still in school', 'nahi abhi school'],
      'say_still_in_school', ['Tell her where you study.', '"school mein" = in school.', 'Say: "Nahi, main abhi school mein hoon."'],
      ['अरे वाह! तो एक दिन यहीं आना।', 'Arre wah! Toh ek din yahin aana.', 'Oh nice! Then come here one day.'],
      ['कहाँ पढ़ते हो? स्कूल या कॉलेज?', 'Kahan padhte ho? School ya college?', 'Where do you study? School or college?']),
  ],
  outro: ['मेहनत करना, फिर यहाँ मिलेंगे! बाय!', 'Mehnat karna, phir yahan milenge! Bye!', 'Work hard, we shall meet here! Bye!'],
  learned: [['main abhi school mein hoon', 'I am still in school']],
  again: ['अरे वही स्कूल वाला! कैसी चल रही है पढ़ाई?', 'Arre wahi school wala! Kaisi chal rahi hai padhai?', 'Hey, the school boy! How are your studies?'],
});

export const marineBenchMan = D('marine-bench-man', {
  name: 'Kulkarni Kaka', role: 'man on a bench', site: 'Marine Drive bench', diff: 2,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Retired clerk who has watched the same sunset from the same bench for thirty years.',
  goal: 'Agree that the view is beautiful and accept a seat.',
  steps: [
    S('view', ['आज लहरें बड़ी ऊँची हैं, देख ज़रा।', 'Aaj lehrein badi unchi hain, dekh zara.', 'The waves are very high today, look.'],
      'Say it is a beautiful view.', ['Haan, bahut sundar nazara hai.', 'हाँ, बहुत सुंदर नज़ारा है।'],
      ['haan bahut sundar nazara hai', 'bahut sundar nazara hai', 'kitna sundar nazara hai', 'lehrein bahut sundar hain', 'हाँ बहुत सुंदर नज़ारा है', 'बहुत सुंदर नज़ारा', 'what a beautiful view', 'sach mein sundar hai'],
      'praise_sea_view', ['Say how the sea looks.', '"nazara" = view.', 'Say: "Haan, bahut sundar nazara hai."'],
      ['तीस साल से देख रहा हूँ, फिर भी मन नहीं भरता।', 'Tees saal se dekh raha hoon, phir bhi mann nahi bharta.', 'Thirty years I have watched it, still it never tires me.'],
      ['नज़ारा देख, कैसा लगा?', 'Nazara dekh, kaisa laga?', 'Look at the view, how is it?']),
    S('sit', ['बैठ जा बेटा, थोड़ी देर।', 'Baith ja beta, thodi der.', 'Sit down, child, for a while.'],
      'Thank him and say you will sit a bit.', ['Shukriya, thodi der baith jata hoon.', 'शुक्रिया, थोड़ी देर बैठ जाता हूँ।'],
      ['shukriya thodi der baith jata hoon', 'thodi der baith jata hoon', 'ji kaka baith jata hoon', 'haan baithta hoon', 'शुक्रिया थोड़ी देर बैठ जाता हूँ', 'थोड़ी देर बैठ जाता हूँ', 'thanks i will sit a while', 'achha baith jata hoon'],
      'accept_seat', ['Accept the seat.', '"baith jata hoon" = I sit down.', 'Say: "Shukriya, thodi der baith jata hoon."'],
      ['ये हुई बात! सुकून से बैठ।', 'Ye hui baat! Sukoon se baith.', 'That is the spirit! Sit in peace.'],
      ['बैठेगा नहीं क्या? बोल ना।', 'Baithega nahi kya? Bol na.', 'Will you not sit? Speak up.']),
  ],
  outro: ['सूरज डूबने तक यहीं रुक, मज़ा आएगा।', 'Suraj doobne tak yahin ruk, maza aayega.', 'Stay here until sunset, you will enjoy it.'],
  learned: [['bahut sundar nazara hai', 'it is a very beautiful view'], ['thodi der baith jata hoon', 'I will sit for a while']],
  again: ['अरे फिर आया! आ, बगल में बैठ।', 'Arre phir aaya! Aa, bagal mein baith.', 'Oh you are back! Come, sit beside me.'],
});

export const marineCouple = D('marine-couple', {
  name: 'Rohan and Meera', role: 'seated couple', site: 'Marine Drive parapet', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Newly engaged couple sitting close on the sea wall, a bit shy, wanting one nice photo together.',
  goal: 'Agree to take their photo.',
  steps: [
    S('photo', ['भैया, हमारी एक फ़ोटो खींच दोगे?', 'Bhaiya, hamari ek photo kheench doge?', 'Brother, will you take a photo of us?'],
      'Say sure, tell them to smile.', ['Haan zaroor, smile karo!', 'हाँ ज़रूर, स्माइल करो!'],
      ['haan zaroor smile karo', 'zaroor smile karo', 'haan khinch deta hoon', 'photo khinch deta hoon', 'हाँ ज़रूर स्माइल करो', 'ज़रूर स्माइल करो', 'sure smile please', 'haan zaroor'],
      'agree_couple_photo', ['Say yes to the photo.', '"zaroor" = of course.', 'Say: "Haan zaroor, smile karo!"'],
      ['थैंक्यू! समंदर पीछे आना चाहिए।', 'Thank you! Samandar peeche aana chahiye.', 'Thank you! The sea should be in the background.'],
      ['खींच दोगे या नहीं?', 'Kheench doge ya nahi?', 'Will you take it or not?']),
  ],
  outro: ['कितनी प्यारी फ़ोटो आई है! तुम्हें दुआएँ!', 'Kitni pyari photo aayi hai! Tumhein duaayein!', 'What a lovely photo! Blessings to you!'],
  learned: [['haan zaroor, smile karo', 'sure, smile please']],
  again: ['हमारे फ़ोटोग्राफ़र आ गए! एक और?', 'Hamare photographer aa gaye! Ek aur?', 'Our photographer is here! One more?'],
});

export const marineChanaSeller = D('marine-chana-seller', {
  name: 'Pappu Chana', role: 'chana-jor seller', site: 'Marine Drive promenade', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Lively chana-jor vendor who rattles a tin and sings out his flavours to every walker.',
  goal: 'Order a spicy chana and ask for lemon.',
  steps: [
    S('spice', ['चना-जोर गरम! तीखा या मीठा?', 'Chana-jor garam! Teekha ya meetha?', 'Hot chana-jor! Spicy or sweet?'],
      'Ask for a bit spicy.', ['Teekha dena, thoda sa.', 'तीखा देना, थोड़ा सा।'],
      ['teekha dena thoda sa', 'teekha dena', 'thoda teekha', 'thoda sa teekha dena', 'तीखा देना थोड़ा सा', 'थोड़ा तीखा', 'a little spicy please', 'teekha chalega'],
      'order_spicy_chana', ['Pick spicy or sweet.', '"teekha" = spicy.', 'Say: "Teekha dena, thoda sa."'],
      ['ये ले, कड़क तीखा! मज़ा आएगा।', 'Ye le, kadak teekha! Maza aayega.', 'Here, properly spicy! You will enjoy it.'],
      ['तीखा या मीठा? बोल ना!', 'Teekha ya meetha? Bol na!', 'Spicy or sweet? Say it!']),
  ],
  outro: ['टहलते-टहलते खा ले, मज़ा दुगना!', 'Tahalte-tahalte kha le, maza dugna!', 'Eat while strolling, double the fun!'],
  learned: [['teekha dena, thoda sa', 'give it spicy, just a little']],
  again: ['फिर चना? आज नमक ज़्यादा है, बोल तो नहीं!', 'Phir chana? Aaj namak zyada hai, bol toh nahi!', 'Chana again? Today it is salty, do not complain!'],
});

export const marineJogger = D('marine-jogger', {
  name: 'Rohit', role: 'jogger', site: 'Marine Drive promenade', diff: 3,
  voice: { rate: 1.2, pitch: 1.0 },
  persona: 'Fitness-obsessed jogger in a headband, panting between sentences, counting laps like a coach.',
  goal: 'Join him for a lap and hand him water.',
  steps: [
    S('lap', ['मेरे साथ एक राउंड दौड़ेगा, छोटू?', 'Mere saath ek round daudega, Chotu?', 'Will you run one round with me, Chotu?'],
      'Say yes, let us run a round.', ['Chalo, ek round daudte hain.', 'चलो, एक राउंड दौड़ते हैं।'],
      ['chalo ek round daudte hain', 'ek round daudte hain', 'haan daudta hoon', 'chalo daudte hain', 'चलो एक राउंड दौड़ते हैं', 'चलो दौड़ते हैं', 'lets run a round', 'haan main bhi daudunga'],
      'join_jog_round', ['Say you will join.', '"daudte hain" = let us run.', 'Say: "Chalo, ek round daudte hain."'],
      ['शाबाश! धीरे-धीरे शुरू करते हैं।', 'Shabash! Dheere-dheere shuru karte hain.', 'Great! Let us start slow.'],
      ['दौड़ेगा या सिर्फ़ खड़ा रहेगा?', 'Daudega ya sirf khada rahega?', 'Will you run or just stand there?']),
    S('water', ['हाँफ गया! पानी है तेरे पास?', 'Haanf gaya! Paani hai tere paas?', 'I am out of breath! Do you have water?'],
      'Hand him your water bottle.', ['Haan, ye lo paani.', 'हाँ, ये लो पानी।'],
      ['haan ye lo paani', 'ye lo paani', 'paani ye raha', 'lo paani piyo', 'हाँ ये लो पानी', 'ये लो पानी', 'yes here is water', 'ye lijiye paani'],
      'give_water', ['Offer him water.', '"paani" = water.', 'Say: "Haan, ye lo paani."'],
      ['गट गट गट! जान में जान आई।', 'Gat gat gat! Jaan mein jaan aayi.', 'Glug glug! That brought me back to life.'],
      ['पानी चाहिए यार, है क्या?', 'Paani chahiye yaar, hai kya?', 'I need water, do you have any?']),
  ],
  outro: ['कल सुबह छह बजे फिर आना, पक्का!', 'Kal subah chhe baje phir aana, pakka!', 'Come again tomorrow at six, promise!'],
  learned: [['chalo, ek round daudte hain', 'come, let us run one round'], ['ye lo paani', 'here is water']],
  again: ['अरे वाह, फिर आया! आज दो राउंड?', 'Arre wah, phir aaya! Aaj do round?', 'Wow, back again! Two rounds today?'],
});
