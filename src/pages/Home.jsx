import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import CandidateGallery from '../components/CandidateGallery';

function Home() {
  const [showReport, setShowReport] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {/* 1. Professional Hero Section */}
      <div className="hero-gradient text-white py-5 mb-5 shadow-sm">
        <Container className="text-center py-4">
          <h1 className="display-4 fw-bold">Citizen Election Portal</h1>
          <p className="lead opacity-75">Kathmandu General Elections 2026</p>
          <div className="d-flex justify-content-center mt-4 gap-3">
            <Button variant="light" className="fw-bold px-4 py-2 shadow-sm" href="/polling">
              📍 Find Polling Station
            </Button>
            <Button variant="outline-light" className="fw-bold px-4 py-2" href="/faq">
              ❓ Voter Help Center
            </Button>
          </div>
        </Container>
      </div>

      <Container>
        {/* 2. Quick Service Grid */}
        <Row className="g-4 mb-5 text-center">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body>
                <div className="display-6 mb-2">📊</div>
                <h5 className="fw-bold">Live Polls</h5>
                <p className="text-muted small">View popularity trends for Kathmandu-1 candidates.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body>
                <div className="display-6 mb-2">🕒</div>
                <h5 className="fw-bold">Timeline</h5>
                <p className="text-muted small">Key dates for results and government formation.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body>
                <div className="display-6 mb-2">📱</div>
                <h5 className="fw-bold">Nagarik App</h5>
                <p className="text-muted small">Integrate your digital Voter ID for verification.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 3. Candidate Section */}
        <div id="candidates" className="pt-4">
          <div className="d-flex align-items-center mb-4">
            <h2 className="fw-bold mb-0">Candidate Gallery</h2>
            <div className="ms-3 flex-grow-1 border-bottom"></div>
          </div>
          <CandidateGallery />
        </div>

        {/* 4. Reporting Section */}
        <Row className="mt-5 pb-5">
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="p-4 border-0 shadow-sm bg-light text-center">
              <h4 className="fw-bold text-danger">🚩 Report Misinformation</h4>
              <p className="text-muted">Help us ensure the integrity of the Kathmandu elections by reporting false claims or AI deepfakes.</p>
              <Button variant="danger" className="mx-auto px-5 fw-bold" onClick={() => setShowReport(true)}>
                Submit Urgent Report
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Misinformation Modal */}
      <Modal show={showReport} onHide={() => setShowReport(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Misinformation Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted ? (
            <Alert variant="success">Report submitted successfully.</Alert>
          ) : (
            <Form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Issue Category</Form.Label>
                <Form.Select required>
                  <option value="">Select...</option>
                  <option>Fake Social Media Post</option>
                  <option>AI Deepfake Video</option>
                  <option>Incorrect Polling Booth Info</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Source Link / Description</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100 fw-bold">Submit Report</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;