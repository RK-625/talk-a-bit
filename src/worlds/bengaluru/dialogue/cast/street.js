// The ten everyday Bengalureans (street-1 ... street-10) who fill the empty stretches of the city.
// Their idle pose is seeded (phone, chat, newspaper), so each dialogue stands on its own wherever they are.
import { dialogue as D, step as S } from '../kit.js';

export const street1 = D('street-1', {
  name: 'Anil', role: 'Bengalurean (man)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Office-goer texting while waiting for a friend, who badly wants a filter coffee and does not know where to get one.',
  goal: 'Tell him there is a darshini straight ahead.',
  steps: [
    S('coffee', ['ಸಾರ್, ಹತ್ತಿರ ಫಿಲ್ಟರ್ ಕಾಫಿ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ?', 'Saar, hattira filter coffee elli sigutte?', 'Sir, where can I get filter coffee nearby?'],
      'Tell him there is a darshini straight ahead.', ['Seedha hogi, alli darshini ide.', 'ಸೀದಾ ಹೋಗಿ, ಅಲ್ಲಿ ದರ್ಶಿನಿ ಇದೆ.'],
      ['seedha hogi alli darshini ide', 'seedha hogi darshini ide', 'alli darshini ide seedha hogi', 'seedha hodre darshini sigutte', 'ಸೀದಾ ಹೋಗಿ ಅಲ್ಲಿ ದರ್ಶಿನಿ ಇದೆ', 'ಸೀದಾ ಹೋಗಿ ದರ್ಶಿನಿ ಇದೆ', 'seedha hogi alli darshini sigutte'],
      'direct_to_darshini', ['Point him to a darshini ahead.', '"Seedha" = straight.', 'Say: "Seedha hogi, alli darshini ide."'],
      ['ಥ್ಯಾಂಕ್ಸ್! ಕಾಫಿ ಇಲ್ಲದೆ ಬೆಳಿಗ್ಗೆ ಶುರುವೇ ಆಗಲ್ಲ.', 'Thanks! Coffee illade beligge shuruve aagalla.', 'Thanks! The morning does not start without coffee.'],
      ['ಕಾಫಿ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ ಅಂತ ಹೇಳ್ತೀರಾ?', 'Coffee elli sigutte anta helteera?', 'Can you tell me where to get coffee?']),
  ],
  outro: ['ಬನ್ನಿ, ನಿಮಗೂ ಒಂದು ಕಾಫಿ ಕೊಡಿಸ್ತೀನಿ.', 'Banni, nimagoo ondu coffee kodisteeni.', 'Come, I will treat you to a coffee too.'],
  learned: [['seedha hogi', 'go straight']],
  again: ['ಕಾಫಿ ಸಿಕ್ತು ಸಾರ್, ಥ್ಯಾಂಕ್ಸ್! ಈಗ ಫ್ರೆಂಡ್ ಬರ್ತಿದ್ದಾನೆ.', 'Coffee sikthu saar, thanks! Iga friend bartiddane.', 'Got my coffee, sir, thanks! My friend is coming now.'],
});

