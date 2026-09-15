export async function POST(req) {
  try {
    const { messages = [] } = await req.json();

    const contents = messages
      .filter((m) => m?.content)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content) }],
      }));

    async function askGemini(model) {
      return fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify({ contents }),
        }
      );
    }

    let response = await askGemini("gemini-3.6-flash");

    if (!response.ok && (response.status === 429 || response.status === 503)) {
      console.log("Primary Gemini busy. Trying fallback...");
      response = await askGemini("gemini-3.1-flash-lite");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message || "Gemini request failed"
      );
