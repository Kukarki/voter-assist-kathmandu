const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to Kathmandu Voter DB!'))
  .catch((err) => console.error('❌ Connection error:', err));

const Candidate = require('./models/Candidate');

// --- 1. VOTING ROUTE ---
app.post('/api/candidates/vote', async (req, res) => {
  const { id, name } = req.body;
  try {
    const updatedCandidate = await Candidate.findOneAndUpdate(
      { name: name }, 
      { $inc: { votes: 1 }, $set: { id: id } }, 
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "Vote saved!", data: updatedCandidate });
  } catch (err) {
    res.status(500).json({ message: "Failed to save vote" });
  }
});

// --- 2. CANDIDATE LIST ROUTE ---
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching candidates" });
  }
});

// --- 3. NAGARIK AI CHAT (Bypassing the SDK to fix 404) ---
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    // ✅ Calling the STABLE V1 API directly via fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `System: You are Nagarik AI Assistant for Kathmandu Elections. Professional and concise. User Question: ${message}` }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Google API Error');
    }

    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(500).json({ reply: "Nagarik AI is taking a moment to wake up. Please try again." });
  }
});

app.get('/', (req, res) => {
  res.send('Voter Assist Kathmandu Server is Live!');
});

const BIND_IP = process.env.NODE_ENV === 'production' ? "0.0.0.0" : "127.0.0.1";

app.listen(PORT, BIND_IP, () => {
  console.log(`🚀 Server running on ${BIND_IP}:${PORT}`);
});