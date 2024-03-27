/**
 * Нет смысла контролировать типы здесь, поскольку
 * тут формируются структуры. Необходимые сигнатуры
 * присвоены в базовом компоненте, передаваемые свойства
 * контролируются при создании нового инстанса компонента
 */

// @ts-nocheck
export function createProxy(props = {}) {
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
