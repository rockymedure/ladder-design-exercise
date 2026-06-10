"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions, CoachAura } from "@/components/Presence";
import { DayAhead } from "@/components/DayAhead";
import { CoachDock } from "@/components/CoachDock";
import { TimeChip } from "@/components/ui";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.amGreet, LINES.amClose];

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

  const speaker = current?.speaker ?? "ai";
  const isDay = current?.id === LINES.amGreet.id;

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="absolute left-0 right-0 top-16 z-20 flex justify-center">
        <TimeChip time="7:02 AM" label="Good morning" />
      </div>

      <div className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimatePresence mode="wait">
          {isDay ? (
            <DayAhead key="day" />
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
          <Captions line={current} />
        </div>
        <CoachDock state="speaking" />
      </div>
    </div>
  );
}
