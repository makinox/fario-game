const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  target: ['web', 'es2017'],
  mode: 'production',
  devtool: 'source-map',
});
