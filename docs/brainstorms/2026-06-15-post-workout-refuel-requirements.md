# Refuel — the post-workout check-in

_Design exercise 2 for Ladder · 2026-06-15_

## The problem

Ladder's training side is relational and rich: a coach, a team, a live session.
Nutrition logging sits off to the side as a dashboard people have to remember to
visit. Today Ladder tries to kickstart logging **passively** — the Nutrition home
shows a little squiggle arrow pointing at the `+` ("Tap + and Track Macros Your
Way"). That's a hope, not a trigger.

The workout itself is the strongest, most reliable habit Ladder owns. The moment
it ends is peak motivation and the user is already in the app. That is the cheapest
possible place to start a logging habit.

## The concept

A single Duolingo-style session-end screen, inserted right after the
`COMPLETE WORKOUT` rating screen and before the Ladder Wall:

1. **Rate** (existing screen) → 5 stars → `COMPLETE WORKOUT`.
2. **Refuel** (new) — one screen, one prompt ("What's fueled you today?"), three fat
   binary tiles: **Water · Protein · Meal**. Tap whatever applies, ~5 seconds, no
   amounts.
3. **Payoff** — today's **nutrition ring fills** and the **existing streak bumps**,
   with a short warm coach beat. One continuous daily relationship, not a second
   scorekeeper.

## Principles

- **Any log is a win.** Tapping one tile counts. Zero-friction by design.
- **Lowest rung of a ladder.** The binary tap kickstarts the habit. An optional
  "add detail" hands off to Ladder's _existing_ voice / photo / barcode logging for
  anyone who wants precision — we complement what's built, never compete.
- **Feed the existing streak.** Reuse the Nutrition week-ring + streak counter
  already in the app. No new scorekeeper. Ties back to exercise 1's morning streak.
- **Simple and delightful.** Tactile tile fills, satisfying motion, a single coach
  line. Closer to a Duolingo "ding" than a chatbot.

## Scope (first build)

Just the moment: **rate → 3 tiles → ring/streak payoff.** Tight and delightful.

- Standalone interactive prototype + a short case study, in the existing
  `ladder-design-exercise` repo, reusing the design system (PhoneFrame, tokens,
  streak, ScenePlayer).
- Out of scope for v1: the "add detail" handoff flow, the updated Nutrition home,
  amounts/quantities.

## Open / later

- Voiceover: keep v1 visual-first (Duolingo-style). Optionally add one short
  generated coach line at the payoff in a later pass.
- Whether tiles adapt to the session (e.g. a lower-body lift nudges protein).
- Copy pass on the prompt and the coach payoff line.
