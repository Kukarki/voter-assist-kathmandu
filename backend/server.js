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

// ✅ UPDATE: Improved CORS to allow Vercel to talk to Render
app.use(cors({
  origin: '*', // Allows all domains; use this to fix the connection error
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ UPDATE: Added timeout options to prevent connection "hanging"
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

app.patch('/api/candidates/:id/support', async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } }, 
      { new: true }
    );
    if (!updatedCandidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ message: "Failed to register support" });
  }
});

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
  try {
    const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = aiModel.startChat({
      history: history || [],
      systemInstruction: {
        parts: [{ text: "You are Nagarik AI Assistant. You provide helpful info about Kathmandu elections. Professional and concise." }]
      }
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ reply: "AI Connection Error." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server live on port ${PORT}`);
});