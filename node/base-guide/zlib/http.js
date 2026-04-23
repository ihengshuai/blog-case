const { createServer } = require("node:http");
const fs = require("node:fs");
const zlib = require("node:zlib");

const filePath = "./input.txt";

createServer((req, res) => {
  const gzip = zlib.createGzip();

  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  fs.createReadStream(filePath).pipe(gzip).pipe(res);
}).listen(3000, () => console.log("server start on 3000 port."));
