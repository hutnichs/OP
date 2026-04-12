class EventEmitter {
  constructor() {
    this.events = new Map();
  }
    subscribe(event, listener) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(listener);
  }
    emit(event, payload) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(payload);
    }
  }
}
class Producer {
  constructor(emitter) {
    this.emitter = emitter;
  }
  send(data) {
    this.emitter.emit("message", data);
  }
}
class Consumer {
  constructor(name, emitter) {
    this.name = name;
    emitter.subscribe("message", this.handle.bind(this));
  }
    handle(data) {
    console.log(this.name, "received:", data);
  }
}
const emitter = new EventEmitter();
const producer = new Producer(emitter);
const consumerA = new Consumer("A", emitter);
const consumerB = new Consumer("B", emitter);
producer.send({ value: 1 });
producer.send({ value: 2 });