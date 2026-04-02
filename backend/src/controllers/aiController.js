const { z } = require('zod');
const { askAI } = require('../services/aiService');

const promptSchema = z.object({ prompt: z.string().min(2) });

const chat = async (req, res, next) => {
  try {
    const { prompt } = promptSchema.parse(req.body);
    const response = await askAI(prompt, 'You are an expert portfolio AI assistant.');
    return res.json({ success: true, data: { response } });
  } catch (error) {
    return next(error);
  }
};

const summarize = async (req, res, next) => {
  try {
    const { prompt } = promptSchema.parse(req.body);
    const response = await askAI(prompt, 'Summarize the given content concisely and clearly.');
    return res.json({ success: true, data: { response } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { chat, summarize };
