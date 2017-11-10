const express = require('express')
const app = express()

const webpack = require('webpack')
const config = require('./webpack.dev.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const DashboardPlugin = require('webpack-dashboard/plugin')
const compiler = webpack(config)
compiler.apply(new DashboardPlugin())

const browserSync = require("browser-sync").create()

const port = 8080

app.use(express.static('example'))

app.use(webpackDevMiddleware(compiler, {
  quiet: true,
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: {
      colors: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
  browserSync.init({
    open: 'local',
    ui: false,
    notify: false,
    proxy: `localhost:${port}`,
    port: 3000
  })
  console.log(`browserSync is running on prot 3000`)
})
