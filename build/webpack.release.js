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
        options: {
          loaders: ['vue-style-loader', {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: false
            }
          }]
        }
      }
    ]
  }
}
