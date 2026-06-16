"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "../PhoneFrame";

/* ------------------------------------------------------------------ *
 * Refuel — the post-workout check-in, as a hands-on prototype.
 *
 * You tap through it: rate the session, complete it, then tap whatever
 * you've had (Water / Protein / Meal) and watch the existing nutrition
 * streak bump. Any log is a win; the binary tap is the lowest rung, with a
 * quiet hand-off to the richer voice/photo logging Ladder already has.
 * ------------------------------------------------------------------ */

type Item = "water" | "protein" | "meal";
type Phase = "rating" | "checkin" | "payoff";

/** The framed, tappable prototype + a reset control. Drop this on a page. */
export function RefuelStage() {
  const [runKey, setRunKey] = useState(0);
  return (
    <div className="flex flex-col items-center gap-5">
      <PhoneFrame>
        <StatusBar time="1:03 PM" />
        <div className="absolute inset-0">
          <RefuelFlow key={runKey} onRestart={() => setRunKey((k) => k + 1)} />
        </div>
      </PhoneFrame>

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ash-dark">
          Tap through it
        </span>
        <button
          onClick={() => setRunKey((k) => k + 1)}
          title="Start over"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/15 text-ash transition hover:border-white/35 hover:text-paper"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * The same flow as its own full-screen "app" — edge-to-edge on phones, framed
 * in a device on desktop. Built for a clean shareable URL that opens straight
 * into the prototype with no surrounding case study.
 */
export function RefuelApp() {
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const flow = (
    <RefuelFlow key={runKey} onRestart={() => setRunKey((k) => k + 1)} />
  );

  // Avoid a hydration flash between layouts.
  if (!mounted) return <div className="h-[100dvh] w-full bg-[#070707]" />;

  if (desktop) {
    return (
      <main className="grid h-[100dvh] w-full place-items-center overflow-hidden bg-[#0E0E0E]">
        <PhoneFrame>
          <StatusBar time="1:03 PM" />
          <div className="absolute inset-0">{flow}</div>
        </PhoneFrame>
      </main>
    );
  }

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#070707]">
      <StatusBar time="1:03 PM" />
      <div className="absolute inset-0">{flow}</div>
    </main>
  );
}

function RefuelFlow({ onRestart }: { onRestart: () => void }) {
  const [phase, setPhase] = useState<Phase>("rating");
  const [logged, setLogged] = useState<Record<Item, boolean>>({
    water: false,
    protein: false,
    meal: false,
  });

  const toggle = (k: Item) => setLogged((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div
      data-phase={phase}
      className="relative h-full w-full overflow-hidden bg-[#070707]"
    >
      {phase === "rating" && (
        <RatingScreen key="rating" onDone={() => setPhase("checkin")} />
      )}
      {phase === "checkin" && (
        <CheckIn
          key="checkin"
          logged={logged}
          onToggle={toggle}
          onDone={() => setPhase("payoff")}
        />
      )}
      {phase === "payoff" && (
        <Payoff key="payoff" logged={logged} onRestart={onRestart} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 1. Rating screen — a nod to Ladder's "Complete Workout" screen.
 * ------------------------------------------------------------------ */
function RatingScreen({ onDone }: { onDone: () => void }) {
  const [rating, setRating] = useState(0);
  const rated = rating > 0;
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.35 }}
    >
      <video
        src="/videos/inclass-hero.mp4"
        poster="/photos/inclass-hero.png"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.5)" }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[66%] bg-gradient-to-t from-black via-black/75 to-transparent" />

      <div className="absolute inset-x-0 bottom-[100px] flex flex-col items-center gap-5 px-5 text-center">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[14px] font-medium text-volt">
            Rate to earn a badge
          </span>
          <h2 className="max-w-[300px] text-[21px] font-bold leading-[1.2] text-paper">
            How would you rate the workout experience today?
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setRating(s)}
              className="cursor-pointer"
              aria-label={`${s} stars`}
            >
              <Star filled={s <= rating} />
            </button>
          ))}
        </div>
        <motion.button
          onClick={rated ? onDone : undefined}
          disabled={!rated}
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundColor: rated ? "var(--color-volt)" : "rgba(14,14,14,0.3)",
            borderColor: rated ? "rgba(230,255,0,0)" : "rgba(250,250,250,0.22)",
            color: rated ? "#0e0e0e" : "rgba(250,250,250,0.4)",
          }}
          whileTap={rated ? { scale: 0.97 } : undefined}
          transition={{ duration: 0.35 }}
          className={`font-display mt-1 w-full rounded-full border py-4 text-[15px] font-bold uppercase tracking-[0.04em] backdrop-blur-sm ${
            rated ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          {rated ? "Mark as Complete" : "Complete Workout"}
        </motion.button>
      </div>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-[28px] bg-[#1a1a1a]/95 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-paper">
          <LadderH />
          <span className="text-[17px] font-bold tracking-[-0.02em]">Journal</span>
        </div>
        <button className="flex cursor-pointer items-center gap-1.5 text-[15px] text-volt">
          Track Results
          <svg width="13" height="16" viewBox="0 0 24 30" fill="none">
            <path
              d="M6 12l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 22l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function LadderH() {
  return (
    <svg width="18" height="17" viewBox="0 0 25 24" fill="none">
      <path
        d="M18.3515 3.47666C18.336 3.56021 18.29 3.63613 18.2213 3.69142C18.1494 3.74715 18.0603 3.77972 17.9671 3.78428H9.08894C9.05687 3.77463 9.0273 3.75882 9.00214 3.73785C8.97338 3.72052 8.94988 3.69653 8.93394 3.6682C8.92607 3.63965 8.92607 3.60969 8.93394 3.58114C8.92444 3.54885 8.92444 3.51476 8.93394 3.48247L9.55393 0H4.51347L0 23.9884H5.05285L5.70384 20.5059C5.72529 20.4281 5.77315 20.3588 5.84023 20.3086C5.90922 20.2521 5.99669 20.2194 6.08822 20.2157H14.9602C15.0282 20.233 15.0861 20.2747 15.1214 20.3318C15.1354 20.361 15.1427 20.3927 15.1427 20.4247C15.1427 20.4567 15.1354 20.4883 15.1214 20.5175L14.5014 24H19.5418L24.0553 0.0348244H19.0025L18.3515 3.47666ZM17.3161 9.00798L16.1877 14.9862C16.1572 15.1548 16.0625 15.3074 15.9211 15.4157C15.7828 15.5273 15.6077 15.5909 15.4252 15.5956H7.27239C7.22739 15.6042 7.181 15.6042 7.13599 15.5956C6.99978 15.5654 6.88176 15.4861 6.8074 15.3751C6.77016 15.3195 6.74545 15.2573 6.73479 15.1925C6.72413 15.1276 6.72774 15.0613 6.74541 14.9978L7.86757 9.01959C7.90473 8.85029 8.00064 8.69725 8.14037 8.58428C8.27702 8.47391 8.44979 8.41044 8.63015 8.40435H16.7767C16.8261 8.39876 16.8761 8.39876 16.9255 8.40435C16.9936 8.41691 17.0575 8.4448 17.1115 8.48561C17.1694 8.52162 17.2181 8.56919 17.2541 8.62491C17.2886 8.6804 17.3117 8.74142 17.3223 8.80484C17.3397 8.87771 17.3376 8.95348 17.3161 9.02539V9.00798Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <motion.svg
      whileTap={{ scale: 0.8 }}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-volt)" : "none"}
      stroke={filled ? "none" : "rgba(255,255,255,0.35)"}
      strokeWidth="1.6"
    >
      <path d="M12 2.5l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.9 6.4 19.7l1.3-6.3L3 9.1l6.4-.7L12 2.5Z" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ *
 * 2. The check-in — three fat binary tiles. Any tap is a win.
 * ------------------------------------------------------------------ */
function CheckIn({
  logged,
  onToggle,
  onDone,
}: {
  logged: Record<Item, boolean>;
  onToggle: (k: Item) => void;
  onDone: () => void;
}) {
  const count = Object.values(logged).filter(Boolean).length;
  const [waterStep, setWaterStep] = useState(2);
  const [proteinPick, setProteinPick] = useState(1);
  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-y-auto px-6 pb-7 pt-16"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-leaf">
          Refuel · Foundation Day
        </span>
        <h2 className="font-display text-[40px] font-bold uppercase leading-none text-paper">
          What&apos;s fueled
          <br />
          you today?
        </h2>
        <p className="text-[15px] text-ash">
          Tap what you&apos;ve had. Slide or pick to add detail.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Tile
          label="Water"
          sub="A glass, a bottle, anything"
          on={logged.water}
          onTap={() => onToggle("water")}
          icon={<DropletIcon />}
        >
          <DetailBlock caption="Amount" value={`${WATER_OZ[waterStep]} oz`}>
            <LadderSlider
              steps={WATER_OZ.length}
              value={waterStep}
              onChange={setWaterStep}
            />
          </DetailBlock>
        </Tile>
        <Tile
          label="Protein"
          sub="Shake, bar, or a meal"
          on={logged.protein}
          onTap={() => onToggle("protein")}
          icon={<ShakerIcon />}
        >
          <DetailBlock caption="How much">
            <div className="mt-2.5 flex gap-2">
              {PROTEIN_PICKS.map((c, i) => (
                <Chip
                  key={c}
                  active={i === proteinPick}
                  onClick={() => setProteinPick(i)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </DetailBlock>
        </Tile>
        <Tile
          label="Meal"
          sub="Breakfast, lunch, or dinner"
          on={logged.meal}
          onTap={() => onToggle("meal")}
          icon={<MealIcon />}
        >
          <DetailBlock caption="What did you have">
            <MealVoice />
          </DetailBlock>
        </Tile>
      </div>

      <div className="min-h-6 flex-1" />

      <button onClick={onDone} className="cursor-pointer">
        <motion.div
          className="font-display w-full rounded-full py-4 text-center text-[16px] font-bold uppercase tracking-[0.06em]"
          animate={{
            backgroundColor: count > 0 ? "var(--color-leaf)" : "rgba(255,255,255,0.08)",
            color: count > 0 ? "#0a0a0a" : "var(--color-ash)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {count > 0 ? `Log ${count} and finish` : "Not today"}
        </motion.div>
      </button>
    </motion.div>
  );
}

const WATER_OZ = [4, 8, 16, 32];
const PROTEIN_PICKS = ["½", "1 scoop", "2", "Bar"];

function Tile({
  label,
  sub,
  on,
  onTap,
  icon,
  children,
}: {
  label: string;
  sub: string;
  on: boolean;
  onTap: () => void;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      animate={{ borderColor: on ? "rgba(84,244,109,0.6)" : "rgba(255,255,255,0.10)" }}
      className="relative overflow-hidden rounded-[20px] border bg-ink-card"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background:
            "linear-gradient(90deg, rgba(84,244,109,0.16), rgba(84,244,109,0.03))",
        }}
      />

      <motion.button
        onClick={onTap}
        whileTap={{ scale: 0.98 }}
        className="relative flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left"
      >
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300"
          style={{
            background: on ? "var(--color-leaf)" : "rgba(255,255,255,0.06)",
            color: on ? "#0a0a0a" : "var(--color-ash-light)",
          }}
        >
          {icon}
        </span>
        <span className="flex flex-1 flex-col gap-0.5">
          <span className="text-[17px] font-semibold text-paper">{label}</span>
          <motion.span
            className="text-[12px]"
            initial={false}
            animate={{ color: on ? "var(--color-leaf)" : "var(--color-ash)" }}
          >
            {sub}
          </motion.span>
        </span>
        <span className="grid h-7 w-7 shrink-0 place-items-center">
          {on ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
              className="grid h-7 w-7 place-items-center rounded-full bg-leaf"
            >
              <CheckIcon />
            </motion.span>
          ) : (
            <span className="h-6 w-6 rounded-full border-2 border-white/20" />
          )}
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {on && children && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="mx-4 border-t border-white/10 pb-4 pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailBlock({
  caption,
  value,
  children,
}: {
  caption: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ash-dark">
          {caption}
        </span>
        {value && (
          <span className="text-[12px] font-semibold text-paper">{value}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Ladder's slider system: a slim gray track with step ticks and a wide green
 * capsule knob (see Figma node 1:13273). Stepped + draggable.
 */
function LadderSlider({
  steps,
  value,
  onChange,
}: {
  steps: number;
  value: number;
  onChange: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    onChange(Math.round(pct * (steps - 1)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const pct = steps > 1 ? value / (steps - 1) : 0;

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative mt-3 h-6 w-full cursor-pointer touch-none select-none px-[19px]"
    >
      <div ref={ref} className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[rgba(120,120,120,0.2)]" />
        {Array.from({ length: steps }).map((_, i) => {
          const p = i / (steps - 1);
          return (
            <span
              key={i}
              className="pointer-events-none absolute top-1/2 h-[12px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9E9E9E]"
              style={{ left: `${p * 100}%` }}
            />
          );
        })}
        <div
          className="pointer-events-none absolute top-1/2 h-6 w-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf transition-[left] duration-150 ease-out"
          style={{
            left: `${pct * 100}%`,
            boxShadow:
              "0px 0.5px 4px rgba(0,0,0,0.12), 0px 6px 13px rgba(0,0,0,0.12)",
          }}
        />
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className="cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors"
      style={{
        background: active ? "var(--color-leaf)" : "rgba(255,255,255,0.05)",
        color: active ? "#0a0a0a" : "var(--color-ash-light)",
        border: active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {children}
    </motion.button>
  );
}

function ActionPill({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-leaf/40 bg-white/[0.03] px-3.5 py-2.5"
    >
      <span className="text-leaf [&>svg]:h-[16px] [&>svg]:w-[16px]">{icon}</span>
      <span className="text-[13px] font-medium text-ash-light">{label}</span>
    </motion.button>
  );
}

/**
 * The "say it or show it" flow for a meal. Voice records real audio and sends
 * it to /api/refuel/parse (Whisper transcription → LLM nutrition parse). Photo
 * sends an image to the same endpoint (vision parse). Falls back gracefully
 * when the mic isn't available (e.g. insecure origin on a phone).
 */
type MealResult = {
  transcript?: string;
  summary: string;
  items: string[];
  calories: number | null;
  protein: number | null;
};

type VoiceState = "prompt" | "listening" | "processing" | "result";

function MealVoice() {
  const [state, setState] = useState<VoiceState>("prompt");
  const [via, setVia] = useState<"voice" | "photo">("voice");
  const [result, setResult] = useState<MealResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setResult(null);
    setError(null);
    setState("prompt");
  };

  const send = async (field: "audio" | "image", blob: Blob, filename: string) => {
    setState("processing");
    setError(null);
    try {
      const fd = new FormData();
      fd.append(field, blob, filename);
      const res = await fetch("/api/refuel/parse", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't process that");
      setResult(data as MealResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setState("result");
    }
  };

  const startVoice = async () => {
    setVia("voice");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, {
          type: mr.mimeType || "audio/webm",
        });
        void send("audio", blob, "note.webm");
      };
      recorderRef.current = mr;
      mr.start();
      setState("listening");
    } catch {
      setVia("voice");
      setError("Mic needs a secure origin — try this on localhost.");
      setState("result");
    }
  };

  const stopVoice = () => {
    recorderRef.current?.stop();
    recorderRef.current = null;
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      setVia("photo");
      void send("image", file, file.name || "meal.jpg");
    }
  };

  if (state === "prompt") {
    return (
      <div className="mt-2.5 flex gap-2">
        <ActionPill icon={<MicGlyph />} label="Say it" onClick={startVoice} />
        <ActionPill
          icon={<CameraGlyph />}
          label="Show it"
          onClick={() => fileRef.current?.click()}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onPhoto}
          className="hidden"
        />
      </div>
    );
  }

  if (state === "listening") {
    return (
      <div className="mt-3 flex items-center gap-3">
        <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf text-[#0a0a0a] [&>svg]:h-[16px] [&>svg]:w-[16px]">
          <motion.span
            className="absolute inset-0 rounded-full bg-leaf"
            animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative">
            <MicGlyph />
          </span>
        </span>
        <Waveform />
        <motion.button
          onClick={stopVoice}
          whileTap={{ scale: 0.9 }}
          aria-label="Send"
          className="ml-auto grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-leaf text-[#0a0a0a] [&>svg]:h-[18px] [&>svg]:w-[18px]"
        >
          <SendGlyph />
        </motion.button>
      </div>
    );
  }

  if (state === "processing") {
    return (
      <div className="mt-3 flex items-center gap-3">
        <Spinner />
        <span className="text-[14px] text-ash">
          {via === "photo" ? "Reading your photo…" : "Transcribing…"}
        </span>
      </div>
    );
  }

  // result
  if (error || !result) {
    return (
      <div className="mt-3 flex flex-col gap-2">
        <p className="text-[14px] text-ash">{error || "Couldn't catch that."}</p>
        <button
          onClick={reset}
          className="self-start cursor-pointer text-[12px] font-medium text-leaf"
        >
          Try again
        </button>
      </div>
    );
  }

  const macros = [
    result.calories != null ? `${result.calories} cal` : null,
    result.protein != null ? `${result.protein}g protein` : null,
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 16 }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-leaf [&>svg]:h-[18px] [&>svg]:w-[18px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(84,244,109,0.22), rgba(84,244,109,0.06))",
          }}
        >
          {via === "photo" ? <CameraGlyph /> : <SpeechGlyph />}
        </motion.span>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-[15px] leading-snug text-paper">{result.summary}</p>
          {macros.length > 0 && (
            <p className="text-[12px] text-ash">≈ {macros.join(" · ")}</p>
          )}
          {result.transcript && (
            <p className="mt-1 text-[12px] italic text-ash-dark">
              “{result.transcript}”
            </p>
          )}
        </div>
      </div>
      <button
        onClick={reset}
        className="self-start cursor-pointer text-[12px] font-medium text-leaf"
      >
        {via === "photo" ? "Retake" : "Re-record"}
      </button>
    </motion.div>
  );
}

function Spinner() {
  return (
    <motion.span
      className="block h-5 w-5 shrink-0 rounded-full border-2 border-white/15 border-t-leaf"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

function Waveform() {
  return (
    <div className="flex h-6 flex-1 items-center gap-[3px]">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] flex-1 rounded-full bg-leaf/70"
          style={{ height: 6 }}
          animate={{ height: [6, 20, 9, 16, 6] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 10) * 0.06,
          }}
        />
      ))}
    </div>
  );
}

function MicGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 19V6M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeechGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4 4v-4H5.5A1.5 1.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.5h7M8.5 11h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 8.5a2 2 0 0 1 2-2h1.2l.9-1.5a1 1 0 0 1 .86-.5h7.88a1 1 0 0 1 .86.5l.9 1.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * 3. Payoff — fill today's ring, bump the existing streak.
 * ------------------------------------------------------------------ */
const WEEK = [
  { d: "S", done: true },
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", today: true },
  { d: "T" },
  { d: "F" },
  { d: "S" },
];

function Payoff({
  logged,
  onRestart,
}: {
  logged: Record<Item, boolean>;
  onRestart: () => void;
}) {
  const count = Object.values(logged).filter(Boolean).length;
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <StreakRing />

      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-display text-[40px] font-bold uppercase leading-none text-paper">
          {count > 0 ? "Logged" : "Next time"}
        </h2>
        <p className="text-[15px] text-ash-light">
          {count > 0
            ? "Your nutrition streak's alive too."
            : "No worries. The streak's still yours tomorrow."}
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-[20px] border border-leaf/25 bg-ink-card">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf">
            Nutrition streak
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-ash">
            Week 3
          </span>
        </div>
        <div className="flex items-end gap-2.5 px-4 pt-4">
          <CountUp
            from={3}
            to={count > 0 ? 4 : 3}
            className="font-display text-[44px] font-bold leading-[0.8] text-leaf"
          />
          <span className="pb-1.5 font-display text-[14px] font-bold uppercase leading-none text-paper">
            days
            <br />
            in a row
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1 px-3 pb-4 pt-4">
          {WEEK.map((d, i) => (
            <DayDot
              key={i}
              d={d.d}
              done={d.done}
              today={d.today}
              filled={count > 0}
              index={i}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-ash transition hover:text-paper"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Start over
      </button>
    </motion.div>
  );
}

function StreakRing() {
  const R = 46;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative grid place-items-center">
      <svg width="124" height="124" viewBox="0 0 124 124">
        <circle cx="62" cy="62" r={R} fill="none" stroke="#222" strokeWidth="10" />
        <motion.circle
          cx="62"
          cy="62"
          r={R}
          fill="none"
          stroke="var(--color-leaf)"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 62 62)"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <motion.span
        className="absolute grid h-14 w-14 place-items-center rounded-full bg-leaf"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 320, damping: 15 }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="#0a0a0a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </div>
  );
}

function DayDot({
  d,
  done,
  today,
  filled,
  index,
}: {
  d: string;
  done?: boolean;
  today?: boolean;
  filled: boolean;
  index: number;
}) {
  const isFilled = done || (today && filled);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className="text-[9px] font-semibold uppercase tracking-[0.08em]"
        style={{
          color: done || today ? "var(--color-ash-light)" : "var(--color-ash-dark)",
        }}
      >
        {d}
      </span>
      {isFilled ? (
        <motion.span
          initial={today ? { scale: 0.4 } : false}
          animate={{ scale: 1 }}
          transition={today ? { delay: 0.85, type: "spring", stiffness: 340, damping: 15 } : undefined}
          className="grid h-7 w-7 place-items-center rounded-full bg-leaf"
        >
          <CheckIcon />
        </motion.span>
      ) : today ? (
        <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-leaf/70 text-[10px] font-semibold text-leaf">
          8
        </span>
      ) : (
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-[10px] text-ash-dark">
          {index + 5}
        </span>
      )}
    </div>
  );
}

function CountUp({
  from,
  to,
  className,
}: {
  from: number;
  to: number;
  className?: string;
}) {
  const [n, setN] = useState(from);
  if (to !== from && n === from) {
    setTimeout(() => setN(to), 650);
  }
  return (
    <motion.span
      key={n}
      initial={{ scale: 0.6, opacity: 0.4 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 16 }}
      className={className}
    >
      {n}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ *
 * Icons
 * ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="#0a0a0a"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5c3.2 3.6 6 6.8 6 10.2a6 6 0 0 1-12 0c0-3.4 2.8-6.6 6-10.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShakerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 8h10l-1 11a2 2 0 0 1-2 1.8H10A2 2 0 0 1 8 19L7 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8 8 4h8l.5 4M7.6 12h8.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MealIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}