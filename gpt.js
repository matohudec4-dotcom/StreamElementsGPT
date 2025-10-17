export default async function handler(req, res) {
  const prompt = req.query.prompt || "Ahoj!";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5-turbo",
        messages: [
          { role: "system", content: "Si vtipný Twitch chatbot, odpovedáš stručne a zábavne." },
          { role: "user", content: prompt }
        ],
        max_tokens: 80
      })
    });

    const data = await response.json();
    const msg = data.choices?.[0]?.message?.content || "🤖 Chyba pri generovaní.";
    res.status(200).send(msg);
  } catch (e) {
    res.status(500).send("❌ Server error.");
  }
}