import { flatten } from './flatten';
import { isPlainObject } from './is-plain-object';

export function classNames(...params: unknown[]): string {
  /* make arrays from trufy objects keys */
  const arrayed = params.map((param) => (isPlainObject(param)

    ? Object.entries(param).reduce((acc, [key, val]) => {
      if (typeof val === 'boolean' && val) return acc.concat(key);
      return acc;
    }, [] as string[])

    : param));

  /* flat array params */
  const flatted = flatten(arrayed);

  /* filtered array params */
  const filtered = flatted.reduce<string[]>((acc, param) => {
    if (param && typeof param === 'number') acc.push(param.toString());
    if (param && typeof param === 'string') acc.push(param);
    return acc;
  }, []);

  /* return string joined by whitespace */
  return filtered.join(' ');
}
