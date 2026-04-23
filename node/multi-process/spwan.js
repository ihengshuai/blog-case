const { spawn } = require("node:child_process");

process.title = 'node spawn'
// const command = spawn("tail", ["-f", './worker.js'], { stdio: "ignore", 'detached': true });
const command = spawn("ls", ["-a"], { stdio: "inherit" });
// command.stdout.pipe(process.stdout);

// 等价于
// command.stdout.on("data", (d) => console.log(Buffer.from(d).toString()));

// command.unref();
