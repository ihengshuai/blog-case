import { traverse } from "@babel/core";
import { generate } from "@babel/generator";
import { parse } from "@babel/parser";

const ast = parse("var name = '#babel';console.log(name);");

traverse(ast, {
  enter(path) {
    if (path.isCallExpression()) console.log("enter");
  },
  exit(path) {
    if (path.isCallExpression()) console.log("exit");
  },
  StringLiteral(path) {
    if (path.node.value.startsWith("#")) {
      path.node.value = path.node.value.slice(1).toUpperCase();
    }
  },
  CallExpression(path) {
    console.log("CallExpression");
    if (
      path.node.callee.object.name === "console" &&
      ["log", "error", "info", "warn"].includes(path.node.callee.property.name)
    ) {
      path.node.callee.property.name = "dir";
    }
  },
});

const { code } = generate(ast);
console.log(code);
