import { URLSearchParams } from 'url';

export function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object') {
    throw new Error('Unxepected data format must be an object');
  }

  const searchParams = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return searchParams.toString();
}
