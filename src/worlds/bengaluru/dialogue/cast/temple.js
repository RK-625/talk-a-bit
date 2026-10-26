// The small gopura-style temple: bells, offering stall, flower seller, chappal stand.
import { dialogue as D, step as S } from '../kit.js';

export const bellDevotee = D('temple-bell-devotee', {
  name: 'Vasantha', role: 'devotee at the bells', site: 'Temple, bell torana', diff: 1,
  voice: { rate: 0.85, pitch: 1.05 },
  persona: 'Thin woman standing quietly under the bells, praying in her mind, who smiles at the newcomer.',
  goal: 'Ask if you may ring the bell.',
  steps: [
    S('bell', ['ಗಂಟೆ ಬಾರಿಸಿ ಪ್ರಾರ್ಥನೆ ಮಾಡಿ, ಒಳ್ಳೇದಾಗುತ್ತೆ.', 'Gante baarisi praarthane maadi, olledaagutte.', 'Ring the bell and pray, good will come.'],
      'Ask if you may ring the bell.', ['Naanoo gante baarisla?', 'ನಾನೂ ಗಂಟೆ ಬಾರಿಸ್ಲಾ?'],
      ['naanoo gante baarisla', 'gante baarisla', 'naanu gante baarisla amma', 'gante baarisabahuda', 'ನಾನೂ ಗಂಟೆ ಬಾರಿಸ್ಲಾ', 'ಗಂಟೆ ಬಾರಿಸ್ಲಾ ಅಮ್ಮ', 'naanu gante baarisla'],
      'ask_ring_bell', ['Ask if you can ring it.', '"Gante" = bell. "Baarisla" = shall I ring?', 'Say: "Naanoo gante baarisla?"'],
      ['ಹೌದು, ಬಾರಿಸಿ. ಮೆಲ್ಲಗೆ, ಎರಡು ಸಲ.', 'Haudu, baarisi. Mellage, eradu sala.', 'Yes, ring it. Softly, twice.'],
      ['ಗಂಟೆ ಬಾರಿಸ್ಬೇಕಾ ಅಂತ ಕೇಳ್ತೀರಾ?', 'Gante baarisbeka anta kelteera?', 'Are you asking if you may ring the bell?']),
  ],
  outro: ['ದೇವರ ದಯೆ ಇರಲಿ ನಿಮ್ಮ ಮೇಲೆ.', 'Devara daye irali nimma mele.', 'May God\'s grace be upon you.'],
  learned: [['gante baarisla?', 'may I ring the bell?']],
  again: ['ಗಂಟೆ ಸದ್ದು ಕೇಳಿದ್ರಾ? ಮನಸ್ಸಿಗೆ ಶಾಂತಿ.', 'Gante saddu kelidra? Manassige shaanti.', 'Did you hear the bell? Peace for the mind.'],
});

export const offeringWoman = D('temple-offering-pilgrim', {
  name: 'Janaki', role: 'devotee at the offering stall', site: 'Temple, coconut-and-flower stall', diff: 2,
  voice: { rate: 0.9, pitch: 1.1 },
  persona: 'Woman with joined hands before offering a coconut, helpful to a first-timer.',
  goal: 'Ask where to get the coconut broken and say you will go there.',
  steps: [
    S('where', ['ಹೊಸಬರಾ? ಮೊದಲು ತೆಂಗಿನ ಕಾಯಿ ಒಡೆಸಬೇಕು.', 'Hosabaraa? Modalu tengina kaayi odesabeku.', 'New here? First the coconut must be broken.'],
      'Ask where to get the coconut broken.', ['Tengina kaayi elli odesodu?', 'ತೆಂಗಿನ ಕಾಯಿ ಎಲ್ಲಿ ಒಡೆಸೋದು?'],
      ['tengina kaayi elli odesodu', 'kaayi elli odesodu', 'tengina kaayi elli odesbeku', 'elli odesodu amma', 'ತೆಂಗಿನ ಕಾಯಿ ಎಲ್ಲಿ ಒಡೆಸೋದು', 'ಕಾಯಿ ಎಲ್ಲಿ ಒಡೆಸೋದು', 'coconut elli odesodu'],
      'ask_where_break_coconut', ['Ask where to have it broken.', '"Odesodu" = to get it broken.', 'Say: "Tengina kaayi elli odesodu?"'],
      ['ಅಲ್ಲಿ ಪೂಜಾರಿ ಹತ್ರ ಕೊಡಿ, ಭಯ ಬೇಡ.', 'Alli poojaari hatra kodi, bhaya beda.', 'Give it to the priest there, do not worry.'],
      ['ಕಾಯಿ ಬಗ್ಗೆ ಕೇಳ್ತೀರಾ? ಇನ್ನೊಮ್ಮೆ ಕೇಳಿ.', 'Kaayi bagge kelteera? Innomme keli.', 'Asking about the coconut? Ask again.']),
    S('go', ['ಒಡೆಸಿದ ಮೇಲೆ ಅರ್ಧ ಕಾಯಿ ಪ್ರಸಾದ.', 'Odesida mele ardha kaayi prasada.', 'After breaking, half the coconut is prasada.'],
      'Say you will go there.', ['Sari amma, alli hogteeni.', 'ಸರಿ ಅಮ್ಮ, ಅಲ್ಲಿ ಹೋಗ್ತೀನಿ.'],
      ['sari amma alli hogteeni', 'alli hogteeni amma', 'sari naanu alli hogteeni', 'sari amma hogteeni', 'ಸರಿ ಅಮ್ಮ ಅಲ್ಲಿ ಹೋಗ್ತೀನಿ', 'ಅಲ್ಲಿ ಹೋಗ್ತೀನಿ ಅಮ್ಮ', 'sari amma alli hogtini'],
      'say_will_go_to_priest', ['Say you will go there.', '"Alli" = there.', 'Say: "Sari amma, alli hogteeni."'],
      ['ಒಳ್ಳೇದು, ದೇವರು ಒಳ್ಳೇದು ಮಾಡ್ಲಿ.', 'Olledu, devaru olledu maadli.', 'Good, may God do good.'],
      ['ಹೋಗ್ತೀರಾ ಇಲ್ವಾ ಅಂತ ಹೇಳಿ.', 'Hogteera ilva anta heli.', 'Tell me whether you will go.']),
  ],
  outro: ['ಭಕ್ತಿಯಿಂದ ಮಾಡಿ, ಎಲ್ಲಾ ಒಳ್ಳೇದಾಗುತ್ತೆ.', 'Bhaktiyinda maadi, ella olledaagutte.', 'Do it with devotion and all will be well.'],
  learned: [['tengina kaayi elli odesodu?', 'where do I get the coconut broken?']],
  again: ['ಕಾಯಿ ಒಡೆಸಿದ್ರಾ ಸಾರ್?', 'Kaayi odesidra saar?', 'Did you get the coconut broken, sir?'],
});

