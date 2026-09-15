export async function POST(req) {
  try {
    const { messages = [] } = await req.json();

    const contents = messages
      .filter((m) => m?.content)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content) }],
      }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message || "Gemini request failed"
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") ||
      "Sorry, I could not generate a response.";

    return Response.json({ text });
  } catch (error) {
    console.error("Gemini error:", error);

    return Response.json(
      {
        error: error?.message || "Gemini request failed",
      },
      { status: 500 }
    );
  }
}\
