const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: {
      //重定向
      index: "./index.html", // 如果用了browserHistory，防止刷新404
    },
  },
  resolve: {
    // 解析器
    extensions: [".ts", ".tsx", ".js", ".json"], // 使用require时可以省略后缀名
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader", // 把ts进行加载和转译
      },
      // loader执行有4种顺序: pre先执行 normal inline post
      {
        enforce: "pre",
        test: /\.tsx$/,
        loader: "source-map-loader", // 从源代码中提出sourcemap，目的时方便测试
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(), // 和hot:true配合实现热更新
  ],
};
