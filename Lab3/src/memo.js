function memoize(fn, { maxSize = Infinity } = {}) {
  const cache = new Map();

  return function (n) {
    if (cache.has(n)) {
      console.log("From cache:", n);
      return cache.get(n);
    }

    const result = fn(n);

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(n, result);
    return result;
  };
}