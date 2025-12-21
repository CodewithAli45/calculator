import '../styles/display.css';

export default function Display({ expr, ans }) {
  return (
    <div className="display">
      <div className="ans">ANS: {ans}</div>
      <div className="expr">{expr || '0'}</div>
    </div>
  );
}
