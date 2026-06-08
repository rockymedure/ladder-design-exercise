"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PrimaryButton({
  children,
  onClick,
  color = "volt",
}: {
  children: ReactNode;
  onClick?: () => void;
  color?: "volt" | "leaf";
}) {
  const bg = color === "leaf" ? "var(--color-leaf)" : "var(--color-volt)";
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="font-display relative w-full overflow-hidden rounded-full py-4 text-[16px] font-bold uppercase tracking-[0.06em] text-ink"
      style={{ background: bg }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
        }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  );
}

export function TimeChip({ time, label }: { time: string; label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md"
    >
      <span className="text-[11px] font-semibold tracking-[0.1em] text-paper tnum">
        {time}
      </span>
      {label && (
        <>
          <span className="h-1 w-1 rounded-full bg-ash-dark" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ash">
            {label}
          </span>
        </>
      )}
    </motion.div>
  );
}

export function MicPill({ label = "Listening…" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-3.5 backdrop-blur-md"
    >
      <span className="relative grid h-7 w-7 place-items-center rounded-full bg-volt">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="12" rx="3" fill="#0e0e0e" />
          <path
            d="M5 11a7 7 0 0 0 14 0M12 18v3"
            stroke="#0e0e0e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[13px] font-medium text-ash-light">{label}</span>
    </motion.div>
  );
}
