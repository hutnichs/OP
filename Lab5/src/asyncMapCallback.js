function asyncMapCallback(array, asyncFn, done, { signal } = {}) {
  if (!Array.isArray(array)) {
    return done(new TypeError("Expected an array"), null);
  }
  if (array.length === 0) return done(null, []);
  const results = new Array(array.length);
  let completed = 0;
  let finished = false;
  const abort = () => {
    if (!finished) {
      finished = true;
      done(new Error("Operation aborted"), null);
    }
  };
  if (signal) {
    if (signal.aborted) return abort();
    signal.addEventListener("abort", abort);
  }
  array.forEach((item, async) => {
    let called = false;
    try {
      asyncFn(item, async, (err, res) => {
        if (called || finished) return;
        called = true;
        if (err) {
          finished = true;
          return done(err, null);
        }
        results[async] = res;
        completed++;
        if (completed === array.length) {
          finished = true;
          done(null, results);
        }
      }, { signal });
    } catch (err) {
      if (!finished) {
        finished = true;
        done(err, null);
      }
    }
  });
}

module.exports = asyncMapCallback;