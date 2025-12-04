import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { evaluateExpression } from '../utils/evaluator';

export default function Calculator() {
  const [expr, setExpr] = useState('');
  const [ans, setAns] = useState(() => { try { return localStorage.getItem('calcANS') ?? '0'; } catch { return '0'; } });
  const [error, setError] = useState(null);

  useEffect(() => { try { localStorage.setItem('calcANS', String(ans)); } catch {} }, [ans]);

  function handlePress(val) { setError(null); setExpr(prev => prev + val); }
  function handleClear() { setExpr(''); setError(null); }
  function handleBackspace() { setExpr(prev => prev.slice(0, -1)); setError(null); }
  function handleUseANS() { setExpr(prev => prev + 'ANS'); setError(null); }

  function handleEquals() {
    try {
      const result = evaluateExpression(expr, Number(ans));
      setExpr(String(result));
      setAns(String(result));
      setError(null);
    } catch (e) { setError(e.message); }
  }

  return (
    <div className="max-w-sm mx-auto mt-6 p-4 rounded-2xl shadow-lg bg-white">
      <h2 className="text-center text-xl font-semibold mb-3">React Calculator</h2>
      <Display expr={expr} ans={ans} error={error} />
      <Keypad onPress={handlePress} onEquals={handleEquals} onClear={handleClear} onBackspace={handleBackspace} onUseANS={handleUseANS} />
      <div className="mt-3 text-xs text-gray-500">Notes: supports + - * /, parentheses, decimal numbers and <strong>ANS</strong> token. Last computed result is saved to ANS and localStorage.</div>
    </div>
  );
}