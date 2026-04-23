/** 通过多线程方式解决CPU密集操作 */
const express = require("express");
const app = express();
const { Worker, MessageChannel } = require("node:worker_threads");

process.title = "thread-main";
app.get("/", (req, res) => {
  console.log(`request start: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const subChannel = new MessageChannel();
  const worker = new Worker("./thread-worker-messagechannel.js", { workerData: { count: 10e9 } });

  worker.postMessage({ port: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on("message", () => {
    console.log(`request end: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
    res.send("Hello World!");
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
