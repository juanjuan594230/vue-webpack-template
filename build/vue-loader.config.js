'use strict';

module.exports = (isDev) => {
  return {
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path].[name].[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
}