// People on the open ground and lanes away from the main sites.
import { dialogue as D, step as S } from '../kit.js';

export const railKiteKid = D('rail-kite-kid', {
  name: 'Naga', role: 'kite-flying kid (boy)', site: 'Open ground beside the metro viaduct', diff: 1,
  voice: { rate: 1.1, pitch: 1.25 },
  persona: 'Boy flying a kite with his head tipped back beside the purple metro viaduct.',
  goal: 'Cheer him on to fly higher.',
  steps: [
    S('kite', ['ನೋಡಿ, ನನ್ನ ಪಟ ಮೆಟ್ರೋ ಟ್ರೈನ್‌ಗಿಂತ ಎತ್ತರ ಹಾರ್ತಿದೆ!', 'Nodi, nanna pata metro train ginta ettara haartide!', 'Look, my kite is flying higher than the metro train!'],
      'Cheer him on.', ['Super, innu ettara haarisi!', 'ಸೂಪರ್, ಇನ್ನೂ ಎತ್ತರ ಹಾರಿಸಿ!'],
      ['super innu ettara haarisi', 'innu ettara haarisi', 'super pata ettara haartide', 'haarisi haarisi innu ettara', 'ಸೂಪರ್ ಇನ್ನೂ ಎತ್ತರ ಹಾರಿಸಿ', 'ಇನ್ನೂ ಎತ್ತರ ಹಾರಿಸಿ', 'super innu ettara haarisu'],
      'cheer_kite_higher', ['Encourage him.', '"Haarisi" = make it fly.', 'Say: "Super, innu ettara haarisi!"'],
      ['ಹೂ! ಇನ್ನೂ ದಾರ ಬಿಡ್ತೀನಿ ನೋಡಿ!', 'Hoo! Innu daara bidteeni nodi!', 'Yes! I will let out more string, watch!'],
      ['ಪಟ ನೋಡಿದ್ರಾ ಅಣ್ಣ? ಏನಾದ್ರೂ ಹೇಳಿ!', 'Pata nodidra anna? Enaadru heli!', 'Did you see the kite, brother? Say something!']),
  ],
  outro: ['ಮೆಟ್ರೋ ಬಂತು! ಪಟ ಹಾರ್ತಿದೆ! ಬೈ ಅಣ್ಣ!', 'Metro bantu! Pata haartide! Bye anna!', 'The metro came! The kite is flying! Bye brother!'],
  learned: [['innu ettara haarisi', 'fly it even higher']],
  again: ['ಅಣ್ಣ, ಪಟ ಹಿಡೀತೀರಾ ಸ್ವಲ್ಪ?', 'Anna, pata hiditeera swalpa?', 'Brother, will you hold the kite a bit?'],
});

export const laneGossip = D('lane-aunty-gossip', {
  name: 'Nirmala', role: 'gossiping woman', site: 'Open ground by a pete-house block', diff: 2,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Woman in a saffron-pallu saree chatting, gesturing as she tells a story about the neighbours.',
  goal: 'React happily to her neighbour\'s news.',
  steps: [
    S('news', ['ಗೊತ್ತಾ? ಪಕ್ಕದ ಮನೆಯವರು ಹೊಸ ಕಾರ್ ತಗೊಂಡ್ರು!', 'Gottaa? Pakkada maneyavaru hosa car tagondru!', 'Did you know? The neighbours bought a new car!'],
      'React with good wishes.', ['Haudaa? Tumba khushi suddi.', 'ಹೌದಾ? ತುಂಬಾ ಖುಷಿ ಸುದ್ದಿ.'],
      ['haudaa tumba khushi suddi', 'tumba khushi suddi', 'haudaa olle suddi', 'tumba khushi aunty', 'ಹೌದಾ ತುಂಬಾ ಖುಷಿ ಸುದ್ದಿ', 'ತುಂಬಾ ಖುಷಿ ಸುದ್ದಿ', 'haudaa khushi suddi aunty'],
      'react_to_neighbour_news', ['Say that is happy news.', '"Khushi suddi" = happy news.', 'Say: "Haudaa? Tumba khushi suddi."'],
      ['ಹೌದು! ಸ್ವೀಟ್ಸ್ ಕೂಡ ಹಂಚಿದ್ರು. ನೀವೂ ಬನ್ನಿ.', 'Haudu! Sweets kooda hanchidru. Neevoo banni.', 'Yes! They distributed sweets too. You come too.'],
      ['ಏನಂತೀರಿ ಮಗ? ಸುದ್ದಿ ಕೇಳಿದ್ರಾ?', 'Enanteeri maga? Suddi kelidra?', 'What do you say, dear? Did you hear the news?']),
  ],
  outro: ['ಅರೆ, ನನ್ನ ಕಥೆ ಇನ್ನೂ ಮುಗಿದಿಲ್ಲ! ಮತ್ತೆ ಬನ್ನಿ.', 'Are, nanna kathe innu mugidilla! Matte banni.', 'Oh, my story is not over yet! Come again.'],
  learned: [['tumba khushi suddi', 'that is very happy news']],
  again: ['ಮಗ, ಇನ್ನೊಂದು ಸುದ್ದಿ ಕೇಳಿ!', 'Maga, innondu suddi keli!', 'Dear, hear one more bit of news!'],
});

