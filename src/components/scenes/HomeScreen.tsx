"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LadderMark } from "@/components/Logo";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.hwReady];

/**
 * Home screen → widget tap. At workout time Ladder pings you on your home
 * screen; tapping the Foundation Day widget launches you straight into the
 * session. Reinforces "coach in your pocket" — Ladder works outside the app too.
 */
export function HomeScreen({
  onComplete,
  muted,
  paused,
}: {
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}) {
  const [tapped, setTapped] = useState(false);

  const { current } = useLineSequence(SEQ, {
    active: true,
    muted,
    paused,
    endDelay: 400,
    onComplete: () => setTapped(true),
  });

  useEffect(() => {
    if (!tapped || paused) return;
    const t = setTimeout(onComplete, 1200);
    return () => clearTimeout(t);
  }, [tapped, paused, onComplete]);

  const speaking = !!current && !tapped;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg,#c2a48b 0%,#9a7d68 40%,#5e4a3c 78%,#3a2d24 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(0,0,0,0.45))]" />

      {/* home screen content */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-[118px]">
        <div className="flex flex-col items-start gap-2">
          <WorkoutWidget tapped={tapped} speaking={speaking} />
          <span className="pl-1 text-[12px] font-medium text-white drop-shadow">
            Ladder
          </span>
        </div>

        <div className="flex-1" />

        <PageDots />
        <Dock />
      </div>

      {/* Ladder notification banner */}
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -70, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-3 right-3 top-14 z-30 flex items-start gap-3 rounded-[22px] border border-white/12 bg-black/55 p-3 backdrop-blur-xl"
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px]"
              style={{ background: "var(--color-volt)" }}
            >
              <LadderMark size={18} color="#0a0a0a" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
                  Ladder
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-ash">
                  now
                </span>
              </div>
              <p className="mt-0.5 text-[13px] leading-snug text-paper">
                {current?.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorkoutWidget({
  tapped,
  speaking,
}: {
  tapped: boolean;
  speaking: boolean;
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
        <img
          src="/photos/inclass-next.png"
          alt=""
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

function PageDots() {
  return (
    <div className="mb-4 flex justify-center gap-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: i === 5 ? "#ffffff" : "rgba(255,255,255,0.4)" }}
        />
      ))}
    </div>
  );
}

function Dock() {
  return (
    <div className="mb-3 flex items-center justify-between rounded-[30px] border border-white/15 bg-white/15 px-3.5 py-3 backdrop-blur-2xl">
      <AppIcon badge="752" bg="linear-gradient(180deg,#5ed666,#2bb13a)">
        <PhoneGlyph />
      </AppIcon>
      <AppIcon badge="277" bg="linear-gradient(180deg,#54e15f,#27b53b)">
        <MessageGlyph />
      </AppIcon>
      <AppIcon bg="#ffffff">
        <ChromeGlyph />
      </AppIcon>
      <AppIcon bg="linear-gradient(180deg,#fb5b6b,#e23150)">
        <MusicGlyph />
      </AppIcon>
    </div>
  );
}

function AppIcon({
  children,
  bg,
  badge,
}: {
  children: React.ReactNode;
  bg: string;
  badge?: string;
}) {
  return (
    <div className="relative">
      <span
        className="grid h-[52px] w-[52px] place-items-center rounded-[14px]"
        style={{ background: bg }}
      >
        {children}
      </span>
      {badge && (
        <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ff3b30] px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 3.5c.6 0 1.1.4 1.3 1l.9 2.6c.2.6 0 1.2-.5 1.6l-1.2.9a13 13 0 0 0 5.8 5.8l.9-1.2c.4-.5 1-.7 1.6-.5l2.6.9c.6.2 1 .7 1 1.3v2.8c0 .9-.8 1.6-1.7 1.5C9.6 20.9 3.1 14.4 2.3 6.2 2.2 5.3 2.9 4.5 3.8 4.5h2.8Z"
        fill="#fff"
      />
    </svg>
  );
}

function MessageGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4c4.97 0 9 3.13 9 7s-4.03 7-9 7c-1 0-1.96-.13-2.85-.36L4.5 19.5l.9-3.2C4.02 15.02 3 13.1 3 11c0-3.87 4.03-7 9-7Z"
        fill="#fff"
      />
    </svg>
  );
}

function ChromeGlyph() {
  return (
    <span
      className="grid h-[30px] w-[30px] place-items-center rounded-full"
      style={{
        background:
          "conic-gradient(#ea4335 0 25%,#fbbc05 25% 50%,#34a853 50% 75%,#4285f4 75% 100%)",
      }}
    >
      <span className="h-[13px] w-[13px] rounded-full bg-white" />
      <span className="absolute h-[8px] w-[8px] rounded-full bg-[#4285f4]" />
    </span>
  );
}

function MusicGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 17V7l9-2v10"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="17.5" r="2.5" fill="#fff" />
      <circle cx="15.5" cy="15.5" r="2.5" fill="#fff" />
    </svg>
  );
}
