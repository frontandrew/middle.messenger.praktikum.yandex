/**
 * TODO: для исполнения этой функции типы аргументов в массиве не имеют значения
 */
export function first(list: any[]): any[] | undefined {
  if (!Array.isArray(list)) return undefined;

  const { length } = list;

  return length ? list[0] : undefined;
}