export const schoolgirl = D('east-schoolgirl', {
  name: 'Ishita', role: 'schoolgirl', site: 'Open ground near the east road', diff: 1,
  voice: { rate: 1.1, pitch: 1.35 },
  persona: 'Girl in a school uniform with a red ribbon, waving and walking home from school.',
  goal: 'Tell her to go home safely.',
  steps: [
    S('home', ['ಅಣ್ಣ, ಸ್ಕೂಲ್ ಮುಗೀತು, ಮನೆಗೆ ಹೋಗ್ತಿದ್ದೀನಿ!', 'Anna, school mugitu, manege hogtiddini!', 'Brother, school is over, I am going home!'],
      'Tell her to go home safely.', ['Hushaaragi hogu, putti.', 'ಹುಷಾರಾಗಿ ಹೋಗು, ಪುಟ್ಟಿ.'],
      ['hushaaragi hogu putti', 'hushaaragi hogu', 'hushaaragi hogi putti', 'sari putti hushaaragi hogu', 'ಹುಷಾರಾಗಿ ಹೋಗು ಪುಟ್ಟಿ', 'ಹುಷಾರಾಗಿ ಹೋಗು', 'hushaaragi hogu Ishita'],
      'tell_girl_go_safely', ['Wish her a safe trip home.', '"Hushaaragi" = carefully.', 'Say: "Hushaaragi hogu, putti."'],
      ['ಹೂಂ ಅಣ್ಣ! ಬೈ ಬೈ!', 'Hoon anna! Bye bye!', 'Yes brother! Bye bye!'],
      ['ಹೋಗ್ಲಾ ಅಣ್ಣ ಮನೆಗೆ? ಹೇಳಿ!', 'Hogla anna manege? Heli!', 'Shall I go home, brother? Tell me!']),
  ],
  outro: ['ಅಮ್ಮ ಕಾಯ್ತಿರ್ತಾರೆ! ಬೈ ಅಣ್ಣ!', 'Amma kaaytirtaare! Bye anna!', 'Mum will be waiting! Bye brother!'],
  learned: [['hushaaragi hogu', 'go safely']],
  again: ['ಅಣ್ಣ, ನಾಳೆ ಮತ್ತೆ ಸಿಗೋಣ!', 'Anna, naale matte sigona!', 'Brother, let us meet again tomorrow!'],
});

export const scrubElder = D('scrub-elder-umbrella', {
  name: 'Bheemanna', role: 'elderly man with an umbrella', site: 'Open scrubland, far from the sites', diff: 1,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Thin old man with a teal umbrella and a Gandhi cap, standing quietly in the heat.',
  goal: 'Suggest he stand in the shade.',
  steps: [
    S('sun', ['ಬಿಸಿಲು ಜಾಸ್ತಿ ಆಯ್ತು, ಛತ್ರಿ ಇದ್ರೂ ಸಾಲಲ್ಲ.', 'Bisilu jaasti aytu, chhatri idroo saalalla.', 'The sun is strong, even an umbrella is not enough.'],
      'Suggest he stand in the shade.', ['Swalpa neralinalli nilli, thatha.', 'ಸ್ವಲ್ಪ ನೆರಳಿನಲ್ಲಿ ನಿಲ್ಲಿ, ತಾತ.'],
      ['swalpa neralinalli nilli thatha', 'neralinalli nilli thatha', 'swalpa nerala nilli', 'nerallu ide alli nilli thatha', 'ಸ್ವಲ್ಪ ನೆರಳಿನಲ್ಲಿ ನಿಲ್ಲಿ ತಾತ', 'ನೆರಳಿನಲ್ಲಿ ನಿಲ್ಲಿ ತಾತ', 'swalpa nerallinalli nilli'],
      'suggest_stand_in_shade', ['Suggest the shade.', '"Nerallu" = shade.', 'Say: "Swalpa neralinalli nilli, thatha."'],
      ['ಸರಿ ಮಗ, ಆ ಮರದ ಕೆಳಗೆ ಹೋಗ್ತೀನಿ.', 'Sari maga, aa marada kelage hogteeni.', 'Okay child, I will go under that tree.'],
      ['ಏನಂತೀಯ ಮಗ? ಬಿಸಿಲಿನ ಬಗ್ಗೆನಾ?', 'Enanteeya maga? Bisilina baggena?', 'What do you say, child? About the sun?']),
  ],
  outro: ['ಒಳ್ಳೆ ಮಾತು ಹೇಳಿದೆ. ಆಯುಷ್ಯ ಇರಲಿ.', 'Olle maatu helide. Aayushya irali.', 'You said a good thing. Long life to you.'],
  learned: [['neralinalli nilli', 'stand in the shade']],
  again: ['ಮಗ, ಛತ್ರಿ ತಗೊಂಡು ಹೋಗು.', 'Maga, chhatri tagondu hogu.', 'Child, take an umbrella with you.'],
});

