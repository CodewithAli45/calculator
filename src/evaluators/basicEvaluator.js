import * as math from 'mathjs';

export function evaluateBasic(expr) {
  if (!expr) return '0';

  try {
    const sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');

    const result = math.evaluate(sanitized);
    return result.toString();
  } catch {
    return 'Error';
  }
}
