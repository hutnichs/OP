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
function factorial(n) {
  if (n < 0) return null;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

const memoFactorial = memoize(factorial, { maxSize: 50 });
console.log(memoFactorial(5));