export const selfieTeen = D('seaview-selfie-teen', {
  name: 'Yash', role: 'teen taking selfies', site: 'Open ground with a view of the flyover', diff: 1,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Teen in sunglasses taking selfies with the flyover behind him.',
  goal: 'Offer to take his photo.',
  steps: [
    S('selfie', ['ಅಣ್ಣ, ಫ್ಲೈಓವರ್ ಹಿಂದೆ ಬರೋ ಹಾಗೆ ಫೋಟೋ ತೆಗೀತೀರಾ?', 'Anna, flyover hinde baro haage photo tegeeteera?', 'Brother, will you take a photo with the flyover behind me?'],
      'Agree and ask for the phone.', ['Sari, phone kodu, tegeeteeni.', 'ಸರಿ, ಫೋನ್ ಕೊಡು, ತೆಗೀತೀನಿ.'],
      ['sari phone kodu tegeeteeni', 'phone kodu tegeeteeni', 'sari tegeeteeni phone kodu', 'phone kodu photo tegeeteeni', 'ಸರಿ ಫೋನ್ ಕೊಡು ತೆಗೀತೀನಿ', 'ಫೋನ್ ಕೊಡು ತೆಗೀತೀನಿ', 'sari phone kodu'],
      'agree_take_selfie_photo', ['Say you will take it.', '"Phone kodu" = give the phone.', 'Say: "Sari, phone kodu, tegeeteeni."'],
      ['ತಗೊಳ್ಳಿ ಅಣ್ಣ! ಸನ್‌ಗ್ಲಾಸ್ ಕಾಣೋ ಹಾಗೆ ತೆಗೀರಿ.', 'Tagolli anna! Sunglass kaano haage tegeeri.', 'Here, brother! Take it so my sunglasses show.'],
      ['ಫೋಟೋ ತೆಗೀತೀರಾ ಇಲ್ವಾ ಅಣ್ಣ?', 'Photo tegeeteera ilva anna?', 'Will you take the photo or not, brother?']),
  ],
  outro: ['ಸೂಪರ್ ಫೋಟೋ! ಇನ್‌ಸ್ಟಾಗೆ ಹಾಕ್ತೀನಿ!', 'Super photo! Insta ge haakteeni!', 'Super photo! I will post it on Insta!'],
  learned: [['phone kodu, tegeeteeni', 'give me the phone, I will take it']],
  again: ['ಅಣ್ಣ, ಇನ್ನೊಂದು ಆಂಗಲ್‌ನಲ್ಲಿ ತೆಗೀರಿ!', 'Anna, innondu angle-nalli tegeeri!', 'Brother, take one from another angle!'],
});

export const ballKid = D('east-field-ball-kid', {
  name: 'Chikku', role: 'kid with a ball', site: 'Open ground east', diff: 1,
  voice: { rate: 1.15, pitch: 1.35 },
  persona: 'Kid in a lilac T-shirt holding a ball and looking for friends to play with.',
  goal: 'Tell him his friends will come soon.',
  steps: [
    S('friends', ['ನನ್ನ ಫ್ರೆಂಡ್ಸ್ ಇನ್ನೂ ಬಂದಿಲ್ಲ! ಯಾವಾಗ ಬರ್ತಾರೆ?', 'Nanna friends innu bandilla! Yaavaaga bartaare?', 'My friends have not come yet! When will they come?'],
      'Say they will come soon.', ['Innondu swalpa hottige bartaare.', 'ಇನ್ನೊಂದು ಸ್ವಲ್ಪ ಹೊತ್ತಿಗೆ ಬರ್ತಾರೆ.'],
      ['innondu swalpa hottige bartaare', 'swalpa hottige bartaare', 'bartaare chikku swalpa hottige', 'innu swalpa hottalli bartaare', 'ಇನ್ನೊಂದು ಸ್ವಲ್ಪ ಹೊತ್ತಿಗೆ ಬರ್ತಾರೆ', 'ಸ್ವಲ್ಪ ಹೊತ್ತಿಗೆ ಬರ್ತಾರೆ', 'innondu swalpa hottige bartare'],
      'say_friends_come_soon', ['Reassure him.', '"Swalpa hottige" = in a little while.', 'Say: "Innondu swalpa hottige bartaare."'],
      ['ಹೌದಾ ಅಣ್ಣ! ಅಲ್ಲಿವರೆಗೂ ಬಾಲ್ ಪ್ರಾಕ್ಟೀಸ್!', 'Haudaa anna! Alliyavaregoo ball practice!', 'Really, brother! Ball practice till then!'],
      ['ಯಾವಾಗ ಅಂತ ಹೇಳಿ ಅಣ್ಣ.', 'Yaavaaga anta heli anna.', 'Tell me when, brother.']),
  ],
  outro: ['ಅವರು ಬಂದ್ರು! ಬೈ ಅಣ್ಣ!', 'Avaru bandru! Bye anna!', 'They have come! Bye brother!'],
  learned: [['swalpa hottige bartaare', 'they will come shortly']],
  again: ['ಅಣ್ಣ, ಬಾಲ್ ಎಸೀರಿ!', 'Anna, ball eseeri!', 'Brother, throw the ball!'],
});

