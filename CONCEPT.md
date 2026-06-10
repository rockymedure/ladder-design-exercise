# Coach in My Pocket — Ladder Design Exercise

> Your coach is a **real person**. **Ladder** — the assistant — is with you the other 23 hours.
> Human coach + Ladder = a coach who never leaves your side, for training *and* nutrition.

---

## The problem

Ladder's app is UI-heavy (feeds, logging tables, dashboards) and built, in its own words, for people
"already motivated to work out." Its rarest asset is **real human coaches** — but those coaches are
one-to-many and only present in recorded videos. The moments that actually make or break a habit happen
when the coach *isn't* there: the 12:40pm "what do I eat," the "I really don't feel like it today," the
tweaky knee on a Tuesday night.

## The concept

Don't clone the coach. **Give every member an assistant that carries the coach with them.**

- **The human coach (Remi)** programs your plan, records real check-ins, and handles the human moments.
  The soul and the moat. She is never impersonated.
- **Ladder** — one app-wide assistant, personalized by *your* coach's plan and *your* shared history —
  is in your pocket 24/7. It answers at midnight, helps you eat, nudges you to move, and **hands the
  important stuff back to your real coach.**

The UI recedes; the relationship becomes the interface. One coach, one assistant, all day, spanning
**workout and nutrition**.

## Why an assistant, not an AI twin

We deliberately moved *away* from cloning the coach into an "AI twin." An assistant is the stronger model:

- **Honest.** Ladder never pretends to be your coach. When the human voice matters, it's actually Remi —
  on video, in her own words. No uncanny impersonation, no eroded trust.
- **Protects the moat.** Coaches stay the irreplaceable human layer. Ladder scales their *presence*, not
  their identity — so coaches do what only they can, and Ladder covers the in-between for everyone.
- **One assistant, infinitely personalized.** A single assistant the whole company can improve, that adapts to
  each member through their coach's plan and their own history. Scale every coach without diluting any.
- **A clearer design problem.** "Build a great assistant that defers to a human" is honest and shippable.
  "Build a convincing fake human" is neither.

## Ladder's superpower: do what the UI can't

Because Ladder is a relationship, not a screen, it can reach past the rigid app:

- **Borrow across teams.** *"The Sunrise crew is running a 12-min mobility finisher today — want me to add
  it?"* The structured plan UI would never surface another team's work. Ladder can.
- **Adapt on the fly.** Swap a movement, soften tomorrow after a bad night, slot in something special —
  without making you navigate menus.
- **Bring the right human in.** Ladder knows the edge of its competence and escalates to your coach.

This is where Ladder scales every coach: it delivers the flexible, generous moves a limited UI can't afford.

## Design law

**Face for emotion · Voice for action · Text for proof.** Faces are reserved for **real humans** (the
coach). Ladder is **voice + ambient presence** — never a fake face. A persistent, low-profile dock keeps
Ladder one tap or one word away — that's the "in my pocket" feeling.

---

## Cast

- **Remi (human coach)** — calm veteran with a captain's warmth. Tough enough to push, warm enough to
  trust. Appears as **recorded video messages** (the human moments). Voice: her own.
- **Ladder (the assistant)** — capable, warm, always present (ambient aura + voice, distinct from any
  coach's voice). Visibly **defers to the human coach** for anything that needs judgment.
- **Continuity is the spine:** what you do/say today changes what you get tomorrow — and Ladder tells you so.

## The demo: "A day in your pocket"

A persistent Ladder presence threads every screen. ~75–90s.

**B0 · Cold open** — "Your coach Remi, scaled by Ladder — with you all day."

**B1 · Morning** *(human + assistant, up front)*
- Ladder greets you, then plays a **real recorded message from Remi**: *"Week 3, Rocky. Keep it simple — 15
  minutes, just show up."* Then Ladder does the **beyond-the-UI** move: offers the Sunrise crew's mobility
  finisher as a cross-team add-on — Remi's plan untouched.

**B2 · Eat** *(the 24/7 value — replaces the nutrition logging maze)*
- 12:40pm. You ask *"what should I eat?"* → Ladder helps from what's in your fridge, tied to how you moved
  this morning. A generated dish makes it crave-able. Logging happens invisibly.

**B3 · The handoff** *(why human + assistant is trustworthy)*
- You mention your knee. Ladder: *"I won't guess on a knee — looping in Remi."* → the **real coach replies**
  (recorded) and your plan updates itself. Human judgment, assistant presence.

**B4 · Evening** *(the loop)*
- Ladder closes the day, references what happened, and notes Remi softened tomorrow — already done. The
  relationship never resets.

## Presence system

| State | Looks like | When |
|---|---|---|
| **Ambient** | Soft breathing aura + a persistent Ladder dock | Always — "Ladder's here" |
| **Voice** | Waveform + live captions (labeled *Ladder*) | Mid-action (asking, logging) |
| **Face** | Full-screen / card video — *the real coach* | Human moments (morning note, handoff reply) |
| **Text** | One line / the "why" | Proof + record only |

## What we generate (fal + image tools)

1. **Remi's look** — portrait identity (done).
2. **Real coach videos** — talking-head, lip-synced messages from Remi (image + voice → OmniHuman).
3. **Ladder's voice lines** — greeting, cross-team suggestion, food help, handoff, evening (fal ·
   ElevenLabs Multilingual v2, voice "Jessica" — deliberately distinct from any coach).
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

Shareable URL + a tight Loom.
