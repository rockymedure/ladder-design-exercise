"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { TimeChip } from "@/components/ui";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.eatYou, LINES.eatOffer, LINES.eatFridge, LINES.eatPlan];

export function Eat({
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

  const speaker = current?.speaker ?? "ai";
  const showDish = current?.id === LINES.eatPlan.id;
  const dockState = speaker === "you" ? "listening" : "speaking";

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="absolute left-0 right-0 top-16 z-20 flex justify-center">
        <TimeChip time="12:41 PM" label="Lunch" />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pt-24">
        <AnimatePresence mode="wait">
          {showDish ? (
            <DishCard key="dish" />
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="text-[44px]">🍽️</span>
              <span className="max-w-[220px] text-[13px] leading-snug text-ash">
                You moved this morning. Ladder&apos;s already thinking about fuel.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <Captions line={current} size={24} />
        <CoachDock state={dockState} />
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
      className="w-full max-w-[300px] overflow-hidden rounded-[26px] border border-leaf/20 bg-ink-card"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-[#1c2412] to-[#0e120a]">
        {/* fallback emoji shows through if the photo is missing */}
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
          <Tag>3 ingredients</Tag>
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
