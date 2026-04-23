import { ExecutionContext, Render, SetMetadata, applyDecorators, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const Cookie = createParamDecorator((defaultValue: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp();
  const req = request.getRequest<Request>();
  return (defaultValue && req.cookies[defaultValue]) || req.cookies;
});

// 参数装饰器
export const Protocol = createParamDecorator((defaultValue: string, ctx: ExecutionContext) => {
  if (defaultValue) return defaultValue;
  const request = ctx.switchToHttp();
  return request.getRequest<Request>().protocol;
});

// 鉴权某个路由
export const AuthenticationRouteKey = "Authentication-route-register";
export const RegisterAuthenticationRoute = () => SetMetadata(AuthenticationRouteKey, true);

// 鉴权某个controller
export const AuthenticationControllerKey = "Authentication-controller-register";
export const RegisterAuthenticationController = () => SetMetadata(AuthenticationControllerKey, true);

// 页面装饰器
export const RenderPageSymbol = "render-page";
export const RenderPage = (path: string) => {
  // 多个装饰器
  return applyDecorators(SetMetadata(RenderPageSymbol, true), Render(path));
};