export const street2 = D('street-2', {
  name: 'Sunanda', role: 'Bengalurean (woman)', site: 'Everyday street', diff: 1,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Thin woman in a purple saree, standing and watching the world go by, with a loose sandal strap.',
  goal: 'Offer to hold her cloth bag while she fixes her sandal.',
  steps: [
    S('bag', ['ಈ ಜೋಳಿಗೆ ಸ್ವಲ್ಪ ಹಿಡ್ಕೊಳ್ತೀರಾ? ಚಪ್ಪಲಿ ಸರಿ ಮಾಡ್ಕೊಳ್ತೀನಿ.', 'Ee jolige swalpa hidkolteera? Chappali sari maadkolteeni.', 'Will you hold this bag a moment? I will fix my sandal.'],
      'Say yes and take the bag.', ['Haudu amma, kodi.', 'ಹೌದು ಅಮ್ಮ, ಕೊಡಿ.'],
      ['haudu amma kodi', 'kodi amma naanu hidkolteeni', 'sari amma kodi', 'amma kodi hidkolteeni', 'ಹೌದು ಅಮ್ಮ ಕೊಡಿ', 'ಕೊಡಿ ಅಮ್ಮ', 'haudu amma jolige kodi'],
      'hold_bag_for_woman', ['Say yes and offer to take it.', '"Kodi" = give.', 'Say: "Haudu amma, kodi."'],
      ['ಜೀವನಪೂರ್ತಿ ಒಳ್ಳೇದಾಗಲಿ! ಎರಡೇ ನಿಮಿಷ.', 'Jeevanapoorti olledaagali! Erade nimisha.', 'May good come to you always! Just two minutes.'],
      ['ಜೋಳಿಗೆ ಹಿಡ್ಕೊಳ್ತೀರಾ ಇಲ್ವಾ?', 'Jolige hidkolteera ilva?', 'Will you hold the bag or not?']),
  ],
  outro: ['ದೇವರು ನಿಮ್ಮನ್ನ ಚೆನ್ನಾಗಿಟ್ಟಿರಲಿ ಮಗ.', 'Devaru nimmanna chennagittirali maga.', 'May God keep you well, dear.'],
  learned: [['haudu amma, kodi', 'yes ma\'am, give it']],
  again: ['ಅರೆ, ಅದೇ ಒಳ್ಳೆ ಹುಡುಗ! ಚಪ್ಪಲಿ ಈಗ ಗಟ್ಟಿ ಇದೆ.', 'Are, ade olle huduga! Chappali iga gatti ide.', 'The same kind boy! My sandal is firm now.'],
});

export const street3 = D('street-3', {
  name: 'Nikhil', role: 'Bengalurean (teen)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Teen chatting and gesturing as he tells a story about his school team\'s win.',
  goal: 'Congratulate him and say you will come to the next match.',
  steps: [
    S('win', ['ಅಣ್ಣ, ನಮ್ಮ ಸ್ಕೂಲ್ ಟೀಮ್ ಮ್ಯಾಚ್ ಗೆದ್ದಿದೆ!', 'Anna, namma school team match geddide!', 'Brother, our school team won the match!'],
      'Congratulate him.', ['Wow, abhinandanegalu!', 'ವಾವ್, ಅಭಿನಂದನೆಗಳು!'],
      ['wow abhinandanegalu', 'abhinandanegalu', 'congratulations anna', 'tumba khushi, abhinandanegalu', 'ವಾವ್ ಅಭಿನಂದನೆಗಳು', 'ಅಭಿನಂದನೆಗಳು', 'wow tumba olledu abhinandanegalu'],
      'congratulate_teen', ['Say congratulations.', '"Abhinandanegalu" = congratulations.', 'Say: "Wow, abhinandanegalu!"'],
      ['ಥ್ಯಾಂಕ್ಸ್ ಅಣ್ಣ! ನಾನೇ ಕೊನೆ ಬಾಲ್‌ನಲ್ಲಿ ಸಿಕ್ಸ್ ಹೊಡೆದೆ!', 'Thanks anna! Naane kone ball-nalli six hodede!', 'Thanks brother! I hit a six off the last ball!'],
      ['ಗೆದ್ದೆವು ಅಂತ ಹೇಳಿದ್ನಲ್ಲ, ಏನಂತೀರಿ?', 'Geddevu anta helidnalla, enanteeri?', 'I said we won, what do you say?']),
    S('next', ['ಮುಂದಿನ ಮ್ಯಾಚ್ ಭಾನುವಾರ. ನೋಡೋಕೆ ಬರ್ತೀರಾ?', 'Mundina match bhaanuvaara. Nodoke barteera?', 'The next match is on Sunday. Will you come to watch?'],
      'Say you will come to watch.', ['Haudu, naanu nodoke barteeni.', 'ಹೌದು, ನಾನು ನೋಡೋಕೆ ಬರ್ತೀನಿ.'],
      ['haudu naanu nodoke barteeni', 'nodoke barteeni', 'sari naanu nodoke barteeni', 'khanditha nodoke barteeni', 'ಹೌದು ನಾನು ನೋಡೋಕೆ ಬರ್ತೀನಿ', 'ನೋಡೋಕೆ ಬರ್ತೀನಿ', 'haudu nodoke baruttini'],
      'say_will_watch_match', ['Say you will come.', '"Nodoke barteeni" = I will come to watch.', 'Say: "Haudu, naanu nodoke barteeni."'],
      ['ಸೂಪರ್! ಚಿಯರ್ ಮಾಡೋಕೆ ಒಬ್ಬರು ಜಾಸ್ತಿ.', 'Super! Cheer maadoke obbaru jaasti.', 'Super! One more person to cheer.'],
      ['ಬರ್ತೀರಾ ಇಲ್ವಾ ಅಣ್ಣ?', 'Barteera ilva anna?', 'Are you coming or not, brother?']),
  ],
  outro: ['ಭಾನುವಾರ ಸಿಗೋಣ ಅಣ್ಣ! ಬೈ!', 'Bhaanuvaara sigona anna! Bye!', 'See you on Sunday, brother! Bye!'],
  learned: [['abhinandanegalu', 'congratulations'], ['naanu nodoke barteeni', 'I will come to watch']],
  again: ['ಅಣ್ಣ, ಭಾನುವಾರ ಮರೀಬೇಡಿ!', 'Anna, bhaanuvaara mareebedi!', 'Brother, do not forget Sunday!'],
});

