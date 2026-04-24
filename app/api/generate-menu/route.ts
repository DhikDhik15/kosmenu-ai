type RequestBody = {
  ingredients: string;
  budget: string;
  tools: string;
  goal: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;

    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json(
        { error: "OPENROUTER_API_KEY belum diatur di environment variables." },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kosmenu-ai.vercel.app",
        "X-Title": "KosMenu AI",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Kamu adalah Komi, AI meal planner untuk anak kos Indonesia.
Tugasmu bukan ngobrol bebas, tetapi membuat keputusan menu berdasarkan bahan, budget, alat masak, dan tujuan user.
Jawab HANYA valid JSON tanpa markdown dengan format:
{
  "title": "string",
  "estimatedBudget": "string",
  "meals": ["string", "string", "string"],
  "shoppingList": ["string"],
  "reasoning": "string",
  "tips": ["string"]
}`,
          },
          {
            role: "user",
            content: JSON.stringify(body),
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data?.error?.message || "Gagal memanggil OpenRouter." },
        { status: response.status }
      );
    }

    const raw = data.choices?.[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(raw);
      return Response.json({ result: parsed });
    } catch {
      return Response.json({
        result: {
          title: "Menu AI",
          estimatedBudget: body.budget,
          meals: [raw],
          shoppingList: [],
          reasoning: "AI mengembalikan teks non-JSON, jadi hasil ditampilkan apa adanya.",
          tips: ["Coba generate ulang jika format hasil belum rapi."],
        },
      });
    }
  } catch {
    return Response.json({ error: "Terjadi error saat generate menu." }, { status: 500 });
  }
}
