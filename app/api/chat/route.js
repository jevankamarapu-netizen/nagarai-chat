export async function POST(req) {
  try {
    const { messages = [] } = await req.json();

    const input = messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: [
        {
          type: "input_text",
          text: String(m.content ?? ""),
        },
      ],
    }));

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        instructions:
          "You are NAGARAI, a helpful AI assistant. Answer naturally in the user's language. If the user writes Telugu, reply in Telugu. Be concise and helpful.",
        input,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "OpenAI request failed");
    }

    return Response.json({
      text: data.output_text || "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error("OpenAI error:", error);

    return Response.json(
      {
        error: error?.message || "OpenAI request failed",
      },
      { status: 500 }
    );
  }
}
