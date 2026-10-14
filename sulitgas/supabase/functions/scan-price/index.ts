const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODEL = "gemini-3.5-flash";

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
              {
                text: `This is a photo of a gas station price board in the Philippines. List every fuel type and its price per liter in pesos. Reply with only a JSON list like [{"fuel":"diesel","price":58.45}]. Use the fuel names diesel, gasoline, premium, or kerosene. If you cannot read the prices clearly, reply with [].`,
              },
              { inline_data: { mime_type: mimeType, data: image } },
            ],
          },
        ],
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return new Response(JSON.stringify({ text }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});