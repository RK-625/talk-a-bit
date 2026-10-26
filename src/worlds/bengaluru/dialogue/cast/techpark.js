// The glass tech-park tower: gate, garden, cab line, and the quiet lane beside it.
import { dialogue as D, step as S } from '../kit.js';

export const gateWatchman = D('antilia-gate-watchman', {
  name: 'Narasimha', role: 'second gate guard', site: 'Tech-park gate', diff: 1,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Second guard in a khaki cap with a torch, waving at passers-by and keeping an eye on the cabs.',
  goal: 'Say you will go towards the gate, away from the cab line.',
  steps: [
    S('cabs', ['ನಮಸ್ಕಾರ ಸಾರ್! ಕ್ಯಾಬ್ ಲೈನ್ ಹತ್ರ ಬರಬೇಡಿ.', 'Namaskara saar! Cab line hatra barabedi.', 'Namaskara sir! Do not come near the cab line.'],
      'Say you will go towards the gate.', ['Sari, naanu gate kade hogteeni.', 'ಸರಿ, ನಾನು ಗೇಟ್ ಕಡೆ ಹೋಗ್ತೀನಿ.'],
      ['sari naanu gate kade hogteeni', 'gate kade hogteeni', 'sari saar gate kade hogteeni', 'naanu gate kade barteeni', 'ಸರಿ ನಾನು ಗೇಟ್ ಕಡೆ ಹೋಗ್ತೀನಿ', 'ಗೇಟ್ ಕಡೆ ಹೋಗ್ತೀನಿ', 'sari gate kade'],
      'go_towards_gate', ['Say you will go to the gate.', '"Kade" = towards.', 'Say: "Sari, naanu gate kade hogteeni."'],
      ['ಹೌದು ಸಾರ್, ಅದೇ ದಾರಿ. ಹೋಗಿ.', 'Haudu saar, ade daari. Hogi.', 'Yes sir, that is the way. Go ahead.'],
      ['ಎಲ್ಲಿ ಹೋಗ್ತೀರಾ ಸಾರ್? ಗೇಟಾ?', 'Elli hogteera saar? Gate-aa?', 'Where are you going, sir? To the gate?']),
  ],
  outro: ['ಒಳ್ಳೆ ದಿನ ಸಾರ್, ಹೋಗಿ ಬನ್ನಿ.', 'Olle dina saar, hogi banni.', 'Have a good day, sir.'],
  learned: [['gate kade hogteeni', 'I will go towards the gate']],
  again: ['ಸಾರ್, ಕ್ಯಾಬ್ ಬರ್ತಿದೆ, ಪಕ್ಕಕ್ಕೆ!', 'Saar, cab bartide, pakkakke!', 'Sir, a cab is coming, step aside!'],
});

