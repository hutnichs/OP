function asyncMapPromise(array, asyncFn, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) {
      return reject(new TypeError("Expected an array"));
    }
    if (array.length === 0) return resolve([]);
    const results = new Array(array.length);
    let completed = 0;
    let finished = false;
    const abort = () => {
      if (!finished) {
        finished = true;
        reject(new Error("Operation aborted"));
      }
    };
    if (signal) {
      if (signal.aborted) return abort();
      signal.addEventListener("abort", abort);
    }
    array.forEach((item, async) => {
      Promise.resolve()
        .then(() => asyncFn(item, async, { signal }))
        .then((res) => {
          if (finished) return;
          results[async] = res;
          completed++;
          if (completed === array.length) {
            finished = true;
            resolve(results);
          }
        })
        .catch((err) => {
          if (!finished) {
            finished = true;
            reject(err);
          }
        });
    });
  });
}

module.exports = asyncMapPromise;