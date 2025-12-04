// src/components/CalculatorScientific.jsx
import React, { useState, useEffect, useRef } from 'react';
import Display from '../components/DisplaySci';
import KeypadScientific from '../components/KeypadSci';
import { evaluateScientific } from '../utils/evaluateScientific';

export default function ScientificCalculator() {
  const [input, setInput] = useState('');
  const [lastAns, setLastAns] = useState(() => {
    try { return localStorage.getItem('calcANS') ?? '0'; } catch { return '0'; }
  });
  const [resultObj, setResultObj] = useState(null);
  const [isDegree, setIsDegree] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try { localStorage.setItem('calcANS', String(lastAns)); } catch { /* Ignore localStorage errors */ }
  }, [lastAns]);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.scrollLeft = inputRef.current.scrollWidth;
  }, [input]);

  const handlePress = (val) => {
    setError(null);
    setInput(prev => prev + val);
  };

  const handleClear = () => { setInput(''); setResultObj(null); setError(null); };
  const handleDelete = () => { if (error) { setError(null); setInput(''); } else setInput(prev => prev.slice(0, -1)); };

  const handleEquals = () => {
    try {
      const res = evaluateScientific(input, Number(lastAns), { isDegree });
      setResultObj({ value: res.value, raw: res.raw, lastAns });
      setLastAns(String(res.value));
      setError(null);
    } catch (err) {
      setError(err.message || 'Invalid expression');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-2 sm:p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 p-0 h-[90vh] flex flex-col justify-between"> {/* Removed padding */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-300 font-semibold">Scientific</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDegree(d => !d)} className="text-xs bg-gray-800 px-2 py-1 rounded">
              {isDegree ? 'DEG' : 'RAD'}
            </button>
          </div>
        </div>

        <div className="flex-grow">
          <Display input={input} result={{ value: resultObj?.value, lastAns }} error={error} showANS={true} />
        </div>

        <div className="mt-0"> {/* Removed margin */}
          <KeypadScientific
            onPress={(label) => {
              if (['sin','cos','tan','log','ln'].includes(label)) setInput(p => p + label + '(');
              else setInput(p => p + label);
            }}
            onClear={handleClear}
            onDelete={handleDelete}
            onEquals={handleEquals}
            onUseAns={() => handlePress('ANS')}
          />
        </div>
      </div>
    </div>
  );
}
