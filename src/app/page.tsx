import { Experience } from "@/components/Experience";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#050505] px-4 py-10">
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(230,255,0,0.06), transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(84,244,109,0.05), transparent 60%)",
        }}
      />

      <header className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-[15px] font-semibold uppercase tracking-[0.35em] text-ash">
          Ladder · Concept
        </h1>
        <p className="text-[11px] uppercase tracking-[0.25em] text-ash-dark">
          Coach in my pocket
        </p>
      </header>

      <Experience />
    </main>
  );
}
