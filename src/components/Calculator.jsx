import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { evaluateExpression } from '../utils/evaluator';

export default function Calculator() {
  const [expr, setExpr] = useState('');
  const [ans, setAns] = useState(() => {
    try {
      return localStorage.getItem('calcANS') ?? '0';
    } catch {
      return '0';
    }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('calcANS', String(ans));
    } catch {
      // Ignore localStorage errors
    }
  }, [ans]);

  const handlePress = (val) => {
  setError(null);
  if (val === '√') val = 'sqrt(';
  setExpr(prev => prev + val);
};


  const handleClear = () => {
    setExpr('');
    setError(null);
  };

  const handleBackspace = () => {
    setExpr((prev) => prev.slice(0, -1));
    setError(null);
  };

  const handleEquals = () => {
    try {
      const result = evaluateExpression(expr, Number(ans));
      setExpr(String(result));
      setAns(String(result));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-6 p-4 rounded-2xl shadow-lg bg-slate-300">
      <h2 className="text-center text-xl font-semibold mb-3">Basic Calculator</h2>
      <Display expr={expr} ans={ans} error={error} />
      <Keypad
        onPress={handlePress}
        onClear={handleClear}
        onBackspace={handleBackspace}
        onEquals={handleEquals}
      />
    </div>
  );
}