const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); // 设置缓存过期时间和检查周期

// 设置缓存
cache.set("key", "value", 10); // 10 秒后过期

// 获取缓存
const value = cache.get("key");
if (value) {
  console.log("Cache hit:", value);
} else {
  console.log("Cache miss");
}
