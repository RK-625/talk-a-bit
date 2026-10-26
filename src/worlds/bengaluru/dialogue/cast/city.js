// KSR Bengaluru (Majestic) station forecourt, UB City, and the Attara Kacheri / Lalbagh Glass House side.
import { dialogue as D, step as S } from '../kit.js';

export const sorter1 = D('cst-tiffin-sorter', {
  name: 'Faisal', role: 'food-delivery rider sorting parcels', site: 'KSR Bengaluru station, delivery scooters', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Rider in an orange cap matching parcels to orders among the scooters, stuck on a smudged address.',
  goal: 'Offer to read the address on a parcel.',
  steps: [
    S('parcel', ['ಈ ಪಾರ್ಸೆಲ್ ಯಾರದು ಅಂತ ಗೊತ್ತಾಗ್ತಿಲ್ಲ, ಸಹಾಯ ಮಾಡ್ತೀರಾ?', 'Ee parcel yaaradu anta gottaagtilla, sahaaya maadteera?', 'I cannot tell whose parcel this is, will you help?'],
      'Offer to read the address.', ['Sari, address nodi helteeni.', 'ಸರಿ, ಅಡ್ರೆಸ್ ನೋಡಿ ಹೇಳ್ತೀನಿ.'],
      ['sari address nodi helteeni', 'address nodi helteeni', 'naanu address odteeni', 'sari anna address nodteeni', 'ಸರಿ ಅಡ್ರೆಸ್ ನೋಡಿ ಹೇಳ್ತೀನಿ', 'ಅಡ್ರೆಸ್ ನೋಡಿ ಹೇಳ್ತೀನಿ', 'sari address odi helteeni'],
      'offer_to_read_address', ['Offer to help read it.', '"Nodi helteeni" = I will look and tell.', 'Say: "Sari, address nodi helteeni."'],
      ['ಹೌದು ಸಾರ್, ಇದು ಸರಿ ಅಡ್ರೆಸ್. ಥ್ಯಾಂಕ್ಸ್!', 'Haudu saar, idu sari address. Thanks!', 'Yes sir, this is the right address. Thanks!'],
      ['ಸಹಾಯ ಮಾಡ್ತೀರಾ ಇಲ್ವಾ ಸಾರ್?', 'Sahaaya maadteera ilva saar?', 'Will you help or not, sir?']),
  ],
  outro: ['ಈಗ ಡೆಲಿವರಿ ಹೊರಟೆ ಸಾರ್. ಬೈ!', 'Iga delivery horate saar. Bye!', 'Off for the delivery now, sir. Bye!'],
  learned: [['address nodi helteeni', 'I will check the address']],
  again: ['ಸಾರ್, ಇನ್ನೊಂದು ಪಾರ್ಸೆಲ್ ಸಿಕ್ಕಿಹಾಕ್ಕೊಂಡಿದೆ!', 'Saar, innondu parcel sikkihaakkondide!', 'Sir, another parcel is stuck!'],
});

export const sorter2 = D('cst-tiffin-sorter-2', {
  name: 'Lokesh', role: 'food-delivery rider sorting parcels', site: 'KSR Bengaluru station, delivery scooters', diff: 1,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Rider grumbling about customers who write unclear addresses.',
  goal: 'Sympathise that addresses are hard.',
  steps: [
    S('grumble', ['ಈ ಕಸ್ಟಮರ್ಸ್ ಅಡ್ರೆಸ್ ಸರಿಯಾಗಿ ಬರೆಯಲ್ಲ!', 'Ee customers address sariyaagi bareyalla!', 'These customers never write the address properly!'],
      'Sympathise that it is hard.', ['Haudu, tumba kashta ide.', 'ಹೌದು, ತುಂಬಾ ಕಷ್ಟ ಇದೆ.'],
      ['haudu tumba kashta ide', 'tumba kashta ide', 'haudu anna kashta ide', 'tumba kashta anna', 'ಹೌದು ತುಂಬಾ ಕಷ್ಟ ಇದೆ', 'ತುಂಬಾ ಕಷ್ಟ ಇದೆ', 'haudu kashta ide anna'],
      'sympathise_addresses_hard', ['Sympathise with him.', '"Kashta" = difficult.', 'Say: "Haudu, tumba kashta ide."'],
      ['ಅಲ್ವಾ ಸಾರ್! ನಿಮಗೂ ಅರ್ಥ ಆಯ್ತು.', 'Alva saar! Nimagoo artha aytu.', 'Right, sir! You understand too.'],
      ['ಹೌದಾ ಅಲ್ವಾ ಹೇಳಿ ಸಾರ್.', 'Haudaa alva heli saar.', 'Tell me yes or no, sir.']),
  ],
  outro: ['ಬೆಂಗಳೂರಲ್ಲಿ ಡೆಲಿವರಿ ಅಂದ್ರೆ ಅಷ್ಟೇ!', 'Bengaluralli delivery andre ashte!', 'That is what delivery in Bengaluru is!'],
  learned: [['tumba kashta ide', 'it is very hard']],
  again: ['ಸಾರ್, ಈ ಅಡ್ರೆಸ್ ನೋಡಿ ಪ್ಲೀಸ್.', 'Saar, ee address nodi please.', 'Sir, please look at this address.'],
});

