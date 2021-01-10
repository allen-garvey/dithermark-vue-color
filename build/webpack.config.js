var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    'vue-color': './src/index.js'
  },
  mode: 'development',
  output: {
    filename: './[name].js',
    library: 'VueColor',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
