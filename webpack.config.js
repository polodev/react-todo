var path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var isProd = process.env.NODE_ENV === 'production'
function  getPlugins  () {
  var plugins = []
  if (isProd) {
    plugins.push(new UglifyJSPlugin())
  }
    plugins.push(new UglifyJSPlugin())
  return plugins
}

var config = {
  entry: './script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: getPlugins()
}
if (process.env.NODE_ENV  == 'production') {
  config.pugins.push(new UglifyJSPlugin());
}
module.exports = config
