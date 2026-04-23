const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("app middleware1");
  next();
});

app.get("/", (req, res, next) => {
  console.log("router middleware1");
  next();
});

app.get("/", (req, res) => {
  console.log("router middleware2");
  // throw new Error("Error!"); // 模拟错误
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error('错误捕获：', err);
})

app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});


