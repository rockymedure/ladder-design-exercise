# Refuel — First Pass (Build Log)

_Design exercise 2 for Ladder · post-workout nutrition check-in._
_Companion to the requirements in [`../brainstorms/2026-06-15-post-workout-refuel-requirements.md`](../brainstorms/2026-06-15-post-workout-refuel-requirements.md)._

---

## What we built

A hands-on, tap-through prototype of the post-workout **Refuel** moment: rate the
session, tap whatever you've eaten, watch the existing nutrition streak bump. It's
a real coded prototype (Next.js + Tailwind + Framer Motion), not a mockup, so the
pacing and tactility of the moment are legible.

Three screens, one continuous flow:

1. **Rate** — a nod to Ladder's `Complete Workout` screen: real workout footage,
   tappable 1–5 stars, `COMPLETE WORKOUT` to advance.
2. **Check-in** *(new)* — one prompt ("What's fueled you today?") and three fat
   binary tiles: **Water · Protein · Meal**. Tap whatever applies; the CTA reacts
   live ("Not today" → "Log 2 and finish"). A quiet line hands off to richer
   voice/photo logging for anyone who wants precision.
3. **Payoff** — the streak ring fills, "Logged," and the **existing** nutrition
   streak bumps 3 → 4 days with today's dot popping in. One daily relationship, not
   a second scorekeeper.

---

## How to see it

Three surfaces, all on the shareable URL:

- **`/refuel`** — the case study: the gap, the moment (with the embedded tappable
  prototype), and the principles.
- **`/live`** — the prototype on its own, **app-style**. Edge-to-edge on phones,
  centered in a device on desktop, with app-like viewport meta (no pinch-zoom,
  theme color, Apple "web app capable") so it feels like a real app — and launches
  standalone if you Add to Home Screen on iOS. This is the "open it on your phone"
  link.
- The original day-with-Ladder demo still lives at `/` and `/play`.

---

## Decisions worth defending

- **Tap-through, not auto-play.** Exercise 1's beats auto-play with director
  controls. This moment is about *doing* the action, so it's fully hands-on — the
  prototype proves the five-second ritual by letting you feel it.
- **Any log is a win.** Tapping one tile counts. No amounts, no blank screen. Taps
  are reversible until you commit, matching "the goal is the ritual, not precision."
- **Feed the streak you already have.** The payoff reuses Ladder's nutrition
  week-ring + streak counter rather than inventing a new scorekeeper. Ties back to
  exercise 1's morning streak.
- **Visual-first, no audio for v1.** Kept it a Duolingo-style "ding," not a chatbot.
  A single generated coach line at the payoff is a deliberate later option.
- **Reused, never rebuilt.** Same `PhoneFrame`, `StatusBar`, tokens, and motion
  language as the day-with-Ladder demo. `/refuel`, `/live`, and the case study all
  render the exact same flow component.

---

## What broke, and the fix

- **`AnimatePresence mode="wait"` deadlock.** The first build sequenced the three
  screens through `AnimatePresence` with sibling conditionals. State flipped
  correctly (verified via a `data-phase` hook), but the exiting screen never fired
  `onExitComplete`, so the next screen never mounted — the flow looked frozen on the
  rating screen even though taps registered. Fix: drop `AnimatePresence` for phase
  changes and render the current phase directly with enter animations only. More
  robust for a tap-driven flow, and exit polish isn't needed when each screen is
  full-bleed.

---

## Open / next pass

- **iOS safe-area.** In standalone (Add to Home Screen) the bottom CTA sits close to
  the home indicator; add a `safe-area-inset-bottom` pad to bulletproof it.
- **The "add detail" handoff.** v1 only hints at voice/photo/barcode logging; build
  the actual handoff in a later pass.
- **Session-aware tiles.** Could adapt the suggestions to the workout (e.g. a
  lower-body lift nudges protein).
- **Copy + a coach line.** Polish the prompt and payoff copy; optionally add one
  short generated coach voice line at the payoff.
- **Real streak values.** The payoff uses placeholder week data; wire it to the real
  Figma nutrition-streak numbers.

---

## Loom walkthrough script (about 3 min)

_Two tabs ready: `/refuel` (case study) and `/live` (prototype, ideally mirrored from a
phone so the voice logging is real on camera). Warm and direct. Times are cumulative._

### 1. Pivot from round one to two, quick (0:00)
**On screen:** `/refuel` hero.
> "Quick round two. The feedback on round one was fair. It was hard to read my UI craft, and
> the concept sat too far from today's app. So I did the opposite. I took one real screen you
> ship today and made it better. This is Refuel."

### 2. Make nutrition logging easier post workout (0:20)
**On screen:** the goal section, before and after.
> "The goal is simple. Make nutrition logging easier right after a workout. Today it's a two
> line card wedged between your medal and your stats, easy to miss. I gave it its own beat.
> Rate the session, then one tap per thing you've had."

### 3. Approaches explored (0:50)
**On screen:** the approaches section.
> "I didn't land here first. I tried a few louder directions. An ambient waveform, slide to
> fill columns, photo rich rows, a compact tile grid. Each one taught me something, but they
> all added friction, vanity, or distance from Ladder's system. So they got cut."

### 4. Landed on (1:25)
**On screen:** the landed on section.
> "What shipped is calm, fast, and built in Ladder's own system. Binary by default, so one tap
> counts. Detail is there if you want it, never required. Rate first, three taps, expand for a
> slider or a picker, and a meal field you can just speak to."

### 5. Walkthrough (1:55)
**On screen:** switch to `/live` and use it for real.
> "Not a mockup. Let me use it."

- Tap a star, hit **Complete Workout**.
- Tap **Water**, drag the slider.
- Tap **Meal**, hit **Say it**, and speak a real meal out loud.

> "The meal field records my voice and parses it into a structured log. Live, not faked. The
> lowest effort rung that hands off to Ladder's real logging."

- Finish, show the payoff.

> "And it feeds the payoff you already have. The medal, the share, the stats, now with a quiet
> Refueled today."

### Close (2:40)
**On screen:** the closing statement.
> "Round one showed how far I'd stretch. This shows I'd rather take a screen millions use and
> make it sing. If we shipped it, I'd put it behind a flag for a cohort and watch seven day
> logging against control. Thanks for the second look."

**End, about 3:00.**

> **Tip:** if you can't mirror a phone, pre-record the voice meal moment on device and cut to
> it, so the speech to log step is clearly real.
