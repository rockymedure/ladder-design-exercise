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

      <Experience />
    </main>
  );
}
