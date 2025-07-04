const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';



app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  const systemPrompt = `You're a soft, comforting AI friend. Speak in Taglish. Reply as if you're her warm, witty, supportive bestie.`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser said: ${userInput}` }]
        }]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Something went wrong with Gemini API.' });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
