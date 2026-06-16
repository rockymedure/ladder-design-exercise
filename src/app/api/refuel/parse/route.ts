import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENAI = "https://api.openai.com/v1";

type Parsed = {
  transcript?: string;
  summary: string;
  items: string[];
  calories: number | null;
  protein: number | null;
};

const SYSTEM = `You turn a quick post-workout food note into structured nutrition.
Return ONLY JSON: {"summary": string, "items": string[], "calories": number, "protein": number}.
- summary: a short, natural one-line description of the meal (sentence case, <= 8 words).
- items: the distinct foods mentioned.
- calories: a rough total estimate in kcal (integer).
- protein: a rough total estimate in grams (integer).
If the note is empty or not about food, return summary "Couldn't catch that" with empty items and 0s.`;

function key() {
  // Project-specific name first so a stale OPENAI_API_KEY in the shell
  // environment (which Next prioritizes over .env.local) can't shadow it.
  const k = process.env.REFUEL_OPENAI_KEY || process.env.OPENAI_API_KEY;
  if (!k) throw new Error("REFUEL_OPENAI_KEY missing");
  return k;
}

async function transcribe(audio: File): Promise<string> {
  const form = new FormData();
  form.append("file", audio, audio.name || "note.webm");
  form.append("model", "whisper-1");
  const res = await fetch(`${OPENAI}/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key()}` },
    body: form,
  });
  if (!res.ok) throw new Error(`transcription failed: ${res.status}`);
  const data = (await res.json()) as { text?: string };
  return (data.text || "").trim();
}

async function parse(content: unknown): Promise<Omit<Parsed, "transcript">> {
  const res = await fetch(`${OPENAI}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content },
      ],
    }),
  });
  if (!res.ok) throw new Error(`parse failed: ${res.status}`);
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content || "{}";
  const json = JSON.parse(raw) as Partial<Parsed>;
  return {
    summary: json.summary || "Logged a meal",
    items: Array.isArray(json.items) ? json.items : [],
    calories: typeof json.calories === "number" ? json.calories : null,
    protein: typeof json.protein === "number" ? json.protein : null,
  };
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const audio = form.get("audio");
    const image = form.get("image");

    if (audio instanceof File && audio.size > 0) {
      const transcript = await transcribe(audio);
      const parsed = await parse(transcript);
      return NextResponse.json({ transcript, ...parsed } satisfies Parsed);
    }

    if (image instanceof File && image.size > 0) {
      const buf = Buffer.from(await image.arrayBuffer());
      const dataUrl = `data:${image.type};base64,${buf.toString("base64")}`;
      const parsed = await parse([
        { type: "text", text: "Identify this meal and estimate its nutrition." },
        { type: "image_url", image_url: { url: dataUrl } },
      ]);
      return NextResponse.json(parsed satisfies Parsed);
    }

    return NextResponse.json({ error: "no audio or image" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
