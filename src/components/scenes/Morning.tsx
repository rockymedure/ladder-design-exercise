"use client";

import { Captions } from "@/components/Presence";
import { DayAhead } from "@/components/DayAhead";
import { CoachDock } from "@/components/CoachDock";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.amGreet, LINES.amClose];

export function Morning({
  onComplete,
  muted,
  paused,
}: {
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}) {
  const { current } = useLineSequence(SEQ, {
    active: true,
    muted,
    paused,
    endDelay: 1400,
    onComplete,
  });

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <div className="flex flex-1 items-center justify-center px-5 pt-16">
        <DayAhead />
      </div>

      <div className="z-20 flex flex-col gap-4 pb-6">
        <div className="min-h-[110px]">
          <Captions line={current} />
        </div>
        <CoachDock state="speaking" />
      </div>
    </div>
  );
}
