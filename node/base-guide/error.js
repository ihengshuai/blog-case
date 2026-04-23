// 抛出异步错误
Promise.reject('异步错误');

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // 抛出同步错误
  throw new Error('同步错误');
});

process.on('uncaughtException', (error, origin) => {
  // origin: "uncaughtException" | "unhandledRejection";
  console.log('uncaughtException', error);
})
async function test() {
  throw new Error('xxx');
}
test()