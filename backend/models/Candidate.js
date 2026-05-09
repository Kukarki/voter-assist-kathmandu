const mongoose = require('mongoose');

// The blueprint for each candidate
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Candidate Name
  party: { type: String, required: true }, // Political Party
  votes: { type: Number, default: 0 }, // Starting votes at 0
  constituency: { type: String, default: "Kathmandu-1" } // Area
});

module.exports = mongoose.model('Candidate', candidateSchema);