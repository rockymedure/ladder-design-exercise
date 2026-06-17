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
      <Feedback />
      <BeforeAfter />
      <Craft />
      <Prototype />
      <Principles />
      <Validate />
      <Close />
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
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(84,244,109,0.12), transparent 65%), radial-gradient(45% 40% at 82% 90%, rgba(230,255,0,0.06), transparent 70%)",
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
          <p className="max-w-[60ch] text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-ash-light">
            Round one reimagined the whole day. The honest note back: it was hard
            to read my UI craft, and the concept lived a long way from today&apos;s
            app. Both fair. So round two is the opposite move &mdash; I took one
            real, overlooked moment you ship{" "}
            <span className="text-paper">right now</span> and leveled it up.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#prototype"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95"
            >
              Tap the prototype
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
              href="#before"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-paper transition hover:border-white/45"
            >
              See the before
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Feedback() {
  const quotes = [
    {
      q: "It\u2019s hard to benchmark your UI craft. Most of the screens are either your existing screens or concepts illustrated through AI.",
      tag: "On craft",
    },
    {
      q: "The solution is a far distance from today\u2019s app \u2014 more feasible for a startup with little to lose than a structure with real members in it.",
      tag: "On feasibility",
    },
  ];
  return (
    <section className="border-y border-white/10 bg-[#0B0B0B]">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:py-28">
        <Reveal>
          <Kicker>The note I got back</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${SUB} mt-5 max-w-[20ch]`}>Two fair hits</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {quotes.map((item, i) => (
            <Reveal key={item.tag} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dark">
                  {item.tag}
                </span>
                <blockquote className="font-ek text-[clamp(1.3rem,2.6vw,1.85rem)] leading-tight text-paper">
                  &ldquo;{item.q}&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-[60ch] text-[18px] leading-relaxed text-ash-light">
            So this round has one job: show the craft, on a surface you already
            ship, and move the working system forward instead of replacing it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section id="before" className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">The overlooked moment</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            Nutrition was a card you scroll past
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-[#444]">
            Finish a Ladder workout and you&apos;re at peak motivation, already in
            the app. But logging what you eat is a two-line nudge wedged between
            your medal and your stats, beside a menu of clunky entry points. The
            best moment to build a nutrition habit, treated as an afterthought.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          {/* Before */}
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
                  The entire nutrition prompt today: one line, an Update button,
                  easily missed.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Arrow */}
          <Reveal delay={0.1} className="flex justify-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="md:block hidden">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="md:hidden block">
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

          {/* After */}
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
                  Promoted into its own post-workout beat: rate the session, then
                  one tap per thing you&apos;ve had. Same flow, same design system
                  &mdash; given the room it deserves, and wired to kickstart the
                  logging habit.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const CRAFT = [
  {
    src: "/refuel/rating.png",
    title: "Rate first, full-bleed",
    d: "The existing rating step, reborn as a cinematic post-workout moment. Live ambient video, the stars and Complete Workout button kept exactly where members expect them.",
  },
  {
    src: "/refuel/checkin.png",
    title: "One screen, three taps",
    d: "Water, Protein, Meal. Binary by default \u2014 tapping one tile already counts. EK display type and the leaf accent, straight from Ladder's system. No blank fields, no friction.",
  },
  {
    src: "/refuel/detail.png",
    title: "Commit first, detail optional",
    d: "Want precision? A tile expands in place. A stepped water slider (4oz \u2192 32+), a protein picker, a meal field \u2014 each a designed state, never a dead-end form.",
  },
  {
    src: "/refuel/voice.png",
    title: "Say it, not type it",
    d: "The meal field records your voice and parses it with Whisper + GPT into a structured log. The waveform and submit are live, not faked \u2014 the lowest-effort rung that hands off to real logging.",
  },
  {
    src: "/refuel/payoff.png",
    title: "Feeds the payoff you already have",
    d: "Logging flows into Ladder's real Complete Workout payoff \u2014 the medal, the share, the stats \u2014 now with a quiet \u201CRefueled today\u201D summary. One relationship, not a second scorekeeper.",
  },
];

function Craft() {
  return (
    <section className="bg-[#0E0E0E] text-paper">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker>The craft</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>
            Designed down to the state
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-ash-light">
            Built in Ladder&apos;s own system &mdash; the EK display type, the leaf
            accent, the real Complete Workout payoff. Every state hand-designed and
            coded, not implied in a flat comp.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {CRAFT.map((c, i) => {
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
                    <h3 className={`${H} text-[clamp(1.7rem,3.4vw,2.4rem)]`}>
                      {c.title}
                    </h3>
                    <p className="max-w-[46ch] text-[17px] leading-relaxed text-ash-light">
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

function Prototype() {
  return (
    <section
      id="prototype"
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
            <Kicker>Try it</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={`${H} ${HEAD} max-w-[18ch]`}>Not a mockup. Tap through it.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-ash-light">
              A real coded prototype. Rate, log, expand a tile &mdash; and the meal
              field actually records your voice and parses it. Tap through it here,
              or open it full-screen on your phone.
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

const PRINCIPLES = [
  {
    t: "Any log is a win",
    d: "Tapping one tile counts. No amounts, no blank screen, no friction. The goal is the ritual, not precision.",
  },
  {
    t: "The lowest rung of a ladder",
    d: "The binary tap kickstarts the habit. Want to be precise? It hands off to Ladder's existing voice, photo, and barcode logging.",
  },
  {
    t: "Feed the streak you already have",
    d: "Logging fills today's nutrition ring and bumps the existing streak \u2014 one daily relationship, not a second scorekeeper.",
  },
];

function Principles() {
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">The thinking</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[16ch]`}>Simple on purpose</h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-black/10 bg-white p-7">
                <h3 className="font-ek text-[1.4rem] text-ink">{p.t}</h3>
                <p className="text-[15px] leading-relaxed text-[#444]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BETS = [
  {
    a: "Attaching the first log to the workout lifts logging rate.",
    c: "High",
    v: "Instrument tap-through on today\u2019s \u201CGet your calories right\u201D card, then ship Refuel behind a flag to a cohort and compare 7-day nutrition-log rate against control.",
  },
  {
    a: "One-tap binary logging beats precise entry for forming the habit.",
    c: "Medium",
    v: "A/B binary-first vs. the current entry menu. Watch repeat logging D1\u2013D7, not just first-log completion.",
  },
  {
    a: "Tying food to the workout you just did improves adherence.",
    c: "Medium",
    v: "Cohort retention and weekly active-nutrition days vs. control, plus a few qual sessions on whether the moment feels earned, not nagging.",
  },
];

