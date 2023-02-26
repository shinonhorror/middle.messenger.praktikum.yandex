const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.resolve(__dirname, "./dist"),
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: path.join(PATHS.src, "/index.ts"),
  output: {
    path: PATHS.dist,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": PATHS.src,
      handlebars: "handlebars/dist/handlebars.min.js",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
};
