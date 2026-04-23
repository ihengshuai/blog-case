import { transformSync } from "@babel/core";
import { TransferArrowFunctionPlugin } from "./plugin";

const code = `
  const log = (...args) => {
    console.log(...args);
  }

  const log2 = (...args) => true && ({...args});

  (() => console.log("I am IIFE"))();  

  new (() => null);
`;

const result = transformSync(code, {
  plugins: [TransferArrowFunctionPlugin],
});

console.log(result!.code);
eval(`${result!.code!}; log("Hello World!")`);