export const templeFlowers = D('temple-flower-seller', {
  name: 'Bhagya', role: 'flower and coconut seller', site: 'Temple, coconut-and-flower offering stall', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Woman with a basket of mallige calling to devotees, who adds extras for a newcomer.',
  goal: 'Buy one molam of mallige and a packet of incense.',
  steps: [
    S('mallige', ['ಮಲ್ಲಿಗೆ ಹೂವು ಬೇಕಾ? ದೇವರಿಗೆ ತುಂಬಾ ಇಷ್ಟ.', 'Mallige hoovu beka? Devarige tumba ishta.', 'Want mallige? God loves it.'],
      'Buy one molam of mallige.', ['Ondu mola mallige kodi.', 'ಒಂದು ಮೊಳ ಮಲ್ಲಿಗೆ ಕೊಡಿ.'],
      ['ondu mola mallige kodi', 'mallige ondu mola kodi', 'ondu mola mallige beku', 'amma ondu mola mallige', 'ಒಂದು ಮೊಳ ಮಲ್ಲಿಗೆ ಕೊಡಿ', 'ಮಲ್ಲಿಗೆ ಒಂದು ಮೊಳ ಕೊಡಿ', 'one mola mallige kodi'],
      'buy_one_mola_mallige', ['Ask for one molam of mallige.', '"Mola" = a length of flowers.', 'Say: "Ondu mola mallige kodi."'],
      ['ತಗೊಳ್ಳಿ, ಇಪ್ಪತ್ತು ರೂಪಾಯಿ. ಒಳ್ಳೆ ವಾಸನೆ!', 'Tagolli, ippattu rupayi. Olle vaasane!', 'Here, twenty rupees. Lovely smell!'],
      ['ಎಷ್ಟು ಮೊಳ ಬೇಕು ಸಾರ್?', 'Eshtu mola beku saar?', 'How many molam do you want, sir?']),
    S('incense', ['ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ? ಕರ್ಪೂರ, ಊದಿನಕಡ್ಡಿ?', 'Bere enaadru beka? Karpoora, oodinakaddi?', 'Anything else? Camphor, incense?'],
      'Ask for a packet of incense sticks.', ['Oodinakaddi ondu packet kodi.', 'ಊದಿನಕಡ್ಡಿ ಒಂದು ಪ್ಯಾಕೆಟ್ ಕೊಡಿ.'],
      ['oodinakaddi ondu packet kodi', 'oodinakaddi kodi', 'ondu packet oodinakaddi', 'agarbatti kodi amma', 'ಊದಿನಕಡ್ಡಿ ಒಂದು ಪ್ಯಾಕೆಟ್ ಕೊಡಿ', 'ಊದಿನಕಡ್ಡಿ ಕೊಡಿ', 'oodinakaddi packet beku'],
      'buy_incense', ['Ask for incense sticks.', '"Oodinakaddi" = incense sticks.', 'Say: "Oodinakaddi ondu packet kodi."'],
      ['ತಗೊಳ್ಳಿ ಸಾರ್. ಹತ್ತು ರೂಪಾಯಿ ಮಾತ್ರ.', 'Tagolli saar. Hattu rupayi maatra.', 'Here sir. Just ten rupees.'],
      ['ಊದಿನಕಡ್ಡಿ ಬೇಕಾ ಬೇಡವಾ?', 'Oodinakaddi beka bedava?', 'Incense or no incense?']),
  ],
  outro: ['ಪೂಜೆ ಚೆನ್ನಾಗಿ ಆಗ್ಲಿ ಸಾರ್.', 'Pooje chennagi aagli saar.', 'May your puja go well, sir.'],
  learned: [['ondu mola mallige kodi', 'give me one molam of mallige'], ['oodinakaddi kodi', 'give me incense sticks']],
  again: ['ಸಾರ್, ಮಲ್ಲಿಗೆ ಬಾಡೋ ಮುಂಚೆ ಹಾಕಿ!', 'Saar, mallige baado munche haaki!', 'Sir, offer the mallige before it wilts!'],
});

