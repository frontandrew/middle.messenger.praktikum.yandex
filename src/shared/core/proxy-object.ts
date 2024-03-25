import type { Props } from './component';

export function createProxy(props: Props) {
  return new Proxy(props, {
    get(target, prop: string) {
      if (prop.indexOf('_') === 0) {
        console.warn(`Cant get this property: ${prop}`);
        return;
      }

      const value = target[prop];
      // eslint-disable-next-line consistent-return
      return typeof value === 'function' ? value.bind(target) : value;
    },

    set(target, prop: string, value) {
      if (prop.indexOf('_') === 0) {
        console.warn(`Cant set this property: ${prop}`);
        return false;
      }

      //   console.log(`SET:[${this.id}]`, { target, prop })

      target[prop] = value;
      return true;
    },

    deleteProperty() {
      console.warn(`Propertys delete is not allowed.`);
      return false;
    },
  });
}
