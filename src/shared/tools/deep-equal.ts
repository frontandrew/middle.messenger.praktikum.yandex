import { isArray } from './isArray';
import { isPlainObject } from './isPlainObject';

export function deepEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === rhs) return true;

  if (!isArrOrObj(lhs) || !isArrOrObj(rhs)) {
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

function isArrOrObj(value: unknown):value is PlainObject | [] {
  return isPlainObject(value) || isArray(value);
}
