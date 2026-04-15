export default class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  subscribe(event, listener) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    const listeners = this.events.get(event);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) this.events.delete(event);
    };
  }
  emit(event, payload) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(payload);
    }
  }
}
