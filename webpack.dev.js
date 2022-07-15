const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
    }),
  ],
  devServer: {
    proxy: {
      '/': 'http://localhost:3000',
    },
    host: 'localhost',
    static: {
      directory: path.resolve(__dirname, './dist/index.html')
    },
    open: true,
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
});