import { fal } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

fal.config({ credentials: process.env.FAL_KEY });

function fileFrom(path, name, type) {
  const buf = readFileSync(path);
  return new File([buf], name, { type });
}

async function makeAvatar(label, imageUrl, audioPath, outPath) {
  console.log(`\n[${label}] uploading audio…`);
  const audioUrl = await fal.storage.upload(
    fileFrom(audioPath, `${label}.mp3`, "audio/mpeg")
  );
  console.log(`[${label}] generating talking-head (this can take a few min)…`);
  const result = await fal.subscribe("fal-ai/bytedance/omnihuman", {
    input: { image_url: imageUrl, audio_url: audioUrl },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_PROGRESS") {
        (u.logs || []).forEach((l) => l.message && console.log(`  ${l.message}`));
      }
    },
  });
  const url = result.data?.video?.url;
  if (!url) throw new Error(`[${label}] no video url: ${JSON.stringify(result.data)}`);
  console.log(`[${label}] downloading ${url}`);
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
  console.log(`[${label}] saved ${outPath} (${buf.length} bytes)`);
}

async function main() {
  mkdirSync("public/video", { recursive: true });

  console.log("uploading portrait…");
  const imageUrl = await fal.storage.upload(
    fileFrom("public/remi/portrait.png", "portrait.png", "image/png")
  );
  console.log("portrait url:", imageUrl);

  await makeAvatar("morning", imageUrl, "public/audio/am-real.mp3", "public/video/remi-morning.mp4");
  await makeAvatar("handoff", imageUrl, "public/audio/ho-real.mp3", "public/video/remi-handoff.mp4");

  console.log("\nAll talking-head videos generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
