import { set } from 'tools';

import { EventBus } from '../core/event-bus';

export enum StoreEvents {
  UPD = 'store:updated'
}

export class Store extends EventBus {
  private state: PlainObject = {};

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set(this.state, path, value);
    this.emit(StoreEvents.UPD);
    // console.log(`EMIT:`, { state: this.state, path, value });
  }

  init(state: PlainObject) {
    this.state = state;
  }
}

export const store = new Store();

// TODO: remove after debug
// @ts-expect-error-next-line
window.store = store;
