import express from "express";

const app = express();
app.use(express.static('./'));

app.get("/sse", (req, res) => {
  // 设置响应头为SSE格式
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let count = 0;
  let timer;

  const sendEvent = () => {
    res.write(`id: ${count}\n\n`);
    res.write(`data: ${count}\n\n`);
    count++;
    timer = setTimeout(sendEvent, 1000);
  };

  sendEvent();

  req.on("close", () => {
    console.log("Client disconnected");
    clearTimeout(timer);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
