const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  votes: { type: Number, default: 0 },
  constituency: { type: String, default: "Kathmandu-1" },
  status: { type: String }, // e.g., "Winner", "Runner-up", "Active"
  bio: { type: String },
  image: { type: String } // URL or path to candidate photo
});

module.exports = mongoose.model('Candidate', candidateSchema);