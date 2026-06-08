"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { LadderMark } from "@/components/Logo";
import { CoachAura } from "@/components/Presence";

export function ColdOpen({
  onComplete,
}: {
  onComplete: () => void;
  muted?: boolean;
}) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CoachAura size={300} speaking />
        </motion.div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <LadderMark size={46} />
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
            Coach in your pocket
          </span>
          <span className="max-w-[230px] text-[13px] leading-snug text-ash">
            Your real coach — with you all day.
          </span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-16 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ delay: 2.4, duration: 1.4 }}
      >
        <span className="text-[12px] uppercase tracking-[0.25em] text-ash-dark">
          A day with Remi
        </span>
      </motion.div>
    </div>
  );
}
