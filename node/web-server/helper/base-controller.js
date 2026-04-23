export class BaseController {
  static _instance;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  handle(req, res) {
    const routes = this.routes;

    const method = req.method.toLowerCase();
    const noParamsUrl = req.url.split("?")[0];
    const matchedURL = `${method}:${noParamsUrl}`;
    const hitRoute = Object.keys(routes).find((route) => {
      const regexp = new RegExp(route)
      return regexp.test(matchedURL);      
    });

    if (hitRoute) {
      routes[hitRoute](req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
}
