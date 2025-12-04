import React from 'react';

const Button = ({ children, className, onClick }) => (
  <button onClick={onClick} className={`py-3 rounded-xl shadow-inner font-medium ${className}`}>{children}</button>
);

export default function Keypad({ onPress, onEquals, onClear, onBackspace, onUseANS }) {
  const buttons = [
    ['(', ')', 'ANS', 'C'],
    ['7','8','9','/'],
    ['4','5','6','*'],
    ['1','2','3','-'],
    ['0','.','=','+']
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {buttons.flat().map((b, idx) => {
        const isEq = b === '='; const isC = b === 'C'; const isANS = b === 'ANS';
        return (
          <Button
            key={idx}
            onClick={() => {
              if (isEq) return onEquals();
              if (isC) return onClear();
              if (isANS) return onPress('ANS');
              if (b === '.') return onPress('.');
              if (['+','-','*','/','(',')'].includes(b)) return onPress(b);
              onPress(b);
            }}
            className={isEq ? 'col-span-1 bg-indigo-500 text-white' : isC ? 'bg-red-100' : isANS ? 'bg-yellow-100' : 'bg-gray-50'}
          >{b}</Button>
        );
      })}

      <button onClick={onBackspace} className="col-span-2 py-3 rounded-xl bg-gray-200">⌫</button>
      <button onClick={() => onUseANS()} className="col-span-2 py-3 rounded-xl bg-green-100">Use ANS</button>
    </div>
  );
}