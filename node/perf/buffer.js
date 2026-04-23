const http = require("http");
http.get("http://example.com", (res) => {
  const chunks = [];
  res.on("data", (chunk) => {
    chunks.push(chunk); // chunk 是一个 Buffer
  });
  res.on("end", () => {
    const data = Buffer.concat(chunks);
    console.log(data.toString());
  });
});
