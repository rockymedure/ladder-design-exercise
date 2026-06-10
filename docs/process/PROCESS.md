# A Day with Ladder — Process & Reference

*How this concept was built, the decisions behind it, and where it landed.*
*A companion to [`CONCEPT.md`](../../CONCEPT.md) and the live prototype.*

---

## The brief, and how I read it

The exercise asked to **improve or re-imagine 1–2 screens/flows** of the Ladder app and demonstrate
"visual craft" and being a "true builder." Rather than reskin existing screens, I treated the brief as
a question: *what is Ladder's most valuable, least-scaled asset, and how do we put it everywhere?*

The answer was **the coaching relationship**. Today the coach lives inside recorded video and a
UI-heavy app (feeds, logging tables, dashboards) built, in its own words, for people "already
motivated." The habit-making moments happen **between screens**, when no one is there. So instead of
polishing a dashboard, I built the thing the dashboard can't be: **an assistant that's with you all day,
for training _and_ nutrition.**

This is a coded, interactive prototype (Next.js) with **real generated voice**, not static mockups,
because the whole idea is about presence and pacing, which a flat comp can't show.

---

## The thinking, and the pivots

The strongest part of this exercise was throwing away good work twice when a better idea showed up.

1. **UI polish → relationship.** First instinct was to elevate the live-workout and nutrition screens.
   But the app is *already* UI-heavy. The real opportunity was **less UI, not a prettier dashboard**:
   an agent that lives in the moments between screens.

2. **AI twin → assistant.** I first cloned the coach as a talking-head **twin** (generated voice and
   video). It was uncanny, it eroded trust, and it cannibalized Ladder's moat. An assistant that
   **defers** to humans is the honest and stronger model. So Ladder became a guide with its own voice
   and no face.

3. **Coach character → you and Ladder.** I even removed the human-coach character from the demo, so the
   genuinely new thing — the relationship between **you and Ladder** — is unmistakable. Ladder is the
   sherpa: it gets you in, goes quiet during the work, and picks you back up after.

4. **The bridge.** The sharpest articulation of value: Ladder connects **strength training and
   nutrition** on one thread. The set you just finished decides your recovery fuel, which becomes a
   meal, which Ladder walks you through. That seam is where the leverage is.

5. **Mornings open on the day.** The morning briefs you on how you'll move and eat, celebrates the
   streak, and fits to your real calendar, then places the workout on your home screen so it finds you
   later. Plan → place it → go.

> Design law that fell out of this: **Voice for action · Text for proof · Memory for trust.**
> Ladder is voice + ambient presence, never a fake face.

---

## The product, in one line

**Less app. More coach. All day.** Ladder is an always-on assistant that carries your training and
nutrition through the whole day, and does the generous things the app's UI can't afford.

---

## How it's built (the generative pipeline)

Everything in the demo is real playback, not faked:

| Layer | Tool | What it does |
|---|---|---|
| **App** | Next.js + Tailwind + Framer Motion | iPhone-framed, scene-based interactive prototype |
| **Ladder's voice** | fal · ElevenLabs Multilingual v2 (voice `Jessica`) | Every Ladder line, in a voice that's its own |
| **Member's voice** | fal · ElevenLabs Multilingual v2 (voice `Matilda`) | Maya's spoken replies |
| **Workout hero** | fal · image-to-video | The in-class moment and the home-screen widget |
| **Pacing** | `useLineSequence` | Paces each beat to the exact measured audio duration |
| **Design** | Ladder tokens + Nutrition kit | The real components, not lookalikes |

The sequencer keeps voice, captions, and visuals in sync. When Ladder is mid-action it speaks with an
ambient presence dock; during the set it goes quiet and the session UI leads.

---

## The day, beat by beat

A single continuous day. Each beat is a live scene in the prototype, playable on its own from the case
study and end to end at `/play`.

- **B0 · Cold open** — "A day with Ladder."
- **01 · Kickoff** *(7:02 AM)* — streak celebration, the day ahead (move + eat, calendar-aware), and the
  workout placed on the home screen.
- **02 · Handoff** *(1:00 PM)* — the home-screen widget pings at go-time; one tap into the work.
- **03 · Workout** *(1:02 PM)* — the real Ladder workout screen runs the set; Ladder goes quiet, then
  returns when you finish.
- **04 · Fuel & eat** *(1:46 PM)* — the bridge: recovery fuel → a meal from your fridge → the steps to
  cook it, on Ladder's Nutrition components.
- **05 · Reflect** *(9:30 PM)* — a recap, and tomorrow already adjusted. The relationship remembers.

> Screens: the live prototype is the source of truth. Stills are deferred and will be recaptured from
> the final flow before the team review.

---

## How we present it

Two surfaces, both shipped to a shareable URL, built to feel like Ladder's own site (matched to
joinladder.com and the Figma: black/near-white sections, heavy extended uppercase headlines, volt-green
pills, SF Pro body):

- **`/` — the case study.** A scrollable page: the opportunity, the concept, the day beat by beat (each
  with a **playable phone**), the honest pivots, the pipeline, the bet, and how I'd validate it.
- **`/play` — the full day.** The complete interactive prototype, end to end, with director controls.

---

## Decisions worth defending

- **Assistant, not AI twin.** Honesty over illusion. Protects the human coaching layer; no fake face.
- **Ladder steps back during the work.** A sherpa that knows when to be quiet earns trust.
- **Strength ↔ nutrition on one thread.** The bridge is the differentiated bet, not a second tab.
- **Lead mornings with the day ahead.** Respect the user's time and calendar before anything else.
- **Real assets, real pacing.** A working prototype with generated voice, so the *feeling* of presence
  is legible — the point a static mock can't make.
- **Reused, never rebuilt.** The case study embeds the exact same phone and scenes as the live demo.

## Open items

- Recapture stills from the final five-beat flow for the leave-behind.
- Harden the sequencer for flawless pacing in any environment (a fresh load and production build pace
  correctly; dev hot-reload can drift).
- Record a short walkthrough Loom to accompany the URL.
