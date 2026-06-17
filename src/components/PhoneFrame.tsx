"use client";

import { ReactNode, useEffect, useState } from "react";

/** The viewer's current local time, formatted for their locale (e.g. "1:03 PM"
 *  or "13:03"). Returns "" until mounted so SSR and the first client render
 *  match — the real time pops in after hydration. */
function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function StatusBar({
  dark = false,
  time,
  live = false,
  scrim,
}: {
  dark?: boolean;
  time?: string;
  /** When true, show the viewer's real local time instead of a fixed value. */
  live?: boolean;
  /** When set, paints a top-down gradient of this color behind the bar so
   *  scrolling content cleanly disappears underneath it (iOS-style). */
  scrim?: string;
}) {
  const localTime = useLocalTime();
  const shown = live ? localTime : time ?? "9:41";
  const color = dark ? "text-ink" : "text-paper";
  return (
    <div
      className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-7 pb-2.5 pt-3.5 text-[15px] font-semibold ${color} pointer-events-none select-none`}
      style={
        scrim
          ? { background: `linear-gradient(to bottom, ${scrim} 60%, transparent)` }
          : undefined
      }
    >
      <span className="tnum tracking-tight">{shown}</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
          <rect x="5" y="5" width="3" height="7" rx="1" fill="currentColor" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path
            d="M8.5 2.2c2.7 0 5.2 1 7 2.8l-1.4 1.5A7.7 7.7 0 0 0 8.5 4.3 7.7 7.7 0 0 0 2.9 6.5L1.5 5C3.3 3.2 5.8 2.2 8.5 2.2Z"
            fill="currentColor"
          />
          <path
            d="M8.5 6.1c1.6 0 3.1.6 4.2 1.7l-1.5 1.5a3.8 3.8 0 0 0-5.4 0L4.3 7.8A6 6 0 0 1 8.5 6.1Z"
            fill="currentColor"
          />
          <circle cx="8.5" cy="10.4" r="1.4" fill="currentColor" />
        </svg>
        {/* battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3.5"
            stroke="currentColor"
            opacity="0.4"
          />
          <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
          <rect
            x="24"
            y="4"
            width="2"
            height="5"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Ambient glow behind the device. A heavily blurred solid disc rather than
          a radial-gradient: a CSS gradient interpolates in 8-bit and shows visible
          concentric banding on dark backgrounds, while blurring a solid shape
          gives a smooth Gaussian falloff. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[32%] -z-10 h-[55%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[100px]"
        style={{ background: "rgba(230,255,0,0.12)" }}
      />
      <div
        className="relative rounded-[3.2rem] bg-black p-[10px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]"
        style={{
          width: "min(393px, 92vw)",
          height: "min(852px, 88vh)",
          aspectRatio: "393 / 852",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-ink">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-50 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-black" />
          {children}
          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 z-50 h-1 w-[120px] -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
