"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Line } from "@/lib/script";

/** A live voice waveform that animates while Ladder speaks. */
export function Waveform({
  color = "var(--color-volt)",
  bars = 5,
  active = true,
}: {
  color?: string;
  bars?: number;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 18 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: color }}
          animate={
            active
              ? { height: [5, 16, 8, 18, 6], opacity: [0.7, 1, 0.8, 1, 0.7] }
              : { height: 4, opacity: 0.4 }
          }
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Caption rail. Two speakers in this cut:
 *  - "ai"  Ladder (the assistant): attribution lives in the bottom dock
 *  - "you" the member, right-aligned with a "You" tag + mic glyph
 * Voice for action: this is the main UI mid-flow.
 */
export function Captions({
  line,
  size = 26,
}: {
  line: Line | null;
  size?: number;
}) {
  const speaker = line?.speaker ?? "ai";
  const isYou = speaker === "you";

  return (
    <div className="min-h-[120px] w-full px-7">
      <AnimatePresence mode="wait">
        {line && (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={isYou ? "text-right" : "text-left"}
          >
            {isYou && (
              <div className="mb-2.5 flex items-center justify-end gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
                  You
                </span>
                <span className="text-ash">
                  <MicGlyph />
                </span>
              </div>
            )}
            <p
              className="font-semibold leading-[1.18] tracking-[-0.01em]"
              style={{
                fontSize: size,
                color: isYou ? "var(--color-ash-light)" : "var(--color-paper)",
              }}
            >
              {line.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MicGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
