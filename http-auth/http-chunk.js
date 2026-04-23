// 不定长传输
module.exports = (app) => {
  app.use("/chunked", (req, res) => {
    res.setHeader("Transfer-Encoding", "chunked");

    let timer,
      i = 1;

    timer = setInterval(() => {
      res.write(`${i}`);
      if (i >= 10) {
        clearInterval(timer);
        res.end();
      }
      i++;
    }, 1000);
  });

  app.use("/length", (req, res) => {
    res.setHeader("Content-Length", 1000);
    res.json({
      code: 500,
    });
  });
};
