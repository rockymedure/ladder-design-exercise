"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions, CoachAura } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { TimeChip } from "@/components/ui";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.mmPitch, LINES.mmYou, LINES.mmAdd];

/**
 * The "beyond-the-UI" move. Ladder reaches past your fixed plan and offers a live
 * class from a *different* Ladder team — something the structured app would never
 * surface on its own. This is where one assistant scales every coach in the network.
 */
export function MidMorning({
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
  const joined = id === LINES.mmAdd.id;
  const dockState = speaker === "you" ? "listening" : "speaking";

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="absolute left-0 right-0 top-16 z-20 flex justify-center">
        <TimeChip time="10:24 AM" label="A nudge" />
      </div>

      <div className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimatePresence mode="wait">
          {speaker === "you" ? (
            <motion.div
              key="aura"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CoachAura size={150} speaking={false} />
            </motion.div>
          ) : (
            <ClassCard key="class" joined={joined} />
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

function ClassCard({ joined }: { joined: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[290px] overflow-hidden rounded-[24px] border border-volt/25 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-volt"
            style={{ boxShadow: "0 0 12px #e6ff00" }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
            From another team
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Cross-team
        </span>
      </div>

      <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-[#26210a] to-[#0e0e0e]">
        <div className="absolute inset-0 grid place-items-center text-[52px] opacity-80">
          🤸
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
        <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-volt backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-volt" /> Live · 1:00 PM
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-ash">
          Sunrise Crew
        </p>
        <p className="mt-1 text-[17px] font-semibold leading-tight text-paper">
          Mobility &amp; Flow
        </p>
        <p className="mt-2 text-[12px] leading-snug text-ash-light">
          A live class from a team you&apos;re not on — matched to your easy-push
          day. Your own plan resumes tomorrow.
        </p>

        {joined ? (
          <div className="mt-3.5 flex items-center justify-center gap-2 rounded-full bg-volt/15 py-2.5 text-[13px] font-semibold text-volt">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            You&apos;re in — see you at 1
          </div>
        ) : (
          <div className="mt-3.5 flex items-center gap-2">
            <button className="flex-1 rounded-full bg-volt py-2.5 text-center text-[13px] font-semibold text-ink">
              Drop me in
            </button>
            <button className="rounded-full border border-white/12 px-4 py-2.5 text-[13px] font-medium text-ash-light">
              Not today
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
