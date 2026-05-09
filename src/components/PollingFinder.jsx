import { useState } from 'react';
import { Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { PollingStations } from '../data/mockdata'; 

function PollingFinder() {
  const [selectedWard, setSelectedWard] = useState("");

  // Using Number() on both sides is safer than parseInt for React state comparisons
  const filteredStations = PollingStations.filter(
    (station) => Number(station.ward) === Number(selectedWard)
  );

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">📍 Polling Station Finder</Card.Title>
        <Form.Group className="mb-4">
          <Form.Label>Select Your Ward (Kathmandu)</Form.Label>
          <Form.Select 
            value={selectedWard} 
            onChange={(e) => setSelectedWard(e.target.value)}
          >
            <option value="">-- Choose Ward --</option>
            <option value="10">Ward 10</option>
            <option value="11">Ward 11</option>
            <option value="29">Ward 29</option>
            <option value="31">Ward 31</option>
          </Form.Select>
        </Form.Group>

        {filteredStations.length > 0 ? (
          <ListGroup variant="flush">
            {filteredStations.map((station) => (
              <ListGroup.Item key={station.id} className="py-3">
                <h5 className="mb-1">{station.name}</h5>
                <p className="text-muted small mb-2">
                  Location: {station.location.lat}, {station.location.lng}
                </p>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  // Fixed the Google Maps URL structure here
                  href={`https://www.google.com/maps?q=${station.location.lat},${station.location.lng}`}
                  target="_blank"
                >
                  View on Map
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : selectedWard && (
          <Alert variant="warning">
            No stations found for Ward {selectedWard} in mock data.
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default PollingFinder;