export const street4 = D('street-4', {
  name: 'Hanumanthaiah', role: 'Bengalurean (elder)', site: 'Everyday street', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Thin old man reading the newspaper and tutting at the headlines, with vibhuti on his forehead.',
  goal: 'Agree that mobile phones are everywhere these days.',
  steps: [
    S('mobile', ['ಈ ಕಾಲದ ಮಕ್ಕಳು ಮೊಬೈಲ್ ಬಿಡಲ್ಲ, ಏನು ಮಾಡೋದು!', 'Ee kaalada makkalu mobile bidalla, enu maadodu!', 'Children these days will not let go of the mobile, what to do!'],
      'Agree that there are too many phones.', ['Haudu thatha, mobile jaasti aytu.', 'ಹೌದು ತಾತ, ಮೊಬೈಲ್ ಜಾಸ್ತಿ ಆಯ್ತು.'],
      ['haudu thatha mobile jaasti aytu', 'mobile jaasti aytu thatha', 'haudu thatha mobile jaasti', 'thatha mobile jaasti aagide', 'ಹೌದು ತಾತ ಮೊಬೈಲ್ ಜಾಸ್ತಿ ಆಯ್ತು', 'ಮೊಬೈಲ್ ಜಾಸ್ತಿ ಆಯ್ತು ತಾತ', 'haudu thatha mobile jaasti aagide'],
      'agree_too_many_mobiles', ['Agree with him.', '"Jaasti aytu" = has become too much.', 'Say: "Haudu thatha, mobile jaasti aytu."'],
      ['ನೋಡು, ಹುಡುಗನಿಗೂ ಅರ್ಥ ಆಯ್ತು. ಪೇಪರ್ ಓದು ಮಗು.', 'Nodu, huduganigoo artha aytu. Paper odu magu.', 'See, even the boy understands. Read the paper, child.'],
      ['ಏನಂದೆ? ಕಿವಿ ಕೇಳಲ್ಲ, ಜೋರಾಗಿ ಹೇಳು.', 'Enande? Kivi kelalla, joragi helu.', 'What did you say? My ears are weak, say it louder.']),
  ],
  outro: ['ಒಳ್ಳೆ ಮಾತು ಹುಡುಗ. ಚೆನ್ನಾಗಿರು.', 'Olle maatu huduga. Chennagiru.', 'Well said, young man. Stay well.'],
  learned: [['mobile jaasti aytu', 'phones have become too much']],
  again: ['ಬಾ ಹುಡುಗ, ಈ ಸುದ್ದಿ ಓದು!', 'Baa huduga, ee suddi odu!', 'Come, boy, read this news!'],
});

