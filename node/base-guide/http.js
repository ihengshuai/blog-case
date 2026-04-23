const { createServer, get } = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

get(`http://${hostname}:${port}`, (res) => {
  res.pipe(process.stdout);

  res.on("end", () => {
    console.log("接受完毕");
  });
});
