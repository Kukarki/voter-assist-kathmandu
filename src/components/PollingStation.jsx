import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const PollingStation = () => {
  const [voterId, setVoterId] = useState('');
  const [result, setResult] = useState(null);

  // Mock data for Kathmandu (In a real app, this would come from your MongoDB)
  const stations = [
    { id: "12345", booth: "Padmodaya Secondary School", ward: "Ward 28, Kathmandu", location: "Exhibition Road" },
    { id: "67890", booth: "Kanya Mandir Secondary School", ward: "Ward 15, Kathmandu", location: "Nyatapola Area" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const found = stations.find(s => s.id === voterId);
    setResult(found || "Not Found");
  };

  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h2 className="text-primary font-weight-bold">Find Your Polling Station 📍</h2>
        <p className="text-muted">Enter your Voter ID number to find your designated voting booth in Kathmandu.</p>
      </div>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4 border-0 bg-white">
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Label>Voter ID Number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="e.g. 12345" 
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  className="p-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 p-2 font-weight-bold">
                Search Station
              </Button>
            </Form>
          </Card>

          {result === "Not Found" && (
            <Alert variant="danger" className="mt-4 text-center">
              Voter ID not found. Please check your number or contact the Election Commission.
            </Alert>
          )}

          {result && result !== "Not Found" && (
            <Card className="mt-4 border-success shadow border-left-success">
              <Card.Body>
                <h5 className="text-success mb-3">✅ Station Located!</h5>
                <p><strong>Booth Name:</strong> {result.booth}</p>
                <p><strong>Ward/Area:</strong> {result.ward}</p>
                <p><strong>Specific Location:</strong> {result.location}</p>
                <Button variant="outline-primary" size="sm" className="mt-2">
                  View on Google Maps
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PollingStation;