// src/components/Button.jsx
import '../styles/button.css';

export default function Button({ label, onClick }) {
  return (
    <button
      className="btn"
      onClick={() => onClick(label)}   // ✅ wrapped in arrow
      type="button"
    >
      {label}
    </button>
  );
}
