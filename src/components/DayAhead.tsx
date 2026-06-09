"use client";

import { motion } from "framer-motion";

/**
 * The morning open: a calendar-aware look at the day ahead. Rung reads your
 * real schedule and fits movement + food into the gaps — the practical,
 * "works around my life" value, before any coach message.
 */
export function DayAhead() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[300px] overflow-hidden rounded-[26px] border border-white/10 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper">
          Your day ahead
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Tue · Wk 3
        </span>
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        <Row
          accent="var(--color-volt)"
          kind="Move"
          title="Easy push · 15 min"
          slot="after 6:00 PM"
        />
        <Row
          accent="var(--color-leaf)"
          kind="Eat"
          title="Protein focus · ~120g"
          slot="12:30 gap"
        />

        <div className="mt-1 flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5">
          <CalendarGlyph />
          <span className="text-[11.5px] leading-snug text-ash">
            You&apos;re booked 9–12 &amp; 2–5 — I worked around it.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Row({
  accent,
  kind,
  title,
  slot,
}: {
  accent: string;
  kind: string;
  title: string;
  slot: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
      />
      <div className="flex flex-1 flex-col">
        <span
          className="text-[9.5px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {kind}
        </span>
        <span className="text-[14px] font-semibold text-paper">{title}</span>
      </div>
      <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10.5px] font-medium text-ash-light">
        {slot}
      </span>
    </div>
  );
}

function CalendarGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="var(--color-ash)"
        strokeWidth="2"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="var(--color-ash)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
