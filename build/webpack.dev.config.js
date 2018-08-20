const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');

const devConfig = {
  module: {
    rules: [
      // css文件单独打包
      {
        test: /\.styl$/,
        use: [
          // style-loader不能开启热重载，需要使用vue-style-loader
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    overlay: {
      errors: true,
      warnings: true
    },
    historyApiFallback: true,
    hot: true
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}

module.exports = merge(baseConfig, devConfig);