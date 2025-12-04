export function tokenize(s) {
  const tokens = [];
  let i = 0;
  const isDigit = ch => /[0-9]/.test(ch);
  while (i < s.length) {
    const ch = s[i];
    if (ch === ' ') { i++; continue; }
    if (ch === '+' || ch === '*' || ch === '/' || ch === '(' || ch === ')') {
      tokens.push(ch); i++; continue;
    }
    if (ch === '-') {
      const prev = tokens.length ? tokens[tokens.length-1] : null;
      if (!prev || ['+','-','*','/','('].includes(prev)) {
        let j = i+1; let num = '-'; let seenDigit = false;
        while (j < s.length && (isDigit(s[j]) || s[j] === '.')) { num += s[j]; if (isDigit(s[j])) seenDigit = true; j++; }
        if (seenDigit) { tokens.push(num); i = j; continue; }
      }
      tokens.push('-'); i++; continue;
    }
    if ((s.slice(i).toUpperCase()).startsWith('ANS')) { tokens.push('ANS'); i += 3; continue; }
    if (isDigit(ch) || ch === '.') {
      let j = i; let num = '';
      while (j < s.length && (isDigit(s[j]) || s[j] === '.')) { num += s[j]; j++; }
      tokens.push(num); i = j; continue;
    }
    throw new Error('Invalid character "' + ch + '"');
  }
  return tokens;
}

export function toRPN(tokens) {
  const out = []; const ops = []; const prec = { '+':1, '-':1, '*':2, '/':2 };
  for (const t of tokens) {
    if (!isNaN(Number(t)) || t === 'ANS') { out.push(t); continue; }
    if (['+','-','*','/'].includes(t)) {
      while (ops.length) {
        const peek = ops[ops.length-1];
        if (['+','-','*','/'].includes(peek) && prec[peek] >= prec[t]) out.push(ops.pop()); else break;
      }
      ops.push(t); continue;
    }
    if (t === '(') { ops.push(t); continue; }
    if (t === ')') {
      while (ops.length && ops[ops.length-1] !== '(') out.push(ops.pop());
      if (!ops.length) throw new Error('Mismatched parentheses');
      ops.pop(); continue;
    }
    throw new Error('Unknown token: ' + t);
  }
  while (ops.length) {
    const op = ops.pop(); if (op === '(' || op === ')') throw new Error('Mismatched parentheses'); out.push(op);
  }
  return out;
}

export function evalRPN(rpn, ansValue) {
  const st = [];
  for (const t of rpn) {
    if (t === 'ANS') { st.push(Number(ansValue)); continue; }
    if (!isNaN(Number(t))) { st.push(Number(t)); continue; }
    const b = st.pop(); const a = st.pop();
    if (a === undefined || b === undefined) throw new Error('Invalid expression');
    let r;
    if (t === '+') r = a + b;
    else if (t === '-') r = a - b;
    else if (t === '*') r = a * b;
    else if (t === '/') { if (b === 0) throw new Error('Division by zero'); r = a / b; }
    else throw new Error('Unknown operator ' + t);
    st.push(r);
  }
  if (st.length !== 1) throw new Error('Invalid expression');
  return st[0];
}

export function evaluateExpression(s, ansValue = 0) {
  if (!s || s.trim() === '') throw new Error('Empty expression');
  const tokens = tokenize(s);
  const rpn = toRPN(tokens);
  const v = evalRPN(rpn, ansValue);
  if (!isFinite(v)) throw new Error('Result is not finite');
  return Number.parseFloat(Number(v).toPrecision(12));
}