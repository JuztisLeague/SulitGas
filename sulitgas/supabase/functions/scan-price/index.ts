const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODEL = "gemini-3.5-flash";
const ALLOWED_FUELS = ["diesel", "gasoline", "premium", "kerosene"];

const PROMPT = `You are reading a photo taken at a gas station in the Philippines.
Find the fuel price board and list each fuel with its price per liter in Philippine pesos.

Rules:
- Only report a price if every digit is clearly legible. Never guess or estimate a digit.
- Ignore other numbers such as phone numbers, promos, discounts, dates, and prices per gallon.
- Use only these fuel names: diesel, gasoline, premium, kerosene.
- Regular, unleaded, RON 91, and similar names mean gasoline.
- RON 95, 97, 100 and branded premium grades mean premium. If several premium grades are listed, report the lowest-priced one.
- If several diesel grades are listed, report the standard, lowest-priced diesel.
- If the photo is not a fuel price board, or the prices cannot be read clearly, return an empty list.`;


Deno.serve(async (req) => {

  if (req.method === "OPTIONS"){
    return new Response ("ok", {headers: corsHeaders});
  }
   const { image, mimeType } = await req.json();
  const apiKey = Deno.env.get("GEMINI_API_KEY") ?? "";

   const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
         {
            parts: [
              { text: PROMPT },
              { inline_data: { mime_type: mimeType, data: image } },
            ],
          },
        ],
        generationConfig: {
          temperature: 0,
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                fuel: { type: "STRING" },
                price: { type: "NUMBER" },
              },
              required: ["fuel", "price"],
            },
          },
        },
      }),
    }
  );


  const result = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

  const seen = new Set<string>();
  const prices: { fuel: string; price: number }[] = [];

  try {
    const parsed = JSON.parse(text);
    for (const item of Array.isArray(parsed) ? parsed : []) {
      const fuel = String(item.fuel ?? "").toLowerCase();
      const price = Number(item.price);
      if (!ALLOWED_FUELS.includes(fuel)) continue;
      if (!(price >= 20 && price <= 300)) continue;
      if (seen.has(fuel)) continue;
      seen.add(fuel);
      prices.push({ fuel, price });
    }
  } catch {
    // Unreadable answer: leave the list empty
  }

  return new Response(JSON.stringify({ text: JSON.stringify(prices) }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});