// "Coach in My Pocket": a day with Ladder, the always-on assistant.
// This cut is just you and Ladder: no second character to explain. Ladder reads
// your plan, your calendar, and your day, and does the things the app's UI can't.

export const USER = { name: "Maya", week: 3 };

export type Speaker = "ai" | "real" | "you";

export type Line = {
  id: string;
  text: string;
  ms: number;
  speaker: Speaker;
  accent?: "volt" | "leaf" | "ember";
};

// `ms` values match the exact generated audio durations (public/audio/*.mp3).
// speaker "ai" = Ladder (ElevenLabs "Jessica"). speaker "you" = Maya (ElevenLabs "Matilda").
export const LINES = {
  // B1, Kickoff (Morning): Ladder greets, celebrates the streak, then lays out
  // movement + food against the calendar so it feels continuous.
  amStreak: {
    id: "am-streak",
    text: "Morning, Maya. That's three days in a row now. Let's keep it going.",
    ms: 3604,
    speaker: "ai",
    accent: "volt",
  },
  amGreet: {
    id: "am-greet",
    text: "Today is Foundation Day, a real lower-body strength session, so I've nudged your protein up to match. You're booked till noon, so I'll slot it into your one o'clock gap, and we'll eat right after.",
    ms: 10684,
    speaker: "ai",
  },
  amClose: {
    id: "am-close",
    text: "I've put today's workout on your home screen. Just tap the widget when it's time.",
    ms: 4493,
    speaker: "ai",
  },

  // B1.5, Home screen: at workout time, Ladder pings you on your home screen.
  // Tapping the Foundation Day widget launches you straight into the session.
  // Ladder works outside the app too.
  hwReady: {
    id: "hw-ready",
    text: "Foundation Day's ready, Maya. Tap your widget and let's get into it.",
    ms: 3709,
    speaker: "ai",
    accent: "volt",
  },

  // B2, Workout (In class): Ladder is the sherpa, not the coach. It gets you in,
  // hands the mic to your coach, goes quiet while you work, and picks you back up
  // after. (icWork has no audio; it's the deliberate silence where the coach has
  // the room.)
  icHandoff: {
    id: "ic-handoff",
    text: "You're in. Your coach has the mic now. I'll step back and let you work.",
    ms: 4075,
    speaker: "ai",
    accent: "volt",
  },
  icWork: {
    id: "ic-work",
    text: "",
    ms: 6000,
    speaker: "ai",
  },
  icBack: {
    id: "ic-back",
    text: "And that's time. I've got it from here.",
    ms: 2116,
    speaker: "ai",
    accent: "volt",
  },

  // B3, Prep + Eat (Afternoon): reflect on the workout, tie it to fuel (water +
  // food), then turn that into an actual meal.
  pmReflect: {
    id: "pm-reflect",
    text: "Strong session, Maya. You moved heavier than last week and finished every set. Your heart rate ran higher than an easy day.",
    ms: 7340,
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
    text: "Okay, what should I eat?",
    ms: 1698,
    speaker: "you",
  },
  eatPlan: {
    id: "eat-plan",
    text: "Eggs, spinach, that leftover rice. A six-minute high-protein bowl, thirty-two grams. That hits your recovery target. Want the steps?",
    ms: 9874,
    speaker: "ai",
    accent: "leaf",
  },

  // B4, Reflect (Evening): reflect on the day, set up tomorrow.
  evClose: {
    id: "ev-close",
    text: "Good day, Maya. You trained hard, got your water in, and ate for recovery. That's four days running.",
    ms: 5878,
    speaker: "ai",
  },
  evTomorrow: {
    id: "ev-tomorrow",
    text: "Tomorrow's a real rest day. A light walk and normal meals. I'll keep it easy and check in.",
    ms: 5329,
    speaker: "ai",
    accent: "volt",
  },
} satisfies Record<string, Line>;

export type SceneId =
  | "coldopen"
  | "morning"
  | "home"
  | "inclass"
  | "afternoon"
  | "evening";

export const SCENES: {
  id: SceneId;
  label: string;
  time: string;
  moment: string;
}[] = [
  { id: "coldopen", label: "Cold open", time: "", moment: "Coach in my pocket" },
  { id: "morning", label: "Kickoff", time: "7:02 AM", moment: "Morning" },
  { id: "home", label: "Home screen", time: "1:00 PM", moment: "Midday" },
  { id: "inclass", label: "Workout", time: "1:02 PM", moment: "Midday" },
  { id: "afternoon", label: "Fuel & eat", time: "1:46 PM", moment: "Afternoon" },
  { id: "evening", label: "Reflect", time: "9:30 PM", moment: "Night" },
];
