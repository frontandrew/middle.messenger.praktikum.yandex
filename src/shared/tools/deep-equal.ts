export function deepEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === rhs) return true;

  if (typeof lhs !== 'object' || lhs === null || typeof rhs !== 'object' || rhs === null) {
    return false;
  }

  const keys1 = Object.keys(lhs);
  const keys2 = Object.keys(rhs);

  if (keys1.length !== keys2.length) return false;

  return keys1
    .map((key) => {
      if (!(key in rhs)) return false;
      return deepEqual(
        (lhs as {[key: string]: unknown})[key],
        (rhs as {[key: string]: unknown})[key],
      );
    })
    .every(Boolean);
}