export const street5 = D('street-5', {
  name: 'Harish', role: 'Bengalurean (man)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Round man with a backpack and a red lanyard, waiting for his cab to the tech park.',
  goal: 'Say you are heading to the tech park and politely decline a shared cab.',
  steps: [
    S('where', ['ಕ್ಯಾಬ್ ಇನ್ನೂ ಬಂದಿಲ್ಲ. ನೀವು ಯಾವ ಕಡೆ ಹೋಗ್ತಿದ್ದೀರಾ?', 'Cab innu bandilla. Neevu yaava kade hogtiddira?', 'My cab has not come. Which way are you going?'],
      'Say you are going to the tech park.', ['Naanu tech park kade.', 'ನಾನು ಟೆಕ್ ಪಾರ್ಕ್ ಕಡೆ.'],
      ['naanu tech park kade', 'tech park kade hogtiddini', 'naanu tech park ge hogtiddini', 'tech park kade sir', 'ನಾನು ಟೆಕ್ ಪಾರ್ಕ್ ಕಡೆ', 'ಟೆಕ್ ಪಾರ್ಕ್ ಕಡೆ ಹೋಗ್ತಿದ್ದೀನಿ', 'naanu tech park kade hogtiddini'],
      'say_going_to_tech_park', ['Say your direction.', '"Kade" = towards.', 'Say: "Naanu tech park kade."'],
      ['ಓ ನಾನೂ ಅದೇ ಕಡೆ! ಹಾಗಾದ್ರೆ ಕ್ಯಾಬ್ ಶೇರ್ ಮಾಡೋಣ್ವಾ?', 'O naanoo ade kade! Haagaadre cab share maadonva?', 'Oh I am going that way too! Shall we share the cab?'],
      ['ಯಾವ ಕಡೆ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Yaava kade anta heli saar.', 'Tell me which way, sir.']),
    S('share', ['ನಮ್ಮ ಕ್ಯಾಬ್‌ನಲ್ಲಿ ಜಾಗ ಇದೆ, ಬರ್ತೀರಾ?', 'Namma cab-nalli jaaga ide, barteera?', 'There is space in our cab, will you come?'],
      'Politely decline; say you will take the metro.', ['Beda, dhanyavaada, naanu metro tagolteeni.', 'ಬೇಡ, ಧನ್ಯವಾದ, ನಾನು ಮೆಟ್ರೋ ತಗೊಳ್ತೀನಿ.'],
      ['beda dhanyavaada naanu metro tagolteeni', 'naanu metro tagolteeni', 'beda sir metro tagolteeni', 'beda dhanyavaada metro ide', 'ಬೇಡ ಧನ್ಯವಾದ ನಾನು ಮೆಟ್ರೋ ತಗೊಳ್ತೀನಿ', 'ನಾನು ಮೆಟ್ರೋ ತಗೊಳ್ತೀನಿ', 'beda thanks naanu metro'],
      'decline_cab_take_metro', ['Say no thanks politely.', '"Beda" = no, I do not want.', 'Say: "Beda, dhanyavaada, naanu metro tagolteeni."'],
      ['ಸರಿ ಸಾರ್, ಮೆಟ್ರೋ ಬೇಗ ಹೋಗುತ್ತೆ, ಒಳ್ಳೇದು.', 'Sari saar, metro bega hogutte, olledu.', 'Okay sir, the metro is quick, good.'],
      ['ಬರ್ತೀರಾ ಇಲ್ವಾ ಹೇಳಿ.', 'Barteera ilva heli.', 'Tell me whether you are coming.']),
  ],
  outro: ['ಆಫೀಸ್‌ನಲ್ಲಿ ಸಿಗೋಣ ಸಾರ್. ಕ್ಯಾಬ್ ಬಂತು!', 'Office-nalli sigona saar. Cab bantu!', 'See you at the office, sir. My cab is here!'],
  learned: [['naanu tech park kade', 'I am going towards the tech park'], ['beda, dhanyavaada', 'no, thank you']],
  again: ['ಸಾರ್, ಕ್ಯಾಬ್ ಇನ್ನೂ ಬಂದಿಲ್ಲ, ಲೇಟ್ ಆಗ್ತಿದೆ.', 'Saar, cab innu bandilla, late aagtide.', 'Sir, the cab has not come, I am getting late.'],
});

