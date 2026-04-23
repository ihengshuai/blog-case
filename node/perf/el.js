const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/compute") {
      // 模拟阻塞任务
      let sum = 0;
      for (let i = 0; i < 1e9; i++) {
        sum += i;
      }
      res.end(`Sum is ${sum}`);
    } else {
      res.end("OK");
    }
  })
  .listen(3000, () => console.log("Server running on port 3000"));

// let i = 0;
// const processChunk = () => {
//   while (i < 1e8 && i % 1e6 !== 0) {
//     i++;
//   }
//   if (i < 1e8) {
//     setImmediate(processChunk); // 将任务推到事件队列的下一轮
//   } else {
//     console.log("File processed");
//   }
// };
// processChunk();
