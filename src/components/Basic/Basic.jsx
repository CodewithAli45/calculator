import React from 'react';
import './Basic.css';

function roundDisplay(numStr) {
    if (numStr === "Error" || isNaN(Number(numStr))) return numStr;
    if (numStr.includes('.')) {
        let [intPart, decPart] = numStr.split('.');
        decPart = decPart.slice(0, 10);
        return intPart + '.' + decPart;
    }
    return numStr;
}

function formatINR(numStr) {
    if (numStr === "Error" || isNaN(Number(numStr))) return numStr;
    let [intPart, decPart] = numStr.split(".");
    let lastThree = intPart.slice(-3);
    let otherNumbers = intPart.slice(0, -3);
    if (otherNumbers !== '') lastThree = ',' + lastThree;
    let formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    if (decPart) formatted += '.' + decPart;
    return formatted;
}

export default function Basic() {
    const [  display, setDisplay ] = React.useState("0");
    const [  history, setHistory ] = React.useState([]);
    const [lastOperator, setLastOperator] = React.useState(null);
    const [lastOperand, setLastOperand] = React.useState(null);
    const [historyIndex, setHistoryIndex ] = React.useState(-1);

     function safeEval(expr) {
        try {
        expr = expr.replace(/%/g, '/100');
        // eslint-disable-next-line no-eval
        let result = eval(expr);
        if (result === undefined || isNaN(result)) return "Error";
        // Round to 10 decimal places for display
        result = Math.round(result * 1e10) / 1e10;
        return result.toString();
        } catch {
        return "Error";
        }
    }
    const keys = [
        "PREV", "NEXT", "DEL", "AC", "√",
        "7", "8", "9", "/", "%",
        "4", "5", "6", "-", "*",
        "1", "2", "3", "+", 
        "0", ".", "00", "="
    ]
    function handleKey(key) {
    if (key === "") return;

    if (key === "AC") {
      setDisplay("0");
      setHistoryIndex(-1);
      setLastOperator(null);
      setLastOperand(null);
      return;
    }

    if (key === "DEL") {
      setDisplay((prev) => prev.length > 1 ? prev.slice(0, -1) : "0");
      return;
    }

    if (key === "PREV") {
      if (history.length === 0) return;
      setHistoryIndex((idx) => {
        const newIdx = idx < history.length - 1 ? idx + 1 : idx;
        setDisplay(history[history.length - 1 - newIdx]);
        return newIdx;
      });
      return;
    }

    if (key === "NEXT") {
      if (history.length === 0) return;
      setHistoryIndex((idx) => {
        const newIdx = idx > 0 ? idx - 1 : 0;
        setDisplay(history[history.length - 1 - newIdx]);
        return newIdx;
      });
      return;
    }

    if (key === "√") {
      let value = parseFloat(display);
      if (isNaN(value) || value < 0) {
        setDisplay("Error");
        return;
      }
      let result = Math.sqrt(value);
      setHistory((h) => [...h, `√(${display}) = ${result}`]);
      setDisplay(result.toString());
      setHistoryIndex(-1);
      return;
    }

    if (key === "=") {
      let expr = display.replace(/,/g, '');
      let result;
      if (/[+\-*/]$/.test(expr) && lastOperand !== null && lastOperator !== null) {
        expr = expr + lastOperand;
      }
      result = safeEval(expr);

      let match = expr.match(/([+\-*/])([0-9.]+)$/);
      if (match) {
        setLastOperator(match[1]);
        setLastOperand(match[2]);
      }

      setHistory((h) => {
        const newHist = [...h, `${display} = ${result}`];
        return newHist.length > 20 ? newHist.slice(-20) : newHist;
      });
      setDisplay(result);
      setHistoryIndex(-1);
      return;
    }
    if (["+", "-", "*", "/"].includes(key)) {
      setLastOperator(key);
      let match = display.match(/([0-9.]+)$/);
      setLastOperand(match ? match[1].replace(/,/g, '') : null);
    }

    // For numbers and operators
    setDisplay((prev) => {
      if (prev === "0" && !isNaN(key)) return key;
      if (prev === "Error") return key;
      return prev + key;
    });
    setHistoryIndex(-1);
  }
  let formattedDisplay = formatINR(roundDisplay(display));

  return (
    <div className="calculator">
      <div className="display">
        <div className="display-history">
          {history.map((item, index) => (
            <span key={index}>{item}<br /></span>
          ))}
        </div>
        <div className="display-value">{formattedDisplay}</div>
      </div>
      <div className="keys">
        {keys.map((key, index) => {
          let displayKey = key === "√" ? "√" : key;
          let className = "key-btn";
          if (key === "+" || key === "=") className += " double-width special";
          else if (["AC", "DEL", "PREV", "NEXT"].includes(key)) className += " special";
          return (
            <button
              key={index}
              className={className.trim()}
              style={key === "+" ? { gridColumn: "4 / span 2" } : key === "=" ? { gridColumn: "4 / span 2" } : {}}
              onClick={() => handleKey(key)}
              tabIndex={key === "" ? -1 : 0}
              disabled={key === ""}
            >
              {displayKey}
            </button>
          );
        })}
        </div>
    </div>
  )
}