export const street6 = D('street-6', {
  name: 'Anitha', role: 'Bengalurean (woman)', site: 'Everyday street', diff: 1,
  voice: { rate: 1.05, pitch: 1.2 },
  persona: 'Woman in a mint salwar kameez smiling at her phone screen and keen to share a funny meme.',
  goal: 'Laugh and say the meme is funny.',
  steps: [
    S('meme', ['ಈ ಮೀಮ್ ನೋಡಿ, ತುಂಬಾ ಫನ್ನಿ ಇದೆ!', 'Ee meme nodi, tumba funny ide!', 'Look at this meme, it is so funny!'],
      'Laugh and say it is funny.', ['Ha ha, tumba funny!', 'ಹ ಹ, ತುಂಬಾ ಫನ್ನಿ!'],
      ['ha ha tumba funny', 'tumba funny', 'ha ha super funny ide', 'tumba nagu barutte', 'ಹ ಹ ತುಂಬಾ ಫನ್ನಿ', 'ತುಂಬಾ ಫನ್ನಿ', 'ha ha funny ide madam'],
      'say_meme_funny', ['React to the meme.', '"Funny" is used in Kannada.', 'Say: "Ha ha, tumba funny!"'],
      ['ಹಹ್ಹಾ! ನಿಮಗೂ ಕಳಿಸ್ತೀನಿ, ನಂಬರ್ ಕೊಡಿ.', 'Hahhaa! Nimagoo kalisteeni, number kodi.', 'Haha! I will send it to you, give me your number.'],
      ['ಮೀಮ್ ಹೇಗಿದೆ ಅಂತ ಹೇಳಿ!', 'Meme hegide anta heli!', 'Tell me how the meme is!']),
  ],
  outro: ['ಇವತ್ತಿನ ದಿನ ಒಳ್ಳೆದಾಯ್ತು, ಥ್ಯಾಂಕ್ಸ್!', 'Ivattina dina olledaytu, thanks!', 'My day got better, thanks!'],
  learned: [['tumba funny', 'very funny']],
  again: ['ಇನ್ನೊಂದು ಮೀಮ್ ನೋಡ್ತೀರಾ?', 'Innondu meme nodteera?', 'Want to see another meme?'],
});

