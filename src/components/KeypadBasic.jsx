// src/components/KeypadBasic.jsx
import Button from './Button';
import '../styles/keypad.css';

const keys = [
  '√','(',')','DEL','AC',
  '7','8','9','%','÷',
  '4','5','6','-','×',
  '1','2','3','+',
  '0','.','ANS','='
];

export default function KeypadBasic({ onPress }) {
  return (
    <div className="keypad">
      {keys.map((k) => (
        <Button key={k} label={k} onClick={onPress} />
      ))}
    </div>
  );
}
