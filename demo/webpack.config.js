const path = require('path');
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'renderer.js'),
  output: {
    path: __dirname + "/build",
    filename: "demo.build.js"
  },
  plugins: [
    new OpenBrowserPlugin({url: 'http://localhost:8080'}),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("../package.json").version)
    })
  ],
  devServer: {
    contentBase: path.resolve(path.join(__dirname, 'build'))
  },
  devtool: "eval",
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.(jpe?g|png|gif|mtl|obj)$/i,
        include: /demo\/src\/catalog/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][name].[ext]?[hash]&context=demo/src',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /demo\/src\/catalog/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
        ]
      }
    ]
  }
};
