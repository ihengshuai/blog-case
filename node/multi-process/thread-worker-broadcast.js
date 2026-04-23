const { workerData, BroadcastChannel } = require("node:worker_threads");

const channel = new BroadcastChannel('broadcast_channel');

// 从主线程拿到最大数字
const { count } = workerData;

function runCompute() {
  for (let i = 0; i < count; i++) { /* do nothing */ }
}

runCompute();
channel.postMessage("done");