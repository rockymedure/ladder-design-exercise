"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "../PhoneFrame";

/* ------------------------------------------------------------------ *
 * Refuel · Pulse — the post-workout, one-tap session-end screen.
 *
 * Two elements only: three icons (water / shake / meal) and one big,
 * living visualization. Three hand-drawn ridgelines harmonize and
 * vibrate; you slide on them to say how much (water), what kind
 * (shake), or how full (meal). One tap logs it.
 * ------------------------------------------------------------------ */

type Kind = "water" | "shake" | "meal";
type Axis = "amount" | "kind" | "portion";

interface TypeConfig {
  label: string;
  axis: Axis;
  palette: string[];
  steps?: string[];
  options?: string[];
  freq: number;
  hint: string;
}

const SHAKE_PALETTES: Record<string, string[]> = {
  Whey: ["#FAFAFA", "#E6D6B8", "#54F46D"],
  Plant: ["#54F46D", "#9BE86B", "#E2FF3D"],
  Greens: ["#7DE3FF", "#54F46D", "#2FB57A"],
  "Pre-workout": ["#E2FF3D", "#FF6B6B", "#54F46D"],
};

const TYPES: Record<Kind, TypeConfig> = {
  water: {
    label: "Water",
    axis: "amount",
    palette: ["#FAFAFA", "#54F46D", "#7DE3FF"],
    steps: ["A sip", "One glass", "Two glasses", "Three glasses", "A full bottle"],
    freq: 1.4,
    hint: "Slide up — how much?",
  },
  shake: {
    label: "Shake",
    axis: "kind",
    palette: ["#FAFAFA", "#54F46D", "#E2FF3D"],
    options: ["Whey", "Plant", "Greens", "Pre-workout"],
    freq: 2.2,
    hint: "Slide — what kind?",
  },
  meal: {
    label: "Meal",
    axis: "portion",
    palette: ["#E2FF3D", "#FFB04D", "#54F46D"],
    steps: ["A bite", "Light", "Balanced", "Hearty", "Feast"],
    freq: 1.1,
    hint: "Slide up — how full?",
  },
};

const ORDER: Kind[] = ["water", "shake", "meal"];

interface VizState {
  type: Kind;
  axis: Axis;
  level: number;
  freq: number;
  palette: string[];
  energy: number;
}

