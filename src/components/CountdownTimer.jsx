import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function CountdownTimer() {
  const calculateTimeLeft = () => {
    // Setting the target to March 5, 2026, at 7:00 AM (Election start)
    const difference = +new Date("2026-03-05T07:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Card className="text-center mb-4 border-primary shadow-sm">
      <Card.Header className="bg-primary text-white">Election Countdown</Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-around">
          <div><h3>{timeLeft.days || 0}</h3><small>Days</small></div>
          <div><h3>{timeLeft.hours || 0}</h3><small>Hours</small></div>
          <div><h3>{timeLeft.minutes || 0}</h3><small>Mins</small></div>
          <div><h3>{timeLeft.seconds || 0}</h3><small>Secs</small></div>
        </div>
        <Card.Text className="mt-3 text-muted">Until Polls Open in Kathmandu-1</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CountdownTimer;