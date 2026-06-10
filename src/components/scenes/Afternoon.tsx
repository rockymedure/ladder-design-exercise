"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [
  LINES.pmReflect,
  LINES.pmFuel,
  LINES.eatYou,
  LINES.eatPlan,
  LINES.eatStepsYou,
  LINES.eatSteps,
];

/**
 * The afternoon chain: the workout just happened, Ladder reflects on it, ties the
 * effort to fuel (water + protein), turns that into an actual meal, and then walks
 * Maya through cooking it. One thread across activity and nutrition, which is the
 * bridge the separate logging UI can't make. Visuals reuse the Nutrition design
 * system: the Cal & Protein progress component and macro-journal cells.
 */
export function Afternoon({
  onComplete,
  muted,
  paused,
}: {
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}) {
  const { current } = useLineSequence(SEQ, {
    active: true,
    muted,
    paused,
    endDelay: 1600,
    onComplete,
  });

  const id = current?.id;
  const speaker = current?.speaker ?? "ai";
  const dockState = speaker === "you" ? "listening" : "speaking";

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="flex flex-1 items-center justify-center px-7 pt-16">
        <AnimatePresence mode="wait">
          {id === LINES.pmReflect.id ? (
            <SessionCard key="session" />
          ) : id === LINES.eatSteps.id ? (
            <StepsCard key="steps" />
          ) : id === LINES.eatPlan.id || id === LINES.eatStepsYou.id ? (
            <DishCard key="dish" />
          ) : (
            <FuelCard key="fuel" />
          )}
        </AnimatePresence>
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <div className="min-h-[110px]">
          <Captions line={current} size={24} />
        </div>
        <CoachDock state={dockState} paused={paused} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Shared card chrome
 * ---------------------------------------------------------------- */

const cardMotion = {
  initial: { opacity: 0, y: 18, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function CardHead({
  label,
  meta,
  accent = "leaf",
}: {
  label: string;
  meta: string;
  accent?: "leaf" | "volt";
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: accent === "volt" ? "var(--color-volt)" : "var(--color-leaf)" }}
      >
        {label}
      </span>
      <span className="text-[10px] uppercase tracking-[0.16em] text-ash">{meta}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * 1. Session recap (bridge from the training side)
 * ---------------------------------------------------------------- */

function SessionCard() {
  return (
    <motion.div
      {...cardMotion}
      className="w-full overflow-hidden rounded-[20px] border border-volt/20 bg-ink-card"
    >
      <CardHead label="Session complete" meta="Foundation Day" accent="volt" />
      <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
        <Stat value="12:04" label="Time" />
        <Stat value="5/5" label="Sets" accent />
        <Stat value="+10" label="Avg HR" />
      </div>
      <div className="border-t border-white/[0.06] px-4 py-3">
        <p className="truncate text-[12px] text-ash-light">
          Heavier than last week, every set done.
        </p>
      </div>
    </motion.div>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-3.5">
      <span
        className="font-display text-[22px] font-bold leading-none tracking-tight"
        style={{ color: accent ? "var(--color-volt)" : "var(--color-paper)" }}
      >
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-[0.16em] text-ash">{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * 2. Recovery fuel: the Nutrition "Cal & Protein Progress" component
 * ---------------------------------------------------------------- */

function FuelCard() {
  return (
    <motion.div
      {...cardMotion}
      className="w-full overflow-hidden rounded-[20px] border border-leaf/20 bg-ink-card"
    >
      <CardHead label="Recovery fuel" meta="Because you trained" />
      <div className="flex items-center gap-4 px-4 py-4">
        <div className="flex flex-1 flex-col gap-3">
          <FuelStat
            color="var(--color-leaf)"
            value="130 g"
            label="Protein target"
            pct="72%"
          />
          <FuelStat
            color="#6cc1ff"
            value="16 oz"
            label="Water, drink now"
            pct="40%"
          />
        </div>
        <Rings outer={0.72} inner={0.4} />
      </div>
    </motion.div>
  );
}

function FuelStat({
  color,
  value,
  label,
  pct,
}: {
  color: string;
  value: string;
  label: string;
  pct: string;
}) {
  return (
    <div className="flex items-stretch gap-3">
      <span
        className="w-[3px] shrink-0 rounded-full"
        style={{ background: color }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-medium tracking-wide text-ash" style={{ color }}>
          {pct}
        </span>
        <span className="text-[17px] font-semibold leading-none text-paper">
          {value}
        </span>
        <span className="text-[11px] text-ash">{label}</span>
      </div>
    </div>
  );
}

/** Dual concentric progress rings, lifted from the Nutrition progress component. */
function Rings({ outer, inner }: { outer: number; inner: number }) {
  const R1 = 33;
  const R2 = 22;
  const S = 7;
  const c1 = 2 * Math.PI * R1;
  const c2 = 2 * Math.PI * R2;
  return (
    <svg width="86" height="86" viewBox="0 0 86 86" className="shrink-0">
      <g transform="rotate(-90 43 43)">
        <circle cx="43" cy="43" r={R1} fill="none" stroke="#2c2c2c" strokeWidth={S} />
        <motion.circle
          cx="43"
          cy="43"
          r={R1}
          fill="none"
          stroke="var(--color-leaf)"
          strokeWidth={S}
          strokeLinecap="round"
          strokeDasharray={c1}
          initial={{ strokeDashoffset: c1 }}
          animate={{ strokeDashoffset: c1 * (1 - outer) }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <circle cx="43" cy="43" r={R2} fill="none" stroke="#2c2c2c" strokeWidth={S} />
        <motion.circle
          cx="43"
          cy="43"
          r={R2}
          fill="none"
          stroke="#6cc1ff"
          strokeWidth={S}
          strokeLinecap="round"
          strokeDasharray={c2}
          initial={{ strokeDashoffset: c2 }}
          animate={{ strokeDashoffset: c2 * (1 - inner) }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- *
 * 3. The meal: a Nutrition macro-journal item
 * ---------------------------------------------------------------- */

function DishCard() {
  return (
    <motion.div
      {...cardMotion}
      className="w-full overflow-hidden rounded-[20px] border border-leaf/20 bg-ink-card"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-[#1c2412] to-[#0e120a]">
        <img
          src="/food/ricebowl.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
        <span className="absolute left-3.5 top-3.5 rounded-md bg-leaf px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
          Lunch
        </span>
      </div>
      <div className="px-4 pb-4 pt-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-ash">
          From your fridge
        </p>
        <p className="mt-1 truncate text-[16px] font-semibold text-paper">
          High-Protein Rice Bowl
        </p>
        <div className="mt-2.5">
          <Macros
            items={[
              { n: "390", u: "cal" },
              { n: "32", u: "p", hl: true },
              { n: "41", u: "c" },
              { n: "11", u: "f" },
            ]}
          />
        </div>
      </div>
    </motion.div>
  );
}

function Macros({
  items,
}: {
  items: { n: string; u: string; hl?: boolean }[];
}) {
  return (
    <div className="flex items-center gap-3.5 text-[13px]">
      {items.map((m) => (
        <span key={m.u} className="flex items-baseline gap-1">
          <span
            className="font-semibold"
            style={{ color: m.hl ? "var(--color-leaf)" : "var(--color-paper)" }}
          >
            {m.n}
          </span>
          <span className="text-ash">{m.u}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * 4. Steps: Ladder walks the cook, styled as macro-journal cells
 * ---------------------------------------------------------------- */

const STEPS = [
  "Sauté the spinach until wilted",
  "Warm the rice in the same pan",
  "Fold in two eggs until just set",
];

function StepsCard() {
  return (
    <motion.div
      {...cardMotion}
      className="w-full overflow-hidden rounded-[20px] border border-leaf/20 bg-ink-card"
    >
      <CardHead label="High-Protein Rice Bowl" meta="6 min · 32g protein" />
      <div className="flex flex-col gap-2 p-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.18 }}
            className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf text-[12px] font-bold text-ink">
              {i + 1}
            </span>
            <span className="flex-1 truncate text-[14px] text-paper">{s}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
