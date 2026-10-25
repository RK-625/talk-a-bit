# Jev classifier integration

Source: the user's whiteboard (2026-10-25) plus the TypeSafe docs (raw copy in `docs/jev/docs-raw.md`, fetched 2026-10-25).

## The user's design (whiteboard)
```
voice (Whisper Flow) -> text  ──>  CLASSIFIER: the reply + the step's choices/questions, Jev SDK, key in .env
                       ^                     │ correct  -> next state of the interaction, or end of interaction (success)
                       └──── wrong outcome ──┘ (retry with a hint, back to the text input)
Esc cancels the interaction at any time, even mid-turn.
```
Jev is used **only as a judge** of the player's reply. It never writes dialogue. NPC lines, hints and outcomes stay in our
dialogue files.

## What Jev is (from the docs)
- TypeSafe's "System One" model. One endpoint: `POST https://api.typesafe.ai/v1/systemone`, `Authorization: Bearer <key>`.
- Body: `{ model, state, questions }`. `state` = string | object | array (the content judged). `questions` = `{ <id>: question }`.
  Question types:
  - `noul`: `{ type:'noul', instructions, criteria?: { true, false } }` -> answer `{ noul: 0..1 }` (probability of yes; no confidence field).
    Docs' starting thresholds: yes >= 0.7, no <= 0.3, the middle is "unsure".
  - `choice`: `{ type:'choice', instructions, criteria: { option: description, ... } }` -> `{ choice, probabilities, confidence }`.
  - `score`: `{ type:'score', instructions, criteria: [level0, level1, ...] }` -> `{ score, legend, probabilities, confidence }`.
- All questions in one request are judged independently and in parallel against the same state; extra questions are almost free.
  Ask one atomic judgment per question and combine them in code. Reference parts of the state by backticked path, e.g. `` `player_reply` ``.
- Models: `jev-latest` (alias, now `jev-1.14.0`). The response's `model` field is the versioned id: log it.
- English is Jev's best language; other languages work less well (test, watch the probabilities). So give it romanised text too.
- Errors: 400/401/413/415/422/429/529. The SDK retries 429/529 with backoff.
- JS SDK: `npm install @typesafe-ai/sdk` (Node 22+). `new TypeSafeClient({ apiKey, timeout, retry? })`, `client.systemOne({ state, questions, model? })`,
  helpers `noul(instructions, criteria?)`, `choice(instructions, {opt: desc|null})`, `score(instructions, [levels])`.
  It refuses to run in a browser (good: the key must stay server side). Reads `TYPESAFE_API_KEY` by default; we pass `apiKey` explicitly.

## Our setup
- The key is in the project-root **`.env`** as `JEV_API_KEY` (git-ignored now). `JEV_API_URL` is gone (the SDK knows the URL).
  Optional `JEV_MODEL` (default `jev-latest`). Never log or send the key anywhere but TypeSafe.
- The proxy stays a Vite dev-server middleware (`vite.config.js`, `POST /api/classify`, `GET /api/classify/status -> { hasKey, model }`).
  Move the Jev logic into its own server-only module, e.g. `server/jev.js` (Node, imported only by vite.config.js), so it can also be
  used by an eval script and later by a real server.

## Request we send per reply (one call, speculative fan-out)
`state` (object):
```js
{
  setting: 'A language-practice game set in Mumbai. The player (Chotu, a chai-seller kid) is talking to a local.',
  npc: { name, role, persona },
  conversation_goal: goal,
  npc_line: { original: step.npc.text, romanised: step.npc.roman, english: step.npc.en },
  task_for_player: step.instruction,                 // English, what the player was asked to say
  expected_language: lang === 'hi' ? 'Hindi (romanised Hindi, Devanagari or Hinglish all count)' : 'English',
  example_good_replies: [step.suggest.roman, ...step.accept],   // examples, not an exhaustive list
  player_reply: reply,                               // as typed / dictated
  player_reply_romanised: <reply transliterated to Latin if it contains Devanagari, else omit>,
  note: 'The reply was dictated with speech-to-text: expect spelling mistakes, missing punctuation, mixed scripts.',
}
```
`questions`:
- `does_task`: noul. "Does `player_reply` do what `task_for_player` asks, as a reply to `npc_line`? Wording may differ from
  `example_good_replies`; the meaning must match." criteria true: "Says the thing the task asks for (same meaning as an example)",
  false: "Says something else, only part of it, the opposite, or nothing meaningful".
- `has_unrelated_content`: noul. "Does `player_reply` also contain words or sentences unrelated to this conversation?"
  (fixes the mock's leniency: "i like pizza ... chacha ek cutting dena" must not pass).
- `reply_language`: choice over `{ hindi: 'Hindi or Hinglish, any script', english: 'English only', other: 'Another language', none: 'Not language / gibberish' }`.
- `is_rude`: noul. "Is `player_reply` rude or insulting to the NPC?"

## Decision (in code, thresholds as named constants at the top)
```
valid  if does_task >= 0.7 and has_unrelated_content < 0.5 and language ok and is_rude < 0.7
language ok: lang 'hi' -> reply_language.choice is 'hindi' (or 'english' with confidence < 0.6); lang 'en' -> 'english' or 'hindi' with does_task >= 0.85
retry  otherwise, with reason one of: 'off_task' | 'partial' (does_task 0.3–0.7) | 'extra' | 'language' | 'rude' | 'empty'
```
Return `{ verdict, confidence: does_task, reason, model, answers }` (answers = the raw nouls/choices, for the dev overlay/console).
Empty or whitespace replies never call Jev (`retry`, reason `empty`).

## In the game
- The talk UI can use `reason` for a tiny extra line under the hint (English, kind): language -> "Try it in Hindi.";
  extra -> "Just the answer, nothing extra."; rude -> the NPC frowns, "Arre, tameez se!"; partial -> "Almost! Say the whole thing."
  The NPC's in-character `onRetry` line and the escalating hints stay as they are.
- While Jev is thinking: a small "…" scribble in the dialogue card, input disabled. **Esc cancels mid-request** (abort the fetch,
  ignore a late answer) and leaves the conversation, as on the whiteboard.
- Client timeout 8 s; on timeout/error fall back to the mock with a console warning (never block the player). SDK: timeout 6 s,
  1 retry.
- Dev console: log one line per verdict: `[jev] valid 0.93 (jev-1.14.0) does_task=.93 extra=.04 lang=hindi rude=.01`.

## Eval script
`scripts/jev-eval.mjs` (`npm run jev:eval`): loads `.env`, runs a fixed test set through `server/jev.js` and prints a table
(case, expected, verdict, nouls). At least: for chaiwalaUncle step 1 and 3 other NPCs incl. the English tourist: the suggested
phrase, an accepted variant, a Devanagari reply, a Hinglish paraphrase, a wrong answer, the pizza+answer case, pure English to a Hindi NPC,
gibberish, a rude reply, a misspelt Whisper-style reply. Use it to tune the thresholds; report the table.
