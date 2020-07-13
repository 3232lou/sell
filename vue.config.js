module.exports = {
  publicPath: "./", // 打包文件相对路径
  css: {
    loaderOptions: {
      postcss: {
        // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
        plugins: [
          require("postcss-px2rem-exclude")({
            remUnit: 75
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://ele-interface.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
        '^/api': ''
        }
      }
    }
  }
};
