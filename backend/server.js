const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. Only load dotenv locally. On Render, variables are injected automatically.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// 2. IMPORTANT: Render assigns a dynamic port. Default to 5000 for local dev.
const PORT = process.env.PORT || 10000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// 3. MongoDB Connection with enhanced error logging
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to Kathmandu Voter DB'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // If this fails on Render, check your Atlas IP Whitelist (0.0.0.0/0)
  });

const Candidate = require('./models/Candidate');

// Health Check Route (Helps Render confirm the service is live)
app.get('/', (req, res) => {
  res.send('Voter Assist API is live and running.');
});

// --- SUPPORT/VOTE ROUTE ---
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
        parts: [{ text: "You are Nagarik AI Assistant. You provide helpful info about Kathmandu elections. Professional and concise." }]
      }
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (err) {
    res.status(500).json({ reply: "AI Connection Error." });
  }
});

// 4. Start the Server - Listen on '0.0.0.0' so Render can detect the port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server live on port ${PORT}`);
});