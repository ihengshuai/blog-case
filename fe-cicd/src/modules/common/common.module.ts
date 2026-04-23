import { resolve } from "path";
import { cwd } from "process";

import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";
import { I18nModule } from "nestjs-i18n";

import { HttpFilter } from "@/common/filter/http.filter";
import { AuthenticationRouteGuard } from "@/common/guard/authentication-route.guard";
import { CustomI18nResolver } from "@/common/i18n/custom-i18n-resolver";
import { BeautyResponseInterceptor } from "@/common/interceptor/beauty-response.interceptor";
import { LoggerMiddleware } from "@/common/middleware/log.middleware";
import { DatabaseConfiguration, GlobalConfiguration } from "@/config";

import { CommonController } from "./common.controller";

const globalConfiguration = GlobalConfiguration();

@Module({
  imports: [
    // 配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [resolve(cwd(), "./.env"), resolve(cwd(), "./.env.production")],
      // ignoreEnvFile: true,
      load: [GlobalConfiguration],
      validationSchema: Joi.object({
        PORT: Joi.number(),
        NODE_ENV: Joi.string().valid("development", "production", "testing").required(),
      }),
    }),

    globalConfiguration.DB_ENABLE
      ? TypeOrmModule.forRootAsync({
          useFactory: () => {
            const { host, port, username, password, database } = DatabaseConfiguration();

            return {
              type: "mysql",
              host,
              port,
              username,
              password,
              database,
              autoLoadEntities: true,
              charset: "utf8mb4",
              synchronize: true, // 生产禁用这个
            };
          },
        })
      : Function,
    // i18n
    I18nModule.forRoot({
      fallbackLanguage: globalConfiguration.DEFAULT_LANGUAGE,
      loaderOptions: {
        path: resolve(cwd(), "./public/i18n/"),
        watch: false,
      },
      fallbacks: {
        "zh-cn": "zh",
        "zh-*": "zh_hk",
        zh: "zh_hk",
        "en-*": "en",
        "ko-*": "ko",
        "ja-*": "ja",
        "es-*": "es",
      },
      resolvers: [CustomI18nResolver],
      viewEngine: "ejs",
    }),
  ],
  providers: [
    // filter
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    // pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // 删除发送过来的不存在的属性
        whitelist: true,
        // 将传过来的类型转换为定义的类型，转换为 string、number、boolean和自定义类型
        transform: false,
        transformOptions: {
          enableImplicitConversion: true, // 隐式转换
        },
      }),
    },
    // guard
    {
      provide: APP_GUARD,
      useClass: AuthenticationRouteGuard,
    },
    // interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: BeautyResponseInterceptor,
    },
  ],
  controllers: [CommonController],
})
export class CommonModule implements NestModule {
  // 全局配置中间件 需要实现 NestModule中configure方法
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'mock', method: RequestMethod.GET });
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude('user')
    //   .forRoutes({ path: 'mock*', method: RequestMethod.ALL });
  }
}
