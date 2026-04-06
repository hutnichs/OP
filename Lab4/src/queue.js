class BiDirQueue {
  constructor() {
    this.items = [];
    this.counter = 0;
  }

  enqueue(item, priority) {
    this.items.push({
      item,
      priority,
      order: this.counter++
    });
  }

  _getSorted(type) {
    const arr = [...this.items];

    switch (type) {
      case "highest":
        return arr.sort((a, b) => b.priority - a.priority);

      case "lowest":
        return arr.sort((a, b) => a.priority - b.priority);

      case "oldest":
        return arr.sort((a, b) => a.order - b.order);

      case "newest":
        return arr.sort((a, b) => b.order - a.order);

      default:
        throw new Error("Invalid type");
    }
  }

  peek(type = "highest") {
    if (this.items.length === 0) return undefined;
    return this._getSorted(type)[0].item;
  }

  dequeue(type = "highest") {
    if (this.items.length === 0) return undefined;

    const sorted = this._getSorted(type);
    const target = sorted[0];

    const index = this.items.findIndex(
      x => x === target
    );

    this.items.splice(index, 1);
    return target.item;
  }
}
const pq = new BiDirQueue();

pq.enqueue("A", 5);
pq.enqueue("B", 1);
pq.enqueue("C", 10);

console.log(pq.peek("highest"));
console.log(pq.peek("lowest"));  
console.log(pq.peek("oldest"));  
console.log(pq.peek("newest"));  

console.log(pq.dequeue("highest")); 
console.log(pq.dequeue("oldest"));  
console.log(pq.dequeue("lowest"));
