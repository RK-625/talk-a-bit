/**
 * Apni Dilli dialogues (Delhi Hindi with a light Punjabi flavour; the foreign tourists speak English). Default export is keyed by NPC ROLE
 * for the 20 multi-step top-level files and by explicit placement id for everyone else (see ./cast/). docs/DELHI_CAST.md lists all 132 ids.
 *
 * id (= role)        site                                           steps  goal
 * ------------------ ---------------------------------------------- ------ -------------------------------------------------------------
 * chaiwalaUncle      Chai-stall square (spawn)  [TUTORIAL, Bittu Bhaiya] 3  order one adrak chai, say yes to bun-makhan, say thanks
 * vadaPavWala        Chole kulche cart                                3     order 2 plates, onion and lemon, pay Rs 120
 * taxiDriver         Red Fort auto stand                              4     ask for Mukherjee Nagar, ask for the meter, how long, pay Rs 80
 * busConductor       Red Fort DTC bus stop                            4     ask the route, buy a ticket, say you have change, ask to be told the stop
 * trafficCop         Red Fort road junction                           3     ask the way to the Chandni Chowk metro, ask if far, promise to follow the signal
 * auntyWithSabzi     Red Fort Road footpath                           3     offer to carry her bag, give name, say you are from Patna doing UPSC
 * cricketKid         Gully cricket, chai-stall square                 3     ask to join, choose to bowl first, say it is out
 * koliFisherwoman    India Gate quay (dupatta seller)                 3     ask the price, bargain two for Rs 120, buy yellow and pink
 * dabbawala          Delivery scooter (food-delivery rider)           3     ask what is wrong, say call the customer, cheer him up
 * bollywoodHopeful   Coaching hoardings wall (reel influencer)        3     compliment the pose, wish her views, say UPSC first then reels
 * bhelWala           Golgappe cart, India Gate lawns                  3     order a plate, spicy water less chilli, pay Rs 20
 * golaWala           Kulfi stall, India Gate lawns                    3     order malai kulfi, kesar on top, pay Rs 50
 * balloonSeller      India Gate steps                                 3     ask the price, bargain three for Rs 25, say it is for a nephew
 * photographer       Photo tripod, India Gate                         3     ask for a photo, ask the print price, ask how long
 * priest             Gurudwara door (granthi)                         3     say Sat Sri Akal, ask for a head cloth, accept prasad and langar
 * pilgrim            Lotus Temple causeway gate (sevadar)             4     greet, ask closing time, ask where shoes go, promise silence
 * coolie             Old Delhi station forecourt                      4     ask the Patna platform, where it is, the charge, thank
 * commuter           Delhi Metro station map board                    4     ask if it goes to Rajiv Chowk, platform, next train, smart card
 * tourist  (EN)      Paddle-boat queue, India Gate                    4     ticket window, best time, what to eat, say you are from Patna
 * securityGuard      Cyber Hub tower gate booth                       4     say walk-in interview, show ID, where to sign, which floor
 *
 * The other 112 people are keyed by their explicit id (collected from ./cast/*.js): about half have one step, half two.
 * Roles with no dialogue say a GREETINGS line. Extra fields beyond DIALOGUE.md: `site`, `difficulty` (1-5), optional `again` (a line for
 * repeat visits), `tutorial: true` + `place` on chaiwalaUncle. Lines are written by hand as [Devanagari, roman, English] (see ./kit.js).
 */
