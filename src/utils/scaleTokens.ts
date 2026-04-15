export type ScaleTokensOptions = {
  /**
   * When traversing an object, if a property key is in this set and its value is a plain object,
   * that subtree is copied without scaling numeric values (e.g. font weights).
   */
  skipNumericScaleForSubtreeKeys?: ReadonlySet<string>;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneWithoutScalingNumbers(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean' || value === null) {
      out[key] = value;
    } else if (Array.isArray(value)) {
      out[key] = value.map((item) =>
        isPlainObject(item) ? cloneWithoutScalingNumbers(item) : item
      );
    } else if (isPlainObject(value)) {
      out[key] = cloneWithoutScalingNumbers(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Recursively traverses a token tree, multiplies finite numbers by `factor`, rounds to integers,
 * and preserves strings, booleans, null, and non-finite numbers. Arrays are mapped element-wise.
 */
export function scaleTokens(
  obj: Record<string, unknown>,
  factor: number,
  options?: ScaleTokensOptions
): Record<string, unknown> {
  const skip = options?.skipNumericScaleForSubtreeKeys ?? new Set<string>();
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (skip.has(key) && isPlainObject(value)) {
      result[key] = cloneWithoutScalingNumbers(value);
      continue;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      result[key] = Math.round(value * factor);
    } else if (typeof value === 'string' || typeof value === 'boolean' || value === null) {
      result[key] = value;
    } else if (typeof value === 'number') {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        if (typeof item === 'number' && Number.isFinite(item)) {
          return Math.round(item * factor);
        }
        if (isPlainObject(item)) {
          return scaleTokens(item, factor, options);
        }
        return item;
      });
    } else if (isPlainObject(value)) {
      result[key] = scaleTokens(value, factor, options);
    } else {
      result[key] = value;
    }
  }

  return result;
}
