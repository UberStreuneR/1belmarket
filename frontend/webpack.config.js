const path              = require("path");
const webpack           = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv            = require("dotenv");

const envFile = `.${process.env.NODE_ENV === "development" ? "dev" : "prod"}.env`;

dotenv.config({
  path: path.resolve(__dirname, "..", envFile)
});

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]ss|css)/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};