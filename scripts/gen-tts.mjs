import { fal } from "@fal-ai/client";
import { writeFileSync, mkdirSync } from "node:fs";

fal.config({ credentials: process.env.FAL_KEY });

// Lines to (re)generate. voice: "Jessica" = Ladder, "Matilda" = Maya.
const CLIPS = [
  {
    id: "eat-steps-you",
    voice: "Matilda",
    text: "Yeah, walk me through it.",
  },
  {
    id: "eat-steps",
    voice: "Jessica",
    text: "Saute the spinach, warm the rice in the same pan, then fold in two eggs until just set. That's it.",
  },
];

async function tts({ id, voice, text }) {
  console.log(`\n[${id}] generating (${voice})…`);
  const result = await fal.subscribe("fal-ai/elevenlabs/tts/multilingual-v2", {
    input: { text, voice },
    logs: true,
  });
  const url = result.data?.audio?.url;
  if (!url) throw new Error(`[${id}] no audio url: ${JSON.stringify(result.data)}`);
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  const out = `public/audio/${id}.mp3`;
  writeFileSync(out, buf);
  console.log(`[${id}] saved ${out} (${buf.length} bytes)`);
}

async function main() {
  mkdirSync("public/audio", { recursive: true });
  for (const clip of CLIPS) await tts(clip);
  console.log("\nDone. Run ffprobe to measure durations.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
