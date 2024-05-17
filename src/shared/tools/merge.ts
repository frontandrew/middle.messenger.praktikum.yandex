/* eslint-disable */
/* TODO: this tool must be refactored!! */
export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

// export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
//   if ((typeof lhs !== 'object' || lhs === null) && rhs !== undefined) return rhs;
//   if (typeof lhs !== 'object') return lhs;

//   const res = Object.entries(rhs)
//     .reduce((result, [key, value]) => {
//       if (key in result) {
//         return {
//           ...result,
//           [key]: merge(lhs[key], rhs[key]),
//         };
//       }
//       return { ...result, [key]: value };
//     }, lhs);

//   return res;
// }
