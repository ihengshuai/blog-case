// 定义app的路由
import { PageController } from "../module/page/controller.js";
import { ShoppingController } from "../module/shopping/index.js";
import { UserController } from "../module/user/index.js";

const APP_ROUTES = {
  "^/shopping/?": ShoppingController,
  "^/user/?": UserController,
  "^/page/?": PageController,
};

export function useRouter(req, res) {
  console.log(`${req.method.toUpperCase()} ${req.url}`);

  const url = req.url;
  let hit = false;

  for (const route in APP_ROUTES) {
    if (new RegExp(route).test(url)) {
      hit = true;
      APP_ROUTES[route].instance.handle(req, res);
      return;
    }
  }

  if (!hit) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}
