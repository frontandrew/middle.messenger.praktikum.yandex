export function first(list: unknown[]): unknown | undefined {
  if (!Array.isArray(list)) return undefined;

  const { length } = list;

  return length ? list[0] : undefined;
}
