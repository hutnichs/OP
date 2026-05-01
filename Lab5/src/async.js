function asyncMapCallback(array, asyncFn, done) {
  const results = new Array(array.length);
  let completed = 0;
  let failed = false;

  array.forEach((item, index) => {
    asyncFn(item, index)
      .then((res) => {
        if (failed) return;

        results[index] = res;
        completed++;

        if (completed === array.length) {
          done(null, results);
        }
      })
      .catch((err) => {
        if (!failed) {
          failed = true;
          done(err, null);
        }
      });
  });
}

function asyncMapPromise(array, asyncFn) {
  return new Promise((resolve, reject) => {
    const results = new Array(array.length);
    let completed = 0;
    let failed = false;

    array.forEach((item, index) => {
      asyncFn(item, index)
        .then((res) => {
          if (failed) return;

          results[index] = res;
          completed++;

          if (completed === array.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          if (!failed) {
            failed = true;
            reject(err);
          }
        });
    });
  });
}

module.exports = {
  asyncMapCallback,
  asyncMapPromise,
};