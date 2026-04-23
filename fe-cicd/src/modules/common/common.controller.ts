import { Controller, Get } from "@nestjs/common";

@Controller("/common")
export class CommonController {
  @Get("/health-check")
  healthCheck() {
    return "ok";
  }
}
