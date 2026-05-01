class BiDirQueue {
  constructor() {
    this.items = [];
    this.counter = 0;
  }

  enqueue(item, priority) {
    this.items.push({
      item: item,
      priority: priority,
      order: this.counter
    });
    this.counter++;
  }

  peek(type) {
    if (this.items.length === 0) return undefined;

    let arr = [...this.items];

    if (type === "lowest") {
      arr.sort((a, b) => a.priority - b.priority);
    } else if (type === "oldest") {
      arr.sort((a, b) => a.order - b.order);
    } else if (type === "newest") {
      arr.sort((a, b) => b.order - a.order);
    } else {
      arr.sort((a, b) => b.priority - a.priority);
    }

    return arr[0].item;
  }

  dequeue(type) {
    if (this.items.length === 0) return undefined;

    let arr = [...this.items];

    if (type === "lowest") {
      arr.sort((a, b) => a.priority - b.priority);
    } else if (type === "oldest") {
      arr.sort((a, b) => a.order - b.order);
    } else if (type === "newest") {
      arr.sort((a, b) => b.order - a.order);
    } else {
      arr.sort((a, b) => b.priority - a.priority);
    }

    let target = arr[0];

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === target) {
        this.items.splice(i, 1);
        break;
      }
    }

    return target.item;
  }
}