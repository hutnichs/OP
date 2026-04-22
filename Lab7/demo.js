import EventEmitter from "./EvEm.js";
import Producer from "./producer.js";
import Consumer from "./consumer.js";

const emitter = new EventEmitter();
const producer = new Producer(emitter);
const consumerA = new Consumer("A", emitter);
const consumerB = new Consumer("B", emitter);
console.log("send #1");
producer.send({ value: 1 });
const unsubscribeExtra = emitter.subscribe("message", (data) => {
  console.log("extra listener:", data.value * 10);
});
console.log("send #2");
producer.send({ value: 2 });
console.log("stop A");
consumerA.stop();
console.log("send #3");
producer.send({ value: 3 });
unsubscribeExtra();
console.log("send #4");
producer.send({ value: 4 });