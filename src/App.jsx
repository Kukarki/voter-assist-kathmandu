import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the new CSS
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AppNavbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import ElectionTimeline from './components/ElectionTimeline'; 
import PollingStation from './components/PollingStation';
import FAQ from './components/FAQ';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100 bg-white">
        
        {/* 1. Official Government Top Bar */}
        <div className="bg-light py-1 border-bottom" style={{ fontSize: '0.75rem' }}>
          <Container className="d-flex align-items-center">
            <span className="me-2">🇳🇵</span>
            <span className="text-muted">Official Portal of the Kathmandu District Election Support.</span>
          </Container>
        </div>

        <AppNavbar />

        {/* 2. Live News Ticker */}
        <div className="ticker-container">
          <div className="ticker-text text-danger">
            📢 LIVE: Final counting underway for Kathmandu Ward 16 &bull; Voter turnout recorded at 68.4% &bull; Official results briefing at 10 PM tonight &bull; Use Nagarik App for digital ID verification &bull;
          </div>
        </div>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<ElectionTimeline />} />
            <Route path="/polling" element={<PollingStation />} />
            <Route path="/faq" element={<FAQ openBot={() => setIsChatOpen(true)} />} />
          </Routes>
        </main>

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