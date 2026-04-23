import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

/**@type {import('rollup').RollupOptions} */
const config = {
  input: "./src/index.js",
  output: {
    // file: "./dist/bundle.js",
    dir: "./dist",
    format: "cjs",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" })],
};

export default config;
