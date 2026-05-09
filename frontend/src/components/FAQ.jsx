import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // 1. Import the hook

const FAQ = ({ openBot }) => {
  const { t } = useTranslation(); // 2. Initialize translation

  // 3. Define the data using the translation keys from i18n.js
  const faqData = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1')
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2')
    },
    {
      question: t('navbar_results'), // Reusing existing keys where possible
      answer: t('hero_subtitle') 
    }
  ];

  return (
    <Container className="my-5 pt-4">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="text-primary fw-bold mb-3">{t('faq_title')}</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          {t('hero_subtitle')}
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion defaultActiveKey="0" className="shadow-sm border-0">
        {faqData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index} className="border-bottom">
            <Accordion.Header>
              <span className="fw-semibold text-dark">{item.question}</span>
            </Accordion.Header>
            <Accordion.Body className="bg-white text-muted lh-lg">
              {item.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Support Card */}
      <Card className="mt-5 border-0 bg-light p-5 text-center shadow-sm rounded-4">
        <Card.Body>
          <h4 className="fw-bold text-dark mb-3">{t('faq_footer_title')}</h4>
          <p className="text-secondary mb-4">
            {t('faq_footer_subtitle')}
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button 
              variant="outline-primary" 
              className="rounded-pill px-4 py-2 fw-bold"
              href="tel:1102"
            >
              {t('call_button')}
            </Button>
            
            <Button 
              variant="primary" 
              className="rounded-pill px-4 py-2 fw-bold shadow-sm"
              onClick={openBot}
            >
              {t('chat_button')}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FAQ;