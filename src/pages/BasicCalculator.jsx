import { useState } from 'react';
import Display from '../components/Display';
import KeypadBasic from '../components/KeypadBasic';
import { evaluateBasic } from '../evaluators/basicEvaluator';
import '../styles/calculator.css';

export default function BasicCalculator() {
  const [expr, setExpr] = useState('');
  const [ans, setAns] = useState(0);

  const handleKey = (key) => {
    if (key === 'AC') {
      setExpr('');
      return;
    }

    if (key === 'DEL') {
      setExpr(prev => prev.slice(0, -1));
      return;
    }

    if (key === '=') {
      const result = evaluateBasic(expr);
      if (result !== 'Error') {
        // Remove commas before storing
        const numericValue = Number(result.replace(/,/g, ''));
        setAns(numericValue);
        setExpr(result);
      }
      return;
    }

    if (key === 'ANS') {
      setExpr(prev => prev + ans.toString());
      return;
      
    }
    console.log(ans);

    setExpr(prev => prev + key);
  };

  return (
    <div className="calc-wrapper">
      <Display expr={expr} ans={ans} />
      <KeypadBasic onPress={handleKey} />
    </div>
  );
}
