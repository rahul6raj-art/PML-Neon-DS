type PlainRecord = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge plain objects. Non-object values from `override` replace `base`.
 * Arrays are replaced, not merged.
 */
export function deepMerge<T extends PlainRecord>(base: T, override: PlainRecord): T {
  const out: PlainRecord = { ...base };

  for (const key of Object.keys(override)) {
    const bv = base[key];
    const ov = override[key];

    if (ov === undefined) {
      continue;
    }

    if (isPlainObject(bv) && isPlainObject(ov)) {
      out[key] = deepMerge(bv, ov);
    } else {
      out[key] = ov;
    }
  }

  return out as T;
}
