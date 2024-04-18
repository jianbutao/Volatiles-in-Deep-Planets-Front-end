const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer:{
    historyApiFallback:true,
    allowedHosts: "all",
    proxy: {
      //名字可以自定义,这里我用的是api
      '/api': {
        target: "http://47.242.78.219",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/loginToDDE': {
        target: "https://user-oneid.deep-time.org/",
        changeOrigin: true,
      },
    }
  },
  outputDir: "./build/dist",
})
