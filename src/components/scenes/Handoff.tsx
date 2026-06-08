"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions, CoachAura } from "@/components/Presence";
import { RealCoachCard } from "@/components/RealCoachCard";
import { CoachNote } from "@/components/CoachNote";
import { CoachDock } from "@/components/CoachDock";
import { TimeChip } from "@/components/ui";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.hoYou, LINES.hoAi, LINES.hoReal, LINES.hoDone];

export function Handoff({
  onComplete,
  muted,
}: {
  onComplete: () => void;
  muted: boolean;
}) {
  const { current, next } = useLineSequence(SEQ, {
    active: true,
    muted,
    onComplete: () => setTimeout(onComplete, 1600),
  });

  const id = current?.id;
  const speaker = current?.speaker ?? "ai";
  const isReal = speaker === "real";
  const escalating = id === LINES.hoAi.id;
  const done = id === LINES.hoDone.id;

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="absolute left-0 right-0 top-16 z-20 flex justify-center">
        <TimeChip time="6:18 PM" label="Check-in" />
      </div>

      <div className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimatePresence mode="wait">
          {isReal ? (
            <RealCoachCard
              key="real"
              text={current!.text}
              videoSrc="/video/remi-handoff.mp4"
              muted={muted}
              onEnded={next}
            />
          ) : done ? (
            <CoachNote
              key="note"
              from="Back Squat"
              to="Step-ups"
              reason="Remi adjusted this after your knee note"
              detail="lighter · reassess Friday"
            />
          ) : escalating ? (
            <Escalation key="esc" />
          ) : (
            <motion.div
              key="aura"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CoachAura size={150} speaking={speaker === "ai"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <div className="min-h-[110px]">
          {!isReal && <Captions line={current} size={24} />}
        </div>
        <CoachDock state={isReal ? "idle" : speaker === "you" ? "listening" : "speaking"} />
      </div>
    </div>
  );
}

/** AI twin visibly looping in the real human coach. */
function Escalation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-5"
    >
      <CoachAura size={92} speaking />
      <motion.div
        className="flex gap-1.5"
        initial="hidden"
        animate="show"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-volt"
            animate={{ opacity: [0.2, 1, 0.2], x: [0, 6, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </motion.div>
      <div className="grid h-[92px] w-[92px] place-items-center overflow-hidden rounded-full border border-ember/40">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url(/remi/portrait.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
      </div>
    </motion.div>
  );
}
