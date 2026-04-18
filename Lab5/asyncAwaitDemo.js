const { asyncMapPromise } = require("../src/async.js");
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
async function slowDouble(x) {
  await delay(200);
  return x * 2;
}
async function run() {
  try {
    const result = await asyncMapPromise([10, 20, 30], slowDouble);
    console.log("Async/Await result:", result);
  } catch (err) {
    console.log("Async/Await error:", err.message);
  }
}

run();