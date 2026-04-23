const { fork } = require('node:child_process');
const net = require('node:net');
const http = require('node:http')
const os = require('node:os');

const cpus = os.cpus().length;

if (process.argv[2] !== 'worker') {
  const workers = [];

  // 创建 TCP 服务器
  const server = net.createServer();
  server.listen(8000, () => {
    console.log('TCP 服务器已启动，端口 8000');

    // 创建工作进程并传递服务器句柄
    for (let i = 0; i < cpus; i++) {
      const worker = fork(__filename, ['worker']);
      workers.push(worker);

      // 将服务器句柄发送给子进程
      worker.send('server', server);
    }
  });
} else {
  const childServer = http.createServer((req, res) => res.end(`hello client, from: ${process.pid}`))
  process.on('message', (msg, socket) => {
    if (msg === 'server') {
      // 子进程接收服务器句柄
      socket.on('connection', (socket) => {
        childServer.emit('connection', socket)
      });
    }
  });
}
