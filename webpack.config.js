var webpack = require('webpack')
var path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var isProd = process.env.NODE_ENV === 'production'
function  getPlugins  () {
  var plugins = []

  /**
   * I can use either  direct uglifyjs-webpack-plugin or webpack.optimize.UglifyJsPlugin(). Latter will 
   * be good hence i don't require any plugin for thate
   */
  if (true) {
   //plugins.push(new webpack.optimize.UglifyJsPlugin())
   plugins.push(new UglifyJsPlugin())
  }

  // I have to use this define plugin in prod build
  // other wise dead code elimination won't be applied correctly
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    })
  )

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

module.exports = config