export const shoeKeeper = D('temple-shoe-keeper', {
  name: 'Ramu Thatha', role: 'chappal-stand keeper', site: 'Temple, by the row of chappals', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Thin bald old man guarding the visitors\' chappals and giving out tokens.',
  goal: 'Leave your chappals for a token and collect them later.',
  steps: [
    S('leave', ['ಚಪ್ಪಲಿ ಇಲ್ಲಿ ಬಿಡಿ ಸಾರ್, ಟೋಕನ್ ತಗೊಳ್ಳಿ.', 'Chappali illi bidi saar, token tagolli.', 'Leave your chappals here, sir, take a token.'],
      'Say you will leave them and ask for the token.', ['Illi bidteeni, token kodi.', 'ಇಲ್ಲಿ ಬಿಡ್ತೀನಿ, ಟೋಕನ್ ಕೊಡಿ.'],
      ['illi bidteeni token kodi', 'illi bidteeni', 'token kodi thatha', 'chappali illi bidteeni', 'ಇಲ್ಲಿ ಬಿಡ್ತೀನಿ ಟೋಕನ್ ಕೊಡಿ', 'ಟೋಕನ್ ಕೊಡಿ ತಾತ', 'illi bidteeni, token kodi thatha'],
      'leave_chappals_get_token', ['Say you will leave them and ask for a token.', '"Bidteeni" = I will leave.', 'Say: "Illi bidteeni, token kodi."'],
      ['ತಗೊಳ್ಳಿ ಟೋಕನ್, ಕಳೀಬೇಡಿ.', 'Tagolli token, kaleebedi.', 'Here is the token, do not lose it.'],
      ['ಟೋಕನ್ ಬೇಕಾ ಸಾರ್? ಹೇಳಿ.', 'Token beka saar? Heli.', 'Do you want a token, sir? Tell me.']),
    S('collect', ['ದರ್ಶನ ಆಯ್ತಾ ಸಾರ್? ಟೋಕನ್ ತೋರಿಸಿ.', 'Darshana aytha saar? Token torisi.', 'Done with darshan, sir? Show your token.'],
      'Give the token and ask for your chappals.', ['Idi token, nanna chappali kodi.', 'ಇದೋ ಟೋಕನ್, ನನ್ನ ಚಪ್ಪಲಿ ಕೊಡಿ.'],
      ['idi token nanna chappali kodi', 'ido token nanna chappali kodi', 'nanna chappali kodi thatha', 'token ide chappali kodi', 'ಇದೋ ಟೋಕನ್ ನನ್ನ ಚಪ್ಪಲಿ ಕೊಡಿ', 'ನನ್ನ ಚಪ್ಪಲಿ ಕೊಡಿ', 'token tagolli chappali kodi'],
      'collect_chappals', ['Give the token, ask for your chappals.', '"Nanna chappali" = my chappals.', 'Say: "Idi token, nanna chappali kodi."'],
      ['ಇಕೋ ಸಾರ್, ನಿಮ್ಮ ಬಿಳಿ ಶೂ. ಹೋಗಿ ಬನ್ನಿ.', 'Iko saar, nimma bili shoe. Hogi banni.', 'Here sir, your white shoes. Go and come again.'],
      ['ಟೋಕನ್ ಕೊಡಿ ಸಾರ್, ಚಪ್ಪಲಿ ಕೊಡ್ತೀನಿ.', 'Token kodi saar, chappali kodteeni.', 'Give the token, sir, I will give your chappals.']),
  ],
  outro: ['ಮತ್ತೆ ಬನ್ನಿ ಸಾರ್. ಚಪ್ಪಲಿ ನಾನು ನೋಡ್ಕೊಳ್ತೀನಿ.', 'Matte banni saar. Chappali naanu nodkolteeni.', 'Come again, sir. I will look after your chappals.'],
  learned: [['illi bidteeni, token kodi', 'I will leave them here, give me a token'], ['nanna chappali kodi', 'give me my chappals']],
  again: ['ಸಾರ್, ಟೋಕನ್ ಇದ್ಯಾ?', 'Saar, token idya?', 'Sir, do you have the token?'],
});
