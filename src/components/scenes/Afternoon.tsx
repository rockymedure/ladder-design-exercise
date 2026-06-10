"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.pmReflect, LINES.pmFuel, LINES.eatYou, LINES.eatPlan];

/**
 * The afternoon chain: the workout just happened, Ladder reflects on it, ties the
 * effort to fuel (water + protein), and turns that into an actual meal — reasoning
 * across activity and nutrition in one breath, which no logging UI can do.
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
      <div className="flex flex-1 items-center justify-center px-5 pt-16">
        <AnimatePresence mode="wait">
          {id === LINES.pmReflect.id ? (
            <SessionCard key="session" />
          ) : id === LINES.eatPlan.id ? (
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
        <CoachDock state={dockState} />
      </div>
    </div>
  );
}

/** Reflection on the workout that just happened. */
function SessionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[290px] overflow-hidden rounded-[20px] border border-volt/20 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
          Session complete
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Foundation Day
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
        <Stat value="12:04" label="Time" />
        <Stat value="5/5" label="Sets" accent />
        <Stat value="+10" label="Avg HR" />
      </div>
      <div className="border-t border-white/[0.06] px-4 py-3">
        <p className="truncate text-[12px] text-ash-light">
          Heavier than last week — every set done.
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
      <span className="text-[9px] uppercase tracking-[0.16em] text-ash">
        {label}
      </span>
    </div>
  );
}

/** How the workout changes today's fuel: water + protein. */
function FuelCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[290px] overflow-hidden rounded-[20px] border border-leaf/20 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf">
          Recovery fuel
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Because you trained
        </span>
      </div>
      <div className="flex flex-col gap-2.5 p-4">
        <FuelRow icon={<WaterIcon />} title="Water" detail="16 oz now" />
        <FuelRow icon={<ProteinIcon />} title="Protein" detail="130g today" leaf />
      </div>
    </motion.div>
  );
}

function FuelRow({
  icon,
  title,
  detail,
  leaf,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  leaf?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
        style={{
          background: leaf
            ? "color-mix(in srgb, var(--color-leaf) 18%, transparent)"
            : "color-mix(in srgb, #6cc1ff 18%, transparent)",
        }}
      >
        {icon}
      </span>
      <span className="flex-1 truncate text-[14px] font-semibold text-paper">
        {title}
      </span>
      <span
        className="shrink-0 text-[13px] font-semibold"
        style={{ color: leaf ? "var(--color-leaf)" : "#6cc1ff" }}
      >
        {detail}
      </span>
    </div>
  );
}

function WaterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"
        fill="#6cc1ff"
      />
    </svg>
  );
}

function ProteinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 6.5l11 11M4 9a5 5 0 0 1 7-7l9 9a5 5 0 0 1-7 7L4 9Z"
        stroke="var(--color-leaf)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DishCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[290px] overflow-hidden rounded-[20px] border border-leaf/20 bg-ink-card"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-[#1c2412] to-[#0e120a]">
        <img
          src="/food/ricebowl.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
        <div className="absolute left-3.5 top-3.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf backdrop-blur-md">
          From your fridge
        </div>
      </div>
      <div className="p-4">
        <p className="truncate text-[16px] font-semibold text-paper">
          High-Protein Rice Bowl
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Tag>32g protein</Tag>
          <Tag>6 min</Tag>
          <Tag>recovery</Tag>
        </div>
      </div>
    </motion.div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-ash-light">
      {children}
    </span>
  );
}
