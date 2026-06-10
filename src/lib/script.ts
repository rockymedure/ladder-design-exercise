// "Coach in My Pocket" — a day with Ladder, the always-on assistant.
// This cut is just you and Ladder: no second character to explain. Ladder reads
// your plan, your calendar, and your day, and does the things the app's UI can't.

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
export const LINES = {
  // B1 — Morning: Ladder greets, lays out movement + food against the calendar.
  amGreet: {
    id: "am-greet",
    text: "Morning, Rocky. Strong pull yesterday — that's three days straight now. Today's lighter: an easy push and a protein focus. You're booked till noon, so I'll slot your workout into the one o'clock gap, and we'll eat right after.",
    ms: 12304,
    speaker: "ai",
  },
  amClose: {
    id: "am-close",
    text: "That's the shape of your day. I'll check in before you train.",
    ms: 2952,
    speaker: "ai",
  },

  // B2 — Mid-morning: the beyond-the-UI move. Ladder pitches another team's class.
  mmPitch: {
    id: "mm-pitch",
    text: "One idea before one o'clock. The Sunrise crew is running a live class today — different coach, same easy-push vibe. Want to drop in for today instead of your usual?",
    ms: 10475,
    speaker: "ai",
    accent: "volt",
  },
  mmYou: {
    id: "mm-you",
    text: "Yeah, let's do it.",
    ms: 1437,
    speaker: "you",
  },
  mmAdd: {
    id: "mm-add",
    text: "You're in with Sunrise. Back to your own plan tomorrow — today you train in a new room.",
    ms: 5277,
    speaker: "ai",
    accent: "volt",
  },

  // B2.5 — In class: eyes-off, Ladder coaching you through the borrowed class in your ear.
  icOpen: {
    id: "ic-open",
    text: "You're in. Phone down — I'll talk you through it. Sunrise picks the moves; I keep them yours.",
    ms: 6531,
    speaker: "ai",
    accent: "volt",
  },
  icCue: {
    id: "ic-cue",
    text: "Halfway — round three of five. Reach long, open the chest, breathe into it. That's your pace.",
    ms: 7001,
    speaker: "ai",
    accent: "volt",
  },
  icPush: {
    id: "ic-push",
    text: "Last ten seconds... hold it long, and release. Smooth the whole way through.",
    ms: 4833,
    speaker: "ai",
    accent: "volt",
  },

  // B3 — Afternoon: reflect on the workout, tie it to fuel (water + food), then a meal.
  pmReflect: {
    id: "pm-reflect",
    text: "Nice work in there. Sunrise ran you harder than your usual easy day — your heart rate sat ten beats higher, and you finished every round.",
    ms: 8255,
    speaker: "ai",
  },
  pmFuel: {
    id: "pm-fuel",
    text: "You sweated more than a normal session, so two things. Get sixteen ounces of water in now, and let's add some protein at lunch to help you recover.",
    ms: 8124,
    speaker: "ai",
    accent: "leaf",
  },
  eatYou: {
    id: "eat-you",
    text: "Okay — what should I eat?",
    ms: 1698,
    speaker: "you",
  },
  eatPlan: {
    id: "eat-plan",
    text: "Eggs, spinach, that leftover rice — a six-minute high-protein bowl, thirty-two grams. That hits your recovery target. Want the steps?",
    ms: 9874,
    speaker: "ai",
    accent: "leaf",
  },

  // B4 — Evening: reflect on the day, set up tomorrow.
  evClose: {
    id: "ev-close",
    text: "Good day, Rocky. You tried a new room with Sunrise, got your water in, and ate for recovery. That's four days running.",
    ms: 6766,
    speaker: "ai",
  },
  evTomorrow: {
    id: "ev-tomorrow",
    text: "Tomorrow's a real rest day — a light walk and normal meals. I'll keep it easy and check in.",
    ms: 5329,
    speaker: "ai",
    accent: "volt",
  },
} satisfies Record<string, Line>;

export type SceneId =
  | "coldopen"
  | "morning"
  | "midmorning"
  | "inclass"
  | "afternoon"
  | "evening";

export const SCENES: { id: SceneId; label: string; time: string }[] = [
  { id: "coldopen", label: "Cold open", time: "" },
  { id: "morning", label: "Morning", time: "7:02 AM" },
  { id: "midmorning", label: "Mid-morning", time: "10:24 AM" },
  { id: "inclass", label: "In class", time: "1:02 PM" },
  { id: "afternoon", label: "Afternoon", time: "1:46 PM" },
  { id: "evening", label: "Evening", time: "9:30 PM" },
];
