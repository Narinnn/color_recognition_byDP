const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, args) => {
  return {
    entry: "./src/client/js/main.js",
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "../dist")
    },
    module: {
      rules: []
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "src/client/index.html",
          to: "index.html"
        }
      ])
    ],
    resolve: {
      extensions: [".js"],
      modules: ["src", "node_modules", "src/client/js", "build_configurations"]
    }
  };
};