function Validate() {
  return (
    <section className="bg-[#0E0E0E] text-paper">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker>If we shipped it</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[18ch]`}>
            The assumptions, and how I&apos;d know
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-3xl border border-white/10">
          {BETS.map((b, i) => (
            <Reveal key={b.a} delay={i * 0.06}>
              <div className="grid gap-4 bg-white/[0.03] px-7 py-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)] md:items-center md:gap-10">
                <p className="font-ek text-[1.35rem] leading-tight text-paper">
                  {b.a}
                </p>
                <span className="w-fit rounded-full border border-leaf/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-leaf">
                  {b.c} confidence
                </span>
                <p className="text-[15px] leading-relaxed text-ash-light">{b.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0E0E0E] text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 45%, rgba(84,244,109,0.12), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1180px] px-6 py-28 text-center md:py-40">
        <Reveal>
          <Kicker>On innovating off a working system</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className={`${H} mx-auto mt-6 max-w-[16ch] text-[clamp(2.6rem,8vw,6rem)]`}
            style={{ color: "var(--color-leaf)" }}
          >
            Yes. That&apos;s the job I want.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-[62ch] text-[18px] leading-relaxed text-ash-light">
            Round one was me showing how far I&apos;d stretch. This is me showing
            I&apos;d rather take a screen millions already use and make it sing
            &mdash; small, shippable, measurable moves that compound. Innovating off
            a working system isn&apos;t the consolation prize. It&apos;s the craft I
            want to do every day, with a design and product partner, inside the
            constraints of real members.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="/live"
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:scale-[1.03] active:scale-95"
            >
              Open the prototype
            </a>
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-paper transition hover:border-white/45"
            >
              Back to round one
            </Link>
          </div>
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
