import { useState } from 'react';
import '../styles/daysCalc.css';

export default function DaysCalc() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);

  // auto insert /
  const formatDate = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4)
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const handleCalc = () => {
    if (date1.length !== 10 || date2.length !== 10) {
      setResult('Invalid date');
      return;
    }

    const [d1, m1, y1] = date1.split('/').map(Number);
    const [d2, m2, y2] = date2.split('/').map(Number);

    const start = new Date(y1, m1 - 1, d1);
    const end = new Date(y2, m2 - 1, d2);

    if (isNaN(start) || isNaN(end)) {
      setResult('Invalid date');
      return;
    }

    const diffMs = Math.abs(end - start);
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const weeks = (days / 7).toFixed(2);
    const months = (days / 30.44).toFixed(2); // avg month length

    // const diffTime = Math.abs(end - start);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // setResult(diffDays);

     setAnimate(false);
    setTimeout(() => {
      setResult({ days, weeks, months });
      setAnimate(true);
    }, 50);
  };

  return (
    <div className="dayscalc-wrapper">
      <h2 className="title">Days Calculator</h2>

      <div className="inputs">
        <input
          type="text"
          placeholder="dd/mm/yyyy without /"
          value={date1}
          onChange={(e) => setDate1(formatDate(e.target.value))}
          maxLength={10}
        />

        <input
          type="text"
          placeholder="dd/mm/yyyy without /"
          value={date2}
          onChange={(e) => setDate2(formatDate(e.target.value))}
          maxLength={10}
        />
      </div>

      <button className="calc-btn" onClick={handleCalc}>
        Calculate
      </button>

      {result && typeof result === 'object' && (
        <div className={`days-result ${animate ? 'show' : ''}`}>
          <div><span>Days</span><strong>{result.days}</strong></div>
          <div><span>Weeks</span><strong>{result.weeks}</strong></div>
          <div><span>Months</span><strong>{result.months}</strong></div>
        </div>
      )}

      {result === 'Invalid date' && (
        <div className="days-error">Invalid date</div>
      )}
    </div>
  );
}