export const phoneWoman = D('field-phone-woman', {
  name: 'Lavanya', role: 'woman on the phone', site: 'Open ground', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Woman in a lilac salwar texting or on a call, a little distracted, struggling with the network.',
  goal: 'Tell her the network may be better that way.',
  steps: [
    S('network', ['ಹಲೋ… ಹಲೋ… ನೆಟ್‌ವರ್ಕ್ ಸರಿಯಿಲ್ಲ ಇಲ್ಲಿ.', 'Hello… hello… network sariyilla illi.', 'Hello… hello… the network is bad here.'],
      'Say the network may be better that way.', ['Aa kade hodre network sigabahudu.', 'ಆ ಕಡೆ ಹೋದ್ರೆ ನೆಟ್‌ವರ್ಕ್ ಸಿಗಬಹುದು.'],
      ['aa kade hodre network sigabahudu', 'aa kade network sigabahudu', 'aa kade hodre network barutte', 'aa kade hogi network sigutte', 'ಆ ಕಡೆ ಹೋದ್ರೆ ನೆಟ್‌ವರ್ಕ್ ಸಿಗಬಹುದು', 'ಆ ಕಡೆ ನೆಟ್‌ವರ್ಕ್ ಸಿಗಬಹುದು', 'aa kade hodre network barabahudu'],
      'suggest_better_network', ['Point her to a better spot.', '"Sigabahudu" = may get.', 'Say: "Aa kade hodre network sigabahudu."'],
      ['ಓ ಹೌದಾ? ಥ್ಯಾಂಕ್ಸ್, ಅಲ್ಲಿ ಹೋಗಿ ಟ್ರೈ ಮಾಡ್ತೀನಿ.', 'O haudaa? Thanks, alli hogi try maadteeni.', 'Oh really? Thanks, I will go and try there.'],
      ['ಏನಂದ್ರಿ? ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲ, ಸರಿಯಾಗಿ ಕೇಳಿಸ್ತಿಲ್ಲ.', 'Enandri? Network illa, sariyaagi kelistilla.', 'What did you say? No network, I cannot hear clearly.']),
  ],
  outro: ['ಹಲೋ! ಈಗ ಕೇಳಿಸ್ತಿದೆ! ಬೈ ಸಾರ್.', 'Hello! Iga kelistide! Bye saar.', 'Hello! I can hear now! Bye sir.'],
  learned: [['aa kade network sigabahudu', 'you may get a network that way']],
  again: ['ಸಾರ್, ನೆಟ್‌ವರ್ಕ್ ಈಗ ಸರಿ ಆಯ್ತು!', 'Saar, network iga sari aytu!', 'Sir, the network is fine now!'],
});

export const backpackerTeen = D('north-field-backpacker-teen', {
  name: 'Pranav', role: 'teen with a backpack', site: 'Open ground north of the city', diff: 1,
  voice: { rate: 1.05, pitch: 1.05 },
  persona: 'Round teen in a checked shirt with a backpack, bored and exploring.',
  goal: 'Suggest the Lalbagh Glass House.',
  steps: [
    S('see', ['ಅಣ್ಣ, ಇಲ್ಲಿ ನೋಡೋಕೆ ಏನಾದ್ರೂ ಇದ್ಯಾ?', 'Anna, illi nodoke enaadru idya?', 'Brother, is there anything to see around here?'],
      'Suggest the Lalbagh Glass House.', ['Lalbagh glass house nodi.', 'ಲಾಲ್‌ಬಾಗ್ ಗ್ಲಾಸ್ ಹೌಸ್ ನೋಡಿ.'],
      ['lalbagh glass house nodi', 'glass house nodi', 'lalbagh nodi', 'lalbagh glass house ide nodi', 'ಲಾಲ್‌ಬಾಗ್ ಗ್ಲಾಸ್ ಹೌಸ್ ನೋಡಿ', 'ಗ್ಲಾಸ್ ಹೌಸ್ ನೋಡಿ', 'lalbagh glass house nodi anna'],
      'suggest_glass_house', ['Suggest a sight.', '"Nodi" = see.', 'Say: "Lalbagh glass house nodi."'],
      ['ಓಹೋ, ಗ್ಲಾಸ್ ಹೌಸ್! ಅದರ ಬಗ್ಗೆ ಕೇಳಿದ್ದೀನಿ.', 'Oho, glass house! Adara bagge kelideeni.', 'Oh, the glass house! I have heard about it.'],
      ['ಏನು ನೋಡೋದು ಅಂತ ಹೇಳಿ ಅಣ್ಣ.', 'Enu nodudu anta heli anna.', 'Tell me what to see, brother.']),
  ],
  outro: ['ಥ್ಯಾಂಕ್ಸ್ ಅಣ್ಣ, ನಾಳೆ ಹೋಗ್ತೀನಿ!', 'Thanks anna, naale hogteeni!', 'Thanks brother, I will go tomorrow!'],
  learned: [['Lalbagh glass house nodi', 'go see the Lalbagh Glass House']],
  again: ['ಅಣ್ಣ, ಗ್ಲಾಸ್ ಹೌಸ್ ಯಾವ ಕಡೆ?', 'Anna, glass house yaava kade?', 'Brother, which way is the glass house?'],
});

