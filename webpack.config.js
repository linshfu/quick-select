const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

const config = {
  output: {
    library: 'QuickSelect',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.pug$/, loader: "pug-loader" },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.vue$/, loader: 'vue-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'example/index.pug'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}

module.exports = config
