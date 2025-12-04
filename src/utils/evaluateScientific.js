// src/utils/evaluator_scientific.js
import { create, all } from 'mathjs';
const math = create(all, {});

export function evaluateScientific(exprRaw, ansValue = 0, { isDegree = true } = {}) {
  if (!exprRaw || !exprRaw.trim()) throw new Error('Empty expression');

  // Preprocess tokens:
  // - allow the glyph √ or 'sqrt' & replace percent interpreted as modulus or percent handling
  let expr = exprRaw
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/ANS/g, `(${ansValue})`)
    .replace(/%/g, ' % '); // leave percent token for custom handling below if you want

  // mathjs doesn't directly treat '%' as percentage. If you want 50% => 0.5,
  // replace occurrences like 'number%' -> '(number/100)'
  expr = expr.replace(/(\d+(\.\d+)?)\s*%/g, '($1/100)');

  // Provide trigonometric wrappers via scope so DEG/RAD toggling works:
  const scope = {
    sin: (x) => isDegree ? math.sin(math.unit(x, 'deg')) : math.sin(x),
    cos: (x) => isDegree ? math.cos(math.unit(x, 'deg')) : math.cos(x),
    tan: (x) => isDegree ? math.tan(math.unit(x, 'deg')) : math.tan(x),
    asin: (x) => isDegree ? math.asin(x) * (180 / Math.PI) : math.asin(x),
    acos: (x) => isDegree ? math.acos(x) * (180 / Math.PI) : math.acos(x),
    atan: (x) => isDegree ? math.atan(x) * (180 / Math.PI) : math.atan(x),
    // keep common functions available
    sqrt: math.sqrt,
    log: (x) => math.log10(x),
    ln: math.log,
    pi: math.pi
  };

  try {
    const raw = math.evaluate(expr, scope);
    // format numeric
    const value = (typeof raw === 'number' || math.typeOf(raw) === 'Fraction' || math.isBigNumber(raw))
      ? Number.parseFloat(Number(raw).toPrecision(12))
      : raw;
    return { value, raw };
  } catch (err) {
    throw new Error(err && err.message ? err.message : 'Evaluation error');
  }
}
