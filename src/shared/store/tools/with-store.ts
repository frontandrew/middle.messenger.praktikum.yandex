import { Component, Props } from 'core';

import { StoreEvents, store } from '../store';
import type { State } from '../type';

export function withStore<C, P>(mapFn: (state: State) => MakeOptional<P>) {
  return function<T extends {new (args: C & P): InstanceType<typeof Component>}>
  (constructor: T) {
    // @ts-expect-error-next-line
    return class extends constructor {
      constructor(args: C & P) {
        super({ ...args, ...mapFn(store.get()!) as C & P });

        store.on(StoreEvents.UPD, () => {
          this.setProps({ ...mapFn(store.get()!) as Props });
        });
      }
    };
  };
}
