// Babel Docs: https://babel.dev
// Babel Repo: https://github.com/babel/babel
// JSX AST: https://github.com/facebook/jsx/blob/main/AST.md
// ESTree AST: https://github.com/estree/estree/blob/master/es5.md
import { declare } from "@babel/helper-plugin-utils";

const LogToDirPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);

  return {
    name: "LogToDirPlugin",
    pre(file) {
      this.cache = new Map();
      this.cache.set("name", "Jack");
      file.metadata.user = { name: "Jack", age: 10 };
    },
    post(file) {
      console.log("post", file.metadata.user);
    },
    visitor: {
      CallExpression: {
        enter(path, state) {
          const { node } = path;
          if (
            node.callee.object?.name === "console" &&
            ["log", "error", "info", "warn"].includes(node.callee.property.name)
          ) {
            node.callee.property.name = "dir";
            // const isStringLiteral = api.types.isStringLiteral(node.arguments[0])

            // if (!isStringLiteral) throw new Error("参数不是字符串")
            node.arguments.unshift(api.types.stringLiteral("Transfer to dir"));
          }
        },
      },
      StringLiteral(path) {
        console.log(this.cache.get("name"));
        api.types.booleanLiteral(false);
        path.remove();
      },
    },
  };
});

export default LogToDirPlugin;
