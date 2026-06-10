import Link from "next/link";
import { Experience } from "@/components/Experience";

export default function Play() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#050505] px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(230,255,0,0.06), transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(84,244,109,0.05), transparent 60%)",
        }}
      />

      <Link
        href="/"
        className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash transition hover:border-white/30 hover:text-paper"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Case study
      </Link>

      <Experience />
    </main>
  );
}
