import { Children, Component, Props } from 'core';

import { StoreEvents, store } from './store';

export function withStore(mapFn: (state: PlainObject) => PlainObject) {
  return function<T extends {new (args: Children & Props): InstanceType<typeof Component>}>
  (constructor: T) {
    // @ts-expect-error-next-line
    return class extends constructor {
      constructor(args: Children & Props) {
        super({ ...args, ...mapFn(store.get()!) as Children & Props });

        store.on(StoreEvents.UPD, () => {
          this.setProps({ ...mapFn(store.get()!) as Props });
        });
      }
    };
  };
}
