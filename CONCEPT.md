# Coach in My Pocket — Ladder Design Exercise

> Your Ladder coach is a **real person**. Their **AI twin** is with you the other 23 hours.
> Real + augmented = a coach who never leaves your side — for training *and* nutrition.

---

## The problem

Ladder's app is UI-heavy (feeds, logging tables, dashboards) and built, in its own words, for people
"already motivated to work out." Its rarest asset is **real human coaches** — but those coaches are
one-to-many and only present in recorded videos. The moments that actually make or break a habit happen
when the coach *isn't* there: the 12:40pm "what do I eat," the "I really don't feel like it today," the
tweaky knee on a Tuesday night.

## The concept

Give every member a coach that is **both real and augmented**:

- **The real coach** programs your plan, records real check-ins, and handles the human moments. The soul
  and the moat.
- **Her AI twin** — trained on her voice, style, and your shared history (with her consent) — is in your
  pocket 24/7. It answers at midnight, helps you eat, nudges you to move, and **hands the important stuff
  back to the real her.**

The UI recedes; the coach (real + augmented) becomes the interface. One relationship, all day, spanning
**workout and nutrition**.

## Why this is the right version

- **Honest about humans.** AI doesn't replace the coach — it scales her presence. That protects Ladder's
  moat and avoids the cold-bot trap.
- **Designed for the unmotivated.** The pocket coach lowers the bar ("15 minutes, just show up"). For a
  skeptic, *showing up* is the win — not a PR.
- **Both domains, all day.** It shows up exactly where life happens — especially food, which everyone has
  a daily, emotional relationship with.

## Design law

**Face for emotion · Voice for action · Text for proof.** A persistent, low-profile **coach presence**
is always one tap or one word away — that's the "in my pocket" feeling.

---

## Meet Remi (real) + Remi AI (augmented)

- **Remi** — a real coach: calm veteran with a captain's warmth. Tough enough to push, warm enough to
  trust. Appears as **recorded video messages** (the human moments).
- **Remi AI** — her twin: same voice and style, available instantly, always present (ambient aura +
  voice). Visibly **defers to the real Remi** for anything that needs a human.
- **Continuity is the spine:** what you do/say today changes what she gives you tomorrow — and she tells
  you so.

## The demo: "A day in your pocket"

A persistent coach presence threads every screen. ~75–90s.

**B0 · Cold open** — "Your coach. In your pocket. Always."

**B1 · Morning** *(real + augmented, up front)*
- Remi AI greets you, then plays a **real recorded message from human Remi**: *"Week 3, Rocky. Keep it
  simple — 15 minutes, I just want you to show up."* The combo is established immediately.

**B2 · Eat** *(the 24/7 value — replaces the nutrition logging maze)*
- 12:40pm. You ask *"what should I eat?"* → Remi AI helps from what's nearby / in your fridge, tied to how
  you moved this morning. A generated dish makes it crave-able. Logging happens invisibly.

**B3 · The handoff** *(why real+augmented is trustworthy)*
- You mention your knee. Remi AI: *"I won't guess on that — looping in Remi."* → the **real coach replies**
  (recorded) and your plan updates itself. Human judgment, AI presence.

**B4 · Evening** *(the loop)*
- She closes the day, references what happened, and adapts tomorrow — already done. The relationship never
  resets.

## Presence system

| State | Looks like | When |
|---|---|---|
| **Ambient** | Soft breathing aura + a persistent pocket dock | Always — "she's here" |
| **Voice** | Waveform + live captions | Mid-action (asking, logging) |
| **Face** | Full-screen / card video — *the real coach* | Human moments (morning note, handoff reply) |
| **Text** | One line / the "why" | Proof + record only |

## What we generate (fal + image tools)

1. **Remi's look** — portrait identity (done).
2. **Real coach videos** — talking-head, lip-synced messages (image + voice → Kling AI Avatar / OmniHuman).
3. **Remi AI voice lines** — greetings, food help, handoff, evening (TTS; voice-cloned for consistency).
4. **A generated dish image** for the Eat beat.

## Brand tokens (from the Figma)

- `Ladder Black #0E0E0E` · `Ladder White #FAFAFA`
- `Lemonade #E6FF00` (workout accent) · `Green Nutrition #54F46D` · `Vermillion #FF5349` (alerts)
- Heavy condensed uppercase display + clean sans body.

## Build approach

- **Stack:** Next.js + Tailwind + Framer Motion, in an iPhone frame, deployed to a shareable URL.
- Real audio/video playback; hero assets pre-generated so the Loom is flawless.
- **Scope:** one happy path, the four beats, canned user ("Rocky"). Depth over breadth.

## Deliverable

Shareable URL + a tight Loom by **Wednesday evening**.
