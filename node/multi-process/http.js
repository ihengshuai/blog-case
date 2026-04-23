const { createServer } = require("node:http");

process.title = '大卫talk';
createServer().listen(3000, () => console.log("server start on 3000 port."));