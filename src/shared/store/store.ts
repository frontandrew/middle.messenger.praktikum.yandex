import { set } from 'tools';

import { EventBus } from '../core/event-bus';

import type { State } from './type';

export enum StoreEvents {
  UPD = 'store:updated'
}

export class Store extends EventBus {
  private state: State | null = null;

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set(this.state as PlainObject, path, value) as State;
    this.emit(StoreEvents.UPD);
  }

  public init(state: State) {
    this.state = state;
  }
}

export const store = new Store();

// TODO: remove after debug
// @ts-expect-error-next-line
window.store = store;
