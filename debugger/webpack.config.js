const path = require('path');

module.exports = {
  //entry: './src/index.js',
  entry: {
    bundle: './src/index.js',
    worker: '../debuggee/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // }
};