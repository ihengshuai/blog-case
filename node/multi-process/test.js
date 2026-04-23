process.on("SIGTERM", () => {
  console.log("接收到终止信号，开始清理工作...");
  process.exit(0);
});

process.kill(process.pid, "SIGTERM");
