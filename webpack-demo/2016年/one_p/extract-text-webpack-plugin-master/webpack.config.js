
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 使用webpack打包
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.js"
  },
  module: {
    loaders: [
	  //.css 文件使用 style-loader 和 css-loader 来处理
	  {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
			'css?sourceMap!' +
			'less?sourceMap'
		)
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // 内联css提取到单独的styles的css
  plugins: [new ExtractTextPlugin('styles.css')]
};