export const mali = D('antilia-mali', {
  name: 'Kenchamma', role: 'campus gardener', site: 'Tech-park garden', diff: 2,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Woman in a teal saree with a broom, sweeping fallen gulmohar petals from the path.',
  goal: 'Say the flowers look lovely and that it is your first day.',
  steps: [
    S('petals', ['ಈ ಗುಲ್‌ಮೋಹರ್ ಹೂವು ಬಿದ್ದು ಬಿದ್ದು ಗುಡಿಸಿ ಸಾಕಾಯ್ತು!', 'Ee gulmohar hoovu biddu biddu gudisi saakaytu!', 'Sweeping up these gulmohar petals again and again has tired me!'],
      'Say the flowers still look lovely.', ['Aadre hoovu tumba chennagi kaanutte.', 'ಆದ್ರೆ ಹೂವು ತುಂಬಾ ಚೆನ್ನಾಗಿ ಕಾಣುತ್ತೆ.'],
      ['aadre hoovu tumba chennagi kaanutte', 'hoovu tumba chennagi kaanutte', 'aadre hoovu sundara kaanutte amma', 'hoovu bidre chennagide', 'ಆದ್ರೆ ಹೂವು ತುಂಬಾ ಚೆನ್ನಾಗಿ ಕಾಣುತ್ತೆ', 'ಹೂವು ತುಂಬಾ ಚೆನ್ನಾಗಿ ಕಾಣುತ್ತೆ', 'aadre hoovu chennagi kaanutte'],
      'say_flowers_look_lovely', ['Say they look pretty.', '"Kaanutte" = it looks.', 'Say: "Aadre hoovu tumba chennagi kaanutte."'],
      ['ಹೌದು ಸಾರ್, ಕೆಂಪು ಬಣ್ಣ ನೋಡೋಕೆ ಚೆನ್ನ.', 'Haudu saar, kempu banna nodoke chenna.', 'Yes sir, the red colour is a joy to see.'],
      ['ಹೂವು ಹೇಗೆ ಕಾಣುತ್ತೆ ಅಂತ ಹೇಳಿ.', 'Hoovu hege kaanutte anta heli.', 'Tell me how the flowers look.']),
    S('first', ['ನೀವು ಈ ಆಫೀಸ್‌ನಲ್ಲಿ ಹೊಸಬರಾ?', 'Neevu ee office-nalli hosabaraa?', 'Are you new in this office?'],
      'Say today is your first day.', ['Haudu amma, indu modala dina.', 'ಹೌದು ಅಮ್ಮ, ಇಂದು ಮೊದಲ ದಿನ.'],
      ['haudu amma indu modala dina', 'indu modala dina', 'ivattu modala dina amma', 'haudu modala dina', 'ಹೌದು ಅಮ್ಮ ಇಂದು ಮೊದಲ ದಿನ', 'ಇಂದು ಮೊದಲ ದಿನ', 'haudu amma ivattu modala dina'],
      'say_first_day_at_office', ['Say it is your first day.', '"Modala dina" = first day.', 'Say: "Haudu amma, indu modala dina."'],
      ['ಹೌದಾ! ಶುಭವಾಗಲಿ ಸಾರ್. ಚೆನ್ನಾಗಿ ಕೆಲಸ ಮಾಡಿ.', 'Haudaa! Shubhavagali saar. Chennagi kelasa maadi.', 'Is it! All the best, sir. Work well.'],
      ['ಹೊಸಬರಾ ಅಲ್ವಾ ಹೇಳಿ ಸಾರ್.', 'Hosabaraa alva heli saar.', 'Tell me whether you are new, sir.']),
  ],
  outro: ['ಲಂಚ್ ಟೈಮ್‌ನಲ್ಲಿ ಇಲ್ಲಿ ಬಂದು ಕೂತ್ಕೊಳ್ಳಿ, ಹಸಿರು ಚೆನ್ನ.', 'Lunch time-nalli illi bandu kootkolli, hasiru chenna.', 'Come and sit here at lunchtime, the greenery is lovely.'],
  learned: [['hoovu tumba chennagi kaanutte', 'the flowers look lovely'], ['indu modala dina', 'today is my first day']],
  again: ['ಸಾರ್, ಜಾಗ್ರತೆ, ಇನ್ನೂ ಒದ್ದೆ ಇದೆ!', 'Saar, jaagrate, innu odde ide!', 'Sir, careful, it is still wet!'],
});

