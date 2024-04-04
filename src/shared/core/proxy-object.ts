export function createProxy(props: UnknownObject) {
  return new Proxy(props, {
    get(target, prop) {
      if ((prop as string).indexOf('_') === 0) {
        console.warn(`Cant get this property: ${(prop as string)}`);
        return;
      }

      const value = target[(prop as string)];
      // eslint-disable-next-line consistent-return
      return typeof value === 'function' ? value.bind(target) : value;
    },

    set(target, prop: string, value) {
      if (prop.indexOf('_') === 0) {
        console.warn(`Cant set this property: ${prop}`);
        return false;
      }
      // eslint-disable-next-line no-param-reassign
      target[prop] = value;
      return true;
    },

    deleteProperty() {
      console.warn(`Propertys delete is not allowed.`);
      return false;
    },
  });
}
