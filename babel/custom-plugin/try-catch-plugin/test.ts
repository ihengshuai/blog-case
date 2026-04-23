import { transformSync } from "@babel/core";
import { AutoTryCatchPlugin } from "./plugin";

const code = `
  const log = (...args) => {
    try {
      console.log(...args);
    } catch (e) {
      console.error(e);
    }
  }

  function skipTryCatch() {}

  // @no-try-catch
  async function asyncLogger() {
    await console.log("Hello World!");
  }

  (() => null)();
`;

const result = transformSync(code, {
  plugins: [[AutoTryCatchPlugin, { exclude: [/^skipTry.+/i] }]],
});

console.log(result!.code);
eval(`${result!.code!}; log("Hello World!")`);


