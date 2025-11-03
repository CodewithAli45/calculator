import React from 'react';
import './SciCalc.css';

export default function SciCalcUI({ input, result, onButtonClick }) {
  const buttons = [
    ['x²', 'x^y', '√', 'log', 'ln'],
    ['π', '10^x', 'e', 'x³', 'x⁻¹'],
    ['sin', 'sin⁻¹', 'cos', 'cos⁻¹', 'tan⁻¹'],
    ['(', ')', '!', 'x⁻¹', 'tan'],
    ['7', '8', '9', 'DEL', 'AC'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '+', '-'],
    ['0', '.', '%', 'ANS', '='],
  ];

  return (
    <div className="calculator">
      <div className="display">
        <textarea
          className="input"
          value={input}
          readOnly
          autoFocus
        />
        <textarea
          className="result"
          value={result}
          readOnly
        />
      </div>
      <div className="keypad">
        {buttons.flat().map((btn, index) => (
          <button
            key={index}
            className={
              btn === 'AC' || btn === 'DEL'
                ? 'clear'
                : btn === '='
                ? 'equals'
                : isNaN(btn) && btn !== '.'
                ? 'operator'
                : 'number'
            }
            onClick={() => onButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
