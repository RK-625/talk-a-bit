// The gurudwara: nishan sahib, karah prasad counter, offering stall and the jora ghar (shoe-keeping).
import { P, step as S } from '../kit.js';

export const bellDevotee = P('temple-bell-devotee', 'Harjeet Kaur', 'devotee at the nishan sahib', 'Gurudwara, nishan sahib flag', 'f', 'Apologise and move away quietly.', [
  S('quiet', ['श्श... मैं पाठ कर रही हूँ। ज़रा धीरे।', 'Shsh... main paath kar rahi hoon. Zara dheere.', 'Shh... I am reciting. Softly please.'],
    'Apologise and say you will move away quietly.', ['Maaf kijiye, main dheere se chala jaata hoon.', 'माफ़ कीजिए, मैं धीरे से चला जाता हूँ।'],
    ['maaf kijiye main chup chap hat jaata hoon', 'sorry ji main door ho jaata hoon', 'maafi chahta hoon ji', 'aapko disturb kiya sorry'],
    ['Apologise gently.', 'Sorry = "maaf kijiye". I move away = "chala jaata hoon".'],
    ['कोई बात नहीं बेटा। वाहेगुरु आपका भला करे।', 'Koi baat nahi beta. Waheguru aapka bhala kare.', 'No problem, beta. May Waheguru bless you.'],
    ['धीरे... बहुत धीरे बोलो बेटा।', 'Dheere... bahut dheere bolo beta.', 'Softly... very softly, beta.']),
], ['वाहेगुरु जी का खालसा...', 'Waheguru ji ka Khalsa...', 'Waheguru ji ka Khalsa...'],
  [['maaf kijiye', 'please excuse me']], ['श्श... बेटा, आओ, आराम से बैठो।', 'Shsh... beta, aao, aaram se baitho.', 'Shh... beta, come, sit calmly.'], 1);

export const offeringWoman = P('temple-offering-pilgrim', 'Surjit Kaur', 'devotee at the prasad counter', 'Gurudwara, karah prasad counter', 'f', 'Accept prasad with both hands and confirm your head is covered.', [
  S('prasad', ['कड़ाह प्रसाद चढ़ाने जा रही हूँ। थोड़ा लोगे बेटा?', 'Karah prasad chadhane ja rahi hoon. Thoda loge beta?', 'I am going to offer karah prasad. Will you take some, beta?'],
    'Accept prasad with joined hands.', ['Ji, main haath jodkar prasad le lunga.', 'जी, मैं हाथ जोड़कर प्रसाद ले लूँगा।'],
    ['ji zaroor prasad dijiye', 'haan ji main dono haath jodkar lunga', 'meherbani ji prasad chahiye', 'bilkul ji thoda prasad dijiye'],
    ['Accept respectfully.', 'With joined hands = "haath jodkar". I will take = "le lunga".'],
    ['लो बेटा, दोनों हाथ आगे करो। गरम है, सँभालकर।', 'Lo beta, dono haath aage karo. Garam hai, sambhalkar.', 'Take it, beta, put both hands out. It is hot, careful.'],
    ['धीरे बोलो, भजन चल रहा है।', 'Dheere bolo, bhajan chal raha hai.', 'Speak softly, the kirtan is on.']),
  S('cover', ['सिर ढका है ना तुम्हारा? बिना ढके अंदर नहीं।', 'Sir dhaka hai na tumhara? Bina dhake andar nahi.', 'Your head is covered, right? Not allowed inside uncovered.'],
    'Say yes, your head is covered.', ['Ji haan, mera sir dhaka hua hai.', 'जी हाँ, मेरा सिर ढका हुआ है।'],
    ['haan ji sir dhaka hua hai', 'ji rumaal baandha hua hai', 'sir dhak liya hai mataji', 'haan ji maine sir dhak liya hai'],
    ['Confirm politely.', 'Covered = "dhaka hua". My head = "mera sir".'],
    ['शाबाश! अब प्रभु के दर्शन करो। मेहनत फलेगी।', 'Shabaash! Ab Prabhu ke darshan karo. Mehnat phalegi.', 'Well done! Now go for darshan. Your effort will bear fruit.'],
    ['ढका है या नहीं? साफ़ बोलो बेटा।', 'Dhaka hai ya nahi? Saaf bolo beta.', 'Covered or not? Say clearly, beta.']),
], ['जाओ बेटा, वाहेगुरु तुम्हारी रक्षा करें।', 'Jao beta, Waheguru tumhari raksha karein.', 'Go beta, may Waheguru protect you.'],
  [['main haath jodkar prasad le lunga', 'I will take prasad with joined hands'], ['mera sir dhaka hua hai', 'my head is covered']], ['बेटा, फिर आए? आओ प्रसाद लो।', 'Beta, phir aaye? Aao prasad lo.', 'Beta, you came again? Come take prasad.'], 2);

