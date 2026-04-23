const child_process = require("node:child_process");

const cpus = require("node:os").cpus();

for (let i = 0; i < cpus.length; i++) {
  child_process.fork("./worker.js");
}

console.log("master: start");
