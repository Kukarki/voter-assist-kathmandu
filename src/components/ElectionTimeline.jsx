import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Table } from 'react-bootstrap';

const ElectionTimeline = () => {
  // Countdown to a hypothetical next milestone (e.g., Local Ward Results)
  const [targetDate] = useState(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Container className="mt-5 pb-5">
      {/* 1. Countdown Header */}
      <div className="text-center mb-5 p-4 bg-dark text-white rounded shadow-lg">
        <h2 className="mb-3">Next Administrative Milestone 🇳🇵</h2>
        <Row className="justify-content-center">
          {Object.entries(timeLeft).map(([label, value]) => (
            <Col key={label} xs={3} md={2}>
              <div className="display-6 font-weight-bold">{value}</div>
              <div className="text-uppercase small" style={{ letterSpacing: '2px' }}>{label}</div>
            </Col>
          ))}
        </Row>
      </div>

      {/* 2. Key Election Stats */}
      <Row className="mb-5">
        <Col md={4}>
          <Card className="text-center shadow-sm border-0 bg-primary text-white p-3">
            <h3>18.9M+</h3>
            <p className="mb-0">Registered Voters</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-0 bg-info text-white p-3">
            <h3>275</h3>
            <p className="mb-0">Parliamentary Seats</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-0 bg-success text-white p-3">
            <h3>60%</h3>
            <p className="mb-0">Estimated Turnout</p>
          </Card>
        </Col>
      </Row>

      {/* 3. Detailed Event Table */}
      <h3 className="mb-4 text-primary">Election 2026 Process Details</h3>
      <Table responsive hover className="shadow-sm bg-white rounded">
        <thead className="bg-light">
          <tr>
            <th>Date</th>
            <th>Event Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan 20, 2026</td>
            <td>Candidate Nominations for FPTP (Kathmandu has 10 Constituencies)</td>
            <td><Badge bg="secondary">Completed</Badge></td>
          </tr>
          <tr>
            <td>Feb 03, 2026</td>
            <td>Final Candidate List Published (257 candidates in KTM)</td>
            <td><Badge bg="secondary">Completed</Badge></td>
          </tr>
          <tr>
            <td>Mar 05, 2026</td>
            <td><strong>Election Day:</strong> Polls open 7 AM - 5 PM</td>
            <td><Badge bg="success">Success</Badge></td>
          </tr>
          <tr>
            <td>Mar 15, 2026</td>
            <td>Final Verification of Proportional Representation Votes</td>
            <td><Badge bg="warning" text="dark">In Progress</Badge></td>
          </tr>
        </tbody>
      </Table>

      {/* 4. Help Section */}
      <Card className="mt-4 bg-light border-0">
        <Card.Body>
          <h5>Need Assistance?</h5>
          <p className="text-muted">
            Voters can use the <strong>Nagarik App</strong> to verify their polling booth location or check their digital voter ID card.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ElectionTimeline;