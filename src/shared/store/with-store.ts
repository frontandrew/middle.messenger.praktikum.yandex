/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreEvents, store } from './store';

export function withStore(mapFn: (state: PlainObject) => PlainObject) {
  // eslint-disable-next-line func-names
  return function<T extends { new (...args: any[]): Record<string, any> }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super({ ...args, ...mapFn(store.get()) });

        store.on(StoreEvents.UPD, () => {
          this.setProps({ ...mapFn(store.get()) });
        });
      }
    };
  };
}