export const street7 = D('street-7', {
  name: 'Linganna', role: 'Bengalurean (elder)', site: 'Everyday street', diff: 1,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Bald old man in a lungi resting quietly in the shade with a blue towel.',
  goal: 'Agree the shade is cool.',
  steps: [
    S('shade', ['ಇಲ್ಲಿ ನೆರಳು ಚೆನ್ನಾಗಿದೆ, ಸ್ವಲ್ಪ ಕೂತ್ಕೊಂಡೆ.', 'Illi nerallu chennagide, swalpa kootkonde.', 'The shade is good here, I sat down for a while.'],
      'Agree that it is cool here.', ['Haudu thatha, illi tampaagide.', 'ಹೌದು ತಾತ, ಇಲ್ಲಿ ತಂಪಾಗಿದೆ.'],
      ['haudu thatha illi tampaagide', 'illi tampaagide thatha', 'haudu tampaagide', 'illi tumba tampaagide', 'ಹೌದು ತಾತ ಇಲ್ಲಿ ತಂಪಾಗಿದೆ', 'ಇಲ್ಲಿ ತಂಪಾಗಿದೆ', 'haudu thatha tampu ide'],
      'agree_shade_cool', ['Agree about the shade.', '"Tampaagide" = it is cool.', 'Say: "Haudu thatha, illi tampaagide."'],
      ['ಮರದ ನೆರಳು ಅಂದ್ರೆ ಹಾಗೇ. ಬಾ, ನೀನೂ ಕೂತ್ಕೋ.', 'Marada nerallu andre haage. Baa, neenoo kootko.', 'That is what a tree\'s shade is. Come, sit too.'],
      ['ಏನೋ ಹೇಳಿದೆ? ಸ್ವಲ್ಪ ಜೋರಾಗಿ.', 'Eno helide? Swalpa joragi.', 'What did you say? A bit louder.']),
  ],
  outro: ['ಹೋಗಿ ಬನ್ನಿ ಮಗ, ಬಿಸಿಲು ಜಾಸ್ತಿ ಇದೆ.', 'Hogi banni maga, bisilu jaasti ide.', 'Go and come again, child, the sun is strong.'],
  learned: [['illi tampaagide', 'it is cool here']],
  again: ['ಬಾ ಮಗ, ನೆರಳಿಗೆ ಬಾ.', 'Baa maga, neralige baa.', 'Come child, come into the shade.'],
});

export const street8 = D('street-8', {
  name: 'Varun', role: 'Bengalurean (teen)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Bored teen in a red-and-yellow striped tee scrolling on his phone, looking for something fun to do.',
  goal: 'Suggest the pedal boats at the lake and say you have office.',
  steps: [
    S('bored', ['ಬೋರ್ ಆಗ್ತಿದೆ ಅಣ್ಣ. ಇಲ್ಲಿ ಏನಾದ್ರೂ ಮಜಾ ಇದ್ಯಾ?', 'Bore aagtide anna. Illi enaadru maja idya?', 'I am bored, brother. Is there anything fun here?'],
      'Suggest the pedal boats at the lake.', ['Lake hatra hogi, pedal boat ide.', 'ಲೇಕ್ ಹತ್ರ ಹೋಗಿ, ಪೆಡಲ್ ಬೋಟ್ ಇದೆ.'],
      ['lake hatra hogi pedal boat ide', 'lake hatra pedal boat ide', 'lake ge hogi pedal boat ide', 'pedal boat ide lake alli', 'ಲೇಕ್ ಹತ್ರ ಹೋಗಿ ಪೆಡಲ್ ಬೋಟ್ ಇದೆ', 'ಲೇಕ್ ಹತ್ರ ಪೆಡಲ್ ಬೋಟ್ ಇದೆ', 'lake hatra hogi boat ide'],
      'suggest_pedal_boats', ['Give him an idea.', '"Hatra" = near.', 'Say: "Lake hatra hogi, pedal boat ide."'],
      ['ಓಹೋ, ಒಳ್ಳೆ ಐಡಿಯಾ! ಫ್ರೆಂಡ್ಸ್‌ನ ಕರೀತೀನಿ.', 'Oho, olle idea! Friends-na kareeteeni.', 'Oh, a good idea! I will call my friends.'],
      ['ಏನಾದ್ರೂ ಮಜಾ ಇದ್ಯಾ ಅಂತ ಕೇಳ್ದೆ.', 'Enaadru maja idya anta kelde.', 'I asked if there is anything fun.']),
    S('join', ['ನೀವೂ ಬರ್ತೀರಾ ಅಣ್ಣ ನಮ್ಮ ಜೊತೆ?', 'Neevoo barteera anna namma jote?', 'Will you come along with us, brother?'],
      'Say you cannot, you have office.', ['Illa, nange office ide.', 'ಇಲ್ಲ, ನನಗೆ ಆಫೀಸ್ ಇದೆ.'],
      ['illa nange office ide', 'nange office ide', 'illa office ide anna', 'office ide barlikke aagalla', 'ಇಲ್ಲ ನನಗೆ ಆಫೀಸ್ ಇದೆ', 'ನನಗೆ ಆಫೀಸ್ ಇದೆ', 'illa nange office ide anna'],
      'decline_office', ['Say you have to work.', '"Nange ide" = I have.', 'Say: "Illa, nange office ide."'],
      ['ಪರವಾಗಿಲ್ಲ ಅಣ್ಣ, ವೀಕೆಂಡ್‌ನಲ್ಲಿ ಬನ್ನಿ.', 'Paravagilla anna, weekend-nalli banni.', 'No problem, brother, come at the weekend.'],
      ['ಬರ್ತೀರಾ ಇಲ್ವಾ ಅಂತ ಹೇಳಿ.', 'Barteera ilva anta heli.', 'Tell me whether you are coming.']),
  ],
  outro: ['ಥ್ಯಾಂಕ್ಸ್ ಅಣ್ಣ! ಬೋರ್ ಹೋಯ್ತು!', 'Thanks anna! Bore hoytu!', 'Thanks brother! No more boredom!'],
  learned: [['pedal boat ide', 'there are pedal boats'], ['nange office ide', 'I have office']],
  again: ['ಅಣ್ಣ, ಬೋಟ್ ಫೋಟೋ ಕಳಿಸ್ತೀನಿ!', 'Anna, boat photo kalisteeni!', 'Brother, I will send you a boat photo!'],
});

