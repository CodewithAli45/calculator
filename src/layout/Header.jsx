// src/layout/Header.jsx
import '../styles/header.css';

export default function Header({ title, onMenuClick }) {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}
