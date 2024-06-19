export function take<T>(list: T[], num: number = 1): T[] {
  if (!Array.isArray(list) || typeof num !== 'number') {
    throw new Error('Func "take()" receive bad value');
  }
  return list.slice(0, num);
}