export const street9 = D('street-9', {
  name: 'Raghavendra', role: 'Bengalurean (man)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Thin man with a handlebar moustache chatting loudly and gesturing about cricket.',
  goal: 'Agree that the last over was super.',
  steps: [
    S('match', ['ನಿನ್ನೆಯ ಮ್ಯಾಚ್ ನೋಡಿದ್ರಾ? ಕೊನೆ ಓವರ್ ಅಲ್ವಾ!', 'Ninneya match nodidra? Kone over alva!', 'Did you see yesterday\'s match? That last over!'],
      'Agree that the last over was super.', ['Haudu, kone over super ittu.', 'ಹೌದು, ಕೊನೆ ಓವರ್ ಸೂಪರ್ ಇತ್ತು.'],
      ['haudu kone over super ittu', 'kone over super ittu', 'haudu kone over tumba chennagittu', 'super over ittu sir', 'ಹೌದು ಕೊನೆ ಓವರ್ ಸೂಪರ್ ಇತ್ತು', 'ಕೊನೆ ಓವರ್ ಸೂಪರ್ ಇತ್ತು', 'haudu kone over super'],
      'agree_last_over_super', ['Agree about the match.', '"Kone" = last. "Ittu" = was.', 'Say: "Haudu, kone over super ittu."'],
      ['ಅಲ್ವಾ! ಸಿಕ್ಸ್ ಹೊಡೆದಾಗ ನಾನು ಕುರ್ಚಿಯಿಂದ ಹಾರಿದೆ!', 'Alva! Six hodedaaga naanu kurchiyinda haaride!', 'Right! When the six was hit I jumped out of my chair!'],
      ['ಮ್ಯಾಚ್ ಹೇಗಿತ್ತು ಅಂತ ಹೇಳಿ.', 'Match hegittu anta heli.', 'Tell me how the match was.']),
  ],
  outro: ['ಮುಂದಿನ ಮ್ಯಾಚ್ ಒಟ್ಟಿಗೆ ನೋಡೋಣ!', 'Mundina match ottige nodona!', 'Let us watch the next match together!'],
  learned: [['kone over super ittu', 'the last over was super']],
  again: ['ಸಾರ್, ಇವತ್ತಿನ ಸ್ಕೋರ್ ಏನು?', 'Saar, ivattina score enu?', 'Sir, what is today\'s score?'],
});

