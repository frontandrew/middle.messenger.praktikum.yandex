export function deepCopy<T extends PlainObject>(obj: T) {
  return (
    function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
      if (item === null || typeof item !== 'object') {
        return item;
      }

      // Handle:
      // * Date
      if (item instanceof Date) {
        return new Date((item as Date).valueOf());
      }

      // Handle:
      // * Array
      if (item instanceof Array) {
        const copy: ReturnType<typeof _cloneDeep>[] = [];

        item.forEach(
          (_, i) => Object.defineProperty(copy, i, { value: _cloneDeep(item[i]), writable: true }),
        );

        return copy;
      }

      // Handle:
      // * Set
      if (item instanceof Set) {
        const copy = new Set();

        item.forEach((v) => copy.add(_cloneDeep(v)));

        return copy;
      }

      // Handle:
      // * Map
      if (item instanceof Map) {
        const copy = new Map();

        item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

        return copy;
      }

      // Handle:
      // * Object
      if (item instanceof Object) {
        const copy: PlainObject = {};

        // Handle:
        // * Object.symbol
        Object
          .getOwnPropertySymbols(item)
          // .forEach((s) => (copy[s.toString()] = _cloneDeep(item[s.toString()])));
          .forEach((s) => Object.defineProperty(
            copy,
            s.toString(),
            { value: _cloneDeep(item[s.toString()]), writable: true },
          ));

        // Handle:
        // * Object.name (other)
        Object.keys(item).forEach((key) => Object.defineProperty(
          copy,
          key,
          { value: _cloneDeep(item[key]), writable: true },
        ));

        return copy;
      }

      throw new Error(`Unable to copy object: ${item}`);
    }(obj));
}
