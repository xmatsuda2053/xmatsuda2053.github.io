const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //mode: "none",
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "taskify.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "taskify.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "css-loader", options: { url: false } }],
      },
    ],
  },
};