export const rickshawDriver = D('east-road-rickshaw-driver', {
  name: 'Nagesh', role: 'auto driver', site: 'By the east road', diff: 2,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Round auto driver in a khaki shirt texting while waiting for a fare.',
  goal: 'Decline the auto politely and ask how long the tech park is on foot.',
  steps: [
    S('auto', ['ಆಟೋ ಬೇಕಾ ಸಾರ್? ಮೀಟರ್ ಹಾಕ್ತೀನಿ.', 'Auto beka saar? Meter haakteeni.', 'Need an auto, sir? I will put the meter.'],
      'Politely decline; you will walk.', ['Beda, naanu nadedu hogteeni.', 'ಬೇಡ, ನಾನು ನಡೆದು ಹೋಗ್ತೀನಿ.'],
      ['beda naanu nadedu hogteeni', 'nadedu hogteeni', 'beda anna nadedu hogteeni', 'beda dhanyavaada nadedu hogteeni', 'ಬೇಡ ನಾನು ನಡೆದು ಹೋಗ್ತೀನಿ', 'ನಾನು ನಡೆದು ಹೋಗ್ತೀನಿ', 'beda anna naanu nadkondu hogteeni'],
      'decline_auto_walk', ['Say no thanks, you will walk.', '"Nadedu" = on foot.', 'Say: "Beda, naanu nadedu hogteeni."'],
      ['ಸರಿ ಸಾರ್, ಬಿಸಿಲಿದೆ ಹುಷಾರು.', 'Sari saar, bisilide hushaaru.', 'Okay sir, it is sunny, be careful.'],
      ['ಆಟೋ ಬೇಕಾ ಬೇಡವಾ ಸಾರ್?', 'Auto beka bedava saar?', 'Auto or no auto, sir?']),
    S('walk', ['ನಡೆದು ಎಲ್ಲಿಗೆ ಹೋಗ್ತೀರಾ ಸಾರ್?', 'Nadedu ellige hogteera saar?', 'Where will you walk to, sir?'],
      'Ask how long it takes on foot to the tech park.', ['Tech park ge nadedu eshtu hottu?', 'ಟೆಕ್ ಪಾರ್ಕ್‌ಗೆ ನಡೆದು ಎಷ್ಟು ಹೊತ್ತು?'],
      ['tech park ge nadedu eshtu hottu', 'nadedu eshtu hottu', 'tech park ge nadedu eshtu hottu aagutte', 'nadedu hogoke eshtu hottu', 'ಟೆಕ್ ಪಾರ್ಕ್‌ಗೆ ನಡೆದು ಎಷ್ಟು ಹೊತ್ತು', 'ನಡೆದು ಎಷ್ಟು ಹೊತ್ತು', 'tech park ge nadedu eshtu hottu anna'],
      'ask_walk_time_tech_park', ['Ask how long to walk.', '"Eshtu hottu" = how long.', 'Say: "Tech park ge nadedu eshtu hottu?"'],
      ['ನಡೆದ್ರೆ ಅರ್ಧ ಗಂಟೆ ಆಗುತ್ತೆ ಸಾರ್.', 'Nadedre ardha gante aagutte saar.', 'Walking takes half an hour, sir.'],
      ['ಎಷ್ಟು ಹೊತ್ತು ಅಂತ ಕೇಳ್ತೀರಾ?', 'Eshtu hottu anta kelteera?', 'You are asking how long?']),
  ],
  outro: ['ಲೇಟ್ ಆದ್ರೆ ಹೇಳಿ ಸಾರ್, ಆಟೋ ಇಲ್ಲೇ ಇರುತ್ತೆ.', 'Late aadre heli saar, auto ille irutte.', 'If you get late, tell me, the auto will be here.'],
  learned: [['nadedu hogteeni', 'I will go on foot'], ['nadedu eshtu hottu?', 'how long on foot?']],
  again: ['ಸಾರ್, ಮನಸ್ಸು ಬದಲಾಯ್ತಾ? ಆಟೋ ಬೇಕಾ?', 'Saar, manassu badalaytha? Auto beka?', 'Sir, changed your mind? Need an auto?'],
});

