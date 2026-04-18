const { asyncMapPromise } = require("../src/async.js");
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
async function slowDouble(x, _, { signal }) {
  if (signal?.aborted) {
    throw new Error("Aborted inside task");
  }
  await delay(200);
  return x * 2;
}
const controller = new AbortController();
setTimeout(() => controller.abort(), 250);
asyncMapPromise([1, 2, 3, 4], slowDouble, {
  signal: controller.signal,
})
  .then((res) => console.log("Result:", res))
  .catch((err) => console.log("Aborted:", err.message));