import { NodePath } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import { Statement } from "@babel/types";

interface IPluginOptions {
  exclude?: RegExp[];
}

export const AutoTryCatchPlugin = declare<IPluginOptions>(
  ({ assertVersion, types: t, template }, opts) => {
    assertVersion(7);

    // 默认错误处理函数模板
    const defaultHandler = template(`
      console.error(ERROR);
      throw new Error('捕获到错误：' + ERROR.message);
    `);

    return {
      name: "TryCatchPlugin",
      visitor: {
        Function(path) {
          const { node } = path;

          // 跳过已包含try/catch的函数
          if (containsTryCatch(path)) return;

          // 白名单
          if (shouldSkip(path, opts.exclude)) return;

          // 生成唯一错误标识符
          const errorIdentifier = path.scope.generateUidIdentifier("e");

          let body = node.body;

          if (!t.isBlockStatement(body)) {
            body = t.blockStatement([t.returnStatement(body)]);
          }

          // 构建try/catch结构
          const tryStatement = t.tryStatement(
            body,
            t.catchClause(
              t.identifier(errorIdentifier.name),
              t.blockStatement(buildHandlerBlock(errorIdentifier.name))
            ),
            t.blockStatement([t.returnStatement(t.nullLiteral())])
          );

          // 替换函数体
          node.body = t.blockStatement([tryStatement]);
        },
      },
    };

    function buildHandlerBlock(error: string) {
      return defaultHandler({ ERROR: error }) as Statement[];
    }

    function containsTryCatch(path: NodePath) {
      let hasTryCatch = false;
      path.traverse({
        TryStatement(p) {
          hasTryCatch = true;
          p.stop();
        },
      });
      return hasTryCatch;
    }

    function shouldSkip(path: NodePath, excludePatterns: RegExp[] = []) {
      const { node } = path;
      // 通过注释跳过
      if (
        node.leadingComments?.some((c) => c.value.includes("@no-try-catch"))
      ) {
        return true;
      }

      if (excludePatterns?.length === 0) return false;

      // 通过名称匹配
      const functionName = getFunctionName(path);
      return excludePatterns?.some((pattern) =>
        new RegExp(pattern).test(functionName)
      );
    }

    function getFunctionName(path: NodePath) {
      const { node } = path;
      if (t.isFunctionDeclaration(node)) {
        return node.id?.name || "anonymous";
      }
      if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
        // @ts-ignore
        return path.parent?.id?.name || "anonymous";
      }
      return "unknown";
    }
  }
);
