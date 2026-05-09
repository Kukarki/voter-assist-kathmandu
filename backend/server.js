const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 10000;

// Initialize Gemini
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

// --- ROUTES ---

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

// Nagarik AI Route - FIXED MODEL NAME
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ reply: "Server configuration error: Missing API Key." });
  }

  try {
    // ✅ Use 'gemini-1.5-flash' - this is the standard stable identifier
    const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = aiModel.startChat({
      history: Array.isArray(history) ? history : [],
      systemInstruction: {
        parts: [{ text: "You are Nagarik AI Assistant. You provide helpful info about Kathmandu elections. Professional and concise." }]
      }
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (err) {
    console.error("AI Error Detailed:", err);
    // Return a more descriptive error if possible
    res.status(500).json({ 
      reply: "AI Connection Error.",
      error: err.message 
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server live on port ${PORT}`);
});