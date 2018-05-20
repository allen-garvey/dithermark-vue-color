var vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
  entry: {
    'vue-color': './src/index.js'
  },
  output: {
    filename: './dist/[name].js',
    library: 'VueColor',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
    ]
  }
}
