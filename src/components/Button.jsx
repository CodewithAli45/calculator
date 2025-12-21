// src/components/Button.jsx
import '../styles/button.css';

export default function Button({ label, onClick, className = '' }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={() => onClick(label)}
      type="button"
    >
      {label}
    </button>
  );
}
