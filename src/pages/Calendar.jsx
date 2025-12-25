import { useState, useEffect } from 'react';
import '../styles/calendar.scss';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [time, setTime] = useState(new Date());

  // live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const renderDates = () => {
    const cells = [];

    // empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="cell empty"></div>);
    }

    // actual days
    for (let d = 1; d <= lastDate; d++) {
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      cells.push(
        <div key={d} className={`cell ${isToday ? 'today' : ''}`}>
          {d}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="calendar-wrapper">

      {/* TIME */}
      <div className="time-box">
        {time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}{' '}
      </div>

      {/* MONTH HEADER */}
      <div className="calendar-header">
        <span className="month">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </span>

        <div className="nav">
          <button onClick={() => changeMonth(-1)}>Prev</button>
          <button onClick={() => changeMonth(1)}>Next</button>
        </div>
      </div>

      {/* DAY NAMES */}
      <div className="day-names">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DATES GRID */}
      <div className="calendar-grid">{renderDates()}</div>

    </div>
  );
}
