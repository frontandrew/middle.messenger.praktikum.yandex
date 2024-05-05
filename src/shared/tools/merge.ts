export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // TODO: perhaps need more intense values check
  // if (typeof lhs !== 'object' || typeof rhs !== 'object') {
  //   if (typeof lhs !== 'object' && typeof rhs === 'object') return rhs;
  //   if (typeof rhs !== 'object' && typeof lhs === 'object') return lhs;
  //   if (rhs) return rhs;
  //   return lhs;
  // }

  const result = {
    ...lhs,
    ...Object.entries(rhs).reduce((acc, [key, value]) => {
      if (key in lhs) {
        acc[key] = typeof lhs[key] === 'object' && typeof value === 'object'
          ? merge(lhs[key] as Indexed, value as Indexed)
          : value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Indexed),
  };

  return result;
}
