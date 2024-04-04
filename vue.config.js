const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer:{
    historyApiFallback:true,
    allowedHosts: "all",
    // port: 8080,
    proxy: {
      //名字可以自定义，这里我用的是api
      '/api': {
        target: "http://47.242.78.219",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/login': {
        target: "https://test-user-oneid.deep-time.org",
        changeOrigin: true,
        pathRewrite: {
          '^/login': ''
        }
      },
      '/report': {
        target: "http://log-analysis-dev.deep-time.org",
        changeOrigin: true,
        pathRewrite: {
          '^/report': ''
        }
      }
    }
  },
  outputDir: "./build/dist",
})
