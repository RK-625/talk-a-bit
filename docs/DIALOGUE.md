# Talk-a-bit: conversations

**Product:** a desktop-only website game that helps introverts practise talking to people in the local language of each world.
In Mumbai, that means Hindi (Bambaiya-flavoured, everyday). You play Chotu, walk up to people, and they talk to you.
You answer by typing; the user dictates with Whisper Flow into the text field and presses Enter. A **classifier** (Jev, from TypeSafe AI)
decides whether your reply was a valid answer for that moment. If it was, the conversation moves on. If not, you retry with a hint.

**Desktop only.** Remove the touch joystick/jump UI and touch-specific code paths. Keep a single desktop quality level
(the `?quality=low` switch may stay as a dev/perf option).

## Flow
1. Walk near a talkable NPC (within ~3 units, roughly in front of Chotu). A small hand-drawn "बात करो / Talk [E]" bubble appears over them.
2. Press **E**. Movement stops, the NPC turns to Chotu, and the camera eases into a two-shot (over Chotu's shoulder, NPC in frame).
   The rest of the world keeps animating.
3. The NPC speaks their line: it is shown in the dialogue box and **spoken aloud** (Hindi TTS for local NPCs).
4. Below it, an **English instruction** says what to do ("Order one cutting chai."), plus a **suggested phrase** to say back
   (romanized Hindi, with Devanagari under it). The suggested phrase can be hidden with a toggle (H) for practice.
5. A text field is focused automatically. The player dictates/types and presses **Enter**. Game keys are disabled while it is focused.
6. The reply goes to the classifier with the context. Verdicts:
   - `valid`: brief positive feedback (a ✓ doodle), the NPC reacts, and we go to the next step (or the end).
   - `retry`: the NPC reacts in character ("Kya bola? Phir se bolo…") and the box shows a **hint** that gets more explicit per attempt
     (hint 1: nudge; hint 2: key word; hint 3: the full phrase). After 3 failed tries, the NPC helps and the step is accepted as "assisted".
7. When the goal is done: a short closing line, a small reward card (e.g. "Learned: *ek cutting dena* = give me one cutting chai")
   saved to a **phrasebook** (local storage), and the camera returns. **Esc** leaves a conversation at any time.

## Language per NPC
- Local Mumbai NPCs speak **Hindi** (Devanagari + romanized shown), everyday Mumbai register (bhai, kya re, chalega, bindaas…), polite where the role calls for it.
- Foreign NPCs (e.g. a tourist from abroad) speak **English**. Chotu helps them, which is English practice.
- The instruction and hints are always in English (the player's support language).

## Content schema (`src/worlds/mumbai/dialogue/*.js`)
```js
export default {
  id: 'chaiwalaUncle',             // matches an NPC placement id or role
  name: 'Raju Chacha', role: 'chaiwalaUncle',
  lang: 'hi',                      // 'hi' | 'en'
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Gruff but kind tapri owner, has known Chotu forever.',
  goal: 'Ask Raju Chacha for two cutting chai for the bench.',
  steps: [
    {
      id: 'greet',
      npc: { text: 'अरे छोटू! आज देर से आया? क्या चाहिए?', roman: 'Arre Chotu! Aaj der se aaya? Kya chahiye?', en: 'Hey Chotu! Late today? What do you need?' },
      instruction: 'Say sorry for being late and ask for two cutting chai.',
      suggest: { roman: 'Sorry chacha, do cutting dena.', text: 'सॉरी चाचा, दो कटिंग देना।' },
      accept: ['do cutting dena', 'do cutting chai chahiye', 'chacha do chai', 'two cutting please'], // examples for the classifier
      intent: 'apologise_and_order_two_cutting',
      hints: ['Start with "sorry".', 'Two = "do". Cutting chai = "cutting".', 'Say: "Sorry chacha, do cutting dena."'],
      onValid: { text: 'चल ठीक है, बैठ।', roman: 'Chal theek hai, baith.', en: 'Okay fine, sit.' },
      onRetry: { text: 'क्या? ज़ोर से बोल।', roman: 'Kya? Zor se bol.', en: 'What? Say it louder.' },
    },
  ],
  outro: { text: '…', roman: '…', en: '…' },
  learned: [{ roman: 'do cutting dena', en: 'give two cutting chai' }],
};
```

## Classifier contract (`src/game/classifier.js`)
```js
classify({ worldId, npcId, lang, persona, goal, step: { id, intent, instruction, npc, suggest, accept }, attempt, reply })
  -> Promise<{ verdict: 'valid' | 'retry', confidence?: number, reason?: string }>
```
- Implementations: `jev` (real; called through a server proxy so the API key never ships to the browser: a Vite dev-server middleware
  at `POST /api/classify` that reads the key from `.env.local`, which is git-ignored) and `mock` (local fallback: normalized fuzzy
  match against `accept` + `suggest`, tolerant of romanized/Devanagari spelling and Whisper-style punctuation).
- Choose with `?classifier=mock|jev` (default: jev if the server reports a key, otherwise mock). Timeouts and errors fall back to mock with a
  console warning; never block the player.

## Voice
Browser `speechSynthesis` with a `hi-IN` voice for Hindi (and `en-IN`/`en-GB` for English NPCs). Pick the best available voice and
handle async voice loading. If no Hindi voice exists, still show the text and log a warning. Use per-NPC rate/pitch. Keep it behind a
`speak(text, {lang, voice})` module so a better TTS can replace it later.

## Look
Everything in the ballpoint style: the dialogue box is a cream paper card with a wobbly ink border (SVG or canvas border, no image files),
a handwritten Latin font plus a Devanagari font from Google Fonts (e.g. "Patrick Hand"/"Gaegu" + "Tiro Devanagari Hindi"/"Kalam"),
the NPC name as a little tag, a speaking-doodle animation, and the input field styled like a lined notebook strip.
