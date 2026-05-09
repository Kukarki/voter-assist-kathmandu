import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function CandidateGallery() {
  const [candidates, setCandidates] = useState([]); 
  const [loading, setLoading] = useState(true);    
  const [supportedIds, setSupportedIds] = useState([]); // Track multiple supports in one session
  const [status, setStatus] = useState(""); 
  const { i18n } = useTranslation();
  const isNepali = i18n.language === 'ne';

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/candidates');
      if (!response.ok) throw new Error("Failed to fetch candidates");
      const data = await response.json();
      setCandidates(data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("Could not load candidates. Is the backend running?");
      setLoading(false);
    }
  };

  const handleSupport = async (candidateId, candidateName) => {
    if (supportedIds.includes(candidateId)) return;

    setStatus(isNepali ? "डेटाबेसमा जडान गर्दै..." : "Connecting to Database...");
    
    try {
      // Updated to use the PATCH method and the ID-specific URL
      const response = await fetch(`http://127.0.0.1:5000/api/candidates/${candidateId}/support`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error("Server was unable to record the support.");

      const updatedCandidate = await response.json();

      // Update the local state so the number changes on screen immediately
      setCandidates(candidates.map(c => c._id === candidateId ? updatedCandidate : c));
      setSupportedIds([...supportedIds, candidateId]);
      setStatus("");
      
      alert(isNepali ? `${candidateName} लाई समर्थन गर्नुभएकोमा धन्यवाद!` : `Thank you for supporting ${candidateName}!`);
    } catch (error) {
      console.error("Connection error:", error);
      setStatus(isNepali ? "सर्भरमा जडान गर्न सकिएन।" : "Could not connect to the backend server.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>{isNepali ? "लोड हुँदैछ..." : "Loading Kathmandu-1 Results..."}</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h3 className="mb-4 text-center">{isNepali ? "काठमाडौं-१ का उम्मेदवारहरू" : "Kathmandu-1 Candidates"}</h3>
      
      {status && <Alert variant="warning" className="text-center small">{status}</Alert>}
      
      <Row>
        {candidates.map((candidate) => (
          <Col md={6} lg={4} key={candidate._id} className="mb-4">
            <Card className="shadow-sm border-0 h-100 hover-shadow">
              <Card.Body className="text-center d-flex flex-column">
                {candidate.status && (
                  <div className="mb-2 text-end">
                    <span className={`badge ${candidate.status === 'Winner' ? 'bg-success' : 'bg-secondary'}`}>
                      {candidate.status}
                    </span>
                  </div>
                )}
                
                <Card.Title className="fw-bold">{candidate.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">{candidate.party}</Card.Subtitle>
                
                <div className="bg-light p-2 rounded my-3">
                  <p className="mb-0 small fw-bold">
                    {isNepali ? "कुल समर्थन:" : "Total Support:"}
                  </p>
                  <p className="h4 mb-0 text-primary">{candidate.votes?.toLocaleString() || 0}</p>
                </div>

                <Button 
                  variant={supportedIds.includes(candidate._id) ? "success" : "outline-primary"} 
                  className="mt-auto fw-bold"
                  disabled={supportedIds.includes(candidate._id)}
                  onClick={() => handleSupport(candidate._id, candidate.name)}
                >
                  {supportedIds.includes(candidate._id) 
                    ? (isNepali ? "✓ समर्थन गरियो" : "✓ Supported") 
                    : (isNepali ? "समर्थन देखाउनुहोस्" : "Show Support")}
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