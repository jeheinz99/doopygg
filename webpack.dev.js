const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    static: './client/dist',
    host: 'localhost',
    open: true,
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        // secure: false,
        // changeOrigin: true,
      },
    },
  },
});