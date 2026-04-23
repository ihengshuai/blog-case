const { fork } = require("node:child_process");

const child = fork("./fork-child.js");

child.send("hello child!");

child.on("message", (msg) => {
  console.log("child message:", msg);
});

child.on("exit", () => {
  console.log("子进程已退出！");
});
