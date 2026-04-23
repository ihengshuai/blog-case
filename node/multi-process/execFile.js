const { execFile } = require("node:child_process");

const child = execFile("node", ["./node-bin.js"]);
child.stdout.pipe(process.stdout);
