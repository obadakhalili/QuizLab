const { resolve } = require("path");

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8081/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  pages: {
    index: {
      entry: "client/src/main.js",
      template: "client/public/index.html"
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "client/src")
      }
    }
  },
  chainWebpack: config => {
    config.plugin("copy").use(require("copy-webpack-plugin"), [
      [
        {
          from: resolve(__dirname, "client/public"),
          to: resolve(__dirname, "dist"),
          toType: "dir",
          ignore: [".DS_Store"]
        }
      ]
    ]);
  }
};
