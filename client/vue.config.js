const { resolve } = require("path");

module.exports = {
  lintOnSave: false,
  outputDir: resolve(__dirname, "../server/dist"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8081/api/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
