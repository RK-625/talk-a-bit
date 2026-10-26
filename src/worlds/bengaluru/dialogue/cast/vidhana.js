// Vidhana Soudha steps, bus stop, footpath, pedal-boat booth and the Bangalore Palace gate.
import { dialogue as D, step as S } from '../kit.js';

export const busWaiter1 = D('fort-bus-waiter-1', {
  name: 'Sumathi', role: 'woman waiting for a bus', site: 'Vidhana Soudha bus stop (BMTC)', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman with a lilac umbrella, glancing down the road for the BMTC bus and happy to chat.',
  goal: 'Say you are waiting for a bus too and ask which bus goes to Majestic.',
  steps: [
    S('wait', ['ಬಸ್ ಇನ್ನೂ ಬಂದಿಲ್ಲ. ನೀವೂ ಕಾಯ್ತಿದ್ದೀರಾ?', 'Bus innu bandilla. Neevoo kaaytiddira?', 'The bus has not come yet. Are you waiting too?'],
      'Say you are waiting for the bus too.', ['Haudu, naanoo bus ge kaaytiddini.', 'ಹೌದು, ನಾನೂ ಬಸ್‌ಗೆ ಕಾಯ್ತಿದ್ದೀನಿ.'],
      ['haudu naanoo bus ge kaaytiddini', 'naanoo bus ge kaaytiddini', 'haudu madam bus ge kaaytiddini', 'bus ge kaaytiddini', 'ಹೌದು ನಾನೂ ಬಸ್‌ಗೆ ಕಾಯ್ತಿದ್ದೀನಿ', 'ನಾನೂ ಬಸ್‌ಗೆ ಕಾಯ್ತಿದ್ದೀನಿ', 'haudu naanu bus ge wait maadtiddini'],
      'say_waiting_for_bus', ['Say you are waiting too.', '"Kaaytiddini" = I am waiting.', 'Say: "Haudu, naanoo bus ge kaaytiddini."'],
      ['ಇಲ್ಲಿ ಟ್ರಾಫಿಕ್ ಇದ್ರೆ ಬಸ್ ಯಾವಾಗ್ಲೂ ಲೇಟ್.', 'Illi traffic idre bus yaavaagloo late.', 'With traffic here the bus is always late.'],
      ['ಬಸ್ ಕಾಯ್ತಿದ್ದೀರಾ ಅಂತ ಕೇಳ್ದೆ.', 'Bus kaaytiddira anta kelde.', 'I asked if you are waiting for the bus.']),
    S('number', ['ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು ಅಂತ ಹೇಳಿದ್ರೆ ಬಸ್ ನಂಬರ್ ಹೇಳ್ತೀನಿ.', 'Neevu ellige hogabeku anta helidre bus number helteeni.', 'Tell me where you want to go and I will give you the bus number.'],
      'Ask which bus goes to Majestic.', ['Majestic ge yaava bus number?', 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಯಾವ ಬಸ್ ನಂಬರ್?'],
      ['majestic ge yaava bus number', 'yaava bus number majestic ge', 'majestic bus yaava number', 'majestic ge yaava bus hogutte', 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಯಾವ ಬಸ್ ನಂಬರ್', 'ಮೆಜೆಸ್ಟಿಕ್ ಬಸ್ ಯಾವ ನಂಬರ್', 'majestic ge yaava bus madam'],
      'ask_bus_number_majestic', ['Ask which number goes to Majestic.', '"Yaava" = which.', 'Say: "Majestic ge yaava bus number?"'],
      ['ಮುನ್ನೂರ ಎರಡು ಅಥವಾ ಮುನ್ನೂರ ಮೂರು, ಎರಡೂ ಹೋಗುತ್ತೆ.', 'Munnoora eradu athava munnoora mooru, eradoo hogutte.', 'Three-oh-two or three-oh-three, both go.'],
      ['ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು ಅಂತ ಕೇಳ್ತಿದ್ದೀರಾ?', 'Ellige hogabeku anta kelthiddira?', 'Are you asking where to go?']),
  ],
  outro: ['ಬಸ್ ಬಂತು! ಬನ್ನಿ ಹತ್ತೋಣ.', 'Bus bantu! Banni hattona.', 'The bus is here! Come, let us get on.'],
  learned: [['naanoo bus ge kaaytiddini', 'I am waiting for the bus too'], ['Majestic ge yaava bus number?', 'which bus number goes to Majestic?']],
  again: ['ಬಸ್ ಹತ್ತಿದ್ರಾ? ನಂಬರ್ ನೋಡಿ ಹತ್ತಿ.', 'Bus hattidra? Number nodi hatti.', 'Did you board? Check the number before getting in.'],
});

export const busWaiter2 = D('fort-bus-waiter-2', {
  name: 'Akash', role: 'young man waiting for a bus', site: 'Vidhana Soudha bus stop (BMTC)', diff: 1,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Young man texting while checking the bus-tracking app, impatient about delays.',
  goal: 'React sympathetically to a ten-minute delay.',
  steps: [
    S('app', ['ಅಣ್ಣ, ಆ್ಯಪ್‌ನಲ್ಲಿ ಇನ್ನೂ ಹತ್ತು ನಿಮಿಷ ತೋರಿಸ್ತಿದೆ!', 'Anna, app-nalli innu hattu nimisha torisutide!', 'Brother, the app still shows ten more minutes!'],
      'React: ten minutes more?', ['Ayyo, innu hattu nimishana?', 'ಅಯ್ಯೋ, ಇನ್ನೂ ಹತ್ತು ನಿಮಿಷನಾ?'],
      ['ayyo innu hattu nimishana', 'innu hattu nimishana', 'ayyo hattu nimisha aa', 'ayyo innoo hattu nimisha', 'ಅಯ್ಯೋ ಇನ್ನೂ ಹತ್ತು ನಿಮಿಷನಾ', 'ಇನ್ನೂ ಹತ್ತು ನಿಮಿಷನಾ', 'ayyo hattu nimisha aa anna'],
      'react_ten_minute_delay', ['React to the delay.', '"Ayyo" = oh no.', 'Say: "Ayyo, innu hattu nimishana?"'],
      ['ಹೌದು ಅಣ್ಣ! ಬೆಂಗಳೂರು ಟ್ರಾಫಿಕ್ ನೋಡಿ!', 'Haudu anna! Bengaluru traffic nodi!', 'Yes, brother! Just look at Bengaluru traffic!'],
      ['ಏನಂದ್ರಿ ಅಣ್ಣ? ಆ್ಯಪ್ ನೋಡ್ತಿದ್ದೆ.', 'Enandri anna? App nodtidde.', 'What did you say, brother? I was looking at the app.']),
  ],
  outro: ['ಇದೋ ಬಸ್ ಬಂತು! ಬೈ ಅಣ್ಣ!', 'Ido bus bantu! Bye anna!', 'Here comes the bus! Bye brother!'],
  learned: [['ayyo, innu hattu nimishana?', 'oh no, ten more minutes?']],
  again: ['ಅಣ್ಣ, ನಿಮ್ಮ ಬಸ್ ಬಂತಾ?', 'Anna, nimma bus bantha?', 'Brother, has your bus come?'],
});

export const deliveryWalker = D('fort-dabbawala-walker', {
  name: 'Sharath', role: 'food-delivery rider on foot', site: 'Vidhana Soudha Road footpath', diff: 2,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Thin rider in an orange cap walking a short delivery briskly while scanning house numbers.',
  goal: 'Say you do not know the address because you are new, and point to a shop.',
  steps: [
    S('address', ['ಸಾರ್, ಈ ಅಡ್ರೆಸ್ ಎಲ್ಲಿ ಗೊತ್ತಾ? ಹನ್ನೆರಡನೇ ಮನೆ.', 'Saar, ee address elli gottaa? Hanneradane mane.', 'Sir, do you know where this address is? House twelve.'],
      'Say you do not know; you are new.', ['Kshamisi, nange gottilla, naanu hosaba.', 'ಕ್ಷಮಿಸಿ, ನನಗೆ ಗೊತ್ತಿಲ್ಲ, ನಾನು ಹೊಸಬ.'],
      ['kshamisi nange gottilla naanu hosaba', 'nange gottilla naanu hosaba', 'nange gottilla anna', 'sorry nange gottilla hosaba', 'ಕ್ಷಮಿಸಿ ನನಗೆ ಗೊತ್ತಿಲ್ಲ ನಾನು ಹೊಸಬ', 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ ನಾನು ಹೊಸಬ', 'nange gottilla naanu new'],
      'say_do_not_know_address', ['Say you do not know the place.', '"Gottilla" = I do not know.', 'Say: "Kshamisi, nange gottilla, naanu hosaba."'],
      ['ಪರವಾಗಿಲ್ಲ ಸಾರ್, ಹೊಸಬರಿಗೆ ಬೆಂಗಳೂರು ಕಷ್ಟ.', 'Paravagilla saar, hosabarige Bengaluru kashta.', 'No problem sir, Bengaluru is hard for newcomers.'],
      ['ಗೊತ್ತಾ ಇಲ್ವಾ ಸಾರ್? ಬೇಗ ಹೇಳಿ.', 'Gottaa ilva saar? Bega heli.', 'Do you know or not, sir? Tell me quickly.']),
    S('shop', ['ಯಾರನ್ನ ಕೇಳ್ಲಿ ಹಾಗಾದ್ರೆ?', 'Yaaranna kelli haagaadre?', 'Whom should I ask then?'],
      'Suggest asking at that shop.', ['Aa angadiyalli keli.', 'ಆ ಅಂಗಡಿಯಲ್ಲಿ ಕೇಳಿ.'],
      ['aa angadiyalli keli', 'aa angadi alli keli', 'aa angadiyalli keli anna', 'angadiyalli kelidre gottagutte', 'ಆ ಅಂಗಡಿಯಲ್ಲಿ ಕೇಳಿ', 'ಅಂಗಡಿಯಲ್ಲಿ ಕೇಳಿ', 'aa angadi alli keli anna'],
      'suggest_ask_at_shop', ['Point him to a shop.', '"Angadi" = shop.', 'Say: "Aa angadiyalli keli."'],
      ['ಒಳ್ಳೆ ಐಡಿಯಾ ಸಾರ್! ಅವರಿಗೆ ಗೊತ್ತಿರುತ್ತೆ.', 'Olle idea saar! Avarige gottirutte.', 'Good idea, sir! They will know.'],
      ['ಯಾರನ್ನ ಕೇಳ್ಲಿ ಅಂತ ಹೇಳಿ.', 'Yaaranna kelli anta heli.', 'Tell me whom to ask.']),
  ],
  outro: ['ಥ್ಯಾಂಕ್ಸ್ ಸಾರ್, ಡೆಲಿವರಿ ಟೈಮ್ ಆಯ್ತು!', 'Thanks saar, delivery time aytu!', 'Thanks sir, it is delivery time!'],
  learned: [['nange gottilla', 'I do not know'], ['aa angadiyalli keli', 'ask at that shop']],
  again: ['ಸಾರ್, ಅಡ್ರೆಸ್ ಸಿಕ್ತು, ಥ್ಯಾಂಕ್ಸ್!', 'Saar, address sikthu, thanks!', 'Sir, found the address, thanks!'],
});

export const boatClerk = D('gateway-ferry-clerk', {
  name: 'Dinesh', role: 'pedal-boat booth clerk', site: 'Vidhana Soudha, pedal-boat booth', diff: 2,
  voice: { rate: 1.05, pitch: 0.95 },
  persona: 'Clerk in specs behind the booth window, tearing tickets for the pedal boats.',
  goal: 'Ask for two tickets and ask when the next boat leaves.',
  steps: [
    S('tickets', ['ಟಿಕೆಟ್ ಟಿಕೆಟ್! ಪೆಡಲ್ ಬೋಟ್ ಟಿಕೆಟ್ ಬೇಕಾ?', 'Ticket ticket! Pedal boat ticket beka?', 'Tickets, tickets! Pedal boat tickets?'],
      'Ask for two tickets.', ['Eradu ticket kodi.', 'ಎರಡು ಟಿಕೆಟ್ ಕೊಡಿ.'],
      ['eradu ticket kodi', 'eradu ticket beku', 'eradu pedal boat ticket kodi', 'sir eradu ticket kodi', 'ಎರಡು ಟಿಕೆಟ್ ಕೊಡಿ', 'ಎರಡು ಟಿಕೆಟ್ ಬೇಕು', 'two ticket kodi sir'],
      'ask_two_boat_tickets', ['Ask for two tickets.', 'Two = "eradu".', 'Say: "Eradu ticket kodi."'],
      ['ತಗೊಳ್ಳಿ, ನಾಲ್ಕು ನೂರು ರೂಪಾಯಿ.', 'Tagolli, naalku nooru rupayi.', 'Here, four hundred rupees.'],
      ['ಎಷ್ಟು ಟಿಕೆಟ್ ಅಂದ್ರಿ?', 'Eshtu ticket andri?', 'How many tickets did you say?']),
    S('time', ['ಟಿಕೆಟ್ ತಗೊಂಡ್ರಲ್ಲ, ಇನ್ನೇನಾದ್ರೂ?', 'Ticket tagondralla, innenaadru?', 'You have your tickets, anything else?'],
      'Ask when the next boat leaves.', ['Boat yaavaaga horaduttade?', 'ಬೋಟ್ ಯಾವಾಗ ಹೊರಡುತ್ತೆ?'],
      ['boat yaavaaga horadutte', 'yaavaaga horadutte boat', 'mundina boat yaavaaga', 'boat eshtu hottige horadutte', 'ಬೋಟ್ ಯಾವಾಗ ಹೊರಡುತ್ತೆ', 'ಮುಂದಿನ ಬೋಟ್ ಯಾವಾಗ', 'boat yaavaaga hogutte'],
      'ask_next_boat_time', ['Ask when the next boat goes.', '"Horadutte" = leaves.', 'Say: "Boat yaavaaga horadutte?"'],
      ['ಹತ್ತು ನಿಮಿಷದಲ್ಲಿ ಬೋಟ್ ಹೊರಡುತ್ತೆ.', 'Hattu nimishadalli boat horadutte.', 'The boat leaves in ten minutes.'],
      ['ಬೋಟ್ ಬಗ್ಗೆ ಕೇಳ್ತೀರಾ ಸಾರ್?', 'Boat bagge kelteera saar?', 'Are you asking about the boat, sir?']),
  ],
  outro: ['ಲೈಫ್ ಜಾಕೆಟ್ ಹಾಕ್ಕೊಳ್ಳಿ, ಎಂಜಾಯ್ ಮಾಡಿ!', 'Life jacket haakkolli, enjoy maadi!', 'Wear your life jacket, enjoy!'],
  learned: [['eradu ticket kodi', 'give me two tickets'], ['boat yaavaaga horadutte?', 'when does the boat leave?']],
  again: ['ಸಾರ್, ಟಿಕೆಟ್ ಮರೀಬೇಡಿ!', 'Saar, ticket mareebedi!', 'Sir, do not forget your tickets!'],
});

export const palaceDoorman = D('taj-doorman', {
  name: 'Mallikarjun', role: 'Bangalore Palace gate attendant', site: 'Bangalore Palace entrance', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Tall attendant in a plum coat and Mysore peta who bows to visitors and points them to the ticket counter.',
  goal: 'Ask where the ticket counter is and whether photos are allowed inside.',
  steps: [
    S('counter', ['ನಮಸ್ಕಾರ ಸರ್, ಅರಮನೆಗೆ ಸ್ವಾಗತ.', 'Namaskara sir, aramanege swagata.', 'Namaskara sir, welcome to the palace.'],
      'Ask where the ticket counter is.', ['Ticket counter elli ide?', 'ಟಿಕೆಟ್ ಕೌಂಟರ್ ಎಲ್ಲಿ ಇದೆ?'],
      ['ticket counter elli ide', 'ticket counter elli', 'ticket elli sigutte', 'counter elli ide sir', 'ಟಿಕೆಟ್ ಕೌಂಟರ್ ಎಲ್ಲಿ ಇದೆ', 'ಟಿಕೆಟ್ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ', 'ticket counter elli ide sir'],
      'ask_palace_ticket_counter', ['Ask where to buy a ticket.', '"Elli ide" = where is it.', 'Say: "Ticket counter elli ide?"'],
      ['ಬಲಕ್ಕೆ ಇದೆ ಸರ್, ಆ ಕಮಾನು ಹತ್ರ.', 'Balakke ide sir, aa kamaanu hatra.', 'It is on the right, sir, near that arch.'],
      ['ಏನು ಬೇಕಿತ್ತು ಸರ್? ಹೇಳಿ.', 'Enu bekittu sir? Heli.', 'What did you need, sir? Please say.']),
    S('photo', ['ಒಳಗೆ ಅರಮನೆ ಸುಂದರ ಇದೆ ಸರ್.', 'Olage aramane sundara ide sir.', 'The palace is beautiful inside, sir.'],
      'Ask if photos are allowed inside.', ['Olage photo tegeyabahuda?', 'ಒಳಗೆ ಫೋಟೋ ತೆಗೆಯಬಹುದಾ?'],
      ['olage photo tegeyabahuda', 'photo tegeyabahuda sir', 'olage photo allowed ideya', 'olage photo tegeyodu sari ideya', 'ಒಳಗೆ ಫೋಟೋ ತೆಗೆಯಬಹುದಾ', 'ಫೋಟೋ ತೆಗೆಯಬಹುದಾ ಸರ್', 'olage photo tegibahuda'],
      'ask_photos_allowed', ['Ask whether you may take photos.', '"Tegeyabahuda" = may I take?', 'Say: "Olage photo tegeyabahuda?"'],
      ['ತೆಗೀಬಹುದು ಸರ್, ಕ್ಯಾಮೆರಾ ಚಾರ್ಜ್ ಇದೆ.', 'Tegibahudu sir, camera charge ide.', 'You may, sir, there is a camera charge.'],
      ['ಫೋಟೋ ಬಗ್ಗೆ ಕೇಳ್ತೀರಾ ಸರ್?', 'Photo bagge kelteera sir?', 'Are you asking about photos, sir?']),
  ],
  outro: ['ಅರಮನೆ ನೋಡಿ ಆನಂದಿಸಿ ಸರ್. ಬನ್ನಿ ಬನ್ನಿ.', 'Aramane nodi aanandisi sir. Banni banni.', 'Enjoy the palace, sir. Please come in.'],
  learned: [['ticket counter elli ide?', 'where is the ticket counter?'], ['olage photo tegeyabahuda?', 'may I take photos inside?']],
  again: ['ಸರ್, ಮತ್ತೆ ಬಂದ್ರಾ? ಸ್ವಾಗತ.', 'Sir, matte bandra? Swagata.', 'Sir, back again? Welcome.'],
});

export const palaceUsher = D('taj-bellboy', {
  name: 'Ramachandra', role: 'Bangalore Palace usher', site: 'Bangalore Palace entrance', diff: 1,
  voice: { rate: 0.95, pitch: 0.9 },
  persona: 'Thin usher in a cream coat and maroon peta with a trunk on his head, waiting to carry guests\' bags.',
  goal: 'Politely say your bag is light and you need no help.',
  steps: [
    S('bag', ['ಸರ್, ಸಾಮಾನು ಇದ್ರೆ ಹೇಳಿ, ನಾನು ಹೊರ್ತೀನಿ.', 'Sir, saamaanu idre heli, naanu horteeni.', 'Sir, if you have luggage tell me, I will carry it.'],
      'Say your bag is light.', ['Beda, nanna bag haguraa ide.', 'ಬೇಡ, ನನ್ನ ಬ್ಯಾಗ್ ಹಗುರ ಇದೆ.'],
      ['beda nanna bag hagura ide', 'nanna bag hagura ide', 'beda saar bag hagura ide', 'beda dhanyavaada bag hagura', 'ಬೇಡ ನನ್ನ ಬ್ಯಾಗ್ ಹಗುರ ಇದೆ', 'ನನ್ನ ಬ್ಯಾಗ್ ಹಗುರ ಇದೆ', 'beda bag hagura ide'],
      'decline_help_bag_light', ['Say you do not need help.', '"Hagura" = light.', 'Say: "Beda, nanna bag haguraa ide."'],
      ['ಸರಿ ಸರ್, ಬೇಕಿದ್ರೆ ಹೇಳಿ, ಇಲ್ಲೇ ಇರ್ತೀನಿ.', 'Sari sir, bekidre heli, ille irteeni.', 'Okay sir, tell me if you need me, I will be right here.'],
      ['ಬ್ಯಾಗ್ ಬೇಕಾ ಬೇಡವಾ ಸರ್?', 'Bag beka bedava sir?', 'Bag or no bag, sir?']),
  ],
  outro: ['ಒಳಗೆ ಹೋಗಿ ಸರ್, ಅರಮನೆ ನೋಡಿ.', 'Olage hogi sir, aramane nodi.', 'Go inside, sir, see the palace.'],
  learned: [['nanna bag hagura ide', 'my bag is light']],
  again: ['ಸರ್, ಸಾಮಾನು ಇದ್ಯಾ ಈಗ?', 'Sir, saamaanu idya iga?', 'Sir, any luggage now?'],
});

export const touristA = D('gateway-tourist-a', {
  name: 'Tom', role: 'foreign tourist', site: 'Vidhana Soudha steps, by the portico', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Thin tourist in a pink floral shirt photographing the Vidhana Soudha and shading his eyes. Speaks only English.',
  goal: 'Tell him what the grand building is.',
  steps: [
    S('what', 'Excuse me, what is this huge granite building? It looks like a palace!',
      'Tell him it is the Vidhana Soudha, the state legislature.', ['It is the Vidhana Soudha, where the state government works.', 'It is the Vidhana Soudha, where the state government works.'],
      ['it is the vidhana soudha where the state government works', 'this is the vidhana soudha the state legislature', 'that is the vidhana soudha, the government building', 'it is vidhana soudha the state assembly', 'the vidhana soudha is where karnataka government sits', 'vidhana soudha, the state legislature building'],
      'explain_vidhana_soudha', ['Name the building.', 'It is the Vidhana Soudha, a government building.', 'Say: "It is the Vidhana Soudha, where the state government works."'],
      'Amazing! It really looks like a palace. Thanks!', 'Sorry, what did you say this building is?'),
  ],
  outro: 'Wonderful, I will take more photos. Thank you!',
  learned: [['Vidhana Soudha', 'the state legislature building']],
  again: 'Hello again! I took lots of photos of the Vidhana Soudha.',
});

export const touristB = D('gateway-tourist-b', {
  name: 'Peter', role: 'foreign tourist', site: 'Vidhana Soudha steps, by the portico', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Round tourist in a striped shirt and red cap who wants a pedal boat on the lake and does not know the way. Speaks only English.',
  goal: 'Tell him how to reach the lake and what an auto should cost.',
  steps: [
    S('lake', 'Hi there! How do I get to the lake from here? Is it far?',
      'Tell him to take an auto, about fifteen minutes.', ['Take an auto, it is about fifteen minutes away.', 'Take an auto, it is about fifteen minutes away.'],
      ['take an auto it is about fifteen minutes away', 'an auto takes about fifteen minutes', 'it is fifteen minutes by auto', 'take an auto to the lake, about fifteen minutes', 'go by auto, fifteen minutes or so', 'just take an auto, not far, fifteen minutes'],
      'tell_lake_by_auto', ['Say how to go.', 'Mention an auto and the time.', 'Say: "Take an auto, it is about fifteen minutes away."'],
      'Great, an auto it is! Thanks.', 'Sorry, how far did you say the lake is?'),
    S('fare', 'And how much should the auto cost? I do not want to be cheated!',
      'Tell him to ask for the meter, about a hundred rupees.', ['Ask for the meter, it should be about a hundred rupees.', 'Ask for the meter, it should be about a hundred rupees.'],
      ['ask for the meter it should be about a hundred rupees', 'insist on the meter, around a hundred rupees', 'use the meter, it is about one hundred rupees', 'about a hundred rupees if he uses the meter', 'ask him to put the meter, roughly a hundred rupees', 'the meter fare is around a hundred rupees'],
      'tell_auto_fare', ['Mention the meter.', 'About one hundred rupees.', 'Say: "Ask for the meter, it should be about a hundred rupees."'],
      'The meter, got it. You are a lifesaver!', 'Sorry, how much did you say?'),
  ],
  outro: 'Thanks so much! Hope to see you at the lake.',
  learned: [['ask for the meter', 'giving travel advice in English']],
  again: 'Hi again! I think I am going the right way.',
});

export const danaSeller = D('gateway-dana-seller', {
  name: 'Susheelamma', role: 'bird-feed (dana) seller', site: 'Vidhana Soudha steps, pigeon-feeding mat', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Round woman with a small bag of grain calling "dana, dana" so that visitors feed the pigeons.',
  goal: 'Buy a packet of grain and ask if the pigeons bite.',
  steps: [
    S('buy', ['ದಾನ ದಾನ! ಪಾರಿವಾಳಕ್ಕೆ ಕಾಳು ಹಾಕಿ ಸಾರ್!', 'Dana dana! Paarivaalakke kaalu haaki saar!', 'Grain, grain! Feed the pigeons, sir!'],
      'Ask for a packet of grain.', ['Ondu packet kaalu kodi.', 'ಒಂದು ಪ್ಯಾಕೆಟ್ ಕಾಳು ಕೊಡಿ.'],
      ['ondu packet kaalu kodi', 'kaalu kodi amma', 'ondu packet dana kodi', 'ondu packet kaalu beku', 'ಒಂದು ಪ್ಯಾಕೆಟ್ ಕಾಳು ಕೊಡಿ', 'ಕಾಳು ಕೊಡಿ ಅಮ್ಮ', 'one packet kaalu kodi'],
      'buy_bird_grain', ['Ask for a packet of grain.', '"Kaalu" = grain.', 'Say: "Ondu packet kaalu kodi."'],
      ['ತಗೊಳ್ಳಿ, ಹತ್ತು ರೂಪಾಯಿ. ಅಂಗೈಯಲ್ಲಿ ಹಾಕಿ ನೋಡಿ.', 'Tagolli, hattu rupayi. Angaiyalli haaki nodi.', 'Here, ten rupees. Try it on your palm.'],
      ['ಎಷ್ಟು ಬೇಕು ಸಾರ್? ಒಂದಾ?', 'Eshtu beku saar? Ondaa?', 'How much do you want, sir? One?']),
    S('bite', ['ಪಾರಿವಾಳ ತುಂಬಾ ಸಾಧು, ಬನ್ನಿ ಹಾಕಿ.', 'Paarivaala tumba saadhu, banni haaki.', 'The pigeons are very gentle, come feed them.'],
      'Ask if the pigeons bite.', ['Paarivaala kachchalla alva?', 'ಪಾರಿವಾಳ ಕಚ್ಚಲ್ಲ ಅಲ್ವಾ?'],
      ['paarivaala kachchalla alva', 'paarivaala kachchutta', 'paarivaala kachchalla', 'kachchalla alva amma', 'ಪಾರಿವಾಳ ಕಚ್ಚಲ್ಲ ಅಲ್ವಾ', 'ಪಾರಿವಾಳ ಕಚ್ಚುತ್ತಾ', 'pigeon kachchalla alva'],
      'ask_pigeons_bite', ['Ask if pigeons bite.', '"Kachchalla" = does not bite.', 'Say: "Paarivaala kachchalla alva?"'],
      ['ಇಲ್ಲ ಸಾರ್, ಭಯ ಬೇಡ. ಹಾಕಿ, ಹಾಕಿ!', 'Illa saar, bhaya beda. Haaki, haaki!', 'No sir, do not worry. Feed them!'],
      ['ಏನು ಕೇಳ್ತೀರಿ ಸಾರ್? ಪಾರಿವಾಳದ ಬಗ್ಗೆನಾ?', 'Enu kelteeri saar? Paarivaalada baggena?', 'What are you asking, sir? About the pigeons?']),
  ],
  outro: ['ಪಾರಿವಾಳಗಳೂ ಖುಷಿಯಾದ್ವು ಸಾರ್. ಹೋಗಿ ಬನ್ನಿ.', 'Paarivaalagaloo khushiyaadvu saar. Hogi banni.', 'Even the pigeons are happy, sir. Go and come again.'],
  learned: [['ondu packet kaalu kodi', 'give me a packet of grain'], ['paarivaala kachchalla alva?', 'pigeons do not bite, right?']],
  again: ['ಸಾರ್, ಇನ್ನೊಂದು ಪ್ಯಾಕೆಟ್ ದಾನ?', 'Saar, innondu packet dana?', 'Sir, another packet of grain?'],
});

export const roadTourist = D('gateway-road-tourist', {
  name: 'Linda', role: 'foreign tourist', site: 'Vidhana Soudha Road, on the way to the lake', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Round tourist in a mint floral shirt and yellow cap, snapping photos along the road and a little lost. Speaks only English.',
  goal: 'Tell her the way to the lake.',
  steps: [
    S('way', 'Excuse me, is this the right way to the lake? I think I am lost.',
      'Tell her to go straight and turn left at the signal.', ['Go straight and turn left at the signal.', 'Go straight and turn left at the signal.'],
      ['go straight and turn left at the signal', 'straight ahead then left at the signal', 'walk straight, at the signal turn left', 'keep going straight and take a left at the signal', 'go straight, left at the traffic light', 'straight and then left at the signal'],
      'give_directions_to_lake', ['Give simple directions.', 'Straight, then left at the signal.', 'Say: "Go straight and turn left at the signal."'],
      'Straight, then left. Perfect, thank you!', 'Sorry, which way again? Straight or left?'),
  ],
  outro: 'Thanks! This city is lovely, everyone is so helpful.',
  learned: [['go straight, turn left', 'giving directions in English']],
  again: 'Hello again! I found the lake, it was beautiful.',
});
