const express = require("express");
const app = express();

function runCompute() {
  for (let i = 0; i < 10e9; i++) { /* do nothing */ }
}

app.get("/", (req, res) => {
  console.log(`request start: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  runCompute();
  console.log(`request end: ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
