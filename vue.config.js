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
       target: process.env.HTG_API_TARGET || "http://127.0.0.1:8809",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/loginToDDE': {
        target: "https://user-oneid.deep-time.org",
        changeOrigin: true,
        pathRewrite: {
          '^/loginToDDE': ''
        }
      },
    }
  },
  outputDir: "./build/dist",
})
