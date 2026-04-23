const net = require('node:net');

// 创建客户端并连接到服务器
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server');
  client.write('Hello, server!');
});

// 监听数据
client.on('data', (data) => {
  console.log(`Received: ${data.toString()}`);
  client.end(); // 结束连接
});

// 监听连接结束
client.on('end', () => {
  console.log('Disconnected from server');
});