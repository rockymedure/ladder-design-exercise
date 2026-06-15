import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { RefuelStage } from "@/components/scenes/Refuel";

const H = "font-ek leading-[0.9]";

export default function RefuelPage() {
  return (
    <main className="min-h-dvh bg-[#0E0E0E] text-paper">
      <Nav />
      <Hero />
      <Gap />
      <Moment />
      <How />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-[60] border-b border-white/10 bg-[#0E0E0E]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5">
        <Wordmark />
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
          A day with Ladder
        </Link>
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
            "radial-gradient(55% 45% at 50% 0%, rgba(84,244,109,0.10), transparent 65%), radial-gradient(45% 40% at 82% 90%, rgba(230,255,0,0.06), transparent 70%)",
        }}
      />
      <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-8 px-6 pb-20 pt-24 md:pt-32">
        <span className="text-[12px] font-bold uppercase tracking-[0.28em] text-leaf">
          Ladder · Design exercise 2
        </span>
        <h1 className={`${H} text-[clamp(3.2rem,11vw,8.5rem)]`}>Refuel</h1>
        <p className="font-sf max-w-[56ch] text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-ash-light">
          The workout is Ladder&apos;s strongest habit. The moment it ends is peak
          motivation, and the user is already in the app. So I turned it into the
          place a logging habit gets <span className="text-paper">kickstarted</span>
          , one tap at a time.
        </p>
      </div>
    </section>
  );
}

function Gap() {
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:py-28">
        <span className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#5A5A5A]">
          The gap
        </span>
        <h2 className={`${H} mt-5 max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)]`}>
          Logging waits to be remembered
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="font-sf text-[17px] leading-relaxed text-[#444]">
            Today Ladder kickstarts logging passively, the Nutrition home shows a
            little arrow pointing at the <code className="rounded bg-black/5 px-1.5 py-0.5">+</code>{" "}
            and hopes you tap it. That asks the user to remember, decide, and start
            from a blank screen, on their own time.
          </p>
          <p className="font-sf text-[17px] leading-relaxed text-[#444]">
            But the workout already happened, inside Ladder, with momentum. Attaching
            the first log to that moment turns &quot;remember to track&quot; into a
            five-second ritual that rides the habit you already have.
          </p>
        </div>
      </div>
    </section>
  );
}

function Moment() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.28em] text-leaf">
            The moment
          </span>
          <h2 className={`${H} max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)]`}>
            Rate it. Refuel. Done.
          </h2>
          <p className="font-sf max-w-[52ch] text-[16px] leading-relaxed text-ash-light">
            One screen after the rating, one tap per thing you&apos;ve had. It&apos;s a
            real coded prototype, so go ahead and tap through it yourself.
          </p>
        </div>
        <RefuelStage />
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
    d: "Logging fills today's nutrition ring and bumps the existing streak, one daily relationship, not a second scorekeeper.",
  },
];

function How() {
  return (
    <section className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:py-28">
        <span className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#5A5A5A]">
          How it works
        </span>
        <h2 className={`${H} mt-5 max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)]`}>
          Simple on purpose
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.t}
              className="flex h-full flex-col gap-3 rounded-2xl border border-black/10 bg-white p-7"
            >
              <h3 className="font-ek text-[1.4rem] text-ink">{p.t}</h3>
              <p className="font-sf text-[15px] leading-relaxed text-[#444]">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0E0E0E]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-6 py-12">
        <Wordmark />
        <p className="font-sf text-[13px] text-ash-dark">
          Design exercise for Ladder · Rocky Medure · 2026
        </p>
      </div>
    </footer>
  );
}
