const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 10000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ Connected to Kathmandu Voter DB'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

const Candidate = require('./models/Candidate');

app.get('/', (req, res) => {
  res.send('Voter Assist API is live and running.');
});

// --- API ROUTES ---

app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ reply: "API Key missing." });
  }

  try {
    // ✅ FIX: Use the full versioned model path to bypass naming conflicts
    const aiModel = genAI.getGenerativeModel({ 
      model: "models/gemini-1.5-flash" 
    });
    
    const chatHistory = Array.isArray(history) ? history : [];

    const chat = aiModel.startChat({
      history: chatHistory
    });

    // Moving system instruction into the prompt itself to maximize compatibility
    const systemPrompt = `System: You are Nagarik AI Assistant for Kathmandu Elections. Professional and concise.
    User: ${message}`;

    const result = await chat.sendMessage(systemPrompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });

  } catch (err) {
    console.error("AI Error Detailed:", err);
    res.status(500).json({ 
      reply: "The AI service is temporarily unavailable. Check your Render logs.",
      error: err.message 
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server live on port ${PORT}`);
});