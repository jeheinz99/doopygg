const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './client/dist',
    host: 'localhost',
    open: true,
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
});

//      directory: path.resolve(__dirname, './dist/index.html')
//     proxy: {
//   '/': 'http://localhost:3000',
// },