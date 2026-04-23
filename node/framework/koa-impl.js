const middleware1 = async (ctx, next) => {
  console.log("middleware1");
  await next();
  console.log("middleware1 end");

  return "最终的返回值";
};

const middleware2 = async (ctx, next) => {
  console.log("middleware2");
  const res = await next();

  console.log("middleware2 end", res);
};

const middleware3 = async (ctx, next) => {
  console.log("middleware3");

  return "middleware3 返回值";
};

const middlewares = [middleware1, middleware2, middleware3];

function compose(middlewares) {
  return dispatch(0);

  function dispatch(idx) {
    let fn = middlewares[idx];

    if (idx === middlewares.length) {
      return Promise.resolve();
    }

    return Promise.resolve(
      fn({} /* ctx */, function next() {
        return dispatch(idx + 1);
      })
    );
  }
}

compose(middlewares).then((res) => {
  console.log(res);
});


