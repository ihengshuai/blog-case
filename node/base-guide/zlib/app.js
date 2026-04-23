const fs = require("node:fs");
const zlib = require("node:zlib");

(async () => {
  // 压缩文件
  const input = fs.createReadStream("./input.txt");
  const output = fs.createWriteStream("./input.txt.gz");
  input.pipe(zlib.createGzip({ level: 2 })).pipe(output);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 解压文件
  const compressed = fs.createReadStream("./input.txt.gz");
  const decompressed = fs.createWriteStream("./output.txt");
  compressed.pipe(zlib.createGunzip()).pipe(decompressed);
})();
