const Koa = require("koa");
const app = new Koa();

// 定义中间件
app.use(async (ctx) => {
  ctx.body = "Hello, Koa!";
});

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
