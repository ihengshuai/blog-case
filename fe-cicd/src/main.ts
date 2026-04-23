import { readFileSync } from "fs";
import { resolve } from "path";
import { cwd } from "process";

import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";

import { AppModule } from "./app.module";
import { ViteMiddleware } from "./common/middleware/vite.middleware";
import { initSwagger } from "./common/swagger";
import { GlobalConfiguration } from "./config";

// import * as expressSession from "express-session";

async function bootstrap() {
  const config = GlobalConfiguration();

  if (config.__isHttps__ && config.__is_Dev__) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "warn", "debug"],
    ...(config.__isHttps__
      ? {
          httpsOptions: {
            key: readFileSync(config.SSL_CERTIFICATE_KEY!),
            cert: readFileSync(config.SSL_CERTIFICATE!),
          },
        }
      : {}),
  });

  app.use(ViteMiddleware);
  app.use(cookieParser());
  // app.use(expressSession({ secret: "sdf", name: "sx.session", rolling: true, cookie: { maxAge: null } }));

  app.enableCors((req: Request, cb) =>
    cb(null, {
      origin: req.headers.origin,
      methods: ["PUT, POST, GET, DELETE, OPTIONS"],
      allowedHeaders: ["x-locale", "authorization", "Content-Type"],
      credentials: true,
    })
  );

  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 压缩静态资源
  config.__is_Prod__ &&
    app.use(
      compression({
        filter: (req: Request, res: Response) => {
          if (/\.(woff2|gz|robots\.txt?)/i.test(req.path)) return false;
          return compression.filter(req, res);
        },
      })
    );

  // 静态资源服务
  app.useStaticAssets(resolve(cwd(), "./public"), {
    dotfiles: "deny",
    index: false,
    setHeaders(res: Response, path: string) {
      setCustomCacheControl(res, path);
    },
  });

  // 生产环境增加对客户端静态资源的支持
  config.__is_Prod__ &&
    app.useStaticAssets(resolve(cwd(), config.CLIENT_DIR), {
      dotfiles: "deny",
      index: false,
      setHeaders(res: Response, path: string) {
        setCustomCacheControl(res, path);
      },
    });

  // 读取客户端的 manifest.json 文件
  if (config.__is_Prod__) {
    const manifest = await readFileSync(resolve(cwd(), `${config.CLIENT_DIR}/.vite/manifest.json`), "utf-8");
    app.use(async (req: Request, res: Response, next) => {
      if (!/(^\/api)|(\.(js|css|png|jpg)$)/i.test(req.url)) {
        // TODO: 这里只是简单的将html页面默认的资源进行推送
        // 若需要根据路由推送，客户端需要将chunkName对应没有路由文件和路由，目前还没有相关插件
        const beautyManifest = JSON.parse(manifest);
        const htmlManifest = beautyManifest["index.html"];
        if (htmlManifest) {
          // 没有cookie根据浏览器进行判断需要推送的语言包
          const agentLanguages = req.header("Accept-Language") || "";
          const agentLanguage = agentLanguages.split(",")?.[0]?.replace(/(_|-).*/, "");
          const lang = req.cookies[config.COOKIE_LANG_KEY] || agentLanguage || config.DEFAULT_LANGUAGE;
          res.cookie(config.COOKIE_LANG_KEY, lang, { maxAge: 31536000, domain: config.COOKIE_DOMAIN });

          // 页面所需要的资源
          const { file, imports, css } = htmlManifest;
          let serverPushStack = [];
          serverPushStack.push(`<${req.baseUrl}/${file}>; rel=preload; as=script; crossorigin`);
          imports.forEach(src =>
            serverPushStack.push(`<${req.baseUrl}/${beautyManifest[src]["file"]}>; rel=preload; as=script; crossorigin`)
          );
          css.forEach(src => serverPushStack.push(`<${req.baseUrl}/${src}>; rel=preload; as=style; crossorigin`));
          serverPushStack.push(`<${req.baseUrl}/i18n/${lang}.json>; rel=preload; as=fetch; crossorigin`);
          if (serverPushStack.length) {
            res.setHeader("Link", serverPushStack.join(", "));
          }
        }
      }
      next();
    });
  }

  // swagger
  initSwagger(app);

  await app.listen(config.PORT, () => {
    console.log(`Application is running on ${config.PORT} port.\n`);
    console.log(`   - Current Env：${config.NODE_ENV}.`);
    config.DB_ENABLE && console.log(`   - Database：${config.DB_HOST}`);
    console.log(
      `   - Client Server： ${config.__isHttps__ ? "https" : "http"}://localhost:${
        config.PORT
      } (若配置了域名请换成域名)\n`
    );
  });
}

bootstrap().catch(err => {
  console.log(err);
  process.exit(1);
});

function setCustomCacheControl(res: Response, path: string) {
  // Custom Cache-Control for HTML files
  if (/.*\.html\??.*/i.test(path)) {
    res.setHeader("Cache-Control", "no-store");
  } else {
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}
