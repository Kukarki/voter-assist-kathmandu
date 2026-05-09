const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Candidate = require('./models/Candidate');

const app = express();
const PORT = 5000;

// 1. MUST BE FIRST: Allow the Vite app (Port 5173) to talk to us
app.use(cors()); 
app.use(express.json()); 

// 2. Connect to MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('Successfully connected to Kathmandu Voter DB!'))
  .catch((err) => console.error('Connection error:', err));

// 3. The Vote Route - Handles the "Show Support" button
app.post('/api/candidates/vote', async (req, res) => {
  const { id, name } = req.body;
  console.log(`--- VOTE RECEIVED --- Candidate: ${name} (ID: ${id})`);

  try {
    const updatedCandidate = await Candidate.findOneAndUpdate(
      { name: name }, 
      { $inc: { votes: 1 }, $set: { id: id } }, 
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "Vote saved!", data: updatedCandidate });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ message: "Failed to save vote" });
  }
});

app.get('/', (req, res) => {
  res.send('Voter Assist Kathmandu Server is Live!');
});

// 4. Force IPv4 (127.0.0.1) to fix connection issues
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});