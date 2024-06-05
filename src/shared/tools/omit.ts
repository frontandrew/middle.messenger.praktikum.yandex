export function omit<T extends object>(
  obj: T,
  fields: (keyof T)[],
): Omit<T, Exclude<keyof T, typeof fields>> {
  if (!(obj instanceof Object)) throw new Error(`Omit can't operate with ${typeof obj}.`);

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (fields.includes(key as keyof T)) return acc;
      return { ...acc, [key]: value };
    },
  {} as Omit<T, Exclude<keyof T, typeof fields>>,
  );
}
