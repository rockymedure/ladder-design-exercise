# A Day with Ladder — Design Exercise

> **Less app. More relationship. All day.**
> Ladder becomes an always-on guide that carries your training and nutrition through the whole day,
> so the **relationship**, not the software, is the interface.

---

## The opportunity

Ladder is genuinely great at the workout, and the coach and team make it feel like yours. Two gaps
remain:

- **Nutrition feels separate.** Training and food live in different tabs, and different headspaces.
- **The day is unattended.** Workouts are scheduled; the choices between them are on you, alone.

The app is also **UI-heavy** (feeds, logging tables, dashboards), and the moments that actually decide
the day happen **between sessions**: the 1pm "what do I eat," the skip-it morning, the after-set
decision. No one is there for those.

## The concept

Meet **Ladder** — one always-on assistant, personalized by your plan and your history, voice-first and
ambient. It does the generous things the rigid UI can't, and it is the **bridge** that finally connects
strength training and nutrition inside a single relationship.

- **Voice for action** — Ladder speaks; you move. No menu-diving.
- **Text for proof** — the record, the macros, the plan, shown only when it helps.
- **Memory for trust** — every day compounds on the last; it never resets to zero.

A persistent, low-profile dock keeps Ladder one tap or one word away. That's the "in my pocket" feeling.

## Ladder is the sherpa, not the coach

Ladder's job is to **guide**, not to perform the coaching. During the work it goes quiet and hands the
room to the session, then picks you back up after. It knows the edge of its competence. This is the
honest, stronger model: an assistant that **defers** rather than a fake human that impersonates.

> We deliberately moved *away* from an "AI twin." Cloning the coach as a talking-head was uncanny, it
> eroded trust, and it cannibalized Ladder's moat. We even removed the human-coach character from the
> demo entirely, so the new thing — the relationship between **you and Ladder** — is unmistakable.

## The bet

**Ladder is alive.** Not a container for coaches and teams, but a guide that's genuinely with you:
aware of your biometrics, training stats, and nutrition logs, moving you easily between strength and
food so wellness stays top of mind all day.

---

## The day, beat by beat

A continuous day with one persistent Ladder presence. Each beat is a live, coded scene with generated
voice.

**B0 · Cold open** — "A day with Ladder."

**01 · Kickoff** *(7:02 AM)* — Mornings open on your **day**, not a message to answer. Ladder celebrates
a three-day streak, lays out how you'll move and eat, fits it to your real calendar, and places today's
workout on your home screen.

**02 · Handoff** *(1:00 PM)* — The workout **finds you**. Ladder pings your home screen; tap the widget
and you're in. Ladder lives outside the app, too.

**03 · Workout** *(1:02 PM)* — Ladder goes **quiet**. The real Ladder workout screen (reps, pace, weight)
runs the set; Ladder steps back, then returns the moment you finish.

**04 · Fuel & eat** *(1:46 PM)* — Training **decides dinner**. The set you just finished sets your
recovery fuel, turns into a meal from what's in your fridge, and Ladder walks you through cooking it.
Strength and nutrition on one thread. *(This is the bridge.)*

**05 · Reflect** *(9:30 PM)* — The relationship **remembers**. A quiet recap, and tomorrow already
adjusted before you ask.

## Cast

- **Maya (member)** — busy, motivated, the person Ladder is built for. Voice: "Matilda."
- **Ladder (the assistant)** — capable, warm, ambient (presence dock + voice). Voice: "Jessica,"
  deliberately its own. No fake face, ever.
- **Continuity is the spine** — what you do today changes what you get tomorrow, and Ladder tells you so.

## Presence system

| State | Looks like | When |
|---|---|---|
| **Ambient** | A persistent Ladder dock | Always — "Ladder's here" |
| **Speaking** | Waveform + live captions (labeled *Ladder*) | Mid-action (brief, fuel, recap) |
| **Quiet** | Dock recedes; the session UI leads | During the set — Ladder steps back |
| **Text** | One line / the "why" / the macros | Proof and record only |

## Brand tokens (matched to Ladder)

Pulled from Ladder's live site and the Figma file:

- `Ladder Black #0E0E0E` · `Ladder White #FAFAFA`
- `Volt #E6FF00` (the exact CTA green) · `Leaf #54F46D` (nutrition) · `Vermillion #FF5349` (alerts)
- Headlines: **heavy, extended, uppercase** (standing in for EK Modena Extended Heavy). Body: SF Pro.
- Fully-rounded volt pills with black uppercase labels; alternating black / near-white sections.

## What we generate (fal + tools)

1. **Ladder's voice lines** — every beat (fal · ElevenLabs Multilingual v2, voice "Jessica").
2. **Maya's replies** — voice "Matilda."
3. **The workout hero video** — image-to-video for the in-class moment.

## Build approach

- **Stack:** Next.js + Tailwind + Framer Motion, in an iPhone frame, deployed to a shareable URL.
- Real audio/video playback, paced by a custom line sequencer to the exact audio duration, so presence
  reads as presence.
- **Two surfaces:** the scrollable case study (`/`) and the full interactive day (`/play`).
- **Scope:** one happy path, five beats, one member (Maya). Depth over breadth.

## Deliverable

A shareable URL: a case-study page the Ladder team can scroll, with every beat playable in the phone,
plus the full day end to end at `/play`.
