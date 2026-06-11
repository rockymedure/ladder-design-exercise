"use client";

import { useEffect, useState } from "react";
import { WorkoutWidget } from "@/components/WorkoutWidget";
import { HomeBackdrop, Dock, PageDots } from "@/components/PhoneHome";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.hwReady];

/**
 * Home screen → widget tap. At workout time Ladder pings you on your home
 * screen; tapping the Foundation Day widget launches you straight into the
 * session. Reinforces "coach in your pocket": Ladder works outside the app too.
 */
export function HomeScreen({
  onComplete,
  muted,
  paused,
}: {
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}) {
  const [tapped, setTapped] = useState(false);

  const { current } = useLineSequence(SEQ, {
    active: true,
    muted,
    paused,
    endDelay: 400,
    onComplete: () => setTapped(true),
  });

  useEffect(() => {
    if (!tapped || paused) return;
    const t = setTimeout(onComplete, 1200);
    return () => clearTimeout(t);
  }, [tapped, paused, onComplete]);

  const speaking = !!current && !tapped;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <HomeBackdrop variant="afternoon" />

      {/* home screen content */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-[118px]">
        <div className="flex flex-col items-start gap-2">
          <WorkoutWidget tapped={tapped} speaking={speaking} />
          <span className="pl-1 text-[12px] font-medium text-white drop-shadow">
            Ladder
          </span>
        </div>

        <div className="flex-1" />

        <PageDots />
        <Dock />
      </div>
    </div>
  );
}
