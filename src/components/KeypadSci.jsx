// src/components/KeypadScientific.jsx
import React from 'react';
import Button from './Button';

export default function KeypadSc({
  onPress,
  onClear,
  onDelete,
  onEquals,
  onUseAns,
}) {
  return (
    <div className="space-y-0"> {/* Removed vertical spacing */}
      {/* Top function row */}
      <div className="grid grid-cols-5 gap-1"> {/* Reduced gap between buttons */}
        <Button label="sin" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label="cos" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label="tan" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label="ln" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label="log" onClick={onPress} variant="secondary" sizeClass="h-10" />
      </div>

      {/* Bracket & sqrt row */}
      <div className="grid grid-cols-5 gap-1"> {/* Reduced gap between buttons */}
        <Button label="(" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label=")" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label="^" onClick={onPress} variant="secondary" sizeClass="h-10" />
        <Button label="√" onClick={() => onPress('sqrt(')} variant="secondary" sizeClass="h-10" />
        <Button label="%" onClick={onPress} variant="secondary" sizeClass="h-10" />
      </div>

      {/* Numeric + operators */}
      <div className="grid grid-cols-4 gap-1"> {/* Reduced gap between buttons */}
        <Button label="7" onClick={onPress} sizeClass="h-10" />
        <Button label="8" onClick={onPress} sizeClass="h-10" />
        <Button label="9" onClick={onPress} sizeClass="h-10" />
        <Button label="÷" onClick={() => onPress('/')} variant="primary" sizeClass="h-10" />

        <Button label="4" onClick={onPress} sizeClass="h-10" />
        <Button label="5" onClick={onPress} sizeClass="h-10" />
        <Button label="6" onClick={onPress} sizeClass="h-10" />
        <Button label="×" onClick={() => onPress('*')} variant="primary" sizeClass="h-10" />

        <Button label="1" onClick={onPress} sizeClass="h-10" />
        <Button label="2" onClick={onPress} sizeClass="h-10" />
        <Button label="3" onClick={onPress} sizeClass="h-10" />
        <Button label="-" onClick={() => onPress('-')} variant="primary" sizeClass="h-10" />

        <Button label="0" onClick={onPress} className="col-span-1 pl-6 text-left" sizeClass="h-10" />
        <Button label="." onClick={onPress} sizeClass="h-10" />
        <Button label="π" onClick={() => onPress('pi')} sizeClass="h-10" />
        <Button label="+" onClick={() => onPress('+')} variant="primary" sizeClass="h-10" />
      </div>

      {/* Bottom control row */}
      <div className="grid grid-cols-4 gap-1"> {/* Reduced gap between buttons */}
        <Button label="AC" onClick={onClear} variant="danger" sizeClass="h-10" />
        <Button label="DEL" onClick={onDelete} variant="danger" sizeClass="h-10" />
        <Button label="ANS" onClick={onUseAns} variant="secondary" sizeClass="h-10" />
        <Button label="=" onClick={onEquals} variant="success" sizeClass="h-10" />
      </div>
    </div>
  );
}
