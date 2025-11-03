import React, { useState } from 'react';
import './SciCalc.css';
import SciCalcUI from './SciCalcUI';

export default function SciCalc() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
        // Replace constants and operators for evaluation
        const expression = input
          .replace(/π/g, Math.PI)
          .replace(/e/g, Math.E)
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/\^/g, '**');
        const evalResult = eval(validateBrackets(expression));
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else {
      // Handle special cases for functions and constants
      if (value === '10^x') {
        setInput(input + '10**');
      } else if (value === 'x³') {
        setInput(input + '**3');
      } else if (value === 'x⁻¹') {
        setInput(input + '1/(');
      } else if (value === '√') {
        setInput(input + 'Math.sqrt(');
      } else if (value === 'log') {
        setInput(input + 'Math.log10(');
      } else if (value === 'ln') {
        setInput(input + 'Math.log(');
      } else if (value === 'sin') {
        setInput(input + 'Math.sin(degToRad(');
      } else if (value === 'cos') {
        setInput(input + 'Math.cos(degToRad(');
      } else if (value === 'tan') {
        setInput(input + 'Math.tan(degToRad(');
      } else if (value === 'sin⁻¹') {
        setInput(input + 'radToDeg(Math.asin(');
      } else if (value === 'cos⁻¹') {
        setInput(input + 'radToDeg(Math.acos(');
      } else if (value === 'tan⁻¹') {
        setInput(input + 'radToDeg(Math.atan(');
      } else {
        setInput(input + value);
      }
    }
  };

  // Helper function to validate and close brackets
  const validateBrackets = (expression) => {
    const openBrackets = (expression.match(/\(/g) || []).length;
    const closeBrackets = (expression.match(/\)/g) || []).length;
    return expression + ')'.repeat(openBrackets - closeBrackets);
  };

  // Convert degrees to radians
  const degToRad = (deg) => (deg * Math.PI) / 180;

  // Convert radians to degrees
  const radToDeg = (rad) => (rad * 180) / Math.PI;

  return (
    <div>
      <SciCalcUI
        input={input}
        result={result}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}
