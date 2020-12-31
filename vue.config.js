module.exports = {
  devServer: {
    overlay: false,
    host: process.env.APP_BASE_URL,
    port: 9090,
  },
  transpileDependencies: ["vuetify"],
};