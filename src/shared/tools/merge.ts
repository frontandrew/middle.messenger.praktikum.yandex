export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  if ((typeof lhs !== 'object' || lhs === null) && rhs !== undefined) return rhs;
  if (typeof lhs !== 'object') return lhs;

  const res = Object.entries(rhs)
    .reduce((result, [key, value]) => {
      if (key in result) {
        return {
          ...result,
          [key]: merge(lhs[key], rhs[key]),
        };
      }
      return { ...result, [key]: value };
    }, lhs);

  return res;
}
