const { createServer, connect } = require("node:net")

const filePath = './unix.sock';

// server
const server = createServer(socket => {
  socket.on("data", data => {
    socket.write(data)
    server.close();
  })
})
// listen(path: string, listeningListener?: () => void): this;
.listen(filePath)


// client
const client = connect(filePath)
client.on('connect', () => client.write('hello server'));
client.on("data", data => {
  console.log(data.toString())
  client.end();
})
