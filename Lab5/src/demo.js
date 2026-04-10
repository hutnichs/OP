const { asyncMapCallback, asyncMapPromise } = require("./asyncMap");

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function slowDouble(x) {
  await delay(200);
  return x * 2;
}

asyncMapCallback([1, 2, 3, 4], slowDouble, (err, result) => {
  if (err) {
    console.log("Callback error:", err.message);
  } else {
    console.log("Callback result:", result);
  }
});

asyncMapPromise([5, 6, 7], slowDouble)
  .then((res) => console.log("Promise result:", res))
  .catch((err) => console.log("Promise error:", err.message));

async function runAsyncAwaitDemo() {
  try {
    const result = await asyncMapPromise([10, 20, 30], slowDouble);
    console.log("Async/Await result:", result);
  } catch (err) {
    console.log("Async/Await error:", err.message);
  }
}

runAsyncAwaitDemo();