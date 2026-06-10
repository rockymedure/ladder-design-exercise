"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { DayAhead } from "@/components/DayAhead";
import { StreakCal } from "@/components/StreakCal";
import { WorkoutWidget } from "@/components/WorkoutWidget";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.amStreak, LINES.amGreet, LINES.amClose];

export function Morning({
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
    endDelay: 1400,
    onComplete,
  });

  const showStreak = current?.id === LINES.amStreak.id;
  const showWidget = current?.id === LINES.amClose.id;

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="flex flex-1 items-center justify-center px-7 pt-16">
        <AnimatePresence mode="wait">
          {showStreak ? (
            <StreakCal key="streak" />
          ) : showWidget ? (
            <motion.div
              key="widget"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <WorkoutWidget speaking />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ash">
                On your home screen
              </span>
            </motion.div>
          ) : (
            <DayAhead key="day" />
          )}
        </AnimatePresence>
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <div className="min-h-[110px]">
          <Captions line={current} />
        </div>
        <CoachDock state="speaking" />
      </div>
    </div>
  );
}