export const templeFlowers = P('temple-flower-seller', 'Gulabo', 'flower and prasad seller', 'Gurudwara, offering stall', 'f', 'Buy a small prasad box and a few flowers.', [
  S('box', ['फूल, प्रसाद! गुरु जी के चरणों में चढ़ाओ बेटा।', 'Phool, prasad! Guru ji ke charanon mein chadhao beta.', 'Flowers, prasad! Offer at Guru ji\'s feet, beta.'],
    'Ask for a small prasad box.', ['Ek chhota prasad ka dabba dena.', 'एक छोटा प्रसाद का डिब्बा देना।'],
    ['chhota prasad ka dabba dena', 'ek prasad ka dabba chahiye', 'mataji ek chhota dabba prasad ka', 'paaji ek prasad pack dena'],
    ['Ask for the prasad box.', 'A small box = "ek chhota dabba". Prasad = "prasad".'],
    ['लो बेटा, ताज़ा बना है। साथ में ये गेंदे के फूल भी रख लो।', 'Lo beta, taaza bana hai. Saath mein ye gende ke phool bhi rakh lo.', 'Here, beta, it is freshly made. Take these marigolds too.'],
    ['कौन-सा डिब्बा? धीरे बोलो बेटा।', 'Kaun-sa dabba? Dheere bolo beta.', 'Which box? Speak softly, beta.']),
  S('flowers', ['फूल कितने दूँ? दस के चार या बीस के नौ?', 'Phool kitne dun? Das ke chaar ya bees ke nau?', 'How many flowers? Four for ten or nine for twenty?'],
    'Ask for four flowers for ten rupees.', ['Das rupaye ke chaar phool de do.', 'दस रुपये के चार फूल दे दो।'],
    ['das ke chaar phool dena', 'chaar phool dijiye das ke', 'mataji das rupaye ke chaar', 'bas das ke chaar phool'],
    ['Pick a deal.', 'Four for ten = "das ke chaar". Flowers = "phool".'],
    ['लो बेटा, पढ़ाई सफल हो। गुरु जी की मेहर रहे।', 'Lo beta, padhai safal ho. Guru ji ki mehar rahe.', 'Take them, beta, may your studies succeed. May Guru ji bless you.'],
    ['कितने चाहिए? उँगलियों से बता दो।', 'Kitne chahiye? Ungliyon se bata do.', 'How many? Show with your fingers.']),
], ['जाओ बेटा, अर्पण करके आओ।', 'Jao beta, arpan karke aao.', 'Go beta, offer them and come back.'],
  [['ek chhota prasad ka dabba dena', 'give me a small prasad box'], ['das rupaye ke chaar phool', 'four flowers for ten rupees']], ['बेटा, आज गुलाब भी हैं!', 'Beta, aaj gulaab bhi hain!', 'Beta, there are roses today too!'], 2);

export const shoeKeeper = P('temple-shoe-keeper', 'Baba Sewa Singh', 'shoe-keeper (jora ghar sevadar)', 'Gurudwara, jora ghar', 'o', 'Hand over your shoes and promise to do seva someday.', [
  S('shoes', ['जूते यहाँ जमा करा दो बेटा, ये टोकन ले लो।', 'Joote yahan jama kara do beta, ye token le lo.', 'Deposit your shoes here, beta, take this token.'],
    'Hand over your shoes and ask him to keep them safe.', ['Ye lijiye baba, mere joote sambhalke rakhna.', 'ये लीजिए बाबा, मेरे जूते सँभालके रखना।'],
    ['baba ji mere joote sambhal ke rakhna', 'ye lo joote token de dijiye', 'baba ji joote yahan jama kar lo', 'mere joote dhyaan se rakhna'],
    ['Hand over the shoes.', 'Keep safe = "sambhalke rakhna". My shoes = "mere joote".'],
    ['चिंता मत कर बेटा। यहाँ जूता कभी नहीं खोता, गुरु का घर है।', 'Chinta mat kar beta. Yahan joota kabhi nahi khota, Guru ka ghar hai.', 'Do not worry, beta. A shoe never gets lost here, it is Guru\'s house.'],
    ['कान कम सुनते हैं बेटा, ऊँचा बोल।', 'Kaan kam sunte hain beta, ooncha bol.', 'My ears hear less, beta, speak louder.']),
  S('seva', ['मैं रोज़ सुबह सेवा करता हूँ। कभी तुम भी करो!', 'Main roz subah seva karta hoon. Kabhi tum bhi karo!', 'I do seva every morning. You should sometime too!'],
    'Promise to do seva some day.', ['Zaroor baba, kisi din main bhi seva karunga.', 'ज़रूर बाबा, किसी दिन मैं भी सेवा करूँगा।'],
    ['zaroor baba ji ek din seva karunga', 'main bhi kabhi seva karne aaunga', 'ji baba pakka seva karunga', 'seva karne ka mann hai baba'],
    ['Promise a bit of seva.', 'Someday = "kisi din". I will do seva = "seva karunga".'],
    ['जीता रह बेटा! सेवा से मन का बोझ हल्का होता है।', 'Jeeta reh beta! Seva se man ka bojh halka hota hai.', 'Live long, beta! Seva lightens the weight of the mind.'],
    ['वादा कर बेटा, हाँ बोल सिर्फ़ नहीं।', 'Vaada kar beta, haan bol sirf nahi.', 'Make a promise, beta, do not just say yes.']),
], ['जा बेटा, दर्शन कर आ। जूते मेरे पास सुरक्षित हैं।', 'Ja beta, darshan kar aa. Joote mere paas surakshit hain.', 'Go beta, have darshan. Your shoes are safe with me.'],
  [['mere joote sambhalke rakhna', 'keep my shoes safe'], ['kisi din main bhi seva karunga', 'one day I will do seva too']], ['आ गया बेटा! तेरे जूते वहीं रखे हैं।', 'Aa gaya beta! Tere joote wahin rakhe hain.', 'You are here, beta! Your shoes are kept right there.'], 2);
