"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LadderMark } from "@/components/Logo";

/**
 * The Foundation Day home-screen widget. Shared between the morning kickoff
 * (where Ladder says it's on your home screen) and the Home screen scene
 * (where you tap it), so the hand-off transitions cleanly into the same object.
 */
export function WorkoutWidget({
  tapped = false,
  speaking = false,
}: {
  tapped?: boolean;
  speaking?: boolean;
}) {
  return (
    <div className="relative">
      {/* attention ring while Ladder speaks */}
      <AnimatePresence>
        {speaking && (
          <motion.div
            className="pointer-events-none absolute -inset-1.5 rounded-[28px] border-2 border-volt"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.9, 0.25], scale: [1, 1.03, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-[154px] w-[154px] overflow-hidden rounded-[24px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
        animate={tapped ? { scale: [1, 0.9, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          src="/videos/inclass-hero.mp4"
          poster="/photos/inclass-hero.png"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/20" />

        <div className="absolute right-3 top-3">
          <LadderMark size={16} color="#ffffff" />
        </div>

        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="grid h-4 w-4 place-items-center rounded-full"
              style={{ background: "var(--color-volt)" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="#0a0a0a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="h-2 w-2 rounded-full border border-white/60" />
            <span className="h-2 w-2 rounded-full border border-white/60" />
          </div>
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/80">
            Today&apos;s Workout
          </span>
          <span className="font-display text-[19px] font-bold uppercase leading-[0.95] text-white">
            Foundation
            <br />
            Day
          </span>
        </div>

        {/* tap ripple */}
        <AnimatePresence>
          {tapped && (
            <motion.span
              className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
