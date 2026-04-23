/** 通过多线程方式解决CPU密集操作 */
const express = require("express");
const app = express();
const { Worker, BroadcastChannel } = require("node:worker_threads");

process.title = "thread-main";
app.get("/", (req, res) => {
  console.log(`request start: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const channel = new BroadcastChannel('broadcast_channel');
  new Worker("./thread-worker-broadcast.js", { workerData: { count: 10e9 } });

  channel.postMessage("start");
  channel.onmessage = () => {
    console.log(`request end: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
    res.send("Hello World!");
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