export const chauffeur = D('antilia-chauffeur', {
  name: 'Shivu', role: 'cab driver', site: 'Tech-park, beside the line of white cabs', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Driver in a white shirt and charcoal cap waiting beside his cab, hoping for a passenger.',
  goal: 'Say you have not booked a cab and ask the fare to Indiranagar.',
  steps: [
    S('booked', ['ನಿಮ್ಮ ಕ್ಯಾಬ್ ಬುಕ್ ಮಾಡಿದ್ದೀರಾ ಸಾರ್?', 'Nimma cab book maadiddira saar?', 'Have you booked your cab, sir?'],
      'Say you have not booked.', ['Illa, naanu book maadilla.', 'ಇಲ್ಲ, ನಾನು ಬುಕ್ ಮಾಡಿಲ್ಲ.'],
      ['illa naanu book maadilla', 'naanu book maadilla', 'illa book maadilla saar', 'book maadilla anna', 'ಇಲ್ಲ ನಾನು ಬುಕ್ ಮಾಡಿಲ್ಲ', 'ನಾನು ಬುಕ್ ಮಾಡಿಲ್ಲ', 'illa book aagilla'],
      'say_not_booked', ['Say you have not booked.', '"Maadilla" = have not done.', 'Say: "Illa, naanu book maadilla."'],
      ['ಪರವಾಗಿಲ್ಲ ಸಾರ್, ನಾನು ಡೈರೆಕ್ಟ್ ಬರ್ತೀನಿ.', 'Paravagilla saar, naanu direct barteeni.', 'No problem sir, I can come direct.'],
      ['ಬುಕ್ ಮಾಡಿದ್ದೀರಾ ಇಲ್ವಾ ಸಾರ್?', 'Book maadiddira ilva saar?', 'Have you booked or not, sir?']),
    S('fare', ['ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು ಸಾರ್?', 'Ellige hogabeku saar?', 'Where do you want to go, sir?'],
      'Ask the fare to Indiranagar.', ['Indiranagar ge eshtu aagutte?', 'ಇಂದಿರಾನಗರಕ್ಕೆ ಎಷ್ಟು ಆಗುತ್ತೆ?'],
      ['indiranagar ge eshtu aagutte', 'indiranagar ge eshtu', 'indiranagar ge fare eshtu', 'indiranagar ge eshtu rupayi', 'ಇಂದಿರಾನಗರಕ್ಕೆ ಎಷ್ಟು ಆಗುತ್ತೆ', 'ಇಂದಿರಾನಗರಕ್ಕೆ ಎಷ್ಟು', 'Indiranagar ge eshtu aagutte saar'],
      'ask_fare_to_indiranagar', ['Ask the fare to a place.', '"Eshtu aagutte" = how much.', 'Say: "Indiranagar ge eshtu aagutte?"'],
      ['ಇನ್ನೂರೈವತ್ತು ರೂಪಾಯಿ ಸಾರ್, ಎಸಿ ಇದೆ.', 'Innooraivattu rupayi saar, AC ide.', 'Two hundred and fifty rupees, sir, with AC.'],
      ['ಎಲ್ಲಿಗೆ ಅಂತ ಕೇಳ್ದೆ ಸಾರ್.', 'Ellige anta kelde saar.', 'I asked where to, sir.']),
  ],
  outro: ['ಬೇಕಾದಾಗ ಹೇಳಿ ಸಾರ್, ಇಲ್ಲೇ ಇರ್ತೀನಿ.', 'Bekaadaaga heli saar, ille irteeni.', 'Tell me whenever, sir, I am right here.'],
  learned: [['naanu book maadilla', 'I have not booked'], ['Indiranagar ge eshtu aagutte?', 'how much to Indiranagar?']],
  again: ['ಸಾರ್, ಎಲ್ಲಿಗಾದ್ರೂ ಹೋಗ್ತೀರಾ?', 'Saar, elligaadru hogteera?', 'Sir, going anywhere?'],
});

