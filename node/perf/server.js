import express from "express";

const app = express();

// const arr = [];

app.use((req, res) => {
  // arr.push(new Object());
  const obj = new Object();
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("hello world");
});

app.listen(3000, () => console.log("server started"));
