"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions, CoachAura } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { TimeChip } from "@/components/ui";
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
      <div className="absolute left-0 right-0 top-16 z-20 flex justify-center">
        <TimeChip time="1:46 PM" label="Post-workout" />
      </div>

      <div className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimatePresence mode="wait">
          {id === LINES.pmReflect.id ? (
            <SessionCard key="session" />
          ) : id === LINES.pmFuel.id ? (
            <FuelCard key="fuel" />
          ) : id === LINES.eatPlan.id ? (
            <DishCard key="dish" />
          ) : (
            <motion.div
              key="aura"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CoachAura size={150} speaking={false} />
            </motion.div>
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
      className="w-full max-w-[290px] overflow-hidden rounded-[24px] border border-volt/20 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
          Session complete
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Sunrise · Mobility
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
        <Stat value="12:04" label="Time" />
        <Stat value="5/5" label="Rounds" accent />
        <Stat value="+10" label="Avg HR" />
      </div>
      <div className="border-t border-white/[0.06] px-4 py-3">
        <p className="text-[12px] leading-snug text-ash-light">
          Harder than your usual easy day — and you finished every round.
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
        className="text-[20px] font-bold leading-none"
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
      className="w-full max-w-[290px] overflow-hidden rounded-[24px] border border-leaf/20 bg-ink-card"
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
        <FuelRow
          icon="💧"
          title="Water"
          detail="16 oz now"
          note="+8 oz vs a rest day"
        />
        <FuelRow
          icon="🍗"
          title="Protein"
          detail="bumped to 130g"
          note="+10g to recover"
          leaf
        />
      </div>
    </motion.div>
  );
}

function FuelRow({
  icon,
  title,
  detail,
  note,
  leaf,
}: {
  icon: string;
  title: string;
  detail: string;
  note: string;
  leaf?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-3">
      <span className="text-[22px]">{icon}</span>
      <div className="flex flex-1 flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-[14px] font-semibold text-paper">{title}</span>
          <span
            className="text-[13px] font-semibold"
            style={{ color: leaf ? "var(--color-leaf)" : "var(--color-paper)" }}
          >
            {detail}
          </span>
        </div>
        <span className="text-[11px] text-ash">{note}</span>
      </div>
    </div>
  );
}

function DishCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[290px] overflow-hidden rounded-[24px] border border-leaf/20 bg-ink-card"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-[#1c2412] to-[#0e120a]">
        <div className="absolute inset-0 grid place-items-center text-[64px] opacity-80">
          🥗
        </div>
        <img
          src="/food/ricebowl.png"
          alt=""
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
        <div className="absolute left-3.5 top-3.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf backdrop-blur-md">
          From your fridge
        </div>
      </div>
      <div className="p-4">
        <p className="text-[16px] font-semibold text-paper">
          6-Minute High-Protein Rice Bowl
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Tag>32g protein</Tag>
          <Tag>6 min</Tag>
          <Tag>covers recovery</Tag>
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
