"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.evClose, LINES.evTomorrow];

export function Evening({
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
    endDelay: 1800,
    onComplete,
  });

  const showTomorrow = current?.id === LINES.evTomorrow.id;

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-7 pt-16">
        <div className="flex w-full flex-col gap-2.5">
          <RecapRow label="Trained" value="Foundation Day" />
          <RecapRow label="Hydrated" value="Water in" />
          <RecapRow label="Ate well" value="Protein hit" />
          <RecapRow label="Streak" value="4 days" highlight />
        </div>

        <AnimatePresence>
          {showTomorrow && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full rounded-2xl border border-volt/20 bg-white/[0.04] p-4"
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
                  Tomorrow · rest day
                </span>
              </div>
              <p className="truncate text-[14px] text-paper">
                Light walk, normal meals · earned it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <Captions line={current} size={24} />
        <CoachDock state="speaking" paused={paused} />
      </div>
    </div>
  );
}

function RecapRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <span
          className="grid h-5 w-5 place-items-center rounded-full"
          style={{ background: highlight ? "#e6ff0022" : "#54f46d22" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke={highlight ? "var(--color-volt)" : "var(--color-leaf)"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-[13px] text-ash-light">{label}</span>
      </div>
      <span
        className="text-[13px] font-semibold"
        style={{ color: highlight ? "var(--color-volt)" : "var(--color-paper)" }}
      >
        {value}
      </span>
    </div>
  );
}
