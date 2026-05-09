import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CandidateGallery from '../components/CandidateGallery';

function Results() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mb-2"
          >
            ← Back to Portal
          </Button>
          <h1 className="fw-bold">Kathmandu-1 Official Results</h1>
          <p className="text-muted">Final verified tallies from the March 2026 General Election.</p>
        </div>
        <div className="text-end">
          <span className="badge bg-success p-2 px-3">STATUS: VERIFIED</span>
        </div>
      </div>

      {/* This pulls all 29 candidates from your MongoDB */}
      <CandidateGallery />

      <footer className="mt-5 pt-5 text-center text-muted border-top">
        <p className="small">Data source: Election Commission of Nepal (2026)</p>
      </footer>
    </Container>
  );
}

export default Results;