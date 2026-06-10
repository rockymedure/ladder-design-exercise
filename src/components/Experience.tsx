"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "./PhoneFrame";
import { LadderMark } from "./Logo";
import { CoachAura } from "./Presence";
import { ColdOpen } from "./scenes/ColdOpen";
import { Morning } from "./scenes/Morning";
import { MidMorning } from "./scenes/MidMorning";
import { InClass } from "./scenes/InClass";
import { Afternoon } from "./scenes/Afternoon";
import { Evening } from "./scenes/Evening";
import { SCENES } from "@/lib/script";

type SceneComponent = React.ComponentType<{
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}>;

const SCENE_COMPONENTS: SceneComponent[] = [
  ColdOpen,
  Morning,
  MidMorning,
  InClass,
  Afternoon,
  Evening,
];

export function Experience() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  const Current = SCENE_COMPONENTS[index];

  const advance = useCallback(() => {
    setIndex((i) => {
      if (i >= SCENE_COMPONENTS.length - 1) {
        setDone(true);
        return i;
      }
      return i + 1;
    });
  }, []);

  const restart = useCallback(() => {
    setDone(false);
    setPaused(false);
    setIndex(0);
    setStarted(true);
  }, []);

  const goTo = useCallback((i: number) => {
    setDone(false);
    setPaused(false);
    setIndex(i);
    setStarted(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-7">
      <PhoneFrame>
        <StatusBar />

        <div className="absolute inset-0">
          {!started ? (
            <StartGate onStart={() => setStarted(true)} />
          ) : (
            <div key={`scene-${index}`} className="scene-fade absolute inset-0">
              <Current onComplete={advance} muted={muted} paused={paused} />
            </div>
          )}

          <AnimatePresence>
            {done && <EndCard key="end" onReplay={restart} />}
          </AnimatePresence>
        </div>
      </PhoneFrame>

      <Director
        index={index}
        started={started}
        done={done}
        muted={muted}
        paused={paused}
        onMute={() => setMuted((m) => !m)}
        onTogglePlay={() => {
          if (!started) {
            setStarted(true);
            setPaused(false);
            return;
          }
          setPaused((p) => !p);
        }}
        onRestart={restart}
        onGoTo={goTo}
      />
    </div>
  );
}

function StartGate({ onStart }: { onStart: () => void }) {
  return (
    <motion.button
      onClick={onStart}
      className="absolute inset-0 grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 grid -translate-y-24 place-items-center opacity-40">
        <CoachAura size={360} speaking />
      </div>
      <div className="relative flex flex-col items-center gap-7">
        <LadderMark size={44} />
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
            Coach in your pocket
          </span>
          <span className="max-w-[250px] text-[14px] leading-snug text-ash-light">
            Ladder is the assistant that&apos;s with you all day — so the
            relationship, not the app, is the interface.
          </span>
        </div>
        <motion.span
          className="mt-2 rounded-full border border-white/15 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-paper"
          whileTap={{ scale: 0.96 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to begin
        </motion.span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-ash-dark">
          Sound on 🔊
        </span>
      </div>
    </motion.button>
  );
}

function EndCard({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 grid place-items-center bg-ink/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <LadderMark size={38} />
        <p className="max-w-[270px] text-[20px] font-semibold leading-snug text-paper">
          Less app. More coach. All day.
        </p>
        <button
          onClick={onReplay}
          className="rounded-full bg-volt px-6 py-2.5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink"
        >
          Replay
        </button>
      </div>
    </motion.div>
  );
}

function Director({
  index,
  started,
  done,
  muted,
  paused,
  onMute,
  onTogglePlay,
  onRestart,
  onGoTo,
}: {
  index: number;
  started: boolean;
  done: boolean;
  muted: boolean;
  paused: boolean;
  onMute: () => void;
  onTogglePlay: () => void;
  onRestart: () => void;
  onGoTo: (i: number) => void;
}) {
  const playing = started && !paused && !done;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1.5">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onGoTo(i)}
            className="group flex items-center"
            title={s.label}
          >
            <span
              className={`h-1.5 rounded-full transition-all ${
                started && i === index
                  ? "w-7 bg-volt"
                  : "w-1.5 bg-white/20 group-hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onRestart}
          title="Restart"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-ash transition hover:border-white/25 hover:text-paper"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={onTogglePlay}
          title={playing ? "Pause" : "Play"}
          className="grid h-12 w-12 place-items-center rounded-full bg-volt text-ink shadow-[0_8px_24px_-6px_rgba(230,255,0,0.5)] transition hover:scale-105 active:scale-95"
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 7 5.5Z" />
            </svg>
          )}
        </button>

        <button
          onClick={onMute}
          title={muted ? "Unmute" : "Mute"}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-ash transition hover:border-white/25 hover:text-paper"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 5 6 9H3v6h3l5 4V5Z M22 9l-6 6M16 9l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 5 6 9H3v6h3l5 4V5Z M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ash-dark">
        {!started
          ? "Ready"
          : done
            ? "Complete"
            : `${SCENES[index].label}${paused ? " · Paused" : ""}`}
      </div>
    </div>
  );
}
