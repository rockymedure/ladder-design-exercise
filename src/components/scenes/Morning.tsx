"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "@/components/Presence";
import { DayAhead } from "@/components/DayAhead";
import { StreakCal } from "@/components/StreakCal";
import { WorkoutWidget } from "@/components/WorkoutWidget";
import { CoachDock } from "@/components/CoachDock";
import {
  HomeBackdrop,
  Dock,
  PageDots,
  LadderNotification,
} from "@/components/PhoneHome";
import { useLineSequence } from "@/lib/useLineSequence";
import { LINES } from "@/lib/script";

const SEQ = [LINES.amStreak, LINES.amGreet, LINES.amClose];
const NOTIF_BODY = "Good morning, Maya. Your day's ready when you are.";

/**
 * Kickoff (Morning). Opens on the iPhone home screen: a Ladder notification
 * slides in. A tap (auto, after a beat) launches into the app, where Ladder
 * celebrates the streak and lays out how you'll move and eat today.
 */
export function Morning({
  onComplete,
  muted,
  paused,
}: {
  onComplete: () => void;
  muted: boolean;
  paused: boolean;
}) {
  const [notif, setNotif] = useState(false);
  const [entered, setEntered] = useState(false);

  // Notification slides in shortly after the home screen appears.
  useEffect(() => {
    if (entered) return;
    const t = setTimeout(() => setNotif(true), 650);
    return () => clearTimeout(t);
  }, [entered]);

  // Auto-tap into the app a beat after the notification lands.
  useEffect(() => {
    if (entered || paused || !notif) return;
    const t = setTimeout(() => setEntered(true), 2200);
    return () => clearTimeout(t);
  }, [entered, paused, notif]);

  const { current } = useLineSequence(SEQ, {
    active: entered,
    muted,
    paused,
    endDelay: 1400,
    onComplete,
  });

  // Hold the last shown line during the end-of-scene crossfade so Day Ahead
  // never flashes back in between the widget tease and the next scene.
  const lastId = useRef<string>(LINES.amStreak.id);
  if (current?.id) lastId.current = current.id;
  const activeId = current?.id ?? lastId.current;

  const showStreak = activeId === LINES.amStreak.id;
  const showWidget = activeId === LINES.amClose.id;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070707]">
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="home"
            className="absolute inset-0"
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <HomeBackdrop variant="morning" />
            <div className="relative z-10 flex h-full flex-col px-6 pt-[118px]">
              <div className="flex-1" />
              <PageDots />
              <Dock />
            </div>
            <AnimatePresence>
              {notif && (
                <LadderNotification
                  key="notif"
                  body={NOTIF_BODY}
                  onTap={() => setEntered(true)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-1 items-center justify-center px-7 pt-16">
              <AnimatePresence mode="wait">
                {showStreak ? (
                  <StreakCal key="streak" />
                ) : showWidget ? (
                  <motion.div
                    key="widget"
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-3"
                  >
                    <WorkoutWidget speaking />
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ash">
                      On your home screen
                    </span>
                  </motion.div>
                ) : (
                  <DayAhead key="day" />
                )}
              </AnimatePresence>
            </div>

            <div className="z-20 flex flex-col gap-4 pb-6">
              <div className="min-h-[110px]">
                <Captions line={current} />
              </div>
              <CoachDock state="speaking" paused={paused} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
