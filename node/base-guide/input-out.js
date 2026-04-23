const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`);
});

rl.on("line", (input) => {
  console.log("You said:", input);
});

rl.on("close", () => console.log("Bye!"));