export const deliveryBoy = D('antilia-delivery-boy', {
  name: 'Chandru', role: 'food-delivery rider', site: 'Tech-park, outside the gate', diff: 1,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Teen-looking rider in an orange T-shirt idling by the gate, waiting for the customer to come down for his lunch order.',
  goal: 'Tell him to wait a little, the customer will come.',
  steps: [
    S('wait', ['ಅಣ್ಣ, ಈ ಲಂಚ್ ಆರ್ಡರ್ ತಗೊಳ್ಳೋರು ಇನ್ನೂ ಬಂದಿಲ್ಲ.', 'Anna, ee lunch order tagollooru innu bandilla.', 'Brother, the person for this lunch order has not come yet.'],
      'Tell him to wait a little.', ['Swalpa kaayiri, bartaare.', 'ಸ್ವಲ್ಪ ಕಾಯಿರಿ, ಬರ್ತಾರೆ.'],
      ['swalpa kaayiri bartaare', 'kaayiri bartaare', 'swalpa kaayi bartaare', 'swalpa wait maadi bartaare', 'ಸ್ವಲ್ಪ ಕಾಯಿರಿ ಬರ್ತಾರೆ', 'ಕಾಯಿರಿ ಬರ್ತಾರೆ', 'swalpa kaayiri bartare'],
      'tell_him_to_wait', ['Tell him to be patient.', '"Kaayiri" = please wait.', 'Say: "Swalpa kaayiri, bartaare."'],
      ['ಸರಿ ಅಣ್ಣ, ಇನ್ನೈದು ನಿಮಿಷ ಕಾಯ್ತೀನಿ.', 'Sari anna, innaidu nimisha kaayteeni.', 'Okay brother, I will wait another five minutes.'],
      ['ಕಾಯ್ಬೇಕಾ ಅಂತ ಕೇಳ್ದೆ ಅಣ್ಣ.', 'Kaaybeka anta kelde anna.', 'I asked if I should wait, brother.']),
  ],
  outro: ['ಇದೋ ಬಂದ್ರು! ಥ್ಯಾಂಕ್ಸ್ ಅಣ್ಣ!', 'Ido bandru! Thanks anna!', 'There he comes! Thanks brother!'],
  learned: [['swalpa kaayiri', 'please wait a little']],
  again: ['ಅಣ್ಣ, ಇನ್ನೊಂದು ಆರ್ಡರ್ ಬಂತು!', 'Anna, innondu order bantu!', 'Brother, another order came!'],
});

export const laneWalker = D('antilia-lane-walker', {
  name: 'Doddamane Thatha', role: 'elderly man on a morning walk', site: 'Quiet residential lane near the tech park', diff: 1,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Thin old man in white shoes reading a newspaper while he strolls, fond of the quiet lane.',
  goal: 'Agree that the area is green.',
  steps: [
    S('green', ['ಈ ಬಡಾವಣೆ ತುಂಬಾ ಶಾಂತವಾಗಿದೆ, ಅಲ್ವಾ?', 'Ee badaavane tumba shaantavaagide, alva?', 'This neighbourhood is very quiet, isn\'t it?'],
      'Agree it is green and peaceful.', ['Haudu, illi tumba hasiru ide.', 'ಹೌದು, ಇಲ್ಲಿ ತುಂಬಾ ಹಸಿರು ಇದೆ.'],
      ['haudu illi tumba hasiru ide', 'illi tumba hasiru ide', 'haudu thatha hasiru ide', 'illi hasiru jaasti ide', 'ಹೌದು ಇಲ್ಲಿ ತುಂಬಾ ಹಸಿರು ಇದೆ', 'ಇಲ್ಲಿ ತುಂಬಾ ಹಸಿರು ಇದೆ', 'haudu thatha illi hasiru'],
      'agree_area_green', ['Agree about the greenery.', '"Hasiru" = green.', 'Say: "Haudu, illi tumba hasiru ide."'],
      ['ಹೌದು, ಗಾರ್ಡನ್ ಸಿಟಿ ಅಂತ ಸುಮ್ಮನೆ ಅಲ್ಲ.', 'Haudu, garden city anta summane alla.', 'Yes, it is not for nothing that it is called Garden City.'],
      ['ಏನಂದ್ರಿ? ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ.', 'Enandri? Innomme heli.', 'What did you say? Please say again.']),
  ],
  outro: ['ಬೆಳಿಗ್ಗೆ ವಾಕ್ ಮಾಡಿ, ಆರೋಗ್ಯ ಚೆನ್ನಾಗಿರುತ್ತೆ.', 'Beligge walk maadi, aarogya chennagirutte.', 'Walk in the mornings and you will stay healthy.'],
  learned: [['illi tumba hasiru ide', 'it is very green here']],
  again: ['ಬನ್ನಿ ಬನ್ನಿ, ಈ ಲೇನ್ ನಲ್ಲಿ ಒಂದು ರೌಂಡ್ ಹೋಗೋಣ.', 'Banni banni, ee lane-nalli ondu round hogona.', 'Come, let us walk one round of this lane.'],
});

