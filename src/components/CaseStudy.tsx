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
  external = false,
  children,
}: {
  href: string;
  tone?: "dark" | "light";
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
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
    lead: "Not a message to answer, a brief: how you'll move and eat today, fit to your real calendar, with the streak worth keeping up top.",
    points: [
      "A three-day streak, celebrated",
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
    lead: "Ladder lives outside the app, too. At go-time it pings your home screen, tap the widget and you're in.",
    points: [
      "A widget that matches today's session",
      "One tap from notification into the work",
    ],
    scene: HomeScreen,
    tone: "light",
  },
  {
    n: "03",
    time: "Midday · 1:02 PM",
    statusTime: "1:02 PM",
    title: "Ladder knows when to go quiet",
    lead: "Ladder is the sherpa, not the coach. It gets you in, then goes quiet so the work has the room, and picks you back up after.",
    points: [
      "The real Ladder workout screen: reps, pace, weight",
      "Steps back during the set, returns when you finish",
    ],
    scene: InClass,
    tone: "dark",
  },
  {
    n: "04",
    time: "Afternoon · 1:46 PM",
    statusTime: "1:46 PM",
    title: "Training decides dinner",
    lead: "The bridge. The set you just finished sets your recovery fuel, becomes a meal from your fridge, and Ladder walks you through making it.",
    points: [
      "Recovery fuel from how you actually trained",
      "A meal from your fridge, then the steps to cook it",
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
    lead: "A quiet recap, and tomorrow already adjusted. Ladder never resets to zero.",
    points: [
      "Trained, hydrated, ate well, a four-day streak",
      "Tomorrow set before you ask",
    ],
    scene: Evening,
    tone: "dark",
  },
];

function BeatSection({
  beat,
  index,
  nextId,
}: {
  beat: Beat;
  index: number;
  nextId?: string;
}) {
  const dark = beat.tone === "dark";
  const flip = index % 2 === 1; // alternate phone side
  const accent = beat.accent === "leaf" ? "var(--color-leaf)" : "var(--color-volt)";

  return (
    <section
      id={`beat-${beat.n}`}
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
              nextId={nextId}
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
        <BeatSection
          key={b.n}
          beat={b}
          index={i}
          nextId={i < BEATS.length - 1 ? `beat-${BEATS[i + 1].n}` : "build"}
        />
      ))}
      <Build />
      <Bet />
      <Validate />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-[60] border-b border-white/10 bg-[#0E0E0E]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5">
        <Wordmark />
        <a
          href="https://github.com/rockymedure/ladder-design-exercise"
          target="_blank"
          rel="noreferrer"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
          </svg>
          View source
        </a>
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
          <p className="font-sf max-w-[58ch] text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-ash-light">
            Ladder nails the workout. But nutrition feels like a separate app, and
            the day between sessions has no one in it. So I built an always-on
            guide that stitches training{" "}
            <span className="text-paper">and</span> food into one relationship.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryPill href="#beat-01">
              Live the full day
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </PrimaryPill>
            <GhostPill href="#build">See how it's built</GhostPill>
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

function ScreenCard({
  src,
  alt,
  label,
  title,
  has,
  warm,
}: {
  src: string;
  alt: string;
  label: string;
  title: string;
  has: { ok: boolean; t: string }[];
  warm: boolean;
}) {
  const accent = warm ? "var(--color-volt)" : "#B0B0B0";
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span
          className="text-[12px] font-bold uppercase tracking-[0.22em]"
          style={{ color: warm ? "#3A3A3A" : "#8A8A8A" }}
        >
          {label}
        </span>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{
            background: warm ? "var(--color-volt)" : "#EDEDED",
            color: warm ? "#0E0E0E" : "#6A6A6A",
          }}
        >
          {title}
        </span>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-black/10 bg-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </div>

      <ul className="flex flex-col gap-2.5">
        {has.map((h) => (
          <li key={h.t} className="flex items-center gap-2.5">
            <span
              className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
              style={{
                background: h.ok ? accent : "transparent",
                border: h.ok ? "none" : "1.5px solid #C9C9C9",
              }}
            >
              {h.ok ? (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6 9 17l-5-5"
                    stroke="#0E0E0E"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="#C9C9C9"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`font-sf text-[14px] ${h.ok ? "text-ink" : "text-[#9A9A9A]"}`}
            >
              {h.t}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SplitEvidence() {
  return (
    <Reveal delay={0.14}>
      <div className="mt-12">
        <div className="grid gap-5 sm:grid-cols-2">
          <ScreenCard
            src="/screens/app-b.png"
            alt="Ladder workout screen, with a coach, teams, journal, and an active session"
            label="Training"
            title="A relationship"
            warm
            has={[
              { ok: true, t: "A coach on every session" },
              { ok: true, t: "Teams, Chat, and a Journal" },
              { ok: true, t: "An active workout to resume" },
            ]}
          />
          <ScreenCard
            src="/screens/app-a.png"
            alt="Ladder nutrition screen, a dashboard of calories, protein, water, and steps"
            label="Nutrition"
            title="A dashboard"
            warm={false}
            has={[
              { ok: true, t: "Calories, protein, water, steps" },
              { ok: false, t: "No coach, no team" },
              { ok: false, t: "No tie back to your training" },
            ]}
          />
        </div>

        <p className="font-sf mt-6 text-[15px] leading-relaxed text-[#666]">
          The tab bar says it out loud:{" "}
          <span className="font-semibold text-ink">Workout</span>,{" "}
          <span className="font-semibold text-ink">Chat</span>,{" "}
          <span className="font-semibold text-ink">Teams</span> &mdash; three sides
          of one relationship &mdash; and then{" "}
          <span className="font-semibold text-ink">Nutrition</span>, alone at the
          end. One pillar has a soul. The other has a spreadsheet.
        </p>
      </div>
    </Reveal>
  );
}

function Problem() {
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">The gap</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            Coach versus calculator
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mt-6 max-w-[54ch] text-[18px] leading-relaxed text-[#444]">
            Ladder is genuinely great at the workout, the coach and the team make
            it feel like yours. Put the two screens side by side, though, and the
            gap is obvious.
          </p>
        </Reveal>

        <SplitEvidence />

        <Reveal delay={0.16}>
          <blockquote className="mt-12 border-l-2 border-volt pl-6">
            <p className="font-ek text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight text-ink">
              Not another tracker. Someone in the day with them.
            </p>
          </blockquote>
        </Reveal>
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
          <h2 className={`${H} mx-auto mt-6 max-w-[15ch] text-[clamp(2.8rem,8vw,6rem)]`}>
            Less app. More relationship. All day.
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

function Build() {
  const layers = [
    {
      layer: "Cursor",
      tool: "Coding Agent · Opus 4.8",
      d: "The whole thing was built agentically in Cursor, driving Claude Opus 4.8 High, from pulling designs to wiring scenes to shipping, so iteration happened in minutes, not days.",
    },
    {
      layer: "Figma MCP",
      tool: "Design extraction",
      d: "Pulled Ladder's real tokens, the live-workout screen, and the nutrition kit straight from the files, so every phone uses the actual components, not lookalikes.",
    },
    {
      layer: "ElevenLabs",
      tool: "Voice",
      d: "Generated every spoken line, Ladder in one voice and your replies in another, so presence reads as a relationship instead of a chatbot transcript.",
    },
    {
      layer: "Fal · Grok video",
      tool: "Generated footage",
      d: "Produced the workout clip that fills the home-screen widget and the in-class screen, matched so the tease and the session are unmistakably the same moment.",
    },
    {
      layer: "Next + Motion",
      tool: "The app",
      d: "An iPhone-framed, scene-based prototype. Real playback, not slides, so the home-screen handoff and the go-quiet beat genuinely happen on screen.",
    },
    {
      layer: "Line sequencer",
      tool: "Pacing",
      d: "A small custom hook syncs dialogue to the exact audio duration. It's the difference between a demo that plays and one that feels alive.",
    },
  ];
  return (
    <section id="build" className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">How this got built</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[18ch]`}>
            A working prototype, not a mockup
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sf mt-6 max-w-[58ch] text-[18px] leading-relaxed text-[#444]">
            Everything on this page is real playback in a coded app, built
            agentically in Cursor with Claude Opus 4.8 High and assembled in days
            with generative tooling. A flat comp can't show an assistant that's
            with you, so I built the thing instead. Here's the stack.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-3xl border border-black/10">
          {layers.map((p, i) => (
            <Reveal key={p.layer} delay={i * 0.06}>
              <div className="grid gap-4 bg-white px-7 py-9 md:grid-cols-[minmax(0,360px)_1fr] md:gap-10">
                <div className="flex flex-col gap-1.5">
                  <span className="font-ek text-[1.6rem] leading-none text-ink">
                    {p.layer}
                  </span>
                  <span className="font-sf text-[12px] font-bold uppercase tracking-[0.2em] text-[#5A5A5A]">
                    {p.tool}
                  </span>
                </div>
                <p className="font-sf text-[16px] leading-relaxed text-[#444]">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GhostPill
              href="https://github.com/rockymedure/ladder-design-exercise"
              tone="light"
              external
            >
              View the source
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </GhostPill>
            <span className="font-sf text-[13px] text-[#5A5A5A]">
              Public on GitHub, every commit from this build.
            </span>
          </div>
        </Reveal>
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
      a: "The moments between sessions, and the seam where training meets nutrition.",
    },
    {
      q: "Why this area?",
      a: "It builds on what already works, the workout and the team, and closes Ladder's real gaps: nutrition and the unattended day. That's the leverage.",
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
        <h2 className={`${H} max-w-[20ch] text-[clamp(2rem,5vw,3.4rem)]`}>
          Less app. More relationship. All day.
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
