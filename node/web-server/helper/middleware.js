export function MiddlewareQueue(req, res, queue = []) {
  function next() {
    const middleware = queue.shift();
    if (middleware) {
      middleware(req, res, next);
    }
  }

  next();
}