'use strict'
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const createVueLoaderOptions = require('./vue-loader.config');
const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'resource/[path]/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'resource/[name].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'template.html')
    })
  ]
}

module.exports = baseConfig;