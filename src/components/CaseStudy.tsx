"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LadderMark, Wordmark } from "./Logo";
import { ScenePlayer } from "./ScenePlayer";
import { Morning } from "./scenes/Morning";
import { HomeScreen } from "./scenes/HomeScreen";
import { InClass } from "./scenes/InClass";
import { Afternoon } from "./scenes/Afternoon";
import { Evening } from "./scenes/Evening";

/* ------------------------------------------------------------------ *
 * Primitives
 * ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`text-[12px] font-bold uppercase tracking-[0.28em] ${
        tone === "dark" ? "text-volt" : "text-[#5A5A5A]"
      }`}
    >
      {children}
    </span>
  );
}

function PrimaryPill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95"
    >
      {children}
    </Link>
  );
}

function GhostPill({
  href,
  tone = "dark",
  children,
}: {
  href: string;
  tone?: "dark" | "light";
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] transition ${
        tone === "dark"
          ? "border-white/20 text-paper hover:border-white/45"
          : "border-black/15 text-ink hover:border-black/40"
      }`}
    >
      {children}
    </a>
  );
}

const H = "font-ek leading-[0.9]";
const HEAD = "text-[clamp(2.6rem,7vw,5.4rem)]";
const SUB = "text-[clamp(1.9rem,4.5vw,3rem)]";

/* ------------------------------------------------------------------ *
 * Beats
 * ------------------------------------------------------------------ */

type Beat = {
  n: string;
  time: string;
  statusTime: string;
  title: string;
  lead: string;
  points: string[];
  scene: React.ComponentType<{
    onComplete: () => void;
    muted: boolean;
    paused: boolean;
  }>;
  tone: "dark" | "light";
  accent?: "volt" | "leaf";
};

const BEATS: Beat[] = [
  {
    n: "01",
    time: "Morning · 7:02 AM",
    statusTime: "7:02 AM",
    title: "Mornings open on your day",
    lead: "Not a message to answer. A brief. Ladder celebrates the streak, lays out how you'll move and eat, and fits it to your real calendar.",
    points: [
      "A three-day streak, made to feel earned",
      "Day ahead: Foundation Day at one, protein nudged up to match",
      "Today's workout placed on your home screen",
    ],
    scene: Morning,
    tone: "dark",
  },
  {
    n: "02",
    time: "Midday · 1:00 PM",
    statusTime: "1:00 PM",
    title: "The workout finds you",
    lead: "Ladder lives outside the app, too. At go-time it pings your home screen. Tap the widget and you're in, no hunting through menus.",
    points: [
      "A home-screen widget that matches today's session",
      "One tap from notification straight into the work",
    ],
    scene: HomeScreen,
    tone: "light",
  },
  {
    n: "03",
    time: "Midday · 1:02 PM",
    statusTime: "1:02 PM",
    title: "Ladder knows when to go quiet",
    lead: "Ladder is the sherpa, not the coach. It gets you in, hands the room to the session, goes silent while you work, and picks you back up after.",
    points: [
      "Steps back during the set, so the work has the room",
      "The real Ladder workout screen: reps, pace, weight",
      "Comes back the moment you finish",
    ],
    scene: InClass,
    tone: "dark",
  },
  {
    n: "04",
    time: "Afternoon · 1:46 PM",
    statusTime: "1:46 PM",
    title: "Training decides dinner",
    lead: "This is the bridge. The set you just finished sets your recovery fuel, turns into a meal from what's in your fridge, and Ladder walks you through cooking it. Strength and nutrition on one thread.",
    points: [
      "Recovery fuel based on how you actually trained",
      "A meal you can make, then the steps to make it",
      "Built from Ladder's own Nutrition components",
    ],
    scene: Afternoon,
    tone: "light",
    accent: "leaf",
  },
  {
    n: "05",
    time: "Night · 9:30 PM",
    statusTime: "9:30 PM",
    title: "The relationship remembers",
    lead: "A quiet recap, and tomorrow already adjusted. Ladder never resets to zero. Every day compounds on the last.",
    points: [
      "Trained, hydrated, ate well, a four-day streak",
      "Tomorrow set before you have to ask",
    ],
    scene: Evening,
    tone: "dark",
  },
];

