"use client";

import { motion } from "framer-motion";
import { Waveform } from "./Presence";

/**
 * The persistent "in my pocket" presence. Always docked at the bottom so the
 * coach is never more than a glance or a word away. Reacts to who's talking.
 */
export function CoachDock({
  state = "idle",
  paused = false,
}: {
  state?: "idle" | "speaking" | "listening";
  paused?: boolean;
}) {
  const listening = state === "listening";
  const speaking = state === "speaking";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex w-[88%] items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl"
    >
      {/* presence orb */}
      <span className="relative grid h-9 w-9 shrink-0 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={
            paused
              ? { scale: 1, opacity: 0.4 }
              : {
                  scale: speaking ? [1, 1.25, 1] : [1, 1.12, 1],
                  opacity: [0.5, 0.2, 0.5],
                }
          }
          transition={
            paused
              ? { duration: 0.3 }
              : { duration: speaking ? 1 : 2.6, repeat: Infinity }
          }
          style={{ background: "radial-gradient(circle, #e6ff0066, transparent 70%)" }}
        />
        <span
          className="h-3 w-3 rounded-full bg-volt"
          style={{ boxShadow: "0 0 18px #e6ff00" }}
        />
      </span>

      <div className="flex flex-1 flex-col">
        <span className="text-[12px] font-semibold text-paper">Ladder</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ash">
          {listening ? "Listening…" : speaking ? "Speaking" : "Always here"}
        </span>
      </div>

      {speaking ? (
        <Waveform color="var(--color-volt)" bars={4} active={!paused} />
      ) : (
        <span className={`text-ash ${listening ? "text-volt" : ""}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
            <path
              d="M5 11a7 7 0 0 0 14 0M12 18v3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </motion.div>
  );
}
