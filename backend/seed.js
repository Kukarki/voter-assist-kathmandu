require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('./models/Candidate');

// Using your provided MongoDB URI
const MONGO_URI = "mongodb+srv://kushalkarki1415_db_user:VUjt1ss1W7OMMYMW@voter-assist-kathmandu.ptleder.mongodb.net/?appName=voter-assist-kathmandu";

const candidatesToSeed = [
  // --- Major Party Candidates & Official Results ---
  { name: "Ranju Neupane (Darshana)", party: "Rastriya Swatantra Party", votes: 15455, status: "Winner", bio: "Youth leader and social activist who secured a historic win for the RSP in Kathmandu-1." },
  { name: "Prabal Thapa Chhetri", party: "Nepali Congress", votes: 6364, status: "Runner-up", bio: "Senior representative focusing on democratic stability and institutional development." },
  { name: "Rabindra Mishra", party: "Rastriya Prajatantra Party", votes: 3972, status: "3rd Place", bio: "Former journalist and lead campaigner for the RPP, advocating for cultural preservation." },
  { name: "Mohan Raj Regmi", party: "CPN-UML", votes: 1618, status: "4th Place", bio: "Represented the UML's historical base with a focus on infrastructure." },
  { name: "Menuka Bhandari", party: "NCP (Maoist Centre)", votes: 842, status: "Active", bio: "Advocate for social justice and inclusive local governance." },
  
  // --- Significant Independent & Other Candidates ---
  { name: "Suman Sayami", party: "Independent", votes: 512, status: "Active", bio: "Community activist known for heritage preservation." },
  { name: "Ramesh Kharel", party: "Nepal Sushasan Party", votes: 310, status: "Active", bio: "Former police officer running on a platform of anti-corruption." },
  { name: "Samikshya Baskota", party: "Bibeksheel Sajha", votes: 155, status: "Active" },
  { name: "Pukar Bam", party: "Independent", votes: 120, status: "Active" },
  { name: "Kiran Poudel", party: "Independent", votes: 95, status: "Active" },

  // --- Remaining 19 Candidates ---
  { name: "Sagar Joshi", party: "Independent", votes: 45, status: "Active" },
  { name: "Asim Man Singh Basnyat", party: "Independent", votes: 38, status: "Active" },
  { name: "Kamal Subedi", party: "Janadesh Party Nepal", votes: 32, status: "Active" },
  { name: "Surendra Pandey", party: "Samabeshi Samajbadi", votes: 29, status: "Active" },
  { name: "Arjun Bahadur Shahi", party: "Nepal Janasewa Party", votes: 25, status: "Active" },
  { name: "Indra Prasad Shrestha", party: "Rastriya Mukti Party", votes: 21, status: "Active" },
  { name: "Mang Lal Shrestha", party: "Ujaylo Nepal Party", votes: 18, status: "Active" },
  { name: "Dhanraj Shahi", party: "Nepal Communist Party (M)", votes: 15, status: "Active" },
  { name: "Raj Kumar Limbu", party: "Miteri Party Nepal", votes: 12, status: "Active" },
  { name: "Samir Lama Tamang", party: "Shram Sanskriti Party", votes: 10, status: "Active" },
  { name: "Sabin Sigdel", party: "Pragatishil Loktantrik Party", votes: 8, status: "Active" },
  { name: "Ramila Jyakha (Suwal)", party: "Nepal Majdoor Kisan Party", votes: 7, status: "Active" },
  { name: "Prakash Nayaju", party: "Janata Samjbadi Party-Nepal", votes: 6, status: "Active" },
  { name: "Binod Kumar Karki", party: "Independent", votes: 5, status: "Active" },
  { name: "Sushma Sharma", party: "Independent", votes: 4, status: "Active" },
  { name: "Narayan Prasad Dhakal", party: "Independent", votes: 3, status: "Active" },
  { name: "Anita Shrestha", party: "Independent", votes: 2, status: "Active" },
  { name: "Raju Lama", party: "Independent", votes: 1, status: "Active" },
  { name: "Bishnu Prasad Pokhrel", party: "Independent", votes: 1, status: "Active" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas: Voter Assist Kathmandu");
    
    // Clear old data
    await Candidate.deleteMany({});
    console.log("Old candidates cleared.");

    // Insert all 29 records
    await Candidate.insertMany(candidatesToSeed);
    console.log(`Successfully seeded ${candidatesToSeed.length} candidates.`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();