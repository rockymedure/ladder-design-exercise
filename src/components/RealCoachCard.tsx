"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * A message from the REAL human coach — recorded video (or portrait fallback).
 * Visually distinct from the AI twin: a framed "message" card with a REC chip.
 * This is "face for emotion."
 */
export function RealCoachCard({
  text,
  videoSrc,
  imageSrc = "/remi/portrait.png",
  muted = false,
}: {
  text: string;
  videoSrc?: string;
  imageSrc?: string;
  muted?: boolean;
}) {
  const [videoOk, setVideoOk] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !videoSrc) return;
    v.muted = muted;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [videoSrc, muted, videoOk]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[330px]"
    >
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-ink-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        {/* media */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 14, ease: "linear" }}
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center 22%",
              opacity: videoOk ? 0 : 1,
            }}
          />
          {videoSrc && (
            <video
              ref={ref}
              src={videoSrc}
              playsInline
              autoPlay
              muted={muted}
              onCanPlay={() => setVideoOk(true)}
              onError={() => setVideoOk(false)}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: videoOk ? 1 : 0, transition: "opacity 500ms" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />

          {/* labels */}
          <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper">
              Remi · Your Coach
            </span>
          </div>
          <div className="absolute right-3.5 top-3.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ash-light backdrop-blur-md">
            Recorded
          </div>
        </div>

        {/* transcript */}
        <div className="px-5 pb-5 pt-4">
          <p className="text-[17px] font-medium leading-snug text-paper">
            &ldquo;{text}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
