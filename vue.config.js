// 경로: 루트 디렉토리/vue.config.js
const path = require('path');

module.exports = {
  devServer: {
    overlay: false,
    host: process.env.VUE_APP_BASE_URL,
    port: 9090,
  },
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias : {
        '@' : path.join(__dirname, 'src/')
      }
    }
  }
};