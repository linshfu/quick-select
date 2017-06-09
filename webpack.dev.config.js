const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const publicPath = 'http://localhost:8080/'

const config = {
  entry: [
    path.resolve(__dirname, "src/QuickSelect-js.js"),
    path.resolve(__dirname, "src/css/index.sass"),
    path.resolve(__dirname, "example"),
    'webpack-hot-middleware/client'
  ],
  output: {
    path: path.resolve(__dirname, "example"),
    publicPath: publicPath,
    filename: "quickselect.js",
    library: 'QuickSelect',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.pug$/,
        loaders: 'pug-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DashboardPlugin({ port: 3001 }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'example/index.pug'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config
