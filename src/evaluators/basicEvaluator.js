// src/evaluators/basicEvaluator.js
import * as math from 'mathjs';

function formatIndianNumber(value) {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function evaluateBasic(expr) {
  if (!expr) return '0.00';

  try {
    const sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');

    const rawResult = math.evaluate(sanitized);

    if (typeof rawResult !== 'number' || !isFinite(rawResult)) {
      return 'Error';
    }

    // Round + Indian format
    return formatIndianNumber(rawResult);
  } catch {
    return 'Error';
  }
}
