import { evaluate } from 'mathjs';
export function tokenize(s) {
  const tokens = [];
  let i = 0;
  const isDigit = ch => /[0-9]/.test(ch);
  const isAlpha = ch => /[a-zA-Z]/.test(ch);

  while (i < s.length) {
    const ch = s[i];
    if (ch === ' ') { i++; continue; }

    // single-char operators and parentheses
    if ('+-*/%()'.includes(ch)) {
      // Distinguish unary minus as part of a number
      if (ch === '-') {
        const prev = tokens.length ? tokens[tokens.length - 1] : null;
        if (!prev || (typeof prev === 'string' && ['+', '-', '*', '/', '%', '('].includes(prev))) {
          // parse negative number
          let j = i + 1; let num = '-'; let seenDigit = false;
          while (j < s.length && (isDigit(s[j]) || s[j] === '.')) { if (isDigit(s[j])) seenDigit = true; num += s[j]; j++; }
          if (seenDigit) { tokens.push(num); i = j; continue; }
        }
      }
      tokens.push(ch); i++; continue;
    }

    // ANS token (case-insensitive)
    if (s.slice(i).toUpperCase().startsWith('ANS')) { tokens.push('ANS'); i += 3; continue; }

    // function/identifier like sqrt
    if (isAlpha(ch)) {
      let j = i; let id = '';
      while (j < s.length && (isAlpha(s[j]) || /[0-9]/.test(s[j]))) { id += s[j]; j++; }
      tokens.push(id);
      i = j; continue;
    }

    // number (digits and optional decimal)
    if (isDigit(ch) || ch === '.') {
      let j = i; let num = '';
      while (j < s.length && (isDigit(s[j]) || s[j] === '.')) { num += s[j]; j++; }
      tokens.push(num); i = j; continue;
    }

    // Improved error handling for invalid characters
    throw new Error(`Invalid character "${ch}" at position ${i}`);
  }

  return tokens;
}

export function toRPN(tokens) {
  const out = [];
  const ops = [];

  // precedence and arity
  const prec = { '+':1, '-':1, '*':2, '/':2, '%':2 };

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    // number or ANS
    if (!isNaN(Number(t)) || t === 'ANS') { out.push(t); continue; }

    // functions (identifiers) e.g., sqrt
    if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(t)) {
      // push function name to ops (will be handled when ')' encountered)
      ops.push(t);
      continue;
    }

    if (['+','-','*','/','%'].includes(t)) {
      while (ops.length) {
        const peek = ops[ops.length-1];
        if (['+','-','*','/','%'].includes(peek) && prec[peek] >= prec[t]) out.push(ops.pop()); else break;
      }
      ops.push(t); continue;
    }

    if (t === '(') { ops.push(t); continue; }
    if (t === ')') {
      while (ops.length && ops[ops.length-1] !== '(') out.push(ops.pop());
      if (!ops.length) throw new Error('Mismatched parentheses');
      ops.pop(); // remove '('
      // if top of ops is a function, pop it to output
      if (ops.length && /^[a-zA-Z][a-zA-Z0-9]*$/.test(ops[ops.length-1])) {
        out.push(ops.pop());
      }
      continue;
    }

    throw new Error('Unknown token: ' + t);
  }

  while (ops.length) {
    const op = ops.pop();
    if (op === '(' || op === ')') throw new Error('Mismatched parentheses');
    out.push(op);
  }

  return out;
}

export function evalRPN(rpn, ansValue) {
  const st = [];
  for (const t of rpn) {
    if (t === 'ANS') { st.push(Number(ansValue)); continue; }
    if (!isNaN(Number(t))) { st.push(Number(t)); continue; }

    // functions
    if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(t)) {
      const a = st.pop();
      if (a === undefined) throw new Error('Invalid expression');
      if (t.toLowerCase() === 'sqrt') {
        if (a < 0) throw new Error('Square root of negative'); // Ensure no negative roots
        st.push(Math.sqrt(a)); // Correctly evaluate square root
        continue;
      }
      // add more functions here if needed
      throw new Error('Unknown function ' + t);
    }

    // binary operators
    const b = st.pop(); const a = st.pop();
    if (a === undefined || b === undefined) throw new Error('Invalid expression');
    let r;
    if (t === '+') r = a + b;
    else if (t === '-') r = a - b;
    else if (t === '*') r = a * b;
    else if (t === '/') { if (b === 0) throw new Error('Division by zero'); r = a / b; }
    else if (t === '%') { if (b === 0) throw new Error('Division by zero'); r = a % b; }
    else throw new Error('Unknown operator ' + t);
    st.push(r);
  }
  if (st.length !== 1) throw new Error('Invalid expression');
  return st[0];
}

export function evaluateExpression(s, ansValue = 0) {
  if (!s || !s.trim()) throw new Error('Empty expression');
  // replace ANS token, optionally handle percent -> divide by 100
  const expr = s.replace(/ANS/g, `(${ansValue})`).replace(/√/g, 'sqrt');
  try {
    const v = evaluate(expr); // mathjs does the heavy lifting
    if (!isFinite(v)) throw new Error('Result not finite');
    return Number.parseFloat(Number(v).toPrecision(12));
  } catch (err) {
    throw new Error(err.message || 'Evaluation error');
  }
}