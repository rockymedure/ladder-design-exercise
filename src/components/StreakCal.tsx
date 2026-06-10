"use client";

import { motion } from "framer-motion";

type Day = {
  label: string;
  date: number;
  done?: boolean;
  today?: boolean;
};

// 3-day streak landing today: Sun–Tue complete, Wed is today (still to do).
const WEEK: Day[] = [
  { label: "Sun", date: 5, done: true },
  { label: "Mon", date: 6, done: true },
  { label: "Tue", date: 7, done: true },
  { label: "Wed", date: 8, today: true },
  { label: "Thu", date: 9 },
  { label: "Fri", date: 10 },
  { label: "Sat", date: 11 },
];

/**
 * Streak celebration. Before the day-ahead, Ladder pauses to mark the win:
 * a big count and a week strip with the consecutive days filled in.
 */
export function StreakCal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full overflow-hidden rounded-[20px] border border-volt/25 bg-ink-card"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
          Current streak
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
          Week 3
        </span>
      </div>

      <div className="flex items-end gap-2.5 px-4 pt-4">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 18 }}
          className="font-display text-[52px] font-bold leading-[0.8] text-volt"
        >
          3
        </motion.span>
        <span className="pb-1.5 font-display text-[15px] font-bold uppercase leading-none tracking-[0.02em] text-paper">
          days
          <br />
          in a row
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 px-3 pb-4 pt-4">
        {WEEK.map((d, i) => (
          <DayPill key={d.label} day={d} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function DayPill({ day, index }: { day: Day; index: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className="text-[9px] font-semibold uppercase tracking-[0.08em]"
        style={{
          color: day.today
            ? "var(--color-volt)"
            : day.done
              ? "var(--color-ash-light)"
              : "var(--color-ash-dark)",
        }}
      >
        {day.label}
      </span>

      {day.done ? (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3 + index * 0.12,
            type: "spring",
            stiffness: 360,
            damping: 16,
          }}
          className="grid h-7 w-7 place-items-center rounded-full"
          style={{ background: "var(--color-volt)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#0a0a0a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      ) : day.today ? (
        <motion.span
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(230,255,0,0.0)",
              "0 0 0 4px rgba(230,255,0,0.18)",
              "0 0 0 0 rgba(230,255,0,0.0)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-7 w-7 place-items-center rounded-full border-2 border-volt text-[11px] font-semibold text-volt"
        >
          {day.date}
        </motion.span>
      ) : (
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-[11px] font-medium text-ash-dark">
          {day.date}
        </span>
      )}
    </div>
  );
}
