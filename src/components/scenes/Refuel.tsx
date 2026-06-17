"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const [rating, setRating] = useState(0);
  const [logged, setLogged] = useState<Record<Item, boolean>>({
    water: false,
    protein: false,
    meal: false,
  });
  const [waterStep, setWaterStep] = useState(2);
  const [proteinPick, setProteinPick] = useState(1);
  const [mealSummary, setMealSummary] = useState("");

  const toggle = (k: Item) => setLogged((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div
      data-phase={phase}
      className="relative h-full w-full overflow-hidden bg-[#070707]"
    >
      {phase === "rating" && (
        <RatingScreen
          key="rating"
          rating={rating}
          setRating={setRating}
          onDone={() => setPhase("checkin")}
        />
      )}
      {phase === "checkin" && (
        <CheckIn
          key="checkin"
          logged={logged}
          onToggle={toggle}
          waterStep={waterStep}
          setWaterStep={setWaterStep}
          proteinPick={proteinPick}
          setProteinPick={setProteinPick}
          onMeal={setMealSummary}
          onDone={() => setPhase("payoff")}
        />
      )}
      {phase === "payoff" && (
        <Payoff
          key="payoff"
          rating={rating}
          logged={logged}
          waterStep={waterStep}
          proteinPick={proteinPick}
          mealSummary={mealSummary}
          onEdit={() => setPhase("checkin")}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 1. Rating screen — a nod to Ladder's "Complete Workout" screen.
 * ------------------------------------------------------------------ */
function RatingScreen({
  rating,
  setRating,
  onDone,
}: {
  rating: number;
  setRating: (n: number) => void;
  onDone: () => void;
}) {
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
  waterStep,
  setWaterStep,
  proteinPick,
  setProteinPick,
  onMeal,
  onDone,
}: {
  logged: Record<Item, boolean>;
  onToggle: (k: Item) => void;
  waterStep: number;
  setWaterStep: (n: number) => void;
  proteinPick: number;
  setProteinPick: (n: number) => void;
  onMeal: (summary: string) => void;
  onDone: () => void;
}) {
  const count = Object.values(logged).filter(Boolean).length;
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 z-10 overflow-y-auto px-6 pb-28 pt-16">
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-leaf">
          Nutrition
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
          <DetailBlock caption="Amount" value={WATER_LABELS[waterStep]}>
            <LadderSlider
              steps={WATER_LABELS.length}
              value={waterStep}
              onChange={setWaterStep}
            />
          </DetailBlock>
        </Tile>
        <Tile
          label="Protein"
          sub="Shake, bar, or supplement"
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
            <MealVoice onResult={onMeal} />
          </DetailBlock>
        </Tile>
      </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#070707] via-[#070707]/92 to-transparent px-6 pb-7 pt-10">
        <button onClick={onDone} className="block w-full cursor-pointer">
          <motion.div
            className="font-display w-full rounded-full py-4 text-center text-[16px] font-bold uppercase tracking-[0.06em]"
            animate={{
              backgroundColor: count > 0 ? "var(--color-leaf)" : "rgba(255,255,255,0.08)",
              color: count > 0 ? "#0a0a0a" : "var(--color-ash)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {count > 0 ? "Continue" : "Not now"}
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}

const WATER_LABELS = ["4 oz", "8 oz", "16 oz", "32 oz", "32+ oz"];
const PROTEIN_PICKS = ["½", "1 scoop", "2", "Bar"];
// Full, unit-clear labels for the payoff summary chips.
const PROTEIN_LABELS = ["½ scoop protein", "1 scoop protein", "2 scoops protein", "Protein bar"];

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

function MealVoice({ onResult }: { onResult?: (summary: string) => void }) {
  const [state, setState] = useState<VoiceState>("prompt");
  const [via, setVia] = useState<"voice" | "photo">("voice");
  const [result, setResult] = useState<MealResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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
      if (data?.summary) onResult?.(data.summary as string);
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

  if (state === "prompt") {
    return (
      <div className="mt-2.5 flex">
        <ActionPill icon={<MicGlyph />} label="Say it" onClick={startVoice} />
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
 * 3. Payoff — the earned badge + workout summary (Ladder's complete screen).
 * ------------------------------------------------------------------ */
function Payoff({
  rating,
  logged,
  waterStep,
  proteinPick,
  mealSummary,
  onEdit,
  onRestart,
}: {
  rating: number;
  logged: Record<Item, boolean>;
  waterStep: number;
  proteinPick: number;
  mealSummary: string;
  onEdit: () => void;
  onRestart: () => void;
}) {
  const score = rating || 4;
  const fuel: { icon: ReactNode; label: string }[] = [
    logged.water && {
      icon: <DropletIcon />,
      label: `${WATER_LABELS[waterStep]} water`,
    },
    logged.protein && {
      icon: <ShakerIcon />,
      label: PROTEIN_LABELS[proteinPick] ?? `${PROTEIN_PICKS[proteinPick]} protein`,
    },
    logged.meal && {
      icon: <MealIcon />,
      label: mealSummary || "Meal",
    },
  ].filter(Boolean) as { icon: ReactNode; label: string }[];
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-[#080808]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* depth: confetti behind the content */}
      <Confetti layer="back" count={26} seed={0} />

      <div className="absolute inset-0 z-10 overflow-y-auto px-5 pb-32 pt-12">
        {/* action chips */}
        <div className="flex justify-end">
          <div className="flex items-center gap-0.5 rounded-full bg-[#1d1d1d]/90 px-1 py-1 backdrop-blur-md">
            <ChipBtn>
              <BookGlyph />
            </ChipBtn>
            <ChipBtn>
              <HeartGlyph />
            </ChipBtn>
            <ChipBtn>
              <ShareGlyph />
            </ChipBtn>
          </div>
        </div>

        {/* badge */}
        <div className="-mt-2 flex justify-center">
          <Medal score={score} />
        </div>

        {/* pager dots */}
        <div className="mt-3 flex items-center justify-center gap-2.5">
          <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-volt">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="h-[16px] w-[16px] rounded-full border-[1.5px] border-white/20" />
          <span className="h-[16px] w-[16px] rounded-full border-[1.5px] border-white/20" />
        </div>

        {/* share proof */}
        <div className="mt-3.5 flex justify-center">
          <button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#1d1d1d]/90 px-5 py-2.5 backdrop-blur-md transition hover:bg-[#262626]">
            <InstaGlyph />
            <span className="text-[15px] font-semibold text-paper">
              Share Proof
            </span>
          </button>
        </div>

        {/* program + title */}
        <div className="mt-7 flex items-center gap-2 text-[15px]">
          <span className="text-paper">
            <LadderH />
          </span>
          <span className="font-bold text-paper">Transform</span>
          <span className="font-medium text-[#c4c4c4]">• Jun 16, 2026</span>
        </div>
        <h2 className="font-ek mt-2 text-[21px] uppercase leading-[1.2] text-paper">
          Pull &amp; Define
        </h2>

        {/* refuel summary — celebrates what was logged on the fueling screen */}
        {fuel.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-4 rounded-[16px] bg-[#181818] px-3.5 py-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">
                <NutritionLeaf />
                Refueled today
              </span>
              <button
                onClick={onEdit}
                className="cursor-pointer text-[12px] font-semibold text-ash transition hover:text-paper"
              >
                Edit
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {fuel.map((f, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, type: "spring", stiffness: 360, damping: 18 }}
                  className="flex max-w-full items-center gap-1.5 rounded-full bg-white/[0.06] py-1.5 pl-2 pr-3 text-[13px] text-paper"
                >
                  <span className="shrink-0 text-leaf [&>svg]:h-[14px] [&>svg]:w-[14px]">
                    {f.icon}
                  </span>
                  <span className="min-w-0 truncate">{f.label}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="mt-4 flex items-center gap-2.5 rounded-[16px] bg-[#181818] px-3 py-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.07]">
              <FlameGlyph />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[14px] font-bold leading-tight text-paper">
                Get your calories right
              </span>
              <span className="whitespace-nowrap text-[11px] leading-tight text-ash">
                Add or update for this workout
              </span>
            </div>
            <button className="shrink-0 cursor-pointer rounded-full bg-[#2b2b2b] px-3 py-1.5 text-[12px] font-semibold text-paper transition hover:bg-[#363636]">
              Update
            </button>
          </div>
        )}

        {/* stats */}
        <div className="mt-5 grid grid-cols-3 gap-y-6">
          <StatCol value="01:04" label="Total Time" delay={0.1} />
          <StatCol value="6" label="Total Calories" delay={0.16} />
          <StatCol value="––" label="Active Calories" delay={0.22} />
          <StatCol value="0%" label="Journal" delay={0.28} />
          <StatCol value="0" label="Cheers" delay={0.34} />
          <StatCol value="0" label="PRs" delay={0.4} />
        </div>
      </div>

      {/* depth: confetti floating in front of the content */}
      <Confetti layer="front" count={12} seed={41} />

      {/* continue */}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#080808] via-[#080808]/92 to-transparent px-5 pb-6 pt-8">
        <motion.button
          onClick={onRestart}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="w-full cursor-pointer rounded-full bg-[#171717] py-4 text-[14px] font-bold uppercase tracking-[0.12em] text-paper transition hover:bg-[#222]"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}

function StatCol({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-0.5"
    >
      <span className="font-ek text-[23px] leading-none text-paper">{value}</span>
      <span className="text-[13px] tracking-[-0.39px] text-[#c4c4c4]">{label}</span>
    </motion.div>
  );
}

/* The earned medal — brushed-metal disc, engraved "LADDER", volt score ring. */
function Medal({ score }: { score: number }) {
  const cx = 110;
  const cy = 110;
  const rr = 60; // ring radius
  const C = 2 * Math.PI * rr;
  const gap = 42; // degrees of open gap at top
  const sweep = 360 - gap;
  const frac = sweep / 360;
  const start = -90 + gap / 2; // right side of the top gap
  const pol = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  };
  const [rcx, rcy] = pol(start, rr);
  const [lcx, lcy] = pol(start + sweep, rr);

  return (
    <motion.div
      initial={{ scale: 0.62, opacity: 0, rotate: -6 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className="relative"
      style={{ filter: "drop-shadow(0 22px 44px rgba(0,0,0,0.6))" }}
    >
      <svg width="158" height="158" viewBox="0 0 220 220">
        <defs>
          <linearGradient id="rim" x1="0.12" y1="0" x2="0.88" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.28" stopColor="#c9cccd" />
            <stop offset="0.5" stopColor="#7c7f81" />
            <stop offset="0.72" stopColor="#b6b9bb" />
            <stop offset="1" stopColor="#edeff0" />
          </linearGradient>
          <linearGradient id="face" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#bcbfc0" />
            <stop offset="1" stopColor="#8a8d8e" />
          </linearGradient>
          <radialGradient id="recess" cx="0.5" cy="0.36" r="0.72">
            <stop offset="0" stopColor="#a7aaa8" />
            <stop offset="0.75" stopColor="#7e817f" />
            <stop offset="1" stopColor="#62655f" />
          </radialGradient>
          <linearGradient id="ring" x1="0.1" y1="0.1" x2="0.92" y2="0.95">
            <stop offset="0" stopColor="#c2d22a" />
            <stop offset="1" stopColor="#6c7a06" />
          </linearGradient>
          <filter id="capGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* bevelled metal rim */}
        <circle cx={cx} cy={cy} r="104" fill="url(#rim)" />
        <circle cx={cx} cy={cy} r="104" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="88" fill="none" stroke="#5d605e" strokeWidth="2" />

        {/* face */}
        <circle cx={cx} cy={cy} r="86" fill="url(#face)" />

        {/* engraved LADDER lockup — centered in the rim channel */}
        <path id="ladderTopArc" d="M 33.5,110 A 76.5,76.5 0 0 1 186.5,110" fill="none" />
        <g opacity="0.9">
          <text className="font-display" fontSize="16" fontWeight="700" letterSpacing="5.5" fill="#f1f3f2" opacity="0.5">
            <textPath href="#ladderTopArc" startOffset="50%" textAnchor="middle" dominantBaseline="central" dy="1.2">
              LADDER
            </textPath>
          </text>
          <text className="font-display" fontSize="16" fontWeight="700" letterSpacing="5.5" fill="#5f625f">
            <textPath href="#ladderTopArc" startOffset="50%" textAnchor="middle" dominantBaseline="central">
              LADDER
            </textPath>
          </text>
        </g>
        <g transform={`rotate(180 ${cx} ${cy})`}>
          <text className="font-display" fontSize="16" fontWeight="700" letterSpacing="5.5" fill="#f1f3f2" opacity="0.5">
            <textPath href="#ladderTopArc" startOffset="50%" textAnchor="middle" dominantBaseline="central" dy="1.2">
              LADDER
            </textPath>
          </text>
          <text className="font-display" fontSize="16" fontWeight="700" letterSpacing="5.5" fill="#5f625f">
            <textPath href="#ladderTopArc" startOffset="50%" textAnchor="middle" dominantBaseline="central">
              LADDER
            </textPath>
          </text>
        </g>

        {/* score ring track + fill */}
        <circle
          cx={cx}
          cy={cy}
          r={rr}
          fill="none"
          stroke="#54573a"
          strokeWidth="13"
          strokeDasharray={`${C * frac} ${C}`}
          transform={`rotate(${start} ${cx} ${cy})`}
          strokeLinecap="round"
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={rr}
          fill="none"
          stroke="url(#ring)"
          strokeWidth="13"
          strokeLinecap="round"
          transform={`rotate(${start} ${cx} ${cy})`}
          strokeDasharray={`${C * frac} ${C}`}
          initial={{ strokeDashoffset: C * frac }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* bright end caps flanking the gap */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          filter="url(#capGlow)"
        >
          <circle cx={rcx} cy={rcy} r="6.5" fill="#dcee4f" />
          <circle cx={rcx} cy={rcy} r="6.5" fill="#d6ec3a" />
          <circle cx={lcx} cy={lcy} r="6.5" fill="#d6ec3a" />
        </motion.g>

        {/* recessed inner disc */}
        <circle cx={cx} cy={cy} r="46" fill="url(#recess)" />
        <circle cx={cx} cy={cy} r="46" fill="none" stroke="#4f524d" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="46" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" transform="translate(0 -1)" />

        {/* score */}
        <text x={cx} y={cy + 17} textAnchor="middle" className="font-ek" fontSize="52" fill="#3f423d" opacity="0.55">
          {score}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" className="font-ek" fontSize="52" fill="#d4d7d2">
          {score}
        </text>
      </svg>
    </motion.div>
  );
}

const CONFETTI_COLORS = ["#e6ff00", "#54f46d", "#a3b800", "#ffffff"];
const CONFETTI_FALL = 1080;

/**
 * One drifting layer of confetti. Rendered twice in Payoff — a dim, smaller
 * "back" layer behind the content and a brighter, larger "front" layer over it —
 * so pieces pass both behind and in front of cards for a sense of depth.
 */
function Confetti({
  layer,
  count,
  seed,
}: {
  layer: "back" | "front";
  count: number;
  seed: number;
}) {
  const front = layer === "front";
  const bits = Array.from({ length: count }, (_, i) => {
    const rng = (n: number) => (Math.sin((i + seed) * 99.13 + n * 7.7) + 1) / 2;
    const base = front ? 6 : 3;
    return {
      x: `${rng(1) * 100}%`,
      c: CONFETTI_COLORS[(i + seed) % CONFETTI_COLORS.length],
      w: base + Math.round(rng(2) * (front ? 8 : 5)),
      h: base + Math.round(rng(3) * (front ? 10 : 6)),
      sway: (rng(4) - 0.5) * (front ? 90 : 60),
      spin: (rng(5) > 0.5 ? 1 : -1) * (360 + Math.round(rng(8) * 360)),
      // front falls a touch quicker than back → subtle parallax
      duration: (front ? 6.5 : 8) + rng(6) * 3,
      delay: rng(7) * 5,
      opacity: front ? 1 : 0.55,
    };
  });
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        front ? "z-20" : "z-0"
      }`}
      style={{ filter: front ? undefined : "blur(0.4px)" }}
    >
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-[1px]"
          style={{
            left: b.x,
            top: -40,
            width: b.w,
            height: b.h,
            background: b.c,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: CONFETTI_FALL,
            x: [0, b.sway, -b.sway * 0.6, 0],
            rotate: b.spin,
            opacity: [0, b.opacity, b.opacity, b.opacity * 0.85, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            y: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeIn" },
            x: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" },
            opacity: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              times: [0, 0.12, 0.68, 0.9, 1],
            },
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Payoff sub-icons
 * ------------------------------------------------------------------ */
function ChipBtn({ children }: { children: ReactNode }) {
  return (
    <button className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-paper transition hover:bg-white/10 [&>svg]:h-[18px] [&>svg]:w-[18px]">
      {children}
    </button>
  );
}

function BookGlyph() {
  return (
    <svg viewBox="9 8 18 18" fill="none">
      <path
        d="M14.2921 26C12.7765 26 12 25.231 12 23.693V12.3444C12 10.7839 12.769 10 14.3145 10H22.2436C23.7891 10 24.5581 10.7914 24.5581 12.3444V20.9081C24.5581 21.6547 24.2147 22.0205 23.9309 22.3042C23.0051 23.2375 23.1993 24.4545 24.14 24.8278C24.3789 24.9099 24.5581 25.1414 24.5581 25.4027C24.5581 25.7387 24.2893 26 23.9608 26H14.2921ZM14.1353 21.4456C14.3668 21.4456 14.5684 21.2515 14.5684 21.0126V11.5828C14.5684 11.3439 14.3668 11.1573 14.1353 11.1573C13.9039 11.1573 13.7098 11.3439 13.7098 11.5828V21.0126C13.7098 21.2515 13.9039 21.4456 14.1353 21.4456ZM16.4648 14.7709H22.2287C22.5049 14.7709 22.7364 14.5394 22.7364 14.2632C22.7364 13.9795 22.5049 13.7555 22.2287 13.7555H16.4648C16.1885 13.7555 15.9571 13.9795 15.9571 14.2632C15.9571 14.5394 16.1885 14.7709 16.4648 14.7709ZM16.4648 16.8913H20.8399C21.1237 16.8913 21.3476 16.6598 21.3476 16.3761C21.3476 16.0999 21.1237 15.8759 20.8399 15.8759H16.4648C16.1885 15.8759 15.9571 16.0999 15.9571 16.3761C15.9571 16.6598 16.1885 16.8913 16.4648 16.8913ZM14.3593 24.7979H22.4526C22.0569 24.1559 21.9972 23.3346 22.3481 22.5581C22.2734 22.573 22.1839 22.5805 22.0868 22.5805H14.4265C13.6799 22.5805 13.2021 23.0135 13.2021 23.6855C13.2021 24.3948 13.6052 24.7979 14.3593 24.7979Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeartGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20.5C5.5 15.5 3 12.4 3 9 3 6.5 5 4.5 7.5 4.5 9 4.5 10.5 5.3 12 6.8 13.5 5.3 15 4.5 16.5 4.5 19 4.5 21 6.5 21 9 21 12.4 18.5 15.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15V3m0 0L8 7m4-4 4 4M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstaGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" className="text-paper" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" className="text-paper" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" className="text-paper" />
    </svg>
  );
}

function NutritionLeaf() {
  return (
    <svg width="17" height="14" viewBox="0 0 24 20" fill="none">
      <path
        d="M0.307617 0.664062C0.362956 0.426107 0.462565 0.257324 0.606445 0.157715C0.755859 0.0525716 0.919108 0.0166016 1.09619 0.0498047C1.27327 0.077474 1.43929 0.168783 1.59424 0.32373C2.09229 0.871582 2.63184 1.27555 3.21289 1.53564C3.79948 1.79574 4.3999 1.96452 5.01416 2.04199C5.63395 2.11393 6.24268 2.1499 6.84033 2.1499C7.36051 2.1499 7.91667 2.1167 8.50879 2.05029C9.10645 1.98389 9.70687 1.92025 10.3101 1.85938C10.9188 1.79297 11.5081 1.75977 12.0781 1.75977C13.8102 1.75977 15.3376 2.04476 16.6602 2.61475C17.9827 3.18473 19.0148 4.04525 19.7563 5.19629C20.4979 6.34733 20.8687 7.78613 20.8687 9.5127C20.8687 9.76725 20.8604 10.0107 20.8438 10.2432C20.8327 10.4701 20.8133 10.6637 20.7856 10.8242C20.7524 11.029 20.639 11.1646 20.4453 11.231C20.2572 11.2918 20.069 11.2365 19.8809 11.0649C19.2168 10.4618 18.5527 9.99137 17.8887 9.65381C17.2246 9.31071 16.5633 9.05892 15.9048 8.89844C15.2463 8.73242 14.5933 8.61621 13.9458 8.5498C13.2983 8.47786 12.6592 8.41423 12.0283 8.35889C11.403 8.30355 10.7887 8.20947 10.1855 8.07666C9.58789 7.94385 9.00684 7.73356 8.44238 7.4458C7.87793 7.15804 7.33285 6.74577 6.80713 6.20898C6.65218 6.0485 6.5083 6.0153 6.37549 6.10938C6.24268 6.19792 6.21224 6.33073 6.28418 6.50781C6.55534 7.17741 6.92334 7.71696 7.38818 8.12646C7.85303 8.53597 8.39258 8.8597 9.00684 9.09766C9.62109 9.33008 10.2824 9.51823 10.9907 9.66211C11.7046 9.80599 12.4434 9.9471 13.207 10.0854C13.9762 10.2238 14.751 10.3981 15.5312 10.6084C16.3115 10.8187 17.0752 11.112 17.8223 11.4883C18.5693 11.8646 19.2777 12.3626 19.9473 12.9824C20.2184 13.2425 20.5366 13.5828 20.9019 14.0034C21.2671 14.424 21.6213 14.8805 21.9644 15.373C22.3075 15.8656 22.5924 16.3525 22.8193 16.834C23.0462 17.3154 23.1597 17.7471 23.1597 18.1289C23.1597 18.6104 23.0186 19.0088 22.7363 19.3242C22.4541 19.6396 22.1082 19.7974 21.6987 19.7974C21.4995 19.7974 21.3141 19.742 21.1426 19.6313C20.9766 19.5207 20.8548 19.3353 20.7773 19.0752C20.5947 18.4941 20.4149 17.9601 20.2378 17.4731C20.0607 16.9862 19.8726 16.5324 19.6733 16.1118C19.4741 15.6912 19.2417 15.2873 18.9761 14.8999C18.716 14.5125 18.4089 14.1279 18.0547 13.7461L19.4658 13.7544C19.3496 13.9813 19.1615 14.258 18.9014 14.5845C18.6468 14.9054 18.3148 15.2375 17.9053 15.5806C17.5013 15.9181 17.0143 16.2336 16.4443 16.5269C15.8799 16.8257 15.2324 17.0664 14.502 17.249C13.7715 17.4372 12.9497 17.5312 12.0366 17.5312C10.2215 17.5312 8.5752 17.2131 7.09766 16.5767C5.62012 15.9403 4.3501 15.0355 3.2876 13.8623C2.23063 12.6836 1.41715 11.2752 0.847168 9.63721C0.282715 7.99365 0.000488281 6.16471 0.000488281 4.15039C0.000488281 3.68001 0.0226237 3.12109 0.0668945 2.47363C0.116699 1.82617 0.19694 1.22298 0.307617 0.664062Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FlameGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1.4.5-2.5 1.2-3.3.3 1 1 1.8 1.8 2.1C9.4 8.6 12 6.5 12 3Z"
        fill="#ff7a45"
      />
    </svg>
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