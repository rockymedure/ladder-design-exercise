"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Full-bleed coach presence. Plays a generated talking-head video when one is
 * available at `videoSrc`; otherwise shows the portrait with a slow cinematic
 * push-in so the bookend moments still feel alive.
 */
export function CoachStage({
  videoSrc,
  imageSrc = "/remi/portrait.png",
  muted = false,
}: {
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
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* portrait base (also the video poster / fallback) */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.14 }}
        transition={{ duration: 16, ease: "linear" }}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          opacity: videoOk ? 0 : 1,
        }}
      />
      {videoSrc && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          playsInline
          autoPlay
          loop
          muted={muted}
          onCanPlay={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
          style={{ opacity: videoOk ? 1 : 0, transition: "opacity 600ms" }}
        />
      )}

      {/* cinematic scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
    </div>
  );
}
