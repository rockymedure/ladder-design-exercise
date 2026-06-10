"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.icOpen, LINES.icCue, LINES.icPush];

const ROUNDS = 5;
const ROUND_SECONDS = 45;

/**
 * The eyes-off moment. You've dropped into another team's live class, phone down,
 * and Ladder coaches you through it in your ear — borrowing Ladder's real
 * in-workout language (segmented rounds, a ticking interval timer) but dimming
 * the screen so the voice, not the UI, leads.
 */
export function InClass({
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

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#080808]">
      {/* immersive, gritty backdrop — dimmed for eyes-off */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #1a1a16 0%, #0c0c0c 45%, #060606 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 42%, rgba(230,255,0,0.10), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* top: live + class + segmented round progress */}
      <div className="relative z-20 px-6 pt-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-volt"
              style={{ boxShadow: "0 0 12px #e6ff00" }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">
              Live · 1:02 PM
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
            Sunrise Crew
          </span>
        </div>
        <p className="mt-2 text-[15px] font-semibold text-paper">
          Mobility &amp; Flow
        </p>
        <div className="mt-2.5 flex gap-1.5">
          {Array.from({ length: ROUNDS }).map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full"
              style={{
                background: i < 3 ? "var(--color-volt)" : "rgba(255,255,255,0.14)",
                boxShadow: i < 3 ? "0 0 8px rgba(230,255,0,0.5)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* center: the eyes-off hero — round, move, ticking timer */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ash">
          Round 3 of 5
        </span>
        <span className="text-[22px] font-semibold tracking-tight text-paper">
          Deep Lunge + Reach
        </span>
        <CountdownTimer paused={paused} />
        <div className="mt-1 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5">
          <DimGlyph />
          <span className="text-[11px] text-ash-light">
            Screen dimmed — phone down, I&apos;ve got you
          </span>
        </div>
      </div>

      {/* bottom: Ladder in your ear */}
      <div className="relative z-20 flex flex-col gap-4 pb-6">
        <div className="min-h-[110px]">
          <Captions line={current} size={24} />
        </div>
        <CoachDock state="speaking" />
      </div>
    </div>
  );
}

/** A live-feeling interval timer that ticks down and loops, pause-aware. */
function CountdownTimer({ paused }: { paused: boolean }) {
  const [secs, setSecs] = useState(ROUND_SECONDS);
  const ref = useRef(ROUND_SECONDS);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      ref.current = ref.current <= 0 ? ROUND_SECONDS : ref.current - 1;
      setSecs(ref.current);
    }, 1000);
    return () => clearInterval(t);
  }, [paused]);

  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div className="flex items-baseline gap-1 font-display tabular-nums">
      <span
        className="text-[64px] font-bold leading-none text-paper"
        style={{ textShadow: "0 0 40px rgba(230,255,0,0.25)" }}
      >
        {mm}:{ss}
      </span>
    </div>
  );
}

function DimGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="var(--color-volt)" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
        stroke="var(--color-volt)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