export const officegoer1 = D('cst-officegoer', {
  name: 'Arvind', role: 'techie hurrying to work', site: 'KSR Bengaluru station forecourt', diff: 2,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Techie with a lunch bag and an ID on a lanyard, hurrying to catch the bus to the tech park.',
  goal: 'Point him to the bus stop and say you work at the tech park too.',
  steps: [
    S('bus', ['ಟೆಕ್ ಪಾರ್ಕ್ ಬಸ್ ಯಾವ ಕಡೆ ನಿಲ್ಲುತ್ತೆ ಸಾರ್?', 'Tech park bus yaava kade nilluttade saar?', 'Where does the tech park bus stop, sir?'],
      'Point to the bus stop over there.', ['Aa kade bus stop ide.', 'ಆ ಕಡೆ ಬಸ್ ಸ್ಟಾಪ್ ಇದೆ.'],
      ['aa kade bus stop ide', 'aa kade bus stop ide sir', 'bus stop aa kade ide', 'aa kade hogi bus stop ide', 'ಆ ಕಡೆ ಬಸ್ ಸ್ಟಾಪ್ ಇದೆ', 'ಬಸ್ ಸ್ಟಾಪ್ ಆ ಕಡೆ ಇದೆ', 'aa kade bus nilluttade'],
      'point_to_bus_stop', ['Point him to the stop.', '"Aa kade" = that way.', 'Say: "Aa kade bus stop ide."'],
      ['ಓಹೋ, ಥ್ಯಾಂಕ್ಸ್! ಬಸ್ ಮಿಸ್ ಮಾಡ್ಕೊಂಡಿದ್ರೆ ಕಷ್ಟ ಆಗಿತ್ತು.', 'Oho, thanks! Bus miss maadkondidre kashta aagittu.', 'Oh thanks! Missing the bus would have been trouble.'],
      ['ಬಸ್ ಸ್ಟಾಪ್ ಗೊತ್ತಾ ಅಂತ ಕೇಳ್ದೆ.', 'Bus stop gottaa anta kelde.', 'I asked if you know the bus stop.']),
    S('same', ['ನೀವೂ ಟೆಕ್ ಪಾರ್ಕ್‌ಗಾ?', 'Neevoo tech park gaa?', 'Are you going to the tech park too?'],
      'Say you work there as an intern.', ['Haudu, naanu alli intern aagi kelasa maadteeni.', 'ಹೌದು, ನಾನು ಅಲ್ಲಿ ಇಂಟರ್ನ್ ಆಗಿ ಕೆಲಸ ಮಾಡ್ತೀನಿ.'],
      ['haudu naanu alli intern aagi kelasa maadteeni', 'alli intern aagi kelasa maadteeni', 'haudu naanu intern alli', 'haudu naanoo alli kelasa maadteeni', 'ಹೌದು ನಾನು ಅಲ್ಲಿ ಇಂಟರ್ನ್ ಆಗಿ ಕೆಲಸ ಮಾಡ್ತೀನಿ', 'ಅಲ್ಲಿ ಇಂಟರ್ನ್ ಆಗಿ ಕೆಲಸ ಮಾಡ್ತೀನಿ', 'haudu intern aagi alli kelasa'],
      'say_work_at_tech_park', ['Say you work there.', '"Kelasa maadteeni" = I work.', 'Say: "Haudu, naanu alli intern aagi kelasa maadteeni."'],
      ['ಹೌದಾ! ಹಾಗಾದ್ರೆ ಒಟ್ಟಿಗೇ ಹೋಗೋಣ ಬನ್ನಿ.', 'Haudaa! Haagaadre ottige hogona banni.', 'Really! Then let us go together.'],
      ['ನೀವೂ ಅಲ್ಲಿಗಾ ಅಂತ ಕೇಳ್ದೆ.', 'Neevoo alligaa anta kelde.', 'I asked if you are going there too.']),
  ],
  outro: ['ಬಸ್ ಬಂತು, ಓಡಿ ಓಡಿ!', 'Bus bantu, odi odi!', 'The bus is here, run run!'],
  learned: [['aa kade bus stop ide', 'the bus stop is that way'], ['naanu alli kelasa maadteeni', 'I work there']],
  again: ['ಸಾರ್, ಈ ಬಸ್ ಯಾವುದು ಅಂತ ಗೊತ್ತಾ?', 'Saar, ee bus yaavudu anta gottaa?', 'Sir, do you know which bus this is?'],
});

