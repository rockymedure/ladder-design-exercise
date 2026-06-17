"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Wordmark, LadderMark } from "@/components/Logo";
import { RefuelStage } from "@/components/scenes/Refuel";

const LIVE_URL = "https://ladder-production-2032.up.railway.app/live";

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
      <LandedOn />
      <Approaches />
      <Handoff />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-[60] border-b border-white/10 bg-[#0E0E0E]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="cursor-pointer"
        >
          <Wordmark />
        </button>
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
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("walkthrough-phone")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
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
              <div className="flex items-center justify-center gap-3 md:justify-start">
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
              <div className="flex items-center justify-center gap-3 md:justify-start">
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
                    src="/refuel/voice.png"
                    alt="Refuel check-in with the water amount slider open and a meal being spoken in"
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </div>
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
                  <div className="overflow-hidden rounded-[2rem] border border-white/25 bg-black opacity-90 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.12)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={e.src}
                      alt={e.title}
                      loading="lazy"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
                <figcaption className="flex flex-col items-center gap-2 text-center">
                  <h3 className="font-ek text-[1.5rem] text-paper">{e.title}</h3>
                  <p className="max-w-[42ch] text-[15px] leading-relaxed text-ash-light">
                    {e.d}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

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
        <Reveal delay={0.16} className="w-full">
          <div className="flex flex-col items-center gap-8 md:flex-row-reverse md:items-center md:justify-center md:gap-12">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-2xl bg-white p-3 md:block"
                aria-label="Open the live prototype"
              >
                <QRCodeSVG value={LIVE_URL} size={120} bgColor="#ffffff" fgColor="#0E0E0E" level="M" />
              </a>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-leaf">
                Play it on your phone
              </p>
              <p className="hidden max-w-[20ch] text-center text-[13px] leading-snug text-ash-light md:block">
                Scan the code with your camera to open the live prototype on a real
                device.
              </p>
              {/* On a phone you can't scan your own screen, so offer a direct open. */}
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-volt px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition active:scale-95 md:hidden"
              >
                Open it on this device
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
            </div>
            <div id="walkthrough-phone">
              <RefuelStage />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const HANDOFF = [
  {
    n: "01",
    title: "The prototype is the spec",
    d: "A coded prototype, not a comp. Engineers open it and read the real motion, timing, and spacing, instead of guessing from a static redline.",
  },
  {
    n: "02",
    title: "Every state, designed",
    d: "Empty, one tap, expanded, slider, picker, recording, parse error, payoff. The states a flat comp forgets are where eng spends the most time, so they ship up front.",
  },
  {
    n: "03",
    title: "Built on your components",
    d: "Same tokens, type scale, and patterns as the app today. The handoff is about reusing what exists and only building new where it genuinely has to be.",
  },
  {
    n: "04",
    title: "Paired, then measured",
    d: "Walk it live with the owning engineer, ship behind a flag to one cohort, and agree the metric before code starts. Seven day logging against control.",
  },
];

function RedlineSpec() {
  const RED = "#E5484D";
  const LEAF = "#54F46D";
  const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

  const tiles = [
    { y: 186, label: "Water", sub: "A glass, a bottle, anything", active: true },
    { y: 272, label: "Protein", sub: "Shake, bar, or supplement", active: false },
    { y: 358, label: "Meal", sub: "Breakfast, lunch, or dinner", active: false },
  ];

  const spec: { k?: string; v?: string; sw?: string; divider?: boolean }[] = [
    { k: "Surface", v: "#181818", sw: "#181818" },
    { k: "Stroke", v: "#FFFFFF1A", sw: "stroke" },
    { k: "Active", v: "#54F46D", sw: LEAF },
    { divider: true },
    { k: "Radius", v: "16 px" },
    { k: "Tile height", v: "72 px" },
    { k: "Row gap", v: "14 px" },
    { k: "Icon", v: "40 × 40" },
    { k: "Label", v: "17 / Semibold" },
    { k: "Sub", v: "13 / Regular" },
  ];

  return (
    <svg
      viewBox="85 20 820 520"
      className="block h-auto w-full"
      role="img"
      aria-label="Spec of the Water, Protein and Meal check-in tiles"
    >
      <rect x="85" y="20" width="820" height="520" fill="#F4F4F5" />

      {/* phone screen */}
      <rect x="120" y="40" width="280" height="480" rx="30" fill="#070707" />

      {/* heading */}
      <text x="140" y="92" fill={LEAF} fontSize="11" fontWeight="700" letterSpacing="2">
        NUTRITION
      </text>
      <text x="139" y="128" fill="#F5F5F5" fontSize="23" fontWeight="800" letterSpacing="-0.5">
        WHAT&apos;S FUELED
      </text>
      <text x="139" y="156" fill="#F5F5F5" fontSize="23" fontWeight="800" letterSpacing="-0.5">
        YOU TODAY?
      </text>

      {/* tiles */}
      {tiles.map((t) => {
        const iconCx = 176;
        const iconCy = t.y + 36;
        const tint = t.active ? LEAF : "rgba(255,255,255,0.55)";
        return (
          <g key={t.label}>
            <rect
              x="140"
              y={t.y}
              width="240"
              height="72"
              rx="16"
              fill="#181818"
              stroke={t.active ? LEAF : "rgba(255,255,255,0.10)"}
              strokeWidth={t.active ? 2 : 1}
            />
            {/* icon container */}
            <rect
              x="156"
              y={t.y + 16}
              width="40"
              height="40"
              rx="12"
              fill="rgba(255,255,255,0.06)"
            />
            {t.label === "Water" && (
              <path
                d={`M${iconCx} ${iconCy - 9} C ${iconCx + 7} ${iconCy - 1} ${iconCx + 6} ${iconCy + 6} ${iconCx} ${iconCy + 6} C ${iconCx - 6} ${iconCy + 6} ${iconCx - 7} ${iconCy - 1} ${iconCx} ${iconCy - 9} Z`}
                fill="none"
                stroke={tint}
                strokeWidth="1.6"
              />
            )}
            {t.label === "Protein" && (
              <rect
                x={iconCx - 6}
                y={iconCy - 8}
                width="12"
                height="17"
                rx="3"
                fill="none"
                stroke={tint}
                strokeWidth="1.6"
              />
            )}
            {t.label === "Meal" && (
              <>
                <circle cx={iconCx} cy={iconCy} r="7" fill="none" stroke={tint} strokeWidth="1.6" />
                <circle cx={iconCx} cy={iconCy} r="2" fill={tint} />
              </>
            )}
            {/* text */}
            <text x="210" y={t.y + 31} fill="#F2F2F2" fontSize="16" fontWeight="700">
              {t.label}
            </text>
            <text x="210" y={t.y + 51} fill="#8A8A8A" fontSize="12">
              {t.sub}
            </text>
            {/* radio */}
            <circle
              cx="355"
              cy={t.y + 36}
              r="9"
              fill={t.active ? LEAF : "none"}
              stroke={t.active ? LEAF : "rgba(255,255,255,0.25)"}
              strokeWidth="1.6"
            />
            {t.active && (
              <path
                d={`M351 ${t.y + 36} l3 3 l5 -6`}
                fill="none"
                stroke="#070707"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>
        );
      })}

      {/* ---- spec panel (right) ---- */}
      <rect x="470" y="70" width="400" height="412" rx="20" fill="#FFFFFF" stroke="#E6E6E6" />
      <rect x="492" y="92" width="12" height="12" rx="3" fill={RED} />
      <text x="514" y="102" fill="#1A1A1A" fontSize="13" fontWeight="700" letterSpacing="1.2">
        REDLINE SPEC
      </text>
      <text x="492" y="126" fill="#9A9A9A" fontSize="12">
        Water · Protein · Meal tile
      </text>

      {spec.map((r, i) => {
        const y = 168 + i * 31;
        if (r.divider) {
          return <line key={i} x1="500" y1={y - 14} x2="840" y2={y - 14} stroke="#EDEDED" strokeWidth="1" />;
        }
        return (
          <g key={i}>
            <text x="500" y={y} fill="#666" fontSize="14">
              {r.k}
            </text>
            {r.sw && (
              <rect
                x="724"
                y={y - 13}
                width="18"
                height="18"
                rx="4"
                fill={r.sw === "stroke" ? "#ffffff" : r.sw}
                stroke={r.sw === "stroke" ? "#CFCFCF" : "rgba(0,0,0,0.12)"}
              />
            )}
            <text x="840" y={y} fill="#111" fontSize="13" textAnchor="end" fontFamily={MONO}>
              {r.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Handoff() {
  return (
    <section id="handoff" className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <Reveal>
          <Kicker tone="light">Handing it to eng</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`${H} ${HEAD} mt-5 max-w-[15ch]`}>
            Designs you can run, not just read
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-[#444]">
            I don&apos;t hand off a picture of the design. I hand off the design
            running. This whole page is the deliverable: an inspectable prototype
            that doubles as the spec, handed off in a working session, not thrown
            over a wall.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <figure className="mt-12 overflow-hidden rounded-3xl border border-black/10 shadow-sm">
            <RedlineSpec />
            <figcaption className="border-t border-black/10 bg-white px-5 py-4 text-[13px] leading-relaxed text-[#666] md:px-7">
              A redline of the check-in list. The same values live as tokens in
              the prototype, so eng builds from the running screen, not a
              flattened export.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {HANDOFF.map((c, i) => (
            <Reveal key={c.n} delay={(i % 2) * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-7">
                <span className="font-ek text-[15px] tracking-[0.1em] text-leaf">
                  {c.n}
                </span>
                <h3 className={`${H} text-[clamp(1.5rem,3vw,2rem)] text-ink`}>
                  {c.title}
                </h3>
                <p className="max-w-[42ch] text-[16px] leading-relaxed text-[#555]">
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 rounded-2xl border border-black/10 bg-[#111] p-6 text-paper md:p-8">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf">
              Honest caveat
            </p>
            <p className="mt-3 max-w-[68ch] text-[17px] leading-relaxed text-ash-light">
              This prototype is web and Ladder ships native. I&apos;m not
              pretending it&apos;s production code. Its job is to remove ambiguity
              about behavior and feel so the native build is fast and faithful.
              I&apos;d sit with eng to translate the spring curves and durations to
              the platform, not assume a web build drops in.
            </p>
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
