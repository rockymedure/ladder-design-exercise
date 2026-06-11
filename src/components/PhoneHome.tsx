"use client";

import { motion } from "framer-motion";
import { LadderMark } from "@/components/Logo";

const WALLPAPERS = {
  morning:
    "linear-gradient(165deg,#f9d6a4 0%,#f1a878 36%,#c47081 70%,#5d3f64 100%)",
  afternoon:
    "linear-gradient(155deg,#c2a48b 0%,#9a7d68 40%,#5e4a3c 78%,#3a2d24 100%)",
};

export function HomeBackdrop({
  variant = "afternoon",
}: {
  variant?: keyof typeof WALLPAPERS;
}) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: WALLPAPERS[variant] }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(0,0,0,0.45))]" />
    </>
  );
}

export function LadderNotification({
  title = "Ladder",
  body,
  onTap,
}: {
  title?: string;
  body: string;
  onTap?: () => void;
}) {
  const Comp = onTap ? motion.button : motion.div;
  return (
    <Comp
      {...(onTap ? { type: "button" as const, onClick: onTap } : {})}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -70, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute left-3 right-3 top-14 z-30 flex items-start gap-3 rounded-[22px] border border-white/12 bg-black/55 p-3 text-left backdrop-blur-xl ${
        onTap ? "cursor-pointer" : ""
      }`}
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
            {title}
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-ash">
            now
          </span>
        </div>
        <p className="mt-0.5 text-[13px] leading-snug text-paper">{body}</p>
      </div>
    </Comp>
  );
}

export function PageDots({
  count = 6,
  active = 5,
}: {
  count?: number;
  active?: number;
}) {
  return (
    <div className="mb-4 flex justify-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: i === active ? "#ffffff" : "rgba(255,255,255,0.4)" }}
        />
      ))}
    </div>
  );
}

export function Dock() {
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
