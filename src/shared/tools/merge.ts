export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  if ((typeof lhs !== 'object' || lhs === null) && rhs) return rhs;
  if (!rhs) return lhs;

  return Object.entries(rhs)
    .reduce((result, [key, value]) => {
      if (key in result) {
        return {
          ...result,
          [key]: merge(lhs[key] as PlainObject, rhs[key] as PlainObject),
        };
      }
      return { ...result, [key]: value };
    }, lhs);
}
