/** 通过多进程方式解决CPU密集操作 */
const express = require("express");
const app = express();
const child_process = require("node:child_process");


app.get("/", (req, res) => {
  console.log(`request start: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  const child = child_process.fork("./cpu-compute.js");

  child.send("start");
  child.on("message", () => {
    console.log(`request end: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
    res.send("Hello World!");
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
