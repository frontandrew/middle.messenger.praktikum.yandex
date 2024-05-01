export function last(list: unknown[]): unknown | undefined {
  if (!Array.isArray(list)) return undefined;

  const { length } = list;

  return length ? list[list.length - 1] : undefined;
}
