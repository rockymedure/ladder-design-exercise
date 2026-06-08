// "Coach in My Pocket" — a day with Remi (real) + Remi AI (augmented).
// Real coach moments are recorded video messages; the AI twin is the always-on voice.

export const USER = { name: "Rocky", week: 3 };

export type Speaker = "ai" | "real" | "you";

export type Line = {
  id: string;
  text: string;
  ms: number;
  speaker: Speaker;
  accent?: "volt" | "leaf" | "ember";
};

export const LINES = {
  // B1 — Morning
  amGreet: {
    id: "am-greet",
    text: "Morning, Rocky. Remi left you something.",
    ms: 2600,
    speaker: "ai",
  },
  amReal: {
    id: "am-real",
    text: "Week three, Rock. Keep it simple today — fifteen minutes, I just want you to show up. That's the whole job.",
    ms: 6200,
    speaker: "real",
  },
  amClose: {
    id: "am-close",
    text: "I'll be right here the whole way. Want to start now or after coffee?",
    ms: 4200,
    speaker: "ai",
  },

  // B2 — Eat
  eatYou: {
    id: "eat-you",
    text: "Hey Remi — what should I eat?",
    ms: 2400,
    speaker: "you",
  },
  eatOffer: {
    id: "eat-offer",
    text: "You moved this morning, so let's get some protein in. Want ideas from nearby, or what's in your fridge?",
    ms: 5200,
    speaker: "ai",
    accent: "leaf",
  },
  eatFridge: {
    id: "eat-fridge",
    text: "What's in my fridge.",
    ms: 1800,
    speaker: "you",
  },
  eatPlan: {
    id: "eat-plan",
    text: "Eggs, spinach, that leftover rice. Six-minute high-protein rice bowl — 32 grams. Want the steps?",
    ms: 5400,
    speaker: "ai",
    accent: "leaf",
  },

  // B3 — The handoff
  hoYou: {
    id: "ho-you",
    text: "One thing — my knee's been bugging me on squats.",
    ms: 3000,
    speaker: "you",
  },
  hoAi: {
    id: "ho-ai",
    text: "I'm not going to guess on a knee. Let me loop in Remi — she should see this.",
    ms: 4600,
    speaker: "ai",
    accent: "volt",
  },
  hoReal: {
    id: "ho-real",
    text: "Saw your note on the knee. Swapped squats for step-ups this week and pulled the load back. We'll reassess Friday — don't push it.",
    ms: 6600,
    speaker: "real",
  },
  hoDone: {
    id: "ho-done",
    text: "Done — your plan's already updated. I've got the rest.",
    ms: 3400,
    speaker: "ai",
    accent: "volt",
  },

  // B4 — Evening
  pmClose: {
    id: "pm-close",
    text: "Good day, Rocky. You showed up and you ate well — that's the streak that matters.",
    ms: 4600,
    speaker: "ai",
  },
  pmLoop: {
    id: "pm-loop",
    text: "I softened tomorrow for the knee. Same time — I'll be here.",
    ms: 3800,
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