export const shopper = D('bridge-road-shopper', {
  name: 'Kamala', role: 'woman with shopping', site: 'Open ground near the flyover west road', diff: 2,
  voice: { rate: 0.95, pitch: 1.1 },
  persona: 'Tired thin woman with a vegetable bag and a cloth bag, wanting a bus home.',
  goal: 'Say you do not know the bus time and offer to carry her bag.',
  steps: [
    S('bus', ['ಈ ಕಡೆ ಬಸ್ ಯಾವಾಗ ಬರುತ್ತೆ ಗೊತ್ತಾ?', 'Ee kade bus yaavaaga barutte gottaa?', 'Do you know when the bus comes this way?'],
      'Say you do not know; ask at the bus stop.', ['Gottilla, bus stop alli kelona.', 'ಗೊತ್ತಿಲ್ಲ, ಬಸ್ ಸ್ಟಾಪ್‌ನಲ್ಲಿ ಕೇಳೋಣ.'],
      ['gottilla bus stop alli kelona', 'gottilla bus stop alli kelona amma', 'nange gottilla kelona', 'gottilla alli kelona', 'ಗೊತ್ತಿಲ್ಲ ಬಸ್ ಸ್ಟಾಪ್‌ನಲ್ಲಿ ಕೇಳೋಣ', 'ಗೊತ್ತಿಲ್ಲ ಕೇಳೋಣ', 'gottilla amma bus stop alli kelona'],
      'say_unknown_ask_at_stop', ['Say you do not know and suggest asking.', '"Kelona" = let us ask.', 'Say: "Gottilla, bus stop alli kelona."'],
      ['ಸರಿ ಮಗ, ಜೊತೆಗೆ ಹೋಗೋಣ.', 'Sari maga, jotege hogona.', 'Okay dear, let us go together.'],
      ['ಗೊತ್ತಾ ಇಲ್ವಾ ಹೇಳು ಮಗ.', 'Gottaa ilva helu maga.', 'Tell me whether you know, dear.']),
    S('carry', ['ಚೀಲ ಭಾರ ಆಯ್ತು. ಏನು ಮಾಡೋದು!', 'Cheela bhaara aytu. Enu maadodu!', 'The bag has become heavy. What to do!'],
      'Offer to carry her bag.', ['Haudu amma, naanu hidkolteeni.', 'ಹೌದು ಅಮ್ಮ, ನಾನು ಹಿಡ್ಕೊಳ್ತೀನಿ.'],
      ['haudu amma naanu hidkolteeni', 'naanu hidkolteeni amma', 'cheela kodi naanu hidkolteeni', 'amma naanu hidkolteeni', 'ಹೌದು ಅಮ್ಮ ನಾನು ಹಿಡ್ಕೊಳ್ತೀನಿ', 'ನಾನು ಹಿಡ್ಕೊಳ್ತೀನಿ ಅಮ್ಮ', 'haudu amma naanu hidkotini'],
      'offer_to_carry_her_bag', ['Offer to carry it.', '"Hidkolteeni" = I will hold.', 'Say: "Haudu amma, naanu hidkolteeni."'],
      ['ತುಂಬಾ ಉಪಕಾರ ಮಗ, ಚೆನ್ನಾಗಿರು.', 'Tumba upakaara maga, chennagiru.', 'Thank you so much, dear, stay well.'],
      ['ಹಿಡ್ಕೊಳ್ತೀಯಾ ಇಲ್ವಾ ಮಗ?', 'Hidkolteeya ilva maga?', 'Will you hold it or not, dear?']),
  ],
  outro: ['ಬಸ್ ಬಂತು, ಹತ್ತೋಣ ಬಾ ಮಗ.', 'Bus bantu, hattona baa maga.', 'The bus is here, let us board, dear.'],
  learned: [['gottilla, kelona', 'I do not know, let us ask'], ['naanu hidkolteeni', 'I will hold it']],
  again: ['ಮಗ, ಸ್ವಲ್ಪ ಈ ಕಡೆ ಬಾ.', 'Maga, swalpa ee kade baa.', 'Dear, come this way a bit.'],
});

