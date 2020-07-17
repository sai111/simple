const path = require('path')
let localUrl = 'http://116.62.114.170:3000'
const isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'http://116.62.114.170' : '/',
  devServer: {
    port: 3030,
    open: true, // 自动开启浏览器
    compress: true, // 开启压缩
    // 设置请求代理
    proxy: {
      '/api': {
        target: localUrl,
        ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: (config) => {
    if (isProduction) {
      // 为生产环境修改配置
      config.plugins.push(
        // 添加代码压缩工具，及设置生产环境自动删除console
        new UglifyJsPlugin({
          UglifyJsPlugin: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallerl: true
        })
      )
    }
  }
}