export const decoOffice = D('deco-office-woman', {
  name: 'Supriya', role: 'office-going woman', site: 'Near the UB City side', diff: 2,
  voice: { rate: 1.15, pitch: 1.1 },
  persona: 'Woman in a white shirt with a purple lanyard checking her watch, late for work.',
  goal: 'Point her to the bus stop and tell her the time.',
  steps: [
    S('stop', ['ಅಯ್ಯೋ ಲೇಟ್! ಈ ಕಡೆ ಬಸ್ ಸ್ಟಾಪ್ ಎಲ್ಲಿ?', 'Ayyo late! Ee kade bus stop elli?', 'Oh no, late! Where is the bus stop around here?'],
      'Say go straight and the stop is on the left.', ['Nera hogi, edakke bus stop.', 'ನೇರ ಹೋಗಿ, ಎಡಕ್ಕೆ ಬಸ್ ಸ್ಟಾಪ್.'],
      ['nera hogi edakke bus stop', 'nera hogi edakke bus stop ide', 'seedha hogi edakke bus stop', 'edakke bus stop ide nera hogi', 'ನೇರ ಹೋಗಿ ಎಡಕ್ಕೆ ಬಸ್ ಸ್ಟಾಪ್', 'ನೇರ ಹೋಗಿ ಎಡಕ್ಕೆ ಬಸ್ ಸ್ಟಾಪ್ ಇದೆ', 'nera hogi, edakke bus stop madam'],
      'direct_to_bus_stop_left', ['Give her directions.', '"Nera" = straight. "Edakke" = to the left.', 'Say: "Nera hogi, edakke bus stop."'],
      ['ಥ್ಯಾಂಕ್ಸ್! ಓಡಿದ್ರೆ ಬಸ್ ಸಿಗುತ್ತೆ.', 'Thanks! Odidre bus sigutte.', 'Thanks! If I run I will catch the bus.'],
      ['ಬಸ್ ಸ್ಟಾಪ್ ಎಲ್ಲಿ ಅಂತ ಹೇಳಿ ಬೇಗ!', 'Bus stop elli anta heli bega!', 'Tell me quickly where the bus stop is!']),
    S('time', ['ಈಗ ಟೈಮ್ ಎಷ್ಟು?', 'Iga time eshtu?', 'What time is it now?'],
      'Tell her it is nine o\'clock.', ['Iga ombattu gante.', 'ಈಗ ಒಂಬತ್ತು ಗಂಟೆ.'],
      ['iga ombattu gante', 'ombattu gante madam', 'iga ombattu gante aytu', 'ombattu gante aagide', 'ಈಗ ಒಂಬತ್ತು ಗಂಟೆ', 'ಒಂಬತ್ತು ಗಂಟೆ ಮೇಡಂ', 'iga nine gante'],
      'tell_time_nine', ['Say the time.', '9 = "ombattu".', 'Say: "Iga ombattu gante."'],
      ['ಅಯ್ಯೋ, ಮೀಟಿಂಗ್ ಒಂಬತ್ತು ಹದಿನೈದಕ್ಕೆ! ಓಡ್ತೀನಿ!', 'Ayyo, meeting ombattu hadinaidakke! Odteeni!', 'Oh no, my meeting is at nine fifteen! I am running!'],
      ['ಟೈಮ್ ಎಷ್ಟು ಅಂತ ಹೇಳಿ.', 'Time eshtu anta heli.', 'Tell me what time it is.']),
  ],
  outro: ['ಬೈ ರೋಹನ್! ಲೇಟ್ ಆದ್ರೆ ಬಾಸ್ ಬೈತಾರೆ!', 'Bye Rohan! Late aadre boss baitaare!', 'Bye Rohan! The boss will scold me if I am late!'],
  learned: [['nera hogi, edakke', 'go straight, then left'], ['iga ombattu gante', 'it is nine o\'clock now']],
  again: ['ಬಸ್ ಹೋಯ್ತು! ಛೆ!', 'Bus hoytu! Che!', 'The bus left! Argh!'],
});