function BeatSection({ beat, index }: { beat: Beat; index: number }) {
  const dark = beat.tone === "dark";
  const flip = index % 2 === 1; // alternate phone side
  const accent = beat.accent === "leaf" ? "var(--color-leaf)" : "var(--color-volt)";

  return (
    <section
      className={dark ? "bg-[#0E0E0E] text-paper" : "bg-[#FAFAFA] text-ink"}
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:py-32">
        <Reveal className={flip ? "md:order-2" : ""}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span
                className="font-ek text-[clamp(3rem,6vw,5rem)] leading-none"
                style={{ color: accent }}
              >
                {beat.n}
              </span>
              <span
                className={`text-[12px] font-bold uppercase tracking-[0.22em] ${
                  dark ? "text-ash" : "text-[#5A5A5A]"
                }`}
              >
                {beat.time}
              </span>
            </div>

            <h2 className={`${H} ${SUB}`}>{beat.title}</h2>

            <p
              className={`font-sf max-w-[46ch] text-[17px] leading-relaxed ${
                dark ? "text-ash-light" : "text-[#444]"
              }`}
            >
              {beat.lead}
            </p>

            <ul className="mt-1 flex flex-col gap-3">
              {beat.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  <span
                    className={`font-sf text-[15px] ${
                      dark ? "text-paper" : "text-ink"
                    }`}
                  >
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={flip ? "md:order-1" : ""}>
          <div className="flex justify-center">
            <ScenePlayer
              scene={beat.scene}
              time={beat.statusTime}
              label={beat.title}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export function CaseStudy() {
  return (
    <main className="font-sf bg-[#0E0E0E] text-paper">
      <Nav />
      <Hero />
      <Problem />
      <Concept />
      <BeatsIntro />
      {BEATS.map((b, i) => (
        <BeatSection key={b.n} beat={b} index={i} />
      ))}
      <Thinking />
      <Pipeline />
      <Bet />
      <Validate />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0E0E0E]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5">
        <Wordmark />
        <PrimaryPill href="/play">Live the day</PrimaryPill>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(230,255,0,0.10), transparent 65%), radial-gradient(45% 40% at 80% 90%, rgba(84,244,109,0.07), transparent 70%)",
        }}
      />
      <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-8 px-6 pb-24 pt-24 md:pb-32 md:pt-32">
        <Reveal>
          <Kicker>Ladder · Design exercise</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className={`${H} text-[clamp(3.2rem,11vw,8.5rem)]`}>
            A day
            <br />
            with Ladder
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf max-w-[60ch] text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-ash-light">
            Ladder's app is where motivated people already are. The habit is won
            in the moments between screens. So I built the thing a dashboard can't
            be: an assistant that's with you all day, for training{" "}
            <span className="text-paper">and</span> nutrition, where the
            relationship, not the software, is the interface.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryPill href="/play">
              Live the full day
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </PrimaryPill>
            <GhostPill href="#thinking">See the thinking</GhostPill>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.2em] text-ash-dark">
            <span>7:02 Kickoff</span>
            <span className="text-ash">·</span>
            <span>1:00 Handoff</span>
            <span className="text-ash">·</span>
            <span>1:02 Workout</span>
            <span className="text-ash">·</span>
            <span>1:46 Fuel</span>
            <span className="text-ash">·</span>
            <span>9:30 Reflect</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">The opportunity</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            The app is the easy part
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mt-6 max-w-[58ch] text-[18px] leading-relaxed text-[#444]">
            Ladder is genuinely great at the workout. But it is also UI-heavy,
            feeds, logging tables, dashboards, and in its own words built for
            people who are already motivated. The coach lives inside recorded
            video. The make-or-break moments, the 1pm &ldquo;what do I eat,&rdquo;
            the skip-it morning, the tweaky knee, all happen when no one is there.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <blockquote className="mt-12 border-l-2 border-volt pl-6">
            <p className="font-ek text-[clamp(1.5rem,3.4vw,2.4rem)] leading-tight text-ink">
              &ldquo;Built for busy people who are already motivated to work
              out.&rdquo;
            </p>
            <cite className="font-sf mt-3 block text-[13px] not-italic uppercase tracking-[0.18em] text-[#5A5A5A]">
              joinladder.com
            </cite>
          </blockquote>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "The UI is the wall",
              d: "Every action is a screen to find. Motivation leaks out between taps.",
            },
            {
              t: "The coach can't scale",
              d: "One human, many members, mostly through pre-recorded video.",
            },
            {
              t: "Nutrition feels separate",
              d: "Training and food live in different tabs, and different headspaces.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={0.1 + i * 0.07}>
              <div className="h-full rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="font-ek text-[1.25rem] text-ink">{c.t}</h3>
                <p className="font-sf mt-2 text-[15px] leading-relaxed text-[#555]">
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Concept() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E0E] text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(230,255,0,0.08), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1180px] px-6 py-24 text-center md:py-36">
        <Reveal>
          <Kicker>The concept</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} mx-auto mt-6 max-w-[14ch] text-[clamp(2.8rem,8vw,6rem)]`}>
            Less app. More coach. All day.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mx-auto mt-8 max-w-[60ch] text-[18px] leading-relaxed text-ash-light">
            Meet Ladder: one always-on assistant, personalized by your plan and
            your history, voice-first and ambient. It does the generous things the
            rigid UI can't, and it is the bridge that finally connects strength
            training and nutrition inside a single relationship.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mx-auto mt-12 flex max-w-[760px] flex-col gap-px overflow-hidden rounded-2xl border border-white/10 sm:flex-row">
            {[
              ["Voice", "for action"],
              ["Text", "for proof"],
              ["Memory", "for trust"],
            ].map(([a, b]) => (
              <div key={a} className="flex-1 bg-white/[0.03] px-6 py-7">
                <div className="font-ek text-[1.6rem] text-volt">{a}</div>
                <div className="font-sf mt-1 text-[14px] uppercase tracking-[0.16em] text-ash">
                  {b}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeatsIntro() {
  return (
    <section className="bg-[#0E0E0E] text-paper">
      <div className="mx-auto max-w-[1180px] px-6 pb-4 pt-24 md:pt-28">
        <Reveal>
          <Kicker>The day, beat by beat</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[18ch]`}>
            Five moments. Each one live.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ash-light">
            Every phone below is the real prototype, with generated voice. Tap
            play on any beat, or live the whole day end to end.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Thinking() {
  const pivots = [
    {
      from: "UI polish",
      to: "Relationship",
      d: "First instinct was to elevate the live-workout and nutrition screens. But the app is already UI-heavy. The real opportunity was less UI, not a prettier dashboard.",
    },
    {
      from: "AI twin",
      to: "Assistant",
      d: "I first cloned the coach as a talking-head twin, with generated voice and video. It was uncanny, it eroded trust, and it cannibalized Ladder's moat. An assistant that defers to humans is the honest and stronger model.",
    },
    {
      from: "Coach character",
      to: "You and Ladder",
      d: "I even removed the human-coach character from the demo, so the relationship between you and Ladder, the part that's new, is unmistakable.",
    },
  ];
  return (
    <section id="thinking" className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">The honest part</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[18ch]`}>
            I threw away the good work twice
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-3xl border border-black/10">
          {pivots.map((p, i) => (
            <Reveal key={p.to} delay={i * 0.06}>
              <div className="grid gap-4 bg-white px-7 py-9 md:grid-cols-[minmax(0,360px)_1fr] md:gap-10">
                <div className="flex items-center gap-3">
                  <span className="font-ek text-[1.4rem] text-[#9E9E9E] line-through decoration-[#9E9E9E]/50">
                    {p.from}
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#0E0E0E"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-ek text-[1.6rem] text-ink">{p.to}</span>
                </div>
                <p className="font-sf text-[16px] leading-relaxed text-[#444]">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const rows = [
    ["App", "Next.js · Tailwind · Motion", "iPhone-framed, scene-based prototype"],
    ["Voice", "ElevenLabs (Jessica / Matilda)", "Every Ladder line and your replies"],
    ["Pacing", "Custom line sequencer", "Synced to the exact audio duration"],
    ["Design", "Ladder tokens + Nutrition kit", "The real components, not lookalikes"],
  ];
  return (
    <section className="bg-[#0E0E0E] text-paper">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker>How it's built</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            A working prototype, not a mockup
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ash-light">
            Everything you played is real playback in a coded app, with generated
            voice paced so presence actually reads as presence. A flat comp can't
            show an assistant that's with you.
          </p>
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          {rows.map((r, i) => (
            <Reveal key={r[0]} delay={i * 0.05}>
              <div
                className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[140px_1fr_1fr] sm:gap-6 ${
                  i % 2 ? "bg-white/[0.02]" : "bg-white/[0.04]"
                }`}
              >
                <span className="font-ek text-[1.05rem] text-volt">{r[0]}</span>
                <span className="font-sf text-[15px] text-paper">{r[1]}</span>
                <span className="font-sf text-[15px] text-ash">{r[2]}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bet() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E0E] text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 50%, rgba(84,244,109,0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1180px] px-6 py-28 text-center md:py-40">
        <Reveal>
          <Kicker>The bet</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className={`${H} mx-auto mt-6 text-[clamp(3rem,10vw,7.5rem)]`}
            style={{ color: "var(--color-leaf)" }}
          >
            Ladder is alive
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mx-auto mt-8 max-w-[60ch] text-[18px] leading-relaxed text-ash-light">
            Today, strength training and the team feel great. Nutrition feels like
            a separate app. Ladder, as an agent, is the bridge: always-on, aware of
            your biometrics, training, and meals, moving you easily between the two.
            Not a container for coaches and teams, a guide that's genuinely with
            you, so wellness stays top of mind all day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Validate() {
  const qs = [
    {
      q: "Where would you focus?",
      a: "The moments between screens, and the seam where training meets nutrition.",
    },
    {
      q: "Why this area?",
      a: "It pairs Ladder's least-scaled asset, the coach, with its weakest seam, nutrition. That's where the leverage is.",
    },
    {
      q: "How would you elevate it?",
      a: "Make the relationship the interface: voice-first, ambient, memory across days, one thread spanning strength and food.",
    },
    {
      q: "How would you validate it?",
      a: "Wizard-of-Oz the assistant for a small cohort. Measure between-session engagement, nutrition-log rate, and retention against a control. Ship the home-screen handoff first, it's the cheapest real test.",
    },
  ];
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">If we kept going</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[18ch]`}>
            Where I'd focus, and how I'd know
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {qs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-black/10 bg-white p-7">
                <h3 className="font-ek text-[1.3rem] text-ink">{item.q}</h3>
                <p className="font-sf mt-3 text-[16px] leading-relaxed text-[#444]">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0E0E0E] text-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-8 px-6 py-20 text-center">
        <LadderMark size={40} />
        <h2 className={`${H} max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)]`}>
          Less app. More coach. All day.
        </h2>
        <PrimaryPill href="/play">
          Live the full day
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PrimaryPill>
        <p className="font-sf text-[12px] uppercase tracking-[0.2em] text-ash-dark">
          Design exercise for Ladder · Rocky Medure · 2026
        </p>
      </div>
    </footer>
  );
}
