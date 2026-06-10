"use client";

import { motion } from "framer-motion";

/**
 * The morning open: a calendar-aware look at the day ahead. Ladder reads your
 * real schedule and fits movement + food into the gaps, the practical,
 * "works around my life" value, before any coach message.
 */
export function DayAhead() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full overflow-hidden rounded-[20px] border border-white/10 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2.5">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-paper">
          Your day ahead
        </span>
        <span className="text-[9.5px] uppercase tracking-[0.16em] text-ash">
          Tue · Wk 3
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2.5 py-1.5">
          <CheckGlyph />
          <span className="truncate text-[11px] text-ash">
            Yesterday complete ·{" "}
            <span className="font-semibold text-paper">3-day streak</span>
          </span>
        </div>

        <Row
          accent="var(--color-volt)"
          kind="Move"
          title="Foundation Day"
          slot="1 PM"
        />
        <Row
          accent="var(--color-leaf)"
          kind="Eat"
          title="Protein · 130g"
          slot="1:30"
        />
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
    <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] px-2.5 py-2">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
      />
      <div className="flex flex-1 items-baseline gap-2">
        <span
          className="text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          {kind}
        </span>
        <span className="truncate text-[12.5px] font-semibold text-paper">{title}</span>
      </div>
      <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-ash-light">
        {slot}
      </span>
    </div>
  );
}

function CheckGlyph() {
  return (
    <span
      className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
      style={{ background: "color-mix(in srgb, var(--color-leaf) 18%, transparent)" }}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="var(--color-leaf)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

