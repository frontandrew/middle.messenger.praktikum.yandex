export function pick<T extends object>(
  obj: T,
  fields: (keyof T)[],
): Pick<T, Exclude<keyof T, typeof fields>> {
  if (!(obj instanceof Object)) throw new Error(`Pick can't operate with ${typeof obj}.`);

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (!fields.includes(key as keyof T)) return acc;
      return { ...acc, [key]: value };
    },
  {} as Pick<T, Exclude<keyof T, typeof fields>>,
  );
}
