export default class Producer {
  constructor(emitter) {
    this.emitter = emitter;
  }
  send(data) {
    this.emitter.emit("message", data);
  }
}