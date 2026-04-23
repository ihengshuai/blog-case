/** 通过多线程方式解决CPU密集操作 */
const express = require("express");
const app = express();
const { Worker } = require("node:worker_threads");

process.title = "thread-main"
app.get("/", (req, res) => {
  console.log(`request start: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const worker = new Worker("./thread-worker.js", { workerData: { count: 10e9 } });

  worker.postMessage("start");
  worker.on("message", () => {
    console.log(`request end: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
    res.send("Hello World!");
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
