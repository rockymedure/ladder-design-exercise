"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions, CoachAura } from "@/components/Presence";
import { RealCoachCard } from "@/components/RealCoachCard";
import { DayAhead } from "@/components/DayAhead";
import { CoachDock } from "@/components/CoachDock";
import { TimeChip } from "@/components/ui";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [
  LINES.amGreet,
  LINES.amNote,
  LINES.amReal,
  LINES.amSuggest,
  LINES.amClose,
];

export function Morning({
  onComplete,
  muted,
  paused,
}: {
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}) {
  const { current, next } = useLineSequence(SEQ, {
    active: true,
    muted,
    paused,
    endDelay: 1400,
    onComplete,
  });

  const speaker = current?.speaker ?? "ai";
  const isReal = speaker === "real";
  const isDay = current?.id === LINES.amGreet.id;
  const isSuggest = current?.id === LINES.amSuggest.id;

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="absolute left-0 right-0 top-16 z-20 flex justify-center">
        <TimeChip time="7:02 AM" label="Good morning" />
      </div>

      <div className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimatePresence mode="wait">
          {isReal ? (
            <RealCoachCard
              key="real"
              text={current!.text}
              videoSrc="/video/remi-morning.mp4"
              muted={muted}
              paused={paused}
              onEnded={next}
            />
          ) : isDay ? (
            <DayAhead key="day" />
          ) : isSuggest ? (
            <LadderSuggestion key="suggest" />
          ) : (
            <motion.div
              key="aura"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CoachAura size={170} speaking={speaker === "ai"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <div className="min-h-[110px]">
          {!isReal && <Captions line={current} />}
        </div>
        <CoachDock state={isReal ? "idle" : "speaking"} />
      </div>
    </div>
  );
}

/**
 * The "beyond-the-UI" moment. Ladder reaches past your fixed plan and pulls in a
 * finisher from another Ladder team — something the structured app would never
 * surface on its own. This is where Ladder scales every coach, not just yours.
 */
function LadderSuggestion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[300px] overflow-hidden rounded-[26px] border border-volt/25 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-volt"
            style={{ boxShadow: "0 0 12px #e6ff00" }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
            Add-on from Ladder
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Cross-team
        </span>
      </div>

      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-ash">
          Sunrise Crew · today only
        </p>
        <p className="mt-1.5 text-[17px] font-semibold leading-tight text-paper">
          12-Minute Mobility Finisher
        </p>
        <p className="mt-2 text-[12px] leading-snug text-ash-light">
          Borrowed from another team to fit your easy push — Remi&apos;s plan
          stays exactly as is.
        </p>

        <div className="mt-3.5 flex items-center gap-2">
          <button className="flex-1 rounded-full bg-volt py-2.5 text-center text-[13px] font-semibold text-ink">
            + Add to today
          </button>
          <button className="rounded-full border border-white/12 px-4 py-2.5 text-[13px] font-medium text-ash-light">
            Not now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
