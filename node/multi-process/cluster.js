const cluster = require("node:cluster");
const http = require("node:http");
const os = require("node:os");

if (cluster.isMaster) {
  // 主进程逻辑
  const numCPUs = os.cpus().length;
  console.log(`主进程 ${process.pid} 正在运行`);

  // 创建与 CPU 核心数量相等的工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // 监听工作进程退出事件
  cluster.on("exit", (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    // 可选择性地重启工作进程
    cluster.fork();
  });
} else {
  // 工作进程逻辑
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`你好！工作进程：${process.pid}`);
    })
    .listen(8000);
  console.log(`工作进程 ${process.pid} 已启动`);
}
