// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener<T extends unknown[] = any[]> = (...args: T) => void | unknown;

export class EventBus {
  private listeners: Record<string, Listener[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      console.warn(`Envent is not defined: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      console.warn(`Envent is not defined: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      if (listener) listener(...args);
    });
  }
}
