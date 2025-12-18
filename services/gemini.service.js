
// Load environment variables
require('dotenv').config();

// Gemini model (Free API)
const MODEL_NAME = "gemini-1.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

/**
 * Summarize text using Gemini
 * @param {string} text
 * @returns {Promise<string>}
 */
async function summarizeText(text) {
  try {
    const response = await fetch(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Summarize this: ${text}` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary';
  } catch (err) {
    console.error('Gemini summarize error:', err.message);
    return `Error: ${err.message}`;
  }
}

/**
 * Ask a question using Gemini
 * @param {string} prompt
 * @returns {Promise<string>}
 */
async function askQuestion(prompt) {
  try {
    const response = await fetch(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer';
  } catch (err) {
    console.error('Gemini ask error:', err.message);
    return `Error: ${err.message}`;
  }
}

module.exports = {
  summarizeText,
  askQuestion
};
