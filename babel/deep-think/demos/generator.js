import { parse } from "@babel/parser";
import { default as traverse } from "@babel/traverse";
import { generate } from "@babel/generator";

const ast = parse("console.log('Hello World!')");
traverse.default(ast, {
  enter(path) {
    if (path.node.type === "CallExpression") {
      path.node.callee.property.name = "dir";
    }
  },
});

const res = generate(ast, {});
console.log(res);
