import { deepCopy, set } from 'tools';

import { EventBus } from '../core/event-bus';
import type { State } from './type';

export enum StoreEvents {
  UPD = 'store:updated'
}

export class Store extends EventBus {
  private initState: State | null = null;
  private state: State | null = null;

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set(this.state as PlainObject, path, value) as State;
    this.emit(StoreEvents.UPD);
  }

  public init(state: State) {
    this.initState = state;
    this.state = deepCopy(state) as State;
  }

  public reset() {
    if (!this.initState) {
      throw (new Error('Application initial state is missing'));
    }
    this.state = deepCopy(this.initState) as State;
    this.emit(StoreEvents.UPD);
  }
}

export const store = new Store();

// TODO: remove after debug
// @ts-expect-error-next-line
window.store = store;
