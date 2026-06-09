"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "./PhoneFrame";
import { LadderMark } from "./Logo";
import { CoachAura } from "./Presence";
import { ColdOpen } from "./scenes/ColdOpen";
import { Morning } from "./scenes/Morning";
import { Eat } from "./scenes/Eat";
import { Handoff } from "./scenes/Handoff";
import { Evening } from "./scenes/Evening";
import { SCENES } from "@/lib/script";

type SceneComponent = React.ComponentType<{
  onComplete: () => void;
  muted: boolean;
}>;

const SCENE_COMPONENTS: SceneComponent[] = [
  ColdOpen,
  Morning,
  Eat,
  Handoff,
  Evening,
];

export function Experience() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(false);

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
    setIndex(0);
    setStarted(true);
  }, []);

  const goTo = useCallback((i: number) => {
    setDone(false);
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
              <Current onComplete={advance} muted={muted} />
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
        muted={muted}
        onMute={() => setMuted((m) => !m)}
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
            Remi is your coach. Rung is the assistant that carries her with you
            all day.
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
          Your coach, human. Rung, always there.
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
  muted,
  onMute,
  onRestart,
  onGoTo,
}: {
  index: number;
  started: boolean;
  muted: boolean;
  onMute: () => void;
  onRestart: () => void;
  onGoTo: (i: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
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
      <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.15em] text-ash">
        <button onClick={onRestart} className="transition hover:text-paper">
          ↺ Restart
        </button>
        <span className="text-ash-dark">·</span>
        <button onClick={onMute} className="transition hover:text-paper">
          {muted ? "🔇 Muted" : "🔊 Sound on"}
        </button>
        <span className="text-ash-dark">·</span>
        <span className="text-ash-dark normal-case tracking-normal">
          {started ? SCENES[index].label : "Ready"}
        </span>
      </div>
    </div>
  );
}
