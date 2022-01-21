const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'assets'),
        publicPath: '/assets',
      },
    ],
    open: true,
    port: 3001,
    hot: true,
  },
});
