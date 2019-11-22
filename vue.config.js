module.exports = {
  devServer: {
    proxy: {
      '/auth': { // search为转发路径
        target: 'http://open.leve.com', // 目标地址
        ws: true, // 是否代理websockets
        changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL,
        pathRewrite: {
          '^/auth': '/auth' // 需要rewrite的,
        }
      }
    }
  }
}
