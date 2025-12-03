export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, systemPrompt, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    }

    // Minimal server-side call using Google Generative Language API REST
    // NOTE: Model and SDKs evolve; this uses a generic REST pattern.
    const model = 'gemini-2.0-flash';

    const body = {
      contents: [
        ...(systemPrompt ? [{ role: 'user', parts: [{ text: systemPrompt }] }] : []),
        ...(Array.isArray(history) ? history : []),
        { role: 'user', parts: [{ text: message }] }
      ],
      generationConfig: { temperature: 0.9, maxOutputTokens: 150 }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const t = await r.text();
      console.error('Gemini error:', r.status, t);
      return res.status(502).json({ error: 'Upstream AI error', status: r.status });
    }

    const data = await r.json();
    // Extract text from candidates safely
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });
  } catch (e) {
    console.error('Proxy error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
