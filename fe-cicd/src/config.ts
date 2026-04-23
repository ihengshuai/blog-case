import { cwd } from "process";

import { registerAs } from "@nestjs/config";
import { config } from "dotenv";

const devConfig = config({
  path: cwd() + "/.env",
}).parsed;

const prodConfig = config({
  path: cwd() + "/.env.production",
}).parsed;

// 全局共享配置
export const GlobalConfiguration = () => ({
  __is_Prod__: process.env.NODE_ENV === "production",
  __is_Dev__: process.env.NODE_ENV !== "production",
  __isHttps__: process.env.SSL_CERTIFICATE && process.env.SSL_CERTIFICATE_KEY,
  NODE_ENV: process.env.NODE_ENV?.length ? process.env.NODE_ENV : "development",
  PORT: (process.env.PORT || 5000) as number,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN ?? "localhost",
  COOKIE_LANG_KEY: process.env.COOKIE_LANG_KEY ?? "__lang",
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE ?? "en",
  // 客户端编译目录
  CLIENT_DIR: process.env.CLIENT_OUTDIR || "dist/client",
  // 证书
  SSL_CERTIFICATE: process.env.SSL_CERTIFICATE,
  SSL_CERTIFICATE_KEY: process.env.SSL_CERTIFICATE_KEY,
  // 是否使用数据库
  DB_ENABLE: !!(devConfig?.DB_HOST ?? prodConfig?.DB_HOST),
  DB_HOST: devConfig?.DB_HOST ?? prodConfig?.DB_HOST,
});

// 数据库配置
export const DatabaseConfiguration = registerAs("db", () => ({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "test",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PWD || "123456",
}));
