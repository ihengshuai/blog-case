import { transformSync } from "@babel/core"
import LogToDirPlugin from "../plugins/log-to-dir.plugin.js";


const { code } = transformSync("console.log('hello world');", {
  plugins: [LogToDirPlugin]
})

console.log(code)