import React from 'react';
import { Container, Accordion, Card, Badge, Button } from 'react-bootstrap';

const FAQ = ({ openBot }) => {
  const faqData = [
    {
      question: "Can I use my Nagarik App digital ID for official verification?",
      answer: "While the Nagarik App displays your digital Voter ID, the Election Commission currently recommends carrying your physical Citizenship Card or National ID for official verification at government offices."
    },
    {
      question: "How do I report an error in my voter details?",
      answer: "You can call the Election Commission's toll-free call center at 1102 (9 AM - 6 PM). For digital corrections, you can use the 'Pre-enrollment' feature in the Nagarik App v2.0.84."
    },
    {
      question: "Where can I see the final results for Kathmandu District?",
      answer: "Final results for all 10 constituencies in Kathmandu are being updated on the official ECN portal. Our 'Results' tab also provides a live summary of seat distribution."
    }
  ];

  return (
    <Container className="mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="text-primary font-weight-bold">Help & FAQ Center 🇳🇵</h2>
        <p className="text-muted">Quick answers to common questions about the 2026 General Elections.</p>
      </div>

      <Accordion defaultActiveKey="0" className="shadow-sm">
        {faqData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header className="fw-bold">{item.question}</Accordion.Header>
            <Accordion.Body className="text-secondary">
              {item.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Card className="mt-5 border-0 bg-light p-4 text-center shadow-sm">
        <h5>Still have questions?</h5>
        <p>Contact the Official Election Commission Hotline</p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="outline-primary">📞 Call 1102</Button>
          {/* This button now triggers the ChatBot */}
          <Button variant="primary" onClick={openBot}>💬 Chat with Nagarik Bot</Button>
        </div>
      </Card>
    </Container>
  );
};

export default FAQ;