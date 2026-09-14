export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    const reply =
      "నమస్తే! 🙏 నేను NAGARAI. ప్రస్తుతం Demo Mode లో ఉన్నాను. " +
      "మీ సందేశం: " + lastMessage;

    return Response.json({ text: reply });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Demo request failed" },
      { status: 500 }
    );
  }
}
