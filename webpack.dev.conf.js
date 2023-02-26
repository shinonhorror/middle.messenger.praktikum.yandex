const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require("./webpack.base.conf.js"); 

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: baseWebpackConfig.externals.paths.dist,
    historyApiFallback: true,
    liveReload: true,
    compress: true,
    hot: true,
    port: 8081,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})