export const street10 = D('street-10', {
  name: 'Geetha', role: 'Bengalurean (woman)', site: 'Everyday street', diff: 2,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Round woman in a pink salwar with a vegetable bag, pausing for breath.',
  goal: 'Point her to the free bench and offer her water.',
  steps: [
    S('bench', ['ಅಯ್ಯೋ, ಉಸಿರು ಕಟ್ಟಿತು. ಕೂರೋಕೆ ಜಾಗ ಇದ್ಯಾ?', 'Ayyo, usiru kattitu. Kooroke jaaga idya?', 'Oh, I am out of breath. Is there a place to sit?'],
      'Point to the free bench.', ['Aa bench khaali ide, alli kootkolli.', 'ಆ ಬೆಂಚ್ ಖಾಲಿ ಇದೆ, ಅಲ್ಲಿ ಕೂತ್ಕೊಳ್ಳಿ.'],
      ['aa bench khaali ide alli kootkolli', 'aa bench khaali ide', 'alli bench ide kootkolli', 'bench khaali ide amma', 'ಆ ಬೆಂಚ್ ಖಾಲಿ ಇದೆ ಅಲ್ಲಿ ಕೂತ್ಕೊಳ್ಳಿ', 'ಆ ಬೆಂಚ್ ಖಾಲಿ ಇದೆ', 'aa bench khaali ide amma'],
      'point_to_free_bench', ['Say there is a free bench.', '"Khaali" = empty.', 'Say: "Aa bench khaali ide, alli kootkolli."'],
      ['ಥ್ಯಾಂಕ್ಸ್ ಮಗ, ಕಾಲು ನೋಯ್ತಿತ್ತು.', 'Thanks maga, kaalu noyttittu.', 'Thanks child, my legs were aching.'],
      ['ಎಲ್ಲಿ ಕೂರೋದು ಅಂತ ಹೇಳು ಮಗ.', 'Elli kooroodu anta helu maga.', 'Tell me where to sit, child.']),
    S('water', ['ಬಾಯಾರಿಕೆ ಆಗ್ತಿದೆ, ನೀರು ಎಲ್ಲಿ ಸಿಗುತ್ತೆ?', 'Baayaarike aagtide, neeru elli sigutte?', 'I am thirsty, where can I get water?'],
      'Offer your water bottle.', ['Nanna hattira neeru ide, tagolli.', 'ನನ್ನ ಹತ್ತಿರ ನೀರು ಇದೆ, ತಗೊಳ್ಳಿ.'],
      ['nanna hattira neeru ide tagolli', 'neeru ide tagolli', 'nanna hattira neeru ide', 'neeru tagolli amma', 'ನನ್ನ ಹತ್ತಿರ ನೀರು ಇದೆ ತಗೊಳ್ಳಿ', 'ನೀರು ಇದೆ ತಗೊಳ್ಳಿ', 'nanna hattira water ide tagolli'],
      'offer_water_bottle', ['Offer your water.', '"Nanna hattira" = with me.', 'Say: "Nanna hattira neeru ide, tagolli."'],
      ['ದೇವರು ನಿನಗೆ ಒಳ್ಳೇದು ಮಾಡ್ಲಿ ಮಗ.', 'Devaru ninage olledu maadli maga.', 'May God bless you, child.'],
      ['ನೀರು ಇದ್ಯಾ ಇಲ್ವಾ ಹೇಳು ಮಗ.', 'Neeru idya ilva helu maga.', 'Tell me whether you have water, child.']),
  ],
  outro: ['ನಿನ್ನಂಥ ಹುಡುಗರು ಇರೋದಕ್ಕೇ ಈ ಊರು ಚೆನ್ನ.', 'Ninnantha hudugaru irodakke ee ooru chenna.', 'This city is lovely because of boys like you.'],
  learned: [['aa bench khaali ide', 'that bench is free'], ['neeru ide, tagolli', 'I have water, take it']],
  again: ['ಮಗ, ಸ್ವಲ್ಪ ಕೂತ್ಕೊಂಡು ಹೋಗು.', 'Maga, swalpa kootkondu hogu.', 'Child, sit a while before you go.'],
});
