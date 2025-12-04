// src/components/Button.jsx
import React from 'react';

export default function Button({ label, onClick, className = "", variant = "default", icon = null, sizeClass = "" }) {
  const base = `flex items-center justify-center select-none rounded-2xl shadow-sm font-medium ${sizeClass}`;
  const variants = {
    default: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-700 text-cyan-200',
    danger: 'bg-red-700 text-white',
    success: 'bg-emerald-600 text-white'
  };
  const cls = `${base} ${variants[variant] ?? variants.default} ${className}`;

  const handleClick = () => {
    if (typeof onClick === 'function') onClick(label);
  };

  return (
    <button type="button" aria-label={label} onClick={handleClick} className={cls}>
      {icon || label}
    </button>
  );
}
