const webpack = require('webpack')

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/QuickSelect.js',
      'test/test.js'
    ],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-commonjs',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-babel-preprocessor'
    ],
    exclude: [

    ],
    preprocessors: {
      'src/QuickSelect.js': ['webpack'],
      'test/test.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
