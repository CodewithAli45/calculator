import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StandardCalculator from './pages/StandardCalculator';
import ScientificCalculator from './pages/ScientificCalculator';
import './index.css';

function Navigation() {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    const value = event.target.value;
    if (value) navigate(value);
  };

  return (
    <div className="p-2 bg-sky-800 text-white flex justify-between items-center">
      <select
        className="bg-sky-600 text-white p-2 rounded"
        onChange={handleNavigation}
        defaultValue="/standard" // Default selection set to "Basic Calculator"
      >
        <option value="/standard">Basic Calculator</option>
        <option value="/scientific">Scientific Calculator</option>
      </select>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sky-700">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/standard" replace />} /> {/* Redirect / to /standard */}
          <Route path="/standard" element={<StandardCalculator />} />
          <Route path="/scientific" element={<ScientificCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}