"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Line } from "./script";

type Options = {
  active: boolean;
  muted: boolean;
  paused?: boolean; // freeze progression, audio, and the completion hold
  gap?: number; // ms pause between lines
  endDelay?: number; // ms to hold the last frame before onComplete
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
 *   after the line's exact `ms` duration.
 *
 * Pausing freezes the active timer (banking the remaining time so resume
 * continues mid-line), pauses any playing audio, and holds the completion beat.
 */
export function useLineSequence(lines: Line[], opts: Options) {
  const {
    active,
    muted,
    paused = false,
    gap = 450,
    endDelay = 1200,
    onComplete,
  } = opts;
  const [index, setIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advancedRef = useRef(false);
  const completedRef = useRef(false);
  const onCompleteRef = useLatest(onComplete);
  const linesRef = useLatest(lines);

  // Remaining-time bookkeeping so pause/resume continues mid-line.
  const remainingRef = useRef(0);
  const startedAtRef = useRef(0);
  const stepRef = useRef<"line" | "real" | "complete">("line");

  // Advance to the next line — at most once per line.
  const next = useCallback(() => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIndex((i) => i + 1);
  }, []);

  // Kick off when activated.
  useEffect(() => {
    if (active && index === -1) setIndex(0);
  }, [active, index]);

  // Set up the current step (audio + how long to wait). Runs per line, not on
  // pause toggles, so audio persists across pause/resume.
  useEffect(() => {
    if (!active || index < 0) return;
    const seq = linesRef.current;
    advancedRef.current = false;

    if (index >= seq.length) {
      stepRef.current = "complete";
      remainingRef.current = endDelay;
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = null;
      };
    }

    const line = seq[index];
    if (line.speaker === "real") {
      stepRef.current = "real";
      remainingRef.current = line.ms + 2500; // safety net behind the video
    } else {
      stepRef.current = "line";
      remainingRef.current = line.ms + gap;
      if (!muted) {
        audioRef.current = new Audio(`/audio/${line.id}.mp3`);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [index, active, muted, gap, endDelay, linesRef]);

  // Run or freeze the current step based on `paused`.
  useEffect(() => {
    if (!active || index < 0) return;
    if (paused) return;
    if (stepRef.current === "complete" && completedRef.current) return;

    if (audioRef.current) {
      const p = audioRef.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }

    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      if (stepRef.current === "complete") {
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
      } else {
        next();
      }
    }, remainingRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        const elapsed = Date.now() - startedAtRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      }
      if (audioRef.current) audioRef.current.pause();
    };
  }, [paused, index, active, next, onCompleteRef]);

  const current = index >= 0 && index < lines.length ? lines[index] : null;
  return { current, index, next };
}
