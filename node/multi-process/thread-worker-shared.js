const { parentPort, workerData } = require("node:worker_threads");
const sharedArray = new Int32Array(workerData);

for (let i = 0; i < 1000; i++) {
  Atomics.add(sharedArray, 0, 1); // 原子操作，确保线程安全
}

parentPort.postMessage("done");
