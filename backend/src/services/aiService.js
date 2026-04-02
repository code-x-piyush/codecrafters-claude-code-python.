const OpenAI = require('openai');
const env = require('../config/env');

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const askAI = async (prompt, system = 'You are a helpful assistant.') => {
  const response = await client.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt },
    ],
  });

  return response.choices?.[0]?.message?.content || 'No response generated.';
};

module.exports = { askAI };
