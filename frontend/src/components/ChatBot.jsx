import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap';

// Receive isOpen and setIsOpen as PROPS from App.jsx
function ChatBot({ isOpen, setIsOpen }) { 
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Namaste! I am the Nagarik AI. I can help you with 2026 election results, polling stations, or information about PM Balen Shah. How can I assist you?", 
      sender: 'bot' 
    }
  ]);
  const [history, setHistory] = useState([]); 
  const scrollRef = useRef(null);

  // ✅ CONSTANT FOR YOUR LIVE BACKEND
  const BASE_URL = "https://voter-assist-kathmandu.onrender.com";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsTyping(true);

    try {
      // ✅ Fetching from the Render API instead of localhost
      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          history: history 
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
      setHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: userMsg }] },
        { role: "model", parts: [{ text: data.reply }] }
      ]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        text: "Nagarik AI is taking a moment to wake up. Please wait 30 seconds and try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 1050 }}>
      {!isOpen && (
        <Button 
          variant="primary" 
          className="rounded-circle shadow-lg border-0 d-flex align-items-center justify-content-center" 
          onClick={() => setIsOpen(true)}
          style={{ width: '65px', height: '65px', fontSize: '1.8rem', transition: 'transform 0.2s' }}
        >
          💬
        </Button>
      )}

      {isOpen && (
        <Card className="shadow-lg border-0 overflow-hidden" style={{ width: '360px', borderRadius: '15px', animation: 'slideUp 0.3s ease-out' }}>
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <div>
              <span className="fw-bold d-block">Nagarik AI Assistant</span>
              <small className="opacity-75">Kathmandu Election Portal 2026</small>
            </div>
            <Button 
              variant="link" 
              className="text-white p-0 text-decoration-none fs-4" 
              onClick={() => setIsOpen(false)}
            >
              &times;
            </Button>
          </Card.Header>
          
          <Card.Body 
            ref={scrollRef} 
            className="overflow-auto d-flex flex-column gap-3 p-3" 
            style={{ height: '380px', backgroundColor: '#f9f9f9', scrollBehavior: 'smooth' }}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-4 shadow-sm small ${
                  msg.sender === 'user' 
                  ? 'bg-primary text-white align-self-end ms-5' 
                  : 'bg-white text-dark align-self-start me-5 border'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="bg-white border p-2 px-3 rounded-4 align-self-start shadow-sm d-flex align-items-center gap-2">
                <Spinner animation="grow" size="sm" variant="primary" />
                <small className="text-muted italic">Thinking...</small>
              </div>
            )}
          </Card.Body>

          <Card.Footer className="bg-white p-3 border-top-0">
            <Form onSubmit={handleSendMessage}>
              <InputGroup>
                <Form.Control 
                  placeholder="Ask a question..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="border-0 bg-light rounded-start-pill px-3"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="rounded-end-pill px-4 fw-bold"
                  disabled={!input.trim() || isTyping}
                >
                  {isTyping ? '...' : 'Send'}
                </Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ChatBot;