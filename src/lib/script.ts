// "Coach in My Pocket" — a day with Remi (your human coach) + Ladder (the assistant).
// Real coach moments are recorded video messages. Ladder is the always-on assistant that
// scales every coach — and does the things the app's UI can't.

export const USER = { name: "Rocky", week: 3 };

export type Speaker = "ai" | "real" | "you";

export type Line = {
  id: string;
  text: string;
  ms: number;
  speaker: Speaker;
  accent?: "volt" | "leaf" | "ember";
};

// `ms` values match the exact generated audio durations (public/audio/*.mp3).
// speaker "ai" = Ladder (ElevenLabs "Jessica"). speaker "you" = Rocky (ElevenLabs "Matilda").
// speaker "real" = Remi (her voice lives in the recorded videos).
export const LINES = {
  // B1 — Morning
  amGreet: {
    id: "am-greet",
    text: "Morning, Rocky. Strong pull yesterday — that's three days straight now. Today's lighter: an easy push and a protein focus. You're booked till noon, so I'll fit training after six, and lunch in your 12:30 gap.",
    ms: 12251,
    speaker: "ai",
  },
  amNote: {
    id: "am-note",
    text: "And your coach Remi left you a note for week three.",
    ms: 2638,
    speaker: "ai",
  },
  amReal: {
    id: "am-real",
    text: "Week three, Rock. Keep it simple today — fifteen minutes, I just want you to show up. That's the whole job.",
    ms: 6648,
    speaker: "real",
  },
  amSuggest: {
    id: "am-suggest",
    text: "Remi's got you on an easy push today. The Sunrise crew is running a 12-minute mobility finisher — your shoulders would thank you. Want me to add it?",
    ms: 8725,
    speaker: "ai",
    accent: "volt",
  },
  amClose: {
    id: "am-close",
    text: "Either way, I'm right here. Start now, or after coffee?",
    ms: 3344,
    speaker: "ai",
  },

  // B2 — Eat
  eatYou: {
    id: "eat-you",
    text: "Hey Ladder — what should I eat?",
    ms: 2168,
    speaker: "you",
  },
  eatOffer: {
    id: "eat-offer",
    text: "You moved this morning, so let's get some protein in. Want ideas from nearby, or what's in your fridge?",
    ms: 5564,
    speaker: "ai",
    accent: "leaf",
  },
  eatFridge: {
    id: "eat-fridge",
    text: "What's in my fridge.",
    ms: 1384,
    speaker: "you",
  },
  eatPlan: {
    id: "eat-plan",
    text: "Eggs, spinach, that leftover rice. A six-minute high-protein rice bowl — 32 grams. Want the steps?",
    ms: 7184,
    speaker: "ai",
    accent: "leaf",
  },

  // B3 — The handoff
  hoYou: {
    id: "ho-you",
    text: "One thing — my knee's been bugging me on squats.",
    ms: 3370,
    speaker: "you",
  },
  hoAi: {
    id: "ho-ai",
    text: "I'm not going to guess on a knee. Let me loop in Remi — she should see this.",
    ms: 4911,
    speaker: "ai",
    accent: "volt",
  },
  hoReal: {
    id: "ho-real",
    text: "Saw your note on the knee. Swapped squats for step-ups this week and pulled the load back. We'll reassess Friday — don't push it.",
    ms: 7152,
    speaker: "real",
  },
  hoDone: {
    id: "ho-done",
    text: "Done — Remi updated your plan. I've got the rest.",
    ms: 3579,
    speaker: "ai",
    accent: "volt",
  },

  // B4 — Evening
  pmClose: {
    id: "pm-close",
    text: "Good day, Rocky. You showed up, and you ate well. That's the streak that matters.",
    ms: 5146,
    speaker: "ai",
  },
  pmLoop: {
    id: "pm-loop",
    text: "Remi softened tomorrow for the knee. Same time — I'll be here.",
    ms: 4206,
    speaker: "ai",
    accent: "volt",
  },
} satisfies Record<string, Line>;

export type SceneId = "coldopen" | "morning" | "eat" | "handoff" | "evening";

export const SCENES: { id: SceneId; label: string; time: string }[] = [
  { id: "coldopen", label: "Cold open", time: "" },
  { id: "morning", label: "Morning", time: "7:02 AM" },
  { id: "eat", label: "Eat", time: "12:41 PM" },
  { id: "handoff", label: "The Handoff", time: "6:18 PM" },
  { id: "evening", label: "Evening", time: "9:30 PM" },
];
