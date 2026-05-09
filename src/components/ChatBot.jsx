import React, { useState } from 'react';
import { Card, Button, Form, InputGroup } from 'react-bootstrap';

const ChatBot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { 
      text: "Namaste! I am your Nagarik Assistant. Please select an option or type your question below:", 
      sender: "bot",
      isOption: true 
    }
  ]);
  const [input, setInput] = useState("");

  const quickOptions = [
    { label: "📍 Find My Polling Station", value: "where is my polling station" },
    { label: "🗳️ View Candidate List", value: "show me candidates" },
    { label: "📞 Contact Election Commission", value: "what is the helpline" },
    { label: "📊 Latest Results", value: "show election results" }
  ];

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { text: textToSend, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Bot Logic / Routing
    setTimeout(() => {
      let botResponse = "I'm looking that up for you. You can also check the official Nagarik App for real-time verification.";
      
      const query = textToSend.toLowerCase();
      if (query.includes("polling")) {
        botResponse = "To find your station, please go to the 'Polling Station' tab in the menu and enter your Voter ID.";
      } else if (query.includes("candidate")) {
        botResponse = "You can view all Kathmandu candidates on our Home page gallery.";
      } else if (query.includes("helpline") || query.includes("contact")) {
        botResponse = "The official ECN helpline is 1102. For Nagarik App support, call 1101.";
      } else if (query.includes("results")) {
        botResponse = "Results are being updated! FPTP results for Kathmandu are 90% complete. Check the 'Timeline' for details.";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 8000); // 800ms delay for natural feel
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!isOpen ? (
        <Button 
          variant="primary" 
          className="rounded-circle shadow-lg p-0 d-flex align-items-center justify-content-center" 
          onClick={() => setIsOpen(true)}
          style={{ width: '65px', height: '65px', fontSize: '1.8rem' }}
        >
          💬
        </Button>
      ) : (
        <Card className="shadow-lg border-0" style={{ width: '320px', height: '450px', borderRadius: '15px' }}>
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center" style={{ borderRadius: '15px 15px 0 0' }}>
            <div className="d-flex align-items-center">
              <div className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
              <strong>Nagarik Bot 🇳🇵</strong>
            </div>
            <Button variant="close" onClick={() => setIsOpen(false)} />
          </Card.Header>

          <Card.Body className="overflow-auto d-flex flex-column p-3" style={{ backgroundColor: '#f0f2f5' }}>
            {messages.map((msg, i) => (
              <div key={i} className="mb-3">
                <div className={`p-2 rounded shadow-sm ${msg.sender === 'bot' ? 'bg-white align-self-start border-start border-primary border-4' : 'bg-primary text-white ms-auto'}`} 
                     style={{ maxWidth: '85%', fontSize: '0.9rem', width: 'fit-content' }}>
                  {msg.text}
                </div>
                
                {/* Render Options if it's the first bot message */}
                {msg.isOption && (
                  <div className="mt-2 d-flex flex-column gap-2">
                    {quickOptions.map((opt, idx) => (
                      <Button 
                        key={idx} 
                        variant="outline-primary" 
                        size="sm" 
                        className="text-start bg-white"
                        onClick={() => handleSend(opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Card.Body>

          <Card.Footer className="bg-white border-0 pb-3">
            <Form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <InputGroup size="sm">
                <Form.Control 
                  placeholder="Ask a question..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ borderRadius: '20px 0 0 20px', borderRight: 'none' }}
                />
                <Button variant="primary" type="submit" style={{ borderRadius: '0 20px 20px 0' }}>
                  Send
                </Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;