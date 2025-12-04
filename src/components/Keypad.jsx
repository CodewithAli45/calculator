import React from 'react';

export default function Keypad({ onPress, onClear, onBackspace, onEquals }) {
  const buttons = [
    ['√', '(', ')', 'DEL', 'AC'],
    ['7', '8', '9', '%', '/'],
    ['4', '5', '6', '-', '*'],
    ['1', '2', '3', '+'],
    ['0', '.', 'ANS', '='],
  ];

  const getButtonClass = (val) => {
    if (['DEL', 'AC'].includes(val)) return 'bg-red-500 text-white';
    if (['+', '-', '*', '/', '%', '='].includes(val)) return 'bg-yellow-500 text-white';
    if (val === 'ANS') return 'bg-blue-500 text-white';
    if (val === '√' || val === '(' || val === ')') return 'bg-gray-400 text-white';
    return 'bg-gray-300 text-black';
  };

  const handleButtonClick = (val) => {
    if (val === 'AC') return onClear();
    if (val === 'DEL') return onBackspace();
    if (val === '=') return onEquals();
    onPress(val);
  };

  return (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {buttons.flat().map((val, index) => (
        <button
          key={index}
          className={`${getButtonClass(val)} rounded-lg p-2 shadow-md ${
            val === '=' || val === '+' ? 'col-span-2' : ''
          }`}
          onClick={() => handleButtonClick(val)}
        >
          {val}
        </button>
      ))}
    </div>
  );
}