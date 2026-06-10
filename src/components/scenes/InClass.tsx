"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Captions } from "@/components/Presence";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.icHandoff, LINES.icWork, LINES.icBack];

const ROUND_SECONDS = 45;
const BLUE = "#6cc1ff";

/**
 * The in-class moment, mapped onto Ladder's real coached-workout screen:
 * a full-bleed photo of the lift, a live stats row, set progress, an up-next
 * card, the volt arc timer with reps/weight, and the journal bar. Our layer is
 * the sherpa staging: Ladder gets you in, goes silent while the class runs
 * (the deliberate quiet where the coach has the room), then picks you back up.
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

  const working = current?.id === LINES.icWork.id;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* hero video of the lift (generated, image-to-video) */}
      <motion.video
        src="/videos/inclass-hero.mp4"
        poster="/photos/inclass-hero.png"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        initial={false}
        animate={{ filter: working ? "brightness(0.95)" : "brightness(0.45)" }}
        transition={{ duration: 0.7 }}
      />
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/85 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        {/* top chrome: the live class, only while it's running */}
        <div className="px-5 pt-14">
          <AnimatePresence>
            {working && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start justify-between">
                  <StatsRow />
                  <TopIcons />
                </div>
                <RoundProgress total={8} done={5} />
                <UpNext />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1" />

        {/* bottom: class controls while Ladder is silent; Ladder otherwise */}
        <div className="px-5 pb-6">
          <AnimatePresence mode="wait">
            {working ? (
              <motion.div
                key="class"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <WorkoutControls paused={paused} />
                <JournalBar />
                <StandBy />
              </motion.div>
            ) : (
              <motion.div
                key="ladder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4"
              >
                <div className="min-h-[110px]">
                  <Captions line={current} size={24} />
                </div>
                <CoachDock state="speaking" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Live timer • progress • heart rate, one line, Druk-style numerals. */
function StatsRow() {
  return (
    <div className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-tight text-paper tnum">
      <span>7:30</span>
      <Dot />
      <span>60%</span>
      <Dot />
      <span className="flex items-center gap-1.5">
        <HeartIcon />
        128
      </span>
    </div>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-ash" />;
}

function TopIcons() {
  return (
    <div className="flex items-center gap-2">
      <IconButton>
        <MusicIcon />
      </IconButton>
      <IconButton>
        <SlidersIcon />
      </IconButton>
    </div>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/30 text-paper backdrop-blur-md">
      {children}
    </span>
  );
}

function RoundProgress({ total, done }: { total: number; done: number }) {
  return (
    <div className="mt-3 flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] flex-1 rounded-full"
          style={{
            background: i < done ? "var(--color-paper)" : "rgba(255,255,255,0.22)",
            boxShadow:
              i === done - 1 ? "0 0 8px rgba(230,255,0,0.8)" : "none",
          }}
        />
      ))}
    </div>
  );
}

/** Up-next card: real thumbnail, single-line label, blue load accent. */
function UpNext() {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-[15px] border border-white/10 bg-black/40 p-2.5 backdrop-blur-md">
      <img
        src="/photos/inclass-next.png"
        alt=""
        className="h-[52px] w-[52px] shrink-0 rounded-[10px] object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-volt">
          Up next · Set 4
        </span>
        <span className="truncate text-[14px] font-semibold text-paper">
          Back Squat
        </span>
      </div>
      <div className="flex items-center gap-1.5 pr-1">
        <span className="font-display text-[18px] font-bold text-paper">
          30
        </span>
        <span className="text-[11px] text-ash">lbs</span>
        <span
          className="ml-1 text-[13px] font-semibold"
          style={{ color: BLUE }}
        >
          70%
        </span>
      </div>
    </div>
  );
}

/** reps · timer (volt arc) · weight. */
function WorkoutControls({ paused }: { paused: boolean }) {
  return (
    <div className="flex items-end justify-between">
      <Metric value="8" label="reps" />
      <CountdownGauge paused={paused} />
      <Metric value="135" label="lbs" />
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 pb-2">
      <span className="font-display text-[34px] font-bold leading-none tracking-tight text-paper">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.12em] text-ash">
        {label}
      </span>
    </div>
  );
}

/** A live interval timer ringed by a volt tick-gauge that fills as it runs. */
function CountdownGauge({ paused }: { paused: boolean }) {
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

  const progress = 1 - secs / ROUND_SECONDS;
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="relative grid place-items-center">
      <TickArc progress={progress} />
      <span
        className="absolute font-display text-[44px] font-bold leading-none tracking-tight text-paper"
        style={{ textShadow: "0 0 30px rgba(230,255,0,0.3)" }}
      >
        {mm}:{ss}
      </span>
    </div>
  );
}

function TickArc({ progress }: { progress: number }) {
  const N = 26;
  const W = 200;
  const cx = W / 2;
  const cy = 96;
  const R = 88;
  const inner = R - 11;
  const lit = Math.round(progress * N);

  return (
    <svg width={W} height={108} viewBox={`0 0 ${W} 108`} fill="none">
      {Array.from({ length: N }).map((_, i) => {
        const t = i / (N - 1);
        const theta = Math.PI + t * Math.PI; // 180° -> 360°, over the top
        const x1 = cx + R * Math.cos(theta);
        const y1 = cy + R * Math.sin(theta);
        const x2 = cx + inner * Math.cos(theta);
        const y2 = cy + inner * Math.sin(theta);
        const on = i < lit;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={on ? "var(--color-volt)" : "rgba(255,255,255,0.18)"}
            strokeWidth={3}
            strokeLinecap="round"
            style={on ? { filter: "drop-shadow(0 0 3px #e6ff00)" } : undefined}
          />
        );
      })}
    </svg>
  );
}

/** The Ladder journal bar at the bottom of the class. */
function JournalBar() {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 py-2.5 backdrop-blur-md">
      <span
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
        style={{ background: "color-mix(in srgb, var(--color-leaf) 22%, transparent)" }}
      >
        <CheckIcon />
      </span>
      <span className="flex-1 truncate text-[14px] font-semibold text-paper">
        Romanian Deadlift <span className="text-ash">·</span>{" "}
        <span style={{ color: BLUE }}>70%</span>
      </span>
      <span className="text-[13px] font-semibold text-volt">3 of 5</span>
    </div>
  );
}

/** The deliberate silence: Ladder steps back while the coach has the room. */
function StandBy() {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ash"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </span>
      <span className="text-[12px] font-medium text-ash">
        Ladder stepped back · coach has the room
      </span>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2 5 5.5 5c2 0 3.4 1.1 4.5 2.6C11.1 6.1 12.5 5 14.5 5 18 5 19.6 8.6 22 11.7 19.5 16.3 12 21 12 21Z"
        fill="var(--color-ember)"
      />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18V6l10-2v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h10M18 8h2M4 16h2M10 16h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="8" r="2.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="16" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="var(--color-leaf)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
