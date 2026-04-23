const babelCore = require("@babel/core");

// babelCore.transformFile(
//   "./cli/index.js",
//   {
//     presets: ["@babel/preset-env"],
//   },
//   (err, result) => {
//     console.log(result);
//   }
// );

babelCore.transform(
  `class App {}`,
  (err, result) => console.log(result)
);


// babelCore.transform
// babel.transformFromAst
// babel.parse
// babel.parseAsync
// babel.traverse