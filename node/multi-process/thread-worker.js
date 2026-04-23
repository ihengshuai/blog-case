const { workerData, parentPort } = require("node:worker_threads");

// 从主线程拿到最大数字
const { count } = workerData;

function runCompute() {
  for (let i = 0; i < count; i++) { /* do nothing */ }
}

runCompute();
parentPort.postMessage("done");