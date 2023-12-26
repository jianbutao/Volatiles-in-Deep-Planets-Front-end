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
        target: "http://localhost:8809",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  outputDir: "./build/dist",
})
