const redis = require("redis");
const client = redis.createClient(); // 创建 Redis 客户端

// 设置缓存
client.set("key", "value", "EX", 10, (err) => {
  // 10 秒后过期
  if (err) throw err;
});

// 获取缓存
client.get("key", (err, value) => {
  if (err) throw err;
  if (value) {
    console.log("Cache hit:", value);
  } else {
    console.log("Cache miss");
  }
});
