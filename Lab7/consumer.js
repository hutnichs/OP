export default class Consumer {
  constructor(name, emitter) {
    this.name = name;
    this.unsubscribe = emitter.subscribe("message", this.handle.bind(this));
  }
  handle(data) {
    console.log(this.name, "received:", data);
  }
  stop() {
    this.unsubscribe();
  }
}