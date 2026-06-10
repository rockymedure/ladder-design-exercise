"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "./PhoneFrame";
import { LadderMark } from "./Logo";

type SceneComp = React.ComponentType<{
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}>;

/**
 * A single beat of the prototype, playable on its own. It reuses the exact same
 * PhoneFrame and scene components as the full demo. Audio never autoplays: the
 * scene only mounts after the play button is tapped. A tiny module-level bus
 * keeps a single beat playing at a time so beats never talk over each other.
 */
const bus: { stop: null | (() => void) } = { stop: null };

export function ScenePlayer({
  scene: Scene,
  time,
  label,
}: {
  scene: SceneComp;
  time: string;
  label: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [done, setDone] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const stopRef = useRef<() => void>(() => {});
  stopRef.current = () => {
    setPlaying(false);
    setPaused(false);
    setDone(false);
  };

  const start = () => {
    if (bus.stop && bus.stop !== stopRef.current) bus.stop();
    bus.stop = stopRef.current;
    setRunKey((k) => k + 1);
    setDone(false);
    setPaused(false);
    setPlaying(true);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <PhoneFrame>
        <StatusBar time={playing ? time : "9:41"} />
        <div className="absolute inset-0">
          {playing ? (
            <Scene
              key={runKey}
              muted={muted}
              paused={paused}
              onComplete={() => setDone(true)}
            />
          ) : (
            <Poster label={label} onPlay={start} />
          )}

          <AnimatePresence>
            {done && <ReplayVeil key="replay" onReplay={start} />}
          </AnimatePresence>
        </div>
      </PhoneFrame>

      <div className="h-9">
        <AnimatePresence>
          {playing && !done && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <CtrlButton title="Restart" onClick={start}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CtrlButton>
              <CtrlButton
                title={paused ? "Play" : "Pause"}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 7 5.5Z" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                )}
              </CtrlButton>
              <CtrlButton
                title={muted ? "Unmute" : "Mute"}
                onClick={() => setMuted((m) => !m)}
              >
                {muted ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 5 6 9H3v6h3l5 4V5Z M22 9l-6 6M16 9l6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 5 6 9H3v6h3l5 4V5Z M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </CtrlButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CtrlButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-ash transition hover:border-white/35 hover:text-paper"
    >
      {children}
    </button>
  );
}

function Poster({ label, onPlay }: { label: string; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group absolute inset-0 flex flex-col items-center justify-center gap-7 bg-[#070707]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 38%, rgba(230,255,0,0.08), transparent 70%)",
        }}
      />
      <div className="relative opacity-30">
        <LadderMark size={40} />
      </div>
      <span className="relative grid place-items-center">
        <span
          className="animate-breathe absolute h-20 w-20 rounded-full"
          style={{ background: "radial-gradient(circle, #e6ff0033, transparent 70%)" }}
        />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-volt text-ink shadow-[0_10px_30px_-6px_rgba(230,255,0,0.5)] transition group-hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 7 5.5Z" />
          </svg>
        </span>
      </span>
      <div className="relative flex flex-col items-center gap-1.5">
        <span className="font-display text-[15px] font-semibold uppercase tracking-[0.3em] text-paper">
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-[0.25em] text-ash">
          Tap to play
        </span>
      </div>
    </button>
  );
}

function ReplayVeil({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.button
      onClick={onReplay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4 }}
      className="absolute inset-0 z-50 grid place-items-center bg-ink/40 backdrop-blur-[2px]"
    >
      <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-paper backdrop-blur-md">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Replay
      </span>
    </motion.button>
  );
}
