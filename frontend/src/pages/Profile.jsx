import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-4">
        ← Back to Portal
      </Button>

      <Row className="g-4">
        {/* Left Column: Image & Quick Stats */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm overflow-hidden bg-light h-100">
            {/* 1. This replaces the "NP" div with your actual image */}
            <div style={{ height: '400px', overflow: 'hidden' }}>
              <Card.Img 
                variant="top" 
                src="/images/Balen-mayor (1).png" 
                alt="Balendra Shah"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderBottom: '4px solid #007bff' 
                }}
              />
            </div>

            <Card.Body className="p-4 text-center text-lg-start">
              <h2 className="fw-bold mb-0">Balendra Shah</h2>
              <p className="text-primary fw-bold">Prime Minister of Nepal</p>
              
              <hr />
              
              <div className="mt-3 text-start">
                <p className="mb-2"><strong>Age:</strong> 36</p>
                <p className="mb-2"><strong>Party:</strong> Rastriya Swatantra Party (RSP)</p>
                <p className="mb-2"><strong>Education:</strong> M.Tech in Structural Engineering</p>
                <p className="mb-2"><strong>Spouse:</strong> Sabina Kafle</p>
              </div>

              <div className="mt-4 p-3 bg-white rounded shadow-sm border-start border-primary border-4 text-start">
                <small className="text-muted d-block">Current Role</small>
                <strong>Head of Government</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Bio & Achievements */}
        <Col lg={8}>
          <div className="mb-5">
            <h3 className="fw-bold border-bottom pb-2">Professional Journey</h3>
            <p className="mt-3 lead">
              Balen Shah's transition from a structural engineer and rapper to the Prime Minister of Nepal 
              represents the historic "Gen Z Revolution" of 2026.
            </p>
            
            <h5 className="fw-bold mt-4">Mayor of Kathmandu (2022–2026)</h5>
            <p>
              As the first independent Mayor of the capital, he revolutionized municipal governance by:
            </p>
            <ul>
              <li><strong>Transparency:</strong> Broadcasting municipal council meetings live for the first time.</li>
              <li><strong>Infrastructure:</strong> Implementing smart ticketing systems and tactile pavements for the visually impaired.</li>
              <li><strong>Education:</strong> Launching "Textbook-Free Fridays" in community schools.</li>
            </ul>

            <h5 className="fw-bold mt-4">Engineering Background</h5>
            <p>
              A graduate in Civil Engineering (WhiteHouse) and a Master’s in Structural Engineering (NITTE, India), 
              he has utilized his technical expertise to focus on earthquake-resistant infrastructure and 
              heritage preservation, currently pursuing a PhD at Kathmandu University.
            </p>

            <div className="bg-primary text-white p-4 rounded-3 mt-5 shadow-sm">
              <h5 className="fw-bold mb-3">Prime Ministerial Vision (2026–Present)</h5>
              <p className="mb-0">
                Following the RSP's landslide victory on March 5th, his administration's focus is on 
                digital governance (e-Nepal), anti-corruption measures, and urban transformation.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;