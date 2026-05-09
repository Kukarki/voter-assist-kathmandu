import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AppNavbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Results from './pages/Results';
import Profile from './pages/Profile'; 
import ElectionTimeline from './components/ElectionTimeline'; 
import PollingStation from './components/PollingStation';
import FAQ from './components/FAQ';

function App() {
  // 1. Shared state to control if the chat window is open
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100 bg-white">
        
        <div className="bg-light py-1 border-bottom" style={{ fontSize: '0.75rem' }}>
          <Container className="d-flex align-items-center">
            <span className="me-2">🇳🇵</span>
            <span className="text-muted">Official Portal of the Kathmandu District Election Support.</span>
          </Container>
        </div>

        <AppNavbar />

        <div className="ticker-container">
          <div className="ticker-text text-danger">
            📢 LIVE: Official 2026 Election Results Verified &bull; Balendra Shah sworn in as PM &bull; Ranju Darshana secures Kathmandu-1 &bull; Voter turnout recorded at 68.4% &bull; Use Nagarik App for digital ID verification &bull;
          </div>
        </div>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile/balen-shah" element={<Profile />} />
            <Route path="/timeline" element={<ElectionTimeline />} />
            <Route path="/polling" element={<PollingStation />} />
            
            {/* 2. Pass the trigger function to the FAQ page */}
            <Route 
              path="/faq" 
              element={<FAQ openBot={() => setIsChatOpen(true)} />} 
            />
          </Routes>
        </main>

        {/* 3. Pass both state and setter to the ChatBot */}
        <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

        <footer className="bg-dark text-white text-center py-4 mt-auto">
          <Container>
            <div className="d-flex justify-content-center align-items-center gap-3 opacity-50 mb-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg" width="30" alt="Gov Nepal" />
              <span className="small fw-bold">ELECTION COMMISSION VERIFIED</span>
            </div>
            <small>&copy; 2026 Voter Assist Kathmandu | Developed by Kushal Karki & Amar Tamang</small>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;