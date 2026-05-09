const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const PORT = 5000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to Kathmandu Voter DB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const Candidate = require('./models/Candidate');

// --- NEW SUPPORT/VOTE ROUTE ---
// This uses atomic increment ($inc) to prevent data loss
app.patch('/api/candidates/:id/support', async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } }, 
      { new: true }
    );
    if (!updatedCandidate) return res.status(404).json({ message: "Candidate not found" });
    console.log(`🗳️ Support recorded for: ${updatedCandidate.name}`);
    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ message: "Failed to register support" });
  }
});

// Candidate GET Route
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

// Nagarik AI Route
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  try {
    const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = aiModel.startChat({
      history: history || [],
      systemInstruction: {
        parts: [{ text: "You are Nagarik AI Assistant (May 2026). Professional and concise." }]
      }
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (err) {
    res.status(500).json({ reply: "AI Connection Error." });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});