"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Line } from "./script";

type Options = {
  active: boolean;
  muted: boolean;
  gap?: number; // ms pause between lines
  onComplete?: () => void;
};

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

/**
 * Steps through a list of spoken lines.
 *
 * - "real" lines are delivered by a talking-head VIDEO that carries its own
 *   native audio. The hook plays no audio for them and waits for the scene to
 *   call `next()` when the video ends (with a safety timeout as a backstop).
 * - All other lines are voice-only: the hook plays /audio/{id}.mp3 and advances
 *   after the line's exact `ms` duration. The aura is a generic visual, so no
 *   media-event syncing is needed.
 */
export function useLineSequence(lines: Line[], opts: Options) {
  const { active, muted, gap = 450, onComplete } = opts;
  const [index, setIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advancedRef = useRef(false);
  const completedRef = useRef(false);
  const onCompleteRef = useLatest(onComplete);
  const linesRef = useLatest(lines);

  // Advance to the next line — at most once per line.
  const next = useCallback(() => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIndex((i) => i + 1);
  }, []);

  // Kick off when activated
  useEffect(() => {
    if (active && index === -1) setIndex(0);
  }, [active, index]);

  useEffect(() => {
    if (!active || index < 0) return;

    const lines = linesRef.current;
    if (index >= lines.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    const line = lines[index];
    advancedRef.current = false;

    if (line.speaker === "real") {
      // The video owns playback + sound and calls next() on `ended`.
      // Safety net only, in case the media event never arrives.
      timerRef.current = setTimeout(next, line.ms + 2500);
    } else {
      if (!muted) {
        const audio = new Audio(`/audio/${line.id}.mp3`);
        audioRef.current = audio;
        const p = audio.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
      timerRef.current = setTimeout(next, line.ms + gap);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [index, active, muted, gap, next, linesRef, onCompleteRef]);

  const current = index >= 0 && index < lines.length ? lines[index] : null;
  return { current, index, next };
}
