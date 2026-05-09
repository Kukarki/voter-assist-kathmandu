import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isNepali = i18n.language === 'ne';

  const [showReport, setShowReport] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient text-white py-5 mb-5 shadow-sm">
        <Container className="text-center py-4">
          <h1 className="display-4 fw-bold">
            {isNepali ? "नागरिक निर्वाचन पोर्टल" : "Citizen Election Portal"}
          </h1>
          <p className="lead opacity-75">
            {isNepali ? "काठमाडौं आम निर्वाचन २०२६" : "Kathmandu General Elections 2026"}
          </p>
        </Container>
      </div>

      <Container>
        {/* Service Grid */}
        <Row className="g-4 mb-5 text-center">
          <Col md={4}>
            <Card 
              className="h-100 border-0 shadow-sm hover-card" 
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/results')}
            >
              <Card.Body>
                <div className="display-6 mb-2">📊</div>
                <h5 className="fw-bold">{isNepali ? "अन्तिम नतिजा" : "Final Results"}</h5>
                <p className="text-muted small">
                  {isNepali 
                    ? "आधिकारिक २०२६ गणना: रञ्जु दर्शनाको ऐतिहासिक जीत।" 
                    : "Official 2026 tallies: Ranju Darshana's historic win."}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card 
              className="h-100 border-0 shadow-sm hover-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/timeline')}
            >
              <Card.Body>
                <div className="display-6 mb-2">🕒</div>
                <h5 className="fw-bold">{isNepali ? "निर्वाचन समयरेखा" : "Election Timeline"}</h5>
                <p className="text-muted small">
                  {isNepali 
                    ? "नतिजा र सरकार गठनका लागि मुख्य मितिहरू।" 
                    : "Key dates for results and government formation."}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card 
              className="h-100 border-0 shadow-sm hover-card"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://nagarikapp.gov.np/', '_blank')}
            >
              <Card.Body>
                <div className="display-6 mb-2">📱</div>
                <h5 className="fw-bold">{isNepali ? "नागरिक एप" : "Nagarik App"}</h5>
                <p className="text-muted small">
                  {isNepali 
                    ? "प्रमाणीकरणको लागि आफ्नो डिजिटल मतदाता परिचयपत्र एकीकृत गर्नुहोस्।" 
                    : "Integrate your digital Voter ID for verification."}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* National Leadership Section */}
        <div className="pt-4 mb-5">
          <div className="d-flex align-items-center mb-4">
            <h2 className="fw-bold mb-0">
                {isNepali ? "राष्ट्रिय नेतृत्व २०२६" : "National Leadership 2026"}
            </h2>
            <div className="ms-3 flex-grow-1 border-bottom"></div>
          </div>
          <Row className="g-4">
            <Col md={6}>
              <Card 
                className="border-0 shadow-sm bg-dark text-white h-100 hover-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/profile/balen-shah')}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src="/images/Balen-mayor (1).png" 
                      alt="Balendra Shah" 
                      className="rounded-circle border border-2 border-primary me-3 shadow-sm"
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="badge bg-primary mb-1">
                        {isNepali ? "प्रधानमन्त्री" : "Prime Minister"}
                      </div>
                      <h3 className="fw-bold mb-0">बालेन्द्र शाह</h3>
                    </div>
                  </div>

                  <p className="opacity-75">
                    {isNepali 
                        ? "स्ट्रक्चरल इन्जिनियर र काठमाडौंका पूर्व मेयर। सहरी सुधार र डिजिटल सुशासनमा केन्द्रित बहुमतको सरकारको नेतृत्व गर्दै।" 
                        : "Structural Engineer and former Mayor of Kathmandu. Leading the majority government with a focus on urban reform and digital governance."}
                  </p>
                  <hr className="border-light" />
                  <div className="small text-primary fw-bold">
                    {isNepali ? "पूरा बायो र उपलब्धिहरू हेर्न क्लिक गर्नुहोस् →" : "Click to view full bio and achievements →"}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm bg-light h-100">
                <Card.Body className="p-4">
                  <div className="badge bg-secondary mb-2">
                    {isNepali ? "सभामुख" : "Speaker of the House"}
                  </div>
                  <h3 className="fw-bold">{isNepali ? "डा. तोसिमा कार्की" : "Dr. Toshima Karki"}</h3>
                  <p className="text-muted">
                    {isNepali 
                        ? "विधायिका पारदर्शिता र व्यापक स्वास्थ्य सेवा सुधारको जनादेशका साथ २०२६ को संसदीय सत्रहरूको निरीक्षण गर्दै।" 
                        : "Overseeing the 2026 parliamentary sessions with a mandate for legislative transparency and comprehensive healthcare reform."}
                  </p>
                  <hr />
                  <div className="small text-muted">
                    {isNepali ? "फोकस: नीति एकीकरण र जनहित" : "Focus: Policy Integration & Public Welfare"}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Reporting Section */}
        <Row className="mt-5 pb-5">
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="p-4 border-0 shadow-sm bg-light text-center border-start border-danger border-4">
              <h4 className="fw-bold text-danger">
                {isNepali ? "🚩 गलत सूचना रिपोर्ट गर्नुहोस्" : "🚩 Report Misinformation"}
              </h4>
              <p className="text-muted">
                {isNepali 
                    ? "डीपफेकहरू रिपोर्ट गरेर २०२६ को नतिजाको निष्पक्षता सुनिश्चित गर्नुहोस्।" 
                    : "Ensure the integrity of the 2026 results by reporting deepfakes."}
              </p>
              <Button variant="danger" className="mx-auto px-5 fw-bold" onClick={() => setShowReport(true)}>
                {isNepali ? "अत्यावश्यक रिपोर्ट पेश गर्नुहोस्" : "Submit Urgent Report"}
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Misinformation Modal */}
      <Modal show={showReport} onHide={() => {setShowReport(false); setSubmitted(false);}} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>{isNepali ? "गलत सूचना सतर्कता" : "Misinformation Alert"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted ? (
            <Alert variant="success">
                {isNepali ? "रिपोर्ट सफलतापूर्वक पेश गरियो।" : "Report submitted successfully."}
            </Alert>
          ) : (
            <Form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">{isNepali ? "मुद्दाको श्रेणी" : "Issue Category"}</Form.Label>
                <Form.Select required>
                  <option value="">{isNepali ? "छनौट गर्नुहोस्..." : "Select..."}</option>
                  <option>{isNepali ? "नक्कली सामाजिक मिडिया पोस्ट" : "Fake Social Media Post"}</option>
                  <option>{isNepali ? "AI डीपफेक भिडियो" : "AI Deepfake Video"}</option>
                  <option>{isNepali ? "गलत मतदान केन्द्र जानकारी" : "Incorrect Polling Booth Info"}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">{isNepali ? "स्रोत लिङ्क / विवरण" : "Source Link / Description"}</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100 fw-bold">
                {isNepali ? "रिपोर्ट पेश गर्नुहोस्" : "Submit Report"}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;