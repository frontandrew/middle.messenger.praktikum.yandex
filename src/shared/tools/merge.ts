export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if ((typeof lhs !== 'object' || lhs === null) && rhs) return rhs;
  if (!rhs) return lhs;

  return Object.entries(rhs)
    .reduce((result, [key, value]) => {
      if (key in result) {
        return {
          ...result,
          [key]: merge(lhs[key] as Indexed, rhs[key] as Indexed),
        };
      }
      return { ...result, [key]: value };
    }, lhs);
}
