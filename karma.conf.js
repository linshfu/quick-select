module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'commonjs'],
    files: [
      'node_modules/lodash/index.js',
      'node_modules/karma-jasmine/lib/adapter.js',
      'src/QuickSelect.js',
      'test/test.js'
    ],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-commonjs',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-babel-preprocessor'
    ],
    exclude: [

    ],
    preprocessors: {
      'node_modules/lodash/index.js': ['babel', 'commonjs'],
      'node_modules/karma-jasmine/lib/adapter.js': ['babel', 'commonjs'],
      'src/QuickSelect.js': ['babel', 'commonjs'],
      'test/test.js': ['babel', 'commonjs']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015', 'stage-0'],
        plugins: ['add-module-exports', 'transform-es2015-modules-umd']
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js')
      },
      sourceFileName: function (file) {
        return file.originalPath
      }
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
