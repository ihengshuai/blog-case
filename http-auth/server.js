const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const chunkServer = require("./http-chunk");
const rangeServer = require("./http-range");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("访问：", req.path);
  next();
});

app.use(async (req, res, next) => {
  if (/\.html?[^\/]*/gi.test(req.path)) {
    res.header(
      "Content-Security-Policy",
      "img-src https://general-mac.com; frame-ancestors http://localhost:10001; frame-src https://youtu.be https://www.youtube.com; report-uri /report"
    );
    res.header(
      "Content-Security-Policy-Report-Only",
      "style-src 'self'; report-to main-endpoint"
    );
    res.header(
      "Reporting-Endpoints",
      'main-endpoint="http://192.168.11.142:10000/report"'
    );
  }
  await next();
});

// CSP POLICY REPORT
app.use("/report", (req, res) => {
  // 上报收集...
  res.json({
    code: 200,
    report: true,
  });
});

app.use(express.static("./static"));

process.env.TZ = "Asia/Shanghai";

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   rolling: true,
//   saveUninitialized: true,
//   cookie: { domain: "localhost", maxAge: 1000, sameSite: 'strict' }
// }))

// chunk transfer
chunkServer(app);
rangeServer(app);

// cookie
app.use("/cookie", (req, res) => {
  res.cookie("__ut", "123456", {
    // maxAge: 1000 * 60 * 60 * 24, // 优先级高
    // expires: new Date("2023-04-24 10:17"),
    httpOnly: true, // 只允许HTTP请求使用，其他方式无法获取
    // secure: true, // 规定cookie只能HTTPS传输
    sameSite: "lax", // 同站点使用
    // domain: "192.168.11.143:10000", // 生效的域名
    // path: "/cookie.html", // 生效的路径，默认 / 所有路径生效
  });
  res.json({
    code: 200,
  });
});

// session
app.use("/session", (req, res) => {
  req.session.user = { name: "Jack" };
  res.json({
    code: 200,
  });
});

app.use("/transfer", (req, res) => {
  console.log(req.headers.cookie);
  res.json({
    code: 200,
    msg: "转账成功!",
  });
});

app.use((req, res) => {
  res.json({
    code: 200,
  });
});

app.listen(10000, () => console.log("server on 10000"));
