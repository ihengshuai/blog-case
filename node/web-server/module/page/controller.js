import { BaseController } from "../../helper/base-controller.js";

export class PageController extends BaseController {
  routes = {
    "get:/page/home/?$": this.renderHomePage,
  };

  /** 渲染home页面 */
  renderHomePage(req, res) {
    res.render("home", { title: "EJS模板引擎", message: "Hello, EJS!" });
  }
}
