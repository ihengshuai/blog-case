import { BaseController } from "../../helper/base-controller.js";

export class ShoppingController extends BaseController {
  routes = {
    "get:/shopping/?$": this.getShoppingList,
    "post:/shopping/\\d+$": this.deleteShopping,
  };

  /** 请求购物车列表 */
  getShoppingList(req, res) {
    res.end("shopping list");
  }

  /**删除购物车 */
  deleteShopping(req, res) {
    res.end("delete shopping");
  }
}
