"use client";

import { motion } from "framer-motion";

/** "Text for proof" — the legible, correctable reason behind an adaptation. */
export function CoachNote({
  from,
  to,
  reason,
  detail,
}: {
  from: string;
  to: string;
  reason: string;
  detail?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-volt/20 bg-white/[0.05] p-4 backdrop-blur-md"
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-volt/15">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="var(--color-volt)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-volt">
          Remi adapted today
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-[15px] font-medium text-ash line-through decoration-ash-dark">
          {from}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="var(--color-ash)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[16px] font-semibold text-paper">{to}</span>
      </div>

      <p className="mt-2 text-[13px] leading-snug text-ash">
        {reason}
        {detail && <span className="text-ash-dark"> · {detail}</span>}
      </p>
    </motion.div>
  );
}
