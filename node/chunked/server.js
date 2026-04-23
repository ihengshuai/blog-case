import express from "express";

const app = express();
app.use(express.static('./'));

// nodejs模拟不定长传输
app.use("/chunked", (req, res) => {
  // 必须要设置Transfer-Encoding头信息
  res.setHeader("Transfer-Encoding", "chunked");

  let timer, i = 1;
  // 1s返回一次 总共返回9次
  timer = setInterval(() => {
    res.write(`${i}`);
    if (i >= 10) {
      clearInterval(timer);
      res.end();
    }
    i++;
  }, 1000);
});

app.listen(8005)