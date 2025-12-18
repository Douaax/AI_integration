// src/controllers/ai.controller.js
const geminiService = require('../services/gemini.service');

// POST /ai/summarize
exports.summarizeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });

    const summary = await geminiService.summarizeText(text);
    console.log('text',text)
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /ai/ask
exports.askQuestion = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const answer = await geminiService.askQuestion(prompt);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
