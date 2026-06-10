"use client";

import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import { PhoneFrame, StatusBar } from "./PhoneFrame";

type SceneComp = React.ComponentType<{
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}>;

/**
 * A single beat of the prototype, playable on its own. It reuses the exact same
 * PhoneFrame and scene components as the full demo.
 *
 * Before you press play the phone shows a live, *muted* preview of the scene so
 * there's real movement on screen (the workout video, cards animating, the
 * presence dock). The preview only runs while the phone is in view, and pressing
 * play restarts the scene from the top with sound. A tiny module-level bus keeps
 * a single beat playing (with audio) at a time so beats never talk over each
 * other.
 */
const bus: { stop: null | (() => void) } = { stop: null };

export function ScenePlayer({
  scene: Scene,
  time,
  label,
  nextId,
}: {
  scene: SceneComp;
  time: string;
  label: string;
  nextId?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [done, setDone] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [previewKey, setPreviewKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-12% 0px -12% 0px" });
  const inViewRef = useRef(inView);
  inViewRef.current = inView;

  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollAnim = useRef<AnimationPlaybackControls | null>(null);
  const clearScroll = () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = null;
    if (scrollAnim.current) {
      scrollAnim.current.stop();
      scrollAnim.current = null;
    }
  };

  const stopRef = useRef<() => void>(() => {});
  stopRef.current = () => {
    clearScroll();
    setPlaying(false);
    setPaused(false);
    setDone(false);
  };

  const start = () => {
    if (bus.stop && bus.stop !== stopRef.current) bus.stop();
    bus.stop = stopRef.current;
    clearScroll();
    setRunKey((k) => k + 1);
    setDone(false);
    setPaused(false);
    setPlaying(true);
  };

  // When a beat finishes, glide to the next one, but only if this phone is still
  // on screen, so it never yanks the page if you've scrolled elsewhere.
  const handleComplete = () => {
    setDone(true);
    if (!nextId) return;
    clearScroll();
    scrollTimer.current = setTimeout(() => {
      if (!inViewRef.current) return;
      const el = document.getElementById(nextId);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      scrollAnim.current = animate(window.scrollY, y, {
        duration: 1.75,
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (v) => window.scrollTo(0, v),
      });
    }, 1100);
  };

  useEffect(() => () => clearScroll(), []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-5">
      <PhoneFrame>
        <StatusBar time={time} />
        <div className="absolute inset-0">
          {playing ? (
            <Scene
              key={runKey}
              muted={muted}
              paused={paused}
              onComplete={handleComplete}
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[#070707]">
                {inView && (
                  <Scene
                    key={`preview-${previewKey}`}
                    muted
                    paused={false}
                    onComplete={() => setPreviewKey((k) => k + 1)}
                  />
                )}
              </div>
              <PreviewVeil label={label} onPlay={start} />
            </>
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
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/15 text-ash transition hover:border-white/35 hover:text-paper"
    >
      {children}
    </button>
  );
}

/**
 * Sits over the live, muted scene preview: a soft vignette so the play control
 * reads cleanly, the glowing play button, and a quiet "tap to play" cue. Tapping
 * anywhere starts the real, sounded playback from the top.
 */
function PreviewVeil({ label, onPlay }: { label: string; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      aria-label={`Play ${label}`}
      className="group absolute inset-0 z-40 flex cursor-pointer flex-col items-center justify-center gap-6 backdrop-blur-[4px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 46%, rgba(0,0,0,0.12), rgba(0,0,0,0.62) 100%)",
        }}
      />
      <span className="relative grid place-items-center">
        <span
          className="animate-breathe absolute h-20 w-20 rounded-full"
          style={{ background: "radial-gradient(circle, #e6ff0033, transparent 70%)" }}
        />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-volt text-ink shadow-[0_10px_30px_-6px_rgba(230,255,0,0.55)] transition group-hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 7 5.5Z" />
          </svg>
        </span>
      </span>
      <span className="relative rounded-full border border-white/15 bg-black/45 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper backdrop-blur-md">
        Tap to play
      </span>
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
      className="absolute inset-0 z-50 grid cursor-pointer place-items-center bg-ink/40 backdrop-blur-[2px]"
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