import chaiwalaUncle from './chaiwalaUncle.js';
import vadaPavWala from './vadaPavWala.js';
import taxiDriver from './taxiDriver.js';
import busConductor from './busConductor.js';
import trafficCop from './trafficCop.js';
import auntyWithSabzi from './auntyWithSabzi.js';
import cricketKid from './cricketKid.js';
import koliFisherwoman from './koliFisherwoman.js';
import dabbawala from './dabbawala.js';
import bollywoodHopeful from './bollywoodHopeful.js';
import bhelWala from './bhelWala.js';
import golaWala from './golaWala.js';
import balloonSeller from './balloonSeller.js';
import photographer from './photographer.js';
import priest from './priest.js';
import pilgrim from './pilgrim.js';
import coolie from './coolie.js';
import commuter from './commuter.js';
import tourist from './tourist.js';
import securityGuard from './securityGuard.js';
import * as darshini from './cast/darshini.js';
import * as lake from './cast/lake.js';
import * as lakeside from './cast/lakeside.js';
import * as temple from './cast/temple.js';
import * as transit from './cast/transit.js';
import * as street from './cast/street.js';
import * as vidhana from './cast/vidhana.js';
import * as city from './cast/city.js';
import * as techpark from './cast/techpark.js';
import * as outskirts from './cast/outskirts.js';
import * as laad from './cast/laad.js';

// Every other talkable person (docs/DELHI_CAST.md) has a dialogue keyed by their explicit placement id, collected from ./cast/*.js.
const CAST = Object.fromEntries([darshini, lake, lakeside, temple, transit, street, vidhana, city, techpark, outskirts, laad]
  .flatMap((m) => Object.values(m)).map((d) => [d.id, d]));

export const GREETINGS = [
  { text: 'अरे राहुल भाई, कैसे हो?', roman: 'Are Rahul bhai, kaise ho?', en: 'Hey Rahul brother, how are you?' },
  { text: 'नमस्ते राहुल!', roman: 'Namaste Rahul!', en: 'Hello, Rahul!' },
  { text: 'हाँ जी, कहाँ चले?', roman: 'Haan ji, kahaan chale?', en: 'Yes, where are you off to?' },
  { text: 'अभी थोड़ी जल्दी में हूँ, बाद में मिलते हैं।', roman: 'Abhi thodi jaldi mein hoon, baad mein milte hain.', en: 'In a bit of a hurry now, see you later.' },
  { text: 'आज मौसम मस्त है, है ना?', roman: 'Aaj mausam mast hai, hai na?', en: 'The weather is lovely today, isn\'t it?' },
  { text: 'सब बढ़िया? टेंशन मत ले!', roman: 'Sab badhiya? Tension mat le!', en: 'All good? Don\'t take tension!' },
  { text: 'चाय पी ली क्या, बेटा?', roman: 'Chai pi li kya, beta?', en: 'Had your chai yet, beta?' },
  { text: 'ओए, राहुल आ गया!', roman: 'Oye, Rahul aa gaya!', en: 'Oye, Rahul is here!' },
  { text: 'अभी टाइम नहीं है भाई, फिर बात करते हैं।', roman: 'Abhi time nahi hai bhai, phir baat karte hain.', en: 'No time right now, brother, let\'s talk later.' },
  { text: 'थोड़ा साइड दे दो, पाजी।', roman: 'Thoda side de do, paaji.', en: 'Give a little space, paaji.' },
  { text: 'संभलकर जाना, ट्रैफिक बहुत है।', roman: 'Sambhalkar jaana, traffic bahut hai.', en: 'Go carefully, there is a lot of traffic.' },
  { text: 'बोल भाई, क्या चाहिए?', roman: 'Bol bhai, kya chahiye?', en: 'Tell me brother, what do you need?' },
  { text: 'पेपर की तैयारी कैसी चल रही है? ऑल द बेस्ट!', roman: 'Paper ki taiyaari kaisi chal rahi hai? All the best!', en: 'How is the exam preparation going? All the best!' },
];

export default {
  chaiwalaUncle, vadaPavWala, taxiDriver, busConductor, trafficCop, auntyWithSabzi, cricketKid, koliFisherwoman,
  dabbawala, bollywoodHopeful, bhelWala, golaWala, balloonSeller, photographer, priest, pilgrim, coolie, commuter,
  tourist, securityGuard,
  ...CAST,
};