export const vegWoman = D('chawl-lane-vegetable-woman', {
  name: 'Rathnamma', role: 'vegetable woman', site: 'Lane near a pete-house block', diff: 2,
  voice: { rate: 1.05, pitch: 1.05 },
  persona: 'Grey-haired gossipy woman with a bag of vegetables, grumbling about prices.',
  goal: 'Agree tomatoes are expensive and say you will come tomorrow.',
  steps: [
    S('tomato', ['ಟೊಮೇಟೊ ಕೆಜಿಗೆ ಐವತ್ತು ರೂಪಾಯಿ ಆಯ್ತು ನೋಡಿ!', 'Tomato kejige aivattu rupayi aytu nodi!', 'Tomatoes are fifty rupees a kilo now, just see!'],
      'Say tomatoes are expensive.', ['Ayyo, tomato tumba dubaari.', 'ಅಯ್ಯೋ, ಟೊಮೇಟೊ ತುಂಬಾ ದುಬಾರಿ.'],
      ['ayyo tomato tumba dubaari', 'tomato tumba dubaari', 'ayyo tomato dubaari amma', 'tomato dubaari aagide', 'ಅಯ್ಯೋ ಟೊಮೇಟೊ ತುಂಬಾ ದುಬಾರಿ', 'ಟೊಮೇಟೊ ತುಂಬಾ ದುಬಾರಿ', 'ayyo tomato dubari'],
      'say_tomato_expensive', ['Agree prices are high.', '"Dubaari" = expensive.', 'Say: "Ayyo, tomato tumba dubaari."'],
      ['ಅಲ್ವಾ! ನಮ್ಮ ಕಾಲದಲ್ಲಿ ರೂಪಾಯಿಗೆ ಮೂರು ಕೆಜಿ.', 'Alva! Namma kaaladalli rupayige mooru kg.', 'Right! In our days it was three kilos for a rupee.'],
      ['ಟೊಮೇಟೊ ಬಗ್ಗೆ ಏನಂತೀರಿ?', 'Tomato bagge enanteeri?', 'What do you say about tomatoes?']),
    S('buy', ['ನಿಮಗೂ ತರಕಾರಿ ಬೇಕಾ ಮಗ?', 'Nimagoo tarakaari beka maga?', 'Do you need vegetables too, dear?'],
      'Say not today; you will come tomorrow.', ['Ivattu beda, naale barteeni.', 'ಇವತ್ತು ಬೇಡ, ನಾಳೆ ಬರ್ತೀನಿ.'],
      ['ivattu beda naale barteeni', 'naale barteeni', 'ivattu beda amma', 'ivattu beda naale banni', 'ಇವತ್ತು ಬೇಡ ನಾಳೆ ಬರ್ತೀನಿ', 'ನಾಳೆ ಬರ್ತೀನಿ', 'ivattu beda, naale barteeni amma'],
      'say_not_today_tomorrow', ['Say not today.', '"Naale" = tomorrow.', 'Say: "Ivattu beda, naale barteeni."'],
      ['ಸರಿ, ನಾಳೆ ಫ್ರೆಶ್ ಬರುತ್ತೆ. ಬಾ ಮಗ.', 'Sari, naale fresh barutte. Baa maga.', 'Okay, fresh stock comes tomorrow. Come, dear.'],
      ['ಬೇಕಾ ಬೇಡವಾ ಮಗ?', 'Beka bedava maga?', 'Do you want some or not, dear?']),
  ],
  outro: ['ಹಾಗಾದ್ರೆ ನಾಳೆ ನಿಮಗೆ ಒಳ್ಳೆ ಬೆಲೆಗೆ ಕೊಡ್ತೀನಿ.', 'Haagaadre naale nimage olle belege kodteeni.', 'Then tomorrow I will give you a good price.'],
  learned: [['tomato tumba dubaari', 'tomatoes are very expensive'], ['naale barteeni', 'I will come tomorrow']],
  again: ['ಮಗ, ಇವತ್ತಾದ್ರೂ ತಗೊಳ್ತೀಯಾ?', 'Maga, ivattaadroo tagolteeya?', 'Dear, will you buy something today at least?'],
});

export const milkman = D('chawl-lane-milkman', {
  name: 'Kariyappa', role: 'milkman', site: 'Lane near a pete-house block', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Thin milkman with a steel milk can finishing his morning round, cheerful.',
  goal: 'Ask for one litre of milk and ask him to bring it every morning.',
  steps: [
    S('milk', ['ಹಾಲು ಹಾಲು! ಮನೆಗೆ ಹಾಲು ಬೇಕಾ ಸಾರ್?', 'Haalu haalu! Manege haalu beka saar?', 'Milk, milk! Need milk at home, sir?'],
      'Ask for one litre of milk.', ['Ondu leetar haalu kodi.', 'ಒಂದು ಲೀಟರ್ ಹಾಲು ಕೊಡಿ.'],
      ['ondu leetar haalu kodi', 'ondu litre haalu kodi', 'haalu ondu leetar beku', 'leetar haalu kodi anna', 'ಒಂದು ಲೀಟರ್ ಹಾಲು ಕೊಡಿ', 'ಲೀಟರ್ ಹಾಲು ಕೊಡಿ', 'one litre haalu kodi'],
      'ask_one_litre_milk', ['Ask for a litre.', '"Haalu" = milk.', 'Say: "Ondu leetar haalu kodi."'],
      ['ತಗೊಳ್ಳಿ, ತಾಜಾ ಹಾಲು, ಇಂದು ಬೆಳಿಗ್ಗೆ ಕರೆದದ್ದು.', 'Tagolli, taaja haalu, indu beligge karedaddu.', 'Here, fresh milk, drawn this morning.'],
      ['ಎಷ್ಟು ಲೀಟರ್ ಸಾರ್? ಹೇಳಿ.', 'Eshtu leetar saar? Heli.', 'How many litres, sir? Tell me.']),
    S('daily', ['ನಾಳೆಯಿಂದ ದಿನಾ ತರ್ಲಾ ಸಾರ್?', 'Naaleyinda dina tarla saar?', 'Shall I bring it daily from tomorrow, sir?'],
      'Say yes, every morning.', ['Haudu, dina beligge tanni.', 'ಹೌದು, ದಿನಾ ಬೆಳಿಗ್ಗೆ ತನ್ನಿ.'],
      ['haudu dina beligge tanni', 'dina beligge tanni', 'haudu dina tanni', 'beligge dina tanni anna', 'ಹೌದು ದಿನಾ ಬೆಳಿಗ್ಗೆ ತನ್ನಿ', 'ದಿನಾ ಬೆಳಿಗ್ಗೆ ತನ್ನಿ', 'haudu dina beligge tarri'],
      'ask_daily_morning_milk', ['Say yes, every morning.', '"Dina" = daily.', 'Say: "Haudu, dina beligge tanni."'],
      ['ಸರಿ ಸಾರ್, ಆರೂವರೆಗೆ ಬರ್ತೀನಿ.', 'Sari saar, aaroovarege barteeni.', 'Okay sir, I will come at half past six.'],
      ['ದಿನಾ ಬೇಕಾ ಬೇಡವಾ ಸಾರ್?', 'Dina beka bedava saar?', 'Daily or not, sir?']),
  ],
  outro: ['ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಸಿಗೋಣ ಸಾರ್!', 'Naale beligge sigona saar!', 'See you tomorrow morning, sir!'],
  learned: [['ondu leetar haalu kodi', 'give me one litre of milk'], ['dina beligge tanni', 'bring it every morning']],
  again: ['ಸಾರ್, ಇವತ್ತಿನ ಹಾಲು ತಗೊಂಡ್ರಾ?', 'Saar, ivattina haalu tagondra?', 'Sir, did you take today\'s milk?'],
});

