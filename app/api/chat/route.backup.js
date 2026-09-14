import OpenAI from "openai";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages are required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured. Add it to .env.local." },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      input: messages.map((m) => ({
        role: m.role,
        content: m.content
      }))
    });

    return Response.json({ text: response.output_text });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error?.message || "AI request failed." },
      { status: 500 }
    );
  }
}