const path = require("path");

/**@type {import('webpack').Configuration} */
const webpackConfig = {
  mode: "production",
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};

module.exports = webpackConfig;
