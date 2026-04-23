import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { GlobalConfiguration } from "./config";

@Controller()
export class AppController {
  constructor(readonly configService: ConfigService<ReturnType<typeof GlobalConfiguration>>) {}

  // @Get("*")
  // @Header("Content-Type", "text/html;chartset=utf8")
  // renderClient(): StreamableFile {
  //   console.log(333);
  //   const isDev = this.configService.get("__is_Dev__");
  //   const CLIENT_DIR = this.configService.get("CLIENT_DIR");
  //   console.log(isDev, CLIENT_DIR);
  //   const clientPage = createReadStream(resolve(cwd(), isDev ? "./index.html" : `${CLIENT_DIR}/index.html`));
  //   return new StreamableFile(clientPage);
  // }
}
