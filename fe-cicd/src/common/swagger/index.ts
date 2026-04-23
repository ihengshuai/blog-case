import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: NestExpressApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Vue3 admin API Docs")
    // .addSecurity('basic', { type: 'http', scheme: 'basic' })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    // include: [MockController],
    operationIdFactory: (controllerKey, methodKey) => `${controllerKey}___${methodKey}`,
  });
  // 过滤掉不是以 `/api` 和 没有 `@ApiTags` 装饰的接口
  document.paths = Object.keys(document.paths).reduce((paths, path) => {
    if (!/^\/api/i.test(path)) return paths; // 只生成api开头的接口
    const pathItem = document.paths[path];
    const filteredOperations = Object.keys(pathItem).reduce((ops, method) => {
      const operation = pathItem[method];
      if (operation.tags && operation.tags.length > 0) {
        return { ...ops, [method]: operation };
      }
      return ops;
    }, {});
    if (Object.keys(filteredOperations).length > 0) {
      return { ...paths, [path]: filteredOperations };
    }
    return paths;
  }, {});
  SwaggerModule.setup("/api/docs", app, document, {
    customSiteTitle: "Vue3-Admin API Docs",
    swaggerOptions: {
      docExpansion: "none", // 默认不展开文档
    },
  });
};
