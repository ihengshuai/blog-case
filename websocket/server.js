const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const { WebSocketServer } = require("ws");

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.cookie("__ut", "emmmmm", {
    maxAge: 1000000000,
    httpOnly: true,
  });
  next();
});

app.use(express.static("./static"));

const wss = new WebSocketServer({
  server,
  path: "/socket",
});

wss.on("connection", (ws, clientConnect) => {
  // console.log(clientConnect.headers.cookie);
  ws.on("message", (data) => {
    const { id, msg } = JSON.parse(data.toString("utf8"));
    console.log(id, msg);

    wss.clients.forEach((client) => {
      client.send(data);
    });
  });
  ws.send("hello");
});

server.listen(10000, () => console.log("server on 10000"));
