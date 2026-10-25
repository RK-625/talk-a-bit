/**
 * Mumbai dialogues. Default export is keyed by the NPC ROLE (the world's people have no per-person placement ids;
 * `createNPC(role, ...)` is the stable key, and every NPC of that role shares the dialogue).
 *
 * id (= role)        site                                   diff  goal
 * ------------------ -------------------------------------- ----- ------------------------------------------------------------
 * chaiwalaUncle      Tapri (spawn)  [TUTORIAL]               1    order one cutting chai, answer biscuit, say thanks
 * vadaPavWala        Vada pav stall                          1    order 2 vada pav, less spicy chutney, pay Rs 30
 * taxiDriver         Parked kaali-peeli taxi, Fort           2    ask if he goes to CST, ask for the meter, ask the fare
 * busConductor       BEST bus stop, Fort                     2    ticket to Churchgate, ask the price, pay Rs 15
 * trafficCop         Road junction, Fort                     2    ask the way to the Gateway, ask if far, thank him
 * auntyWithSabzi     Footpaths/promenade (walker)            2    offer to carry her bag, give name, ask where to
 * cricketKid         Gully cricket, the chowk                2    ask to join the game, choose to bat, say ready
 * koliFisherwoman    Quay by the boats, Gateway harbour      3    ask fish price, bargain a little, buy half a kilo
 * dabbawala          Tiffin cycle, Fort                      3    ask permission, ask how he never mixes up tiffins, praise
 * bollywoodHopeful   Film poster wall, the chowk             3    compliment his pose, ask which film, wish luck
 * bhelWala           Juhu beach bhel stall                   3    order bhel, less spicy no onion, pay Rs 40
 * golaWala           Juhu beach gola stall                   3    order kala khatta gola, extra sweet, pay Rs 20
 * balloonSeller      Gateway plaza                           3    ask the price, buy a red balloon, say it is for a child
 * photographer       Tripod at the Gateway                   3    ask for a photo, ask when ready, agree to return
 * priest             Temple                                  3    greet respectfully, ask the festival, ask for prasad
 * pilgrim            Haji Ali causeway                       4    greet, ask when the causeway closes with the tide, thank
 * coolie             CST                                     4    ask which platform for Pune, ask where it is, thank
 * commuter           Local train station / CST               4    ask if train goes to Borivali, fast or slow, next fast
 * tourist  (EN)      Gateway of India                        4    help find the Elephanta ferry, duration, recommend vada pav
 * securityGuard      Antilia gate booth                      5    politely ask whose building, ask to look in, accept no
 *
 * Every talkable cast member now has their own dialogue (45 more, keyed by explicit id, see ./cast/). Roles below only matter for
 * non-cast extras; the old note follows. Roles in the world without a dialogue (ambient): newspaperVendor, collegeStudent, jogger, beachKid, bhuttaSeller,
 * coconutSeller, officeGoer, ladiesCommuter, watchman, sweeper, doorman, studentWithBooks, bookSeller, chanaSeller, citizen, couple.
 * Those can use GREETINGS (random line when the player presses E).
 *
 * Extra fields beyond DIALOGUE.md: `site`, `difficulty` (1-5), and `tutorial: true` on chaiwalaUncle.
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
import * as chowk from './cast/chowk.js';
import * as south from './cast/south.js';
import * as places from './cast/places.js';
import * as street from './cast/street.js';
import * as pass4Chowk from './cast/pass4-chowk.js';
import * as pass4Fort from './cast/pass4-fort.js';
import * as pass4Coast from './cast/pass4-coast.js';
import * as pass4Fillers from './cast/pass4-fillers.js';

// Every other talkable person (docs/CAST.md) has a dialogue keyed by their explicit placement id. They live in ./cast/*.js
// (each file exports several dialogues built with ./cast/kit.js); collecting them here keeps one source of truth.
const CAST = Object.fromEntries([chowk, south, places, street, pass4Chowk, pass4Fort, pass4Coast, pass4Fillers].flatMap((m) => Object.values(m)).map((d) => [d.id, d]));

export const GREETINGS = [
  { text: 'अरे छोटू! कैसा है?', roman: 'Arre Chotu! Kaisa hai?', en: 'Hey Chotu! How are you?' },
  { text: 'नमस्ते बेटा!', roman: 'Namaste beta!', en: 'Hello, child!' },
  { text: 'क्या रे, कहाँ जा रहा है?', roman: 'Kya re, kahan ja raha hai?', en: 'Hey, where are you off to?' },
  { text: 'जल्दी में हूँ बेटा, फिर मिलते हैं।', roman: 'Jaldi mein hoon beta, phir milte hain.', en: 'I am in a hurry, child, see you later.' },
  { text: 'आज बड़ी गर्मी है ना?', roman: 'Aaj badi garmi hai na?', en: 'It is very hot today, isn\'t it?' },
  { text: 'सब बढ़िया, छोटू?', roman: 'Sab badhiya, Chotu?', en: 'All good, Chotu?' },
  { text: 'चाय पी ली क्या?', roman: 'Chai pi li kya?', en: 'Did you have your tea?' },
  { text: 'अरे वाह, छोटू आया!', roman: 'Arre wah, Chotu aaya!', en: 'Oh wow, Chotu is here!' },
  { text: 'अभी टाइम नहीं है, बेटा।', roman: 'Abhi time nahi hai, beta.', en: 'I have no time right now, child.' },
  { text: 'ज़रा साइड दे, भाई।', roman: 'Zara side de, bhai.', en: 'Give a little space, brother.' },
  { text: 'संभलकर जाना, बहुत भीड़ है।', roman: 'Sambhalkar jaana, bahut bheed hai.', en: 'Go carefully, it is very crowded.' },
  { text: 'हाँ बोल, क्या बात है?', roman: 'Haan bol, kya baat hai?', en: 'Yes, tell me, what is it?' },
  { text: 'चलता हूँ, बाद में बात करते हैं।', roman: 'Chalta hoon, baad mein baat karte hain.', en: 'I am off, we will talk later.' },
];

export default {
  chaiwalaUncle, vadaPavWala, taxiDriver, busConductor, trafficCop, auntyWithSabzi, cricketKid, koliFisherwoman,
  dabbawala, bollywoodHopeful, bhelWala, golaWala, balloonSeller, photographer, priest, pilgrim, coolie, commuter,
  tourist, securityGuard,
  ...CAST,
};
