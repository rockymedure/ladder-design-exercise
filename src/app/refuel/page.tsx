"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wordmark, LadderMark } from "@/components/Logo";
import { RefuelStage } from "@/components/scenes/Refuel";

const H = "font-ek leading-[0.9]";
const HEAD = "text-[clamp(2.6rem,7vw,5.4rem)]";
const SUB = "text-[clamp(1.9rem,4.5vw,3rem)]";

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
        tone === "dark" ? "text-leaf" : "text-[#5A5A5A]"
      }`}
    >
      {children}
    </span>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-black shadow-[0_36px_90px_-36px_rgba(0,0,0,0.85)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </div>
  );
}

export default function RefuelPage() {
  return (
    <main className="font-sf min-h-dvh bg-[#0E0E0E] text-paper">
      <Nav />
      <Hero />
      <Goal />
      <Walkthrough />
      <Approaches />
      <LandedOn />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-[60] border-b border-white/10 bg-[#0E0E0E]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5">
        <Wordmark />
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-paper transition hover:border-white/45"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Round 1
          </Link>
          <a
            href="https://github.com/rockymedure/ladder-design-exercise"
            target="_blank"
            rel="noreferrer"
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-volt px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
            </svg>
            View source
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const notes = [
    { tag: "On craft", q: "Hard to benchmark the UI craft. Most screens were existing screens or AI concepts." },
    { tag: "On feasibility", q: "The solution sat a long way from today\u2019s app." },
  ];
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(84,244,109,0.12), transparent 65%)",
        }}
      />
      <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-8 px-6 pb-20 pt-24 md:pt-32">
        <Reveal>
          <Kicker>Ladder · Design exercise, round two</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className={`${H} text-[clamp(3.2rem,11vw,8.5rem)]`}>Refuel</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-[58ch] text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-ash-light">
            Round one reimagined the whole day. The honest feedback: it was hard
            to read my UI craft, and the concept sat too far from today&apos;s app.
            Fair on both. So round two does the opposite. I took one real screen you
            ship today and made it better.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="grid w-full max-w-[640px] gap-3 sm:grid-cols-2">
            {notes.map((n) => (
              <div
                key={n.tag}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ash-dark">
                  {n.tag}
                </span>
                <p className="mt-2 text-[14px] leading-snug text-ash-light">
                  {n.q}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#walkthrough"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95"
            >
              See the walkthrough
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#approaches"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-paper transition hover:border-white/45"
            >
              The approaches
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Goal() {
  return (
    <section id="goal" className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">The goal</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            Make nutrition logging easier, right after the workout
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-[#444]">
            Finish a Ladder workout and you&apos;re at peak motivation, already in
            the app. But logging what you ate is a two line card wedged between your
            medal and your stats, next to a clunky entry menu. The best moment to
            build the habit, treated as an afterthought.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#EDEDED] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6A6A6A]">
                  Before
                </span>
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                  Workout Complete
                </span>
              </div>
              <div className="mx-auto w-full max-w-[300px]">
                <div className="overflow-hidden rounded-[2.4rem] border border-black/10 bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/screens/before-workout-complete.png"
                    alt="Ladder Workout Complete screen, with the nutrition prompt as a small card"
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/screens/before-fuel-card.png"
                  alt="The current nutrition prompt: Get your calories right, add or update for this workout"
                  loading="lazy"
                  className="block h-auto w-full rounded-lg"
                />
                <p className="mt-3 px-1 text-[13px] leading-relaxed text-[#666]">
                  The nutrition prompt today. One line, an Update button, easily
                  missed.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center md:self-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="hidden md:block">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="block md:hidden">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-volt px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                  After
                </span>
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#3A3A3A]">
                  A dedicated beat
                </span>
              </div>
              <div className="mx-auto w-full max-w-[300px]">
                <div className="overflow-hidden rounded-[2.4rem] border border-black/10 bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/refuel/checkin.png"
                    alt="The new Refuel check-in screen: What's fueled you today, with Water, Protein, and Meal"
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                <p className="text-[14px] leading-relaxed text-[#444]">
                  I gave it its own post workout beat. Rate the session, then one
                  tap per thing you&apos;ve had. Same flow, same design system, with
                  the room it deserves.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const EXPLORE = [
  {
    src: "/refuel/explore-waveform.png",
    title: "The ambient waveform",
    d: "One expressive item at a time with a living graph. Beautiful, but the data viz was decoration, not signal, and logging one thing per screen is the opposite of a five second habit.",
  },
  {
    src: "/refuel/explore-bars.png",
    title: "Slide-to-fill columns",
    d: "Tactile vertical sliders for amount. Playful, but it forced a number on every item and the upward drag fought the thumb. Precision pretending to be speed.",
  },
  {
    src: "/refuel/explore-photos.png",
    title: "Photo-rich rows",
    d: "Appetite forward, with food imagery in every row. But stock photos aren\u2019t your food, and it pushed the screen toward a content feed instead of a quick check in.",
  },
  {
    src: "/refuel/explore-tiles.png",
    title: "Compact tile grid",
    d: "The closest miss. Fast and clean, but the squares felt cramped against the headline. One more pass relaxed them into the calm full width tiles that shipped.",
  },
];

function Approaches() {
  return (
    <section id="approaches" className="bg-[#0E0E0E] text-paper">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker>Approaches explored</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[14ch]`}>
            I didn&apos;t land here first
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ash-light">
            Showing craft is also showing judgment. I explored louder, more
            expressive directions, then pulled back to something fast, calm, and
            native to Ladder&apos;s system. A few that didn&apos;t make it, and why.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {EXPLORE.map((e, i) => (
            <Reveal key={e.title} delay={(i % 2) * 0.08}>
              <figure className="flex flex-col gap-5">
                <div className="relative mx-auto w-full max-w-[260px]">
                  <span className="absolute -left-2 -top-2 z-10 rounded-full bg-paper px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                    Cut
                  </span>
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black opacity-90 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={e.src}
                      alt={e.title}
                      loading="lazy"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
                <figcaption className="flex flex-col gap-2">
                  <h3 className="font-ek text-[1.5rem] text-paper">{e.title}</h3>
                  <p className="max-w-[42ch] text-[15px] leading-relaxed text-ash-light">
                    {e.d}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-14 max-w-[58ch] text-[18px] leading-relaxed text-ash-light">
            The thread through every cut: anything that added friction, vanity, or
            distance from Ladder&apos;s system lost.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const LANDED = [
  {
    src: "/refuel/rating.png",
    title: "Rate first, full-bleed",
    d: "The existing rating step as a full screen moment. Live ambient video, the stars and Complete Workout button where members expect them.",
  },
  {
    src: "/refuel/checkin.png",
    title: "One screen, three taps",
    d: "Water, Protein, Meal. Tap one and it already counts. EK display type and the leaf accent, straight from Ladder. No blank fields.",
  },
  {
    src: "/refuel/detail.png",
    title: "Commit first, detail optional",
    d: "Tap to log. Expand a tile for a stepped water slider or a protein picker. Each one a designed state, never a dead end form.",
  },
  {
    src: "/refuel/voice.png",
    title: "Say it, not type it",
    d: "The meal field records your voice and parses it into a structured log. Live, not faked. The lowest effort rung that hands off to real logging.",
  },
  {
    src: "/refuel/payoff.png",
    title: "Feeds the payoff you already have",
    d: "Logging flows into Ladder\u2019s real Complete Workout payoff. The medal, the share, the stats, now with a quiet Refueled today.",
  },
];

function LandedOn() {
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">Landed on</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            Calm, fast, built in the system
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-[#444]">
            Built in Ladder&apos;s own system. Binary by default, so one tap counts.
            Detail is there if you want it, never required. Every state designed and
            coded, not implied in a flat comp.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {LANDED.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={c.title}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                <Reveal className={flip ? "md:order-2" : ""}>
                  <div className="mx-auto w-full max-w-[320px]">
                    <Phone src={c.src} alt={c.title} />
                  </div>
                </Reveal>
                <Reveal delay={0.1} className={flip ? "md:order-1" : ""}>
                  <div className="flex flex-col gap-4">
                    <span className="font-ek text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-leaf">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`${H} text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink`}>
                      {c.title}
                    </h3>
                    <p className="max-w-[46ch] text-[17px] leading-relaxed text-[#444]">
                      {c.d}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Walkthrough() {
  return (
    <section
      id="walkthrough"
      className="relative overflow-hidden border-y border-white/10 bg-[#0B0B0B]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(84,244,109,0.08), transparent 70%)",
        }}
      />
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-6 py-24 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal>
            <Kicker>Walkthrough</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={`${H} ${HEAD} max-w-[16ch]`}>Tap through it</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-ash-light">
              Not a mockup. A real coded prototype. Rate, log, expand a tile, and
              the meal field actually records your voice and parses it. Try it here,
              or open it full screen on your phone.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <RefuelStage />
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="/live"
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95"
          >
            Open full screen
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0E0E0E]">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 px-6 py-16 text-center">
        <LadderMark size={36} />
        <p className="text-[12px] uppercase tracking-[0.2em] text-ash-dark">
          Design exercise for Ladder · Refuel · Rocky Medure · 2026
        </p>
      </div>
    </footer>
  );
}