export const officegoer2 = D('cst-officegoer-2', {
  name: 'Sathish', role: 'techie hurrying to work', site: 'KSR Bengaluru station forecourt, front lane', diff: 1,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Techie in specs with a lunch bag, looking at his watch or phone because his watch has stopped.',
  goal: 'Tell him the time is half past nine.',
  steps: [
    S('time', ['ಸಾರ್, ಟೈಮ್ ಎಷ್ಟಾಯ್ತು? ನನ್ನ ವಾಚ್ ನಿಂತು ಹೋಗಿದೆ.', 'Saar, time eshtaytu? Nanna watch nintu hogide.', 'Sir, what time is it? My watch has stopped.'],
      'Tell him it is half past nine.', ['Iga ombattu vare aytu.', 'ಈಗ ಒಂಬತ್ತೂವರೆ ಆಯ್ತು.'],
      ['iga ombattu vare aytu', 'ombattu vare aytu', 'iga ombattu vare', 'ombattu vare saar', 'ಈಗ ಒಂಬತ್ತೂವರೆ ಆಯ್ತು', 'ಒಂಬತ್ತೂವರೆ ಆಯ್ತು', 'iga nine thirty aytu'],
      'tell_time_half_past_nine', ['Tell him the time.', '"Ombattu vare" = half past nine.', 'Say: "Iga ombattu vare aytu."'],
      ['ಅಯ್ಯೋ ಲೇಟ್! ಥ್ಯಾಂಕ್ಸ್, ಓಡ್ತೀನಿ!', 'Ayyo late! Thanks, odteeni!', 'Oh no, late! Thanks, I am running!'],
      ['ಟೈಮ್ ಎಷ್ಟು ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Time eshtu anta heli saar.', 'Tell me what time it is, sir.']),
  ],
  outro: ['ಹೊಸ ವಾಚ್ ತಗೊಳ್ಳಬೇಕು ಈ ಸಂಡೇ!', 'Hosa watch tagollabeku ee Sunday!', 'I must buy a new watch this Sunday!'],
  learned: [['iga ombattu vare aytu', 'it is half past nine now']],
  again: ['ಸಾರ್, ವಾಚ್ ಇನ್ನೂ ನಿಂತಿದೆ!', 'Saar, watch innu nintide!', 'Sir, my watch is still stopped!'],
});

