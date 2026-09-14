export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const text = (messages[messages.length - 1]?.content || "").trim();
    const lower = text.toLowerCase();

    let reply;

    if (/^(hi|hello|hey|నమస్తే|హాయ్)/i.test(text)) {
      reply = "నమస్తే! 🙏 నేను NAGARAI. మీకు ఎలా సహాయం చేయగలను?";
    } else if (lower.includes("who are you") || text.includes("నువ్వు ఎవరు")) {
      reply = "నేను NAGARAI 🤖 — మీకు సహాయం చేయడానికి రూపొందించిన AI assistant.";
    } else if (lower.includes("thank")) {
      reply = "మీకు సహాయం చేయడం నాకు ఆనందంగా ఉంది! 😊";
    } else if (lower.includes("bye")) {
      reply = "Bye! 👋 మళ్లీ కలుద్దాం.";
    } else if (text.includes("ఎలా ఉన్నావు") || lower.includes("how are you")) {
      reply = "నేను బాగున్నాను! 😊 మీరు ఎలా ఉన్నారు?";
    } else {
      reply = `మీరు అడిగింది: "${text}"\n\nప్రస్తుతం నేను Demo Mode లో ఉన్నాను. 🤖 త్వరలో మరింత smart answers ఇస్తాను!`;
    }

    return Response.json({ text: reply });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Demo request failed" },
      { status: 500 }
    );
  }
}
