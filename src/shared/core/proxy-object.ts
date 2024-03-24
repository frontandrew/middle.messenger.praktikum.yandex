export function createProxy(props) {
  return new Proxy(props, {
    get(target, prop) {
      if (prop.indexOf('_') === 0) {
        console.warn(`Cant get this property: ${prop}`);
        return;
      }

      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    },

    set(target, prop, value) {
      if (prop.indexOf('_') === 0) {
        console.warn(`Cant set this property: ${prop}`);
        return;
      }

      //   console.log(`SET:[${this.id}]`, { target, prop })

      target[prop] = value;
      return true;
    },

    deleteProperty() {
      console.warn(`Propertys delete is not allowed.`);
    },
  });
}
