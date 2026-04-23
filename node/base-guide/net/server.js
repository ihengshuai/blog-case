const net = require("node:net");

// 创建服务器
const server = net.createServer((socket) => {
  console.log("New client connected");

  // 监听客户端数据
  socket.on("data", (data) => {
    console.log(`Received: ${data.toString()}`);
    socket.write(`Echo: ${data}`); // 回显数据
  });

  // 监听客户端断开连接
  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

// 监听端口
server.listen(3000, () => {
  console.log("TCP Server running on port 3000");
});
