const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

const config = {
  entry: [
    path.resolve(__dirname, 'src/QuickSelect-js.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'quickselect.js',
    library: 'QuickSelect',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
