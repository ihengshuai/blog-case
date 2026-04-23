import { Statement } from "@babel/types";
import { declare } from "@babel/helper-plugin-utils";

export const TransferArrowFunctionPlugin = declare(
  ({ assertVersion, types, template }) => {
    assertVersion(7);

    return {
      name: "TransferArrowFunctionPlugin",
      visitor: {
        ArrowFunctionExpression(path) {
          const { node } = path;

          let body = node.body;

          const params = node.params;
          const generator = node.generator;
          const async = node.async;

          let name = null;
          const ids = path.parentPath.getBindingIdentifiers();
          if (Object.keys(ids).length > 0) {
            name = ids[Object.keys(ids)[0]].name;
          }
          

          const banNew = template(
            `if (new.target) throw Error("${name || 'intermediate value'} is not a constructor")`
          )();

          if (!types.isBlockStatement(body)) {
            body = types.blockStatement([types.returnStatement(body)]);
          }

          body.body.unshift(banNew as Statement);

          path.replaceWith(
            types.functionExpression(null, params, body, !!generator, !!async)
          );
        },
      },
    };
  }
);
