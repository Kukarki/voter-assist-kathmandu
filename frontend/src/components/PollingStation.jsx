import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Table, Badge, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PollingStation = () => {
  const { i18n } = useTranslation();
  const isNepali = i18n.language === 'ne';

  // --- STATE 1: Voter ID Search ---
  const [voterId, setVoterId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // --- STATE 2: Table Live Filter ---
  const [filterTerm, setFilterTerm] = useState("");

  // --- HARD-CODED DATA ---
  const stations = [
    { 
      id: "12345", 
      booth: isNepali ? "पद्मोदय माध्यमिक विद्यालय" : "Padmodaya Secondary School", 
      ward: isNepali ? "वडा २८, काठमाडौं" : "Ward 28, Kathmandu", 
      location: isNepali ? "प्रदर्शनी मार्ग" : "Exhibition Road",
      type: isNepali ? "सहरी" : "Urban"
    },
    { 
      id: "67890", 
      booth: isNepali ? "कन्या मन्दिर माध्यमिक विद्यालय" : "Kanya Mandir Secondary School", 
      ward: isNepali ? "वडा १५, काठमाडौं" : "Ward 15, Kathmandu", 
      location: isNepali ? "न्यातपोल क्षेत्र" : "Nyatapola Area",
      type: isNepali ? "सहरी" : "Urban"
    },
    { 
      id: "11223", 
      booth: isNepali ? "बानेश्वर बहुमुखी क्याम्पस" : "Baneshwor Multiple Campus", 
      ward: isNepali ? "वडा १०, काठमाडौं" : "Ward 10, Kathmandu", 
      location: isNepali ? "शान्तिनगर" : "Shantinagar",
      type: isNepali ? "सहरी" : "Urban"
    }
  ];

  // Logic for Voter ID Lookup
  const handleVoterSearch = (e) => {
    e.preventDefault();
    const found = stations.find(s => s.id === voterId);
    setSearchResult(found || "Not Found");
  };

  // Logic for Table Filtering
  const filteredStations = stations.filter(s => 
    s.booth.toLowerCase().includes(filterTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(filterTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Container className="mt-5 pb-5">
      {/* SECTION 1: VOTER ID SEARCH */}
      <div className="text-center mb-5">
        <h2 className="text-primary fw-bold">
          {isNepali ? "आफ्नो मतदान केन्द्र खोज्नुहोस् 📍" : "Find Your Polling Station 📍"}
        </h2>
        <p className="text-muted">
          {isNepali 
            ? "मतदाता परिचयपत्र नम्बर प्रविष्ट गरेर आफ्नो बुथ फेला पार्नुहोस्।" 
            : "Enter your Voter ID number to find your specific designated booth."}
        </p>
      </div>

      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <Card className="shadow-sm p-4 border-0 bg-white">
            <Form onSubmit={handleVoterSearch}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small text-uppercase">
                  {isNepali ? "मतदाता परिचयपत्र नम्बर" : "Voter ID Number"}
                </Form.Label>
                <InputGroup>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g. 12345" 
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    className="p-3 border-end-0"
                  />
                  <Button variant="primary" type="submit" className="px-4 fw-bold">
                    {isNepali ? "खोज्नुहोस्" : "Search"}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Card>

          {searchResult === "Not Found" && (
            <Alert variant="danger" className="mt-4 text-center animate__animated animate__shakeX">
              {isNepali ? "मतदाता परिचयपत्र भेटिएन।" : "Voter ID not found."}
            </Alert>
          )}

          {searchResult && searchResult !== "Not Found" && (
            <Card className="mt-4 border-success shadow border-start border-4">
              <Card.Body>
                <h5 className="text-success mb-3 fw-bold">✅ {isNepali ? "केन्द्र फेला पर्यो!" : "Station Located!"}</h5>
                <p className="mb-1"><strong>{isNepali ? "नाम:" : "Name:"}</strong> {searchResult.booth}</p>
                <p className="mb-1"><strong>{isNepali ? "स्थान:" : "Location:"}</strong> {searchResult.location}</p>
                <p className="mb-0"><strong>{isNepali ? "वडा:" : "Ward:"}</strong> {searchResult.ward}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <hr className="my-5 opacity-10" />

      {/* SECTION 2: LIVE DIRECTORY TABLE */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">
          {isNepali ? "सबै मतदान केन्द्रहरूको सूची" : "Full Station Directory"}
        </h3>
        <div style={{ width: '300px' }}>
          <Form.Control 
            type="text" 
            placeholder={isNepali ? "फिल्टर गर्नुहोस्..." : "Filter results..."} 
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="rounded-pill shadow-sm"
          />
        </div>
      </div>

      <Table responsive hover className="shadow-sm bg-white rounded border overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th>{isNepali ? "कोड" : "Code"}</th>
            <th>{isNepali ? "केन्द्रको नाम" : "Station Name"}</th>
            <th>{isNepali ? "क्षेत्र" : "Area"}</th>
            <th>{isNepali ? "प्रकार" : "Type"}</th>
          </tr>
        </thead>
        <tbody>
          {filteredStations.map((s, index) => (
            <tr key={index}>
              <td className="fw-bold text-primary">{s.id}</td>
              <td>{s.booth}</td>
              <td>{s.location}</td>
              <td><Badge bg="info" className="text-dark fw-normal">{s.type}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* FOOTER NOTICE */}
      <div className="mt-5 p-4 rounded-4 bg-light border text-center">
        <p className="text-muted mb-0">
          {isNepali 
            ? "थप जानकारीको लागि निर्वाचन आयोगको हटलाइन ११०२ मा सम्पर्क गर्नुहोस्।" 
            : "For more details, contact the Election Commission Hotline at 1102."}
        </p>
      </div>
    </Container>
  );
};

export default PollingStation;