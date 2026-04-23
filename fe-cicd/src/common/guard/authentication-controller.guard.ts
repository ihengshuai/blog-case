import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";

import { AuthenticationControllerKey } from "../decorator";

/**
 * 控制整个controller守卫
 */
@Injectable()
export class AuthenticationControllerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isControllerAuthenrication = this.reflector.get(AuthenticationControllerKey, context.getClass());
    // 判断当前请求路由不需要鉴权直接放行
    if (!isControllerAuthenrication) return true;
    // TODO: 需要鉴权的这里简单的使用 authorization 头值是否等于controller进行判断
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const key = request.headers.authorization;
    return key === "controller";
  }
}
