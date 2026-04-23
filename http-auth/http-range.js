const path = require("path");

// 范围请求
module.exports = (app) => {
  app.use("/range", async (req, res) => {
    res.download(path.resolve(__dirname, "./server.js"), {
      acceptRange: true,
    });
  });
};
