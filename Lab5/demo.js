const { asyncMapPromise, asyncMapCallback } = require("../src/async.js");
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
async function slowDouble(x) {
  await delay(200);
  return x * 2;
}
function slowDoubleCallback(x, _, cb) {
  setTimeout(() => cb(null, x * 2), 200);
}
asyncMapCallback([1, 2, 3], slowDoubleCallback, (err, res) => {
  console.log("Callback result:", err || res);
});
asyncMapPromise([4, 5, 6], slowDouble)
  .then((res) => console.log("Promise result:", res))
  .catch((err) => console.log("Promise error:", err.message));