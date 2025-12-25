// src/layout/Sidebar.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const openCalc = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {open && <div className="overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h3>Calculators</h3>

        <button onClick={() => openCalc('/basic')}>Basic Calculator</button>
        <button onClick={() => openCalc('/scientific')}>Scientific Calculator</button>
        <button onClick={() => openCalc('/days')}>Days Calculator</button>
        <button onClick={() => openCalc('/calendar')}>Calendar</button>
        <button disabled>Programmer Calculator</button>
      </aside>
    </>
  );
}
