"use client";

import { useEffect, useRef, useState } from "react";
import type { Line } from "./script";

type Options = {
  active: boolean;
  muted: boolean;
  gap?: number; // ms pause between lines
  onComplete?: () => void;
};

/**
 * Steps through a list of spoken lines. For each line it tries to play
 * /audio/{id}.mp3; when the clip ends (or, if no audio is available, after
 * the line's fallback `ms`) it advances. Captions stay in sync either way.
 */
export function useLineSequence(lines: Line[], opts: Options) {
  const { active, muted, gap = 450, onComplete } = opts;
  const [index, setIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedRef = useRef(false);

  // Kick off when activated
  useEffect(() => {
    if (active && index === -1) setIndex(0);
  }, [active, index]);

  useEffect(() => {
    if (!active || index < 0) return;

    if (index >= lines.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }

    const line = lines[index];
    let cancelled = false;
    let advanced = false;
    let fellBack = false;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    // Move to the next line exactly once per line.
    const advance = () => {
      if (cancelled || advanced) return;
      advanced = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!cancelled) setIndex((i) => i + 1);
      }, gap);
    };

    // When audio is unavailable, hold the caption for its scripted duration.
    const fallback = () => {
      if (cancelled || advanced || fellBack) return;
      fellBack = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(advance, line.ms);
    };

    if (muted) {
      fallback();
    } else {
      const audio = new Audio(`/audio/${line.id}.mp3`);
      audioRef.current = audio;
      audio.onended = advance;
      audio.onerror = fallback;
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => fallback());
      }
      // Safety: if the clip never starts, fall back on the scripted duration.
      safetyTimer = setTimeout(() => {
        if (!cancelled && audio.paused && audio.currentTime === 0) fallback();
      }, 350);
    }

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
      }
    };
  }, [index, active, muted, lines, gap, onComplete]);

  const current = index >= 0 && index < lines.length ? lines[index] : null;
  return { current, index };
}
