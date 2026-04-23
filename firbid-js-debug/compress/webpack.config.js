const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

/**@type {import('webpack').Configuration} */
const webpackConfig = {
  mode: "production",
  entry: path.resolve(__dirname, "main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },

  plugins: [
    new CompressionPlugin({test: /\.js$/}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
};

module.exports = webpackConfig;
