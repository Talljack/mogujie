
const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  configureWebpack: (config) => {
    Object.assign(config, {
      resolve: {
        extensions: [".ts", '.js', ".vue", ".json"], //文件优先解析后缀名顺序
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "components": path.resolve(__dirname, "./src/components"),
          "views": path.resolve(__dirname, "./src/views"),
          "common": path.resolve(__dirname, "./src/common"),
          "assets": path.resolve(__dirname, "./src/assets")
        }
      }
    })
  },
  devServer: {
    // 配置代理
  //   proxy: {
  //     '/api': {
  //       ws: false,   // 禁用websocket
  //       target: 'http://127.0.0.1:8848/',
  //       changeOrigin: true,
  //     }
  //   }
  }
}