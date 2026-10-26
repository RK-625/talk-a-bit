// Fisherwoman at the quay, beside the kattumaram.
import { dialogue as D, step as S } from './kit.js';

export default D('koliFisherwoman', {
  name: 'Mariyamma', role: 'fisherwoman', site: 'Fort St. George quay, by the fishing boats', diff: 3,
  voice: { rate: 1.05, pitch: 1.05 },
  persona: 'Round, sharp-tongued fisherwoman with a big laugh and a basket of fish on her head, tending her catch beside the kattumaram and calling out the price.',
  goal: 'Ask the fish price per kilo, bargain a little, and buy half a kilo.',
  steps: [
    S('price', ['மீனு மீனு! இன்னைக்கு வஞ்சரம் ஃப்ரெஷ்! வாங்கிக்கோங்க!', 'Meenu meenu! Innaikku vanjaram fresh! Vaangikkonga!', 'Fish, fish! Fresh seer fish today! Buy some!'],
      'Ask the price of the fish per kilo.', ['Akka, meen kilo evvalavu?', 'அக்கா, மீன் கிலோ எவ்வளவு?'],
      ['meen kilo evvalavu akka', 'akka meen kilo evvalavu', 'kilo evvalavu akka', 'meen vilai evvalavu', 'vanjaram kilo evvalavu', 'மீன் கிலோ எவ்வளவு', 'அக்கா கிலோ எவ்வளவு'],
      'ask_fish_price', ['Ask the price.', '"Kilo evvalavu?" = how much a kilo?', 'Say: "Akka, meen kilo evvalavu?"'],
      ['கிலோ ரெண்டு நூறு ரூபா தாம்மா.', 'Kilo rendu nooru rubaa thaammaa.', 'It is just two hundred rupees a kilo, dear.'],
      ['என்னம்மா கேட்ட? அலை சத்தத்துல கேக்கல.', 'Ennammaa ketta? Alai saththathula kekkala.', 'What did you ask, dear? I could not hear over the waves.']),
    S('bargain', ['கடல்ல இருந்து இப்பதான் வந்துச்சு. ரெண்டு நூறுதான்.', 'Kadalla irundhu ippadhaan vandhuchu. Rendu noorudhaan.', 'It just came from the sea. Two hundred only.'],
      'Bargain a little: ask her to reduce it.', ['Konjam kammi pannunga akka.', 'கொஞ்சம் கம்மி பண்ணுங்க அக்கா.'],
      ['konjam kammi pannunga akka', 'kammi pannunga akka', 'konjam kuraichukkonga akka', 'konjam kammiya kudunga', 'vilai kammi pannunga', 'கொஞ்சம் கம்மி பண்ணுங்க', 'கொஞ்சம் குறைங்க அக்கா'],
      'bargain_fish_price', ['Ask for a lower price.', '"Kammi" = less. "Pannunga" = please do.', 'Say: "Konjam kammi pannunga akka."'],
      ['ஹா ஹா! சரி, உனக்காக நூத்தம்பது ரூபா.', 'Haa haa! Sari, unakkaaga noothambadhu rubaa.', 'Ha ha! Okay, for you, a hundred and fifty rupees.'],
      ['கம்மியா வேணுமா, வேணாமா? சொல்லும்மா.', 'Kammiyaa venumaa, venaamaa? Sollummaa.', 'Want it cheaper or not? Say it, dear.']),
    S('buy', ['நூத்தம்பது ரூபா கிலோ. எவ்வளவு வேணும்?', 'Noothambadhu rubaa kilo. Evvalavu venum?', 'A hundred fifty a kilo. How much do you want?'],
      'Ask for half a kilo.', ['Arai kilo kudunga akka.', 'அரை கிலோ கொடுங்க அக்கா.'],
      ['arai kilo kudunga akka', 'arai kilo kudunga', 'arai kilo venum akka', 'half kilo kudunga akka', 'akka arai kilo podunga', 'அரை கிலோ கொடுங்க', 'அரை கிலோ வேணும் அக்கா'],
      'buy_half_kilo_fish', ['Say how much you want.', 'Half = "arai". Kilo = "kilo".', 'Say: "Arai kilo kudunga akka."'],
      ['இந்தா கண்ணு, பிரெஷ் மீனு. வீட்ல குழம்பு வெச்சு சாப்பிடு!', 'Indhaa kannu, fresh meenu. Veetla kuzhambu vechchu saappidu!', 'Here, dear, fresh fish. Make a curry and eat well!'],
      ['எவ்வளவு வேணும்னு சொல்லுங்க, ஈ மொய்க்குது.', 'Evvalavu venumnu sollunga, ee moikkudhu.', 'Tell me how much, the flies are gathering.']),
  ],
  outro: ['மறுபடி வாங்கம்மா, நண்டு கூட இருக்கு நாளைக்கு!', 'Marubadi vaangammaa, nandu kooda irukku naalaikku!', 'Come again, dear, I will have crab tomorrow too!'],
  learned: [['kilo evvalavu?', 'how much per kilo?'], ['konjam kammi pannunga', 'please reduce it a little'], ['arai kilo kudunga', 'give me half a kilo']],
  again: ['அம்மா, இன்னும் மீன் வேணுமா?', 'Ammaa, innum meen venumaa?', 'Dear, want more fish?'],
});
