import { useRouter } from "./router/index.js";
import { Cors } from "./middleware/index.js";
import { MiddlewareQueue } from "./helper/middleware.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import dotenv from "dotenv";
import ejs from "ejs";

// 原生模块
// import { createServer } from "node:http";
// const server = createServer((req, res) => MiddlewareQueue(req, res, [Cors, useRouter]));
// server.listen(3000, () => console.log("server start on 3000 port."));

// express
import express from "express";
const app = express();

const config = dotenv.config({
  path: "./.env",
});
console.log(process.env.PORT, config);

// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
// 设置模板文件存放的目录
app.set('views', './views');

// app.use(express.static("public"));
app.use((req, res) =>
  MiddlewareQueue(req, res, [
    express.static("public"),
    express.json(),
    Cors,
    cookieParser(),
    expressSession({
      secret: "mySecretKey",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000,
        httpOnly: true,
      },
    }),
    useRouter,
  ])
);
app.listen(3000, () => console.log("server start on 3000 port."));