/* ---- the living visualization ----------------------------------- */
function usePulseCanvas(stateRef: React.MutableRefObject<VizState>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const start = performance.now();
    let raf = 0;
    const bubbles: { x: number; y: number; r: number; v: number; wob: number }[] = [];

    const loop = (now: number) => {
      const t = now - start;
      const s = stateRef.current;
      const r = wrap.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      ctx.clearRect(0, 0, w, h);

      s.energy *= 0.94;

      if (s.type === "water") {
        // ---- water: a rising body of liquid ---------------------
        const lvl = s.level;
        const bottom = h * 0.98;
        const topY = bottom - lvl * (h * 0.66);
        const waveAmp = 5 + lvl * 9 + s.energy * 7;
        const surf = (nx: number) =>
          topY +
          Math.sin(nx * 6.2832 * 1.1 + t * 0.0016) * waveAmp +
          Math.sin(nx * 6.2832 * 2.3 + t * 0.002 + 1.3) * waveAmp * 0.4;

        // body fill
        ctx.beginPath();
        ctx.moveTo(0, surf(0));
        for (let x = 0; x <= w; x += 4) ctx.lineTo(x, surf(x / w));
        ctx.lineTo(w, bottom + 60);
        ctx.lineTo(0, bottom + 60);
        ctx.closePath();
        const g = ctx.createLinearGradient(0, topY - 12, 0, h);
        g.addColorStop(0, "rgba(150,235,255,0.42)");
        g.addColorStop(0.45, "rgba(45,175,222,0.26)");
        g.addColorStop(1, "rgba(10,70,100,0.06)");
        ctx.fillStyle = g;
        ctx.fill();

        // caustic highlight just under the surface
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = surf(x / w) + 7;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(190,245,255,0.18)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // rising bubbles
        if (lvl > 0.08 && Math.random() < 0.18) {
          bubbles.push({
            x: Math.random() * w,
            y: bottom,
            r: 1.2 + Math.random() * 2.6,
            v: 0.25 + Math.random() * 0.7,
            wob: Math.random() * 6.28,
          });
        }
        for (let b = bubbles.length - 1; b >= 0; b--) {
          const bub = bubbles[b];
          bub.y -= bub.v * (1 + lvl);
          bub.x += Math.sin(t * 0.002 + bub.wob) * 0.4;
          if (bub.y <= surf(bub.x / w) + 2) {
            bubbles.splice(b, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(bub.x, bub.y, bub.r, 0, 6.2832);
          ctx.fillStyle = "rgba(200,245,255,0.30)";
          ctx.fill();
        }

        // surface crest — the signature ridgelines, hugging the water
        const crest = [
          { c: "#EAFBFF", off: -2, lw: 5, blur: 16 },
          { c: "#7DE3FF", off: 4, lw: 4, blur: 12 },
          { c: "#34B7E6", off: 9, lw: 3, blur: 10 },
        ];
        crest.forEach((cl) => {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 3) {
            const y =
              surf(x / w) + cl.off + (Math.random() - 0.5) * (0.6 + s.energy * 3);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = cl.c;
          ctx.lineWidth = cl.lw;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = cl.c;
          ctx.shadowBlur = cl.blur + lvl * 10 + s.energy * 24;
          ctx.globalAlpha = 0.95;
          ctx.stroke();
        });
      } else {
        // ---- shake / meal: free-floating harmonizing ridgelines -
        const lvl = s.axis === "kind" ? 0.58 : s.level;
        const baseY = h * 0.68 - lvl * (h * 0.4);
        const amp = 14 + lvl * 66;
        const arch = h * 0.08 + lvl * h * 0.07;
        const jit = 0.5 + s.energy * 6 + lvl * 1.4;

        s.palette.forEach((color, i) => {
          ctx.beginPath();
          const phase = t * 0.0011 * (1 + i * 0.06) + i * 0.9;
          const sep = (i - 1) * (10 + lvl * 14);
          for (let x = 0; x <= w; x += 3) {
            const nx = x / w;
            const env = Math.sin(nx * Math.PI);
            const tail =
              (nx < 0.06 ? (0.06 - nx) * 8 : 0) + (nx > 0.94 ? (nx - 0.94) * 8 : 0);
            const y =
              baseY +
              sep -
              env * arch +
              tail * amp * 0.5 +
              Math.sin(nx * 6.2832 * s.freq + phase) * amp * 0.6 * env +
              Math.sin(nx * 6.2832 * s.freq * 2.1 + phase * 1.5 + i) * amp * 0.28 * env +
              Math.sin(nx * 6.2832 * s.freq * 3.7 + phase * 0.8) * amp * 0.12 * env +
              (Math.random() - 0.5) * jit;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = 6;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = color;
          ctx.shadowBlur = 10 + lvl * 16 + s.energy * 28;
          ctx.globalAlpha = 0.95;
          ctx.stroke();
        });
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [stateRef]);

  return { canvasRef, wrapRef };
}

/* ---- the flow --------------------------------------------------- */
function PulseFlow({ onRestart }: { onRestart: () => void }) {
  const [type, setType] = useState<Kind>("water");
  const [levels, setLevels] = useState<Record<Kind, number>>({
    water: 0.45,
    shake: 0.58,
    meal: 0.5,
  });
  const [kindIdx, setKindIdx] = useState(0);
  const [logged, setLogged] = useState<Record<Kind, boolean>>({
    water: false,
    shake: false,
    meal: false,
  });

  const cfg = TYPES[type];
  const stateRef = useRef<VizState>({
    type: "water",
    axis: "amount",
    level: 0.45,
    freq: TYPES.water.freq,
    palette: TYPES.water.palette,
    energy: 0,
  });

  const { canvasRef, wrapRef } = usePulseCanvas(stateRef);

  // mirror UI state into the animation loop
  useEffect(() => {
    const c = TYPES[type];
    stateRef.current.type = type;
    stateRef.current.axis = c.axis;
    stateRef.current.level = levels[type];
    stateRef.current.freq =
      c.axis === "kind" ? c.freq + kindIdx * 0.45 : c.freq;
    stateRef.current.palette =
      c.axis === "kind" ? SHAKE_PALETTES[c.options![kindIdx]] : c.palette;
  }, [type, levels, kindIdx]);

  // ---- drag interaction ----
  const drag = useRef({ x: 0, y: 0, level: 0, idx: 0, active: false });
  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      level: levels[type],
      idx: kindIdx,
      active: true,
    };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    if (cfg.axis === "kind") {
      const span = r.width * 0.66;
      const di = ((e.clientX - drag.current.x) / span) * (cfg.options!.length - 1);
      let idx = Math.round(drag.current.idx + di);
      idx = Math.max(0, Math.min(cfg.options!.length - 1, idx));
      if (idx !== kindIdx) {
        setKindIdx(idx);
        stateRef.current.energy = 1;
      }
    } else {
      const dy = (drag.current.y - e.clientY) / (r.height * 0.6);
      const nl = Math.max(0, Math.min(1, drag.current.level + dy));
      setLevels((p) => ({ ...p, [type]: nl }));
      stateRef.current.energy = Math.min(1.2, stateRef.current.energy + 0.05);
    }
  };
  const onUp = () => {
    drag.current.active = false;
  };

  // ---- readout ----
  const readout =
    cfg.axis === "kind"
      ? cfg.options![kindIdx]
      : cfg.steps![Math.round(levels[type] * (cfg.steps!.length - 1))];

  const allLogged = ORDER.every((k) => logged[k]);

  const logCurrent = () => {
    stateRef.current.energy = 1.5;
    setLogged((prev) => {
      const next = { ...prev, [type]: true };
      const upcoming = ORDER.find((k) => !next[k]);
      if (upcoming) window.setTimeout(() => setType(upcoming), 460);
      return next;
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-[#070707]">
      <header className="px-7 pt-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf">
          Session complete
        </span>
        <h1 className="font-display mt-1 text-[34px] font-bold uppercase leading-none text-paper">
          Refuel
        </h1>
      </header>

      {/* the living visualization */}
      <div
        ref={wrapRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative flex-1 cursor-ns-resize touch-none select-none"
        style={{ touchAction: "none" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* readout overlaid at the top of the canvas */}
        <div className="pointer-events-none absolute inset-x-0 top-6 flex flex-col items-center gap-1 px-7 text-center">
          <motion.span
            key={readout}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-[30px] font-bold uppercase leading-none text-paper"
          >
            {readout}
          </motion.span>
          <span className="text-[12px] text-ash">{cfg.hint}</span>
        </div>
      </div>

      {/* footer: three icons + one tap */}
      <footer className="px-7 pb-9">
        <div className="mb-5 flex items-center justify-center gap-3">
          {ORDER.map((k) => (
            <IconTab
              key={k}
              active={type === k}
              logged={logged[k]}
              onClick={() => setType(k)}
              label={TYPES[k].label}
              kind={k}
            />
          ))}
        </div>

        <button
          onClick={allLogged ? onRestart : logCurrent}
          className="w-full cursor-pointer"
        >
          <motion.div
            className="font-display rounded-full py-4 text-center text-[16px] font-bold uppercase tracking-[0.06em]"
            animate={{
              backgroundColor: logged[type] && !allLogged
                ? "rgba(84,244,109,0.18)"
                : "var(--color-leaf)",
              color: logged[type] && !allLogged ? "var(--color-leaf)" : "#0a0a0a",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {allLogged
              ? "Done — nice work"
              : logged[type]
                ? `${TYPES[type].label} logged ✓`
                : `Log ${TYPES[type].label.toLowerCase()}`}
          </motion.div>
        </button>
      </footer>
    </div>
  );
}

/* ---- icon tab --------------------------------------------------- */
function IconTab({
  active,
  logged,
  onClick,
  label,
  kind,
}: {
  active: boolean;
  logged: boolean;
  onClick: () => void;
  label: string;
  kind: Kind;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      animate={{
        backgroundColor: active ? "rgba(84,244,109,0.14)" : "rgba(255,255,255,0.04)",
        borderColor: active ? "rgba(84,244,109,0.7)" : "rgba(255,255,255,0.10)",
      }}
      className="relative flex h-[60px] flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border"
      aria-label={label}
    >
      <span
        className="[&>svg]:h-[24px] [&>svg]:w-[24px]"
        style={{ color: active ? "var(--color-leaf)" : "var(--color-ash-light)" }}
      >
        {kind === "water" ? <WaterGlyph /> : kind === "shake" ? <ShakeGlyph /> : <MealGlyph />}
      </span>
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: active ? "var(--color-paper)" : "var(--color-ash)" }}
      >
        {label}
      </span>
      {logged && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 16 }}
          className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-leaf"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#0a0a0a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}
    </motion.button>
  );
}

/* ---- glyphs ----------------------------------------------------- */
function WaterGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5c3.2 3.6 6 6.8 6 10.2a6 6 0 0 1-12 0c0-3.4 2.8-6.6 6-10.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ShakeGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
function MealGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* ---- app shell: full-screen on mobile, framed on desktop -------- */
export function RefuelPulseApp() {
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

  const flow = <PulseFlow key={runKey} onRestart={() => setRunKey((k) => k + 1)} />;

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
