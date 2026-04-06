exports.handler = async function(event) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const body = JSON.parse(event.body);
  
  const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.0-flash-lite"];
  
  for (let model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(data)
      };
    } catch(e) {
      console.warn(`${model} failed:`, e);
    }
  }
  
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "All models failed" })
  };
};
