export function deepEqual(obj1: unknown, obj2: unknown) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1
    .map((key) => {
      if (!(key in obj2) || !deepEqual(
        (obj1 as {[key: string]: unknown})[key],
        (obj2 as {[key: string]: unknown})[key],
      )) {
        return false;
      }
      return true;
    })
    .some(Boolean);
}
