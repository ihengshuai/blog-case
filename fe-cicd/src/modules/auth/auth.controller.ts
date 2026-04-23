import { Controller, Get } from "@nestjs/common";

@Controller("/api/mock/auth")
export class AuthController {
  // 获取权限
  @Get()
  getAuth() {
    return {
      accessToken: "TOKEN_xxxxxxx",
    };
  }
}
