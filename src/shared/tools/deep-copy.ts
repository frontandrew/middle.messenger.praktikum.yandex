export function deepCopy(obj: any) {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return obj;
  }

  const copy: Record<string, any> = Array.isArray(obj) ? [] : {};

  // for (const key in obj) {
  //   if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //     copy[key] = deepCopy(obj[key]);
  //   }
  // }

  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  });

  return copy;
}
