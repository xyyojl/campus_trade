module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080/', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': '/mock/'
          }
        }
      }
    }
  }