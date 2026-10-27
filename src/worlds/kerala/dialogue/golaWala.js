// Tender-coconut and kulukki sarbath seller at Cherai beach.
import { dialogue as D, step as S } from './kit.js';

export default D('golaWala', {
  name: 'Sudhi Chettan', role: 'tender-coconut seller', site: 'Cherai beach, tender-coconut stall', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Thin, handlebar-moustached seller who hacks the top off a coconut with a machete and also shakes kulukki sarbath.',
  goal: 'Order a tender coconut, add a kulukki sarbath, and pay fifty rupees.',
  steps: [
    S('order', ['കരിക്ക്, കരിക്ക്! ഇളനീർ വേണോ മോളേ?', 'Karikku, karikku! Ilaneer veno mole?', 'Tender coconut! Want a coconut, dear?'],
      'Order one tender coconut.', ['Chetta, oru karikku tharoo.', 'ചേട്ടാ, ഒരു കരിക്ക് തരൂ.'],
      ['oru karikku venam chetta', 'karikku tharamo', 'chetta oru karikku', 'oru ilaneer tharoo', 'oru karikku please', 'ഒരു കരിക്ക് വേണം'],
      'order_tender_coconut', ['Ask for a tender coconut.', '"Karikku" = tender coconut.'],
      ['ദാ, വെട്ടി തരാം. നല്ല മധുരമാണ്!', 'Daa, vetti tharaam. Nalla madhuramaanu!', 'Here, I will cut it open. It is very sweet!'],
      ['എന്താ വേണ്ടത് മോളേ? കരിക്കോ?', 'Enthaa vendathu mole? Karikko?', 'What do you want, dear? A coconut?']),
    S('sarbath', ['കുലുക്കി സർബത്തും ഉണ്ട്. ഒരെണ്ണം വേണോ?', 'Kulukki sarbathum undu. Orennam veno?', 'We have kulukki sarbath too. Want one?'],
      'Say yes, one kulukki sarbath too.', ['Venam chetta, oru kulukki sarbath koodi.', 'വേണം ചേട്ടാ, ഒരു കുലുക്കി സർബത്ത് കൂടി.'],
      ['oru kulukki sarbath venam', 'kulukki sarbath tharoo chetta', 'sarbath koodi venam', 'athe oru kulukki sarbath', 'kulukki sarbath koodi tharamo', 'കുലുക്കി സർബത്ത് വേണം'],
      'add_kulukki_sarbath', ['Say yes, add a sarbath.', '"Kulukki sarbath" = shaken lime drink.'],
      ['കുലുക്കി തരാം! കസ്കസും നാരങ്ങയും കൂട്ടി.', 'Kulukki tharaam! Kaskasum naaranjayum kootti.', 'I will shake it! With basil seeds and lime.'],
      ['സർബത്ത് വേണോ വേണ്ടയോ?', 'Sarbath veno vendayo?', 'Sarbath, yes or no?']),
    S('pay', ['രണ്ടും കൂടി അമ്പത് രൂപ.', 'Randum koodi ambathu roopa.', 'Fifty rupees for both.'],
      'Pay fifty rupees.', ['Ithaa chetta, ambathu roopa.', 'ഇതാ ചേട്ടാ, അമ്പത് രൂപ.'],
      ['ambathu roopa ithaa', 'ithaa ambathu roopa chetta', 'ambathu roopa tharam', 'nanni chetta ithaa', 'ithaa chetta kaash', 'ഇതാ അമ്പത് രൂപ'],
      'pay_fifty_rupees', ['Hand over fifty rupees.', '"Ambathu" = fifty.'],
      ['നന്ദി മോളേ! ചെറായിയിലെ വെയിലിന് ഇത് തന്നെ നല്ലത്.', 'Nanni mole! Cheraayile veyilinu ithu thanne nallathu.', 'Thanks dear! This is just right for the Cherai sun.'],
      ['അമ്പത് രൂപ തരണം മോളേ.', 'Ambathu roopa tharanam mole.', 'Fifty rupees, please, dear.']),
  ],
  outro: ['വെയിലത്ത് തൊപ്പി വെച്ചോ, കേട്ടോ!', 'Veyilathu thoppi vecho, kettoo!', 'Wear your hat in the sun, okay!'],
  learned: [['oru karikku tharoo', 'give me a tender coconut'], ['kulukki sarbath koodi', 'a kulukki sarbath too'], ['ambathu roopa', 'fifty rupees']],
  again: ['ഒരു കരിക്ക് കൂടി വെട്ടട്ടെ?', 'Oru karikku koodi vettatte?', 'Shall I cut one more coconut?'],
});