export const battingUncle = D('field-batting-uncle', {
  name: 'Srikanth', role: 'uncle practising cricket', site: 'Open field', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Round uncle in shorts with a bat, practising his batting stance alone and eager for feedback.',
  goal: 'Say his stance looks right and politely refuse to bowl today.',
  steps: [
    S('stance', ['ನನ್ನ ಬ್ಯಾಟಿಂಗ್ ಸ್ಟಾನ್ಸ್ ಸರಿ ಇದ್ಯಾ ನೋಡಿ ಸಾರ್?', 'Nanna batting stance sari idya nodi saar?', 'Is my batting stance right, sir? Take a look.'],
      'Say his stance looks right.', ['Haudu, nimma stance sari ide.', 'ಹೌದು, ನಿಮ್ಮ ಸ್ಟಾನ್ಸ್ ಸರಿ ಇದೆ.'],
      ['haudu nimma stance sari ide', 'nimma stance sari ide', 'stance sari ide uncle', 'haudu stance chennagide', 'ಹೌದು ನಿಮ್ಮ ಸ್ಟಾನ್ಸ್ ಸರಿ ಇದೆ', 'ನಿಮ್ಮ ಸ್ಟಾನ್ಸ್ ಸರಿ ಇದೆ', 'haudu nimma stance sari'],
      'say_stance_right', ['Give him a thumbs up.', '"Sari ide" = is correct.', 'Say: "Haudu, nimma stance sari ide."'],
      ['ಹೌದಾ! ಕಾಲೇಜಲ್ಲಿ ನಾನೇ ಕ್ಯಾಪ್ಟನ್ ಆಗಿದ್ದೆ.', 'Haudaa! Collegealli naane captain aagidde.', 'Really! I was the captain in college.'],
      ['ಸ್ಟಾನ್ಸ್ ಹೇಗಿದೆ ಅಂತ ಹೇಳಿ.', 'Stance hegide anta heli.', 'Tell me how the stance is.']),
    S('bowl', ['ನೀವೂ ಒಂದು ಬಾಲ್ ಹಾಕ್ತೀರಾ?', 'Neevoo ondu ball haakteera?', 'Will you bowl a ball too?'],
      'Say not today, next time.', ['Illa, mundina sala aadteeni.', 'ಇಲ್ಲ, ಮುಂದಿನ ಸಲ ಆಡ್ತೀನಿ.'],
      ['illa mundina sala aadteeni', 'mundina sala aadteeni', 'illa uncle mundina sala', 'ivattu illa mundina sala', 'ಇಲ್ಲ ಮುಂದಿನ ಸಲ ಆಡ್ತೀನಿ', 'ಮುಂದಿನ ಸಲ ಆಡ್ತೀನಿ', 'illa mundina sala aadtini'],
      'decline_bowl_next_time', ['Say next time.', '"Mundina sala" = next time.', 'Say: "Illa, mundina sala aadteeni."'],
      ['ಸರಿ ಸರಿ, ಮುಂದಿನ ಸಲ ನೆಟ್ಸ್‌ನಲ್ಲಿ ಸಿಗೋಣ.', 'Sari sari, mundina sala nets-nalli sigona.', 'Okay okay, let us meet at the nets next time.'],
      ['ಹಾಕ್ತೀರಾ ಇಲ್ವಾ ಹೇಳಿ.', 'Haakteera ilva heli.', 'Will you bowl or not?']),
  ],
  outro: ['ಒಳ್ಳೆ ಫೀಡ್‌ಬ್ಯಾಕ್, ಥ್ಯಾಂಕ್ಸ್ ರೋಹನ್!', 'Olle feedback, thanks Rohan!', 'Good feedback, thanks Rohan!'],
  learned: [['nimma stance sari ide', 'your stance is right'], ['mundina sala aadteeni', 'I will play next time']],
  again: ['ರೋಹನ್, ಇನ್ನೊಂದು ಶಾಟ್ ನೋಡಿ!', 'Rohan, innondu shot nodi!', 'Rohan, watch one more shot!'],
});
