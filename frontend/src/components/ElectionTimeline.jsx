import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ElectionTimeline = () => {
  const { i18n } = useTranslation();
  const isNepali = i18n.language === 'ne';

  // Countdown to a hypothetical next milestone
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

  // Helper function for Countdown Labels
  const getLabel = (label) => {
    const labels = {
      days: isNepali ? "दिन" : "Days",
      hours: isNepali ? "घन्टा" : "Hours",
      minutes: isNepali ? "मिनेट" : "Minutes",
      seconds: isNepali ? "सेकेन्ड" : "Seconds"
    };
    return labels[label];
  };

  return (
    <Container className="mt-5 pb-5">
      {/* 1. Countdown Header */}
      <div className="text-center mb-5 p-4 bg-dark text-white rounded shadow-lg">
        <h2 className="mb-3">
          {isNepali ? "अर्को प्रशासनिक माइलस्टोन 🇳🇵" : "Next Administrative Milestone 🇳🇵"}
        </h2>
        <Row className="justify-content-center">
          {Object.entries(timeLeft).map(([label, value]) => (
            <Col key={label} xs={3} md={2}>
              <div className="display-6 fw-bold">{value}</div>
              <div className="text-uppercase small" style={{ letterSpacing: '2px' }}>
                {getLabel(label)}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* 2. Key Election Stats */}
      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-primary text-white p-3 h-100">
            <h3>{isNepali ? "१८.९M+" : "18.9M+"}</h3>
            <p className="mb-0">{isNepali ? "दर्ता भएका मतदाता" : "Registered Voters"}</p>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-info text-white p-3 h-100">
            <h3>२७५</h3>
            <p className="mb-0">{isNepali ? "संसदीय सिटहरू" : "Parliamentary Seats"}</p>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-success text-white p-3 h-100">
            <h3>६०%</h3>
            <p className="mb-0">{isNepali ? "अनुमानित मतदाता उपस्थिति" : "Estimated Turnout"}</p>
          </Card>
        </Col>
      </Row>

      {/* 3. Detailed Event Table */}
      <h3 className="mb-4 text-primary">
        {isNepali ? "निर्वाचन २०२६ प्रक्रिया विवरण" : "Election 2026 Process Details"}
      </h3>
      <Table responsive hover className="shadow-sm bg-white rounded border">
        <thead className="bg-light">
          <tr>
            <th>{isNepali ? "मिति" : "Date"}</th>
            <th>{isNepali ? "घटना विवरण" : "Event Description"}</th>
            <th>{isNepali ? "स्थिति" : "Status"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{isNepali ? "माघ ७, २०८२" : "Jan 20, 2026"}</td>
            <td>{isNepali ? "FPTP का लागि उम्मेदवार मनोनयन (काठमाडौंमा १० निर्वाचन क्षेत्र छन्)" : "Candidate Nominations for FPTP (Kathmandu has 10 Constituencies)"}</td>
            <td><Badge bg="secondary">{isNepali ? "सम्पन्न" : "Completed"}</Badge></td>
          </tr>
          <tr>
            <td>{isNepali ? "माघ २१, २०८२" : "Feb 03, 2026"}</td>
            <td>{isNepali ? "अन्तिम उम्मेदवार सूची प्रकाशन (काठमाडौंमा २५७ उम्मेदवार)" : "Final Candidate List Published (257 candidates in KTM)"}</td>
            <td><Badge bg="secondary">{isNepali ? "सम्पन्न" : "Completed"}</Badge></td>
          </tr>
          <tr>
            <td>{isNepali ? "फागुन २२, २०८२" : "Mar 05, 2026"}</td>
            <td><strong>{isNepali ? "निर्वाचनको दिन:" : "Election Day:"}</strong> {isNepali ? "बिहान ७ बजे - बेलुका ५ बजे" : "Polls open 7 AM - 5 PM"}</td>
            <td><Badge bg="success">{isNepali ? "सफल" : "Success"}</Badge></td>
          </tr>
          <tr>
            <td>{isNepali ? "चैत २, २०८२" : "Mar 15, 2026"}</td>
            <td>{isNepali ? "समानुपातिक प्रतिनिधित्व मतको अन्तिम प्रमाणीकरण" : "Final Verification of Proportional Representation Votes"}</td>
            <td><Badge bg="warning" text="dark">{isNepali ? "प्रगतिमा" : "In Progress"}</Badge></td>
          </tr>
        </tbody>
      </Table>

      {/* 4. Help Section */}
      <Card className="mt-4 bg-light border-0 shadow-sm">
        <Card.Body>
          <h5>{isNepali ? "सहयोग चाहिन्छ?" : "Need Assistance?"}</h5>
          <p className="text-muted mb-0">
            {isNepali 
              ? "मतदाताहरूले आफ्नो मतदान केन्द्रको स्थान प्रमाणीकरण गर्न वा आफ्नो डिजिटल मतदाता परिचयपत्र जाँच गर्न नागरिक एप प्रयोग गर्न सक्छन्।" 
              : "Voters can use the Nagarik App to verify their polling booth location or check their digital voter ID card."
            }
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ElectionTimeline;