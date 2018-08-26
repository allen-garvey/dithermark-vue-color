var config = require('./webpack.release.js')

config.output.filename = './[name].module.js',
config.output.libraryTarget = 'commonjs2'

module.exports = config
