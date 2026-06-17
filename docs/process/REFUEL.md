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

## Loom walkthrough script (3–4 min)

_Record over the live deliverable. Two tabs ready: `/refuel` (case study) and `/live`
(prototype, ideally mirrored from a phone so the voice meal logging is real on camera).
Aim for warm and direct, not salesy. Times are cumulative._

### 0:00 — Open on the feedback (15s)
**On screen:** `/refuel` hero.
> "Hey — quick round two. The note I got back on the first pass was fair: it was hard to
> read my actual UI craft, and the concept lived a long way from today's app. So instead of
> defending that, I did the opposite — I took one real screen you ship right now and leveled
> it up. This is Refuel."

### 0:15 — The overlooked moment / before (35s)
**On screen:** scroll to the **Before → After** section. Point at the buried fuel card.
> "Here's the moment. You finish a Ladder workout — peak motivation, already in the app — and
> logging what you ate is *this*: a two-line card, 'Get your calories right,' wedged between
> your medal and your stats, next to a clunky entry menu. The single best moment to build a
> nutrition habit, treated as an afterthought."

**On screen:** pan to the After phone.
> "So I promoted it into its own post-workout beat. Same flow, same design system — just given
> the room it deserves, and wired to actually kickstart logging."

### 0:50 — The craft, state by state (50s)
**On screen:** scroll the **Designed down to the state** section, pausing on each phone.
> "This is where I wanted the craft to be legible. It's all built in Ladder's own system —
> the EK display type, the leaf accent, the real Complete Workout payoff. Every state is
> designed, not implied."
>
> "Rate first, full-bleed. Then one screen, three taps — Water, Protein, Meal — binary by
> default, so tapping one tile already counts. Want precision? A tile expands in place: a
> stepped water slider, a protein picker. And the meal field — you just say it."

### 1:40 — Tap the live prototype (70s)
**On screen:** switch to `/live` (or the mirrored phone). Tap through it for real.
> "And this isn't a mockup — let me actually use it."

- Tap a star, hit **Complete Workout**.
- Tap **Water**, drag the slider to show the steps.
- Tap **Meal**, hit **Say it**, and speak a real meal out loud.

> "The meal field records my voice and parses it with Whisper and GPT into a structured log —
> live, not faked. That's the whole bet: the lowest-effort rung on the ladder. One tap to form
> the habit, voice when you want detail — and it hands off to Ladder's existing logging instead
> of replacing it."

- Finish → show the payoff.

> "And it feeds the payoff you already have — the medal, the share, the stats — now with a quiet
> 'Refueled today.' One relationship, not a second scorekeeper."

### 2:50 — If we shipped it (30s)
**On screen:** scroll to the **assumptions / validation** band.
> "If we shipped it, here's what I'd be betting on and how I'd know — the big one being that
> attaching the first log to the workout lifts logging rate. I'd instrument the existing card,
> ship Refuel behind a flag to a cohort, and compare seven-day nutrition-log rate against
> control. Cheapest real test first."

### 3:20 — Close on the philosophy (25s)
**On screen:** the closing statement.
> "Round one was me showing how far I'd stretch. This is me showing I'd rather take a screen
> millions already use and make it sing — small, shippable, measurable moves that compound.
> Innovating off a working system isn't the consolation prize; it's the craft I want to do every
> day. Thanks for the second look."

**End.** (~3:45)

> **Tip:** if you can't mirror a phone, pre-record the voice meal moment on device and cut to it,
> so the speech-to-log step is unmistakably real rather than narrated.
