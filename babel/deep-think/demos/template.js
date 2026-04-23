import { default as template } from "@babel/template";
import { default as traverse } from "@babel/traverse";
import { generate } from "@babel/generator";
import babelType from "@babel/types";

// const ast = template.program(`const str = 'hello world'`)();
const ast = template.program(`console.log(%%NAME%%)`)({ NAME: babelType.stringLiteral("world") });
traverse.default(ast, {
  StringLiteral(path) {
    path.node.value = path.node.value.toUpperCase();
  },
});
const { code } = generate(ast);
console.log(code);
