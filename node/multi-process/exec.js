const { exec } = require("node:child_process");

exec("ls -a", { maxBuffer: 1 }, (error, stdout, stderr) => {
  console.log(stdout);
});
