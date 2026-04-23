const { Worker } = require("node:worker_threads")

const sharedBuffer = new SharedArrayBuffer(4); // 创建共享内存
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker('./thread-worker-shared.js', { workerData: sharedBuffer });

console.log("子线程操作前的值：", sharedArray[0]);
worker.on('message', () => {
  console.log("子线程操作后的值：", sharedArray[0]);
});