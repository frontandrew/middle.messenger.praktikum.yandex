import { deepCopy, set } from 'tools';
import { INIT_STATE } from 'config';

import { EventBus } from '../core/event-bus';

import type { State } from './type';

export enum StoreEvents {
  UPD = 'store:updated'
}

export class Store extends EventBus {
  private state: State | null = null;
  private initState: State = INIT_STATE;

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set(this.state as PlainObject, path, value) as State;
    this.emit(StoreEvents.UPD);
  }

  public init() {
    const state = deepCopy(this.initState);
    this.state = state as State;
  }

  public reset() {
    this.init();
    this.emit(StoreEvents.UPD);
  }
}

export const store = new Store();

// TODO: remove after debug
// @ts-expect-error-next-line
window.store = store;
