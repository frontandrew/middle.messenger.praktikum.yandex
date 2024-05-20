import { isArray } from './is-array';

/**
 * Transforms an array of objects into a dictionary keyed by a specified property.
 * If receive not an array param, it simple return firsn argument
 *
 * @param array a list of objects.
 *
 * @param key the property to use as the key for the dictionary
 *
 * @returns array of objecst, signed by 'key' param value
 */

export function keying<T>(array: T[], key: keyof T): { [key: string]: T } | T[] {
  if (!isArray) return array;
  return array
    .reduce((res, item) => ({ ...res, [`${item[key]}`]: item }), {});
}
