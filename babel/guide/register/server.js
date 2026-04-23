import { createServer } from "node:http"

createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("Home Page")
  } else if (req.url === "/about" && req.method === "GET") {
    res.end("About Page")
  } else {
    res.statusCode = 404
    res.end("Not Found")
  }
}).listen(3000, () =>console.log("Server running on port 3000"))