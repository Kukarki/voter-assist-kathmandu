import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Kathmandu1Candidates } from '../data/mockdata';

function CandidateGallery() {
  const [voted, setVoted] = useState(false);
  const [status, setStatus] = useState(""); 

  const handleVote = async (candidateId, candidateName) => {
    setStatus("Connecting to Database...");
    try {
      // Using 127.0.0.1 to avoid DNS resolution errors
      const response = await fetch('http://127.0.0.1:5000/api/candidates/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: candidateId, name: candidateName }),
      });

      if (!response.ok) throw new Error("Server was unable to record the vote.");

      const data = await response.json();
      console.log("SUCCESS:", data);
      
      setVoted(true);
      setStatus("");
      alert(`Thank you for supporting ${candidateName}!`);
    } catch (error) {
      console.error("Connection error:", error);
      setStatus("Could not connect to the backend server. Is 'node server.js' running?");
    }
  };

  return (
    <div className="mt-5">
      <h3 className="mb-4 text-center">Kathmandu-1 Candidates</h3>
      {voted && <Alert variant="success" className="text-center">Your vote has been recorded!</Alert>}
      {status && !voted && <Alert variant="warning" className="text-center small">{status}</Alert>}
      <Row>
        {Kathmandu1Candidates.map((candidate) => (
          <Col md={6} key={candidate.id} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="fw-bold">{candidate.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{candidate.party}</Card.Subtitle>
                <Button 
                  variant="primary" 
                  disabled={voted}
                  onClick={() => handleVote(candidate.id, candidate.name)}
                >
                  {voted ? "Vote Cast" : "Show Support"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CandidateGallery;