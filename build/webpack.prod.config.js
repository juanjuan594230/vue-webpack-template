const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const prodConfig = {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    vendor: ['vue']
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      // css文件单独打包
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 单独打包webpack相关代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
  ]
}

module.exports = merge(baseConfig, prodConfig);