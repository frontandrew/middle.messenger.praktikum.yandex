export function deepCopy(obj: unknown) {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    (copy as {[key: string]: unknown})[key] = deepCopy((obj as {[key: string]: unknown})[key]);
  });

  return copy;
}