export const coolie2 = D('cst-coolie-2', {
  name: 'Mariyappa', role: 'KSR porter', site: 'KSR Bengaluru station forecourt, east end', diff: 2,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Porter in a red shirt with a brass armband and luggage on his shoulder, waiting for a passenger.',
  goal: 'Say you have one big bag and need it taken to platform three.',
  steps: [
    S('bag', ['ಸಾಮಾನು ಇದ್ರೆ ಹೇಳಿ ಸಾರ್, ಹೊರ್ತೀನಿ.', 'Saamaanu idre heli saar, horteeni.', 'If you have luggage tell me, sir, I will carry it.'],
      'Say you have one big bag.', ['Nange ondu dodda bag ide.', 'ನನಗೆ ಒಂದು ದೊಡ್ಡ ಬ್ಯಾಗ್ ಇದೆ.'],
      ['nange ondu dodda bag ide', 'ondu dodda bag ide', 'nange dodda bag ide anna', 'ondu dodda bag ide saar', 'ನನಗೆ ಒಂದು ದೊಡ್ಡ ಬ್ಯಾಗ್ ಇದೆ', 'ಒಂದು ದೊಡ್ಡ ಬ್ಯಾಗ್ ಇದೆ', 'nange dodda bag ide'],
      'say_one_big_bag', ['Say what luggage you have.', '"Dodda" = big.', 'Say: "Nange ondu dodda bag ide."'],
      ['ಸರಿ ಸಾರ್, ಕೊಡಿ, ಹೆಗಲ ಮೇಲೆ ಇಡ್ತೀನಿ.', 'Sari saar, kodi, hegala mele idteeni.', 'Okay sir, give it, I will put it on my shoulder.'],
      ['ಎಷ್ಟು ಬ್ಯಾಗ್ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Eshtu bag anta heli saar.', 'Tell me how many bags, sir.']),
    S('platform', ['ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು ಸಾರ್?', 'Ellige hogbeku saar?', 'Where do you have to go, sir?'],
      'Say platform three.', ['Platform moorakke hogbeku.', 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಮೂರಕ್ಕೆ ಹೋಗಬೇಕು.'],
      ['platform moorakke hogbeku', 'platform mooru ge hogbeku', 'moorane platform ge hogbeku', 'platform 3 ge hogbeku', 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಮೂರಕ್ಕೆ ಹೋಗಬೇಕು', 'ಮೂರನೇ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗೆ ಹೋಗಬೇಕು', 'platform mooru ge hogbeku anna'],
      'say_platform_three', ['Say your platform.', 'Three = "mooru".', 'Say: "Platform moorakke hogbeku."'],
      ['ಬನ್ನಿ ಸಾರ್, ಮೆಟ್ಟಿಲು ಹತ್ತಿ ಹೋಗೋಣ.', 'Banni saar, mettilu hatti hogona.', 'Come sir, let us go up the stairs.'],
      ['ಯಾವ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Yaava platform anta heli saar.', 'Tell me which platform, sir.']),
  ],
  outro: ['ಸುಖ ಪ್ರಯಾಣ ಸಾರ್! ಮತ್ತೆ ಸಿಗೋಣ.', 'Sukha prayana saar! Matte sigona.', 'Happy journey, sir! See you again.'],
  learned: [['nange ondu dodda bag ide', 'I have one big bag'], ['platform moorakke hogbeku', 'I have to go to platform three']],
  again: ['ಸಾರ್, ಈ ಸಲ ಎರಡು ಬ್ಯಾಗಾ?', 'Saar, ee sala eradu bagaa?', 'Sir, two bags this time?'],
});

export const bullTourist = D('bse-bull-tourist', {
  name: 'Ben', role: 'foreign tourist taking a selfie', site: 'UB City, Nandi bull statue', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Thin tourist in a sky-blue floral shirt and yellow cap taking a selfie with the black granite Nandi. Speaks only English.',
  goal: 'Explain what the Nandi bull is.',
  steps: [
    S('bull', 'Hi! Sorry, what does this black bull statue mean? Everyone touches it.',
      'Tell him it is Nandi, the sacred bull of Lord Shiva.', ['It is Nandi, the sacred bull of Lord Shiva.', 'It is Nandi, the sacred bull of Lord Shiva.'],
      ['it is nandi the sacred bull of lord shiva', 'that is nandi, shiva\'s sacred bull', 'nandi is the holy bull of lord shiva', 'it is nandi, the bull god shiva rides', 'this is nandi, the sacred bull', 'nandi the bull, the vehicle of shiva'],
      'explain_nandi_bull', ['Name the statue.', 'It is called Nandi.', 'Say: "It is Nandi, the sacred bull of Lord Shiva."'],
      'Ah, Nandi! That makes sense, thank you. One more selfie!', 'Sorry, what did you say the bull is?'),
  ],
  outro: 'Thanks, now I can tell my friends the story. Have a great day!',
  learned: [['Nandi, the sacred bull', 'explaining a landmark in English']],
  again: 'Hi again! I touched the bull for luck.',
});

export const ubGuard = D('bse-guard', {
  name: 'Mallappa', role: 'UB City security guard', site: 'UB City gate', diff: 2,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Thin guard in a charcoal uniform with a visitor register, checking every visitor politely.',
  goal: 'Say you are meeting a friend and let him check your bag.',
  steps: [
    S('whom', ['ನಮಸ್ಕಾರ ಸರ್, ಯಾರನ್ನ ಭೇಟಿ ಮಾಡಬೇಕು?', 'Namaskara sir, yaaranna bheti maadabeku?', 'Namaskara sir, whom do you want to meet?'],
      'Say you are meeting a friend.', ['Naanu snehitananna bheti maadabeku.', 'ನಾನು ಸ್ನೇಹಿತನನ್ನ ಭೇಟಿ ಮಾಡಬೇಕು.'],
      ['naanu snehitananna bheti maadabeku', 'snehitananna bheti maadabeku', 'naanu friend na bheti maadabeku', 'friend na meet maadabeku', 'ನಾನು ಸ್ನೇಹಿತನನ್ನ ಭೇಟಿ ಮಾಡಬೇಕು', 'ಸ್ನೇಹಿತನನ್ನ ಭೇಟಿ ಮಾಡಬೇಕು', 'naanu snehita na meet maadabeku'],
      'say_meeting_friend', ['Say you are meeting a friend.', '"Snehita" = friend.', 'Say: "Naanu snehitananna bheti maadabeku."'],
      ['ಸರಿ ಸರ್, ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿ ಹೆಸರು ಬರೀರಿ.', 'Sari sir, register-alli hesaru bareeri.', 'Okay sir, write your name in the register.'],
      ['ಯಾರನ್ನ ಅಂತ ಹೇಳಿ ಸರ್.', 'Yaaranna anta heli sir.', 'Tell me whom, sir.']),
    S('bag', ['ಬ್ಯಾಗ್ ಚೆಕ್ ಮಾಡಬೇಕು, ತೋರಿಸಿ ದಯವಿಟ್ಟು.', 'Bag check maadabeku, torisi dayavittu.', 'I must check your bag, please show it.'],
      'Hand over your bag for the check.', ['Tagolli, nanna bag nodi.', 'ತಗೊಳ್ಳಿ, ನನ್ನ ಬ್ಯಾಗ್ ನೋಡಿ.'],
      ['tagolli nanna bag nodi', 'nanna bag nodi sir', 'idi bag nodi', 'sari bag nodi sir', 'ತಗೊಳ್ಳಿ ನನ್ನ ಬ್ಯಾಗ್ ನೋಡಿ', 'ನನ್ನ ಬ್ಯಾಗ್ ನೋಡಿ ಸರ್', 'tagolli bag nodi'],
      'show_bag_for_check', ['Hand over the bag.', '"Nodi" = look.', 'Say: "Tagolli, nanna bag nodi."'],
      ['ಧನ್ಯವಾದ ಸರ್, ಒಳಗೆ ಹೋಗಿ.', 'Dhanyavaada sir, olage hogi.', 'Thank you sir, please go in.'],
      ['ಬ್ಯಾಗ್ ತೋರಿಸಿ ಸರ್, ರೂಲ್ಸ್.', 'Bag torisi sir, rules.', 'Please show the bag, sir, it is the rule.']),
  ],
  outro: ['ಒಳ್ಳೆ ದಿನ ಸರ್, ಹೋಗಿ ಬನ್ನಿ.', 'Olle dina sir, hogi banni.', 'Have a good day, sir, go and come again.'],
  learned: [['naanu snehitananna bheti maadabeku', 'I want to meet a friend']],
  again: ['ಸರ್, ಮತ್ತೆ ಬಂದ್ರಾ? ರಿಜಿಸ್ಟರ್ ಇಲ್ಲಿದೆ.', 'Sir, matte bandra? Register illide.', 'Sir, back again? The register is here.'],
});

export const broker = D('bse-broker', {
  name: 'Aditya', role: 'startup guy on a call', site: 'UB City, near the "Now hiring / Walk-in" board', diff: 2,
  voice: { rate: 1.2, pitch: 0.95 },
  persona: 'Man in specs and a purple lanyard pacing on the phone about an interview slot and a deadline.',
  goal: 'Point him to the walk-in board.',
  steps: [
    S('board', ['ಇಂಟರ್ವ್ಯೂ ಸ್ಲಾಟ್ ಇನ್ನೂ ಸಿಕ್ಕಿಲ್ಲ! ವಾಕ್-ಇನ್ ಬೋರ್ಡ್ ಎಲ್ಲಿ?', 'Interview slot innu sikkilla! Walk-in board elli?', 'I still have no interview slot! Where is the walk-in board?'],
      'Point him to the board right there.', ['Walk-in board alle ide, nodi.', 'ವಾಕ್-ಇನ್ ಬೋರ್ಡ್ ಅಲ್ಲೇ ಇದೆ, ನೋಡಿ.'],
      ['walk-in board alle ide nodi', 'walk in board alle ide', 'board alle ide nodi sir', 'alle ide walk-in board', 'ವಾಕ್-ಇನ್ ಬೋರ್ಡ್ ಅಲ್ಲೇ ಇದೆ ನೋಡಿ', 'ಬೋರ್ಡ್ ಅಲ್ಲೇ ಇದೆ ನೋಡಿ', 'walk-in board alle ide'],
      'point_to_walkin_board', ['Point to the board nearby.', '"Alle" = right there.', 'Say: "Walk-in board alle ide, nodi."'],
      ['ಓ ಹೌದು! ಥ್ಯಾಂಕ್ಸ್, ಕಾಲ್‌ಗೆ ವಾಪಸ್ ಹೋಗ್ತೀನಿ.', 'O haudu! Thanks, call ge vaapas hogteeni.', 'Oh yes! Thanks, back to my call.'],
      ['ಬೋರ್ಡ್ ಎಲ್ಲಿ ಅಂತ ಹೇಳಿ ಸಾರ್, ಟೈಮ್ ಇಲ್ಲ.', 'Board elli anta heli saar, time illa.', 'Tell me where the board is, sir, no time.']),
  ],
  outro: ['ಇಂಟರ್ವ್ಯೂ ಸಿಕ್ತು! ನಿಮ್ಮಿಂದ ಆಯ್ತು!', 'Interview sikthu! Nimminda aytu!', 'Got my interview! Thanks to you!'],
  learned: [['walk-in board alle ide', 'the walk-in board is right there']],
  again: ['ಸಾರ್, ಡೆಡ್‌ಲೈನ್ ಇವತ್ತೇ!', 'Saar, deadline ivatte!', 'Sir, the deadline is today!'],
});

export const bookSeller = D('rajabai-book-seller', {
  name: 'Subraya', role: 'second-hand book seller', site: 'Attara Kacheri (old High Court), book stall', diff: 3,
  voice: { rate: 0.95, pitch: 0.9 },
  persona: 'Man in a mustard kurta and specs dusting a book cover, recommending old Kannada novels to newcomers.',
  goal: 'Ask for a simple Kannada book and bargain the price to seventy.',
  steps: [
    S('book', ['ಹಳೆ ಕನ್ನಡ ಕಾದಂಬರಿ ಇದೆ, ನೋಡಿ ಸಾರ್.', 'Hale Kannada kaadambari ide, nodi saar.', 'I have old Kannada novels, have a look, sir.'],
      'Ask for a simple Kannada book.', ['Ondu sarala Kannada pustaka kodi.', 'ಒಂದು ಸರಳ ಕನ್ನಡ ಪುಸ್ತಕ ಕೊಡಿ.'],
      ['ondu sarala kannada pustaka kodi', 'sarala kannada pustaka kodi', 'ondu simple kannada pustaka beku', 'sarala pustaka kodi anna', 'ಒಂದು ಸರಳ ಕನ್ನಡ ಪುಸ್ತಕ ಕೊಡಿ', 'ಸರಳ ಕನ್ನಡ ಪುಸ್ತಕ ಬೇಕು', 'simple Kannada book kodi'],
      'ask_simple_kannada_book', ['Ask for an easy book.', '"Sarala" = simple. "Pustaka" = book.', 'Say: "Ondu sarala Kannada pustaka kodi."'],
      ['ಇದು ಮಕ್ಕಳ ಕತೆ ಪುಸ್ತಕ. ಕನ್ನಡ ಕಲಿಯೋಕೆ ಒಳ್ಳೇದು.', 'Idu makkala kate pustaka. Kannada kaliyoke olledu.', 'This is a children\'s story book. Good for learning Kannada.'],
      ['ಯಾವ ಪುಸ್ತಕ ಬೇಕು ಸಾರ್? ಹೇಳಿ.', 'Yaava pustaka beku saar? Heli.', 'Which book do you want, sir? Tell me.']),
    S('price', ['ನೂರು ರೂಪಾಯಿ ಸಾರ್, ಹಳೆದಾದ್ರೂ ಚೆನ್ನಾಗಿದೆ.', 'Nooru rupayi saar, haledaadroo chennagide.', 'A hundred rupees, sir, old but in good shape.'],
      'Ask if he can do seventy rupees.', ['Eppattu rupayige sigutta?', 'ಎಪ್ಪತ್ತು ರೂಪಾಯಿಗೆ ಸಿಗುತ್ತಾ?'],
      ['eppattu rupayige sigutta', 'eppattakke kodteera', 'eppattu rupayi ge kodi', 'eppattu rupayi aadre kodteera', 'ಎಪ್ಪತ್ತು ರೂಪಾಯಿಗೆ ಸಿಗುತ್ತಾ', 'ಎಪ್ಪತ್ತಕ್ಕೆ ಕೊಡ್ತೀರಾ', 'seventy rupayi ge sigutta'],
      'bargain_book_seventy', ['Politely ask for seventy rupees.', '"Eppattu" = seventy.', 'Say: "Eppattu rupayige sigutta?"'],
      ['ಸರಿ, ವಿದ್ಯಾರ್ಥಿ ಅಂತ ಕೊಡ್ತೀನಿ. ಓದಿ.', 'Sari, vidyaarthi anta kodteeni. Odi.', 'Okay, I will give it as you are a learner. Read it.'],
      ['ಎಷ್ಟಕ್ಕೆ ಬೇಕು ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Eshtakke beku anta heli saar.', 'Tell me at what price you want it, sir.']),
  ],
  outro: ['ಇನ್ನೊಂದು ಪುಸ್ತಕ ಬೇಕಾದ್ರೆ ಮತ್ತೆ ಬನ್ನಿ.', 'Innondu pustaka bekadre matte banni.', 'If you need another book, come again.'],
  learned: [['sarala Kannada pustaka kodi', 'give me a simple Kannada book'], ['eppattu rupayige sigutta?', 'can I get it for seventy rupees?']],
  again: ['ಸಾರ್, ಹೊಸ ಹಳೆ ಪುಸ್ತಕ ಬಂದಿದೆ!', 'Saar, hosa hale pustaka bandide!', 'Sir, a new old book has come!'],
});

export const studentA = D('rajabai-student-a', {
  name: 'Harsha', role: 'university student', site: 'Attara Kacheri / Lalbagh', diff: 2,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Young man in a checked shirt with books under his arm, heading to class and worried about an exam.',
  goal: 'Wish him luck for his exam.',
  steps: [
    S('exam', ['ನಾಳೆ ಎಕ್ಸಾಮ್ ಇದೆ, ತುಂಬಾ ಭಯ ಆಗ್ತಿದೆ!', 'Naale exam ide, tumba bhaya aagtide!', 'I have an exam tomorrow, I am very scared!'],
      'Wish him luck.', ['All the best, nimage chennagi barutte.', 'ಆಲ್ ದ ಬೆಸ್ಟ್, ನಿಮಗೆ ಚೆನ್ನಾಗಿ ಬರುತ್ತೆ.'],
      ['all the best nimage chennagi barutte', 'nimage chennagi barutte', 'all the best harsha', 'bhaya beda chennagi barutte', 'ಆಲ್ ದ ಬೆಸ್ಟ್ ನಿಮಗೆ ಚೆನ್ನಾಗಿ ಬರುತ್ತೆ', 'ನಿಮಗೆ ಚೆನ್ನಾಗಿ ಬರುತ್ತೆ', 'all the best, bhaya beda'],
      'wish_luck_for_exam', ['Wish him luck.', '"Chennagi barutte" = you will do well.', 'Say: "All the best, nimage chennagi barutte."'],
      ['ಥ್ಯಾಂಕ್ಸ್ ಅಣ್ಣ! ಈಗ ಸ್ವಲ್ಪ ಧೈರ್ಯ ಬಂತು.', 'Thanks anna! Iga swalpa dhairya bantu.', 'Thanks brother! I feel a bit braver now.'],
      ['ಎಕ್ಸಾಮ್ ಬಗ್ಗೆ ಏನಾದ್ರೂ ಹೇಳಿ ಅಣ್ಣ.', 'Exam bagge enaadru heli anna.', 'Say something about my exam, brother.']),
  ],
  outro: ['ಪಾಸ್ ಆದ್ರೆ ನಿಮಗೆ ಕಾಫಿ ಕೊಡಿಸ್ತೀನಿ!', 'Pass aadre nimage coffee kodisteeni!', 'If I pass, I will buy you a coffee!'],
  learned: [['nimage chennagi barutte', 'you will do well']],
  again: ['ಅಣ್ಣ, ಇನ್ನೂ ಓದ್ತಾ ಇದ್ದೀನಿ!', 'Anna, innu odta iddini!', 'Brother, still studying!'],
});

export const bookBrowser = D('rajabai-book-browser', {
  name: 'Chandan', role: 'student browsing books', site: 'Attara Kacheri, second-hand book stall', diff: 3,
  voice: { rate: 1.05, pitch: 1.0 },
  persona: 'Round teenager in specs browsing books and chatting about exams and Kannada novels.',
  goal: 'Say you do not know the novel because you are learning Kannada, and where you practise.',
  steps: [
    S('novel', ['ಈ ಕನ್ನಡ ಕಾದಂಬರಿ ಚೆನ್ನಾಗಿದೆಯಾ ಗೊತ್ತಾ?', 'Ee Kannada kaadambari chennagideya gottaa?', 'Do you know if this Kannada novel is good?'],
      'Say you do not know; you are learning Kannada.', ['Nange gottilla, naanu Kannada kaleetiddini.', 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ, ನಾನು ಕನ್ನಡ ಕಲೀತಿದ್ದೀನಿ.'],
      ['nange gottilla naanu kannada kaleetiddini', 'naanu kannada kaleetiddini', 'nange gottilla kannada kaleetiddini', 'naanu kannada kalitiddini', 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ ನಾನು ಕನ್ನಡ ಕಲೀತಿದ್ದೀನಿ', 'ನಾನು ಕನ್ನಡ ಕಲೀತಿದ್ದೀನಿ', 'nange gottilla naanu Kannada kalitiddini'],
      'say_learning_kannada', ['Say you are learning.', '"Kaleetiddini" = I am learning.', 'Say: "Nange gottilla, naanu Kannada kaleetiddini."'],
      ['ಓ ಸೂಪರ್! ಕನ್ನಡ ಕಲಿಯೋದು ತುಂಬಾ ಒಳ್ಳೇದು.', 'O super! Kannada kaliyodu tumba olledu.', 'Oh super! Learning Kannada is very good.'],
      ['ಗೊತ್ತಾ ಇಲ್ವಾ ಹೇಳಿ ಅಣ್ಣ.', 'Gottaa ilva heli anna.', 'Tell me whether you know, brother.']),
    S('where', ['ಯಾರ ಹತ್ರ ಕಲೀತೀರಾ ಕನ್ನಡ?', 'Yaara hatra kaleeteera Kannada?', 'Who do you learn Kannada from?'],
      'Say you learn from everyone, at the darshini.', ['Ellara hattira, darshiniyalli.', 'ಎಲ್ಲರ ಹತ್ತಿರ, ದರ್ಶಿನಿಯಲ್ಲಿ.'],
      ['ellara hattira darshiniyalli', 'ellara hattira', 'darshiniyalli kaleetini', 'ellara jote maataadi kaleetiddini', 'ಎಲ್ಲರ ಹತ್ತಿರ ದರ್ಶಿನಿಯಲ್ಲಿ', 'ಎಲ್ಲರ ಹತ್ತಿರ', 'ellara hatra darshiniyalli'],
      'say_learn_from_everyone', ['Say whom you learn from.', '"Ellara" = everyone\'s.', 'Say: "Ellara hattira, darshiniyalli."'],
      ['ಹಾಗೆಯೇ! ಮಾತಾಡ್ತಾ ಮಾತಾಡ್ತಾ ಕಲೀತೀರಿ.', 'Haageye! Maataadta maataadta kaleeteeri.', 'Exactly! You learn by speaking and speaking.'],
      ['ಯಾರ ಹತ್ತಿರ ಅಂತ ಹೇಳಿ.', 'Yaara hattira anta heli.', 'Tell me from whom.']),
  ],
  outro: ['ನನ್ನ ಜೊತೆ ಪುಸ್ತಕ ಓದೋಣ ಒಂದು ದಿನ!', 'Nanna jote pustaka odona ondu dina!', 'Let us read a book together some day!'],
  learned: [['naanu Kannada kaleetiddini', 'I am learning Kannada'], ['ellara hattira', 'from everyone']],
  again: ['ಅಣ್ಣ, ಈ ಪುಸ್ತಕ ನೋಡಿ ಚೆನ್ನಾಗಿದೆ!', 'Anna, ee pustaka nodi chennagide!', 'Brother, see this book, it is good!'],
});

export const ledgeReader = D('flora-ledge-reader', {
  name: 'Spoorthi', role: 'college girl on the ledge', site: 'Lalbagh Glass House, ledge', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'College girl in specs reading on the ledge, enjoying the garden and the flower show.',
  goal: 'Say you will see the flower show and ask where tickets are.',
  steps: [
    S('show', ['ಲಾಲ್‌ಬಾಗ್ ಫ್ಲವರ್ ಶೋ ಇವತ್ತು ಶುರು!', 'Lalbagh flower show ivattu shuru!', 'The Lalbagh flower show starts today!'],
      'Say you will see it too.', ['Wow, naanoo nodteeni.', 'ವಾವ್, ನಾನೂ ನೋಡ್ತೀನಿ.'],
      ['wow naanoo nodteeni', 'naanoo nodteeni', 'naanu kooda nodteeni', 'wow naanu nodteeni', 'ವಾವ್ ನಾನೂ ನೋಡ್ತೀನಿ', 'ನಾನೂ ನೋಡ್ತೀನಿ', 'wow naanoo nodtini'],
      'say_will_see_flower_show', ['Say you will go too.', '"Naanoo" = me too.', 'Say: "Wow, naanoo nodteeni."'],
      ['ಹೌದಾ! ಗ್ಲಾಸ್ ಹೌಸ್ ಒಳಗೆ ಹೂವಿನ ಆನೆ ಇದೆ, ಮಿಸ್ ಮಾಡ್ಬೇಡಿ.', 'Haudaa! Glass house olage hoovina aane ide, miss maadbedi.', 'Oh! There is a flower elephant inside the glass house, do not miss it.'],
      ['ಫ್ಲವರ್ ಶೋ ಬಗ್ಗೆ ಏನಂತೀರಿ?', 'Flower show bagge enanteeri?', 'What do you say about the flower show?']),
    S('ticket', ['ಒಳಗೆ ಹೋಗೋಕೆ ಟಿಕೆಟ್ ಬೇಕು.', 'Olage hogoke ticket beku.', 'You need a ticket to go inside.'],
      'Ask where tickets are available.', ['Ticket elli sigutte?', 'ಟಿಕೆಟ್ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ?'],
      ['ticket elli sigutte', 'ticket elli kodtaare', 'ticket counter elli', 'tikat elli sigutte', 'ಟಿಕೆಟ್ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ', 'ಟಿಕೆಟ್ ಎಲ್ಲಿ ಕೊಡ್ತಾರೆ', 'ticket elli sigutte madam'],
      'ask_flower_show_ticket', ['Ask where to buy a ticket.', '"Elli sigutte" = where is it available.', 'Say: "Ticket elli sigutte?"'],
      ['ಗೇಟ್ ಹತ್ರ ಕೌಂಟರ್ ಇದೆ, ಕ್ಯೂ ಕಡಿಮೆ ಇದೆ.', 'Gate hatra counter ide, queue kadime ide.', 'There is a counter at the gate, the queue is short.'],
      ['ಏನು ಕೇಳಿದ್ರಿ? ಟಿಕೆಟ್ ಬಗ್ಗೆನಾ?', 'Enu kelidri? Ticket baggena?', 'What did you ask? About tickets?']),
  ],
  outro: ['ಹೂವುಗಳು ತುಂಬಾ ಸುಂದರ ಇರುತ್ತೆ. ಎಂಜಾಯ್!', 'Hoovugalu tumba sundara irutte. Enjoy!', 'The flowers are lovely. Enjoy!'],
  learned: [['naanoo nodteeni', 'I will see it too'], ['ticket elli sigutte?', 'where do I get a ticket?']],
  again: ['ಫ್ಲವರ್ ಶೋ ನೋಡಿದ್ರಾ?', 'Flower show nodidra?', 'Did you see the flower show?'],
});

export const ledgeSketcher = D('flora-ledge-sketcher', {
  name: 'Manoj', role: 'teen on the ledge', site: 'Lalbagh Glass House, ledge', diff: 1,
  voice: { rate: 1.05, pitch: 1.05 },
  persona: 'Teenager in a red cap sketching flowers on the ledge, bored and chatty.',
  goal: 'Compliment his drawing.',
  steps: [
    S('sketch', ['ನಾನು ಹೂವಿನ ಚಿತ್ರ ಬಿಡಿಸ್ತಿದ್ದೀನಿ, ಹೇಗಿದೆ?', 'Naanu hoovina chitra bidisthiddini, hegide?', 'I am drawing a flower, how is it?'],
      'Compliment his drawing.', ['Nimma chitra tumba sundara ide.', 'ನಿಮ್ಮ ಚಿತ್ರ ತುಂಬಾ ಸುಂದರ ಇದೆ.'],
      ['nimma chitra tumba sundara ide', 'chitra tumba sundara ide', 'tumba sundara chitra', 'nimma chitra super ide', 'ನಿಮ್ಮ ಚಿತ್ರ ತುಂಬಾ ಸುಂದರ ಇದೆ', 'ಚಿತ್ರ ತುಂಬಾ ಸುಂದರ ಇದೆ', 'nimma drawing tumba sundara ide'],
      'compliment_drawing', ['Say something nice.', '"Chitra" = picture. "Sundara" = beautiful.', 'Say: "Nimma chitra tumba sundara ide."'],
      ['ಥ್ಯಾಂಕ್ಯು! ಈ ಪೇಜ್ ನಿಮಗೇ ಕೊಡ್ತೀನಿ.', 'Thank you! Ee page nimageye kodteeni.', 'Thank you! I will give this page to you.'],
      ['ಚಿತ್ರ ಹೇಗಿದೆ ಅಂತ ಹೇಳಿ.', 'Chitra hegide anta heli.', 'Tell me how the picture is.']),
  ],
  outro: ['ನಿಮ್ಮ ಬೆಂಗಳೂರು ಟ್ರಿಪ್‌ಗೆ ಒಂದು ಸ್ಮರಣಿಕೆ!', 'Nimma Bengaluru trip ge ondu smaranike!', 'A memento for your Bengaluru trip!'],
  learned: [['tumba sundara ide', 'it is very beautiful']],
  again: ['ಅಣ್ಣ, ಇನ್ನೊಂದು ಹೂವು ಬಿಡಿಸ್ತೀನಿ!', 'Anna, innondu hoovu bidisteeni!', 'Brother, I will draw another flower!'],
});
